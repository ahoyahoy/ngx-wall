/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.mouseMove$
                .pipe(throttleTime(throttleMouseTime))
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                this.updateSpotsInfo();
                this.updateLocationPosition(event.clientX, event.clientY);
            }));
        }));
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
        this.spots.forEach((/**
         * @param {?} spot
         * @return {?}
         */
        (spot) => spot.updateInfo()));
    }
    /**
     * @param {?} predicate
     * @return {?}
     */
    filterSpots(predicate) {
        return Array.from(this.spots)
            .map((/**
         * @param {?} __0
         * @return {?}
         */
        ([id, spot]) => spot))
            .filter((/**
         * @param {?} spot
         * @return {?}
         */
        (spot) => predicate(spot)));
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
        this.spots.forEach((/**
         * @param {?} spot
         * @return {?}
         */
        (spot) => {
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
        }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkYXItY29vcmRpbmF0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL21vZHVsZXMvcmFkYXIvcmFkYXItY29vcmRpbmF0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUMsU0FBUyxFQUFjLE9BQU8sRUFBZSxNQUFNLE1BQU0sQ0FBQztBQUNsRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFNUMsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFHckUsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUd2QyxNQUFNLE9BQU8sZ0JBQWdCOzs7OztJQU96QixZQUE4QixHQUFHLEVBQ2IsSUFBWTtRQUFaLFNBQUksR0FBSixJQUFJLENBQVE7UUFQeEIsVUFBSyxHQUEyQixJQUFJLEdBQUcsRUFBRSxDQUFDO1FBRTFDLFdBQU0sR0FBaUIsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQU16QyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUM7O2NBRXhDLGlCQUFpQixHQUFHLEVBQUU7UUFFNUIsZ0VBQWdFO1FBQ2hFLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCOzs7UUFBQyxHQUFHLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFVBQVU7aUJBQ1YsSUFBSSxDQUNELFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxDQUNsQztpQkFDQSxTQUFTOzs7O1lBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDakIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUN2QixJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDOUQsQ0FBQyxFQUFDLENBQUM7UUFDWCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7OztJQUVELFFBQVEsQ0FBQyxNQUFjLEVBQUUsWUFBMkI7UUFDaEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7Ozs7SUFFRCxVQUFVLENBQUMsTUFBYztRQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5QixDQUFDOzs7O0lBRUQsZUFBZTtRQUNYLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTzs7OztRQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUMsQ0FBQztJQUNwRCxDQUFDOzs7OztJQUVELFdBQVcsQ0FBQyxTQUFvQztRQUM1QyxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzthQUN4QixHQUFHOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFDO2FBQ3pCLE1BQU07Ozs7UUFBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUM7SUFDM0MsQ0FBQzs7Ozs7SUFFRCxTQUFTLENBQUMsRUFBTztRQUNiLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDckMsQ0FBQzs7Ozs7OztJQUVPLHNCQUFzQixDQUFDLENBQVMsRUFBRSxDQUFTOztjQUN6QyxXQUFXLEdBQXNCLEVBQUU7UUFFekMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPOzs7O1FBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTs7a0JBQ2xCLGVBQWUsR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7a0JBQ3RELG9CQUFvQixHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDOztrQkFDM0QsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7O2tCQUNqRSx1QkFBdUIsR0FBRyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7a0JBQ2pFLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUUzQyxXQUFXLENBQUMsSUFBSSxDQUFDO2dCQUNiLGVBQWU7Z0JBQ2Ysb0JBQW9CO2dCQUNwQix1QkFBdUI7Z0JBQ3ZCLHVCQUF1QjtnQkFDdkIsYUFBYTtnQkFDYixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7YUFDbEIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxFQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQzs7O1lBdEVKLFVBQVU7Ozs7NENBUU0sTUFBTSxTQUFDLFFBQVE7WUFqQkosTUFBTTs7Ozs7OztJQVc5QixpQ0FBa0Q7Ozs7O0lBRWxELGtDQUE2Qzs7Ozs7SUFFN0Msc0NBQTJDOzs7OztJQUcvQixnQ0FBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIE5nWm9uZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2Zyb21FdmVudCwgT2JzZXJ2YWJsZSwgU3ViamVjdCwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7dGhyb3R0bGVUaW1lfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1Nwb3REaXJlY3RpdmV9IGZyb20gJy4vZGlyZWN0aXZlL3Nwb3QuZGlyZWN0aXZlJztcbmltcG9ydCB7TG9jYXRpb25VcGRhdGVkRXZlbnR9IGZyb20gJy4vZXZlbnRzL2xvY2F0aW9uLXVwZGF0ZWQuZXZlbnQnO1xuaW1wb3J0IHtJRGlzdGFuY2VUb1Nwb3R9IGZyb20gJy4vaW50ZXJmYWNlcy9kaXN0YW5jZS10by1zcG90LmludGVyZmFjZSc7XG5pbXBvcnQge1Nwb3RJZH0gZnJvbSAnLi9pbnRlcmZhY2VzL3Nwb3QtaWQudHlwZSc7XG5pbXBvcnQge1Nwb3RNb2RlbH0gZnJvbSAnLi9zcG90Lm1vZGVsJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJhZGFyQ29vcmRpbmF0b3Ige1xuICAgIHByaXZhdGUgc3BvdHM6IE1hcDxTcG90SWQsIFNwb3RNb2RlbD4gPSBuZXcgTWFwKCk7XG5cbiAgICBwcml2YXRlIGV2ZW50czogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcblxuICAgIHByaXZhdGUgbW91c2VNb3ZlJDogT2JzZXJ2YWJsZTxNb3VzZUV2ZW50PjtcblxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIGRvYyxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSkge1xuICAgICAgICB0aGlzLm1vdXNlTW92ZSQgPSBmcm9tRXZlbnQoZG9jLCAnbW91c2Vtb3ZlJyk7XG5cbiAgICAgICAgY29uc3QgdGhyb3R0bGVNb3VzZVRpbWUgPSAzMDtcblxuICAgICAgICAvLyBydW4gb3V0c2lkZSBBbmd1bGFyIFpvbmUgaW4gb3JkZXIgdG8gZGVjcmVhc2UgcGVyZm9ybWFuY2UgaGl0XG4gICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1vdXNlTW92ZSRcbiAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgdGhyb3R0bGVUaW1lKHRocm90dGxlTW91c2VUaW1lKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNwb3RzSW5mbygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUxvY2F0aW9uUG9zaXRpb24oZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyKHNwb3RJZDogU3BvdElkLCBzcG90SW5zdGFuY2U6IFNwb3REaXJlY3RpdmUpIHtcbiAgICAgICAgdGhpcy5zcG90cy5zZXQoc3BvdElkLCBuZXcgU3BvdE1vZGVsKHNwb3RJbnN0YW5jZSkpO1xuICAgIH1cblxuICAgIHVuUmVnaXN0ZXIoc3BvdElkOiBTcG90SWQpIHtcbiAgICAgICAgdGhpcy5zcG90cy5kZWxldGUoc3BvdElkKTtcbiAgICB9XG5cbiAgICB1cGRhdGVTcG90c0luZm8oKSB7XG4gICAgICAgIHRoaXMuc3BvdHMuZm9yRWFjaCgoc3BvdCkgPT4gc3BvdC51cGRhdGVJbmZvKCkpO1xuICAgIH1cblxuICAgIGZpbHRlclNwb3RzKHByZWRpY2F0ZTogKHNwb3Q6IFNwb3RNb2RlbCkgPT4gdm9pZCk6IFNwb3RNb2RlbFtdIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5zcG90cylcbiAgICAgICAgICAgIC5tYXAoKFtpZCwgc3BvdF0pID0+IHNwb3QpXG4gICAgICAgICAgICAuZmlsdGVyKChzcG90KSA9PiBwcmVkaWNhdGUoc3BvdCkpO1xuICAgIH1cblxuICAgIHN1YnNjcmliZShmbjogYW55KTogU3Vic2NyaXB0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRzLnN1YnNjcmliZShmbik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVMb2NhdGlvblBvc2l0aW9uKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IHNvcnRlZFNwb3RzOiBJRGlzdGFuY2VUb1Nwb3RbXSA9IFtdO1xuXG4gICAgICAgIHRoaXMuc3BvdHMuZm9yRWFjaCgoc3BvdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWluaW1hbERpc3RhbmNlID0gc3BvdC5nZXRNaW5pbWFsRGlzdGFuY2VUb1BvaW50KHgsIHkpO1xuICAgICAgICAgICAgY29uc3QgdG9wTGVmdFBvaW50RGlzdGFuY2UgPSBzcG90LmdldERpc3RhbmNlVG9Ub3BMZWZ0UG9pbnQoeCwgeSk7XG4gICAgICAgICAgICBjb25zdCBib3R0b21MZWZ0UG9pbnREaXN0YW5jZSA9IHNwb3QuZ2V0RGlzdGFuY2VUb0JvdHRvbUxlZnRQb2ludCh4LCB5KTtcbiAgICAgICAgICAgIGNvbnN0IGNlbnRlckxlZnRQb2ludERpc3RhbmNlID0gc3BvdC5nZXREaXN0YW5jZVRvTGVmdENlbnRlclBvaW50KHgsIHkpO1xuICAgICAgICAgICAgY29uc3QgaXNDcm9zczEzTGluZSA9IHNwb3QuaXNDcm9zczEzTGluZSh5KTtcblxuICAgICAgICAgICAgc29ydGVkU3BvdHMucHVzaCh7XG4gICAgICAgICAgICAgICAgbWluaW1hbERpc3RhbmNlLFxuICAgICAgICAgICAgICAgIHRvcExlZnRQb2ludERpc3RhbmNlLFxuICAgICAgICAgICAgICAgIGJvdHRvbUxlZnRQb2ludERpc3RhbmNlLFxuICAgICAgICAgICAgICAgIGNlbnRlckxlZnRQb2ludERpc3RhbmNlLFxuICAgICAgICAgICAgICAgIGlzQ3Jvc3MxM0xpbmUsXG4gICAgICAgICAgICAgICAgZGF0YTogc3BvdC5kYXRhXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5ldmVudHMubmV4dChuZXcgTG9jYXRpb25VcGRhdGVkRXZlbnQoc29ydGVkU3BvdHMpKTtcbiAgICB9XG59XG4iXX0=