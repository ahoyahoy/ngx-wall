/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class EnterKeyHandler {
    /**
     * @param {?} baseTextBrickComponent
     */
    constructor(baseTextBrickComponent) {
        this.baseTextBrickComponent = baseTextBrickComponent;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    execute(e) {
        e.preventDefault();
        /** @type {?} */
        const sel = window.getSelection();
        /** @type {?} */
        const splittedText = this.baseTextBrickComponent.getSplittedText(sel.focusOffset, sel.focusNode);
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
    }
    /**
     * @private
     * @param {?} left
     * @param {?} right
     * @return {?}
     */
    splitBrickForTwoPart(left, right) {
        this.addBrickAfter(right);
        this.baseTextBrickComponent.setTextState(left);
        this.baseTextBrickComponent.saveCurrentState();
    }
    /**
     * @private
     * @return {?}
     */
    addEmptyTextBrickBefore() {
        /** @type {?} */
        const newTextState = {
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
    }
    /**
     * @private
     * @return {?}
     */
    addEmptyBrickAfter() {
        // cursor at end - text's exist - create new and focus on it
        this.addBrickAfter('');
    }
    /**
     * @private
     * @param {?} text
     * @return {?}
     */
    addBrickAfter(text) {
        /** @type {?} */
        const newTextState = {
            text: text,
            tabs: this.baseTextBrickComponent.scope.tabs
        };
        /** @type {?} */
        const addedBrick = this.baseTextBrickComponent.wallModel.api.core
            .addBrickAfterBrickId(this.baseTextBrickComponent.id, 'text', newTextState);
        // wait one tick for component rendering
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.baseTextBrickComponent.wallUiApi.focusOnBrickId(addedBrick.id);
        }));
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    EnterKeyHandler.prototype.baseTextBrickComponent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50ZXIta2V5LmhhbmRsZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9icmlja3MvYmFzZS10ZXh0LWJyaWNrL2tleXByZXNzLWhhbmRsZXJzL2VudGVyLWtleS5oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxNQUFNLE9BQU8sZUFBZTs7OztJQUN4QixZQUFvQixzQkFBOEM7UUFBOUMsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtJQUNsRSxDQUFDOzs7OztJQUVELE9BQU8sQ0FBQyxDQUFnQjtRQUNwQixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7O2NBRWIsR0FBRyxHQUFHLE1BQU0sQ0FBQyxZQUFZLEVBQUU7O2NBRTNCLFlBQVksR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsZUFBZSxDQUM1RCxHQUFHLENBQUMsV0FBVyxFQUNmLEdBQUcsQ0FBQyxTQUFTLENBQ2hCO1FBRUQsWUFBWSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvRSxZQUFZLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWpGLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDMUIsSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDM0IsK0JBQStCO2dCQUMvQixJQUFJLENBQUMsb0JBQW9CLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDcEU7aUJBQU07Z0JBQ0gsNERBQTREO2dCQUM1RCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzthQUM3QjtTQUNKO2FBQU07WUFDSCxJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO2dCQUMzQixnRkFBZ0Y7Z0JBQ2hGLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO2FBQ2xDO2lCQUFNO2dCQUNILHdEQUF3RDtnQkFDeEQsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7YUFDN0I7U0FDSjtJQUNMLENBQUM7Ozs7Ozs7SUFFTyxvQkFBb0IsQ0FBQyxJQUFZLEVBQUUsS0FBYTtRQUNwRCxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTFCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDbkQsQ0FBQzs7Ozs7SUFFTyx1QkFBdUI7O2NBQ3JCLFlBQVksR0FBRztZQUNqQixJQUFJLEVBQUUsRUFBRTtZQUNSLElBQUksRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLElBQUk7U0FDL0M7UUFFRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJO2FBQ3pDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBRWpGLGlDQUFpQztRQUNqQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUM7WUFDNUQsUUFBUSxFQUFFLFFBQVE7WUFDbEIsS0FBSyxFQUFFLFFBQVE7WUFDZixNQUFNLEVBQUUsT0FBTztTQUNsQixDQUFDLENBQUM7SUFDUCxDQUFDOzs7OztJQUVPLGtCQUFrQjtRQUN0Qiw0REFBNEQ7UUFDNUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMzQixDQUFDOzs7Ozs7SUFFTyxhQUFhLENBQUMsSUFBWTs7Y0FDeEIsWUFBWSxHQUFHO1lBQ2pCLElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsSUFBSTtTQUMvQzs7Y0FFSyxVQUFVLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSTthQUM1RCxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxZQUFZLENBQUM7UUFFL0Usd0NBQXdDO1FBQ3hDLFVBQVU7OztRQUFDLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN4RSxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjs7Ozs7O0lBOUVlLGlEQUFzRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QmFzZVRleHRCcmlja0NvbXBvbmVudH0gZnJvbSAnLi4vYmFzZS10ZXh0LWJyaWNrLmNvbXBvbmVudCc7XG5cbmV4cG9ydCBjbGFzcyBFbnRlcktleUhhbmRsZXIge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYmFzZVRleHRCcmlja0NvbXBvbmVudDogQmFzZVRleHRCcmlja0NvbXBvbmVudCkge1xuICAgIH1cblxuICAgIGV4ZWN1dGUoZTogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3Qgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuXG4gICAgICAgIGNvbnN0IHNwbGl0dGVkVGV4dCA9IHRoaXMuYmFzZVRleHRCcmlja0NvbXBvbmVudC5nZXRTcGxpdHRlZFRleHQoXG4gICAgICAgICAgICBzZWwuZm9jdXNPZmZzZXQsXG4gICAgICAgICAgICBzZWwuZm9jdXNOb2RlXG4gICAgICAgICk7XG5cbiAgICAgICAgc3BsaXR0ZWRUZXh0LmxlZnQgPSB0aGlzLmJhc2VUZXh0QnJpY2tDb21wb25lbnQuY2xlYW5VcFRleHQoc3BsaXR0ZWRUZXh0LmxlZnQpO1xuICAgICAgICBzcGxpdHRlZFRleHQucmlnaHQgPSB0aGlzLmJhc2VUZXh0QnJpY2tDb21wb25lbnQuY2xlYW5VcFRleHQoc3BsaXR0ZWRUZXh0LnJpZ2h0KTtcblxuICAgICAgICBpZiAoc3BsaXR0ZWRUZXh0LmxlZnQubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoc3BsaXR0ZWRUZXh0LnJpZ2h0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIC8vIHRleHQgaXMgc3BsaXR0ZWQgdG8gdHdvIHBhcnRcbiAgICAgICAgICAgICAgICB0aGlzLnNwbGl0QnJpY2tGb3JUd29QYXJ0KHNwbGl0dGVkVGV4dC5sZWZ0LCBzcGxpdHRlZFRleHQucmlnaHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBjdXJzb3IgYXQgZW5kIC0gdGV4dCdzIGV4aXN0IC0gY3JlYXRlIG5ldyBhbmQgZm9jdXMgb24gaXRcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEVtcHR5QnJpY2tBZnRlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHNwbGl0dGVkVGV4dC5yaWdodC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAvLyBjdXJzb3IgYXQgc3RhcnQsIHRleHQgZXhpc3RzIC0ganVzdCBjcmVhdGUgbmV3IGxpbmUgYXQgdG9wLCBkbyBub3QgbW92ZSBmb2N1c1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRW1wdHlUZXh0QnJpY2tCZWZvcmUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gdGhlcmUgYXJlIG5vIHRleHQgYXQgYWxsIC0gY3JlYXRlIG5ldyBhbmQgZm9jdXMgb24gaXRcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEVtcHR5QnJpY2tBZnRlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzcGxpdEJyaWNrRm9yVHdvUGFydChsZWZ0OiBzdHJpbmcsIHJpZ2h0OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5hZGRCcmlja0FmdGVyKHJpZ2h0KTtcblxuICAgICAgICB0aGlzLmJhc2VUZXh0QnJpY2tDb21wb25lbnQuc2V0VGV4dFN0YXRlKGxlZnQpO1xuICAgICAgICB0aGlzLmJhc2VUZXh0QnJpY2tDb21wb25lbnQuc2F2ZUN1cnJlbnRTdGF0ZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkRW1wdHlUZXh0QnJpY2tCZWZvcmUoKSB7XG4gICAgICAgIGNvbnN0IG5ld1RleHRTdGF0ZSA9IHtcbiAgICAgICAgICAgIHRleHQ6ICcnLFxuICAgICAgICAgICAgdGFiczogdGhpcy5iYXNlVGV4dEJyaWNrQ29tcG9uZW50LnNjb3BlLnRhYnNcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmJhc2VUZXh0QnJpY2tDb21wb25lbnQud2FsbE1vZGVsLmFwaS5jb3JlXG4gICAgICAgICAgICAuYWRkQnJpY2tCZWZvcmVCcmlja0lkKHRoaXMuYmFzZVRleHRCcmlja0NvbXBvbmVudC5pZCwgJ3RleHQnLCBuZXdUZXh0U3RhdGUpO1xuXG4gICAgICAgIC8vIHNjcm9sbCBicm93c2VyIHZpZXcgdG8gZWxlbWVudFxuICAgICAgICB0aGlzLmJhc2VUZXh0QnJpY2tDb21wb25lbnQuZWRpdG9yLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsSW50b1ZpZXcoe1xuICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnLFxuICAgICAgICAgICAgYmxvY2s6ICdjZW50ZXInLFxuICAgICAgICAgICAgaW5saW5lOiAnc3RhcnQnXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkRW1wdHlCcmlja0FmdGVyKCkge1xuICAgICAgICAvLyBjdXJzb3IgYXQgZW5kIC0gdGV4dCdzIGV4aXN0IC0gY3JlYXRlIG5ldyBhbmQgZm9jdXMgb24gaXRcbiAgICAgICAgdGhpcy5hZGRCcmlja0FmdGVyKCcnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZEJyaWNrQWZ0ZXIodGV4dDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IG5ld1RleHRTdGF0ZSA9IHtcbiAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICB0YWJzOiB0aGlzLmJhc2VUZXh0QnJpY2tDb21wb25lbnQuc2NvcGUudGFic1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGFkZGVkQnJpY2sgPSB0aGlzLmJhc2VUZXh0QnJpY2tDb21wb25lbnQud2FsbE1vZGVsLmFwaS5jb3JlXG4gICAgICAgICAgICAuYWRkQnJpY2tBZnRlckJyaWNrSWQodGhpcy5iYXNlVGV4dEJyaWNrQ29tcG9uZW50LmlkLCAndGV4dCcsIG5ld1RleHRTdGF0ZSk7XG5cbiAgICAgICAgLy8gd2FpdCBvbmUgdGljayBmb3IgY29tcG9uZW50IHJlbmRlcmluZ1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYmFzZVRleHRCcmlja0NvbXBvbmVudC53YWxsVWlBcGkuZm9jdXNPbkJyaWNrSWQoYWRkZWRCcmljay5pZCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==