import { FC } from 'react';
import { Autocomplete, TextField, Box, Typography } from '@mui/material';
import Card from '../Card';
import { machines } from '../../Dictionaries/machines';
import { deliveryMethods } from '../../Dictionaries/deliveryMethods';
import { ParamsProps } from '../types';

const MachineParams: FC<ParamsProps> = ({ form, onChange }) => {
    const machine = form.machine;

    return (
        <Card title="Параметры станка">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Autocomplete
                    options={machines}
                    getOptionLabel={(option) => option.label}
                    value={machine}
                    onChange={(_, value) => onChange({ machine: value })}
                    renderInput={(params) => <TextField {...params} label="Станок" />}
                />
                {machine && (
                    <Typography variant="caption" color="text.secondary">
                        Мощность: {machine.power} кВт. Доступные способы подачи:{' '}
                        {machine.methods.map((m) => deliveryMethods[m].label).join('; ')}.
                    </Typography>
                )}
            </Box>
        </Card>
    );
};

export default MachineParams;
