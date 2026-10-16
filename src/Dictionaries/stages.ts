import { Stage, StageId } from '../Types/operation';

export const stages: Stage[] = [
    { id: StageId.Roughing, label: 'Черновая', coolingBonus: 1, lubricationBonus: 0 },
    { id: StageId.SemiFinishing, label: 'Получистовая', coolingBonus: 0, lubricationBonus: 0.5 },
    { id: StageId.Finishing, label: 'Чистовая', coolingBonus: -1, lubricationBonus: 2 },
];
