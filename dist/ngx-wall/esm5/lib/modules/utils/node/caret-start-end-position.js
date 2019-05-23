/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CaretStartEndPosition = /** @class */ (function () {
    function CaretStartEndPosition(el) {
        this.el = el;
    }
    /**
     * @return {?}
     */
    CaretStartEndPosition.prototype.isCaretAtEnd = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var result = false;
        /** @type {?} */
        var sel = window.getSelection();
        if (sel.rangeCount) {
            /** @type {?} */
            var selRange = sel.getRangeAt(0);
            /** @type {?} */
            var testRange = selRange.cloneRange();
            testRange.selectNodeContents(this.el);
            testRange.setStart(selRange.endContainer, selRange.endOffset);
            result = (testRange.toString().trim() === '');
        }
        return result;
    };
    /**
     * @return {?}
     */
    CaretStartEndPosition.prototype.isCaretAtStart = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var result = false;
        /** @type {?} */
        var sel = window.getSelection();
        if (sel.rangeCount) {
            /** @type {?} */
            var selRange = sel.getRangeAt(0);
            /** @type {?} */
            var testRange = selRange.cloneRange();
            testRange.selectNodeContents(this.el);
            testRange.setEnd(selRange.startContainer, selRange.startOffset);
            result = (testRange.toString().trim() === '');
        }
        return result;
    };
    return CaretStartEndPosition;
}());
export { CaretStartEndPosition };
if (false) {
    /**
     * @type {?}
     * @private
     */
    CaretStartEndPosition.prototype.el;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZXQtc3RhcnQtZW5kLXBvc2l0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvbW9kdWxlcy91dGlscy9ub2RlL2NhcmV0LXN0YXJ0LWVuZC1wb3NpdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUE7SUFDSSwrQkFBb0IsRUFBUTtRQUFSLE9BQUUsR0FBRixFQUFFLENBQU07SUFDNUIsQ0FBQzs7OztJQUVELDRDQUFZOzs7SUFBWjs7WUFDUSxNQUFNLEdBQUcsS0FBSzs7WUFDWixHQUFHLEdBQUcsTUFBTSxDQUFDLFlBQVksRUFBRTtRQUVqQyxJQUFJLEdBQUcsQ0FBQyxVQUFVLEVBQUU7O2dCQUNWLFFBQVEsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzs7Z0JBQzVCLFNBQVMsR0FBRyxRQUFRLENBQUMsVUFBVSxFQUFFO1lBRXZDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdEMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM5RCxNQUFNLEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDakQ7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDOzs7O0lBRUQsOENBQWM7OztJQUFkOztZQUNRLE1BQU0sR0FBRyxLQUFLOztZQUNaLEdBQUcsR0FBRyxNQUFNLENBQUMsWUFBWSxFQUFFO1FBRWpDLElBQUksR0FBRyxDQUFDLFVBQVUsRUFBRTs7Z0JBQ1YsUUFBUSxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDOztnQkFDNUIsU0FBUyxHQUFHLFFBQVEsQ0FBQyxVQUFVLEVBQUU7WUFFdkMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN0QyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2hFLE1BQU0sR0FBRyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUNqRDtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFDTCw0QkFBQztBQUFELENBQUMsQUFuQ0QsSUFtQ0M7Ozs7Ozs7SUFsQ2UsbUNBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIENhcmV0U3RhcnRFbmRQb3NpdGlvbiB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogTm9kZSkge1xuICAgIH1cblxuICAgIGlzQ2FyZXRBdEVuZCgpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBjb25zdCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG5cbiAgICAgICAgaWYgKHNlbC5yYW5nZUNvdW50KSB7XG4gICAgICAgICAgICBjb25zdCBzZWxSYW5nZSA9IHNlbC5nZXRSYW5nZUF0KDApO1xuICAgICAgICAgICAgY29uc3QgdGVzdFJhbmdlID0gc2VsUmFuZ2UuY2xvbmVSYW5nZSgpO1xuXG4gICAgICAgICAgICB0ZXN0UmFuZ2Uuc2VsZWN0Tm9kZUNvbnRlbnRzKHRoaXMuZWwpO1xuICAgICAgICAgICAgdGVzdFJhbmdlLnNldFN0YXJ0KHNlbFJhbmdlLmVuZENvbnRhaW5lciwgc2VsUmFuZ2UuZW5kT2Zmc2V0KTtcbiAgICAgICAgICAgIHJlc3VsdCA9ICh0ZXN0UmFuZ2UudG9TdHJpbmcoKS50cmltKCkgPT09ICcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgaXNDYXJldEF0U3RhcnQoKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgY29uc3Qgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuXG4gICAgICAgIGlmIChzZWwucmFuZ2VDb3VudCkge1xuICAgICAgICAgICAgY29uc3Qgc2VsUmFuZ2UgPSBzZWwuZ2V0UmFuZ2VBdCgwKTtcbiAgICAgICAgICAgIGNvbnN0IHRlc3RSYW5nZSA9IHNlbFJhbmdlLmNsb25lUmFuZ2UoKTtcblxuICAgICAgICAgICAgdGVzdFJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyh0aGlzLmVsKTtcbiAgICAgICAgICAgIHRlc3RSYW5nZS5zZXRFbmQoc2VsUmFuZ2Uuc3RhcnRDb250YWluZXIsIHNlbFJhbmdlLnN0YXJ0T2Zmc2V0KTtcbiAgICAgICAgICAgIHJlc3VsdCA9ICh0ZXN0UmFuZ2UudG9TdHJpbmcoKS50cmltKCkgPT09ICcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuIl19