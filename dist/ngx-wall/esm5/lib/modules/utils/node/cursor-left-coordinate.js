/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CursorLeftCoordinate = /** @class */ (function () {
    function CursorLeftCoordinate(leftText, rightText, targetNode) {
        this.leftText = leftText;
        this.rightText = rightText;
        this.targetNode = targetNode;
    }
    /**
     * @return {?}
     */
    CursorLeftCoordinate.prototype.get = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var div = this.createElementClone(this.targetNode);
        /** @type {?} */
        var span = document.createElement('SPAN');
        div.innerHTML = this.leftText;
        span.innerHTML = this.rightText;
        div.appendChild(span);
        // make sure element stay at top left corner
        div.style.position = 'absolute';
        div.style.top = '0';
        div.style.left = '0';
        div.style.padding = '0';
        div.style.margin = '0';
        document.body.appendChild(div);
        /** @type {?} */
        var leftCoordinate = span.offsetLeft;
        div.remove();
        return leftCoordinate;
    };
    /**
     * @private
     * @param {?} node
     * @return {?}
     */
    CursorLeftCoordinate.prototype.createElementClone = /**
     * @private
     * @param {?} node
     * @return {?}
     */
    function (node) {
        /** @type {?} */
        var div = document.createElement('DIV');
        /** @type {?} */
        var style = getComputedStyle(node);
        [].forEach.call(style, function (prop) {
            div.style[prop] = style[prop];
        });
        return div;
    };
    return CursorLeftCoordinate;
}());
export { CursorLeftCoordinate };
if (false) {
    /**
     * @type {?}
     * @private
     */
    CursorLeftCoordinate.prototype.leftText;
    /**
     * @type {?}
     * @private
     */
    CursorLeftCoordinate.prototype.rightText;
    /**
     * @type {?}
     * @private
     */
    CursorLeftCoordinate.prototype.targetNode;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29yLWxlZnQtY29vcmRpbmF0ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL21vZHVsZXMvdXRpbHMvbm9kZS9jdXJzb3ItbGVmdC1jb29yZGluYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtJQUNJLDhCQUFvQixRQUFnQixFQUFVLFNBQWlCLEVBQVUsVUFBdUI7UUFBNUUsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFhO0lBQ2hHLENBQUM7Ozs7SUFFRCxrQ0FBRzs7O0lBQUg7O1lBQ1UsR0FBRyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDOztZQUM5QyxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFFM0MsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUVoQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXRCLDRDQUE0QztRQUM1QyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7UUFDaEMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ3BCLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUNyQixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFDeEIsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBRXZCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztZQUV6QixjQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVU7UUFFdEMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRWIsT0FBTyxjQUFjLENBQUM7SUFDMUIsQ0FBQzs7Ozs7O0lBRU8saURBQWtCOzs7OztJQUExQixVQUEyQixJQUFpQjs7WUFDbEMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDOztZQUVuQyxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDO1FBRXBDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxVQUFDLElBQUk7WUFDeEIsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFDTCwyQkFBQztBQUFELENBQUMsQUF4Q0QsSUF3Q0M7Ozs7Ozs7SUF2Q2Usd0NBQXdCOzs7OztJQUFFLHlDQUF5Qjs7Ozs7SUFBRSwwQ0FBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQ3Vyc29yTGVmdENvb3JkaW5hdGUge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbGVmdFRleHQ6IHN0cmluZywgcHJpdmF0ZSByaWdodFRleHQ6IHN0cmluZywgcHJpdmF0ZSB0YXJnZXROb2RlOiBIVE1MRWxlbWVudCkge1xuICAgIH1cblxuICAgIGdldCgpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBkaXYgPSB0aGlzLmNyZWF0ZUVsZW1lbnRDbG9uZSh0aGlzLnRhcmdldE5vZGUpO1xuICAgICAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnU1BBTicpO1xuXG4gICAgICAgIGRpdi5pbm5lckhUTUwgPSB0aGlzLmxlZnRUZXh0O1xuICAgICAgICBzcGFuLmlubmVySFRNTCA9IHRoaXMucmlnaHRUZXh0O1xuXG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChzcGFuKTtcblxuICAgICAgICAvLyBtYWtlIHN1cmUgZWxlbWVudCBzdGF5IGF0IHRvcCBsZWZ0IGNvcm5lclxuICAgICAgICBkaXYuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICBkaXYuc3R5bGUudG9wID0gJzAnO1xuICAgICAgICBkaXYuc3R5bGUubGVmdCA9ICcwJztcbiAgICAgICAgZGl2LnN0eWxlLnBhZGRpbmcgPSAnMCc7XG4gICAgICAgIGRpdi5zdHlsZS5tYXJnaW4gPSAnMCc7XG5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXYpO1xuXG4gICAgICAgIGNvbnN0IGxlZnRDb29yZGluYXRlID0gc3Bhbi5vZmZzZXRMZWZ0O1xuXG4gICAgICAgIGRpdi5yZW1vdmUoKTtcblxuICAgICAgICByZXR1cm4gbGVmdENvb3JkaW5hdGU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVFbGVtZW50Q2xvbmUobm9kZTogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuXG4gICAgICAgIGNvbnN0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcblxuICAgICAgICBbXS5mb3JFYWNoLmNhbGwoc3R5bGUsIChwcm9wKSA9PiB7XG4gICAgICAgICAgICBkaXYuc3R5bGVbcHJvcF0gPSBzdHlsZVtwcm9wXTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRpdjtcbiAgICB9XG59XG4iXX0=