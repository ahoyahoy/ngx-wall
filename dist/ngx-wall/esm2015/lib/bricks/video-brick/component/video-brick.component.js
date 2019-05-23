/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                setTimeout((/**
                 * @return {?}
                 */
                () => {
                    this.renderer2.setAttribute(this.iframe.nativeElement, 'src', this.scope.src);
                }), 10);
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
                setTimeout((/**
                 * @return {?}
                 */
                () => {
                    this.renderer2.setAttribute(this.iframe.nativeElement, 'src', this.scope.src);
                }), 10);
            }
        }
    }
    /**
     * @return {?}
     */
    onWallFocus() {
        if (this.uiState === this.uiStates.initial && !this.videoSrcPlaceholderRef) {
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.showVideoPanel();
            }), 0);
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
        this.videoSrcPlaceholderRef.result.then((/**
         * @param {?} result
         * @return {?}
         */
        (result) => {
            this.videoSrcPlaceholderRef = null;
            this.applySrc(result.src);
        }), (/**
         * @return {?}
         */
        () => {
            this.videoSrcPlaceholderRef = null;
        }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW8tYnJpY2suY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvYnJpY2tzL3ZpZGVvLWJyaWNrL2NvbXBvbmVudC92aWRlby1icmljay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsd0JBQXdCLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekksT0FBTyxFQUFpQixrQkFBa0IsRUFBRSxzQkFBc0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRzVGLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBTy9FLE1BQU0sT0FBTyxtQkFBbUI7Ozs7Ozs7SUFzQjVCLFlBQW9CLFNBQW9CLEVBQ3BCLEVBQWMsRUFDZCx3QkFBa0QsRUFDbEQscUJBQXlDO1FBSHpDLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUNkLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbEQsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUFvQjtRQXJCbkQsaUJBQVksR0FBbUMsSUFBSSxZQUFZLEVBQUUsQ0FBQzs7UUFLNUUsYUFBUSxHQUFRO1lBQ1osT0FBTyxFQUFFLFNBQVM7WUFDbEIsS0FBSyxFQUFFLE9BQU87U0FDakIsQ0FBQztRQUVGLFlBQU8sR0FBVyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUV4QyxVQUFLLEdBQXFCO1lBQ3RCLEdBQUcsRUFBRSxFQUFFO1NBQ1YsQ0FBQztJQVFGLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ0osSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxF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UUFBUTtnQkFDbEIsUUFBUSxFQUFFLEtBQUs7YUFDbEI7WUFDRCx3QkFBd0IsRUFBRSxJQUFJLENBQUMsd0JBQXdCO1NBQzFELENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsSUFBSTs7OztRQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDL0MsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQztZQUVuQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixDQUFDOzs7UUFBRSxHQUFHLEVBQUU7WUFDSixJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDO1FBQ3ZDLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7SUFFTyxJQUFJO1FBQ1IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7OztZQXJISixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLHNVQUEyQzs7YUFFOUM7Ozs7WUFWNkYsU0FBUztZQUExRCxVQUFVO1lBQXBDLHdCQUF3QjtZQUNuQixrQkFBa0I7OztpQkFXckMsS0FBSztvQkFDTCxLQUFLOzJCQUVMLE1BQU07cUJBRU4sU0FBUyxTQUFDLFFBQVE7Ozs7SUFMbkIsaUNBQW9COztJQUNwQixvQ0FBaUM7O0lBRWpDLDJDQUE0RTs7SUFFNUUscUNBQXdDOztJQUd4Qyx1Q0FHRTs7SUFFRixzQ0FBd0M7O0lBRXhDLG9DQUVFOztJQUVGLHFEQUF1Qzs7Ozs7SUFFM0Isd0NBQTRCOzs7OztJQUM1QixpQ0FBc0I7Ozs7O0lBQ3RCLHVEQUEwRDs7Ozs7SUFDMUQsb0RBQWlEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFJlbmRlcmVyMiwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3RpY2t5TW9kYWxSZWYsIFN0aWNreU1vZGFsU2VydmljZSwgU3RpY2t5UG9zaXRpb25TdHJhdGVneX0gZnJvbSAnbmd4LXN0aWNreS1tb2RhbCc7XG5pbXBvcnQge0lPbldhbGxGb2N1c30gZnJvbSAnLi4vLi4vLi4vd2FsbC93YWxsJztcbmltcG9ydCB7SVZpZGVvQnJpY2tTdGF0ZX0gZnJvbSAnLi4vdmlkZW8tYnJpY2stc3RhdGUuaW50ZXJmYWNlJztcbmltcG9ydCB7SW5wdXRDb250ZXh0Q29tcG9uZW50fSBmcm9tICcuLi9pbnB1dC1jb250ZXh0L2lucHV0LWNvbnRleHQuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2aWRlby1icmljaycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3ZpZGVvLWJyaWNrLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi92aWRlby1icmljay5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFZpZGVvQnJpY2tDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIElPbldhbGxGb2N1cyB7XG4gICAgQElucHV0KCkgaWQ6IHN0cmluZztcbiAgICBASW5wdXQoKSBzdGF0ZTogSVZpZGVvQnJpY2tTdGF0ZTtcblxuICAgIEBPdXRwdXQoKSBzdGF0ZUNoYW5nZXM6IEV2ZW50RW1pdHRlcjxJVmlkZW9Ccmlja1N0YXRlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2lmcmFtZScpIGlmcmFtZTogRWxlbWVudFJlZjtcblxuICAgIC8vIHVpXG4gICAgdWlTdGF0ZXM6IGFueSA9IHtcbiAgICAgICAgaW5pdGlhbDogJ2luaXRpYWwnLFxuICAgICAgICB2aWRlbzogJ3ZpZGVvJ1xuICAgIH07XG5cbiAgICB1aVN0YXRlOiBzdHJpbmcgPSB0aGlzLnVpU3RhdGVzLmluaXRpYWw7XG5cbiAgICBzY29wZTogSVZpZGVvQnJpY2tTdGF0ZSA9IHtcbiAgICAgICAgc3JjOiAnJ1xuICAgIH07XG5cbiAgICB2aWRlb1NyY1BsYWNlaG9sZGVyUmVmOiBTdGlja3lNb2RhbFJlZjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXIyOiBSZW5kZXJlcjIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgICBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgbmd4U3RpY2t5TW9kYWxTZXJ2aWNlOiBTdGlja3lNb2RhbFNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgJiYgdGhpcy5zdGF0ZS5zcmMgIT09IHRoaXMuc2NvcGUuc3JjKSB7XG4gICAgICAgICAgICB0aGlzLnNjb3BlLnNyYyA9IHRoaXMuc3RhdGUuc3JjO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5zY29wZS5zcmMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVpU3RhdGUgPSB0aGlzLnVpU3RhdGVzLnZpZGVvO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIyLnNldEF0dHJpYnV0ZSh0aGlzLmlmcmFtZS5uYXRpdmVFbGVtZW50LCAnc3JjJywgdGhpcy5zY29wZS5zcmMpO1xuICAgICAgICAgICAgICAgIH0sIDEwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uV2FsbFN0YXRlQ2hhbmdlKG5ld1N0YXRlOiBJVmlkZW9Ccmlja1N0YXRlKSB7XG4gICAgICAgIGlmIChuZXdTdGF0ZSAmJiBuZXdTdGF0ZS5zcmMgIT09IHRoaXMuc2NvcGUuc3JjKSB7XG4gICAgICAgICAgICB0aGlzLnNjb3BlLnNyYyA9IG5ld1N0YXRlLnNyYztcblxuICAgICAgICAgICAgaWYgKHRoaXMuc2NvcGUuc3JjKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51aVN0YXRlID0gdGhpcy51aVN0YXRlcy52aWRlbztcblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyMi5zZXRBdHRyaWJ1dGUodGhpcy5pZnJhbWUubmF0aXZlRWxlbWVudCwgJ3NyYycsIHRoaXMuc2NvcGUuc3JjKTtcbiAgICAgICAgICAgICAgICB9LCAxMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbldhbGxGb2N1cygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudWlTdGF0ZSA9PT0gdGhpcy51aVN0YXRlcy5pbml0aWFsICYmICF0aGlzLnZpZGVvU3JjUGxhY2Vob2xkZXJSZWYpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1ZpZGVvUGFuZWwoKTtcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBwbHlTcmMoc3JjOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy51aVN0YXRlID0gdGhpcy51aVN0YXRlcy5pbml0aWFsO1xuXG4gICAgICAgIGlmIChzcmMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBzcmNBcnJheSA9IHNyYy5zcGxpdCgnPScpO1xuICAgICAgICAgICAgY29uc3QgeW91dHViZUlkID0gc3JjQXJyYXlbMV07XG5cbiAgICAgICAgICAgIGlmICh5b3V0dWJlSWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3BlLnNyYyA9IGBodHRwczovL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8ke3lvdXR1YmVJZH1gO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlcjIuc2V0QXR0cmlidXRlKHRoaXMuaWZyYW1lLm5hdGl2ZUVsZW1lbnQsICdzcmMnLCB0aGlzLnNjb3BlLnNyYyk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNhdmUoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMudWlTdGF0ZSA9IHRoaXMudWlTdGF0ZXMudmlkZW87XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93VmlkZW9QYW5lbCgpIHtcbiAgICAgICAgdGhpcy52aWRlb1NyY1BsYWNlaG9sZGVyUmVmID0gdGhpcy5uZ3hTdGlja3lNb2RhbFNlcnZpY2Uub3Blbih7XG4gICAgICAgICAgICBjb21wb25lbnQ6IElucHV0Q29udGV4dENvbXBvbmVudCxcbiAgICAgICAgICAgIHBvc2l0aW9uU3RyYXRlZ3k6IHtcbiAgICAgICAgICAgICAgICBuYW1lOiBTdGlja3lQb3NpdGlvblN0cmF0ZWd5LmZsZXhpYmxlQ29ubmVjdGVkLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgcmVsYXRpdmVUbzogdGhpcy5lbC5uYXRpdmVFbGVtZW50XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgb3JpZ2luWTogJ2JvdHRvbScsXG4gICAgICAgICAgICAgICAgb3ZlcmxheVg6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgIG92ZXJsYXlZOiAndG9wJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy52aWRlb1NyY1BsYWNlaG9sZGVyUmVmLnJlc3VsdC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIHRoaXMudmlkZW9TcmNQbGFjZWhvbGRlclJlZiA9IG51bGw7XG5cbiAgICAgICAgICAgIHRoaXMuYXBwbHlTcmMocmVzdWx0LnNyYyk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudmlkZW9TcmNQbGFjZWhvbGRlclJlZiA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2F2ZSgpIHtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMuZW1pdCh0aGlzLnNjb3BlKTtcbiAgICB9XG59XG4iXX0=