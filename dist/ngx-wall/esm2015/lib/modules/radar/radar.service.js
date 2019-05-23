/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RadarCoordinator } from './radar-coordinator.service';
export class Radar {
    /**
     * @param {?} radarCoordinator
     */
    constructor(radarCoordinator) {
        this.radarCoordinator = radarCoordinator;
        this.events = new Subject();
        this.radarCoordinator.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this.events.next(event);
        }));
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    filterSpots(fn) {
        return this.radarCoordinator.filterSpots(fn);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    subscribe(fn) {
        return this.events.subscribe(fn);
    }
}
Radar.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Radar.ctorParameters = () => [
    { type: RadarCoordinator }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkYXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL21vZHVsZXMvcmFkYXIvcmFkYXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsT0FBTyxFQUFlLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBSTdELE1BQU0sT0FBTyxLQUFLOzs7O0lBR2QsWUFBb0IsZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFGOUMsV0FBTSxHQUFpQixJQUFJLE9BQU8sRUFBRSxDQUFDO1FBR3pDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTOzs7O1FBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLEVBQTZCO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7OztJQUVELFNBQVMsQ0FBQyxFQUFPO1FBQ2IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyQyxDQUFDOzs7WUFoQkosVUFBVTs7OztZQUhILGdCQUFnQjs7Ozs7OztJQUtwQix1QkFBNkM7Ozs7O0lBRWpDLGlDQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N1YmplY3QsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1JhZGFyQ29vcmRpbmF0b3J9IGZyb20gJy4vcmFkYXItY29vcmRpbmF0b3Iuc2VydmljZSc7XG5pbXBvcnQge1Nwb3RNb2RlbH0gZnJvbSAnLi9zcG90Lm1vZGVsJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJhZGFyIHtcbiAgICBwcml2YXRlIGV2ZW50czogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmFkYXJDb29yZGluYXRvcjogUmFkYXJDb29yZGluYXRvcikge1xuICAgICAgICB0aGlzLnJhZGFyQ29vcmRpbmF0b3Iuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5ldmVudHMubmV4dChldmVudCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZpbHRlclNwb3RzKGZuOiAoc3BvdDogU3BvdE1vZGVsKSA9PiB2b2lkKTogU3BvdE1vZGVsW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5yYWRhckNvb3JkaW5hdG9yLmZpbHRlclNwb3RzKGZuKTtcbiAgICB9XG5cbiAgICBzdWJzY3JpYmUoZm46IGFueSk6IFN1YnNjcmlwdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50cy5zdWJzY3JpYmUoZm4pO1xuICAgIH1cbn1cbiJdfQ==