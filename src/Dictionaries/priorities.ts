import { Priority, PriorityId } from '../Types/operation';

export const priorities: Priority[] = [
    { id: PriorityId.Balanced, label: 'Сбалансированный выбор', performanceShare: 70, econ: 1, eco: 1, corr: 1 },
    { id: PriorityId.Quality, label: 'Максимальное качество и стойкость инструмента', performanceShare: 85, econ: 1, eco: 1, corr: 1 },
    { id: PriorityId.Economy, label: 'Минимальная стоимость', performanceShare: 65, econ: 3, eco: 0.5, corr: 0.5 },
    { id: PriorityId.Ecology, label: 'Экологичность и безопасность', performanceShare: 65, econ: 0.5, eco: 3, corr: 0.5 },
];
