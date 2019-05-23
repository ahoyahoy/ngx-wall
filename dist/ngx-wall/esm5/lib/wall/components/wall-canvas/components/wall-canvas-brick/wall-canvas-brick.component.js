/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Component, ComponentFactoryResolver, Injector, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { WallCanvasComponent } from '../../wall-canvas.component';
import { Radar } from '../../../../../modules/radar/radar.service';
import { LocationUpdatedEvent } from '../../../../../modules/radar/events/location-updated.event';
var WallCanvasBrickComponent = /** @class */ (function () {
    function WallCanvasBrickComponent(injector, resolver, radar, cdRef, wallCanvasComponent) {
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
    WallCanvasBrickComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.spot = {
            brickId: this.brick.id,
            isPickOutItem: true,
            isBeacon: true
        };
        this.componentReference = this.renderBrick();
        this.radarSubscription = this.radar.subscribe(function (e) {
            if (e instanceof LocationUpdatedEvent) {
                /** @type {?} */
                var currentSpot = e.spots.find(function (spot) { return spot.data.brickId === _this.brick.id; });
                if (currentSpot.isCross13Line) {
                    _this.isMouseNear = currentSpot.topLeftPointDistance < _this.minimalDistanceToMouse;
                }
                else {
                    _this.isMouseNear = false;
                }
                _this.cdRef.detectChanges();
            }
        });
        this.focusedBrickSubscription = this.wallCanvasComponent.focusedBrick$.subscribe(function (focusedBrick) {
            if (focusedBrick.id === _this.brick.id) {
                _this.callInstanceApi('onWallFocus', focusedBrick.context);
            }
        });
        this.selectedBricksSubscription = this.wallCanvasComponent.selectedBricks$.subscribe(function (selectedBricks) {
            _this.selected = !Boolean(selectedBricks.indexOf(_this.brick.id) === -1);
        });
        this.isMediaInteractionEnabledSubscription = this.wallCanvasComponent.isMediaInteractionEnabled$
            .subscribe(function (isMediaInteractionEnabled) { return _this.isMediaInteractionEnabled = isMediaInteractionEnabled; });
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    WallCanvasBrickComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.brick && !changes.brick.firstChange && changes.brick.currentValue) {
            this.componentReference.instance.state = this.brick.state;
            this.callInstanceApi('onWallStateChange', this.componentReference.instance.state);
        }
    };
    /**
     * @return {?}
     */
    WallCanvasBrickComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.radarSubscription.unsubscribe();
        this.focusedBrickSubscription.unsubscribe();
        this.selectedBricksSubscription.unsubscribe();
        this.isMediaInteractionEnabledSubscription.unsubscribe();
        if (this.stateChangesSubscription) {
            this.stateChangesSubscription.unsubscribe();
        }
    };
    /**
     * @private
     * @param {?} methodName
     * @param {?=} data
     * @return {?}
     */
    WallCanvasBrickComponent.prototype.callInstanceApi = /**
     * @private
     * @param {?} methodName
     * @param {?=} data
     * @return {?}
     */
    function (methodName, data) {
        if (this.componentReference.instance[methodName]) {
            this.componentReference.instance[methodName](data);
        }
    };
    /**
     * @private
     * @return {?}
     */
    WallCanvasBrickComponent.prototype.renderBrick = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var factory = this.resolver.resolveComponentFactory(this.brick.component);
        /** @type {?} */
        var componentReference = this.container.createComponent(factory, null, this.injector);
        /** @type {?} */
        var componentInstance = (/** @type {?} */ (componentReference.instance));
        componentInstance.id = this.brick.id;
        componentInstance.state = this.brick.state;
        componentInstance.wallModel = this.wallCanvasComponent.wallModel;
        if (componentInstance.stateChanges) {
            this.stateChangesSubscription = componentInstance.stateChanges.subscribe(function (newState) {
                _this.wallCanvasComponent.brickStateChanged(_this.brick.id, newState);
            });
        }
        return componentReference;
    };
    WallCanvasBrickComponent.decorators = [
        { type: Component, args: [{
                    selector: 'wall-canvas-brick',
                    template: "<div [spot]=\"spot\"\n     data-id=\"{{brick.id}}\"\n     class=\"wall-canvas-brick__wrapper wall-canvas-brick__draggable\"\n     [ngClass]=\"{'wall-canvas-brick__selected': selected,\n     \t\t'wall-canvas-brick__draggable': isMouseNear}\">\n\n    <div class=\"wall-canvas-brick__draggable-handler\" [tow-slave]=\"brick.id\">\n        <div class=\"wall-canvas-brick__draggable-box\">\n            <mat-icon>drag_handle</mat-icon>\n        </div>\n    </div>\n\n    <div [ngClass]=\"{'wall-canvas-brick__disabled-interaction': !isMediaInteractionEnabled}\">\n        <ng-container #brickContainer></ng-container>\n    </div>\n</div>\n",
                    styles: [":host{display:block;margin:0 0 2px}:host .wall-canvas-brick__draggable .wall-canvas-brick__draggable-handler{display:block}:host .wall-canvas-brick__wrapper{position:relative}:host .wall-canvas-brick__wrapper:after{content:\"\";position:absolute;top:0;bottom:0;left:0;right:0;pointer-events:none;opacity:.2;transition:background-color .1s}:host .wall-canvas-brick__draggable-box{padding:1px;border-radius:3px;line-height:0}:host .wall-canvas-brick__draggable-handler{display:none;position:absolute;left:-35px;top:-4px;padding:5px;margin:0;cursor:pointer;border-radius:3px}:host .wall-canvas-brick__selected{position:relative}:host .wall-canvas-brick__disabled-interaction{pointer-events:none}"]
                }] }
    ];
    /** @nocollapse */
    WallCanvasBrickComponent.ctorParameters = function () { return [
        { type: Injector },
        { type: ComponentFactoryResolver },
        { type: Radar },
        { type: ChangeDetectorRef },
        { type: WallCanvasComponent }
    ]; };
    WallCanvasBrickComponent.propDecorators = {
        brick: [{ type: Input }],
        container: [{ type: ViewChild, args: ['brickContainer', { read: ViewContainerRef },] }]
    };
    return WallCanvasBrickComponent;
}());
export { WallCanvasBrickComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbC1jYW52YXMtYnJpY2suY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvd2FsbC9jb21wb25lbnRzL3dhbGwtY2FudmFzL2NvbXBvbmVudHMvd2FsbC1jYW52YXMtYnJpY2svd2FsbC1jYW52YXMtYnJpY2suY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCx3QkFBd0IsRUFFeEIsUUFBUSxFQUNSLEtBQUssRUFLTCxTQUFTLEVBQ1QsZ0JBQWdCLEVBQ25CLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQ2hFLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSw0Q0FBNEMsQ0FBQztBQUNqRSxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSw0REFBNEQsQ0FBQztBQUdoRztJQThCSSxrQ0FBb0IsUUFBa0IsRUFDbEIsUUFBa0MsRUFDbEMsS0FBWSxFQUNaLEtBQXdCLEVBQ3hCLG1CQUF3QztRQUp4QyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGFBQVEsR0FBUixRQUFRLENBQTBCO1FBQ2xDLFVBQUssR0FBTCxLQUFLLENBQU87UUFDWixVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQUN4Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBdkI1RCxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRWpCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBSXBCLDhCQUF5QixHQUFHLElBQUksQ0FBQztRQUl6QiwyQkFBc0IsR0FBRyxHQUFHLENBQUM7SUFjckMsQ0FBQzs7OztJQUVELDJDQUFROzs7SUFBUjtRQUFBLGlCQW1DQztRQWxDRyxJQUFJLENBQUMsSUFBSSxHQUFHO1lBQ1IsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN0QixhQUFhLEVB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QkFGUix3QkFBd0I7Z0JBYXBCLEtBQUs7Z0JBZlQsaUJBQWlCO2dCQWNiLG1CQUFtQjs7O3dCQVl0QixLQUFLOzRCQUVMLFNBQVMsU0FBQyxnQkFBZ0IsRUFBRSxFQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBQzs7SUE2R3pELCtCQUFDO0NBQUEsQUF0SEQsSUFzSEM7U0FqSFksd0JBQXdCOzs7SUFFakMseUNBQW9COztJQUVwQiw2Q0FBbUY7O0lBRW5GLDRDQUFpQjs7SUFFakIsK0NBQW9COztJQUVwQix3Q0FBVTs7SUFFViw2REFBaUM7Ozs7O0lBRWpDLHNEQUE4Qzs7Ozs7SUFFOUMsMERBQXFDOzs7OztJQUdyQyw0REFBK0M7Ozs7O0lBQy9DLHFEQUF3Qzs7Ozs7SUFDeEMsNERBQStDOzs7OztJQUMvQyw4REFBaUQ7Ozs7O0lBQ2pELHlFQUE0RDs7Ozs7SUFFaEQsNENBQTBCOzs7OztJQUMxQiw0Q0FBMEM7Ozs7O0lBQzFDLHlDQUFvQjs7Ozs7SUFDcEIseUNBQWdDOzs7OztJQUNoQyx1REFBZ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgQ29tcG9uZW50UmVmLFxuICAgIEluamVjdG9yLFxuICAgIElucHV0LFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1dhbGxDYW52YXNDb21wb25lbnR9IGZyb20gJy4uLy4uL3dhbGwtY2FudmFzLmNvbXBvbmVudCc7XG5pbXBvcnQge1JhZGFyfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3JhZGFyL3JhZGFyLnNlcnZpY2UnO1xuaW1wb3J0IHtMb2NhdGlvblVwZGF0ZWRFdmVudH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9yYWRhci9ldmVudHMvbG9jYXRpb24tdXBkYXRlZC5ldmVudCc7XG5pbXBvcnQge0lXYWxsQ29tcG9uZW50fSBmcm9tICcuLi8uLi8uLi93YWxsL2ludGVyZmFjZXMvd2FsbC1jb21wb25lbnQvd2FsbC1jb21wb25lbnQuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd3YWxsLWNhbnZhcy1icmljaycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3dhbGwtY2FudmFzLWJyaWNrLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi93YWxsLWNhbnZhcy1icmljay5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFdhbGxDYW52YXNCcmlja0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuICAgIC8vIHRvZG8gYWRkIHR5cGVcbiAgICBASW5wdXQoKSBicmljazogYW55O1xuXG4gICAgQFZpZXdDaGlsZCgnYnJpY2tDb250YWluZXInLCB7cmVhZDogVmlld0NvbnRhaW5lclJlZn0pIGNvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcblxuICAgIHNlbGVjdGVkID0gZmFsc2U7XG5cbiAgICBpc01vdXNlTmVhciA9IGZhbHNlO1xuXG4gICAgc3BvdDogYW55O1xuXG4gICAgaXNNZWRpYUludGVyYWN0aW9uRW5hYmxlZCA9IHRydWU7XG5cbiAgICBwcml2YXRlIGNvbXBvbmVudFJlZmVyZW5jZTogQ29tcG9uZW50UmVmPGFueT47XG5cbiAgICBwcml2YXRlIG1pbmltYWxEaXN0YW5jZVRvTW91c2UgPSAxMDA7XG5cbiAgICAvLyBzdWJzY3JpcHRpb25zXG4gICAgcHJpdmF0ZSBzdGF0ZUNoYW5nZXNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICBwcml2YXRlIHJhZGFyU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gICAgcHJpdmF0ZSBmb2N1c2VkQnJpY2tTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICBwcml2YXRlIHNlbGVjdGVkQnJpY2tzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gICAgcHJpdmF0ZSBpc01lZGlhSW50ZXJhY3Rpb25FbmFibGVkU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByYWRhcjogUmFkYXIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB3YWxsQ2FudmFzQ29tcG9uZW50OiBXYWxsQ2FudmFzQ29tcG9uZW50KSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuc3BvdCA9IHtcbiAgICAgICAgICAgIGJyaWNrSWQ6IHRoaXMuYnJpY2suaWQsXG4gICAgICAgICAgICBpc1BpY2tPdXRJdGVtOiB0cnVlLFxuICAgICAgICAgICAgaXNCZWFjb246IHRydWVcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmNvbXBvbmVudFJlZmVyZW5jZSA9IHRoaXMucmVuZGVyQnJpY2soKTtcblxuICAgICAgICB0aGlzLnJhZGFyU3Vic2NyaXB0aW9uID0gdGhpcy5yYWRhci5zdWJzY3JpYmUoKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlIGluc3RhbmNlb2YgTG9jYXRpb25VcGRhdGVkRXZlbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50U3BvdCA9IGUuc3BvdHMuZmluZCgoc3BvdCkgPT4gc3BvdC5kYXRhLmJyaWNrSWQgPT09IHRoaXMuYnJpY2suaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRTcG90LmlzQ3Jvc3MxM0xpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc01vdXNlTmVhciA9IGN1cnJlbnRTcG90LnRvcExlZnRQb2ludERpc3RhbmNlIDwgdGhpcy5taW5pbWFsRGlzdGFuY2VUb01vdXNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNNb3VzZU5lYXIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNkUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5mb2N1c2VkQnJpY2tTdWJzY3JpcHRpb24gPSB0aGlzLndhbGxDYW52YXNDb21wb25lbnQuZm9jdXNlZEJyaWNrJC5zdWJzY3JpYmUoKGZvY3VzZWRCcmljaykgPT4ge1xuICAgICAgICAgICAgaWYgKGZvY3VzZWRCcmljay5pZCA9PT0gdGhpcy5icmljay5pZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsbEluc3RhbmNlQXBpKCdvbldhbGxGb2N1cycsIGZvY3VzZWRCcmljay5jb250ZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zZWxlY3RlZEJyaWNrc1N1YnNjcmlwdGlvbiA9IHRoaXMud2FsbENhbnZhc0NvbXBvbmVudC5zZWxlY3RlZEJyaWNrcyQuc3Vic2NyaWJlKChzZWxlY3RlZEJyaWNrcykgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICFCb29sZWFuKHNlbGVjdGVkQnJpY2tzLmluZGV4T2YodGhpcy5icmljay5pZCkgPT09IC0xKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5pc01lZGlhSW50ZXJhY3Rpb25FbmFibGVkU3Vic2NyaXB0aW9uID0gdGhpcy53YWxsQ2FudmFzQ29tcG9uZW50LmlzTWVkaWFJbnRlcmFjdGlvbkVuYWJsZWQkXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChpc01lZGlhSW50ZXJhY3Rpb25FbmFibGVkKSA9PiB0aGlzLmlzTWVkaWFJbnRlcmFjdGlvbkVuYWJsZWQgPSBpc01lZGlhSW50ZXJhY3Rpb25FbmFibGVkKTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmIChjaGFuZ2VzLmJyaWNrICYmICFjaGFuZ2VzLmJyaWNrLmZpcnN0Q2hhbmdlICYmIGNoYW5nZXMuYnJpY2suY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudFJlZmVyZW5jZS5pbnN0YW5jZS5zdGF0ZSA9IHRoaXMuYnJpY2suc3RhdGU7XG5cbiAgICAgICAgICAgIHRoaXMuY2FsbEluc3RhbmNlQXBpKCdvbldhbGxTdGF0ZUNoYW5nZScsIHRoaXMuY29tcG9uZW50UmVmZXJlbmNlLmluc3RhbmNlLnN0YXRlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnJhZGFyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuZm9jdXNlZEJyaWNrU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRCcmlja3NTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5pc01lZGlhSW50ZXJhY3Rpb25FbmFibGVkU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVDaGFuZ2VzU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlc1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYWxsSW5zdGFuY2VBcGkobWV0aG9kTmFtZTogc3RyaW5nLCBkYXRhPzogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLmNvbXBvbmVudFJlZmVyZW5jZS5pbnN0YW5jZVttZXRob2ROYW1lXSkge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRSZWZlcmVuY2UuaW5zdGFuY2VbbWV0aG9kTmFtZV0oZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbmRlckJyaWNrKCkge1xuICAgICAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5yZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0aGlzLmJyaWNrLmNvbXBvbmVudCk7XG5cbiAgICAgICAgY29uc3QgY29tcG9uZW50UmVmZXJlbmNlID0gdGhpcy5jb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGZhY3RvcnksIG51bGwsIHRoaXMuaW5qZWN0b3IpO1xuXG4gICAgICAgIGNvbnN0IGNvbXBvbmVudEluc3RhbmNlID0gY29tcG9uZW50UmVmZXJlbmNlLmluc3RhbmNlIGFzIElXYWxsQ29tcG9uZW50O1xuXG4gICAgICAgIGNvbXBvbmVudEluc3RhbmNlLmlkID0gdGhpcy5icmljay5pZDtcbiAgICAgICAgY29tcG9uZW50SW5zdGFuY2Uuc3RhdGUgPSB0aGlzLmJyaWNrLnN0YXRlO1xuICAgICAgICBjb21wb25lbnRJbnN0YW5jZS53YWxsTW9kZWwgPSB0aGlzLndhbGxDYW52YXNDb21wb25lbnQud2FsbE1vZGVsO1xuXG4gICAgICAgIGlmIChjb21wb25lbnRJbnN0YW5jZS5zdGF0ZUNoYW5nZXMpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzU3Vic2NyaXB0aW9uID0gY29tcG9uZW50SW5zdGFuY2Uuc3RhdGVDaGFuZ2VzLnN1YnNjcmliZSgobmV3U3RhdGUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLndhbGxDYW52YXNDb21wb25lbnQuYnJpY2tTdGF0ZUNoYW5nZWQodGhpcy5icmljay5pZCwgbmV3U3RhdGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29tcG9uZW50UmVmZXJlbmNlO1xuICAgIH1cbn1cbiJdfQ==