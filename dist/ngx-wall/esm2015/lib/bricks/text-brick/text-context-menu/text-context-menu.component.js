/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            setTimeout(() => {
                if (this.config.api.isLinkSelected()) {
                    this.linkEl.nativeElement.value = this.config.api.getSelectedLinkHref();
                }
                this.linkEl.nativeElement.focus();
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1jb250ZXh0LW1lbnUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvYnJpY2tzL3RleHQtYnJpY2svdGV4dC1jb250ZXh0LW1lbnUvdGV4dC1jb250ZXh0LW1lbnUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQVUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGtCQUFrQixDQUFDOzs7O0FBR25ELCtDQUVDOzs7SUFERyx3Q0FBbUI7O0FBT3ZCLE1BQU0sT0FBTyx3QkFBd0I7Ozs7SUFPakMsWUFBOEMsTUFBaUM7UUFBakMsV0FBTSxHQUFOLE1BQU0sQ0FBMkI7UUFKL0UsT0FBRSxHQUFHO1lBQ0QsWUFBWSxFQUFFLEtBQUs7U0FDdEIsQ0FBQztJQUlGLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDcEMsQ0FBQzs7OztJQUVELElBQUk7UUFDQSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMzQixDQUFDOzs7O0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzdCLENBQUM7Ozs7SUFFRCxJQUFJO1FBQ0EsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFFaEMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRTtZQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUVoQyxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNaLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLEVBQUU7b0JBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2lCQUMzRTtnQkFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN0QyxDQUFDLENBQUMsQ0FBQztTQUNOO2FBQU07WUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQ3RDO0lBQ0wsQ0FBQzs7OztJQUVELFNBQVM7UUFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBRW5DLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLEVBQUU7WUFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2xFO2FBQU07WUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDL0Q7UUFFRCxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztJQUNwQyxDQUFDOzs7O0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFFbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFekIsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7SUFDcEMsQ0FBQzs7OztJQUVELHdCQUF3QjtRQUNwQixJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDO0lBQ2pELENBQUM7OztZQW5FSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0Isd29DQUFpRDthQUNwRDs7Ozs0Q0FRZ0IsTUFBTSxTQUFDLGlCQUFpQjs7O3FCQU5wQyxTQUFTLFNBQUMsUUFBUTs7OztJQUFuQiwwQ0FBd0M7O0lBRXhDLHNDQUVFOztJQUVVLDBDQUFtRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBJbmplY3QsIE9uSW5pdCwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U1RJQ0tZX01PREFMX0RBVEF9IGZyb20gJ25neC1zdGlja3ktbW9kYWwnO1xuaW1wb3J0IHtJVGV4dEJyaWNrQXBpfSBmcm9tICcuLi90ZXh0LWJyaWNrLWFwaS5pbnRlcmZhY2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElUZXh0Q29udGV4dE1lbnVDb21wb25lbnQge1xuICAgIGFwaTogSVRleHRCcmlja0FwaTtcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd3LXRleHQtY29udGV4dC1tZW51JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdGV4dC1jb250ZXh0LW1lbnUuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIFRleHRDb250ZXh0TWVudUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQFZpZXdDaGlsZCgnbGlua0VsJykgbGlua0VsOiBFbGVtZW50UmVmO1xuXG4gICAgdWkgPSB7XG4gICAgICAgIHNob3dMaW5rRm9ybTogZmFsc2VcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChTVElDS1lfTU9EQUxfREFUQSkgcHVibGljIGNvbmZpZzogSVRleHRDb250ZXh0TWVudUNvbXBvbmVudCkge1xuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY29uZmlnLmFwaS5zYXZlU2VsZWN0aW9uKCk7XG4gICAgfVxuXG4gICAgYm9sZCgpIHtcbiAgICAgICAgdGhpcy5jb25maWcuYXBpLmJvbGQoKTtcbiAgICB9XG5cbiAgICBpdGFsaWMoKSB7XG4gICAgICAgIHRoaXMuY29uZmlnLmFwaS5pdGFsaWMoKTtcbiAgICB9XG5cbiAgICBsaW5rKCkge1xuICAgICAgICB0aGlzLnN3aXRjaExpbmtGb3JtVmlzaWJpbGl0eSgpO1xuXG4gICAgICAgIGlmICh0aGlzLnVpLnNob3dMaW5rRm9ybSkge1xuICAgICAgICAgICAgdGhpcy5jb25maWcuYXBpLnNhdmVTZWxlY3Rpb24oKTtcblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLmFwaS5pc0xpbmtTZWxlY3RlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlua0VsLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLmNvbmZpZy5hcGkuZ2V0U2VsZWN0ZWRMaW5rSHJlZigpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMubGlua0VsLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb25maWcuYXBpLnJlc3RvcmVTZWxlY3Rpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcGx5TGluaygpIHtcbiAgICAgICAgdGhpcy5jb25maWcuYXBpLnJlc3RvcmVTZWxlY3Rpb24oKTtcblxuICAgICAgICBpZiAodGhpcy5jb25maWcuYXBpLmlzTGlua1NlbGVjdGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLmFwaS5jaGFuZ2VMaW5rVXJsKHRoaXMubGlua0VsLm5hdGl2ZUVsZW1lbnQudmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb25maWcuYXBpLmNyZWF0ZUxpbmsodGhpcy5saW5rRWwubmF0aXZlRWxlbWVudC52YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN3aXRjaExpbmtGb3JtVmlzaWJpbGl0eSgpO1xuICAgIH1cblxuICAgIHVubGluaygpIHtcbiAgICAgICAgdGhpcy5jb25maWcuYXBpLnJlc3RvcmVTZWxlY3Rpb24oKTtcblxuICAgICAgICB0aGlzLmNvbmZpZy5hcGkudW5saW5rKCk7XG5cbiAgICAgICAgdGhpcy5zd2l0Y2hMaW5rRm9ybVZpc2liaWxpdHkoKTtcbiAgICB9XG5cbiAgICBzd2l0Y2hMaW5rRm9ybVZpc2liaWxpdHkoKSB7XG4gICAgICAgIHRoaXMudWkuc2hvd0xpbmtGb3JtID0gIXRoaXMudWkuc2hvd0xpbmtGb3JtO1xuICAgIH1cbn1cbiJdfQ==