/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                this.getWebPageMetaInfo(src).then((/**
                 * @param {?} webPageMetaInfo
                 * @return {?}
                 */
                function (webPageMetaInfo) {
                    Object.assign(_this.scope, webPageMetaInfo);
                    _this.scope.src = src;
                    _this.save();
                    _this.loading = false;
                }), (/**
                 * @return {?}
                 */
                function () {
                    _this.loading = false;
                }));
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
            }).result.then((/**
             * @param {?} result
             * @return {?}
             */
            function (result) {
                _this.applySrc(result.src);
            }), (/**
             * @return {?}
             */
            function () {
            }));
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
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.showPanel();
            }), 0);
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
        return fetch("https://api.microlink.io/?url=" + url).then((/**
         * @param {?} page
         * @return {?}
         */
        function (page) {
            return page.json().then((/**
             * @param {?} pageMetadata
             * @return {?}
             */
            function (pageMetadata) {
                var _a = pageMetadata.data, image = _a.image, description = _a.description, logo = _a.logo, title = _a.title, author = _a.author;
                return {
                    image: image,
                    description: description,
                    logo: logo,
                    title: title,
                    author: author
                };
            }));
        }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLWJvb2ttYXJrLWJyaWNrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL2JyaWNrcy93ZWItYm9va21hcmstYnJpY2svY29tcG9uZW50L3dlYi1ib29rbWFyay1icmljay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsd0JBQXdCLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ25ILE9BQU8sRUFBQyxrQkFBa0IsRUFBRSxzQkFBc0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRTVFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBRS9FO0lBOEJJLG1DQUFvQixFQUFjLEVBQ2Qsd0JBQWtELEVBQ2xELHFCQUF5QztRQUZ6QyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ2QsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCwwQkFBcUIsR0FBckIscUJBQXFCLENBQW9CO1FBdkJuRCxpQkFBWSxHQUF5QyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxGLFVBQUssR0FBMkI7WUFDNUIsR0FBRyxFQUFFLElBQUk7WUFDVCxXQUFXLEVBQUUsSUFBSTtZQUNqQixLQUFLLEVBQUU7Z0JBQ0gsTUFBTSxFQUFFLElBQUk7Z0JBQ1osS0FBSyxFQUFFLElBQUk7Z0JBQ1gsR0FBRyxFQUFFLElBQUk7YUFDWjtZQUNELElBQUksRUFBRTtnQkFDRixNQUFNLEVBQUUsSUFBSTtnQkFDWixLQUFLLEVBQUUsSUFBSTtnQkFDWCxHQUFHLEVBQUUsSUFBSTthQUNaO1lBQ0QsS0FBSyxFQUFFLElBQUk7WUFDWCxNQUFNLEVBQUUsSUFBSTtTQUNmLENBQUM7UUFFRixZQUFPLEdBQUcsS0FBSyxDQUFDO0lBS2hCLENBQUM7Ozs7SUFFRCw0Q0FBUTs7O0lBQVI7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LFlBQVk7Z0JBQzNCLElBQUEsc0JBTWUsRUFMakIsZ0JBQUssRUFDTCw0QkFBVyxFQUNYLGNBQUksRUFDSixnQkFBSyxFQUNMLGtCQUNpQjtnQkFFckIsT0FBTztvQkFDSCxLQUFLLE9BQUE7b0JBQ0wsV0FBVyxhQUFBO29CQUNYLElBQUksTUFBQTtvQkFDSixLQUFLLE9BQUE7b0JBQ0wsTUFBTSxRQUFBO2lCQUNULENBQUM7WUFDTixDQUFDLEVBQUMsQ0FBQztRQUNQLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7O0lBRU8sOENBQVU7Ozs7O0lBQWxCLFVBQW1CLEdBQVc7O1lBQ3RCLEdBQUc7UUFFUCxJQUFJO1lBQ0EsR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3RCO1FBQUMsT0FBTyxDQUFDLEVBQUU7U0FDWDtRQUVELE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7O2dCQXRJSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsbTBCQUFrRDs7aUJBRXJEOzs7O2dCQVQ0QyxVQUFVO2dCQUFwQyx3QkFBd0I7Z0JBQ25DLGtCQUFrQjs7O3FCQVVyQixLQUFLO3dCQUNMLEtBQUs7K0JBRUwsTUFBTTs7SUE4SFgsZ0NBQUM7Q0FBQSxBQXZJRCxJQXVJQztTQWxJWSx5QkFBeUI7OztJQUNsQyx1Q0FBb0I7O0lBQ3BCLDBDQUF1Qzs7SUFFdkMsaURBQWtGOztJQUVsRiwwQ0FlRTs7SUFFRiw0Q0FBZ0I7Ozs7O0lBRUosdUNBQXNCOzs7OztJQUN0Qiw2REFBMEQ7Ozs7O0lBQzFELDBEQUFpRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3RpY2t5TW9kYWxTZXJ2aWNlLCBTdGlja3lQb3NpdGlvblN0cmF0ZWd5fSBmcm9tICduZ3gtc3RpY2t5LW1vZGFsJztcbmltcG9ydCB7SVdlYkJvb2ttYXJrQnJpY2tTdGF0ZX0gZnJvbSAnLi4vd2ViLWJvb2ttYXJrLWJyaWNrLXN0YXRlLmludGVyZmFjZSc7XG5pbXBvcnQge0lucHV0Q29udGV4dENvbXBvbmVudH0gZnJvbSAnLi4vaW5wdXQtY29udGV4dC9pbnB1dC1jb250ZXh0LmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnd2ViLWJvb2ttYXJrLWJyaWNrJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vd2ViLWJvb2ttYXJrLWJyaWNrLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi93ZWItYm9va21hcmstYnJpY2suY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBXZWJCb29rbWFya0JyaWNrQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSBpZDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHN0YXRlOiBJV2ViQm9va21hcmtCcmlja1N0YXRlO1xuXG4gICAgQE91dHB1dCgpIHN0YXRlQ2hhbmdlczogRXZlbnRFbWl0dGVyPElXZWJCb29rbWFya0JyaWNrU3RhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgc2NvcGU6IElXZWJCb29rbWFya0JyaWNrU3RhdGUgPSB7XG4gICAgICAgIHNyYzogbnVsbCxcbiAgICAgICAgZGVzY3JpcHRpb246IG51bGwsXG4gICAgICAgIGltYWdlOiB7XG4gICAgICAgICAgICBoZWlnaHQ6IG51bGwsXG4gICAgICAgICAgICB3aWR0aDogbnVsbCxcbiAgICAgICAgICAgIHVybDogbnVsbFxuICAgICAgICB9LFxuICAgICAgICBsb2dvOiB7XG4gICAgICAgICAgICBoZWlnaHQ6IG51bGwsXG4gICAgICAgICAgICB3aWR0aDogbnVsbCxcbiAgICAgICAgICAgIHVybDogbnVsbFxuICAgICAgICB9LFxuICAgICAgICB0aXRsZTogbnVsbCxcbiAgICAgICAgYXV0aG9yOiBudWxsXG4gICAgfTtcblxuICAgIGxvYWRpbmcgPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgICAgICAgICBwcml2YXRlIG5neFN0aWNreU1vZGFsU2VydmljZTogU3RpY2t5TW9kYWxTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5zY29wZSwgdGhpcy5zdGF0ZSk7XG4gICAgfVxuXG4gICAgb25XYWxsU3RhdGVDaGFuZ2UobmV3U3RhdGU6IElXZWJCb29rbWFya0JyaWNrU3RhdGUpIHtcbiAgICAgICAgaWYgKG5ld1N0YXRlICYmIG5ld1N0YXRlLnNyYyAhPT0gdGhpcy5zY29wZS5zcmMpIHtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5zY29wZSwgdGhpcy5zdGF0ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhcHBseVNyYyhzcmM6IHN0cmluZykge1xuICAgICAgICBpZiAoc3JjLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNWYWxpZFVybChzcmMpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0V2ViUGFnZU1ldGFJbmZvKHNyYykudGhlbigod2ViUGFnZU1ldGFJbmZvKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5zY29wZSwgd2ViUGFnZU1ldGFJbmZvKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjb3BlLnNyYyA9IHNyYztcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdmUoKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbGVydCgnVXJsIGlzIGludmFsaWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3dQYW5lbCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmxvYWRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMubmd4U3RpY2t5TW9kYWxTZXJ2aWNlLm9wZW4oe1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudDogSW5wdXRDb250ZXh0Q29tcG9uZW50LFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uU3RyYXRlZ3k6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogU3RpY2t5UG9zaXRpb25TdHJhdGVneS5mbGV4aWJsZUNvbm5lY3RlZCxcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVsYXRpdmVUbzogdGhpcy5lbC5uYXRpdmVFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5ZOiAnYm90dG9tJyxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVg6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5WTogJ3RvcCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXJcbiAgICAgICAgICAgIH0pLnJlc3VsdC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGx5U3JjKHJlc3VsdC5zcmMpO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbldhbGxGb2N1cygpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLnNjb3BlLnNyYykge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UGFuZWwoKTtcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzYXZlKCkge1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5lbWl0KHRoaXMuc2NvcGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0V2ViUGFnZU1ldGFJbmZvKHVybDogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwczovL2FwaS5taWNyb2xpbmsuaW8vP3VybD0ke3VybH1gKS50aGVuKChwYWdlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcGFnZS5qc29uKCkudGhlbigocGFnZU1ldGFkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgICAgICBpbWFnZSxcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgIGxvZ28sXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgICAgICAgICAgICBhdXRob3JcbiAgICAgICAgICAgICAgICB9ID0gcGFnZU1ldGFkYXRhLmRhdGE7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBpbWFnZSxcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgIGxvZ28sXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgICAgICAgICAgICBhdXRob3JcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNWYWxpZFVybChzcmM6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgdXJsO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB1cmwgPSBuZXcgVVJMKHNyYyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBCb29sZWFuKHVybCk7XG4gICAgfVxufVxuIl19