import { WorkMaterial } from './material';
import { Machine } from './machine';
import { ToolMaterial } from './tool';
import { Operation, Priority, Stage } from './operation';

/** Все исходные данные, вводимые пользователем */
export interface FormState {
    material: WorkMaterial | null;
    hardness: number;          // HB
    machine: Machine | null;
    toolMaterial: ToolMaterial | null;
    toolDiameter: number;      // мм
    teeth: number;
    operation: Operation | null;
    stage: Stage | null;
    ra: number;                // мкм
    spindleSpeed: number;      // об/мин
    feedPerTooth: number;      // мм/зуб
    depthAp: number;           // мм
    widthAe: number;           // мм
    priority: Priority;
    allowDry: boolean;
    excludeOils: boolean;
}
