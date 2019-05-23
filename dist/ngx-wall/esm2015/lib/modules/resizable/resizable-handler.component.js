/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
export class ResizableHandlerComponent {
    constructor() {
        this.mouseDownEvent = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    mouseDown(event) {
        this.mouseDownEvent.emit(event);
    }
}
ResizableHandlerComponent.decorators = [
    { type: Component, args: [{
                template: `<span [ngClass]="customClassName"></span>`
            }] }
];
ResizableHandlerComponent.propDecorators = {
    customClassName: [{ type: Input }],
    mouseDownEvent: [{ type: Output }],
    mouseDown: [{ type: HostListener, args: ['mousedown', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    ResizableHandlerComponent.prototype.customClassName;
    /** @type {?} */
    ResizableHandlerComponent.prototype.mouseDownEvent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXphYmxlLWhhbmRsZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvbW9kdWxlcy9yZXNpemFibGUvcmVzaXphYmxlLWhhbmRsZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUtuRixNQUFNLE9BQU8seUJBQXlCO0lBSHRDO1FBS2MsbUJBQWMsR0FBNkIsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQU01RSxDQUFDOzs7OztJQUhHLFNBQVMsQ0FBQyxLQUFpQjtRQUN2QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7WUFWSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDJDQUEyQzthQUN4RDs7OzhCQUVJLEtBQUs7NkJBQ0wsTUFBTTt3QkFFTixZQUFZLFNBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDOzs7O0lBSHJDLG9EQUFpQzs7SUFDakMsbURBQXdFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGU6IGA8c3BhbiBbbmdDbGFzc109XCJjdXN0b21DbGFzc05hbWVcIj48L3NwYW4+YFxufSlcbmV4cG9ydCBjbGFzcyBSZXNpemFibGVIYW5kbGVyQ29tcG9uZW50IHtcbiAgICBASW5wdXQoKSBjdXN0b21DbGFzc05hbWU6IHN0cmluZztcbiAgICBAT3V0cHV0KCkgbW91c2VEb3duRXZlbnQ6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlZG93bicsIFsnJGV2ZW50J10pXG4gICAgbW91c2VEb3duKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIHRoaXMubW91c2VEb3duRXZlbnQuZW1pdChldmVudCk7XG4gICAgfVxufVxuIl19