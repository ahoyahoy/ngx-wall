/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, NgZone } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { LocationUpdatedEvent } from './events/location-updated.event';
import { SpotModel } from './spot.model';
export class RadarCoordinator {
    /**
     * @param {?} doc
     * @param {?} zone
     */
    constructor(doc, zone) {
        this.zone = zone;
        this.spots = new Map();
        this.events = new Subject();
        this.mouseMove$ = fromEvent(doc, 'mousemove');
        /** @type {?} */
        const throttleMouseTime = 30;
        // run outside Angular Zone in order to decrease performance hit
        this.zone.runOutsideAngular(() => {
            this.mouseMove$
                .pipe(throttleTime(throttleMouseTime))
                .subscribe((event) => {
                this.updateSpotsInfo();
                this.updateLocationPosition(event.clientX, event.clientY);
            });
        });
    }
    /**
     * @param {?} spotId
     * @param {?} spotInstance
     * @return {?}
     */
    register(spotId, spotInstance) {
        this.spots.set(spotId, new SpotModel(spotInstance));
    }
    /**
     * @param {?} spotId
     * @return {?}
     */
    unRegister(spotId) {
        this.spots.delete(spotId);
    }
    /**
     * @return {?}
     */
    updateSpotsInfo() {
        this.spots.forEach((spot) => spot.updateInfo());
    }
    /**
     * @param {?} predicate
     * @return {?}
     */
    filterSpots(predicate) {
        return Array.from(this.spots)
            .map(([id, spot]) => spot)
            .filter((spot) => predicate(spot));
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    subscribe(fn) {
        return this.events.subscribe(fn);
    }
    /**
     * @private
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    updateLocationPosition(x, y) {
        /** @type {?} */
        const sortedSpots = [];
        this.spots.forEach((spot) => {
            /** @type {?} */
            const minimalDistance = spot.getMinimalDistanceToPoint(x, y);
            /** @type {?} */
            const topLeftPointDistance = spot.getDistanceToTopLeftPoint(x, y);
            /** @type {?} */
            const bottomLeftPointDistance = spot.getDistanceToBottomLeftPoint(x, y);
            /** @type {?} */
            const centerLeftPointDistance = spot.getDistanceToLeftCenterPoint(x, y);
            /** @type {?} */
            const isCross13Line = spot.isCross13Line(y);
            sortedSpots.push({
                minimalDistance,
                topLeftPointDistance,
                bottomLeftPointDistance,
                centerLeftPointDistance,
                isCross13Line,
                data: spot.data
            });
        });
        this.events.next(new LocationUpdatedEvent(sortedSpots));
    }
}
RadarCoordinator.decorators = [
    { type: Injectable }
];
/** @nocollapse */
RadarCoordinator.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: NgZone }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkYXItY29vcmRpbmF0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL21vZHVsZXMvcmFkYXIvcmFkYXItY29vcmRpbmF0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUMsU0FBUyxFQUFjLE9BQU8sRUFBZSxNQUFNLE1BQU0sQ0FBQztBQUNsRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFNUMsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFHckUsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUd2QyxNQUFNLE9BQU8sZ0JBQWdCOzs7OztJQU96QixZQUE4QixHQUFHLEVBQ2IsSUFBWTtRQUFaLFNBQUksR0FBSixJQUFJLENBQVE7UUFQeEIsVUFBSyxHQUEyQixJQUFJLEdBQUcsRUFBRSxDQUFDO1FBRTFDLFdBQU0sR0FBaUIsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQU16QyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUM7O2NBRXhDLGlCQUFpQixHQUFHLEVBQUU7UUFFNUIsZ0VBQWdFO1FBQ2hFLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFO1lBQzdCLElBQUksQ0FBQyxVQUFVO2lCQUNWLElBQUksQ0FDRCxZQUFZLENBQUMsaUJBQWlCLENBQUMsQ0FDbEM7aUJBQ0EsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzlELENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOzs7Ozs7SUFFRCxRQUFRLENBQUMsTUFBYyxFQUFFLFlBQTJCO1FBQ2hELElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7Ozs7O0lBRUQsVUFBVSxDQUFDLE1BQWM7UUFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUIsQ0FBQzs7OztJQUVELGVBQWU7UUFDWCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDcEQsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsU0FBb0M7UUFDNUMsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7YUFDeEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQzthQUN6QixNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7Ozs7O0lBRUQsU0FBUyxDQUFDLEVBQU87UUFDYixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Ozs7Ozs7SUFFTyxzQkFBc0IsQ0FBQyxDQUFTLEVBQUUsQ0FBUzs7Y0FDekMsV0FBVyxHQUFzQixFQUFFO1FBRXpDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7O2tCQUNsQixlQUFlLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7O2tCQUN0RCxvQkFBb0IsR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7a0JBQzNELHVCQUF1QixHQUFHLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDOztrQkFDakUsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7O2tCQUNqRSxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFFM0MsV0FBVyxDQUFDLElBQUksQ0FBQztnQkFDYixlQUFlO2dCQUNmLG9CQUFvQjtnQkFDcEIsdUJBQXVCO2dCQUN2Qix1QkFBdUI7Z0JBQ3ZCLGFBQWE7Z0JBQ2IsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO2FBQ2xCLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQzVELENBQUM7OztZQXRFSixVQUFVOzs7OzRDQVFNLE1BQU0sU0FBQyxRQUFRO1lBakJKLE1BQU07Ozs7Ozs7SUFXOUIsaUNBQWtEOzs7OztJQUVsRCxrQ0FBNkM7Ozs7O0lBRTdDLHNDQUEyQzs7Ozs7SUFHL0IsZ0NBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlLCBOZ1pvbmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtmcm9tRXZlbnQsIE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge3Rocm90dGxlVGltZX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtTcG90RGlyZWN0aXZlfSBmcm9tICcuL2RpcmVjdGl2ZS9zcG90LmRpcmVjdGl2ZSc7XG5pbXBvcnQge0xvY2F0aW9uVXBkYXRlZEV2ZW50fSBmcm9tICcuL2V2ZW50cy9sb2NhdGlvbi11cGRhdGVkLmV2ZW50JztcbmltcG9ydCB7SURpc3RhbmNlVG9TcG90fSBmcm9tICcuL2ludGVyZmFjZXMvZGlzdGFuY2UtdG8tc3BvdC5pbnRlcmZhY2UnO1xuaW1wb3J0IHtTcG90SWR9IGZyb20gJy4vaW50ZXJmYWNlcy9zcG90LWlkLnR5cGUnO1xuaW1wb3J0IHtTcG90TW9kZWx9IGZyb20gJy4vc3BvdC5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSYWRhckNvb3JkaW5hdG9yIHtcbiAgICBwcml2YXRlIHNwb3RzOiBNYXA8U3BvdElkLCBTcG90TW9kZWw+ID0gbmV3IE1hcCgpO1xuXG4gICAgcHJpdmF0ZSBldmVudHM6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgICBwcml2YXRlIG1vdXNlTW92ZSQ6IE9ic2VydmFibGU8TW91c2VFdmVudD47XG5cbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBkb2MsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHtcbiAgICAgICAgdGhpcy5tb3VzZU1vdmUkID0gZnJvbUV2ZW50KGRvYywgJ21vdXNlbW92ZScpO1xuXG4gICAgICAgIGNvbnN0IHRocm90dGxlTW91c2VUaW1lID0gMzA7XG5cbiAgICAgICAgLy8gcnVuIG91dHNpZGUgQW5ndWxhciBab25lIGluIG9yZGVyIHRvIGRlY3JlYXNlIHBlcmZvcm1hbmNlIGhpdFxuICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5tb3VzZU1vdmUkXG4gICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIHRocm90dGxlVGltZSh0aHJvdHRsZU1vdXNlVGltZSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTcG90c0luZm8oKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVMb2NhdGlvblBvc2l0aW9uKGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZWdpc3RlcihzcG90SWQ6IFNwb3RJZCwgc3BvdEluc3RhbmNlOiBTcG90RGlyZWN0aXZlKSB7XG4gICAgICAgIHRoaXMuc3BvdHMuc2V0KHNwb3RJZCwgbmV3IFNwb3RNb2RlbChzcG90SW5zdGFuY2UpKTtcbiAgICB9XG5cbiAgICB1blJlZ2lzdGVyKHNwb3RJZDogU3BvdElkKSB7XG4gICAgICAgIHRoaXMuc3BvdHMuZGVsZXRlKHNwb3RJZCk7XG4gICAgfVxuXG4gICAgdXBkYXRlU3BvdHNJbmZvKCkge1xuICAgICAgICB0aGlzLnNwb3RzLmZvckVhY2goKHNwb3QpID0+IHNwb3QudXBkYXRlSW5mbygpKTtcbiAgICB9XG5cbiAgICBmaWx0ZXJTcG90cyhwcmVkaWNhdGU6IChzcG90OiBTcG90TW9kZWwpID0+IHZvaWQpOiBTcG90TW9kZWxbXSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuc3BvdHMpXG4gICAgICAgICAgICAubWFwKChbaWQsIHNwb3RdKSA9PiBzcG90KVxuICAgICAgICAgICAgLmZpbHRlcigoc3BvdCkgPT4gcHJlZGljYXRlKHNwb3QpKTtcbiAgICB9XG5cbiAgICBzdWJzY3JpYmUoZm46IGFueSk6IFN1YnNjcmlwdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50cy5zdWJzY3JpYmUoZm4pO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlTG9jYXRpb25Qb3NpdGlvbih4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICAgICAgICBjb25zdCBzb3J0ZWRTcG90czogSURpc3RhbmNlVG9TcG90W10gPSBbXTtcblxuICAgICAgICB0aGlzLnNwb3RzLmZvckVhY2goKHNwb3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1pbmltYWxEaXN0YW5jZSA9IHNwb3QuZ2V0TWluaW1hbERpc3RhbmNlVG9Qb2ludCh4LCB5KTtcbiAgICAgICAgICAgIGNvbnN0IHRvcExlZnRQb2ludERpc3RhbmNlID0gc3BvdC5nZXREaXN0YW5jZVRvVG9wTGVmdFBvaW50KHgsIHkpO1xuICAgICAgICAgICAgY29uc3QgYm90dG9tTGVmdFBvaW50RGlzdGFuY2UgPSBzcG90LmdldERpc3RhbmNlVG9Cb3R0b21MZWZ0UG9pbnQoeCwgeSk7XG4gICAgICAgICAgICBjb25zdCBjZW50ZXJMZWZ0UG9pbnREaXN0YW5jZSA9IHNwb3QuZ2V0RGlzdGFuY2VUb0xlZnRDZW50ZXJQb2ludCh4LCB5KTtcbiAgICAgICAgICAgIGNvbnN0IGlzQ3Jvc3MxM0xpbmUgPSBzcG90LmlzQ3Jvc3MxM0xpbmUoeSk7XG5cbiAgICAgICAgICAgIHNvcnRlZFNwb3RzLnB1c2goe1xuICAgICAgICAgICAgICAgIG1pbmltYWxEaXN0YW5jZSxcbiAgICAgICAgICAgICAgICB0b3BMZWZ0UG9pbnREaXN0YW5jZSxcbiAgICAgICAgICAgICAgICBib3R0b21MZWZ0UG9pbnREaXN0YW5jZSxcbiAgICAgICAgICAgICAgICBjZW50ZXJMZWZ0UG9pbnREaXN0YW5jZSxcbiAgICAgICAgICAgICAgICBpc0Nyb3NzMTNMaW5lLFxuICAgICAgICAgICAgICAgIGRhdGE6IHNwb3QuZGF0YVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZXZlbnRzLm5leHQobmV3IExvY2F0aW9uVXBkYXRlZEV2ZW50KHNvcnRlZFNwb3RzKSk7XG4gICAgfVxufVxuIl19