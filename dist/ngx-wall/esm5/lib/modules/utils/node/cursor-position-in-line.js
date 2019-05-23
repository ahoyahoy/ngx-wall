/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CursorPositionInLine = /** @class */ (function () {
    function CursorPositionInLine(leftText, rightText, targetNode) {
        this.leftText = leftText;
        this.rightText = rightText;
        this.targetNode = targetNode;
        if (leftText === '' && rightText === '') {
            this.isOnFirstLine = true;
            this.isOnLastLine = true;
        }
        else {
            // http://jsbin.com/qifezupu/31/edit?js,output
            /** @type {?} */
            var div = this.createElementClone(this.targetNode);
            document.body.appendChild(div);
            /** @type {?} */
            var span1 = document.createElement('SPAN');
            /** @type {?} */
            var span2 = document.createElement('SPAN');
            div.appendChild(span1);
            div.appendChild(span2);
            span1.innerText = 'a';
            /** @type {?} */
            var lh = span1.offsetHeight;
            span1.innerHTML = leftText;
            span2.innerHTML = rightText;
            this.isOnFirstLine = span1.textContent.length === 0 ||
                (span1.offsetHeight === lh && span1.getBoundingClientRect().top === span2.getBoundingClientRect().top);
            this.isOnLastLine = span2.offsetHeight === lh;
            div.remove();
        }
    }
    /**
     * @private
     * @param {?} node
     * @return {?}
     */
    CursorPositionInLine.prototype.createElementClone = /**
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
    return CursorPositionInLine;
}());
export { CursorPositionInLine };
if (false) {
    /** @type {?} */
    CursorPositionInLine.prototype.isOnLastLine;
    /** @type {?} */
    CursorPositionInLine.prototype.isOnFirstLine;
    /**
     * @type {?}
     * @private
     */
    CursorPositionInLine.prototype.leftText;
    /**
     * @type {?}
     * @private
     */
    CursorPositionInLine.prototype.rightText;
    /**
     * @type {?}
     * @private
     */
    CursorPositionInLine.prototype.targetNode;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29yLXBvc2l0aW9uLWluLWxpbmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9tb2R1bGVzL3V0aWxzL25vZGUvY3Vyc29yLXBvc2l0aW9uLWluLWxpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0lBSUksOEJBQW9CLFFBQWdCLEVBQVUsU0FBaUIsRUFBVSxVQUF1QjtRQUE1RSxhQUFRLEdBQVIsUUFBUSxDQUFRO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUFVLGVBQVUsR0FBVixVQUFVLENBQWE7UUFDNUYsSUFBSSxRQUFRLEtBQUssRUFBRSxJQUFJLFNBQVMsS0FBSyxFQUFFLEVBQUU7WUFDckMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7WUFDMUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7U0FDNUI7YUFBTTs7O2dCQUdHLEdBQUcsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUVwRCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7Z0JBRXpCLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQzs7Z0JBQ3RDLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztZQUU1QyxHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3ZCLEdBQUcsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFdkIsS0FBSyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7O2dCQUVoQixFQUFFLEdBQUcsS0FBSyxDQUFDLFlBQVk7WUFFN0IsS0FBSyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7WUFDM0IsS0FBSyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7WUFFNUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sS0FBSyxDQUFDO2dCQUMvQyxDQUFDLEtBQUssQ0FBQyxZQUFZLEtBQUssRUFBRSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUUzRyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxZQUFZLEtBQUssRUFBRSxDQUFDO1lBRTlDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNoQjtJQUNMLENBQUM7Ozs7OztJQUVPLGlEQUFrQjs7Ozs7SUFBMUIsVUFBMkIsSUFBaUI7O1lBQ2xDLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQzs7WUFFbkMsS0FBSyxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQztRQUVwQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsVUFBQyxJQUFJO1lBQ3hCLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBQ0wsMkJBQUM7QUFBRCxDQUFDLEFBaERELElBZ0RDOzs7O0lBL0NHLDRDQUFzQjs7SUFDdEIsNkNBQXVCOzs7OztJQUVYLHdDQUF3Qjs7Ozs7SUFBRSx5Q0FBeUI7Ozs7O0lBQUUsMENBQStCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEN1cnNvclBvc2l0aW9uSW5MaW5lIHtcbiAgICBpc09uTGFzdExpbmU6IGJvb2xlYW47XG4gICAgaXNPbkZpcnN0TGluZTogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbGVmdFRleHQ6IHN0cmluZywgcHJpdmF0ZSByaWdodFRleHQ6IHN0cmluZywgcHJpdmF0ZSB0YXJnZXROb2RlOiBIVE1MRWxlbWVudCkge1xuICAgICAgICBpZiAobGVmdFRleHQgPT09ICcnICYmIHJpZ2h0VGV4dCA9PT0gJycpIHtcbiAgICAgICAgICAgIHRoaXMuaXNPbkZpcnN0TGluZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmlzT25MYXN0TGluZSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBodHRwOi8vanNiaW4uY29tL3FpZmV6dXB1LzMxL2VkaXQ/anMsb3V0cHV0XG5cbiAgICAgICAgICAgIGNvbnN0IGRpdiA9IHRoaXMuY3JlYXRlRWxlbWVudENsb25lKHRoaXMudGFyZ2V0Tm9kZSk7XG5cbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGl2KTtcblxuICAgICAgICAgICAgY29uc3Qgc3BhbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdTUEFOJyk7XG4gICAgICAgICAgICBjb25zdCBzcGFuMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1NQQU4nKTtcblxuICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKHNwYW4xKTtcbiAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChzcGFuMik7XG5cbiAgICAgICAgICAgIHNwYW4xLmlubmVyVGV4dCA9ICdhJztcblxuICAgICAgICAgICAgY29uc3QgbGggPSBzcGFuMS5vZmZzZXRIZWlnaHQ7XG5cbiAgICAgICAgICAgIHNwYW4xLmlubmVySFRNTCA9IGxlZnRUZXh0O1xuICAgICAgICAgICAgc3BhbjIuaW5uZXJIVE1MID0gcmlnaHRUZXh0O1xuXG4gICAgICAgICAgICB0aGlzLmlzT25GaXJzdExpbmUgPSBzcGFuMS50ZXh0Q29udGVudC5sZW5ndGggPT09IDAgfHxcbiAgICAgICAgICAgICAgICAoc3BhbjEub2Zmc2V0SGVpZ2h0ID09PSBsaCAmJiBzcGFuMS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgPT09IHNwYW4yLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCk7XG5cbiAgICAgICAgICAgIHRoaXMuaXNPbkxhc3RMaW5lID0gc3BhbjIub2Zmc2V0SGVpZ2h0ID09PSBsaDtcblxuICAgICAgICAgICAgZGl2LnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVFbGVtZW50Q2xvbmUobm9kZTogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuXG4gICAgICAgIGNvbnN0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcblxuICAgICAgICBbXS5mb3JFYWNoLmNhbGwoc3R5bGUsIChwcm9wKSA9PiB7XG4gICAgICAgICAgICBkaXYuc3R5bGVbcHJvcF0gPSBzdHlsZVtwcm9wXTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRpdjtcbiAgICB9XG59XG4iXX0=