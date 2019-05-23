/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this.zone.runOutsideAngular(function () {
            _this.mouseMove$
                .pipe(throttleTime(throttleMouseTime))
                .subscribe(function (event) {
                _this.updateSpotsInfo();
                _this.updateLocationPosition(event.clientX, event.clientY);
            });
        });
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
        this.spots.forEach(function (spot) { return spot.updateInfo(); });
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
            .map(function (_a) {
            var _b = tslib_1.__read(_a, 2), id = _b[0], spot = _b[1];
            return spot;
        })
            .filter(function (spot) { return predicate(spot); });
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
        this.spots.forEach(function (spot) {
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
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkYXItY29vcmRpbmF0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL21vZHVsZXMvcmFkYXIvcmFkYXItY29vcmRpbmF0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFDLFNBQVMsRUFBYyxPQUFPLEVBQWUsTUFBTSxNQUFNLENBQUM7QUFDbEUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRTVDLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBR3JFLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFFdkM7SUFRSSwwQkFBOEIsR0FBRyxFQUNiLElBQVk7UUFEaEMsaUJBaUJDO1FBaEJtQixTQUFJLEdBQUosSUFBSSxDQUFRO1FBUHhCLFVBQUssR0FBMkIsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUUxQyxXQUFNLEdBQWlCLElBQUksT0FBTyxFQUFFLENBQUM7UUFNekMsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDOztZQUV4QyxpQkFBaUIsR0FBRyxFQUFFO1FBRTVCLGdFQUFnRTtRQUNoRSxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1lBQ3hCLEtBQUksQ0FBQyxVQUFVO2lCQUNWLElBQUksQ0FDRCxZQUFZLENBQUMsaUJBQWlCLENBQUMsQ0FDbEM7aUJBQ0EsU0FBUyxDQUFDLFVBQUMsS0FBSztnQkFDYixLQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3ZCLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM5RCxDQUFDLENBQUMsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7O0lBRUQsbUNBQVE7Ozs7O0lBQVIsVUFBUyxNQUFjLEVBQUUsWUFBMkI7UUFDaEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7Ozs7SUFFRCxxQ0FBVTs7OztJQUFWLFVBQVcsTUFBYztRQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5QixDQUFDOzs7O0lBRUQsMENBQWU7OztJQUFmO1FBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJLElBQUssT0FBQSxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQWpCLENBQWlCLENBQUMsQ0FBQztJQUNwRCxDQUFDOzs7OztJQUVELHNDQUFXOzs7O0lBQVgsVUFBWSxTQUFvQztRQUM1QyxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzthQUN4QixHQUFHLENBQUMsVUFBQyxFQUFVO2dCQUFWLDBCQUFVLEVBQVQsVUFBRSxFQUFFLFlBQUk7WUFBTSxPQUFBLElBQUk7UUFBSixDQUFJLENBQUM7YUFDekIsTUFBTSxDQUFDLFVBQUMsSUFBSSxJQUFLLE9BQUEsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFmLENBQWUsQ0FBQyxDQUFDO0lBQzNDLENBQUM7Ozs7O0lBRUQsb0NBQVM7Ozs7SUFBVCxVQUFVLEVBQU87UUFDYixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Ozs7Ozs7SUFFTyxpREFBc0I7Ozs7OztJQUE5QixVQUErQixDQUFTLEVBQUUsQ0FBUzs7WUFDekMsV0FBVyxHQUFzQixFQUFFO1FBRXpDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSTs7Z0JBQ2QsZUFBZSxHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDOztnQkFDdEQsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7O2dCQUMzRCx1QkFBdUIsR0FBRyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7Z0JBQ2pFLHVCQUF1QixHQUFHLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDOztnQkFDakUsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBRTNDLFdBQVcsQ0FBQyxJQUFJLENBQUM7Z0JBQ2IsZUFBZSxpQkFBQTtnQkFDZixvQkFBb0Isc0JBQUE7Z0JBQ3BCLHVCQUF1Qix5QkFBQTtnQkFDdkIsdUJBQXVCLHlCQUFBO2dCQUN2QixhQUFhLGVBQUE7Z0JBQ2IsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO2FBQ2xCLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQzVELENBQUM7O2dCQXRFSixVQUFVOzs7O2dEQVFNLE1BQU0sU0FBQyxRQUFRO2dCQWpCSixNQUFNOztJQWdGbEMsdUJBQUM7Q0FBQSxBQXZFRCxJQXVFQztTQXRFWSxnQkFBZ0I7Ozs7OztJQUN6QixpQ0FBa0Q7Ozs7O0lBRWxELGtDQUE2Qzs7Ozs7SUFFN0Msc0NBQTJDOzs7OztJQUcvQixnQ0FBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIE5nWm9uZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2Zyb21FdmVudCwgT2JzZXJ2YWJsZSwgU3ViamVjdCwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7dGhyb3R0bGVUaW1lfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1Nwb3REaXJlY3RpdmV9IGZyb20gJy4vZGlyZWN0aXZlL3Nwb3QuZGlyZWN0aXZlJztcbmltcG9ydCB7TG9jYXRpb25VcGRhdGVkRXZlbnR9IGZyb20gJy4vZXZlbnRzL2xvY2F0aW9uLXVwZGF0ZWQuZXZlbnQnO1xuaW1wb3J0IHtJRGlzdGFuY2VUb1Nwb3R9IGZyb20gJy4vaW50ZXJmYWNlcy9kaXN0YW5jZS10by1zcG90LmludGVyZmFjZSc7XG5pbXBvcnQge1Nwb3RJZH0gZnJvbSAnLi9pbnRlcmZhY2VzL3Nwb3QtaWQudHlwZSc7XG5pbXBvcnQge1Nwb3RNb2RlbH0gZnJvbSAnLi9zcG90Lm1vZGVsJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJhZGFyQ29vcmRpbmF0b3Ige1xuICAgIHByaXZhdGUgc3BvdHM6IE1hcDxTcG90SWQsIFNwb3RNb2RlbD4gPSBuZXcgTWFwKCk7XG5cbiAgICBwcml2YXRlIGV2ZW50czogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcblxuICAgIHByaXZhdGUgbW91c2VNb3ZlJDogT2JzZXJ2YWJsZTxNb3VzZUV2ZW50PjtcblxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIGRvYyxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSkge1xuICAgICAgICB0aGlzLm1vdXNlTW92ZSQgPSBmcm9tRXZlbnQoZG9jLCAnbW91c2Vtb3ZlJyk7XG5cbiAgICAgICAgY29uc3QgdGhyb3R0bGVNb3VzZVRpbWUgPSAzMDtcblxuICAgICAgICAvLyBydW4gb3V0c2lkZSBBbmd1bGFyIFpvbmUgaW4gb3JkZXIgdG8gZGVjcmVhc2UgcGVyZm9ybWFuY2UgaGl0XG4gICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1vdXNlTW92ZSRcbiAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgdGhyb3R0bGVUaW1lKHRocm90dGxlTW91c2VUaW1lKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNwb3RzSW5mbygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUxvY2F0aW9uUG9zaXRpb24oZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyKHNwb3RJZDogU3BvdElkLCBzcG90SW5zdGFuY2U6IFNwb3REaXJlY3RpdmUpIHtcbiAgICAgICAgdGhpcy5zcG90cy5zZXQoc3BvdElkLCBuZXcgU3BvdE1vZGVsKHNwb3RJbnN0YW5jZSkpO1xuICAgIH1cblxuICAgIHVuUmVnaXN0ZXIoc3BvdElkOiBTcG90SWQpIHtcbiAgICAgICAgdGhpcy5zcG90cy5kZWxldGUoc3BvdElkKTtcbiAgICB9XG5cbiAgICB1cGRhdGVTcG90c0luZm8oKSB7XG4gICAgICAgIHRoaXMuc3BvdHMuZm9yRWFjaCgoc3BvdCkgPT4gc3BvdC51cGRhdGVJbmZvKCkpO1xuICAgIH1cblxuICAgIGZpbHRlclNwb3RzKHByZWRpY2F0ZTogKHNwb3Q6IFNwb3RNb2RlbCkgPT4gdm9pZCk6IFNwb3RNb2RlbFtdIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5zcG90cylcbiAgICAgICAgICAgIC5tYXAoKFtpZCwgc3BvdF0pID0+IHNwb3QpXG4gICAgICAgICAgICAuZmlsdGVyKChzcG90KSA9PiBwcmVkaWNhdGUoc3BvdCkpO1xuICAgIH1cblxuICAgIHN1YnNjcmliZShmbjogYW55KTogU3Vic2NyaXB0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRzLnN1YnNjcmliZShmbik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVMb2NhdGlvblBvc2l0aW9uKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IHNvcnRlZFNwb3RzOiBJRGlzdGFuY2VUb1Nwb3RbXSA9IFtdO1xuXG4gICAgICAgIHRoaXMuc3BvdHMuZm9yRWFjaCgoc3BvdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWluaW1hbERpc3RhbmNlID0gc3BvdC5nZXRNaW5pbWFsRGlzdGFuY2VUb1BvaW50KHgsIHkpO1xuICAgICAgICAgICAgY29uc3QgdG9wTGVmdFBvaW50RGlzdGFuY2UgPSBzcG90LmdldERpc3RhbmNlVG9Ub3BMZWZ0UG9pbnQoeCwgeSk7XG4gICAgICAgICAgICBjb25zdCBib3R0b21MZWZ0UG9pbnREaXN0YW5jZSA9IHNwb3QuZ2V0RGlzdGFuY2VUb0JvdHRvbUxlZnRQb2ludCh4LCB5KTtcbiAgICAgICAgICAgIGNvbnN0IGNlbnRlckxlZnRQb2ludERpc3RhbmNlID0gc3BvdC5nZXREaXN0YW5jZVRvTGVmdENlbnRlclBvaW50KHgsIHkpO1xuICAgICAgICAgICAgY29uc3QgaXNDcm9zczEzTGluZSA9IHNwb3QuaXNDcm9zczEzTGluZSh5KTtcblxuICAgICAgICAgICAgc29ydGVkU3BvdHMucHVzaCh7XG4gICAgICAgICAgICAgICAgbWluaW1hbERpc3RhbmNlLFxuICAgICAgICAgICAgICAgIHRvcExlZnRQb2ludERpc3RhbmNlLFxuICAgICAgICAgICAgICAgIGJvdHRvbUxlZnRQb2ludERpc3RhbmNlLFxuICAgICAgICAgICAgICAgIGNlbnRlckxlZnRQb2ludERpc3RhbmNlLFxuICAgICAgICAgICAgICAgIGlzQ3Jvc3MxM0xpbmUsXG4gICAgICAgICAgICAgICAgZGF0YTogc3BvdC5kYXRhXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5ldmVudHMubmV4dChuZXcgTG9jYXRpb25VcGRhdGVkRXZlbnQoc29ydGVkU3BvdHMpKTtcbiAgICB9XG59XG4iXX0=