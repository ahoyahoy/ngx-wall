/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ComponentFactoryResolver, ElementRef, EventEmitter, Inject, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { StickyModalService, StickyPositionStrategy } from 'ngx-sticky-modal';
import { WALL_FILE_UPLOADER } from '../../../modules/file-uploader/file-uploader.token';
import { Base64ToFile } from '../../../modules/utils/base64-to-file';
import { Guid } from '../../../modules/utils/guid';
import { ImgEncoder } from '../../../modules/utils/img-encoder.service';
import { InputContextComponent } from '../input-context/input-context.component';
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
            setTimeout(function () {
                _this.showPanel();
            }, 0);
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
            .then(function () {
            _this.scope.src = imageSrc;
            _this.isSrcBase64 = false;
            if (metadata) {
                _this.scope.metadata = metadata;
            }
            _this.save();
            return _this.setUpImageWidth();
        })
            .catch(function () {
            alert('Please enter valid url');
        });
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
        return (new ImgEncoder(imgFile)).getBase64Representation().then(function (imgBase64) {
            return _this.applyImageSrc(imgBase64).then(function () {
                return _this.processBase64ImgSrc();
            });
        });
    };
    /**
     * @return {?}
     */
    ImgBrickComponent.prototype.processBase64ImgSrc = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return this.uploadImage().then(function (uploadInfo) {
            return _this.applyImageSrc(uploadInfo.downloadURL, {
                path: uploadInfo.path
            });
        }, function () {
        });
    };
    /**
     * @return {?}
     */
    ImgBrickComponent.prototype.showPanel = /**
     * @return {?}
     */
    function () {
        var _this = this;
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
            this.imageSrcPlaceholderRef.result.then(function (result) {
                _this.imageSrcPlaceholderRef = null;
                if (result.src) {
                    _this.applyImageSrc(result.src);
                }
                else {
                    _this.applyImageFile(result.file);
                }
            }, function () {
                _this.imageSrcPlaceholderRef = null;
            });
        }
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
        return this.loadImage(this.scope.src).then(function () {
            _this.scope.width = _this.image.nativeElement.width;
            _this.save();
        });
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
        return new Promise(function (resolve, reject) {
            /** @type {?} */
            var img = new Image();
            img.onload = function () {
                resolve();
            };
            img.onerror = function () {
                reject();
            };
            img.src = src;
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1nLWJyaWNrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL2JyaWNrcy9pbWctYnJpY2svY29tcG9uZW50L2ltZy1icmljay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1Qsd0JBQXdCLEVBQ3hCLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFFTCxNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWlCLGtCQUFrQixFQUFFLHNCQUFzQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDNUYsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sb0RBQW9ELENBQUM7QUFHdEYsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHVDQUF1QyxDQUFDO0FBQ25FLE9BQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFFdEUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sMENBQTBDLENBQUM7QUFHL0U7SUErQkksMkJBQW9CLFFBQW1CLEVBQ25CLHdCQUFrRCxFQUNsRCxxQkFBeUMsRUFDYixnQkFBbUMsRUFDL0QsRUFBYztRQUpkLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCwwQkFBcUIsR0FBckIscUJBQXFCLENBQW9CO1FBQ2IscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFtQjtRQUMvRCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBMUJ4QixpQkFBWSxHQUFnQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBSXpFLFVBQUssR0FBa0I7WUFDbkIsR0FBRyxFQUFFLEVBQUU7WUFDUCxRQUFRLEVBQUUsSUFBSTtZQUNkLEtBQUssRUFB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QkFQVCx3QkFBd0I7Z0JBVUosa0JBQWtCO2dEQTZDekIsTUFBTSxTQUFDLGtCQUFrQjtnQkF0RHRDLFVBQVU7OztxQkEwQlQsS0FBSzt3QkFDTCxLQUFLOytCQUVMLE1BQU07d0JBRU4sU0FBUyxTQUFDLE9BQU87O0lBcU10Qix3QkFBQztDQUFBLEFBaE5ELElBZ05DO1NBM01ZLGlCQUFpQjs7O0lBQzFCLCtCQUFvQjs7SUFDcEIsa0NBQThCOztJQUU5Qix5Q0FBeUU7O0lBRXpFLGtDQUFzQzs7SUFFdEMsa0NBSUU7O0lBRUYsd0NBQW9COztJQUVwQixzQ0FBa0I7O0lBRWxCLG1EQUF1Qzs7SUFFdkMsc0NBSUU7Ozs7O0lBRVUscUNBQTJCOzs7OztJQUMzQixxREFBMEQ7Ozs7O0lBQzFELGtEQUFpRDs7Ozs7SUFDakQsNkNBQXVFOzs7OztJQUN2RSwrQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgUmVuZGVyZXIyLFxuICAgIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3RpY2t5TW9kYWxSZWYsIFN0aWNreU1vZGFsU2VydmljZSwgU3RpY2t5UG9zaXRpb25TdHJhdGVneX0gZnJvbSAnbmd4LXN0aWNreS1tb2RhbCc7XG5pbXBvcnQge1dBTExfRklMRV9VUExPQURFUn0gZnJvbSAnLi4vLi4vLi4vbW9kdWxlcy9maWxlLXVwbG9hZGVyL2ZpbGUtdXBsb2FkZXIudG9rZW4nO1xuaW1wb3J0IHtJV2FsbEZpbGVVcGxvYWRlciwgSVdhbGxGaWxlVXBsb2FkZXJSZXN1bHR9IGZyb20gJy4uLy4uLy4uL21vZHVsZXMvZmlsZS11cGxvYWRlci9maWxlLXVwbG9hZGVyLnR5cGVzJztcbmltcG9ydCB7SVJlc2l6ZURhdGF9IGZyb20gJy4uLy4uLy4uL21vZHVsZXMvcmVzaXphYmxlL3Jlc2l6YWJsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHtCYXNlNjRUb0ZpbGV9IGZyb20gJy4uLy4uLy4uL21vZHVsZXMvdXRpbHMvYmFzZTY0LXRvLWZpbGUnO1xuaW1wb3J0IHtHdWlkfSBmcm9tICcuLi8uLi8uLi9tb2R1bGVzL3V0aWxzL2d1aWQnO1xuaW1wb3J0IHtJbWdFbmNvZGVyfSBmcm9tICcuLi8uLi8uLi9tb2R1bGVzL3V0aWxzL2ltZy1lbmNvZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHtJbWdCcmlja1N0YXRlLCBJbWdCcmlja1N0YXRlTWV0YWRhdGF9IGZyb20gJy4uL2ltZy1icmljay1zdGF0ZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHtJbnB1dENvbnRleHRDb21wb25lbnR9IGZyb20gJy4uL2lucHV0LWNvbnRleHQvaW5wdXQtY29udGV4dC5jb21wb25lbnQnO1xuaW1wb3J0IHtJT25XYWxsRm9jdXN9IGZyb20gJy4uLy4uLy4uL3dhbGwvY29tcG9uZW50cy93YWxsL2ludGVyZmFjZXMvd2FsbC1jb21wb25lbnQvb24td2FsbC1mb2N1cy5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ltZy1icmljaycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2ltZy1icmljay5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vaW1nLWJyaWNrLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgSW1nQnJpY2tDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIElPbldhbGxGb2N1cyB7XG4gICAgQElucHV0KCkgaWQ6IHN0cmluZztcbiAgICBASW5wdXQoKSBzdGF0ZTogSW1nQnJpY2tTdGF0ZTtcblxuICAgIEBPdXRwdXQoKSBzdGF0ZUNoYW5nZXM6IEV2ZW50RW1pdHRlcjxJbWdCcmlja1N0YXRlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2ltYWdlJykgaW1hZ2U6IEVsZW1lbnRSZWY7XG5cbiAgICBzY29wZTogSW1nQnJpY2tTdGF0ZSA9IHtcbiAgICAgICAgc3JjOiAnJyxcbiAgICAgICAgbWV0YWRhdGE6IG51bGwsXG4gICAgICAgIHdpZHRoOiBudWxsXG4gICAgfTtcblxuICAgIGlzU3JjQmFzZTY0ID0gZmFsc2U7XG5cbiAgICBsYXN0V2lkdGg6IG51bWJlcjtcblxuICAgIGltYWdlU3JjUGxhY2Vob2xkZXJSZWY6IFN0aWNreU1vZGFsUmVmO1xuXG4gICAgcmVzaXphYmxlID0ge1xuICAgICAgICByZXNpemU6IHRoaXMub25SZXNpemUuYmluZCh0aGlzKSxcbiAgICAgICAgcmVzaXplU3RhcnQ6IHRoaXMub25SZXNpemVTdGFydC5iaW5kKHRoaXMpLFxuICAgICAgICByZXNpemVFbmQ6IHRoaXMub25SZXNpemVFbmQuYmluZCh0aGlzKVxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgICAgICAgICBwcml2YXRlIG5neFN0aWNreU1vZGFsU2VydmljZTogU3RpY2t5TW9kYWxTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIEBJbmplY3QoV0FMTF9GSUxFX1VQTE9BREVSKSBwcml2YXRlIHdhbGxGaWxlVXBsb2FkZXI6IElXYWxsRmlsZVVwbG9hZGVyLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLnNjb3BlLCB0aGlzLnN0YXRlKTtcblxuICAgICAgICB0aGlzLnByb2Nlc3NOZXdTdGF0ZSgpO1xuICAgIH1cblxuICAgIG9uV2FsbFN0YXRlQ2hhbmdlKG5ld1N0YXRlOiBJbWdCcmlja1N0YXRlKSB7XG4gICAgICAgIGlmIChuZXdTdGF0ZSAmJiBuZXdTdGF0ZS5zcmMgIT09IHRoaXMuc2NvcGUuc3JjKSB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuc2NvcGUsIHRoaXMuc3RhdGUpO1xuXG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NOZXdTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvY2Vzc05ld1N0YXRlKCkge1xuICAgICAgICBpZiAodGhpcy5zY29wZS5zcmMpIHtcbiAgICAgICAgICAgIHRoaXMuaXNTcmNCYXNlNjQgPSB0aGlzLmlzQmFzZTY0KHRoaXMuc2NvcGUuc3JjKTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLnNjb3BlLndpZHRoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRVcEltYWdlV2lkdGgoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNTcmNCYXNlNjQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NCYXNlNjRJbWdTcmMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uV2FsbEZvY3VzKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuc2NvcGUuc3JjKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dQYW5lbCgpO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByZXNpemUgY2FsbGJhY2tzXG4gICAgb25SZXNpemUocmVzaXplRGF0YTogSVJlc2l6ZURhdGEpIHtcbiAgICAgICAgdGhpcy5zY29wZS53aWR0aCA9IHRoaXMubGFzdFdpZHRoICsgcmVzaXplRGF0YS5vZmZzZXQ7XG4gICAgfVxuXG4gICAgb25SZXNpemVTdGFydCgpIHtcbiAgICAgICAgdGhpcy5sYXN0V2lkdGggPSB0aGlzLnNjb3BlLndpZHRoO1xuICAgIH1cblxuICAgIG9uUmVzaXplRW5kKCkge1xuICAgICAgICB0aGlzLnNhdmUoKTtcbiAgICB9XG5cbiAgICBhcHBseUltYWdlU3JjKGltYWdlU3JjOiBzdHJpbmcsIG1ldGFkYXRhPzogSW1nQnJpY2tTdGF0ZU1ldGFkYXRhKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNJbWFnZShpbWFnZVNyYylcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3BlLnNyYyA9IGltYWdlU3JjO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNTcmNCYXNlNjQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGlmIChtZXRhZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjb3BlLm1ldGFkYXRhID0gbWV0YWRhdGE7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5zYXZlKCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRVcEltYWdlV2lkdGgoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdQbGVhc2UgZW50ZXIgdmFsaWQgdXJsJyk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhcHBseUltYWdlRmlsZShpbWdGaWxlOiBGaWxlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiAobmV3IEltZ0VuY29kZXIoaW1nRmlsZSkpLmdldEJhc2U2NFJlcHJlc2VudGF0aW9uKCkudGhlbigoaW1nQmFzZTY0KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hcHBseUltYWdlU3JjKGltZ0Jhc2U2NCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvY2Vzc0Jhc2U2NEltZ1NyYygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb2Nlc3NCYXNlNjRJbWdTcmMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnVwbG9hZEltYWdlKCkudGhlbigodXBsb2FkSW5mbykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXBwbHlJbWFnZVNyYyh1cGxvYWRJbmZvLmRvd25sb2FkVVJMLCB7XG4gICAgICAgICAgICAgICAgcGF0aDogdXBsb2FkSW5mby5wYXRoXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzaG93UGFuZWwoKSB7XG4gICAgICAgIGlmICghdGhpcy5pbWFnZVNyY1BsYWNlaG9sZGVyUmVmKSB7XG4gICAgICAgICAgICB0aGlzLmltYWdlU3JjUGxhY2Vob2xkZXJSZWYgPSB0aGlzLm5neFN0aWNreU1vZGFsU2VydmljZS5vcGVuKHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnQ6IElucHV0Q29udGV4dENvbXBvbmVudCxcbiAgICAgICAgICAgICAgICBwb3NpdGlvblN0cmF0ZWd5OiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFN0aWNreVBvc2l0aW9uU3RyYXRlZ3kuZmxleGlibGVDb25uZWN0ZWQsXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlVG86IHRoaXMuZWwubmF0aXZlRWxlbWVudFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICBvcmlnaW5YOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luWTogJ2JvdHRvbScsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlYOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVk6ICd0b3AnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5pbWFnZVNyY1BsYWNlaG9sZGVyUmVmLnJlc3VsdC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlU3JjUGxhY2Vob2xkZXJSZWYgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5zcmMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBseUltYWdlU3JjKHJlc3VsdC5zcmMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlJbWFnZUZpbGUocmVzdWx0LmZpbGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlU3JjUGxhY2Vob2xkZXJSZWYgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0Jhc2U2NChzdHI6IHN0cmluZykge1xuICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSgvXmRhdGE6aW1hZ2VcXC8ocG5nfGpwZ3xqcGVnKTtiYXNlNjQsLywgJycpO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gYnRvYShhdG9iKHN0cikpID09PSBzdHI7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGxvYWRJbWFnZSgpOiBQcm9taXNlPElXYWxsRmlsZVVwbG9hZGVyUmVzdWx0PiB7XG4gICAgICAgIGlmICghdGhpcy53YWxsRmlsZVVwbG9hZGVyLmNhblVwbG9hZEZpbGUoKSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBmaWxlTmFtZSA9IChuZXcgR3VpZCgpKS5nZXQoKTtcbiAgICAgICAgY29uc3QgaW1nRmlsZSA9IChuZXcgQmFzZTY0VG9GaWxlKHRoaXMuc2NvcGUuc3JjLCBmaWxlTmFtZSkpLmdldEZpbGUoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy53YWxsRmlsZVVwbG9hZGVyLnVwbG9hZCh0aGlzLmlkLCBpbWdGaWxlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFVwSW1hZ2VXaWR0aCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZEltYWdlKHRoaXMuc2NvcGUuc3JjKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2NvcGUud2lkdGggPSB0aGlzLmltYWdlLm5hdGl2ZUVsZW1lbnQud2lkdGg7XG5cbiAgICAgICAgICAgIHRoaXMuc2F2ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNhdmUoKSB7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLmVtaXQodGhpcy5zY29wZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2FkSW1hZ2Uoc3JjOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNJbWFnZShzcmMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNJbWFnZShzcmMpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuXG4gICAgICAgICAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGltZy5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaW1nLnNyYyA9IHNyYztcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19