import { Coolant, DeliveryMethodInfo } from './coolant';

export interface CuttingMode {
    vc: number;       // м/мин
    vf: number;       // мм/мин
    mrr: number;      // см³/мин
    power: number;    // кВт
    vcRef: number;    // ориентирная скорость, м/мин
    vcRatio: number;  // vc / vcRef
}

export interface Demands {
    cooling: number;      // 0..10
    lubrication: number;  // 0..10
    flush: number;        // 0..10
    notes: string[];
}

export interface Reason {
    positive: boolean;
    text: string;
}

export interface Candidate {
    coolant: Coolant;
    method: DeliveryMethodInfo;
    score: number;                 // 0..100
    concentration: number | null;  // %
    reasons: Reason[];
}

export interface ExcludedItem {
    coolant: Coolant;
    reason: string;
}

export interface SelectionResult {
    mode: CuttingMode;
    demands: Demands;
    candidates: Candidate[];
    excluded: ExcludedItem[];
    best: Candidate | null;
    warnings: string[];
}
