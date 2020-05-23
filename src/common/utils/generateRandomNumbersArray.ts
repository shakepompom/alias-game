const getRandomNumber = (max: number): number =>
  Math.floor(Math.random() * Math.floor(max));

export const generateRandomNumbersArray = (length: number): number[] => {
  const result: number[] = [];

  while (result.length < length) {
    const number = getRandomNumber(length);

    if (!result.includes(number)) {
      result.push(number);
    }
  }

  return result;
};
