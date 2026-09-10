export enum TransitionId {
    RoughTurning = 'rough_turning',
    SemiFinishTurning = 'semi_finish_turning',
    FinishTurning = 'finish_turning',
    PreGrinding = 'pre_grinding',
    FinishGrinding = 'finish_grinding',
}

export interface Transition {
    id: TransitionId;
    label: string;
    rz: number;      // мкм, после перехода
    h: number;       // мкм, после перехода
    ky: number;       // коэффициент уточнения пространственных отклонений
    epsilon: number;  // погрешность установки, мкм
}