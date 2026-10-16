import { DeliveryMethod, DeliveryMethodInfo } from '../Types/coolant';

export const deliveryMethods: Record<DeliveryMethod, DeliveryMethodInfo> = {
    [DeliveryMethod.None]: {
        id: DeliveryMethod.None,
        label: 'Без подачи (сухая обработка)',
        coolingFactor: 1,
        flush: 0,
        parameters: 'Стружку удалять обдувом или пылесосом; следить за температурой инструмента.',
    },
    [DeliveryMethod.Flood]: {
        id: DeliveryMethod.Flood,
        label: 'Полив свободной струёй',
        coolingFactor: 1,
        flush: 6,
        parameters: 'Давление 2–6 бар; сопла направить в зону резания, струя должна попадать на режущую кромку.',
    },
    [DeliveryMethod.ThroughSpindle]: {
        id: DeliveryMethod.ThroughSpindle,
        label: 'Подача через шпиндель и инструмент (ВПШ)',
        coolingFactor: 1.1,
        flush: 10,
        parameters: 'Давление 20–70 бар; обязательна тонкая фильтрация (до 20–30 мкм); использовать фрезы с внутренними каналами.',
    },
    [DeliveryMethod.Mql]: {
        id: DeliveryMethod.Mql,
        label: 'Минимальное количество смазки (MQL)',
        coolingFactor: 1,
        flush: 3,
        parameters: 'Расход масла 10–100 мл/ч, давление воздуха 4–6 бар; подача через шпиндель или внешнюю форсунку.',
    },
    [DeliveryMethod.AirBlast]: {
        id: DeliveryMethod.AirBlast,
        label: 'Обдув сжатым воздухом',
        coolingFactor: 1,
        flush: 5,
        parameters: 'Давление воздуха 4–7 бар; сопло направить на зону резания и в сторону выхода стружки.',
    },
};
