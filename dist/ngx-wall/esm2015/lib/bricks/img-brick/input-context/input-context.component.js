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
    applyImageSrc() {
        this.notify({
            src: this.srcInput.nativeElement.value
        });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onFileChange(event) {
        this.notify({
            file: event.target.files[0]
        });
    }
    /**
     * @param {?} data
     * @return {?}
     */
    notify(data) {
        this.ngxStickyModalRef.close(data);
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onSubmit(e) {
        e.preventDefault();
        this.applyImageSrc();
    }
}
InputContextComponent.decorators = [
    { type: Component, args: [{
                template: "<div class=\"w-context-panel w-brick-input mat-elevation-z4\">\n    <div class=\"w-brick-input__body\">\n        <form (submit)=\"onSubmit($event)\">\n            <mat-form-field>\n                <input #src matInput placeholder=\"Paste the image link\">\n            </mat-form-field>\n\n            <button mat-flat-button color=\"primary\" (click)=\"applyImageSrc()\" type=\"button\">\n                Add image\n            </button>\n        </form>\n\n        <p class=\"w-brick-input__description mb-2\">\n            Add link or upload image\n        </p>\n\n        <input accept=\"image/*\" (change)=\"onFileChange($event)\" type=\"file\">\n    </div>\n</div>\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtY29udGV4dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9icmlja3MvaW1nLWJyaWNrL2lucHV0LWNvbnRleHQvaW5wdXQtY29udGV4dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFVLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFNaEQsTUFBTSxPQUFPLHFCQUFxQjs7OztJQUc5QixZQUFvQixpQkFBaUM7UUFBakMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFnQjtJQUNyRCxDQUFDOzs7O0lBRUQsUUFBUTtRQUNKLFVBQVU7OztRQUFDLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3hDLENBQUMsR0FBRSxFQUFFLENBQUMsQ0FBQztJQUNYLENBQUM7Ozs7SUFFRCxhQUFhO1FBQ1QsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUNSLEdBQUcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLO1NBQ3pDLENBQUMsQ0FBQztJQUNQLENBQUM7Ozs7O0lBRUQsWUFBWSxDQUFDLEtBQVU7UUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUNSLElBQUksRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDOUIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7SUFFRCxNQUFNLENBQUMsSUFBSTtRQUNQLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7Ozs7SUFFRCxRQUFRLENBQUMsQ0FBQztRQUNOLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUVuQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQzs7O1lBcENKLFNBQVMsU0FBQztnQkFDUCw0cUJBQTZDOzthQUVoRDs7OztZQUxPLGNBQWM7Ozt1QkFPakIsU0FBUyxTQUFDLEtBQUs7Ozs7SUFBaEIseUNBQXVDOzs7OztJQUUzQixrREFBeUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdGlja3lNb2RhbFJlZn0gZnJvbSAnbmd4LXN0aWNreS1tb2RhbCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlVXJsOiAnLi9pbnB1dC1jb250ZXh0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9pbnB1dC1jb250ZXh0LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgSW5wdXRDb250ZXh0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBAVmlld0NoaWxkKCdzcmMnKSBzcmNJbnB1dDogRWxlbWVudFJlZjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbmd4U3RpY2t5TW9kYWxSZWY6IFN0aWNreU1vZGFsUmVmKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zcmNJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH0sIDEwKTtcbiAgICB9XG5cbiAgICBhcHBseUltYWdlU3JjKCkge1xuICAgICAgICB0aGlzLm5vdGlmeSh7XG4gICAgICAgICAgICBzcmM6IHRoaXMuc3JjSW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkZpbGVDaGFuZ2UoZXZlbnQ6IGFueSkge1xuICAgICAgICB0aGlzLm5vdGlmeSh7XG4gICAgICAgICAgICBmaWxlOiBldmVudC50YXJnZXQuZmlsZXNbMF1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbm90aWZ5KGRhdGEpIHtcbiAgICAgICAgdGhpcy5uZ3hTdGlja3lNb2RhbFJlZi5jbG9zZShkYXRhKTtcbiAgICB9XG5cbiAgICBvblN1Ym1pdChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB0aGlzLmFwcGx5SW1hZ2VTcmMoKTtcbiAgICB9XG59XG4iXX0=