/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class TreeNodeTraverse {
    /**
     * @param {?} root
     */
    constructor(root) {
        this.root = root;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    traversePostOrder(fn) {
        this._traversePostOrder(this.root, fn);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    traversePreOrder(fn) {
        this._traversePreOrder(this.root, fn);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    traversePostPreOrder(fn) {
        this._traversePostPreOrder(this.root, fn);
    }
    /**
     * @return {?}
     */
    getPreOrderNodes() {
        /** @type {?} */
        const nodes = [];
        this.traversePreOrder((node) => {
            nodes.push(node);
        });
        return nodes;
    }
    /**
     * @return {?}
     */
    getPostOrderNodes() {
        /** @type {?} */
        const nodes = [];
        this.traversePostOrder((node) => {
            nodes.push(node);
        });
        return nodes;
    }
    /**
     * @return {?}
     */
    getPostPreOrderNodes() {
        /** @type {?} */
        const nodes = [];
        this.traversePostPreOrder((node) => {
            nodes.push(node);
        });
        return nodes;
    }
    /**
     * @private
     * @param {?} node
     * @param {?} fn
     * @return {?}
     */
    _traversePostOrder(node, fn) {
        Array.from(node.childNodes).forEach((childNode) => {
            if (childNode.childNodes && childNode.childNodes.length) {
                this._traversePostOrder(childNode, fn);
            }
            fn(childNode);
        });
    }
    /**
     * @private
     * @param {?} node
     * @param {?} fn
     * @return {?}
     */
    _traversePreOrder(node, fn) {
        Array.from(node.childNodes).forEach((childNode) => {
            fn(childNode);
            if (childNode.childNodes && childNode.childNodes.length) {
                this._traversePreOrder(childNode, fn);
            }
        });
    }
    /**
     * @private
     * @param {?} node
     * @param {?} fn
     * @return {?}
     */
    _traversePostPreOrder(node, fn) {
        Array.from(node.childNodes).forEach((childNode) => {
            fn(childNode);
            if (childNode.childNodes && childNode.childNodes.length) {
                this._traversePostPreOrder(childNode, fn);
            }
            fn(childNode);
        });
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    TreeNodeTraverse.prototype.root;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLXRyYXZlcnNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvbW9kdWxlcy91dGlscy9ub2RlL3RyZWUtbm9kZS10cmF2ZXJzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTSxPQUFPLGdCQUFnQjs7OztJQUN6QixZQUFvQixJQUFpQjtRQUFqQixTQUFJLEdBQUosSUFBSSxDQUFhO0lBQ3JDLENBQUM7Ozs7O0lBRUQsaUJBQWlCLENBQUMsRUFBd0I7UUFDdEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxFQUF3QjtRQUNyQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMxQyxDQUFDOzs7OztJQUVELG9CQUFvQixDQUFDLEVBQXdCO1FBQ3pDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzlDLENBQUM7Ozs7SUFFRCxnQkFBZ0I7O2NBQ04sS0FBSyxHQUFHLEVBQUU7UUFFaEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDM0IsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7Ozs7SUFFRCxpQkFBaUI7O2NBQ1AsS0FBSyxHQUFHLEVBQUU7UUFFaEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDNUIsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7Ozs7SUFFRCxvQkFBb0I7O2NBQ1YsS0FBSyxHQUFHLEVBQUU7UUFFaEIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDL0IsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7Ozs7Ozs7SUFFTyxrQkFBa0IsQ0FBQyxJQUFVLEVBQUUsRUFBd0I7UUFDM0QsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDOUMsSUFBSSxTQUFTLENBQUMsVUFBVSxJQUFJLFNBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFO2dCQUNyRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQzFDO1lBRUQsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7OztJQUVPLGlCQUFpQixDQUFDLElBQVUsRUFBRSxFQUF3QjtRQUMxRCxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUM5QyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFZCxJQUFJLFNBQVMsQ0FBQyxVQUFVLElBQUksU0FBUyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3JELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDekM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Ozs7Ozs7SUFFTyxxQkFBcUIsQ0FBQyxJQUFVLEVBQUUsRUFBd0I7UUFDOUQsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDOUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRWQsSUFBSSxTQUFTLENBQUMsVUFBVSxJQUFJLFNBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFO2dCQUNyRCxJQUFJLENBQUMscUJBQXFCLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQzdDO1lBRUQsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKOzs7Ozs7SUE1RWUsZ0NBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFRyZWVOb2RlVHJhdmVyc2Uge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm9vdDogSFRNTEVsZW1lbnQpIHtcbiAgICB9XG5cbiAgICB0cmF2ZXJzZVBvc3RPcmRlcihmbjogKG5vZGU6IE5vZGUpID0+IHZvaWQpIHtcbiAgICAgICAgdGhpcy5fdHJhdmVyc2VQb3N0T3JkZXIodGhpcy5yb290LCBmbik7XG4gICAgfVxuXG4gICAgdHJhdmVyc2VQcmVPcmRlcihmbjogKG5vZGU6IE5vZGUpID0+IHZvaWQpIHtcbiAgICAgICAgdGhpcy5fdHJhdmVyc2VQcmVPcmRlcih0aGlzLnJvb3QsIGZuKTtcbiAgICB9XG5cbiAgICB0cmF2ZXJzZVBvc3RQcmVPcmRlcihmbjogKG5vZGU6IE5vZGUpID0+IHZvaWQpIHtcbiAgICAgICAgdGhpcy5fdHJhdmVyc2VQb3N0UHJlT3JkZXIodGhpcy5yb290LCBmbik7XG4gICAgfVxuXG4gICAgZ2V0UHJlT3JkZXJOb2RlcygpOiBOb2RlW10ge1xuICAgICAgICBjb25zdCBub2RlcyA9IFtdO1xuXG4gICAgICAgIHRoaXMudHJhdmVyc2VQcmVPcmRlcigobm9kZSkgPT4ge1xuICAgICAgICAgICAgbm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG5vZGVzO1xuICAgIH1cblxuICAgIGdldFBvc3RPcmRlck5vZGVzKCk6IE5vZGVbXSB7XG4gICAgICAgIGNvbnN0IG5vZGVzID0gW107XG5cbiAgICAgICAgdGhpcy50cmF2ZXJzZVBvc3RPcmRlcigobm9kZSkgPT4ge1xuICAgICAgICAgICAgbm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG5vZGVzO1xuICAgIH1cblxuICAgIGdldFBvc3RQcmVPcmRlck5vZGVzKCk6IE5vZGVbXSB7XG4gICAgICAgIGNvbnN0IG5vZGVzID0gW107XG5cbiAgICAgICAgdGhpcy50cmF2ZXJzZVBvc3RQcmVPcmRlcigobm9kZSkgPT4ge1xuICAgICAgICAgICAgbm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG5vZGVzO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3RyYXZlcnNlUG9zdE9yZGVyKG5vZGU6IE5vZGUsIGZuOiAobm9kZTogTm9kZSkgPT4gdm9pZCkge1xuICAgICAgICBBcnJheS5mcm9tKG5vZGUuY2hpbGROb2RlcykuZm9yRWFjaCgoY2hpbGROb2RlKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2hpbGROb2RlLmNoaWxkTm9kZXMgJiYgY2hpbGROb2RlLmNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdHJhdmVyc2VQb3N0T3JkZXIoY2hpbGROb2RlLCBmbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZuKGNoaWxkTm9kZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3RyYXZlcnNlUHJlT3JkZXIobm9kZTogTm9kZSwgZm46IChub2RlOiBOb2RlKSA9PiB2b2lkKSB7XG4gICAgICAgIEFycmF5LmZyb20obm9kZS5jaGlsZE5vZGVzKS5mb3JFYWNoKChjaGlsZE5vZGUpID0+IHtcbiAgICAgICAgICAgIGZuKGNoaWxkTm9kZSk7XG5cbiAgICAgICAgICAgIGlmIChjaGlsZE5vZGUuY2hpbGROb2RlcyAmJiBjaGlsZE5vZGUuY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90cmF2ZXJzZVByZU9yZGVyKGNoaWxkTm9kZSwgZm4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF90cmF2ZXJzZVBvc3RQcmVPcmRlcihub2RlOiBOb2RlLCBmbjogKG5vZGU6IE5vZGUpID0+IHZvaWQpIHtcbiAgICAgICAgQXJyYXkuZnJvbShub2RlLmNoaWxkTm9kZXMpLmZvckVhY2goKGNoaWxkTm9kZSkgPT4ge1xuICAgICAgICAgICAgZm4oY2hpbGROb2RlKTtcblxuICAgICAgICAgICAgaWYgKGNoaWxkTm9kZS5jaGlsZE5vZGVzICYmIGNoaWxkTm9kZS5jaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RyYXZlcnNlUG9zdFByZU9yZGVyKGNoaWxkTm9kZSwgZm4pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmbihjaGlsZE5vZGUpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=