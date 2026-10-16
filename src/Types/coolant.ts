import { IsoGroup } from './material';

export enum DeliveryMethod {
    None = 'none',
    Flood = 'flood',
    ThroughSpindle = 'through_spindle',
    Mql = 'mql',
    AirBlast = 'air_blast',
}

export interface DeliveryMethodInfo {
    id: DeliveryMethod;
    label: string;
    coolingFactor: number;  // множитель охлаждающей способности
    flush: number;          // 0..10 эффективность удаления стружки
    parameters: string;     // ориентировочные параметры подачи
}

export enum CoolantId {
    Dry = 'dry',
    ColdAir = 'cold_air',
    MqlEster = 'mql_ester',
    StraightOil = 'straight_oil',
    ChlorinatedOil = 'chlorinated_oil',
    MineralEmulsion = 'mineral_emulsion',
    EsterEmulsion = 'ester_emulsion',
    SemiSynthetic = 'semi_synthetic',
    Synthetic = 'synthetic',
    HighPerformance = 'high_performance',
    NonFerrous = 'non_ferrous',
}

export type CoolantCategory = 'dry' | 'air' | 'oil' | 'emulsion' | 'semi' | 'synthetic' | 'mql';

export interface Coolant {
    id: CoolantId;
    label: string;
    category: CoolantCategory;
    description: string;
    cooling: number;              // 0..10
    lubrication: number;          // 0..10
    corrosionProtection: number;  // 0..10
    ecology: number;              // 0..10, больше — лучше
    cost: number;                 // 0..10, больше — дороже
    waterBased: boolean;
    flammable: boolean;
    chlorine: boolean;            // содержит хлорсодержащие присадки
    activeSulfur: boolean;        // содержит активную серу
    alkaline: boolean;            // высокощелочная (pH > 9), окрашивает цветные сплавы
    concentration?: [number, number]; // % рабочего раствора
    methods: DeliveryMethod[];
    onlyGroups?: IsoGroup[];      // ограничение по группам обрабатываемых материалов
}
