import { FC } from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';
import Card from '../Card';
import NumberField from '../NumberField';
import { materials } from '../../Dictionaries/materials';
import { CubeIcon } from '../../icons';
import { ParamsProps } from '../types';

const WorkpieceParams: FC<ParamsProps> = ({ form, onChange }) => {
    return (
        <Card title="Параметры заготовки" icon={<CubeIcon color="action" />}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Autocomplete
                    options={materials}
                    getOptionLabel={(option) => option.label}
                    value={form.material}
                    onChange={(_, value) => onChange({ material: value })}
                    renderInput={(params) => <TextField {...params} label="Обрабатываемый материал" />}
                />
                <NumberField
                    label="Твердость материала, HB"
                    value={form.hardness}
                    onChange={(hardness) => onChange({ hardness })}
                />
            </Box>
        </Card>
    );
};

export default WorkpieceParams;
