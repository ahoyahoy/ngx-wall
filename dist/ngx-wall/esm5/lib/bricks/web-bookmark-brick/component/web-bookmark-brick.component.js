/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ComponentFactoryResolver, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { StickyModalService } from 'ngx-sticky-modal';
import { InputContextComponent } from '../input-context/input-context.component';
import { getModalConfig } from '../../base-brick/base-brick.component';
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
            /** @type {?} */
            var modalConfig = getModalConfig(this.el, this.componentFactoryResolver, InputContextComponent);
            this.modalRef = this.ngxStickyModalService.open(modalConfig);
            this.modalRef.result.then((/**
             * @param {?} result
             * @return {?}
             */
            function (result) {
                _this.modalRef = null;
                _this.applySrc(result.src);
            }), (/**
             * @return {?}
             */
            function () {
                _this.modalRef = null;
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
    /** @type {?} */
    WebBookmarkBrickComponent.prototype.modalRef;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLWJvb2ttYXJrLWJyaWNrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL2JyaWNrcy93ZWItYm9va21hcmstYnJpY2svY29tcG9uZW50L3dlYi1ib29rbWFyay1icmljay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsd0JBQXdCLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ25ILE9BQU8sRUFBaUIsa0JBQWtCLEVBQXlCLE1BQU0sa0JBQWtCLENBQUM7QUFFNUYsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sMENBQTBDLENBQUM7QUFDL0UsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHVDQUF1QyxDQUFDO0FBR3JFO0lBK0JJLG1DQUFvQixFQUFjLEVBQ2Qsd0JBQWtELEVBQ2xELHFCQUF5QztRQUZ6QyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ2QsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCwwQkFBcUIsR0FBckIscUJBQXFCLENBQW9CO1FBeEJuRCxpQkFBWSxHQUF5QyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxGLFVBQUssR0FBMkI7WUFDNUIsR0FBRyxFQUFFLElBQUk7WUFDVCxXQUFXLEVBQUUsSUFBSTtZQUNqQixLQUFLLEVBQUU7Z0JBQ0gsTUFBTSxFQUFFLElBQUk7Z0JBQ1osS0FBSyxFQUFFLElBQUk7Z0JBQ1gsR0FBRyxFQUFFLElBQUk7YUFDWjtZQUNELElBQUksRUFBRTtnQkFDRixNQUFNLEVBQUUsSUFBSTtnQkFDWixLQUFLLEVBQUUsSUFBSTtnQkFDWCxHQUFHLEVBQUUsSUFBSTthQUNaO1lBQ0QsS0FBSyxFQUFFLElBQUk7WUFDWCxNQUFNLEVBQUUsSUFBSTtTQUNmLENBQUM7UUFFRixZQUFPLEdBQUcsS0FBSyxDQUFD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Z0JBQUssRUFDTCxrQkFDaUI7Z0JBRXJCLE9BQU87b0JBQ0gsS0FBSyxPQUFBO29CQUNMLFdBQVcsYUFBQTtvQkFDWCxJQUFJLE1BQUE7b0JBQ0osS0FBSyxPQUFBO29CQUNMLE1BQU0sUUFBQTtpQkFDVCxDQUFDO1lBQ04sQ0FBQyxFQUFDLENBQUM7UUFDUCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7OztJQUVPLDhDQUFVOzs7OztJQUFsQixVQUFtQixHQUFXOztZQUN0QixHQUFHO1FBRVAsSUFBSTtZQUNBLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN0QjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1NBQ1g7UUFFRCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN4QixDQUFDOztnQkE1SEosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLG0wQkFBa0Q7O2lCQUVyRDs7OztnQkFYNEMsVUFBVTtnQkFBcEMsd0JBQXdCO2dCQUNuQixrQkFBa0I7OztxQkFZckMsS0FBSzt3QkFDTCxLQUFLOytCQUVMLE1BQU07O0lBb0hYLGdDQUFDO0NBQUEsQUE3SEQsSUE2SEM7U0F4SFkseUJBQXlCOzs7SUFDbEMsdUNBQW9COztJQUNwQiwwQ0FBdUM7O0lBRXZDLGlEQUFrRjs7SUFFbEYsMENBZUU7O0lBRUYsNENBQWdCOztJQUNoQiw2Q0FBeUI7Ozs7O0lBRWIsdUNBQXNCOzs7OztJQUN0Qiw2REFBMEQ7Ozs7O0lBQzFELDBEQUFpRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3RpY2t5TW9kYWxSZWYsIFN0aWNreU1vZGFsU2VydmljZSwgU3RpY2t5UG9zaXRpb25TdHJhdGVneX0gZnJvbSAnbmd4LXN0aWNreS1tb2RhbCc7XG5pbXBvcnQge0lXZWJCb29rbWFya0JyaWNrU3RhdGV9IGZyb20gJy4uL3dlYi1ib29rbWFyay1icmljay1zdGF0ZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHtJbnB1dENvbnRleHRDb21wb25lbnR9IGZyb20gJy4uL2lucHV0LWNvbnRleHQvaW5wdXQtY29udGV4dC5jb21wb25lbnQnO1xuaW1wb3J0IHtnZXRNb2RhbENvbmZpZ30gZnJvbSAnLi4vLi4vYmFzZS1icmljay9iYXNlLWJyaWNrLmNvbXBvbmVudCc7XG5pbXBvcnQge0JyaWNrc0xpc3RDb21wb25lbnR9IGZyb20gJy4uLy4uL3RleHQtYnJpY2svYnJpY2tzLWxpc3QvYnJpY2tzLWxpc3QuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd3ZWItYm9va21hcmstYnJpY2snLFxuICAgIHRlbXBsYXRlVXJsOiAnLi93ZWItYm9va21hcmstYnJpY2suY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3dlYi1ib29rbWFyay1icmljay5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFdlYkJvb2ttYXJrQnJpY2tDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG4gICAgQElucHV0KCkgc3RhdGU6IElXZWJCb29rbWFya0JyaWNrU3RhdGU7XG5cbiAgICBAT3V0cHV0KCkgc3RhdGVDaGFuZ2VzOiBFdmVudEVtaXR0ZXI8SVdlYkJvb2ttYXJrQnJpY2tTdGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBzY29wZTogSVdlYkJvb2ttYXJrQnJpY2tTdGF0ZSA9IHtcbiAgICAgICAgc3JjOiBudWxsLFxuICAgICAgICBkZXNjcmlwdGlvbjogbnVsbCxcbiAgICAgICAgaW1hZ2U6IHtcbiAgICAgICAgICAgIGhlaWdodDogbnVsbCxcbiAgICAgICAgICAgIHdpZHRoOiBudWxsLFxuICAgICAgICAgICAgdXJsOiBudWxsXG4gICAgICAgIH0sXG4gICAgICAgIGxvZ286IHtcbiAgICAgICAgICAgIGhlaWdodDogbnVsbCxcbiAgICAgICAgICAgIHdpZHRoOiBudWxsLFxuICAgICAgICAgICAgdXJsOiBudWxsXG4gICAgICAgIH0sXG4gICAgICAgIHRpdGxlOiBudWxsLFxuICAgICAgICBhdXRob3I6IG51bGxcbiAgICB9O1xuXG4gICAgbG9hZGluZyA9IGZhbHNlO1xuICAgIG1vZGFsUmVmOiBTdGlja3lNb2RhbFJlZjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgICAgICAgICBwcml2YXRlIG5neFN0aWNreU1vZGFsU2VydmljZTogU3RpY2t5TW9kYWxTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5zY29wZSwgdGhpcy5zdGF0ZSk7XG4gICAgfVxuXG4gICAgb25XYWxsU3RhdGVDaGFuZ2UobmV3U3RhdGU6IElXZWJCb29rbWFya0JyaWNrU3RhdGUpIHtcbiAgICAgICAgaWYgKG5ld1N0YXRlICYmIG5ld1N0YXRlLnNyYyAhPT0gdGhpcy5zY29wZS5zcmMpIHtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5zY29wZSwgdGhpcy5zdGF0ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhcHBseVNyYyhzcmM6IHN0cmluZykge1xuICAgICAgICBpZiAoc3JjLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNWYWxpZFVybChzcmMpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0V2ViUGFnZU1ldGFJbmZvKHNyYykudGhlbigod2ViUGFnZU1ldGFJbmZvKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5zY29wZSwgd2ViUGFnZU1ldGFJbmZvKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjb3BlLnNyYyA9IHNyYztcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdmUoKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbGVydCgnVXJsIGlzIGludmFsaWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3dQYW5lbCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmxvYWRpbmcpIHtcbiAgICAgICAgICAgIGNvbnN0IG1vZGFsQ29uZmlnID0gZ2V0TW9kYWxDb25maWcodGhpcy5lbCwgdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIElucHV0Q29udGV4dENvbXBvbmVudCk7XG4gICAgICAgICAgICB0aGlzLm1vZGFsUmVmID0gdGhpcy5uZ3hTdGlja3lNb2RhbFNlcnZpY2Uub3Blbihtb2RhbENvbmZpZyk7XG4gICAgICAgICAgICB0aGlzLm1vZGFsUmVmLnJlc3VsdC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb2RhbFJlZiA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseVNyYyhyZXN1bHQuc3JjKTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGFsUmVmID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25XYWxsRm9jdXMoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5zY29wZS5zcmMpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1BhbmVsKCk7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2F2ZSgpIHtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMuZW1pdCh0aGlzLnNjb3BlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFdlYlBhZ2VNZXRhSW5mbyh1cmw6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cHM6Ly9hcGkubWljcm9saW5rLmlvLz91cmw9JHt1cmx9YCkudGhlbigocGFnZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHBhZ2UuanNvbigpLnRoZW4oKHBhZ2VNZXRhZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2UsXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICBsb2dvLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgYXV0aG9yXG4gICAgICAgICAgICAgICAgfSA9IHBhZ2VNZXRhZGF0YS5kYXRhO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2UsXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICBsb2dvLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgYXV0aG9yXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzVmFsaWRVcmwoc3JjOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IHVybDtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdXJsID0gbmV3IFVSTChzcmMpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gQm9vbGVhbih1cmwpO1xuICAgIH1cbn1cbiJdfQ==