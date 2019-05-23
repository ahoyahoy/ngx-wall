/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class CursorPositionInLine {
    /**
     * @param {?} leftText
     * @param {?} rightText
     * @param {?} targetNode
     */
    constructor(leftText, rightText, targetNode) {
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
            const div = this.createElementClone(this.targetNode);
            document.body.appendChild(div);
            /** @type {?} */
            const span1 = document.createElement('SPAN');
            /** @type {?} */
            const span2 = document.createElement('SPAN');
            div.appendChild(span1);
            div.appendChild(span2);
            span1.innerText = 'a';
            /** @type {?} */
            const lh = span1.offsetHeight;
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
    createElementClone(node) {
        /** @type {?} */
        const div = document.createElement('DIV');
        /** @type {?} */
        const style = getComputedStyle(node);
        [].forEach.call(style, (prop) => {
            div.style[prop] = style[prop];
        });
        return div;
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29yLXBvc2l0aW9uLWluLWxpbmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9tb2R1bGVzL3V0aWxzL25vZGUvY3Vyc29yLXBvc2l0aW9uLWluLWxpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU0sT0FBTyxvQkFBb0I7Ozs7OztJQUk3QixZQUFvQixRQUFnQixFQUFVLFNBQWlCLEVBQVUsVUFBdUI7UUFBNUUsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFhO1FBQzVGLElBQUksUUFBUSxLQUFLLEVBQUUsSUFBSSxTQUFTLEtBQUssRUFBRSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBQzFCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1NBQzVCO2FBQU07OztrQkFHRyxHQUFHLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7WUFFcEQsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7O2tCQUV6QixLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7O2tCQUN0QyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7WUFFNUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2QixHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRXZCLEtBQUssQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDOztrQkFFaEIsRUFBRSxHQUFHLEtBQUssQ0FBQyxZQUFZO1lBRTdCLEtBQUssQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1lBQzNCLEtBQUssQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1lBRTVCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEtBQUssQ0FBQztnQkFDL0MsQ0FBQyxLQUFLLENBQUMsWUFBWSxLQUFLLEVBQUUsSUFBSSxLQUFLLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLHFCQUFxQixFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFM0csSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsWUFBWSxLQUFLLEVBQUUsQ0FBQztZQUU5QyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDaEI7SUFDTCxDQUFDOzs7Ozs7SUFFTyxrQkFBa0IsQ0FBQyxJQUFpQjs7Y0FDbEMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDOztjQUVuQyxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDO1FBRXBDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzVCLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0NBQ0o7OztJQS9DRyw0Q0FBc0I7O0lBQ3RCLDZDQUF1Qjs7Ozs7SUFFWCx3Q0FBd0I7Ozs7O0lBQUUseUNBQXlCOzs7OztJQUFFLDBDQUErQiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBDdXJzb3JQb3NpdGlvbkluTGluZSB7XG4gICAgaXNPbkxhc3RMaW5lOiBib29sZWFuO1xuICAgIGlzT25GaXJzdExpbmU6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxlZnRUZXh0OiBzdHJpbmcsIHByaXZhdGUgcmlnaHRUZXh0OiBzdHJpbmcsIHByaXZhdGUgdGFyZ2V0Tm9kZTogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgaWYgKGxlZnRUZXh0ID09PSAnJyAmJiByaWdodFRleHQgPT09ICcnKSB7XG4gICAgICAgICAgICB0aGlzLmlzT25GaXJzdExpbmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5pc09uTGFzdExpbmUgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gaHR0cDovL2pzYmluLmNvbS9xaWZlenVwdS8zMS9lZGl0P2pzLG91dHB1dFxuXG4gICAgICAgICAgICBjb25zdCBkaXYgPSB0aGlzLmNyZWF0ZUVsZW1lbnRDbG9uZSh0aGlzLnRhcmdldE5vZGUpO1xuXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdik7XG5cbiAgICAgICAgICAgIGNvbnN0IHNwYW4xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnU1BBTicpO1xuICAgICAgICAgICAgY29uc3Qgc3BhbjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdTUEFOJyk7XG5cbiAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChzcGFuMSk7XG4gICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoc3BhbjIpO1xuXG4gICAgICAgICAgICBzcGFuMS5pbm5lclRleHQgPSAnYSc7XG5cbiAgICAgICAgICAgIGNvbnN0IGxoID0gc3BhbjEub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAgICAgICBzcGFuMS5pbm5lckhUTUwgPSBsZWZ0VGV4dDtcbiAgICAgICAgICAgIHNwYW4yLmlubmVySFRNTCA9IHJpZ2h0VGV4dDtcblxuICAgICAgICAgICAgdGhpcy5pc09uRmlyc3RMaW5lID0gc3BhbjEudGV4dENvbnRlbnQubGVuZ3RoID09PSAwIHx8XG4gICAgICAgICAgICAgICAgKHNwYW4xLm9mZnNldEhlaWdodCA9PT0gbGggJiYgc3BhbjEuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wID09PSBzcGFuMi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3ApO1xuXG4gICAgICAgICAgICB0aGlzLmlzT25MYXN0TGluZSA9IHNwYW4yLm9mZnNldEhlaWdodCA9PT0gbGg7XG5cbiAgICAgICAgICAgIGRpdi5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlRWxlbWVudENsb25lKG5vZGU6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnQge1xuICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcblxuICAgICAgICBjb25zdCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUobm9kZSk7XG5cbiAgICAgICAgW10uZm9yRWFjaC5jYWxsKHN0eWxlLCAocHJvcCkgPT4ge1xuICAgICAgICAgICAgZGl2LnN0eWxlW3Byb3BdID0gc3R5bGVbcHJvcF07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkaXY7XG4gICAgfVxufVxuIl19