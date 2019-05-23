/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ComponentFactoryResolver, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { StickyModalService, StickyPositionStrategy } from 'ngx-sticky-modal';
import { InputContextComponent } from '../input-context/input-context.component';
var WebBookmarkBrickComponent = /** @class */ (function () {
    function WebBookmarkBrickComponent(el, componentFactoryResolver, ngxStickyModalService) {
        this.el = el;
        this.componentFactoryResolver = componentFactoryResolver;
        this.ngxStickyModalService = ngxStickyModalService;
        this.stateChanges = new EventEmitter();
        this.scope = {
            src: null,
            description: null,
            image: {
                height: null,
                width: null,
                url: null
            },
            logo: {
                height: null,
                width: null,
                url: null
            },
            title: null,
            author: null
        };
        this.loading = false;
    }
    /**
     * @return {?}
     */
    WebBookmarkBrickComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        Object.assign(this.scope, this.state);
    };
    /**
     * @param {?} newState
     * @return {?}
     */
    WebBookmarkBrickComponent.prototype.onWallStateChange = /**
     * @param {?} newState
     * @return {?}
     */
    function (newState) {
        if (newState && newState.src !== this.scope.src) {
            Object.assign(this.scope, this.state);
        }
    };
    /**
     * @param {?} src
     * @return {?}
     */
    WebBookmarkBrickComponent.prototype.applySrc = /**
     * @param {?} src
     * @return {?}
     */
    function (src) {
        var _this = this;
        if (src.length) {
            if (this.isValidUrl(src)) {
                this.loading = true;
                this.getWebPageMetaInfo(src).then(function (webPageMetaInfo) {
                    Object.assign(_this.scope, webPageMetaInfo);
                    _this.scope.src = src;
                    _this.save();
                    _this.loading = false;
                }, function () {
                    _this.loading = false;
                });
            }
            else {
                alert('Url is invalid');
            }
        }
    };
    /**
     * @return {?}
     */
    WebBookmarkBrickComponent.prototype.showPanel = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.loading) {
            this.ngxStickyModalService.open({
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
            }).result.then(function (result) {
                _this.applySrc(result.src);
            }, function () {
            });
        }
    };
    /**
     * @return {?}
     */
    WebBookmarkBrickComponent.prototype.onWallFocus = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.scope.src) {
            setTimeout(function () {
                _this.showPanel();
            }, 0);
        }
    };
    /**
     * @private
     * @return {?}
     */
    WebBookmarkBrickComponent.prototype.save = /**
     * @private
     * @return {?}
     */
    function () {
        this.stateChanges.emit(this.scope);
    };
    /**
     * @private
     * @param {?} url
     * @return {?}
     */
    WebBookmarkBrickComponent.prototype.getWebPageMetaInfo = /**
     * @private
     * @param {?} url
     * @return {?}
     */
    function (url) {
        return fetch("https://api.microlink.io/?url=" + url).then(function (page) {
            return page.json().then(function (pageMetadata) {
                var _a = pageMetadata.data, image = _a.image, description = _a.description, logo = _a.logo, title = _a.title, author = _a.author;
                return {
                    image: image,
                    description: description,
                    logo: logo,
                    title: title,
                    author: author
                };
            });
        });
    };
    /**
     * @private
     * @param {?} src
     * @return {?}
     */
    WebBookmarkBrickComponent.prototype.isValidUrl = /**
     * @private
     * @param {?} src
     * @return {?}
     */
    function (src) {
        /** @type {?} */
        var url;
        try {
            url = new URL(src);
        }
        catch (e) {
        }
        return Boolean(url);
    };
    WebBookmarkBrickComponent.decorators = [
        { type: Component, args: [{
                    selector: 'web-bookmark-brick',
                    template: "<w-brick-input-placeholder\n    [text]=\"'Add a Web Bookmark'\"\n    [icon]=\"'link'\"\n    [loading]=\"loading\"\n    *ngIf=\"!scope.src\"\n    (selected)=\"showPanel()\">\n</w-brick-input-placeholder>\n\n<div *ngIf=\"scope.src\" class=\"web-bookmark\">\n    <a [href]=\"scope.src\" class=\"web-bookmark__content\" target=\"_blank\" [title]=\"scope.src\">\n        <p class=\"web-bookmark__title\">{{scope.title}}</p>\n        <p class=\"web-bookmark__description\">{{scope.description}}</p>\n\n        <div class=\"web-bookmark__link\">\n            <img *ngIf=\"scope.logo\" [src]=\"scope.logo.url\" alt=\"scope.title\">\n            <p>{{scope.src}}</p>\n        </div>\n    </a>\n\n    <div class=\"web-bookmark__img\" [tow-slave]=\"id\" [style.backgroundImage]=\"'url('+ scope.image?.url +')'\">\n    </div>\n</div>\n",
                    styles: [":host{position:relative;display:block}:host .web-bookmark{display:flex;height:6rem;overflow:hidden;outline:silver solid 1px;margin:.3rem 0}:host .web-bookmark:hover{cursor:pointer}:host .web-bookmark__content{width:70%;border-right:none;text-decoration:none;margin:.4rem .7rem;border-radius:2px;overflow:hidden}:host .web-bookmark__title{margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .web-bookmark__description{overflow:hidden;height:2.4rem;margin-bottom:.3rem}:host .web-bookmark__link{display:flex;align-items:center}:host .web-bookmark__link img{width:18px;height:18px;-o-object-fit:cover;object-fit:cover;margin-right:.4rem}:host .web-bookmark__link p{overflow:hidden;margin:0;height:1.2rem}:host .web-bookmark__img{width:30%;background-position:center center;background-size:cover}"]
                }] }
    ];
    /** @nocollapse */
    WebBookmarkBrickComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ComponentFactoryResolver },
        { type: StickyModalService }
    ]; };
    WebBookmarkBrickComponent.propDecorators = {
        id: [{ type: Input }],
        state: [{ type: Input }],
        stateChanges: [{ type: Output }]
    };
    return WebBookmarkBrickComponent;
}());
export { WebBookmarkBrickComponent };
if (false) {
    /** @type {?} */
    WebBookmarkBrickComponent.prototype.id;
    /** @type {?} */
    WebBookmarkBrickComponent.prototype.state;
    /** @type {?} */
    WebBookmarkBrickComponent.prototype.stateChanges;
    /** @type {?} */
    WebBookmarkBrickComponent.prototype.scope;
    /** @type {?} */
    WebBookmarkBrickComponent.prototype.loading;
    /**
     * @type {?}
     * @private
     */
    WebBookmarkBrickComponent.prototype.el;
    /**
     * @type {?}
     * @private
     */
    WebBookmarkBrickComponent.prototype.componentFactoryResolver;
    /**
     * @type {?}
     * @private
     */
    WebBookmarkBrickComponent.prototype.ngxStickyModalService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLWJvb2ttYXJrLWJyaWNrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL2JyaWNrcy93ZWItYm9va21hcmstYnJpY2svY29tcG9uZW50L3dlYi1ib29rbWFyay1icmljay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsd0JBQXdCLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ25ILE9BQU8sRUFBQyxrQkFBa0IsRUFBRSxzQkFBc0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRTVFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBRS9FO0lBOEJJLG1DQUFvQixFQUFjLEVBQ2Qsd0JBQWtELEVBQ2xELHFCQUF5QztRQUZ6QyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ2QsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCwwQkFBcUIsR0FBckIscUJBQXFCLENBQW9CO1FBdkJuRCxpQkFBWSxHQUF5QyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxGLFVBQUssR0FBMkI7WUFDNUIsR0FBRyxFQUFFLElBQUk7WUFDVCxXQUFXLEVBQUUsSUFBSTtZQUNqQixLQUFLLEVBQUU7Z0JBQ0gsTUFBTSxFQUFFLElBQUk7Z0JBQ1osS0FBSyxFQUFFLElBQUk7Z0JBQ1gsR0FBRyxFQUFFLElBQUk7YUFDWjtZQUNELElBQUksRUFBRTtnQkFDRixNQUFNLEVBQUUsSUFBSTtnQkFDWixLQUFLLEVBQUUsSUFBSTtnQkFDWCxHQUFHLEVBQUUsSUFBSTthQUNaO1lBQ0QsS0FBSyxFQUFFLElBQUk7WUFDWCxNQUFNLEVBQUUsSUFBSTtTQUNmLENBQUM7UUFFRixZQUFPLEdBQUcsS0FBSyxDQUFDO0lBS2hCLENBQUM7Ozs7SUFFRCw0Q0FBUTs7O0lBQVI7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QU1lLEVBTGpCLGdCQUFLLEVBQ0wsNEJBQVcsRUFDWCxjQUFJLEVBQ0osZ0JBQUssRUFDTCxrQkFDaUI7Z0JBRXJCLE9BQU87b0JBQ0gsS0FBSyxPQUFBO29CQUNMLFdBQVcsYUFBQTtvQkFDWCxJQUFJLE1BQUE7b0JBQ0osS0FBSyxPQUFBO29CQUNMLE1BQU0sUUFBQTtpQkFDVCxDQUFDO1lBQ04sQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Ozs7OztJQUVPLDhDQUFVOzs7OztJQUFsQixVQUFtQixHQUFXOztZQUN0QixHQUFHO1FBRVAsSUFBSTtZQUNBLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN0QjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1NBQ1g7UUFFRCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN4QixDQUFDOztnQkF0SUosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLG0wQkFBa0Q7O2lCQUVyRDs7OztnQkFUNEMsVUFBVTtnQkFBcEMsd0JBQXdCO2dCQUNuQyxrQkFBa0I7OztxQkFVckIsS0FBSzt3QkFDTCxLQUFLOytCQUVMLE1BQU07O0lBOEhYLGdDQUFDO0NBQUEsQUF2SUQsSUF1SUM7U0FsSVkseUJBQXlCOzs7SUFDbEMsdUNBQW9COztJQUNwQiwwQ0FBdUM7O0lBRXZDLGlEQUFrRjs7SUFFbEYsMENBZUU7O0lBRUYsNENBQWdCOzs7OztJQUVKLHVDQUFzQjs7Ozs7SUFDdEIsNkRBQTBEOzs7OztJQUMxRCwwREFBaUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N0aWNreU1vZGFsU2VydmljZSwgU3RpY2t5UG9zaXRpb25TdHJhdGVneX0gZnJvbSAnbmd4LXN0aWNreS1tb2RhbCc7XG5pbXBvcnQge0lXZWJCb29rbWFya0JyaWNrU3RhdGV9IGZyb20gJy4uL3dlYi1ib29rbWFyay1icmljay1zdGF0ZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHtJbnB1dENvbnRleHRDb21wb25lbnR9IGZyb20gJy4uL2lucHV0LWNvbnRleHQvaW5wdXQtY29udGV4dC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3dlYi1ib29rbWFyay1icmljaycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3dlYi1ib29rbWFyay1icmljay5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vd2ViLWJvb2ttYXJrLWJyaWNrLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgV2ViQm9va21hcmtCcmlja0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KCkgaWQ6IHN0cmluZztcbiAgICBASW5wdXQoKSBzdGF0ZTogSVdlYkJvb2ttYXJrQnJpY2tTdGF0ZTtcblxuICAgIEBPdXRwdXQoKSBzdGF0ZUNoYW5nZXM6IEV2ZW50RW1pdHRlcjxJV2ViQm9va21hcmtCcmlja1N0YXRlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHNjb3BlOiBJV2ViQm9va21hcmtCcmlja1N0YXRlID0ge1xuICAgICAgICBzcmM6IG51bGwsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBudWxsLFxuICAgICAgICBpbWFnZToge1xuICAgICAgICAgICAgaGVpZ2h0OiBudWxsLFxuICAgICAgICAgICAgd2lkdGg6IG51bGwsXG4gICAgICAgICAgICB1cmw6IG51bGxcbiAgICAgICAgfSxcbiAgICAgICAgbG9nbzoge1xuICAgICAgICAgICAgaGVpZ2h0OiBudWxsLFxuICAgICAgICAgICAgd2lkdGg6IG51bGwsXG4gICAgICAgICAgICB1cmw6IG51bGxcbiAgICAgICAgfSxcbiAgICAgICAgdGl0bGU6IG51bGwsXG4gICAgICAgIGF1dGhvcjogbnVsbFxuICAgIH07XG5cbiAgICBsb2FkaW5nID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBuZ3hTdGlja3lNb2RhbFNlcnZpY2U6IFN0aWNreU1vZGFsU2VydmljZSkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuc2NvcGUsIHRoaXMuc3RhdGUpO1xuICAgIH1cblxuICAgIG9uV2FsbFN0YXRlQ2hhbmdlKG5ld1N0YXRlOiBJV2ViQm9va21hcmtCcmlja1N0YXRlKSB7XG4gICAgICAgIGlmIChuZXdTdGF0ZSAmJiBuZXdTdGF0ZS5zcmMgIT09IHRoaXMuc2NvcGUuc3JjKSB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuc2NvcGUsIHRoaXMuc3RhdGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBwbHlTcmMoc3JjOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHNyYy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzVmFsaWRVcmwoc3JjKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmdldFdlYlBhZ2VNZXRhSW5mbyhzcmMpLnRoZW4oKHdlYlBhZ2VNZXRhSW5mbykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuc2NvcGUsIHdlYlBhZ2VNZXRhSW5mbyk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY29wZS5zcmMgPSBzcmM7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXZlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ1VybCBpcyBpbnZhbGlkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93UGFuZWwoKSB7XG4gICAgICAgIGlmICghdGhpcy5sb2FkaW5nKSB7XG4gICAgICAgICAgICB0aGlzLm5neFN0aWNreU1vZGFsU2VydmljZS5vcGVuKHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnQ6IElucHV0Q29udGV4dENvbXBvbmVudCxcbiAgICAgICAgICAgICAgICBwb3NpdGlvblN0cmF0ZWd5OiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFN0aWNreVBvc2l0aW9uU3RyYXRlZ3kuZmxleGlibGVDb25uZWN0ZWQsXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlVG86IHRoaXMuZWwubmF0aXZlRWxlbWVudFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICBvcmlnaW5YOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luWTogJ2JvdHRvbScsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlYOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVk6ICd0b3AnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyXG4gICAgICAgICAgICB9KS5yZXN1bHQudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseVNyYyhyZXN1bHQuc3JjKTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25XYWxsRm9jdXMoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5zY29wZS5zcmMpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1BhbmVsKCk7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2F2ZSgpIHtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMuZW1pdCh0aGlzLnNjb3BlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFdlYlBhZ2VNZXRhSW5mbyh1cmw6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cHM6Ly9hcGkubWljcm9saW5rLmlvLz91cmw9JHt1cmx9YCkudGhlbigocGFnZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHBhZ2UuanNvbigpLnRoZW4oKHBhZ2VNZXRhZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2UsXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICBsb2dvLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgYXV0aG9yXG4gICAgICAgICAgICAgICAgfSA9IHBhZ2VNZXRhZGF0YS5kYXRhO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2UsXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICBsb2dvLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgYXV0aG9yXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzVmFsaWRVcmwoc3JjOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IHVybDtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdXJsID0gbmV3IFVSTChzcmMpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gQm9vbGVhbih1cmwpO1xuICAgIH1cbn1cbiJdfQ==