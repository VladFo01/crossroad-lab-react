import { RoadUser } from '../../trafficParticipants/RoadUser';
import { TrafficLightsStrategy } from './TrafficLightsStrategy';

export class VehicleStrategy implements TrafficLightsStrategy {
  private canMove: boolean;

  constructor(canMove: boolean) {
    this.canMove = canMove;
  }

  public processRoadUser(roadUser: RoadUser): void {
    if (roadUser.getCell.getCover.crossroad) {
      return;
    }

    if (this.canMove) {
      roadUser.go();
    } else {
      roadUser.stop();
    }
  }
}
