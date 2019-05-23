/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PickOutCoordinator } from './pick-out-coordinator.service';
export class PickOutService {
    /**
     * @param {?} pickOutHandlerService
     */
    constructor(pickOutHandlerService) {
        this.pickOutHandlerService = pickOutHandlerService;
        this.events = new Subject();
        this.pickOutHandlerService.changes.subscribe((e) => {
            this.events.next(e);
        });
    }
    /**
     * @return {?}
     */
    enablePickOut() {
        this.pickOutHandlerService.enablePickOut();
    }
    /**
     * @return {?}
     */
    disablePickOut() {
        this.pickOutHandlerService.disablePickOut();
    }
    /**
     * @return {?}
     */
    stopPickOut() {
        this.pickOutHandlerService.stopPickOut();
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    subscribe(fn) {
        return this.events.subscribe(fn);
    }
}
PickOutService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
PickOutService.ctorParameters = () => [
    { type: PickOutCoordinator }
];
if (false) {
    /** @type {?} */
    PickOutService.prototype.events;
    /**
     * @type {?}
     * @private
     */
    PickOutService.prototype.pickOutHandlerService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGljay1vdXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL21vZHVsZXMvcGljay1vdXQvcGljay1vdXQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsT0FBTyxFQUFlLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBR2xFLE1BQU0sT0FBTyxjQUFjOzs7O0lBR3ZCLFlBQW9CLHFCQUF5QztRQUF6QywwQkFBcUIsR0FBckIscUJBQXFCLENBQW9CO1FBRjdELFdBQU0sR0FBaUIsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUdqQyxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQy9DLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7OztJQUVELGFBQWE7UUFDVCxJQUFJLENBQUMscUJBQXFCLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDL0MsQ0FBQzs7OztJQUVELGNBQWM7UUFDVixJQUFJLENBQUMscUJBQXFCLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDaEQsQ0FBQzs7OztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDN0MsQ0FBQzs7Ozs7SUFFRCxTQUFTLENBQUMsRUFBRTtRQUNSLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDckMsQ0FBQzs7O1lBeEJKLFVBQVU7Ozs7WUFGSCxrQkFBa0I7Ozs7SUFJdEIsZ0NBQXFDOzs7OztJQUV6QiwrQ0FBaUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdWJqZWN0LCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtQaWNrT3V0Q29vcmRpbmF0b3J9IGZyb20gJy4vcGljay1vdXQtY29vcmRpbmF0b3Iuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQaWNrT3V0U2VydmljZSB7XG4gICAgZXZlbnRzOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwaWNrT3V0SGFuZGxlclNlcnZpY2U6IFBpY2tPdXRDb29yZGluYXRvcikge1xuICAgICAgICB0aGlzLnBpY2tPdXRIYW5kbGVyU2VydmljZS5jaGFuZ2VzLnN1YnNjcmliZSgoZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5ldmVudHMubmV4dChlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZW5hYmxlUGlja091dCgpIHtcbiAgICAgICAgdGhpcy5waWNrT3V0SGFuZGxlclNlcnZpY2UuZW5hYmxlUGlja091dCgpO1xuICAgIH1cblxuICAgIGRpc2FibGVQaWNrT3V0KCkge1xuICAgICAgICB0aGlzLnBpY2tPdXRIYW5kbGVyU2VydmljZS5kaXNhYmxlUGlja091dCgpO1xuICAgIH1cblxuICAgIHN0b3BQaWNrT3V0KCkge1xuICAgICAgICB0aGlzLnBpY2tPdXRIYW5kbGVyU2VydmljZS5zdG9wUGlja091dCgpO1xuICAgIH1cblxuICAgIHN1YnNjcmliZShmbik6IFN1YnNjcmlwdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50cy5zdWJzY3JpYmUoZm4pO1xuICAgIH1cbn1cbiJdfQ==