import { FC } from 'react';
import { Autocomplete, TextField, Box, FormControlLabel, Switch } from '@mui/material';
import Card from '../Card';
import { priorities } from '../../Dictionaries/priorities';
import { DropIcon } from '../../icons';
import { ParamsProps } from '../types';

const PreferenceParams: FC<ParamsProps> = ({ form, onChange }) => {
    return (
        <Card title="Предпочтения и ограничения" icon={<DropIcon color="action" />}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Autocomplete
                    disableClearable
                    options={priorities}
                    getOptionLabel={(option) => option.label}
                    value={form.priority}
                    onChange={(_, value) => onChange({ priority: value })}
                    renderInput={(params) => <TextField {...params} label="Приоритет выбора" />}
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={form.allowDry}
                            onChange={(e) => onChange({ allowDry: e.target.checked })}
                        />
                    }
                    label="Допускать сухую обработку и воздушное охлаждение"
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={form.excludeOils}
                            onChange={(e) => onChange({ excludeOils: e.target.checked })}
                        />
                    }
                    label="Исключить масляные СОЖ"
                />
            </Box>
        </Card>
    );
};

export default PreferenceParams;
