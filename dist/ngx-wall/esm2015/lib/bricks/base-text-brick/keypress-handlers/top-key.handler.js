/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FOCUS_INITIATOR } from '../base-text-brick.constant';
export class TopKeyHandler {
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
        /** @type {?} */
        const caretLeftCoordinate = this.baseTextBrickComponent.getCaretLeftCoordinate();
        if (this.baseTextBrickComponent.isCaretAtFirstLine()) {
            e.preventDefault();
            /** @type {?} */
            const focusContext = {
                initiator: FOCUS_INITIATOR,
                details: {
                    topKey: true,
                    caretLeftCoordinate
                }
            };
            this.baseTextBrickComponent.wallModel.api.ui
                .focusOnPreviousTextBrick(this.baseTextBrickComponent.id, focusContext);
        }
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    TopKeyHandler.prototype.baseTextBrickComponent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9wLWtleS5oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvYnJpY2tzL2Jhc2UtdGV4dC1icmljay9rZXlwcmVzcy1oYW5kbGVycy90b3Ata2V5LmhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUU1RCxNQUFNLE9BQU8sYUFBYTs7OztJQUN0QixZQUFvQixzQkFBOEM7UUFBOUMsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtJQUNsRSxDQUFDOzs7OztJQUVELE9BQU8sQ0FBQyxDQUFnQjs7Y0FDZCxtQkFBbUIsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsc0JBQXNCLEVBQUU7UUFFaEYsSUFBSSxJQUFJLENBQUMsc0JBQXNCLENBQUMsa0JBQWtCLEVBQUUsRUFBRTtZQUNsRCxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7O2tCQUViLFlBQVksR0FBa0I7Z0JBQ2hDLFNBQVMsRUFBRSxlQUFlO2dCQUMxQixPQUFPLEVBQUU7b0JBQ0wsTUFBTSxFQUFFLElBQUk7b0JBQ1osbUJBQW1CO2lCQUN0QjthQUNKO1lBRUQsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTtpQkFDdkMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQztTQUMvRTtJQUNMLENBQUM7Q0FDSjs7Ozs7O0lBckJlLCtDQUFzRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SUZvY3VzQ29udGV4dH0gZnJvbSAnLi4vLi4vLi4vd2FsbC93YWxsJztcbmltcG9ydCB7QmFzZVRleHRCcmlja0NvbXBvbmVudH0gZnJvbSAnLi4vYmFzZS10ZXh0LWJyaWNrLmNvbXBvbmVudCc7XG5pbXBvcnQge0ZPQ1VTX0lOSVRJQVRPUn0gZnJvbSAnLi4vYmFzZS10ZXh0LWJyaWNrLmNvbnN0YW50JztcblxuZXhwb3J0IGNsYXNzIFRvcEtleUhhbmRsZXIge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYmFzZVRleHRCcmlja0NvbXBvbmVudDogQmFzZVRleHRCcmlja0NvbXBvbmVudCkge1xuICAgIH1cblxuICAgIGV4ZWN1dGUoZTogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBjb25zdCBjYXJldExlZnRDb29yZGluYXRlID0gdGhpcy5iYXNlVGV4dEJyaWNrQ29tcG9uZW50LmdldENhcmV0TGVmdENvb3JkaW5hdGUoKTtcblxuICAgICAgICBpZiAodGhpcy5iYXNlVGV4dEJyaWNrQ29tcG9uZW50LmlzQ2FyZXRBdEZpcnN0TGluZSgpKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGZvY3VzQ29udGV4dDogSUZvY3VzQ29udGV4dCA9IHtcbiAgICAgICAgICAgICAgICBpbml0aWF0b3I6IEZPQ1VTX0lOSVRJQVRPUixcbiAgICAgICAgICAgICAgICBkZXRhaWxzOiB7XG4gICAgICAgICAgICAgICAgICAgIHRvcEtleTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY2FyZXRMZWZ0Q29vcmRpbmF0ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuYmFzZVRleHRCcmlja0NvbXBvbmVudC53YWxsTW9kZWwuYXBpLnVpXG4gICAgICAgICAgICAgICAgLmZvY3VzT25QcmV2aW91c1RleHRCcmljayh0aGlzLmJhc2VUZXh0QnJpY2tDb21wb25lbnQuaWQsIGZvY3VzQ29udGV4dCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=