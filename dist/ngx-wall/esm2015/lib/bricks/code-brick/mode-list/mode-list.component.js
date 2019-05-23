/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
export class ModeListComponent {
    /**
     * @param {?} config
     * @param {?} ngxStickyModalRef
     */
    constructor(config, ngxStickyModalRef) {
        this.config = config;
        this.ngxStickyModalRef = ngxStickyModalRef;
    }
    /**
     * @param {?} mode
     * @return {?}
     */
    onSelected(mode) {
        this.ngxStickyModalRef.close(mode);
    }
}
ModeListComponent.decorators = [
    { type: Component, args: [{
                selector: 'w-mode-list-component',
                template: "<div class=\"w-context-panel mat-elevation-z4\">\n    <mat-action-list>\n        <button mat-list-item *ngFor=\"let mode of config.modes\" (click)=\"onSelected(mode)\">\n            {{mode.name}}\n        </button>\n    </mat-action-list>\n</div>\n"
            }] }
];
/** @nocollapse */
ModeListComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [STICKY_MODAL_DATA,] }] },
    { type: StickyModalRef }
];
if (false) {
    /** @type {?} */
    ModeListComponent.prototype.config;
    /**
     * @type {?}
     * @private
     */
    ModeListComponent.prototype.ngxStickyModalRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZS1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL2JyaWNrcy9jb2RlLWJyaWNrL21vZGUtbGlzdC9tb2RlLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNoRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsY0FBYyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7Ozs7QUFFbkUsOENBRUM7OztJQURHLHlDQUF5Qzs7QUFPN0MsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7SUFDMUIsWUFBOEMsTUFBZ0MsRUFDMUQsaUJBQWlDO1FBRFAsV0FBTSxHQUFOLE1BQU0sQ0FBMEI7UUFDMUQsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFnQjtJQUNyRCxDQUFDOzs7OztJQUVELFVBQVUsQ0FBQyxJQUFZO1FBQ25CLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7O1lBWEosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLG9RQUF5QzthQUM1Qzs7Ozs0Q0FFZ0IsTUFBTSxTQUFDLGlCQUFpQjtZQVhkLGNBQWM7Ozs7SUFXekIsbUNBQWtFOzs7OztJQUNsRSw4Q0FBeUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5qZWN0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U1RJQ0tZX01PREFMX0RBVEEsIFN0aWNreU1vZGFsUmVmfSBmcm9tICduZ3gtc3RpY2t5LW1vZGFsJztcblxuZXhwb3J0IGludGVyZmFjZSBJTW9kZUxpc3RDb21wb25lbnRDb25maWcge1xuICAgIG1vZGVzOiB7IHZhbHVlOiBzdHJpbmcsIG5hbWU6IHN0cmluZyB9W107XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndy1tb2RlLWxpc3QtY29tcG9uZW50JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbW9kZS1saXN0LmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBNb2RlTGlzdENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IoQEluamVjdChTVElDS1lfTU9EQUxfREFUQSkgcHVibGljIGNvbmZpZzogSU1vZGVMaXN0Q29tcG9uZW50Q29uZmlnLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgbmd4U3RpY2t5TW9kYWxSZWY6IFN0aWNreU1vZGFsUmVmKSB7XG4gICAgfVxuXG4gICAgb25TZWxlY3RlZChtb2RlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5uZ3hTdGlja3lNb2RhbFJlZi5jbG9zZShtb2RlKTtcbiAgICB9XG59XG4iXX0=