import React from 'react';
import { View } from 'react-native';

import { VRIcon } from 'components';
import { generateArrayOfNumbers, getRatingValues } from 'helpers';
import { IconSize, Colors } from 'types';

const RatingStar = ({
    inputRating,
    average,
    size = 'md',
    color = Colors.primary
}: {
    inputRating: number;
    average: number;
    size: IconSize;
    color?: Colors;
}) => {
    const { ratingInteger, ratingFloat } = getRatingValues({
        average
    });
    const shouldRenderFullStar =
        ratingInteger >= inputRating ||
        (ratingInteger + 1 === inputRating && ratingFloat >= 75);

    const shouldRenderHalfStar =
        ratingFloat >= 25 &&
        ratingFloat <= 75 &&
        ratingInteger === inputRating - 1;

    const type = shouldRenderFullStar
        ? 'starFull'
        : shouldRenderHalfStar
        ? 'starHalf'
        : 'starEmpty';

    return <VRIcon type={type} color={color} key={inputRating} size={size} />;
};

const VRRatingsStars = ({
    average,
    size = 'md'
}: {
    average: number;
    size?: IconSize;
}) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            {generateArrayOfNumbers({ length: 5 }).map((inputRating) => {
                return (
                    <RatingStar
                        key={inputRating}
                        inputRating={inputRating}
                        average={average}
                        size={size}
                    />
                );
            })}
        </View>
    );
};

export default VRRatingsStars;
