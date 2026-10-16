import { FC } from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

const WarningIcon: FC<SvgIconProps> = (props) => (
    <SvgIcon {...props} viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </SvgIcon>
);

export default WarningIcon;
