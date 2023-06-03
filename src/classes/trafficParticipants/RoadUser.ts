import { Direction } from '../../utils/constants/Direction';
import { Priority } from '../../utils/constants/Priority';
import Cell from '../roadElements/Cell';

export interface RoadUserProps {
  cell: Cell;
  priority?: Priority;
  vel?: number;
  dir: Direction;
}

export class RoadUser {
  protected readonly maxVelocity: number;

  protected changeDirectionAmount: number;

  protected currentVelocity: number; // швидкість

  protected direction: Direction; // задання напрямку руху на площині

  protected isRoadFree: boolean; // для перевірки чи дозволено виконати наступний крок

  protected readonly priority: Priority | null;

  protected cell: Cell;

  protected allowedCover: string;

  constructor({ cell, priority, vel, dir }: RoadUserProps) {
    this.cell = cell;
    this.maxVelocity = vel;
    this.currentVelocity = this.maxVelocity;
    this.direction = dir;
    this.priority = priority;
    this.allowedCover = '';

    this.changeDirectionAmount = 0;
  }

  set setVelocity(vel: number) {
    this.currentVelocity = vel;
  }

  get getCell() {
    return this.cell;
  }

  get getVelocity() {
    return this.currentVelocity;
  }

  set setDirection(dir: Direction) {
    this.direction = dir;
  }

  get getDirection() {
    return this.direction;
  }

  get getPriority() {
    return this.priority;
  }

  get getChangeDirectionAmount() {
    return this.changeDirectionAmount;
  }

  public increaseChangeDirectionAmount(): void {
    this.changeDirectionAmount++;
  }

  public go(): void {
    this.currentVelocity = this.maxVelocity;
  }

  public stop(): void {
    this.currentVelocity = 0;
  }

  public static createRoadUser({ cell, dir }: RoadUserProps): RoadUser {
    return new RoadUser({
      cell,
      priority: null,
      vel: 0,
      dir,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  protected nextCellBusyHandler(nextCell: Cell): boolean {
    if (nextCell.getUser) return false;
    return true;
  }

  public move(): boolean | string {
    if (this.cell.getSign) {
      this.cell.getSign.callback(this, false);
    }

    let nextCell = this.calculateNextCell(this.maxVelocity);

    if (nextCell?.getSign) {
      nextCell.getSign.callback(this, true);
    }

    nextCell = this.calculateNextCell(this.currentVelocity);

    // якщо вийшли за краї матриці
    if (!nextCell) {
      this.cell.setUser = null; // звільнення старої клітинки
      return 'out of bounds';
    }

    // якщо по ній не можна проїхати
    if (!nextCell.getCover[this.allowedCover]) return false;

    // якщо наступна клітинка зайнята
    if (!this.nextCellBusyHandler(nextCell)) return false;

    this.cell.setUser = null; // звільнення старої клітинки

    this.cell = nextCell;
    this.cell.setUser = this;

    return true;
  }

  protected calculateNextCell(velocity: number): Cell | null {
    const xCurrent = this.cell.xCoordinate; // поточні координати
    const yCurrent = this.cell.yCoordinate;

    let xNew: number;
    let yNew: number; // кінцеві координати

    switch (
      this.direction // обчислення наступних координат
    ) {
      case 'Up':
        xNew = xCurrent;
        yNew = yCurrent - velocity;
        break;
      case 'Down':
        xNew = xCurrent;
        yNew = yCurrent + velocity;
        break;
      case 'Left':
        xNew = xCurrent - velocity;
        yNew = yCurrent;
        break;
      case 'Right':
        xNew = xCurrent + velocity;
        yNew = yCurrent;
        break;
      default:
        console.log(`Cannot recognize direction ${this.direction}`);
        return null;
    }

    return this.cell.getMatrix.getCell(xNew, yNew);
  }
}
