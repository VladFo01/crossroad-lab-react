/* eslint-disable no-continue */
/* eslint-disable consistent-return */

import Cell from './Cell';
import { conDirection } from '../../utils/constants/conDirection';
import Connection from './Connection';
import Crossroad from './Crossroad';
import { SpawnPoint } from '../signs/SpawnPoint';
import Sidewalk from './Sidewalk';
import LinkedList from '../../services/LinkedList';
import { RoadUser } from '../trafficParticipants/RoadUser';
import { Direction } from '../../utils/constants/Direction';
import { Vehicle } from '../trafficParticipants/Vehicle';
import * as cover from '../../utils/constants/cellTypes';
import { Pedestrian } from '../trafficParticipants/Pedestrian';
import { TrafficLights } from '../signs/TrafficLights';

export default class RoadMatrix {
  // eslint-disable-next-line no-use-before-define
  private static instance: RoadMatrix;

  private matrix: Cell[][];
  private size: number;
  private movingLines: LinkedList<Cell>[];
  private highway: Connection[];
  private spawnpoints: SpawnPoint[];
  private sidewalks: Sidewalk[];
  private crossroads: Crossroad[];

  private constructor(size: number) {
    this.size = size;
    this.matrix = [];
    this.movingLines = [];
    this.highway = [];
    this.crossroads = [];
    this.sidewalks = [];
    this.spawnpoints = [];

    this.setMatrixCover();
  }

  private setMatrixCover() {
    // creating actual matrix
    for (let i = 0; i < this.size; i++) {
      this.matrix.push([]);
      for (let j = 0; j < this.size; j++) {
        this.matrix[i][j] = new Cell(this, i, j);
      }
    }

    // setup highways
    this.highway.push(new Connection(this, 0, 3, conDirection.Horizontal, 20));
    this.highway.push(new Connection(this, 0, 15, conDirection.Horizontal, 20));
    this.highway.push(new Connection(this, 4, 0, conDirection.Vertical, 20));
    this.highway.push(new Connection(this, 14, 0, conDirection.Vertical, 20));

    // setup crossroads
    this.createCrossroad(4, 3);
    this.createCrossroad(14, 3);
    this.createCrossroad(4, 15);
    this.createCrossroad(14, 15);

    // settup sidewalks
    this.sidewalks.push(new Sidewalk(this, 3, 0, conDirection.Vertical, 20));
    this.sidewalks.push(new Sidewalk(this, 6, 0, conDirection.Vertical, 20));
    this.sidewalks.push(new Sidewalk(this, 13, 0, conDirection.Vertical, 20));
    this.sidewalks.push(new Sidewalk(this, 16, 0, conDirection.Vertical, 20));

    this.sidewalks.push(new Sidewalk(this, 0, 2, conDirection.Horizontal, 20));
    this.sidewalks.push(new Sidewalk(this, 0, 5, conDirection.Horizontal, 20));
    this.sidewalks.push(new Sidewalk(this, 0, 14, conDirection.Horizontal, 20));
    this.sidewalks.push(new Sidewalk(this, 0, 17, conDirection.Horizontal, 20));

    // setup spawnpoints
    this.spawnpoints.push(
      new SpawnPoint({
        cooldown: 4500,
        cell: this.board[0][4],
        dir: Direction.DOWN,
        roadUserCreator: Vehicle.createRoadUser,
      })
    );
    this.spawnpoints.push(
      new SpawnPoint({
        cooldown: 3000,
        cell: this.board[0][14],
        dir: Direction.DOWN,
        roadUserCreator: Vehicle.createRoadUser,
      })
    );

    this.spawnpoints.push(
      new SpawnPoint({
        cooldown: 6500,
        cell: this.board[19][5],
        dir: Direction.UP,
        roadUserCreator: Vehicle.createRoadUser,
      })
    );
    this.spawnpoints.push(
      new SpawnPoint({
        cooldown: 5000,
        cell: this.board[19][15],
        dir: Direction.UP,
        roadUserCreator: Vehicle.createRoadUser,
      })
    );

    this.spawnpoints.push(
      new SpawnPoint({
        cooldown: 3500,
        cell: this.board[4][0],
        dir: Direction.RIGHT,
        roadUserCreator: Vehicle.createRoadUser,
      })
    );
    this.spawnpoints.push(
      new SpawnPoint({
        cooldown: 4000,
        cell: this.board[16][0],
        dir: Direction.RIGHT,
        roadUserCreator: Vehicle.createRoadUser,
      })
    );

    this.spawnpoints.push(
      new SpawnPoint({
        cooldown: 5500,
        cell: this.board[3][19],
        dir: Direction.LEFT,
        roadUserCreator: Vehicle.createRoadUser,
      })
    );
    this.spawnpoints.push(
      new SpawnPoint({
        cooldown: 6000,
        cell: this.board[15][19],
        dir: Direction.LEFT,
        roadUserCreator: Vehicle.createRoadUser,
      })
    );

    this.spawnpoints.push(
      new SpawnPoint({
        cooldown: 6000,
        cell: this.board[0][13],
        dir: Direction.DOWN,
        roadUserCreator: Pedestrian.createRoadUser,
      })
    );
    this.spawnpoints.push(
      new SpawnPoint({
        cooldown: 6000,
        cell: this.board[0][3],
        dir: Direction.DOWN,
        roadUserCreator: Pedestrian.createRoadUser,
      })
    );
    this.spawnpoints.push(
      new SpawnPoint({
        cooldown: 6000,
        cell: this.board[17][0],
        dir: Direction.RIGHT,
        roadUserCreator: Pedestrian.createRoadUser,
      })
    );
  }

  public static createOnce(size: number): RoadMatrix {
    if (!RoadMatrix.instance) RoadMatrix.instance = new RoadMatrix(size);
    return RoadMatrix.instance;
  }

  private createCrossroad(xCoord: number, yCoord: number): void | string {
    if (this.size - 2 <= xCoord || this.size - 2 <= yCoord)
      return 'Invalid coordinates for the crossroad';

    const crossroad = new Crossroad(this, 2, xCoord, yCoord);

    this.crossroads.push(crossroad);
  }

  public getCell(x: number, y: number): Cell | null {
    if (x >= this.size || y >= this.size || x < 0 || y < 0) return null;
    return this.matrix[x][y];
  }

  public getMovingLines(): LinkedList<Cell>[] {
    return this.movingLines;
  }

  get board(): Cell[][] {
    return this.matrix;
  }

  get scale(): number {
    return this.size;
  }

  public print(): void {
    // console.clear();

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        // print element based on covering of the cell

        if (this.matrix[i][j].getUser instanceof Vehicle) {
          process.stdout.write('V ');
          continue;
        }

        if (this.matrix[i][j].getUser instanceof Pedestrian) {
          process.stdout.write('P ');
          continue;
        }

        switch (this.matrix[i][j].getCover) {
          case cover.roadCover:
            process.stdout.write('* ');
            break;
          case cover.sidewalkCover:
            process.stdout.write('- ');
            break;
          case cover.crossroadCover:
            process.stdout.write('C ');
            break;
          case cover.crosswalkCover:
            if (
              this.matrix[i][j].getSign instanceof TrafficLights &&
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              !this.matrix[i][j].getSign.canMoveCar
            ) {
              process.stdout.write('\x1b[91m= \x1b[39m');
            } else process.stdout.write('\x1b[32m= \x1b[39m');
            break;
          case cover.notACover:
            process.stdout.write('  ');
            break;
          default:
            console.log(`Cannot resolve type of cover in the cell [${i},${j}]`);
            return;
        }
      }
      process.stdout.write('\n');
    }
    process.stdout.write('\n');
    console.log(`\n`);

    console.log(`V -> Vehicle`);
    console.log(`* -> Road`);
    console.log(`C -> Crossroad`);
    console.log(`- -> Sidewalk`);
    console.log(`P -> Pedestrian`);
    console.log(`\x1b[32m= -> Crosswalk (allowed to be used by cars)\x1b[39m`);
    console.log(`\x1b[91m= -> Crosswalk (allowed to be used by pedestrians)\x1b[39m\n\n`);
  }

  public makeOneIteration(): void {
    const lines = this.getMovingLines();
    const moved: RoadUser[] = [];
    lines.forEach((list) =>
      list.traverse().forEach((cell) => {
        if (cell.getUser && !moved.includes(cell.getUser)) {
          moved.push(cell.getUser);
          cell.getUser.move();
        }
      })
    );
  }
}
