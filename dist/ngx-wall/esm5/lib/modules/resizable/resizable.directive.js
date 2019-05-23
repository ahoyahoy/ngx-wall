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
        leftHandler.instance.mouseDownEvent.subscribe(function (e) {
            _this.mouseDownHandler(e, true);
        });
        rightHandler.instance.mouseDownEvent.subscribe(function (e) {
            _this.mouseDownHandler(e, false);
        });
        this.doc.addEventListener('mousemove', function (event) {
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
        });
        this.doc.addEventListener('mouseup', function () {
            if (_this.wResizable.resizeEnd) {
                _this.wResizable.resizeEnd(_this.resizeData);
            }
            _this.resizeData = null;
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXphYmxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL21vZHVsZXMvcmVzaXphYmxlL3Jlc2l6YWJsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsd0JBQXdCLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFVLGdCQUFnQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRW5ILE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxrQkFBa0IsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLG1CQUFtQixDQUFDOzs7O0FBRTFFLGlDQVFDOzs7SUFQRywrQkFBaUI7O0lBQ2pCLCtCQUFpQjs7SUFFakIsNkJBQWU7O0lBRWYsc0NBQXlCOztJQUN6Qix1Q0FBMEI7Ozs7Ozs7Ozs7QUFXOUI7SUFZSSw0QkFBb0IsRUFBb0IsRUFDcEIsSUFBWSxFQUNaLEdBQTZCLEVBQ1gsR0FBRztRQUhyQixPQUFFLEdBQUYsRUFBRSxDQUFrQjtRQUNwQixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1osUUFBRyxHQUFILEdBQUcsQ0FBMEI7UUFDWCxRQUFHLEdBQUgsR0FBRyxDQUFBO1FBTGpDLGVBQVUsR0FBZ0IsSUFBSSxDQUFDO0lBTXZDLENBQUM7Ozs7SUFFRCxxQ0FBUTs7O0lBQVI7UUFBQSxpQkFtQ0M7O1lBbENTLFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDOztZQUNwRCxZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQztRQUU1RCxXQUFXLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsVUFBQyxDQUFhO1lBQ3hELEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFFSCxZQUFZLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsVUFBQyxDQUFhO1lBQ3pELEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxVQUFDLEtBQWlCO1lBQ3JELElBQUksS0FBSSxDQUFDLFVBQVUsRUFBRTtnQkFDakIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztnQkFFekMsSUFBSSxLQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRTtvQkFDakMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7aUJBQ2hGO3FCQUFNLElBQUksS0FBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRTtvQkFDekMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7aUJBQ2hGO2dCQUVELElBQUksS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUU7b0JBQ3hCLEtBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztpQkFDM0M7YUFDSjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUU7WUFDakMsSUFBSSxLQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRTtnQkFDM0IsS0FBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQzlDO1lBRUQsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOzs7Ozs7SUFFTywwQ0FBYTs7Ozs7SUFBckIsVUFBc0IsZUFBdUI7O1lBQ25DLE9BQU8sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FDbkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyx5QkFBeUIsQ0FBQyxDQUM5RDtRQUVELE9BQU8sQ0FBQyxRQUFRLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztRQUVuRCxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDOzs7Ozs7O0lBRU8sNkNBQWdCOzs7Ozs7SUFBeEIsVUFBeUIsQ0FBYSxFQUFFLGVBQXdCO1FBQzVELENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNuQixDQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFcEIsSUFBSSxDQUFDLFVBQVUsR0FBRztZQUNkLFFBQVEsRUFBRSxDQUFDLENBQUMsT0FBTztZQUNuQixRQUFRLEVBQUUsQ0FBQyxDQUFDLE9BQU87WUFDbkIsTUFBTSxFQUFFLENBQUM7WUFDVCxlQUFlLGlCQUFBO1lBQ2YsZ0JBQWdCLEVBQUUsQ0FBQyxlQUFlO1NBQ3JDLENBQUM7UUFFRixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFO1lBQzdCLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNoRDtJQUNMLENBQUM7O2dCQWhGSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGNBQWM7aUJBQzNCOzs7O2dCQXpCMkUsZ0JBQWdCO2dCQUFoQyxNQUFNO2dCQUExRCx3QkFBd0I7Z0RBc0NmLE1BQU0sU0FBQyxRQUFROzs7NkJBWDNCLEtBQUs7O0lBNkVWLHlCQUFDO0NBQUEsQUFqRkQsSUFpRkM7U0E5RVksa0JBQWtCOzs7SUFDM0Isd0NBSUU7Ozs7O0lBRUYsd0NBQXVDOzs7OztJQUUzQixnQ0FBNEI7Ozs7O0lBQzVCLGtDQUFvQjs7Ozs7SUFDcEIsaUNBQXFDOzs7OztJQUNyQyxpQ0FBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIERpcmVjdGl2ZSwgSW5qZWN0LCBJbnB1dCwgTmdab25lLCBPbkluaXQsIFZpZXdDb250YWluZXJSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21wb25lbnRSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUvc3JjL2xpbmtlci9jb21wb25lbnRfZmFjdG9yeSc7XG5pbXBvcnQge1Jlc2l6YWJsZUhhbmRsZXJDb21wb25lbnR9IGZyb20gJy4vcmVzaXphYmxlLWhhbmRsZXIuY29tcG9uZW50JztcbmltcG9ydCB7TEVGVF9IQU5ETEVSX0NMQVNTLCBSSUdIVF9IQU5ETEVSX0NMQVNTfSBmcm9tICcuL3Jlc2l6YWJsZS5jb25zdCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVJlc2l6ZURhdGEge1xuICAgIHhJbml0aWFsOiBudW1iZXI7XG4gICAgeEN1cnJlbnQ6IG51bWJlcjtcblxuICAgIG9mZnNldDogbnVtYmVyO1xuXG4gICAgaXNMZWZ0RGlyZWN0aW9uOiBib29sZWFuO1xuICAgIGlzUmlnaHREaXJlY3Rpb246IGJvb2xlYW47XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiAxLiBkeW5hbWljYWxseSBhZGQgbGVmdCBhbmQgcmlnaHQgaGFuZGxlcnNcbiAqIDIuIGFsbG93IHRvIHNob3cvaGlkZSBoYW5kbGVyc1xuICogMy4gY2FsbCBjYWxsYmFjaywgd2hlcmUgdG8gcGFzc1xuICogIC0gZGlzdGFuY2Ugb24gd2hpY2ggaGFuZGxlcnMgaXMgbW92ZWRcbiAqICAtIGhhbmRsZXIgdHlwZSAobGVmdCBvZiByaWdodClcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbd1Jlc2l6YWJsZV0nXG59KVxuZXhwb3J0IGNsYXNzIFJlc2l6YWJsZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KCkgd1Jlc2l6YWJsZToge1xuICAgICAgICByZXNpemU6IChyZXNpemVEYXRhOiBJUmVzaXplRGF0YSkgPT4gdm9pZDtcbiAgICAgICAgcmVzaXplU3RhcnQ6IChyZXNpemVEYXRhOiBJUmVzaXplRGF0YSkgPT4gdm9pZDtcbiAgICAgICAgcmVzaXplRW5kOiAocmVzaXplRGF0YTogSVJlc2l6ZURhdGEpID0+IHZvaWQ7XG4gICAgfTtcblxuICAgIHByaXZhdGUgcmVzaXplRGF0YTogSVJlc2l6ZURhdGEgPSBudWxsO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgICAgICAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGNmcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgICAgICAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGNvbnN0IGxlZnRIYW5kbGVyID0gdGhpcy5jcmVhdGVIYW5kbGVyKExFRlRfSEFORExFUl9DTEFTUyk7XG4gICAgICAgIGNvbnN0IHJpZ2h0SGFuZGxlciA9IHRoaXMuY3JlYXRlSGFuZGxlcihSSUdIVF9IQU5ETEVSX0NMQVNTKTtcblxuICAgICAgICBsZWZ0SGFuZGxlci5pbnN0YW5jZS5tb3VzZURvd25FdmVudC5zdWJzY3JpYmUoKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMubW91c2VEb3duSGFuZGxlcihlLCB0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmlnaHRIYW5kbGVyLmluc3RhbmNlLm1vdXNlRG93bkV2ZW50LnN1YnNjcmliZSgoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5tb3VzZURvd25IYW5kbGVyKGUsIGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5kb2MuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5yZXNpemVEYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNpemVEYXRhLnhDdXJyZW50ID0gZXZlbnQuY2xpZW50WDtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlc2l6ZURhdGEuaXNMZWZ0RGlyZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzaXplRGF0YS5vZmZzZXQgPSB0aGlzLnJlc2l6ZURhdGEueEluaXRpYWwgLSB0aGlzLnJlc2l6ZURhdGEueEN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnJlc2l6ZURhdGEuaXNSaWdodERpcmVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZURhdGEub2Zmc2V0ID0gdGhpcy5yZXNpemVEYXRhLnhDdXJyZW50IC0gdGhpcy5yZXNpemVEYXRhLnhJbml0aWFsO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLndSZXNpemFibGUucmVzaXplKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud1Jlc2l6YWJsZS5yZXNpemUodGhpcy5yZXNpemVEYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy53UmVzaXphYmxlLnJlc2l6ZUVuZCkge1xuICAgICAgICAgICAgICAgIHRoaXMud1Jlc2l6YWJsZS5yZXNpemVFbmQodGhpcy5yZXNpemVEYXRhKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5yZXNpemVEYXRhID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVIYW5kbGVyKGN1c3RvbUNsYXNzTmFtZTogc3RyaW5nKTogQ29tcG9uZW50UmVmPFJlc2l6YWJsZUhhbmRsZXJDb21wb25lbnQ+IHtcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IHRoaXMuZWwuY3JlYXRlQ29tcG9uZW50KFxuICAgICAgICAgICAgdGhpcy5jZnIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoUmVzaXphYmxlSGFuZGxlckNvbXBvbmVudClcbiAgICAgICAgKTtcblxuICAgICAgICBoYW5kbGVyLmluc3RhbmNlLmN1c3RvbUNsYXNzTmFtZSA9IGN1c3RvbUNsYXNzTmFtZTtcblxuICAgICAgICByZXR1cm4gaGFuZGxlcjtcbiAgICB9XG5cbiAgICBwcml2YXRlIG1vdXNlRG93bkhhbmRsZXIoZTogTW91c2VFdmVudCwgaXNMZWZ0RGlyZWN0aW9uOiBib29sZWFuKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICB0aGlzLnJlc2l6ZURhdGEgPSB7XG4gICAgICAgICAgICB4SW5pdGlhbDogZS5jbGllbnRYLFxuICAgICAgICAgICAgeEN1cnJlbnQ6IGUuY2xpZW50WCxcbiAgICAgICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgICAgIGlzTGVmdERpcmVjdGlvbixcbiAgICAgICAgICAgIGlzUmlnaHREaXJlY3Rpb246ICFpc0xlZnREaXJlY3Rpb25cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodGhpcy53UmVzaXphYmxlLnJlc2l6ZVN0YXJ0KSB7XG4gICAgICAgICAgICB0aGlzLndSZXNpemFibGUucmVzaXplU3RhcnQodGhpcy5yZXNpemVEYXRhKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==