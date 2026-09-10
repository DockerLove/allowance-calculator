import { FC } from 'react';
import { TextField, Box } from '@mui/material';
import Card from '../Card';

interface TargetParamsProps {
    targetDiameter: number;
    onTargetDiameterChange: (value: number) => void;
}

const TargetParams: FC<TargetParamsProps> = ({ targetDiameter, onTargetDiameterChange }) => {
    return (
        <Card title="Параметры детали">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="Требуемый диаметр детали, мм"
                    type="number"
                    value={targetDiameter}
                    onChange={(e) => onTargetDiameterChange(Number(e.target.value))}
                    slotProps={{ htmlInput: { min: 0 } }}
                    onKeyDown={(e) => { if (e.key === '-') e.preventDefault(); }}
                />
            </Box>
        </Card>
    );
};

export default TargetParams;