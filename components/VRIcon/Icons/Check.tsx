import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const Check = ({ size, color }: { size: number; color: string }) => {
    return (
        <Svg
            viewBox="0 0 448 512"
            style={{
                height: size,
                width: size
            }}
        >
            <G fill={color}>
                <Path d="M443.3 100.7C449.6 106.9 449.6 117.1 443.3 123.3L171.3 395.3C165.1 401.6 154.9 401.6 148.7 395.3L4.686 251.3C-1.562 245.1-1.562 234.9 4.686 228.7C10.93 222.4 21.06 222.4 27.31 228.7L160 361.4L420.7 100.7C426.9 94.44 437.1 94.44 443.3 100.7H443.3z" />
            </G>
        </Svg>
    );
};

export default Check;
