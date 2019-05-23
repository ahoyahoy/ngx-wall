/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DeepRightNodeChild = /** @class */ (function () {
    function DeepRightNodeChild(root) {
        /** @type {?} */
        var currentNode = root;
        while (currentNode.childNodes.length) {
            currentNode = currentNode.childNodes[currentNode.childNodes.length - 1];
        }
        this.child = currentNode;
    }
    return DeepRightNodeChild;
}());
export { DeepRightNodeChild };
if (false) {
    /** @type {?} */
    DeepRightNodeChild.prototype.child;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcC1yaWdodC1ub2RlLWNoaWxkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvbW9kdWxlcy91dGlscy9kZWVwLXJpZ2h0LW5vZGUtY2hpbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0lBR0ksNEJBQVksSUFBaUI7O1lBQ3JCLFdBQVcsR0FBUyxJQUFJO1FBRTVCLE9BQU8sV0FBVyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUU7WUFDbEMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDM0U7UUFFRCxJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztJQUM3QixDQUFDO0lBQ0wseUJBQUM7QUFBRCxDQUFDLEFBWkQsSUFZQzs7OztJQVhHLG1DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIERlZXBSaWdodE5vZGVDaGlsZCB7XG4gICAgY2hpbGQ6IE5vZGU7XG5cbiAgICBjb25zdHJ1Y3Rvcihyb290OiBIVE1MRWxlbWVudCkge1xuICAgICAgICBsZXQgY3VycmVudE5vZGU6IE5vZGUgPSByb290O1xuXG4gICAgICAgIHdoaWxlIChjdXJyZW50Tm9kZS5jaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5jaGlsZE5vZGVzW2N1cnJlbnROb2RlLmNoaWxkTm9kZXMubGVuZ3RoIC0gMV07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoaWxkID0gY3VycmVudE5vZGU7XG4gICAgfVxufVxuIl19