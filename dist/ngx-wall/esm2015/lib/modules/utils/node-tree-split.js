/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class NodeTreeSplit {
    /**
     * @param {?} root
     * @param {?} targetElement
     * @param {?} offset
     */
    constructor(root, targetElement, // text node
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
            let parent = targetElement.parentNode;
            // create left and right trees which will be returned as result
            /** @type {?} */
            let rightTree = parent.cloneNode(false);
            /** @type {?} */
            let leftTree = parent.cloneNode(false);
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
            if (root === parent) {
                // we already fully build left and right trees
                this.leftTree = (/** @type {?} */ (leftTree));
                this.rightTree = (/** @type {?} */ (rightTree));
            }
            else {
                // recursively build left and right trees
                // climbing from parent node to the root node
                /** @type {?} */
                let leftParentTree;
                /** @type {?} */
                let rightParentTree;
                /** @type {?} */
                let grandparent = parent.parentNode;
                while (root.contains(grandparent) || grandparent === root) {
                    rightParentTree = grandparent.cloneNode(false);
                    leftParentTree = grandparent.cloneNode(false);
                    // Process Left tree
                    this.prependPreviousSiblingsToNode(leftParentTree, parent);
                    leftParentTree.appendChild(leftTree);
                    leftTree = leftParentTree;
                    // Process Right tree
                    this.appendNextSiblingsToNode(rightParentTree, parent);
                    rightParentTree.prepend(rightTree);
                    rightTree = rightParentTree;
                    parent = grandparent;
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
    prependPreviousSiblingsToNode(leftTree, targetNode) {
        /** @type {?} */
        let previousSibling = targetNode.previousSibling;
        while (previousSibling) {
            leftTree.prepend(previousSibling.cloneNode(true));
            previousSibling = previousSibling.previousSibling;
        }
    }
    /**
     * @private
     * @param {?} rightTree
     * @param {?} targetElement
     * @return {?}
     */
    appendNextSiblingsToNode(rightTree, targetElement) {
        /** @type {?} */
        let nextSibling = targetElement.nextSibling;
        while (nextSibling) {
            rightTree.appendChild(nextSibling.cloneNode(true));
            nextSibling = nextSibling.nextSibling;
        }
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS10cmVlLXNwbGl0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvbW9kdWxlcy91dGlscy9ub2RlLXRyZWUtc3BsaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU0sT0FBTyxhQUFhOzs7Ozs7SUFJdEIsWUFBb0IsSUFBaUIsRUFDakIsYUFBbUIsRUFBRSxZQUFZO0lBQ2pDLE1BQWM7UUFGZCxTQUFJLEdBQUosSUFBSSxDQUFhO1FBQ2pCLGtCQUFhLEdBQWIsYUFBYSxDQUFNO1FBQ25CLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDOUIsSUFBSSxJQUFJLEtBQUssYUFBYSxFQUFFO1lBQ3hCLG1EQUFtRDtZQUNuRCxJQUFJLENBQUMsUUFBUSxHQUFHLG1CQUFBLElBQUksRUFBZSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQUEsSUFBSSxFQUFlLENBQUM7U0FDeEM7YUFBTTs7O2dCQUVDLE1BQU0sR0FBRyxhQUFhLENBQUMsVUFBVTs7O2dCQUdqQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7O2dCQUNuQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7WUFFdEMsbUJBQW1CO1lBRW5CLGdGQUFnRjtZQUNoRixTQUFTLENBQUMsV0FBVyxDQUNqQixRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQ25FLENBQUM7WUFFRiw2REFBNkQ7WUFDN0QseURBQXlEO1lBQ3pELElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFFeEQsa0JBQWtCO1lBRWxCLGdGQUFnRjtZQUNoRixRQUFRLENBQUMsV0FBVyxDQUNoQixRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUN0RSxDQUFDO1lBRUYsNkRBQTZEO1lBQzdELDREQUE0RDtZQUM1RCxJQUFJLENBQUMsNkJBQTZCLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBRTVELElBQUksSUFBSSxLQUFLLE1BQU0sRUFBRTtnQkFDakIsOENBQThDO2dCQUM5QyxJQUFJLENBQUMsUUFBUSxHQUFHLG1CQUFBLFFBQVEsRUFBZSxDQUFDO2dCQUN4QyxJQUFJLENBQUMsU0FBUyxHQUFHLG1CQUFBLFNBQVMsRUFBZSxDQUFDO2FBQzdDO2lCQUFNOzs7O29CQUdDLGNBQWM7O29CQUNkLGVBQWU7O29CQUNmLFdBQVcsR0FBRyxNQUFNLENBQUMsVUFBVTtnQkFFbkMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLFdBQVcsS0FBSyxJQUFJLEVBQUU7b0JBQ3ZELGVBQWUsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMvQyxjQUFjLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFFOUMsb0JBQW9CO29CQUNwQixJQUFJLENBQUMsNkJBQTZCLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUUzRCxjQUFjLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNyQyxRQUFRLEdBQUcsY0FBYyxDQUFDO29CQUUxQixxQkFBcUI7b0JBQ3JCLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBRXZELGVBQWUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ25DLFNBQVMsR0FBRyxlQUFlLENBQUM7b0JBRTVCLE1BQU0sR0FBRyxXQUFXLENBQUM7b0JBQ3JCLFdBQVcsR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDO2lCQUN4QztnQkFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLG1CQUFBLFFBQVEsRUFBZSxDQUFDO2dCQUN4QyxJQUFJLENBQUMsU0FBUyxHQUFHLG1CQUFBLFNBQVMsRUFBZSxDQUFDO2FBQzdDO1NBQ0o7SUFDTCxDQUFDOzs7Ozs7O0lBRU8sNkJBQTZCLENBQUMsUUFBUSxFQUFFLFVBQWdCOztZQUN4RCxlQUFlLEdBQUcsVUFBVSxDQUFDLGVBQWU7UUFFaEQsT0FBTyxlQUFlLEVBQUU7WUFDcEIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFFbEQsZUFBZSxHQUFHLGVBQWUsQ0FBQyxlQUFlLENBQUM7U0FDckQ7SUFDTCxDQUFDOzs7Ozs7O0lBRU8sd0JBQXdCLENBQUMsU0FBUyxFQUFFLGFBQW1COztZQUN2RCxXQUFXLEdBQUcsYUFBYSxDQUFDLFdBQVc7UUFFM0MsT0FBTyxXQUFXLEVBQUU7WUFDaEIsU0FBUyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFFbkQsV0FBVyxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUM7U0FDekM7SUFDTCxDQUFDO0NBQ0o7OztJQWhHRyxpQ0FBc0I7O0lBQ3RCLGtDQUF1Qjs7Ozs7SUFFWCw2QkFBeUI7Ozs7O0lBQ3pCLHNDQUEyQjs7Ozs7SUFDM0IsK0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIE5vZGVUcmVlU3BsaXQge1xuICAgIGxlZnRUcmVlOiBIVE1MRWxlbWVudDtcbiAgICByaWdodFRyZWU6IEhUTUxFbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb290OiBIVE1MRWxlbWVudCxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHRhcmdldEVsZW1lbnQ6IE5vZGUsIC8vIHRleHQgbm9kZVxuICAgICAgICAgICAgICAgIHByaXZhdGUgb2Zmc2V0OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHJvb3QgPT09IHRhcmdldEVsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIGVkZ2UgY2FzZSBzY2VuYXJpbywganVzdCByZXR1cm4gcm9vdCBub2RlIGl0c2VsZlxuICAgICAgICAgICAgdGhpcy5sZWZ0VHJlZSA9IHJvb3QgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgICAgICB0aGlzLnJpZ2h0VHJlZSA9IHJvb3QgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBnZXQgZGlyZWN0IHBhcmVudCBvZiB0YXJnZXQgbm9kZVxuICAgICAgICAgICAgbGV0IHBhcmVudCA9IHRhcmdldEVsZW1lbnQucGFyZW50Tm9kZTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGxlZnQgYW5kIHJpZ2h0IHRyZWVzIHdoaWNoIHdpbGwgYmUgcmV0dXJuZWQgYXMgcmVzdWx0XG4gICAgICAgICAgICBsZXQgcmlnaHRUcmVlID0gcGFyZW50LmNsb25lTm9kZShmYWxzZSk7XG4gICAgICAgICAgICBsZXQgbGVmdFRyZWUgPSBwYXJlbnQuY2xvbmVOb2RlKGZhbHNlKTtcblxuICAgICAgICAgICAgLy8gQnVpbGQgUmlnaHQgdHJlZVxuXG4gICAgICAgICAgICAvLyBhcyBzb29uIGFzIHRhcmdldEVsZW1lbnQgaXMgYSBUZXh0IE5vZGUsIHNwbGl0IHRleHQgb2YgdGhhdCBub2RlIHVzaW5nIG9mZnNldFxuICAgICAgICAgICAgcmlnaHRUcmVlLmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRhcmdldEVsZW1lbnQudGV4dENvbnRlbnQuc2xpY2Uob2Zmc2V0KSlcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIC8vIHBhcmVudCBub2RlIGNvdWxkIGNvbnRhaW5zIG90aGVyIE5vZGVzIGJlc2lkZXMgdGFyZ2V0IG5vZGVcbiAgICAgICAgICAgIC8vIGFkZCBhbGwgbmV4dCBzaWJsaW5ncyBvZiB0YXJnZXQgbm9kZSB0byB0aGUgcmlnaHQgdHJlZVxuICAgICAgICAgICAgdGhpcy5hcHBlbmROZXh0U2libGluZ3NUb05vZGUocmlnaHRUcmVlLCB0YXJnZXRFbGVtZW50KTtcblxuICAgICAgICAgICAgLy8gQnVpbGQgTGVmdCB0cmVlXG5cbiAgICAgICAgICAgIC8vIGFzIHNvb24gYXMgdGFyZ2V0RWxlbWVudCBpcyBhIFRleHQgTm9kZSwgc3BsaXQgdGV4dCBvZiB0aGF0IG5vZGUgdXNpbmcgb2Zmc2V0XG4gICAgICAgICAgICBsZWZ0VHJlZS5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0YXJnZXRFbGVtZW50LnRleHRDb250ZW50LnNsaWNlKDAsIG9mZnNldCkpXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAvLyBwYXJlbnQgbm9kZSBjb3VsZCBjb250YWlucyBvdGhlciBOb2RlcyBiZXNpZGVzIHRhcmdldCBub2RlXG4gICAgICAgICAgICAvLyBhZGQgYWxsIHByZXZpb3VzIHNpYmxpbmdzIG9mIHRhcmdldCBub2RlIHRvIHRoZSBsZWZ0IHRyZWVcbiAgICAgICAgICAgIHRoaXMucHJlcGVuZFByZXZpb3VzU2libGluZ3NUb05vZGUobGVmdFRyZWUsIHRhcmdldEVsZW1lbnQpO1xuXG4gICAgICAgICAgICBpZiAocm9vdCA9PT0gcGFyZW50KSB7XG4gICAgICAgICAgICAgICAgLy8gd2UgYWxyZWFkeSBmdWxseSBidWlsZCBsZWZ0IGFuZCByaWdodCB0cmVlc1xuICAgICAgICAgICAgICAgIHRoaXMubGVmdFRyZWUgPSBsZWZ0VHJlZSBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgICAgICAgICB0aGlzLnJpZ2h0VHJlZSA9IHJpZ2h0VHJlZSBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gcmVjdXJzaXZlbHkgYnVpbGQgbGVmdCBhbmQgcmlnaHQgdHJlZXNcbiAgICAgICAgICAgICAgICAvLyBjbGltYmluZyBmcm9tIHBhcmVudCBub2RlIHRvIHRoZSByb290IG5vZGVcbiAgICAgICAgICAgICAgICBsZXQgbGVmdFBhcmVudFRyZWU7XG4gICAgICAgICAgICAgICAgbGV0IHJpZ2h0UGFyZW50VHJlZTtcbiAgICAgICAgICAgICAgICBsZXQgZ3JhbmRwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcblxuICAgICAgICAgICAgICAgIHdoaWxlIChyb290LmNvbnRhaW5zKGdyYW5kcGFyZW50KSB8fCBncmFuZHBhcmVudCA9PT0gcm9vdCkge1xuICAgICAgICAgICAgICAgICAgICByaWdodFBhcmVudFRyZWUgPSBncmFuZHBhcmVudC5jbG9uZU5vZGUoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBsZWZ0UGFyZW50VHJlZSA9IGdyYW5kcGFyZW50LmNsb25lTm9kZShmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gUHJvY2VzcyBMZWZ0IHRyZWVcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmVwZW5kUHJldmlvdXNTaWJsaW5nc1RvTm9kZShsZWZ0UGFyZW50VHJlZSwgcGFyZW50KTtcblxuICAgICAgICAgICAgICAgICAgICBsZWZ0UGFyZW50VHJlZS5hcHBlbmRDaGlsZChsZWZ0VHJlZSk7XG4gICAgICAgICAgICAgICAgICAgIGxlZnRUcmVlID0gbGVmdFBhcmVudFRyZWU7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gUHJvY2VzcyBSaWdodCB0cmVlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kTmV4dFNpYmxpbmdzVG9Ob2RlKHJpZ2h0UGFyZW50VHJlZSwgcGFyZW50KTtcblxuICAgICAgICAgICAgICAgICAgICByaWdodFBhcmVudFRyZWUucHJlcGVuZChyaWdodFRyZWUpO1xuICAgICAgICAgICAgICAgICAgICByaWdodFRyZWUgPSByaWdodFBhcmVudFRyZWU7XG5cbiAgICAgICAgICAgICAgICAgICAgcGFyZW50ID0gZ3JhbmRwYXJlbnQ7XG4gICAgICAgICAgICAgICAgICAgIGdyYW5kcGFyZW50ID0gZ3JhbmRwYXJlbnQucGFyZW50Tm9kZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmxlZnRUcmVlID0gbGVmdFRyZWUgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5yaWdodFRyZWUgPSByaWdodFRyZWUgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHByZXBlbmRQcmV2aW91c1NpYmxpbmdzVG9Ob2RlKGxlZnRUcmVlLCB0YXJnZXROb2RlOiBOb2RlKTogdm9pZCB7XG4gICAgICAgIGxldCBwcmV2aW91c1NpYmxpbmcgPSB0YXJnZXROb2RlLnByZXZpb3VzU2libGluZztcblxuICAgICAgICB3aGlsZSAocHJldmlvdXNTaWJsaW5nKSB7XG4gICAgICAgICAgICBsZWZ0VHJlZS5wcmVwZW5kKHByZXZpb3VzU2libGluZy5jbG9uZU5vZGUodHJ1ZSkpO1xuXG4gICAgICAgICAgICBwcmV2aW91c1NpYmxpbmcgPSBwcmV2aW91c1NpYmxpbmcucHJldmlvdXNTaWJsaW5nO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhcHBlbmROZXh0U2libGluZ3NUb05vZGUocmlnaHRUcmVlLCB0YXJnZXRFbGVtZW50OiBOb2RlKTogdm9pZCB7XG4gICAgICAgIGxldCBuZXh0U2libGluZyA9IHRhcmdldEVsZW1lbnQubmV4dFNpYmxpbmc7XG5cbiAgICAgICAgd2hpbGUgKG5leHRTaWJsaW5nKSB7XG4gICAgICAgICAgICByaWdodFRyZWUuYXBwZW5kQ2hpbGQobmV4dFNpYmxpbmcuY2xvbmVOb2RlKHRydWUpKTtcblxuICAgICAgICAgICAgbmV4dFNpYmxpbmcgPSBuZXh0U2libGluZy5uZXh0U2libGluZztcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==