/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.baseTextBrickComponent.wallUiApi.focusOnBrickId(addedBrick.id);
        }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50ZXIta2V5LmhhbmRsZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9icmlja3MvYmFzZS10ZXh0LWJyaWNrL2tleXByZXNzLWhhbmRsZXJzL2VudGVyLWtleS5oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQTtJQUNJLHlCQUFvQixzQkFBOEM7UUFBOUMsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtJQUNsRSxDQUFDOzs7OztJQUVELGlDQUFPOzs7O0lBQVAsVUFBUSxDQUFnQjtRQUNwQixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7O1lBRWIsR0FBRyxHQUFHLE1BQU0sQ0FBQyxZQUFZLEVBQUU7O1lBRTNCLFlBQVksR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsZUFBZSxDQUM1RCxHQUFHLENBQUMsV0FBVyxFQUNmLEdBQUcsQ0FBQyxTQUFTLENBQ2hCO1FBRUQsWUFBWSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvRSxZQUFZLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWpGLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDMUIsSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDM0IsK0JBQStCO2dCQUMvQixJQUFJLENBQUMsb0JBQW9CLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDcEU7aUJBQU07Z0JBQ0gsNERBQTREO2dCQUM1RCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzthQUM3QjtTQUNKO2FBQU07WUFDSCxJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO2dCQUMzQixnRkFBZ0Y7Z0JBQ2hGLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO2FBQ2xDO2lCQUFNO2dCQUNILHdEQUF3RDtnQkFDeEQsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7YUFDN0I7U0FDSjtJQUNMLENBQUM7Ozs7Ozs7SUFFTyw4Q0FBb0I7Ozs7OztJQUE1QixVQUE2QixJQUFZLEVBQUUsS0FBYTtRQUNwRCxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTFCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDbkQsQ0FBQzs7Ozs7SUFFTyxpREFBdUI7Ozs7SUFBL0I7O1lBQ1UsWUFBWSxHQUFHO1lBQ2pCLElBQUksRUFBRSxFQUFFO1lBQ1IsSUFBSSxFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsSUFBSTtTQUMvQztRQUVELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUk7YUFDekMscUJBQXFCLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFFakYsaUNBQWlDO1FBQ2pDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQztZQUM1RCxRQUFRLEVBQUUsUUFBUTtZQUNsQixLQUFLLEVBQUUsUUFBUTtZQUNmLE1BQU0sRUFBRSxPQUFPO1NBQ2xCLENBQUMsQ0FBQztJQUNQLENBQUM7Ozs7O0lBRU8sNENBQWtCOzs7O0lBQTFCO1FBQ0ksNERBQTREO1FBQzVELElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDM0IsQ0FBQzs7Ozs7O0lBRU8sdUNBQWE7Ozs7O0lBQXJCLFVBQXNCLElBQVk7UUFBbEMsaUJBYUM7O1lBWlMsWUFBWSxHQUFHO1lBQ2pCLElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsSUFBSTtTQUMvQzs7WUFFSyxVQUFVLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSTthQUM1RCxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxZQUFZLENBQUM7UUFFL0Usd0NBQXdDO1FBQ3hDLFVBQVU7OztRQUFDO1lBQ1AsS0FBSSxDQUFDLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3hFLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FBQyxBQS9FRCxJQStFQzs7Ozs7OztJQTlFZSxpREFBc0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Jhc2VUZXh0QnJpY2tDb21wb25lbnR9IGZyb20gJy4uL2Jhc2UtdGV4dC1icmljay5jb21wb25lbnQnO1xuXG5leHBvcnQgY2xhc3MgRW50ZXJLZXlIYW5kbGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJhc2VUZXh0QnJpY2tDb21wb25lbnQ6IEJhc2VUZXh0QnJpY2tDb21wb25lbnQpIHtcbiAgICB9XG5cbiAgICBleGVjdXRlKGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcblxuICAgICAgICBjb25zdCBzcGxpdHRlZFRleHQgPSB0aGlzLmJhc2VUZXh0QnJpY2tDb21wb25lbnQuZ2V0U3BsaXR0ZWRUZXh0KFxuICAgICAgICAgICAgc2VsLmZvY3VzT2Zmc2V0LFxuICAgICAgICAgICAgc2VsLmZvY3VzTm9kZVxuICAgICAgICApO1xuXG4gICAgICAgIHNwbGl0dGVkVGV4dC5sZWZ0ID0gdGhpcy5iYXNlVGV4dEJyaWNrQ29tcG9uZW50LmNsZWFuVXBUZXh0KHNwbGl0dGVkVGV4dC5sZWZ0KTtcbiAgICAgICAgc3BsaXR0ZWRUZXh0LnJpZ2h0ID0gdGhpcy5iYXNlVGV4dEJyaWNrQ29tcG9uZW50LmNsZWFuVXBUZXh0KHNwbGl0dGVkVGV4dC5yaWdodCk7XG5cbiAgICAgICAgaWYgKHNwbGl0dGVkVGV4dC5sZWZ0Lmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKHNwbGl0dGVkVGV4dC5yaWdodC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAvLyB0ZXh0IGlzIHNwbGl0dGVkIHRvIHR3byBwYXJ0XG4gICAgICAgICAgICAgICAgdGhpcy5zcGxpdEJyaWNrRm9yVHdvUGFydChzcGxpdHRlZFRleHQubGVmdCwgc3BsaXR0ZWRUZXh0LnJpZ2h0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gY3Vyc29yIGF0IGVuZCAtIHRleHQncyBleGlzdCAtIGNyZWF0ZSBuZXcgYW5kIGZvY3VzIG9uIGl0XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRFbXB0eUJyaWNrQWZ0ZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChzcGxpdHRlZFRleHQucmlnaHQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgLy8gY3Vyc29yIGF0IHN0YXJ0LCB0ZXh0IGV4aXN0cyAtIGp1c3QgY3JlYXRlIG5ldyBsaW5lIGF0IHRvcCwgZG8gbm90IG1vdmUgZm9jdXNcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEVtcHR5VGV4dEJyaWNrQmVmb3JlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIHRoZXJlIGFyZSBubyB0ZXh0IGF0IGFsbCAtIGNyZWF0ZSBuZXcgYW5kIGZvY3VzIG9uIGl0XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRFbXB0eUJyaWNrQWZ0ZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc3BsaXRCcmlja0ZvclR3b1BhcnQobGVmdDogc3RyaW5nLCByaWdodDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuYWRkQnJpY2tBZnRlcihyaWdodCk7XG5cbiAgICAgICAgdGhpcy5iYXNlVGV4dEJyaWNrQ29tcG9uZW50LnNldFRleHRTdGF0ZShsZWZ0KTtcbiAgICAgICAgdGhpcy5iYXNlVGV4dEJyaWNrQ29tcG9uZW50LnNhdmVDdXJyZW50U3RhdGUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZEVtcHR5VGV4dEJyaWNrQmVmb3JlKCkge1xuICAgICAgICBjb25zdCBuZXdUZXh0U3RhdGUgPSB7XG4gICAgICAgICAgICB0ZXh0OiAnJyxcbiAgICAgICAgICAgIHRhYnM6IHRoaXMuYmFzZVRleHRCcmlja0NvbXBvbmVudC5zY29wZS50YWJzXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5iYXNlVGV4dEJyaWNrQ29tcG9uZW50LndhbGxNb2RlbC5hcGkuY29yZVxuICAgICAgICAgICAgLmFkZEJyaWNrQmVmb3JlQnJpY2tJZCh0aGlzLmJhc2VUZXh0QnJpY2tDb21wb25lbnQuaWQsICd0ZXh0JywgbmV3VGV4dFN0YXRlKTtcblxuICAgICAgICAvLyBzY3JvbGwgYnJvd3NlciB2aWV3IHRvIGVsZW1lbnRcbiAgICAgICAgdGhpcy5iYXNlVGV4dEJyaWNrQ29tcG9uZW50LmVkaXRvci5uYXRpdmVFbGVtZW50LnNjcm9sbEludG9WaWV3KHtcbiAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJyxcbiAgICAgICAgICAgIGJsb2NrOiAnY2VudGVyJyxcbiAgICAgICAgICAgIGlubGluZTogJ3N0YXJ0J1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZEVtcHR5QnJpY2tBZnRlcigpIHtcbiAgICAgICAgLy8gY3Vyc29yIGF0IGVuZCAtIHRleHQncyBleGlzdCAtIGNyZWF0ZSBuZXcgYW5kIGZvY3VzIG9uIGl0XG4gICAgICAgIHRoaXMuYWRkQnJpY2tBZnRlcignJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRCcmlja0FmdGVyKHRleHQ6IHN0cmluZykge1xuICAgICAgICBjb25zdCBuZXdUZXh0U3RhdGUgPSB7XG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICAgICAgdGFiczogdGhpcy5iYXNlVGV4dEJyaWNrQ29tcG9uZW50LnNjb3BlLnRhYnNcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBhZGRlZEJyaWNrID0gdGhpcy5iYXNlVGV4dEJyaWNrQ29tcG9uZW50LndhbGxNb2RlbC5hcGkuY29yZVxuICAgICAgICAgICAgLmFkZEJyaWNrQWZ0ZXJCcmlja0lkKHRoaXMuYmFzZVRleHRCcmlja0NvbXBvbmVudC5pZCwgJ3RleHQnLCBuZXdUZXh0U3RhdGUpO1xuXG4gICAgICAgIC8vIHdhaXQgb25lIHRpY2sgZm9yIGNvbXBvbmVudCByZW5kZXJpbmdcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmJhc2VUZXh0QnJpY2tDb21wb25lbnQud2FsbFVpQXBpLmZvY3VzT25Ccmlja0lkKGFkZGVkQnJpY2suaWQpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=