import { ToolMaterial, ToolMaterialId } from '../Types/tool';

export const toolMaterials: ToolMaterial[] = [
    {
        id: ToolMaterialId.HSS, label: 'Быстрорежущая сталь (Р6М5)',
        base: 'hss', vcFactor: 1, thermalShockSensitivity: 0, lubricationBonus: 1, noLiquid: false,
    },
    {
        id: ToolMaterialId.Carbide, label: 'Твёрдый сплав без покрытия',
        base: 'carbide', vcFactor: 1, thermalShockSensitivity: 0.8, lubricationBonus: 0, noLiquid: false,
    },
    {
        id: ToolMaterialId.CoatedCarbide, label: 'Твёрдый сплав с покрытием (TiAlN)',
        base: 'carbide', vcFactor: 1.25, thermalShockSensitivity: 1, lubricationBonus: 0, noLiquid: false,
    },
    {
        id: ToolMaterialId.Ceramic, label: 'Режущая керамика',
        base: 'carbide', vcFactor: 3, thermalShockSensitivity: 1, lubricationBonus: 0, noLiquid: true,
    },
];
