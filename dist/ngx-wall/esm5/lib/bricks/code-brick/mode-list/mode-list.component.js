/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Inject } from '@angular/core';
import { STICKY_MODAL_DATA, StickyModalRef } from 'ngx-sticky-modal';
/**
 * @record
 */
export function IModeListComponentConfig() { }
if (false) {
    /** @type {?} */
    IModeListComponentConfig.prototype.modes;
}
var ModeListComponent = /** @class */ (function () {
    function ModeListComponent(config, ngxStickyModalRef) {
        this.config = config;
        this.ngxStickyModalRef = ngxStickyModalRef;
    }
    /**
     * @param {?} mode
     * @return {?}
     */
    ModeListComponent.prototype.onSelected = /**
     * @param {?} mode
     * @return {?}
     */
    function (mode) {
        this.ngxStickyModalRef.close(mode);
    };
    ModeListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'w-mode-list-component',
                    template: "<div class=\"w-context-panel mat-elevation-z4\">\n    <mat-action-list>\n        <button mat-list-item *ngFor=\"let mode of config.modes\" (click)=\"onSelected(mode)\">\n            {{mode.name}}\n        </button>\n    </mat-action-list>\n</div>\n"
                }] }
    ];
    /** @nocollapse */
    ModeListComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [STICKY_MODAL_DATA,] }] },
        { type: StickyModalRef }
    ]; };
    return ModeListComponent;
}());
export { ModeListComponent };
if (false) {
    /** @type {?} */
    ModeListComponent.prototype.config;
    /**
     * @type {?}
     * @private
     */
    ModeListComponent.prototype.ngxStickyModalRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZS1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL2JyaWNrcy9jb2RlLWJyaWNrL21vZGUtbGlzdC9tb2RlLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNoRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsY0FBYyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7Ozs7QUFFbkUsOENBRUM7OztJQURHLHlDQUF5Qzs7QUFHN0M7SUFLSSwyQkFBOEMsTUFBZ0MsRUFDMUQsaUJBQWlDO1FBRFAsV0FBTSxHQUFOLE1BQU0sQ0FBMEI7UUFDMUQsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFnQjtJQUNyRCxDQUFDOzs7OztJQUVELHNDQUFVOzs7O0lBQVYsVUFBVyxJQUFZO1FBQ25CLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7Z0JBWEosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLG9RQUF5QztpQkFDNUM7Ozs7Z0RBRWdCLE1BQU0sU0FBQyxpQkFBaUI7Z0JBWGQsY0FBYzs7SUFrQnpDLHdCQUFDO0NBQUEsQUFaRCxJQVlDO1NBUlksaUJBQWlCOzs7SUFDZCxtQ0FBa0U7Ozs7O0lBQ2xFLDhDQUF5QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbmplY3R9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTVElDS1lfTU9EQUxfREFUQSwgU3RpY2t5TW9kYWxSZWZ9IGZyb20gJ25neC1zdGlja3ktbW9kYWwnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElNb2RlTGlzdENvbXBvbmVudENvbmZpZyB7XG4gICAgbW9kZXM6IHsgdmFsdWU6IHN0cmluZywgbmFtZTogc3RyaW5nIH1bXTtcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd3LW1vZGUtbGlzdC1jb21wb25lbnQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9tb2RlLWxpc3QuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIE1vZGVMaXN0Q29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KFNUSUNLWV9NT0RBTF9EQVRBKSBwdWJsaWMgY29uZmlnOiBJTW9kZUxpc3RDb21wb25lbnRDb25maWcsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBuZ3hTdGlja3lNb2RhbFJlZjogU3RpY2t5TW9kYWxSZWYpIHtcbiAgICB9XG5cbiAgICBvblNlbGVjdGVkKG1vZGU6IHN0cmluZykge1xuICAgICAgICB0aGlzLm5neFN0aWNreU1vZGFsUmVmLmNsb3NlKG1vZGUpO1xuICAgIH1cbn1cbiJdfQ==