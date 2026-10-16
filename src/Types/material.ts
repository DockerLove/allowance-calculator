export enum MaterialId {
    CarbonSteel = 'carbon_steel',
    AlloySteel = 'alloy_steel',
    HardenedSteel = 'hardened_steel',
    StainlessSteel = 'stainless_steel',
    CastIron = 'cast_iron',
    Aluminum = 'aluminum',
    CopperAlloy = 'copper_alloy',
    Titanium = 'titanium',
    NickelAlloy = 'nickel_alloy',
    Magnesium = 'magnesium',
}

/** Группа обрабатываемости по ISO 513 */
export type IsoGroup = 'P' | 'M' | 'K' | 'N' | 'S' | 'H';

export interface WorkMaterial {
    id: MaterialId;
    label: string;
    isoGroup: IsoGroup;
    heat: number;              // 0..10 тепловая напряжённость резания
    adhesion: number;          // 0..10 склонность к налипанию / наросту (потребность в смазке)
    refVcHss: number;          // м/мин, ориентир для быстрореза
    refVcCarbide: number;      // м/мин, ориентир для твёрдого сплава
    kc: number;                // Н/мм², удельная сила резания
    rustSensitive: boolean;    // склонность к коррозии
    stainSensitive: boolean;   // чувствительность к щелочным СОЖ (пятна, потемнение)
    sulfurSensitive: boolean;  // чувствительность к активной сере
    chlorineSensitive: boolean;// чувствительность к хлорсодержащим присадкам
    fireHazard: boolean;       // пожароопасная стружка
    dryPreferred: boolean;     // материал хорошо обрабатывается всухую / с минимальной смазкой
}
