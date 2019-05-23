/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FOCUS_INITIATOR } from '../base-text-brick.constant';
var TopKeyHandler = /** @class */ (function () {
    function TopKeyHandler(baseTextBrickComponent) {
        this.baseTextBrickComponent = baseTextBrickComponent;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    TopKeyHandler.prototype.execute = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var caretLeftCoordinate = this.baseTextBrickComponent.getCaretLeftCoordinate();
        if (this.baseTextBrickComponent.isCaretAtFirstLine()) {
            e.preventDefault();
            /** @type {?} */
            var focusContext = {
                initiator: FOCUS_INITIATOR,
                details: {
                    topKey: true,
                    caretLeftCoordinate: caretLeftCoordinate
                }
            };
            this.baseTextBrickComponent.wallModel.api.ui
                .focusOnPreviousTextBrick(this.baseTextBrickComponent.id, focusContext);
        }
    };
    return TopKeyHandler;
}());
export { TopKeyHandler };
if (false) {
    /**
     * @type {?}
     * @private
     */
    TopKeyHandler.prototype.baseTextBrickComponent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9wLWtleS5oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvYnJpY2tzL2Jhc2UtdGV4dC1icmljay9rZXlwcmVzcy1oYW5kbGVycy90b3Ata2V5LmhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUU1RDtJQUNJLHVCQUFvQixzQkFBOEM7UUFBOUMsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtJQUNsRSxDQUFDOzs7OztJQUVELCtCQUFPOzs7O0lBQVAsVUFBUSxDQUFnQjs7WUFDZCxtQkFBbUIsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsc0JBQXNCLEVBQUU7UUFFaEYsSUFBSSxJQUFJLENBQUMsc0JBQXNCLENBQUMsa0JBQWtCLEVBQUUsRUFBRTtZQUNsRCxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7O2dCQUViLFlBQVksR0FBa0I7Z0JBQ2hDLFNBQVMsRUFBRSxlQUFlO2dCQUMxQixPQUFPLEVBQUU7b0JBQ0wsTUFBTSxFQUFFLElBQUk7b0JBQ1osbUJBQW1CLHFCQUFBO2lCQUN0QjthQUNKO1lBRUQsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTtpQkFDdkMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQztTQUMvRTtJQUNMLENBQUM7SUFDTCxvQkFBQztBQUFELENBQUMsQUF0QkQsSUFzQkM7Ozs7Ozs7SUFyQmUsK0NBQXNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJRm9jdXNDb250ZXh0fSBmcm9tICcuLi8uLi8uLi93YWxsL3dhbGwnO1xuaW1wb3J0IHtCYXNlVGV4dEJyaWNrQ29tcG9uZW50fSBmcm9tICcuLi9iYXNlLXRleHQtYnJpY2suY29tcG9uZW50JztcbmltcG9ydCB7Rk9DVVNfSU5JVElBVE9SfSBmcm9tICcuLi9iYXNlLXRleHQtYnJpY2suY29uc3RhbnQnO1xuXG5leHBvcnQgY2xhc3MgVG9wS2V5SGFuZGxlciB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBiYXNlVGV4dEJyaWNrQ29tcG9uZW50OiBCYXNlVGV4dEJyaWNrQ29tcG9uZW50KSB7XG4gICAgfVxuXG4gICAgZXhlY3V0ZShlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGNhcmV0TGVmdENvb3JkaW5hdGUgPSB0aGlzLmJhc2VUZXh0QnJpY2tDb21wb25lbnQuZ2V0Q2FyZXRMZWZ0Q29vcmRpbmF0ZSgpO1xuXG4gICAgICAgIGlmICh0aGlzLmJhc2VUZXh0QnJpY2tDb21wb25lbnQuaXNDYXJldEF0Rmlyc3RMaW5lKCkpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgY29uc3QgZm9jdXNDb250ZXh0OiBJRm9jdXNDb250ZXh0ID0ge1xuICAgICAgICAgICAgICAgIGluaXRpYXRvcjogRk9DVVNfSU5JVElBVE9SLFxuICAgICAgICAgICAgICAgIGRldGFpbHM6IHtcbiAgICAgICAgICAgICAgICAgICAgdG9wS2V5OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjYXJldExlZnRDb29yZGluYXRlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5iYXNlVGV4dEJyaWNrQ29tcG9uZW50LndhbGxNb2RlbC5hcGkudWlcbiAgICAgICAgICAgICAgICAuZm9jdXNPblByZXZpb3VzVGV4dEJyaWNrKHRoaXMuYmFzZVRleHRCcmlja0NvbXBvbmVudC5pZCwgZm9jdXNDb250ZXh0KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==