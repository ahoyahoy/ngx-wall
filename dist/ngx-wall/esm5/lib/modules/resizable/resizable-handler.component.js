/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
var ResizableHandlerComponent = /** @class */ (function () {
    function ResizableHandlerComponent() {
        this.mouseDownEvent = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    ResizableHandlerComponent.prototype.mouseDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.mouseDownEvent.emit(event);
    };
    ResizableHandlerComponent.decorators = [
        { type: Component, args: [{
                    template: "<span [ngClass]=\"customClassName\"></span>"
                }] }
    ];
    ResizableHandlerComponent.propDecorators = {
        customClassName: [{ type: Input }],
        mouseDownEvent: [{ type: Output }],
        mouseDown: [{ type: HostListener, args: ['mousedown', ['$event'],] }]
    };
    return ResizableHandlerComponent;
}());
export { ResizableHandlerComponent };
if (false) {
    /** @type {?} */
    ResizableHandlerComponent.prototype.customClassName;
    /** @type {?} */
    ResizableHandlerComponent.prototype.mouseDownEvent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXphYmxlLWhhbmRsZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvbW9kdWxlcy9yZXNpemFibGUvcmVzaXphYmxlLWhhbmRsZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUVuRjtJQUFBO1FBS2MsbUJBQWMsR0FBNkIsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQU01RSxDQUFDOzs7OztJQUhHLDZDQUFTOzs7O0lBRFQsVUFDVSxLQUFpQjtRQUN2QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDOztnQkFWSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLDZDQUEyQztpQkFDeEQ7OztrQ0FFSSxLQUFLO2lDQUNMLE1BQU07NEJBRU4sWUFBWSxTQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7SUFJekMsZ0NBQUM7Q0FBQSxBQVhELElBV0M7U0FSWSx5QkFBeUI7OztJQUNsQyxvREFBaUM7O0lBQ2pDLG1EQUF3RSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlOiBgPHNwYW4gW25nQ2xhc3NdPVwiY3VzdG9tQ2xhc3NOYW1lXCI+PC9zcGFuPmBcbn0pXG5leHBvcnQgY2xhc3MgUmVzaXphYmxlSGFuZGxlckNvbXBvbmVudCB7XG4gICAgQElucHV0KCkgY3VzdG9tQ2xhc3NOYW1lOiBzdHJpbmc7XG4gICAgQE91dHB1dCgpIG1vdXNlRG93bkV2ZW50OiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZWRvd24nLCBbJyRldmVudCddKVxuICAgIG1vdXNlRG93bihldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICB0aGlzLm1vdXNlRG93bkV2ZW50LmVtaXQoZXZlbnQpO1xuICAgIH1cbn1cbiJdfQ==