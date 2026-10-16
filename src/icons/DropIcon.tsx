import { FC } from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

const DropIcon: FC<SvgIconProps> = (props) => (
    <SvgIcon {...props} viewBox="0 0 24 24">
        <path d="M12 2.5c-3.5 4.6-6 7.7-6 11a6 6 0 0 0 12 0c0-3.3-2.5-6.4-6-11z" />
    </SvgIcon>
);

export default DropIcon;
