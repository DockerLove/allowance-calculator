import {
    Candidate, CuttingMode, Demands, ExcludedItem, Reason, SelectionResult,
} from '../Types/calculation';
import { Coolant, CoolantId, DeliveryMethod } from '../Types/coolant';
import { Machine } from '../Types/machine';
import { WorkMaterial } from '../Types/material';
import { Operation, Priority, Stage } from '../Types/operation';
import { ToolMaterial, ToolMaterialId } from '../Types/tool';
import { coolants } from '../Dictionaries/coolants';
import { deliveryMethods } from '../Dictionaries/deliveryMethods';
import { calculateCuttingMode } from './cuttingMode';
import { evaluateDemands } from './demands';
import { clamp, round1 } from './math';

export interface SelectionInput {
    material: WorkMaterial;
    hardness: number;
    machine: Machine;
    tool: ToolMaterial;
    toolDiameter: number;
    teeth: number;
    operation: Operation;
    stage: Stage;
    ra: number;
    spindleSpeed: number;
    feedPerTooth: number;
    depthAp: number;
    widthAe: number;
    priority: Priority;
    allowDry: boolean;
    excludeOils: boolean;
}

/** Доля неудовлетворённой / избыточной потребности → степень соответствия 0..1 */
function fit(demand: number, supply: number, kUnder: number, kOver: number): number {
    const unmet = Math.max(0, demand - supply);
    const excess = Math.max(0, supply - demand);
    return clamp(1 - (unmet / 10) * kUnder - (excess / 10) * kOver, 0, 1);
}

/** Жёсткие ограничения: причина исключения СОЖ либо null */
function exclusionReason(coolant: Coolant, input: SelectionInput): string | null {
    const { material, tool } = input;

    if (!input.allowDry && (coolant.category === 'dry' || coolant.category === 'air')) {
        return 'Исключена настройкой: сухая обработка и воздушное охлаждение не допускаются.';
    }
    if (input.excludeOils && coolant.category === 'oil') {
        return 'Исключена настройкой: масляные СОЖ не допускаются.';
    }
    if (coolant.onlyGroups && !coolant.onlyGroups.includes(material.isoGroup)) {
        return 'Предназначена только для обработки цветных металлов.';
    }
    if (tool.noLiquid && coolant.category !== 'dry' && coolant.category !== 'air') {
        return 'Керамический инструмент не допускает жидкого охлаждения: термоудар приводит к растрескиванию пластины.';
    }
    if (material.fireHazard && coolant.waterBased) {
        return 'Магниевые сплавы: водосодержащие СОЖ запрещены — выделяется водород, стружка может воспламениться.';
    }
    if (material.fireHazard && coolant.category === 'mql') {
        return 'Магниевые сплавы: масляный аэрозоль вместе с мелкой стружкой пожароопасен.';
    }
    if (material.chlorineSensitive && coolant.chlorine) {
        return 'Хлорсодержащие присадки недопустимы для данного материала: риск коррозионного повреждения и охрупчивания.';
    }
    if (material.sulfurSensitive && coolant.activeSulfur) {
        return 'Активная сера недопустима для данного материала: потемнение поверхности, охрупчивание при нагреве.';
    }
    return null;
}

interface Scored {
    score: number;
    reasons: Reason[];
}

function scoreOption(
    coolant: Coolant,
    method: DeliveryMethod,
    input: SelectionInput,
    mode: CuttingMode,
    demands: Demands,
): Scored {
    const { material, tool, operation, priority } = input;
    const info = deliveryMethods[method];
    const reasons: Reason[] = [];

    // ---------- Технологическая пригодность ----------
    const coolingSupply = Math.min(10, coolant.cooling * info.coolingFactor);
    const fitCooling = fit(demands.cooling, coolingSupply, 1.6, 0.25);
    const fitLubrication = fit(demands.lubrication, coolant.lubrication, 1.6, 0.25);
    const wc = demands.cooling + 1;
    const wl = demands.lubrication + 1;
    const fitCL = (wc * fitCooling + wl * fitLubrication) / (wc + wl);

    const fitFlush = fit(demands.flush, info.flush, 1.2, 0);
    const wf = 0.1 + 0.25 * (demands.flush / 10);
    const performance = (1 - wf) * fitCL + wf * fitFlush;

    if (fitCooling >= 0.9) {
        reasons.push({ positive: true, text: `Охлаждающая способность (${round1(coolingSupply)}) покрывает потребность (${demands.cooling}).` });
    } else if (fitCooling < 0.7) {
        reasons.push({ positive: false, text: `Охлаждения недостаточно: способность ${round1(coolingSupply)} при потребности ${demands.cooling}.` });
    }
    if (fitLubrication >= 0.9) {
        reasons.push({ positive: true, text: `Смазывающая способность (${coolant.lubrication}) покрывает потребность (${demands.lubrication}).` });
    } else if (fitLubrication < 0.7) {
        reasons.push({ positive: false, text: `Смазки недостаточно: способность ${coolant.lubrication} при потребности ${demands.lubrication}.` });
    }
    if (demands.flush >= 6) {
        if (info.flush >= 8) {
            reasons.push({ positive: true, text: 'Способ подачи обеспечивает эффективное вымывание стружки.' });
        } else if (info.flush < 5) {
            reasons.push({ positive: false, text: 'Способ подачи слабо удаляет стружку при её затруднённом отводе.' });
        }
    }

    // ---------- Предпочтения ----------
    const weightSum = priority.econ + priority.eco + priority.corr;
    const preferences =
        (priority.econ * (10 - coolant.cost) / 10 +
            priority.eco * coolant.ecology / 10 +
            priority.corr * coolant.corrosionProtection / 10) / weightSum;

    let score = priority.performanceShare * performance + (100 - priority.performanceShare) * preferences;

    if (coolant.ecology >= 8) reasons.push({ positive: true, text: 'Высокая экологичность и безопасность для персонала.' });
    if (coolant.cost <= 2) reasons.push({ positive: true, text: 'Низкая стоимость эксплуатации.' });
    if (coolant.cost >= 8) reasons.push({ positive: false, text: 'Высокая стоимость СОЖ.' });
    if (coolant.ecology <= 3) reasons.push({ positive: false, text: 'Низкая экологичность, требуется вытяжка и утилизация.' });

    // ---------- Поправки по правилам предметной области ----------
    const liquid = method === DeliveryMethod.Flood || method === DeliveryMethod.ThroughSpindle;
    const interruptedGroups = ['P', 'K', 'H'];

    if (
        liquid &&
        interruptedGroups.includes(material.isoGroup) &&
        tool.thermalShockSensitivity > 0 &&
        operation.interrupted > 0
    ) {
        const factor = coolant.waterBased ? 1 : 0.5;
        const penalty = 25 * tool.thermalShockSensitivity * operation.interrupted * Math.min(1, mode.vcRatio) * factor;
        if (penalty >= 3) {
            score -= penalty;
            reasons.push({
                positive: false,
                text: 'Прерывистое резание твёрдым сплавом с жидкостью: термоциклирование может вызвать трещины в пластине.',
            });
        }
    }

    if (material.dryPreferred) {
        const dryLike = method === DeliveryMethod.None || method === DeliveryMethod.AirBlast || method === DeliveryMethod.Mql;
        if (dryLike) {
            score += 10;
            reasons.push({ positive: true, text: 'Материал хорошо обрабатывается всухую или с минимальной смазкой.' });
        } else if (coolant.waterBased) {
            score -= 8;
            reasons.push({ positive: false, text: 'Для данного материала водные СОЖ дают шлам и абразивную пасту, усложняют уборку.' });
        }
    }

    if (material.rustSensitive && coolant.waterBased && coolant.corrosionProtection < 6) {
        score -= (6 - coolant.corrosionProtection) * 2;
        reasons.push({ positive: false, text: 'Недостаточная защита от коррозии для чёрных металлов.' });
    }

    if (material.stainSensitive && coolant.alkaline) {
        score -= 30;
        reasons.push({ positive: false, text: 'Щелочная среда окрашивает и травит поверхность алюминиевых сплавов.' });
    }

    if (material.stainSensitive && coolant.id === CoolantId.NonFerrous) {
        score += 8;
        reasons.push({ positive: true, text: 'Специально предназначена для цветных металлов, не окрашивает поверхность.' });
    }

    return { score: clamp(score, 0, 100), reasons };
}

function concentrationFor(coolant: Coolant, demands: Demands): number | null {
    if (!coolant.concentration) return null;
    const [min, max] = coolant.concentration;
    const value = min + (max - min) * clamp(demands.lubrication / 10, 0, 1);
    return Math.round(value * 2) / 2;
}

function buildWarnings(input: SelectionInput, mode: CuttingMode): string[] {
    const warnings: string[] = [];
    const { material, machine, tool } = input;

    if (mode.power > machine.power * 0.85) {
        warnings.push(
            `Расчётная мощность резания ${mode.power.toFixed(1)} кВт близка к мощности станка (${machine.power} кВт) или превышает её.`,
        );
    }
    if (mode.vcRatio > 1.5) {
        warnings.push('Скорость резания значительно выше ориентировочной для пары «материал — инструмент»: проверьте режимы.');
    }
    if (mode.vcRatio < 0.3) {
        warnings.push('Скорость резания значительно ниже ориентировочной: возможна неэффективная обработка.');
    }
    if (material.fireHazard) {
        warnings.push('Магниевая стружка пожароопасна: используйте острый инструмент, не допускайте накопления стружки и пыли, держите наготове сухой порошок класса D.');
    }
    if (tool.id === ToolMaterialId.HSS && input.hardness > 300) {
        warnings.push('Быстрорежущая сталь плохо подходит для материала такой твёрдости — рекомендуется твёрдый сплав.');
    }
    if (material.isoGroup === 'S' && !machine.methods.includes(DeliveryMethod.ThroughSpindle)) {
        warnings.push('Для жаропрочных и титановых сплавов рекомендуется подача СОЖ под высоким давлением через инструмент — станок такой системой не оснащён.');
    }
    return warnings;
}

/** Основной алгоритм: ранжирование СОЖ и способов их подачи для заданных условий фрезерования */
export function selectCoolant(input: SelectionInput): SelectionResult {
    const mode = calculateCuttingMode({
        material: input.material,
        tool: input.tool,
        toolDiameter: input.toolDiameter,
        teeth: input.teeth,
        spindleSpeed: input.spindleSpeed,
        feedPerTooth: input.feedPerTooth,
        depthAp: input.depthAp,
        widthAe: input.widthAe,
    });

    const demands = evaluateDemands({
        material: input.material,
        hardness: input.hardness,
        tool: input.tool,
        operation: input.operation,
        stage: input.stage,
        ra: input.ra,
        mode,
    });

    const candidates: Candidate[] = [];
    const excluded: ExcludedItem[] = [];

    coolants.forEach((coolant) => {
        const reason = exclusionReason(coolant, input);
        if (reason) {
            excluded.push({ coolant, reason });
            return;
        }

        const available = coolant.methods.filter(
            (m) => m === DeliveryMethod.None || input.machine.methods.includes(m),
        );
        if (available.length === 0) {
            const needed = coolant.methods.map((m) => deliveryMethods[m].label).join(' / ');
            excluded.push({ coolant, reason: `Станок не оснащён необходимой системой подачи: ${needed}.` });
            return;
        }

        let best: Candidate | null = null;
        for (const method of available) {
            const { score, reasons } = scoreOption(coolant, method, input, mode, demands);
            if (best === null || score > best.score) {
                best = {
                    coolant,
                    method: deliveryMethods[method],
                    score: round1(score),
                    concentration: concentrationFor(coolant, demands),
                    reasons: reasons.slice(0, 6),
                };
            }
        }
        if (best !== null) candidates.push(best);
    });

    candidates.sort((a, b) => b.score - a.score);

    const warnings = buildWarnings(input, mode);
    if (candidates.length === 0) {
        warnings.push('Ни один вариант не удовлетворяет ограничениям. Ослабьте настройки (допустить сухую обработку, масляные СОЖ) или смените оборудование.');
    } else if (candidates[0].score < 40) {
        warnings.push('Ни один вариант не обеспечивает полного соответствия условиям — рекомендация носит компромиссный характер.');
    }

    return { mode, demands, candidates, excluded, best: candidates[0] ?? null, warnings };
}
