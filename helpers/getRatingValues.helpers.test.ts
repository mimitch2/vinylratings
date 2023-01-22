import { getRatingValues } from './getRatingValues.helpers';

describe('getRatingValues', () => {
    it.each([
        [
            3.5,
            {
                preciseAverage: '3.50',
                ratingInteger: 3,
                ratingFloat: 50
            }
        ],
        [
            4.75666,
            {
                preciseAverage: '4.76',
                ratingInteger: 4,
                ratingFloat: 100
            }
        ],
        [
            3.24,
            {
                preciseAverage: '3.24',
                ratingInteger: 3,
                ratingFloat: 0
            }
        ]
    ])('should return correct values when average is %f', (input, expected) => {
        expect(getRatingValues({ average: input })).toStrictEqual(expected);
    });
});
