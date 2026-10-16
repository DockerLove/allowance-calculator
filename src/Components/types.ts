import { FormState } from '../Types/form';

/** Общие свойства блоков ввода параметров */
export interface ParamsProps {
    form: FormState;
    onChange: (patch: Partial<FormState>) => void;
}
