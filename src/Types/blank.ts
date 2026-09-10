export enum BlankTypeId {
    Prokat = 'prokat',
    Kovka = 'kovka',
    Otlivka = 'otlivka',
}

export interface BlankType {
    id: BlankTypeId;
    label: string;
    rz0: number;   // высота микронеровностей заготовки, мкм
    h0: number;    // глубина дефектного слоя заготовки, мкм
    rhoK: number;  // удельная кривизна заготовки, мкм/мм
}