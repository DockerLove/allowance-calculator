import { FC, useState, useMemo } from 'react';
import { Box } from '@mui/material';
import BlankParams from '../BlankParams';
import RouteParams from '../RouteParams';
import TargetParams from '../TargetParams';
import ResultTable from '../ResultTable';
import { BlankType } from '../../Types/blank';
import { Transition } from '../../Types/transition';
import { calculateAllowances } from '../../utils/calculateAllowances';

const Content: FC = () => {
    const [blank, setBlank] = useState<BlankType | null>(null);
    const [blankDiameter, setBlankDiameter] = useState<number>(0);
    const [blankLength, setBlankLength] = useState<number>(0);
    const [targetDiameter, setTargetDiameter] = useState<number>(0);
    const [route, setRoute] = useState<Transition[]>([]);

    const rows = useMemo(() => {
        if (!blank || route.length === 0) return [];
        return calculateAllowances({ blank, blankDiameter, blankLength, route });
    }, [blank, blankDiameter, blankLength, route]);

    return (
        <Box sx={{ display: 'flex', gap: 3, p: 3, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 320, flex: 1 }}>
                <BlankParams
                    value={blank}
                    onChange={setBlank}
                    diameter={blankDiameter}
                    onDiameterChange={setBlankDiameter}
                    length={blankLength}
                    onLengthChange={setBlankLength}
                />
                <TargetParams
                    targetDiameter={targetDiameter}
                    onTargetDiameterChange={setTargetDiameter}
                />
                <RouteParams value={route} onChange={setRoute} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 400, flex: 1.5 }}>
                <ResultTable rows={rows} />
            </Box>
        </Box>
    );
};

export default Content;