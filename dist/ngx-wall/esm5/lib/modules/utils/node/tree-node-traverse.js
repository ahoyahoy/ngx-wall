/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TreeNodeTraverse = /** @class */ (function () {
    function TreeNodeTraverse(root) {
        this.root = root;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    TreeNodeTraverse.prototype.traversePostOrder = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._traversePostOrder(this.root, fn);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    TreeNodeTraverse.prototype.traversePreOrder = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._traversePreOrder(this.root, fn);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    TreeNodeTraverse.prototype.traversePostPreOrder = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._traversePostPreOrder(this.root, fn);
    };
    /**
     * @return {?}
     */
    TreeNodeTraverse.prototype.getPreOrderNodes = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var nodes = [];
        this.traversePreOrder((/**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            nodes.push(node);
        }));
        return nodes;
    };
    /**
     * @return {?}
     */
    TreeNodeTraverse.prototype.getPostOrderNodes = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var nodes = [];
        this.traversePostOrder((/**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            nodes.push(node);
        }));
        return nodes;
    };
    /**
     * @return {?}
     */
    TreeNodeTraverse.prototype.getPostPreOrderNodes = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var nodes = [];
        this.traversePostPreOrder((/**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            nodes.push(node);
        }));
        return nodes;
    };
    /**
     * @private
     * @param {?} node
     * @param {?} fn
     * @return {?}
     */
    TreeNodeTraverse.prototype._traversePostOrder = /**
     * @private
     * @param {?} node
     * @param {?} fn
     * @return {?}
     */
    function (node, fn) {
        var _this = this;
        Array.from(node.childNodes).forEach((/**
         * @param {?} childNode
         * @return {?}
         */
        function (childNode) {
            if (childNode.childNodes && childNode.childNodes.length) {
                _this._traversePostOrder(childNode, fn);
            }
            fn(childNode);
        }));
    };
    /**
     * @private
     * @param {?} node
     * @param {?} fn
     * @return {?}
     */
    TreeNodeTraverse.prototype._traversePreOrder = /**
     * @private
     * @param {?} node
     * @param {?} fn
     * @return {?}
     */
    function (node, fn) {
        var _this = this;
        Array.from(node.childNodes).forEach((/**
         * @param {?} childNode
         * @return {?}
         */
        function (childNode) {
            fn(childNode);
            if (childNode.childNodes && childNode.childNodes.length) {
                _this._traversePreOrder(childNode, fn);
            }
        }));
    };
    /**
     * @private
     * @param {?} node
     * @param {?} fn
     * @return {?}
     */
    TreeNodeTraverse.prototype._traversePostPreOrder = /**
     * @private
     * @param {?} node
     * @param {?} fn
     * @return {?}
     */
    function (node, fn) {
        var _this = this;
        Array.from(node.childNodes).forEach((/**
         * @param {?} childNode
         * @return {?}
         */
        function (childNode) {
            fn(childNode);
            if (childNode.childNodes && childNode.childNodes.length) {
                _this._traversePostPreOrder(childNode, fn);
            }
            fn(childNode);
        }));
    };
    return TreeNodeTraverse;
}());
export { TreeNodeTraverse };
if (false) {
    /**
     * @type {?}
     * @private
     */
    TreeNodeTraverse.prototype.root;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLXRyYXZlcnNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvbW9kdWxlcy91dGlscy9ub2RlL3RyZWUtbm9kZS10cmF2ZXJzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUE7SUFDSSwwQkFBb0IsSUFBaUI7UUFBakIsU0FBSSxHQUFKLElBQUksQ0FBYTtJQUNyQyxDQUFDOzs7OztJQUVELDRDQUFpQjs7OztJQUFqQixVQUFrQixFQUF3QjtRQUN0QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMzQyxDQUFDOzs7OztJQUVELDJDQUFnQjs7OztJQUFoQixVQUFpQixFQUF3QjtRQUNyQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMxQyxDQUFDOzs7OztJQUVELCtDQUFvQjs7OztJQUFwQixVQUFxQixFQUF3QjtRQUN6QyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM5QyxDQUFDOzs7O0lBRUQsMkNBQWdCOzs7SUFBaEI7O1lBQ1UsS0FBSyxHQUFHLEVBQUU7UUFFaEIsSUFBSSxDQUFDLGdCQUFnQjs7OztRQUFDLFVBQUMsSUFBSTtZQUN2QixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JCLENBQUMsRUFBQyxDQUFDO1FBRUgsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQzs7OztJQUVELDRDQUFpQjs7O0lBQWpCOztZQUNVLEtBQUssR0FBRyxFQUFFO1FBRWhCLElBQUksQ0FBQyxpQkFBaUI7Ozs7UUFBQyxVQUFDLElBQUk7WUFDeEIsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQixDQUFDLEVBQUMsQ0FBQztRQUVILE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7Ozs7SUFFRCwrQ0FBb0I7OztJQUFwQjs7WUFDVSxLQUFLLEdBQUcsRUFBRTtRQUVoQixJQUFJLENBQUMsb0JBQW9COzs7O1FBQUMsVUFBQyxJQUFJO1lBQzNCLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckIsQ0FBQyxFQUFDLENBQUM7UUFFSCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDOzs7Ozs7O0lBRU8sNkNBQWtCOzs7Ozs7SUFBMUIsVUFBMkIsSUFBVSxFQUFFLEVBQXdCO1FBQS9ELGlCQVFDO1FBUEcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTzs7OztRQUFDLFVBQUMsU0FBUztZQUMxQyxJQUFJLFNBQVMsQ0FBQyxVQUFVLElBQUksU0FBUyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3JELEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDMUM7WUFFRCxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbEIsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7Ozs7O0lBRU8sNENBQWlCOzs7Ozs7SUFBekIsVUFBMEIsSUFBVSxFQUFFLEVBQXdCO1FBQTlELGlCQVFDO1FBUEcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTzs7OztRQUFDLFVBQUMsU0FBUztZQUMxQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFZCxJQUFJLFNBQVMsQ0FBQyxVQUFVLElBQUksU0FBUyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3JELEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDekM7UUFDTCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7Ozs7SUFFTyxnREFBcUI7Ozs7OztJQUE3QixVQUE4QixJQUFVLEVBQUUsRUFBd0I7UUFBbEUsaUJBVUM7UUFURyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQyxTQUFTO1lBQzFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUVkLElBQUksU0FBUyxDQUFDLFVBQVUsSUFBSSxTQUFTLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRTtnQkFDckQsS0FBSSxDQUFDLHFCQUFxQixDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQzthQUM3QztZQUVELEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsQixDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7SUFDTCx1QkFBQztBQUFELENBQUMsQUE3RUQsSUE2RUM7Ozs7Ozs7SUE1RWUsZ0NBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFRyZWVOb2RlVHJhdmVyc2Uge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm9vdDogSFRNTEVsZW1lbnQpIHtcbiAgICB9XG5cbiAgICB0cmF2ZXJzZVBvc3RPcmRlcihmbjogKG5vZGU6IE5vZGUpID0+IHZvaWQpIHtcbiAgICAgICAgdGhpcy5fdHJhdmVyc2VQb3N0T3JkZXIodGhpcy5yb290LCBmbik7XG4gICAgfVxuXG4gICAgdHJhdmVyc2VQcmVPcmRlcihmbjogKG5vZGU6IE5vZGUpID0+IHZvaWQpIHtcbiAgICAgICAgdGhpcy5fdHJhdmVyc2VQcmVPcmRlcih0aGlzLnJvb3QsIGZuKTtcbiAgICB9XG5cbiAgICB0cmF2ZXJzZVBvc3RQcmVPcmRlcihmbjogKG5vZGU6IE5vZGUpID0+IHZvaWQpIHtcbiAgICAgICAgdGhpcy5fdHJhdmVyc2VQb3N0UHJlT3JkZXIodGhpcy5yb290LCBmbik7XG4gICAgfVxuXG4gICAgZ2V0UHJlT3JkZXJOb2RlcygpOiBOb2RlW10ge1xuICAgICAgICBjb25zdCBub2RlcyA9IFtdO1xuXG4gICAgICAgIHRoaXMudHJhdmVyc2VQcmVPcmRlcigobm9kZSkgPT4ge1xuICAgICAgICAgICAgbm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG5vZGVzO1xuICAgIH1cblxuICAgIGdldFBvc3RPcmRlck5vZGVzKCk6IE5vZGVbXSB7XG4gICAgICAgIGNvbnN0IG5vZGVzID0gW107XG5cbiAgICAgICAgdGhpcy50cmF2ZXJzZVBvc3RPcmRlcigobm9kZSkgPT4ge1xuICAgICAgICAgICAgbm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG5vZGVzO1xuICAgIH1cblxuICAgIGdldFBvc3RQcmVPcmRlck5vZGVzKCk6IE5vZGVbXSB7XG4gICAgICAgIGNvbnN0IG5vZGVzID0gW107XG5cbiAgICAgICAgdGhpcy50cmF2ZXJzZVBvc3RQcmVPcmRlcigobm9kZSkgPT4ge1xuICAgICAgICAgICAgbm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG5vZGVzO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3RyYXZlcnNlUG9zdE9yZGVyKG5vZGU6IE5vZGUsIGZuOiAobm9kZTogTm9kZSkgPT4gdm9pZCkge1xuICAgICAgICBBcnJheS5mcm9tKG5vZGUuY2hpbGROb2RlcykuZm9yRWFjaCgoY2hpbGROb2RlKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2hpbGROb2RlLmNoaWxkTm9kZXMgJiYgY2hpbGROb2RlLmNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdHJhdmVyc2VQb3N0T3JkZXIoY2hpbGROb2RlLCBmbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZuKGNoaWxkTm9kZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3RyYXZlcnNlUHJlT3JkZXIobm9kZTogTm9kZSwgZm46IChub2RlOiBOb2RlKSA9PiB2b2lkKSB7XG4gICAgICAgIEFycmF5LmZyb20obm9kZS5jaGlsZE5vZGVzKS5mb3JFYWNoKChjaGlsZE5vZGUpID0+IHtcbiAgICAgICAgICAgIGZuKGNoaWxkTm9kZSk7XG5cbiAgICAgICAgICAgIGlmIChjaGlsZE5vZGUuY2hpbGROb2RlcyAmJiBjaGlsZE5vZGUuY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90cmF2ZXJzZVByZU9yZGVyKGNoaWxkTm9kZSwgZm4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF90cmF2ZXJzZVBvc3RQcmVPcmRlcihub2RlOiBOb2RlLCBmbjogKG5vZGU6IE5vZGUpID0+IHZvaWQpIHtcbiAgICAgICAgQXJyYXkuZnJvbShub2RlLmNoaWxkTm9kZXMpLmZvckVhY2goKGNoaWxkTm9kZSkgPT4ge1xuICAgICAgICAgICAgZm4oY2hpbGROb2RlKTtcblxuICAgICAgICAgICAgaWYgKGNoaWxkTm9kZS5jaGlsZE5vZGVzICYmIGNoaWxkTm9kZS5jaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RyYXZlcnNlUG9zdFByZU9yZGVyKGNoaWxkTm9kZSwgZm4pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmbihjaGlsZE5vZGUpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=