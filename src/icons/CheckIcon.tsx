import { FC } from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

const CheckIcon: FC<SvgIconProps> = (props) => (
    <SvgIcon {...props} viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-2 15-5-5 1.4-1.4L10 14.2l7.6-7.6L19 8l-9 9z" />
    </SvgIcon>
);

export default CheckIcon;
