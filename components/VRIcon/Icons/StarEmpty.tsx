import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const StarEmpty = ({ size, color }: { size: number; color: string }) => {
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
                <Path d="m16.15 37.75 7.85-4.7 7.85 4.75-2.1-8.9 6.9-6-9.1-.8L24 13.7l-3.55 8.35-9.1.8 6.9 6ZM11.65 44l3.25-14.05L4 20.5l14.4-1.25L24 6l5.6 13.25L44 20.5l-10.9 9.45L36.35 44 24 36.55ZM24 26.25Z" />
            </G>
        </Svg>
    );
};

export default StarEmpty;
