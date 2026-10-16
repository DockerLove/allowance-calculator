import { FC } from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';
import Card from '../Card';
import NumberField from '../NumberField';
import { toolMaterials } from '../../Dictionaries/toolMaterials';
import { ToolIcon } from '../../icons';
import { ParamsProps } from '../types';

const ToolParams: FC<ParamsProps> = ({ form, onChange }) => {
    return (
        <Card title="Параметры фрезы" icon={<ToolIcon color="action" />}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Autocomplete
                    options={toolMaterials}
                    getOptionLabel={(option) => option.label}
                    value={form.toolMaterial}
                    onChange={(_, value) => onChange({ toolMaterial: value })}
                    renderInput={(params) => <TextField {...params} label="Материал режущей части" />}
                />
                <NumberField
                    label="Диаметр фрезы D, мм"
                    value={form.toolDiameter}
                    onChange={(toolDiameter) => onChange({ toolDiameter })}
                />
                <NumberField
                    label="Число зубьев z"
                    value={form.teeth}
                    step={1}
                    onChange={(teeth) => onChange({ teeth })}
                />
            </Box>
        </Card>
    );
};

export default ToolParams;
