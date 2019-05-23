/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { PlaceholderComponent } from './component/placeholder.component';
var PlaceholderRenderer = /** @class */ (function () {
    function PlaceholderRenderer(componentFactoryResolver, appRef, injector) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.injector = injector;
        this.placeholderComponentRef = null;
    }
    /**
     * @param {?} x
     * @param {?} y
     * @param {?} size
     * @param {?=} isHorizontal
     * @return {?}
     */
    PlaceholderRenderer.prototype.render = /**
     * @param {?} x
     * @param {?} y
     * @param {?} size
     * @param {?=} isHorizontal
     * @return {?}
     */
    function (x, y, size, isHorizontal) {
        if (isHorizontal === void 0) { isHorizontal = true; }
        if (!this.placeholderComponentRef) {
            this.renderPlaceholderComponent();
        }
        this.setCoordinate(x, y, size, isHorizontal);
    };
    /**
     * @return {?}
     */
    PlaceholderRenderer.prototype.clear = /**
     * @return {?}
     */
    function () {
        if (this.placeholderComponentRef) {
            this.removePlaceholderComponent();
        }
    };
    /**
     * @private
     * @return {?}
     */
    PlaceholderRenderer.prototype.renderPlaceholderComponent = /**
     * @private
     * @return {?}
     */
    function () {
        this.placeholderComponentRef = this.componentFactoryResolver
            .resolveComponentFactory(PlaceholderComponent)
            .create(this.injector);
        // 2. Attach component to the appRef so that it's inside the ng component tree
        this.appRef.attachView(this.placeholderComponentRef.hostView);
        // 3. Get DOM element from component
        /** @type {?} */
        var domElem = (/** @type {?} */ (((/** @type {?} */ (this.placeholderComponentRef.hostView)))
            .rootNodes[0]));
        // 4. Append DOM element to the body
        document.body.appendChild(domElem);
    };
    /**
     * @private
     * @return {?}
     */
    PlaceholderRenderer.prototype.removePlaceholderComponent = /**
     * @private
     * @return {?}
     */
    function () {
        this.appRef.detachView(this.placeholderComponentRef.hostView);
        this.placeholderComponentRef.destroy();
        this.placeholderComponentRef = null;
    };
    /**
     * @private
     * @param {?} x
     * @param {?} y
     * @param {?} size
     * @param {?} isHorizontal
     * @return {?}
     */
    PlaceholderRenderer.prototype.setCoordinate = /**
     * @private
     * @param {?} x
     * @param {?} y
     * @param {?} size
     * @param {?} isHorizontal
     * @return {?}
     */
    function (x, y, size, isHorizontal) {
        this.placeholderComponentRef.instance.setCoordinate(x, y, size, isHorizontal);
    };
    PlaceholderRenderer.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    PlaceholderRenderer.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: ApplicationRef },
        { type: Injector }
    ]; };
    return PlaceholderRenderer;
}());
export { PlaceholderRenderer };
if (false) {
    /**
     * @type {?}
     * @private
     */
    PlaceholderRenderer.prototype.placeholderComponentRef;
    /**
     * @type {?}
     * @private
     */
    PlaceholderRenderer.prototype.componentFactoryResolver;
    /**
     * @type {?}
     * @private
     */
    PlaceholderRenderer.prototype.appRef;
    /**
     * @type {?}
     * @private
     */
    PlaceholderRenderer.prototype.injector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2Vob2xkZXItcmVuZGVyZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL21vZHVsZXMvY29tcG9uZW50cy9wbGFjZWhvbGRlci1yZW5kZXJlci9wbGFjZWhvbGRlci1yZW5kZXJlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsY0FBYyxFQUNkLHdCQUF3QixFQUd4QixVQUFVLEVBQ1YsUUFBUSxFQUNYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBRXZFO0lBSUksNkJBQW9CLHdCQUFrRCxFQUNsRCxNQUFzQixFQUN0QixRQUFrQjtRQUZsQiw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBQ2xELFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFKOUIsNEJBQXVCLEdBQXVDLElBQUksQ0FBQztJQUszRSxDQUFDOzs7Ozs7OztJQUVELG9DQUFNOzs7Ozs7O0lBQU4sVUFBTyxDQUFTLEVBQUUsQ0FBUyxFQUFFLElBQVksRUFBRSxZQUE0QjtRQUE1Qiw2QkFBQSxFQUFBLG1CQUE0QjtRQUNuRSxJQUFJLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFO1lBQy9CLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1NBQ3JDO1FBRUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7O0lBRUQsbUNBQUs7OztJQUFMO1FBQ0ksSUFBSSxJQUFJLENBQUMsdUJBQXVCLEVBQUU7WUFDOUIsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7U0FDckM7SUFDTCxDQUFDOzs7OztJQUVPLHdEQUEwQjs7OztJQUFsQztRQUNJLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsd0JBQXdCO2FBQ3ZELHVCQUF1QixDQUFDLG9CQUFvQixDQUFDO2FBQzdDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFM0IsOEVBQThFO1FBQzlFLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7O1lBR3hELE9BQU8sR0FBRyxtQkFBQSxDQUFDLG1CQUFBLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxRQUFRLEVBQXdCLENBQUM7YUFDMUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFlO1FBRWhDLG9DQUFvQztRQUNwQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2QyxDQUFDOzs7OztJQUVPLHdEQUEwQjs7OztJQUFsQztRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsdUJBQXVCLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFdkMsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQztJQUN4QyxDQUFDOzs7Ozs7Ozs7SUFFTywyQ0FBYTs7Ozs7Ozs7SUFBckIsVUFBc0IsQ0FBUyxFQUFFLENBQVMsRUFBRSxJQUFZLEVBQUUsWUFBcUI7UUFDM0UsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDbEYsQ0FBQzs7Z0JBaERKLFVBQVU7Ozs7Z0JBUlAsd0JBQXdCO2dCQUR4QixjQUFjO2dCQUtkLFFBQVE7O0lBcURaLDBCQUFDO0NBQUEsQUFqREQsSUFpREM7U0FoRFksbUJBQW1COzs7Ozs7SUFDNUIsc0RBQTJFOzs7OztJQUUvRCx1REFBMEQ7Ozs7O0lBQzFELHFDQUE4Qjs7Ozs7SUFDOUIsdUNBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBcHBsaWNhdGlvblJlZixcbiAgICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgQ29tcG9uZW50UmVmLFxuICAgIEVtYmVkZGVkVmlld1JlZixcbiAgICBJbmplY3RhYmxlLFxuICAgIEluamVjdG9yXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtQbGFjZWhvbGRlckNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnQvcGxhY2Vob2xkZXIuY29tcG9uZW50JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBsYWNlaG9sZGVyUmVuZGVyZXIge1xuICAgIHByaXZhdGUgcGxhY2Vob2xkZXJDb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxQbGFjZWhvbGRlckNvbXBvbmVudD4gPSBudWxsO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgICAgICAgICBwcml2YXRlIGFwcFJlZjogQXBwbGljYXRpb25SZWYsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICB9XG5cbiAgICByZW5kZXIoeDogbnVtYmVyLCB5OiBudW1iZXIsIHNpemU6IG51bWJlciwgaXNIb3Jpem9udGFsOiBib29sZWFuID0gdHJ1ZSkge1xuICAgICAgICBpZiAoIXRoaXMucGxhY2Vob2xkZXJDb21wb25lbnRSZWYpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyUGxhY2Vob2xkZXJDb21wb25lbnQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0Q29vcmRpbmF0ZSh4LCB5LCBzaXplLCBpc0hvcml6b250YWwpO1xuICAgIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICBpZiAodGhpcy5wbGFjZWhvbGRlckNvbXBvbmVudFJlZikge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVQbGFjZWhvbGRlckNvbXBvbmVudCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW5kZXJQbGFjZWhvbGRlckNvbXBvbmVudCgpIHtcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlckNvbXBvbmVudFJlZiA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyXG4gICAgICAgICAgICAucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoUGxhY2Vob2xkZXJDb21wb25lbnQpXG4gICAgICAgICAgICAuY3JlYXRlKHRoaXMuaW5qZWN0b3IpO1xuXG4gICAgICAgIC8vIDIuIEF0dGFjaCBjb21wb25lbnQgdG8gdGhlIGFwcFJlZiBzbyB0aGF0IGl0J3MgaW5zaWRlIHRoZSBuZyBjb21wb25lbnQgdHJlZVxuICAgICAgICB0aGlzLmFwcFJlZi5hdHRhY2hWaWV3KHRoaXMucGxhY2Vob2xkZXJDb21wb25lbnRSZWYuaG9zdFZpZXcpO1xuXG4gICAgICAgIC8vIDMuIEdldCBET00gZWxlbWVudCBmcm9tIGNvbXBvbmVudFxuICAgICAgICBjb25zdCBkb21FbGVtID0gKHRoaXMucGxhY2Vob2xkZXJDb21wb25lbnRSZWYuaG9zdFZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT4pXG4gICAgICAgICAgICAucm9vdE5vZGVzWzBdIGFzIEhUTUxFbGVtZW50O1xuXG4gICAgICAgIC8vIDQuIEFwcGVuZCBET00gZWxlbWVudCB0byB0aGUgYm9keVxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRvbUVsZW0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlUGxhY2Vob2xkZXJDb21wb25lbnQoKSB7XG4gICAgICAgIHRoaXMuYXBwUmVmLmRldGFjaFZpZXcodGhpcy5wbGFjZWhvbGRlckNvbXBvbmVudFJlZi5ob3N0Vmlldyk7XG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXJDb21wb25lbnRSZWYuZGVzdHJveSgpO1xuXG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXJDb21wb25lbnRSZWYgPSBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0Q29vcmRpbmF0ZSh4OiBudW1iZXIsIHk6IG51bWJlciwgc2l6ZTogbnVtYmVyLCBpc0hvcml6b250YWw6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlckNvbXBvbmVudFJlZi5pbnN0YW5jZS5zZXRDb29yZGluYXRlKHgsIHksIHNpemUsIGlzSG9yaXpvbnRhbCk7XG4gICAgfVxufVxuIl19