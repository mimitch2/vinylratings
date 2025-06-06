import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const Flashlight = ({ size, color }: { size: number; color: string }) => {
    return (
        <Svg
            viewBox="0 0 640 512"
            style={{
                height: size,
                width: size,
                transform: [{ rotate: '-90deg' }]
            }}
        >
            <G fill={color}>
                <Path d="M401.8 325.4l-8.1-5.4H384 32V192H384h9.7l8.1-5.4 31.5-21c24-16 50.8-27.1 78.7-32.9V379.3c-28-5.8-54.7-16.9-78.7-32.9l-31.5-21zM544 383.6V128.4c4.5-.3 9-.4 13.5-.4H608V384H557.5c-4.5 0-9-.1-13.5-.4zM0 352H32 384l31.5 21c42.1 28 91.5 43 142 43H608h32V384 128 96H608 557.5c-50.5 0-100 15-142 43L384 160H32 0v32V320v32zM224 240v32h16 64 16V240H304 240 224z" />
            </G>
        </Svg>
    );
};

export default Flashlight;
