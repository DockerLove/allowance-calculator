import { FC } from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';
import Card from '../Card';
import NumberField from '../NumberField';
import { operations } from '../../Dictionaries/operations';
import { stages } from '../../Dictionaries/stages';
import { ParamsProps } from '../types';

const ProcessingParams: FC<ParamsProps> = ({ form, onChange }) => {
    return (
        <Card title="Параметры обработки">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Autocomplete
                    options={operations}
                    getOptionLabel={(option) => option.label}
                    value={form.operation}
                    onChange={(_, value) => onChange({ operation: value })}
                    renderInput={(params) => <TextField {...params} label="Вид фрезерования" />}
                />
                <Autocomplete
                    options={stages}
                    getOptionLabel={(option) => option.label}
                    value={form.stage}
                    onChange={(_, value) => onChange({ stage: value })}
                    renderInput={(params) => <TextField {...params} label="Стадия обработки" />}
                />
                <NumberField
                    label="Требуемая шероховатость Ra, мкм"
                    value={form.ra}
                    step={0.1}
                    onChange={(ra) => onChange({ ra })}
                />
            </Box>
        </Card>
    );
};

export default ProcessingParams;
