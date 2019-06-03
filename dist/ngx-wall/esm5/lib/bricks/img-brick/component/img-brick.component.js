/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ComponentFactoryResolver, ElementRef, EventEmitter, Inject, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { StickyModalService } from 'ngx-sticky-modal';
import { WALL_FILE_UPLOADER } from '../../../modules/file-uploader/file-uploader.token';
import { Base64ToFile } from '../../../modules/utils/base64-to-file';
import { Guid } from '../../../modules/utils/guid';
import { ImgEncoder } from '../../../modules/utils/img-encoder.service';
import { InputContextComponent } from '../input-context/input-context.component';
import { getModalConfig } from '../../base-brick/base-brick.component';
var ImgBrickComponent = /** @class */ (function () {
    function ImgBrickComponent(renderer, componentFactoryResolver, ngxStickyModalService, wallFileUploader, el) {
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
    ImgBrickComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        Object.assign(this.scope, this.state);
        this.processNewState();
    };
    /**
     * @param {?} newState
     * @return {?}
     */
    ImgBrickComponent.prototype.onWallStateChange = /**
     * @param {?} newState
     * @return {?}
     */
    function (newState) {
        if (newState && newState.src !== this.scope.src) {
            Object.assign(this.scope, this.state);
            this.processNewState();
        }
    };
    /**
     * @return {?}
     */
    ImgBrickComponent.prototype.processNewState = /**
     * @return {?}
     */
    function () {
        if (this.scope.src) {
            this.isSrcBase64 = this.isBase64(this.scope.src);
            if (!this.scope.width) {
                this.setUpImageWidth();
            }
            if (this.isSrcBase64) {
                this.processBase64ImgSrc();
            }
        }
    };
    /**
     * @return {?}
     */
    ImgBrickComponent.prototype.onWallFocus = /**
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
    // resize callbacks
    // resize callbacks
    /**
     * @param {?} resizeData
     * @return {?}
     */
    ImgBrickComponent.prototype.onResize = 
    // resize callbacks
    /**
     * @param {?} resizeData
     * @return {?}
     */
    function (resizeData) {
        this.scope.width = this.lastWidth + resizeData.offset;
    };
    /**
     * @return {?}
     */
    ImgBrickComponent.prototype.onResizeStart = /**
     * @return {?}
     */
    function () {
        this.lastWidth = this.scope.width;
    };
    /**
     * @return {?}
     */
    ImgBrickComponent.prototype.onResizeEnd = /**
     * @return {?}
     */
    function () {
        this.save();
    };
    /**
     * @param {?} imageSrc
     * @param {?=} metadata
     * @return {?}
     */
    ImgBrickComponent.prototype.applyImageSrc = /**
     * @param {?} imageSrc
     * @param {?=} metadata
     * @return {?}
     */
    function (imageSrc, metadata) {
        var _this = this;
        return this.isImage(imageSrc)
            .then((/**
         * @return {?}
         */
        function () {
            _this.scope.src = imageSrc;
            _this.isSrcBase64 = false;
            if (metadata) {
                _this.scope.metadata = metadata;
            }
            _this.save();
            return _this.setUpImageWidth();
        }))
            .catch((/**
         * @return {?}
         */
        function () {
            alert('Please enter valid url');
        }));
    };
    /**
     * @param {?} imgFile
     * @return {?}
     */
    ImgBrickComponent.prototype.applyImageFile = /**
     * @param {?} imgFile
     * @return {?}
     */
    function (imgFile) {
        var _this = this;
        return (new ImgEncoder(imgFile)).getBase64Representation().then((/**
         * @param {?} imgBase64
         * @return {?}
         */
        function (imgBase64) {
            return _this.applyImageSrc(imgBase64).then((/**
             * @return {?}
             */
            function () {
                return _this.processBase64ImgSrc();
            }));
        }));
    };
    /**
     * @return {?}
     */
    ImgBrickComponent.prototype.processBase64ImgSrc = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return this.uploadImage().then((/**
         * @param {?} uploadInfo
         * @return {?}
         */
        function (uploadInfo) {
            return _this.applyImageSrc(uploadInfo.downloadURL, {
                path: uploadInfo.path
            });
        }), (/**
         * @return {?}
         */
        function () {
        }));
    };
    /**
     * @return {?}
     */
    ImgBrickComponent.prototype.showPanel = /**
     * @return {?}
     */
    function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modalConfig;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                if (!this.imageSrcPlaceholderRef) {
                    modalConfig = getModalConfig(this.el, this.componentFactoryResolver, InputContextComponent);
                    this.imageSrcPlaceholderRef = this.ngxStickyModalService.open(modalConfig);
                    this.imageSrcPlaceholderRef.result.then((/**
                     * @param {?} result
                     * @return {?}
                     */
                    function (result) {
                        _this.imageSrcPlaceholderRef = null;
                        if (result.src) {
                            _this.applyImageSrc(result.src);
                        }
                        else {
                            _this.applyImageFile(result.file);
                        }
                    }), (/**
                     * @return {?}
                     */
                    function () {
                        _this.imageSrcPlaceholderRef = null;
                    }));
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * @param {?} str
     * @return {?}
     */
    ImgBrickComponent.prototype.isBase64 = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        str = str.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
        try {
            return btoa(atob(str)) === str;
        }
        catch (err) {
            return false;
        }
    };
    /**
     * @private
     * @return {?}
     */
    ImgBrickComponent.prototype.uploadImage = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this.wallFileUploader.canUploadFile()) {
            return Promise.reject();
        }
        /** @type {?} */
        var fileName = (new Guid()).get();
        /** @type {?} */
        var imgFile = (new Base64ToFile(this.scope.src, fileName)).getFile();
        return this.wallFileUploader.upload(this.id, imgFile);
    };
    /**
     * @private
     * @return {?}
     */
    ImgBrickComponent.prototype.setUpImageWidth = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return this.loadImage(this.scope.src).then((/**
         * @return {?}
         */
        function () {
            _this.scope.width = _this.image.nativeElement.width;
            _this.save();
        }));
    };
    /**
     * @private
     * @return {?}
     */
    ImgBrickComponent.prototype.save = /**
     * @private
     * @return {?}
     */
    function () {
        this.stateChanges.emit(this.scope);
    };
    /**
     * @private
     * @param {?} src
     * @return {?}
     */
    ImgBrickComponent.prototype.loadImage = /**
     * @private
     * @param {?} src
     * @return {?}
     */
    function (src) {
        return this.isImage(src);
    };
    /**
     * @private
     * @param {?} src
     * @return {?}
     */
    ImgBrickComponent.prototype.isImage = /**
     * @private
     * @param {?} src
     * @return {?}
     */
    function (src) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            /** @type {?} */
            var img = new Image();
            img.onload = (/**
             * @return {?}
             */
            function () {
                resolve();
            });
            img.onerror = (/**
             * @return {?}
             */
            function () {
                reject();
            });
            img.src = src;
        }));
    };
    ImgBrickComponent.decorators = [
        { type: Component, args: [{
                    selector: 'img-brick',
                    template: "<div class=\"container\" [style.width]=\"scope.width ? scope.width+'px' : 'auto'\">\n    <img [tow-slave]=\"id\" #image *ngIf=\"scope.src\" [wResizable]=\"resizable\" [src]=\"scope.src\">\n\n    <a mat-button *ngIf=\"!isSrcBase64 && scope.src\" [href]=\"scope.src\" target=\"_blank\" class=\"original-btn\">\n        Show original\n    </a>\n</div>\n\n<w-brick-input-placeholder\n    *ngIf=\"!scope.src\"\n    [text]=\"'Add an Image'\"\n    [icon]=\"'image'\" (selected)=\"showPanel()\">\n</w-brick-input-placeholder>\n",
                    styles: [":host{position:relative;display:block}:host:hover .original-btn{display:block}.original-btn{position:absolute;top:15px;right:15px;display:none}.container{margin:0 auto;position:relative;max-width:100%}.container .left-handler,.container .right-handler{position:absolute;display:block;width:40px;height:100%;top:0;cursor:col-resize}.container .left-handler{left:0}.container .right-handler{right:0}.container img{-o-object-fit:cover;object-fit:cover;width:100%;height:100%;margin:0 auto;display:block;cursor:pointer}"]
                }] }
    ];
    /** @nocollapse */
    ImgBrickComponent.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ComponentFactoryResolver },
        { type: StickyModalService },
        { type: undefined, decorators: [{ type: Inject, args: [WALL_FILE_UPLOADER,] }] },
        { type: ElementRef }
    ]; };
    ImgBrickComponent.propDecorators = {
        id: [{ type: Input }],
        state: [{ type: Input }],
        stateChanges: [{ type: Output }],
        image: [{ type: ViewChild, args: ['image',] }]
    };
    return ImgBrickComponent;
}());
export { ImgBrickComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1nLWJyaWNrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL2JyaWNrcy9pbWctYnJpY2svY29tcG9uZW50L2ltZy1icmljay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULHdCQUF3QixFQUN4QixVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBRUwsTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFpQixrQkFBa0IsRUFBeUIsTUFBTSxrQkFBa0IsQ0FBQztBQUM1RixPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxvREFBb0QsQ0FBQztBQUd0RixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sdUNBQXVDLENBQUM7QUFDbkUsT0FBTyxFQUFDLElBQUksRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQ2pELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSw0Q0FBNEMsQ0FBQztBQUV0RSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQztBQUUvRSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sdUNBQXVDLENBQUM7QUFFckU7SUErQkksMkJBQW9CLFFBQW1CLEVBQ25CLHdCQUFrRCxFQUNsRCxxQkFBeUMsRUFDYixnQkFBbUMsRUFDL0QsRUFBYztRQUpkLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCwwQkFBcUIsR0FBckIscUJBQXFCLENBQW9CO1FBQ2IscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFtQjtRQUMvRCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBMUJ4QixpQkFBWSxHQUFnQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBSXpFLFVBQUssR0FBa0I7WUFDbkIsR0FBRyxFQUFFLEVBQUU7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TUQsSUFrTUM7U0E3TFksaUJBQWlCOzs7SUFDMUIsK0JBQW9COztJQUNwQixrQ0FBOEI7O0lBRTlCLHlDQUF5RTs7SUFFekUsa0NBQXNDOztJQUV0QyxrQ0FJRTs7SUFFRix3Q0FBb0I7O0lBRXBCLHNDQUFrQjs7SUFFbEIsbURBQXVDOztJQUV2QyxzQ0FJRTs7Ozs7SUFFVSxxQ0FBMkI7Ozs7O0lBQzNCLHFEQUEwRDs7Ozs7SUFDMUQsa0RBQWlEOzs7OztJQUNqRCw2Q0FBdUU7Ozs7O0lBQ3ZFLCtCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgT25Jbml0LFxuICAgIE91dHB1dCxcbiAgICBSZW5kZXJlcjIsXG4gICAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdGlja3lNb2RhbFJlZiwgU3RpY2t5TW9kYWxTZXJ2aWNlLCBTdGlja3lQb3NpdGlvblN0cmF0ZWd5fSBmcm9tICduZ3gtc3RpY2t5LW1vZGFsJztcbmltcG9ydCB7V0FMTF9GSUxFX1VQTE9BREVSfSBmcm9tICcuLi8uLi8uLi9tb2R1bGVzL2ZpbGUtdXBsb2FkZXIvZmlsZS11cGxvYWRlci50b2tlbic7XG5pbXBvcnQge0lXYWxsRmlsZVVwbG9hZGVyLCBJV2FsbEZpbGVVcGxvYWRlclJlc3VsdH0gZnJvbSAnLi4vLi4vLi4vbW9kdWxlcy9maWxlLXVwbG9hZGVyL2ZpbGUtdXBsb2FkZXIudHlwZXMnO1xuaW1wb3J0IHtJUmVzaXplRGF0YX0gZnJvbSAnLi4vLi4vLi4vbW9kdWxlcy9yZXNpemFibGUvcmVzaXphYmxlLmRpcmVjdGl2ZSc7XG5pbXBvcnQge0Jhc2U2NFRvRmlsZX0gZnJvbSAnLi4vLi4vLi4vbW9kdWxlcy91dGlscy9iYXNlNjQtdG8tZmlsZSc7XG5pbXBvcnQge0d1aWR9IGZyb20gJy4uLy4uLy4uL21vZHVsZXMvdXRpbHMvZ3VpZCc7XG5pbXBvcnQge0ltZ0VuY29kZXJ9IGZyb20gJy4uLy4uLy4uL21vZHVsZXMvdXRpbHMvaW1nLWVuY29kZXIuc2VydmljZSc7XG5pbXBvcnQge0ltZ0JyaWNrU3RhdGUsIEltZ0JyaWNrU3RhdGVNZXRhZGF0YX0gZnJvbSAnLi4vaW1nLWJyaWNrLXN0YXRlLmludGVyZmFjZSc7XG5pbXBvcnQge0lucHV0Q29udGV4dENvbXBvbmVudH0gZnJvbSAnLi4vaW5wdXQtY29udGV4dC9pbnB1dC1jb250ZXh0LmNvbXBvbmVudCc7XG5pbXBvcnQge0lPbldhbGxGb2N1c30gZnJvbSAnLi4vLi4vLi4vd2FsbC9jb21wb25lbnRzL3dhbGwvaW50ZXJmYWNlcy93YWxsLWNvbXBvbmVudC9vbi13YWxsLWZvY3VzLmludGVyZmFjZSc7XG5pbXBvcnQge2dldE1vZGFsQ29uZmlnfSBmcm9tICcuLi8uLi9iYXNlLWJyaWNrL2Jhc2UtYnJpY2suY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdpbWctYnJpY2snLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9pbWctYnJpY2suY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2ltZy1icmljay5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEltZ0JyaWNrQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBJT25XYWxsRm9jdXMge1xuICAgIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG4gICAgQElucHV0KCkgc3RhdGU6IEltZ0JyaWNrU3RhdGU7XG5cbiAgICBAT3V0cHV0KCkgc3RhdGVDaGFuZ2VzOiBFdmVudEVtaXR0ZXI8SW1nQnJpY2tTdGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAVmlld0NoaWxkKCdpbWFnZScpIGltYWdlOiBFbGVtZW50UmVmO1xuXG4gICAgc2NvcGU6IEltZ0JyaWNrU3RhdGUgPSB7XG4gICAgICAgIHNyYzogJycsXG4gICAgICAgIG1ldGFkYXRhOiBudWxsLFxuICAgICAgICB3aWR0aDogbnVsbFxuICAgIH07XG5cbiAgICBpc1NyY0Jhc2U2NCA9IGZhbHNlO1xuXG4gICAgbGFzdFdpZHRoOiBudW1iZXI7XG5cbiAgICBpbWFnZVNyY1BsYWNlaG9sZGVyUmVmOiBTdGlja3lNb2RhbFJlZjtcblxuICAgIHJlc2l6YWJsZSA9IHtcbiAgICAgICAgcmVzaXplOiB0aGlzLm9uUmVzaXplLmJpbmQodGhpcyksXG4gICAgICAgIHJlc2l6ZVN0YXJ0OiB0aGlzLm9uUmVzaXplU3RhcnQuYmluZCh0aGlzKSxcbiAgICAgICAgcmVzaXplRW5kOiB0aGlzLm9uUmVzaXplRW5kLmJpbmQodGhpcylcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBuZ3hTdGlja3lNb2RhbFNlcnZpY2U6IFN0aWNreU1vZGFsU2VydmljZSxcbiAgICAgICAgICAgICAgICBASW5qZWN0KFdBTExfRklMRV9VUExPQURFUikgcHJpdmF0ZSB3YWxsRmlsZVVwbG9hZGVyOiBJV2FsbEZpbGVVcGxvYWRlcixcbiAgICAgICAgICAgICAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLnNjb3BlLCB0aGlzLnN0YXRlKTtcblxuICAgICAgICB0aGlzLnByb2Nlc3NOZXdTdGF0ZSgpO1xuICAgIH1cblxuICAgIG9uV2FsbFN0YXRlQ2hhbmdlKG5ld1N0YXRlOiBJbWdCcmlja1N0YXRlKSB7XG4gICAgICAgIGlmIChuZXdTdGF0ZSAmJiBuZXdTdGF0ZS5zcmMgIT09IHRoaXMuc2NvcGUuc3JjKSB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuc2NvcGUsIHRoaXMuc3RhdGUpO1xuXG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NOZXdTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvY2Vzc05ld1N0YXRlKCkge1xuICAgICAgICBpZiAodGhpcy5zY29wZS5zcmMpIHtcbiAgICAgICAgICAgIHRoaXMuaXNTcmNCYXNlNjQgPSB0aGlzLmlzQmFzZTY0KHRoaXMuc2NvcGUuc3JjKTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLnNjb3BlLndpZHRoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRVcEltYWdlV2lkdGgoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNTcmNCYXNlNjQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NCYXNlNjRJbWdTcmMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uV2FsbEZvY3VzKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuc2NvcGUuc3JjKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dQYW5lbCgpO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByZXNpemUgY2FsbGJhY2tzXG4gICAgb25SZXNpemUocmVzaXplRGF0YTogSVJlc2l6ZURhdGEpIHtcbiAgICAgICAgdGhpcy5zY29wZS53aWR0aCA9IHRoaXMubGFzdFdpZHRoICsgcmVzaXplRGF0YS5vZmZzZXQ7XG4gICAgfVxuXG4gICAgb25SZXNpemVTdGFydCgpIHtcbiAgICAgICAgdGhpcy5sYXN0V2lkdGggPSB0aGlzLnNjb3BlLndpZHRoO1xuICAgIH1cblxuICAgIG9uUmVzaXplRW5kKCkge1xuICAgICAgICB0aGlzLnNhdmUoKTtcbiAgICB9XG5cbiAgICBhcHBseUltYWdlU3JjKGltYWdlU3JjOiBzdHJpbmcsIG1ldGFkYXRhPzogSW1nQnJpY2tTdGF0ZU1ldGFkYXRhKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNJbWFnZShpbWFnZVNyYylcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3BlLnNyYyA9IGltYWdlU3JjO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNTcmNCYXNlNjQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGlmIChtZXRhZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjb3BlLm1ldGFkYXRhID0gbWV0YWRhdGE7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5zYXZlKCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRVcEltYWdlV2lkdGgoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdQbGVhc2UgZW50ZXIgdmFsaWQgdXJsJyk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhcHBseUltYWdlRmlsZShpbWdGaWxlOiBGaWxlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiAobmV3IEltZ0VuY29kZXIoaW1nRmlsZSkpLmdldEJhc2U2NFJlcHJlc2VudGF0aW9uKCkudGhlbigoaW1nQmFzZTY0KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hcHBseUltYWdlU3JjKGltZ0Jhc2U2NCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvY2Vzc0Jhc2U2NEltZ1NyYygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb2Nlc3NCYXNlNjRJbWdTcmMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnVwbG9hZEltYWdlKCkudGhlbigodXBsb2FkSW5mbykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXBwbHlJbWFnZVNyYyh1cGxvYWRJbmZvLmRvd25sb2FkVVJMLCB7XG4gICAgICAgICAgICAgICAgcGF0aDogdXBsb2FkSW5mby5wYXRoXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhc3luYyBzaG93UGFuZWwoKSB7XG4gICAgICAgIGlmICghdGhpcy5pbWFnZVNyY1BsYWNlaG9sZGVyUmVmKSB7XG4gICAgICAgICAgICBjb25zdCBtb2RhbENvbmZpZyA9IGdldE1vZGFsQ29uZmlnKHRoaXMuZWwsIHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBJbnB1dENvbnRleHRDb21wb25lbnQpO1xuICAgICAgICAgICAgdGhpcy5pbWFnZVNyY1BsYWNlaG9sZGVyUmVmID0gdGhpcy5uZ3hTdGlja3lNb2RhbFNlcnZpY2Uub3Blbihtb2RhbENvbmZpZyk7XG4gICAgICAgICAgICB0aGlzLmltYWdlU3JjUGxhY2Vob2xkZXJSZWYucmVzdWx0LnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VTcmNQbGFjZWhvbGRlclJlZiA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnNyYykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGx5SW1hZ2VTcmMocmVzdWx0LnNyYyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBseUltYWdlRmlsZShyZXN1bHQuZmlsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VTcmNQbGFjZWhvbGRlclJlZiA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzQmFzZTY0KHN0cjogc3RyaW5nKSB7XG4gICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKC9eZGF0YTppbWFnZVxcLyhwbmd8anBnfGpwZWcpO2Jhc2U2NCwvLCAnJyk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBidG9hKGF0b2Ioc3RyKSkgPT09IHN0cjtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHVwbG9hZEltYWdlKCk6IFByb21pc2U8SVdhbGxGaWxlVXBsb2FkZXJSZXN1bHQ+IHtcbiAgICAgICAgaWYgKCF0aGlzLndhbGxGaWxlVXBsb2FkZXIuY2FuVXBsb2FkRmlsZSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZpbGVOYW1lID0gKG5ldyBHdWlkKCkpLmdldCgpO1xuICAgICAgICBjb25zdCBpbWdGaWxlID0gKG5ldyBCYXNlNjRUb0ZpbGUodGhpcy5zY29wZS5zcmMsIGZpbGVOYW1lKSkuZ2V0RmlsZSgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLndhbGxGaWxlVXBsb2FkZXIudXBsb2FkKHRoaXMuaWQsIGltZ0ZpbGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0VXBJbWFnZVdpZHRoKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2FkSW1hZ2UodGhpcy5zY29wZS5zcmMpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zY29wZS53aWR0aCA9IHRoaXMuaW1hZ2UubmF0aXZlRWxlbWVudC53aWR0aDtcblxuICAgICAgICAgICAgdGhpcy5zYXZlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2F2ZSgpIHtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMuZW1pdCh0aGlzLnNjb3BlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvYWRJbWFnZShzcmM6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0ltYWdlKHNyYyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0ltYWdlKHNyYyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG5cbiAgICAgICAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaW1nLm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpbWcuc3JjID0gc3JjO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=