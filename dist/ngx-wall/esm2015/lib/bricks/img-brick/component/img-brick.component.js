/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ComponentFactoryResolver, ElementRef, EventEmitter, Inject, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { StickyModalService, StickyPositionStrategy } from 'ngx-sticky-modal';
import { WALL_FILE_UPLOADER } from '../../../modules/file-uploader/file-uploader.token';
import { Base64ToFile } from '../../../modules/utils/base64-to-file';
import { Guid } from '../../../modules/utils/guid';
import { ImgEncoder } from '../../../modules/utils/img-encoder.service';
import { InputContextComponent } from '../input-context/input-context.component';
export class ImgBrickComponent {
    /**
     * @param {?} renderer
     * @param {?} componentFactoryResolver
     * @param {?} ngxStickyModalService
     * @param {?} wallFileUploader
     * @param {?} el
     */
    constructor(renderer, componentFactoryResolver, ngxStickyModalService, wallFileUploader, el) {
        this.renderer = renderer;
        this.componentFactoryResolver = componentFactoryResolver;
        this.ngxStickyModalService = ngxStickyModalService;
        this.wallFileUploader = wallFileUploader;
        this.el = el;
        this.stateChanges = new EventEmitter();
        this.scope = {
            src: '',
            metadata: null,
            width: null
        };
        this.isSrcBase64 = false;
        this.resizable = {
            resize: this.onResize.bind(this),
            resizeStart: this.onResizeStart.bind(this),
            resizeEnd: this.onResizeEnd.bind(this)
        };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        Object.assign(this.scope, this.state);
        this.processNewState();
    }
    /**
     * @param {?} newState
     * @return {?}
     */
    onWallStateChange(newState) {
        if (newState && newState.src !== this.scope.src) {
            Object.assign(this.scope, this.state);
            this.processNewState();
        }
    }
    /**
     * @return {?}
     */
    processNewState() {
        if (this.scope.src) {
            this.isSrcBase64 = this.isBase64(this.scope.src);
            if (!this.scope.width) {
                this.setUpImageWidth();
            }
            if (this.isSrcBase64) {
                this.processBase64ImgSrc();
            }
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
    // resize callbacks
    /**
     * @param {?} resizeData
     * @return {?}
     */
    onResize(resizeData) {
        this.scope.width = this.lastWidth + resizeData.offset;
    }
    /**
     * @return {?}
     */
    onResizeStart() {
        this.lastWidth = this.scope.width;
    }
    /**
     * @return {?}
     */
    onResizeEnd() {
        this.save();
    }
    /**
     * @param {?} imageSrc
     * @param {?=} metadata
     * @return {?}
     */
    applyImageSrc(imageSrc, metadata) {
        return this.isImage(imageSrc)
            .then((/**
         * @return {?}
         */
        () => {
            this.scope.src = imageSrc;
            this.isSrcBase64 = false;
            if (metadata) {
                this.scope.metadata = metadata;
            }
            this.save();
            return this.setUpImageWidth();
        }))
            .catch((/**
         * @return {?}
         */
        () => {
            alert('Please enter valid url');
        }));
    }
    /**
     * @param {?} imgFile
     * @return {?}
     */
    applyImageFile(imgFile) {
        return (new ImgEncoder(imgFile)).getBase64Representation().then((/**
         * @param {?} imgBase64
         * @return {?}
         */
        (imgBase64) => {
            return this.applyImageSrc(imgBase64).then((/**
             * @return {?}
             */
            () => {
                return this.processBase64ImgSrc();
            }));
        }));
    }
    /**
     * @return {?}
     */
    processBase64ImgSrc() {
        return this.uploadImage().then((/**
         * @param {?} uploadInfo
         * @return {?}
         */
        (uploadInfo) => {
            return this.applyImageSrc(uploadInfo.downloadURL, {
                path: uploadInfo.path
            });
        }), (/**
         * @return {?}
         */
        () => {
        }));
    }
    /**
     * @return {?}
     */
    showPanel() {
        if (!this.imageSrcPlaceholderRef) {
            this.imageSrcPlaceholderRef = this.ngxStickyModalService.open({
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
            this.imageSrcPlaceholderRef.result.then((/**
             * @param {?} result
             * @return {?}
             */
            (result) => {
                this.imageSrcPlaceholderRef = null;
                if (result.src) {
                    this.applyImageSrc(result.src);
                }
                else {
                    this.applyImageFile(result.file);
                }
            }), (/**
             * @return {?}
             */
            () => {
                this.imageSrcPlaceholderRef = null;
            }));
        }
    }
    /**
     * @param {?} str
     * @return {?}
     */
    isBase64(str) {
        str = str.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
        try {
            return btoa(atob(str)) === str;
        }
        catch (err) {
            return false;
        }
    }
    /**
     * @private
     * @return {?}
     */
    uploadImage() {
        if (!this.wallFileUploader.canUploadFile()) {
            return Promise.reject();
        }
        /** @type {?} */
        const fileName = (new Guid()).get();
        /** @type {?} */
        const imgFile = (new Base64ToFile(this.scope.src, fileName)).getFile();
        return this.wallFileUploader.upload(this.id, imgFile);
    }
    /**
     * @private
     * @return {?}
     */
    setUpImageWidth() {
        return this.loadImage(this.scope.src).then((/**
         * @return {?}
         */
        () => {
            this.scope.width = this.image.nativeElement.width;
            this.save();
        }));
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
     * @param {?} src
     * @return {?}
     */
    loadImage(src) {
        return this.isImage(src);
    }
    /**
     * @private
     * @param {?} src
     * @return {?}
     */
    isImage(src) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            /** @type {?} */
            const img = new Image();
            img.onload = (/**
             * @return {?}
             */
            () => {
                resolve();
            });
            img.onerror = (/**
             * @return {?}
             */
            () => {
                reject();
            });
            img.src = src;
        }));
    }
}
ImgBrickComponent.decorators = [
    { type: Component, args: [{
                selector: 'img-brick',
                template: "<div class=\"container\" [style.width]=\"scope.width ? scope.width+'px' : 'auto'\">\n    <img [tow-slave]=\"id\" #image *ngIf=\"scope.src\" [wResizable]=\"resizable\" [src]=\"scope.src\">\n\n    <a mat-button *ngIf=\"!isSrcBase64 && scope.src\" [href]=\"scope.src\" target=\"_blank\" class=\"original-btn\">\n        Show original\n    </a>\n</div>\n\n<w-brick-input-placeholder\n    *ngIf=\"!scope.src\"\n    [text]=\"'Add an Image'\"\n    [icon]=\"'image'\" (selected)=\"showPanel()\">\n</w-brick-input-placeholder>\n",
                styles: [":host{position:relative;display:block}:host:hover .original-btn{display:block}.original-btn{position:absolute;top:15px;right:15px;display:none}.container{margin:0 auto;position:relative;max-width:100%}.container .left-handler,.container .right-handler{position:absolute;display:block;width:40px;height:100%;top:0;cursor:col-resize}.container .left-handler{left:0}.container .right-handler{right:0}.container img{-o-object-fit:cover;object-fit:cover;width:100%;height:100%;margin:0 auto;display:block;cursor:pointer}"]
            }] }
];
/** @nocollapse */
ImgBrickComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: ComponentFactoryResolver },
    { type: StickyModalService },
    { type: undefined, decorators: [{ type: Inject, args: [WALL_FILE_UPLOADER,] }] },
    { type: ElementRef }
];
ImgBrickComponent.propDecorators = {
    id: [{ type: Input }],
    state: [{ type: Input }],
    stateChanges: [{ type: Output }],
    image: [{ type: ViewChild, args: ['image',] }]
};
if (false) {
    /** @type {?} */
    ImgBrickComponent.prototype.id;
    /** @type {?} */
    ImgBrickComponent.prototype.state;
    /** @type {?} */
    ImgBrickComponent.prototype.stateChanges;
    /** @type {?} */
    ImgBrickComponent.prototype.image;
    /** @type {?} */
    ImgBrickComponent.prototype.scope;
    /** @type {?} */
    ImgBrickComponent.prototype.isSrcBase64;
    /** @type {?} */
    ImgBrickComponent.prototype.lastWidth;
    /** @type {?} */
    ImgBrickComponent.prototype.imageSrcPlaceholderRef;
    /** @type {?} */
    ImgBrickComponent.prototype.resizable;
    /**
     * @type {?}
     * @private
     */
    ImgBrickComponent.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    ImgBrickComponent.prototype.componentFactoryResolver;
    /**
     * @type {?}
     * @private
     */
    ImgBrickComponent.prototype.ngxStickyModalService;
    /**
     * @type {?}
     * @private
     */
    ImgBrickComponent.prototype.wallFileUploader;
    /**
     * @type {?}
     * @private
     */
    ImgBrickComponent.prototype.el;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1nLWJyaWNrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL2JyaWNrcy9pbWctYnJpY2svY29tcG9uZW50L2ltZy1icmljay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1Qsd0JBQXdCLEVBQ3hCLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFFTCxNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWlCLGtCQUFrQixFQUFFLHNCQUFzQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDNUYsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sb0RBQW9ELENBQUM7QUFHdEYsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHVDQUF1QyxDQUFDO0FBQ25FLE9BQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFFdEUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sMENBQTBDLENBQUM7QUFRL0UsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7Ozs7SUEwQjFCLFlBQW9CLFFBQW1CLEVBQ25CLHdCQUFrRCxFQUNsRCxxQkFBeUMsRUFDYixnQkFBbUMsRUFDL0QsRUFBYztRQUpkLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCwwQkFBcUIsR0FBckIscUJBQXFCLENBQW9CO1FBQ2IscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFtQjtRQUMvRCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBMUJ4QixpQkFBWSxHQUFnQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBSXpFLFVBQUssR0FBa0I7WUFDbkIsR0FBRyxFQUFFLEVBQUU7WUFDUCxRQUFR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QjtZQXREdEMsVUFBVTs7O2lCQTBCVCxLQUFLO29CQUNMLEtBQUs7MkJBRUwsTUFBTTtvQkFFTixTQUFTLFNBQUMsT0FBTzs7OztJQUxsQiwrQkFBb0I7O0lBQ3BCLGtDQUE4Qjs7SUFFOUIseUNBQXlFOztJQUV6RSxrQ0FBc0M7O0lBRXRDLGtDQUlFOztJQUVGLHdDQUFvQjs7SUFFcEIsc0NBQWtCOztJQUVsQixtREFBdUM7O0lBRXZDLHNDQUlFOzs7OztJQUVVLHFDQUEyQjs7Ozs7SUFDM0IscURBQTBEOzs7OztJQUMxRCxrREFBaUQ7Ozs7O0lBQ2pELDZDQUF1RTs7Ozs7SUFDdkUsK0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFJlbmRlcmVyMixcbiAgICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N0aWNreU1vZGFsUmVmLCBTdGlja3lNb2RhbFNlcnZpY2UsIFN0aWNreVBvc2l0aW9uU3RyYXRlZ3l9IGZyb20gJ25neC1zdGlja3ktbW9kYWwnO1xuaW1wb3J0IHtXQUxMX0ZJTEVfVVBMT0FERVJ9IGZyb20gJy4uLy4uLy4uL21vZHVsZXMvZmlsZS11cGxvYWRlci9maWxlLXVwbG9hZGVyLnRva2VuJztcbmltcG9ydCB7SVdhbGxGaWxlVXBsb2FkZXIsIElXYWxsRmlsZVVwbG9hZGVyUmVzdWx0fSBmcm9tICcuLi8uLi8uLi9tb2R1bGVzL2ZpbGUtdXBsb2FkZXIvZmlsZS11cGxvYWRlci50eXBlcyc7XG5pbXBvcnQge0lSZXNpemVEYXRhfSBmcm9tICcuLi8uLi8uLi9tb2R1bGVzL3Jlc2l6YWJsZS9yZXNpemFibGUuZGlyZWN0aXZlJztcbmltcG9ydCB7QmFzZTY0VG9GaWxlfSBmcm9tICcuLi8uLi8uLi9tb2R1bGVzL3V0aWxzL2Jhc2U2NC10by1maWxlJztcbmltcG9ydCB7R3VpZH0gZnJvbSAnLi4vLi4vLi4vbW9kdWxlcy91dGlscy9ndWlkJztcbmltcG9ydCB7SW1nRW5jb2Rlcn0gZnJvbSAnLi4vLi4vLi4vbW9kdWxlcy91dGlscy9pbWctZW5jb2Rlci5zZXJ2aWNlJztcbmltcG9ydCB7SW1nQnJpY2tTdGF0ZSwgSW1nQnJpY2tTdGF0ZU1ldGFkYXRhfSBmcm9tICcuLi9pbWctYnJpY2stc3RhdGUuaW50ZXJmYWNlJztcbmltcG9ydCB7SW5wdXRDb250ZXh0Q29tcG9uZW50fSBmcm9tICcuLi9pbnB1dC1jb250ZXh0L2lucHV0LWNvbnRleHQuY29tcG9uZW50JztcbmltcG9ydCB7SU9uV2FsbEZvY3VzfSBmcm9tICcuLi8uLi8uLi93YWxsL2NvbXBvbmVudHMvd2FsbC9pbnRlcmZhY2VzL3dhbGwtY29tcG9uZW50L29uLXdhbGwtZm9jdXMuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdpbWctYnJpY2snLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9pbWctYnJpY2suY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2ltZy1icmljay5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEltZ0JyaWNrQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBJT25XYWxsRm9jdXMge1xuICAgIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG4gICAgQElucHV0KCkgc3RhdGU6IEltZ0JyaWNrU3RhdGU7XG5cbiAgICBAT3V0cHV0KCkgc3RhdGVDaGFuZ2VzOiBFdmVudEVtaXR0ZXI8SW1nQnJpY2tTdGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAVmlld0NoaWxkKCdpbWFnZScpIGltYWdlOiBFbGVtZW50UmVmO1xuXG4gICAgc2NvcGU6IEltZ0JyaWNrU3RhdGUgPSB7XG4gICAgICAgIHNyYzogJycsXG4gICAgICAgIG1ldGFkYXRhOiBudWxsLFxuICAgICAgICB3aWR0aDogbnVsbFxuICAgIH07XG5cbiAgICBpc1NyY0Jhc2U2NCA9IGZhbHNlO1xuXG4gICAgbGFzdFdpZHRoOiBudW1iZXI7XG5cbiAgICBpbWFnZVNyY1BsYWNlaG9sZGVyUmVmOiBTdGlja3lNb2RhbFJlZjtcblxuICAgIHJlc2l6YWJsZSA9IHtcbiAgICAgICAgcmVzaXplOiB0aGlzLm9uUmVzaXplLmJpbmQodGhpcyksXG4gICAgICAgIHJlc2l6ZVN0YXJ0OiB0aGlzLm9uUmVzaXplU3RhcnQuYmluZCh0aGlzKSxcbiAgICAgICAgcmVzaXplRW5kOiB0aGlzLm9uUmVzaXplRW5kLmJpbmQodGhpcylcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBuZ3hTdGlja3lNb2RhbFNlcnZpY2U6IFN0aWNreU1vZGFsU2VydmljZSxcbiAgICAgICAgICAgICAgICBASW5qZWN0KFdBTExfRklMRV9VUExPQURFUikgcHJpdmF0ZSB3YWxsRmlsZVVwbG9hZGVyOiBJV2FsbEZpbGVVcGxvYWRlcixcbiAgICAgICAgICAgICAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5zY29wZSwgdGhpcy5zdGF0ZSk7XG5cbiAgICAgICAgdGhpcy5wcm9jZXNzTmV3U3RhdGUoKTtcbiAgICB9XG5cbiAgICBvbldhbGxTdGF0ZUNoYW5nZShuZXdTdGF0ZTogSW1nQnJpY2tTdGF0ZSkge1xuICAgICAgICBpZiAobmV3U3RhdGUgJiYgbmV3U3RhdGUuc3JjICE9PSB0aGlzLnNjb3BlLnNyYykge1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLnNjb3BlLCB0aGlzLnN0YXRlKTtcblxuICAgICAgICAgICAgdGhpcy5wcm9jZXNzTmV3U3RhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb2Nlc3NOZXdTdGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2NvcGUuc3JjKSB7XG4gICAgICAgICAgICB0aGlzLmlzU3JjQmFzZTY0ID0gdGhpcy5pc0Jhc2U2NCh0aGlzLnNjb3BlLnNyYyk7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5zY29wZS53aWR0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0VXBJbWFnZVdpZHRoKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmlzU3JjQmFzZTY0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzQmFzZTY0SW1nU3JjKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbldhbGxGb2N1cygpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLnNjb3BlLnNyYykge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UGFuZWwoKTtcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gcmVzaXplIGNhbGxiYWNrc1xuICAgIG9uUmVzaXplKHJlc2l6ZURhdGE6IElSZXNpemVEYXRhKSB7XG4gICAgICAgIHRoaXMuc2NvcGUud2lkdGggPSB0aGlzLmxhc3RXaWR0aCArIHJlc2l6ZURhdGEub2Zmc2V0O1xuICAgIH1cblxuICAgIG9uUmVzaXplU3RhcnQoKSB7XG4gICAgICAgIHRoaXMubGFzdFdpZHRoID0gdGhpcy5zY29wZS53aWR0aDtcbiAgICB9XG5cbiAgICBvblJlc2l6ZUVuZCgpIHtcbiAgICAgICAgdGhpcy5zYXZlKCk7XG4gICAgfVxuXG4gICAgYXBwbHlJbWFnZVNyYyhpbWFnZVNyYzogc3RyaW5nLCBtZXRhZGF0YT86IEltZ0JyaWNrU3RhdGVNZXRhZGF0YSk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzSW1hZ2UoaW1hZ2VTcmMpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY29wZS5zcmMgPSBpbWFnZVNyYztcbiAgICAgICAgICAgICAgICB0aGlzLmlzU3JjQmFzZTY0ID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBpZiAobWV0YWRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY29wZS5tZXRhZGF0YSA9IG1ldGFkYXRhO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuc2F2ZSgpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0VXBJbWFnZVdpZHRoKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICBhbGVydCgnUGxlYXNlIGVudGVyIHZhbGlkIHVybCcpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXBwbHlJbWFnZUZpbGUoaW1nRmlsZTogRmlsZSk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gKG5ldyBJbWdFbmNvZGVyKGltZ0ZpbGUpKS5nZXRCYXNlNjRSZXByZXNlbnRhdGlvbigpLnRoZW4oKGltZ0Jhc2U2NCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXBwbHlJbWFnZVNyYyhpbWdCYXNlNjQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2Nlc3NCYXNlNjRJbWdTcmMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm9jZXNzQmFzZTY0SW1nU3JjKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy51cGxvYWRJbWFnZSgpLnRoZW4oKHVwbG9hZEluZm8pID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFwcGx5SW1hZ2VTcmModXBsb2FkSW5mby5kb3dubG9hZFVSTCwge1xuICAgICAgICAgICAgICAgIHBhdGg6IHVwbG9hZEluZm8ucGF0aFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2hvd1BhbmVsKCkge1xuICAgICAgICBpZiAoIXRoaXMuaW1hZ2VTcmNQbGFjZWhvbGRlclJlZikge1xuICAgICAgICAgICAgdGhpcy5pbWFnZVNyY1BsYWNlaG9sZGVyUmVmID0gdGhpcy5uZ3hTdGlja3lNb2RhbFNlcnZpY2Uub3Blbih7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50OiBJbnB1dENvbnRleHRDb21wb25lbnQsXG4gICAgICAgICAgICAgICAgcG9zaXRpb25TdHJhdGVneToge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBTdGlja3lQb3NpdGlvblN0cmF0ZWd5LmZsZXhpYmxlQ29ubmVjdGVkLFxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZVRvOiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblk6ICdib3R0b20nLFxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5WDogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlZOiAndG9wJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlclxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuaW1hZ2VTcmNQbGFjZWhvbGRlclJlZi5yZXN1bHQudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZVNyY1BsYWNlaG9sZGVyUmVmID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc3JjKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlJbWFnZVNyYyhyZXN1bHQuc3JjKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGx5SW1hZ2VGaWxlKHJlc3VsdC5maWxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZVNyY1BsYWNlaG9sZGVyUmVmID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNCYXNlNjQoc3RyOiBzdHJpbmcpIHtcbiAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoL15kYXRhOmltYWdlXFwvKHBuZ3xqcGd8anBlZyk7YmFzZTY0LC8sICcnKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGJ0b2EoYXRvYihzdHIpKSA9PT0gc3RyO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdXBsb2FkSW1hZ2UoKTogUHJvbWlzZTxJV2FsbEZpbGVVcGxvYWRlclJlc3VsdD4ge1xuICAgICAgICBpZiAoIXRoaXMud2FsbEZpbGVVcGxvYWRlci5jYW5VcGxvYWRGaWxlKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZmlsZU5hbWUgPSAobmV3IEd1aWQoKSkuZ2V0KCk7XG4gICAgICAgIGNvbnN0IGltZ0ZpbGUgPSAobmV3IEJhc2U2NFRvRmlsZSh0aGlzLnNjb3BlLnNyYywgZmlsZU5hbWUpKS5nZXRGaWxlKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMud2FsbEZpbGVVcGxvYWRlci51cGxvYWQodGhpcy5pZCwgaW1nRmlsZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRVcEltYWdlV2lkdGgoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRJbWFnZSh0aGlzLnNjb3BlLnNyYykudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNjb3BlLndpZHRoID0gdGhpcy5pbWFnZS5uYXRpdmVFbGVtZW50LndpZHRoO1xuXG4gICAgICAgICAgICB0aGlzLnNhdmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzYXZlKCkge1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5lbWl0KHRoaXMuc2NvcGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbG9hZEltYWdlKHNyYzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzSW1hZ2Uoc3JjKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzSW1hZ2Uoc3JjKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcblxuICAgICAgICAgICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpbWcub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGltZy5zcmMgPSBzcmM7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==