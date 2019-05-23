/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RadarCoordinator } from './radar-coordinator.service';
var Radar = /** @class */ (function () {
    function Radar(radarCoordinator) {
        var _this = this;
        this.radarCoordinator = radarCoordinator;
        this.events = new Subject();
        this.radarCoordinator.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this.events.next(event);
        }));
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    Radar.prototype.filterSpots = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        return this.radarCoordinator.filterSpots(fn);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    Radar.prototype.subscribe = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        return this.events.subscribe(fn);
    };
    Radar.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Radar.ctorParameters = function () { return [
        { type: RadarCoordinator }
    ]; };
    return Radar;
}());
export { Radar };
if (false) {
    /**
     * @type {?}
     * @private
     */
    Radar.prototype.events;
    /**
     * @type {?}
     * @private
     */
    Radar.prototype.radarCoordinator;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkYXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL21vZHVsZXMvcmFkYXIvcmFkYXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsT0FBTyxFQUFlLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBRzdEO0lBSUksZUFBb0IsZ0JBQWtDO1FBQXRELGlCQUlDO1FBSm1CLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFGOUMsV0FBTSxHQUFpQixJQUFJLE9BQU8sRUFBRSxDQUFDO1FBR3pDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQyxLQUFLO1lBQ2xDLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVCLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7SUFFRCwyQkFBVzs7OztJQUFYLFVBQVksRUFBNkI7UUFDckMsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2pELENBQUM7Ozs7O0lBRUQseUJBQVM7Ozs7SUFBVCxVQUFVLEVBQU87UUFDYixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7O2dCQWhCSixVQUFVOzs7O2dCQUhILGdCQUFnQjs7SUFvQnhCLFlBQUM7Q0FBQSxBQWpCRCxJQWlCQztTQWhCWSxLQUFLOzs7Ozs7SUFDZCx1QkFBNkM7Ozs7O0lBRWpDLGlDQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N1YmplY3QsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1JhZGFyQ29vcmRpbmF0b3J9IGZyb20gJy4vcmFkYXItY29vcmRpbmF0b3Iuc2VydmljZSc7XG5pbXBvcnQge1Nwb3RNb2RlbH0gZnJvbSAnLi9zcG90Lm1vZGVsJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJhZGFyIHtcbiAgICBwcml2YXRlIGV2ZW50czogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmFkYXJDb29yZGluYXRvcjogUmFkYXJDb29yZGluYXRvcikge1xuICAgICAgICB0aGlzLnJhZGFyQ29vcmRpbmF0b3Iuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5ldmVudHMubmV4dChldmVudCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZpbHRlclNwb3RzKGZuOiAoc3BvdDogU3BvdE1vZGVsKSA9PiB2b2lkKTogU3BvdE1vZGVsW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5yYWRhckNvb3JkaW5hdG9yLmZpbHRlclNwb3RzKGZuKTtcbiAgICB9XG5cbiAgICBzdWJzY3JpYmUoZm46IGFueSk6IFN1YnNjcmlwdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50cy5zdWJzY3JpYmUoZm4pO1xuICAgIH1cbn1cbiJdfQ==