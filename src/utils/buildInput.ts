import { FormState } from '../Types/form';
import { SelectionInput } from './selectCoolant';

export interface BuildResult {
    input: SelectionInput | null;
    errors: string[];
}

/** Проверка формы и преобразование её в входные данные алгоритма */
export function buildSelectionInput(form: FormState): BuildResult {
    const errors: string[] = [];

    if (!form.material) errors.push('Выберите материал заготовки');
    if (!form.machine) errors.push('Выберите станок');
    if (!form.toolMaterial) errors.push('Выберите материал фрезы');
    if (!form.operation) errors.push('Выберите вид фрезерования');
    if (!form.stage) errors.push('Выберите стадию обработки');
    if (form.hardness <= 0) errors.push('Укажите твёрдость материала, HB');
    if (form.toolDiameter <= 0) errors.push('Укажите диаметр фрезы');
    if (form.teeth <= 0) errors.push('Укажите число зубьев фрезы');
    if (form.ra <= 0) errors.push('Укажите требуемую шероховатость Ra');
    if (form.spindleSpeed <= 0) errors.push('Укажите частоту вращения шпинделя');
    if (form.feedPerTooth <= 0) errors.push('Укажите подачу на зуб');
    if (form.depthAp <= 0) errors.push('Укажите глубину резания ap');
    if (form.widthAe <= 0) errors.push('Укажите ширину фрезерования ae');
    if (form.toolDiameter > 0 && form.widthAe > form.toolDiameter) {
        errors.push('Ширина фрезерования ae не может превышать диаметр фрезы');
    }

    if (errors.length > 0 || !form.material || !form.machine || !form.toolMaterial || !form.operation || !form.stage) {
        return { input: null, errors };
    }

    return {
        errors,
        input: {
            material: form.material,
            hardness: form.hardness,
            machine: form.machine,
            tool: form.toolMaterial,
            toolDiameter: form.toolDiameter,
            teeth: form.teeth,
            operation: form.operation,
            stage: form.stage,
            ra: form.ra,
            spindleSpeed: form.spindleSpeed,
            feedPerTooth: form.feedPerTooth,
            depthAp: form.depthAp,
            widthAe: form.widthAe,
            priority: form.priority,
            allowDry: form.allowDry,
            excludeOils: form.excludeOils,
        },
    };
}
