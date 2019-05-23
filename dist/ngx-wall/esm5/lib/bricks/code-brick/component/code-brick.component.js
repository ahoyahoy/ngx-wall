/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this.codeMirrorInstance.on('change', (/**
         * @return {?}
         */
        function () {
            _this.scope.code = _this.codeMirrorInstance.getValue();
            _this.saveState();
        }));
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
        this.ui.displayModeName = SUPPORTED_MODES.find((/**
         * @param {?} mode
         * @return {?}
         */
        function (mode) { return mode.value === _this.scope.mode; })).name;
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
        var modes = SUPPORTED_MODES.map((/**
         * @param {?} mode
         * @return {?}
         */
        function (mode) {
            return tslib_1.__assign({}, mode, { selected: mode.value === _this.scope.mode });
        }));
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
        }).result.then((/**
         * @param {?} mode
         * @return {?}
         */
        function (mode) {
            Object.assign(_this.scope, tslib_1.__assign({}, _this.state, { mode: mode.value }));
            _this.processNewState();
        }), (/**
         * @return {?}
         */
        function () {
            // nothing
        }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS1icmljay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9icmlja3MvY29kZS1icmljay9jb21wb25lbnQvY29kZS1icmljay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLHdCQUF3QixFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUgsT0FBTyxVQUFVLE1BQU0sWUFBWSxDQUFDO0FBQ3BDLE9BQU8sdUNBQXVDLENBQUM7QUFDL0MsT0FBTyw2QkFBNkIsQ0FBQztBQUNyQyxPQUFPLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sRUFBQyxrQkFBa0IsRUFBRSxzQkFBc0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQzVFLE9BQU8sRUFBQyxhQUFhLEVBQUUsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdEUsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sa0NBQWtDLENBQUM7Ozs7QUFFbkUscUNBR0M7OztJQUZHLCtCQUFhOztJQUNiLCtCQUFhOztBQUdqQjtJQTBCSSw0QkFBb0IscUJBQXlDLEVBQ3pDLHdCQUFrRDtRQURsRCwwQkFBcUIsR0FBckIscUJBQXFCLENBQW9CO1FBQ3pDLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFyQnRFLFVBQUssR0FBb0I7WUFDckIsSUFBSSxFQUFFLEVBQUU7WUFDUixJQUFJLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7U0FDakMsQ0FBQztRQUVGLE9BQUUsR0FFRTtZQUNBLGVBQWUsRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTtTQUMzQyxDQUFDO1FBU1EsaUJBQVksR0FBa0MsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUkzRSxDQUFDOzs7O0lBRUQscUNB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LHdCQUF3QjtTQUMxRCxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUk7Ozs7UUFBQyxVQUFDLElBQVM7WUFDckIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsS0FBSyx1QkFDakIsS0FBSSxDQUFDLEtBQUssSUFDYixJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssSUFDbEIsQ0FBQztZQUVILEtBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzQixDQUFDOzs7UUFBRTtZQUNDLFVBQVU7UUFDZCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7O2dCQXZHSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLFlBQVk7b0JBQ3RCLDZIQUEwQzs7aUJBRTdDOzs7O2dCQWJPLGtCQUFrQjtnQkFMUCx3QkFBd0I7OztxQkFpQ3RDLEtBQUs7d0JBQ0wsS0FBSzs0QkFDTCxTQUFTLFNBQUMsV0FBVyxFQUFFLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBQzt1QkFDekMsU0FBUyxTQUFDLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUM7K0JBRXBDLE1BQU07O0lBZ0ZYLHlCQUFDO0NBQUEsQUF4R0QsSUF3R0M7U0FuR1ksa0JBQWtCOzs7SUFDM0IsbUNBR0U7O0lBRUYsZ0NBSUU7O0lBRUYsZ0RBQXdCOztJQUV4QixnQ0FBb0I7O0lBQ3BCLG1DQUFnQzs7SUFDaEMsdUNBQWtFOztJQUNsRSxrQ0FBd0Q7O0lBRXhELDBDQUEyRTs7Ozs7SUFFL0QsbURBQWlEOzs7OztJQUNqRCxzREFBMEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCBDb2RlTWlycm9yIGZyb20gJ2NvZGVtaXJyb3InO1xuaW1wb3J0ICdjb2RlbWlycm9yL21vZGUvamF2YXNjcmlwdC9qYXZhc2NyaXB0JztcbmltcG9ydCAnY29kZW1pcnJvci9tb2RlL3NoZWxsL3NoZWxsJztcbmltcG9ydCAnY29kZW1pcnJvci9tb2RlL3htbC94bWwnO1xuaW1wb3J0IHtTdGlja3lNb2RhbFNlcnZpY2UsIFN0aWNreVBvc2l0aW9uU3RyYXRlZ3l9IGZyb20gJ25neC1zdGlja3ktbW9kYWwnO1xuaW1wb3J0IHtERUZBVUxUX1RIRU1FLCBTVVBQT1JURURfTU9ERVN9IGZyb20gJy4uL2NvZGUtYnJpY2suY29uc3RhbnQnO1xuaW1wb3J0IHtNb2RlTGlzdENvbXBvbmVudH0gZnJvbSAnLi4vbW9kZS1saXN0L21vZGUtbGlzdC5jb21wb25lbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElDb2RlQnJpY2tTdGF0ZSB7XG4gICAgY29kZTogc3RyaW5nO1xuICAgIG1vZGU6IHN0cmluZztcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdjb2RlLWJyaWNrJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY29kZS1icmljay5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vY29kZS1icmljay5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIENvZGVCcmlja0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgc2NvcGU6IElDb2RlQnJpY2tTdGF0ZSA9IHtcbiAgICAgICAgY29kZTogJycsXG4gICAgICAgIG1vZGU6IFNVUFBPUlRFRF9NT0RFU1swXS52YWx1ZVxuICAgIH07XG5cbiAgICB1aToge1xuICAgICAgICBkaXNwbGF5TW9kZU5hbWU6IHN0cmluZztcbiAgICB9ID0ge1xuICAgICAgICBkaXNwbGF5TW9kZU5hbWU6IFNVUFBPUlRFRF9NT0RFU1swXS5uYW1lXG4gICAgfTtcblxuICAgIGNvZGVNaXJyb3JJbnN0YW5jZTogYW55O1xuXG4gICAgQElucHV0KCkgaWQ6IHN0cmluZztcbiAgICBASW5wdXQoKSBzdGF0ZTogSUNvZGVCcmlja1N0YXRlO1xuICAgIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicsIHtyZWFkOiBFbGVtZW50UmVmfSkgY29udGFpbmVyOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoJ21vZGUnLCB7cmVhZDogRWxlbWVudFJlZn0pIG1vZGU6IEVsZW1lbnRSZWY7XG5cbiAgICBAT3V0cHV0KCkgc3RhdGVDaGFuZ2VzOiBFdmVudEVtaXR0ZXI8SUNvZGVCcmlja1N0YXRlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbmd4U3RpY2t5TW9kYWxTZXJ2aWNlOiBTdGlja3lNb2RhbFNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcikge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuc2NvcGUsIHRoaXMuc3RhdGUpO1xuXG4gICAgICAgIHRoaXMuY29kZU1pcnJvckluc3RhbmNlID0gQ29kZU1pcnJvcih0aGlzLmNvbnRhaW5lci5uYXRpdmVFbGVtZW50LCB7XG4gICAgICAgICAgICB2YWx1ZTogYGAsXG4gICAgICAgICAgICBtb2RlOiB0aGlzLnNjb3BlLm1vZGUsXG4gICAgICAgICAgICB0aGVtZTogREVGQVVMVF9USEVNRSxcbiAgICAgICAgICAgIGRyYWdEcm9wOiBmYWxzZSxcbiAgICAgICAgICAgIHNjcm9sbGJhclN0eWxlOiBudWxsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY29kZU1pcnJvckluc3RhbmNlLm9uKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNjb3BlLmNvZGUgPSB0aGlzLmNvZGVNaXJyb3JJbnN0YW5jZS5nZXRWYWx1ZSgpO1xuXG4gICAgICAgICAgICB0aGlzLnNhdmVTdGF0ZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnByb2Nlc3NOZXdTdGF0ZSgpO1xuICAgIH1cblxuICAgIG9uV2FsbFN0YXRlQ2hhbmdlKG5ld1N0YXRlOiBJQ29kZUJyaWNrU3RhdGUpIHtcbiAgICAgICAgaWYgKG5ld1N0YXRlICYmIG5ld1N0YXRlLmNvZGUgIT09IHRoaXMuc2NvcGUuY29kZSkge1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLnNjb3BlLCB0aGlzLnN0YXRlKTtcblxuICAgICAgICAgICAgdGhpcy5wcm9jZXNzTmV3U3RhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb2Nlc3NOZXdTdGF0ZSgpIHtcbiAgICAgICAgdGhpcy5jb2RlTWlycm9ySW5zdGFuY2Uuc2V0VmFsdWUodGhpcy5zY29wZS5jb2RlKTtcblxuICAgICAgICBpZiAodGhpcy5zY29wZS5tb2RlICE9PSB0aGlzLmNvZGVNaXJyb3JJbnN0YW5jZS5nZXRNb2RlKCkubmFtZSkge1xuICAgICAgICAgICAgdGhpcy5jb2RlTWlycm9ySW5zdGFuY2Uuc2V0T3B0aW9uKCdtb2RlJywgdGhpcy5zY29wZS5tb2RlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudWkuZGlzcGxheU1vZGVOYW1lID0gU1VQUE9SVEVEX01PREVTLmZpbmQoKG1vZGUpID0+IG1vZGUudmFsdWUgPT09IHRoaXMuc2NvcGUubW9kZSkubmFtZTtcbiAgICB9XG5cbiAgICBzYXZlU3RhdGUoKSB7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLmVtaXQodGhpcy5zY29wZSk7XG4gICAgfVxuXG4gICAgb25Nb2RlU2VsZWN0ZWQoKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRCb3VuZGluZ1JlY3QgPSB0aGlzLm1vZGUubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICBjb25zdCBtb2RlczogYW55W10gPSBTVVBQT1JURURfTU9ERVMubWFwKChtb2RlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLm1vZGUsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IG1vZGUudmFsdWUgPT09IHRoaXMuc2NvcGUubW9kZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5uZ3hTdGlja3lNb2RhbFNlcnZpY2Uub3Blbih7XG4gICAgICAgICAgICBjb21wb25lbnQ6IE1vZGVMaXN0Q29tcG9uZW50LFxuICAgICAgICAgICAgZGF0YToge21vZGVzfSxcbiAgICAgICAgICAgIHBvc2l0aW9uU3RyYXRlZ3k6IHtcbiAgICAgICAgICAgICAgICBuYW1lOiBTdGlja3lQb3NpdGlvblN0cmF0ZWd5LmNvb3JkaW5hdGUsXG4gICAgICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICBjbGllbnRYOiBlbGVtZW50Qm91bmRpbmdSZWN0LngsXG4gICAgICAgICAgICAgICAgICAgIGNsaWVudFk6IGVsZW1lbnRCb3VuZGluZ1JlY3QueSArIDM1XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXJcbiAgICAgICAgfSkucmVzdWx0LnRoZW4oKG1vZGU6IGFueSkgPT4ge1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLnNjb3BlLCB7XG4gICAgICAgICAgICAgICAgLi4udGhpcy5zdGF0ZSxcbiAgICAgICAgICAgICAgICBtb2RlOiBtb2RlLnZhbHVlXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5wcm9jZXNzTmV3U3RhdGUoKTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgLy8gbm90aGluZ1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=