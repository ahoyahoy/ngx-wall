/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FOCUS_INITIATOR } from '../base-text-brick.constant';
export class RightKeyHandler {
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
        const focusContext = {
            initiator: FOCUS_INITIATOR,
            details: {
                rightKey: true
            }
        };
        this.baseTextBrickComponent.wallUiApi.focusOnNextTextBrick(this.baseTextBrickComponent.id, focusContext);
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    RightKeyHandler.prototype.baseTextBrickComponent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmlnaHQta2V5LmhhbmRsZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9icmlja3MvYmFzZS10ZXh0LWJyaWNrL2tleXByZXNzLWhhbmRsZXJzL3JpZ2h0LWtleS5oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFFNUQsTUFBTSxPQUFPLGVBQWU7Ozs7SUFDeEIsWUFBb0Isc0JBQThDO1FBQTlDLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBd0I7SUFDbEUsQ0FBQzs7Ozs7SUFFRCxPQUFPLENBQUMsQ0FBZ0I7UUFDcEIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDOztjQUViLFlBQVksR0FBa0I7WUFDaEMsU0FBUyxFQUFFLGVBQWU7WUFDMUIsT0FBTyxFQUFFO2dCQUNMLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1NBQ0o7UUFFRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDN0csQ0FBQztDQUNKOzs7Ozs7SUFmZSxpREFBc0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0lGb2N1c0NvbnRleHR9IGZyb20gJy4uLy4uLy4uL3dhbGwvd2FsbCc7XG5pbXBvcnQge0Jhc2VUZXh0QnJpY2tDb21wb25lbnR9IGZyb20gJy4uL2Jhc2UtdGV4dC1icmljay5jb21wb25lbnQnO1xuaW1wb3J0IHtGT0NVU19JTklUSUFUT1J9IGZyb20gJy4uL2Jhc2UtdGV4dC1icmljay5jb25zdGFudCc7XG5cbmV4cG9ydCBjbGFzcyBSaWdodEtleUhhbmRsZXIge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYmFzZVRleHRCcmlja0NvbXBvbmVudDogQmFzZVRleHRCcmlja0NvbXBvbmVudCkge1xuICAgIH1cblxuICAgIGV4ZWN1dGUoZTogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgZm9jdXNDb250ZXh0OiBJRm9jdXNDb250ZXh0ID0ge1xuICAgICAgICAgICAgaW5pdGlhdG9yOiBGT0NVU19JTklUSUFUT1IsXG4gICAgICAgICAgICBkZXRhaWxzOiB7XG4gICAgICAgICAgICAgICAgcmlnaHRLZXk6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmJhc2VUZXh0QnJpY2tDb21wb25lbnQud2FsbFVpQXBpLmZvY3VzT25OZXh0VGV4dEJyaWNrKHRoaXMuYmFzZVRleHRCcmlja0NvbXBvbmVudC5pZCwgZm9jdXNDb250ZXh0KTtcbiAgICB9XG59XG4iXX0=