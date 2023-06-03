import { RoadUser } from '../../trafficParticipants/RoadUser';

export interface TrafficLightsStrategy {
  processRoadUser(roadUser: RoadUser): void;
}
