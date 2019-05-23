/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PickOutCoordinator } from './pick-out-coordinator.service';
var PickOutService = /** @class */ (function () {
    function PickOutService(pickOutHandlerService) {
        var _this = this;
        this.pickOutHandlerService = pickOutHandlerService;
        this.events = new Subject();
        this.pickOutHandlerService.changes.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            _this.events.next(e);
        }));
    }
    /**
     * @return {?}
     */
    PickOutService.prototype.enablePickOut = /**
     * @return {?}
     */
    function () {
        this.pickOutHandlerService.enablePickOut();
    };
    /**
     * @return {?}
     */
    PickOutService.prototype.disablePickOut = /**
     * @return {?}
     */
    function () {
        this.pickOutHandlerService.disablePickOut();
    };
    /**
     * @return {?}
     */
    PickOutService.prototype.stopPickOut = /**
     * @return {?}
     */
    function () {
        this.pickOutHandlerService.stopPickOut();
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    PickOutService.prototype.subscribe = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        return this.events.subscribe(fn);
    };
    PickOutService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    PickOutService.ctorParameters = function () { return [
        { type: PickOutCoordinator }
    ]; };
    return PickOutService;
}());
export { PickOutService };
if (false) {
    /** @type {?} */
    PickOutService.prototype.events;
    /**
     * @type {?}
     * @private
     */
    PickOutService.prototype.pickOutHandlerService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGljay1vdXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL21vZHVsZXMvcGljay1vdXQvcGljay1vdXQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsT0FBTyxFQUFlLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBRWxFO0lBSUksd0JBQW9CLHFCQUF5QztRQUE3RCxpQkFJQztRQUptQiwwQkFBcUIsR0FBckIscUJBQXFCLENBQW9CO1FBRjdELFdBQU0sR0FBaUIsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUdqQyxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFDLENBQUM7WUFDM0MsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7O0lBRUQsc0NBQWE7OztJQUFiO1FBQ0ksSUFBSSxDQUFDLHFCQUFxQixDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQy9DLENBQUM7Ozs7SUFFRCx1Q0FBYzs7O0lBQWQ7UUFDSSxJQUFJLENBQUMscUJBQXFCLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDaEQsQ0FBQzs7OztJQUVELG9DQUFXOzs7SUFBWDtRQUNJLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM3QyxDQUFDOzs7OztJQUVELGtDQUFTOzs7O0lBQVQsVUFBVSxFQUFFO1FBQ1IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyQyxDQUFDOztnQkF4QkosVUFBVTs7OztnQkFGSCxrQkFBa0I7O0lBMkIxQixxQkFBQztDQUFBLEFBekJELElBeUJDO1NBeEJZLGNBQWM7OztJQUN2QixnQ0FBcUM7Ozs7O0lBRXpCLCtDQUFpRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N1YmplY3QsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1BpY2tPdXRDb29yZGluYXRvcn0gZnJvbSAnLi9waWNrLW91dC1jb29yZGluYXRvci5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBpY2tPdXRTZXJ2aWNlIHtcbiAgICBldmVudHM6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBpY2tPdXRIYW5kbGVyU2VydmljZTogUGlja091dENvb3JkaW5hdG9yKSB7XG4gICAgICAgIHRoaXMucGlja091dEhhbmRsZXJTZXJ2aWNlLmNoYW5nZXMuc3Vic2NyaWJlKChlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cy5uZXh0KGUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBlbmFibGVQaWNrT3V0KCkge1xuICAgICAgICB0aGlzLnBpY2tPdXRIYW5kbGVyU2VydmljZS5lbmFibGVQaWNrT3V0KCk7XG4gICAgfVxuXG4gICAgZGlzYWJsZVBpY2tPdXQoKSB7XG4gICAgICAgIHRoaXMucGlja091dEhhbmRsZXJTZXJ2aWNlLmRpc2FibGVQaWNrT3V0KCk7XG4gICAgfVxuXG4gICAgc3RvcFBpY2tPdXQoKSB7XG4gICAgICAgIHRoaXMucGlja091dEhhbmRsZXJTZXJ2aWNlLnN0b3BQaWNrT3V0KCk7XG4gICAgfVxuXG4gICAgc3Vic2NyaWJlKGZuKTogU3Vic2NyaXB0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRzLnN1YnNjcmliZShmbik7XG4gICAgfVxufVxuIl19