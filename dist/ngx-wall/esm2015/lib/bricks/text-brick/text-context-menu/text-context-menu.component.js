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
export class TextContextMenuComponent {
    /**
     * @param {?} config
     */
    constructor(config) {
        this.config = config;
        this.ui = {
            showLinkForm: false
        };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.config.api.saveSelection();
    }
    /**
     * @return {?}
     */
    bold() {
        this.config.api.bold();
    }
    /**
     * @return {?}
     */
    italic() {
        this.config.api.italic();
    }
    /**
     * @return {?}
     */
    link() {
        this.switchLinkFormVisibility();
        if (this.ui.showLinkForm) {
            this.config.api.saveSelection();
            setTimeout((/**
             * @return {?}
             */
            () => {
                if (this.config.api.isLinkSelected()) {
                    this.linkEl.nativeElement.value = this.config.api.getSelectedLinkHref();
                }
                this.linkEl.nativeElement.focus();
            }));
        }
        else {
            this.config.api.restoreSelection();
        }
    }
    /**
     * @return {?}
     */
    applyLink() {
        this.config.api.restoreSelection();
        if (this.config.api.isLinkSelected()) {
            this.config.api.changeLinkUrl(this.linkEl.nativeElement.value);
        }
        else {
            this.config.api.createLink(this.linkEl.nativeElement.value);
        }
        this.switchLinkFormVisibility();
    }
    /**
     * @return {?}
     */
    unlink() {
        this.config.api.restoreSelection();
        this.config.api.unlink();
        this.switchLinkFormVisibility();
    }
    /**
     * @return {?}
     */
    switchLinkFormVisibility() {
        this.ui.showLinkForm = !this.ui.showLinkForm;
    }
}
TextContextMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'w-text-context-menu',
                template: "<div class=\"w-context-panel w-text-context-menu-panel mat-elevation-z4\">\n    <div>\n        <button [ngClass]=\"{'w-text-context-menu__selected-link': config.api.isLinkSelected()}\"\n                mat-button\n                (click)=\"link()\">\n            Link\n        </button>\n\n        <button mat-button (click)=\"bold()\">Bold</button>\n        <button mat-button (click)=\"italic()\">Italic</button>\n    </div>\n\n    <div>\n        <form *ngIf=\"ui.showLinkForm\" (submit)=\"applyLink()\">\n            <mat-form-field>\n                <input #linkEl #src matInput placeholder=\"Paste the url\">\n            </mat-form-field>\n\n            <div>\n                <button (click)=\"applyLink()\"\n                        type=\"button\"\n                        mat-button>\n                    Link\n                </button>\n\n                <button *ngIf=\"config.api.isLinkSelected()\"\n                        (click)=\"unlink()\"\n                        type=\"button\"\n                        mat-button>\n                    Unlink\n                </button>\n            </div>\n        </form>\n    </div>\n</div>\n"
            }] }
];
/** @nocollapse */
TextContextMenuComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [STICKY_MODAL_DATA,] }] }
];
TextContextMenuComponent.propDecorators = {
    linkEl: [{ type: ViewChild, args: ['linkEl',] }]
};
if (false) {
    /** @type {?} */
    TextContextMenuComponent.prototype.linkEl;
    /** @type {?} */
    TextContextMenuComponent.prototype.ui;
    /** @type {?} */
    TextContextMenuComponent.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1jb250ZXh0LW1lbnUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvYnJpY2tzL3RleHQtYnJpY2svdGV4dC1jb250ZXh0LW1lbnUvdGV4dC1jb250ZXh0LW1lbnUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQVUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGtCQUFrQixDQUFDOzs7O0FBR25ELCtDQUVDOzs7SUFERyx3Q0FBbUI7O0FBT3ZCLE1BQU0sT0FBTyx3QkFBd0I7Ozs7SUFPakMsWUFBOEMsTUFBaUM7UUFBakMsV0FBTSxHQUFOLE1BQU0sQ0FBMkI7UUFKL0UsT0FBRSxHQUFHO1lBQ0QsWUFBWSxFQUFFLEtBQUs7U0FDdEIsQ0FBQztJQUlGLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDcEMsQ0FBQzs7OztJQUVELElBQUk7UUFDQSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMzQixDQUFDOzs7O0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzdCLENBQUM7Ozs7SUFFRCxJQUFJO1FBQ0EsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFFaEMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRTtZQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUVoQyxVQUFVOzs7WUFBQyxHQUFHLEVBQUU7Z0JBQ1osSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsRUFBRTtvQkFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLENBQUM7aUJBQzNFO2dCQUVELElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3RDLENBQUMsRUFBQyxDQUFDO1NBQ047YUFBTTtZQUNILElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDdEM7SUFDTCxDQUFDOzs7O0lBRUQsU0FBUztRQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFFbkMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsRUFBRTtZQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbEU7YUFBTTtZQUNILElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMvRDtRQUVELElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO0lBQ3BDLENBQUM7Ozs7SUFFRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUVuQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUV6QixJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztJQUNwQyxDQUFDOzs7O0lBRUQsd0JBQXdCO1FBQ3BCLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUM7SUFDakQsQ0FBQzs7O1lBbkVKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQix3b0NBQWlEO2FBQ3BEOzs7OzRDQVFnQixNQUFNLFNBQUMsaUJBQWlCOzs7cUJBTnBDLFNBQVMsU0FBQyxRQUFROzs7O0lBQW5CLDBDQUF3Qzs7SUFFeEMsc0NBRUU7O0lBRVUsMENBQW1FIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWYsIEluamVjdCwgT25Jbml0LCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTVElDS1lfTU9EQUxfREFUQX0gZnJvbSAnbmd4LXN0aWNreS1tb2RhbCc7XG5pbXBvcnQge0lUZXh0QnJpY2tBcGl9IGZyb20gJy4uL3RleHQtYnJpY2stYXBpLmludGVyZmFjZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVRleHRDb250ZXh0TWVudUNvbXBvbmVudCB7XG4gICAgYXBpOiBJVGV4dEJyaWNrQXBpO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3ctdGV4dC1jb250ZXh0LW1lbnUnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90ZXh0LWNvbnRleHQtbWVudS5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgVGV4dENvbnRleHRNZW51Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBAVmlld0NoaWxkKCdsaW5rRWwnKSBsaW5rRWw6IEVsZW1lbnRSZWY7XG5cbiAgICB1aSA9IHtcbiAgICAgICAgc2hvd0xpbmtGb3JtOiBmYWxzZVxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KFNUSUNLWV9NT0RBTF9EQVRBKSBwdWJsaWMgY29uZmlnOiBJVGV4dENvbnRleHRNZW51Q29tcG9uZW50KSB7XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5jb25maWcuYXBpLnNhdmVTZWxlY3Rpb24oKTtcbiAgICB9XG5cbiAgICBib2xkKCkge1xuICAgICAgICB0aGlzLmNvbmZpZy5hcGkuYm9sZCgpO1xuICAgIH1cblxuICAgIGl0YWxpYygpIHtcbiAgICAgICAgdGhpcy5jb25maWcuYXBpLml0YWxpYygpO1xuICAgIH1cblxuICAgIGxpbmsoKSB7XG4gICAgICAgIHRoaXMuc3dpdGNoTGlua0Zvcm1WaXNpYmlsaXR5KCk7XG5cbiAgICAgICAgaWYgKHRoaXMudWkuc2hvd0xpbmtGb3JtKSB7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5hcGkuc2F2ZVNlbGVjdGlvbigpO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25maWcuYXBpLmlzTGlua1NlbGVjdGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saW5rRWwubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMuY29uZmlnLmFwaS5nZXRTZWxlY3RlZExpbmtIcmVmKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5saW5rRWwubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5hcGkucmVzdG9yZVNlbGVjdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBwbHlMaW5rKCkge1xuICAgICAgICB0aGlzLmNvbmZpZy5hcGkucmVzdG9yZVNlbGVjdGlvbigpO1xuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5hcGkuaXNMaW5rU2VsZWN0ZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5jb25maWcuYXBpLmNoYW5nZUxpbmtVcmwodGhpcy5saW5rRWwubmF0aXZlRWxlbWVudC52YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5hcGkuY3JlYXRlTGluayh0aGlzLmxpbmtFbC5uYXRpdmVFbGVtZW50LnZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3dpdGNoTGlua0Zvcm1WaXNpYmlsaXR5KCk7XG4gICAgfVxuXG4gICAgdW5saW5rKCkge1xuICAgICAgICB0aGlzLmNvbmZpZy5hcGkucmVzdG9yZVNlbGVjdGlvbigpO1xuXG4gICAgICAgIHRoaXMuY29uZmlnLmFwaS51bmxpbmsoKTtcblxuICAgICAgICB0aGlzLnN3aXRjaExpbmtGb3JtVmlzaWJpbGl0eSgpO1xuICAgIH1cblxuICAgIHN3aXRjaExpbmtGb3JtVmlzaWJpbGl0eSgpIHtcbiAgICAgICAgdGhpcy51aS5zaG93TGlua0Zvcm0gPSAhdGhpcy51aS5zaG93TGlua0Zvcm07XG4gICAgfVxufVxuIl19