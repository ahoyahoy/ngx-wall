/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TowCoordinator } from './tow-coordinator.service';
var TowService = /** @class */ (function () {
    function TowService(towCoordinator) {
        var _this = this;
        this.towCoordinator = towCoordinator;
        this.events = new Subject();
        this.towCoordinator.events.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            _this.events.next(e);
        }));
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    TowService.prototype.subscribe = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        return this.events.subscribe(fn);
    };
    TowService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    TowService.ctorParameters = function () { return [
        { type: TowCoordinator }
    ]; };
    return TowService;
}());
export { TowService };
if (false) {
    /** @type {?} */
    TowService.prototype.events;
    /**
     * @type {?}
     * @private
     */
    TowService.prototype.towCoordinator;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG93LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9tb2R1bGVzL3Rvdy90b3cuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsT0FBTyxFQUFlLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUV6RDtJQUlJLG9CQUFvQixjQUE4QjtRQUFsRCxpQkFJQztRQUptQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFGbEQsV0FBTSxHQUFpQixJQUFJLE9BQU8sRUFBRSxDQUFDO1FBR2pDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFDLENBQUM7WUFDbkMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7OztJQUVELDhCQUFTOzs7O0lBQVQsVUFBVSxFQUFFO1FBQ1IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyQyxDQUFDOztnQkFaSixVQUFVOzs7O2dCQUZILGNBQWM7O0lBZXRCLGlCQUFDO0NBQUEsQUFiRCxJQWFDO1NBWlksVUFBVTs7O0lBQ25CLDRCQUFxQzs7Ozs7SUFFekIsb0NBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3ViamVjdCwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7VG93Q29vcmRpbmF0b3J9IGZyb20gJy4vdG93LWNvb3JkaW5hdG9yLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVG93U2VydmljZSB7XG4gICAgZXZlbnRzOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB0b3dDb29yZGluYXRvcjogVG93Q29vcmRpbmF0b3IpIHtcbiAgICAgICAgdGhpcy50b3dDb29yZGluYXRvci5ldmVudHMuc3Vic2NyaWJlKChlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cy5uZXh0KGUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdWJzY3JpYmUoZm4pOiBTdWJzY3JpcHRpb24ge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmVudHMuc3Vic2NyaWJlKGZuKTtcbiAgICB9XG59XG4iXX0=