/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ComponentFactoryResolver, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { StickyModalService, StickyPositionStrategy } from 'ngx-sticky-modal';
import { InputContextComponent } from '../input-context/input-context.component';
export class WebBookmarkBrickComponent {
    /**
     * @param {?} el
     * @param {?} componentFactoryResolver
     * @param {?} ngxStickyModalService
     */
    constructor(el, componentFactoryResolver, ngxStickyModalService) {
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
    ngOnInit() {
        Object.assign(this.scope, this.state);
    }
    /**
     * @param {?} newState
     * @return {?}
     */
    onWallStateChange(newState) {
        if (newState && newState.src !== this.scope.src) {
            Object.assign(this.scope, this.state);
        }
    }
    /**
     * @param {?} src
     * @return {?}
     */
    applySrc(src) {
        if (src.length) {
            if (this.isValidUrl(src)) {
                this.loading = true;
                this.getWebPageMetaInfo(src).then((/**
                 * @param {?} webPageMetaInfo
                 * @return {?}
                 */
                (webPageMetaInfo) => {
                    Object.assign(this.scope, webPageMetaInfo);
                    this.scope.src = src;
                    this.save();
                    this.loading = false;
                }), (/**
                 * @return {?}
                 */
                () => {
                    this.loading = false;
                }));
            }
            else {
                alert('Url is invalid');
            }
        }
    }
    /**
     * @return {?}
     */
    showPanel() {
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
            }).result.then((/**
             * @param {?} result
             * @return {?}
             */
            (result) => {
                this.applySrc(result.src);
            }), (/**
             * @return {?}
             */
            () => {
            }));
        }
    }
    /**
     * @return {?}
     */
    onWallFocus() {
        if (!this.scope.src) {
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.showPanel();
            }), 0);
        }
    }
    /**
     * @private
     * @return {?}
     */
    save() {
        this.stateChanges.emit(this.scope);
    }
    /**
     * @private
     * @param {?} url
     * @return {?}
     */
    getWebPageMetaInfo(url) {
        return fetch(`https://api.microlink.io/?url=${url}`).then((/**
         * @param {?} page
         * @return {?}
         */
        (page) => {
            return page.json().then((/**
             * @param {?} pageMetadata
             * @return {?}
             */
            (pageMetadata) => {
                const { image, description, logo, title, author } = pageMetadata.data;
                return {
                    image,
                    description,
                    logo,
                    title,
                    author
                };
            }));
        }));
    }
    /**
     * @private
     * @param {?} src
     * @return {?}
     */
    isValidUrl(src) {
        /** @type {?} */
        let url;
        try {
            url = new URL(src);
        }
        catch (e) {
        }
        return Boolean(url);
    }
}
WebBookmarkBrickComponent.decorators = [
    { type: Component, args: [{
                selector: 'web-bookmark-brick',
                template: "<w-brick-input-placeholder\n    [text]=\"'Add a Web Bookmark'\"\n    [icon]=\"'link'\"\n    [loading]=\"loading\"\n    *ngIf=\"!scope.src\"\n    (selected)=\"showPanel()\">\n</w-brick-input-placeholder>\n\n<div *ngIf=\"scope.src\" class=\"web-bookmark\">\n    <a [href]=\"scope.src\" class=\"web-bookmark__content\" target=\"_blank\" [title]=\"scope.src\">\n        <p class=\"web-bookmark__title\">{{scope.title}}</p>\n        <p class=\"web-bookmark__description\">{{scope.description}}</p>\n\n        <div class=\"web-bookmark__link\">\n            <img *ngIf=\"scope.logo\" [src]=\"scope.logo.url\" alt=\"scope.title\">\n            <p>{{scope.src}}</p>\n        </div>\n    </a>\n\n    <div class=\"web-bookmark__img\" [tow-slave]=\"id\" [style.backgroundImage]=\"'url('+ scope.image?.url +')'\">\n    </div>\n</div>\n",
                styles: [":host{position:relative;display:block}:host .web-bookmark{display:flex;height:6rem;overflow:hidden;outline:silver solid 1px;margin:.3rem 0}:host .web-bookmark:hover{cursor:pointer}:host .web-bookmark__content{width:70%;border-right:none;text-decoration:none;margin:.4rem .7rem;border-radius:2px;overflow:hidden}:host .web-bookmark__title{margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .web-bookmark__description{overflow:hidden;height:2.4rem;margin-bottom:.3rem}:host .web-bookmark__link{display:flex;align-items:center}:host .web-bookmark__link img{width:18px;height:18px;-o-object-fit:cover;object-fit:cover;margin-right:.4rem}:host .web-bookmark__link p{overflow:hidden;margin:0;height:1.2rem}:host .web-bookmark__img{width:30%;background-position:center center;background-size:cover}"]
            }] }
];
/** @nocollapse */
WebBookmarkBrickComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ComponentFactoryResolver },
    { type: StickyModalService }
];
WebBookmarkBrickComponent.propDecorators = {
    id: [{ type: Input }],
    state: [{ type: Input }],
    stateChanges: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLWJvb2ttYXJrLWJyaWNrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL2JyaWNrcy93ZWItYm9va21hcmstYnJpY2svY29tcG9uZW50L3dlYi1ib29rbWFyay1icmljay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsd0JBQXdCLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ25ILE9BQU8sRUFBQyxrQkFBa0IsRUFBRSxzQkFBc0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRTVFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBTy9FLE1BQU0sT0FBTyx5QkFBeUI7Ozs7OztJQXlCbEMsWUFBb0IsRUFBYyxFQUNkLHdCQUFrRCxFQUNsRCxxQkFBeUM7UUFGekMsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUNkLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbEQsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUFvQjtRQXZCbkQsaUJBQVksR0FBeUMsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVsRixVQUFLLEdBQTJCO1lBQzVCLEdBQUcsRUFBRSxJQUFJO1lBQ1QsV0FBVyxFQUFFLElBQUk7WUFDakIsS0FBSyxFQUFFO2dCQUNILE1BQU0sRUFBRSxJQUFJO2dCQUNaLEtBQUssRUFBRSxJQUFJO2dCQUNYLEdBQUcsRUFBRSxJQUFJO2FBQ1o7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsTUFBTSxFQUFFLElBQUk7Z0JBQ1osS0FBSyxFQUFFLElBQUk7Z0JBQ1gsR0FBRyxFQUFFLElBQUk7YUFDWjtZQUNELEtBQUssRUFBRSxJQUFJO1lBQ1gsTUFBTSxFQUFFLElBQUk7U0FDZixDQUFDO1FBRUYsWUFBTyxHQUFHLEtBQUssQ0FBQztJQUtoQixDQUFD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QUU7c0JBQy9CLEVBQ0YsS0FBSyxFQUNMLFdBQVcsRUFDWCxJQUFJLEVBQ0osS0FBSyxFQUNMLE1BQU0sRUFDVCxHQUFHLFlBQVksQ0FBQyxJQUFJO2dCQUVyQixPQUFPO29CQUNILEtBQUs7b0JBQ0wsV0FBVztvQkFDWCxJQUFJO29CQUNKLEtBQUs7b0JBQ0wsTUFBTTtpQkFDVCxDQUFDO1lBQ04sQ0FBQyxFQUFDLENBQUM7UUFDUCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7OztJQUVPLFVBQVUsQ0FBQyxHQUFXOztZQUN0QixHQUFHO1FBRVAsSUFBSTtZQUNBLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN0QjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1NBQ1g7UUFFRCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN4QixDQUFDOzs7WUF0SUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLG0wQkFBa0Q7O2FBRXJEOzs7O1lBVDRDLFVBQVU7WUFBcEMsd0JBQXdCO1lBQ25DLGtCQUFrQjs7O2lCQVVyQixLQUFLO29CQUNMLEtBQUs7MkJBRUwsTUFBTTs7OztJQUhQLHVDQUFvQjs7SUFDcEIsMENBQXVDOztJQUV2QyxpREFBa0Y7O0lBRWxGLDBDQWVFOztJQUVGLDRDQUFnQjs7Ozs7SUFFSix1Q0FBc0I7Ozs7O0lBQ3RCLDZEQUEwRDs7Ozs7SUFDMUQsMERBQWlEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdGlja3lNb2RhbFNlcnZpY2UsIFN0aWNreVBvc2l0aW9uU3RyYXRlZ3l9IGZyb20gJ25neC1zdGlja3ktbW9kYWwnO1xuaW1wb3J0IHtJV2ViQm9va21hcmtCcmlja1N0YXRlfSBmcm9tICcuLi93ZWItYm9va21hcmstYnJpY2stc3RhdGUuaW50ZXJmYWNlJztcbmltcG9ydCB7SW5wdXRDb250ZXh0Q29tcG9uZW50fSBmcm9tICcuLi9pbnB1dC1jb250ZXh0L2lucHV0LWNvbnRleHQuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd3ZWItYm9va21hcmstYnJpY2snLFxuICAgIHRlbXBsYXRlVXJsOiAnLi93ZWItYm9va21hcmstYnJpY2suY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3dlYi1ib29rbWFyay1icmljay5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFdlYkJvb2ttYXJrQnJpY2tDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG4gICAgQElucHV0KCkgc3RhdGU6IElXZWJCb29rbWFya0JyaWNrU3RhdGU7XG5cbiAgICBAT3V0cHV0KCkgc3RhdGVDaGFuZ2VzOiBFdmVudEVtaXR0ZXI8SVdlYkJvb2ttYXJrQnJpY2tTdGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBzY29wZTogSVdlYkJvb2ttYXJrQnJpY2tTdGF0ZSA9IHtcbiAgICAgICAgc3JjOiBudWxsLFxuICAgICAgICBkZXNjcmlwdGlvbjogbnVsbCxcbiAgICAgICAgaW1hZ2U6IHtcbiAgICAgICAgICAgIGhlaWdodDogbnVsbCxcbiAgICAgICAgICAgIHdpZHRoOiBudWxsLFxuICAgICAgICAgICAgdXJsOiBudWxsXG4gICAgICAgIH0sXG4gICAgICAgIGxvZ286IHtcbiAgICAgICAgICAgIGhlaWdodDogbnVsbCxcbiAgICAgICAgICAgIHdpZHRoOiBudWxsLFxuICAgICAgICAgICAgdXJsOiBudWxsXG4gICAgICAgIH0sXG4gICAgICAgIHRpdGxlOiBudWxsLFxuICAgICAgICBhdXRob3I6IG51bGxcbiAgICB9O1xuXG4gICAgbG9hZGluZyA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgICBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgbmd4U3RpY2t5TW9kYWxTZXJ2aWNlOiBTdGlja3lNb2RhbFNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLnNjb3BlLCB0aGlzLnN0YXRlKTtcbiAgICB9XG5cbiAgICBvbldhbGxTdGF0ZUNoYW5nZShuZXdTdGF0ZTogSVdlYkJvb2ttYXJrQnJpY2tTdGF0ZSkge1xuICAgICAgICBpZiAobmV3U3RhdGUgJiYgbmV3U3RhdGUuc3JjICE9PSB0aGlzLnNjb3BlLnNyYykge1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLnNjb3BlLCB0aGlzLnN0YXRlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcGx5U3JjKHNyYzogc3RyaW5nKSB7XG4gICAgICAgIGlmIChzcmMubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkVXJsKHNyYykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRXZWJQYWdlTWV0YUluZm8oc3JjKS50aGVuKCh3ZWJQYWdlTWV0YUluZm8pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLnNjb3BlLCB3ZWJQYWdlTWV0YUluZm8pO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NvcGUuc3JjID0gc3JjO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2F2ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdVcmwgaXMgaW52YWxpZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvd1BhbmVsKCkge1xuICAgICAgICBpZiAoIXRoaXMubG9hZGluZykge1xuICAgICAgICAgICAgdGhpcy5uZ3hTdGlja3lNb2RhbFNlcnZpY2Uub3Blbih7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50OiBJbnB1dENvbnRleHRDb21wb25lbnQsXG4gICAgICAgICAgICAgICAgcG9zaXRpb25TdHJhdGVneToge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBTdGlja3lQb3NpdGlvblN0cmF0ZWd5LmZsZXhpYmxlQ29ubmVjdGVkLFxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZVRvOiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblk6ICdib3R0b20nLFxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5WDogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlZOiAndG9wJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlclxuICAgICAgICAgICAgfSkucmVzdWx0LnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlTcmMocmVzdWx0LnNyYyk7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uV2FsbEZvY3VzKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuc2NvcGUuc3JjKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dQYW5lbCgpO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNhdmUoKSB7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLmVtaXQodGhpcy5zY29wZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRXZWJQYWdlTWV0YUluZm8odXJsOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHBzOi8vYXBpLm1pY3JvbGluay5pby8/dXJsPSR7dXJsfWApLnRoZW4oKHBhZ2UpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBwYWdlLmpzb24oKS50aGVuKChwYWdlTWV0YWRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgICAgIGltYWdlLFxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgbG9nbyxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUsXG4gICAgICAgICAgICAgICAgICAgIGF1dGhvclxuICAgICAgICAgICAgICAgIH0gPSBwYWdlTWV0YWRhdGEuZGF0YTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGltYWdlLFxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgbG9nbyxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUsXG4gICAgICAgICAgICAgICAgICAgIGF1dGhvclxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc1ZhbGlkVXJsKHNyYzogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCB1cmw7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHVybCA9IG5ldyBVUkwoc3JjKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEJvb2xlYW4odXJsKTtcbiAgICB9XG59XG4iXX0=