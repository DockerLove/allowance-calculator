import { FC } from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

const menuItems = [
    { id: 'open', title: 'Открыть расчет' },
    { id: 'save', title: 'Сохранить расчет' },
];

const Header: FC = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Расчет припусков на механическую обработку
                </Typography>
                <Box>
                    {menuItems.map((mi) => (
                        <Button key={mi.id} color="inherit">{mi.title}</Button>
                    ))}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;