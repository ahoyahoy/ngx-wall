/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NodeTreeSplit = /** @class */ (function () {
    function NodeTreeSplit(root, targetElement, // text node
    offset) {
        this.root = root;
        this.targetElement = targetElement;
        this.offset = offset;
        if (root === targetElement) {
            // edge case scenario, just return root node itself
            this.leftTree = (/** @type {?} */ (root));
            this.rightTree = (/** @type {?} */ (root));
        }
        else {
            // get direct parent of target node
            /** @type {?} */
            var parent_1 = targetElement.parentNode;
            // create left and right trees which will be returned as result
            /** @type {?} */
            var rightTree = parent_1.cloneNode(false);
            /** @type {?} */
            var leftTree = parent_1.cloneNode(false);
            // Build Right tree
            // as soon as targetElement is a Text Node, split text of that node using offset
            rightTree.appendChild(document.createTextNode(targetElement.textContent.slice(offset)));
            // parent node could contains other Nodes besides target node
            // add all next siblings of target node to the right tree
            this.appendNextSiblingsToNode(rightTree, targetElement);
            // Build Left tree
            // as soon as targetElement is a Text Node, split text of that node using offset
            leftTree.appendChild(document.createTextNode(targetElement.textContent.slice(0, offset)));
            // parent node could contains other Nodes besides target node
            // add all previous siblings of target node to the left tree
            this.prependPreviousSiblingsToNode(leftTree, targetElement);
            if (root === parent_1) {
                // we already fully build left and right trees
                this.leftTree = (/** @type {?} */ (leftTree));
                this.rightTree = (/** @type {?} */ (rightTree));
            }
            else {
                // recursively build left and right trees
                // climbing from parent node to the root node
                /** @type {?} */
                var leftParentTree = void 0;
                /** @type {?} */
                var rightParentTree = void 0;
                /** @type {?} */
                var grandparent = parent_1.parentNode;
                while (root.contains(grandparent) || grandparent === root) {
                    rightParentTree = grandparent.cloneNode(false);
                    leftParentTree = grandparent.cloneNode(false);
                    // Process Left tree
                    this.prependPreviousSiblingsToNode(leftParentTree, parent_1);
                    leftParentTree.appendChild(leftTree);
                    leftTree = leftParentTree;
                    // Process Right tree
                    this.appendNextSiblingsToNode(rightParentTree, parent_1);
                    rightParentTree.prepend(rightTree);
                    rightTree = rightParentTree;
                    parent_1 = grandparent;
                    grandparent = grandparent.parentNode;
                }
                this.leftTree = (/** @type {?} */ (leftTree));
                this.rightTree = (/** @type {?} */ (rightTree));
            }
        }
    }
    /**
     * @private
     * @param {?} leftTree
     * @param {?} targetNode
     * @return {?}
     */
    NodeTreeSplit.prototype.prependPreviousSiblingsToNode = /**
     * @private
     * @param {?} leftTree
     * @param {?} targetNode
     * @return {?}
     */
    function (leftTree, targetNode) {
        /** @type {?} */
        var previousSibling = targetNode.previousSibling;
        while (previousSibling) {
            leftTree.prepend(previousSibling.cloneNode(true));
            previousSibling = previousSibling.previousSibling;
        }
    };
    /**
     * @private
     * @param {?} rightTree
     * @param {?} targetElement
     * @return {?}
     */
    NodeTreeSplit.prototype.appendNextSiblingsToNode = /**
     * @private
     * @param {?} rightTree
     * @param {?} targetElement
     * @return {?}
     */
    function (rightTree, targetElement) {
        /** @type {?} */
        var nextSibling = targetElement.nextSibling;
        while (nextSibling) {
            rightTree.appendChild(nextSibling.cloneNode(true));
            nextSibling = nextSibling.nextSibling;
        }
    };
    return NodeTreeSplit;
}());
export { NodeTreeSplit };
if (false) {
    /** @type {?} */
    NodeTreeSplit.prototype.leftTree;
    /** @type {?} */
    NodeTreeSplit.prototype.rightTree;
    /**
     * @type {?}
     * @private
     */
    NodeTreeSplit.prototype.root;
    /**
     * @type {?}
     * @private
     */
    NodeTreeSplit.prototype.targetElement;
    /**
     * @type {?}
     * @private
     */
    NodeTreeSplit.prototype.offset;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS10cmVlLXNwbGl0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvbW9kdWxlcy91dGlscy9ub2RlLXRyZWUtc3BsaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0lBSUksdUJBQW9CLElBQWlCLEVBQ2pCLGFBQW1CLEVBQUUsWUFBWTtJQUNqQyxNQUFjO1FBRmQsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUNqQixrQkFBYSxHQUFiLGFBQWEsQ0FBTTtRQUNuQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQzlCLElBQUksSUFBSSxLQUFLLGFBQWEsRUFBRTtZQUN4QixtREFBbUQ7WUFDbkQsSUFBSSxDQUFDLFFBQVEsR0FBRyxtQkFBQSxJQUFJLEVBQWUsQ0FBQztZQUNwQyxJQUFJLENBQUMsU0FBUyxHQUFHLG1CQUFBLElBQUksRUFBZSxDQUFDO1NBQ3hDO2FBQU07OztnQkFFQyxRQUFNLEdBQUcsYUFBYSxDQUFDLFVBQVU7OztnQkFHakMsU0FBUyxHQUFHLFFBQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDOztnQkFDbkMsUUFBUSxHQUFHLFFBQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1lBRXRDLG1CQUFtQjtZQUVuQixnRkFBZ0Y7WUFDaEYsU0FBUyxDQUFDLFdBQVcsQ0FDakIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUNuRSxDQUFDO1lBRUYsNkRBQTZEO1lBQzdELHlEQUF5RDtZQUN6RCxJQUFJLENBQUMsd0JBQXdCLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBRXhELGtCQUFrQjtZQUVsQixnRkFBZ0Y7WUFDaEYsUUFBUSxDQUFDLFdBQVcsQ0FDaEIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FDdEUsQ0FBQztZQUVGLDZEQUE2RDtZQUM3RCw0REFBNEQ7WUFDNUQsSUFBSSxDQUFDLDZCQUE2QixDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQztZQUU1RCxJQUFJLElBQUksS0FBSyxRQUFNLEVBQUU7Z0JBQ2pCLDhDQUE4QztnQkFDOUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxtQkFBQSxRQUFRLEVBQWUsQ0FBQztnQkFDeEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxtQkFBQSxTQUFTLEVBQWUsQ0FBQzthQUM3QztpQkFBTTs7OztvQkFHQyxjQUFjLFNBQUE7O29CQUNkLGVBQWUsU0FBQTs7b0JBQ2YsV0FBVyxHQUFHLFFBQU0sQ0FBQyxVQUFVO2dCQUVuQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksV0FBVyxLQUFLLElBQUksRUFBRTtvQkFDdkQsZUFBZSxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQy9DLGNBQWMsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUU5QyxvQkFBb0I7b0JBQ3BCLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxjQUFjLEVBQUUsUUFBTSxDQUFDLENBQUM7b0JBRTNELGNBQWMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3JDLFFBQVEsR0FBRyxjQUFjLENBQUM7b0JBRTFCLHFCQUFxQjtvQkFDckIsSUFBSSxDQUFDLHdCQUF3QixDQUFDLGVBQWUsRUFBRSxRQUFNLENBQUMsQ0FBQztvQkFFdkQsZUFBZSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDbkMsU0FBUyxHQUFHLGVBQWUsQ0FBQztvQkFFNUIsUUFBTSxHQUFHLFdBQVcsQ0FBQztvQkFDckIsV0FBVyxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUM7aUJBQ3hDO2dCQUVELElBQUksQ0FBQyxRQUFRLEdBQUcsbUJBQUEsUUFBUSxFQUFlLENBQUM7Z0JBQ3hDLElBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQUEsU0FBUyxFQUFlLENBQUM7YUFDN0M7U0FDSjtJQUNMLENBQUM7Ozs7Ozs7SUFFTyxxREFBNkI7Ozs7OztJQUFyQyxVQUFzQyxRQUFRLEVBQUUsVUFBZ0I7O1lBQ3hELGVBQWUsR0FBRyxVQUFVLENBQUMsZUFBZTtRQUVoRCxPQUFPLGVBQWUsRUFBRTtZQUNwQixRQUFRLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUVsRCxlQUFlLEdBQUcsZUFBZSxDQUFDLGVBQWUsQ0FBQztTQUNyRDtJQUNMLENBQUM7Ozs7Ozs7SUFFTyxnREFBd0I7Ozs7OztJQUFoQyxVQUFpQyxTQUFTLEVBQUUsYUFBbUI7O1lBQ3ZELFdBQVcsR0FBRyxhQUFhLENBQUMsV0FBVztRQUUzQyxPQUFPLFdBQVcsRUFBRTtZQUNoQixTQUFTLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUVuRCxXQUFXLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQztTQUN6QztJQUNMLENBQUM7SUFDTCxvQkFBQztBQUFELENBQUMsQUFqR0QsSUFpR0M7Ozs7SUFoR0csaUNBQXNCOztJQUN0QixrQ0FBdUI7Ozs7O0lBRVgsNkJBQXlCOzs7OztJQUN6QixzQ0FBMkI7Ozs7O0lBQzNCLCtCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBOb2RlVHJlZVNwbGl0IHtcbiAgICBsZWZ0VHJlZTogSFRNTEVsZW1lbnQ7XG4gICAgcmlnaHRUcmVlOiBIVE1MRWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm9vdDogSFRNTEVsZW1lbnQsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB0YXJnZXRFbGVtZW50OiBOb2RlLCAvLyB0ZXh0IG5vZGVcbiAgICAgICAgICAgICAgICBwcml2YXRlIG9mZnNldDogbnVtYmVyKSB7XG4gICAgICAgIGlmIChyb290ID09PSB0YXJnZXRFbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBlZGdlIGNhc2Ugc2NlbmFyaW8sIGp1c3QgcmV0dXJuIHJvb3Qgbm9kZSBpdHNlbGZcbiAgICAgICAgICAgIHRoaXMubGVmdFRyZWUgPSByb290IGFzIEhUTUxFbGVtZW50O1xuICAgICAgICAgICAgdGhpcy5yaWdodFRyZWUgPSByb290IGFzIEhUTUxFbGVtZW50O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZ2V0IGRpcmVjdCBwYXJlbnQgb2YgdGFyZ2V0IG5vZGVcbiAgICAgICAgICAgIGxldCBwYXJlbnQgPSB0YXJnZXRFbGVtZW50LnBhcmVudE5vZGU7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBsZWZ0IGFuZCByaWdodCB0cmVlcyB3aGljaCB3aWxsIGJlIHJldHVybmVkIGFzIHJlc3VsdFxuICAgICAgICAgICAgbGV0IHJpZ2h0VHJlZSA9IHBhcmVudC5jbG9uZU5vZGUoZmFsc2UpO1xuICAgICAgICAgICAgbGV0IGxlZnRUcmVlID0gcGFyZW50LmNsb25lTm9kZShmYWxzZSk7XG5cbiAgICAgICAgICAgIC8vIEJ1aWxkIFJpZ2h0IHRyZWVcblxuICAgICAgICAgICAgLy8gYXMgc29vbiBhcyB0YXJnZXRFbGVtZW50IGlzIGEgVGV4dCBOb2RlLCBzcGxpdCB0ZXh0IG9mIHRoYXQgbm9kZSB1c2luZyBvZmZzZXRcbiAgICAgICAgICAgIHJpZ2h0VHJlZS5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0YXJnZXRFbGVtZW50LnRleHRDb250ZW50LnNsaWNlKG9mZnNldCkpXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAvLyBwYXJlbnQgbm9kZSBjb3VsZCBjb250YWlucyBvdGhlciBOb2RlcyBiZXNpZGVzIHRhcmdldCBub2RlXG4gICAgICAgICAgICAvLyBhZGQgYWxsIG5leHQgc2libGluZ3Mgb2YgdGFyZ2V0IG5vZGUgdG8gdGhlIHJpZ2h0IHRyZWVcbiAgICAgICAgICAgIHRoaXMuYXBwZW5kTmV4dFNpYmxpbmdzVG9Ob2RlKHJpZ2h0VHJlZSwgdGFyZ2V0RWxlbWVudCk7XG5cbiAgICAgICAgICAgIC8vIEJ1aWxkIExlZnQgdHJlZVxuXG4gICAgICAgICAgICAvLyBhcyBzb29uIGFzIHRhcmdldEVsZW1lbnQgaXMgYSBUZXh0IE5vZGUsIHNwbGl0IHRleHQgb2YgdGhhdCBub2RlIHVzaW5nIG9mZnNldFxuICAgICAgICAgICAgbGVmdFRyZWUuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGFyZ2V0RWxlbWVudC50ZXh0Q29udGVudC5zbGljZSgwLCBvZmZzZXQpKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgLy8gcGFyZW50IG5vZGUgY291bGQgY29udGFpbnMgb3RoZXIgTm9kZXMgYmVzaWRlcyB0YXJnZXQgbm9kZVxuICAgICAgICAgICAgLy8gYWRkIGFsbCBwcmV2aW91cyBzaWJsaW5ncyBvZiB0YXJnZXQgbm9kZSB0byB0aGUgbGVmdCB0cmVlXG4gICAgICAgICAgICB0aGlzLnByZXBlbmRQcmV2aW91c1NpYmxpbmdzVG9Ob2RlKGxlZnRUcmVlLCB0YXJnZXRFbGVtZW50KTtcblxuICAgICAgICAgICAgaWYgKHJvb3QgPT09IHBhcmVudCkge1xuICAgICAgICAgICAgICAgIC8vIHdlIGFscmVhZHkgZnVsbHkgYnVpbGQgbGVmdCBhbmQgcmlnaHQgdHJlZXNcbiAgICAgICAgICAgICAgICB0aGlzLmxlZnRUcmVlID0gbGVmdFRyZWUgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5yaWdodFRyZWUgPSByaWdodFRyZWUgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIHJlY3Vyc2l2ZWx5IGJ1aWxkIGxlZnQgYW5kIHJpZ2h0IHRyZWVzXG4gICAgICAgICAgICAgICAgLy8gY2xpbWJpbmcgZnJvbSBwYXJlbnQgbm9kZSB0byB0aGUgcm9vdCBub2RlXG4gICAgICAgICAgICAgICAgbGV0IGxlZnRQYXJlbnRUcmVlO1xuICAgICAgICAgICAgICAgIGxldCByaWdodFBhcmVudFRyZWU7XG4gICAgICAgICAgICAgICAgbGV0IGdyYW5kcGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XG5cbiAgICAgICAgICAgICAgICB3aGlsZSAocm9vdC5jb250YWlucyhncmFuZHBhcmVudCkgfHwgZ3JhbmRwYXJlbnQgPT09IHJvb3QpIHtcbiAgICAgICAgICAgICAgICAgICAgcmlnaHRQYXJlbnRUcmVlID0gZ3JhbmRwYXJlbnQuY2xvbmVOb2RlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgbGVmdFBhcmVudFRyZWUgPSBncmFuZHBhcmVudC5jbG9uZU5vZGUoZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFByb2Nlc3MgTGVmdCB0cmVlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJlcGVuZFByZXZpb3VzU2libGluZ3NUb05vZGUobGVmdFBhcmVudFRyZWUsIHBhcmVudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGVmdFBhcmVudFRyZWUuYXBwZW5kQ2hpbGQobGVmdFRyZWUpO1xuICAgICAgICAgICAgICAgICAgICBsZWZ0VHJlZSA9IGxlZnRQYXJlbnRUcmVlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFByb2Nlc3MgUmlnaHQgdHJlZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZE5leHRTaWJsaW5nc1RvTm9kZShyaWdodFBhcmVudFRyZWUsIHBhcmVudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmlnaHRQYXJlbnRUcmVlLnByZXBlbmQocmlnaHRUcmVlKTtcbiAgICAgICAgICAgICAgICAgICAgcmlnaHRUcmVlID0gcmlnaHRQYXJlbnRUcmVlO1xuXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudCA9IGdyYW5kcGFyZW50O1xuICAgICAgICAgICAgICAgICAgICBncmFuZHBhcmVudCA9IGdyYW5kcGFyZW50LnBhcmVudE5vZGU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5sZWZ0VHJlZSA9IGxlZnRUcmVlIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICAgICAgICAgIHRoaXMucmlnaHRUcmVlID0gcmlnaHRUcmVlIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcmVwZW5kUHJldmlvdXNTaWJsaW5nc1RvTm9kZShsZWZ0VHJlZSwgdGFyZ2V0Tm9kZTogTm9kZSk6IHZvaWQge1xuICAgICAgICBsZXQgcHJldmlvdXNTaWJsaW5nID0gdGFyZ2V0Tm9kZS5wcmV2aW91c1NpYmxpbmc7XG5cbiAgICAgICAgd2hpbGUgKHByZXZpb3VzU2libGluZykge1xuICAgICAgICAgICAgbGVmdFRyZWUucHJlcGVuZChwcmV2aW91c1NpYmxpbmcuY2xvbmVOb2RlKHRydWUpKTtcblxuICAgICAgICAgICAgcHJldmlvdXNTaWJsaW5nID0gcHJldmlvdXNTaWJsaW5nLnByZXZpb3VzU2libGluZztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYXBwZW5kTmV4dFNpYmxpbmdzVG9Ob2RlKHJpZ2h0VHJlZSwgdGFyZ2V0RWxlbWVudDogTm9kZSk6IHZvaWQge1xuICAgICAgICBsZXQgbmV4dFNpYmxpbmcgPSB0YXJnZXRFbGVtZW50Lm5leHRTaWJsaW5nO1xuXG4gICAgICAgIHdoaWxlIChuZXh0U2libGluZykge1xuICAgICAgICAgICAgcmlnaHRUcmVlLmFwcGVuZENoaWxkKG5leHRTaWJsaW5nLmNsb25lTm9kZSh0cnVlKSk7XG5cbiAgICAgICAgICAgIG5leHRTaWJsaW5nID0gbmV4dFNpYmxpbmcubmV4dFNpYmxpbmc7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=