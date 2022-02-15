export const generateArrayOfNumbers = ({ length }) => {
  return Array.from({ length }, (_, idx) => idx + 1);
};
