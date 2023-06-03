/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable class-methods-use-this */
import { Priority } from '../../utils/constants/Priority';
import { Velocity } from '../../utils/constants/Velocity';
import { RoadUser, RoadUserProps } from './RoadUser';

interface VehicleProps extends Pick<RoadUserProps, 'cell' | 'dir'> {}

export class Vehicle extends RoadUser {
  constructor({ cell, dir }: VehicleProps) {
    super({
      cell,
      dir,
      priority: Priority.VEHICLE,
      vel: Velocity.VEHICLE,
    });

    this.allowedCover = 'canDrive';
  }

  public static override createRoadUser({ cell, dir }: VehicleProps): Vehicle {
    return new Vehicle({ dir, cell });
  }
}
