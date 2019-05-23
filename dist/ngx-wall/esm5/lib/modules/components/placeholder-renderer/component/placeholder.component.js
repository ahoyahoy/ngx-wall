/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
var PlaceholderComponent = /** @class */ (function () {
    function PlaceholderComponent() {
    }
    /**
     * @param {?} x
     * @param {?} y
     * @param {?} size
     * @param {?} isHorizontal
     * @return {?}
     */
    PlaceholderComponent.prototype.setCoordinate = /**
     * @param {?} x
     * @param {?} y
     * @param {?} size
     * @param {?} isHorizontal
     * @return {?}
     */
    function (x, y, size, isHorizontal) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.isHorizontal = isHorizontal;
    };
    PlaceholderComponent.decorators = [
        { type: Component, args: [{
                    template: "<div *ngIf=\"x\">\n    <div *ngIf=\"isHorizontal\"\n         [style.left.px]=\"x\"\n         [style.top.px]=\"y\"\n         [style.width.px]=\"size\"\n         [style.height.px]=\"3\"\n         class=\"tow-placeholder\">\n    </div>\n\n    <div *ngIf=\"!isHorizontal\"\n         [style.left.px]=\"x\"\n         [style.top.px]=\"y\"\n         [style.width.px]=\"3\"\n         [style.height.px]=\"size\"\n         class=\"tow-placeholder\">\n    </div>\n</div>",
                    styles: [".tow-placeholder{opacity:.5;position:fixed;border-radius:2px}"]
                }] }
    ];
    return PlaceholderComponent;
}());
export { PlaceholderComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2Vob2xkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvbW9kdWxlcy9jb21wb25lbnRzL3BsYWNlaG9sZGVyLXJlbmRlcmVyL2NvbXBvbmVudC9wbGFjZWhvbGRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFeEM7SUFBQTtJQWdCQSxDQUFDOzs7Ozs7OztJQU5HLDRDQUFhOzs7Ozs7O0lBQWIsVUFBYyxDQUFTLEVBQUUsQ0FBUyxFQUFFLElBQVksRUFBRSxZQUFxQjtRQUNuRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNYLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7SUFDckMsQ0FBQzs7Z0JBZkosU0FBUyxTQUFDO29CQUNQLHNkQUEyQzs7aUJBRTlDOztJQWFELDJCQUFDO0NBQUEsQUFoQkQsSUFnQkM7U0FaWSxvQkFBb0I7OztJQUM3QixpQ0FBVTs7SUFDVixpQ0FBVTs7SUFDVixvQ0FBYTs7SUFDYiw0Q0FBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlVXJsOiAnLi9wbGFjZWhvbGRlci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vcGxhY2Vob2xkZXIuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQbGFjZWhvbGRlckNvbXBvbmVudCB7XG4gICAgeDogbnVtYmVyO1xuICAgIHk6IG51bWJlcjtcbiAgICBzaXplOiBudW1iZXI7XG4gICAgaXNIb3Jpem9udGFsOiBib29sZWFuO1xuXG4gICAgc2V0Q29vcmRpbmF0ZSh4OiBudW1iZXIsIHk6IG51bWJlciwgc2l6ZTogbnVtYmVyLCBpc0hvcml6b250YWw6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICAgICAgdGhpcy5pc0hvcml6b250YWwgPSBpc0hvcml6b250YWw7XG4gICAgfVxufVxuIl19