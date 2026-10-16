import { FC } from 'react';
import {
    Box, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,
} from '@mui/material';
import Card from '../Card';
import { Candidate, ExcludedItem } from '../../Types/calculation';

interface ResultTableProps {
    candidates: Candidate[];
    excluded: ExcludedItem[];
}

const ResultTable: FC<ResultTableProps> = ({ candidates, excluded }) => {
    return (
        <Card title="Рейтинг вариантов СОЖ">
            {candidates.length > 0 && (
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>№</TableCell>
                                <TableCell>СОЖ</TableCell>
                                <TableCell>Способ подачи</TableCell>
                                <TableCell>Конц., %</TableCell>
                                <TableCell sx={{ minWidth: 140 }}>Соответствие</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {candidates.map((c, index) => (
                                <TableRow key={c.coolant.id} selected={index === 0}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{c.coolant.label}</TableCell>
                                    <TableCell>{c.method.label}</TableCell>
                                    <TableCell>{c.concentration !== null ? c.concentration : '—'}</TableCell>
                                    <TableCell>
                                        <Typography variant="body2">{c.score.toFixed(1)}%</Typography>
                                        <LinearProgress variant="determinate" value={c.score} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {excluded.length > 0 && (
                <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>Исключённые варианты</Typography>
                    <Box component="ul" sx={{ m: 0, pl: 3 }}>
                        {excluded.map((item) => (
                            <Typography component="li" variant="caption" color="text.secondary" key={item.coolant.id}>
                                <b>{item.coolant.label}:</b> {item.reason}
                            </Typography>
                        ))}
                    </Box>
                </Box>
            )}
        </Card>
    );
};

export default ResultTable;
