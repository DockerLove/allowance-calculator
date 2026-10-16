import { FC } from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

const CubeIcon: FC<SvgIconProps> = (props) => (
    <SvgIcon {...props} viewBox="0 0 24 24">
        <path d="M12 2 3 7v10l9 5 9-5V7l-9-5zm0 2.3L18.7 8 12 11.7 5.3 8 12 4.3zM5 9.7l6 3.3v6.6l-6-3.3V9.7zm14 0v6.6l-6 3.3V13l6-3.3z" />
    </SvgIcon>
);

export default CubeIcon;
