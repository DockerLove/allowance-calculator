import { FC } from 'react';
import { Box, LinearProgress, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import Card from '../Card';
import { CuttingMode, Demands } from '../../Types/calculation';

interface ModeSummaryProps {
    mode: CuttingMode;
    demands: Demands;
}

interface DemandBarProps {
    label: string;
    value: number;
}

const DemandBar: FC<DemandBarProps> = ({ label, value }) => (
    <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{label}</Typography>
            <Typography variant="body2">{value} / 10</Typography>
        </Box>
        <LinearProgress variant="determinate" value={value * 10} sx={{ height: 8, borderRadius: 4 }} />
    </Box>
);

const ModeSummary: FC<ModeSummaryProps> = ({ mode, demands }) => {
    return (
        <Card title="Расчетный режим и потребности процесса">
            <Table size="small">
                <TableBody>
                    <TableRow>
                        <TableCell>Скорость резания Vc, м/мин</TableCell>
                        <TableCell>
                            {mode.vc.toFixed(1)} (ориентир {mode.vcRef.toFixed(0)}, отношение {mode.vcRatio.toFixed(2)})
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Минутная подача Vf, мм/мин</TableCell>
                        <TableCell>{mode.vf.toFixed(0)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Объём снимаемого металла Q, см³/мин</TableCell>
                        <TableCell>{mode.mrr.toFixed(1)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Мощность резания Pc, кВт</TableCell>
                        <TableCell>{mode.power.toFixed(2)}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 2 }}>
                <DemandBar label="Потребность в охлаждении" value={demands.cooling} />
                <DemandBar label="Потребность в смазке" value={demands.lubrication} />
                <DemandBar label="Потребность в удалении стружки" value={demands.flush} />
            </Box>

            {demands.notes.length > 0 && (
                <Box component="ul" sx={{ mt: 2, mb: 0, pl: 3 }}>
                    {demands.notes.map((note) => (
                        <Typography component="li" variant="caption" color="text.secondary" key={note}>
                            {note}
                        </Typography>
                    ))}
                </Box>
            )}
        </Card>
    );
};

export default ModeSummary;
