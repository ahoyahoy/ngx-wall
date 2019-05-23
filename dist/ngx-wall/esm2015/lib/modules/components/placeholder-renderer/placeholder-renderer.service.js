/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { PlaceholderComponent } from './component/placeholder.component';
export class PlaceholderRenderer {
    /**
     * @param {?} componentFactoryResolver
     * @param {?} appRef
     * @param {?} injector
     */
    constructor(componentFactoryResolver, appRef, injector) {
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
    render(x, y, size, isHorizontal = true) {
        if (!this.placeholderComponentRef) {
            this.renderPlaceholderComponent();
        }
        this.setCoordinate(x, y, size, isHorizontal);
    }
    /**
     * @return {?}
     */
    clear() {
        if (this.placeholderComponentRef) {
            this.removePlaceholderComponent();
        }
    }
    /**
     * @private
     * @return {?}
     */
    renderPlaceholderComponent() {
        this.placeholderComponentRef = this.componentFactoryResolver
            .resolveComponentFactory(PlaceholderComponent)
            .create(this.injector);
        // 2. Attach component to the appRef so that it's inside the ng component tree
        this.appRef.attachView(this.placeholderComponentRef.hostView);
        // 3. Get DOM element from component
        /** @type {?} */
        const domElem = (/** @type {?} */ (((/** @type {?} */ (this.placeholderComponentRef.hostView)))
            .rootNodes[0]));
        // 4. Append DOM element to the body
        document.body.appendChild(domElem);
    }
    /**
     * @private
     * @return {?}
     */
    removePlaceholderComponent() {
        this.appRef.detachView(this.placeholderComponentRef.hostView);
        this.placeholderComponentRef.destroy();
        this.placeholderComponentRef = null;
    }
    /**
     * @private
     * @param {?} x
     * @param {?} y
     * @param {?} size
     * @param {?} isHorizontal
     * @return {?}
     */
    setCoordinate(x, y, size, isHorizontal) {
        this.placeholderComponentRef.instance.setCoordinate(x, y, size, isHorizontal);
    }
}
PlaceholderRenderer.decorators = [
    { type: Injectable }
];
/** @nocollapse */
PlaceholderRenderer.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: ApplicationRef },
    { type: Injector }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2Vob2xkZXItcmVuZGVyZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL21vZHVsZXMvY29tcG9uZW50cy9wbGFjZWhvbGRlci1yZW5kZXJlci9wbGFjZWhvbGRlci1yZW5kZXJlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsY0FBYyxFQUNkLHdCQUF3QixFQUd4QixVQUFVLEVBQ1YsUUFBUSxFQUNYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBR3ZFLE1BQU0sT0FBTyxtQkFBbUI7Ozs7OztJQUc1QixZQUFvQix3QkFBa0QsRUFDbEQsTUFBc0IsRUFDdEIsUUFBa0I7UUFGbEIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCxXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBSjlCLDRCQUF1QixHQUF1QyxJQUFJLENBQUM7SUFLM0UsQ0FBQzs7Ozs7Ozs7SUFFRCxNQUFNLENBQUMsQ0FBUyxFQUFFLENBQVMsRUFBRSxJQUFZLEVBQUUsZUFBd0IsSUFBSTtRQUNuRSxJQUFJLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFO1lBQy9CLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1NBQ3JDO1FBRUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7O0lBRUQsS0FBSztRQUNELElBQUksSUFBSSxDQUFDLHVCQUF1QixFQUFFO1lBQzlCLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1NBQ3JDO0lBQ0wsQ0FBQzs7Ozs7SUFFTywwQkFBMEI7UUFDOUIsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQyx3QkFBd0I7YUFDdkQsdUJBQXVCLENBQUMsb0JBQW9CLENBQUM7YUFDN0MsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUzQiw4RUFBOEU7UUFDOUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7Y0FHeEQsT0FBTyxHQUFHLG1CQUFBLENBQUMsbUJBQUEsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsRUFBd0IsQ0FBQzthQUMxRSxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQWU7UUFFaEMsb0NBQW9DO1FBQ3BDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7Ozs7O0lBRU8sMEJBQTBCO1FBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsdUJBQXVCLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFdkMsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQztJQUN4QyxDQUFDOzs7Ozs7Ozs7SUFFTyxhQUFhLENBQUMsQ0FBUyxFQUFFLENBQVMsRUFBRSxJQUFZLEVBQUUsWUFBcUI7UUFDM0UsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDbEYsQ0FBQzs7O1lBaERKLFVBQVU7Ozs7WUFSUCx3QkFBd0I7WUFEeEIsY0FBYztZQUtkLFFBQVE7Ozs7Ozs7SUFNUixzREFBMkU7Ozs7O0lBRS9ELHVEQUEwRDs7Ozs7SUFDMUQscUNBQThCOzs7OztJQUM5Qix1Q0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEFwcGxpY2F0aW9uUmVmLFxuICAgIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBDb21wb25lbnRSZWYsXG4gICAgRW1iZWRkZWRWaWV3UmVmLFxuICAgIEluamVjdGFibGUsXG4gICAgSW5qZWN0b3Jcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1BsYWNlaG9sZGVyQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudC9wbGFjZWhvbGRlci5jb21wb25lbnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUGxhY2Vob2xkZXJSZW5kZXJlciB7XG4gICAgcHJpdmF0ZSBwbGFjZWhvbGRlckNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPFBsYWNlaG9sZGVyQ29tcG9uZW50PiA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgYXBwUmVmOiBBcHBsaWNhdGlvblJlZixcbiAgICAgICAgICAgICAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgIH1cblxuICAgIHJlbmRlcih4OiBudW1iZXIsIHk6IG51bWJlciwgc2l6ZTogbnVtYmVyLCBpc0hvcml6b250YWw6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgICAgIGlmICghdGhpcy5wbGFjZWhvbGRlckNvbXBvbmVudFJlZikge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJQbGFjZWhvbGRlckNvbXBvbmVudCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRDb29yZGluYXRlKHgsIHksIHNpemUsIGlzSG9yaXpvbnRhbCk7XG4gICAgfVxuXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnBsYWNlaG9sZGVyQ29tcG9uZW50UmVmKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVBsYWNlaG9sZGVyQ29tcG9uZW50KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbmRlclBsYWNlaG9sZGVyQ29tcG9uZW50KCkge1xuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyQ29tcG9uZW50UmVmID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXJcbiAgICAgICAgICAgIC5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShQbGFjZWhvbGRlckNvbXBvbmVudClcbiAgICAgICAgICAgIC5jcmVhdGUodGhpcy5pbmplY3Rvcik7XG5cbiAgICAgICAgLy8gMi4gQXR0YWNoIGNvbXBvbmVudCB0byB0aGUgYXBwUmVmIHNvIHRoYXQgaXQncyBpbnNpZGUgdGhlIG5nIGNvbXBvbmVudCB0cmVlXG4gICAgICAgIHRoaXMuYXBwUmVmLmF0dGFjaFZpZXcodGhpcy5wbGFjZWhvbGRlckNvbXBvbmVudFJlZi5ob3N0Vmlldyk7XG5cbiAgICAgICAgLy8gMy4gR2V0IERPTSBlbGVtZW50IGZyb20gY29tcG9uZW50XG4gICAgICAgIGNvbnN0IGRvbUVsZW0gPSAodGhpcy5wbGFjZWhvbGRlckNvbXBvbmVudFJlZi5ob3N0VmlldyBhcyBFbWJlZGRlZFZpZXdSZWY8YW55PilcbiAgICAgICAgICAgIC5yb290Tm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQ7XG5cbiAgICAgICAgLy8gNC4gQXBwZW5kIERPTSBlbGVtZW50IHRvIHRoZSBib2R5XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZG9tRWxlbSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW1vdmVQbGFjZWhvbGRlckNvbXBvbmVudCgpIHtcbiAgICAgICAgdGhpcy5hcHBSZWYuZGV0YWNoVmlldyh0aGlzLnBsYWNlaG9sZGVyQ29tcG9uZW50UmVmLmhvc3RWaWV3KTtcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlckNvbXBvbmVudFJlZi5kZXN0cm95KCk7XG5cbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlckNvbXBvbmVudFJlZiA9IG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRDb29yZGluYXRlKHg6IG51bWJlciwgeTogbnVtYmVyLCBzaXplOiBudW1iZXIsIGlzSG9yaXpvbnRhbDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyQ29tcG9uZW50UmVmLmluc3RhbmNlLnNldENvb3JkaW5hdGUoeCwgeSwgc2l6ZSwgaXNIb3Jpem9udGFsKTtcbiAgICB9XG59XG4iXX0=