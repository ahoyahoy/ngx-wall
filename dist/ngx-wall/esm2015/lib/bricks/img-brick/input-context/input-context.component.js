/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        setTimeout(() => {
            this.srcInput.nativeElement.focus();
        }, 10);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtY29udGV4dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9icmlja3MvaW1nLWJyaWNrL2lucHV0LWNvbnRleHQvaW5wdXQtY29udGV4dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFVLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFNaEQsTUFBTSxPQUFPLHFCQUFxQjs7OztJQUc5QixZQUFvQixpQkFBaUM7UUFBakMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFnQjtJQUNyRCxDQUFDOzs7O0lBRUQsUUFBUTtRQUNKLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDWixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN4QyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDWCxDQUFDOzs7O0lBRUQsYUFBYTtRQUNULElBQUksQ0FBQyxNQUFNLENBQUM7WUFDUixHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSztTQUN6QyxDQUFDLENBQUM7SUFDUCxDQUFDOzs7OztJQUVELFlBQVksQ0FBQyxLQUFVO1FBQ25CLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDUixJQUFJLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQzlCLENBQUMsQ0FBQztJQUNQLENBQUM7Ozs7O0lBRUQsTUFBTSxDQUFDLElBQUk7UUFDUCxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7Ozs7O0lBRUQsUUFBUSxDQUFDLENBQUM7UUFDTixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFbkIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7OztZQXBDSixTQUFTLFNBQUM7Z0JBQ1AsNHFCQUE2Qzs7YUFFaEQ7Ozs7WUFMTyxjQUFjOzs7dUJBT2pCLFNBQVMsU0FBQyxLQUFLOzs7O0lBQWhCLHlDQUF1Qzs7Ozs7SUFFM0Isa0RBQXlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3RpY2t5TW9kYWxSZWZ9IGZyb20gJ25neC1zdGlja3ktbW9kYWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgICB0ZW1wbGF0ZVVybDogJy4vaW5wdXQtY29udGV4dC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vaW5wdXQtY29udGV4dC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIElucHV0Q29udGV4dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQFZpZXdDaGlsZCgnc3JjJykgc3JjSW5wdXQ6IEVsZW1lbnRSZWY7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5neFN0aWNreU1vZGFsUmVmOiBTdGlja3lNb2RhbFJlZikge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3JjSW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9LCAxMCk7XG4gICAgfVxuXG4gICAgYXBwbHlJbWFnZVNyYygpIHtcbiAgICAgICAgdGhpcy5ub3RpZnkoe1xuICAgICAgICAgICAgc3JjOiB0aGlzLnNyY0lucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25GaWxlQ2hhbmdlKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgdGhpcy5ub3RpZnkoe1xuICAgICAgICAgICAgZmlsZTogZXZlbnQudGFyZ2V0LmZpbGVzWzBdXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5vdGlmeShkYXRhKSB7XG4gICAgICAgIHRoaXMubmd4U3RpY2t5TW9kYWxSZWYuY2xvc2UoZGF0YSk7XG4gICAgfVxuXG4gICAgb25TdWJtaXQoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdGhpcy5hcHBseUltYWdlU3JjKCk7XG4gICAgfVxufVxuIl19