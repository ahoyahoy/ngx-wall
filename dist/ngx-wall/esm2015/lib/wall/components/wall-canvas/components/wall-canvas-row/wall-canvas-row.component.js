/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
export class WallCanvasRowComponent {
    // todo add type
    /**
     * @param {?} index
     * @return {?}
     */
    trackColumnsBy(index) {
        return index;
    }
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    trackBricksBy(index, item) {
        return item.hash;
    }
}
WallCanvasRowComponent.decorators = [
    { type: Component, args: [{
                selector: 'wall-canvas-row',
                template: "<div class=\"wall-canvas-row__column\" *ngFor=\"let column of row.columns; trackBy: trackColumnsBy\">\n    <wall-canvas-brick [brick]=\"brick\" *ngFor=\"let brick of column.bricks; trackBy: trackBricksBy\"></wall-canvas-brick>\n</div>",
                styles: [":host{display:flex}:host .wall-canvas-row__column{flex:1;margin:0 10px;min-width:0}:host .wall-canvas-row__column:first-child{margin-left:0}:host .wall-canvas-row__column:last-child{margin-right:0}"]
            }] }
];
WallCanvasRowComponent.propDecorators = {
    row: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    WallCanvasRowComponent.prototype.row;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbC1jYW52YXMtcm93LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL3dhbGwvY29tcG9uZW50cy93YWxsLWNhbnZhcy9jb21wb25lbnRzL3dhbGwtY2FudmFzLXJvdy93YWxsLWNhbnZhcy1yb3cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQU8vQyxNQUFNLE9BQU8sc0JBQXNCOzs7Ozs7SUFHL0IsY0FBYyxDQUFDLEtBQUs7UUFDaEIsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQzs7Ozs7O0lBRUQsYUFBYSxDQUFDLEtBQUssRUFBRSxJQUFJO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDOzs7WUFkSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0Isc1BBQStDOzthQUVsRDs7O2tCQUVJLEtBQUs7Ozs7SUFBTixxQ0FBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3dhbGwtY2FudmFzLXJvdycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3dhbGwtY2FudmFzLXJvdy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vd2FsbC1jYW52YXMtcm93LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgV2FsbENhbnZhc1Jvd0NvbXBvbmVudCB7XG4gICAgQElucHV0KCkgcm93OiBhbnk7IC8vIHRvZG8gYWRkIHR5cGVcblxuICAgIHRyYWNrQ29sdW1uc0J5KGluZGV4KTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cblxuICAgIHRyYWNrQnJpY2tzQnkoaW5kZXgsIGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0uaGFzaDtcbiAgICB9XG59XG4iXX0=