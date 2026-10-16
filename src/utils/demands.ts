import { CuttingMode, Demands } from '../Types/calculation';
import { WorkMaterial } from '../Types/material';
import { ToolMaterial } from '../Types/tool';
import { Operation, Stage } from '../Types/operation';
import { clamp, round1 } from './math';

interface DemandsInput {
    material: WorkMaterial;
    hardness: number;
    tool: ToolMaterial;
    operation: Operation;
    stage: Stage;
    ra: number;
    mode: CuttingMode;
}

/**
 * Определение потребности процесса в охлаждении, смазке и удалении стружки (шкала 0..10).
 * Потребности формируются из свойств материала, режима резания, вида и стадии обработки.
 */
export function evaluateDemands(input: DemandsInput): Demands {
    const { material, hardness, tool, operation, stage, ra, mode } = input;
    const notes: string[] = [];

    // ---------- Охлаждение ----------
    const hardnessTerm = clamp((hardness - 200) / 60, -1, 2);
    const speedTerm = clamp((mode.vcRatio - 1) * 2.5, -2, 3);
    const mrrTerm = clamp(Math.log10(Math.max(mode.mrr, 1)) - 1, 0, 2);

    const cooling = clamp(
        material.heat + hardnessTerm + speedTerm + mrrTerm + stage.coolingBonus + operation.heatBonus,
        0,
        10,
    );

    if (material.heat >= 7) notes.push('Материал имеет низкую теплопроводность — тепло концентрируется у режущей кромки.');
    if (mode.vcRatio > 1.2) notes.push('Скорость резания выше ориентировочной — рост температуры в зоне резания.');
    if (mrrTerm >= 1) notes.push('Высокая производительность съёма металла увеличивает тепловыделение.');
    if (hardnessTerm >= 1) notes.push('Повышенная твёрдость материала увеличивает тепловую нагрузку.');

    // ---------- Смазка ----------
    let raTerm = 0;
    if (ra <= 1.6) raTerm = 1.5;
    else if (ra <= 3.2) raTerm = 0.75;
    else if (ra > 6.3) raTerm = -0.5;

    const lowSpeedTerm = mode.vcRatio < 0.6 ? (0.6 - mode.vcRatio) * 4 : 0;

    const lubrication = clamp(
        material.adhesion + stage.lubricationBonus + raTerm + lowSpeedTerm + tool.lubricationBonus,
        0,
        10,
    );

    if (material.adhesion >= 7) notes.push('Материал склонен к налипанию на инструмент — нужна высокая смазывающая способность.');
    if (raTerm >= 0.75) notes.push(`Требуемая шероховатость Ra ${ra} мкм повышает потребность в смазке.`);
    if (lowSpeedTerm > 0) notes.push('Низкая скорость резания — преобладает трение, а не нагрев.');

    // ---------- Удаление стружки ----------
    const flush = clamp(operation.chipEvacuation, 0, 10);
    if (flush >= 7) notes.push('Глубокий паз или карман — затруднено удаление стружки, нужна мощная подача.');

    return { cooling: round1(cooling), lubrication: round1(lubrication), flush, notes };
}
