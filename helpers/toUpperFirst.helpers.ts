export const toUpperFirst = (string: string) => {
    if (string.includes(' ')) {
        return string.split(' ').reduce((result, word) => {
            result = `${result}${result.length ? ' ' : ''}${word
                .charAt(0)
                .toUpperCase()}${word.slice(1)}`;

            return result;
        }, '');
    }
    return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
};
