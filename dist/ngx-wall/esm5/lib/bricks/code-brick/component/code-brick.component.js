/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ComponentFactoryResolver, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/shell/shell';
import 'codemirror/mode/xml/xml';
import { StickyModalService, StickyPositionStrategy } from 'ngx-sticky-modal';
import { DEFAULT_THEME, SUPPORTED_MODES } from '../code-brick.constant';
import { ModeListComponent } from '../mode-list/mode-list.component';
/**
 * @record
 */
export function ICodeBrickState() { }
if (false) {
    /** @type {?} */
    ICodeBrickState.prototype.code;
    /** @type {?} */
    ICodeBrickState.prototype.mode;
}
var CodeBrickComponent = /** @class */ (function () {
    function CodeBrickComponent(ngxStickyModalService, componentFactoryResolver) {
        this.ngxStickyModalService = ngxStickyModalService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.scope = {
            code: '',
            mode: SUPPORTED_MODES[0].value
        };
        this.ui = {
            displayModeName: SUPPORTED_MODES[0].name
        };
        this.stateChanges = new EventEmitter();
    }
    /**
     * @return {?}
     */
    CodeBrickComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        Object.assign(this.scope, this.state);
        this.codeMirrorInstance = CodeMirror(this.container.nativeElement, {
            value: "",
            mode: this.scope.mode,
            theme: DEFAULT_THEME,
            dragDrop: false,
            scrollbarStyle: null
        });
        this.codeMirrorInstance.on('change', function () {
            _this.scope.code = _this.codeMirrorInstance.getValue();
            _this.saveState();
        });
        this.processNewState();
    };
    /**
     * @param {?} newState
     * @return {?}
     */
    CodeBrickComponent.prototype.onWallStateChange = /**
     * @param {?} newState
     * @return {?}
     */
    function (newState) {
        if (newState && newState.code !== this.scope.code) {
            Object.assign(this.scope, this.state);
            this.processNewState();
        }
    };
    /**
     * @return {?}
     */
    CodeBrickComponent.prototype.processNewState = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.codeMirrorInstance.setValue(this.scope.code);
        if (this.scope.mode !== this.codeMirrorInstance.getMode().name) {
            this.codeMirrorInstance.setOption('mode', this.scope.mode);
        }
        this.ui.displayModeName = SUPPORTED_MODES.find(function (mode) { return mode.value === _this.scope.mode; }).name;
    };
    /**
     * @return {?}
     */
    CodeBrickComponent.prototype.saveState = /**
     * @return {?}
     */
    function () {
        this.stateChanges.emit(this.scope);
    };
    /**
     * @return {?}
     */
    CodeBrickComponent.prototype.onModeSelected = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var elementBoundingRect = this.mode.nativeElement.getBoundingClientRect();
        /** @type {?} */
        var modes = SUPPORTED_MODES.map(function (mode) {
            return tslib_1.__assign({}, mode, { selected: mode.value === _this.scope.mode });
        });
        this.ngxStickyModalService.open({
            component: ModeListComponent,
            data: { modes: modes },
            positionStrategy: {
                name: StickyPositionStrategy.coordinate,
                options: {
                    clientX: elementBoundingRect.x,
                    clientY: elementBoundingRect.y + 35
                }
            },
            componentFactoryResolver: this.componentFactoryResolver
        }).result.then(function (mode) {
            Object.assign(_this.scope, tslib_1.__assign({}, _this.state, { mode: mode.value }));
            _this.processNewState();
        }, function () {
            // nothing
        });
    };
    CodeBrickComponent.decorators = [
        { type: Component, args: [{
                    selector: 'code-brick',
                    template: "<div #container></div>\n\n<button #mode (click)=\"onModeSelected()\" mat-button>{{ui.displayModeName}}</button>\n",
                    styles: ["::ng-deep .CodeMirror{padding:1rem 1.4rem;height:auto}::ng-deep .CodeMirror .CodeMirror-cursor{width:1px}::ng-deep .CodeMirror .CodeMirror-scroll{overflow:hidden!important}.mat-button{position:absolute;right:.7rem;bottom:.7rem;z-index:2}"]
                }] }
    ];
    /** @nocollapse */
    CodeBrickComponent.ctorParameters = function () { return [
        { type: StickyModalService },
        { type: ComponentFactoryResolver }
    ]; };
    CodeBrickComponent.propDecorators = {
        id: [{ type: Input }],
        state: [{ type: Input }],
        container: [{ type: ViewChild, args: ['container', { read: ElementRef },] }],
        mode: [{ type: ViewChild, args: ['mode', { read: ElementRef },] }],
        stateChanges: [{ type: Output }]
    };
    return CodeBrickComponent;
}());
export { CodeBrickComponent };
if (false) {
    /** @type {?} */
    CodeBrickComponent.prototype.scope;
    /** @type {?} */
    CodeBrickComponent.prototype.ui;
    /** @type {?} */
    CodeBrickComponent.prototype.codeMirrorInstance;
    /** @type {?} */
    CodeBrickComponent.prototype.id;
    /** @type {?} */
    CodeBrickComponent.prototype.state;
    /** @type {?} */
    CodeBrickComponent.prototype.container;
    /** @type {?} */
    CodeBrickComponent.prototype.mode;
    /** @type {?} */
    CodeBrickComponent.prototype.stateChanges;
    /**
     * @type {?}
     * @private
     */
    CodeBrickComponent.prototype.ngxStickyModalService;
    /**
     * @type {?}
     * @private
     */
    CodeBrickComponent.prototype.componentFactoryResolver;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS1icmljay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9icmlja3MvY29kZS1icmljay9jb21wb25lbnQvY29kZS1icmljay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLHdCQUF3QixFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUgsT0FBTyxVQUFVLE1BQU0sWUFBWSxDQUFDO0FBQ3BDLE9BQU8sdUNBQXVDLENBQUM7QUFDL0MsT0FBTyw2QkFBNkIsQ0FBQztBQUNyQyxPQUFPLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sRUFBQyxrQkFBa0IsRUFBRSxzQkFBc0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQzVFLE9BQU8sRUFBQyxhQUFhLEVBQUUsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdEUsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sa0NBQWtDLENBQUM7Ozs7QUFFbkUscUNBR0M7OztJQUZHLCtCQUFhOztJQUNiLCtCQUFhOztBQUdqQjtJQTBCSSw0QkFBb0IscUJBQXlDLEVBQ3pDLHdCQUFrRDtRQURsRCwwQkFBcUIsR0FBckIscUJBQXFCLENBQW9CO1FBQ3pDLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFyQnRFLFVBQUssR0FBb0I7WUFDckIsSUFBSSxFQUFFLEVBQUU7WUFDUixJQUFJLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7U0FDakMsQ0FBQztRQUVGLE9BQUUsR0FFRTtZQUNBLGVBQWUsRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTtTQUMzQyxDQUFDO1FBU1EsaUJBQVksR0FBa0MsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUkzRSxDQUFDOzs7O0lBRUQscUNB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U0FDMUQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFTO1lBQ3JCLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLEtBQUssdUJBQ2pCLEtBQUksQ0FBQyxLQUFLLElBQ2IsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLElBQ2xCLENBQUM7WUFFSCxLQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0IsQ0FBQyxFQUFFO1lBQ0MsVUFBVTtRQUNkLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7Z0JBdkdKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsWUFBWTtvQkFDdEIsNkhBQTBDOztpQkFFN0M7Ozs7Z0JBYk8sa0JBQWtCO2dCQUxQLHdCQUF3Qjs7O3FCQWlDdEMsS0FBSzt3QkFDTCxLQUFLOzRCQUNMLFNBQVMsU0FBQyxXQUFXLEVBQUUsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFDO3VCQUN6QyxTQUFTLFNBQUMsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBQzsrQkFFcEMsTUFBTTs7SUFnRlgseUJBQUM7Q0FBQSxBQXhHRCxJQXdHQztTQW5HWSxrQkFBa0I7OztJQUMzQixtQ0FHRTs7SUFFRixnQ0FJRTs7SUFFRixnREFBd0I7O0lBRXhCLGdDQUFvQjs7SUFDcEIsbUNBQWdDOztJQUNoQyx1Q0FBa0U7O0lBQ2xFLGtDQUF3RDs7SUFFeEQsMENBQTJFOzs7OztJQUUvRCxtREFBaUQ7Ozs7O0lBQ2pELHNEQUEwRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IENvZGVNaXJyb3IgZnJvbSAnY29kZW1pcnJvcic7XG5pbXBvcnQgJ2NvZGVtaXJyb3IvbW9kZS9qYXZhc2NyaXB0L2phdmFzY3JpcHQnO1xuaW1wb3J0ICdjb2RlbWlycm9yL21vZGUvc2hlbGwvc2hlbGwnO1xuaW1wb3J0ICdjb2RlbWlycm9yL21vZGUveG1sL3htbCc7XG5pbXBvcnQge1N0aWNreU1vZGFsU2VydmljZSwgU3RpY2t5UG9zaXRpb25TdHJhdGVneX0gZnJvbSAnbmd4LXN0aWNreS1tb2RhbCc7XG5pbXBvcnQge0RFRkFVTFRfVEhFTUUsIFNVUFBPUlRFRF9NT0RFU30gZnJvbSAnLi4vY29kZS1icmljay5jb25zdGFudCc7XG5pbXBvcnQge01vZGVMaXN0Q29tcG9uZW50fSBmcm9tICcuLi9tb2RlLWxpc3QvbW9kZS1saXN0LmNvbXBvbmVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvZGVCcmlja1N0YXRlIHtcbiAgICBjb2RlOiBzdHJpbmc7XG4gICAgbW9kZTogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2NvZGUtYnJpY2snLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jb2RlLWJyaWNrLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9jb2RlLWJyaWNrLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ29kZUJyaWNrQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBzY29wZTogSUNvZGVCcmlja1N0YXRlID0ge1xuICAgICAgICBjb2RlOiAnJyxcbiAgICAgICAgbW9kZTogU1VQUE9SVEVEX01PREVTWzBdLnZhbHVlXG4gICAgfTtcblxuICAgIHVpOiB7XG4gICAgICAgIGRpc3BsYXlNb2RlTmFtZTogc3RyaW5nO1xuICAgIH0gPSB7XG4gICAgICAgIGRpc3BsYXlNb2RlTmFtZTogU1VQUE9SVEVEX01PREVTWzBdLm5hbWVcbiAgICB9O1xuXG4gICAgY29kZU1pcnJvckluc3RhbmNlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBpZDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHN0YXRlOiBJQ29kZUJyaWNrU3RhdGU7XG4gICAgQFZpZXdDaGlsZCgnY29udGFpbmVyJywge3JlYWQ6IEVsZW1lbnRSZWZ9KSBjb250YWluZXI6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgnbW9kZScsIHtyZWFkOiBFbGVtZW50UmVmfSkgbW9kZTogRWxlbWVudFJlZjtcblxuICAgIEBPdXRwdXQoKSBzdGF0ZUNoYW5nZXM6IEV2ZW50RW1pdHRlcjxJQ29kZUJyaWNrU3RhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ3hTdGlja3lNb2RhbFNlcnZpY2U6IFN0aWNreU1vZGFsU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5zY29wZSwgdGhpcy5zdGF0ZSk7XG5cbiAgICAgICAgdGhpcy5jb2RlTWlycm9ySW5zdGFuY2UgPSBDb2RlTWlycm9yKHRoaXMuY29udGFpbmVyLm5hdGl2ZUVsZW1lbnQsIHtcbiAgICAgICAgICAgIHZhbHVlOiBgYCxcbiAgICAgICAgICAgIG1vZGU6IHRoaXMuc2NvcGUubW9kZSxcbiAgICAgICAgICAgIHRoZW1lOiBERUZBVUxUX1RIRU1FLFxuICAgICAgICAgICAgZHJhZ0Ryb3A6IGZhbHNlLFxuICAgICAgICAgICAgc2Nyb2xsYmFyU3R5bGU6IG51bGxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jb2RlTWlycm9ySW5zdGFuY2Uub24oJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2NvcGUuY29kZSA9IHRoaXMuY29kZU1pcnJvckluc3RhbmNlLmdldFZhbHVlKCk7XG5cbiAgICAgICAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucHJvY2Vzc05ld1N0YXRlKCk7XG4gICAgfVxuXG4gICAgb25XYWxsU3RhdGVDaGFuZ2UobmV3U3RhdGU6IElDb2RlQnJpY2tTdGF0ZSkge1xuICAgICAgICBpZiAobmV3U3RhdGUgJiYgbmV3U3RhdGUuY29kZSAhPT0gdGhpcy5zY29wZS5jb2RlKSB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuc2NvcGUsIHRoaXMuc3RhdGUpO1xuXG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NOZXdTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvY2Vzc05ld1N0YXRlKCkge1xuICAgICAgICB0aGlzLmNvZGVNaXJyb3JJbnN0YW5jZS5zZXRWYWx1ZSh0aGlzLnNjb3BlLmNvZGUpO1xuXG4gICAgICAgIGlmICh0aGlzLnNjb3BlLm1vZGUgIT09IHRoaXMuY29kZU1pcnJvckluc3RhbmNlLmdldE1vZGUoKS5uYW1lKSB7XG4gICAgICAgICAgICB0aGlzLmNvZGVNaXJyb3JJbnN0YW5jZS5zZXRPcHRpb24oJ21vZGUnLCB0aGlzLnNjb3BlLm1vZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51aS5kaXNwbGF5TW9kZU5hbWUgPSBTVVBQT1JURURfTU9ERVMuZmluZCgobW9kZSkgPT4gbW9kZS52YWx1ZSA9PT0gdGhpcy5zY29wZS5tb2RlKS5uYW1lO1xuICAgIH1cblxuICAgIHNhdmVTdGF0ZSgpIHtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMuZW1pdCh0aGlzLnNjb3BlKTtcbiAgICB9XG5cbiAgICBvbk1vZGVTZWxlY3RlZCgpIHtcbiAgICAgICAgY29uc3QgZWxlbWVudEJvdW5kaW5nUmVjdCA9IHRoaXMubW9kZS5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIGNvbnN0IG1vZGVzOiBhbnlbXSA9IFNVUFBPUlRFRF9NT0RFUy5tYXAoKG1vZGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4ubW9kZSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogbW9kZS52YWx1ZSA9PT0gdGhpcy5zY29wZS5tb2RlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm5neFN0aWNreU1vZGFsU2VydmljZS5vcGVuKHtcbiAgICAgICAgICAgIGNvbXBvbmVudDogTW9kZUxpc3RDb21wb25lbnQsXG4gICAgICAgICAgICBkYXRhOiB7bW9kZXN9LFxuICAgICAgICAgICAgcG9zaXRpb25TdHJhdGVneToge1xuICAgICAgICAgICAgICAgIG5hbWU6IFN0aWNreVBvc2l0aW9uU3RyYXRlZ3kuY29vcmRpbmF0ZSxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWVudFg6IGVsZW1lbnRCb3VuZGluZ1JlY3QueCxcbiAgICAgICAgICAgICAgICAgICAgY2xpZW50WTogZWxlbWVudEJvdW5kaW5nUmVjdC55ICsgMzVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlclxuICAgICAgICB9KS5yZXN1bHQudGhlbigobW9kZTogYW55KSA9PiB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuc2NvcGUsIHtcbiAgICAgICAgICAgICAgICAuLi50aGlzLnN0YXRlLFxuICAgICAgICAgICAgICAgIG1vZGU6IG1vZGUudmFsdWVcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NOZXdTdGF0ZSgpO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAvLyBub3RoaW5nXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==