/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this.selectedTag$.subscribe((newTag) => {
            if (newTag) {
                this.hideBricksList();
                this.wallModel.api.core.turnBrickInto(this.id, newTag);
                if (newTag === DIVIDER_BRICK_TAG) {
                    this.wallModel.api.core.addBrickAfterBrickId(this.id, 'text');
                }
            }
        });
        this.subscriptions.push(
        // show sub-menu for selected text
        fromEvent(this.el.nativeElement, 'mouseup')
            .pipe(filter(() => Boolean(this.scope.text.length)), debounceTime(500), filter(() => this.el.nativeElement.contains(window.getSelection().anchorNode)))
            .subscribe((e) => {
            this.onTextSelection();
        }));
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
        this.subscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        });
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
            setTimeout(() => {
                this.hideBricksList();
            }, 10);
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
            setTimeout(() => {
                this.editor.nativeElement.focus();
            });
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
            (new ImgEncoder(imageDataTransferItem.getAsFile())).getBase64Representation().then((imgBase64) => {
                this.wallModel.api.core.turnBrickInto(this.id, 'image', {
                    src: imgBase64
                });
            });
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
        this.contextMenuModalRef.result.then(() => {
            this.hideContextMenuModal();
        }, () => {
            this.hideContextMenuModal();
        });
        setTimeout(() => {
            this.editor.nativeElement.focus();
        });
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
        const linkNodes = orderedNodesBetweenNodes.filter((node) => {
            if (this.isHTMLElement(node)) {
                return node.tagName === 'A';
            }
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1icmljay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9icmlja3MvdGV4dC1icmljay9jb21wb25lbnQvdGV4dC1icmljay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsd0JBQXdCLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBQ25JLE9BQU8sRUFBaUIsa0JBQWtCLEVBQUUsc0JBQXNCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUM1RixPQUFPLEVBQUMsU0FBUyxFQUFFLE9BQU8sRUFBZSxNQUFNLE1BQU0sQ0FBQztBQUN0RCxPQUFPLEVBQUMsWUFBWSxFQUFFLE1BQU0sRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSw0Q0FBNEMsQ0FBQztBQUN0RSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sd0NBQXdDLENBQUM7QUFDckUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sZ0RBQWdELENBQUM7QUFDaEYsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0saURBQWlELENBQUM7QUFDdkYsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFFekUsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sa0RBQWtELENBQUM7QUFFMUYsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFPN0UsTUFBTSxPQUFPLGtCQUFtQixTQUFRLHNCQUFzQjs7Ozs7Ozs7SUFnQzFELFlBQW9CLElBQVksRUFDWixxQkFBeUMsRUFDekMsRUFBcUIsRUFDckIsd0JBQWtELEVBQ2xELEVBQWM7UUFDOUIsS0FBSyxFQUFFLENBQUM7UUFMUSxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1os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ZURldGVjdG9yUmVmLCBDb21wb25lbnQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgRWxlbWVudFJlZiwgSW5wdXQsIE5nWm9uZSwgT25EZXN0cm95LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdGlja3lNb2RhbFJlZiwgU3RpY2t5TW9kYWxTZXJ2aWNlLCBTdGlja3lQb3NpdGlvblN0cmF0ZWd5fSBmcm9tICduZ3gtc3RpY2t5LW1vZGFsJztcbmltcG9ydCB7ZnJvbUV2ZW50LCBTdWJqZWN0LCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtkZWJvdW5jZVRpbWUsIGZpbHRlcn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtJbWdFbmNvZGVyfSBmcm9tICcuLi8uLi8uLi9tb2R1bGVzL3V0aWxzL2ltZy1lbmNvZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHtOb2RlVHJlZVNwbGl0fSBmcm9tICcuLi8uLi8uLi9tb2R1bGVzL3V0aWxzL25vZGUtdHJlZS1zcGxpdCc7XG5pbXBvcnQge1RyZWVOb2RlVHJhdmVyc2V9IGZyb20gJy4uLy4uLy4uL21vZHVsZXMvdXRpbHMvbm9kZS90cmVlLW5vZGUtdHJhdmVyc2UnO1xuaW1wb3J0IHtCYXNlVGV4dEJyaWNrQ29tcG9uZW50fSBmcm9tICcuLi8uLi9iYXNlLXRleHQtYnJpY2svYmFzZS10ZXh0LWJyaWNrLmNvbXBvbmVudCc7XG5pbXBvcnQge0JyaWNrc0xpc3RDb21wb25lbnR9IGZyb20gJy4uL2JyaWNrcy1saXN0L2JyaWNrcy1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQge0lUZXh0QnJpY2tBcGl9IGZyb20gJy4uL3RleHQtYnJpY2stYXBpLmludGVyZmFjZSc7XG5pbXBvcnQge1RleHRDb250ZXh0TWVudUNvbXBvbmVudH0gZnJvbSAnLi4vdGV4dC1jb250ZXh0LW1lbnUvdGV4dC1jb250ZXh0LW1lbnUuY29tcG9uZW50JztcbmltcG9ydCB7SVdhbGxNb2RlbH0gZnJvbSAnLi4vLi4vLi4vd2FsbC9tb2RlbC9pbnRlcmZhY2VzL3dhbGwtbW9kZWwuaW50ZXJmYWNlJztcbmltcG9ydCB7RElWSURFUl9CUklDS19UQUd9IGZyb20gJy4uLy4uL2RpdmlkZXItYnJpY2svZGl2aWRlci1icmljay5jb25zdGFudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndGV4dC1icmljaycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3RleHQtYnJpY2suY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3RleHQtYnJpY2suY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBUZXh0QnJpY2tDb21wb25lbnQgZXh0ZW5kcyBCYXNlVGV4dEJyaWNrQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIElUZXh0QnJpY2tBcGkge1xuICAgIEBJbnB1dCgpIHdhbGxNb2RlbDogSVdhbGxNb2RlbDtcblxuICAgIHBsYWNlaG9sZGVyID0gbnVsbDtcblxuICAgIGJyaWNrU2VsZWN0aW9uTW9kYWxSZWY6IFN0aWNreU1vZGFsUmVmO1xuICAgIGNvbnRleHRNZW51TW9kYWxSZWY6IFN0aWNreU1vZGFsUmVmO1xuXG4gICAgdXAkID0gbmV3IFN1YmplY3QoKTtcbiAgICBkb3duJCA9IG5ldyBTdWJqZWN0KCk7XG4gICAgZW50ZXIkID0gbmV3IFN1YmplY3QoKTtcbiAgICBzZWxlY3RlZFRhZyQ6IFN1YmplY3Q8c3RyaW5nPiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgICBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gICAgc2VsZWN0aW9uSW5mbzoge1xuICAgICAgICByYW5nZXM6IFJhbmdlW10sXG4gICAgICAgIHNlbGVjdGVkTGluazogSFRNTEVsZW1lbnRcbiAgICB9O1xuXG4gICAgYXBpOiBJVGV4dEJyaWNrQXBpID0ge1xuICAgICAgICBib2xkOiB0aGlzLmJvbGQuYmluZCh0aGlzKSxcbiAgICAgICAgaXRhbGljOiB0aGlzLml0YWxpYy5iaW5kKHRoaXMpLFxuICAgICAgICBjcmVhdGVMaW5rOiB0aGlzLmNyZWF0ZUxpbmsuYmluZCh0aGlzKSxcbiAgICAgICAgY2hhbmdlTGlua1VybDogdGhpcy5jaGFuZ2VMaW5rVXJsLmJpbmQodGhpcyksXG4gICAgICAgIGlzTGlua1NlbGVjdGVkOiB0aGlzLmlzTGlua1NlbGVjdGVkLmJpbmQodGhpcyksXG4gICAgICAgIGdldFNlbGVjdGVkTGlua0hyZWY6IHRoaXMuZ2V0U2VsZWN0ZWRMaW5rSHJlZi5iaW5kKHRoaXMpLFxuICAgICAgICBzYXZlU2VsZWN0aW9uOiB0aGlzLnNhdmVTZWxlY3Rpb24uYmluZCh0aGlzKSxcbiAgICAgICAgcmVzdG9yZVNlbGVjdGlvbjogdGhpcy5yZXN0b3JlU2VsZWN0aW9uLmJpbmQodGhpcyksXG4gICAgICAgIHVubGluazogdGhpcy51bmxpbmsuYmluZCh0aGlzKVxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHpvbmU6IE5nWm9uZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIG5neFN0aWNreU1vZGFsU2VydmljZTogU3RpY2t5TW9kYWxTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZikge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUYWckLnN1YnNjcmliZSgobmV3VGFnKSA9PiB7XG4gICAgICAgICAgICBpZiAobmV3VGFnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlQnJpY2tzTGlzdCgpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy53YWxsTW9kZWwuYXBpLmNvcmUudHVybkJyaWNrSW50byh0aGlzLmlkLCBuZXdUYWcpO1xuXG4gICAgICAgICAgICAgICAgaWYgKG5ld1RhZyA9PT0gRElWSURFUl9CUklDS19UQUcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YWxsTW9kZWwuYXBpLmNvcmUuYWRkQnJpY2tBZnRlckJyaWNrSWQodGhpcy5pZCwgJ3RleHQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgICAgICAgLy8gc2hvdyBzdWItbWVudSBmb3Igc2VsZWN0ZWQgdGV4dFxuICAgICAgICAgICAgZnJvbUV2ZW50KHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ21vdXNldXAnKVxuICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXIoKCkgPT4gQm9vbGVhbih0aGlzLnNjb3BlLnRleHQubGVuZ3RoKSksXG4gICAgICAgICAgICAgICAgICAgIGRlYm91bmNlVGltZSg1MDApLFxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXIoKCkgPT4gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5hbmNob3JOb2RlKSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25UZXh0U2VsZWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcblxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaCgoc3Vic2NyaXB0aW9uKSA9PiB7XG4gICAgICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25CbHVyKCkge1xuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBvbkZvY3VzKCkge1xuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyID0gJ1R5cGUgXFwnL1xcJyBmb3IgY29tbWFuZHMnO1xuICAgIH1cblxuICAgIG9uS2V5UHJlc3MoZTogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBzdXBlci5vbktleVByZXNzKGUpO1xuXG4gICAgICAgIHRoaXMuaGlkZUNvbnRleHRNZW51TW9kYWwoKTtcbiAgICB9XG5cbiAgICAvLyBvcGVuIHRoZSBsaW5rIGluIG5ldyB3aW5kb3dcbiAgICBvbkNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBOb2RlO1xuXG4gICAgICAgIGlmICh0aGlzLmlzSFRNTEVsZW1lbnQodGFyZ2V0KSkge1xuICAgICAgICAgICAgaWYgKHRhcmdldC50YWdOYW1lID09PSAnQScpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cub3Blbih0YXJnZXQuZ2V0QXR0cmlidXRlKCdocmVmJyksICdfYmxhbmsnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvcEtleVByZXNzZWQoZTogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5icmlja1NlbGVjdGlvbk1vZGFsUmVmKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICB0aGlzLnVwJC5uZXh0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdXBlci50b3BLZXlQcmVzc2VkKGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYm90dG9tS2V5UHJlc3NlZChlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmJyaWNrU2VsZWN0aW9uTW9kYWxSZWYpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgIHRoaXMuZG93biQubmV4dCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3VwZXIuYm90dG9tS2V5UHJlc3NlZChlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVudGVyS2V5UHJlc3NlZChlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmJyaWNrU2VsZWN0aW9uTW9kYWxSZWYpIHtcbiAgICAgICAgICAgIHRoaXMuZW50ZXIkLm5leHQoKTtcblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlQnJpY2tzTGlzdCgpO1xuICAgICAgICAgICAgfSwgMTApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNUYWcoKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1RhZyA9IHRoaXMuc2NvcGUudGV4dC5zbGljZSgxKTtcblxuICAgICAgICAgICAgICAgIHRoaXMud2FsbE1vZGVsLmFwaS5jb3JlLnR1cm5Ccmlja0ludG8odGhpcy5pZCwgbmV3VGFnKTtcblxuICAgICAgICAgICAgICAgIC8vIGQgLSBkaXZpZGVyIHRhZ1xuICAgICAgICAgICAgICAgIGlmIChuZXdUYWcgPT09ICdkJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkuY29yZS5hZGRCcmlja0FmdGVyQnJpY2tJZCh0aGlzLmlkLCAndGV4dCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3VwZXIuZW50ZXJLZXlQcmVzc2VkKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0U3BsaXR0ZWRUZXh0KG9mZnNldDogbnVtYmVyLCB0YXJnZXQ6IE5vZGUpOiB7IGxlZnQ6IHN0cmluZywgcmlnaHQ6IHN0cmluZyB9IHtcbiAgICAgICAgY29uc3Qgbm9kZVRyZWVTcGxpdCA9IG5ldyBOb2RlVHJlZVNwbGl0KHRoaXMuZWRpdG9yLm5hdGl2ZUVsZW1lbnQsIHRhcmdldCwgb2Zmc2V0KTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGVmdDogbm9kZVRyZWVTcGxpdC5sZWZ0VHJlZS5pbm5lckhUTUwsXG4gICAgICAgICAgICByaWdodDogbm9kZVRyZWVTcGxpdC5yaWdodFRyZWUuaW5uZXJIVE1MXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZXNjYXBlS2V5UHJlc3NlZChlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmJyaWNrU2VsZWN0aW9uTW9kYWxSZWYpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgIHRoaXMuaGlkZUJyaWNrc0xpc3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uVGV4dENoYW5nZSgpIHtcbiAgICAgICAgc3VwZXIub25UZXh0Q2hhbmdlKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuYnJpY2tTZWxlY3Rpb25Nb2RhbFJlZikge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnNjb3BlLnRleHQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlQnJpY2tzTGlzdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2NvcGUudGV4dFswXSA9PT0gJy8nICYmIHRoaXMuc2NvcGUudGV4dC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLm5hdGl2ZUVsZW1lbnQuYmx1cigpO1xuXG4gICAgICAgICAgICBjb25zdCBlbGVtZW50Qm91bmRpbmdSZWN0ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgICAgICB0aGlzLmJyaWNrU2VsZWN0aW9uTW9kYWxSZWYgPSB0aGlzLm5neFN0aWNreU1vZGFsU2VydmljZS5vcGVuKHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnQ6IEJyaWNrc0xpc3RDb21wb25lbnQsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0JDogdGhpcy50ZXh0Q2hhbmdlLFxuICAgICAgICAgICAgICAgICAgICB1cCQ6IHRoaXMudXAkLFxuICAgICAgICAgICAgICAgICAgICBkb3duJDogdGhpcy5kb3duJCxcbiAgICAgICAgICAgICAgICAgICAgZW50ZXIkOiB0aGlzLmVudGVyJCxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRUYWckOiB0aGlzLnNlbGVjdGVkVGFnJFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcG9zaXRpb25TdHJhdGVneToge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBTdGlja3lQb3NpdGlvblN0cmF0ZWd5LmNvb3JkaW5hdGUsXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudFg6IGVsZW1lbnRCb3VuZGluZ1JlY3QueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudFk6IGVsZW1lbnRCb3VuZGluZ1JlY3QueSArIDM1XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXJcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVkaXRvci5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uUGFzdGUoZTogQ2xpcGJvYXJkRXZlbnQpIHtcbiAgICAgICAgY29uc3QgaW1hZ2VEYXRhVHJhbnNmZXJJdGVtID0gdGhpcy5leHRyYWN0SW1hZ2VEYXRhVHJhbnNmZXJJdGVtKGUuY2xpcGJvYXJkRGF0YS5pdGVtcyk7XG5cbiAgICAgICAgaWYgKGltYWdlRGF0YVRyYW5zZmVySXRlbSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAobmV3IEltZ0VuY29kZXIoaW1hZ2VEYXRhVHJhbnNmZXJJdGVtLmdldEFzRmlsZSgpKSkuZ2V0QmFzZTY0UmVwcmVzZW50YXRpb24oKS50aGVuKChpbWdCYXNlNjQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkuY29yZS50dXJuQnJpY2tJbnRvKHRoaXMuaWQsICdpbWFnZScsIHtcbiAgICAgICAgICAgICAgICAgICAgc3JjOiBpbWdCYXNlNjRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3VwZXIub25QYXN0ZShlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uVGV4dFNlbGVjdGlvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbnRleHRNZW51TW9kYWxSZWYpIHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcblxuICAgICAgICAgICAgaWYgKCFzZWxlY3Rpb24uaXNDb2xsYXBzZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dDb250ZXh0TW9kYWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFQSVxuICAgIGJvbGQoKTogdm9pZCB7XG4gICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdib2xkJywgZmFsc2UpO1xuICAgIH1cblxuICAgIGl0YWxpYygpOiB2b2lkIHtcbiAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2l0YWxpYycsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBjcmVhdGVMaW5rKHVybDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjcmVhdGVMaW5rJywgZmFsc2UsIHVybCk7XG4gICAgfVxuXG4gICAgZ2V0U2VsZWN0ZWRMaW5rSHJlZigpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25JbmZvLnNlbGVjdGVkTGluaykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uSW5mby5zZWxlY3RlZExpbmsuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmxpbmsoKTogdm9pZCB7XG4gICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCd1bmxpbmsnLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgY2hhbmdlTGlua1VybCh1cmw6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25JbmZvLnNlbGVjdGVkTGluaykge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25JbmZvLnNlbGVjdGVkTGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCB1cmwpO1xuXG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJFZGl0b3JDaGFuZ2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzTGlua1NlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gQm9vbGVhbih0aGlzLnNlbGVjdGlvbkluZm8gJiYgdGhpcy5zZWxlY3Rpb25JbmZvLnNlbGVjdGVkTGluayk7XG4gICAgfVxuXG4gICAgc2F2ZVNlbGVjdGlvbigpIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25JbmZvID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRMaW5rOiB0aGlzLmdldFNlbGVjdGVkTGluaygpLFxuICAgICAgICAgICAgcmFuZ2VzOiB0aGlzLmdldFNlbGVjdGVkUmFuZ2VzKClcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXN0b3JlU2VsZWN0aW9uKCkge1xuICAgICAgICBjb25zdCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG5cbiAgICAgICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0aGlzLnNlbGVjdGlvbkluZm8ucmFuZ2VzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgICAgICBzZWwuYWRkUmFuZ2UodGhpcy5zZWxlY3Rpb25JbmZvLnJhbmdlc1tpXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBlbmQgQVBJXG5cbiAgICBwcml2YXRlIGdldFNlbGVjdGVkTGluaygpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcblxuICAgICAgICBsZXQgYW5jaG9yTm9kZUxpbms7XG4gICAgICAgIGxldCBmb2N1c05vZGVMaW5rO1xuXG4gICAgICAgIGNvbnN0IGlzQW5jaG9yTm9kZUJlbG9uZ1RvQnJpY2sgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoc2VsZWN0aW9uLmFuY2hvck5vZGUpO1xuICAgICAgICBjb25zdCBpc0ZvY3VzTm9kZUJlbG9uZ1RvQnJpY2sgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoc2VsZWN0aW9uLmZvY3VzTm9kZSk7XG5cbiAgICAgICAgaWYgKGlzQW5jaG9yTm9kZUJlbG9uZ1RvQnJpY2spIHtcbiAgICAgICAgICAgIGFuY2hvck5vZGVMaW5rID0gdGhpcy5maW5kUGFyZW50TGluayhzZWxlY3Rpb24uYW5jaG9yTm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGb2N1c05vZGVCZWxvbmdUb0JyaWNrKSB7XG4gICAgICAgICAgICBmb2N1c05vZGVMaW5rID0gdGhpcy5maW5kUGFyZW50TGluayhzZWxlY3Rpb24uZm9jdXNOb2RlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhbmNob3JOb2RlTGluaykge1xuICAgICAgICAgICAgcmV0dXJuIGFuY2hvck5vZGVMaW5rO1xuICAgICAgICB9IGVsc2UgaWYgKGZvY3VzTm9kZUxpbmspIHtcbiAgICAgICAgICAgIHJldHVybiBmb2N1c05vZGVMaW5rO1xuICAgICAgICB9IGVsc2UgaWYgKHNlbGVjdGlvbi5hbmNob3JOb2RlICE9PSBzZWxlY3Rpb24uZm9jdXNOb2RlICYmXG4gICAgICAgICAgICBpc0ZvY3VzTm9kZUJlbG9uZ1RvQnJpY2sgJiYgaXNBbmNob3JOb2RlQmVsb25nVG9Ccmljaykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmluZExpbmtCZXR3ZWVuTm9kZXMoc2VsZWN0aW9uLmFuY2hvck5vZGUsIHNlbGVjdGlvbi5mb2N1c05vZGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0cmlnZ2VyRWRpdG9yQ2hhbmdlKCkge1xuICAgICAgICB0aGlzLmVkaXRvci5uYXRpdmVFbGVtZW50LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdpbnB1dCcpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dDb250ZXh0TW9kYWwoKSB7XG4gICAgICAgIHRoaXMuZWRpdG9yLm5hdGl2ZUVsZW1lbnQuYmx1cigpO1xuXG4gICAgICAgIGNvbnN0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcblxuICAgICAgICBjb25zdCBlbGVtZW50Qm91bmRpbmdSZWN0ID0gc2VsLmdldFJhbmdlQXQoMCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgdGhpcy5jb250ZXh0TWVudU1vZGFsUmVmID0gdGhpcy5uZ3hTdGlja3lNb2RhbFNlcnZpY2Uub3Blbih7XG4gICAgICAgICAgICBjb21wb25lbnQ6IFRleHRDb250ZXh0TWVudUNvbXBvbmVudCxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBhcGk6IHRoaXMuYXBpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcG9zaXRpb25TdHJhdGVneToge1xuICAgICAgICAgICAgICAgIG5hbWU6IFN0aWNreVBvc2l0aW9uU3RyYXRlZ3kuY29vcmRpbmF0ZSxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWVudFg6IGVsZW1lbnRCb3VuZGluZ1JlY3QubGVmdCArICgoZWxlbWVudEJvdW5kaW5nUmVjdC5yaWdodCAtIGVsZW1lbnRCb3VuZGluZ1JlY3QubGVmdCkgLyAyLjUpLFxuICAgICAgICAgICAgICAgICAgICBjbGllbnRZOiBlbGVtZW50Qm91bmRpbmdSZWN0LnRvcCAtIDM1XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG92ZXJsYXlDb25maWc6IHtcbiAgICAgICAgICAgICAgICBoYXNCYWNrZHJvcDogZmFsc2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY29udGV4dE1lbnVNb2RhbFJlZi5yZXN1bHQudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmhpZGVDb250ZXh0TWVudU1vZGFsKCk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGlkZUNvbnRleHRNZW51TW9kYWwoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVkaXRvci5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIHRvZG86IG1pZ2h0IGJlIGFzIHV0aWwgbWV0aG9kXG4gICAgcHJpdmF0ZSBnZXRTZWxlY3RlZFJhbmdlcygpOiBSYW5nZVtdIHtcbiAgICAgICAgY29uc3Qgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgICAgICBjb25zdCByYW5nZXMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gc2VsLnJhbmdlQ291bnQ7IGkgPCBsZW47ICsraSkge1xuICAgICAgICAgICAgcmFuZ2VzLnB1c2goc2VsLmdldFJhbmdlQXQoaSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJhbmdlcztcbiAgICB9XG5cbiAgICBwcml2YXRlIGV4dHJhY3RJbWFnZURhdGFUcmFuc2Zlckl0ZW0oaXRlbXM6IERhdGFUcmFuc2Zlckl0ZW1MaXN0KTogRGF0YVRyYW5zZmVySXRlbSB7XG4gICAgICAgIGxldCBpbmRleDtcblxuICAgICAgICBmb3IgKGluZGV4IGluIGl0ZW1zKSB7XG4gICAgICAgICAgICBpZiAoaXRlbXMuaGFzT3duUHJvcGVydHkoaW5kZXgpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IGl0ZW1zW2luZGV4XTtcblxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmtpbmQgPT09ICdmaWxlJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGlzVGFnKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY29wZS50ZXh0ICYmIHRoaXMuc2NvcGUudGV4dFswXSA9PT0gJy8nICYmXG4gICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkuY29yZS5pc1JlZ2lzdGVyZWRCcmljayh0aGlzLnNjb3BlLnRleHQuc2xpY2UoMSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGlkZUJyaWNrc0xpc3QoKSB7XG4gICAgICAgIGlmICh0aGlzLmJyaWNrU2VsZWN0aW9uTW9kYWxSZWYpIHtcbiAgICAgICAgICAgIHRoaXMuYnJpY2tTZWxlY3Rpb25Nb2RhbFJlZi5jbG9zZSgpO1xuXG4gICAgICAgICAgICB0aGlzLmJyaWNrU2VsZWN0aW9uTW9kYWxSZWYgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoaWRlQ29udGV4dE1lbnVNb2RhbCgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGV4dE1lbnVNb2RhbFJlZikge1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0TWVudU1vZGFsUmVmLmNsb3NlKCk7XG5cbiAgICAgICAgICAgIHRoaXMuY29udGV4dE1lbnVNb2RhbFJlZiA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGZpbmRQYXJlbnRMaW5rKG5vZGU6IE5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBjdXJyZW50Tm9kZTogTm9kZSA9IG5vZGU7XG4gICAgICAgIGxldCBsaW5rTm9kZSA9IG51bGw7XG5cbiAgICAgICAgd2hpbGUgKCFsaW5rTm9kZSAmJiBjdXJyZW50Tm9kZSAhPT0gdGhpcy5lbC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAoKGN1cnJlbnROb2RlIGFzIEhUTUxFbGVtZW50KS50YWdOYW1lID09PSAnQScpIHtcbiAgICAgICAgICAgICAgICBsaW5rTm9kZSA9IGN1cnJlbnROb2RlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbGlua05vZGU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmaW5kTGlua0JldHdlZW5Ob2Rlcyhub2RlQTogTm9kZSwgbm9kZUI6IE5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IHRyZWVOb2RlVHJhdmVyc2UgPSBuZXcgVHJlZU5vZGVUcmF2ZXJzZSh0aGlzLmVkaXRvci5uYXRpdmVFbGVtZW50KTtcblxuICAgICAgICBjb25zdCBvcmRlcmVkTm9kZXMgPSB0cmVlTm9kZVRyYXZlcnNlLmdldFBvc3RQcmVPcmRlck5vZGVzKCk7XG5cbiAgICAgICAgbGV0IG5vZGVBSW5kZXggPSBvcmRlcmVkTm9kZXMuaW5kZXhPZihub2RlQSk7XG4gICAgICAgIGxldCBub2RlQkluZGV4ID0gb3JkZXJlZE5vZGVzLmluZGV4T2Yobm9kZUIpO1xuXG4gICAgICAgIGlmIChub2RlQkluZGV4IDwgbm9kZUFJbmRleCkge1xuICAgICAgICAgICAgY29uc3QgdGVtcCA9IG5vZGVCSW5kZXg7XG5cbiAgICAgICAgICAgIG5vZGVCSW5kZXggPSBub2RlQUluZGV4O1xuICAgICAgICAgICAgbm9kZUFJbmRleCA9IHRlbXA7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvcmRlcmVkTm9kZXNCZXR3ZWVuTm9kZXMgPSBvcmRlcmVkTm9kZXMuc2xpY2Uobm9kZUFJbmRleCwgbm9kZUJJbmRleCk7XG5cbiAgICAgICAgY29uc3QgbGlua05vZGVzID0gb3JkZXJlZE5vZGVzQmV0d2Vlbk5vZGVzLmZpbHRlcigobm9kZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNIVE1MRWxlbWVudChub2RlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBub2RlLnRhZ05hbWUgPT09ICdBJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGxpbmtOb2Rlc1swXSBhcyBIVE1MRWxlbWVudDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzSFRNTEVsZW1lbnQobm9kZTogTm9kZSB8IEhUTUxFbGVtZW50KTogbm9kZSBpcyBIVE1MRWxlbWVudCB7XG4gICAgICAgIHJldHVybiAobm9kZSBhcyBIVE1MRWxlbWVudCkucXVlcnlTZWxlY3RvciAhPT0gdW5kZWZpbmVkO1xuICAgIH1cbn1cbiJdfQ==