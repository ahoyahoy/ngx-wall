/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ComponentFactoryResolver, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { StickyModalService } from 'ngx-sticky-modal';
import { InputContextComponent } from '../input-context/input-context.component';
import { getModalConfig } from '../../base-brick/base-brick.component';
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
            /** @type {?} */
            const modalConfig = getModalConfig(this.el, this.componentFactoryResolver, InputContextComponent);
            this.modalRef = this.ngxStickyModalService.open(modalConfig);
            this.modalRef.result.then((/**
             * @param {?} result
             * @return {?}
             */
            result => {
                this.modalRef = null;
                this.applySrc(result.src);
            }), (/**
             * @return {?}
             */
            () => {
                this.modalRef = null;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLWJvb2ttYXJrLWJyaWNrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL2JyaWNrcy93ZWItYm9va21hcmstYnJpY2svY29tcG9uZW50L3dlYi1ib29rbWFyay1icmljay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsd0JBQXdCLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ25ILE9BQU8sRUFBaUIsa0JBQWtCLEVBQXlCLE1BQU0sa0JBQWtCLENBQUM7QUFFNUYsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sMENBQTBDLENBQUM7QUFDL0UsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHVDQUF1QyxDQUFDO0FBUXJFLE1BQU0sT0FBTyx5QkFBeUI7Ozs7OztJQTBCbEMsWUFBb0IsRUFBYyxFQUNkLHdCQUFrRCxFQUNsRCxxQkFBeUM7UUFGekMsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUNkLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbEQsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUFvQjtRQXhCbkQsaUJBQVksR0FBeUMsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVsRixVQUFLLEdBQTJCO1lBQzVCLEdBQUcsRUFBRSxJQUFJO1lBQ1QsV0FBVyxFQUFFLElBQUk7WUFDakIsS0FBSyxFQUFFO2dCQUNILE1BQU0sRUFBRSxJQUFJO2dCQUNaLEtBQUssRUFBRSxJQUFJO2dCQUNYLEdBQUcsRUFBRSxJQUFJO2FBQ1o7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsTUFBTSxFQUFFLElBQUk7Z0JBQ1osS0FBSyxFQUFFLElBQUk7Z0JBQ1gsR0FBRyxFQUFFLElBQUk7YUFDWjtZQUNELEtBQUssRUFBRSxJQUFJO1lBQ1gsTUFBTSxFQUFFLElBQUk7U0FDZixDQUFDO1FB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R0FBRyxZQUFZLENBQUMsSUFBSTtnQkFFckIsT0FBTztvQkFDSCxLQUFLO29CQUNMLFdBQVc7b0JBQ1gsSUFBSTtvQkFDSixLQUFLO29CQUNMLE1BQU07aUJBQ1QsQ0FBQztZQUNOLENBQUMsRUFBQyxDQUFDO1FBQ1AsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7Ozs7SUFFTyxVQUFVLENBQUMsR0FBVzs7WUFDdEIsR0FBRztRQUVQLElBQUk7WUFDQSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdEI7UUFBQyxPQUFPLENBQUMsRUFBRTtTQUNYO1FBRUQsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDeEIsQ0FBQzs7O1lBNUhKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixtMEJBQWtEOzthQUVyRDs7OztZQVg0QyxVQUFVO1lBQXBDLHdCQUF3QjtZQUNuQixrQkFBa0I7OztpQkFZckMsS0FBSztvQkFDTCxLQUFLOzJCQUVMLE1BQU07Ozs7SUFIUCx1Q0FBb0I7O0lBQ3BCLDBDQUF1Qzs7SUFFdkMsaURBQWtGOztJQUVsRiwwQ0FlRTs7SUFFRiw0Q0FBZ0I7O0lBQ2hCLDZDQUF5Qjs7Ozs7SUFFYix1Q0FBc0I7Ozs7O0lBQ3RCLDZEQUEwRDs7Ozs7SUFDMUQsMERBQWlEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdGlja3lNb2RhbFJlZiwgU3RpY2t5TW9kYWxTZXJ2aWNlLCBTdGlja3lQb3NpdGlvblN0cmF0ZWd5fSBmcm9tICduZ3gtc3RpY2t5LW1vZGFsJztcbmltcG9ydCB7SVdlYkJvb2ttYXJrQnJpY2tTdGF0ZX0gZnJvbSAnLi4vd2ViLWJvb2ttYXJrLWJyaWNrLXN0YXRlLmludGVyZmFjZSc7XG5pbXBvcnQge0lucHV0Q29udGV4dENvbXBvbmVudH0gZnJvbSAnLi4vaW5wdXQtY29udGV4dC9pbnB1dC1jb250ZXh0LmNvbXBvbmVudCc7XG5pbXBvcnQge2dldE1vZGFsQ29uZmlnfSBmcm9tICcuLi8uLi9iYXNlLWJyaWNrL2Jhc2UtYnJpY2suY29tcG9uZW50JztcbmltcG9ydCB7QnJpY2tzTGlzdENvbXBvbmVudH0gZnJvbSAnLi4vLi4vdGV4dC1icmljay9icmlja3MtbGlzdC9icmlja3MtbGlzdC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3dlYi1ib29rbWFyay1icmljaycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3dlYi1ib29rbWFyay1icmljay5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vd2ViLWJvb2ttYXJrLWJyaWNrLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgV2ViQm9va21hcmtCcmlja0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KCkgaWQ6IHN0cmluZztcbiAgICBASW5wdXQoKSBzdGF0ZTogSVdlYkJvb2ttYXJrQnJpY2tTdGF0ZTtcblxuICAgIEBPdXRwdXQoKSBzdGF0ZUNoYW5nZXM6IEV2ZW50RW1pdHRlcjxJV2ViQm9va21hcmtCcmlja1N0YXRlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHNjb3BlOiBJV2ViQm9va21hcmtCcmlja1N0YXRlID0ge1xuICAgICAgICBzcmM6IG51bGwsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBudWxsLFxuICAgICAgICBpbWFnZToge1xuICAgICAgICAgICAgaGVpZ2h0OiBudWxsLFxuICAgICAgICAgICAgd2lkdGg6IG51bGwsXG4gICAgICAgICAgICB1cmw6IG51bGxcbiAgICAgICAgfSxcbiAgICAgICAgbG9nbzoge1xuICAgICAgICAgICAgaGVpZ2h0OiBudWxsLFxuICAgICAgICAgICAgd2lkdGg6IG51bGwsXG4gICAgICAgICAgICB1cmw6IG51bGxcbiAgICAgICAgfSxcbiAgICAgICAgdGl0bGU6IG51bGwsXG4gICAgICAgIGF1dGhvcjogbnVsbFxuICAgIH07XG5cbiAgICBsb2FkaW5nID0gZmFsc2U7XG4gICAgbW9kYWxSZWY6IFN0aWNreU1vZGFsUmVmO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgICBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgbmd4U3RpY2t5TW9kYWxTZXJ2aWNlOiBTdGlja3lNb2RhbFNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLnNjb3BlLCB0aGlzLnN0YXRlKTtcbiAgICB9XG5cbiAgICBvbldhbGxTdGF0ZUNoYW5nZShuZXdTdGF0ZTogSVdlYkJvb2ttYXJrQnJpY2tTdGF0ZSkge1xuICAgICAgICBpZiAobmV3U3RhdGUgJiYgbmV3U3RhdGUuc3JjICE9PSB0aGlzLnNjb3BlLnNyYykge1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLnNjb3BlLCB0aGlzLnN0YXRlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcGx5U3JjKHNyYzogc3RyaW5nKSB7XG4gICAgICAgIGlmIChzcmMubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkVXJsKHNyYykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRXZWJQYWdlTWV0YUluZm8oc3JjKS50aGVuKCh3ZWJQYWdlTWV0YUluZm8pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLnNjb3BlLCB3ZWJQYWdlTWV0YUluZm8pO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NvcGUuc3JjID0gc3JjO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2F2ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdVcmwgaXMgaW52YWxpZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvd1BhbmVsKCkge1xuICAgICAgICBpZiAoIXRoaXMubG9hZGluZykge1xuICAgICAgICAgICAgY29uc3QgbW9kYWxDb25maWcgPSBnZXRNb2RhbENvbmZpZyh0aGlzLmVsLCB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgSW5wdXRDb250ZXh0Q29tcG9uZW50KTtcbiAgICAgICAgICAgIHRoaXMubW9kYWxSZWYgPSB0aGlzLm5neFN0aWNreU1vZGFsU2VydmljZS5vcGVuKG1vZGFsQ29uZmlnKTtcbiAgICAgICAgICAgIHRoaXMubW9kYWxSZWYucmVzdWx0LnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGFsUmVmID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGx5U3JjKHJlc3VsdC5zcmMpO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubW9kYWxSZWYgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbldhbGxGb2N1cygpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLnNjb3BlLnNyYykge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UGFuZWwoKTtcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzYXZlKCkge1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5lbWl0KHRoaXMuc2NvcGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0V2ViUGFnZU1ldGFJbmZvKHVybDogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwczovL2FwaS5taWNyb2xpbmsuaW8vP3VybD0ke3VybH1gKS50aGVuKChwYWdlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcGFnZS5qc29uKCkudGhlbigocGFnZU1ldGFkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgICAgICBpbWFnZSxcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgIGxvZ28sXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgICAgICAgICAgICBhdXRob3JcbiAgICAgICAgICAgICAgICB9ID0gcGFnZU1ldGFkYXRhLmRhdGE7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBpbWFnZSxcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgIGxvZ28sXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgICAgICAgICAgICBhdXRob3JcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNWYWxpZFVybChzcmM6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgdXJsO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB1cmwgPSBuZXcgVVJMKHNyYyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBCb29sZWFuKHVybCk7XG4gICAgfVxufVxuIl19