/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ComponentFactoryResolver, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { StickyModalService, StickyPositionStrategy } from 'ngx-sticky-modal';
import { InputContextComponent } from '../input-context/input-context.component';
export class VideoBrickComponent {
    /**
     * @param {?} renderer2
     * @param {?} el
     * @param {?} componentFactoryResolver
     * @param {?} ngxStickyModalService
     */
    constructor(renderer2, el, componentFactoryResolver, ngxStickyModalService) {
        this.renderer2 = renderer2;
        this.el = el;
        this.componentFactoryResolver = componentFactoryResolver;
        this.ngxStickyModalService = ngxStickyModalService;
        this.stateChanges = new EventEmitter();
        // ui
        this.uiStates = {
            initial: 'initial',
            video: 'video'
        };
        this.uiState = this.uiStates.initial;
        this.scope = {
            src: ''
        };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.state && this.state.src !== this.scope.src) {
            this.scope.src = this.state.src;
            if (this.scope.src) {
                this.uiState = this.uiStates.video;
                setTimeout(() => {
                    this.renderer2.setAttribute(this.iframe.nativeElement, 'src', this.scope.src);
                }, 10);
            }
        }
    }
    /**
     * @param {?} newState
     * @return {?}
     */
    onWallStateChange(newState) {
        if (newState && newState.src !== this.scope.src) {
            this.scope.src = newState.src;
            if (this.scope.src) {
                this.uiState = this.uiStates.video;
                setTimeout(() => {
                    this.renderer2.setAttribute(this.iframe.nativeElement, 'src', this.scope.src);
                }, 10);
            }
        }
    }
    /**
     * @return {?}
     */
    onWallFocus() {
        if (this.uiState === this.uiStates.initial && !this.videoSrcPlaceholderRef) {
            setTimeout(() => {
                this.showVideoPanel();
            }, 0);
        }
    }
    /**
     * @param {?} src
     * @return {?}
     */
    applySrc(src) {
        this.uiState = this.uiStates.initial;
        if (src.length) {
            /** @type {?} */
            const srcArray = src.split('=');
            /** @type {?} */
            const youtubeId = srcArray[1];
            if (youtubeId) {
                this.scope.src = `https://www.youtube.com/embed/${youtubeId}`;
                this.renderer2.setAttribute(this.iframe.nativeElement, 'src', this.scope.src);
                this.save();
                this.uiState = this.uiStates.video;
            }
        }
    }
    /**
     * @return {?}
     */
    showVideoPanel() {
        this.videoSrcPlaceholderRef = this.ngxStickyModalService.open({
            component: InputContextComponent,
            positionStrategy: {
                name: StickyPositionStrategy.flexibleConnected,
                options: {
                    relativeTo: this.el.nativeElement
                }
            },
            position: {
                originX: 'center',
                originY: 'bottom',
                overlayX: 'center',
                overlayY: 'top'
            },
            componentFactoryResolver: this.componentFactoryResolver
        });
        this.videoSrcPlaceholderRef.result.then((result) => {
            this.videoSrcPlaceholderRef = null;
            this.applySrc(result.src);
        }, () => {
            this.videoSrcPlaceholderRef = null;
        });
    }
    /**
     * @private
     * @return {?}
     */
    save() {
        this.stateChanges.emit(this.scope);
    }
}
VideoBrickComponent.decorators = [
    { type: Component, args: [{
                selector: 'video-brick',
                template: "<iframe height=\"400\" [hidden]=\"uiState !== uiStates.video\" #iframe frameborder=\"0\" allowfullscreen></iframe>\n\n<w-brick-input-placeholder\n    [text]=\"'Add a Video'\"\n    [icon]=\"'music_video'\"\n    [hidden]=\"uiState === uiStates.video\" (selected)=\"showVideoPanel()\">\n</w-brick-input-placeholder>\n",
                styles: [":host{position:relative;display:block}:host iframe{width:100%}"]
            }] }
];
/** @nocollapse */
VideoBrickComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: ComponentFactoryResolver },
    { type: StickyModalService }
];
VideoBrickComponent.propDecorators = {
    id: [{ type: Input }],
    state: [{ type: Input }],
    stateChanges: [{ type: Output }],
    iframe: [{ type: ViewChild, args: ['iframe',] }]
};
if (false) {
    /** @type {?} */
    VideoBrickComponent.prototype.id;
    /** @type {?} */
    VideoBrickComponent.prototype.state;
    /** @type {?} */
    VideoBrickComponent.prototype.stateChanges;
    /** @type {?} */
    VideoBrickComponent.prototype.iframe;
    /** @type {?} */
    VideoBrickComponent.prototype.uiStates;
    /** @type {?} */
    VideoBrickComponent.prototype.uiState;
    /** @type {?} */
    VideoBrickComponent.prototype.scope;
    /** @type {?} */
    VideoBrickComponent.prototype.videoSrcPlaceholderRef;
    /**
     * @type {?}
     * @private
     */
    VideoBrickComponent.prototype.renderer2;
    /**
     * @type {?}
     * @private
     */
    VideoBrickComponent.prototype.el;
    /**
     * @type {?}
     * @private
     */
    VideoBrickComponent.prototype.componentFactoryResolver;
    /**
     * @type {?}
     * @private
     */
    VideoBrickComponent.prototype.ngxStickyModalService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW8tYnJpY2suY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvYnJpY2tzL3ZpZGVvLWJyaWNrL2NvbXBvbmVudC92aWRlby1icmljay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsd0JBQXdCLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekksT0FBTyxFQUFpQixrQkFBa0IsRUFBRSxzQkFBc0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRzVGLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBTy9FLE1BQU0sT0FBTyxtQkFBbUI7Ozs7Ozs7SUFzQjVCLFlBQW9CLFNBQW9CLEVBQ3BCLEVBQWMsRUFDZCx3QkFBa0QsRUFDbEQscUJBQXlDO1FBSHpDLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUNkLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbEQsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUFvQjtRQXJCbkQsaUJBQVksR0FBbUMsSUFBSSxZQUFZLEVBQUUsQ0FBQzs7UUFLNUUsYUFBUSxHQUFRO1lBQ1osT0FBTyxFQUFFLFNBQVM7WUFDbEIsS0FBSyxFQUFFLE9BQU87U0FDakIsQ0FBQztRQUVGLFlBQU8sR0FBVyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUV4QyxVQUFLLEdBQXFCO1lBQ3RCLEdBQUcsRUFBRSxFQUFFO1NBQ1YsQ0FBQztJQVFGLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ0osSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxF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Q2xCLFFBQVEsRUFBRSxLQUFLO2FBQ2xCO1lBQ0Qsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLHdCQUF3QjtTQUMxRCxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQy9DLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUM7WUFFbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsQ0FBQyxFQUFFLEdBQUcsRUFBRTtZQUNKLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUM7UUFDdkMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOzs7OztJQUVPLElBQUk7UUFDUixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7O1lBckhKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsc1VBQTJDOzthQUU5Qzs7OztZQVY2RixTQUFTO1lBQTFELFVBQVU7WUFBcEMsd0JBQXdCO1lBQ25CLGtCQUFrQjs7O2lCQVdyQyxLQUFLO29CQUNMLEtBQUs7MkJBRUwsTUFBTTtxQkFFTixTQUFTLFNBQUMsUUFBUTs7OztJQUxuQixpQ0FBb0I7O0lBQ3BCLG9DQUFpQzs7SUFFakMsMkNBQTRFOztJQUU1RSxxQ0FBd0M7O0lBR3hDLHVDQUdFOztJQUVGLHNDQUF3Qzs7SUFFeEMsb0NBRUU7O0lBRUYscURBQXVDOzs7OztJQUUzQix3Q0FBNEI7Ozs7O0lBQzVCLGlDQUFzQjs7Ozs7SUFDdEIsdURBQTBEOzs7OztJQUMxRCxvREFBaUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCwgUmVuZGVyZXIyLCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdGlja3lNb2RhbFJlZiwgU3RpY2t5TW9kYWxTZXJ2aWNlLCBTdGlja3lQb3NpdGlvblN0cmF0ZWd5fSBmcm9tICduZ3gtc3RpY2t5LW1vZGFsJztcbmltcG9ydCB7SU9uV2FsbEZvY3VzfSBmcm9tICcuLi8uLi8uLi93YWxsL3dhbGwnO1xuaW1wb3J0IHtJVmlkZW9Ccmlja1N0YXRlfSBmcm9tICcuLi92aWRlby1icmljay1zdGF0ZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHtJbnB1dENvbnRleHRDb21wb25lbnR9IGZyb20gJy4uL2lucHV0LWNvbnRleHQvaW5wdXQtY29udGV4dC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3ZpZGVvLWJyaWNrJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdmlkZW8tYnJpY2suY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3ZpZGVvLWJyaWNrLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgVmlkZW9Ccmlja0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgSU9uV2FsbEZvY3VzIHtcbiAgICBASW5wdXQoKSBpZDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHN0YXRlOiBJVmlkZW9Ccmlja1N0YXRlO1xuXG4gICAgQE91dHB1dCgpIHN0YXRlQ2hhbmdlczogRXZlbnRFbWl0dGVyPElWaWRlb0JyaWNrU3RhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQFZpZXdDaGlsZCgnaWZyYW1lJykgaWZyYW1lOiBFbGVtZW50UmVmO1xuXG4gICAgLy8gdWlcbiAgICB1aVN0YXRlczogYW55ID0ge1xuICAgICAgICBpbml0aWFsOiAnaW5pdGlhbCcsXG4gICAgICAgIHZpZGVvOiAndmlkZW8nXG4gICAgfTtcblxuICAgIHVpU3RhdGU6IHN0cmluZyA9IHRoaXMudWlTdGF0ZXMuaW5pdGlhbDtcblxuICAgIHNjb3BlOiBJVmlkZW9Ccmlja1N0YXRlID0ge1xuICAgICAgICBzcmM6ICcnXG4gICAgfTtcblxuICAgIHZpZGVvU3JjUGxhY2Vob2xkZXJSZWY6IFN0aWNreU1vZGFsUmVmO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjI6IFJlbmRlcmVyMixcbiAgICAgICAgICAgICAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBuZ3hTdGlja3lNb2RhbFNlcnZpY2U6IFN0aWNreU1vZGFsU2VydmljZSkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZSAmJiB0aGlzLnN0YXRlLnNyYyAhPT0gdGhpcy5zY29wZS5zcmMpIHtcbiAgICAgICAgICAgIHRoaXMuc2NvcGUuc3JjID0gdGhpcy5zdGF0ZS5zcmM7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNjb3BlLnNyYykge1xuICAgICAgICAgICAgICAgIHRoaXMudWlTdGF0ZSA9IHRoaXMudWlTdGF0ZXMudmlkZW87XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlcjIuc2V0QXR0cmlidXRlKHRoaXMuaWZyYW1lLm5hdGl2ZUVsZW1lbnQsICdzcmMnLCB0aGlzLnNjb3BlLnNyYyk7XG4gICAgICAgICAgICAgICAgfSwgMTApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25XYWxsU3RhdGVDaGFuZ2UobmV3U3RhdGU6IElWaWRlb0JyaWNrU3RhdGUpIHtcbiAgICAgICAgaWYgKG5ld1N0YXRlICYmIG5ld1N0YXRlLnNyYyAhPT0gdGhpcy5zY29wZS5zcmMpIHtcbiAgICAgICAgICAgIHRoaXMuc2NvcGUuc3JjID0gbmV3U3RhdGUuc3JjO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5zY29wZS5zcmMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVpU3RhdGUgPSB0aGlzLnVpU3RhdGVzLnZpZGVvO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIyLnNldEF0dHJpYnV0ZSh0aGlzLmlmcmFtZS5uYXRpdmVFbGVtZW50LCAnc3JjJywgdGhpcy5zY29wZS5zcmMpO1xuICAgICAgICAgICAgICAgIH0sIDEwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uV2FsbEZvY3VzKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy51aVN0YXRlID09PSB0aGlzLnVpU3RhdGVzLmluaXRpYWwgJiYgIXRoaXMudmlkZW9TcmNQbGFjZWhvbGRlclJlZikge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93VmlkZW9QYW5lbCgpO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhcHBseVNyYyhzcmM6IHN0cmluZykge1xuICAgICAgICB0aGlzLnVpU3RhdGUgPSB0aGlzLnVpU3RhdGVzLmluaXRpYWw7XG5cbiAgICAgICAgaWYgKHNyYy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IHNyY0FycmF5ID0gc3JjLnNwbGl0KCc9Jyk7XG4gICAgICAgICAgICBjb25zdCB5b3V0dWJlSWQgPSBzcmNBcnJheVsxXTtcblxuICAgICAgICAgICAgaWYgKHlvdXR1YmVJZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NvcGUuc3JjID0gYGh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkLyR7eW91dHViZUlkfWA7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyMi5zZXRBdHRyaWJ1dGUodGhpcy5pZnJhbWUubmF0aXZlRWxlbWVudCwgJ3NyYycsIHRoaXMuc2NvcGUuc3JjKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2F2ZSgpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy51aVN0YXRlID0gdGhpcy51aVN0YXRlcy52aWRlbztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3dWaWRlb1BhbmVsKCkge1xuICAgICAgICB0aGlzLnZpZGVvU3JjUGxhY2Vob2xkZXJSZWYgPSB0aGlzLm5neFN0aWNreU1vZGFsU2VydmljZS5vcGVuKHtcbiAgICAgICAgICAgIGNvbXBvbmVudDogSW5wdXRDb250ZXh0Q29tcG9uZW50LFxuICAgICAgICAgICAgcG9zaXRpb25TdHJhdGVneToge1xuICAgICAgICAgICAgICAgIG5hbWU6IFN0aWNreVBvc2l0aW9uU3RyYXRlZ3kuZmxleGlibGVDb25uZWN0ZWQsXG4gICAgICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZVRvOiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgICAgICAgICBvcmlnaW5YOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICBvcmlnaW5ZOiAnYm90dG9tJyxcbiAgICAgICAgICAgICAgICBvdmVybGF5WDogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgb3ZlcmxheVk6ICd0b3AnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlclxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnZpZGVvU3JjUGxhY2Vob2xkZXJSZWYucmVzdWx0LnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy52aWRlb1NyY1BsYWNlaG9sZGVyUmVmID0gbnVsbDtcblxuICAgICAgICAgICAgdGhpcy5hcHBseVNyYyhyZXN1bHQuc3JjKTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy52aWRlb1NyY1BsYWNlaG9sZGVyUmVmID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzYXZlKCkge1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5lbWl0KHRoaXMuc2NvcGUpO1xuICAgIH1cbn1cbiJdfQ==