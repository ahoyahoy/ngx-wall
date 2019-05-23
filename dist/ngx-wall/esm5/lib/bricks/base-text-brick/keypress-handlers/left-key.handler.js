/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FOCUS_INITIATOR } from '../base-text-brick.constant';
var LeftKeyHandler = /** @class */ (function () {
    function LeftKeyHandler(baseTextBrickComponent) {
        this.baseTextBrickComponent = baseTextBrickComponent;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    LeftKeyHandler.prototype.execute = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        e.preventDefault();
        /** @type {?} */
        var focusContext = {
            initiator: FOCUS_INITIATOR,
            details: {
                leftKey: true
            }
        };
        this.baseTextBrickComponent.wallUiApi
            .focusOnPreviousTextBrick(this.baseTextBrickComponent.id, focusContext);
    };
    return LeftKeyHandler;
}());
export { LeftKeyHandler };
if (false) {
    /**
     * @type {?}
     * @private
     */
    LeftKeyHandler.prototype.baseTextBrickComponent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVmdC1rZXkuaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL2JyaWNrcy9iYXNlLXRleHQtYnJpY2sva2V5cHJlc3MtaGFuZGxlcnMvbGVmdC1rZXkuaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBRTVEO0lBQ0ksd0JBQW9CLHNCQUE4QztRQUE5QywyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO0lBQ2xFLENBQUM7Ozs7O0lBRUQsZ0NBQU87Ozs7SUFBUCxVQUFRLENBQWdCO1FBQ3BCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7WUFFYixZQUFZLEdBQWtCO1lBQ2hDLFNBQVMsRUFBRSxlQUFlO1lBQzFCLE9BQU8sRUFBRTtnQkFDTCxPQUFPLEVBQUUsSUFBSTthQUNoQjtTQUNKO1FBRUQsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFNBQVM7YUFDaEMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBakJELElBaUJDOzs7Ozs7O0lBaEJlLGdEQUFzRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SUZvY3VzQ29udGV4dH0gZnJvbSAnLi4vLi4vLi4vd2FsbC93YWxsJztcbmltcG9ydCB7QmFzZVRleHRCcmlja0NvbXBvbmVudH0gZnJvbSAnLi4vYmFzZS10ZXh0LWJyaWNrLmNvbXBvbmVudCc7XG5pbXBvcnQge0ZPQ1VTX0lOSVRJQVRPUn0gZnJvbSAnLi4vYmFzZS10ZXh0LWJyaWNrLmNvbnN0YW50JztcblxuZXhwb3J0IGNsYXNzIExlZnRLZXlIYW5kbGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJhc2VUZXh0QnJpY2tDb21wb25lbnQ6IEJhc2VUZXh0QnJpY2tDb21wb25lbnQpIHtcbiAgICB9XG5cbiAgICBleGVjdXRlKGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0IGZvY3VzQ29udGV4dDogSUZvY3VzQ29udGV4dCA9IHtcbiAgICAgICAgICAgIGluaXRpYXRvcjogRk9DVVNfSU5JVElBVE9SLFxuICAgICAgICAgICAgZGV0YWlsczoge1xuICAgICAgICAgICAgICAgIGxlZnRLZXk6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmJhc2VUZXh0QnJpY2tDb21wb25lbnQud2FsbFVpQXBpXG4gICAgICAgICAgICAuZm9jdXNPblByZXZpb3VzVGV4dEJyaWNrKHRoaXMuYmFzZVRleHRCcmlja0NvbXBvbmVudC5pZCwgZm9jdXNDb250ZXh0KTtcbiAgICB9XG59XG4iXX0=