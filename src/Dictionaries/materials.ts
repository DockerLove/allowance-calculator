import { MaterialId, WorkMaterial } from '../Types/material';

export const materials: WorkMaterial[] = [
    {
        id: MaterialId.CarbonSteel, label: 'Углеродистая сталь (Сталь 45)', isoGroup: 'P',
        heat: 5, adhesion: 5, refVcHss: 30, refVcCarbide: 180, kc: 2000,
        rustSensitive: true, stainSensitive: false, sulfurSensitive: false, chlorineSensitive: false,
        fireHazard: false, dryPreferred: false,
    },
    {
        id: MaterialId.AlloySteel, label: 'Легированная сталь (40Х, 12ХН3А)', isoGroup: 'P',
        heat: 6, adhesion: 5.5, refVcHss: 25, refVcCarbide: 150, kc: 2200,
        rustSensitive: true, stainSensitive: false, sulfurSensitive: false, chlorineSensitive: false,
        fireHazard: false, dryPreferred: false,
    },
    {
        id: MaterialId.HardenedSteel, label: 'Закалённая сталь (45–60 HRC)', isoGroup: 'H',
        heat: 8, adhesion: 3, refVcHss: 8, refVcCarbide: 80, kc: 2800,
        rustSensitive: true, stainSensitive: false, sulfurSensitive: false, chlorineSensitive: false,
        fireHazard: false, dryPreferred: true,
    },
    {
        id: MaterialId.StainlessSteel, label: 'Нержавеющая сталь (12Х18Н10Т)', isoGroup: 'M',
        heat: 7, adhesion: 8.5, refVcHss: 15, refVcCarbide: 100, kc: 2400,
        rustSensitive: false, stainSensitive: false, sulfurSensitive: false, chlorineSensitive: true,
        fireHazard: false, dryPreferred: false,
    },
    {
        id: MaterialId.CastIron, label: 'Серый чугун (СЧ20)', isoGroup: 'K',
        heat: 3, adhesion: 2, refVcHss: 20, refVcCarbide: 140, kc: 1100,
        rustSensitive: true, stainSensitive: false, sulfurSensitive: false, chlorineSensitive: false,
        fireHazard: false, dryPreferred: true,
    },
    {
        id: MaterialId.Aluminum, label: 'Алюминиевый сплав (Д16, АК6)', isoGroup: 'N',
        heat: 3, adhesion: 8, refVcHss: 200, refVcCarbide: 600, kc: 700,
        rustSensitive: false, stainSensitive: true, sulfurSensitive: true, chlorineSensitive: false,
        fireHazard: false, dryPreferred: false,
    },
    {
        id: MaterialId.CopperAlloy, label: 'Латунь / бронза', isoGroup: 'N',
        heat: 2, adhesion: 3, refVcHss: 60, refVcCarbide: 250, kc: 800,
        rustSensitive: false, stainSensitive: false, sulfurSensitive: true, chlorineSensitive: false,
        fireHazard: false, dryPreferred: true,
    },
    {
        id: MaterialId.Titanium, label: 'Титановый сплав (ВТ6)', isoGroup: 'S',
        heat: 9, adhesion: 8, refVcHss: 20, refVcCarbide: 60, kc: 1400,
        rustSensitive: false, stainSensitive: false, sulfurSensitive: false, chlorineSensitive: true,
        fireHazard: false, dryPreferred: false,
    },
    {
        id: MaterialId.NickelAlloy, label: 'Жаропрочный никелевый сплав (ХН77ТЮР)', isoGroup: 'S',
        heat: 9.5, adhesion: 7, refVcHss: 8, refVcCarbide: 40, kc: 2800,
        rustSensitive: false, stainSensitive: false, sulfurSensitive: true, chlorineSensitive: true,
        fireHazard: false, dryPreferred: false,
    },
    {
        id: MaterialId.Magnesium, label: 'Магниевый сплав (МА2)', isoGroup: 'N',
        heat: 2, adhesion: 3, refVcHss: 300, refVcCarbide: 800, kc: 500,
        rustSensitive: false, stainSensitive: false, sulfurSensitive: false, chlorineSensitive: true,
        fireHazard: true, dryPreferred: true,
    },
];
