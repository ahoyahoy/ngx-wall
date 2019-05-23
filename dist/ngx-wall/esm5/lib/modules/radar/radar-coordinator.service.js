/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, NgZone } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { LocationUpdatedEvent } from './events/location-updated.event';
import { SpotModel } from './spot.model';
var RadarCoordinator = /** @class */ (function () {
    function RadarCoordinator(doc, zone) {
        var _this = this;
        this.zone = zone;
        this.spots = new Map();
        this.events = new Subject();
        this.mouseMove$ = fromEvent(doc, 'mousemove');
        /** @type {?} */
        var throttleMouseTime = 30;
        // run outside Angular Zone in order to decrease performance hit
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this.mouseMove$
                .pipe(throttleTime(throttleMouseTime))
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                _this.updateSpotsInfo();
                _this.updateLocationPosition(event.clientX, event.clientY);
            }));
        }));
    }
    /**
     * @param {?} spotId
     * @param {?} spotInstance
     * @return {?}
     */
    RadarCoordinator.prototype.register = /**
     * @param {?} spotId
     * @param {?} spotInstance
     * @return {?}
     */
    function (spotId, spotInstance) {
        this.spots.set(spotId, new SpotModel(spotInstance));
    };
    /**
     * @param {?} spotId
     * @return {?}
     */
    RadarCoordinator.prototype.unRegister = /**
     * @param {?} spotId
     * @return {?}
     */
    function (spotId) {
        this.spots.delete(spotId);
    };
    /**
     * @return {?}
     */
    RadarCoordinator.prototype.updateSpotsInfo = /**
     * @return {?}
     */
    function () {
        this.spots.forEach((/**
         * @param {?} spot
         * @return {?}
         */
        function (spot) { return spot.updateInfo(); }));
    };
    /**
     * @param {?} predicate
     * @return {?}
     */
    RadarCoordinator.prototype.filterSpots = /**
     * @param {?} predicate
     * @return {?}
     */
    function (predicate) {
        return Array.from(this.spots)
            .map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = tslib_1.__read(_a, 2), id = _b[0], spot = _b[1];
            return spot;
        }))
            .filter((/**
         * @param {?} spot
         * @return {?}
         */
        function (spot) { return predicate(spot); }));
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    RadarCoordinator.prototype.subscribe = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        return this.events.subscribe(fn);
    };
    /**
     * @private
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    RadarCoordinator.prototype.updateLocationPosition = /**
     * @private
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    function (x, y) {
        /** @type {?} */
        var sortedSpots = [];
        this.spots.forEach((/**
         * @param {?} spot
         * @return {?}
         */
        function (spot) {
            /** @type {?} */
            var minimalDistance = spot.getMinimalDistanceToPoint(x, y);
            /** @type {?} */
            var topLeftPointDistance = spot.getDistanceToTopLeftPoint(x, y);
            /** @type {?} */
            var bottomLeftPointDistance = spot.getDistanceToBottomLeftPoint(x, y);
            /** @type {?} */
            var centerLeftPointDistance = spot.getDistanceToLeftCenterPoint(x, y);
            /** @type {?} */
            var isCross13Line = spot.isCross13Line(y);
            sortedSpots.push({
                minimalDistance: minimalDistance,
                topLeftPointDistance: topLeftPointDistance,
                bottomLeftPointDistance: bottomLeftPointDistance,
                centerLeftPointDistance: centerLeftPointDistance,
                isCross13Line: isCross13Line,
                data: spot.data
            });
        }));
        this.events.next(new LocationUpdatedEvent(sortedSpots));
    };
    RadarCoordinator.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    RadarCoordinator.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: NgZone }
    ]; };
    return RadarCoordinator;
}());
export { RadarCoordinator };
if (false) {
    /**
     * @type {?}
     * @private
     */
    RadarCoordinator.prototype.spots;
    /**
     * @type {?}
     * @private
     */
    RadarCoordinator.prototype.events;
    /**
     * @type {?}
     * @private
     */
    RadarCoordinator.prototype.mouseMove$;
    /**
     * @type {?}
     * @private
     */
    RadarCoordinator.prototype.zone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkYXItY29vcmRpbmF0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL21vZHVsZXMvcmFkYXIvcmFkYXItY29vcmRpbmF0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFDLFNBQVMsRUFBYyxPQUFPLEVBQWUsTUFBTSxNQUFNLENBQUM7QUFDbEUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRTVDLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBR3JFLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFFdkM7SUFRSSwwQkFBOEIsR0FBRyxFQUNiLElBQVk7UUFEaEMsaUJBaUJDO1FBaEJtQixTQUFJLEdBQUosSUFBSSxDQUFRO1FBUHhCLFVBQUssR0FBMkIsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUUxQyxXQUFNLEdBQWlCLElBQUksT0FBTyxFQUFFLENBQUM7UUFNekMsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDOztZQUV4QyxpQkFBaUIsR0FBRyxFQUFFO1FBRTVCLGdFQUFnRTtRQUNoRSxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQjs7O1FBQUM7WUFDeEIsS0FBSSxDQUFDLFVBQVU7aUJBQ1YsSUFBSSxDQUNELFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxDQUNsQztpQkFDQSxTQUFTOzs7O1lBQUMsVUFBQyxLQUFLO2dCQUNiLEtBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDdkIsS0FBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzlELENBQUMsRUFBQyxDQUFDO1FBQ1gsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7Ozs7SUFFRCxtQ0FBUTs7Ozs7SUFBUixVQUFTLE1BQWMsRUFBRSxZQUEyQjtRQUNoRCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDOzs7OztJQUVELHFDQUFVOzs7O0lBQVYsVUFBVyxNQUFjO1FBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLENBQUM7Ozs7SUFFRCwwQ0FBZTs7O0lBQWY7UUFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU87Ozs7UUFBQyxVQUFDLElBQUksSUFBSyxPQUFBLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBakIsQ0FBaUIsRUFBQyxDQUFDO0lBQ3BELENBQUM7Ozs7O0lBRUQsc0NBQVc7Ozs7SUFBWCxVQUFZLFNBQW9DO1FBQzVDLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2FBQ3hCLEdBQUc7Ozs7UUFBQyxVQUFDLEVBQVU7Z0JBQVYsMEJBQVUsRUFBVCxVQUFFLEVBQUUsWUFBSTtZQUFNLE9BQUEsSUFBSTtRQUFKLENBQUksRUFBQzthQUN6QixNQUFNOzs7O1FBQUMsVUFBQyxJQUFJLElBQUssT0FBQSxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQWYsQ0FBZSxFQUFDLENBQUM7SUFDM0MsQ0FBQzs7Ozs7SUFFRCxvQ0FBUzs7OztJQUFULFVBQVUsRUFBTztRQUNiLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDckMsQ0FBQzs7Ozs7OztJQUVPLGlEQUFzQjs7Ozs7O0lBQTlCLFVBQStCLENBQVMsRUFBRSxDQUFTOztZQUN6QyxXQUFXLEdBQXNCLEVBQUU7UUFFekMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQyxJQUFJOztnQkFDZCxlQUFlLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7O2dCQUN0RCxvQkFBb0IsR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7Z0JBQzNELHVCQUF1QixHQUFHLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDOztnQkFDakUsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7O2dCQUNqRSxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFFM0MsV0FBVyxDQUFDLElBQUksQ0FBQztnQkFDYixlQUFlLGlCQUFBO2dCQUNmLG9CQUFvQixzQkFBQTtnQkFDcEIsdUJBQXVCLHlCQUFBO2dCQUN2Qix1QkFBdUIseUJBQUE7Z0JBQ3ZCLGFBQWEsZUFBQTtnQkFDYixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7YUFDbEIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxFQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQzs7Z0JBdEVKLFVBQVU7Ozs7Z0RBUU0sTUFBTSxTQUFDLFFBQVE7Z0JBakJKLE1BQU07O0lBZ0ZsQyx1QkFBQztDQUFBLEFBdkVELElBdUVDO1NBdEVZLGdCQUFnQjs7Ozs7O0lBQ3pCLGlDQUFrRDs7Ozs7SUFFbEQsa0NBQTZDOzs7OztJQUU3QyxzQ0FBMkM7Ozs7O0lBRy9CLGdDQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgTmdab25lfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7ZnJvbUV2ZW50LCBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHt0aHJvdHRsZVRpbWV9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7U3BvdERpcmVjdGl2ZX0gZnJvbSAnLi9kaXJlY3RpdmUvc3BvdC5kaXJlY3RpdmUnO1xuaW1wb3J0IHtMb2NhdGlvblVwZGF0ZWRFdmVudH0gZnJvbSAnLi9ldmVudHMvbG9jYXRpb24tdXBkYXRlZC5ldmVudCc7XG5pbXBvcnQge0lEaXN0YW5jZVRvU3BvdH0gZnJvbSAnLi9pbnRlcmZhY2VzL2Rpc3RhbmNlLXRvLXNwb3QuaW50ZXJmYWNlJztcbmltcG9ydCB7U3BvdElkfSBmcm9tICcuL2ludGVyZmFjZXMvc3BvdC1pZC50eXBlJztcbmltcG9ydCB7U3BvdE1vZGVsfSBmcm9tICcuL3Nwb3QubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmFkYXJDb29yZGluYXRvciB7XG4gICAgcHJpdmF0ZSBzcG90czogTWFwPFNwb3RJZCwgU3BvdE1vZGVsPiA9IG5ldyBNYXAoKTtcblxuICAgIHByaXZhdGUgZXZlbnRzOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpO1xuXG4gICAgcHJpdmF0ZSBtb3VzZU1vdmUkOiBPYnNlcnZhYmxlPE1vdXNlRXZlbnQ+O1xuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgZG9jLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgem9uZTogTmdab25lKSB7XG4gICAgICAgIHRoaXMubW91c2VNb3ZlJCA9IGZyb21FdmVudChkb2MsICdtb3VzZW1vdmUnKTtcblxuICAgICAgICBjb25zdCB0aHJvdHRsZU1vdXNlVGltZSA9IDMwO1xuXG4gICAgICAgIC8vIHJ1biBvdXRzaWRlIEFuZ3VsYXIgWm9uZSBpbiBvcmRlciB0byBkZWNyZWFzZSBwZXJmb3JtYW5jZSBoaXRcbiAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubW91c2VNb3ZlJFxuICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICB0aHJvdHRsZVRpbWUodGhyb3R0bGVNb3VzZVRpbWUpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU3BvdHNJbmZvKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTG9jYXRpb25Qb3NpdGlvbihldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXIoc3BvdElkOiBTcG90SWQsIHNwb3RJbnN0YW5jZTogU3BvdERpcmVjdGl2ZSkge1xuICAgICAgICB0aGlzLnNwb3RzLnNldChzcG90SWQsIG5ldyBTcG90TW9kZWwoc3BvdEluc3RhbmNlKSk7XG4gICAgfVxuXG4gICAgdW5SZWdpc3RlcihzcG90SWQ6IFNwb3RJZCkge1xuICAgICAgICB0aGlzLnNwb3RzLmRlbGV0ZShzcG90SWQpO1xuICAgIH1cblxuICAgIHVwZGF0ZVNwb3RzSW5mbygpIHtcbiAgICAgICAgdGhpcy5zcG90cy5mb3JFYWNoKChzcG90KSA9PiBzcG90LnVwZGF0ZUluZm8oKSk7XG4gICAgfVxuXG4gICAgZmlsdGVyU3BvdHMocHJlZGljYXRlOiAoc3BvdDogU3BvdE1vZGVsKSA9PiB2b2lkKTogU3BvdE1vZGVsW10ge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLnNwb3RzKVxuICAgICAgICAgICAgLm1hcCgoW2lkLCBzcG90XSkgPT4gc3BvdClcbiAgICAgICAgICAgIC5maWx0ZXIoKHNwb3QpID0+IHByZWRpY2F0ZShzcG90KSk7XG4gICAgfVxuXG4gICAgc3Vic2NyaWJlKGZuOiBhbnkpOiBTdWJzY3JpcHRpb24ge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmVudHMuc3Vic2NyaWJlKGZuKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZUxvY2F0aW9uUG9zaXRpb24oeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3Qgc29ydGVkU3BvdHM6IElEaXN0YW5jZVRvU3BvdFtdID0gW107XG5cbiAgICAgICAgdGhpcy5zcG90cy5mb3JFYWNoKChzcG90KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtaW5pbWFsRGlzdGFuY2UgPSBzcG90LmdldE1pbmltYWxEaXN0YW5jZVRvUG9pbnQoeCwgeSk7XG4gICAgICAgICAgICBjb25zdCB0b3BMZWZ0UG9pbnREaXN0YW5jZSA9IHNwb3QuZ2V0RGlzdGFuY2VUb1RvcExlZnRQb2ludCh4LCB5KTtcbiAgICAgICAgICAgIGNvbnN0IGJvdHRvbUxlZnRQb2ludERpc3RhbmNlID0gc3BvdC5nZXREaXN0YW5jZVRvQm90dG9tTGVmdFBvaW50KHgsIHkpO1xuICAgICAgICAgICAgY29uc3QgY2VudGVyTGVmdFBvaW50RGlzdGFuY2UgPSBzcG90LmdldERpc3RhbmNlVG9MZWZ0Q2VudGVyUG9pbnQoeCwgeSk7XG4gICAgICAgICAgICBjb25zdCBpc0Nyb3NzMTNMaW5lID0gc3BvdC5pc0Nyb3NzMTNMaW5lKHkpO1xuXG4gICAgICAgICAgICBzb3J0ZWRTcG90cy5wdXNoKHtcbiAgICAgICAgICAgICAgICBtaW5pbWFsRGlzdGFuY2UsXG4gICAgICAgICAgICAgICAgdG9wTGVmdFBvaW50RGlzdGFuY2UsXG4gICAgICAgICAgICAgICAgYm90dG9tTGVmdFBvaW50RGlzdGFuY2UsXG4gICAgICAgICAgICAgICAgY2VudGVyTGVmdFBvaW50RGlzdGFuY2UsXG4gICAgICAgICAgICAgICAgaXNDcm9zczEzTGluZSxcbiAgICAgICAgICAgICAgICBkYXRhOiBzcG90LmRhdGFcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmV2ZW50cy5uZXh0KG5ldyBMb2NhdGlvblVwZGF0ZWRFdmVudChzb3J0ZWRTcG90cykpO1xuICAgIH1cbn1cbiJdfQ==