import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ISpotInfo, ISpotPosition, ISpotSize } from '../interfaces/distance-to-spot.interface';
import { SpotId } from '../interfaces/spot-id.type';
import { RadarCoordinator } from '../radar-coordinator.service';
export declare class SpotDirective implements OnInit, OnDestroy {
    private radarCoordinator;
    private el;
    spot: any;
    id: SpotId;
    constructor(radarCoordinator: RadarCoordinator, el: ElementRef);
    ngOnInit(): void;
    getInfo(): ISpotInfo;
    getData(): any;
    getSize(): ISpotSize;
    getPosition(): ISpotPosition;
    ngOnDestroy(): void;
}
