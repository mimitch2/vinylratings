import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const Bolt = ({ size, color }: { size: number; color: string }) => {
    return (
        <Svg
            viewBox="0 0 448 512"
            style={{
                height: size,
                width: size
            }}
        >
            <G fill={color}>
                <Path d="M303.5 184.4L338.9 49.8 352 0 310.8 30.9 32 240v48l88.3 5.9 32.5 2.2-8.3 31.5L109.1 462.2 96 512l41.2-30.9L416 272V224l-88.3-5.9-32.5-2.2 8.3-31.5zM384 253.9V256L150.3 431.2l33.4-127 9.9-37.5L155 264.1l-91-6.1V256L297.7 80.8l-33.4 127-9.9 37.5 38.7 2.6 91 6.1z" />
            </G>
        </Svg>
    );
};

export default Bolt;
