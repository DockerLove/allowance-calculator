import { Machine, MachineId } from '../Types/machine';
import { DeliveryMethod } from '../Types/coolant';

export const machines: Machine[] = [
    {
        id: MachineId.VerticalBasic,
        label: 'Вертикально-фрезерный станок (полив, обдув)',
        power: 7.5,
        methods: [DeliveryMethod.Flood, DeliveryMethod.AirBlast],
    },
    {
        id: MachineId.CenterTsc,
        label: 'Обрабатывающий центр с подачей через шпиндель (ВПШ)',
        power: 15,
        methods: [DeliveryMethod.Flood, DeliveryMethod.ThroughSpindle, DeliveryMethod.AirBlast],
    },
    {
        id: MachineId.CenterMql,
        label: 'Обрабатывающий центр с системой MQL',
        power: 15,
        methods: [DeliveryMethod.Flood, DeliveryMethod.Mql, DeliveryMethod.AirBlast],
    },
    {
        id: MachineId.CenterFull,
        label: 'Обрабатывающий центр (ВПШ + MQL + обдув)',
        power: 22,
        methods: [DeliveryMethod.Flood, DeliveryMethod.ThroughSpindle, DeliveryMethod.Mql, DeliveryMethod.AirBlast],
    },
    {
        id: MachineId.NoCoolantSystem,
        label: 'Станок без системы подачи СОЖ (только обдув)',
        power: 5.5,
        methods: [DeliveryMethod.AirBlast],
    },
];
