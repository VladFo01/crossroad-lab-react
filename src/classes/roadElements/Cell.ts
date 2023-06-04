import { empty } from '../../utils/constants/cellTypes';
import { Sign } from '../signs/Sign';
import { RoadUser } from '../trafficParticipants/RoadUser';
import RoadMatrix from './RoadMatrix';

export interface Cover {
  canDrive: boolean;
  canWalk: boolean;
  crossroad?: boolean;
}

export default class Cell {
  protected sign: Sign;

  protected user: RoadUser;

  protected cover: Cover;

  protected canDrive: boolean;

  protected canWalk: boolean;

  protected isCrossroad: boolean;

  protected readonly xCoord: number;

  protected readonly yCoord: number;

  protected readonly roadMatrix: RoadMatrix;

  constructor(roadMatrix: RoadMatrix, x: number, y: number) {
    this.roadMatrix = roadMatrix;
    this.cover = empty;
    this.xCoord = x;
    this.yCoord = y;
  }

  set setSign(sign: Sign) {
    this.sign = sign;
  }

  get getSign(): Sign | null {
    return this.sign;
  }

  set setUser(user: RoadUser) {
    this.user = user;
  }

  get getUser(): RoadUser {
    return this.user;
  }

  set setCover(cover: Cover) {
    this.cover = cover;
  }

  get getCover(): Cover {
    return this.cover;
  }

  get yCoordinate(): number {
    return this.yCoord;
  }

  get xCoordinate(): number {
    return this.xCoord;
  }

  get getMatrix(): RoadMatrix {
    return this.roadMatrix;
  }
}
