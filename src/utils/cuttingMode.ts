import { CuttingMode } from '../Types/calculation';
import { WorkMaterial } from '../Types/material';
import { ToolMaterial } from '../Types/tool';

interface CuttingModeInput {
    material: WorkMaterial;
    tool: ToolMaterial;
    toolDiameter: number;
    teeth: number;
    spindleSpeed: number;
    feedPerTooth: number;
    depthAp: number;
    widthAe: number;
}

/** Расчёт кинематических и силовых параметров режима фрезерования */
export function calculateCuttingMode(input: CuttingModeInput): CuttingMode {
    const { material, tool, toolDiameter, teeth, spindleSpeed, feedPerTooth, depthAp, widthAe } = input;

    const vc = (Math.PI * toolDiameter * spindleSpeed) / 1000;          // м/мин
    const vf = feedPerTooth * teeth * spindleSpeed;                      // мм/мин
    const removal = depthAp * widthAe * vf;                              // мм³/мин
    const mrr = removal / 1000;                                          // см³/мин
    const power = (removal * material.kc) / 60e6;                        // кВт

    const base = tool.base === 'hss' ? material.refVcHss : material.refVcCarbide;
    const vcRef = base * tool.vcFactor;

    return { vc, vf, mrr, power, vcRef, vcRatio: vc / vcRef };
}
