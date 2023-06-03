import { Direction } from '../constants/Direction';

export const getOppositeDirection = (direction: Direction): Direction => {
  switch (direction) {
    case Direction.DOWN:
      return Direction.UP;
    case Direction.UP:
      return Direction.DOWN;
    case Direction.LEFT:
      return Direction.RIGHT;
    default:
      return Direction.LEFT;
  }
};
