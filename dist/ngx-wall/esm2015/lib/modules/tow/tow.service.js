/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TowCoordinator } from './tow-coordinator.service';
export class TowService {
    /**
     * @param {?} towCoordinator
     */
    constructor(towCoordinator) {
        this.towCoordinator = towCoordinator;
        this.events = new Subject();
        this.towCoordinator.events.subscribe((e) => {
            this.events.next(e);
        });
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    subscribe(fn) {
        return this.events.subscribe(fn);
    }
}
TowService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
TowService.ctorParameters = () => [
    { type: TowCoordinator }
];
if (false) {
    /** @type {?} */
    TowService.prototype.events;
    /**
     * @type {?}
     * @private
     */
    TowService.prototype.towCoordinator;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG93LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9tb2R1bGVzL3Rvdy90b3cuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsT0FBTyxFQUFlLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUd6RCxNQUFNLE9BQU8sVUFBVTs7OztJQUduQixZQUFvQixjQUE4QjtRQUE5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFGbEQsV0FBTSxHQUFpQixJQUFJLE9BQU8sRUFBRSxDQUFDO1FBR2pDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7SUFFRCxTQUFTLENBQUMsRUFBRTtRQUNSLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDckMsQ0FBQzs7O1lBWkosVUFBVTs7OztZQUZILGNBQWM7Ozs7SUFJbEIsNEJBQXFDOzs7OztJQUV6QixvQ0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdWJqZWN0LCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtUb3dDb29yZGluYXRvcn0gZnJvbSAnLi90b3ctY29vcmRpbmF0b3Iuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUb3dTZXJ2aWNlIHtcbiAgICBldmVudHM6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRvd0Nvb3JkaW5hdG9yOiBUb3dDb29yZGluYXRvcikge1xuICAgICAgICB0aGlzLnRvd0Nvb3JkaW5hdG9yLmV2ZW50cy5zdWJzY3JpYmUoKGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLm5leHQoZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN1YnNjcmliZShmbik6IFN1YnNjcmlwdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50cy5zdWJzY3JpYmUoZm4pO1xuICAgIH1cbn1cbiJdfQ==