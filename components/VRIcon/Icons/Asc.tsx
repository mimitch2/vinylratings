import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const Asc = ({ size, color }: { size: number; color: string }) => {
    return (
        <Svg
            viewBox="0 0 576 512"
            style={{
                height: size,
                width: size
            }}
        >
            <G fill={color}>
                <Path d="M304 208h128C440.8 208 448 200.8 448 192s-7.156-16-16-16h-128c-8.844 0-15.1 7.156-15.1 16S295.2 208 304 208zM304 336h192c8.844 0 16-7.156 16-16s-7.156-16-16-16h-192c-8.844 0-15.1 7.156-15.1 16S295.2 336 304 336zM304 80h64c8.844 0 16-7.156 16-16S376.8 48 368 48h-64c-8.844 0-15.1 7.156-15.1 16S295.2 80 304 80zM560 432h-256c-8.844 0-15.1 7.156-15.1 16S295.2 464 304 464h256c8.844 0 16-7.156 16-16S568.8 432 560 432zM224 352c-4.094 0-8.188 1.562-11.31 4.688L144 425.4V48C144 39.16 136.8 32 128 32S112 39.16 112 48v377.4l-68.69-68.69c-6.25-6.25-16.38-6.25-22.62 0s-6.25 16.38 0 22.62l96 96c6.25 6.25 16.38 6.25 22.62 0l96-96c6.25-6.25 6.25-16.38 0-22.62C232.2 353.6 228.1 352 224 352z" />
            </G>
        </Svg>
    );
};

export default Asc;
