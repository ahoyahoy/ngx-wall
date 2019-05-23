/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
var BrickInputPlaceholderComponent = /** @class */ (function () {
    function BrickInputPlaceholderComponent() {
        this.selected = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    BrickInputPlaceholderComponent.prototype.onClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.selected.emit(event);
    };
    /**
     * @return {?}
     */
    BrickInputPlaceholderComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    BrickInputPlaceholderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'w-brick-input-placeholder',
                    template: "<div class=\"placeholder\" (click)=\"onClick($event)\">\n    <mat-icon>{{icon}}</mat-icon>\n    <span> {{ text }} </span>\n</div>\n\n<w-loading-wrapper [message]=\"'Loading'\" *ngIf=\"loading\"></w-loading-wrapper>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".placeholder{padding:15px;display:flex;cursor:pointer;border-radius:4px;align-items:center}mat-icon{margin-right:10px}:host{position:relative;display:block}"]
                }] }
    ];
    /** @nocollapse */
    BrickInputPlaceholderComponent.ctorParameters = function () { return []; };
    BrickInputPlaceholderComponent.propDecorators = {
        text: [{ type: Input }],
        icon: [{ type: Input }],
        loading: [{ type: Input }],
        selected: [{ type: Output }]
    };
    return BrickInputPlaceholderComponent;
}());
export { BrickInputPlaceholderComponent };
if (false) {
    /** @type {?} */
    BrickInputPlaceholderComponent.prototype.text;
    /** @type {?} */
    BrickInputPlaceholderComponent.prototype.icon;
    /** @type {?} */
    BrickInputPlaceholderComponent.prototype.loading;
    /** @type {?} */
    BrickInputPlaceholderComponent.prototype.selected;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJpY2staW5wdXQtcGxhY2Vob2xkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvbW9kdWxlcy9oZWxwZXItY29tcG9uZW50cy9icmljay1pbnB1dC1wbGFjZWhvbGRlci9icmljay1pbnB1dC1wbGFjZWhvbGRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFdEc7SUFZSTtRQUZVLGFBQVEsR0FBNkIsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUdsRSxDQUFDOzs7OztJQUVELGdEQUFPOzs7O0lBQVAsVUFBUSxLQUFpQjtRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDOzs7O0lBRUQsaURBQVE7OztJQUFSO0lBQ0EsQ0FBQzs7Z0JBcEJKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsMkJBQTJCO29CQUNyQyxvT0FBdUQ7b0JBRXZELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDbEQ7Ozs7O3VCQUVJLEtBQUs7dUJBQ0wsS0FBSzswQkFDTCxLQUFLOzJCQUNMLE1BQU07O0lBV1gscUNBQUM7Q0FBQSxBQXJCRCxJQXFCQztTQWZZLDhCQUE4Qjs7O0lBQ3ZDLDhDQUFzQjs7SUFDdEIsOENBQXNCOztJQUN0QixpREFBMEI7O0lBQzFCLGtEQUFrRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3ctYnJpY2staW5wdXQtcGxhY2Vob2xkZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9icmljay1pbnB1dC1wbGFjZWhvbGRlci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vYnJpY2staW5wdXQtcGxhY2Vob2xkZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCcmlja0lucHV0UGxhY2Vob2xkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIHRleHQ6IHN0cmluZztcbiAgICBASW5wdXQoKSBpY29uOiBzdHJpbmc7XG4gICAgQElucHV0KCkgbG9hZGluZzogYm9vbGVhbjtcbiAgICBAT3V0cHV0KCkgc2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIG9uQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZC5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICB9XG59XG4iXX0=