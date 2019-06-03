/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ComponentFactoryResolver, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { StickyModalService } from 'ngx-sticky-modal';
import { InputContextComponent } from '../input-context/input-context.component';
import { getModalConfig } from '../../base-brick/base-brick.component';
var VideoBrickComponent = /** @class */ (function () {
    function VideoBrickComponent(renderer2, el, componentFactoryResolver, ngxStickyModalService) {
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
    VideoBrickComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.state && this.state.src !== this.scope.src) {
            this.scope.src = this.state.src;
            if (this.scope.src) {
                this.uiState = this.uiStates.video;
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this.renderer2.setAttribute(_this.iframe.nativeElement, 'src', _this.scope.src);
                }), 10);
            }
        }
    };
    /**
     * @param {?} newState
     * @return {?}
     */
    VideoBrickComponent.prototype.onWallStateChange = /**
     * @param {?} newState
     * @return {?}
     */
    function (newState) {
        var _this = this;
        if (newState && newState.src !== this.scope.src) {
            this.scope.src = newState.src;
            if (this.scope.src) {
                this.uiState = this.uiStates.video;
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this.renderer2.setAttribute(_this.iframe.nativeElement, 'src', _this.scope.src);
                }), 10);
            }
        }
    };
    /**
     * @return {?}
     */
    VideoBrickComponent.prototype.onWallFocus = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.uiState === this.uiStates.initial && !this.videoSrcPlaceholderRef) {
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.showVideoPanel();
            }), 0);
        }
    };
    /**
     * @param {?} src
     * @return {?}
     */
    VideoBrickComponent.prototype.applySrc = /**
     * @param {?} src
     * @return {?}
     */
    function (src) {
        this.uiState = this.uiStates.initial;
        if (src.length) {
            /** @type {?} */
            var srcArray = src.split('=');
            /** @type {?} */
            var youtubeId = srcArray[1];
            if (youtubeId) {
                this.scope.src = "https://www.youtube.com/embed/" + youtubeId;
                this.renderer2.setAttribute(this.iframe.nativeElement, 'src', this.scope.src);
                this.save();
                this.uiState = this.uiStates.video;
            }
        }
    };
    /**
     * @return {?}
     */
    VideoBrickComponent.prototype.showVideoPanel = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var modalConfig = getModalConfig(this.el, this.componentFactoryResolver, InputContextComponent);
        this.videoSrcPlaceholderRef = this.ngxStickyModalService.open(modalConfig);
        this.videoSrcPlaceholderRef.result.then((/**
         * @param {?} result
         * @return {?}
         */
        function (result) {
            _this.videoSrcPlaceholderRef = null;
            _this.applySrc(result.src);
        }), (/**
         * @return {?}
         */
        function () {
            _this.videoSrcPlaceholderRef = null;
        }));
    };
    /**
     * @private
     * @return {?}
     */
    VideoBrickComponent.prototype.save = /**
     * @private
     * @return {?}
     */
    function () {
        this.stateChanges.emit(this.scope);
    };
    VideoBrickComponent.decorators = [
        { type: Component, args: [{
                    selector: 'video-brick',
                    template: "<iframe height=\"400\" [hidden]=\"uiState !== uiStates.video\" #iframe frameborder=\"0\" allowfullscreen></iframe>\n\n<w-brick-input-placeholder\n    [text]=\"'Add a Video'\"\n    [icon]=\"'music_video'\"\n    [hidden]=\"uiState === uiStates.video\" (selected)=\"showVideoPanel()\">\n</w-brick-input-placeholder>\n",
                    styles: [":host{position:relative;display:block}:host iframe{width:100%}"]
                }] }
    ];
    /** @nocollapse */
    VideoBrickComponent.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef },
        { type: ComponentFactoryResolver },
        { type: StickyModalService }
    ]; };
    VideoBrickComponent.propDecorators = {
        id: [{ type: Input }],
        state: [{ type: Input }],
        stateChanges: [{ type: Output }],
        iframe: [{ type: ViewChild, args: ['iframe',] }]
    };
    return VideoBrickComponent;
}());
export { VideoBrickComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW8tYnJpY2suY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvYnJpY2tzL3ZpZGVvLWJyaWNrL2NvbXBvbmVudC92aWRlby1icmljay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsd0JBQXdCLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekksT0FBTyxFQUFpQixrQkFBa0IsRUFBeUIsTUFBTSxrQkFBa0IsQ0FBQztBQUc1RixPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQztBQUMvRSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sdUNBQXVDLENBQUM7QUFFckU7SUEyQkksNkJBQW9CLFNBQW9CLEVBQ3BCLEVBQWMsRUFDZCx3QkFBa0QsRUFDbEQscUJBQXlDO1FBSHpDLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUNkLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbEQsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUFvQjtRQXJCbkQsaUJBQVksR0FBbUMsSUFBSSxZQUFZLEVBQUUsQ0FBQzs7UUFLNUUsYUFBUSxHQUFRO1lBQ1osT0FBTyxFQUFFLFNBQVM7WUFDbEIsS0FBSyxFQUFFLE9BQU87U0FDakIsQ0FBQztRQUVGLFlBQU8sR0FBVyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUV4QyxVQUFLLEdBQXFCO1lBQ3RCLEdBQUcsRUFBRSxFQUFFO1NBQ1YsQ0FBQztJQVFGLENBQUM7Ozs7SUFFRCxzQ0FBUTs7O0lBQVI7UUFBQSxpQkFZQztRQVhHLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FB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M0MsS0FBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQztZQUNuQyxLQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixDQUFDOzs7UUFBRTtZQUNDLEtBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUM7UUFDdkMsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7OztJQUVPLGtDQUFJOzs7O0lBQVo7UUFDSSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7Z0JBdEdKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsc1VBQTJDOztpQkFFOUM7Ozs7Z0JBWDZGLFNBQVM7Z0JBQTFELFVBQVU7Z0JBQXBDLHdCQUF3QjtnQkFDbkIsa0JBQWtCOzs7cUJBWXJDLEtBQUs7d0JBQ0wsS0FBSzsrQkFFTCxNQUFNO3lCQUVOLFNBQVMsU0FBQyxRQUFROztJQTRGdkIsMEJBQUM7Q0FBQSxBQXZHRCxJQXVHQztTQWxHWSxtQkFBbUI7OztJQUM1QixpQ0FBb0I7O0lBQ3BCLG9DQUFpQzs7SUFFakMsMkNBQTRFOztJQUU1RSxxQ0FBd0M7O0lBR3hDLHVDQUdFOztJQUVGLHNDQUF3Qzs7SUFFeEMsb0NBRUU7O0lBRUYscURBQXVDOzs7OztJQUUzQix3Q0FBNEI7Ozs7O0lBQzVCLGlDQUFzQjs7Ozs7SUFDdEIsdURBQTBEOzs7OztJQUMxRCxvREFBaUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCwgUmVuZGVyZXIyLCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdGlja3lNb2RhbFJlZiwgU3RpY2t5TW9kYWxTZXJ2aWNlLCBTdGlja3lQb3NpdGlvblN0cmF0ZWd5fSBmcm9tICduZ3gtc3RpY2t5LW1vZGFsJztcbmltcG9ydCB7SU9uV2FsbEZvY3VzfSBmcm9tICcuLi8uLi8uLi93YWxsL3dhbGwnO1xuaW1wb3J0IHtJVmlkZW9Ccmlja1N0YXRlfSBmcm9tICcuLi92aWRlby1icmljay1zdGF0ZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHtJbnB1dENvbnRleHRDb21wb25lbnR9IGZyb20gJy4uL2lucHV0LWNvbnRleHQvaW5wdXQtY29udGV4dC5jb21wb25lbnQnO1xuaW1wb3J0IHtnZXRNb2RhbENvbmZpZ30gZnJvbSAnLi4vLi4vYmFzZS1icmljay9iYXNlLWJyaWNrLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmlkZW8tYnJpY2snLFxuICAgIHRlbXBsYXRlVXJsOiAnLi92aWRlby1icmljay5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vdmlkZW8tYnJpY2suY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBWaWRlb0JyaWNrQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBJT25XYWxsRm9jdXMge1xuICAgIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG4gICAgQElucHV0KCkgc3RhdGU6IElWaWRlb0JyaWNrU3RhdGU7XG5cbiAgICBAT3V0cHV0KCkgc3RhdGVDaGFuZ2VzOiBFdmVudEVtaXR0ZXI8SVZpZGVvQnJpY2tTdGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAVmlld0NoaWxkKCdpZnJhbWUnKSBpZnJhbWU6IEVsZW1lbnRSZWY7XG5cbiAgICAvLyB1aVxuICAgIHVpU3RhdGVzOiBhbnkgPSB7XG4gICAgICAgIGluaXRpYWw6ICdpbml0aWFsJyxcbiAgICAgICAgdmlkZW86ICd2aWRlbydcbiAgICB9O1xuXG4gICAgdWlTdGF0ZTogc3RyaW5nID0gdGhpcy51aVN0YXRlcy5pbml0aWFsO1xuXG4gICAgc2NvcGU6IElWaWRlb0JyaWNrU3RhdGUgPSB7XG4gICAgICAgIHNyYzogJydcbiAgICB9O1xuXG4gICAgdmlkZW9TcmNQbGFjZWhvbGRlclJlZjogU3RpY2t5TW9kYWxSZWY7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyMjogUmVuZGVyZXIyLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgICAgICAgICBwcml2YXRlIG5neFN0aWNreU1vZGFsU2VydmljZTogU3RpY2t5TW9kYWxTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlICYmIHRoaXMuc3RhdGUuc3JjICE9PSB0aGlzLnNjb3BlLnNyYykge1xuICAgICAgICAgICAgdGhpcy5zY29wZS5zcmMgPSB0aGlzLnN0YXRlLnNyYztcblxuICAgICAgICAgICAgaWYgKHRoaXMuc2NvcGUuc3JjKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51aVN0YXRlID0gdGhpcy51aVN0YXRlcy52aWRlbztcblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyMi5zZXRBdHRyaWJ1dGUodGhpcy5pZnJhbWUubmF0aXZlRWxlbWVudCwgJ3NyYycsIHRoaXMuc2NvcGUuc3JjKTtcbiAgICAgICAgICAgICAgICB9LCAxMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbldhbGxTdGF0ZUNoYW5nZShuZXdTdGF0ZTogSVZpZGVvQnJpY2tTdGF0ZSkge1xuICAgICAgICBpZiAobmV3U3RhdGUgJiYgbmV3U3RhdGUuc3JjICE9PSB0aGlzLnNjb3BlLnNyYykge1xuICAgICAgICAgICAgdGhpcy5zY29wZS5zcmMgPSBuZXdTdGF0ZS5zcmM7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNjb3BlLnNyYykge1xuICAgICAgICAgICAgICAgIHRoaXMudWlTdGF0ZSA9IHRoaXMudWlTdGF0ZXMudmlkZW87XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlcjIuc2V0QXR0cmlidXRlKHRoaXMuaWZyYW1lLm5hdGl2ZUVsZW1lbnQsICdzcmMnLCB0aGlzLnNjb3BlLnNyYyk7XG4gICAgICAgICAgICAgICAgfSwgMTApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25XYWxsRm9jdXMoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnVpU3RhdGUgPT09IHRoaXMudWlTdGF0ZXMuaW5pdGlhbCAmJiAhdGhpcy52aWRlb1NyY1BsYWNlaG9sZGVyUmVmKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dWaWRlb1BhbmVsKCk7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcGx5U3JjKHNyYzogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMudWlTdGF0ZSA9IHRoaXMudWlTdGF0ZXMuaW5pdGlhbDtcblxuICAgICAgICBpZiAoc3JjLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3Qgc3JjQXJyYXkgPSBzcmMuc3BsaXQoJz0nKTtcbiAgICAgICAgICAgIGNvbnN0IHlvdXR1YmVJZCA9IHNyY0FycmF5WzFdO1xuXG4gICAgICAgICAgICBpZiAoeW91dHViZUlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY29wZS5zcmMgPSBgaHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvJHt5b3V0dWJlSWR9YDtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIyLnNldEF0dHJpYnV0ZSh0aGlzLmlmcmFtZS5uYXRpdmVFbGVtZW50LCAnc3JjJywgdGhpcy5zY29wZS5zcmMpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zYXZlKCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnVpU3RhdGUgPSB0aGlzLnVpU3RhdGVzLnZpZGVvO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvd1ZpZGVvUGFuZWwoKSB7XG4gICAgICAgIGNvbnN0IG1vZGFsQ29uZmlnID0gZ2V0TW9kYWxDb25maWcodGhpcy5lbCwgdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIElucHV0Q29udGV4dENvbXBvbmVudCk7XG4gICAgICAgIHRoaXMudmlkZW9TcmNQbGFjZWhvbGRlclJlZiA9IHRoaXMubmd4U3RpY2t5TW9kYWxTZXJ2aWNlLm9wZW4obW9kYWxDb25maWcpO1xuXG4gICAgICAgIHRoaXMudmlkZW9TcmNQbGFjZWhvbGRlclJlZi5yZXN1bHQudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnZpZGVvU3JjUGxhY2Vob2xkZXJSZWYgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5hcHBseVNyYyhyZXN1bHQuc3JjKTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy52aWRlb1NyY1BsYWNlaG9sZGVyUmVmID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzYXZlKCkge1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5lbWl0KHRoaXMuc2NvcGUpO1xuICAgIH1cbn1cbiJdfQ==