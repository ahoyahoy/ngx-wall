/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PlaceCaretToPosition = /** @class */ (function () {
    function PlaceCaretToPosition(el, position) {
        this.el = el;
        this.position = position;
    }
    /**
     * @return {?}
     */
    PlaceCaretToPosition.prototype.place = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var range = document.createRange();
        /** @type {?} */
        var sel = window.getSelection();
        range.setStart(this.el, this.position);
        sel.removeAllRanges();
        sel.addRange(range);
    };
    return PlaceCaretToPosition;
}());
export { PlaceCaretToPosition };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2UtY2FyZXQtdG8tcG9zaXRpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9tb2R1bGVzL3V0aWxzL25vZGUvcGxhY2UtY2FyZXQtdG8tcG9zaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0lBQ0ksOEJBQW9CLEVBQVEsRUFBVSxRQUFnQjtRQUFsQyxPQUFFLEdBQUYsRUFBRSxDQUFNO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBUTtJQUN0RCxDQUFDOzs7O0lBRUQsb0NBQUs7OztJQUFMOztZQUNVLEtBQUssR0FBRyxRQUFRLENBQUMsV0FBVyxFQUFFOztZQUM5QixHQUFHLEdBQUcsTUFBTSxDQUFDLFlBQVksRUFBRTtRQUVqQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXZDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN0QixHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFDTCwyQkFBQztBQUFELENBQUMsQUFiRCxJQWFDOzs7Ozs7O0lBWmUsa0NBQWdCOzs7OztJQUFFLHdDQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBQbGFjZUNhcmV0VG9Qb3NpdGlvbiB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogTm9kZSwgcHJpdmF0ZSBwb3NpdGlvbjogbnVtYmVyKSB7XG4gICAgfVxuXG4gICAgcGxhY2UoKSB7XG4gICAgICAgIGNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICAgICAgY29uc3Qgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuXG4gICAgICAgIHJhbmdlLnNldFN0YXJ0KHRoaXMuZWwsIHRoaXMucG9zaXRpb24pO1xuXG4gICAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICAgICAgc2VsLmFkZFJhbmdlKHJhbmdlKTtcbiAgICB9XG59XG4iXX0=