import { ChangeDetectorRef, ComponentFactoryResolver, Injector, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewContainerRef } from '@angular/core';
import { WallCanvasComponent } from '../../wall-canvas.component';
import { Radar } from '../../../../../modules/radar/radar.service';
export declare class WallCanvasBrickComponent implements OnInit, OnDestroy, OnChanges {
    private injector;
    private resolver;
    private radar;
    private cdRef;
    private wallCanvasComponent;
    brick: any;
    container: ViewContainerRef;
    selected: boolean;
    isMouseNear: boolean;
    spot: any;
    isMediaInteractionEnabled: boolean;
    private componentReference;
    private minimalDistanceToMouse;
    private stateChangesSubscription;
    private radarSubscription;
    private focusedBrickSubscription;
    private selectedBricksSubscription;
    private isMediaInteractionEnabledSubscription;
    constructor(injector: Injector, resolver: ComponentFactoryResolver, radar: Radar, cdRef: ChangeDetectorRef, wallCanvasComponent: WallCanvasComponent);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private callInstanceApi;
    private renderBrick;
}
