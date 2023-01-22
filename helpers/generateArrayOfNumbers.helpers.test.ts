import { generateArrayOfNumbers } from './generateArrayOfNumbers.helpers';

describe('generateArrayOfNumbers', () => {
    it('should return an array of 5 numbers starting at 1', () => {
        expect(generateArrayOfNumbers({ length: 5 })).toStrictEqual([
            1, 2, 3, 4, 5
        ]);
    });
});
