/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, ViewChild } from '@angular/core';
import { StickyModalRef } from 'ngx-sticky-modal';
var InputContextComponent = /** @class */ (function () {
    function InputContextComponent(ngxStickyModalRef) {
        this.ngxStickyModalRef = ngxStickyModalRef;
    }
    /**
     * @return {?}
     */
    InputContextComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.srcInput.nativeElement.focus();
        }), 10);
    };
    /**
     * @return {?}
     */
    InputContextComponent.prototype.applySrc = /**
     * @return {?}
     */
    function () {
        this.ngxStickyModalRef.close({
            src: this.srcInput.nativeElement.value
        });
    };
    /**
     * @param {?} e
     * @return {?}
     */
    InputContextComponent.prototype.onSubmit = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        e.preventDefault();
        this.applySrc();
    };
    /**
     * @return {?}
     */
    InputContextComponent.prototype.close = /**
     * @return {?}
     */
    function () {
        this.ngxStickyModalRef.dismiss();
    };
    InputContextComponent.decorators = [
        { type: Component, args: [{
                    template: "<div class=\"w-context-panel w-brick-input mat-elevation-z4\">\n    <div class=\"w-brick-input__header\"></div>\n\n    <div class=\"w-brick-input__body\">\n        <a class=\"w-context-panel-close\" (click)=\"close()\">x</a>\n\n        <form (submit)=\"onSubmit($event)\">\n            <mat-form-field>\n                <input #src matInput placeholder=\"Paste the youtube video link\">\n            </mat-form-field>\n\n            <button mat-flat-button color=\"primary\" (click)=\"applySrc()\" type=\"button\">\n                Add video\n            </button>\n        </form>\n\n        <p class=\"w-brick-input__description\">\n            Youtube video\n        </p>\n    </div>\n\n    <div class=\"w-brick-input__footer\"></div>\n</div>\n",
                    styles: ["button,mat-form-field{width:100%}:host .w-context-panel{position:relative}:host .w-context-panel-close{position:absolute;top:10px;right:10px;color:#333;text-decoration:none;cursor:pointer}"]
                }] }
    ];
    /** @nocollapse */
    InputContextComponent.ctorParameters = function () { return [
        { type: StickyModalRef }
    ]; };
    InputContextComponent.propDecorators = {
        srcInput: [{ type: ViewChild, args: ['src',] }]
    };
    return InputContextComponent;
}());
export { InputContextComponent };
if (false) {
    /** @type {?} */
    InputContextComponent.prototype.srcInput;
    /**
     * @type {?}
     * @private
     */
    InputContextComponent.prototype.ngxStickyModalRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtY29udGV4dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9icmlja3MvdmlkZW8tYnJpY2svaW5wdXQtY29udGV4dC9pbnB1dC1jb250ZXh0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQVUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUVoRDtJQU9JLCtCQUFvQixpQkFBaUM7UUFBakMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFnQjtJQUNyRCxDQUFDOzs7O0lBRUQsd0NBQVE7OztJQUFSO1FBQUEsaUJBSUM7UUFIRyxVQUFVOzs7UUFBQztZQUNQLEtBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3hDLENBQUMsR0FBRSxFQUFFLENBQUMsQ0FBQztJQUNYLENBQUM7Ozs7SUFFRCx3Q0FBUTs7O0lBQVI7UUFDSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDO1lBQ3pCLEdBQUcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLO1NBQ3pDLENBQUMsQ0FBQztJQUNQLENBQUM7Ozs7O0lBRUQsd0NBQVE7Ozs7SUFBUixVQUFTLENBQUM7UUFDTixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFbkIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7Ozs7SUFFRCxxQ0FBSzs7O0lBQUw7UUFDSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDckMsQ0FBQzs7Z0JBOUJKLFNBQVMsU0FBQztvQkFDUCx1dkJBQTZDOztpQkFFaEQ7Ozs7Z0JBTE8sY0FBYzs7OzJCQU9qQixTQUFTLFNBQUMsS0FBSzs7SUEwQnBCLDRCQUFDO0NBQUEsQUEvQkQsSUErQkM7U0EzQlkscUJBQXFCOzs7SUFDOUIseUNBQXVDOzs7OztJQUUzQixrREFBeUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdGlja3lNb2RhbFJlZn0gZnJvbSAnbmd4LXN0aWNreS1tb2RhbCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlVXJsOiAnLi9pbnB1dC1jb250ZXh0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9pbnB1dC1jb250ZXh0LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgSW5wdXRDb250ZXh0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBAVmlld0NoaWxkKCdzcmMnKSBzcmNJbnB1dDogRWxlbWVudFJlZjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbmd4U3RpY2t5TW9kYWxSZWY6IFN0aWNreU1vZGFsUmVmKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zcmNJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH0sIDEwKTtcbiAgICB9XG5cbiAgICBhcHBseVNyYygpIHtcbiAgICAgICAgdGhpcy5uZ3hTdGlja3lNb2RhbFJlZi5jbG9zZSh7XG4gICAgICAgICAgICBzcmM6IHRoaXMuc3JjSW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvblN1Ym1pdChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB0aGlzLmFwcGx5U3JjKCk7XG4gICAgfVxuXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIHRoaXMubmd4U3RpY2t5TW9kYWxSZWYuZGlzbWlzcygpO1xuICAgIH1cbn1cbiJdfQ==