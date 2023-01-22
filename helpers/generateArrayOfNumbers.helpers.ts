export const generateArrayOfNumbers = ({ length }: { length: number }) => {
    return Array.from({ length }, (_, idx) => idx + 1);
};
