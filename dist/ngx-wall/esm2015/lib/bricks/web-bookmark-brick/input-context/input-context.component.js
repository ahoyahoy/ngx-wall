/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, ViewChild } from '@angular/core';
import { StickyModalRef } from 'ngx-sticky-modal';
export class InputContextComponent {
    /**
     * @param {?} ngxStickyModalRef
     */
    constructor(ngxStickyModalRef) {
        this.ngxStickyModalRef = ngxStickyModalRef;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.srcInput.nativeElement.focus();
        }), 10);
    }
    /**
     * @return {?}
     */
    applySrc() {
        this.ngxStickyModalRef.close({
            src: this.srcInput.nativeElement.value
        });
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onSubmit(e) {
        e.preventDefault();
        this.applySrc();
    }
}
InputContextComponent.decorators = [
    { type: Component, args: [{
                template: "<div class=\"w-context-panel w-brick-input mat-elevation-z4\">\n    <div class=\"w-brick-input__body\">\n        <form (submit)=\"onSubmit($event)\">\n            <mat-form-field>\n                <input #src matInput placeholder=\"Paste in https://...\">\n            </mat-form-field>\n\n            <button mat-flat-button color=\"primary\" (click)=\"applySrc()\" type=\"button\">\n                Create Bookmark\n            </button>\n        </form>\n\n        <p class=\"w-brick-input__description\">\n            Create a visual bookmark from a link...\n        </p>\n    </div>\n</div>\n",
                styles: ["button,mat-form-field{width:100%}"]
            }] }
];
/** @nocollapse */
InputContextComponent.ctorParameters = () => [
    { type: StickyModalRef }
];
InputContextComponent.propDecorators = {
    srcInput: [{ type: ViewChild, args: ['src',] }]
};
if (false) {
    /** @type {?} */
    InputContextComponent.prototype.srcInput;
    /**
     * @type {?}
     * @private
     */
    InputContextComponent.prototype.ngxStickyModalRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtY29udGV4dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9icmlja3Mvd2ViLWJvb2ttYXJrLWJyaWNrL2lucHV0LWNvbnRleHQvaW5wdXQtY29udGV4dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFVLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFNaEQsTUFBTSxPQUFPLHFCQUFxQjs7OztJQUc5QixZQUFvQixpQkFBaUM7UUFBakMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFnQjtJQUNyRCxDQUFDOzs7O0lBRUQsUUFBUTtRQUNKLFVBQVU7OztRQUFDLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3hDLENBQUMsR0FBRSxFQUFFLENBQUMsQ0FBQztJQUNYLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQztZQUN6QixHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSztTQUN6QyxDQUFDLENBQUM7SUFDUCxDQUFDOzs7OztJQUVELFFBQVEsQ0FBQyxDQUFDO1FBQ04sQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRW5CLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDOzs7WUExQkosU0FBUyxTQUFDO2dCQUNQLGltQkFBNkM7O2FBRWhEOzs7O1lBTE8sY0FBYzs7O3VCQU9qQixTQUFTLFNBQUMsS0FBSzs7OztJQUFoQix5Q0FBdUM7Ozs7O0lBRTNCLGtEQUF5QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N0aWNreU1vZGFsUmVmfSBmcm9tICduZ3gtc3RpY2t5LW1vZGFsJztcblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGVVcmw6ICcuL2lucHV0LWNvbnRleHQuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2lucHV0LWNvbnRleHQuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBJbnB1dENvbnRleHRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBWaWV3Q2hpbGQoJ3NyYycpIHNyY0lucHV0OiBFbGVtZW50UmVmO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ3hTdGlja3lNb2RhbFJlZjogU3RpY2t5TW9kYWxSZWYpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNyY0lucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfSwgMTApO1xuICAgIH1cblxuICAgIGFwcGx5U3JjKCkge1xuICAgICAgICB0aGlzLm5neFN0aWNreU1vZGFsUmVmLmNsb3NlKHtcbiAgICAgICAgICAgIHNyYzogdGhpcy5zcmNJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uU3VibWl0KGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHRoaXMuYXBwbHlTcmMoKTtcbiAgICB9XG59XG4iXX0=