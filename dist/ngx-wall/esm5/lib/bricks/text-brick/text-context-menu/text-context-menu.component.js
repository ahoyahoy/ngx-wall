/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { STICKY_MODAL_DATA } from 'ngx-sticky-modal';
/**
 * @record
 */
export function ITextContextMenuComponent() { }
if (false) {
    /** @type {?} */
    ITextContextMenuComponent.prototype.api;
}
var TextContextMenuComponent = /** @class */ (function () {
    function TextContextMenuComponent(config) {
        this.config = config;
        this.ui = {
            showLinkForm: false
        };
    }
    /**
     * @return {?}
     */
    TextContextMenuComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.config.api.saveSelection();
    };
    /**
     * @return {?}
     */
    TextContextMenuComponent.prototype.bold = /**
     * @return {?}
     */
    function () {
        this.config.api.bold();
    };
    /**
     * @return {?}
     */
    TextContextMenuComponent.prototype.italic = /**
     * @return {?}
     */
    function () {
        this.config.api.italic();
    };
    /**
     * @return {?}
     */
    TextContextMenuComponent.prototype.link = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.switchLinkFormVisibility();
        if (this.ui.showLinkForm) {
            this.config.api.saveSelection();
            setTimeout((/**
             * @return {?}
             */
            function () {
                if (_this.config.api.isLinkSelected()) {
                    _this.linkEl.nativeElement.value = _this.config.api.getSelectedLinkHref();
                }
                _this.linkEl.nativeElement.focus();
            }));
        }
        else {
            this.config.api.restoreSelection();
        }
    };
    /**
     * @return {?}
     */
    TextContextMenuComponent.prototype.applyLink = /**
     * @return {?}
     */
    function () {
        this.config.api.restoreSelection();
        if (this.config.api.isLinkSelected()) {
            this.config.api.changeLinkUrl(this.linkEl.nativeElement.value);
        }
        else {
            this.config.api.createLink(this.linkEl.nativeElement.value);
        }
        this.switchLinkFormVisibility();
    };
    /**
     * @return {?}
     */
    TextContextMenuComponent.prototype.unlink = /**
     * @return {?}
     */
    function () {
        this.config.api.restoreSelection();
        this.config.api.unlink();
        this.switchLinkFormVisibility();
    };
    /**
     * @return {?}
     */
    TextContextMenuComponent.prototype.switchLinkFormVisibility = /**
     * @return {?}
     */
    function () {
        this.ui.showLinkForm = !this.ui.showLinkForm;
    };
    TextContextMenuComponent.decorators = [
        { type: Component, args: [{
                    selector: 'w-text-context-menu',
                    template: "<div class=\"w-context-panel w-text-context-menu-panel mat-elevation-z4\">\n    <div>\n        <button [ngClass]=\"{'w-text-context-menu__selected-link': config.api.isLinkSelected()}\"\n                mat-button\n                (click)=\"link()\">\n            Link\n        </button>\n\n        <button mat-button (click)=\"bold()\">Bold</button>\n        <button mat-button (click)=\"italic()\">Italic</button>\n    </div>\n\n    <div>\n        <form *ngIf=\"ui.showLinkForm\" (submit)=\"applyLink()\">\n            <mat-form-field>\n                <input #linkEl #src matInput placeholder=\"Paste the url\">\n            </mat-form-field>\n\n            <div>\n                <button (click)=\"applyLink()\"\n                        type=\"button\"\n                        mat-button>\n                    Link\n                </button>\n\n                <button *ngIf=\"config.api.isLinkSelected()\"\n                        (click)=\"unlink()\"\n                        type=\"button\"\n                        mat-button>\n                    Unlink\n                </button>\n            </div>\n        </form>\n    </div>\n</div>\n"
                }] }
    ];
    /** @nocollapse */
    TextContextMenuComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [STICKY_MODAL_DATA,] }] }
    ]; };
    TextContextMenuComponent.propDecorators = {
        linkEl: [{ type: ViewChild, args: ['linkEl',] }]
    };
    return TextContextMenuComponent;
}());
export { TextContextMenuComponent };
if (false) {
    /** @type {?} */
    TextContextMenuComponent.prototype.linkEl;
    /** @type {?} */
    TextContextMenuComponent.prototype.ui;
    /** @type {?} */
    TextContextMenuComponent.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1jb250ZXh0LW1lbnUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvYnJpY2tzL3RleHQtYnJpY2svdGV4dC1jb250ZXh0LW1lbnUvdGV4dC1jb250ZXh0LW1lbnUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQVUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGtCQUFrQixDQUFDOzs7O0FBR25ELCtDQUVDOzs7SUFERyx3Q0FBbUI7O0FBR3ZCO0lBV0ksa0NBQThDLE1BQWlDO1FBQWpDLFdBQU0sR0FBTixNQUFNLENBQTJCO1FBSi9FLE9BQUUsR0FBRztZQUNELFlBQVksRUFBRSxLQUFLO1NBQ3RCLENBQUM7SUFJRixDQUFDOzs7O0lBRUQsMkNBQVE7OztJQUFSO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDcEMsQ0FBQzs7OztJQUVELHVDQUFJOzs7SUFBSjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzNCLENBQUM7Ozs7SUFFRCx5Q0FBTTs7O0lBQU47UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUM3QixDQUFDOzs7O0lBRUQsdUNBQUk7OztJQUFKO1FBQUEsaUJBZ0JDO1FBZkcsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFFaEMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRTtZQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUVoQyxVQUFVOzs7WUFBQztnQkFDUCxJQUFJLEtBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxFQUFFO29CQUNsQyxLQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztpQkFDM0U7Z0JBRUQsS0FBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdEMsQ0FBQyxFQUFDLENBQUM7U0FDTjthQUFNO1lBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUN0QztJQUNMLENBQUM7Ozs7SUFFRCw0Q0FBUzs7O0lBQVQ7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBRW5DLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLEVBQUU7WUFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2xFO2FBQU07WUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDL0Q7UUFFRCxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztJQUNwQyxDQUFDOzs7O0lBRUQseUNBQU07OztJQUFOO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUVuQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUV6QixJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztJQUNwQyxDQUFDOzs7O0lBRUQsMkRBQXdCOzs7SUFBeEI7UUFDSSxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDO0lBQ2pELENBQUM7O2dCQW5FSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0Isd29DQUFpRDtpQkFDcEQ7Ozs7Z0RBUWdCLE1BQU0sU0FBQyxpQkFBaUI7Ozt5QkFOcEMsU0FBUyxTQUFDLFFBQVE7O0lBK0R2QiwrQkFBQztDQUFBLEFBcEVELElBb0VDO1NBaEVZLHdCQUF3Qjs7O0lBQ2pDLDBDQUF3Qzs7SUFFeEMsc0NBRUU7O0lBRVUsMENBQW1FIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWYsIEluamVjdCwgT25Jbml0LCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTVElDS1lfTU9EQUxfREFUQX0gZnJvbSAnbmd4LXN0aWNreS1tb2RhbCc7XG5pbXBvcnQge0lUZXh0QnJpY2tBcGl9IGZyb20gJy4uL3RleHQtYnJpY2stYXBpLmludGVyZmFjZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVRleHRDb250ZXh0TWVudUNvbXBvbmVudCB7XG4gICAgYXBpOiBJVGV4dEJyaWNrQXBpO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3ctdGV4dC1jb250ZXh0LW1lbnUnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90ZXh0LWNvbnRleHQtbWVudS5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgVGV4dENvbnRleHRNZW51Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBAVmlld0NoaWxkKCdsaW5rRWwnKSBsaW5rRWw6IEVsZW1lbnRSZWY7XG5cbiAgICB1aSA9IHtcbiAgICAgICAgc2hvd0xpbmtGb3JtOiBmYWxzZVxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KFNUSUNLWV9NT0RBTF9EQVRBKSBwdWJsaWMgY29uZmlnOiBJVGV4dENvbnRleHRNZW51Q29tcG9uZW50KSB7XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5jb25maWcuYXBpLnNhdmVTZWxlY3Rpb24oKTtcbiAgICB9XG5cbiAgICBib2xkKCkge1xuICAgICAgICB0aGlzLmNvbmZpZy5hcGkuYm9sZCgpO1xuICAgIH1cblxuICAgIGl0YWxpYygpIHtcbiAgICAgICAgdGhpcy5jb25maWcuYXBpLml0YWxpYygpO1xuICAgIH1cblxuICAgIGxpbmsoKSB7XG4gICAgICAgIHRoaXMuc3dpdGNoTGlua0Zvcm1WaXNpYmlsaXR5KCk7XG5cbiAgICAgICAgaWYgKHRoaXMudWkuc2hvd0xpbmtGb3JtKSB7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5hcGkuc2F2ZVNlbGVjdGlvbigpO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25maWcuYXBpLmlzTGlua1NlbGVjdGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saW5rRWwubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMuY29uZmlnLmFwaS5nZXRTZWxlY3RlZExpbmtIcmVmKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5saW5rRWwubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5hcGkucmVzdG9yZVNlbGVjdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBwbHlMaW5rKCkge1xuICAgICAgICB0aGlzLmNvbmZpZy5hcGkucmVzdG9yZVNlbGVjdGlvbigpO1xuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5hcGkuaXNMaW5rU2VsZWN0ZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5jb25maWcuYXBpLmNoYW5nZUxpbmtVcmwodGhpcy5saW5rRWwubmF0aXZlRWxlbWVudC52YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5hcGkuY3JlYXRlTGluayh0aGlzLmxpbmtFbC5uYXRpdmVFbGVtZW50LnZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3dpdGNoTGlua0Zvcm1WaXNpYmlsaXR5KCk7XG4gICAgfVxuXG4gICAgdW5saW5rKCkge1xuICAgICAgICB0aGlzLmNvbmZpZy5hcGkucmVzdG9yZVNlbGVjdGlvbigpO1xuXG4gICAgICAgIHRoaXMuY29uZmlnLmFwaS51bmxpbmsoKTtcblxuICAgICAgICB0aGlzLnN3aXRjaExpbmtGb3JtVmlzaWJpbGl0eSgpO1xuICAgIH1cblxuICAgIHN3aXRjaExpbmtGb3JtVmlzaWJpbGl0eSgpIHtcbiAgICAgICAgdGhpcy51aS5zaG93TGlua0Zvcm0gPSAhdGhpcy51aS5zaG93TGlua0Zvcm07XG4gICAgfVxufVxuIl19