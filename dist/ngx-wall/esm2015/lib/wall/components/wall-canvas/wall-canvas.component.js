/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, Input, Output, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
export class WallCanvasComponent {
    /**
     * @param {?} doc
     */
    constructor(doc) {
        this.rows = [];
        this.selectedBricks = null;
        this.focusedBrick = null;
        this.canvasClick = new EventEmitter();
        this.onBrickStateChanged = new EventEmitter();
        // public API for sub components
        this.focusedBrick$ = new Subject();
        this.selectedBricks$ = new Subject();
        this.doc = null;
        this.doc = doc;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onEditorClick(e) {
        if (e.target === this.expander.nativeElement) {
            this.canvasClick.emit();
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.focusedBrick && changes.focusedBrick.currentValue) {
            this.focusedBrick$.next(changes.focusedBrick.currentValue);
        }
        if (changes.selectedBricks) {
            this.selectedBricks$.next(changes.selectedBricks.currentValue || []);
        }
    }
    /**
     * @param {?} brickId
     * @param {?} brickState
     * @return {?}
     */
    brickStateChanged(brickId, brickState) {
        this.onBrickStateChanged.emit({
            brickId,
            brickState
        });
    }
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    trackRowsBy(index, item) {
        return item.id;
    }
}
WallCanvasComponent.decorators = [
    { type: Component, args: [{
                selector: 'wall-canvas',
                template: "<div #editor class=\"wall-canvas__editor\" (click)=\"onEditorClick($event)\">\n    <wall-canvas-row *ngFor=\"let row of rows; trackBy: trackRowsBy\" [row]=\"row\"></wall-canvas-row>\n\n    <div #expander class=\"wall-canvas__expander\"></div>\n</div>\n",
                styles: [":host{display:block}:host .wall-canvas__editor{min-height:200px;cursor:text}:host .wall-canvas__expander{min-height:250px}"]
            }] }
];
/** @nocollapse */
WallCanvasComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
WallCanvasComponent.propDecorators = {
    wallModel: [{ type: Input }],
    rows: [{ type: Input }],
    selectedBricks: [{ type: Input }],
    focusedBrick: [{ type: Input }],
    isMediaInteractionEnabled$: [{ type: Input }],
    canvasClick: [{ type: Output }],
    onBrickStateChanged: [{ type: Output }],
    expander: [{ type: ViewChild, args: ['expander',] }]
};
if (false) {
    /** @type {?} */
    WallCanvasComponent.prototype.wallModel;
    /** @type {?} */
    WallCanvasComponent.prototype.rows;
    /** @type {?} */
    WallCanvasComponent.prototype.selectedBricks;
    /** @type {?} */
    WallCanvasComponent.prototype.focusedBrick;
    /** @type {?} */
    WallCanvasComponent.prototype.isMediaInteractionEnabled$;
    /** @type {?} */
    WallCanvasComponent.prototype.canvasClick;
    /** @type {?} */
    WallCanvasComponent.prototype.onBrickStateChanged;
    /** @type {?} */
    WallCanvasComponent.prototype.focusedBrick$;
    /** @type {?} */
    WallCanvasComponent.prototype.selectedBricks$;
    /** @type {?} */
    WallCanvasComponent.prototype.doc;
    /** @type {?} */
    WallCanvasComponent.prototype.expander;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbC1jYW52YXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvd2FsbC9jb21wb25lbnRzL3dhbGwtY2FudmFzL3dhbGwtY2FudmFzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBaUIsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzlILE9BQU8sRUFBQyxVQUFVLEVBQUUsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBVXpDLE1BQU0sT0FBTyxtQkFBbUI7Ozs7SUFtQjVCLFlBQThCLEdBQUc7UUFqQnhCLFNBQUksR0FBZSxFQUFFLENBQUM7UUFFdEIsbUJBQWMsR0FBYSxJQUFJLENBQUM7UUFDaEMsaUJBQVksR0FBa0IsSUFBSSxDQUFDO1FBR2xDLGdCQUFXLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDcEQsd0JBQW1CLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7O1FBR3RFLGtCQUFhLEdBQTJCLElBQUksT0FBTyxFQUFFLENBQUM7UUFDdEQsb0JBQWUsR0FBc0IsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUVuRCxRQUFHLEdBQVEsSUFBSSxDQUFDO1FBS1osSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDbkIsQ0FBQzs7Ozs7SUFFRCxhQUFhLENBQUMsQ0FBTTtRQUNoQixJQUFJLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUU7WUFDMUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUMzQjtJQUNMLENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQzlCLElBQUksT0FBTyxDQUFDLFlBQVksSUFBSSxPQUFPLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRTtZQUMzRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQzlEO1FBRUQsSUFBSSxPQUFPLENBQUMsY0FBYyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQ3hFO0lBQ0wsQ0FBQzs7Ozs7O0lBRUQsaUJBQWlCLENBQUMsT0FBZSxFQUFFLFVBQWU7UUFDOUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQztZQUMxQixPQUFPO1lBQ1AsVUFBVTtTQUNiLENBQUMsQ0FBQztJQUNQLENBQUM7Ozs7OztJQUVELFdBQVcsQ0FBQyxLQUFLLEVBQUUsSUFBSTtRQUNuQixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDbkIsQ0FBQzs7O1lBckRKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsd1FBQXFEOzthQUV4RDs7Ozs0Q0FvQmdCLE1BQU0sU0FBQyxRQUFROzs7d0JBbEIzQixLQUFLO21CQUNMLEtBQUs7NkJBRUwsS0FBSzsyQkFDTCxLQUFLO3lDQUNMLEtBQUs7MEJBRUwsTUFBTTtrQ0FDTixNQUFNO3VCQVFOLFNBQVMsU0FBQyxVQUFVOzs7O0lBaEJyQix3Q0FBK0I7O0lBQy9CLG1DQUErQjs7SUFFL0IsNkNBQXlDOztJQUN6QywyQ0FBNEM7O0lBQzVDLHlEQUF5RDs7SUFFekQsMENBQThEOztJQUM5RCxrREFBc0U7O0lBR3RFLDRDQUFzRDs7SUFDdEQsOENBQW1EOztJQUVuRCxrQ0FBZ0I7O0lBRWhCLHVDQUE0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0NvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcywgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0lXYWxsTW9kZWx9IGZyb20gJy4uLy4uL21vZGVsL2ludGVyZmFjZXMvd2FsbC1tb2RlbC5pbnRlcmZhY2UnO1xuaW1wb3J0IHtJV2FsbFJvd30gZnJvbSAnLi4vLi4vbW9kZWwvaW50ZXJmYWNlcy93YWxsLXJvdy5pbnRlcmZhY2UnO1xuaW1wb3J0IHtJRm9jdXNlZEJyaWNrfSBmcm9tICcuLi93YWxsL2ludGVyZmFjZXMvZm9jdXNlZC1icmljay5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3dhbGwtY2FudmFzJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vd2FsbC1jYW52YXMtY29tcG9uZW50LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi93YWxsLWNhbnZhcy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFdhbGxDYW52YXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICAgIEBJbnB1dCgpIHdhbGxNb2RlbDogSVdhbGxNb2RlbDtcbiAgICBASW5wdXQoKSByb3dzOiBJV2FsbFJvd1tdID0gW107XG5cbiAgICBASW5wdXQoKSBzZWxlY3RlZEJyaWNrczogc3RyaW5nW10gPSBudWxsO1xuICAgIEBJbnB1dCgpIGZvY3VzZWRCcmljazogSUZvY3VzZWRCcmljayA9IG51bGw7XG4gICAgQElucHV0KCkgaXNNZWRpYUludGVyYWN0aW9uRW5hYmxlZCQ6IE9ic2VydmFibGU8Ym9vbGVhbj47XG5cbiAgICBAT3V0cHV0KCkgY2FudmFzQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBvbkJyaWNrU3RhdGVDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIC8vIHB1YmxpYyBBUEkgZm9yIHN1YiBjb21wb25lbnRzXG4gICAgZm9jdXNlZEJyaWNrJDogU3ViamVjdDxJRm9jdXNlZEJyaWNrPiA9IG5ldyBTdWJqZWN0KCk7XG4gICAgc2VsZWN0ZWRCcmlja3MkOiBTdWJqZWN0PHN0cmluZ1tdPiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgICBkb2M6IGFueSA9IG51bGw7XG5cbiAgICBAVmlld0NoaWxkKCdleHBhbmRlcicpIGV4cGFuZGVyOiBFbGVtZW50UmVmO1xuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgZG9jKSB7XG4gICAgICAgIHRoaXMuZG9jID0gZG9jO1xuICAgIH1cblxuICAgIG9uRWRpdG9yQ2xpY2soZTogYW55KSB7XG4gICAgICAgIGlmIChlLnRhcmdldCA9PT0gdGhpcy5leHBhbmRlci5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhc0NsaWNrLmVtaXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKGNoYW5nZXMuZm9jdXNlZEJyaWNrICYmIGNoYW5nZXMuZm9jdXNlZEJyaWNrLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c2VkQnJpY2skLm5leHQoY2hhbmdlcy5mb2N1c2VkQnJpY2suY3VycmVudFZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGFuZ2VzLnNlbGVjdGVkQnJpY2tzKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkQnJpY2tzJC5uZXh0KGNoYW5nZXMuc2VsZWN0ZWRCcmlja3MuY3VycmVudFZhbHVlIHx8IFtdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJyaWNrU3RhdGVDaGFuZ2VkKGJyaWNrSWQ6IHN0cmluZywgYnJpY2tTdGF0ZTogYW55KSB7XG4gICAgICAgIHRoaXMub25Ccmlja1N0YXRlQ2hhbmdlZC5lbWl0KHtcbiAgICAgICAgICAgIGJyaWNrSWQsXG4gICAgICAgICAgICBicmlja1N0YXRlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHRyYWNrUm93c0J5KGluZGV4LCBpdGVtKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0uaWQ7XG4gICAgfVxufVxuIl19