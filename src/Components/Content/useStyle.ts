import { SxProps, Theme } from '@mui/material';

interface Styles {
    root: SxProps<Theme>;
    column: SxProps<Theme>;
    columnWide: SxProps<Theme>;
}

export const useStyle = (): Styles => ({
    root: { display: 'flex', gap: 3, p: 3, flexWrap: 'wrap', alignItems: 'flex-start' },
    column: { display: 'flex', flexDirection: 'column', gap: 2, minWidth: 320, flex: 1 },
    columnWide: { display: 'flex', flexDirection: 'column', gap: 2, minWidth: 400, flex: 1.5 },
});
