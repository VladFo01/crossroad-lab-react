import entitySpawner, { EntitySpawnerProps } from '../../services/EntitySpawner';
import { Direction } from '../../utils/constants/Direction';
import { Color } from '../../utils/constants/colors';
import { delay } from '../../utils/helpers/delay';
import Cell from '../roadElements/Cell';
import { SignWithState, SignWithStateProps } from './SignWithState';

interface SpawnPointProps extends SignWithStateProps, EntitySpawnerProps {}

export class SpawnPoint extends SignWithState {
  private cell: Cell;
  private dir: Direction;
  private color?: Color;
  private roadUserCreator: EntitySpawnerProps['roadUserCreator'];

  constructor({ cooldown, image, cell, dir, roadUserCreator, color }: SpawnPointProps) {
    super({ cooldown, image });
    this.cell = cell;
    this.dir = dir;
    this.color = color;
    this.roadUserCreator = roadUserCreator;

    this.spawnRoadUser();
  }

  public async spawnRoadUser() {
    if (this.canChangeState()) {
      entitySpawner.spawn({
        cell: this.cell,
        roadUserCreator: this.roadUserCreator,
        dir: this.dir,
        color: this.color,
      });
    }

    await delay(1000);
    this.spawnRoadUser();
  }
}
