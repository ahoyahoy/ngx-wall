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
                template: "<div class=\"w-context-panel w-brick-input mat-elevation-z4\">\n    <div class=\"w-brick-input__header\"></div>\n\n    <div class=\"w-brick-input__body\">\n        <form (submit)=\"onSubmit($event)\">\n            <mat-form-field>\n                <input #src matInput placeholder=\"Paste the youtube video link\">\n            </mat-form-field>\n\n            <button mat-flat-button color=\"primary\" (click)=\"applySrc()\" type=\"button\">\n                Add video\n            </button>\n        </form>\n\n        <p class=\"w-brick-input__description\">\n            Youtube video\n        </p>\n    </div>\n\n    <div class=\"w-brick-input__footer\"></div>\n</div>\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtY29udGV4dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9icmlja3MvdmlkZW8tYnJpY2svaW5wdXQtY29udGV4dC9pbnB1dC1jb250ZXh0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQVUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQU1oRCxNQUFNLE9BQU8scUJBQXFCOzs7O0lBRzlCLFlBQW9CLGlCQUFpQztRQUFqQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWdCO0lBQ3JELENBQUM7Ozs7SUFFRCxRQUFRO1FBQ0osVUFBVTs7O1FBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDeEMsQ0FBQyxHQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1gsQ0FBQzs7OztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDO1lBQ3pCLEdBQUcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLO1NBQ3pDLENBQUMsQ0FBQztJQUNQLENBQUM7Ozs7O0lBRUQsUUFBUSxDQUFDLENBQUM7UUFDTixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFbkIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7OztZQTFCSixTQUFTLFNBQUM7Z0JBQ1AsK3FCQUE2Qzs7YUFFaEQ7Ozs7WUFMTyxjQUFjOzs7dUJBT2pCLFNBQVMsU0FBQyxLQUFLOzs7O0lBQWhCLHlDQUF1Qzs7Ozs7SUFFM0Isa0RBQXlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3RpY2t5TW9kYWxSZWZ9IGZyb20gJ25neC1zdGlja3ktbW9kYWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgICB0ZW1wbGF0ZVVybDogJy4vaW5wdXQtY29udGV4dC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vaW5wdXQtY29udGV4dC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIElucHV0Q29udGV4dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQFZpZXdDaGlsZCgnc3JjJykgc3JjSW5wdXQ6IEVsZW1lbnRSZWY7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5neFN0aWNreU1vZGFsUmVmOiBTdGlja3lNb2RhbFJlZikge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3JjSW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9LCAxMCk7XG4gICAgfVxuXG4gICAgYXBwbHlTcmMoKSB7XG4gICAgICAgIHRoaXMubmd4U3RpY2t5TW9kYWxSZWYuY2xvc2Uoe1xuICAgICAgICAgICAgc3JjOiB0aGlzLnNyY0lucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25TdWJtaXQoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdGhpcy5hcHBseVNyYygpO1xuICAgIH1cbn1cbiJdfQ==