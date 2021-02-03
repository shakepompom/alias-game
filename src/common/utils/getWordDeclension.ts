// How to set declensions in Array ['одно', 'два', 'пять']
export const getWordDeclension = (
  number: number,
  declensions: string[]
): string => {
  if ((!number && +number !== 0) || !declensions) {
    throw new Error('Function calls without arguments');
  }

  const isSingular = number % 10 === 1 && number % 100 !== 11;

  if (isSingular) {
    return declensions[0];
  }

  const isNominative =
    number % 10 >= 2 &&
    number % 10 <= 4 &&
    (number % 100 < 10 || number % 100 >= 20);

  if (isNominative) {
    return declensions[1];
  }

  return declensions[2];
};
