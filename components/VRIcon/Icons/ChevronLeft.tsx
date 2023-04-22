import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const ChevronLeft = ({ size, color }: { size: number; color: string }) => {
    return (
        <Svg
            viewBox="0 0 320 512"
            style={{
                height: size,
                width: size
            }}
        >
            <G fill={color}>
                <Path d="M20.7 267.3c-6.2-6.2-6.2-16.4 0-22.6l192-192c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6L54.6 256 235.3 436.7c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0l-192-192z" />
            </G>
        </Svg>
    );
};

export default ChevronLeft;
