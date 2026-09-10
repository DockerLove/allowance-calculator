export interface CalculationRow {
    transitionLabel: string;
    rzPrev: number;
    hPrev: number;
    rhoPrev: number;
    epsilon: number;
    zMin: number;      // мкм, на сторону
    diameter: number;  // расчетный диаметр после перехода, мм
}