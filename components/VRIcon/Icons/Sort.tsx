import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const Sort = ({ size, color }: { size: number; color: string }) => {
    return (
        <Svg
            viewBox="0 0 320 512"
            style={{
                height: size,
                width: size
            }}
        >
            <G fill={color}>
                <Path d="M287.1 288h-255.9c-28.36 0-42.73 34.5-22.62 54.63l127.1 128c12.5 12.5 32.86 12.5 45.36 0l127.1-128C330.7 322.5 316.3 288 287.1 288zM160 448L32.05 320h255.9L160 448zM32.05 224h255.9c28.36 0 42.73-34.5 22.62-54.62l-127.1-128c-12.5-12.5-32.86-12.5-45.36 0L9.304 169.4C-10.69 189.5 3.682 224 32.05 224zM160 63.97L287.1 192h-255.9L160 63.97z" />
            </G>
        </Svg>
    );
};

export default Sort;
