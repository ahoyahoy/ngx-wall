/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class CaretStartEndPosition {
    /**
     * @param {?} el
     */
    constructor(el) {
        this.el = el;
    }
    /**
     * @return {?}
     */
    isCaretAtEnd() {
        /** @type {?} */
        let result = false;
        /** @type {?} */
        const sel = window.getSelection();
        if (sel.rangeCount) {
            /** @type {?} */
            const selRange = sel.getRangeAt(0);
            /** @type {?} */
            const testRange = selRange.cloneRange();
            testRange.selectNodeContents(this.el);
            testRange.setStart(selRange.endContainer, selRange.endOffset);
            result = (testRange.toString().trim() === '');
        }
        return result;
    }
    /**
     * @return {?}
     */
    isCaretAtStart() {
        /** @type {?} */
        let result = false;
        /** @type {?} */
        const sel = window.getSelection();
        if (sel.rangeCount) {
            /** @type {?} */
            const selRange = sel.getRangeAt(0);
            /** @type {?} */
            const testRange = selRange.cloneRange();
            testRange.selectNodeContents(this.el);
            testRange.setEnd(selRange.startContainer, selRange.startOffset);
            result = (testRange.toString().trim() === '');
        }
        return result;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    CaretStartEndPosition.prototype.el;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZXQtc3RhcnQtZW5kLXBvc2l0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvbW9kdWxlcy91dGlscy9ub2RlL2NhcmV0LXN0YXJ0LWVuZC1wb3NpdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTSxPQUFPLHFCQUFxQjs7OztJQUM5QixZQUFvQixFQUFRO1FBQVIsT0FBRSxHQUFGLEVBQUUsQ0FBTTtJQUM1QixDQUFDOzs7O0lBRUQsWUFBWTs7WUFDSixNQUFNLEdBQUcsS0FBSzs7Y0FDWixHQUFHLEdBQUcsTUFBTSxDQUFDLFlBQVksRUFBRTtRQUVqQyxJQUFJLEdBQUcsQ0FBQyxVQUFVLEVBQUU7O2tCQUNWLFFBQVEsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzs7a0JBQzVCLFNBQVMsR0FBRyxRQUFRLENBQUMsVUFBVSxFQUFFO1lBRXZDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdEMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM5RCxNQUFNLEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDakQ7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDOzs7O0lBRUQsY0FBYzs7WUFDTixNQUFNLEdBQUcsS0FBSzs7Y0FDWixHQUFHLEdBQUcsTUFBTSxDQUFDLFlBQVksRUFBRTtRQUVqQyxJQUFJLEdBQUcsQ0FBQyxVQUFVLEVBQUU7O2tCQUNWLFFBQVEsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzs7a0JBQzVCLFNBQVMsR0FBRyxRQUFRLENBQUMsVUFBVSxFQUFFO1lBRXZDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdEMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNoRSxNQUFNLEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDakQ7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0NBQ0o7Ozs7OztJQWxDZSxtQ0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQ2FyZXRTdGFydEVuZFBvc2l0aW9uIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBOb2RlKSB7XG4gICAgfVxuXG4gICAgaXNDYXJldEF0RW5kKCk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcblxuICAgICAgICBpZiAoc2VsLnJhbmdlQ291bnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHNlbFJhbmdlID0gc2VsLmdldFJhbmdlQXQoMCk7XG4gICAgICAgICAgICBjb25zdCB0ZXN0UmFuZ2UgPSBzZWxSYW5nZS5jbG9uZVJhbmdlKCk7XG5cbiAgICAgICAgICAgIHRlc3RSYW5nZS5zZWxlY3ROb2RlQ29udGVudHModGhpcy5lbCk7XG4gICAgICAgICAgICB0ZXN0UmFuZ2Uuc2V0U3RhcnQoc2VsUmFuZ2UuZW5kQ29udGFpbmVyLCBzZWxSYW5nZS5lbmRPZmZzZXQpO1xuICAgICAgICAgICAgcmVzdWx0ID0gKHRlc3RSYW5nZS50b1N0cmluZygpLnRyaW0oKSA9PT0gJycpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBpc0NhcmV0QXRTdGFydCgpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBjb25zdCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG5cbiAgICAgICAgaWYgKHNlbC5yYW5nZUNvdW50KSB7XG4gICAgICAgICAgICBjb25zdCBzZWxSYW5nZSA9IHNlbC5nZXRSYW5nZUF0KDApO1xuICAgICAgICAgICAgY29uc3QgdGVzdFJhbmdlID0gc2VsUmFuZ2UuY2xvbmVSYW5nZSgpO1xuXG4gICAgICAgICAgICB0ZXN0UmFuZ2Uuc2VsZWN0Tm9kZUNvbnRlbnRzKHRoaXMuZWwpO1xuICAgICAgICAgICAgdGVzdFJhbmdlLnNldEVuZChzZWxSYW5nZS5zdGFydENvbnRhaW5lciwgc2VsUmFuZ2Uuc3RhcnRPZmZzZXQpO1xuICAgICAgICAgICAgcmVzdWx0ID0gKHRlc3RSYW5nZS50b1N0cmluZygpLnRyaW0oKSA9PT0gJycpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG4iXX0=