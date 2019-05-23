import { Subscription } from 'rxjs';
import { RadarCoordinator } from './radar-coordinator.service';
import { SpotModel } from './spot.model';
export declare class Radar {
    private radarCoordinator;
    private events;
    constructor(radarCoordinator: RadarCoordinator);
    filterSpots(fn: (spot: SpotModel) => void): SpotModel[];
    subscribe(fn: any): Subscription;
}
