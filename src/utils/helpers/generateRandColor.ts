import { Color } from '../constants/colors';
import { generateRandNumber } from './generateRandNumber';

export const generateRandColor = (): Color => {
  const randIndex = generateRandNumber(0, 2);

  switch (randIndex) {
    case 0:
      return Color.GREEN;
    case 1:
      return Color.RED;
    case 2:
      return Color.YELLOW;
    default:
      return Color.GREEN;
  }
};
