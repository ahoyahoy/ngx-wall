/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var EnterKeyHandler = /** @class */ (function () {
    function EnterKeyHandler(baseTextBrickComponent) {
        this.baseTextBrickComponent = baseTextBrickComponent;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    EnterKeyHandler.prototype.execute = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        e.preventDefault();
        /** @type {?} */
        var sel = window.getSelection();
        /** @type {?} */
        var splittedText = this.baseTextBrickComponent.getSplittedText(sel.focusOffset, sel.focusNode);
        splittedText.left = this.baseTextBrickComponent.cleanUpText(splittedText.left);
        splittedText.right = this.baseTextBrickComponent.cleanUpText(splittedText.right);
        if (splittedText.left.length) {
            if (splittedText.right.length) {
                // text is splitted to two part
                this.splitBrickForTwoPart(splittedText.left, splittedText.right);
            }
            else {
                // cursor at end - text's exist - create new and focus on it
                this.addEmptyBrickAfter();
            }
        }
        else {
            if (splittedText.right.length) {
                // cursor at start, text exists - just create new line at top, do not move focus
                this.addEmptyTextBrickBefore();
            }
            else {
                // there are no text at all - create new and focus on it
                this.addEmptyBrickAfter();
            }
        }
    };
    /**
     * @private
     * @param {?} left
     * @param {?} right
     * @return {?}
     */
    EnterKeyHandler.prototype.splitBrickForTwoPart = /**
     * @private
     * @param {?} left
     * @param {?} right
     * @return {?}
     */
    function (left, right) {
        this.addBrickAfter(right);
        this.baseTextBrickComponent.setTextState(left);
        this.baseTextBrickComponent.saveCurrentState();
    };
    /**
     * @private
     * @return {?}
     */
    EnterKeyHandler.prototype.addEmptyTextBrickBefore = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var newTextState = {
            text: '',
            tabs: this.baseTextBrickComponent.scope.tabs
        };
        this.baseTextBrickComponent.wallModel.api.core
            .addBrickBeforeBrickId(this.baseTextBrickComponent.id, 'text', newTextState);
        // scroll browser view to element
        this.baseTextBrickComponent.editor.nativeElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'start'
        });
    };
    /**
     * @private
     * @return {?}
     */
    EnterKeyHandler.prototype.addEmptyBrickAfter = /**
     * @private
     * @return {?}
     */
    function () {
        // cursor at end - text's exist - create new and focus on it
        this.addBrickAfter('');
    };
    /**
     * @private
     * @param {?} text
     * @return {?}
     */
    EnterKeyHandler.prototype.addBrickAfter = /**
     * @private
     * @param {?} text
     * @return {?}
     */
    function (text) {
        var _this = this;
        /** @type {?} */
        var newTextState = {
            text: text,
            tabs: this.baseTextBrickComponent.scope.tabs
        };
        /** @type {?} */
        var addedBrick = this.baseTextBrickComponent.wallModel.api.core
            .addBrickAfterBrickId(this.baseTextBrickComponent.id, 'text', newTextState);
        // wait one tick for component rendering
        setTimeout(function () {
            _this.baseTextBrickComponent.wallUiApi.focusOnBrickId(addedBrick.id);
        });
    };
    return EnterKeyHandler;
}());
export { EnterKeyHandler };
if (false) {
    /**
     * @type {?}
     * @private
     */
    EnterKeyHandler.prototype.baseTextBrickComponent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50ZXIta2V5LmhhbmRsZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9icmlja3MvYmFzZS10ZXh0LWJyaWNrL2tleXByZXNzLWhhbmRsZXJzL2VudGVyLWtleS5oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQTtJQUNJLHlCQUFvQixzQkFBOEM7UUFBOUMsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtJQUNsRSxDQUFDOzs7OztJQUVELGlDQUFPOzs7O0lBQVAsVUFBUSxDQUFnQjtRQUNwQixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7O1lBRWIsR0FBRyxHQUFHLE1BQU0sQ0FBQyxZQUFZLEVBQUU7O1lBRTNCLFlBQVksR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsZUFBZSxDQUM1RCxHQUFHLENBQUMsV0FBVyxFQUNmLEdBQUcsQ0FBQyxTQUFTLENBQ2hCO1FBRUQsWUFBWSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvRSxZQUFZLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWpGLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDMUIsSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDM0IsK0JBQStCO2dCQUMvQixJQUFJLENBQUMsb0JBQW9CLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDcEU7aUJBQU07Z0JBQ0gsNERBQTREO2dCQUM1RCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzthQUM3QjtTQUNKO2FBQU07WUFDSCxJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO2dCQUMzQixnRkFBZ0Y7Z0JBQ2hGLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO2FBQ2xDO2lCQUFNO2dCQUNILHdEQUF3RDtnQkFDeEQsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7YUFDN0I7U0FDSjtJQUNMLENBQUM7Ozs7Ozs7SUFFTyw4Q0FBb0I7Ozs7OztJQUE1QixVQUE2QixJQUFZLEVBQUUsS0FBYTtRQUNwRCxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTFCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDbkQsQ0FBQzs7Ozs7SUFFTyxpREFBdUI7Ozs7SUFBL0I7O1lBQ1UsWUFBWSxHQUFHO1lBQ2pCLElBQUksRUFBRSxFQUFFO1lBQ1IsSUFBSSxFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsSUFBSTtTQUMvQztRQUVELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUk7YUFDekMscUJBQXFCLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFFakYsaUNBQWlDO1FBQ2pDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQztZQUM1RCxRQUFRLEVBQUUsUUFBUTtZQUNsQixLQUFLLEVBQUUsUUFBUTtZQUNmLE1BQU0sRUFBRSxPQUFPO1NBQ2xCLENBQUMsQ0FBQztJQUNQLENBQUM7Ozs7O0lBRU8sNENBQWtCOzs7O0lBQTFCO1FBQ0ksNERBQTREO1FBQzVELElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDM0IsQ0FBQzs7Ozs7O0lBRU8sdUNBQWE7Ozs7O0lBQXJCLFVBQXNCLElBQVk7UUFBbEMsaUJBYUM7O1lBWlMsWUFBWSxHQUFHO1lBQ2pCLElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsSUFBSTtTQUMvQzs7WUFFSyxVQUFVLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSTthQUM1RCxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxZQUFZLENBQUM7UUFFL0Usd0NBQXdDO1FBQ3hDLFVBQVUsQ0FBQztZQUNQLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN4RSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTCxzQkFBQztBQUFELENBQUMsQUEvRUQsSUErRUM7Ozs7Ozs7SUE5RWUsaURBQXNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtCYXNlVGV4dEJyaWNrQ29tcG9uZW50fSBmcm9tICcuLi9iYXNlLXRleHQtYnJpY2suY29tcG9uZW50JztcblxuZXhwb3J0IGNsYXNzIEVudGVyS2V5SGFuZGxlciB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBiYXNlVGV4dEJyaWNrQ29tcG9uZW50OiBCYXNlVGV4dEJyaWNrQ29tcG9uZW50KSB7XG4gICAgfVxuXG4gICAgZXhlY3V0ZShlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG5cbiAgICAgICAgY29uc3Qgc3BsaXR0ZWRUZXh0ID0gdGhpcy5iYXNlVGV4dEJyaWNrQ29tcG9uZW50LmdldFNwbGl0dGVkVGV4dChcbiAgICAgICAgICAgIHNlbC5mb2N1c09mZnNldCxcbiAgICAgICAgICAgIHNlbC5mb2N1c05vZGVcbiAgICAgICAgKTtcblxuICAgICAgICBzcGxpdHRlZFRleHQubGVmdCA9IHRoaXMuYmFzZVRleHRCcmlja0NvbXBvbmVudC5jbGVhblVwVGV4dChzcGxpdHRlZFRleHQubGVmdCk7XG4gICAgICAgIHNwbGl0dGVkVGV4dC5yaWdodCA9IHRoaXMuYmFzZVRleHRCcmlja0NvbXBvbmVudC5jbGVhblVwVGV4dChzcGxpdHRlZFRleHQucmlnaHQpO1xuXG4gICAgICAgIGlmIChzcGxpdHRlZFRleHQubGVmdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChzcGxpdHRlZFRleHQucmlnaHQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgLy8gdGV4dCBpcyBzcGxpdHRlZCB0byB0d28gcGFydFxuICAgICAgICAgICAgICAgIHRoaXMuc3BsaXRCcmlja0ZvclR3b1BhcnQoc3BsaXR0ZWRUZXh0LmxlZnQsIHNwbGl0dGVkVGV4dC5yaWdodCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGN1cnNvciBhdCBlbmQgLSB0ZXh0J3MgZXhpc3QgLSBjcmVhdGUgbmV3IGFuZCBmb2N1cyBvbiBpdFxuICAgICAgICAgICAgICAgIHRoaXMuYWRkRW1wdHlCcmlja0FmdGVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoc3BsaXR0ZWRUZXh0LnJpZ2h0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIC8vIGN1cnNvciBhdCBzdGFydCwgdGV4dCBleGlzdHMgLSBqdXN0IGNyZWF0ZSBuZXcgbGluZSBhdCB0b3AsIGRvIG5vdCBtb3ZlIGZvY3VzXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRFbXB0eVRleHRCcmlja0JlZm9yZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyB0aGVyZSBhcmUgbm8gdGV4dCBhdCBhbGwgLSBjcmVhdGUgbmV3IGFuZCBmb2N1cyBvbiBpdFxuICAgICAgICAgICAgICAgIHRoaXMuYWRkRW1wdHlCcmlja0FmdGVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNwbGl0QnJpY2tGb3JUd29QYXJ0KGxlZnQ6IHN0cmluZywgcmlnaHQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLmFkZEJyaWNrQWZ0ZXIocmlnaHQpO1xuXG4gICAgICAgIHRoaXMuYmFzZVRleHRCcmlja0NvbXBvbmVudC5zZXRUZXh0U3RhdGUobGVmdCk7XG4gICAgICAgIHRoaXMuYmFzZVRleHRCcmlja0NvbXBvbmVudC5zYXZlQ3VycmVudFN0YXRlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRFbXB0eVRleHRCcmlja0JlZm9yZSgpIHtcbiAgICAgICAgY29uc3QgbmV3VGV4dFN0YXRlID0ge1xuICAgICAgICAgICAgdGV4dDogJycsXG4gICAgICAgICAgICB0YWJzOiB0aGlzLmJhc2VUZXh0QnJpY2tDb21wb25lbnQuc2NvcGUudGFic1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuYmFzZVRleHRCcmlja0NvbXBvbmVudC53YWxsTW9kZWwuYXBpLmNvcmVcbiAgICAgICAgICAgIC5hZGRCcmlja0JlZm9yZUJyaWNrSWQodGhpcy5iYXNlVGV4dEJyaWNrQ29tcG9uZW50LmlkLCAndGV4dCcsIG5ld1RleHRTdGF0ZSk7XG5cbiAgICAgICAgLy8gc2Nyb2xsIGJyb3dzZXIgdmlldyB0byBlbGVtZW50XG4gICAgICAgIHRoaXMuYmFzZVRleHRCcmlja0NvbXBvbmVudC5lZGl0b3IubmF0aXZlRWxlbWVudC5zY3JvbGxJbnRvVmlldyh7XG4gICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCcsXG4gICAgICAgICAgICBibG9jazogJ2NlbnRlcicsXG4gICAgICAgICAgICBpbmxpbmU6ICdzdGFydCdcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRFbXB0eUJyaWNrQWZ0ZXIoKSB7XG4gICAgICAgIC8vIGN1cnNvciBhdCBlbmQgLSB0ZXh0J3MgZXhpc3QgLSBjcmVhdGUgbmV3IGFuZCBmb2N1cyBvbiBpdFxuICAgICAgICB0aGlzLmFkZEJyaWNrQWZ0ZXIoJycpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkQnJpY2tBZnRlcih0ZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgbmV3VGV4dFN0YXRlID0ge1xuICAgICAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgICAgIHRhYnM6IHRoaXMuYmFzZVRleHRCcmlja0NvbXBvbmVudC5zY29wZS50YWJzXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgYWRkZWRCcmljayA9IHRoaXMuYmFzZVRleHRCcmlja0NvbXBvbmVudC53YWxsTW9kZWwuYXBpLmNvcmVcbiAgICAgICAgICAgIC5hZGRCcmlja0FmdGVyQnJpY2tJZCh0aGlzLmJhc2VUZXh0QnJpY2tDb21wb25lbnQuaWQsICd0ZXh0JywgbmV3VGV4dFN0YXRlKTtcblxuICAgICAgICAvLyB3YWl0IG9uZSB0aWNrIGZvciBjb21wb25lbnQgcmVuZGVyaW5nXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5iYXNlVGV4dEJyaWNrQ29tcG9uZW50LndhbGxVaUFwaS5mb2N1c09uQnJpY2tJZChhZGRlZEJyaWNrLmlkKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19