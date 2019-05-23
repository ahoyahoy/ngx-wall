/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Returns string which does not contains empty nodes inside
 */
var /**
 * Returns string which does not contains empty nodes inside
 */
StringWithoutEmptyNodes = /** @class */ (function () {
    function StringWithoutEmptyNodes(str) {
        this.str = str;
    }
    /**
     * @return {?}
     */
    StringWithoutEmptyNodes.prototype.get = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var pNode = document.createElement('P');
        pNode.innerHTML = this.str;
        if (!pNode.textContent.trim().length) {
            // there are no text itself, so replace any tags to empty string
            return '';
        }
        else {
            return this.str;
        }
    };
    return StringWithoutEmptyNodes;
}());
/**
 * Returns string which does not contains empty nodes inside
 */
export { StringWithoutEmptyNodes };
if (false) {
    /**
     * @type {?}
     * @private
     */
    StringWithoutEmptyNodes.prototype.str;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLXdpdGhvdXQtZW1wdHktbm9kZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9tb2R1bGVzL3V0aWxzL25vZGUvc3RyaW5nLXdpdGhvdXQtZW1wdHktbm9kZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUdBOzs7O0lBQ0ksaUNBQW9CLEdBQVc7UUFBWCxRQUFHLEdBQUgsR0FBRyxDQUFRO0lBQy9CLENBQUM7Ozs7SUFFRCxxQ0FBRzs7O0lBQUg7O1lBQ1UsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDO1FBRXpDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUUzQixJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUU7WUFDbEMsZ0VBQWdFO1lBQ2hFLE9BQU8sRUFBRSxDQUFDO1NBQ2I7YUFBTTtZQUNILE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztTQUNuQjtJQUNMLENBQUM7SUFDTCw4QkFBQztBQUFELENBQUMsQUFoQkQsSUFnQkM7Ozs7Ozs7Ozs7SUFmZSxzQ0FBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFJldHVybnMgc3RyaW5nIHdoaWNoIGRvZXMgbm90IGNvbnRhaW5zIGVtcHR5IG5vZGVzIGluc2lkZVxuICovXG5leHBvcnQgY2xhc3MgU3RyaW5nV2l0aG91dEVtcHR5Tm9kZXMge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RyOiBzdHJpbmcpIHtcbiAgICB9XG5cbiAgICBnZXQoKSB7XG4gICAgICAgIGNvbnN0IHBOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnUCcpO1xuXG4gICAgICAgIHBOb2RlLmlubmVySFRNTCA9IHRoaXMuc3RyO1xuXG4gICAgICAgIGlmICghcE5vZGUudGV4dENvbnRlbnQudHJpbSgpLmxlbmd0aCkge1xuICAgICAgICAgICAgLy8gdGhlcmUgYXJlIG5vIHRleHQgaXRzZWxmLCBzbyByZXBsYWNlIGFueSB0YWdzIHRvIGVtcHR5IHN0cmluZ1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RyO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19