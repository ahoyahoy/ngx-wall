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
            setTimeout(() => {
                this.showPanel();
            }, 0);
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
            .then(() => {
            this.scope.src = imageSrc;
            this.isSrcBase64 = false;
            if (metadata) {
                this.scope.metadata = metadata;
            }
            this.save();
            return this.setUpImageWidth();
        })
            .catch(() => {
            alert('Please enter valid url');
        });
    }
    /**
     * @param {?} imgFile
     * @return {?}
     */
    applyImageFile(imgFile) {
        return (new ImgEncoder(imgFile)).getBase64Representation().then((imgBase64) => {
            return this.applyImageSrc(imgBase64).then(() => {
                return this.processBase64ImgSrc();
            });
        });
    }
    /**
     * @return {?}
     */
    processBase64ImgSrc() {
        return this.uploadImage().then((uploadInfo) => {
            return this.applyImageSrc(uploadInfo.downloadURL, {
                path: uploadInfo.path
            });
        }, () => {
        });
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
            this.imageSrcPlaceholderRef.result.then((result) => {
                this.imageSrcPlaceholderRef = null;
                if (result.src) {
                    this.applyImageSrc(result.src);
                }
                else {
                    this.applyImageFile(result.file);
                }
            }, () => {
                this.imageSrcPlaceholderRef = null;
            });
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
        return this.loadImage(this.scope.src).then(() => {
            this.scope.width = this.image.nativeElement.width;
            this.save();
        });
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
        return new Promise((resolve, reject) => {
            /** @type {?} */
            const img = new Image();
            img.onload = () => {
                resolve();
            };
            img.onerror = () => {
                reject();
            };
            img.src = src;
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1nLWJyaWNrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL2JyaWNrcy9pbWctYnJpY2svY29tcG9uZW50L2ltZy1icmljay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1Qsd0JBQXdCLEVBQ3hCLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFFTCxNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWlCLGtCQUFrQixFQUFFLHNCQUFzQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDNUYsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sb0RBQW9ELENBQUM7QUFHdEYsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHVDQUF1QyxDQUFDO0FBQ25FLE9BQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFFdEUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sMENBQTBDLENBQUM7QUFRL0UsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7Ozs7SUEwQjFCLFlBQW9CLFFBQW1CLEVBQ25CLHdCQUFrRCxFQUNsRCxxQkFBeUMsRUFDYixnQkFBbUMsRUFDL0QsRUFBYztRQUpkLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCwwQkFBcUIsR0FBckIscUJBQXFCLENBQW9CO1FBQ2IscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFtQjtRQUMvRCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBMUJ4QixpQkFBWSxHQUFnQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBSXpFLFVBQUssR0FBa0I7WUFDbkIsR0FBRyxFQUFFLEVBQUU7WUFDUCxRQUFR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QUVMLE1BQU07b0JBRU4sU0FBUyxTQUFDLE9BQU87Ozs7SUFMbEIsK0JBQW9COztJQUNwQixrQ0FBOEI7O0lBRTlCLHlDQUF5RTs7SUFFekUsa0NBQXNDOztJQUV0QyxrQ0FJRTs7SUFFRix3Q0FBb0I7O0lBRXBCLHNDQUFrQjs7SUFFbEIsbURBQXVDOztJQUV2QyxzQ0FJRTs7Ozs7SUFFVSxxQ0FBMkI7Ozs7O0lBQzNCLHFEQUEwRDs7Ozs7SUFDMUQsa0RBQWlEOzs7OztJQUNqRCw2Q0FBdUU7Ozs7O0lBQ3ZFLCtCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgT25Jbml0LFxuICAgIE91dHB1dCxcbiAgICBSZW5kZXJlcjIsXG4gICAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdGlja3lNb2RhbFJlZiwgU3RpY2t5TW9kYWxTZXJ2aWNlLCBTdGlja3lQb3NpdGlvblN0cmF0ZWd5fSBmcm9tICduZ3gtc3RpY2t5LW1vZGFsJztcbmltcG9ydCB7V0FMTF9GSUxFX1VQTE9BREVSfSBmcm9tICcuLi8uLi8uLi9tb2R1bGVzL2ZpbGUtdXBsb2FkZXIvZmlsZS11cGxvYWRlci50b2tlbic7XG5pbXBvcnQge0lXYWxsRmlsZVVwbG9hZGVyLCBJV2FsbEZpbGVVcGxvYWRlclJlc3VsdH0gZnJvbSAnLi4vLi4vLi4vbW9kdWxlcy9maWxlLXVwbG9hZGVyL2ZpbGUtdXBsb2FkZXIudHlwZXMnO1xuaW1wb3J0IHtJUmVzaXplRGF0YX0gZnJvbSAnLi4vLi4vLi4vbW9kdWxlcy9yZXNpemFibGUvcmVzaXphYmxlLmRpcmVjdGl2ZSc7XG5pbXBvcnQge0Jhc2U2NFRvRmlsZX0gZnJvbSAnLi4vLi4vLi4vbW9kdWxlcy91dGlscy9iYXNlNjQtdG8tZmlsZSc7XG5pbXBvcnQge0d1aWR9IGZyb20gJy4uLy4uLy4uL21vZHVsZXMvdXRpbHMvZ3VpZCc7XG5pbXBvcnQge0ltZ0VuY29kZXJ9IGZyb20gJy4uLy4uLy4uL21vZHVsZXMvdXRpbHMvaW1nLWVuY29kZXIuc2VydmljZSc7XG5pbXBvcnQge0ltZ0JyaWNrU3RhdGUsIEltZ0JyaWNrU3RhdGVNZXRhZGF0YX0gZnJvbSAnLi4vaW1nLWJyaWNrLXN0YXRlLmludGVyZmFjZSc7XG5pbXBvcnQge0lucHV0Q29udGV4dENvbXBvbmVudH0gZnJvbSAnLi4vaW5wdXQtY29udGV4dC9pbnB1dC1jb250ZXh0LmNvbXBvbmVudCc7XG5pbXBvcnQge0lPbldhbGxGb2N1c30gZnJvbSAnLi4vLi4vLi4vd2FsbC9jb21wb25lbnRzL3dhbGwvaW50ZXJmYWNlcy93YWxsLWNvbXBvbmVudC9vbi13YWxsLWZvY3VzLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnaW1nLWJyaWNrJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vaW1nLWJyaWNrLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9pbWctYnJpY2suY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBJbWdCcmlja0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgSU9uV2FsbEZvY3VzIHtcbiAgICBASW5wdXQoKSBpZDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHN0YXRlOiBJbWdCcmlja1N0YXRlO1xuXG4gICAgQE91dHB1dCgpIHN0YXRlQ2hhbmdlczogRXZlbnRFbWl0dGVyPEltZ0JyaWNrU3RhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQFZpZXdDaGlsZCgnaW1hZ2UnKSBpbWFnZTogRWxlbWVudFJlZjtcblxuICAgIHNjb3BlOiBJbWdCcmlja1N0YXRlID0ge1xuICAgICAgICBzcmM6ICcnLFxuICAgICAgICBtZXRhZGF0YTogbnVsbCxcbiAgICAgICAgd2lkdGg6IG51bGxcbiAgICB9O1xuXG4gICAgaXNTcmNCYXNlNjQgPSBmYWxzZTtcblxuICAgIGxhc3RXaWR0aDogbnVtYmVyO1xuXG4gICAgaW1hZ2VTcmNQbGFjZWhvbGRlclJlZjogU3RpY2t5TW9kYWxSZWY7XG5cbiAgICByZXNpemFibGUgPSB7XG4gICAgICAgIHJlc2l6ZTogdGhpcy5vblJlc2l6ZS5iaW5kKHRoaXMpLFxuICAgICAgICByZXNpemVTdGFydDogdGhpcy5vblJlc2l6ZVN0YXJ0LmJpbmQodGhpcyksXG4gICAgICAgIHJlc2l6ZUVuZDogdGhpcy5vblJlc2l6ZUVuZC5iaW5kKHRoaXMpXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgICAgICAgICBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgbmd4U3RpY2t5TW9kYWxTZXJ2aWNlOiBTdGlja3lNb2RhbFNlcnZpY2UsXG4gICAgICAgICAgICAgICAgQEluamVjdChXQUxMX0ZJTEVfVVBMT0FERVIpIHByaXZhdGUgd2FsbEZpbGVVcGxvYWRlcjogSVdhbGxGaWxlVXBsb2FkZXIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZikge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuc2NvcGUsIHRoaXMuc3RhdGUpO1xuXG4gICAgICAgIHRoaXMucHJvY2Vzc05ld1N0YXRlKCk7XG4gICAgfVxuXG4gICAgb25XYWxsU3RhdGVDaGFuZ2UobmV3U3RhdGU6IEltZ0JyaWNrU3RhdGUpIHtcbiAgICAgICAgaWYgKG5ld1N0YXRlICYmIG5ld1N0YXRlLnNyYyAhPT0gdGhpcy5zY29wZS5zcmMpIHtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5zY29wZSwgdGhpcy5zdGF0ZSk7XG5cbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc05ld1N0YXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm9jZXNzTmV3U3RhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnNjb3BlLnNyYykge1xuICAgICAgICAgICAgdGhpcy5pc1NyY0Jhc2U2NCA9IHRoaXMuaXNCYXNlNjQodGhpcy5zY29wZS5zcmMpO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2NvcGUud2lkdGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFVwSW1hZ2VXaWR0aCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5pc1NyY0Jhc2U2NCkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0Jhc2U2NEltZ1NyYygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25XYWxsRm9jdXMoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5zY29wZS5zcmMpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1BhbmVsKCk7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJlc2l6ZSBjYWxsYmFja3NcbiAgICBvblJlc2l6ZShyZXNpemVEYXRhOiBJUmVzaXplRGF0YSkge1xuICAgICAgICB0aGlzLnNjb3BlLndpZHRoID0gdGhpcy5sYXN0V2lkdGggKyByZXNpemVEYXRhLm9mZnNldDtcbiAgICB9XG5cbiAgICBvblJlc2l6ZVN0YXJ0KCkge1xuICAgICAgICB0aGlzLmxhc3RXaWR0aCA9IHRoaXMuc2NvcGUud2lkdGg7XG4gICAgfVxuXG4gICAgb25SZXNpemVFbmQoKSB7XG4gICAgICAgIHRoaXMuc2F2ZSgpO1xuICAgIH1cblxuICAgIGFwcGx5SW1hZ2VTcmMoaW1hZ2VTcmM6IHN0cmluZywgbWV0YWRhdGE/OiBJbWdCcmlja1N0YXRlTWV0YWRhdGEpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0ltYWdlKGltYWdlU3JjKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NvcGUuc3JjID0gaW1hZ2VTcmM7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1NyY0Jhc2U2NCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgaWYgKG1ldGFkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NvcGUubWV0YWRhdGEgPSBtZXRhZGF0YTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNhdmUoKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldFVwSW1hZ2VXaWR0aCgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ1BsZWFzZSBlbnRlciB2YWxpZCB1cmwnKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFwcGx5SW1hZ2VGaWxlKGltZ0ZpbGU6IEZpbGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIChuZXcgSW1nRW5jb2RlcihpbWdGaWxlKSkuZ2V0QmFzZTY0UmVwcmVzZW50YXRpb24oKS50aGVuKChpbWdCYXNlNjQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFwcGx5SW1hZ2VTcmMoaW1nQmFzZTY0KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9jZXNzQmFzZTY0SW1nU3JjKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvY2Vzc0Jhc2U2NEltZ1NyYygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXBsb2FkSW1hZ2UoKS50aGVuKCh1cGxvYWRJbmZvKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hcHBseUltYWdlU3JjKHVwbG9hZEluZm8uZG93bmxvYWRVUkwsIHtcbiAgICAgICAgICAgICAgICBwYXRoOiB1cGxvYWRJbmZvLnBhdGhcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNob3dQYW5lbCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmltYWdlU3JjUGxhY2Vob2xkZXJSZWYpIHtcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VTcmNQbGFjZWhvbGRlclJlZiA9IHRoaXMubmd4U3RpY2t5TW9kYWxTZXJ2aWNlLm9wZW4oe1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudDogSW5wdXRDb250ZXh0Q29tcG9uZW50LFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uU3RyYXRlZ3k6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogU3RpY2t5UG9zaXRpb25TdHJhdGVneS5mbGV4aWJsZUNvbm5lY3RlZCxcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVsYXRpdmVUbzogdGhpcy5lbC5uYXRpdmVFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5ZOiAnYm90dG9tJyxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVg6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5WTogJ3RvcCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXJcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmltYWdlU3JjUGxhY2Vob2xkZXJSZWYucmVzdWx0LnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VTcmNQbGFjZWhvbGRlclJlZiA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnNyYykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGx5SW1hZ2VTcmMocmVzdWx0LnNyYyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBseUltYWdlRmlsZShyZXN1bHQuZmlsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VTcmNQbGFjZWhvbGRlclJlZiA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzQmFzZTY0KHN0cjogc3RyaW5nKSB7XG4gICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKC9eZGF0YTppbWFnZVxcLyhwbmd8anBnfGpwZWcpO2Jhc2U2NCwvLCAnJyk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBidG9hKGF0b2Ioc3RyKSkgPT09IHN0cjtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHVwbG9hZEltYWdlKCk6IFByb21pc2U8SVdhbGxGaWxlVXBsb2FkZXJSZXN1bHQ+IHtcbiAgICAgICAgaWYgKCF0aGlzLndhbGxGaWxlVXBsb2FkZXIuY2FuVXBsb2FkRmlsZSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZpbGVOYW1lID0gKG5ldyBHdWlkKCkpLmdldCgpO1xuICAgICAgICBjb25zdCBpbWdGaWxlID0gKG5ldyBCYXNlNjRUb0ZpbGUodGhpcy5zY29wZS5zcmMsIGZpbGVOYW1lKSkuZ2V0RmlsZSgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLndhbGxGaWxlVXBsb2FkZXIudXBsb2FkKHRoaXMuaWQsIGltZ0ZpbGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0VXBJbWFnZVdpZHRoKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2FkSW1hZ2UodGhpcy5zY29wZS5zcmMpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zY29wZS53aWR0aCA9IHRoaXMuaW1hZ2UubmF0aXZlRWxlbWVudC53aWR0aDtcblxuICAgICAgICAgICAgdGhpcy5zYXZlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2F2ZSgpIHtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMuZW1pdCh0aGlzLnNjb3BlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvYWRJbWFnZShzcmM6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0ltYWdlKHNyYyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0ltYWdlKHNyYyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG5cbiAgICAgICAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaW1nLm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpbWcuc3JjID0gc3JjO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=