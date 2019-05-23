/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { EndPickOut } from './events/end-pick-out.event';
import { PickOutItems } from './events/pick-out-items.event';
import { StartPickOut } from './events/start-pick-out.event';
import { StopPickOut } from './events/stop-pick-out.event';
import { Radar } from '../radar/radar.service';
var PickOutCoordinator = /** @class */ (function () {
    function PickOutCoordinator(radar) {
        this.radar = radar;
        this.changes = new Subject();
        this.isPickOutAllowed = true;
    }
    /**
     * @return {?}
     */
    PickOutCoordinator.prototype.disablePickOut = /**
     * @return {?}
     */
    function () {
        this.isPickOutAllowed = false;
    };
    /**
     * @return {?}
     */
    PickOutCoordinator.prototype.enablePickOut = /**
     * @return {?}
     */
    function () {
        this.isPickOutAllowed = true;
    };
    /**
     * @return {?}
     */
    PickOutCoordinator.prototype.stopPickOut = /**
     * @return {?}
     */
    function () {
        this.changes.next(new StopPickOut());
    };
    /**
     * @return {?}
     */
    PickOutCoordinator.prototype.startPickOut = /**
     * @return {?}
     */
    function () {
        this.changes.next(new StartPickOut());
    };
    /**
     * @param {?} range
     * @return {?}
     */
    PickOutCoordinator.prototype.pickOutChanged = /**
     * @param {?} range
     * @return {?}
     */
    function (range) {
        /** @type {?} */
        var pickOutSpotModels = this.radar.filterSpots(function (spot) { return spot.data.isPickOutItem; });
        pickOutSpotModels.forEach(function (spotModel) {
            spotModel.updateInfo();
        });
        this.changes.next(new PickOutItems(this.getSelectedItemIds(range, pickOutSpotModels)));
    };
    /**
     * @return {?}
     */
    PickOutCoordinator.prototype.endPickOut = /**
     * @return {?}
     */
    function () {
        this.changes.next(new EndPickOut());
    };
    /**
     * @private
     * @param {?} range
     * @param {?} pickOutsItem
     * @return {?}
     */
    PickOutCoordinator.prototype.getSelectedItemIds = /**
     * @private
     * @param {?} range
     * @param {?} pickOutsItem
     * @return {?}
     */
    function (range, pickOutsItem) {
        return pickOutsItem
            .filter(function (pickOutItem) {
            return (range.x < (pickOutItem.position.x + pickOutItem.size.width) &&
                (range.x + range.width) > pickOutItem.position.x &&
                (range.y + range.height) > pickOutItem.position.y &&
                range.y < (pickOutItem.position.y + pickOutItem.size.height));
        })
            .map(function (pickOutItem) { return pickOutItem.data.brickId; });
    };
    PickOutCoordinator.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    PickOutCoordinator.ctorParameters = function () { return [
        { type: Radar }
    ]; };
    return PickOutCoordinator;
}());
export { PickOutCoordinator };
if (false) {
    /** @type {?} */
    PickOutCoordinator.prototype.changes;
    /**
     * @type {?}
     * @private
     */
    PickOutCoordinator.prototype.isPickOutAllowed;
    /**
     * @type {?}
     * @private
     */
    PickOutCoordinator.prototype.radar;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGljay1vdXQtY29vcmRpbmF0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL21vZHVsZXMvcGljay1vdXQvcGljay1vdXQtY29vcmRpbmF0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzdCLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFDM0QsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQzNELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFHN0M7SUFNSSw0QkFBb0IsS0FBWTtRQUFaLFVBQUssR0FBTCxLQUFLLENBQU87UUFKaEMsWUFBTyxHQUFpQixJQUFJLE9BQU8sRUFBRSxDQUFDO1FBRTlCLHFCQUFnQixHQUFHLElBQUksQ0FBQztJQUdoQyxDQUFDOzs7O0lBRUQsMkNBQWM7OztJQUFkO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztJQUNsQyxDQUFDOzs7O0lBRUQsMENBQWE7OztJQUFiO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztJQUNqQyxDQUFDOzs7O0lBRUQsd0NBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7Ozs7SUFFRCx5Q0FBWTs7O0lBQVo7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLFlBQVksRUFBRSxDQUFDLENBQUM7SUFDMUMsQ0FBQzs7Ozs7SUFFRCwyQ0FBYzs7OztJQUFkLFVBQWUsS0FBSzs7WUFDVixpQkFBaUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxVQUFDLElBQWUsSUFBSyxPQUFBLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUF2QixDQUF1QixDQUFDO1FBRTlGLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxVQUFDLFNBQVM7WUFDaEMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzRixDQUFDOzs7O0lBRUQsdUNBQVU7OztJQUFWO1FBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7Ozs7Ozs7SUFFTywrQ0FBa0I7Ozs7OztJQUExQixVQUEyQixLQUFLLEVBQUUsWUFBeUI7UUFDdkQsT0FBTyxZQUFZO2FBQ2QsTUFBTSxDQUFDLFVBQUMsV0FBVztZQUNoQixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUMvRCxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDaEQsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2pELEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDdEUsQ0FBQyxDQUFDO2FBQ0QsR0FBRyxDQUFDLFVBQUMsV0FBVyxJQUFLLE9BQUEsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQXhCLENBQXdCLENBQUMsQ0FBQztJQUN4RCxDQUFDOztnQkFoREosVUFBVTs7OztnQkFISCxLQUFLOztJQW9EYix5QkFBQztDQUFBLEFBakRELElBaURDO1NBaERZLGtCQUFrQjs7O0lBQzNCLHFDQUFzQzs7Ozs7SUFFdEMsOENBQWdDOzs7OztJQUVwQixtQ0FBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdWJqZWN0fSBmcm9tICdyeGpzJztcbmltcG9ydCB7RW5kUGlja091dH0gZnJvbSAnLi9ldmVudHMvZW5kLXBpY2stb3V0LmV2ZW50JztcbmltcG9ydCB7UGlja091dEl0ZW1zfSBmcm9tICcuL2V2ZW50cy9waWNrLW91dC1pdGVtcy5ldmVudCc7XG5pbXBvcnQge1N0YXJ0UGlja091dH0gZnJvbSAnLi9ldmVudHMvc3RhcnQtcGljay1vdXQuZXZlbnQnO1xuaW1wb3J0IHtTdG9wUGlja091dH0gZnJvbSAnLi9ldmVudHMvc3RvcC1waWNrLW91dC5ldmVudCc7XG5pbXBvcnQge1JhZGFyfSBmcm9tICcuLi9yYWRhci9yYWRhci5zZXJ2aWNlJztcbmltcG9ydCB7U3BvdE1vZGVsfSBmcm9tICcuLi9yYWRhci9zcG90Lm1vZGVsJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBpY2tPdXRDb29yZGluYXRvciB7XG4gICAgY2hhbmdlczogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcblxuICAgIHByaXZhdGUgaXNQaWNrT3V0QWxsb3dlZCA9IHRydWU7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJhZGFyOiBSYWRhcikge1xuICAgIH1cblxuICAgIGRpc2FibGVQaWNrT3V0KCkge1xuICAgICAgICB0aGlzLmlzUGlja091dEFsbG93ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBlbmFibGVQaWNrT3V0KCkge1xuICAgICAgICB0aGlzLmlzUGlja091dEFsbG93ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHN0b3BQaWNrT3V0KCkge1xuICAgICAgICB0aGlzLmNoYW5nZXMubmV4dChuZXcgU3RvcFBpY2tPdXQoKSk7XG4gICAgfVxuXG4gICAgc3RhcnRQaWNrT3V0KCkge1xuICAgICAgICB0aGlzLmNoYW5nZXMubmV4dChuZXcgU3RhcnRQaWNrT3V0KCkpO1xuICAgIH1cblxuICAgIHBpY2tPdXRDaGFuZ2VkKHJhbmdlKSB7XG4gICAgICAgIGNvbnN0IHBpY2tPdXRTcG90TW9kZWxzID0gdGhpcy5yYWRhci5maWx0ZXJTcG90cygoc3BvdDogU3BvdE1vZGVsKSA9PiBzcG90LmRhdGEuaXNQaWNrT3V0SXRlbSk7XG5cbiAgICAgICAgcGlja091dFNwb3RNb2RlbHMuZm9yRWFjaCgoc3BvdE1vZGVsKSA9PiB7XG4gICAgICAgICAgICBzcG90TW9kZWwudXBkYXRlSW5mbygpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNoYW5nZXMubmV4dChuZXcgUGlja091dEl0ZW1zKHRoaXMuZ2V0U2VsZWN0ZWRJdGVtSWRzKHJhbmdlLCBwaWNrT3V0U3BvdE1vZGVscykpKTtcbiAgICB9XG5cbiAgICBlbmRQaWNrT3V0KCkge1xuICAgICAgICB0aGlzLmNoYW5nZXMubmV4dChuZXcgRW5kUGlja091dCgpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFNlbGVjdGVkSXRlbUlkcyhyYW5nZSwgcGlja091dHNJdGVtOiBTcG90TW9kZWxbXSk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHBpY2tPdXRzSXRlbVxuICAgICAgICAgICAgLmZpbHRlcigocGlja091dEl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHJhbmdlLnggPCAocGlja091dEl0ZW0ucG9zaXRpb24ueCArIHBpY2tPdXRJdGVtLnNpemUud2lkdGgpICYmXG4gICAgICAgICAgICAgICAgICAgIChyYW5nZS54ICsgcmFuZ2Uud2lkdGgpID4gcGlja091dEl0ZW0ucG9zaXRpb24ueCAmJlxuICAgICAgICAgICAgICAgICAgICAocmFuZ2UueSArIHJhbmdlLmhlaWdodCkgPiBwaWNrT3V0SXRlbS5wb3NpdGlvbi55ICYmXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlLnkgPCAocGlja091dEl0ZW0ucG9zaXRpb24ueSArIHBpY2tPdXRJdGVtLnNpemUuaGVpZ2h0KSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm1hcCgocGlja091dEl0ZW0pID0+IHBpY2tPdXRJdGVtLmRhdGEuYnJpY2tJZCk7XG4gICAgfVxufVxuIl19