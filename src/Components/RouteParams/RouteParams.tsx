import { FC } from 'react';
import { Autocomplete, TextField, Box, Typography } from '@mui/material';
import Card from '../Card';
import { transitions } from '../../Dictionaries/transitions';
import { Transition } from '../../Types/transition';

interface RouteParamsProps {
    value: Transition[];
    onChange: (value: Transition[]) => void;
}

const RouteParams: FC<RouteParamsProps> = ({ value, onChange }) => {
    return (
        <Card title="Маршрут обработки">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Autocomplete
                    multiple
                    options={transitions}
                    getOptionLabel={(option) => option.label}
                    value={value}
                    onChange={(_, newValue) => onChange(newValue)}
                    renderInput={(params) => <TextField {...params} label="Переходы обработки" />}
                />
                <Typography variant="caption" color="text.secondary">
                    Выбирайте переходы в порядке их выполнения.
                </Typography>
            </Box>
        </Card>
    );
};

export default RouteParams;