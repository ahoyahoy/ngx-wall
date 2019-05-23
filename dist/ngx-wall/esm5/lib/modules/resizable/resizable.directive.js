/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DOCUMENT } from '@angular/common';
import { ComponentFactoryResolver, Directive, Inject, Input, NgZone, ViewContainerRef } from '@angular/core';
import { ResizableHandlerComponent } from './resizable-handler.component';
import { LEFT_HANDLER_CLASS, RIGHT_HANDLER_CLASS } from './resizable.const';
/**
 * @record
 */
export function IResizeData() { }
if (false) {
    /** @type {?} */
    IResizeData.prototype.xInitial;
    /** @type {?} */
    IResizeData.prototype.xCurrent;
    /** @type {?} */
    IResizeData.prototype.offset;
    /** @type {?} */
    IResizeData.prototype.isLeftDirection;
    /** @type {?} */
    IResizeData.prototype.isRightDirection;
}
/**
 * \@description
 * 1. dynamically add left and right handlers
 * 2. allow to show/hide handlers
 * 3. call callback, where to pass
 *  - distance on which handlers is moved
 *  - handler type (left of right)
 */
var ResizableDirective = /** @class */ (function () {
    function ResizableDirective(el, zone, cfr, doc) {
        this.el = el;
        this.zone = zone;
        this.cfr = cfr;
        this.doc = doc;
        this.resizeData = null;
    }
    /**
     * @return {?}
     */
    ResizableDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var leftHandler = this.createHandler(LEFT_HANDLER_CLASS);
        /** @type {?} */
        var rightHandler = this.createHandler(RIGHT_HANDLER_CLASS);
        leftHandler.instance.mouseDownEvent.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            _this.mouseDownHandler(e, true);
        }));
        rightHandler.instance.mouseDownEvent.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            _this.mouseDownHandler(e, false);
        }));
        this.doc.addEventListener('mousemove', (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (_this.resizeData) {
                _this.resizeData.xCurrent = event.clientX;
                if (_this.resizeData.isLeftDirection) {
                    _this.resizeData.offset = _this.resizeData.xInitial - _this.resizeData.xCurrent;
                }
                else if (_this.resizeData.isRightDirection) {
                    _this.resizeData.offset = _this.resizeData.xCurrent - _this.resizeData.xInitial;
                }
                if (_this.wResizable.resize) {
                    _this.wResizable.resize(_this.resizeData);
                }
            }
        }));
        this.doc.addEventListener('mouseup', (/**
         * @return {?}
         */
        function () {
            if (_this.wResizable.resizeEnd) {
                _this.wResizable.resizeEnd(_this.resizeData);
            }
            _this.resizeData = null;
        }));
    };
    /**
     * @private
     * @param {?} customClassName
     * @return {?}
     */
    ResizableDirective.prototype.createHandler = /**
     * @private
     * @param {?} customClassName
     * @return {?}
     */
    function (customClassName) {
        /** @type {?} */
        var handler = this.el.createComponent(this.cfr.resolveComponentFactory(ResizableHandlerComponent));
        handler.instance.customClassName = customClassName;
        return handler;
    };
    /**
     * @private
     * @param {?} e
     * @param {?} isLeftDirection
     * @return {?}
     */
    ResizableDirective.prototype.mouseDownHandler = /**
     * @private
     * @param {?} e
     * @param {?} isLeftDirection
     * @return {?}
     */
    function (e, isLeftDirection) {
        e.preventDefault();
        e.stopPropagation();
        this.resizeData = {
            xInitial: e.clientX,
            xCurrent: e.clientX,
            offset: 0,
            isLeftDirection: isLeftDirection,
            isRightDirection: !isLeftDirection
        };
        if (this.wResizable.resizeStart) {
            this.wResizable.resizeStart(this.resizeData);
        }
    };
    ResizableDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[wResizable]'
                },] }
    ];
    /** @nocollapse */
    ResizableDirective.ctorParameters = function () { return [
        { type: ViewContainerRef },
        { type: NgZone },
        { type: ComponentFactoryResolver },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    ResizableDirective.propDecorators = {
        wResizable: [{ type: Input }]
    };
    return ResizableDirective;
}());
export { ResizableDirective };
if (false) {
    /** @type {?} */
    ResizableDirective.prototype.wResizable;
    /**
     * @type {?}
     * @private
     */
    ResizableDirective.prototype.resizeData;
    /**
     * @type {?}
     * @private
     */
    ResizableDirective.prototype.el;
    /**
     * @type {?}
     * @private
     */
    ResizableDirective.prototype.zone;
    /**
     * @type {?}
     * @private
     */
    ResizableDirective.prototype.cfr;
    /**
     * @type {?}
     * @private
     */
    ResizableDirective.prototype.doc;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXphYmxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL21vZHVsZXMvcmVzaXphYmxlL3Jlc2l6YWJsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsd0JBQXdCLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFVLGdCQUFnQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRW5ILE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxrQkFBa0IsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLG1CQUFtQixDQUFDOzs7O0FBRTFFLGlDQVFDOzs7SUFQRywrQkFBaUI7O0lBQ2pCLCtCQUFpQjs7SUFFakIsNkJBQWU7O0lBRWYsc0NBQXlCOztJQUN6Qix1Q0FBMEI7Ozs7Ozs7Ozs7QUFXOUI7SUFZSSw0QkFBb0IsRUFBb0IsRUFDcEIsSUFBWSxFQUNaLEdBQTZCLEVBQ1gsR0FBRztRQUhyQixPQUFFLEdBQUYsRUFBRSxDQUFrQjtRQUNwQixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1osUUFBRyxHQUFILEdBQUcsQ0FBMEI7UUFDWCxRQUFHLEdBQUgsR0FBRyxDQUFBO1FBTGpDLGVBQVUsR0FBZ0IsSUFBSSxDQUFDO0lBTXZDLENBQUM7Ozs7SUFFRCxxQ0FBUTs7O0lBQVI7UUFBQSxpQkFtQ0M7O1lBbENTLFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDOztZQUNwRCxZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQztRQUU1RCxXQUFXLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQyxDQUFhO1lBQ3hELEtBQUksQ0FBQyxnQkFB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LGdDQUE0Qjs7Ozs7SUFDNUIsa0NBQW9COzs7OztJQUNwQixpQ0FBcUM7Ozs7O0lBQ3JDLGlDQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0NvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgRGlyZWN0aXZlLCBJbmplY3QsIElucHV0LCBOZ1pvbmUsIE9uSW5pdCwgVmlld0NvbnRhaW5lclJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbXBvbmVudFJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZS9zcmMvbGlua2VyL2NvbXBvbmVudF9mYWN0b3J5JztcbmltcG9ydCB7UmVzaXphYmxlSGFuZGxlckNvbXBvbmVudH0gZnJvbSAnLi9yZXNpemFibGUtaGFuZGxlci5jb21wb25lbnQnO1xuaW1wb3J0IHtMRUZUX0hBTkRMRVJfQ0xBU1MsIFJJR0hUX0hBTkRMRVJfQ0xBU1N9IGZyb20gJy4vcmVzaXphYmxlLmNvbnN0JztcblxuZXhwb3J0IGludGVyZmFjZSBJUmVzaXplRGF0YSB7XG4gICAgeEluaXRpYWw6IG51bWJlcjtcbiAgICB4Q3VycmVudDogbnVtYmVyO1xuXG4gICAgb2Zmc2V0OiBudW1iZXI7XG5cbiAgICBpc0xlZnREaXJlY3Rpb246IGJvb2xlYW47XG4gICAgaXNSaWdodERpcmVjdGlvbjogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqIDEuIGR5bmFtaWNhbGx5IGFkZCBsZWZ0IGFuZCByaWdodCBoYW5kbGVyc1xuICogMi4gYWxsb3cgdG8gc2hvdy9oaWRlIGhhbmRsZXJzXG4gKiAzLiBjYWxsIGNhbGxiYWNrLCB3aGVyZSB0byBwYXNzXG4gKiAgLSBkaXN0YW5jZSBvbiB3aGljaCBoYW5kbGVycyBpcyBtb3ZlZFxuICogIC0gaGFuZGxlciB0eXBlIChsZWZ0IG9mIHJpZ2h0KVxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t3UmVzaXphYmxlXSdcbn0pXG5leHBvcnQgY2xhc3MgUmVzaXphYmxlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSB3UmVzaXphYmxlOiB7XG4gICAgICAgIHJlc2l6ZTogKHJlc2l6ZURhdGE6IElSZXNpemVEYXRhKSA9PiB2b2lkO1xuICAgICAgICByZXNpemVTdGFydDogKHJlc2l6ZURhdGE6IElSZXNpemVEYXRhKSA9PiB2b2lkO1xuICAgICAgICByZXNpemVFbmQ6IChyZXNpemVEYXRhOiBJUmVzaXplRGF0YSkgPT4gdm9pZDtcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSByZXNpemVEYXRhOiBJUmVzaXplRGF0YSA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgem9uZTogTmdab25lLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgY2ZyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgICAgICAgICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2MpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgY29uc3QgbGVmdEhhbmRsZXIgPSB0aGlzLmNyZWF0ZUhhbmRsZXIoTEVGVF9IQU5ETEVSX0NMQVNTKTtcbiAgICAgICAgY29uc3QgcmlnaHRIYW5kbGVyID0gdGhpcy5jcmVhdGVIYW5kbGVyKFJJR0hUX0hBTkRMRVJfQ0xBU1MpO1xuXG4gICAgICAgIGxlZnRIYW5kbGVyLmluc3RhbmNlLm1vdXNlRG93bkV2ZW50LnN1YnNjcmliZSgoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5tb3VzZURvd25IYW5kbGVyKGUsIHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICByaWdodEhhbmRsZXIuaW5zdGFuY2UubW91c2VEb3duRXZlbnQuc3Vic2NyaWJlKChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1vdXNlRG93bkhhbmRsZXIoZSwgZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmRvYy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJlc2l6ZURhdGEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZURhdGEueEN1cnJlbnQgPSBldmVudC5jbGllbnRYO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVzaXplRGF0YS5pc0xlZnREaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNpemVEYXRhLm9mZnNldCA9IHRoaXMucmVzaXplRGF0YS54SW5pdGlhbCAtIHRoaXMucmVzaXplRGF0YS54Q3VycmVudDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucmVzaXplRGF0YS5pc1JpZ2h0RGlyZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzaXplRGF0YS5vZmZzZXQgPSB0aGlzLnJlc2l6ZURhdGEueEN1cnJlbnQgLSB0aGlzLnJlc2l6ZURhdGEueEluaXRpYWw7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMud1Jlc2l6YWJsZS5yZXNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53UmVzaXphYmxlLnJlc2l6ZSh0aGlzLnJlc2l6ZURhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5kb2MuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLndSZXNpemFibGUucmVzaXplRW5kKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53UmVzaXphYmxlLnJlc2l6ZUVuZCh0aGlzLnJlc2l6ZURhdGEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnJlc2l6ZURhdGEgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUhhbmRsZXIoY3VzdG9tQ2xhc3NOYW1lOiBzdHJpbmcpOiBDb21wb25lbnRSZWY8UmVzaXphYmxlSGFuZGxlckNvbXBvbmVudD4ge1xuICAgICAgICBjb25zdCBoYW5kbGVyID0gdGhpcy5lbC5jcmVhdGVDb21wb25lbnQoXG4gICAgICAgICAgICB0aGlzLmNmci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShSZXNpemFibGVIYW5kbGVyQ29tcG9uZW50KVxuICAgICAgICApO1xuXG4gICAgICAgIGhhbmRsZXIuaW5zdGFuY2UuY3VzdG9tQ2xhc3NOYW1lID0gY3VzdG9tQ2xhc3NOYW1lO1xuXG4gICAgICAgIHJldHVybiBoYW5kbGVyO1xuICAgIH1cblxuICAgIHByaXZhdGUgbW91c2VEb3duSGFuZGxlcihlOiBNb3VzZUV2ZW50LCBpc0xlZnREaXJlY3Rpb246IGJvb2xlYW4pIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIHRoaXMucmVzaXplRGF0YSA9IHtcbiAgICAgICAgICAgIHhJbml0aWFsOiBlLmNsaWVudFgsXG4gICAgICAgICAgICB4Q3VycmVudDogZS5jbGllbnRYLFxuICAgICAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgICAgICAgaXNMZWZ0RGlyZWN0aW9uLFxuICAgICAgICAgICAgaXNSaWdodERpcmVjdGlvbjogIWlzTGVmdERpcmVjdGlvblxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0aGlzLndSZXNpemFibGUucmVzaXplU3RhcnQpIHtcbiAgICAgICAgICAgIHRoaXMud1Jlc2l6YWJsZS5yZXNpemVTdGFydCh0aGlzLnJlc2l6ZURhdGEpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19