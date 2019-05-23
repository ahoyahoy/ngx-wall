/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this.radarSubscription = this.radar.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if (e instanceof LocationUpdatedEvent) {
                /** @type {?} */
                var currentSpot = e.spots.find((/**
                 * @param {?} spot
                 * @return {?}
                 */
                function (spot) { return spot.data.brickId === _this.brick.id; }));
                if (currentSpot.isCross13Line) {
                    _this.isMouseNear = currentSpot.topLeftPointDistance < _this.minimalDistanceToMouse;
                }
                else {
                    _this.isMouseNear = false;
                }
                _this.cdRef.detectChanges();
            }
        }));
        this.focusedBrickSubscription = this.wallCanvasComponent.focusedBrick$.subscribe((/**
         * @param {?} focusedBrick
         * @return {?}
         */
        function (focusedBrick) {
            if (focusedBrick.id === _this.brick.id) {
                _this.callInstanceApi('onWallFocus', focusedBrick.context);
            }
        }));
        this.selectedBricksSubscription = this.wallCanvasComponent.selectedBricks$.subscribe((/**
         * @param {?} selectedBricks
         * @return {?}
         */
        function (selectedBricks) {
            _this.selected = !Boolean(selectedBricks.indexOf(_this.brick.id) === -1);
        }));
        this.isMediaInteractionEnabledSubscription = this.wallCanvasComponent.isMediaInteractionEnabled$
            .subscribe((/**
         * @param {?} isMediaInteractionEnabled
         * @return {?}
         */
        function (isMediaInteractionEnabled) { return _this.isMediaInteractionEnabled = isMediaInteractionEnabled; }));
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
            this.stateChangesSubscription = componentInstance.stateChanges.subscribe((/**
             * @param {?} newState
             * @return {?}
             */
            function (newState) {
                _this.wallCanvasComponent.brickStateChanged(_this.brick.id, newState);
            }));
        }
        return componentReference;
    };
    WallCanvasBrickComponent.decorators = [
        { type: Component, args: [{
                    selector: 'wall-canvas-brick',
                    template: "<div [spot]=\"spot\"\n     data-id=\"{{brick.id}}\"\n     class=\"wall-canvas-brick__wrapper wall-canvas-brick__draggable\"\n     [ngClass]=\"{'wall-canvas-brick__selected': selected,\n     \t\t'wall-canvas-brick__draggable': isMouseNear}\">\n\n    <div class=\"wall-canvas-brick__draggable-handler\" [tow-slave]=\"brick.id\">\n        <div class=\"wall-canvas-brick__draggable-box\">\n            <mat-icon>drag_handle</mat-icon>\n        </div>\n    </div>\n\n    <div [ngClass]=\"{'wall-canvas-brick__disabled-interaction': !isMediaInteractionEnabled}\">\n        <ng-container #brickContainer></ng-container>\n    </div>\n</div>\n",
                    styles: [":host{display:block;margin:0 0 2px}:host .wall-canvas-brick__draggable .wall-canvas-brick__draggable-handler{display:block}:host .wall-canvas-brick__wrapper{position:relative}:host .wall-canvas-brick__wrapper:after{content:'';position:absolute;top:0;bottom:0;left:0;right:0;pointer-events:none;opacity:.2;transition:background-color .1s}:host .wall-canvas-brick__draggable-box{padding:1px;border-radius:3px;line-height:0}:host .wall-canvas-brick__draggable-handler{display:none;position:absolute;left:-35px;top:-4px;padding:5px;margin:0;cursor:pointer;border-radius:3px}:host .wall-canvas-brick__selected{position:relative}:host .wall-canvas-brick__disabled-interaction{pointer-events:none}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbC1jYW52YXMtYnJpY2suY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvd2FsbC9jb21wb25lbnRzL3dhbGwtY2FudmFzL2NvbXBvbmVudHMvd2FsbC1jYW52YXMtYnJpY2svd2FsbC1jYW52YXMtYnJpY2suY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCx3QkFBd0IsRUFFeEIsUUFBUSxFQUNSLEtBQUssRUFLTCxTQUFTLEVBQ1QsZ0JBQWdCLEVBQ25CLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQ2hFLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSw0Q0FBNEMsQ0FBQztBQUNqRSxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSw0REFBNEQsQ0FBQztBQUdoRztJQThCSSxrQ0FBb0IsUUFBa0IsRUFDbEIsUUFBa0MsRUFDbEMsS0FBWSxFQUNaLEtBQXdCLEVBQ3hCLG1CQUF3QztRQUp4QyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGFBQVEsR0FBUixRQUFRLENBQTBCO1FBQ2xDLFVBQUssR0FBTCxLQUFLLENBQU87UUFDWixVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQUN4Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBdkI1RCxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRWpCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBSXBCLDhCQUF5QixHQUFHLElBQUksQ0FBQztRQUl6QiwyQkFBc0IsR0FBRyxHQUFHLENBQUM7SUFjckMsQ0FBQzs7OztJQUVELDJDQUFROzs7SUFBUjtRQUFBLGlCQW1DQztRQWxDRyxJQUFJLENBQUMsSUFBSSxHQUFHO1lBQ1IsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN0QixhQUFhLEVB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cEQ7Ozs7Z0JBbkJHLFFBQVE7Z0JBRlIsd0JBQXdCO2dCQWFwQixLQUFLO2dCQWZULGlCQUFpQjtnQkFjYixtQkFBbUI7Ozt3QkFZdEIsS0FBSzs0QkFFTCxTQUFTLFNBQUMsZ0JBQWdCLEVBQUUsRUFBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUM7O0lBNkd6RCwrQkFBQztDQUFBLEFBdEhELElBc0hDO1NBakhZLHdCQUF3Qjs7O0lBRWpDLHlDQUFvQjs7SUFFcEIsNkNBQW1GOztJQUVuRiw0Q0FBaUI7O0lBRWpCLCtDQUFvQjs7SUFFcEIsd0NBQVU7O0lBRVYsNkRBQWlDOzs7OztJQUVqQyxzREFBOEM7Ozs7O0lBRTlDLDBEQUFxQzs7Ozs7SUFHckMsNERBQStDOzs7OztJQUMvQyxxREFBd0M7Ozs7O0lBQ3hDLDREQUErQzs7Ozs7SUFDL0MsOERBQWlEOzs7OztJQUNqRCx5RUFBNEQ7Ozs7O0lBRWhELDRDQUEwQjs7Ozs7SUFDMUIsNENBQTBDOzs7OztJQUMxQyx5Q0FBb0I7Ozs7O0lBQ3BCLHlDQUFnQzs7Ozs7SUFDaEMsdURBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIENvbXBvbmVudFJlZixcbiAgICBJbmplY3RvcixcbiAgICBJbnB1dCxcbiAgICBPbkNoYW5nZXMsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtXYWxsQ2FudmFzQ29tcG9uZW50fSBmcm9tICcuLi8uLi93YWxsLWNhbnZhcy5jb21wb25lbnQnO1xuaW1wb3J0IHtSYWRhcn0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9yYWRhci9yYWRhci5zZXJ2aWNlJztcbmltcG9ydCB7TG9jYXRpb25VcGRhdGVkRXZlbnR9IGZyb20gJy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvcmFkYXIvZXZlbnRzL2xvY2F0aW9uLXVwZGF0ZWQuZXZlbnQnO1xuaW1wb3J0IHtJV2FsbENvbXBvbmVudH0gZnJvbSAnLi4vLi4vLi4vd2FsbC9pbnRlcmZhY2VzL3dhbGwtY29tcG9uZW50L3dhbGwtY29tcG9uZW50LmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnd2FsbC1jYW52YXMtYnJpY2snLFxuICAgIHRlbXBsYXRlVXJsOiAnLi93YWxsLWNhbnZhcy1icmljay5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vd2FsbC1jYW52YXMtYnJpY2suY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBXYWxsQ2FudmFzQnJpY2tDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcbiAgICAvLyB0b2RvIGFkZCB0eXBlXG4gICAgQElucHV0KCkgYnJpY2s6IGFueTtcblxuICAgIEBWaWV3Q2hpbGQoJ2JyaWNrQ29udGFpbmVyJywge3JlYWQ6IFZpZXdDb250YWluZXJSZWZ9KSBjb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgICBzZWxlY3RlZCA9IGZhbHNlO1xuXG4gICAgaXNNb3VzZU5lYXIgPSBmYWxzZTtcblxuICAgIHNwb3Q6IGFueTtcblxuICAgIGlzTWVkaWFJbnRlcmFjdGlvbkVuYWJsZWQgPSB0cnVlO1xuXG4gICAgcHJpdmF0ZSBjb21wb25lbnRSZWZlcmVuY2U6IENvbXBvbmVudFJlZjxhbnk+O1xuXG4gICAgcHJpdmF0ZSBtaW5pbWFsRGlzdGFuY2VUb01vdXNlID0gMTAwO1xuXG4gICAgLy8gc3Vic2NyaXB0aW9uc1xuICAgIHByaXZhdGUgc3RhdGVDaGFuZ2VzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gICAgcHJpdmF0ZSByYWRhclN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICAgIHByaXZhdGUgZm9jdXNlZEJyaWNrU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gICAgcHJpdmF0ZSBzZWxlY3RlZEJyaWNrc1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICAgIHByaXZhdGUgaXNNZWRpYUludGVyYWN0aW9uRW5hYmxlZFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcmFkYXI6IFJhZGFyLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgd2FsbENhbnZhc0NvbXBvbmVudDogV2FsbENhbnZhc0NvbXBvbmVudCkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnNwb3QgPSB7XG4gICAgICAgICAgICBicmlja0lkOiB0aGlzLmJyaWNrLmlkLFxuICAgICAgICAgICAgaXNQaWNrT3V0SXRlbTogdHJ1ZSxcbiAgICAgICAgICAgIGlzQmVhY29uOiB0cnVlXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnRSZWZlcmVuY2UgPSB0aGlzLnJlbmRlckJyaWNrKCk7XG5cbiAgICAgICAgdGhpcy5yYWRhclN1YnNjcmlwdGlvbiA9IHRoaXMucmFkYXIuc3Vic2NyaWJlKChlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIExvY2F0aW9uVXBkYXRlZEV2ZW50KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFNwb3QgPSBlLnNwb3RzLmZpbmQoKHNwb3QpID0+IHNwb3QuZGF0YS5icmlja0lkID09PSB0aGlzLmJyaWNrLmlkKTtcblxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50U3BvdC5pc0Nyb3NzMTNMaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNNb3VzZU5lYXIgPSBjdXJyZW50U3BvdC50b3BMZWZ0UG9pbnREaXN0YW5jZSA8IHRoaXMubWluaW1hbERpc3RhbmNlVG9Nb3VzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzTW91c2VOZWFyID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZm9jdXNlZEJyaWNrU3Vic2NyaXB0aW9uID0gdGhpcy53YWxsQ2FudmFzQ29tcG9uZW50LmZvY3VzZWRCcmljayQuc3Vic2NyaWJlKChmb2N1c2VkQnJpY2spID0+IHtcbiAgICAgICAgICAgIGlmIChmb2N1c2VkQnJpY2suaWQgPT09IHRoaXMuYnJpY2suaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGxJbnN0YW5jZUFwaSgnb25XYWxsRm9jdXMnLCBmb2N1c2VkQnJpY2suY29udGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRCcmlja3NTdWJzY3JpcHRpb24gPSB0aGlzLndhbGxDYW52YXNDb21wb25lbnQuc2VsZWN0ZWRCcmlja3MkLnN1YnNjcmliZSgoc2VsZWN0ZWRCcmlja3MpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAhQm9vbGVhbihzZWxlY3RlZEJyaWNrcy5pbmRleE9mKHRoaXMuYnJpY2suaWQpID09PSAtMSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuaXNNZWRpYUludGVyYWN0aW9uRW5hYmxlZFN1YnNjcmlwdGlvbiA9IHRoaXMud2FsbENhbnZhc0NvbXBvbmVudC5pc01lZGlhSW50ZXJhY3Rpb25FbmFibGVkJFxuICAgICAgICAgICAgLnN1YnNjcmliZSgoaXNNZWRpYUludGVyYWN0aW9uRW5hYmxlZCkgPT4gdGhpcy5pc01lZGlhSW50ZXJhY3Rpb25FbmFibGVkID0gaXNNZWRpYUludGVyYWN0aW9uRW5hYmxlZCk7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoY2hhbmdlcy5icmljayAmJiAhY2hhbmdlcy5icmljay5maXJzdENoYW5nZSAmJiBjaGFuZ2VzLmJyaWNrLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRSZWZlcmVuY2UuaW5zdGFuY2Uuc3RhdGUgPSB0aGlzLmJyaWNrLnN0YXRlO1xuXG4gICAgICAgICAgICB0aGlzLmNhbGxJbnN0YW5jZUFwaSgnb25XYWxsU3RhdGVDaGFuZ2UnLCB0aGlzLmNvbXBvbmVudFJlZmVyZW5jZS5pbnN0YW5jZS5zdGF0ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5yYWRhclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLmZvY3VzZWRCcmlja1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkQnJpY2tzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuaXNNZWRpYUludGVyYWN0aW9uRW5hYmxlZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuXG4gICAgICAgIGlmICh0aGlzLnN0YXRlQ2hhbmdlc1N1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY2FsbEluc3RhbmNlQXBpKG1ldGhvZE5hbWU6IHN0cmluZywgZGF0YT86IGFueSkge1xuICAgICAgICBpZiAodGhpcy5jb21wb25lbnRSZWZlcmVuY2UuaW5zdGFuY2VbbWV0aG9kTmFtZV0pIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50UmVmZXJlbmNlLmluc3RhbmNlW21ldGhvZE5hbWVdKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW5kZXJCcmljaygpIHtcbiAgICAgICAgY29uc3QgZmFjdG9yeSA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodGhpcy5icmljay5jb21wb25lbnQpO1xuXG4gICAgICAgIGNvbnN0IGNvbXBvbmVudFJlZmVyZW5jZSA9IHRoaXMuY29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5LCBudWxsLCB0aGlzLmluamVjdG9yKTtcblxuICAgICAgICBjb25zdCBjb21wb25lbnRJbnN0YW5jZSA9IGNvbXBvbmVudFJlZmVyZW5jZS5pbnN0YW5jZSBhcyBJV2FsbENvbXBvbmVudDtcblxuICAgICAgICBjb21wb25lbnRJbnN0YW5jZS5pZCA9IHRoaXMuYnJpY2suaWQ7XG4gICAgICAgIGNvbXBvbmVudEluc3RhbmNlLnN0YXRlID0gdGhpcy5icmljay5zdGF0ZTtcbiAgICAgICAgY29tcG9uZW50SW5zdGFuY2Uud2FsbE1vZGVsID0gdGhpcy53YWxsQ2FudmFzQ29tcG9uZW50LndhbGxNb2RlbDtcblxuICAgICAgICBpZiAoY29tcG9uZW50SW5zdGFuY2Uuc3RhdGVDaGFuZ2VzKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlc1N1YnNjcmlwdGlvbiA9IGNvbXBvbmVudEluc3RhbmNlLnN0YXRlQ2hhbmdlcy5zdWJzY3JpYmUoKG5ld1N0YXRlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy53YWxsQ2FudmFzQ29tcG9uZW50LmJyaWNrU3RhdGVDaGFuZ2VkKHRoaXMuYnJpY2suaWQsIG5ld1N0YXRlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudFJlZmVyZW5jZTtcbiAgICB9XG59XG4iXX0=