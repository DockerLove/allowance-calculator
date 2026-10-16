import { Coolant, CoolantId, DeliveryMethod } from '../Types/coolant';

const { None, Flood, ThroughSpindle, Mql, AirBlast } = DeliveryMethod;

export const coolants: Coolant[] = [
    {
        id: CoolantId.Dry, label: 'Сухая обработка (без СОЖ)', category: 'dry',
        description: 'Обработка без жидкости. Тепло уходит в стружку; требуется эффективное удаление стружки.',
        cooling: 1, lubrication: 0, corrosionProtection: 8, ecology: 10, cost: 0,
        waterBased: false, flammable: false, chlorine: false, activeSulfur: false, alkaline: false,
        methods: [None],
    },
    {
        id: CoolantId.ColdAir, label: 'Охлаждённый сжатый воздух (вихревая трубка)', category: 'air',
        description: 'Воздух с температурой около −20…−30 °C. Отводит часть тепла и выдувает стружку.',
        cooling: 3.5, lubrication: 0.5, corrosionProtection: 8, ecology: 10, cost: 2,
        waterBased: false, flammable: false, chlorine: false, activeSulfur: false, alkaline: false,
        methods: [AirBlast],
    },
    {
        id: CoolantId.MqlEster, label: 'MQL — синтетический эфир / растительное масло', category: 'mql',
        description: 'Аэрозоль биоразлагаемого масла. Высокая смазка при минимальном расходе, деталь и стружка остаются сухими.',
        cooling: 3, lubrication: 8.5, corrosionProtection: 6, ecology: 8, cost: 5,
        waterBased: false, flammable: false, chlorine: false, activeSulfur: false, alkaline: false,
        methods: [Mql],
    },
    {
        id: CoolantId.StraightOil, label: 'Масляная СОЖ (минеральное масло с EP-присадками без хлора)', category: 'oil',
        description: 'Максимальная смазка и защита от коррозии, но слабое охлаждение; пожароопасна, образует масляный туман.',
        cooling: 3, lubrication: 9, corrosionProtection: 9, ecology: 3, cost: 6,
        waterBased: false, flammable: true, chlorine: false, activeSulfur: false, alkaline: false,
        methods: [Flood, ThroughSpindle],
    },
    {
        id: CoolantId.ChlorinatedOil, label: 'Сульфохлорированное масло (EP)', category: 'oil',
        description: 'Очень высокая смазывающая способность при низких скоростях резания. Токсично, неэкологично.',
        cooling: 2.5, lubrication: 10, corrosionProtection: 8, ecology: 1, cost: 6,
        waterBased: false, flammable: true, chlorine: true, activeSulfur: true, alkaline: false,
        methods: [Flood],
    },
    {
        id: CoolantId.MineralEmulsion, label: 'Эмульсия на минеральной основе (эмульсол)', category: 'emulsion',
        description: 'Универсальная и недорогая СОЖ общего назначения для чёрных металлов.',
        cooling: 7, lubrication: 6, corrosionProtection: 6, ecology: 4, cost: 3,
        waterBased: true, flammable: false, chlorine: false, activeSulfur: false, alkaline: false,
        concentration: [5, 10], methods: [Flood, ThroughSpindle],
    },
    {
        id: CoolantId.EsterEmulsion, label: 'Эмульсия на основе эфиров (био-эмульсол)', category: 'emulsion',
        description: 'Хорошая смазка и экологичность, увеличенный срок службы раствора.',
        cooling: 7, lubrication: 7.5, corrosionProtection: 6.5, ecology: 7, cost: 5,
        waterBased: true, flammable: false, chlorine: false, activeSulfur: false, alkaline: false,
        concentration: [5, 10], methods: [Flood, ThroughSpindle],
    },
    {
        id: CoolantId.SemiSynthetic, label: 'Полусинтетическая СОЖ (микроэмульсия)', category: 'semi',
        description: 'Хороший баланс охлаждения и смазки, чистота станка; щелочная среда.',
        cooling: 8, lubrication: 5.5, corrosionProtection: 6.5, ecology: 6, cost: 4,
        waterBased: true, flammable: false, chlorine: false, activeSulfur: false, alkaline: true,
        concentration: [4, 8], methods: [Flood, ThroughSpindle],
    },
    {
        id: CoolantId.Synthetic, label: 'Синтетическая СОЖ (водный раствор)', category: 'synthetic',
        description: 'Максимальное охлаждение и прозрачность раствора; смазывающая способность невысокая.',
        cooling: 9.5, lubrication: 3.5, corrosionProtection: 5, ecology: 7, cost: 4,
        waterBased: true, flammable: false, chlorine: false, activeSulfur: false, alkaline: true,
        concentration: [3, 6], methods: [Flood, ThroughSpindle],
    },
    {
        id: CoolantId.HighPerformance, label: 'Высокоэффективная эмульсия для труднообрабатываемых сплавов (EP, без хлора)', category: 'emulsion',
        description: 'Сочетает хорошее охлаждение с высокой смазкой; рассчитана на подачу под высоким давлением.',
        cooling: 8, lubrication: 8, corrosionProtection: 7, ecology: 5, cost: 8,
        waterBased: true, flammable: false, chlorine: false, activeSulfur: false, alkaline: false,
        concentration: [8, 12], methods: [Flood, ThroughSpindle],
    },
    {
        id: CoolantId.NonFerrous, label: 'Неокрашивающая СОЖ для цветных металлов (pH-нейтральная)', category: 'semi',
        description: 'Не вызывает потемнения алюминия и меди, снижает налипание стружки.',
        cooling: 8, lubrication: 7.5, corrosionProtection: 5, ecology: 6, cost: 5,
        waterBased: true, flammable: false, chlorine: false, activeSulfur: false, alkaline: false,
        concentration: [5, 8], methods: [Flood, ThroughSpindle], onlyGroups: ['N'],
    },
];
