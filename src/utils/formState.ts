import { FormState } from '../Types/form';
import { priorities } from '../Dictionaries/priorities';
import { materials } from '../Dictionaries/materials';
import { machines } from '../Dictionaries/machines';
import { toolMaterials } from '../Dictionaries/toolMaterials';
import { operations } from '../Dictionaries/operations';
import { stages } from '../Dictionaries/stages';
import { MaterialId } from '../Types/material';
import { MachineId } from '../Types/machine';
import { ToolMaterialId } from '../Types/tool';
import { OperationId, StageId } from '../Types/operation';

export const defaultForm: FormState = {
    material: null,
    hardness: 200,
    machine: null,
    toolMaterial: null,
    toolDiameter: 0,
    teeth: 0,
    operation: null,
    stage: null,
    ra: 3.2,
    spindleSpeed: 0,
    feedPerTooth: 0,
    depthAp: 0,
    widthAe: 0,
    priority: priorities[0],
    allowDry: true,
    excludeOils: false,
};

const byId = <T extends { id: string }>(list: T[], id: string): T => {
    const item = list.find((x) => x.id === id);
    if (!item) throw new Error(`Не найден элемент справочника: ${id}`);
    return item;
};

/** Пример исходных данных: черновое фрезерование кармана в титановом сплаве */
export const exampleForm: FormState = {
    ...defaultForm,
    material: byId(materials, MaterialId.Titanium),
    hardness: 330,
    machine: byId(machines, MachineId.CenterTsc),
    toolMaterial: byId(toolMaterials, ToolMaterialId.CoatedCarbide),
    toolDiameter: 16,
    teeth: 4,
    operation: byId(operations, OperationId.Pocket),
    stage: byId(stages, StageId.Roughing),
    ra: 6.3,
    spindleSpeed: 1500,
    feedPerTooth: 0.08,
    depthAp: 8,
    widthAe: 4,
};
