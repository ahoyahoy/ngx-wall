/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this.codeMirrorInstance.on('change', () => {
            this.scope.code = this.codeMirrorInstance.getValue();
            this.saveState();
        });
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
        this.ui.displayModeName = SUPPORTED_MODES.find((mode) => mode.value === this.scope.mode).name;
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
        const modes = SUPPORTED_MODES.map((mode) => {
            return Object.assign({}, mode, { selected: mode.value === this.scope.mode });
        });
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
        }).result.then((mode) => {
            Object.assign(this.scope, Object.assign({}, this.state, { mode: mode.value }));
            this.processNewState();
        }, () => {
            // nothing
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS1icmljay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9icmlja3MvY29kZS1icmljay9jb21wb25lbnQvY29kZS1icmljay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsd0JBQXdCLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM5SCxPQUFPLFVBQVUsTUFBTSxZQUFZLENBQUM7QUFDcEMsT0FBTyx1Q0FBdUMsQ0FBQztBQUMvQyxPQUFPLDZCQUE2QixDQUFDO0FBQ3JDLE9BQU8seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUFDLGtCQUFrQixFQUFFLHNCQUFzQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDNUUsT0FBTyxFQUFDLGFBQWEsRUFBRSxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQzs7OztBQUVuRSxxQ0FHQzs7O0lBRkcsK0JBQWE7O0lBQ2IsK0JBQWE7O0FBUWpCLE1BQU0sT0FBTyxrQkFBa0I7Ozs7O0lBcUIzQixZQUFvQixxQkFBeUMsRUFDekMsd0JBQWtEO1FBRGxELDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBb0I7UUFDekMsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQXJCdEUsVUFBSyxHQUFvQjtZQUNyQixJQUFJLEVBQUUsRUFBRTtZQUNSLElBQUksRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSztTQUNqQyxDQUFDO1FBRUYsT0FBRSxHQUVFO1lBQ0EsZUFBZSxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO1NBQzNDLENBQUM7UUFTUSxpQkFBWSxHQUFrQyxJQUFJLFlBQVksRUFBRSxDQUFDO0lB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RUFBRTtZQUN6QixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLG9CQUNqQixJQUFJLENBQUMsS0FBSyxJQUNiLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxJQUNsQixDQUFDO1lBRUgsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzNCLENBQUMsRUFBRSxHQUFHLEVBQUU7WUFDSixVQUFVO1FBQ2QsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOzs7WUF2R0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxZQUFZO2dCQUN0Qiw2SEFBMEM7O2FBRTdDOzs7O1lBYk8sa0JBQWtCO1lBTFAsd0JBQXdCOzs7aUJBaUN0QyxLQUFLO29CQUNMLEtBQUs7d0JBQ0wsU0FBUyxTQUFDLFdBQVcsRUFBRSxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUM7bUJBQ3pDLFNBQVMsU0FBQyxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFDOzJCQUVwQyxNQUFNOzs7O0lBbEJQLG1DQUdFOztJQUVGLGdDQUlFOztJQUVGLGdEQUF3Qjs7SUFFeEIsZ0NBQW9COztJQUNwQixtQ0FBZ0M7O0lBQ2hDLHVDQUFrRTs7SUFDbEUsa0NBQXdEOztJQUV4RCwwQ0FBMkU7Ozs7O0lBRS9ELG1EQUFpRDs7Ozs7SUFDakQsc0RBQTBEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgQ29kZU1pcnJvciBmcm9tICdjb2RlbWlycm9yJztcbmltcG9ydCAnY29kZW1pcnJvci9tb2RlL2phdmFzY3JpcHQvamF2YXNjcmlwdCc7XG5pbXBvcnQgJ2NvZGVtaXJyb3IvbW9kZS9zaGVsbC9zaGVsbCc7XG5pbXBvcnQgJ2NvZGVtaXJyb3IvbW9kZS94bWwveG1sJztcbmltcG9ydCB7U3RpY2t5TW9kYWxTZXJ2aWNlLCBTdGlja3lQb3NpdGlvblN0cmF0ZWd5fSBmcm9tICduZ3gtc3RpY2t5LW1vZGFsJztcbmltcG9ydCB7REVGQVVMVF9USEVNRSwgU1VQUE9SVEVEX01PREVTfSBmcm9tICcuLi9jb2RlLWJyaWNrLmNvbnN0YW50JztcbmltcG9ydCB7TW9kZUxpc3RDb21wb25lbnR9IGZyb20gJy4uL21vZGUtbGlzdC9tb2RlLWxpc3QuY29tcG9uZW50JztcblxuZXhwb3J0IGludGVyZmFjZSBJQ29kZUJyaWNrU3RhdGUge1xuICAgIGNvZGU6IHN0cmluZztcbiAgICBtb2RlOiBzdHJpbmc7XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnY29kZS1icmljaycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2NvZGUtYnJpY2suY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2NvZGUtYnJpY2suY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDb2RlQnJpY2tDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHNjb3BlOiBJQ29kZUJyaWNrU3RhdGUgPSB7XG4gICAgICAgIGNvZGU6ICcnLFxuICAgICAgICBtb2RlOiBTVVBQT1JURURfTU9ERVNbMF0udmFsdWVcbiAgICB9O1xuXG4gICAgdWk6IHtcbiAgICAgICAgZGlzcGxheU1vZGVOYW1lOiBzdHJpbmc7XG4gICAgfSA9IHtcbiAgICAgICAgZGlzcGxheU1vZGVOYW1lOiBTVVBQT1JURURfTU9ERVNbMF0ubmFtZVxuICAgIH07XG5cbiAgICBjb2RlTWlycm9ySW5zdGFuY2U6IGFueTtcblxuICAgIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG4gICAgQElucHV0KCkgc3RhdGU6IElDb2RlQnJpY2tTdGF0ZTtcbiAgICBAVmlld0NoaWxkKCdjb250YWluZXInLCB7cmVhZDogRWxlbWVudFJlZn0pIGNvbnRhaW5lcjogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKCdtb2RlJywge3JlYWQ6IEVsZW1lbnRSZWZ9KSBtb2RlOiBFbGVtZW50UmVmO1xuXG4gICAgQE91dHB1dCgpIHN0YXRlQ2hhbmdlczogRXZlbnRFbWl0dGVyPElDb2RlQnJpY2tTdGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5neFN0aWNreU1vZGFsU2VydmljZTogU3RpY2t5TW9kYWxTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLnNjb3BlLCB0aGlzLnN0YXRlKTtcblxuICAgICAgICB0aGlzLmNvZGVNaXJyb3JJbnN0YW5jZSA9IENvZGVNaXJyb3IodGhpcy5jb250YWluZXIubmF0aXZlRWxlbWVudCwge1xuICAgICAgICAgICAgdmFsdWU6IGBgLFxuICAgICAgICAgICAgbW9kZTogdGhpcy5zY29wZS5tb2RlLFxuICAgICAgICAgICAgdGhlbWU6IERFRkFVTFRfVEhFTUUsXG4gICAgICAgICAgICBkcmFnRHJvcDogZmFsc2UsXG4gICAgICAgICAgICBzY3JvbGxiYXJTdHlsZTogbnVsbFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNvZGVNaXJyb3JJbnN0YW5jZS5vbignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zY29wZS5jb2RlID0gdGhpcy5jb2RlTWlycm9ySW5zdGFuY2UuZ2V0VmFsdWUoKTtcblxuICAgICAgICAgICAgdGhpcy5zYXZlU3RhdGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5wcm9jZXNzTmV3U3RhdGUoKTtcbiAgICB9XG5cbiAgICBvbldhbGxTdGF0ZUNoYW5nZShuZXdTdGF0ZTogSUNvZGVCcmlja1N0YXRlKSB7XG4gICAgICAgIGlmIChuZXdTdGF0ZSAmJiBuZXdTdGF0ZS5jb2RlICE9PSB0aGlzLnNjb3BlLmNvZGUpIHtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5zY29wZSwgdGhpcy5zdGF0ZSk7XG5cbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc05ld1N0YXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm9jZXNzTmV3U3RhdGUoKSB7XG4gICAgICAgIHRoaXMuY29kZU1pcnJvckluc3RhbmNlLnNldFZhbHVlKHRoaXMuc2NvcGUuY29kZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuc2NvcGUubW9kZSAhPT0gdGhpcy5jb2RlTWlycm9ySW5zdGFuY2UuZ2V0TW9kZSgpLm5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMuY29kZU1pcnJvckluc3RhbmNlLnNldE9wdGlvbignbW9kZScsIHRoaXMuc2NvcGUubW9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVpLmRpc3BsYXlNb2RlTmFtZSA9IFNVUFBPUlRFRF9NT0RFUy5maW5kKChtb2RlKSA9PiBtb2RlLnZhbHVlID09PSB0aGlzLnNjb3BlLm1vZGUpLm5hbWU7XG4gICAgfVxuXG4gICAgc2F2ZVN0YXRlKCkge1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5lbWl0KHRoaXMuc2NvcGUpO1xuICAgIH1cblxuICAgIG9uTW9kZVNlbGVjdGVkKCkge1xuICAgICAgICBjb25zdCBlbGVtZW50Qm91bmRpbmdSZWN0ID0gdGhpcy5tb2RlLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgY29uc3QgbW9kZXM6IGFueVtdID0gU1VQUE9SVEVEX01PREVTLm1hcCgobW9kZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5tb2RlLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBtb2RlLnZhbHVlID09PSB0aGlzLnNjb3BlLm1vZGVcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubmd4U3RpY2t5TW9kYWxTZXJ2aWNlLm9wZW4oe1xuICAgICAgICAgICAgY29tcG9uZW50OiBNb2RlTGlzdENvbXBvbmVudCxcbiAgICAgICAgICAgIGRhdGE6IHttb2Rlc30sXG4gICAgICAgICAgICBwb3NpdGlvblN0cmF0ZWd5OiB7XG4gICAgICAgICAgICAgICAgbmFtZTogU3RpY2t5UG9zaXRpb25TdHJhdGVneS5jb29yZGluYXRlLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgY2xpZW50WDogZWxlbWVudEJvdW5kaW5nUmVjdC54LFxuICAgICAgICAgICAgICAgICAgICBjbGllbnRZOiBlbGVtZW50Qm91bmRpbmdSZWN0LnkgKyAzNVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyXG4gICAgICAgIH0pLnJlc3VsdC50aGVuKChtb2RlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5zY29wZSwge1xuICAgICAgICAgICAgICAgIC4uLnRoaXMuc3RhdGUsXG4gICAgICAgICAgICAgICAgbW9kZTogbW9kZS52YWx1ZVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc05ld1N0YXRlKCk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIC8vIG5vdGhpbmdcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19