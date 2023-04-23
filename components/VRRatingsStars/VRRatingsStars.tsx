import React from 'react';

import { VRIcon } from 'components';
import { generateArrayOfNumbers, getRatingValues } from 'helpers';
import { IconSize, Colors } from 'types';
import { Layout } from '@ui-kitten/components';

const RatingStar = ({
    inputRating,
    average,
    size = 'md',
    color = Colors.warning
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
        <Layout style={{ flexDirection: 'row' }}>
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
        </Layout>
    );
};

export default VRRatingsStars;
