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
    InputContextComponent.prototype.applyImageSrc = /**
     * @return {?}
     */
    function () {
        this.notify({
            src: this.srcInput.nativeElement.value
        });
    };
    /**
     * @param {?} event
     * @return {?}
     */
    InputContextComponent.prototype.onFileChange = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.notify({
            file: event.target.files[0]
        });
    };
    /**
     * @param {?} data
     * @return {?}
     */
    InputContextComponent.prototype.notify = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this.ngxStickyModalRef.close(data);
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
        this.applyImageSrc();
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
                    template: "<div class=\"w-context-panel w-brick-input mat-elevation-z4\">\n    <div class=\"w-brick-input__body\">\n        <a class=\"w-context-panel-close\" (click)=\"close()\">x</a>\n\n        <form (submit)=\"onSubmit($event)\">\n            <mat-form-field>\n                <input #src matInput placeholder=\"Paste the image link\">\n            </mat-form-field>\n\n            <button mat-flat-button color=\"primary\" (click)=\"applyImageSrc()\" type=\"button\">\n                Add image\n            </button>\n        </form>\n\n        <p class=\"w-brick-input__description mb-2\">\n            Add link or upload image\n        </p>\n\n        <input accept=\"image/*\" (change)=\"onFileChange($event)\" type=\"file\">\n    </div>\n</div>\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtY29udGV4dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9icmlja3MvaW1nLWJyaWNrL2lucHV0LWNvbnRleHQvaW5wdXQtY29udGV4dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFVLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFFaEQ7SUFPSSwrQkFBb0IsaUJBQWlDO1FBQWpDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBZ0I7SUFDckQsQ0FBQzs7OztJQUVELHdDQUFROzs7SUFBUjtRQUFBLGlCQUlDO1FBSEcsVUFBVTs7O1FBQUM7WUFDUCxLQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN4QyxDQUFDLEdBQUUsRUFBRSxDQUFDLENBQUM7SUFDWCxDQUFDOzs7O0lBRUQsNkNBQWE7OztJQUFiO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUNSLEdBQUcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLO1NBQ3pDLENBQUMsQ0FBQztJQUNQLENBQUM7Ozs7O0lBRUQsNENBQVk7Ozs7SUFBWixVQUFhLEtBQVU7UUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUNSLElBQUksRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDOUIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7SUFFRCxzQ0FBTTs7OztJQUFOLFVBQU8sSUFBSTtRQUNQLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7Ozs7SUFFRCx3Q0FBUTs7OztJQUFSLFVBQVMsQ0FBQztRQUNOLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUVuQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQzs7OztJQUVELHFDQUFLOzs7SUFBTDtRQUNJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNyQyxDQUFDOztnQkF4Q0osU0FBUyxTQUFDO29CQUNQLG92QkFBNkM7O2lCQUVoRDs7OztnQkFMTyxjQUFjOzs7MkJBT2pCLFNBQVMsU0FBQyxLQUFLOztJQW9DcEIsNEJBQUM7Q0FBQSxBQXpDRCxJQXlDQztTQXJDWSxxQkFBcUI7OztJQUM5Qix5Q0FBdUM7Ozs7O0lBRTNCLGtEQUF5QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N0aWNreU1vZGFsUmVmfSBmcm9tICduZ3gtc3RpY2t5LW1vZGFsJztcblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGVVcmw6ICcuL2lucHV0LWNvbnRleHQuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2lucHV0LWNvbnRleHQuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBJbnB1dENvbnRleHRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBWaWV3Q2hpbGQoJ3NyYycpIHNyY0lucHV0OiBFbGVtZW50UmVmO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ3hTdGlja3lNb2RhbFJlZjogU3RpY2t5TW9kYWxSZWYpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNyY0lucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfSwgMTApO1xuICAgIH1cblxuICAgIGFwcGx5SW1hZ2VTcmMoKSB7XG4gICAgICAgIHRoaXMubm90aWZ5KHtcbiAgICAgICAgICAgIHNyYzogdGhpcy5zcmNJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uRmlsZUNoYW5nZShldmVudDogYW55KSB7XG4gICAgICAgIHRoaXMubm90aWZ5KHtcbiAgICAgICAgICAgIGZpbGU6IGV2ZW50LnRhcmdldC5maWxlc1swXVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBub3RpZnkoZGF0YSkge1xuICAgICAgICB0aGlzLm5neFN0aWNreU1vZGFsUmVmLmNsb3NlKGRhdGEpO1xuICAgIH1cblxuICAgIG9uU3VibWl0KGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHRoaXMuYXBwbHlJbWFnZVNyYygpO1xuICAgIH1cblxuICAgIGNsb3NlKCkge1xuICAgICAgICB0aGlzLm5neFN0aWNreU1vZGFsUmVmLmRpc21pc3MoKTtcbiAgICB9XG59XG4iXX0=