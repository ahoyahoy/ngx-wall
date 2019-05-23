/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
export class PlaceholderComponent {
    /**
     * @param {?} x
     * @param {?} y
     * @param {?} size
     * @param {?} isHorizontal
     * @return {?}
     */
    setCoordinate(x, y, size, isHorizontal) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.isHorizontal = isHorizontal;
    }
}
PlaceholderComponent.decorators = [
    { type: Component, args: [{
                template: "<div *ngIf=\"x\">\n    <div *ngIf=\"isHorizontal\"\n         [style.left.px]=\"x\"\n         [style.top.px]=\"y\"\n         [style.width.px]=\"size\"\n         [style.height.px]=\"3\"\n         class=\"tow-placeholder\">\n    </div>\n\n    <div *ngIf=\"!isHorizontal\"\n         [style.left.px]=\"x\"\n         [style.top.px]=\"y\"\n         [style.width.px]=\"3\"\n         [style.height.px]=\"size\"\n         class=\"tow-placeholder\">\n    </div>\n</div>",
                styles: [".tow-placeholder{opacity:.5;position:fixed;border-radius:2px}"]
            }] }
];
if (false) {
    /** @type {?} */
    PlaceholderComponent.prototype.x;
    /** @type {?} */
    PlaceholderComponent.prototype.y;
    /** @type {?} */
    PlaceholderComponent.prototype.size;
    /** @type {?} */
    PlaceholderComponent.prototype.isHorizontal;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2Vob2xkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvbW9kdWxlcy9jb21wb25lbnRzL3BsYWNlaG9sZGVyLXJlbmRlcmVyL2NvbXBvbmVudC9wbGFjZWhvbGRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFNeEMsTUFBTSxPQUFPLG9CQUFvQjs7Ozs7Ozs7SUFNN0IsYUFBYSxDQUFDLENBQVMsRUFBRSxDQUFTLEVBQUUsSUFBWSxFQUFFLFlBQXFCO1FBQ25FLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztJQUNyQyxDQUFDOzs7WUFmSixTQUFTLFNBQUM7Z0JBQ1Asc2RBQTJDOzthQUU5Qzs7OztJQUVHLGlDQUFVOztJQUNWLGlDQUFVOztJQUNWLG9DQUFhOztJQUNiLDRDQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGVVcmw6ICcuL3BsYWNlaG9sZGVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9wbGFjZWhvbGRlci5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFBsYWNlaG9sZGVyQ29tcG9uZW50IHtcbiAgICB4OiBudW1iZXI7XG4gICAgeTogbnVtYmVyO1xuICAgIHNpemU6IG51bWJlcjtcbiAgICBpc0hvcml6b250YWw6IGJvb2xlYW47XG5cbiAgICBzZXRDb29yZGluYXRlKHg6IG51bWJlciwgeTogbnVtYmVyLCBzaXplOiBudW1iZXIsIGlzSG9yaXpvbnRhbDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgICAgICB0aGlzLmlzSG9yaXpvbnRhbCA9IGlzSG9yaXpvbnRhbDtcbiAgICB9XG59XG4iXX0=