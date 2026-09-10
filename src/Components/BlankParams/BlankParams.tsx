import { FC } from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';
import Card from '../Card';
import { blankTypes } from '../../Dictionaries/blankTypes';
import { BlankType } from '../../Types/blank';

interface BlankParamsProps {
    value: BlankType | null;
    onChange: (value: BlankType | null) => void;
    diameter: number;
    onDiameterChange: (value: number) => void;
    length: number;
    onLengthChange: (value: number) => void;
}

const BlankParams: FC<BlankParamsProps> = ({
                                               value, onChange, diameter, onDiameterChange, length, onLengthChange,
                                           }) => {
    return (
        <Card title="Параметры заготовки">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Autocomplete
                    options={blankTypes}
                    getOptionLabel={(option) => option.label}
                    value={value}
                    onChange={(_, newValue) => onChange(newValue)}
                    renderInput={(params) => <TextField {...params} label="Вид заготовки" />}
                />
                <TextField
                    label="Диаметр заготовки, мм"
                    type="number"
                    value={diameter}
                    onChange={(e) => onDiameterChange(Number(e.target.value))}
                    slotProps={{ htmlInput: { min: 0 } }}
                    onKeyDown={(e) => { if (e.key === '-') e.preventDefault(); }}
                />
                <TextField
                    label="Длина заготовки, мм"
                    type="number"
                    value={length}
                    onChange={(e) => onLengthChange(Number(e.target.value))}
                    slotProps={{ htmlInput: { min: 0 } }}
                    onKeyDown={(e) => { if (e.key === '-') e.preventDefault(); }}
                />
            </Box>
        </Card>
    );
};

export default BlankParams;