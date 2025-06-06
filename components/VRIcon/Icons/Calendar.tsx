import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const Calendar = ({ size, color }: { size: number; color: string }) => {
    return (
        <Svg
            viewBox="0 0 448 512"
            style={{
                height: size,
                width: size
            }}
        >
            <G fill={color}>
                <Path d="M112 0c8.8 0 16 7.2 16 16V64H320V16c0-8.8 7.2-16 16-16s16 7.2 16 16V64h32c35.3 0 64 28.7 64 64v32 32V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V192 160 128C0 92.7 28.7 64 64 64H96V16c0-8.8 7.2-16 16-16zM416 192H32V448c0 17.7 14.3 32 32 32H384c17.7 0 32-14.3 32-32V192zM384 96H64c-17.7 0-32 14.3-32 32v32H416V128c0-17.7-14.3-32-32-32z" />
            </G>
        </Svg>
    );
};

export default Calendar;
