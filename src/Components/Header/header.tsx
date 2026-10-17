import { ChangeEvent, FC, useRef } from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { MenuItem, MenuItemId } from './types';

const menuItems: MenuItem[] = [
    { id: 'open', title: 'Открыть расчет' },
    { id: 'save', title: 'Сохранить расчет' },
    { id: 'reset', title: 'Сбросить' },
];

interface HeaderProps {
    onOpen: (file: File) => void;
    onSave: () => void;
    onReset: () => void;
}

const Header: FC<HeaderProps> = ({ onOpen, onSave, onReset }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = (id: MenuItemId) => {
        if (id === 'open') inputRef.current?.click();
        if (id === 'save') onSave();
        if (id === 'reset') onReset();
    };

    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) onOpen(file);
        e.target.value = '';
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Автоматический выбор СОЖ для фрезерования
                </Typography>
                <Box>
                    {menuItems.map((mi) => (
                        <Button key={mi.id} color="inherit" onClick={() => handleClick(mi.id)}>
                            {mi.title}
                        </Button>
                    ))}
                </Box>
                <input
                    ref={inputRef}
                    type="file"
                    accept=".json,application/json"
                    hidden
                    onChange={handleFile}
                />
            </Toolbar>
        </AppBar>
    );
};

export default Header;