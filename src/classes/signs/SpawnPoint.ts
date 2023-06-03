import { Direction } from '../../utils/constants/Direction';
import entitySpawner, { EntitySpawnerProps } from '../../services/EntitySpawner';
import { SignWithState, SignWithStateProps } from './SignWithState';
import { delay } from '../../utils/helpers/delay';
import Cell from '../roadElements/Cell';

interface SpawnPointProps extends SignWithStateProps, EntitySpawnerProps {}

export class SpawnPoint extends SignWithState {
  private cell: Cell;
  private dir: Direction;
  private roadUserCreator: EntitySpawnerProps['roadUserCreator'];

  constructor({ cooldown, image, cell, dir, roadUserCreator }: SpawnPointProps) {
    super({ cooldown, image });
    this.cell = cell;
    this.dir = dir;
    this.roadUserCreator = roadUserCreator;

    this.spawnRoadUser();
  }

  public async spawnRoadUser() {
    if (this.canChangeState()) {
      entitySpawner.spawn({
        cell: this.cell,
        roadUserCreator: this.roadUserCreator,
        dir: this.dir,
      });
    }

    await delay(1000);
    this.spawnRoadUser();
  }
}
