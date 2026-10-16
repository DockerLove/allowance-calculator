import { useCallback, useState } from 'react';
import { Alert, Box, Snackbar } from '@mui/material';
import Header from './Components/Header';
import Content from './Components/Content';
import { FormState } from './Types/form';
import { defaultForm, exampleForm } from './utils/formState';
import { downloadText, parseForm, serializeForm } from './utils/calculationFile';

interface Message {
    text: string;
    severity: 'success' | 'error';
}

function App() {
    const [form, setForm] = useState<FormState>(defaultForm);
    const [message, setMessage] = useState<Message | null>(null);

    const handleChange = useCallback((patch: Partial<FormState>) => {
        setForm((prev) => ({ ...prev, ...patch }));
    }, []);

    const handleSave = () => {
        downloadText('coolant-calculation.json', serializeForm(form));
        setMessage({ text: 'Расчет сохранен в файл', severity: 'success' });
    };

    const handleOpen = async (file: File) => {
        try {
            setForm(parseForm(await file.text()));
            setMessage({ text: 'Расчет загружен', severity: 'success' });
        } catch (e) {
            setMessage({ text: e instanceof Error ? e.message : 'Не удалось открыть файл', severity: 'error' });
        }
    };

    return (
        <Box>
            <Header onOpen={handleOpen} onSave={handleSave} />
            <Content form={form} onChange={handleChange} onLoadExample={() => setForm(exampleForm)} />
            <Snackbar
                open={message !== null}
                autoHideDuration={3000}
                onClose={() => setMessage(null)}
            >
                {message ? <Alert severity={message.severity}>{message.text}</Alert> : undefined}
            </Snackbar>
        </Box>
    );
}

export default App;
