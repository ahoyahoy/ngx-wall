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
            setTimeout(function () {
                if (_this.config.api.isLinkSelected()) {
                    _this.linkEl.nativeElement.value = _this.config.api.getSelectedLinkHref();
                }
                _this.linkEl.nativeElement.focus();
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1jb250ZXh0LW1lbnUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvYnJpY2tzL3RleHQtYnJpY2svdGV4dC1jb250ZXh0LW1lbnUvdGV4dC1jb250ZXh0LW1lbnUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQVUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGtCQUFrQixDQUFDOzs7O0FBR25ELCtDQUVDOzs7SUFERyx3Q0FBbUI7O0FBR3ZCO0lBV0ksa0NBQThDLE1BQWlDO1FBQWpDLFdBQU0sR0FBTixNQUFNLENBQTJCO1FBSi9FLE9BQUUsR0FBRztZQUNELFlBQVksRUFBRSxLQUFLO1NBQ3RCLENBQUM7SUFJRixDQUFDOzs7O0lBRUQsMkNBQVE7OztJQUFSO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDcEMsQ0FBQzs7OztJQUVELHVDQUFJOzs7SUFBSjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzNCLENBQUM7Ozs7SUFFRCx5Q0FBTTs7O0lBQU47UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUM3QixDQUFDOzs7O0lBRUQsdUNBQUk7OztJQUFKO1FBQUEsaUJBZ0JDO1FBZkcsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFFaEMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRTtZQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUVoQyxVQUFVLENBQUM7Z0JBQ1AsSUFBSSxLQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsRUFBRTtvQkFDbEMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLENBQUM7aUJBQzNFO2dCQUVELEtBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxDQUFDO1NBQ047YUFBTTtZQUNILElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDdEM7SUFDTCxDQUFDOzs7O0lBRUQsNENBQVM7OztJQUFUO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUVuQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNsRTthQUFNO1lBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQy9EO1FBRUQsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7SUFDcEMsQ0FBQzs7OztJQUVELHlDQUFNOzs7SUFBTjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFFbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFekIsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7SUFDcEMsQ0FBQzs7OztJQUVELDJEQUF3Qjs7O0lBQXhCO1FBQ0ksSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQztJQUNqRCxDQUFDOztnQkFuRUosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLHdvQ0FBaUQ7aUJBQ3BEOzs7O2dEQVFnQixNQUFNLFNBQUMsaUJBQWlCOzs7eUJBTnBDLFNBQVMsU0FBQyxRQUFROztJQStEdkIsK0JBQUM7Q0FBQSxBQXBFRCxJQW9FQztTQWhFWSx3QkFBd0I7OztJQUNqQywwQ0FBd0M7O0lBRXhDLHNDQUVFOztJQUVVLDBDQUFtRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBJbmplY3QsIE9uSW5pdCwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U1RJQ0tZX01PREFMX0RBVEF9IGZyb20gJ25neC1zdGlja3ktbW9kYWwnO1xuaW1wb3J0IHtJVGV4dEJyaWNrQXBpfSBmcm9tICcuLi90ZXh0LWJyaWNrLWFwaS5pbnRlcmZhY2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElUZXh0Q29udGV4dE1lbnVDb21wb25lbnQge1xuICAgIGFwaTogSVRleHRCcmlja0FwaTtcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd3LXRleHQtY29udGV4dC1tZW51JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdGV4dC1jb250ZXh0LW1lbnUuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIFRleHRDb250ZXh0TWVudUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQFZpZXdDaGlsZCgnbGlua0VsJykgbGlua0VsOiBFbGVtZW50UmVmO1xuXG4gICAgdWkgPSB7XG4gICAgICAgIHNob3dMaW5rRm9ybTogZmFsc2VcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChTVElDS1lfTU9EQUxfREFUQSkgcHVibGljIGNvbmZpZzogSVRleHRDb250ZXh0TWVudUNvbXBvbmVudCkge1xuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY29uZmlnLmFwaS5zYXZlU2VsZWN0aW9uKCk7XG4gICAgfVxuXG4gICAgYm9sZCgpIHtcbiAgICAgICAgdGhpcy5jb25maWcuYXBpLmJvbGQoKTtcbiAgICB9XG5cbiAgICBpdGFsaWMoKSB7XG4gICAgICAgIHRoaXMuY29uZmlnLmFwaS5pdGFsaWMoKTtcbiAgICB9XG5cbiAgICBsaW5rKCkge1xuICAgICAgICB0aGlzLnN3aXRjaExpbmtGb3JtVmlzaWJpbGl0eSgpO1xuXG4gICAgICAgIGlmICh0aGlzLnVpLnNob3dMaW5rRm9ybSkge1xuICAgICAgICAgICAgdGhpcy5jb25maWcuYXBpLnNhdmVTZWxlY3Rpb24oKTtcblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLmFwaS5pc0xpbmtTZWxlY3RlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlua0VsLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLmNvbmZpZy5hcGkuZ2V0U2VsZWN0ZWRMaW5rSHJlZigpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMubGlua0VsLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb25maWcuYXBpLnJlc3RvcmVTZWxlY3Rpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcGx5TGluaygpIHtcbiAgICAgICAgdGhpcy5jb25maWcuYXBpLnJlc3RvcmVTZWxlY3Rpb24oKTtcblxuICAgICAgICBpZiAodGhpcy5jb25maWcuYXBpLmlzTGlua1NlbGVjdGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLmFwaS5jaGFuZ2VMaW5rVXJsKHRoaXMubGlua0VsLm5hdGl2ZUVsZW1lbnQudmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb25maWcuYXBpLmNyZWF0ZUxpbmsodGhpcy5saW5rRWwubmF0aXZlRWxlbWVudC52YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN3aXRjaExpbmtGb3JtVmlzaWJpbGl0eSgpO1xuICAgIH1cblxuICAgIHVubGluaygpIHtcbiAgICAgICAgdGhpcy5jb25maWcuYXBpLnJlc3RvcmVTZWxlY3Rpb24oKTtcblxuICAgICAgICB0aGlzLmNvbmZpZy5hcGkudW5saW5rKCk7XG5cbiAgICAgICAgdGhpcy5zd2l0Y2hMaW5rRm9ybVZpc2liaWxpdHkoKTtcbiAgICB9XG5cbiAgICBzd2l0Y2hMaW5rRm9ybVZpc2liaWxpdHkoKSB7XG4gICAgICAgIHRoaXMudWkuc2hvd0xpbmtGb3JtID0gIXRoaXMudWkuc2hvd0xpbmtGb3JtO1xuICAgIH1cbn1cbiJdfQ==