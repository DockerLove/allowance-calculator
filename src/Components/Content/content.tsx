import { FC, useMemo } from 'react';
import { Box, Button, Typography } from '@mui/material';
import WorkpieceParams from '../WorkpieceParams';
import MachineParams from '../MachineParams';
import ToolParams from '../ToolParams';
import ProcessingParams from '../ProcessingParams';
import CuttingParams from '../CuttingParams';
import PreferenceParams from '../PreferenceParams';
import ModeSummary from '../ModeSummary';
import Recommendation from '../Recommendation';
import ResultTable from '../ResultTable';
import Card from '../Card';
import { FormState } from '../../Types/form';
import { buildSelectionInput } from '../../utils/buildInput';
import { selectCoolant } from '../../utils/selectCoolant';
import { useStyle } from './useStyle';

interface ContentProps {
    form: FormState;
    onChange: (patch: Partial<FormState>) => void;
    onLoadExample: () => void;
}

const Content: FC<ContentProps> = ({ form, onChange, onLoadExample }) => {
    const styles = useStyle();

    const { result, errors } = useMemo(() => {
        const { input, errors } = buildSelectionInput(form);
        return { result: input ? selectCoolant(input) : null, errors };
    }, [form]);

    return (
        <Box sx={styles.root}>
            <Box sx={styles.column}>
                <WorkpieceParams form={form} onChange={onChange} />
                <MachineParams form={form} onChange={onChange} />
                <ToolParams form={form} onChange={onChange} />
                <ProcessingParams form={form} onChange={onChange} />
                <CuttingParams form={form} onChange={onChange} />
                <PreferenceParams form={form} onChange={onChange} />
            </Box>
            <Box sx={styles.columnWide}>
                {result ? (
                    <>
                        <Recommendation result={result} />
                        <ModeSummary mode={result.mode} demands={result.demands} />
                        <ResultTable candidates={result.candidates} excluded={result.excluded} />
                    </>
                ) : (
                    <Card title="Результаты подбора СОЖ">
                        <Typography variant="body2" color="text.secondary">
                            Заполните исходные данные, чтобы увидеть рекомендацию.
                        </Typography>
                        <Box component="ul" sx={{ pl: 3 }}>
                            {errors.map((error) => (
                                <Typography component="li" variant="caption" color="text.secondary" key={error}>
                                    {error}
                                </Typography>
                            ))}
                        </Box>
                        <Button variant="outlined" size="small" onClick={onLoadExample}>
                            Заполнить примером
                        </Button>
                    </Card>
                )}
            </Box>
        </Box>
    );
};

export default Content;
