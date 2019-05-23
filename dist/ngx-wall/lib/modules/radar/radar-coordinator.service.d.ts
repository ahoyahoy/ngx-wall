import { NgZone } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpotDirective } from './directive/spot.directive';
import { SpotId } from './interfaces/spot-id.type';
import { SpotModel } from './spot.model';
export declare class RadarCoordinator {
    private zone;
    private spots;
    private events;
    private mouseMove$;
    constructor(doc: any, zone: NgZone);
    register(spotId: SpotId, spotInstance: SpotDirective): void;
    unRegister(spotId: SpotId): void;
    updateSpotsInfo(): void;
    filterSpots(predicate: (spot: SpotModel) => void): SpotModel[];
    subscribe(fn: any): Subscription;
    private updateLocationPosition;
}
