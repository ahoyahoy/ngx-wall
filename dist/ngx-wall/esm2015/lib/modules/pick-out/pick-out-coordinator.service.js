/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { EndPickOut } from './events/end-pick-out.event';
import { PickOutItems } from './events/pick-out-items.event';
import { StartPickOut } from './events/start-pick-out.event';
import { StopPickOut } from './events/stop-pick-out.event';
import { Radar } from '../radar/radar.service';
export class PickOutCoordinator {
    /**
     * @param {?} radar
     */
    constructor(radar) {
        this.radar = radar;
        this.changes = new Subject();
        this.isPickOutAllowed = true;
    }
    /**
     * @return {?}
     */
    disablePickOut() {
        this.isPickOutAllowed = false;
    }
    /**
     * @return {?}
     */
    enablePickOut() {
        this.isPickOutAllowed = true;
    }
    /**
     * @return {?}
     */
    stopPickOut() {
        this.changes.next(new StopPickOut());
    }
    /**
     * @return {?}
     */
    startPickOut() {
        this.changes.next(new StartPickOut());
    }
    /**
     * @param {?} range
     * @return {?}
     */
    pickOutChanged(range) {
        /** @type {?} */
        const pickOutSpotModels = this.radar.filterSpots((/**
         * @param {?} spot
         * @return {?}
         */
        (spot) => spot.data.isPickOutItem));
        pickOutSpotModels.forEach((/**
         * @param {?} spotModel
         * @return {?}
         */
        (spotModel) => {
            spotModel.updateInfo();
        }));
        this.changes.next(new PickOutItems(this.getSelectedItemIds(range, pickOutSpotModels)));
    }
    /**
     * @return {?}
     */
    endPickOut() {
        this.changes.next(new EndPickOut());
    }
    /**
     * @private
     * @param {?} range
     * @param {?} pickOutsItem
     * @return {?}
     */
    getSelectedItemIds(range, pickOutsItem) {
        return pickOutsItem
            .filter((/**
         * @param {?} pickOutItem
         * @return {?}
         */
        (pickOutItem) => {
            return (range.x < (pickOutItem.position.x + pickOutItem.size.width) &&
                (range.x + range.width) > pickOutItem.position.x &&
                (range.y + range.height) > pickOutItem.position.y &&
                range.y < (pickOutItem.position.y + pickOutItem.size.height));
        }))
            .map((/**
         * @param {?} pickOutItem
         * @return {?}
         */
        (pickOutItem) => pickOutItem.data.brickId));
    }
}
PickOutCoordinator.decorators = [
    { type: Injectable }
];
/** @nocollapse */
PickOutCoordinator.ctorParameters = () => [
    { type: Radar }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGljay1vdXQtY29vcmRpbmF0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL21vZHVsZXMvcGljay1vdXQvcGljay1vdXQtY29vcmRpbmF0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzdCLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFDM0QsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQzNELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFJN0MsTUFBTSxPQUFPLGtCQUFrQjs7OztJQUszQixZQUFvQixLQUFZO1FBQVosVUFBSyxHQUFMLEtBQUssQ0FBTztRQUpoQyxZQUFPLEdBQWlCLElBQUksT0FBTyxFQUFFLENBQUM7UUFFOUIscUJBQWdCLEdBQUcsSUFBSSxDQUFDO0lBR2hDLENBQUM7Ozs7SUFFRCxjQUFjO1FBQ1YsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztJQUNsQyxDQUFDOzs7O0lBRUQsYUFBYTtRQUNULElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7SUFDakMsQ0FBQzs7OztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDekMsQ0FBQzs7OztJQUVELFlBQVk7UUFDUixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLFlBQVksRUFBRSxDQUFDLENBQUM7SUFDMUMsQ0FBQzs7Ozs7SUFFRCxjQUFjLENBQUMsS0FBSzs7Y0FDVixpQkFBaUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVc7Ozs7UUFBQyxDQUFDLElBQWUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUM7UUFFOUYsaUJBQWlCLENBQUMsT0FBTzs7OztRQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDcEMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzNCLENBQUMsRUFBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzRixDQUFDOzs7O0lBRUQsVUFBVTtRQUNOLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxFQUFFLENBQUMsQ0FBQztJQUN4QyxDQUFDOzs7Ozs7O0lBRU8sa0JBQWtCLENBQUMsS0FBSyxFQUFFLFlBQXlCO1FBQ3ZELE9BQU8sWUFBWTthQUNkLE1BQU07Ozs7UUFBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQ3BCLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQy9ELENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNoRCxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDakQsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUN0RSxDQUFDLEVBQUM7YUFDRCxHQUFHOzs7O1FBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFDLENBQUM7SUFDeEQsQ0FBQzs7O1lBaERKLFVBQVU7Ozs7WUFISCxLQUFLOzs7O0lBS1QscUNBQXNDOzs7OztJQUV0Qyw4Q0FBZ0M7Ozs7O0lBRXBCLG1DQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtFbmRQaWNrT3V0fSBmcm9tICcuL2V2ZW50cy9lbmQtcGljay1vdXQuZXZlbnQnO1xuaW1wb3J0IHtQaWNrT3V0SXRlbXN9IGZyb20gJy4vZXZlbnRzL3BpY2stb3V0LWl0ZW1zLmV2ZW50JztcbmltcG9ydCB7U3RhcnRQaWNrT3V0fSBmcm9tICcuL2V2ZW50cy9zdGFydC1waWNrLW91dC5ldmVudCc7XG5pbXBvcnQge1N0b3BQaWNrT3V0fSBmcm9tICcuL2V2ZW50cy9zdG9wLXBpY2stb3V0LmV2ZW50JztcbmltcG9ydCB7UmFkYXJ9IGZyb20gJy4uL3JhZGFyL3JhZGFyLnNlcnZpY2UnO1xuaW1wb3J0IHtTcG90TW9kZWx9IGZyb20gJy4uL3JhZGFyL3Nwb3QubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUGlja091dENvb3JkaW5hdG9yIHtcbiAgICBjaGFuZ2VzOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpO1xuXG4gICAgcHJpdmF0ZSBpc1BpY2tPdXRBbGxvd2VkID0gdHJ1ZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmFkYXI6IFJhZGFyKSB7XG4gICAgfVxuXG4gICAgZGlzYWJsZVBpY2tPdXQoKSB7XG4gICAgICAgIHRoaXMuaXNQaWNrT3V0QWxsb3dlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGVuYWJsZVBpY2tPdXQoKSB7XG4gICAgICAgIHRoaXMuaXNQaWNrT3V0QWxsb3dlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgc3RvcFBpY2tPdXQoKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlcy5uZXh0KG5ldyBTdG9wUGlja091dCgpKTtcbiAgICB9XG5cbiAgICBzdGFydFBpY2tPdXQoKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlcy5uZXh0KG5ldyBTdGFydFBpY2tPdXQoKSk7XG4gICAgfVxuXG4gICAgcGlja091dENoYW5nZWQocmFuZ2UpIHtcbiAgICAgICAgY29uc3QgcGlja091dFNwb3RNb2RlbHMgPSB0aGlzLnJhZGFyLmZpbHRlclNwb3RzKChzcG90OiBTcG90TW9kZWwpID0+IHNwb3QuZGF0YS5pc1BpY2tPdXRJdGVtKTtcblxuICAgICAgICBwaWNrT3V0U3BvdE1vZGVscy5mb3JFYWNoKChzcG90TW9kZWwpID0+IHtcbiAgICAgICAgICAgIHNwb3RNb2RlbC51cGRhdGVJbmZvKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY2hhbmdlcy5uZXh0KG5ldyBQaWNrT3V0SXRlbXModGhpcy5nZXRTZWxlY3RlZEl0ZW1JZHMocmFuZ2UsIHBpY2tPdXRTcG90TW9kZWxzKSkpO1xuICAgIH1cblxuICAgIGVuZFBpY2tPdXQoKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlcy5uZXh0KG5ldyBFbmRQaWNrT3V0KCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0U2VsZWN0ZWRJdGVtSWRzKHJhbmdlLCBwaWNrT3V0c0l0ZW06IFNwb3RNb2RlbFtdKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gcGlja091dHNJdGVtXG4gICAgICAgICAgICAuZmlsdGVyKChwaWNrT3V0SXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAocmFuZ2UueCA8IChwaWNrT3V0SXRlbS5wb3NpdGlvbi54ICsgcGlja091dEl0ZW0uc2l6ZS53aWR0aCkgJiZcbiAgICAgICAgICAgICAgICAgICAgKHJhbmdlLnggKyByYW5nZS53aWR0aCkgPiBwaWNrT3V0SXRlbS5wb3NpdGlvbi54ICYmXG4gICAgICAgICAgICAgICAgICAgIChyYW5nZS55ICsgcmFuZ2UuaGVpZ2h0KSA+IHBpY2tPdXRJdGVtLnBvc2l0aW9uLnkgJiZcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UueSA8IChwaWNrT3V0SXRlbS5wb3NpdGlvbi55ICsgcGlja091dEl0ZW0uc2l6ZS5oZWlnaHQpKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAubWFwKChwaWNrT3V0SXRlbSkgPT4gcGlja091dEl0ZW0uZGF0YS5icmlja0lkKTtcbiAgICB9XG59XG4iXX0=