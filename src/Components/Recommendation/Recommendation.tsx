import { FC } from 'react';
import { Alert, Box, Chip, Typography } from '@mui/material';
import Card from '../Card';
import { CheckIcon, DropIcon, WarningIcon } from '../../icons';
import { SelectionResult } from '../../Types/calculation';

interface RecommendationProps {
    result: SelectionResult;
}

const Recommendation: FC<RecommendationProps> = ({ result }) => {
    const { best, warnings } = result;

    return (
        <Card title="Рекомендуемая СОЖ" icon={<DropIcon color="primary" />}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {best ? (
                    <>
                        <Typography variant="h6">{best.coolant.label}</Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            <Chip color="primary" label={`Соответствие: ${best.score.toFixed(0)}%`} />
                            <Chip variant="outlined" label={best.method.label} />
                            {best.concentration !== null && (
                                <Chip variant="outlined" label={`Концентрация: ${best.concentration}%`} />
                            )}
                        </Box>
                        <Typography variant="body2">{best.coolant.description}</Typography>
                        <Typography variant="body2">
                            <b>Параметры подачи:</b> {best.method.parameters}
                        </Typography>

                        <Box>
                            {best.reasons.map((reason) => (
                                <Box key={reason.text} sx={{ display: 'flex', gap: 1, alignItems: 'flex-start', mb: 0.5 }}>
                                    {reason.positive ? (
                                        <CheckIcon fontSize="small" color="success" />
                                    ) : (
                                        <WarningIcon fontSize="small" color="warning" />
                                    )}
                                    <Typography variant="body2">{reason.text}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </>
                ) : (
                    <Typography variant="body2">Подходящих вариантов не найдено.</Typography>
                )}

                {warnings.map((warning) => (
                    <Alert severity="warning" key={warning}>{warning}</Alert>
                ))}
            </Box>
        </Card>
    );
};

export default Recommendation;
