import { FC } from 'react';
import { Box } from '@mui/material';
import Card from '../Card';
import NumberField from '../NumberField';
import { ParamsProps } from '../types';

const CuttingParams: FC<ParamsProps> = ({ form, onChange }) => {
    return (
        <Card title="Режимы резания">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <NumberField
                    label="Частота вращения шпинделя n, об/мин"
                    value={form.spindleSpeed}
                    step={50}
                    onChange={(spindleSpeed) => onChange({ spindleSpeed })}
                />
                <NumberField
                    label="Подача на зуб fz, мм/зуб"
                    value={form.feedPerTooth}
                    step={0.01}
                    onChange={(feedPerTooth) => onChange({ feedPerTooth })}
                />
                <NumberField
                    label="Глубина резания ap, мм"
                    value={form.depthAp}
                    step={0.5}
                    onChange={(depthAp) => onChange({ depthAp })}
                />
                <NumberField
                    label="Ширина фрезерования ae, мм"
                    value={form.widthAe}
                    step={0.5}
                    onChange={(widthAe) => onChange({ widthAe })}
                />
            </Box>
        </Card>
    );
};

export default CuttingParams;
