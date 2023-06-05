/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
import Cell from '../classes/roadElements/Cell';
import { RoadUser, RoadUserProps } from '../classes/trafficParticipants/RoadUser';
import { Direction } from '../utils/constants/Direction';
import { Color } from '../utils/constants/colors';

export interface EntitySpawnerProps {
  cell: Cell;
  roadUserCreator: (props: RoadUserProps) => RoadUser;
  dir: Direction;
  color?: Color;
}

class EntitySpawner {
  public spawn({ cell, roadUserCreator, dir, color }: EntitySpawnerProps): RoadUser | null {
    if (cell.getUser) return null;

    const entity: RoadUser = roadUserCreator({ cell, dir, color });

    cell.setUser = entity;
    return entity;
  }
}

export default new EntitySpawner();
