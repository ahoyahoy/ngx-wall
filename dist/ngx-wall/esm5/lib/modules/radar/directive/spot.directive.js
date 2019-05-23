/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input } from '@angular/core';
import { RadarCoordinator } from '../radar-coordinator.service';
var SpotDirective = /** @class */ (function () {
    function SpotDirective(radarCoordinator, el) {
        this.radarCoordinator = radarCoordinator;
        this.el = el;
        this.id = String(Math.random());
    }
    /**
     * @return {?}
     */
    SpotDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.radarCoordinator.register(this.id, this);
    };
    /**
     * @return {?}
     */
    SpotDirective.prototype.getInfo = /**
     * @return {?}
     */
    function () {
        return {
            id: this.id,
            data: this.getData(),
            size: this.getSize(),
            position: this.getPosition()
        };
    };
    /**
     * @return {?}
     */
    SpotDirective.prototype.getData = /**
     * @return {?}
     */
    function () {
        return this.spot;
    };
    /**
     * @return {?}
     */
    SpotDirective.prototype.getSize = /**
     * @return {?}
     */
    function () {
        return {
            width: this.el.nativeElement.offsetWidth,
            height: this.el.nativeElement.offsetHeight
        };
    };
    /**
     * @return {?}
     */
    SpotDirective.prototype.getPosition = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var offsets = this.el.nativeElement.getBoundingClientRect();
        return {
            x: offsets.left,
            y: offsets.top
        };
    };
    /**
     * @return {?}
     */
    SpotDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.radarCoordinator.unRegister(this.id);
    };
    SpotDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[spot]'
                },] }
    ];
    /** @nocollapse */
    SpotDirective.ctorParameters = function () { return [
        { type: RadarCoordinator },
        { type: ElementRef }
    ]; };
    SpotDirective.propDecorators = {
        spot: [{ type: Input }]
    };
    return SpotDirective;
}());
export { SpotDirective };
if (false) {
    /** @type {?} */
    SpotDirective.prototype.spot;
    /** @type {?} */
    SpotDirective.prototype.id;
    /**
     * @type {?}
     * @private
     */
    SpotDirective.prototype.radarCoordinator;
    /**
     * @type {?}
     * @private
     */
    SpotDirective.prototype.el;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BvdC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9tb2R1bGVzL3JhZGFyL2RpcmVjdGl2ZS9zcG90LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFvQixNQUFNLGVBQWUsQ0FBQztBQUc5RSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUU5RDtJQVFJLHVCQUFvQixnQkFBa0MsRUFDbEMsRUFBYztRQURkLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUhsQyxPQUFFLEdBQVcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBSW5DLENBQUM7Ozs7SUFFRCxnQ0FBUTs7O0lBQVI7UUFDSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEQsQ0FBQzs7OztJQUVELCtCQUFPOzs7SUFBUDtRQUNJLE9BQU87WUFDSCxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDWCxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNwQixJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNwQixRQUFRLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRTtTQUMvQixDQUFDO0lBQ04sQ0FBQzs7OztJQUVELCtCQUFPOzs7SUFBUDtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDOzs7O0lBRUQsK0JBQU87OztJQUFQO1FBQ0ksT0FBTztZQUNILEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxXQUFXO1lBQ3hDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxZQUFZO1NBQzdDLENBQUM7SUFDTixDQUFDOzs7O0lBRUQsbUNBQVc7OztJQUFYOztZQUNVLE9BQU8sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRTtRQUU3RCxPQUFPO1lBQ0gsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJO1lBQ2YsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxHQUFHO1NBQ2pCLENBQUM7SUFDTixDQUFDOzs7O0lBRUQsbUNBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDOUMsQ0FBQzs7Z0JBL0NKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsUUFBUTtpQkFDckI7Ozs7Z0JBSk8sZ0JBQWdCO2dCQUhMLFVBQVU7Ozt1QkFTeEIsS0FBSzs7SUE0Q1Ysb0JBQUM7Q0FBQSxBQWhERCxJQWdEQztTQTdDWSxhQUFhOzs7SUFDdEIsNkJBQW1COztJQUVuQiwyQkFBbUM7Ozs7O0lBRXZCLHlDQUEwQzs7Ozs7SUFDMUMsMkJBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0lTcG90SW5mbywgSVNwb3RQb3NpdGlvbiwgSVNwb3RTaXplfSBmcm9tICcuLi9pbnRlcmZhY2VzL2Rpc3RhbmNlLXRvLXNwb3QuaW50ZXJmYWNlJztcbmltcG9ydCB7U3BvdElkfSBmcm9tICcuLi9pbnRlcmZhY2VzL3Nwb3QtaWQudHlwZSc7XG5pbXBvcnQge1JhZGFyQ29vcmRpbmF0b3J9IGZyb20gJy4uL3JhZGFyLWNvb3JkaW5hdG9yLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1tzcG90XSdcbn0pXG5leHBvcnQgY2xhc3MgU3BvdERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBASW5wdXQoKSBzcG90OiBhbnk7XG5cbiAgICBpZDogU3BvdElkID0gU3RyaW5nKE1hdGgucmFuZG9tKCkpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByYWRhckNvb3JkaW5hdG9yOiBSYWRhckNvb3JkaW5hdG9yLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5yYWRhckNvb3JkaW5hdG9yLnJlZ2lzdGVyKHRoaXMuaWQsIHRoaXMpO1xuICAgIH1cblxuICAgIGdldEluZm8oKTogSVNwb3RJbmZvIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkOiB0aGlzLmlkLFxuICAgICAgICAgICAgZGF0YTogdGhpcy5nZXREYXRhKCksXG4gICAgICAgICAgICBzaXplOiB0aGlzLmdldFNpemUoKSxcbiAgICAgICAgICAgIHBvc2l0aW9uOiB0aGlzLmdldFBvc2l0aW9uKClcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXREYXRhKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNwb3Q7XG4gICAgfVxuXG4gICAgZ2V0U2l6ZSgpOiBJU3BvdFNpemUge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IHRoaXMuZWwubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdldFBvc2l0aW9uKCk6IElTcG90UG9zaXRpb24ge1xuICAgICAgICBjb25zdCBvZmZzZXRzID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiBvZmZzZXRzLmxlZnQsXG4gICAgICAgICAgICB5OiBvZmZzZXRzLnRvcFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnJhZGFyQ29vcmRpbmF0b3IudW5SZWdpc3Rlcih0aGlzLmlkKTtcbiAgICB9XG59XG4iXX0=