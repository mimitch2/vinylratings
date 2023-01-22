export const getRatingValues = ({ average }: { average: number }) => {
    const preciseAverage = average.toPrecision(3);
    const splitRating = preciseAverage.split('.');
    const ratingInteger = +splitRating[0];
    const ratingFloat = Math.round(+splitRating[1] / 50) * 50;

    return { preciseAverage, ratingInteger, ratingFloat };
};
