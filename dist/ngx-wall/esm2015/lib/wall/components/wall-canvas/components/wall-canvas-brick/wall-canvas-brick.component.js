/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Component, ComponentFactoryResolver, Injector, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { WallCanvasComponent } from '../../wall-canvas.component';
import { Radar } from '../../../../../modules/radar/radar.service';
import { LocationUpdatedEvent } from '../../../../../modules/radar/events/location-updated.event';
export class WallCanvasBrickComponent {
    /**
     * @param {?} injector
     * @param {?} resolver
     * @param {?} radar
     * @param {?} cdRef
     * @param {?} wallCanvasComponent
     */
    constructor(injector, resolver, radar, cdRef, wallCanvasComponent) {
        this.injector = injector;
        this.resolver = resolver;
        this.radar = radar;
        this.cdRef = cdRef;
        this.wallCanvasComponent = wallCanvasComponent;
        this.selected = false;
        this.isMouseNear = false;
        this.isMediaInteractionEnabled = true;
        this.minimalDistanceToMouse = 100;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.spot = {
            brickId: this.brick.id,
            isPickOutItem: true,
            isBeacon: true
        };
        this.componentReference = this.renderBrick();
        this.radarSubscription = this.radar.subscribe((e) => {
            if (e instanceof LocationUpdatedEvent) {
                /** @type {?} */
                const currentSpot = e.spots.find((spot) => spot.data.brickId === this.brick.id);
                if (currentSpot.isCross13Line) {
                    this.isMouseNear = currentSpot.topLeftPointDistance < this.minimalDistanceToMouse;
                }
                else {
                    this.isMouseNear = false;
                }
                this.cdRef.detectChanges();
            }
        });
        this.focusedBrickSubscription = this.wallCanvasComponent.focusedBrick$.subscribe((focusedBrick) => {
            if (focusedBrick.id === this.brick.id) {
                this.callInstanceApi('onWallFocus', focusedBrick.context);
            }
        });
        this.selectedBricksSubscription = this.wallCanvasComponent.selectedBricks$.subscribe((selectedBricks) => {
            this.selected = !Boolean(selectedBricks.indexOf(this.brick.id) === -1);
        });
        this.isMediaInteractionEnabledSubscription = this.wallCanvasComponent.isMediaInteractionEnabled$
            .subscribe((isMediaInteractionEnabled) => this.isMediaInteractionEnabled = isMediaInteractionEnabled);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.brick && !changes.brick.firstChange && changes.brick.currentValue) {
            this.componentReference.instance.state = this.brick.state;
            this.callInstanceApi('onWallStateChange', this.componentReference.instance.state);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.radarSubscription.unsubscribe();
        this.focusedBrickSubscription.unsubscribe();
        this.selectedBricksSubscription.unsubscribe();
        this.isMediaInteractionEnabledSubscription.unsubscribe();
        if (this.stateChangesSubscription) {
            this.stateChangesSubscription.unsubscribe();
        }
    }
    /**
     * @private
     * @param {?} methodName
     * @param {?=} data
     * @return {?}
     */
    callInstanceApi(methodName, data) {
        if (this.componentReference.instance[methodName]) {
            this.componentReference.instance[methodName](data);
        }
    }
    /**
     * @private
     * @return {?}
     */
    renderBrick() {
        /** @type {?} */
        const factory = this.resolver.resolveComponentFactory(this.brick.component);
        /** @type {?} */
        const componentReference = this.container.createComponent(factory, null, this.injector);
        /** @type {?} */
        const componentInstance = (/** @type {?} */ (componentReference.instance));
        componentInstance.id = this.brick.id;
        componentInstance.state = this.brick.state;
        componentInstance.wallModel = this.wallCanvasComponent.wallModel;
        if (componentInstance.stateChanges) {
            this.stateChangesSubscription = componentInstance.stateChanges.subscribe((newState) => {
                this.wallCanvasComponent.brickStateChanged(this.brick.id, newState);
            });
        }
        return componentReference;
    }
}
WallCanvasBrickComponent.decorators = [
    { type: Component, args: [{
                selector: 'wall-canvas-brick',
                template: "<div [spot]=\"spot\"\n     data-id=\"{{brick.id}}\"\n     class=\"wall-canvas-brick__wrapper wall-canvas-brick__draggable\"\n     [ngClass]=\"{'wall-canvas-brick__selected': selected,\n     \t\t'wall-canvas-brick__draggable': isMouseNear}\">\n\n    <div class=\"wall-canvas-brick__draggable-handler\" [tow-slave]=\"brick.id\">\n        <div class=\"wall-canvas-brick__draggable-box\">\n            <mat-icon>drag_handle</mat-icon>\n        </div>\n    </div>\n\n    <div [ngClass]=\"{'wall-canvas-brick__disabled-interaction': !isMediaInteractionEnabled}\">\n        <ng-container #brickContainer></ng-container>\n    </div>\n</div>\n",
                styles: [":host{display:block;margin:0 0 2px}:host .wall-canvas-brick__draggable .wall-canvas-brick__draggable-handler{display:block}:host .wall-canvas-brick__wrapper{position:relative}:host .wall-canvas-brick__wrapper:after{content:\"\";position:absolute;top:0;bottom:0;left:0;right:0;pointer-events:none;opacity:.2;transition:background-color .1s}:host .wall-canvas-brick__draggable-box{padding:1px;border-radius:3px;line-height:0}:host .wall-canvas-brick__draggable-handler{display:none;position:absolute;left:-35px;top:-4px;padding:5px;margin:0;cursor:pointer;border-radius:3px}:host .wall-canvas-brick__selected{position:relative}:host .wall-canvas-brick__disabled-interaction{pointer-events:none}"]
            }] }
];
/** @nocollapse */
WallCanvasBrickComponent.ctorParameters = () => [
    { type: Injector },
    { type: ComponentFactoryResolver },
    { type: Radar },
    { type: ChangeDetectorRef },
    { type: WallCanvasComponent }
];
WallCanvasBrickComponent.propDecorators = {
    brick: [{ type: Input }],
    container: [{ type: ViewChild, args: ['brickContainer', { read: ViewContainerRef },] }]
};
if (false) {
    /** @type {?} */
    WallCanvasBrickComponent.prototype.brick;
    /** @type {?} */
    WallCanvasBrickComponent.prototype.container;
    /** @type {?} */
    WallCanvasBrickComponent.prototype.selected;
    /** @type {?} */
    WallCanvasBrickComponent.prototype.isMouseNear;
    /** @type {?} */
    WallCanvasBrickComponent.prototype.spot;
    /** @type {?} */
    WallCanvasBrickComponent.prototype.isMediaInteractionEnabled;
    /**
     * @type {?}
     * @private
     */
    WallCanvasBrickComponent.prototype.componentReference;
    /**
     * @type {?}
     * @private
     */
    WallCanvasBrickComponent.prototype.minimalDistanceToMouse;
    /**
     * @type {?}
     * @private
     */
    WallCanvasBrickComponent.prototype.stateChangesSubscription;
    /**
     * @type {?}
     * @private
     */
    WallCanvasBrickComponent.prototype.radarSubscription;
    /**
     * @type {?}
     * @private
     */
    WallCanvasBrickComponent.prototype.focusedBrickSubscription;
    /**
     * @type {?}
     * @private
     */
    WallCanvasBrickComponent.prototype.selectedBricksSubscription;
    /**
     * @type {?}
     * @private
     */
    WallCanvasBrickComponent.prototype.isMediaInteractionEnabledSubscription;
    /**
     * @type {?}
     * @private
     */
    WallCanvasBrickComponent.prototype.injector;
    /**
     * @type {?}
     * @private
     */
    WallCanvasBrickComponent.prototype.resolver;
    /**
     * @type {?}
     * @private
     */
    WallCanvasBrickComponent.prototype.radar;
    /**
     * @type {?}
     * @private
     */
    WallCanvasBrickComponent.prototype.cdRef;
    /**
     * @type {?}
     * @private
     */
    WallCanvasBrickComponent.prototype.wallCanvasComponent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbC1jYW52YXMtYnJpY2suY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvd2FsbC9jb21wb25lbnRzL3dhbGwtY2FudmFzL2NvbXBvbmVudHMvd2FsbC1jYW52YXMtYnJpY2svd2FsbC1jYW52YXMtYnJpY2suY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCx3QkFBd0IsRUFFeEIsUUFBUSxFQUNSLEtBQUssRUFLTCxTQUFTLEVBQ1QsZ0JBQWdCLEVBQ25CLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQ2hFLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSw0Q0FBNEMsQ0FBQztBQUNqRSxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSw0REFBNEQsQ0FBQztBQVFoRyxNQUFNLE9BQU8sd0JBQXdCOzs7Ozs7OztJQXlCakMsWUFBb0IsUUFBa0IsRUFDbEIsUUFBa0MsRUFDbEMsS0FBWSxFQUNaLEtBQXdCLEVBQ3hCLG1CQUF3QztRQUp4QyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGFBQVEsR0FBUixRQUFRLENBQTBCO1FBQ2xDLFVBQUssR0FBTCxLQUFLLENBQU87UUFDWixVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQUN4Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBdkI1RCxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRWpCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBSXBCLDhCQUF5QixHQUFHLElBQUksQ0FBQztRQUl6QiwyQkFBc0IsR0FBRyxHQUFHLENBQUM7SUFjckMsQ0FBQzs7OztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsSUFBSSxHQUFHO1lBQ1IsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN0QixhQUFh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LGlCQUFpQjtZQWNiLG1CQUFtQjs7O29CQVl0QixLQUFLO3dCQUVMLFNBQVMsU0FBQyxnQkFBZ0IsRUFBRSxFQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBQzs7OztJQUZyRCx5Q0FBb0I7O0lBRXBCLDZDQUFtRjs7SUFFbkYsNENBQWlCOztJQUVqQiwrQ0FBb0I7O0lBRXBCLHdDQUFVOztJQUVWLDZEQUFpQzs7Ozs7SUFFakMsc0RBQThDOzs7OztJQUU5QywwREFBcUM7Ozs7O0lBR3JDLDREQUErQzs7Ozs7SUFDL0MscURBQXdDOzs7OztJQUN4Qyw0REFBK0M7Ozs7O0lBQy9DLDhEQUFpRDs7Ozs7SUFDakQseUVBQTREOzs7OztJQUVoRCw0Q0FBMEI7Ozs7O0lBQzFCLDRDQUEwQzs7Ozs7SUFDMUMseUNBQW9COzs7OztJQUNwQix5Q0FBZ0M7Ozs7O0lBQ2hDLHVEQUFnRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBDb21wb25lbnRSZWYsXG4gICAgSW5qZWN0b3IsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7V2FsbENhbnZhc0NvbXBvbmVudH0gZnJvbSAnLi4vLi4vd2FsbC1jYW52YXMuY29tcG9uZW50JztcbmltcG9ydCB7UmFkYXJ9IGZyb20gJy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvcmFkYXIvcmFkYXIuc2VydmljZSc7XG5pbXBvcnQge0xvY2F0aW9uVXBkYXRlZEV2ZW50fSBmcm9tICcuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3JhZGFyL2V2ZW50cy9sb2NhdGlvbi11cGRhdGVkLmV2ZW50JztcbmltcG9ydCB7SVdhbGxDb21wb25lbnR9IGZyb20gJy4uLy4uLy4uL3dhbGwvaW50ZXJmYWNlcy93YWxsLWNvbXBvbmVudC93YWxsLWNvbXBvbmVudC5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3dhbGwtY2FudmFzLWJyaWNrJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vd2FsbC1jYW52YXMtYnJpY2suY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3dhbGwtY2FudmFzLWJyaWNrLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgV2FsbENhbnZhc0JyaWNrQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XG4gICAgLy8gdG9kbyBhZGQgdHlwZVxuICAgIEBJbnB1dCgpIGJyaWNrOiBhbnk7XG5cbiAgICBAVmlld0NoaWxkKCdicmlja0NvbnRhaW5lcicsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmfSkgY29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gICAgc2VsZWN0ZWQgPSBmYWxzZTtcblxuICAgIGlzTW91c2VOZWFyID0gZmFsc2U7XG5cbiAgICBzcG90OiBhbnk7XG5cbiAgICBpc01lZGlhSW50ZXJhY3Rpb25FbmFibGVkID0gdHJ1ZTtcblxuICAgIHByaXZhdGUgY29tcG9uZW50UmVmZXJlbmNlOiBDb21wb25lbnRSZWY8YW55PjtcblxuICAgIHByaXZhdGUgbWluaW1hbERpc3RhbmNlVG9Nb3VzZSA9IDEwMDtcblxuICAgIC8vIHN1YnNjcmlwdGlvbnNcbiAgICBwcml2YXRlIHN0YXRlQ2hhbmdlc1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICAgIHByaXZhdGUgcmFkYXJTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICBwcml2YXRlIGZvY3VzZWRCcmlja1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICAgIHByaXZhdGUgc2VsZWN0ZWRCcmlja3NTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICBwcml2YXRlIGlzTWVkaWFJbnRlcmFjdGlvbkVuYWJsZWRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJhZGFyOiBSYWRhcixcbiAgICAgICAgICAgICAgICBwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgICBwcml2YXRlIHdhbGxDYW52YXNDb21wb25lbnQ6IFdhbGxDYW52YXNDb21wb25lbnQpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5zcG90ID0ge1xuICAgICAgICAgICAgYnJpY2tJZDogdGhpcy5icmljay5pZCxcbiAgICAgICAgICAgIGlzUGlja091dEl0ZW06IHRydWUsXG4gICAgICAgICAgICBpc0JlYWNvbjogdHJ1ZVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuY29tcG9uZW50UmVmZXJlbmNlID0gdGhpcy5yZW5kZXJCcmljaygpO1xuXG4gICAgICAgIHRoaXMucmFkYXJTdWJzY3JpcHRpb24gPSB0aGlzLnJhZGFyLnN1YnNjcmliZSgoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBMb2NhdGlvblVwZGF0ZWRFdmVudCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRTcG90ID0gZS5zcG90cy5maW5kKChzcG90KSA9PiBzcG90LmRhdGEuYnJpY2tJZCA9PT0gdGhpcy5icmljay5pZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFNwb3QuaXNDcm9zczEzTGluZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzTW91c2VOZWFyID0gY3VycmVudFNwb3QudG9wTGVmdFBvaW50RGlzdGFuY2UgPCB0aGlzLm1pbmltYWxEaXN0YW5jZVRvTW91c2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc01vdXNlTmVhciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmZvY3VzZWRCcmlja1N1YnNjcmlwdGlvbiA9IHRoaXMud2FsbENhbnZhc0NvbXBvbmVudC5mb2N1c2VkQnJpY2skLnN1YnNjcmliZSgoZm9jdXNlZEJyaWNrKSA9PiB7XG4gICAgICAgICAgICBpZiAoZm9jdXNlZEJyaWNrLmlkID09PSB0aGlzLmJyaWNrLmlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsSW5zdGFuY2VBcGkoJ29uV2FsbEZvY3VzJywgZm9jdXNlZEJyaWNrLmNvbnRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNlbGVjdGVkQnJpY2tzU3Vic2NyaXB0aW9uID0gdGhpcy53YWxsQ2FudmFzQ29tcG9uZW50LnNlbGVjdGVkQnJpY2tzJC5zdWJzY3JpYmUoKHNlbGVjdGVkQnJpY2tzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gIUJvb2xlYW4oc2VsZWN0ZWRCcmlja3MuaW5kZXhPZih0aGlzLmJyaWNrLmlkKSA9PT0gLTEpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmlzTWVkaWFJbnRlcmFjdGlvbkVuYWJsZWRTdWJzY3JpcHRpb24gPSB0aGlzLndhbGxDYW52YXNDb21wb25lbnQuaXNNZWRpYUludGVyYWN0aW9uRW5hYmxlZCRcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGlzTWVkaWFJbnRlcmFjdGlvbkVuYWJsZWQpID0+IHRoaXMuaXNNZWRpYUludGVyYWN0aW9uRW5hYmxlZCA9IGlzTWVkaWFJbnRlcmFjdGlvbkVuYWJsZWQpO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKGNoYW5nZXMuYnJpY2sgJiYgIWNoYW5nZXMuYnJpY2suZmlyc3RDaGFuZ2UgJiYgY2hhbmdlcy5icmljay5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50UmVmZXJlbmNlLmluc3RhbmNlLnN0YXRlID0gdGhpcy5icmljay5zdGF0ZTtcblxuICAgICAgICAgICAgdGhpcy5jYWxsSW5zdGFuY2VBcGkoJ29uV2FsbFN0YXRlQ2hhbmdlJywgdGhpcy5jb21wb25lbnRSZWZlcmVuY2UuaW5zdGFuY2Uuc3RhdGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMucmFkYXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5mb2N1c2VkQnJpY2tTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEJyaWNrc1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLmlzTWVkaWFJbnRlcmFjdGlvbkVuYWJsZWRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcblxuICAgICAgICBpZiAodGhpcy5zdGF0ZUNoYW5nZXNTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbGxJbnN0YW5jZUFwaShtZXRob2ROYW1lOiBzdHJpbmcsIGRhdGE/OiBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50UmVmZXJlbmNlLmluc3RhbmNlW21ldGhvZE5hbWVdKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudFJlZmVyZW5jZS5pbnN0YW5jZVttZXRob2ROYW1lXShkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVuZGVyQnJpY2soKSB7XG4gICAgICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHRoaXMuYnJpY2suY29tcG9uZW50KTtcblxuICAgICAgICBjb25zdCBjb21wb25lbnRSZWZlcmVuY2UgPSB0aGlzLmNvbnRhaW5lci5jcmVhdGVDb21wb25lbnQoZmFjdG9yeSwgbnVsbCwgdGhpcy5pbmplY3Rvcik7XG5cbiAgICAgICAgY29uc3QgY29tcG9uZW50SW5zdGFuY2UgPSBjb21wb25lbnRSZWZlcmVuY2UuaW5zdGFuY2UgYXMgSVdhbGxDb21wb25lbnQ7XG5cbiAgICAgICAgY29tcG9uZW50SW5zdGFuY2UuaWQgPSB0aGlzLmJyaWNrLmlkO1xuICAgICAgICBjb21wb25lbnRJbnN0YW5jZS5zdGF0ZSA9IHRoaXMuYnJpY2suc3RhdGU7XG4gICAgICAgIGNvbXBvbmVudEluc3RhbmNlLndhbGxNb2RlbCA9IHRoaXMud2FsbENhbnZhc0NvbXBvbmVudC53YWxsTW9kZWw7XG5cbiAgICAgICAgaWYgKGNvbXBvbmVudEluc3RhbmNlLnN0YXRlQ2hhbmdlcykge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXNTdWJzY3JpcHRpb24gPSBjb21wb25lbnRJbnN0YW5jZS5zdGF0ZUNoYW5nZXMuc3Vic2NyaWJlKChuZXdTdGF0ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMud2FsbENhbnZhc0NvbXBvbmVudC5icmlja1N0YXRlQ2hhbmdlZCh0aGlzLmJyaWNrLmlkLCBuZXdTdGF0ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb21wb25lbnRSZWZlcmVuY2U7XG4gICAgfVxufVxuIl19