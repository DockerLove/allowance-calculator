import { BlankType, BlankTypeId } from '../Types/blank';

export const blankTypes: BlankType[] = [
    { id: BlankTypeId.Prokat, label: 'Прокат горячекатаный', rz0: 150, h0: 250, rhoK: 1.0 },
    { id: BlankTypeId.Kovka, label: 'Поковка штампованная', rz0: 200, h0: 300, rhoK: 1.5 },
    { id: BlankTypeId.Otlivka, label: 'Отливка', rz0: 250, h0: 350, rhoK: 2.0 },
];