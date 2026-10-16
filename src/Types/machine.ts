import { DeliveryMethod } from './coolant';

export enum MachineId {
    VerticalBasic = 'vertical_basic',
    CenterTsc = 'center_tsc',
    CenterMql = 'center_mql',
    CenterFull = 'center_full',
    NoCoolantSystem = 'no_coolant_system',
}

export interface Machine {
    id: MachineId;
    label: string;
    power: number;               // кВт
    methods: DeliveryMethod[];   // поддерживаемые способы подачи (сухая обработка доступна всегда)
}
