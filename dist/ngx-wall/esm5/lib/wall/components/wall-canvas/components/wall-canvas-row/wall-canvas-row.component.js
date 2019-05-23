/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
var WallCanvasRowComponent = /** @class */ (function () {
    function WallCanvasRowComponent() {
    }
    // todo add type
    /**
     * @param {?} index
     * @return {?}
     */
    WallCanvasRowComponent.prototype.trackColumnsBy = 
    // todo add type
    /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        return index;
    };
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    WallCanvasRowComponent.prototype.trackBricksBy = /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    function (index, item) {
        return item.hash;
    };
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
    return WallCanvasRowComponent;
}());
export { WallCanvasRowComponent };
if (false) {
    /** @type {?} */
    WallCanvasRowComponent.prototype.row;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbC1jYW52YXMtcm93LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL3dhbGwvY29tcG9uZW50cy93YWxsLWNhbnZhcy9jb21wb25lbnRzL3dhbGwtY2FudmFzLXJvdy93YWxsLWNhbnZhcy1yb3cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUvQztJQUFBO0lBZUEsQ0FBQzs7Ozs7O0lBUEcsK0NBQWM7Ozs7OztJQUFkLFVBQWUsS0FBSztRQUNoQixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDOzs7Ozs7SUFFRCw4Q0FBYTs7Ozs7SUFBYixVQUFjLEtBQUssRUFBRSxJQUFJO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDOztnQkFkSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0Isc1BBQStDOztpQkFFbEQ7OztzQkFFSSxLQUFLOztJQVNWLDZCQUFDO0NBQUEsQUFmRCxJQWVDO1NBVlksc0JBQXNCOzs7SUFDL0IscUNBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd3YWxsLWNhbnZhcy1yb3cnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi93YWxsLWNhbnZhcy1yb3cuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3dhbGwtY2FudmFzLXJvdy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFdhbGxDYW52YXNSb3dDb21wb25lbnQge1xuICAgIEBJbnB1dCgpIHJvdzogYW55OyAvLyB0b2RvIGFkZCB0eXBlXG5cbiAgICB0cmFja0NvbHVtbnNCeShpbmRleCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG5cbiAgICB0cmFja0JyaWNrc0J5KGluZGV4LCBpdGVtKSB7XG4gICAgICAgIHJldHVybiBpdGVtLmhhc2g7XG4gICAgfVxufVxuIl19