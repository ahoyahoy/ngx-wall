/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class PlaceCaretToPosition {
    /**
     * @param {?} el
     * @param {?} position
     */
    constructor(el, position) {
        this.el = el;
        this.position = position;
    }
    /**
     * @return {?}
     */
    place() {
        /** @type {?} */
        const range = document.createRange();
        /** @type {?} */
        const sel = window.getSelection();
        range.setStart(this.el, this.position);
        sel.removeAllRanges();
        sel.addRange(range);
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    PlaceCaretToPosition.prototype.el;
    /**
     * @type {?}
     * @private
     */
    PlaceCaretToPosition.prototype.position;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2UtY2FyZXQtdG8tcG9zaXRpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9tb2R1bGVzL3V0aWxzL25vZGUvcGxhY2UtY2FyZXQtdG8tcG9zaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU0sT0FBTyxvQkFBb0I7Ozs7O0lBQzdCLFlBQW9CLEVBQVEsRUFBVSxRQUFnQjtRQUFsQyxPQUFFLEdBQUYsRUFBRSxDQUFNO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBUTtJQUN0RCxDQUFDOzs7O0lBRUQsS0FBSzs7Y0FDSyxLQUFLLEdBQUcsUUFBUSxDQUFDLFdBQVcsRUFBRTs7Y0FDOUIsR0FBRyxHQUFHLE1BQU0sQ0FBQyxZQUFZLEVBQUU7UUFFakMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV2QyxHQUFHLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdEIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QixDQUFDO0NBQ0o7Ozs7OztJQVplLGtDQUFnQjs7Ozs7SUFBRSx3Q0FBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgUGxhY2VDYXJldFRvUG9zaXRpb24ge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IE5vZGUsIHByaXZhdGUgcG9zaXRpb246IG51bWJlcikge1xuICAgIH1cblxuICAgIHBsYWNlKCkge1xuICAgICAgICBjb25zdCByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgICAgIGNvbnN0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcblxuICAgICAgICByYW5nZS5zZXRTdGFydCh0aGlzLmVsLCB0aGlzLnBvc2l0aW9uKTtcblxuICAgICAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICAgIHNlbC5hZGRSYW5nZShyYW5nZSk7XG4gICAgfVxufVxuIl19