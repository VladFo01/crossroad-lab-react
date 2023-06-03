import { RoadUser } from '../trafficParticipants/RoadUser';

export interface SignProps {
  image?: string;
}

export class Sign {
  protected isForNextCell: boolean;
  protected image?: string;

  constructor({ image }: SignProps) {
    this.image = image;
    this.isForNextCell = false;
  }

  // eslint-disable-next-line class-methods-use-this
  protected callbackFunction(roadUser: RoadUser): RoadUser {
    return roadUser;
  }

  // eslint-disable-next-line class-methods-use-this
  public callback(roadUser: RoadUser, isNextCellSign: boolean): boolean {
    if ((this.isForNextCell && isNextCellSign) || (!this.isForNextCell && !isNextCellSign)) {
      this.callbackFunction(roadUser);
      return true;
    }
    return false;
  }
}
