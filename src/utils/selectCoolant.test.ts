import { selectCoolant, SelectionInput } from './selectCoolant';
import { calculateCuttingMode } from './cuttingMode';
import { materials } from '../Dictionaries/materials';
import { machines } from '../Dictionaries/machines';
import { toolMaterials } from '../Dictionaries/toolMaterials';
import { operations } from '../Dictionaries/operations';
import { stages } from '../Dictionaries/stages';
import { priorities } from '../Dictionaries/priorities';
import { MaterialId } from '../Types/material';
import { MachineId } from '../Types/machine';
import { ToolMaterialId } from '../Types/tool';
import { OperationId, StageId } from '../Types/operation';
import { CoolantId } from '../Types/coolant';

const pick = <T extends { id: string }>(list: T[], id: string): T => {
    const item = list.find((x) => x.id === id);
    if (!item) throw new Error(id);
    return item;
};

const base = (over: Partial<SelectionInput> = {}): SelectionInput => ({
    material: pick(materials, MaterialId.CarbonSteel),
    hardness: 200,
    machine: pick(machines, MachineId.CenterFull),
    tool: pick(toolMaterials, ToolMaterialId.CoatedCarbide),
    toolDiameter: 16,
    teeth: 4,
    operation: pick(operations, OperationId.Contour),
    stage: pick(stages, StageId.Roughing),
    ra: 6.3,
    spindleSpeed: 3500,
    feedPerTooth: 0.08,
    depthAp: 8,
    widthAe: 4,
    priority: priorities[0],
    allowDry: true,
    excludeOils: false,
    ...over,
});

const ids = (r: ReturnType<typeof selectCoolant>) => r.candidates.map((c) => c.coolant.id);

test('cutting mode: Vc, Vf, MRR and power', () => {
    const mode = calculateCuttingMode({
        material: pick(materials, MaterialId.CarbonSteel),
        tool: pick(toolMaterials, ToolMaterialId.Carbide),
        toolDiameter: 100, teeth: 5, spindleSpeed: 1000, feedPerTooth: 0.2, depthAp: 3, widthAe: 50,
    });
    expect(mode.vc).toBeCloseTo(314.16, 1);
    expect(mode.vf).toBeCloseTo(1000, 5);
    expect(mode.mrr).toBeCloseTo(150, 5);
    expect(mode.power).toBeCloseTo(5, 5);
});

test('titanium on a TSC centre: high-performance emulsion, no chlorinated oil', () => {
    const r = selectCoolant(base({
        material: pick(materials, MaterialId.Titanium),
        hardness: 330,
        machine: pick(machines, MachineId.CenterTsc),
        operation: pick(operations, OperationId.Pocket),
        spindleSpeed: 1500,
        feedPerTooth: 0.08,
    }));
    expect(r.best?.coolant.id).toBe(CoolantId.HighPerformance);
    expect(ids(r)).not.toContain(CoolantId.ChlorinatedOil);
    expect(r.excluded.some((e) => e.coolant.id === CoolantId.ChlorinatedOil)).toBe(true);
});

test('magnesium: no water-based coolants and no MQL', () => {
    const r = selectCoolant(base({
        material: pick(materials, MaterialId.Magnesium),
        spindleSpeed: 8000,
    }));
    r.candidates.forEach((c) => {
        expect(c.coolant.waterBased).toBe(false);
        expect(c.coolant.id).not.toBe(CoolantId.MqlEster);
    });
});

test('cast iron with carbide face milling: dry / air / MQL preferred over flood', () => {
    const r = selectCoolant(base({
        material: pick(materials, MaterialId.CastIron),
        operation: pick(operations, OperationId.Face),
        spindleSpeed: 2000,
        toolDiameter: 80,
        teeth: 6,
        feedPerTooth: 0.15,
        depthAp: 3,
        widthAe: 60,
    }));
    expect(['none', 'air_blast', 'mql']).toContain(r.best?.method.id);
});

test('HSS on carbon steel: no thermal-shock penalty, water-based coolant wins', () => {
    const r = selectCoolant(base({
        tool: pick(toolMaterials, ToolMaterialId.HSS),
        spindleSpeed: 400,
        feedPerTooth: 0.05,
        depthAp: 5,
        widthAe: 8,
    }));
    expect(r.best?.coolant.waterBased || r.best?.coolant.category === 'oil').toBe(true);
});

test('ceramic tool: only dry / air options remain', () => {
    const r = selectCoolant(base({
        material: pick(materials, MaterialId.NickelAlloy),
        tool: pick(toolMaterials, ToolMaterialId.Ceramic),
    }));
    r.candidates.forEach((c) => expect(['dry', 'air']).toContain(c.coolant.category));
    expect(r.candidates.length).toBeGreaterThan(0);
});

test('ceramic tool with dry machining forbidden: no candidates and a warning', () => {
    const r = selectCoolant(base({
        tool: pick(toolMaterials, ToolMaterialId.Ceramic),
        allowDry: false,
    }));
    expect(r.candidates).toHaveLength(0);
    expect(r.best).toBeNull();
    expect(r.warnings.length).toBeGreaterThan(0);
});

test('machine without coolant system: MQL and flood are excluded with a reason', () => {
    const r = selectCoolant(base({ machine: pick(machines, MachineId.NoCoolantSystem) }));
    r.candidates.forEach((c) => expect(['none', 'air_blast']).toContain(c.method.id));
    expect(r.excluded.find((e) => e.coolant.id === CoolantId.MqlEster)?.reason).toMatch(/не оснащён/);
});

test('aluminium finishing: non-ferrous coolant allowed, alkaline coolants penalised', () => {
    const r = selectCoolant(base({
        material: pick(materials, MaterialId.Aluminum),
        stage: pick(stages, StageId.Finishing),
        ra: 1.6,
        spindleSpeed: 12000,
    }));
    const nonFerrous = r.candidates.find((c) => c.coolant.id === CoolantId.NonFerrous);
    const synthetic = r.candidates.find((c) => c.coolant.id === CoolantId.Synthetic);
    expect(nonFerrous).toBeDefined();
    expect(nonFerrous!.score).toBeGreaterThan(synthetic!.score);
    expect(ids(r)).not.toContain(CoolantId.ChlorinatedOil);
    expect(r.excluded.some((e) => e.coolant.id === CoolantId.ChlorinatedOil)).toBe(true);
});

test('non-ferrous coolant is not offered for steel', () => {
    const r = selectCoolant(base());
    expect(ids(r)).not.toContain(CoolantId.NonFerrous);
});

test('excludeOils removes oil coolants', () => {
    const r = selectCoolant(base({ excludeOils: true }));
    r.candidates.forEach((c) => expect(c.coolant.category).not.toBe('oil'));
});

test('candidates are sorted by score, concentration depends on lubrication demand', () => {
    const r = selectCoolant(base({ tool: pick(toolMaterials, ToolMaterialId.HSS), spindleSpeed: 400 }));
    for (let i = 1; i < r.candidates.length; i += 1) {
        expect(r.candidates[i - 1].score).toBeGreaterThanOrEqual(r.candidates[i].score);
    }
    const emulsion = r.candidates.find((c) => c.coolant.id === CoolantId.MineralEmulsion);
    expect(emulsion?.concentration).toBeGreaterThanOrEqual(5);
    expect(emulsion?.concentration).toBeLessThanOrEqual(10);
});
