export enum ToolMaterialId {
    HSS = 'hss',
    Carbide = 'carbide',
    CoatedCarbide = 'coated_carbide',
    Ceramic = 'ceramic',
}

export interface ToolMaterial {
    id: ToolMaterialId;
    label: string;
    base: 'hss' | 'carbide';          // какой ориентир скорости использовать
    vcFactor: number;                  // множитель к ориентирной скорости
    thermalShockSensitivity: number;   // 0..1 чувствительность к термоциклированию
    lubricationBonus: number;          // добавка к потребности в смазке
    noLiquid: boolean;                 // жидкое охлаждение недопустимо
}
