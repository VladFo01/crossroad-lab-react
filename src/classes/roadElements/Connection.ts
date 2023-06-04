/* eslint-disable no-param-reassign */
import LinkedList from '../../services/LinkedList';
import { roadCover } from '../../utils/constants/cellTypes';
import { conDirection } from '../../utils/constants/conDirection';
import Cell from './Cell';
import RoadMatrix from './RoadMatrix';
import { Direction } from '../../utils/constants/Direction.ts';

export default class Connection {
  constructor(matrix: RoadMatrix, x: number, y: number, direction: conDirection, length: number) {
    const list1 = new LinkedList<Cell>();
    const list2 = new LinkedList<Cell>();

    if (direction === conDirection.Horizontal) {
      for (let i = x; i < x + length; i++) {
        matrix.board[y][i].setCover = roadCover;
        matrix.board[y + 1][i].setCover = roadCover;

        matrix.board[y][i].setDir = Direction.LEFT;
        matrix.board[y + 1][i].setDir = Direction.RIGHT;

        list1.pushFront(matrix.board[y][i]);
        list2.pushFront(matrix.board[y + 1][i]);
      }
    } else {
      for (let i = y; i < y + length; i++) {
        matrix.board[i][x].setCover = roadCover;
        matrix.board[i][x + 1].setCover = roadCover;

        matrix.board[i][x].setDir = Direction.DOWN;
        matrix.board[i][x + 1].setDir = Direction.UP;

        list1.pushFront(matrix.board[i][x]);
        list2.pushFront(matrix.board[i][x + 1]);
      }
    }
    matrix.getMovingLines().push(list1);
    matrix.getMovingLines().push(list2);
  }
}
