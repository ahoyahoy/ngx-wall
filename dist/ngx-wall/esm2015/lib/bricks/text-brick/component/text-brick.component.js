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
            this.editor.nativeElement.blur();
            /** @type {?} */
            const elementBoundingRect = this.el.nativeElement.getBoundingClientRect();
            this.brickSelectionModalRef = this.ngxStickyModalService.open({
                component: BricksListComponent,
                data: {
                    text$: this.textChange,
                    up$: this.up$,
                    down$: this.down$,
                    enter$: this.enter$,
                    selectedTag$: this.selectedTag$
                },
                positionStrategy: {
                    name: StickyPositionStrategy.coordinate,
                    options: {
                        clientX: elementBoundingRect.x,
                        clientY: elementBoundingRect.y + 35
                    }
                },
                componentFactoryResolver: this.componentFactoryResolver
            });
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.editor.nativeElement.focus();
            }));
        }
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
                template: "<p #editor\n   attr.placeholder=\"{{placeholder}}\"\n   (input)=\"onTextChange()\"\n   [(ngModel)]=\"scope.text\"\n   (keydown)=\"onKeyPress($event)\"\n   (click)=\"onClick($event)\"\n   class=\"text-brick__editor\"\n   [ngClass]=\"'text-brick-tabs-' + scope.tabs\"\n   (blur)=\"onBlur()\"\n   (focus)=\"onFocus()\"\n   contenteditable\n   [propValueAccessor]=\"'innerHTML'\">\n</p>\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1icmljay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9icmlja3MvdGV4dC1icmljay9jb21wb25lbnQvdGV4dC1icmljay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsd0JBQXdCLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBQ25JLE9BQU8sRUFBaUIsa0JBQWtCLEVBQUUsc0JBQXNCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUM1RixPQUFPLEVBQUMsU0FBUyxFQUFFLE9BQU8sRUFBZSxNQUFNLE1BQU0sQ0FBQztBQUN0RCxPQUFPLEVBQUMsWUFBWSxFQUFFLE1BQU0sRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSw0Q0FBNEMsQ0FBQztBQUN0RSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sd0NBQXdDLENBQUM7QUFDckUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sZ0RBQWdELENBQUM7QUFDaEYsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0saURBQWlELENBQUM7QUFDdkYsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFFekUsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sa0RBQWtELENBQUM7QUFFMUYsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFPN0UsTUFBTSxPQUFPLGtCQUFtQixTQUFRLHNCQUFzQjs7Ozs7Ozs7SUFnQzFELFlBQW9CLElBQVksRUFDWixxQkFBeUMsRUFDekMsRUFBcUIsRUFDckIsd0JBQWtELEVBQ2xELEVBQWM7UUFDOUIsS0FBSyxFQUFFLENBQUM7UUFMUSxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1osMEJBQXFCLEdBQXJCLHFCQUFxQixDQUFvQjtRQUN6QyxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUNyQiw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBQ2xELE9BQUUsR0FBRixFQUFFLENBQVk7UUFqQ2xDLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBS25CLFFBQUcsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ3BCLFVBQUssR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ3RCLFdBQU0sR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ3ZCLGlCQUFZLEdBQW9CLElBQUksT0FBTyxFQUFFLENBQUM7UUFFOUMsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBT25DLFFBQUcsR0FBa0I7WUFDakIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUMxQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzlCLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDdEMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUM1QyxjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzlDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3hELGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDNUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDbEQsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztTQUNqQyxDQUFDO1FBU0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTOzs7O1FBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNuQyxJQUFJLE1BQU0sRUFBRTtnQkFDUixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBRXRCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFFdkQsSUFBSSxNQUFNLEtBQUssaUJBQWlCLEVBQUU7b0JBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2lCQUNqRTthQUNKO1FBQ0wsQ0FBQyxFQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUk7UUFDbkIsa0NBQWtDO1FBQ2xDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUM7YUFDdEMsSUFBSSxDQUNELE1BQU07OztRQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBQyxFQUM3QyxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQ2pCLE1BQU07OztRQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUMsQ0FDakY7YUFDQSxTQUFTOzs7O1FBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRTtZQUNsQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0IsQ0FBQyxFQUFDLENBQ1QsQ0FBQztJQUNOLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ0osS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3JCLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1AsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRXBCLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTzs7OztRQUFDLENBQUMsWUFBWSxFQUFFLEVBQUU7WUFDeEMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQy9CLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7OztJQUVELE1BQU07UUFDRixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztJQUM1QixDQUFDOzs7O0lBRUQsT0FBTztRQUNILElBQUksQ0FBQyxXQUFXLEdBQUcseUJBQXlCLENBQUM7SUFDakQsQ0FBQzs7Ozs7SUFFRCxVQUFVLENBQUMsQ0FBZ0I7UUFDdkIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVwQixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUNoQyxDQUFDOzs7Ozs7SUFHRCxPQUFPLENBQUMsS0FBaUI7O2NBQ2YsTUFBTSxHQUFHLG1CQUFBLEtBQUssQ0FBQyxNQUFNLEVBQVE7UUFFbkMsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzVCLElBQUksTUFBTSxDQUFDLE9BQU8sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQzthQUN0RDtTQUNKO0lBQ0wsQ0FBQzs7Ozs7SUFFRCxhQUFhLENBQUMsQ0FBZ0I7UUFDMUIsSUFBSSxJQUFJLENBQUMsc0JBQXNCLEVBQUU7WUFDN0IsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ25CLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUVwQixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ25CO2FBQU07WUFDSCxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzFCO0lBQ0wsQ0FBQzs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxDQUFnQjtRQUM3QixJQUFJLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtZQUM3QixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDbkIsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBRXBCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDckI7YUFBTTtZQUNILEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM3QjtJQUNMLENBQUM7Ozs7O0lBRUQsZUFBZSxDQUFDLENBQWdCO1FBQzVCLElBQUksSUFBSSxDQUFDLHNCQUFzQixFQUFFO1lBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFbkIsVUFBVTs7O1lBQUMsR0FBRyxFQUFFO2dCQUNaLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUMxQixDQUFDLEdBQUUsRUFBRSxDQUFDLENBQUM7U0FDVjthQUFNO1lBQ0gsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUU7O3NCQUNSLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUV2QyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBRXZELGtCQUFrQjtnQkFDbEIsSUFBSSxNQUFNLEtBQUssR0FBRyxFQUFFO29CQUNoQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztpQkFDakU7YUFDSjtpQkFBTTtnQkFDSCxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzVCO1NBQ0o7SUFDTCxDQUFDOzs7Ozs7SUFFRCxlQUFlLENBQUMsTUFBYyxFQUFFLE1BQVk7O2NBQ2xDLGFBQWEsR0FBRyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO1FBRWxGLE9BQU87WUFDSCxJQUFJLEVBQUUsYUFBYSxDQUFDLFFBQVEsQ0FBQyxTQUFTO1lBQ3RDLEtBQUssRUFBRSxhQUFhLENBQUMsU0FBUyxDQUFDLFNBQVM7U0FDM0MsQ0FBQztJQUNOLENBQUM7Ozs7O0lBRUQsZ0JBQWdCLENBQUMsQ0FBZ0I7UUFDN0IsSUFBSSxJQUFJLENBQUMsc0JBQXNCLEVBQUU7WUFDN0IsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ25CLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUVwQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDekI7SUFDTCxDQUFDOzs7O0lBRUQsWUFBWTtRQUNSLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVyQixJQUFJLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtZQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUN6QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDekI7U0FDSjthQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDbkUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7O2tCQUUzQixtQkFBbUIsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRTtZQUV6RSxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQztnQkFDMUQsU0FBUyxFQUFFLG1CQUFtQjtnQkFDOUIsSUFBSSxFQUFFO29CQUNGLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVTtvQkFDdEIsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO29CQUNiLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztvQkFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO29CQUNuQixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVk7aUJBQ2xDO2dCQUNELGdCQUFnQixFQUFFO29CQUNkLElBQUksRUFBRSxzQkFBc0IsQ0FBQyxVQUFVO29CQUN2QyxPQUFPLEVBQUU7d0JBQ0wsT0FBTyxFQUFFLG1CQUFtQixDQUFDLENBQUM7d0JBQzlCLE9BQU8sRUFBRSxtQkFBbUIsQ0FBQyxDQUFDLEdBQUcsRUFBRTtxQkFDdEM7aUJBQ0o7Z0JBQ0Qsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLHdCQUF3QjthQUMxRCxDQUFDLENBQUM7WUFFSCxVQUFVOzs7WUFBQyxHQUFHLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdEMsQ0FBQyxFQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7Ozs7O0lBRUQsT0FBTyxDQUFDLENBQWlCOztjQUNmLHFCQUFxQixHQUFHLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztRQUV0RixJQUFJLHFCQUFxQixFQUFFO1lBQ3ZCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUVuQixDQUFDLElBQUksVUFBVSxDQUFDLHFCQUFxQixDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLElBQUk7Ozs7WUFBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO2dCQUM3RixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFO29CQUNwRCxHQUFHLEVBQUUsU0FBUztpQkFDakIsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxFQUFDLENBQUM7U0FDTjthQUFNO1lBQ0gsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNwQjtJQUNMLENBQUM7Ozs7SUFFRCxlQUFlO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRTs7a0JBQ3JCLFNBQVMsR0FBRyxNQUFNLENBQUMsWUFBWSxFQUFFO1lBRXZDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFO2dCQUN4QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzthQUMzQjtTQUNKO0lBQ0wsQ0FBQzs7Ozs7SUFHRCxJQUFJO1FBQ0EsUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDeEMsQ0FBQzs7OztJQUVELE1BQU07UUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMxQyxDQUFDOzs7OztJQUVELFVBQVUsQ0FBQyxHQUFXO1FBQ2xCLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNuRCxDQUFDOzs7O0lBRUQsbUJBQW1CO1FBQ2YsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRTtZQUNqQyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMvRDtJQUNMLENBQUM7Ozs7SUFFRCxNQUFNO1FBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDMUMsQ0FBQzs7Ozs7SUFFRCxhQUFhLENBQUMsR0FBVztRQUNyQixJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFFMUQsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7U0FDOUI7SUFDTCxDQUFDOzs7O0lBRUQsY0FBYztRQUNWLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUMxRSxDQUFDOzs7O0lBRUQsYUFBYTtRQUNULElBQUksQ0FBQyxhQUFhLEdBQUc7WUFDakIsWUFBWSxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDcEMsTUFBTSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtTQUNuQyxDQUFDO0lBQ04sQ0FBQzs7OztJQUVELGdCQUFnQjs7Y0FDTixHQUFHLEdBQUcsTUFBTSxDQUFDLFlBQVksRUFBRTtRQUVqQyxHQUFHLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFdEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFO1lBQ2xFLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM5QztJQUNMLENBQUM7Ozs7OztJQUlPLGVBQWU7O2NBQ2IsU0FBUyxHQUFHLE1BQU0sQ0FBQyxZQUFZLEVBQUU7O1lBRW5DLGNBQWM7O1lBQ2QsYUFBYTs7Y0FFWCx5QkFBeUIsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQzs7Y0FDaEYsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7UUFFcEYsSUFBSSx5QkFBeUIsRUFBRTtZQUMzQixjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDOUQ7UUFFRCxJQUFJLHdCQUF3QixFQUFFO1lBQzFCLGFBQWEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUM1RDtRQUVELElBQUksY0FBYyxFQUFFO1lBQ2hCLE9BQU8sY0FBYyxDQUFDO1NBQ3pCO2FBQU0sSUFBSSxhQUFhLEVBQUU7WUFDdEIsT0FBTyxhQUFhLENBQUM7U0FDeEI7YUFBTSxJQUFJLFNBQVMsQ0FBQyxVQUFVLEtBQUssU0FBUyxDQUFDLFNBQVM7WUFDbkQsd0JBQXdCLElBQUkseUJBQXlCLEVBQUU7WUFDdkQsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDL0U7SUFDTCxDQUFDOzs7OztJQUVPLG1CQUFtQjtRQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNoRSxDQUFDOzs7OztJQUVPLGdCQUFnQjtRQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7Y0FFM0IsR0FBRyxHQUFHLE1BQU0sQ0FBQyxZQUFZLEVBQUU7O2NBRTNCLG1CQUFtQixHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLEVBQUU7UUFFckUsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUM7WUFDdkQsU0FBUyxFQUFFLHdCQUF3QjtZQUNuQyxJQUFJLEVBQUU7Z0JBQ0YsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO2FBQ2hCO1lBQ0QsZ0JBQWdCLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLHNCQUFzQixDQUFDLFVBQVU7Z0JBQ3ZDLE9BQU8sRUFBRTtvQkFDTCxPQUFPLEVBQUUsbUJBQW1CLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO29CQUNsRyxPQUFPLEVBQUUsbUJBQW1CLENBQUMsR0FBRyxHQUFHLEVBQUU7aUJBQ3hDO2FBQ0o7WUFDRCxhQUFhLEVBQUU7Z0JBQ1gsV0FBVyxFQUFFLEtBQUs7YUFDckI7WUFDRCx3QkFBd0IsRUFBRSxJQUFJLENBQUMsd0JBQXdCO1NBQzFELENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsSUFBSTs7O1FBQUMsR0FBRyxFQUFFO1lBQ3RDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQ2hDLENBQUM7OztRQUFFLEdBQUcsRUFBRTtZQUNKLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQ2hDLENBQUMsRUFBQyxDQUFDO1FBRUgsVUFBVTs7O1FBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDdEMsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7Ozs7SUFHTyxpQkFBaUI7O2NBQ2YsR0FBRyxHQUFHLE1BQU0sQ0FBQyxZQUFZLEVBQUU7O2NBQzNCLE1BQU0sR0FBRyxFQUFFO1FBRWpCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUU7WUFDaEQsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbEM7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDOzs7Ozs7SUFFTyw0QkFBNEIsQ0FBQyxLQUEyQjs7WUFDeEQsS0FBSztRQUVULEtBQUssS0FBSyxJQUFJLEtBQUssRUFBRTtZQUNqQixJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEVBQUU7O3NCQUN2QixJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztnQkFFekIsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtvQkFDdEIsT0FBTyxJQUFJLENBQUM7aUJBQ2Y7YUFDSjtTQUNKO0lBQ0wsQ0FBQzs7Ozs7SUFFTyxLQUFLO1FBQ1QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHO1lBQ2hELElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1RSxDQUFDOzs7OztJQUVPLGNBQWM7UUFDbEIsSUFBSSxJQUFJLENBQUMsc0JBQXNCLEVBQUU7WUFDN0IsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssRUFBRSxDQUFDO1lBRXBDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUM7U0FDdEM7SUFDTCxDQUFDOzs7OztJQUVPLG9CQUFvQjtRQUN4QixJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtZQUMxQixJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxFQUFFLENBQUM7WUFFakMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztTQUNuQztJQUNMLENBQUM7Ozs7OztJQUVPLGNBQWMsQ0FBQyxJQUFVOztZQUN6QixXQUFXLEdBQVMsSUFBSTs7WUFDeEIsUUFBUSxHQUFHLElBQUk7UUFFbkIsT0FBTyxDQUFDLFFBQVEsSUFBSSxXQUFXLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUU7WUFDdkQsSUFBSSxDQUFDLG1CQUFBLFdBQVcsRUFBZSxDQUFDLENBQUMsT0FBTyxLQUFLLEdBQUcsRUFBRTtnQkFDOUMsUUFBUSxHQUFHLFdBQVcsQ0FBQzthQUMxQjtZQUVELFdBQVcsR0FBRyxXQUFXLENBQUMsYUFBYSxDQUFDO1NBQzNDO1FBRUQsT0FBTyxRQUFRLENBQUM7SUFDcEIsQ0FBQzs7Ozs7OztJQUVPLG9CQUFvQixDQUFDLEtBQVcsRUFBRSxLQUFXOztjQUMzQyxnQkFBZ0IsR0FBRyxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDOztjQUVsRSxZQUFZLEdBQUcsZ0JBQWdCLENBQUMsb0JBQW9CLEVBQUU7O1lBRXhELFVBQVUsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQzs7WUFDeEMsVUFBVSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBRTVDLElBQUksVUFBVSxHQUFHLFVBQVUsRUFBRTs7a0JBQ25CLElBQUksR0FBRyxVQUFVO1lBRXZCLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDeEIsVUFBVSxHQUFHLElBQUksQ0FBQztTQUNyQjs7Y0FFSyx3QkFBd0IsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUM7O2NBRXJFLFNBQVMsR0FBRyx3QkFBd0IsQ0FBQyxNQUFNOzs7O1FBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN2RCxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzFCLE9BQU8sSUFBSSxDQUFDLE9BQU8sS0FBSyxHQUFHLENBQUM7YUFDL0I7UUFDTCxDQUFDLEVBQUM7UUFFRixPQUFPLG1CQUFBLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBZSxDQUFDO0lBQ3ZDLENBQUM7Ozs7OztJQUVPLGFBQWEsQ0FBQyxJQUF3QjtRQUMxQyxPQUFPLENBQUMsbUJBQUEsSUFBSSxFQUFlLENBQUMsQ0FBQyxhQUFhLEtBQUssU0FBUyxDQUFDO0lBQzdELENBQUM7OztZQTViSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLDRZQUEwQzs7YUFFN0M7Ozs7WUFsQmtGLE1BQU07WUFDakUsa0JBQWtCO1lBRGxDLGlCQUFpQjtZQUFhLHdCQUF3QjtZQUFFLFVBQVU7Ozt3QkFvQnJFLEtBQUs7Ozs7SUFBTix1Q0FBK0I7O0lBRS9CLHlDQUFtQjs7SUFFbkIsb0RBQXVDOztJQUN2QyxpREFBb0M7O0lBRXBDLGlDQUFvQjs7SUFDcEIsbUNBQXNCOztJQUN0QixvQ0FBdUI7O0lBQ3ZCLDBDQUE4Qzs7SUFFOUMsMkNBQW1DOztJQUVuQywyQ0FHRTs7SUFFRixpQ0FVRTs7Ozs7SUFFVSxrQ0FBb0I7Ozs7O0lBQ3BCLG1EQUFpRDs7Ozs7SUFDakQsZ0NBQTZCOzs7OztJQUM3QixzREFBMEQ7Ozs7O0lBQzFELGdDQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBFbGVtZW50UmVmLCBJbnB1dCwgTmdab25lLCBPbkRlc3Ryb3ksIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N0aWNreU1vZGFsUmVmLCBTdGlja3lNb2RhbFNlcnZpY2UsIFN0aWNreVBvc2l0aW9uU3RyYXRlZ3l9IGZyb20gJ25neC1zdGlja3ktbW9kYWwnO1xuaW1wb3J0IHtmcm9tRXZlbnQsIFN1YmplY3QsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2RlYm91bmNlVGltZSwgZmlsdGVyfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge0ltZ0VuY29kZXJ9IGZyb20gJy4uLy4uLy4uL21vZHVsZXMvdXRpbHMvaW1nLWVuY29kZXIuc2VydmljZSc7XG5pbXBvcnQge05vZGVUcmVlU3BsaXR9IGZyb20gJy4uLy4uLy4uL21vZHVsZXMvdXRpbHMvbm9kZS10cmVlLXNwbGl0JztcbmltcG9ydCB7VHJlZU5vZGVUcmF2ZXJzZX0gZnJvbSAnLi4vLi4vLi4vbW9kdWxlcy91dGlscy9ub2RlL3RyZWUtbm9kZS10cmF2ZXJzZSc7XG5pbXBvcnQge0Jhc2VUZXh0QnJpY2tDb21wb25lbnR9IGZyb20gJy4uLy4uL2Jhc2UtdGV4dC1icmljay9iYXNlLXRleHQtYnJpY2suY29tcG9uZW50JztcbmltcG9ydCB7QnJpY2tzTGlzdENvbXBvbmVudH0gZnJvbSAnLi4vYnJpY2tzLWxpc3QvYnJpY2tzLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7SVRleHRCcmlja0FwaX0gZnJvbSAnLi4vdGV4dC1icmljay1hcGkuaW50ZXJmYWNlJztcbmltcG9ydCB7VGV4dENvbnRleHRNZW51Q29tcG9uZW50fSBmcm9tICcuLi90ZXh0LWNvbnRleHQtbWVudS90ZXh0LWNvbnRleHQtbWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHtJV2FsbE1vZGVsfSBmcm9tICcuLi8uLi8uLi93YWxsL21vZGVsL2ludGVyZmFjZXMvd2FsbC1tb2RlbC5pbnRlcmZhY2UnO1xuaW1wb3J0IHtESVZJREVSX0JSSUNLX1RBR30gZnJvbSAnLi4vLi4vZGl2aWRlci1icmljay9kaXZpZGVyLWJyaWNrLmNvbnN0YW50JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd0ZXh0LWJyaWNrJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdGV4dC1icmljay5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vdGV4dC1icmljay5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFRleHRCcmlja0NvbXBvbmVudCBleHRlbmRzIEJhc2VUZXh0QnJpY2tDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgSVRleHRCcmlja0FwaSB7XG4gICAgQElucHV0KCkgd2FsbE1vZGVsOiBJV2FsbE1vZGVsO1xuXG4gICAgcGxhY2Vob2xkZXIgPSBudWxsO1xuXG4gICAgYnJpY2tTZWxlY3Rpb25Nb2RhbFJlZjogU3RpY2t5TW9kYWxSZWY7XG4gICAgY29udGV4dE1lbnVNb2RhbFJlZjogU3RpY2t5TW9kYWxSZWY7XG5cbiAgICB1cCQgPSBuZXcgU3ViamVjdCgpO1xuICAgIGRvd24kID0gbmV3IFN1YmplY3QoKTtcbiAgICBlbnRlciQgPSBuZXcgU3ViamVjdCgpO1xuICAgIHNlbGVjdGVkVGFnJDogU3ViamVjdDxzdHJpbmc+ID0gbmV3IFN1YmplY3QoKTtcblxuICAgIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgICBzZWxlY3Rpb25JbmZvOiB7XG4gICAgICAgIHJhbmdlczogUmFuZ2VbXSxcbiAgICAgICAgc2VsZWN0ZWRMaW5rOiBIVE1MRWxlbWVudFxuICAgIH07XG5cbiAgICBhcGk6IElUZXh0QnJpY2tBcGkgPSB7XG4gICAgICAgIGJvbGQ6IHRoaXMuYm9sZC5iaW5kKHRoaXMpLFxuICAgICAgICBpdGFsaWM6IHRoaXMuaXRhbGljLmJpbmQodGhpcyksXG4gICAgICAgIGNyZWF0ZUxpbms6IHRoaXMuY3JlYXRlTGluay5iaW5kKHRoaXMpLFxuICAgICAgICBjaGFuZ2VMaW5rVXJsOiB0aGlzLmNoYW5nZUxpbmtVcmwuYmluZCh0aGlzKSxcbiAgICAgICAgaXNMaW5rU2VsZWN0ZWQ6IHRoaXMuaXNMaW5rU2VsZWN0ZWQuYmluZCh0aGlzKSxcbiAgICAgICAgZ2V0U2VsZWN0ZWRMaW5rSHJlZjogdGhpcy5nZXRTZWxlY3RlZExpbmtIcmVmLmJpbmQodGhpcyksXG4gICAgICAgIHNhdmVTZWxlY3Rpb246IHRoaXMuc2F2ZVNlbGVjdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgICByZXN0b3JlU2VsZWN0aW9uOiB0aGlzLnJlc3RvcmVTZWxlY3Rpb24uYmluZCh0aGlzKSxcbiAgICAgICAgdW5saW5rOiB0aGlzLnVubGluay5iaW5kKHRoaXMpXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgem9uZTogTmdab25lLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgbmd4U3RpY2t5TW9kYWxTZXJ2aWNlOiBTdGlja3lNb2RhbFNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgICAgICAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5zZWxlY3RlZFRhZyQuc3Vic2NyaWJlKChuZXdUYWcpID0+IHtcbiAgICAgICAgICAgIGlmIChuZXdUYWcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVCcmlja3NMaXN0KCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkuY29yZS50dXJuQnJpY2tJbnRvKHRoaXMuaWQsIG5ld1RhZyk7XG5cbiAgICAgICAgICAgICAgICBpZiAobmV3VGFnID09PSBESVZJREVSX0JSSUNLX1RBRykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkuY29yZS5hZGRCcmlja0FmdGVyQnJpY2tJZCh0aGlzLmlkLCAndGV4dCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICAgICAgICAvLyBzaG93IHN1Yi1tZW51IGZvciBzZWxlY3RlZCB0ZXh0XG4gICAgICAgICAgICBmcm9tRXZlbnQodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnbW91c2V1cCcpXG4gICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcigoKSA9PiBCb29sZWFuKHRoaXMuc2NvcGUudGV4dC5sZW5ndGgpKSxcbiAgICAgICAgICAgICAgICAgICAgZGVib3VuY2VUaW1lKDUwMCksXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcigoKSA9PiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMod2luZG93LmdldFNlbGVjdGlvbigpLmFuY2hvck5vZGUpKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChlOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblRleHRTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKChzdWJzY3JpcHRpb24pID0+IHtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkJsdXIoKSB7XG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSBudWxsO1xuICAgIH1cblxuICAgIG9uRm9jdXMoKSB7XG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSAnVHlwZSBcXCcvXFwnIGZvciBjb21tYW5kcyc7XG4gICAgfVxuXG4gICAgb25LZXlQcmVzcyhlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIHN1cGVyLm9uS2V5UHJlc3MoZSk7XG5cbiAgICAgICAgdGhpcy5oaWRlQ29udGV4dE1lbnVNb2RhbCgpO1xuICAgIH1cblxuICAgIC8vIG9wZW4gdGhlIGxpbmsgaW4gbmV3IHdpbmRvd1xuICAgIG9uQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIE5vZGU7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNIVE1MRWxlbWVudCh0YXJnZXQpKSB7XG4gICAgICAgICAgICBpZiAodGFyZ2V0LnRhZ05hbWUgPT09ICdBJykge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSwgJ19ibGFuaycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9wS2V5UHJlc3NlZChlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmJyaWNrU2VsZWN0aW9uTW9kYWxSZWYpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgIHRoaXMudXAkLm5leHQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN1cGVyLnRvcEtleVByZXNzZWQoZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBib3R0b21LZXlQcmVzc2VkKGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuYnJpY2tTZWxlY3Rpb25Nb2RhbFJlZikge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgdGhpcy5kb3duJC5uZXh0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdXBlci5ib3R0b21LZXlQcmVzc2VkKGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZW50ZXJLZXlQcmVzc2VkKGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuYnJpY2tTZWxlY3Rpb25Nb2RhbFJlZikge1xuICAgICAgICAgICAgdGhpcy5lbnRlciQubmV4dCgpO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVCcmlja3NMaXN0KCk7XG4gICAgICAgICAgICB9LCAxMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1RhZygpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3VGFnID0gdGhpcy5zY29wZS50ZXh0LnNsaWNlKDEpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy53YWxsTW9kZWwuYXBpLmNvcmUudHVybkJyaWNrSW50byh0aGlzLmlkLCBuZXdUYWcpO1xuXG4gICAgICAgICAgICAgICAgLy8gZCAtIGRpdmlkZXIgdGFnXG4gICAgICAgICAgICAgICAgaWYgKG5ld1RhZyA9PT0gJ2QnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2FsbE1vZGVsLmFwaS5jb3JlLmFkZEJyaWNrQWZ0ZXJCcmlja0lkKHRoaXMuaWQsICd0ZXh0Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdXBlci5lbnRlcktleVByZXNzZWQoZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRTcGxpdHRlZFRleHQob2Zmc2V0OiBudW1iZXIsIHRhcmdldDogTm9kZSk6IHsgbGVmdDogc3RyaW5nLCByaWdodDogc3RyaW5nIH0ge1xuICAgICAgICBjb25zdCBub2RlVHJlZVNwbGl0ID0gbmV3IE5vZGVUcmVlU3BsaXQodGhpcy5lZGl0b3IubmF0aXZlRWxlbWVudCwgdGFyZ2V0LCBvZmZzZXQpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsZWZ0OiBub2RlVHJlZVNwbGl0LmxlZnRUcmVlLmlubmVySFRNTCxcbiAgICAgICAgICAgIHJpZ2h0OiBub2RlVHJlZVNwbGl0LnJpZ2h0VHJlZS5pbm5lckhUTUxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBlc2NhcGVLZXlQcmVzc2VkKGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuYnJpY2tTZWxlY3Rpb25Nb2RhbFJlZikge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgdGhpcy5oaWRlQnJpY2tzTGlzdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25UZXh0Q2hhbmdlKCkge1xuICAgICAgICBzdXBlci5vblRleHRDaGFuZ2UoKTtcblxuICAgICAgICBpZiAodGhpcy5icmlja1NlbGVjdGlvbk1vZGFsUmVmKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc2NvcGUudGV4dC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVCcmlja3NMaXN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zY29wZS50ZXh0WzBdID09PSAnLycgJiYgdGhpcy5zY29wZS50ZXh0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy5lZGl0b3IubmF0aXZlRWxlbWVudC5ibHVyKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRCb3VuZGluZ1JlY3QgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgICAgIHRoaXMuYnJpY2tTZWxlY3Rpb25Nb2RhbFJlZiA9IHRoaXMubmd4U3RpY2t5TW9kYWxTZXJ2aWNlLm9wZW4oe1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudDogQnJpY2tzTGlzdENvbXBvbmVudCxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQkOiB0aGlzLnRleHRDaGFuZ2UsXG4gICAgICAgICAgICAgICAgICAgIHVwJDogdGhpcy51cCQsXG4gICAgICAgICAgICAgICAgICAgIGRvd24kOiB0aGlzLmRvd24kLFxuICAgICAgICAgICAgICAgICAgICBlbnRlciQ6IHRoaXMuZW50ZXIkLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFRhZyQ6IHRoaXMuc2VsZWN0ZWRUYWckXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwb3NpdGlvblN0cmF0ZWd5OiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFN0aWNreVBvc2l0aW9uU3RyYXRlZ3kuY29vcmRpbmF0ZSxcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50WDogZWxlbWVudEJvdW5kaW5nUmVjdC54LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50WTogZWxlbWVudEJvdW5kaW5nUmVjdC55ICsgMzVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlclxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZWRpdG9yLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25QYXN0ZShlOiBDbGlwYm9hcmRFdmVudCkge1xuICAgICAgICBjb25zdCBpbWFnZURhdGFUcmFuc2Zlckl0ZW0gPSB0aGlzLmV4dHJhY3RJbWFnZURhdGFUcmFuc2Zlckl0ZW0oZS5jbGlwYm9hcmREYXRhLml0ZW1zKTtcblxuICAgICAgICBpZiAoaW1hZ2VEYXRhVHJhbnNmZXJJdGVtKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIChuZXcgSW1nRW5jb2RlcihpbWFnZURhdGFUcmFuc2Zlckl0ZW0uZ2V0QXNGaWxlKCkpKS5nZXRCYXNlNjRSZXByZXNlbnRhdGlvbigpLnRoZW4oKGltZ0Jhc2U2NCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMud2FsbE1vZGVsLmFwaS5jb3JlLnR1cm5Ccmlja0ludG8odGhpcy5pZCwgJ2ltYWdlJywge1xuICAgICAgICAgICAgICAgICAgICBzcmM6IGltZ0Jhc2U2NFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdXBlci5vblBhc3RlKGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25UZXh0U2VsZWN0aW9uKCkge1xuICAgICAgICBpZiAoIXRoaXMuY29udGV4dE1lbnVNb2RhbFJlZikge1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuXG4gICAgICAgICAgICBpZiAoIXNlbGVjdGlvbi5pc0NvbGxhcHNlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0NvbnRleHRNb2RhbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gQVBJXG4gICAgYm9sZCgpOiB2b2lkIHtcbiAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2JvbGQnLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgaXRhbGljKCk6IHZvaWQge1xuICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnaXRhbGljJywgZmFsc2UpO1xuICAgIH1cblxuICAgIGNyZWF0ZUxpbmsodXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NyZWF0ZUxpbmsnLCBmYWxzZSwgdXJsKTtcbiAgICB9XG5cbiAgICBnZXRTZWxlY3RlZExpbmtIcmVmKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbkluZm8uc2VsZWN0ZWRMaW5rKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25JbmZvLnNlbGVjdGVkTGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVubGluaygpOiB2b2lkIHtcbiAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ3VubGluaycsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBjaGFuZ2VMaW5rVXJsKHVybDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbkluZm8uc2VsZWN0ZWRMaW5rKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkluZm8uc2VsZWN0ZWRMaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsIHVybCk7XG5cbiAgICAgICAgICAgIHRoaXMudHJpZ2dlckVkaXRvckNoYW5nZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNMaW5rU2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBCb29sZWFuKHRoaXMuc2VsZWN0aW9uSW5mbyAmJiB0aGlzLnNlbGVjdGlvbkluZm8uc2VsZWN0ZWRMaW5rKTtcbiAgICB9XG5cbiAgICBzYXZlU2VsZWN0aW9uKCkge1xuICAgICAgICB0aGlzLnNlbGVjdGlvbkluZm8gPSB7XG4gICAgICAgICAgICBzZWxlY3RlZExpbms6IHRoaXMuZ2V0U2VsZWN0ZWRMaW5rKCksXG4gICAgICAgICAgICByYW5nZXM6IHRoaXMuZ2V0U2VsZWN0ZWRSYW5nZXMoKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJlc3RvcmVTZWxlY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcblxuICAgICAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMuc2VsZWN0aW9uSW5mby5yYW5nZXMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgICAgIHNlbC5hZGRSYW5nZSh0aGlzLnNlbGVjdGlvbkluZm8ucmFuZ2VzW2ldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGVuZCBBUElcblxuICAgIHByaXZhdGUgZ2V0U2VsZWN0ZWRMaW5rKCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuXG4gICAgICAgIGxldCBhbmNob3JOb2RlTGluaztcbiAgICAgICAgbGV0IGZvY3VzTm9kZUxpbms7XG5cbiAgICAgICAgY29uc3QgaXNBbmNob3JOb2RlQmVsb25nVG9CcmljayA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5jb250YWlucyhzZWxlY3Rpb24uYW5jaG9yTm9kZSk7XG4gICAgICAgIGNvbnN0IGlzRm9jdXNOb2RlQmVsb25nVG9CcmljayA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5jb250YWlucyhzZWxlY3Rpb24uZm9jdXNOb2RlKTtcblxuICAgICAgICBpZiAoaXNBbmNob3JOb2RlQmVsb25nVG9Ccmljaykge1xuICAgICAgICAgICAgYW5jaG9yTm9kZUxpbmsgPSB0aGlzLmZpbmRQYXJlbnRMaW5rKHNlbGVjdGlvbi5hbmNob3JOb2RlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0ZvY3VzTm9kZUJlbG9uZ1RvQnJpY2spIHtcbiAgICAgICAgICAgIGZvY3VzTm9kZUxpbmsgPSB0aGlzLmZpbmRQYXJlbnRMaW5rKHNlbGVjdGlvbi5mb2N1c05vZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFuY2hvck5vZGVMaW5rKSB7XG4gICAgICAgICAgICByZXR1cm4gYW5jaG9yTm9kZUxpbms7XG4gICAgICAgIH0gZWxzZSBpZiAoZm9jdXNOb2RlTGluaykge1xuICAgICAgICAgICAgcmV0dXJuIGZvY3VzTm9kZUxpbms7XG4gICAgICAgIH0gZWxzZSBpZiAoc2VsZWN0aW9uLmFuY2hvck5vZGUgIT09IHNlbGVjdGlvbi5mb2N1c05vZGUgJiZcbiAgICAgICAgICAgIGlzRm9jdXNOb2RlQmVsb25nVG9CcmljayAmJiBpc0FuY2hvck5vZGVCZWxvbmdUb0JyaWNrKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maW5kTGlua0JldHdlZW5Ob2RlcyhzZWxlY3Rpb24uYW5jaG9yTm9kZSwgc2VsZWN0aW9uLmZvY3VzTm9kZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHRyaWdnZXJFZGl0b3JDaGFuZ2UoKSB7XG4gICAgICAgIHRoaXMuZWRpdG9yLm5hdGl2ZUVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2lucHV0JykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd0NvbnRleHRNb2RhbCgpIHtcbiAgICAgICAgdGhpcy5lZGl0b3IubmF0aXZlRWxlbWVudC5ibHVyKCk7XG5cbiAgICAgICAgY29uc3Qgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuXG4gICAgICAgIGNvbnN0IGVsZW1lbnRCb3VuZGluZ1JlY3QgPSBzZWwuZ2V0UmFuZ2VBdCgwKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICB0aGlzLmNvbnRleHRNZW51TW9kYWxSZWYgPSB0aGlzLm5neFN0aWNreU1vZGFsU2VydmljZS5vcGVuKHtcbiAgICAgICAgICAgIGNvbXBvbmVudDogVGV4dENvbnRleHRNZW51Q29tcG9uZW50LFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGFwaTogdGhpcy5hcGlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwb3NpdGlvblN0cmF0ZWd5OiB7XG4gICAgICAgICAgICAgICAgbmFtZTogU3RpY2t5UG9zaXRpb25TdHJhdGVneS5jb29yZGluYXRlLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgY2xpZW50WDogZWxlbWVudEJvdW5kaW5nUmVjdC5sZWZ0ICsgKChlbGVtZW50Qm91bmRpbmdSZWN0LnJpZ2h0IC0gZWxlbWVudEJvdW5kaW5nUmVjdC5sZWZ0KSAvIDIuNSksXG4gICAgICAgICAgICAgICAgICAgIGNsaWVudFk6IGVsZW1lbnRCb3VuZGluZ1JlY3QudG9wIC0gMzVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3ZlcmxheUNvbmZpZzoge1xuICAgICAgICAgICAgICAgIGhhc0JhY2tkcm9wOiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jb250ZXh0TWVudU1vZGFsUmVmLnJlc3VsdC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGlkZUNvbnRleHRNZW51TW9kYWwoKTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5oaWRlQ29udGV4dE1lbnVNb2RhbCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gdG9kbzogbWlnaHQgYmUgYXMgdXRpbCBtZXRob2RcbiAgICBwcml2YXRlIGdldFNlbGVjdGVkUmFuZ2VzKCk6IFJhbmdlW10ge1xuICAgICAgICBjb25zdCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgIGNvbnN0IHJhbmdlcyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBzZWwucmFuZ2VDb3VudDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgICAgICByYW5nZXMucHVzaChzZWwuZ2V0UmFuZ2VBdChpKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmFuZ2VzO1xuICAgIH1cblxuICAgIHByaXZhdGUgZXh0cmFjdEltYWdlRGF0YVRyYW5zZmVySXRlbShpdGVtczogRGF0YVRyYW5zZmVySXRlbUxpc3QpOiBEYXRhVHJhbnNmZXJJdGVtIHtcbiAgICAgICAgbGV0IGluZGV4O1xuXG4gICAgICAgIGZvciAoaW5kZXggaW4gaXRlbXMpIHtcbiAgICAgICAgICAgIGlmIChpdGVtcy5oYXNPd25Qcm9wZXJ0eShpbmRleCkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gaXRlbXNbaW5kZXhdO1xuXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ua2luZCA9PT0gJ2ZpbGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaXNUYWcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjb3BlLnRleHQgJiYgdGhpcy5zY29wZS50ZXh0WzBdID09PSAnLycgJiZcbiAgICAgICAgICAgIHRoaXMud2FsbE1vZGVsLmFwaS5jb3JlLmlzUmVnaXN0ZXJlZEJyaWNrKHRoaXMuc2NvcGUudGV4dC5zbGljZSgxKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoaWRlQnJpY2tzTGlzdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuYnJpY2tTZWxlY3Rpb25Nb2RhbFJlZikge1xuICAgICAgICAgICAgdGhpcy5icmlja1NlbGVjdGlvbk1vZGFsUmVmLmNsb3NlKCk7XG5cbiAgICAgICAgICAgIHRoaXMuYnJpY2tTZWxlY3Rpb25Nb2RhbFJlZiA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGhpZGVDb250ZXh0TWVudU1vZGFsKCkge1xuICAgICAgICBpZiAodGhpcy5jb250ZXh0TWVudU1vZGFsUmVmKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHRNZW51TW9kYWxSZWYuY2xvc2UoKTtcblxuICAgICAgICAgICAgdGhpcy5jb250ZXh0TWVudU1vZGFsUmVmID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZmluZFBhcmVudExpbmsobm9kZTogTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IGN1cnJlbnROb2RlOiBOb2RlID0gbm9kZTtcbiAgICAgICAgbGV0IGxpbmtOb2RlID0gbnVsbDtcblxuICAgICAgICB3aGlsZSAoIWxpbmtOb2RlICYmIGN1cnJlbnROb2RlICE9PSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIGlmICgoY3VycmVudE5vZGUgYXMgSFRNTEVsZW1lbnQpLnRhZ05hbWUgPT09ICdBJykge1xuICAgICAgICAgICAgICAgIGxpbmtOb2RlID0gY3VycmVudE5vZGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUucGFyZW50RWxlbWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBsaW5rTm9kZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZpbmRMaW5rQmV0d2Vlbk5vZGVzKG5vZGVBOiBOb2RlLCBub2RlQjogTm9kZSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgY29uc3QgdHJlZU5vZGVUcmF2ZXJzZSA9IG5ldyBUcmVlTm9kZVRyYXZlcnNlKHRoaXMuZWRpdG9yLm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgIGNvbnN0IG9yZGVyZWROb2RlcyA9IHRyZWVOb2RlVHJhdmVyc2UuZ2V0UG9zdFByZU9yZGVyTm9kZXMoKTtcblxuICAgICAgICBsZXQgbm9kZUFJbmRleCA9IG9yZGVyZWROb2Rlcy5pbmRleE9mKG5vZGVBKTtcbiAgICAgICAgbGV0IG5vZGVCSW5kZXggPSBvcmRlcmVkTm9kZXMuaW5kZXhPZihub2RlQik7XG5cbiAgICAgICAgaWYgKG5vZGVCSW5kZXggPCBub2RlQUluZGV4KSB7XG4gICAgICAgICAgICBjb25zdCB0ZW1wID0gbm9kZUJJbmRleDtcblxuICAgICAgICAgICAgbm9kZUJJbmRleCA9IG5vZGVBSW5kZXg7XG4gICAgICAgICAgICBub2RlQUluZGV4ID0gdGVtcDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG9yZGVyZWROb2Rlc0JldHdlZW5Ob2RlcyA9IG9yZGVyZWROb2Rlcy5zbGljZShub2RlQUluZGV4LCBub2RlQkluZGV4KTtcblxuICAgICAgICBjb25zdCBsaW5rTm9kZXMgPSBvcmRlcmVkTm9kZXNCZXR3ZWVuTm9kZXMuZmlsdGVyKChub2RlKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0hUTUxFbGVtZW50KG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGUudGFnTmFtZSA9PT0gJ0EnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gbGlua05vZGVzWzBdIGFzIEhUTUxFbGVtZW50O1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNIVE1MRWxlbWVudChub2RlOiBOb2RlIHwgSFRNTEVsZW1lbnQpOiBub2RlIGlzIEhUTUxFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIChub2RlIGFzIEhUTUxFbGVtZW50KS5xdWVyeVNlbGVjdG9yICE9PSB1bmRlZmluZWQ7XG4gICAgfVxufVxuIl19