export enum OperationId {
    Face = 'face',
    Contour = 'contour',
    Slot = 'slot',
    Pocket = 'pocket',
    Profile3D = 'profile_3d',
}

export interface Operation {
    id: OperationId;
    label: string;
    interrupted: number;       // 0..1 доля прерывистости резания (ударные нагрузки, термоциклирование)
    chipEvacuation: number;    // 0..10 сложность удаления стружки
    heatBonus: number;         // добавка к тепловой напряжённости
}

export enum StageId {
    Roughing = 'roughing',
    SemiFinishing = 'semi_finishing',
    Finishing = 'finishing',
}

export interface Stage {
    id: StageId;
    label: string;
    coolingBonus: number;
    lubricationBonus: number;
}

export enum PriorityId {
    Balanced = 'balanced',
    Quality = 'quality',
    Economy = 'economy',
    Ecology = 'ecology',
}

export interface Priority {
    id: PriorityId;
    label: string;
    performanceShare: number;  // доля технологической пригодности в итоговой оценке, %
    econ: number;              // вес экономичности
    eco: number;               // вес экологичности
    corr: number;              // вес антикоррозионной защиты
}
