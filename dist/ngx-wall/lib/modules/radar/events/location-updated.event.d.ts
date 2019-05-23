import { IDistanceToSpot } from '../interfaces/distance-to-spot.interface';
export declare class LocationUpdatedEvent {
    spots: IDistanceToSpot[];
    constructor(spots: IDistanceToSpot[]);
}
