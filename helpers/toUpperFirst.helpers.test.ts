import { toUpperFirst } from './toUpperFirst.helpers';

describe('toUpperFirst', () => {
    it.each([
        { input: 'hello', length: 1, expected: 'Hello' },
        {
            input: 'hello there doggo',
            length: 3,
            expected: 'Hello There Doggo'
        }
    ])(
        'should return upper first when there is/are $length word(s)',
        ({ input, expected }) => {
            expect(toUpperFirst(input)).toStrictEqual(expected);
        }
    );
});
