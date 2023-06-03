/* eslint-disable no-param-reassign */
import { Direction } from '../../utils/constants/Direction';
import { maxChangeDirectionAmount } from '../../utils/constants/maxChangeDirectionAmount';
import { generateRandNumber } from '../../utils/helpers/generateRandNumber';
import { RoadUser } from '../trafficParticipants/RoadUser';
import { Sign, SignProps } from './Sign';

interface SignToChangeDirectionProps extends SignProps {
  possibleDirections: Direction[];
}

export class SignToChangeDirection extends Sign {
  private readonly possibleDirections: Direction[];

  constructor({ image, possibleDirections }: SignToChangeDirectionProps) {
    super({ image });

    this.possibleDirections = possibleDirections;
  }

  protected override callbackFunction(roadUser: RoadUser): RoadUser {
    if (roadUser.getChangeDirectionAmount === maxChangeDirectionAmount) {
      return roadUser;
    }

    const nextDirection = this.getNextDirection();
    if (nextDirection !== roadUser.getDirection) {
      roadUser.increaseChangeDirectionAmount();
    }

    roadUser.setDirection = nextDirection;

    return roadUser;
  }

  private getNextDirection(): Direction {
    const nextDirectionIndex = generateRandNumber(0, this.possibleDirections.length - 1);
    return this.possibleDirections[nextDirectionIndex];
  }
}
