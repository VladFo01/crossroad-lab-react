import { RoadUser } from '../../trafficParticipants/RoadUser';
import { TrafficLightsStrategy } from './TrafficLightsStrategy';

export class PedestrianStrategy implements TrafficLightsStrategy {
  private canMove: boolean;

  constructor(canMove: boolean) {
    this.canMove = canMove;
  }

  public processRoadUser(roadUser: RoadUser): void {
    if (roadUser.getCell.getCover.canDrive) {
      return;
    }

    if (this.canMove) {
      roadUser.stop();
    } else {
      roadUser.go();
    }
  }
}
