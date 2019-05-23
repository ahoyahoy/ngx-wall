/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Returns string which does not contains empty nodes inside
 */
export class StringWithoutEmptyNodes {
    /**
     * @param {?} str
     */
    constructor(str) {
        this.str = str;
    }
    /**
     * @return {?}
     */
    get() {
        /** @type {?} */
        const pNode = document.createElement('P');
        pNode.innerHTML = this.str;
        if (!pNode.textContent.trim().length) {
            // there are no text itself, so replace any tags to empty string
            return '';
        }
        else {
            return this.str;
        }
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    StringWithoutEmptyNodes.prototype.str;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLXdpdGhvdXQtZW1wdHktbm9kZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9tb2R1bGVzL3V0aWxzL25vZGUvc3RyaW5nLXdpdGhvdXQtZW1wdHktbm9kZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUdBLE1BQU0sT0FBTyx1QkFBdUI7Ozs7SUFDaEMsWUFBb0IsR0FBVztRQUFYLFFBQUcsR0FBSCxHQUFHLENBQVE7SUFDL0IsQ0FBQzs7OztJQUVELEdBQUc7O2NBQ08sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDO1FBRXpDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUUzQixJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUU7WUFDbEMsZ0VBQWdFO1lBQ2hFLE9BQU8sRUFBRSxDQUFDO1NBQ2I7YUFBTTtZQUNILE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztTQUNuQjtJQUNMLENBQUM7Q0FDSjs7Ozs7O0lBZmUsc0NBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBSZXR1cm5zIHN0cmluZyB3aGljaCBkb2VzIG5vdCBjb250YWlucyBlbXB0eSBub2RlcyBpbnNpZGVcbiAqL1xuZXhwb3J0IGNsYXNzIFN0cmluZ1dpdGhvdXRFbXB0eU5vZGVzIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0cjogc3RyaW5nKSB7XG4gICAgfVxuXG4gICAgZ2V0KCkge1xuICAgICAgICBjb25zdCBwTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1AnKTtcblxuICAgICAgICBwTm9kZS5pbm5lckhUTUwgPSB0aGlzLnN0cjtcblxuICAgICAgICBpZiAoIXBOb2RlLnRleHRDb250ZW50LnRyaW0oKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIHRoZXJlIGFyZSBubyB0ZXh0IGl0c2VsZiwgc28gcmVwbGFjZSBhbnkgdGFncyB0byBlbXB0eSBzdHJpbmdcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0cjtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==