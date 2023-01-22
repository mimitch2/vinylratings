import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const StarFull = ({ size, color }: { size: number; color: string }) => {
    return (
        <Svg
            viewBox="0 0 48 48"
            style={{
                height: size,
                width: size,
                marginHorizontal: -2,
                marginTop: -2
            }}
        >
            <G fill={color}>
                <Path d="m11.65 44 3.25-14.05L4 20.5l14.4-1.25L24 6l5.6 13.25L44 20.5l-10.9 9.45L36.35 44 24 36.55Z" />
            </G>
        </Svg>
    );
};

export default StarFull;
