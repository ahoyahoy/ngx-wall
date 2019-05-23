/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { WallViewModel } from './wall-view.model';
var WallComponent = /** @class */ (function () {
    function WallComponent(wallViewModel) {
        this.wallViewModel = wallViewModel;
        this.model = null;
        this.configuration = null;
    }
    // click on empty space
    // click on empty space
    /**
     * @return {?}
     */
    WallComponent.prototype.onCanvasClick = 
    // click on empty space
    /**
     * @return {?}
     */
    function () {
        this.wallViewModel.onCanvasClick();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    WallComponent.prototype.onBrickStateChanged = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.wallViewModel.onBrickStateChanged(event.brickId, event.brickState);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    WallComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.model) {
            if (!changes.model.firstChange) {
                this.cleanUp();
            }
            this.initialize();
        }
    };
    /**
     * @return {?}
     */
    WallComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.cleanUp();
    };
    /**
     * @private
     * @return {?}
     */
    WallComponent.prototype.initialize = /**
     * @private
     * @return {?}
     */
    function () {
        // initialize view model by business model
        this.wallViewModel.initialize(this.model);
    };
    /**
     * @private
     * @return {?}
     */
    WallComponent.prototype.cleanUp = /**
     * @private
     * @return {?}
     */
    function () {
        this.wallViewModel.reset();
    };
    WallComponent.decorators = [
        { type: Component, args: [{
                    selector: 'wall',
                    template: "<wall-canvas *ngIf=\"wallViewModel.canvasLayout\"\n             (canvasClick)=\"onCanvasClick()\"\n             (onBrickStateChanged)=\"onBrickStateChanged($event)\"\n\n             [wallModel]=\"wallViewModel.wallModel\"\n             [isMediaInteractionEnabled$]=\"wallViewModel.isMediaInteractionEnabled$\"\n             [focusedBrick]=\"wallViewModel.focusedBrick\"\n             [selectedBricks]=\"wallViewModel.selectedBricks\"\n             [rows]=\"wallViewModel.canvasLayout\">\n</wall-canvas>\n",
                    providers: [
                        WallViewModel
                    ],
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    WallComponent.ctorParameters = function () { return [
        { type: WallViewModel }
    ]; };
    WallComponent.propDecorators = {
        model: [{ type: Input }],
        configuration: [{ type: Input }]
    };
    return WallComponent;
}());
export { WallComponent };
if (false) {
    /** @type {?} */
    WallComponent.prototype.model;
    /** @type {?} */
    WallComponent.prototype.configuration;
    /** @type {?} */
    WallComponent.prototype.wallViewModel;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi93YWxsL2NvbXBvbmVudHMvd2FsbC93YWxsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQXNDLE1BQU0sZUFBZSxDQUFDO0FBQ3BGLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUloRDtJQVlJLHVCQUFtQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUh0QyxVQUFLLEdBQWUsSUFBSSxDQUFDO1FBQ3pCLGtCQUFhLEdBQXVCLElBQUksQ0FBQztJQUdsRCxDQUFDO0lBRUQsdUJBQXVCOzs7OztJQUN2QixxQ0FBYTs7Ozs7SUFBYjtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkMsQ0FBQzs7Ozs7SUFFRCwyQ0FBbUI7Ozs7SUFBbkIsVUFBb0IsS0FBSztRQUNyQixJQUFJLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzVFLENBQUM7Ozs7O0lBRUQsbUNBQVc7Ozs7SUFBWCxVQUFZLE9BQXNCO1FBQzlCLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRTtZQUNmLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ2xCO1lBRUQsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3JCO0lBQ0wsQ0FBQzs7OztJQUVELG1DQUFXOzs7SUFBWDtRQUNJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDOzs7OztJQUVPLGtDQUFVOzs7O0lBQWxCO1FBQ0ksMENBQTBDO1FBQzFDLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QyxDQUFDOzs7OztJQUVPLCtCQUFPOzs7O0lBQWY7UUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQy9CLENBQUM7O2dCQTdDSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLE1BQU07b0JBQ2hCLG9nQkFBb0M7b0JBRXBDLFNBQVMsRUFBRTt3QkFDUCxhQUFhO3FCQUNoQjs7aUJBQ0o7Ozs7Z0JBWE8sYUFBYTs7O3dCQWFoQixLQUFLO2dDQUNMLEtBQUs7O0lBb0NWLG9CQUFDO0NBQUEsQUE5Q0QsSUE4Q0M7U0F0Q1ksYUFBYTs7O0lBQ3RCLDhCQUFrQzs7SUFDbEMsc0NBQWtEOztJQUV0QyxzQ0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBTaW1wbGVDaGFuZ2VzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7V2FsbFZpZXdNb2RlbH0gZnJvbSAnLi93YWxsLXZpZXcubW9kZWwnO1xuaW1wb3J0IHtJV2FsbE1vZGVsfSBmcm9tICcuLi8uLi9tb2RlbC9pbnRlcmZhY2VzL3dhbGwtbW9kZWwuaW50ZXJmYWNlJztcbmltcG9ydCB7SVdhbGxDb25maWd1cmF0aW9ufSBmcm9tICcuL2ludGVyZmFjZXMvd2FsbC1jb25maWd1cmF0aW9uLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnd2FsbCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3dhbGwuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3dhbGwuY29tcG9uZW50LnNjc3MnXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgV2FsbFZpZXdNb2RlbFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgV2FsbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgICBASW5wdXQoKSBtb2RlbDogSVdhbGxNb2RlbCA9IG51bGw7XG4gICAgQElucHV0KCkgY29uZmlndXJhdGlvbjogSVdhbGxDb25maWd1cmF0aW9uID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB3YWxsVmlld01vZGVsOiBXYWxsVmlld01vZGVsKSB7XG4gICAgfVxuXG4gICAgLy8gY2xpY2sgb24gZW1wdHkgc3BhY2VcbiAgICBvbkNhbnZhc0NsaWNrKCkge1xuICAgICAgICB0aGlzLndhbGxWaWV3TW9kZWwub25DYW52YXNDbGljaygpO1xuICAgIH1cblxuICAgIG9uQnJpY2tTdGF0ZUNoYW5nZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy53YWxsVmlld01vZGVsLm9uQnJpY2tTdGF0ZUNoYW5nZWQoZXZlbnQuYnJpY2tJZCwgZXZlbnQuYnJpY2tTdGF0ZSk7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoY2hhbmdlcy5tb2RlbCkge1xuICAgICAgICAgICAgaWYgKCFjaGFuZ2VzLm1vZGVsLmZpcnN0Q2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhblVwKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuY2xlYW5VcCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZSgpIHtcbiAgICAgICAgLy8gaW5pdGlhbGl6ZSB2aWV3IG1vZGVsIGJ5IGJ1c2luZXNzIG1vZGVsXG4gICAgICAgIHRoaXMud2FsbFZpZXdNb2RlbC5pbml0aWFsaXplKHRoaXMubW9kZWwpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2xlYW5VcCgpIHtcbiAgICAgICAgdGhpcy53YWxsVmlld01vZGVsLnJlc2V0KCk7XG4gICAgfVxufVxuIl19