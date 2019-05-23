/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
var PickOutAreaComponent = /** @class */ (function () {
    function PickOutAreaComponent() {
        this.pickOutAreaModel = null;
    }
    /**
     * @param {?} pickOutAreaModel
     * @return {?}
     */
    PickOutAreaComponent.prototype.initialize = /**
     * @param {?} pickOutAreaModel
     * @return {?}
     */
    function (pickOutAreaModel) {
        this.pickOutAreaModel = pickOutAreaModel;
    };
    PickOutAreaComponent.decorators = [
        { type: Component, args: [{
                    template: "<div *ngIf=\"pickOutAreaModel\"\n     [style.left.px]=\"pickOutAreaModel.x\"\n     [style.top.px]=\"pickOutAreaModel.y\"\n     [style.width.px]=\"pickOutAreaModel.width\"\n     [style.height.px]=\"pickOutAreaModel.height\"\n     class=\"pick-out-area\">\n</div>\n",
                    styles: [".pick-out-area{opacity:.5;position:absolute}"]
                }] }
    ];
    return PickOutAreaComponent;
}());
export { PickOutAreaComponent };
if (false) {
    /** @type {?} */
    PickOutAreaComponent.prototype.pickOutAreaModel;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGljay1vdXQtYXJlYS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9tb2R1bGVzL3BpY2stb3V0L3BpY2stb3V0LWFyZWEvcGljay1vdXQtYXJlYS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFHeEM7SUFBQTtRQUtJLHFCQUFnQixHQUFxQixJQUFJLENBQUM7SUFLOUMsQ0FBQzs7Ozs7SUFIRyx5Q0FBVTs7OztJQUFWLFVBQVcsZ0JBQWtDO1FBQ3pDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztJQUM3QyxDQUFDOztnQkFUSixTQUFTLFNBQUM7b0JBQ1AsbVJBQTZDOztpQkFFaEQ7O0lBT0QsMkJBQUM7Q0FBQSxBQVZELElBVUM7U0FOWSxvQkFBb0I7OztJQUM3QixnREFBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1BpY2tPdXRBcmVhTW9kZWx9IGZyb20gJy4vcGljay1vdXQtYXJlYS5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlVXJsOiAnLi9waWNrLW91dC1hcmVhLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9waWNrLW91dC1hcmVhLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUGlja091dEFyZWFDb21wb25lbnQge1xuICAgIHBpY2tPdXRBcmVhTW9kZWw6IFBpY2tPdXRBcmVhTW9kZWwgPSBudWxsO1xuXG4gICAgaW5pdGlhbGl6ZShwaWNrT3V0QXJlYU1vZGVsOiBQaWNrT3V0QXJlYU1vZGVsKSB7XG4gICAgICAgIHRoaXMucGlja091dEFyZWFNb2RlbCA9IHBpY2tPdXRBcmVhTW9kZWw7XG4gICAgfVxufVxuIl19