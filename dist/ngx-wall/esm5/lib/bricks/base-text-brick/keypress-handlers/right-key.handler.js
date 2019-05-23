/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FOCUS_INITIATOR } from '../base-text-brick.constant';
var RightKeyHandler = /** @class */ (function () {
    function RightKeyHandler(baseTextBrickComponent) {
        this.baseTextBrickComponent = baseTextBrickComponent;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    RightKeyHandler.prototype.execute = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        e.preventDefault();
        /** @type {?} */
        var focusContext = {
            initiator: FOCUS_INITIATOR,
            details: {
                rightKey: true
            }
        };
        this.baseTextBrickComponent.wallUiApi.focusOnNextTextBrick(this.baseTextBrickComponent.id, focusContext);
    };
    return RightKeyHandler;
}());
export { RightKeyHandler };
if (false) {
    /**
     * @type {?}
     * @private
     */
    RightKeyHandler.prototype.baseTextBrickComponent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmlnaHQta2V5LmhhbmRsZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9icmlja3MvYmFzZS10ZXh0LWJyaWNrL2tleXByZXNzLWhhbmRsZXJzL3JpZ2h0LWtleS5oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFFNUQ7SUFDSSx5QkFBb0Isc0JBQThDO1FBQTlDLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBd0I7SUFDbEUsQ0FBQzs7Ozs7SUFFRCxpQ0FBTzs7OztJQUFQLFVBQVEsQ0FBZ0I7UUFDcEIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDOztZQUViLFlBQVksR0FBa0I7WUFDaEMsU0FBUyxFQUFFLGVBQWU7WUFDMUIsT0FBTyxFQUFFO2dCQUNMLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1NBQ0o7UUFFRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDN0csQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FBQyxBQWhCRCxJQWdCQzs7Ozs7OztJQWZlLGlEQUFzRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SUZvY3VzQ29udGV4dH0gZnJvbSAnLi4vLi4vLi4vd2FsbC93YWxsJztcbmltcG9ydCB7QmFzZVRleHRCcmlja0NvbXBvbmVudH0gZnJvbSAnLi4vYmFzZS10ZXh0LWJyaWNrLmNvbXBvbmVudCc7XG5pbXBvcnQge0ZPQ1VTX0lOSVRJQVRPUn0gZnJvbSAnLi4vYmFzZS10ZXh0LWJyaWNrLmNvbnN0YW50JztcblxuZXhwb3J0IGNsYXNzIFJpZ2h0S2V5SGFuZGxlciB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBiYXNlVGV4dEJyaWNrQ29tcG9uZW50OiBCYXNlVGV4dEJyaWNrQ29tcG9uZW50KSB7XG4gICAgfVxuXG4gICAgZXhlY3V0ZShlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCBmb2N1c0NvbnRleHQ6IElGb2N1c0NvbnRleHQgPSB7XG4gICAgICAgICAgICBpbml0aWF0b3I6IEZPQ1VTX0lOSVRJQVRPUixcbiAgICAgICAgICAgIGRldGFpbHM6IHtcbiAgICAgICAgICAgICAgICByaWdodEtleTogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuYmFzZVRleHRCcmlja0NvbXBvbmVudC53YWxsVWlBcGkuZm9jdXNPbk5leHRUZXh0QnJpY2sodGhpcy5iYXNlVGV4dEJyaWNrQ29tcG9uZW50LmlkLCBmb2N1c0NvbnRleHQpO1xuICAgIH1cbn1cbiJdfQ==