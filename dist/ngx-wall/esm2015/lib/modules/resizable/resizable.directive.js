/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
export class ResizableDirective {
    /**
     * @param {?} el
     * @param {?} zone
     * @param {?} cfr
     * @param {?} doc
     */
    constructor(el, zone, cfr, doc) {
        this.el = el;
        this.zone = zone;
        this.cfr = cfr;
        this.doc = doc;
        this.resizeData = null;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const leftHandler = this.createHandler(LEFT_HANDLER_CLASS);
        /** @type {?} */
        const rightHandler = this.createHandler(RIGHT_HANDLER_CLASS);
        leftHandler.instance.mouseDownEvent.subscribe((e) => {
            this.mouseDownHandler(e, true);
        });
        rightHandler.instance.mouseDownEvent.subscribe((e) => {
            this.mouseDownHandler(e, false);
        });
        this.doc.addEventListener('mousemove', (event) => {
            if (this.resizeData) {
                this.resizeData.xCurrent = event.clientX;
                if (this.resizeData.isLeftDirection) {
                    this.resizeData.offset = this.resizeData.xInitial - this.resizeData.xCurrent;
                }
                else if (this.resizeData.isRightDirection) {
                    this.resizeData.offset = this.resizeData.xCurrent - this.resizeData.xInitial;
                }
                if (this.wResizable.resize) {
                    this.wResizable.resize(this.resizeData);
                }
            }
        });
        this.doc.addEventListener('mouseup', () => {
            if (this.wResizable.resizeEnd) {
                this.wResizable.resizeEnd(this.resizeData);
            }
            this.resizeData = null;
        });
    }
    /**
     * @private
     * @param {?} customClassName
     * @return {?}
     */
    createHandler(customClassName) {
        /** @type {?} */
        const handler = this.el.createComponent(this.cfr.resolveComponentFactory(ResizableHandlerComponent));
        handler.instance.customClassName = customClassName;
        return handler;
    }
    /**
     * @private
     * @param {?} e
     * @param {?} isLeftDirection
     * @return {?}
     */
    mouseDownHandler(e, isLeftDirection) {
        e.preventDefault();
        e.stopPropagation();
        this.resizeData = {
            xInitial: e.clientX,
            xCurrent: e.clientX,
            offset: 0,
            isLeftDirection,
            isRightDirection: !isLeftDirection
        };
        if (this.wResizable.resizeStart) {
            this.wResizable.resizeStart(this.resizeData);
        }
    }
}
ResizableDirective.decorators = [
    { type: Directive, args: [{
                selector: '[wResizable]'
            },] }
];
/** @nocollapse */
ResizableDirective.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: NgZone },
    { type: ComponentFactoryResolver },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
ResizableDirective.propDecorators = {
    wResizable: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXphYmxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL21vZHVsZXMvcmVzaXphYmxlL3Jlc2l6YWJsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsd0JBQXdCLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFVLGdCQUFnQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRW5ILE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxrQkFBa0IsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLG1CQUFtQixDQUFDOzs7O0FBRTFFLGlDQVFDOzs7SUFQRywrQkFBaUI7O0lBQ2pCLCtCQUFpQjs7SUFFakIsNkJBQWU7O0lBRWYsc0NBQXlCOztJQUN6Qix1Q0FBMEI7Ozs7Ozs7Ozs7QUFjOUIsTUFBTSxPQUFPLGtCQUFrQjs7Ozs7OztJQVMzQixZQUFvQixFQUFvQixFQUNwQixJQUFZLEVBQ1osR0FBNkIsRUFDWCxHQUFHO1FBSHJCLE9BQUUsR0FBRixFQUFFLENBQWtCO1FBQ3BCLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWixRQUFHLEdBQUgsR0FBRyxDQUEwQjtRQUNYLFFBQUcsR0FBSCxHQUFHLENBQUE7UUFMakMsZUFBVSxHQUFnQixJQUFJLENBQUM7SUFNdkMsQ0FBQzs7OztJQUVELFFBQVE7O2NBQ0UsV0FBVyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUM7O2NBQ3BELFlBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDO1FBRTVELFdBQVcsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQWEsRUFBRSxFQUFFO1lBQzVELElBQUks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SUFDckMsaUNBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7Q29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBEaXJlY3RpdmUsIEluamVjdCwgSW5wdXQsIE5nWm9uZSwgT25Jbml0LCBWaWV3Q29udGFpbmVyUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tcG9uZW50UmVmfSBmcm9tICdAYW5ndWxhci9jb3JlL3NyYy9saW5rZXIvY29tcG9uZW50X2ZhY3RvcnknO1xuaW1wb3J0IHtSZXNpemFibGVIYW5kbGVyQ29tcG9uZW50fSBmcm9tICcuL3Jlc2l6YWJsZS1oYW5kbGVyLmNvbXBvbmVudCc7XG5pbXBvcnQge0xFRlRfSEFORExFUl9DTEFTUywgUklHSFRfSEFORExFUl9DTEFTU30gZnJvbSAnLi9yZXNpemFibGUuY29uc3QnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElSZXNpemVEYXRhIHtcbiAgICB4SW5pdGlhbDogbnVtYmVyO1xuICAgIHhDdXJyZW50OiBudW1iZXI7XG5cbiAgICBvZmZzZXQ6IG51bWJlcjtcblxuICAgIGlzTGVmdERpcmVjdGlvbjogYm9vbGVhbjtcbiAgICBpc1JpZ2h0RGlyZWN0aW9uOiBib29sZWFuO1xufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogMS4gZHluYW1pY2FsbHkgYWRkIGxlZnQgYW5kIHJpZ2h0IGhhbmRsZXJzXG4gKiAyLiBhbGxvdyB0byBzaG93L2hpZGUgaGFuZGxlcnNcbiAqIDMuIGNhbGwgY2FsbGJhY2ssIHdoZXJlIHRvIHBhc3NcbiAqICAtIGRpc3RhbmNlIG9uIHdoaWNoIGhhbmRsZXJzIGlzIG1vdmVkXG4gKiAgLSBoYW5kbGVyIHR5cGUgKGxlZnQgb2YgcmlnaHQpXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3dSZXNpemFibGVdJ1xufSlcbmV4cG9ydCBjbGFzcyBSZXNpemFibGVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIHdSZXNpemFibGU6IHtcbiAgICAgICAgcmVzaXplOiAocmVzaXplRGF0YTogSVJlc2l6ZURhdGEpID0+IHZvaWQ7XG4gICAgICAgIHJlc2l6ZVN0YXJ0OiAocmVzaXplRGF0YTogSVJlc2l6ZURhdGEpID0+IHZvaWQ7XG4gICAgICAgIHJlc2l6ZUVuZDogKHJlc2l6ZURhdGE6IElSZXNpemVEYXRhKSA9PiB2b2lkO1xuICAgIH07XG5cbiAgICBwcml2YXRlIHJlc2l6ZURhdGE6IElSZXNpemVEYXRhID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjZnI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgICAgICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvYykge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBjb25zdCBsZWZ0SGFuZGxlciA9IHRoaXMuY3JlYXRlSGFuZGxlcihMRUZUX0hBTkRMRVJfQ0xBU1MpO1xuICAgICAgICBjb25zdCByaWdodEhhbmRsZXIgPSB0aGlzLmNyZWF0ZUhhbmRsZXIoUklHSFRfSEFORExFUl9DTEFTUyk7XG5cbiAgICAgICAgbGVmdEhhbmRsZXIuaW5zdGFuY2UubW91c2VEb3duRXZlbnQuc3Vic2NyaWJlKChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1vdXNlRG93bkhhbmRsZXIoZSwgdHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJpZ2h0SGFuZGxlci5pbnN0YW5jZS5tb3VzZURvd25FdmVudC5zdWJzY3JpYmUoKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMubW91c2VEb3duSGFuZGxlcihlLCBmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMucmVzaXplRGF0YSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzaXplRGF0YS54Q3VycmVudCA9IGV2ZW50LmNsaWVudFg7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZXNpemVEYXRhLmlzTGVmdERpcmVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZURhdGEub2Zmc2V0ID0gdGhpcy5yZXNpemVEYXRhLnhJbml0aWFsIC0gdGhpcy5yZXNpemVEYXRhLnhDdXJyZW50O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5yZXNpemVEYXRhLmlzUmlnaHREaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNpemVEYXRhLm9mZnNldCA9IHRoaXMucmVzaXplRGF0YS54Q3VycmVudCAtIHRoaXMucmVzaXplRGF0YS54SW5pdGlhbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy53UmVzaXphYmxlLnJlc2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndSZXNpemFibGUucmVzaXplKHRoaXMucmVzaXplRGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmRvYy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMud1Jlc2l6YWJsZS5yZXNpemVFbmQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndSZXNpemFibGUucmVzaXplRW5kKHRoaXMucmVzaXplRGF0YSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucmVzaXplRGF0YSA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlSGFuZGxlcihjdXN0b21DbGFzc05hbWU6IHN0cmluZyk6IENvbXBvbmVudFJlZjxSZXNpemFibGVIYW5kbGVyQ29tcG9uZW50PiB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSB0aGlzLmVsLmNyZWF0ZUNvbXBvbmVudChcbiAgICAgICAgICAgIHRoaXMuY2ZyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFJlc2l6YWJsZUhhbmRsZXJDb21wb25lbnQpXG4gICAgICAgICk7XG5cbiAgICAgICAgaGFuZGxlci5pbnN0YW5jZS5jdXN0b21DbGFzc05hbWUgPSBjdXN0b21DbGFzc05hbWU7XG5cbiAgICAgICAgcmV0dXJuIGhhbmRsZXI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtb3VzZURvd25IYW5kbGVyKGU6IE1vdXNlRXZlbnQsIGlzTGVmdERpcmVjdGlvbjogYm9vbGVhbikge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgdGhpcy5yZXNpemVEYXRhID0ge1xuICAgICAgICAgICAgeEluaXRpYWw6IGUuY2xpZW50WCxcbiAgICAgICAgICAgIHhDdXJyZW50OiBlLmNsaWVudFgsXG4gICAgICAgICAgICBvZmZzZXQ6IDAsXG4gICAgICAgICAgICBpc0xlZnREaXJlY3Rpb24sXG4gICAgICAgICAgICBpc1JpZ2h0RGlyZWN0aW9uOiAhaXNMZWZ0RGlyZWN0aW9uXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHRoaXMud1Jlc2l6YWJsZS5yZXNpemVTdGFydCkge1xuICAgICAgICAgICAgdGhpcy53UmVzaXphYmxlLnJlc2l6ZVN0YXJ0KHRoaXMucmVzaXplRGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=