/* eslint-disable no-unused-expressions */
import { delay } from '../../utils/helpers/delay';
import { Pedestrian } from '../trafficParticipants/Pedestrian';
import { RoadUser } from '../trafficParticipants/RoadUser';
import { Vehicle } from '../trafficParticipants/Vehicle';
import { SignWithState, SignWithStateProps } from './SignWithState';
import { PedestrianStrategy } from './trafficLightsStrategies/PedestrianStrategy';
import { TrafficLightsStrategy } from './trafficLightsStrategies/TrafficLightsStrategy';
import { VehicleStrategy } from './trafficLightsStrategies/VehicleStrategy';

interface TrafficLightsProps extends SignWithStateProps {
  defaultCanMove: boolean;
}

export class TrafficLights extends SignWithState {
  private allowMove: boolean;

  constructor({ cooldown, image, defaultCanMove }: TrafficLightsProps) {
    super({ cooldown, image });
    this.allowMove = defaultCanMove;
    this.isForNextCell = true;

    this.changeState();
  }

  protected override callbackFunction(roadUser: RoadUser): RoadUser {
    let strategy: TrafficLightsStrategy;

    if (roadUser instanceof Pedestrian) {
      strategy = new PedestrianStrategy(this.allowMove);
    } else if (roadUser instanceof Vehicle) {
      strategy = new VehicleStrategy(this.allowMove);
    }

    strategy.processRoadUser(roadUser);

    return roadUser;
  }

  public async changeState() {
    if (this.canChangeState()) {
      this.allowMove = !this.allowMove;
    }

    await delay(1000);
    this.changeState();
  }

  get canMoveCar(): boolean {
    return this.allowMove;
  }
}
