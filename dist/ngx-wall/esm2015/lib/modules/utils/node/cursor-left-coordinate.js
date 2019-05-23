/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class CursorLeftCoordinate {
    /**
     * @param {?} leftText
     * @param {?} rightText
     * @param {?} targetNode
     */
    constructor(leftText, rightText, targetNode) {
        this.leftText = leftText;
        this.rightText = rightText;
        this.targetNode = targetNode;
    }
    /**
     * @return {?}
     */
    get() {
        /** @type {?} */
        const div = this.createElementClone(this.targetNode);
        /** @type {?} */
        const span = document.createElement('SPAN');
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
        const leftCoordinate = span.offsetLeft;
        div.remove();
        return leftCoordinate;
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
        [].forEach.call(style, (/**
         * @param {?} prop
         * @return {?}
         */
        (prop) => {
            div.style[prop] = style[prop];
        }));
        return div;
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29yLWxlZnQtY29vcmRpbmF0ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL21vZHVsZXMvdXRpbHMvbm9kZS9jdXJzb3ItbGVmdC1jb29yZGluYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNLE9BQU8sb0JBQW9COzs7Ozs7SUFDN0IsWUFBb0IsUUFBZ0IsRUFBVSxTQUFpQixFQUFVLFVBQXVCO1FBQTVFLGFBQVEsR0FBUixRQUFRLENBQVE7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBYTtJQUNoRyxDQUFDOzs7O0lBRUQsR0FBRzs7Y0FDTyxHQUFHLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7O2NBQzlDLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztRQUUzQyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBRWhDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdEIsNENBQTRDO1FBQzVDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztRQUNoQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDcEIsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFFdkIsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7O2NBRXpCLGNBQWMsR0FBRyxJQUFJLENBQUMsVUFBVTtRQUV0QyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFYixPQUFPLGNBQWMsQ0FBQztJQUMxQixDQUFDOzs7Ozs7SUFFTyxrQkFBa0IsQ0FBQyxJQUFpQjs7Y0FDbEMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDOztjQUVuQyxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDO1FBRXBDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUs7Ozs7UUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzVCLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLENBQUMsRUFBQyxDQUFDO1FBRUgsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0NBQ0o7Ozs7OztJQXZDZSx3Q0FBd0I7Ozs7O0lBQUUseUNBQXlCOzs7OztJQUFFLDBDQUErQiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBDdXJzb3JMZWZ0Q29vcmRpbmF0ZSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBsZWZ0VGV4dDogc3RyaW5nLCBwcml2YXRlIHJpZ2h0VGV4dDogc3RyaW5nLCBwcml2YXRlIHRhcmdldE5vZGU6IEhUTUxFbGVtZW50KSB7XG4gICAgfVxuXG4gICAgZ2V0KCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGRpdiA9IHRoaXMuY3JlYXRlRWxlbWVudENsb25lKHRoaXMudGFyZ2V0Tm9kZSk7XG4gICAgICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdTUEFOJyk7XG5cbiAgICAgICAgZGl2LmlubmVySFRNTCA9IHRoaXMubGVmdFRleHQ7XG4gICAgICAgIHNwYW4uaW5uZXJIVE1MID0gdGhpcy5yaWdodFRleHQ7XG5cbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKHNwYW4pO1xuXG4gICAgICAgIC8vIG1ha2Ugc3VyZSBlbGVtZW50IHN0YXkgYXQgdG9wIGxlZnQgY29ybmVyXG4gICAgICAgIGRpdi5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgIGRpdi5zdHlsZS50b3AgPSAnMCc7XG4gICAgICAgIGRpdi5zdHlsZS5sZWZ0ID0gJzAnO1xuICAgICAgICBkaXYuc3R5bGUucGFkZGluZyA9ICcwJztcbiAgICAgICAgZGl2LnN0eWxlLm1hcmdpbiA9ICcwJztcblxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdik7XG5cbiAgICAgICAgY29uc3QgbGVmdENvb3JkaW5hdGUgPSBzcGFuLm9mZnNldExlZnQ7XG5cbiAgICAgICAgZGl2LnJlbW92ZSgpO1xuXG4gICAgICAgIHJldHVybiBsZWZ0Q29vcmRpbmF0ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUVsZW1lbnRDbG9uZShub2RlOiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG5cbiAgICAgICAgY29uc3Qgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuXG4gICAgICAgIFtdLmZvckVhY2guY2FsbChzdHlsZSwgKHByb3ApID0+IHtcbiAgICAgICAgICAgIGRpdi5zdHlsZVtwcm9wXSA9IHN0eWxlW3Byb3BdO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGl2O1xuICAgIH1cbn1cbiJdfQ==