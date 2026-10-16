import { FC, useEffect, useState } from 'react';
import { TextField } from '@mui/material';

interface NumberFieldProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    step?: number;
    helperText?: string;
}

const toText = (value: number): string => (value === 0 ? '' : String(value));

/**
 * Числовое поле. Введённый текст хранится локально, поэтому поле можно полностью очистить
 * (в состоянии приложения при этом лежит 0), а ведущий ноль не подставляется.
 */
const NumberField: FC<NumberFieldProps> = ({ label, value, onChange, step, helperText }) => {
    const [text, setText] = useState<string>(toText(value));

    // Синхронизация при изменении значения извне (открытие файла, пример данных)
    useEffect(() => {
        setText((prev) => (Number(prev) === value ? prev : toText(value)));
    }, [value]);

    return (
        <TextField
            label={label}
            type="number"
            value={text}
            helperText={helperText}
            onChange={(e) => {
                setText(e.target.value);
                onChange(e.target.value === '' ? 0 : Number(e.target.value));
            }}
            slotProps={{ htmlInput: { min: 0, step } }}
            onKeyDown={(e) => { if (e.key === '-') e.preventDefault(); }}
        />
    );
};

export default NumberField;
