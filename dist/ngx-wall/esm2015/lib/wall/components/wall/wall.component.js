/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { WallViewModel } from './wall-view.model';
export class WallComponent {
    /**
     * @param {?} wallViewModel
     */
    constructor(wallViewModel) {
        this.wallViewModel = wallViewModel;
        this.model = null;
        this.configuration = null;
    }
    // click on empty space
    /**
     * @return {?}
     */
    onCanvasClick() {
        this.wallViewModel.onCanvasClick();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onBrickStateChanged(event) {
        this.wallViewModel.onBrickStateChanged(event.brickId, event.brickState);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.model) {
            if (!changes.model.firstChange) {
                this.cleanUp();
            }
            this.initialize();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.cleanUp();
    }
    /**
     * @private
     * @return {?}
     */
    initialize() {
        // initialize view model by business model
        this.wallViewModel.initialize(this.model);
    }
    /**
     * @private
     * @return {?}
     */
    cleanUp() {
        this.wallViewModel.reset();
    }
}
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
WallComponent.ctorParameters = () => [
    { type: WallViewModel }
];
WallComponent.propDecorators = {
    model: [{ type: Input }],
    configuration: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    WallComponent.prototype.model;
    /** @type {?} */
    WallComponent.prototype.configuration;
    /** @type {?} */
    WallComponent.prototype.wallViewModel;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi93YWxsL2NvbXBvbmVudHMvd2FsbC93YWxsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQXNDLE1BQU0sZUFBZSxDQUFDO0FBQ3BGLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQVloRCxNQUFNLE9BQU8sYUFBYTs7OztJQUl0QixZQUFtQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUh0QyxVQUFLLEdBQWUsSUFBSSxDQUFDO1FBQ3pCLGtCQUFhLEdBQXVCLElBQUksQ0FBQztJQUdsRCxDQUFDOzs7OztJQUdELGFBQWE7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7Ozs7O0lBRUQsbUJBQW1CLENBQUMsS0FBSztRQUNyQixJQUFJLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzVFLENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQzlCLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRTtZQUNmLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ2xCO1lBRUQsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3JCO0lBQ0wsQ0FBQzs7OztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQzs7Ozs7SUFFTyxVQUFVO1FBQ2QsMENBQTBDO1FBQzFDLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QyxDQUFDOzs7OztJQUVPLE9BQU87UUFDWCxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQy9CLENBQUM7OztZQTdDSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLE1BQU07Z0JBQ2hCLG9nQkFBb0M7Z0JBRXBDLFNBQVMsRUFBRTtvQkFDUCxhQUFhO2lCQUNoQjs7YUFDSjs7OztZQVhPLGFBQWE7OztvQkFhaEIsS0FBSzs0QkFDTCxLQUFLOzs7O0lBRE4sOEJBQWtDOztJQUNsQyxzQ0FBa0Q7O0lBRXRDLHNDQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIFNpbXBsZUNoYW5nZXN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtXYWxsVmlld01vZGVsfSBmcm9tICcuL3dhbGwtdmlldy5tb2RlbCc7XG5pbXBvcnQge0lXYWxsTW9kZWx9IGZyb20gJy4uLy4uL21vZGVsL2ludGVyZmFjZXMvd2FsbC1tb2RlbC5pbnRlcmZhY2UnO1xuaW1wb3J0IHtJV2FsbENvbmZpZ3VyYXRpb259IGZyb20gJy4vaW50ZXJmYWNlcy93YWxsLWNvbmZpZ3VyYXRpb24uaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd3YWxsJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vd2FsbC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vd2FsbC5jb21wb25lbnQuc2NzcyddLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBXYWxsVmlld01vZGVsXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBXYWxsQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpIG1vZGVsOiBJV2FsbE1vZGVsID0gbnVsbDtcbiAgICBASW5wdXQoKSBjb25maWd1cmF0aW9uOiBJV2FsbENvbmZpZ3VyYXRpb24gPSBudWxsO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIHdhbGxWaWV3TW9kZWw6IFdhbGxWaWV3TW9kZWwpIHtcbiAgICB9XG5cbiAgICAvLyBjbGljayBvbiBlbXB0eSBzcGFjZVxuICAgIG9uQ2FudmFzQ2xpY2soKSB7XG4gICAgICAgIHRoaXMud2FsbFZpZXdNb2RlbC5vbkNhbnZhc0NsaWNrKCk7XG4gICAgfVxuXG4gICAgb25Ccmlja1N0YXRlQ2hhbmdlZChldmVudCkge1xuICAgICAgICB0aGlzLndhbGxWaWV3TW9kZWwub25Ccmlja1N0YXRlQ2hhbmdlZChldmVudC5icmlja0lkLCBldmVudC5icmlja1N0YXRlKTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmIChjaGFuZ2VzLm1vZGVsKSB7XG4gICAgICAgICAgICBpZiAoIWNoYW5nZXMubW9kZWwuZmlyc3RDaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFuVXAoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5jbGVhblVwKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplKCkge1xuICAgICAgICAvLyBpbml0aWFsaXplIHZpZXcgbW9kZWwgYnkgYnVzaW5lc3MgbW9kZWxcbiAgICAgICAgdGhpcy53YWxsVmlld01vZGVsLmluaXRpYWxpemUodGhpcy5tb2RlbCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjbGVhblVwKCkge1xuICAgICAgICB0aGlzLndhbGxWaWV3TW9kZWwucmVzZXQoKTtcbiAgICB9XG59XG4iXX0=