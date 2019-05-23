/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class CodeBrickComponent {
    /**
     * @param {?} ngxStickyModalService
     * @param {?} componentFactoryResolver
     */
    constructor(ngxStickyModalService, componentFactoryResolver) {
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
    ngOnInit() {
        Object.assign(this.scope, this.state);
        this.codeMirrorInstance = CodeMirror(this.container.nativeElement, {
            value: ``,
            mode: this.scope.mode,
            theme: DEFAULT_THEME,
            dragDrop: false,
            scrollbarStyle: null
        });
        this.codeMirrorInstance.on('change', (/**
         * @return {?}
         */
        () => {
            this.scope.code = this.codeMirrorInstance.getValue();
            this.saveState();
        }));
        this.processNewState();
    }
    /**
     * @param {?} newState
     * @return {?}
     */
    onWallStateChange(newState) {
        if (newState && newState.code !== this.scope.code) {
            Object.assign(this.scope, this.state);
            this.processNewState();
        }
    }
    /**
     * @return {?}
     */
    processNewState() {
        this.codeMirrorInstance.setValue(this.scope.code);
        if (this.scope.mode !== this.codeMirrorInstance.getMode().name) {
            this.codeMirrorInstance.setOption('mode', this.scope.mode);
        }
        this.ui.displayModeName = SUPPORTED_MODES.find((/**
         * @param {?} mode
         * @return {?}
         */
        (mode) => mode.value === this.scope.mode)).name;
    }
    /**
     * @return {?}
     */
    saveState() {
        this.stateChanges.emit(this.scope);
    }
    /**
     * @return {?}
     */
    onModeSelected() {
        /** @type {?} */
        const elementBoundingRect = this.mode.nativeElement.getBoundingClientRect();
        /** @type {?} */
        const modes = SUPPORTED_MODES.map((/**
         * @param {?} mode
         * @return {?}
         */
        (mode) => {
            return Object.assign({}, mode, { selected: mode.value === this.scope.mode });
        }));
        this.ngxStickyModalService.open({
            component: ModeListComponent,
            data: { modes },
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
        (mode) => {
            Object.assign(this.scope, Object.assign({}, this.state, { mode: mode.value }));
            this.processNewState();
        }), (/**
         * @return {?}
         */
        () => {
            // nothing
        }));
    }
}
CodeBrickComponent.decorators = [
    { type: Component, args: [{
                selector: 'code-brick',
                template: "<div #container></div>\n\n<button #mode (click)=\"onModeSelected()\" mat-button>{{ui.displayModeName}}</button>\n",
                styles: ["::ng-deep .CodeMirror{padding:1rem 1.4rem;height:auto}::ng-deep .CodeMirror .CodeMirror-cursor{width:1px}::ng-deep .CodeMirror .CodeMirror-scroll{overflow:hidden!important}.mat-button{position:absolute;right:.7rem;bottom:.7rem;z-index:2}"]
            }] }
];
/** @nocollapse */
CodeBrickComponent.ctorParameters = () => [
    { type: StickyModalService },
    { type: ComponentFactoryResolver }
];
CodeBrickComponent.propDecorators = {
    id: [{ type: Input }],
    state: [{ type: Input }],
    container: [{ type: ViewChild, args: ['container', { read: ElementRef },] }],
    mode: [{ type: ViewChild, args: ['mode', { read: ElementRef },] }],
    stateChanges: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS1icmljay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9icmlja3MvY29kZS1icmljay9jb21wb25lbnQvY29kZS1icmljay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsd0JBQXdCLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM5SCxPQUFPLFVBQVUsTUFBTSxZQUFZLENBQUM7QUFDcEMsT0FBTyx1Q0FBdUMsQ0FBQztBQUMvQyxPQUFPLDZCQUE2QixDQUFDO0FBQ3JDLE9BQU8seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUFDLGtCQUFrQixFQUFFLHNCQUFzQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDNUUsT0FBTyxFQUFDLGFBQWEsRUFBRSxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQzs7OztBQUVuRSxxQ0FHQzs7O0lBRkcsK0JBQWE7O0lBQ2IsK0JBQWE7O0FBUWpCLE1BQU0sT0FBTyxrQkFBa0I7Ozs7O0lBcUIzQixZQUFvQixxQkFBeUMsRUFDekMsd0JBQWtEO1FBRGxELDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBb0I7UUFDekMsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQXJCdEUsVUFBSyxHQUFvQjtZQUNyQixJQUFJLEVBQUUsRUFBRTtZQUNSLElBQUksRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSztTQUNqQyxDQUFDO1FBRUYsT0FBRSxHQUVFO1lBQ0EsZUFBZSxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO1NBQzNDLENBQUM7UUFTUSxpQkFBWSxHQUFrQyxJQUFJLFlBQVksRUFBRSxDQUFDO0lB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LElBQVMsRUFBRSxFQUFFO1lBQ3pCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssb0JBQ2pCLElBQUksQ0FBQyxLQUFLLElBQ2IsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLElBQ2xCLENBQUM7WUFFSCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0IsQ0FBQzs7O1FBQUUsR0FBRyxFQUFFO1lBQ0osVUFBVTtRQUNkLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7O1lBdkdKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsNkhBQTBDOzthQUU3Qzs7OztZQWJPLGtCQUFrQjtZQUxQLHdCQUF3Qjs7O2lCQWlDdEMsS0FBSztvQkFDTCxLQUFLO3dCQUNMLFNBQVMsU0FBQyxXQUFXLEVBQUUsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFDO21CQUN6QyxTQUFTLFNBQUMsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBQzsyQkFFcEMsTUFBTTs7OztJQWxCUCxtQ0FHRTs7SUFFRixnQ0FJRTs7SUFFRixnREFBd0I7O0lBRXhCLGdDQUFvQjs7SUFDcEIsbUNBQWdDOztJQUNoQyx1Q0FBa0U7O0lBQ2xFLGtDQUF3RDs7SUFFeEQsMENBQTJFOzs7OztJQUUvRCxtREFBaUQ7Ozs7O0lBQ2pELHNEQUEwRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IENvZGVNaXJyb3IgZnJvbSAnY29kZW1pcnJvcic7XG5pbXBvcnQgJ2NvZGVtaXJyb3IvbW9kZS9qYXZhc2NyaXB0L2phdmFzY3JpcHQnO1xuaW1wb3J0ICdjb2RlbWlycm9yL21vZGUvc2hlbGwvc2hlbGwnO1xuaW1wb3J0ICdjb2RlbWlycm9yL21vZGUveG1sL3htbCc7XG5pbXBvcnQge1N0aWNreU1vZGFsU2VydmljZSwgU3RpY2t5UG9zaXRpb25TdHJhdGVneX0gZnJvbSAnbmd4LXN0aWNreS1tb2RhbCc7XG5pbXBvcnQge0RFRkFVTFRfVEhFTUUsIFNVUFBPUlRFRF9NT0RFU30gZnJvbSAnLi4vY29kZS1icmljay5jb25zdGFudCc7XG5pbXBvcnQge01vZGVMaXN0Q29tcG9uZW50fSBmcm9tICcuLi9tb2RlLWxpc3QvbW9kZS1saXN0LmNvbXBvbmVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvZGVCcmlja1N0YXRlIHtcbiAgICBjb2RlOiBzdHJpbmc7XG4gICAgbW9kZTogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2NvZGUtYnJpY2snLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jb2RlLWJyaWNrLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9jb2RlLWJyaWNrLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ29kZUJyaWNrQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBzY29wZTogSUNvZGVCcmlja1N0YXRlID0ge1xuICAgICAgICBjb2RlOiAnJyxcbiAgICAgICAgbW9kZTogU1VQUE9SVEVEX01PREVTWzBdLnZhbHVlXG4gICAgfTtcblxuICAgIHVpOiB7XG4gICAgICAgIGRpc3BsYXlNb2RlTmFtZTogc3RyaW5nO1xuICAgIH0gPSB7XG4gICAgICAgIGRpc3BsYXlNb2RlTmFtZTogU1VQUE9SVEVEX01PREVTWzBdLm5hbWVcbiAgICB9O1xuXG4gICAgY29kZU1pcnJvckluc3RhbmNlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBpZDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHN0YXRlOiBJQ29kZUJyaWNrU3RhdGU7XG4gICAgQFZpZXdDaGlsZCgnY29udGFpbmVyJywge3JlYWQ6IEVsZW1lbnRSZWZ9KSBjb250YWluZXI6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgnbW9kZScsIHtyZWFkOiBFbGVtZW50UmVmfSkgbW9kZTogRWxlbWVudFJlZjtcblxuICAgIEBPdXRwdXQoKSBzdGF0ZUNoYW5nZXM6IEV2ZW50RW1pdHRlcjxJQ29kZUJyaWNrU3RhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ3hTdGlja3lNb2RhbFNlcnZpY2U6IFN0aWNreU1vZGFsU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5zY29wZSwgdGhpcy5zdGF0ZSk7XG5cbiAgICAgICAgdGhpcy5jb2RlTWlycm9ySW5zdGFuY2UgPSBDb2RlTWlycm9yKHRoaXMuY29udGFpbmVyLm5hdGl2ZUVsZW1lbnQsIHtcbiAgICAgICAgICAgIHZhbHVlOiBgYCxcbiAgICAgICAgICAgIG1vZGU6IHRoaXMuc2NvcGUubW9kZSxcbiAgICAgICAgICAgIHRoZW1lOiBERUZBVUxUX1RIRU1FLFxuICAgICAgICAgICAgZHJhZ0Ryb3A6IGZhbHNlLFxuICAgICAgICAgICAgc2Nyb2xsYmFyU3R5bGU6IG51bGxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jb2RlTWlycm9ySW5zdGFuY2Uub24oJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2NvcGUuY29kZSA9IHRoaXMuY29kZU1pcnJvckluc3RhbmNlLmdldFZhbHVlKCk7XG5cbiAgICAgICAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucHJvY2Vzc05ld1N0YXRlKCk7XG4gICAgfVxuXG4gICAgb25XYWxsU3RhdGVDaGFuZ2UobmV3U3RhdGU6IElDb2RlQnJpY2tTdGF0ZSkge1xuICAgICAgICBpZiAobmV3U3RhdGUgJiYgbmV3U3RhdGUuY29kZSAhPT0gdGhpcy5zY29wZS5jb2RlKSB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuc2NvcGUsIHRoaXMuc3RhdGUpO1xuXG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NOZXdTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvY2Vzc05ld1N0YXRlKCkge1xuICAgICAgICB0aGlzLmNvZGVNaXJyb3JJbnN0YW5jZS5zZXRWYWx1ZSh0aGlzLnNjb3BlLmNvZGUpO1xuXG4gICAgICAgIGlmICh0aGlzLnNjb3BlLm1vZGUgIT09IHRoaXMuY29kZU1pcnJvckluc3RhbmNlLmdldE1vZGUoKS5uYW1lKSB7XG4gICAgICAgICAgICB0aGlzLmNvZGVNaXJyb3JJbnN0YW5jZS5zZXRPcHRpb24oJ21vZGUnLCB0aGlzLnNjb3BlLm1vZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51aS5kaXNwbGF5TW9kZU5hbWUgPSBTVVBQT1JURURfTU9ERVMuZmluZCgobW9kZSkgPT4gbW9kZS52YWx1ZSA9PT0gdGhpcy5zY29wZS5tb2RlKS5uYW1lO1xuICAgIH1cblxuICAgIHNhdmVTdGF0ZSgpIHtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMuZW1pdCh0aGlzLnNjb3BlKTtcbiAgICB9XG5cbiAgICBvbk1vZGVTZWxlY3RlZCgpIHtcbiAgICAgICAgY29uc3QgZWxlbWVudEJvdW5kaW5nUmVjdCA9IHRoaXMubW9kZS5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIGNvbnN0IG1vZGVzOiBhbnlbXSA9IFNVUFBPUlRFRF9NT0RFUy5tYXAoKG1vZGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4ubW9kZSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogbW9kZS52YWx1ZSA9PT0gdGhpcy5zY29wZS5tb2RlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm5neFN0aWNreU1vZGFsU2VydmljZS5vcGVuKHtcbiAgICAgICAgICAgIGNvbXBvbmVudDogTW9kZUxpc3RDb21wb25lbnQsXG4gICAgICAgICAgICBkYXRhOiB7bW9kZXN9LFxuICAgICAgICAgICAgcG9zaXRpb25TdHJhdGVneToge1xuICAgICAgICAgICAgICAgIG5hbWU6IFN0aWNreVBvc2l0aW9uU3RyYXRlZ3kuY29vcmRpbmF0ZSxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWVudFg6IGVsZW1lbnRCb3VuZGluZ1JlY3QueCxcbiAgICAgICAgICAgICAgICAgICAgY2xpZW50WTogZWxlbWVudEJvdW5kaW5nUmVjdC55ICsgMzVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlclxuICAgICAgICB9KS5yZXN1bHQudGhlbigobW9kZTogYW55KSA9PiB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuc2NvcGUsIHtcbiAgICAgICAgICAgICAgICAuLi50aGlzLnN0YXRlLFxuICAgICAgICAgICAgICAgIG1vZGU6IG1vZGUudmFsdWVcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NOZXdTdGF0ZSgpO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAvLyBub3RoaW5nXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==