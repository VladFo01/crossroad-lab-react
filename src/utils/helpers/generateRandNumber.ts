export const generateRandNumber = (from: number, to: number): number => {
  const multip: number = to - from + 1;

  return Math.ceil(Math.random() * multip) + from - 1;
};
