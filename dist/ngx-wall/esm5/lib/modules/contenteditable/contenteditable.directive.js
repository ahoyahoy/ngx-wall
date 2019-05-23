/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
var ContenteditableDirective = /** @class */ (function () {
    function ContenteditableDirective(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.propValueAccessor = 'textContent';
    }
    /**
     * @return {?}
     */
    ContenteditableDirective.prototype.callOnChange = /**
     * @return {?}
     */
    function () {
        if (typeof this.onChange === 'function') {
            this.onChange(this.elementRef.nativeElement[this.propValueAccessor]);
        }
    };
    /**
     * @return {?}
     */
    ContenteditableDirective.prototype.callOnTouched = /**
     * @return {?}
     */
    function () {
        if (typeof this.onTouched === 'function') {
            this.onTouched();
        }
    };
    /**
     * Writes a new value to the element.
     * This method will be called by the forms API to write
     * to the view when programmatic (model -> view) changes are requested.
     *
     * See: [ControlValueAccessor](https://angular.io/api/forms/ControlValueAccessor#members)
     */
    /**
     * Writes a new value to the element.
     * This method will be called by the forms API to write
     * to the view when programmatic (model -> view) changes are requested.
     *
     * See: [ControlValueAccessor](https://angular.io/api/forms/ControlValueAccessor#members)
     * @param {?} value
     * @return {?}
     */
    ContenteditableDirective.prototype.writeValue = /**
     * Writes a new value to the element.
     * This method will be called by the forms API to write
     * to the view when programmatic (model -> view) changes are requested.
     *
     * See: [ControlValueAccessor](https://angular.io/api/forms/ControlValueAccessor#members)
     * @param {?} value
     * @return {?}
     */
    function (value) {
        // todo add type
        /** @type {?} */
        var normalizedValue = value === null ? '' : value;
        this.renderer.setProperty(this.elementRef.nativeElement, this.propValueAccessor, normalizedValue);
    };
    /**
     * Registers a callback function that should be called when
     * the control's value changes in the UI.
     *
     * This is called by the forms API on initialization so it can update
     * the form model when values propagate from the view (view -> model).
     */
    /**
     * Registers a callback function that should be called when
     * the control's value changes in the UI.
     *
     * This is called by the forms API on initialization so it can update
     * the form model when values propagate from the view (view -> model).
     * @param {?} fn
     * @return {?}
     */
    ContenteditableDirective.prototype.registerOnChange = /**
     * Registers a callback function that should be called when
     * the control's value changes in the UI.
     *
     * This is called by the forms API on initialization so it can update
     * the form model when values propagate from the view (view -> model).
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /**
     * Registers a callback function that should be called when the control receives a blur event.
     * This is called by the forms API on initialization so it can update the form model on blur.
     */
    /**
     * Registers a callback function that should be called when the control receives a blur event.
     * This is called by the forms API on initialization so it can update the form model on blur.
     * @param {?} fn
     * @return {?}
     */
    ContenteditableDirective.prototype.registerOnTouched = /**
     * Registers a callback function that should be called when the control receives a blur event.
     * This is called by the forms API on initialization so it can update the form model on blur.
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * This function is called by the forms API when the control status changes to or from "DISABLED".
     * Depending on the value, it should enable or disable the appropriate DOM element.
     */
    /**
     * This function is called by the forms API when the control status changes to or from "DISABLED".
     * Depending on the value, it should enable or disable the appropriate DOM element.
     * @param {?} isDisabled
     * @return {?}
     */
    ContenteditableDirective.prototype.setDisabledState = /**
     * This function is called by the forms API when the control status changes to or from "DISABLED".
     * Depending on the value, it should enable or disable the appropriate DOM element.
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        if (isDisabled) {
            this.renderer.setAttribute(this.elementRef.nativeElement, 'disabled', 'true');
            this.removeDisabledState = this.renderer
                .listen(this.elementRef.nativeElement, 'keydown', this.listenerDisabledState);
        }
        else {
            if (this.removeDisabledState) {
                this.renderer.removeAttribute(this.elementRef.nativeElement, 'disabled');
                this.removeDisabledState();
            }
        }
    };
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    ContenteditableDirective.prototype.listenerDisabledState = /**
     * @private
     * @param {?} e
     * @return {?}
     */
    function (e) {
        e.preventDefault();
    };
    ContenteditableDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[contenteditable]',
                    providers: [
                        { provide: NG_VALUE_ACCESSOR, useExisting: ContenteditableDirective, multi: true }
                    ]
                },] }
    ];
    /** @nocollapse */
    ContenteditableDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    ContenteditableDirective.propDecorators = {
        propValueAccessor: [{ type: Input }],
        callOnChange: [{ type: HostListener, args: ['input',] }],
        callOnTouched: [{ type: HostListener, args: ['blur',] }]
    };
    return ContenteditableDirective;
}());
export { ContenteditableDirective };
if (false) {
    /** @type {?} */
    ContenteditableDirective.prototype.propValueAccessor;
    /**
     * @type {?}
     * @private
     */
    ContenteditableDirective.prototype.onChange;
    /**
     * @type {?}
     * @private
     */
    ContenteditableDirective.prototype.onTouched;
    /**
     * @type {?}
     * @private
     */
    ContenteditableDirective.prototype.removeDisabledState;
    /**
     * @type {?}
     * @private
     */
    ContenteditableDirective.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    ContenteditableDirective.prototype.renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudGVkaXRhYmxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL21vZHVsZXMvY29udGVudGVkaXRhYmxlL2NvbnRlbnRlZGl0YWJsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BGLE9BQU8sRUFBdUIsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUV2RTtJQWFJLGtDQUFvQixVQUFzQixFQUFVLFFBQW1CO1FBQW5ELGVBQVUsR0FBVixVQUFVLENBQVk7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBTjlELHNCQUFpQixHQUFXLGFBQWEsQ0FBQztJQU9uRCxDQUFDOzs7O0lBR0QsK0NBQVk7OztJQURaO1FBRUksSUFBSSxPQUFPLElBQUksQ0FBQyxRQUFRLEtBQUssVUFBVSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztTQUN4RTtJQUNMLENBQUM7Ozs7SUFHRCxnREFBYTs7O0lBRGI7UUFFSSxJQUFJLE9BQU8sSUFBSSxDQUFDLFNBQVMsS0FBSyxVQUFVLEVBQUU7WUFDdEMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ3BCO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7T0FNRzs7Ozs7Ozs7OztJQUNILDZDQUFVOzs7Ozs7Ozs7SUFBVixVQUFXLEtBQVU7OztZQUNYLGVBQWUsR0FBRyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUs7UUFFbkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQ3RHLENBQUM7SUFFRDs7Ozs7O09BTUc7Ozs7Ozs7Ozs7SUFDSCxtREFBZ0I7Ozs7Ozs7OztJQUFoQixVQUFpQixFQUFjO1FBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7O09BR0c7Ozs7Ozs7SUFDSCxvREFBaUI7Ozs7OztJQUFqQixVQUFrQixFQUFjO1FBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7O09BR0c7Ozs7Ozs7SUFDSCxtREFBZ0I7Ozs7OztJQUFoQixVQUFpQixVQUFtQjtRQUNoQyxJQUFJLFVBQVUsRUFBRTtZQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUM5RSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFFBQVE7aUJBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7U0FDckY7YUFBTTtZQUNILElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO2dCQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDekUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7YUFDOUI7U0FDSjtJQUNMLENBQUM7Ozs7OztJQUVPLHdEQUFxQjs7Ozs7SUFBN0IsVUFBOEIsQ0FBZ0I7UUFDMUMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7O2dCQWpGSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsU0FBUyxFQUFFO3dCQUNQLEVBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSx3QkFBd0IsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDO3FCQUNuRjtpQkFDSjs7OztnQkFSa0IsVUFBVTtnQkFBdUIsU0FBUzs7O29DQVV4RCxLQUFLOytCQVNMLFlBQVksU0FBQyxPQUFPO2dDQU9wQixZQUFZLFNBQUMsTUFBTTs7SUEyRHhCLCtCQUFDO0NBQUEsQUFsRkQsSUFrRkM7U0E1RVksd0JBQXdCOzs7SUFDakMscURBQW1EOzs7OztJQUVuRCw0Q0FBMEM7Ozs7O0lBQzFDLDZDQUE4Qjs7Ozs7SUFDOUIsdURBQXdDOzs7OztJQUU1Qiw4Q0FBOEI7Ozs7O0lBQUUsNENBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIFJlbmRlcmVyMn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1tjb250ZW50ZWRpdGFibGVdJyxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge3Byb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLCB1c2VFeGlzdGluZzogQ29udGVudGVkaXRhYmxlRGlyZWN0aXZlLCBtdWx0aTogdHJ1ZX1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIENvbnRlbnRlZGl0YWJsZURpcmVjdGl2ZSBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgICBASW5wdXQoKSBwcm9wVmFsdWVBY2Nlc3Nvcjogc3RyaW5nID0gJ3RleHRDb250ZW50JztcblxuICAgIHByaXZhdGUgb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICAgIHByaXZhdGUgb25Ub3VjaGVkOiAoKSA9PiB2b2lkO1xuICAgIHByaXZhdGUgcmVtb3ZlRGlzYWJsZWRTdGF0ZTogKCkgPT4gdm9pZDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignaW5wdXQnKVxuICAgIGNhbGxPbkNoYW5nZSgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9uQ2hhbmdlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50W3RoaXMucHJvcFZhbHVlQWNjZXNzb3JdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2JsdXInKVxuICAgIGNhbGxPblRvdWNoZWQoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5vblRvdWNoZWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXcml0ZXMgYSBuZXcgdmFsdWUgdG8gdGhlIGVsZW1lbnQuXG4gICAgICogVGhpcyBtZXRob2Qgd2lsbCBiZSBjYWxsZWQgYnkgdGhlIGZvcm1zIEFQSSB0byB3cml0ZVxuICAgICAqIHRvIHRoZSB2aWV3IHdoZW4gcHJvZ3JhbW1hdGljIChtb2RlbCAtPiB2aWV3KSBjaGFuZ2VzIGFyZSByZXF1ZXN0ZWQuXG4gICAgICpcbiAgICAgKiBTZWU6IFtDb250cm9sVmFsdWVBY2Nlc3Nvcl0oaHR0cHM6Ly9hbmd1bGFyLmlvL2FwaS9mb3Jtcy9Db250cm9sVmFsdWVBY2Nlc3NvciNtZW1iZXJzKVxuICAgICAqL1xuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQgeyAvLyB0b2RvIGFkZCB0eXBlXG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRWYWx1ZSA9IHZhbHVlID09PSBudWxsID8gJycgOiB2YWx1ZTtcblxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLnByb3BWYWx1ZUFjY2Vzc29yLCBub3JtYWxpemVkVmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVycyBhIGNhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgc2hvdWxkIGJlIGNhbGxlZCB3aGVuXG4gICAgICogdGhlIGNvbnRyb2wncyB2YWx1ZSBjaGFuZ2VzIGluIHRoZSBVSS5cbiAgICAgKlxuICAgICAqIFRoaXMgaXMgY2FsbGVkIGJ5IHRoZSBmb3JtcyBBUEkgb24gaW5pdGlhbGl6YXRpb24gc28gaXQgY2FuIHVwZGF0ZVxuICAgICAqIHRoZSBmb3JtIG1vZGVsIHdoZW4gdmFsdWVzIHByb3BhZ2F0ZSBmcm9tIHRoZSB2aWV3ICh2aWV3IC0+IG1vZGVsKS5cbiAgICAgKi9cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlcnMgYSBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IHNob3VsZCBiZSBjYWxsZWQgd2hlbiB0aGUgY29udHJvbCByZWNlaXZlcyBhIGJsdXIgZXZlbnQuXG4gICAgICogVGhpcyBpcyBjYWxsZWQgYnkgdGhlIGZvcm1zIEFQSSBvbiBpbml0aWFsaXphdGlvbiBzbyBpdCBjYW4gdXBkYXRlIHRoZSBmb3JtIG1vZGVsIG9uIGJsdXIuXG4gICAgICovXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCBieSB0aGUgZm9ybXMgQVBJIHdoZW4gdGhlIGNvbnRyb2wgc3RhdHVzIGNoYW5nZXMgdG8gb3IgZnJvbSBcIkRJU0FCTEVEXCIuXG4gICAgICogRGVwZW5kaW5nIG9uIHRoZSB2YWx1ZSwgaXQgc2hvdWxkIGVuYWJsZSBvciBkaXNhYmxlIHRoZSBhcHByb3ByaWF0ZSBET00gZWxlbWVudC5cbiAgICAgKi9cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgaWYgKGlzRGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnZGlzYWJsZWQnLCAndHJ1ZScpO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVEaXNhYmxlZFN0YXRlID0gdGhpcy5yZW5kZXJlclxuICAgICAgICAgICAgICAgIC5saXN0ZW4odGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdrZXlkb3duJywgdGhpcy5saXN0ZW5lckRpc2FibGVkU3RhdGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMucmVtb3ZlRGlzYWJsZWRTdGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQXR0cmlidXRlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZURpc2FibGVkU3RhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgbGlzdGVuZXJEaXNhYmxlZFN0YXRlKGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbn1cbiJdfQ==