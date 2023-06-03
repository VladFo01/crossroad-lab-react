/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
import Cell from '../classes/roadElements/Cell';
import { RoadUser, RoadUserProps } from '../classes/trafficParticipants/RoadUser';
import { Direction } from '../utils/constants/Direction';

export interface EntitySpawnerProps {
  cell: Cell;
  roadUserCreator: (props: RoadUserProps) => RoadUser;
  dir: Direction;
}

class EntitySpawner {
  public spawn({ cell, roadUserCreator, dir }): RoadUser {
    if (cell.getUser) return null;

    const entity: RoadUser = roadUserCreator({ cell, dir });

    cell.setUser = entity;
    return entity;
  }
}

export default new EntitySpawner();
