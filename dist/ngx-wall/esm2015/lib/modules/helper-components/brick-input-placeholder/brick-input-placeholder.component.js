/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
export class BrickInputPlaceholderComponent {
    constructor() {
        this.selected = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onClick(event) {
        this.selected.emit(event);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
BrickInputPlaceholderComponent.decorators = [
    { type: Component, args: [{
                selector: 'w-brick-input-placeholder',
                template: "<div class=\"placeholder\" (click)=\"onClick($event)\">\n    <mat-icon>{{icon}}</mat-icon>\n    <span> {{ text }} </span>\n</div>\n\n<w-loading-wrapper [message]=\"'Loading'\" *ngIf=\"loading\"></w-loading-wrapper>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".placeholder{padding:15px;display:flex;cursor:pointer;border-radius:4px;align-items:center}mat-icon{margin-right:10px}:host{position:relative;display:block}"]
            }] }
];
/** @nocollapse */
BrickInputPlaceholderComponent.ctorParameters = () => [];
BrickInputPlaceholderComponent.propDecorators = {
    text: [{ type: Input }],
    icon: [{ type: Input }],
    loading: [{ type: Input }],
    selected: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJpY2staW5wdXQtcGxhY2Vob2xkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvbW9kdWxlcy9oZWxwZXItY29tcG9uZW50cy9icmljay1pbnB1dC1wbGFjZWhvbGRlci9icmljay1pbnB1dC1wbGFjZWhvbGRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFRdEcsTUFBTSxPQUFPLDhCQUE4QjtJQU12QztRQUZVLGFBQVEsR0FBNkIsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUdsRSxDQUFDOzs7OztJQUVELE9BQU8sQ0FBQyxLQUFpQjtRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDOzs7O0lBRUQsUUFBUTtJQUNSLENBQUM7OztZQXBCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDJCQUEyQjtnQkFDckMsb09BQXVEO2dCQUV2RCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7Ozs7O21CQUVJLEtBQUs7bUJBQ0wsS0FBSztzQkFDTCxLQUFLO3VCQUNMLE1BQU07Ozs7SUFIUCw4Q0FBc0I7O0lBQ3RCLDhDQUFzQjs7SUFDdEIsaURBQTBCOztJQUMxQixrREFBa0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd3LWJyaWNrLWlucHV0LXBsYWNlaG9sZGVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vYnJpY2staW5wdXQtcGxhY2Vob2xkZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2JyaWNrLWlucHV0LXBsYWNlaG9sZGVyLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQnJpY2tJbnB1dFBsYWNlaG9sZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSB0ZXh0OiBzdHJpbmc7XG4gICAgQElucHV0KCkgaWNvbjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGxvYWRpbmc6IGJvb2xlYW47XG4gICAgQE91dHB1dCgpIHNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBvbkNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQuZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgfVxufVxuIl19