import { Operation, OperationId } from '../Types/operation';

export const operations: Operation[] = [
    { id: OperationId.Face, label: 'Торцевое фрезерование плоскости', interrupted: 1, chipEvacuation: 2, heatBonus: 0 },
    { id: OperationId.Contour, label: 'Контурное фрезерование (концевая фреза)', interrupted: 0.8, chipEvacuation: 3, heatBonus: 0 },
    { id: OperationId.Slot, label: 'Фрезерование паза', interrupted: 0.3, chipEvacuation: 8, heatBonus: 1 },
    { id: OperationId.Pocket, label: 'Фрезерование кармана', interrupted: 0.5, chipEvacuation: 9, heatBonus: 0.5 },
    { id: OperationId.Profile3D, label: 'Объёмное профильное фрезерование (шаровая фреза)', interrupted: 0.6, chipEvacuation: 3, heatBonus: 0 },
];
