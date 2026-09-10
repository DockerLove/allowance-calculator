import { BlankType } from '../Types/blank';
import { Transition } from '../Types/transition';
import { CalculationRow } from '../Types/calculation';

interface CalculationInput {
    blank: BlankType;
    blankDiameter: number;
    blankLength: number;
    route: Transition[];
}

export function calculateAllowances({ blank, blankDiameter, blankLength, route }: CalculationInput): CalculationRow[] {
    const rows: CalculationRow[] = [];

    let rzPrev = blank.rz0;
    let hPrev = blank.h0;
    let rhoPrev = blank.rhoK * blankLength;
    let diameter = blankDiameter;

    route.forEach((transition) => {
        const epsilon = transition.epsilon;
        const zMin = rzPrev + hPrev + Math.sqrt(rhoPrev ** 2 + epsilon ** 2);
        diameter = diameter - (2 * zMin) / 1000;

        rows.push({
            transitionLabel: transition.label,
            rzPrev,
            hPrev,
            rhoPrev,
            epsilon,
            zMin,
            diameter,
        });

        rzPrev = transition.rz;
        hPrev = transition.h;
        rhoPrev = rhoPrev * transition.ky;
    });

    return rows;
}