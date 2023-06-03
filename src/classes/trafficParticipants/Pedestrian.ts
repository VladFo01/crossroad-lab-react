/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-empty-interface */
import { Priority } from '../../utils/constants/Priority';
import { Velocity } from '../../utils/constants/Velocity';
import { getOppositeDirection } from '../../utils/helpers/getOppositeDirection';
import Cell from '../roadElements/Cell';
import { RoadUser, RoadUserProps } from './RoadUser';

interface PedestrianProps extends Pick<RoadUserProps, 'cell' | 'dir'> {}

export class Pedestrian extends RoadUser {
  constructor({ cell, dir }: PedestrianProps) {
    super({
      cell,
      dir,
      priority: Priority.PEDESTRIAN,
      vel: Velocity.PEDESTRIAN,
    });

    this.allowedCover = 'canWalk';
  }

  public static override createRoadUser({ cell, dir }: PedestrianProps): Pedestrian {
    return new Pedestrian({ dir, cell });
  }

  protected override nextCellBusyHandler(nextCell: Cell): boolean {
    if (nextCell.getUser) {
      if (nextCell.getUser instanceof Pedestrian) {
        this.direction = getOppositeDirection(this.direction);
        nextCell = this.calculateNextCell(this.currentVelocity);
        return true;
      }
      return false;
    }

    return true;
  }
}
