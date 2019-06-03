/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Component, ComponentFactoryResolver, ElementRef, Input, NgZone } from '@angular/core';
import { StickyModalService, StickyPositionStrategy } from 'ngx-sticky-modal';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { ImgEncoder } from '../../../modules/utils/img-encoder.service';
import { NodeTreeSplit } from '../../../modules/utils/node-tree-split';
import { TreeNodeTraverse } from '../../../modules/utils/node/tree-node-traverse';
import { BaseTextBrickComponent } from '../../base-text-brick/base-text-brick.component';
import { BricksListComponent } from '../bricks-list/bricks-list.component';
import { TextContextMenuComponent } from '../text-context-menu/text-context-menu.component';
import { DIVIDER_BRICK_TAG } from '../../divider-brick/divider-brick.constant';
import { getModalConfig } from '../../base-brick/base-brick.component';
export class TextBrickComponent extends BaseTextBrickComponent {
    /**
     * @param {?} zone
     * @param {?} ngxStickyModalService
     * @param {?} cd
     * @param {?} componentFactoryResolver
     * @param {?} el
     */
    constructor(zone, ngxStickyModalService, cd, componentFactoryResolver, el) {
        super();
        this.zone = zone;
        this.ngxStickyModalService = ngxStickyModalService;
        this.cd = cd;
        this.componentFactoryResolver = componentFactoryResolver;
        this.el = el;
        this.placeholder = null;
        this.up$ = new Subject();
        this.down$ = new Subject();
        this.enter$ = new Subject();
        this.selectedTag$ = new Subject();
        this.subscriptions = [];
        this.api = {
            bold: this.bold.bind(this),
            italic: this.italic.bind(this),
            createLink: this.createLink.bind(this),
            changeLinkUrl: this.changeLinkUrl.bind(this),
            isLinkSelected: this.isLinkSelected.bind(this),
            getSelectedLinkHref: this.getSelectedLinkHref.bind(this),
            saveSelection: this.saveSelection.bind(this),
            restoreSelection: this.restoreSelection.bind(this),
            unlink: this.unlink.bind(this)
        };
        this.selectedTag$.subscribe((/**
         * @param {?} newTag
         * @return {?}
         */
        (newTag) => {
            if (newTag) {
                this.hideBricksList();
                this.wallModel.api.core.turnBrickInto(this.id, newTag);
                if (newTag === DIVIDER_BRICK_TAG) {
                    this.wallModel.api.core.addBrickAfterBrickId(this.id, 'text');
                }
            }
        }));
        this.subscriptions.push(
        // show sub-menu for selected text
        fromEvent(this.el.nativeElement, 'mouseup')
            .pipe(filter((/**
         * @return {?}
         */
        () => Boolean(this.scope.text.length))), debounceTime(500), filter((/**
         * @return {?}
         */
        () => this.el.nativeElement.contains(window.getSelection().anchorNode))))
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            this.onTextSelection();
        })));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        super.ngOnDestroy();
        this.subscriptions.forEach((/**
         * @param {?} subscription
         * @return {?}
         */
        (subscription) => {
            subscription.unsubscribe();
        }));
    }
    /**
     * @return {?}
     */
    onBlur() {
        this.placeholder = null;
    }
    /**
     * @return {?}
     */
    onFocus() {
        this.placeholder = 'Type \'/\' for commands';
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onKeyPress(e) {
        super.onKeyPress(e);
        this.hideContextMenuModal();
    }
    // open the link in new window
    /**
     * @param {?} event
     * @return {?}
     */
    onClick(event) {
        /** @type {?} */
        const target = (/** @type {?} */ (event.target));
        if (this.isHTMLElement(target)) {
            if (target.tagName === 'A') {
                window.open(target.getAttribute('href'), '_blank');
            }
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    topKeyPressed(e) {
        if (this.brickSelectionModalRef) {
            e.preventDefault();
            e.stopPropagation();
            this.up$.next();
        }
        else {
            super.topKeyPressed(e);
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    bottomKeyPressed(e) {
        if (this.brickSelectionModalRef) {
            e.preventDefault();
            e.stopPropagation();
            this.down$.next();
        }
        else {
            super.bottomKeyPressed(e);
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    enterKeyPressed(e) {
        if (this.brickSelectionModalRef) {
            this.enter$.next();
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.hideBricksList();
            }), 10);
        }
        else {
            if (this.isTag()) {
                /** @type {?} */
                const newTag = this.scope.text.slice(1);
                this.wallModel.api.core.turnBrickInto(this.id, newTag);
                // d - divider tag
                if (newTag === 'd') {
                    this.wallModel.api.core.addBrickAfterBrickId(this.id, 'text');
                }
            }
            else {
                super.enterKeyPressed(e);
            }
        }
    }
    /**
     * @param {?} offset
     * @param {?} target
     * @return {?}
     */
    getSplittedText(offset, target) {
        /** @type {?} */
        const nodeTreeSplit = new NodeTreeSplit(this.editor.nativeElement, target, offset);
        return {
            left: nodeTreeSplit.leftTree.innerHTML,
            right: nodeTreeSplit.rightTree.innerHTML
        };
    }
    /**
     * @param {?} e
     * @return {?}
     */
    escapeKeyPressed(e) {
        if (this.brickSelectionModalRef) {
            e.preventDefault();
            e.stopPropagation();
            this.hideBricksList();
        }
    }
    /**
     * @return {?}
     */
    onTextChange() {
        super.onTextChange();
        if (this.brickSelectionModalRef) {
            if (!this.scope.text.length) {
                this.hideBricksList();
            }
        }
        else if (this.scope.text[0] === '/' && this.scope.text.length === 1) {
            this.openBricksListModal();
        }
    }
    /**
     * @return {?}
     */
    openBricksListModal() {
        this.editor.nativeElement.blur();
        /** @type {?} */
        const modalConfig = getModalConfig(this.el, this.componentFactoryResolver, BricksListComponent);
        modalConfig.data = {
            text$: this.textChange,
            up$: this.up$,
            down$: this.down$,
            enter$: this.enter$,
            selectedTag$: this.selectedTag$
        };
        this.brickSelectionModalRef = this.ngxStickyModalService.open(modalConfig);
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.editor.nativeElement.focus();
        }));
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onPaste(e) {
        /** @type {?} */
        const imageDataTransferItem = this.extractImageDataTransferItem(e.clipboardData.items);
        if (imageDataTransferItem) {
            e.preventDefault();
            (new ImgEncoder(imageDataTransferItem.getAsFile())).getBase64Representation().then((/**
             * @param {?} imgBase64
             * @return {?}
             */
            (imgBase64) => {
                this.wallModel.api.core.turnBrickInto(this.id, 'image', {
                    src: imgBase64
                });
            }));
        }
        else {
            super.onPaste(e);
        }
    }
    /**
     * @return {?}
     */
    onTextSelection() {
        if (!this.contextMenuModalRef) {
            /** @type {?} */
            const selection = window.getSelection();
            if (!selection.isCollapsed) {
                this.showContextModal();
            }
        }
    }
    // API
    /**
     * @return {?}
     */
    bold() {
        document.execCommand('bold', false);
    }
    /**
     * @return {?}
     */
    italic() {
        document.execCommand('italic', false);
    }
    /**
     * @param {?} url
     * @return {?}
     */
    createLink(url) {
        document.execCommand('createLink', false, url);
    }
    /**
     * @return {?}
     */
    getSelectedLinkHref() {
        if (this.selectionInfo.selectedLink) {
            return this.selectionInfo.selectedLink.getAttribute('href');
        }
    }
    /**
     * @return {?}
     */
    unlink() {
        document.execCommand('unlink', false);
    }
    /**
     * @param {?} url
     * @return {?}
     */
    changeLinkUrl(url) {
        if (this.selectionInfo.selectedLink) {
            this.selectionInfo.selectedLink.setAttribute('href', url);
            this.triggerEditorChange();
        }
    }
    /**
     * @return {?}
     */
    isLinkSelected() {
        return Boolean(this.selectionInfo && this.selectionInfo.selectedLink);
    }
    /**
     * @return {?}
     */
    saveSelection() {
        this.selectionInfo = {
            selectedLink: this.getSelectedLink(),
            ranges: this.getSelectedRanges()
        };
    }
    /**
     * @return {?}
     */
    restoreSelection() {
        /** @type {?} */
        const sel = window.getSelection();
        sel.removeAllRanges();
        for (let i = 0, len = this.selectionInfo.ranges.length; i < len; ++i) {
            sel.addRange(this.selectionInfo.ranges[i]);
        }
    }
    // end API
    /**
     * @private
     * @return {?}
     */
    getSelectedLink() {
        /** @type {?} */
        const selection = window.getSelection();
        /** @type {?} */
        let anchorNodeLink;
        /** @type {?} */
        let focusNodeLink;
        /** @type {?} */
        const isAnchorNodeBelongToBrick = this.el.nativeElement.contains(selection.anchorNode);
        /** @type {?} */
        const isFocusNodeBelongToBrick = this.el.nativeElement.contains(selection.focusNode);
        if (isAnchorNodeBelongToBrick) {
            anchorNodeLink = this.findParentLink(selection.anchorNode);
        }
        if (isFocusNodeBelongToBrick) {
            focusNodeLink = this.findParentLink(selection.focusNode);
        }
        if (anchorNodeLink) {
            return anchorNodeLink;
        }
        else if (focusNodeLink) {
            return focusNodeLink;
        }
        else if (selection.anchorNode !== selection.focusNode &&
            isFocusNodeBelongToBrick && isAnchorNodeBelongToBrick) {
            return this.findLinkBetweenNodes(selection.anchorNode, selection.focusNode);
        }
    }
    /**
     * @private
     * @return {?}
     */
    triggerEditorChange() {
        this.editor.nativeElement.dispatchEvent(new Event('input'));
    }
    /**
     * @private
     * @return {?}
     */
    showContextModal() {
        this.editor.nativeElement.blur();
        /** @type {?} */
        const sel = window.getSelection();
        /** @type {?} */
        const elementBoundingRect = sel.getRangeAt(0).getBoundingClientRect();
        this.contextMenuModalRef = this.ngxStickyModalService.open({
            component: TextContextMenuComponent,
            data: {
                api: this.api
            },
            positionStrategy: {
                name: StickyPositionStrategy.coordinate,
                options: {
                    clientX: elementBoundingRect.left + ((elementBoundingRect.right - elementBoundingRect.left) / 2.5),
                    clientY: elementBoundingRect.top - 35
                }
            },
            overlayConfig: {
                hasBackdrop: false
            },
            componentFactoryResolver: this.componentFactoryResolver
        });
        this.contextMenuModalRef.result.then((/**
         * @return {?}
         */
        () => {
            this.hideContextMenuModal();
        }), (/**
         * @return {?}
         */
        () => {
            this.hideContextMenuModal();
        }));
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.editor.nativeElement.focus();
        }));
    }
    // todo: might be as util method
    /**
     * @private
     * @return {?}
     */
    getSelectedRanges() {
        /** @type {?} */
        const sel = window.getSelection();
        /** @type {?} */
        const ranges = [];
        for (let i = 0, len = sel.rangeCount; i < len; ++i) {
            ranges.push(sel.getRangeAt(i));
        }
        return ranges;
    }
    /**
     * @private
     * @param {?} items
     * @return {?}
     */
    extractImageDataTransferItem(items) {
        /** @type {?} */
        let index;
        for (index in items) {
            if (items.hasOwnProperty(index)) {
                /** @type {?} */
                const item = items[index];
                if (item.kind === 'file') {
                    return item;
                }
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    isTag() {
        return this.scope.text && this.scope.text[0] === '/' &&
            this.wallModel.api.core.isRegisteredBrick(this.scope.text.slice(1));
    }
    /**
     * @private
     * @return {?}
     */
    hideBricksList() {
        if (this.brickSelectionModalRef) {
            this.brickSelectionModalRef.close();
            this.brickSelectionModalRef = null;
        }
    }
    /**
     * @private
     * @return {?}
     */
    hideContextMenuModal() {
        if (this.contextMenuModalRef) {
            this.contextMenuModalRef.close();
            this.contextMenuModalRef = null;
        }
    }
    /**
     * @private
     * @param {?} node
     * @return {?}
     */
    findParentLink(node) {
        /** @type {?} */
        let currentNode = node;
        /** @type {?} */
        let linkNode = null;
        while (!linkNode && currentNode !== this.el.nativeElement) {
            if (((/** @type {?} */ (currentNode))).tagName === 'A') {
                linkNode = currentNode;
            }
            currentNode = currentNode.parentElement;
        }
        return linkNode;
    }
    /**
     * @private
     * @param {?} nodeA
     * @param {?} nodeB
     * @return {?}
     */
    findLinkBetweenNodes(nodeA, nodeB) {
        /** @type {?} */
        const treeNodeTraverse = new TreeNodeTraverse(this.editor.nativeElement);
        /** @type {?} */
        const orderedNodes = treeNodeTraverse.getPostPreOrderNodes();
        /** @type {?} */
        let nodeAIndex = orderedNodes.indexOf(nodeA);
        /** @type {?} */
        let nodeBIndex = orderedNodes.indexOf(nodeB);
        if (nodeBIndex < nodeAIndex) {
            /** @type {?} */
            const temp = nodeBIndex;
            nodeBIndex = nodeAIndex;
            nodeAIndex = temp;
        }
        /** @type {?} */
        const orderedNodesBetweenNodes = orderedNodes.slice(nodeAIndex, nodeBIndex);
        /** @type {?} */
        const linkNodes = orderedNodesBetweenNodes.filter((/**
         * @param {?} node
         * @return {?}
         */
        (node) => {
            if (this.isHTMLElement(node)) {
                return node.tagName === 'A';
            }
        }));
        return (/** @type {?} */ (linkNodes[0]));
    }
    /**
     * @private
     * @param {?} node
     * @return {?}
     */
    isHTMLElement(node) {
        return ((/** @type {?} */ (node))).querySelector !== undefined;
    }
}
TextBrickComponent.decorators = [
    { type: Component, args: [{
                selector: 'text-brick',
                template: "<p #editor\n   attr.placeholder=\"{{placeholder}}\"\n   (input)=\"onTextChange()\"\n   [(ngModel)]=\"scope.text\"\n   (keydown)=\"onKeyPress($event)\"\n   (click)=\"onClick($event)\"\n   class=\"text-brick__editor\"\n   [ngClass]=\"'text-brick-tabs-' + scope.tabs\"\n   (blur)=\"onBlur()\"\n   (focus)=\"onFocus()\"\n   contenteditable\n   [propValueAccessor]=\"'innerHTML'\">\n</p>\n<!--<mat-icon *ngIf=\"!brickSelectionModalRef\" (click)=\"openBricksListModal()\">add_box</mat-icon>-->\n",
                styles: [":host{display:block}:host .text-brick__editor{word-break:break-all;padding:3px 2px;line-height:1.4;margin:0;box-sizing:content-box}:host .text-brick__editor:focus{outline:0}:host [contenteditable]:empty:before{content:attr(placeholder)}:host .text-brick-tabs-1{margin-left:1.5rem}:host .text-brick-tabs-2{margin-left:3rem}:host .text-brick-tabs-3{margin-left:4.5rem}"]
            }] }
];
/** @nocollapse */
TextBrickComponent.ctorParameters = () => [
    { type: NgZone },
    { type: StickyModalService },
    { type: ChangeDetectorRef },
    { type: ComponentFactoryResolver },
    { type: ElementRef }
];
TextBrickComponent.propDecorators = {
    wallModel: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    TextBrickComponent.prototype.wallModel;
    /** @type {?} */
    TextBrickComponent.prototype.placeholder;
    /** @type {?} */
    TextBrickComponent.prototype.brickSelectionModalRef;
    /** @type {?} */
    TextBrickComponent.prototype.contextMenuModalRef;
    /** @type {?} */
    TextBrickComponent.prototype.up$;
    /** @type {?} */
    TextBrickComponent.prototype.down$;
    /** @type {?} */
    TextBrickComponent.prototype.enter$;
    /** @type {?} */
    TextBrickComponent.prototype.selectedTag$;
    /** @type {?} */
    TextBrickComponent.prototype.subscriptions;
    /** @type {?} */
    TextBrickComponent.prototype.selectionInfo;
    /** @type {?} */
    TextBrickComponent.prototype.api;
    /**
     * @type {?}
     * @private
     */
    TextBrickComponent.prototype.zone;
    /**
     * @type {?}
     * @private
     */
    TextBrickComponent.prototype.ngxStickyModalService;
    /**
     * @type {?}
     * @private
     */
    TextBrickComponent.prototype.cd;
    /**
     * @type {?}
     * @private
     */
    TextBrickComponent.prototype.componentFactoryResolver;
    /**
     * @type {?}
     * @private
     */
    TextBrickComponent.prototype.el;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1icmljay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9icmlja3MvdGV4dC1icmljay9jb21wb25lbnQvdGV4dC1icmljay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsd0JBQXdCLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBQ25JLE9BQU8sRUFBaUIsa0JBQWtCLEVBQUUsc0JBQXNCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUM1RixPQUFPLEVBQUMsU0FBUyxFQUFFLE9BQU8sRUFBZSxNQUFNLE1BQU0sQ0FBQztBQUN0RCxPQUFPLEVBQUMsWUFBWSxFQUFFLE1BQU0sRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSw0Q0FBNEMsQ0FBQztBQUN0RSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sd0NBQXdDLENBQUM7QUFDckUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sZ0RBQWdELENBQUM7QUFDaEYsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0saURBQWlELENBQUM7QUFDdkYsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFFekUsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sa0RBQWtELENBQUM7QUFFMUYsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFDN0UsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHVDQUF1QyxDQUFDO0FBT3JFLE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxzQkFBc0I7Ozs7Ozs7O0lBZ0MxRCxZQUFvQixJQUFZLEVBQ1oscUJBQXlDLEVBQ3pDLEVBQXFCLEVBQ3JCLHdCQUFrRCxFQUNsRCxFQUFjO1FBQzlCLEtB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QUFHLFVBQVUsQ0FBQztZQUN4QixVQUFVLEdBQUcsSUFBSSxDQUFDO1NBQ3JCOztjQUVLLHdCQUF3QixHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQzs7Y0FFckUsU0FBUyxHQUFHLHdCQUF3QixDQUFDLE1BQU07Ozs7UUFBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3ZELElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDMUIsT0FBTyxJQUFJLENBQUMsT0FBTyxLQUFLLEdBQUcsQ0FBQzthQUMvQjtRQUNMLENBQUMsRUFBQztRQUVGLE9BQU8sbUJBQUEsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFlLENBQUM7SUFDdkMsQ0FBQzs7Ozs7O0lBRU8sYUFBYSxDQUFDLElBQXdCO1FBQzFDLE9BQU8sQ0FBQyxtQkFBQSxJQUFJLEVBQWUsQ0FBQyxDQUFDLGFBQWEsS0FBSyxTQUFTLENBQUM7SUFDN0QsQ0FBQzs7O1lBcmJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsWUFBWTtnQkFDdEIscWZBQTBDOzthQUU3Qzs7OztZQW5Ca0YsTUFBTTtZQUNqRSxrQkFBa0I7WUFEbEMsaUJBQWlCO1lBQWEsd0JBQXdCO1lBQUUsVUFBVTs7O3dCQXFCckUsS0FBSzs7OztJQUFOLHVDQUErQjs7SUFFL0IseUNBQW1COztJQUVuQixvREFBdUM7O0lBQ3ZDLGlEQUFvQzs7SUFFcEMsaUNBQW9COztJQUNwQixtQ0FBc0I7O0lBQ3RCLG9DQUF1Qjs7SUFDdkIsMENBQThDOztJQUU5QywyQ0FBbUM7O0lBRW5DLDJDQUdFOztJQUVGLGlDQVVFOzs7OztJQUVVLGtDQUFvQjs7Ozs7SUFDcEIsbURBQWlEOzs7OztJQUNqRCxnQ0FBNkI7Ozs7O0lBQzdCLHNEQUEwRDs7Ozs7SUFDMUQsZ0NBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIEVsZW1lbnRSZWYsIElucHV0LCBOZ1pvbmUsIE9uRGVzdHJveSwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3RpY2t5TW9kYWxSZWYsIFN0aWNreU1vZGFsU2VydmljZSwgU3RpY2t5UG9zaXRpb25TdHJhdGVneX0gZnJvbSAnbmd4LXN0aWNreS1tb2RhbCc7XG5pbXBvcnQge2Zyb21FdmVudCwgU3ViamVjdCwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZGVib3VuY2VUaW1lLCBmaWx0ZXJ9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7SW1nRW5jb2Rlcn0gZnJvbSAnLi4vLi4vLi4vbW9kdWxlcy91dGlscy9pbWctZW5jb2Rlci5zZXJ2aWNlJztcbmltcG9ydCB7Tm9kZVRyZWVTcGxpdH0gZnJvbSAnLi4vLi4vLi4vbW9kdWxlcy91dGlscy9ub2RlLXRyZWUtc3BsaXQnO1xuaW1wb3J0IHtUcmVlTm9kZVRyYXZlcnNlfSBmcm9tICcuLi8uLi8uLi9tb2R1bGVzL3V0aWxzL25vZGUvdHJlZS1ub2RlLXRyYXZlcnNlJztcbmltcG9ydCB7QmFzZVRleHRCcmlja0NvbXBvbmVudH0gZnJvbSAnLi4vLi4vYmFzZS10ZXh0LWJyaWNrL2Jhc2UtdGV4dC1icmljay5jb21wb25lbnQnO1xuaW1wb3J0IHtCcmlja3NMaXN0Q29tcG9uZW50fSBmcm9tICcuLi9icmlja3MtbGlzdC9icmlja3MtbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHtJVGV4dEJyaWNrQXBpfSBmcm9tICcuLi90ZXh0LWJyaWNrLWFwaS5pbnRlcmZhY2UnO1xuaW1wb3J0IHtUZXh0Q29udGV4dE1lbnVDb21wb25lbnR9IGZyb20gJy4uL3RleHQtY29udGV4dC1tZW51L3RleHQtY29udGV4dC1tZW51LmNvbXBvbmVudCc7XG5pbXBvcnQge0lXYWxsTW9kZWx9IGZyb20gJy4uLy4uLy4uL3dhbGwvbW9kZWwvaW50ZXJmYWNlcy93YWxsLW1vZGVsLmludGVyZmFjZSc7XG5pbXBvcnQge0RJVklERVJfQlJJQ0tfVEFHfSBmcm9tICcuLi8uLi9kaXZpZGVyLWJyaWNrL2RpdmlkZXItYnJpY2suY29uc3RhbnQnO1xuaW1wb3J0IHtnZXRNb2RhbENvbmZpZ30gZnJvbSAnLi4vLi4vYmFzZS1icmljay9iYXNlLWJyaWNrLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndGV4dC1icmljaycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3RleHQtYnJpY2suY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3RleHQtYnJpY2suY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBUZXh0QnJpY2tDb21wb25lbnQgZXh0ZW5kcyBCYXNlVGV4dEJyaWNrQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIElUZXh0QnJpY2tBcGkge1xuICAgIEBJbnB1dCgpIHdhbGxNb2RlbDogSVdhbGxNb2RlbDtcblxuICAgIHBsYWNlaG9sZGVyID0gbnVsbDtcblxuICAgIGJyaWNrU2VsZWN0aW9uTW9kYWxSZWY6IFN0aWNreU1vZGFsUmVmO1xuICAgIGNvbnRleHRNZW51TW9kYWxSZWY6IFN0aWNreU1vZGFsUmVmO1xuXG4gICAgdXAkID0gbmV3IFN1YmplY3QoKTtcbiAgICBkb3duJCA9IG5ldyBTdWJqZWN0KCk7XG4gICAgZW50ZXIkID0gbmV3IFN1YmplY3QoKTtcbiAgICBzZWxlY3RlZFRhZyQ6IFN1YmplY3Q8c3RyaW5nPiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgICBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gICAgc2VsZWN0aW9uSW5mbzoge1xuICAgICAgICByYW5nZXM6IFJhbmdlW10sXG4gICAgICAgIHNlbGVjdGVkTGluazogSFRNTEVsZW1lbnRcbiAgICB9O1xuXG4gICAgYXBpOiBJVGV4dEJyaWNrQXBpID0ge1xuICAgICAgICBib2xkOiB0aGlzLmJvbGQuYmluZCh0aGlzKSxcbiAgICAgICAgaXRhbGljOiB0aGlzLml0YWxpYy5iaW5kKHRoaXMpLFxuICAgICAgICBjcmVhdGVMaW5rOiB0aGlzLmNyZWF0ZUxpbmsuYmluZCh0aGlzKSxcbiAgICAgICAgY2hhbmdlTGlua1VybDogdGhpcy5jaGFuZ2VMaW5rVXJsLmJpbmQodGhpcyksXG4gICAgICAgIGlzTGlua1NlbGVjdGVkOiB0aGlzLmlzTGlua1NlbGVjdGVkLmJpbmQodGhpcyksXG4gICAgICAgIGdldFNlbGVjdGVkTGlua0hyZWY6IHRoaXMuZ2V0U2VsZWN0ZWRMaW5rSHJlZi5iaW5kKHRoaXMpLFxuICAgICAgICBzYXZlU2VsZWN0aW9uOiB0aGlzLnNhdmVTZWxlY3Rpb24uYmluZCh0aGlzKSxcbiAgICAgICAgcmVzdG9yZVNlbGVjdGlvbjogdGhpcy5yZXN0b3JlU2VsZWN0aW9uLmJpbmQodGhpcyksXG4gICAgICAgIHVubGluazogdGhpcy51bmxpbmsuYmluZCh0aGlzKVxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHpvbmU6IE5nWm9uZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIG5neFN0aWNreU1vZGFsU2VydmljZTogU3RpY2t5TW9kYWxTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZikge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUYWckLnN1YnNjcmliZSgobmV3VGFnKSA9PiB7XG4gICAgICAgICAgICBpZiAobmV3VGFnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlQnJpY2tzTGlzdCgpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy53YWxsTW9kZWwuYXBpLmNvcmUudHVybkJyaWNrSW50byh0aGlzLmlkLCBuZXdUYWcpO1xuXG4gICAgICAgICAgICAgICAgaWYgKG5ld1RhZyA9PT0gRElWSURFUl9CUklDS19UQUcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YWxsTW9kZWwuYXBpLmNvcmUuYWRkQnJpY2tBZnRlckJyaWNrSWQodGhpcy5pZCwgJ3RleHQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgICAgICAgLy8gc2hvdyBzdWItbWVudSBmb3Igc2VsZWN0ZWQgdGV4dFxuICAgICAgICAgICAgZnJvbUV2ZW50KHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ21vdXNldXAnKVxuICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXIoKCkgPT4gQm9vbGVhbih0aGlzLnNjb3BlLnRleHQubGVuZ3RoKSksXG4gICAgICAgICAgICAgICAgICAgIGRlYm91bmNlVGltZSg1MDApLFxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXIoKCkgPT4gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5hbmNob3JOb2RlKSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25UZXh0U2VsZWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcblxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaCgoc3Vic2NyaXB0aW9uKSA9PiB7XG4gICAgICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25CbHVyKCkge1xuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBvbkZvY3VzKCkge1xuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyID0gJ1R5cGUgXFwnL1xcJyBmb3IgY29tbWFuZHMnO1xuICAgIH1cblxuICAgIG9uS2V5UHJlc3MoZTogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBzdXBlci5vbktleVByZXNzKGUpO1xuXG4gICAgICAgIHRoaXMuaGlkZUNvbnRleHRNZW51TW9kYWwoKTtcbiAgICB9XG5cbiAgICAvLyBvcGVuIHRoZSBsaW5rIGluIG5ldyB3aW5kb3dcbiAgICBvbkNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBOb2RlO1xuXG4gICAgICAgIGlmICh0aGlzLmlzSFRNTEVsZW1lbnQodGFyZ2V0KSkge1xuICAgICAgICAgICAgaWYgKHRhcmdldC50YWdOYW1lID09PSAnQScpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cub3Blbih0YXJnZXQuZ2V0QXR0cmlidXRlKCdocmVmJyksICdfYmxhbmsnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvcEtleVByZXNzZWQoZTogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5icmlja1NlbGVjdGlvbk1vZGFsUmVmKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICB0aGlzLnVwJC5uZXh0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdXBlci50b3BLZXlQcmVzc2VkKGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYm90dG9tS2V5UHJlc3NlZChlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmJyaWNrU2VsZWN0aW9uTW9kYWxSZWYpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgIHRoaXMuZG93biQubmV4dCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3VwZXIuYm90dG9tS2V5UHJlc3NlZChlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVudGVyS2V5UHJlc3NlZChlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmJyaWNrU2VsZWN0aW9uTW9kYWxSZWYpIHtcbiAgICAgICAgICAgIHRoaXMuZW50ZXIkLm5leHQoKTtcblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlQnJpY2tzTGlzdCgpO1xuICAgICAgICAgICAgfSwgMTApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNUYWcoKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1RhZyA9IHRoaXMuc2NvcGUudGV4dC5zbGljZSgxKTtcblxuICAgICAgICAgICAgICAgIHRoaXMud2FsbE1vZGVsLmFwaS5jb3JlLnR1cm5Ccmlja0ludG8odGhpcy5pZCwgbmV3VGFnKTtcblxuICAgICAgICAgICAgICAgIC8vIGQgLSBkaXZpZGVyIHRhZ1xuICAgICAgICAgICAgICAgIGlmIChuZXdUYWcgPT09ICdkJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkuY29yZS5hZGRCcmlja0FmdGVyQnJpY2tJZCh0aGlzLmlkLCAndGV4dCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3VwZXIuZW50ZXJLZXlQcmVzc2VkKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0U3BsaXR0ZWRUZXh0KG9mZnNldDogbnVtYmVyLCB0YXJnZXQ6IE5vZGUpOiB7IGxlZnQ6IHN0cmluZywgcmlnaHQ6IHN0cmluZyB9IHtcbiAgICAgICAgY29uc3Qgbm9kZVRyZWVTcGxpdCA9IG5ldyBOb2RlVHJlZVNwbGl0KHRoaXMuZWRpdG9yLm5hdGl2ZUVsZW1lbnQsIHRhcmdldCwgb2Zmc2V0KTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGVmdDogbm9kZVRyZWVTcGxpdC5sZWZ0VHJlZS5pbm5lckhUTUwsXG4gICAgICAgICAgICByaWdodDogbm9kZVRyZWVTcGxpdC5yaWdodFRyZWUuaW5uZXJIVE1MXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZXNjYXBlS2V5UHJlc3NlZChlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmJyaWNrU2VsZWN0aW9uTW9kYWxSZWYpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgIHRoaXMuaGlkZUJyaWNrc0xpc3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uVGV4dENoYW5nZSgpIHtcbiAgICAgICAgc3VwZXIub25UZXh0Q2hhbmdlKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuYnJpY2tTZWxlY3Rpb25Nb2RhbFJlZikge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnNjb3BlLnRleHQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlQnJpY2tzTGlzdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2NvcGUudGV4dFswXSA9PT0gJy8nICYmIHRoaXMuc2NvcGUudGV4dC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMub3BlbkJyaWNrc0xpc3RNb2RhbCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb3BlbkJyaWNrc0xpc3RNb2RhbCgpIHtcbiAgICAgICAgdGhpcy5lZGl0b3IubmF0aXZlRWxlbWVudC5ibHVyKCk7XG5cbiAgICAgICAgY29uc3QgbW9kYWxDb25maWcgPSBnZXRNb2RhbENvbmZpZyh0aGlzLmVsLCB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQnJpY2tzTGlzdENvbXBvbmVudCk7XG4gICAgICAgIG1vZGFsQ29uZmlnLmRhdGEgPSB7XG4gICAgICAgICAgICB0ZXh0JDogdGhpcy50ZXh0Q2hhbmdlLFxuICAgICAgICAgICAgdXAkOiB0aGlzLnVwJCxcbiAgICAgICAgICAgIGRvd24kOiB0aGlzLmRvd24kLFxuICAgICAgICAgICAgZW50ZXIkOiB0aGlzLmVudGVyJCxcbiAgICAgICAgICAgIHNlbGVjdGVkVGFnJDogdGhpcy5zZWxlY3RlZFRhZyRcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5icmlja1NlbGVjdGlvbk1vZGFsUmVmID0gdGhpcy5uZ3hTdGlja3lNb2RhbFNlcnZpY2Uub3Blbihtb2RhbENvbmZpZyk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVkaXRvci5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uUGFzdGUoZTogQ2xpcGJvYXJkRXZlbnQpIHtcbiAgICAgICAgY29uc3QgaW1hZ2VEYXRhVHJhbnNmZXJJdGVtID0gdGhpcy5leHRyYWN0SW1hZ2VEYXRhVHJhbnNmZXJJdGVtKGUuY2xpcGJvYXJkRGF0YS5pdGVtcyk7XG5cbiAgICAgICAgaWYgKGltYWdlRGF0YVRyYW5zZmVySXRlbSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAobmV3IEltZ0VuY29kZXIoaW1hZ2VEYXRhVHJhbnNmZXJJdGVtLmdldEFzRmlsZSgpKSkuZ2V0QmFzZTY0UmVwcmVzZW50YXRpb24oKS50aGVuKChpbWdCYXNlNjQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkuY29yZS50dXJuQnJpY2tJbnRvKHRoaXMuaWQsICdpbWFnZScsIHtcbiAgICAgICAgICAgICAgICAgICAgc3JjOiBpbWdCYXNlNjRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3VwZXIub25QYXN0ZShlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uVGV4dFNlbGVjdGlvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbnRleHRNZW51TW9kYWxSZWYpIHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcblxuICAgICAgICAgICAgaWYgKCFzZWxlY3Rpb24uaXNDb2xsYXBzZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dDb250ZXh0TW9kYWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFQSVxuICAgIGJvbGQoKTogdm9pZCB7XG4gICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdib2xkJywgZmFsc2UpO1xuICAgIH1cblxuICAgIGl0YWxpYygpOiB2b2lkIHtcbiAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2l0YWxpYycsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBjcmVhdGVMaW5rKHVybDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjcmVhdGVMaW5rJywgZmFsc2UsIHVybCk7XG4gICAgfVxuXG4gICAgZ2V0U2VsZWN0ZWRMaW5rSHJlZigpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25JbmZvLnNlbGVjdGVkTGluaykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uSW5mby5zZWxlY3RlZExpbmsuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmxpbmsoKTogdm9pZCB7XG4gICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCd1bmxpbmsnLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgY2hhbmdlTGlua1VybCh1cmw6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25JbmZvLnNlbGVjdGVkTGluaykge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25JbmZvLnNlbGVjdGVkTGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCB1cmwpO1xuXG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJFZGl0b3JDaGFuZ2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzTGlua1NlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gQm9vbGVhbih0aGlzLnNlbGVjdGlvbkluZm8gJiYgdGhpcy5zZWxlY3Rpb25JbmZvLnNlbGVjdGVkTGluayk7XG4gICAgfVxuXG4gICAgc2F2ZVNlbGVjdGlvbigpIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25JbmZvID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRMaW5rOiB0aGlzLmdldFNlbGVjdGVkTGluaygpLFxuICAgICAgICAgICAgcmFuZ2VzOiB0aGlzLmdldFNlbGVjdGVkUmFuZ2VzKClcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXN0b3JlU2VsZWN0aW9uKCkge1xuICAgICAgICBjb25zdCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG5cbiAgICAgICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0aGlzLnNlbGVjdGlvbkluZm8ucmFuZ2VzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgICAgICBzZWwuYWRkUmFuZ2UodGhpcy5zZWxlY3Rpb25JbmZvLnJhbmdlc1tpXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBlbmQgQVBJXG5cbiAgICBwcml2YXRlIGdldFNlbGVjdGVkTGluaygpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcblxuICAgICAgICBsZXQgYW5jaG9yTm9kZUxpbms7XG4gICAgICAgIGxldCBmb2N1c05vZGVMaW5rO1xuXG4gICAgICAgIGNvbnN0IGlzQW5jaG9yTm9kZUJlbG9uZ1RvQnJpY2sgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoc2VsZWN0aW9uLmFuY2hvck5vZGUpO1xuICAgICAgICBjb25zdCBpc0ZvY3VzTm9kZUJlbG9uZ1RvQnJpY2sgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoc2VsZWN0aW9uLmZvY3VzTm9kZSk7XG5cbiAgICAgICAgaWYgKGlzQW5jaG9yTm9kZUJlbG9uZ1RvQnJpY2spIHtcbiAgICAgICAgICAgIGFuY2hvck5vZGVMaW5rID0gdGhpcy5maW5kUGFyZW50TGluayhzZWxlY3Rpb24uYW5jaG9yTm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGb2N1c05vZGVCZWxvbmdUb0JyaWNrKSB7XG4gICAgICAgICAgICBmb2N1c05vZGVMaW5rID0gdGhpcy5maW5kUGFyZW50TGluayhzZWxlY3Rpb24uZm9jdXNOb2RlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhbmNob3JOb2RlTGluaykge1xuICAgICAgICAgICAgcmV0dXJuIGFuY2hvck5vZGVMaW5rO1xuICAgICAgICB9IGVsc2UgaWYgKGZvY3VzTm9kZUxpbmspIHtcbiAgICAgICAgICAgIHJldHVybiBmb2N1c05vZGVMaW5rO1xuICAgICAgICB9IGVsc2UgaWYgKHNlbGVjdGlvbi5hbmNob3JOb2RlICE9PSBzZWxlY3Rpb24uZm9jdXNOb2RlICYmXG4gICAgICAgICAgICBpc0ZvY3VzTm9kZUJlbG9uZ1RvQnJpY2sgJiYgaXNBbmNob3JOb2RlQmVsb25nVG9Ccmljaykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmluZExpbmtCZXR3ZWVuTm9kZXMoc2VsZWN0aW9uLmFuY2hvck5vZGUsIHNlbGVjdGlvbi5mb2N1c05vZGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0cmlnZ2VyRWRpdG9yQ2hhbmdlKCkge1xuICAgICAgICB0aGlzLmVkaXRvci5uYXRpdmVFbGVtZW50LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdpbnB1dCcpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dDb250ZXh0TW9kYWwoKSB7XG4gICAgICAgIHRoaXMuZWRpdG9yLm5hdGl2ZUVsZW1lbnQuYmx1cigpO1xuXG4gICAgICAgIGNvbnN0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcblxuICAgICAgICBjb25zdCBlbGVtZW50Qm91bmRpbmdSZWN0ID0gc2VsLmdldFJhbmdlQXQoMCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgdGhpcy5jb250ZXh0TWVudU1vZGFsUmVmID0gdGhpcy5uZ3hTdGlja3lNb2RhbFNlcnZpY2Uub3Blbih7XG4gICAgICAgICAgICBjb21wb25lbnQ6IFRleHRDb250ZXh0TWVudUNvbXBvbmVudCxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBhcGk6IHRoaXMuYXBpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcG9zaXRpb25TdHJhdGVneToge1xuICAgICAgICAgICAgICAgIG5hbWU6IFN0aWNreVBvc2l0aW9uU3RyYXRlZ3kuY29vcmRpbmF0ZSxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWVudFg6IGVsZW1lbnRCb3VuZGluZ1JlY3QubGVmdCArICgoZWxlbWVudEJvdW5kaW5nUmVjdC5yaWdodCAtIGVsZW1lbnRCb3VuZGluZ1JlY3QubGVmdCkgLyAyLjUpLFxuICAgICAgICAgICAgICAgICAgICBjbGllbnRZOiBlbGVtZW50Qm91bmRpbmdSZWN0LnRvcCAtIDM1XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG92ZXJsYXlDb25maWc6IHtcbiAgICAgICAgICAgICAgICBoYXNCYWNrZHJvcDogZmFsc2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY29udGV4dE1lbnVNb2RhbFJlZi5yZXN1bHQudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmhpZGVDb250ZXh0TWVudU1vZGFsKCk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGlkZUNvbnRleHRNZW51TW9kYWwoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVkaXRvci5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIHRvZG86IG1pZ2h0IGJlIGFzIHV0aWwgbWV0aG9kXG4gICAgcHJpdmF0ZSBnZXRTZWxlY3RlZFJhbmdlcygpOiBSYW5nZVtdIHtcbiAgICAgICAgY29uc3Qgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgICAgICBjb25zdCByYW5nZXMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gc2VsLnJhbmdlQ291bnQ7IGkgPCBsZW47ICsraSkge1xuICAgICAgICAgICAgcmFuZ2VzLnB1c2goc2VsLmdldFJhbmdlQXQoaSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJhbmdlcztcbiAgICB9XG5cbiAgICBwcml2YXRlIGV4dHJhY3RJbWFnZURhdGFUcmFuc2Zlckl0ZW0oaXRlbXM6IERhdGFUcmFuc2Zlckl0ZW1MaXN0KTogRGF0YVRyYW5zZmVySXRlbSB7XG4gICAgICAgIGxldCBpbmRleDtcblxuICAgICAgICBmb3IgKGluZGV4IGluIGl0ZW1zKSB7XG4gICAgICAgICAgICBpZiAoaXRlbXMuaGFzT3duUHJvcGVydHkoaW5kZXgpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IGl0ZW1zW2luZGV4XTtcblxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmtpbmQgPT09ICdmaWxlJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGlzVGFnKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY29wZS50ZXh0ICYmIHRoaXMuc2NvcGUudGV4dFswXSA9PT0gJy8nICYmXG4gICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkuY29yZS5pc1JlZ2lzdGVyZWRCcmljayh0aGlzLnNjb3BlLnRleHQuc2xpY2UoMSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGlkZUJyaWNrc0xpc3QoKSB7XG4gICAgICAgIGlmICh0aGlzLmJyaWNrU2VsZWN0aW9uTW9kYWxSZWYpIHtcbiAgICAgICAgICAgIHRoaXMuYnJpY2tTZWxlY3Rpb25Nb2RhbFJlZi5jbG9zZSgpO1xuXG4gICAgICAgICAgICB0aGlzLmJyaWNrU2VsZWN0aW9uTW9kYWxSZWYgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoaWRlQ29udGV4dE1lbnVNb2RhbCgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGV4dE1lbnVNb2RhbFJlZikge1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0TWVudU1vZGFsUmVmLmNsb3NlKCk7XG5cbiAgICAgICAgICAgIHRoaXMuY29udGV4dE1lbnVNb2RhbFJlZiA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGZpbmRQYXJlbnRMaW5rKG5vZGU6IE5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBjdXJyZW50Tm9kZTogTm9kZSA9IG5vZGU7XG4gICAgICAgIGxldCBsaW5rTm9kZSA9IG51bGw7XG5cbiAgICAgICAgd2hpbGUgKCFsaW5rTm9kZSAmJiBjdXJyZW50Tm9kZSAhPT0gdGhpcy5lbC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAoKGN1cnJlbnROb2RlIGFzIEhUTUxFbGVtZW50KS50YWdOYW1lID09PSAnQScpIHtcbiAgICAgICAgICAgICAgICBsaW5rTm9kZSA9IGN1cnJlbnROb2RlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbGlua05vZGU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmaW5kTGlua0JldHdlZW5Ob2Rlcyhub2RlQTogTm9kZSwgbm9kZUI6IE5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IHRyZWVOb2RlVHJhdmVyc2UgPSBuZXcgVHJlZU5vZGVUcmF2ZXJzZSh0aGlzLmVkaXRvci5uYXRpdmVFbGVtZW50KTtcblxuICAgICAgICBjb25zdCBvcmRlcmVkTm9kZXMgPSB0cmVlTm9kZVRyYXZlcnNlLmdldFBvc3RQcmVPcmRlck5vZGVzKCk7XG5cbiAgICAgICAgbGV0IG5vZGVBSW5kZXggPSBvcmRlcmVkTm9kZXMuaW5kZXhPZihub2RlQSk7XG4gICAgICAgIGxldCBub2RlQkluZGV4ID0gb3JkZXJlZE5vZGVzLmluZGV4T2Yobm9kZUIpO1xuXG4gICAgICAgIGlmIChub2RlQkluZGV4IDwgbm9kZUFJbmRleCkge1xuICAgICAgICAgICAgY29uc3QgdGVtcCA9IG5vZGVCSW5kZXg7XG5cbiAgICAgICAgICAgIG5vZGVCSW5kZXggPSBub2RlQUluZGV4O1xuICAgICAgICAgICAgbm9kZUFJbmRleCA9IHRlbXA7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvcmRlcmVkTm9kZXNCZXR3ZWVuTm9kZXMgPSBvcmRlcmVkTm9kZXMuc2xpY2Uobm9kZUFJbmRleCwgbm9kZUJJbmRleCk7XG5cbiAgICAgICAgY29uc3QgbGlua05vZGVzID0gb3JkZXJlZE5vZGVzQmV0d2Vlbk5vZGVzLmZpbHRlcigobm9kZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNIVE1MRWxlbWVudChub2RlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBub2RlLnRhZ05hbWUgPT09ICdBJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGxpbmtOb2Rlc1swXSBhcyBIVE1MRWxlbWVudDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzSFRNTEVsZW1lbnQobm9kZTogTm9kZSB8IEhUTUxFbGVtZW50KTogbm9kZSBpcyBIVE1MRWxlbWVudCB7XG4gICAgICAgIHJldHVybiAobm9kZSBhcyBIVE1MRWxlbWVudCkucXVlcnlTZWxlY3RvciAhPT0gdW5kZWZpbmVkO1xuICAgIH1cbn1cbiJdfQ==