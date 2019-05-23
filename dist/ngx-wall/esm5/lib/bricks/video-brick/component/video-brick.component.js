/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ComponentFactoryResolver, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { StickyModalService, StickyPositionStrategy } from 'ngx-sticky-modal';
import { InputContextComponent } from '../input-context/input-context.component';
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
                setTimeout(function () {
                    _this.renderer2.setAttribute(_this.iframe.nativeElement, 'src', _this.scope.src);
                }, 10);
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
                setTimeout(function () {
                    _this.renderer2.setAttribute(_this.iframe.nativeElement, 'src', _this.scope.src);
                }, 10);
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
            setTimeout(function () {
                _this.showVideoPanel();
            }, 0);
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
        this.videoSrcPlaceholderRef.result.then(function (result) {
            _this.videoSrcPlaceholderRef = null;
            _this.applySrc(result.src);
        }, function () {
            _this.videoSrcPlaceholderRef = null;
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW8tYnJpY2suY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvYnJpY2tzL3ZpZGVvLWJyaWNrL2NvbXBvbmVudC92aWRlby1icmljay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsd0JBQXdCLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekksT0FBTyxFQUFpQixrQkFBa0IsRUFBRSxzQkFBc0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRzVGLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBRS9FO0lBMkJJLDZCQUFvQixTQUFvQixFQUNwQixFQUFjLEVBQ2Qsd0JBQWtELEVBQ2xELHFCQUF5QztRQUh6QyxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBQ2xELDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBb0I7UUFyQm5ELGlCQUFZLEdBQW1DLElBQUksWUFBWSxFQUFFLENBQUM7O1FBSzVFLGFBQVEsR0FBUTtZQUNaLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLEtBQUssRUFBRSxPQUFPO1NBQ2pCLENBQUM7UUFFRixZQUFPLEdBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7UUFFeEMsVUFBSyxHQUFxQjtZQUN0QixHQUFHLEVBQUUsRUFBRTtTQUNWLENBQUM7SUFRRixDQUFDOzs7O0lBRUQsc0NBQVE7OztJQUFSO1FBQUEsaUJBWUM7UUFYRyxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUU7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LFFBQVE7Z0JBQ2pCLFFBQVEsRUFBRSxRQUFRO2dCQUNsQixRQUFRLEVBQUUsS0FBSzthQUNsQjtZQUNELHdCQUF3QixFQUFFLElBQUksQ0FBQyx3QkFBd0I7U0FDMUQsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBQyxNQUFNO1lBQzNDLEtBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUM7WUFFbkMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsQ0FBQyxFQUFFO1lBQ0MsS0FBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQztRQUN2QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Ozs7O0lBRU8sa0NBQUk7Ozs7SUFBWjtRQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDOztnQkFySEosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxhQUFhO29CQUN2QixzVUFBMkM7O2lCQUU5Qzs7OztnQkFWNkYsU0FBUztnQkFBMUQsVUFBVTtnQkFBcEMsd0JBQXdCO2dCQUNuQixrQkFBa0I7OztxQkFXckMsS0FBSzt3QkFDTCxLQUFLOytCQUVMLE1BQU07eUJBRU4sU0FBUyxTQUFDLFFBQVE7O0lBMkd2QiwwQkFBQztDQUFBLEFBdEhELElBc0hDO1NBakhZLG1CQUFtQjs7O0lBQzVCLGlDQUFvQjs7SUFDcEIsb0NBQWlDOztJQUVqQywyQ0FBNEU7O0lBRTVFLHFDQUF3Qzs7SUFHeEMsdUNBR0U7O0lBRUYsc0NBQXdDOztJQUV4QyxvQ0FFRTs7SUFFRixxREFBdUM7Ozs7O0lBRTNCLHdDQUE0Qjs7Ozs7SUFDNUIsaUNBQXNCOzs7OztJQUN0Qix1REFBMEQ7Ozs7O0lBQzFELG9EQUFpRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBSZW5kZXJlcjIsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N0aWNreU1vZGFsUmVmLCBTdGlja3lNb2RhbFNlcnZpY2UsIFN0aWNreVBvc2l0aW9uU3RyYXRlZ3l9IGZyb20gJ25neC1zdGlja3ktbW9kYWwnO1xuaW1wb3J0IHtJT25XYWxsRm9jdXN9IGZyb20gJy4uLy4uLy4uL3dhbGwvd2FsbCc7XG5pbXBvcnQge0lWaWRlb0JyaWNrU3RhdGV9IGZyb20gJy4uL3ZpZGVvLWJyaWNrLXN0YXRlLmludGVyZmFjZSc7XG5pbXBvcnQge0lucHV0Q29udGV4dENvbXBvbmVudH0gZnJvbSAnLi4vaW5wdXQtY29udGV4dC9pbnB1dC1jb250ZXh0LmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmlkZW8tYnJpY2snLFxuICAgIHRlbXBsYXRlVXJsOiAnLi92aWRlby1icmljay5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vdmlkZW8tYnJpY2suY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBWaWRlb0JyaWNrQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBJT25XYWxsRm9jdXMge1xuICAgIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG4gICAgQElucHV0KCkgc3RhdGU6IElWaWRlb0JyaWNrU3RhdGU7XG5cbiAgICBAT3V0cHV0KCkgc3RhdGVDaGFuZ2VzOiBFdmVudEVtaXR0ZXI8SVZpZGVvQnJpY2tTdGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAVmlld0NoaWxkKCdpZnJhbWUnKSBpZnJhbWU6IEVsZW1lbnRSZWY7XG5cbiAgICAvLyB1aVxuICAgIHVpU3RhdGVzOiBhbnkgPSB7XG4gICAgICAgIGluaXRpYWw6ICdpbml0aWFsJyxcbiAgICAgICAgdmlkZW86ICd2aWRlbydcbiAgICB9O1xuXG4gICAgdWlTdGF0ZTogc3RyaW5nID0gdGhpcy51aVN0YXRlcy5pbml0aWFsO1xuXG4gICAgc2NvcGU6IElWaWRlb0JyaWNrU3RhdGUgPSB7XG4gICAgICAgIHNyYzogJydcbiAgICB9O1xuXG4gICAgdmlkZW9TcmNQbGFjZWhvbGRlclJlZjogU3RpY2t5TW9kYWxSZWY7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyMjogUmVuZGVyZXIyLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgICAgICAgICBwcml2YXRlIG5neFN0aWNreU1vZGFsU2VydmljZTogU3RpY2t5TW9kYWxTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlICYmIHRoaXMuc3RhdGUuc3JjICE9PSB0aGlzLnNjb3BlLnNyYykge1xuICAgICAgICAgICAgdGhpcy5zY29wZS5zcmMgPSB0aGlzLnN0YXRlLnNyYztcblxuICAgICAgICAgICAgaWYgKHRoaXMuc2NvcGUuc3JjKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51aVN0YXRlID0gdGhpcy51aVN0YXRlcy52aWRlbztcblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyMi5zZXRBdHRyaWJ1dGUodGhpcy5pZnJhbWUubmF0aXZlRWxlbWVudCwgJ3NyYycsIHRoaXMuc2NvcGUuc3JjKTtcbiAgICAgICAgICAgICAgICB9LCAxMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbldhbGxTdGF0ZUNoYW5nZShuZXdTdGF0ZTogSVZpZGVvQnJpY2tTdGF0ZSkge1xuICAgICAgICBpZiAobmV3U3RhdGUgJiYgbmV3U3RhdGUuc3JjICE9PSB0aGlzLnNjb3BlLnNyYykge1xuICAgICAgICAgICAgdGhpcy5zY29wZS5zcmMgPSBuZXdTdGF0ZS5zcmM7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNjb3BlLnNyYykge1xuICAgICAgICAgICAgICAgIHRoaXMudWlTdGF0ZSA9IHRoaXMudWlTdGF0ZXMudmlkZW87XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlcjIuc2V0QXR0cmlidXRlKHRoaXMuaWZyYW1lLm5hdGl2ZUVsZW1lbnQsICdzcmMnLCB0aGlzLnNjb3BlLnNyYyk7XG4gICAgICAgICAgICAgICAgfSwgMTApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25XYWxsRm9jdXMoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnVpU3RhdGUgPT09IHRoaXMudWlTdGF0ZXMuaW5pdGlhbCAmJiAhdGhpcy52aWRlb1NyY1BsYWNlaG9sZGVyUmVmKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dWaWRlb1BhbmVsKCk7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcGx5U3JjKHNyYzogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMudWlTdGF0ZSA9IHRoaXMudWlTdGF0ZXMuaW5pdGlhbDtcblxuICAgICAgICBpZiAoc3JjLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3Qgc3JjQXJyYXkgPSBzcmMuc3BsaXQoJz0nKTtcbiAgICAgICAgICAgIGNvbnN0IHlvdXR1YmVJZCA9IHNyY0FycmF5WzFdO1xuXG4gICAgICAgICAgICBpZiAoeW91dHViZUlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY29wZS5zcmMgPSBgaHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvJHt5b3V0dWJlSWR9YDtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIyLnNldEF0dHJpYnV0ZSh0aGlzLmlmcmFtZS5uYXRpdmVFbGVtZW50LCAnc3JjJywgdGhpcy5zY29wZS5zcmMpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zYXZlKCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnVpU3RhdGUgPSB0aGlzLnVpU3RhdGVzLnZpZGVvO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvd1ZpZGVvUGFuZWwoKSB7XG4gICAgICAgIHRoaXMudmlkZW9TcmNQbGFjZWhvbGRlclJlZiA9IHRoaXMubmd4U3RpY2t5TW9kYWxTZXJ2aWNlLm9wZW4oe1xuICAgICAgICAgICAgY29tcG9uZW50OiBJbnB1dENvbnRleHRDb21wb25lbnQsXG4gICAgICAgICAgICBwb3NpdGlvblN0cmF0ZWd5OiB7XG4gICAgICAgICAgICAgICAgbmFtZTogU3RpY2t5UG9zaXRpb25TdHJhdGVneS5mbGV4aWJsZUNvbm5lY3RlZCxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlVG86IHRoaXMuZWwubmF0aXZlRWxlbWVudFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwb3NpdGlvbjoge1xuICAgICAgICAgICAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgIG9yaWdpblk6ICdib3R0b20nLFxuICAgICAgICAgICAgICAgIG92ZXJsYXlYOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICBvdmVybGF5WTogJ3RvcCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudmlkZW9TcmNQbGFjZWhvbGRlclJlZi5yZXN1bHQudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnZpZGVvU3JjUGxhY2Vob2xkZXJSZWYgPSBudWxsO1xuXG4gICAgICAgICAgICB0aGlzLmFwcGx5U3JjKHJlc3VsdC5zcmMpO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnZpZGVvU3JjUGxhY2Vob2xkZXJSZWYgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNhdmUoKSB7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLmVtaXQodGhpcy5zY29wZSk7XG4gICAgfVxufVxuIl19