import { FormState } from '../Types/form';
import { materials } from '../Dictionaries/materials';
import { machines } from '../Dictionaries/machines';
import { toolMaterials } from '../Dictionaries/toolMaterials';
import { operations } from '../Dictionaries/operations';
import { stages } from '../Dictionaries/stages';
import { priorities } from '../Dictionaries/priorities';
import { defaultForm } from './formState';

const FILE_VERSION = 1;

/** Сериализация исходных данных расчёта в JSON (в справочниках хранятся только идентификаторы) */
export function serializeForm(form: FormState): string {
    return JSON.stringify(
        {
            version: FILE_VERSION,
            materialId: form.material?.id ?? null,
            hardness: form.hardness,
            machineId: form.machine?.id ?? null,
            toolMaterialId: form.toolMaterial?.id ?? null,
            toolDiameter: form.toolDiameter,
            teeth: form.teeth,
            operationId: form.operation?.id ?? null,
            stageId: form.stage?.id ?? null,
            ra: form.ra,
            spindleSpeed: form.spindleSpeed,
            feedPerTooth: form.feedPerTooth,
            depthAp: form.depthAp,
            widthAe: form.widthAe,
            priorityId: form.priority.id,
            allowDry: form.allowDry,
            excludeOils: form.excludeOils,
        },
        null,
        2,
    );
}

const find = <T extends { id: string }>(list: T[], id: unknown): T | null =>
    list.find((item) => item.id === id) ?? null;

const num = (value: unknown, fallback: number): number =>
    typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value : fallback;

/** Восстановление исходных данных из JSON-файла */
export function parseForm(text: string): FormState {
    let data: Record<string, unknown>;
    try {
        data = JSON.parse(text);
    } catch {
        throw new Error('Файл не является корректным JSON');
    }
    if (!data || data.version !== FILE_VERSION) {
        throw new Error('Неподдерживаемый формат файла расчёта');
    }

    return {
        material: find(materials, data.materialId),
        hardness: num(data.hardness, defaultForm.hardness),
        machine: find(machines, data.machineId),
        toolMaterial: find(toolMaterials, data.toolMaterialId),
        toolDiameter: num(data.toolDiameter, 0),
        teeth: num(data.teeth, 0),
        operation: find(operations, data.operationId),
        stage: find(stages, data.stageId),
        ra: num(data.ra, defaultForm.ra),
        spindleSpeed: num(data.spindleSpeed, 0),
        feedPerTooth: num(data.feedPerTooth, 0),
        depthAp: num(data.depthAp, 0),
        widthAe: num(data.widthAe, 0),
        priority: find(priorities, data.priorityId) ?? priorities[0],
        allowDry: typeof data.allowDry === 'boolean' ? data.allowDry : true,
        excludeOils: typeof data.excludeOils === 'boolean' ? data.excludeOils : false,
    };
}

/** Скачивание текстового файла в браузере */
export function downloadText(filename: string, text: string): void {
    const blob = new Blob([text], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}
