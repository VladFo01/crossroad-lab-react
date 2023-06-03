/* eslint-disable no-param-reassign */

import LinkedList from '../../services/LinkedList';
import { crosswalkCover, sidewalkCover } from '../../utils/constants/cellTypes';
import { conDirection } from '../../utils/constants/conDirection';
import { Direction } from '../../utils/constants/Direction';
import { trafficLightsCooldown } from '../../utils/constants/trafficLightsCooldown';
import { SignToChangeDirection } from '../signs/SingToChangeDirection';
import { TrafficLights } from '../signs/TrafficLights';
import Cell from './Cell';
import RoadMatrix from './RoadMatrix';

export default class Sidewalk {
  constructor(matrix: RoadMatrix, x: number, y: number, direction: conDirection, length: number) {
    const list = new LinkedList<Cell>();

    if (direction === conDirection.Horizontal) {
      for (let i = x; i < x + length; i++) {
        if (matrix.board[y][i].getCover.canDrive) {
          matrix.board[y][i].setCover = crosswalkCover;
          matrix.board[y][i].setSign = new TrafficLights({
            defaultCanMove: false,
            cooldown: trafficLightsCooldown * 1000,
          });
        } else matrix.board[y][i].setCover = sidewalkCover;

        if (matrix.board[y + 1][i].getCover.canWalk) {
          matrix.board[y][i].setSign = new SignToChangeDirection({
            possibleDirections: [Direction.DOWN, Direction.UP, Direction.LEFT, Direction.RIGHT],
          });
        }

        list.pushBack(matrix.board[y][i]);
      }
    } else {
      for (let i = y; i < y + length; i++) {
        if (matrix.board[i][x].getCover.canDrive) {
          matrix.board[i][x].setCover = crosswalkCover;
          matrix.board[i][x].setSign = new TrafficLights({
            defaultCanMove: true,
            cooldown: trafficLightsCooldown * 1000,
          });
        } else matrix.board[i][x].setCover = sidewalkCover;

        if (matrix.board[i][x + 1].getCover.canWalk) {
          matrix.board[i][x].setSign = new SignToChangeDirection({
            possibleDirections: [Direction.DOWN, Direction.UP, Direction.LEFT, Direction.RIGHT],
          });
        }

        list.pushBack(matrix.board[i][x]);
      }
    }

    matrix.getMovingLines().push(list);
  }
}
