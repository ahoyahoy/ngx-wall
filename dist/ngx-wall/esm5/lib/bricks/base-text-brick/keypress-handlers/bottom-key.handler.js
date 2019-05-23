/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FOCUS_INITIATOR } from '../base-text-brick.constant';
var BottomKeyHandler = /** @class */ (function () {
    function BottomKeyHandler(baseTextBrickComponent) {
        this.baseTextBrickComponent = baseTextBrickComponent;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    BottomKeyHandler.prototype.execute = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (this.baseTextBrickComponent.isCaretAtLastLine()) {
            e.preventDefault();
            /** @type {?} */
            var caretLeftCoordinate = this.baseTextBrickComponent.getCaretLeftCoordinate();
            /** @type {?} */
            var focusContext = {
                initiator: FOCUS_INITIATOR,
                details: {
                    bottomKey: true,
                    caretLeftCoordinate: caretLeftCoordinate
                }
            };
            this.baseTextBrickComponent.wallUiApi.focusOnNextTextBrick(this.baseTextBrickComponent.id, focusContext);
        }
    };
    return BottomKeyHandler;
}());
export { BottomKeyHandler };
if (false) {
    /**
     * @type {?}
     * @private
     */
    BottomKeyHandler.prototype.baseTextBrickComponent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm90dG9tLWtleS5oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvYnJpY2tzL2Jhc2UtdGV4dC1icmljay9rZXlwcmVzcy1oYW5kbGVycy9ib3R0b20ta2V5LmhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUU1RDtJQUNJLDBCQUFvQixzQkFBOEM7UUFBOUMsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtJQUNsRSxDQUFDOzs7OztJQUVELGtDQUFPOzs7O0lBQVAsVUFBUSxDQUFnQjtRQUNwQixJQUFJLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFO1lBQ2pELENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7Z0JBRWIsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLHNCQUFzQixFQUFFOztnQkFFMUUsWUFBWSxHQUFrQjtnQkFDaEMsU0FBUyxFQUFFLGVBQWU7Z0JBQzFCLE9BQU8sRUFBRTtvQkFDTCxTQUFTLEVBQUUsSUFBSTtvQkFDZixtQkFBbUIscUJBQUE7aUJBQ3RCO2FBQ0o7WUFFRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7U0FDNUc7SUFDTCxDQUFDO0lBQ0wsdUJBQUM7QUFBRCxDQUFDLEFBckJELElBcUJDOzs7Ozs7O0lBcEJlLGtEQUFzRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SUZvY3VzQ29udGV4dH0gZnJvbSAnLi4vLi4vLi4vd2FsbC93YWxsJztcbmltcG9ydCB7QmFzZVRleHRCcmlja0NvbXBvbmVudH0gZnJvbSAnLi4vYmFzZS10ZXh0LWJyaWNrLmNvbXBvbmVudCc7XG5pbXBvcnQge0ZPQ1VTX0lOSVRJQVRPUn0gZnJvbSAnLi4vYmFzZS10ZXh0LWJyaWNrLmNvbnN0YW50JztcblxuZXhwb3J0IGNsYXNzIEJvdHRvbUtleUhhbmRsZXIge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYmFzZVRleHRCcmlja0NvbXBvbmVudDogQmFzZVRleHRCcmlja0NvbXBvbmVudCkge1xuICAgIH1cblxuICAgIGV4ZWN1dGUoZTogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5iYXNlVGV4dEJyaWNrQ29tcG9uZW50LmlzQ2FyZXRBdExhc3RMaW5lKCkpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgY29uc3QgY2FyZXRMZWZ0Q29vcmRpbmF0ZSA9IHRoaXMuYmFzZVRleHRCcmlja0NvbXBvbmVudC5nZXRDYXJldExlZnRDb29yZGluYXRlKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGZvY3VzQ29udGV4dDogSUZvY3VzQ29udGV4dCA9IHtcbiAgICAgICAgICAgICAgICBpbml0aWF0b3I6IEZPQ1VTX0lOSVRJQVRPUixcbiAgICAgICAgICAgICAgICBkZXRhaWxzOiB7XG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbUtleTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY2FyZXRMZWZ0Q29vcmRpbmF0ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuYmFzZVRleHRCcmlja0NvbXBvbmVudC53YWxsVWlBcGkuZm9jdXNPbk5leHRUZXh0QnJpY2sodGhpcy5iYXNlVGV4dEJyaWNrQ29tcG9uZW50LmlkLCBmb2N1c0NvbnRleHQpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19