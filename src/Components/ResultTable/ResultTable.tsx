import { FC } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import Card from '../Card';
import { CalculationRow } from '../../Types/calculation';

interface ResultTableProps {
    rows: CalculationRow[];
}

const ResultTable: FC<ResultTableProps> = ({ rows }) => {
    return (
        <Card title="Результаты расчета припусков">
            {rows.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                    Заполните параметры заготовки и выберите маршрут обработки, чтобы увидеть расчет.
                </Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Переход</TableCell>
                                <TableCell>Rz, мкм</TableCell>
                                <TableCell>h, мкм</TableCell>
                                <TableCell>ρ, мкм</TableCell>
                                <TableCell>ε, мкм</TableCell>
                                <TableCell>2Zmin, мкм</TableCell>
                                <TableCell>Расчетный диаметр, мм</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.transitionLabel}</TableCell>
                                    <TableCell>{row.rzPrev.toFixed(1)}</TableCell>
                                    <TableCell>{row.hPrev.toFixed(1)}</TableCell>
                                    <TableCell>{row.rhoPrev.toFixed(1)}</TableCell>
                                    <TableCell>{row.epsilon.toFixed(1)}</TableCell>
                                    <TableCell>{(2 * row.zMin).toFixed(1)}</TableCell>
                                    <TableCell>{row.diameter.toFixed(3)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Card>
    );
};

export default ResultTable;