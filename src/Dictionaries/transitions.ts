import { Transition, TransitionId } from '../Types/transition';

export const transitions: Transition[] = [
    { id: TransitionId.RoughTurning, label: 'Черновое точение', rz: 50, h: 50, ky: 0.06, epsilon: 100 },
    { id: TransitionId.SemiFinishTurning, label: 'Получистовое точение', rz: 30, h: 30, ky: 0.04, epsilon: 80 },
    { id: TransitionId.FinishTurning, label: 'Чистовое точение', rz: 10, h: 20, ky: 0.02, epsilon: 60 },
    { id: TransitionId.PreGrinding, label: 'Шлифование предварительное', rz: 10, h: 15, ky: 0.02, epsilon: 40 },
    { id: TransitionId.FinishGrinding, label: 'Шлифование окончательное', rz: 3.2, h: 5, ky: 0.01, epsilon: 20 },
];