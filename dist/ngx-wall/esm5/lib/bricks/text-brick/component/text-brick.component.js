/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var TextBrickComponent = /** @class */ (function (_super) {
    tslib_1.__extends(TextBrickComponent, _super);
    function TextBrickComponent(zone, ngxStickyModalService, cd, componentFactoryResolver, el) {
        var _this = _super.call(this) || this;
        _this.zone = zone;
        _this.ngxStickyModalService = ngxStickyModalService;
        _this.cd = cd;
        _this.componentFactoryResolver = componentFactoryResolver;
        _this.el = el;
        _this.placeholder = null;
        _this.up$ = new Subject();
        _this.down$ = new Subject();
        _this.enter$ = new Subject();
        _this.selectedTag$ = new Subject();
        _this.subscriptions = [];
        _this.api = {
            bold: _this.bold.bind(_this),
            italic: _this.italic.bind(_this),
            createLink: _this.createLink.bind(_this),
            changeLinkUrl: _this.changeLinkUrl.bind(_this),
            isLinkSelected: _this.isLinkSelected.bind(_this),
            getSelectedLinkHref: _this.getSelectedLinkHref.bind(_this),
            saveSelection: _this.saveSelection.bind(_this),
            restoreSelection: _this.restoreSelection.bind(_this),
            unlink: _this.unlink.bind(_this)
        };
        _this.selectedTag$.subscribe((/**
         * @param {?} newTag
         * @return {?}
         */
        function (newTag) {
            if (newTag) {
                _this.hideBricksList();
                _this.wallModel.api.core.turnBrickInto(_this.id, newTag);
                if (newTag === DIVIDER_BRICK_TAG) {
                    _this.wallModel.api.core.addBrickAfterBrickId(_this.id, 'text');
                }
            }
        }));
        _this.subscriptions.push(
        // show sub-menu for selected text
        fromEvent(_this.el.nativeElement, 'mouseup')
            .pipe(filter((/**
         * @return {?}
         */
        function () { return Boolean(_this.scope.text.length); })), debounceTime(500), filter((/**
         * @return {?}
         */
        function () { return _this.el.nativeElement.contains(window.getSelection().anchorNode); })))
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            _this.onTextSelection();
        })));
        return _this;
    }
    /**
     * @return {?}
     */
    TextBrickComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
    };
    /**
     * @return {?}
     */
    TextBrickComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnDestroy.call(this);
        this.subscriptions.forEach((/**
         * @param {?} subscription
         * @return {?}
         */
        function (subscription) {
            subscription.unsubscribe();
        }));
    };
    /**
     * @return {?}
     */
    TextBrickComponent.prototype.onBlur = /**
     * @return {?}
     */
    function () {
        this.placeholder = null;
    };
    /**
     * @return {?}
     */
    TextBrickComponent.prototype.onFocus = /**
     * @return {?}
     */
    function () {
        this.placeholder = 'Type \'/\' for commands';
    };
    /**
     * @param {?} e
     * @return {?}
     */
    TextBrickComponent.prototype.onKeyPress = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        _super.prototype.onKeyPress.call(this, e);
        this.hideContextMenuModal();
    };
    // open the link in new window
    // open the link in new window
    /**
     * @param {?} event
     * @return {?}
     */
    TextBrickComponent.prototype.onClick = 
    // open the link in new window
    /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var target = (/** @type {?} */ (event.target));
        if (this.isHTMLElement(target)) {
            if (target.tagName === 'A') {
                window.open(target.getAttribute('href'), '_blank');
            }
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    TextBrickComponent.prototype.topKeyPressed = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (this.brickSelectionModalRef) {
            e.preventDefault();
            e.stopPropagation();
            this.up$.next();
        }
        else {
            _super.prototype.topKeyPressed.call(this, e);
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    TextBrickComponent.prototype.bottomKeyPressed = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (this.brickSelectionModalRef) {
            e.preventDefault();
            e.stopPropagation();
            this.down$.next();
        }
        else {
            _super.prototype.bottomKeyPressed.call(this, e);
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    TextBrickComponent.prototype.enterKeyPressed = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        var _this = this;
        if (this.brickSelectionModalRef) {
            this.enter$.next();
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.hideBricksList();
            }), 10);
        }
        else {
            if (this.isTag()) {
                /** @type {?} */
                var newTag = this.scope.text.slice(1);
                this.wallModel.api.core.turnBrickInto(this.id, newTag);
                // d - divider tag
                if (newTag === 'd') {
                    this.wallModel.api.core.addBrickAfterBrickId(this.id, 'text');
                }
            }
            else {
                _super.prototype.enterKeyPressed.call(this, e);
            }
        }
    };
    /**
     * @param {?} offset
     * @param {?} target
     * @return {?}
     */
    TextBrickComponent.prototype.getSplittedText = /**
     * @param {?} offset
     * @param {?} target
     * @return {?}
     */
    function (offset, target) {
        /** @type {?} */
        var nodeTreeSplit = new NodeTreeSplit(this.editor.nativeElement, target, offset);
        return {
            left: nodeTreeSplit.leftTree.innerHTML,
            right: nodeTreeSplit.rightTree.innerHTML
        };
    };
    /**
     * @param {?} e
     * @return {?}
     */
    TextBrickComponent.prototype.escapeKeyPressed = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (this.brickSelectionModalRef) {
            e.preventDefault();
            e.stopPropagation();
            this.hideBricksList();
        }
    };
    /**
     * @return {?}
     */
    TextBrickComponent.prototype.onTextChange = /**
     * @return {?}
     */
    function () {
        var _this = this;
        _super.prototype.onTextChange.call(this);
        if (this.brickSelectionModalRef) {
            if (!this.scope.text.length) {
                this.hideBricksList();
            }
        }
        else if (this.scope.text[0] === '/' && this.scope.text.length === 1) {
            this.editor.nativeElement.blur();
            /** @type {?} */
            var elementBoundingRect = this.el.nativeElement.getBoundingClientRect();
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
            function () {
                _this.editor.nativeElement.focus();
            }));
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    TextBrickComponent.prototype.onPaste = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        var _this = this;
        /** @type {?} */
        var imageDataTransferItem = this.extractImageDataTransferItem(e.clipboardData.items);
        if (imageDataTransferItem) {
            e.preventDefault();
            (new ImgEncoder(imageDataTransferItem.getAsFile())).getBase64Representation().then((/**
             * @param {?} imgBase64
             * @return {?}
             */
            function (imgBase64) {
                _this.wallModel.api.core.turnBrickInto(_this.id, 'image', {
                    src: imgBase64
                });
            }));
        }
        else {
            _super.prototype.onPaste.call(this, e);
        }
    };
    /**
     * @return {?}
     */
    TextBrickComponent.prototype.onTextSelection = /**
     * @return {?}
     */
    function () {
        if (!this.contextMenuModalRef) {
            /** @type {?} */
            var selection = window.getSelection();
            if (!selection.isCollapsed) {
                this.showContextModal();
            }
        }
    };
    // API
    // API
    /**
     * @return {?}
     */
    TextBrickComponent.prototype.bold = 
    // API
    /**
     * @return {?}
     */
    function () {
        document.execCommand('bold', false);
    };
    /**
     * @return {?}
     */
    TextBrickComponent.prototype.italic = /**
     * @return {?}
     */
    function () {
        document.execCommand('italic', false);
    };
    /**
     * @param {?} url
     * @return {?}
     */
    TextBrickComponent.prototype.createLink = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        document.execCommand('createLink', false, url);
    };
    /**
     * @return {?}
     */
    TextBrickComponent.prototype.getSelectedLinkHref = /**
     * @return {?}
     */
    function () {
        if (this.selectionInfo.selectedLink) {
            return this.selectionInfo.selectedLink.getAttribute('href');
        }
    };
    /**
     * @return {?}
     */
    TextBrickComponent.prototype.unlink = /**
     * @return {?}
     */
    function () {
        document.execCommand('unlink', false);
    };
    /**
     * @param {?} url
     * @return {?}
     */
    TextBrickComponent.prototype.changeLinkUrl = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        if (this.selectionInfo.selectedLink) {
            this.selectionInfo.selectedLink.setAttribute('href', url);
            this.triggerEditorChange();
        }
    };
    /**
     * @return {?}
     */
    TextBrickComponent.prototype.isLinkSelected = /**
     * @return {?}
     */
    function () {
        return Boolean(this.selectionInfo && this.selectionInfo.selectedLink);
    };
    /**
     * @return {?}
     */
    TextBrickComponent.prototype.saveSelection = /**
     * @return {?}
     */
    function () {
        this.selectionInfo = {
            selectedLink: this.getSelectedLink(),
            ranges: this.getSelectedRanges()
        };
    };
    /**
     * @return {?}
     */
    TextBrickComponent.prototype.restoreSelection = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var sel = window.getSelection();
        sel.removeAllRanges();
        for (var i = 0, len = this.selectionInfo.ranges.length; i < len; ++i) {
            sel.addRange(this.selectionInfo.ranges[i]);
        }
    };
    // end API
    // end API
    /**
     * @private
     * @return {?}
     */
    TextBrickComponent.prototype.getSelectedLink = 
    // end API
    /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var selection = window.getSelection();
        /** @type {?} */
        var anchorNodeLink;
        /** @type {?} */
        var focusNodeLink;
        /** @type {?} */
        var isAnchorNodeBelongToBrick = this.el.nativeElement.contains(selection.anchorNode);
        /** @type {?} */
        var isFocusNodeBelongToBrick = this.el.nativeElement.contains(selection.focusNode);
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
    };
    /**
     * @private
     * @return {?}
     */
    TextBrickComponent.prototype.triggerEditorChange = /**
     * @private
     * @return {?}
     */
    function () {
        this.editor.nativeElement.dispatchEvent(new Event('input'));
    };
    /**
     * @private
     * @return {?}
     */
    TextBrickComponent.prototype.showContextModal = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.editor.nativeElement.blur();
        /** @type {?} */
        var sel = window.getSelection();
        /** @type {?} */
        var elementBoundingRect = sel.getRangeAt(0).getBoundingClientRect();
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
        function () {
            _this.hideContextMenuModal();
        }), (/**
         * @return {?}
         */
        function () {
            _this.hideContextMenuModal();
        }));
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.editor.nativeElement.focus();
        }));
    };
    // todo: might be as util method
    // todo: might be as util method
    /**
     * @private
     * @return {?}
     */
    TextBrickComponent.prototype.getSelectedRanges = 
    // todo: might be as util method
    /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var sel = window.getSelection();
        /** @type {?} */
        var ranges = [];
        for (var i = 0, len = sel.rangeCount; i < len; ++i) {
            ranges.push(sel.getRangeAt(i));
        }
        return ranges;
    };
    /**
     * @private
     * @param {?} items
     * @return {?}
     */
    TextBrickComponent.prototype.extractImageDataTransferItem = /**
     * @private
     * @param {?} items
     * @return {?}
     */
    function (items) {
        /** @type {?} */
        var index;
        for (index in items) {
            if (items.hasOwnProperty(index)) {
                /** @type {?} */
                var item = items[index];
                if (item.kind === 'file') {
                    return item;
                }
            }
        }
    };
    /**
     * @private
     * @return {?}
     */
    TextBrickComponent.prototype.isTag = /**
     * @private
     * @return {?}
     */
    function () {
        return this.scope.text && this.scope.text[0] === '/' &&
            this.wallModel.api.core.isRegisteredBrick(this.scope.text.slice(1));
    };
    /**
     * @private
     * @return {?}
     */
    TextBrickComponent.prototype.hideBricksList = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.brickSelectionModalRef) {
            this.brickSelectionModalRef.close();
            this.brickSelectionModalRef = null;
        }
    };
    /**
     * @private
     * @return {?}
     */
    TextBrickComponent.prototype.hideContextMenuModal = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.contextMenuModalRef) {
            this.contextMenuModalRef.close();
            this.contextMenuModalRef = null;
        }
    };
    /**
     * @private
     * @param {?} node
     * @return {?}
     */
    TextBrickComponent.prototype.findParentLink = /**
     * @private
     * @param {?} node
     * @return {?}
     */
    function (node) {
        /** @type {?} */
        var currentNode = node;
        /** @type {?} */
        var linkNode = null;
        while (!linkNode && currentNode !== this.el.nativeElement) {
            if (((/** @type {?} */ (currentNode))).tagName === 'A') {
                linkNode = currentNode;
            }
            currentNode = currentNode.parentElement;
        }
        return linkNode;
    };
    /**
     * @private
     * @param {?} nodeA
     * @param {?} nodeB
     * @return {?}
     */
    TextBrickComponent.prototype.findLinkBetweenNodes = /**
     * @private
     * @param {?} nodeA
     * @param {?} nodeB
     * @return {?}
     */
    function (nodeA, nodeB) {
        var _this = this;
        /** @type {?} */
        var treeNodeTraverse = new TreeNodeTraverse(this.editor.nativeElement);
        /** @type {?} */
        var orderedNodes = treeNodeTraverse.getPostPreOrderNodes();
        /** @type {?} */
        var nodeAIndex = orderedNodes.indexOf(nodeA);
        /** @type {?} */
        var nodeBIndex = orderedNodes.indexOf(nodeB);
        if (nodeBIndex < nodeAIndex) {
            /** @type {?} */
            var temp = nodeBIndex;
            nodeBIndex = nodeAIndex;
            nodeAIndex = temp;
        }
        /** @type {?} */
        var orderedNodesBetweenNodes = orderedNodes.slice(nodeAIndex, nodeBIndex);
        /** @type {?} */
        var linkNodes = orderedNodesBetweenNodes.filter((/**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            if (_this.isHTMLElement(node)) {
                return node.tagName === 'A';
            }
        }));
        return (/** @type {?} */ (linkNodes[0]));
    };
    /**
     * @private
     * @param {?} node
     * @return {?}
     */
    TextBrickComponent.prototype.isHTMLElement = /**
     * @private
     * @param {?} node
     * @return {?}
     */
    function (node) {
        return ((/** @type {?} */ (node))).querySelector !== undefined;
    };
    TextBrickComponent.decorators = [
        { type: Component, args: [{
                    selector: 'text-brick',
                    template: "<p #editor\n   attr.placeholder=\"{{placeholder}}\"\n   (input)=\"onTextChange()\"\n   [(ngModel)]=\"scope.text\"\n   (keydown)=\"onKeyPress($event)\"\n   (click)=\"onClick($event)\"\n   class=\"text-brick__editor\"\n   [ngClass]=\"'text-brick-tabs-' + scope.tabs\"\n   (blur)=\"onBlur()\"\n   (focus)=\"onFocus()\"\n   contenteditable\n   [propValueAccessor]=\"'innerHTML'\">\n</p>\n",
                    styles: [":host{display:block}:host .text-brick__editor{word-break:break-all;padding:3px 2px;line-height:1.4;margin:0;box-sizing:content-box}:host .text-brick__editor:focus{outline:0}:host [contenteditable]:empty:before{content:attr(placeholder)}:host .text-brick-tabs-1{margin-left:1.5rem}:host .text-brick-tabs-2{margin-left:3rem}:host .text-brick-tabs-3{margin-left:4.5rem}"]
                }] }
    ];
    /** @nocollapse */
    TextBrickComponent.ctorParameters = function () { return [
        { type: NgZone },
        { type: StickyModalService },
        { type: ChangeDetectorRef },
        { type: ComponentFactoryResolver },
        { type: ElementRef }
    ]; };
    TextBrickComponent.propDecorators = {
        wallModel: [{ type: Input }]
    };
    return TextBrickComponent;
}(BaseTextBrickComponent));
export { TextBrickComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1icmljay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9icmlja3MvdGV4dC1icmljay9jb21wb25lbnQvdGV4dC1icmljay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLHdCQUF3QixFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFvQixNQUFNLGVBQWUsQ0FBQztBQUNuSSxPQUFPLEVBQWlCLGtCQUFrQixFQUFFLHNCQUFzQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDNUYsT0FBTyxFQUFDLFNBQVMsRUFBRSxPQUFPLEVBQWUsTUFBTSxNQUFNLENBQUM7QUFDdEQsT0FBTyxFQUFDLFlBQVksRUFBRSxNQUFNLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFDdEUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBQ3JFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGdEQUFnRCxDQUFDO0FBQ2hGLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLGlEQUFpRCxDQUFDO0FBQ3ZGLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBRXpFLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLGtEQUFrRCxDQUFDO0FBRTFGLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLDRDQUE0QyxDQUFDO0FBRTdFO0lBS3dDLDhDQUFzQjtJQWdDMUQsNEJBQW9CLElBQVksRUFDWixxQkFBeUMsRUFDekMsRUFBcUIsRUFDckIsd0JBQWtELEVBQ2xELEVBQWM7UUFKbEMsWUFLSSxpQkFBTyxTQTBCVjtRQS9CbUIsVUFBSSxHQUFKLElBQUksQ0FBUTtRQUNaLDJCQUFxQixHQUFyQixxQkFB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a0I7Z0JBRGxDLGlCQUFpQjtnQkFBYSx3QkFBd0I7Z0JBQUUsVUFBVTs7OzRCQW9CckUsS0FBSzs7SUF1YlYseUJBQUM7Q0FBQSxBQTdiRCxDQUt3QyxzQkFBc0IsR0F3YjdEO1NBeGJZLGtCQUFrQjs7O0lBQzNCLHVDQUErQjs7SUFFL0IseUNBQW1COztJQUVuQixvREFBdUM7O0lBQ3ZDLGlEQUFvQzs7SUFFcEMsaUNBQW9COztJQUNwQixtQ0FBc0I7O0lBQ3RCLG9DQUF1Qjs7SUFDdkIsMENBQThDOztJQUU5QywyQ0FBbUM7O0lBRW5DLDJDQUdFOztJQUVGLGlDQVVFOzs7OztJQUVVLGtDQUFvQjs7Ozs7SUFDcEIsbURBQWlEOzs7OztJQUNqRCxnQ0FBNkI7Ozs7O0lBQzdCLHNEQUEwRDs7Ozs7SUFDMUQsZ0NBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIEVsZW1lbnRSZWYsIElucHV0LCBOZ1pvbmUsIE9uRGVzdHJveSwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3RpY2t5TW9kYWxSZWYsIFN0aWNreU1vZGFsU2VydmljZSwgU3RpY2t5UG9zaXRpb25TdHJhdGVneX0gZnJvbSAnbmd4LXN0aWNreS1tb2RhbCc7XG5pbXBvcnQge2Zyb21FdmVudCwgU3ViamVjdCwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZGVib3VuY2VUaW1lLCBmaWx0ZXJ9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7SW1nRW5jb2Rlcn0gZnJvbSAnLi4vLi4vLi4vbW9kdWxlcy91dGlscy9pbWctZW5jb2Rlci5zZXJ2aWNlJztcbmltcG9ydCB7Tm9kZVRyZWVTcGxpdH0gZnJvbSAnLi4vLi4vLi4vbW9kdWxlcy91dGlscy9ub2RlLXRyZWUtc3BsaXQnO1xuaW1wb3J0IHtUcmVlTm9kZVRyYXZlcnNlfSBmcm9tICcuLi8uLi8uLi9tb2R1bGVzL3V0aWxzL25vZGUvdHJlZS1ub2RlLXRyYXZlcnNlJztcbmltcG9ydCB7QmFzZVRleHRCcmlja0NvbXBvbmVudH0gZnJvbSAnLi4vLi4vYmFzZS10ZXh0LWJyaWNrL2Jhc2UtdGV4dC1icmljay5jb21wb25lbnQnO1xuaW1wb3J0IHtCcmlja3NMaXN0Q29tcG9uZW50fSBmcm9tICcuLi9icmlja3MtbGlzdC9icmlja3MtbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHtJVGV4dEJyaWNrQXBpfSBmcm9tICcuLi90ZXh0LWJyaWNrLWFwaS5pbnRlcmZhY2UnO1xuaW1wb3J0IHtUZXh0Q29udGV4dE1lbnVDb21wb25lbnR9IGZyb20gJy4uL3RleHQtY29udGV4dC1tZW51L3RleHQtY29udGV4dC1tZW51LmNvbXBvbmVudCc7XG5pbXBvcnQge0lXYWxsTW9kZWx9IGZyb20gJy4uLy4uLy4uL3dhbGwvbW9kZWwvaW50ZXJmYWNlcy93YWxsLW1vZGVsLmludGVyZmFjZSc7XG5pbXBvcnQge0RJVklERVJfQlJJQ0tfVEFHfSBmcm9tICcuLi8uLi9kaXZpZGVyLWJyaWNrL2RpdmlkZXItYnJpY2suY29uc3RhbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3RleHQtYnJpY2snLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90ZXh0LWJyaWNrLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi90ZXh0LWJyaWNrLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgVGV4dEJyaWNrQ29tcG9uZW50IGV4dGVuZHMgQmFzZVRleHRCcmlja0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBJVGV4dEJyaWNrQXBpIHtcbiAgICBASW5wdXQoKSB3YWxsTW9kZWw6IElXYWxsTW9kZWw7XG5cbiAgICBwbGFjZWhvbGRlciA9IG51bGw7XG5cbiAgICBicmlja1NlbGVjdGlvbk1vZGFsUmVmOiBTdGlja3lNb2RhbFJlZjtcbiAgICBjb250ZXh0TWVudU1vZGFsUmVmOiBTdGlja3lNb2RhbFJlZjtcblxuICAgIHVwJCA9IG5ldyBTdWJqZWN0KCk7XG4gICAgZG93biQgPSBuZXcgU3ViamVjdCgpO1xuICAgIGVudGVyJCA9IG5ldyBTdWJqZWN0KCk7XG4gICAgc2VsZWN0ZWRUYWckOiBTdWJqZWN0PHN0cmluZz4gPSBuZXcgU3ViamVjdCgpO1xuXG4gICAgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICAgIHNlbGVjdGlvbkluZm86IHtcbiAgICAgICAgcmFuZ2VzOiBSYW5nZVtdLFxuICAgICAgICBzZWxlY3RlZExpbms6IEhUTUxFbGVtZW50XG4gICAgfTtcblxuICAgIGFwaTogSVRleHRCcmlja0FwaSA9IHtcbiAgICAgICAgYm9sZDogdGhpcy5ib2xkLmJpbmQodGhpcyksXG4gICAgICAgIGl0YWxpYzogdGhpcy5pdGFsaWMuYmluZCh0aGlzKSxcbiAgICAgICAgY3JlYXRlTGluazogdGhpcy5jcmVhdGVMaW5rLmJpbmQodGhpcyksXG4gICAgICAgIGNoYW5nZUxpbmtVcmw6IHRoaXMuY2hhbmdlTGlua1VybC5iaW5kKHRoaXMpLFxuICAgICAgICBpc0xpbmtTZWxlY3RlZDogdGhpcy5pc0xpbmtTZWxlY3RlZC5iaW5kKHRoaXMpLFxuICAgICAgICBnZXRTZWxlY3RlZExpbmtIcmVmOiB0aGlzLmdldFNlbGVjdGVkTGlua0hyZWYuYmluZCh0aGlzKSxcbiAgICAgICAgc2F2ZVNlbGVjdGlvbjogdGhpcy5zYXZlU2VsZWN0aW9uLmJpbmQodGhpcyksXG4gICAgICAgIHJlc3RvcmVTZWxlY3Rpb246IHRoaXMucmVzdG9yZVNlbGVjdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgICB1bmxpbms6IHRoaXMudW5saW5rLmJpbmQodGhpcylcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB6b25lOiBOZ1pvbmUsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBuZ3hTdGlja3lNb2RhbFNlcnZpY2U6IFN0aWNreU1vZGFsU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgICBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLnNlbGVjdGVkVGFnJC5zdWJzY3JpYmUoKG5ld1RhZykgPT4ge1xuICAgICAgICAgICAgaWYgKG5ld1RhZykge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZUJyaWNrc0xpc3QoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMud2FsbE1vZGVsLmFwaS5jb3JlLnR1cm5Ccmlja0ludG8odGhpcy5pZCwgbmV3VGFnKTtcblxuICAgICAgICAgICAgICAgIGlmIChuZXdUYWcgPT09IERJVklERVJfQlJJQ0tfVEFHKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2FsbE1vZGVsLmFwaS5jb3JlLmFkZEJyaWNrQWZ0ZXJCcmlja0lkKHRoaXMuaWQsICd0ZXh0Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgICAgICAgIC8vIHNob3cgc3ViLW1lbnUgZm9yIHNlbGVjdGVkIHRleHRcbiAgICAgICAgICAgIGZyb21FdmVudCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdtb3VzZXVwJylcbiAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyKCgpID0+IEJvb2xlYW4odGhpcy5zY29wZS50ZXh0Lmxlbmd0aCkpLFxuICAgICAgICAgICAgICAgICAgICBkZWJvdW5jZVRpbWUoNTAwKSxcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyKCgpID0+IHRoaXMuZWwubmF0aXZlRWxlbWVudC5jb250YWlucyh3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuYW5jaG9yTm9kZSkpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKGU6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uVGV4dFNlbGVjdGlvbigpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG5cbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goKHN1YnNjcmlwdGlvbikgPT4ge1xuICAgICAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uQmx1cigpIHtcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IG51bGw7XG4gICAgfVxuXG4gICAgb25Gb2N1cygpIHtcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlciA9ICdUeXBlIFxcJy9cXCcgZm9yIGNvbW1hbmRzJztcbiAgICB9XG5cbiAgICBvbktleVByZXNzKGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgc3VwZXIub25LZXlQcmVzcyhlKTtcblxuICAgICAgICB0aGlzLmhpZGVDb250ZXh0TWVudU1vZGFsKCk7XG4gICAgfVxuXG4gICAgLy8gb3BlbiB0aGUgbGluayBpbiBuZXcgd2luZG93XG4gICAgb25DbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQgYXMgTm9kZTtcblxuICAgICAgICBpZiAodGhpcy5pc0hUTUxFbGVtZW50KHRhcmdldCkpIHtcbiAgICAgICAgICAgIGlmICh0YXJnZXQudGFnTmFtZSA9PT0gJ0EnKSB7XG4gICAgICAgICAgICAgICAgd2luZG93Lm9wZW4odGFyZ2V0LmdldEF0dHJpYnV0ZSgnaHJlZicpLCAnX2JsYW5rJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b3BLZXlQcmVzc2VkKGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuYnJpY2tTZWxlY3Rpb25Nb2RhbFJlZikge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgdGhpcy51cCQubmV4dCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3VwZXIudG9wS2V5UHJlc3NlZChlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJvdHRvbUtleVByZXNzZWQoZTogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5icmlja1NlbGVjdGlvbk1vZGFsUmVmKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICB0aGlzLmRvd24kLm5leHQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN1cGVyLmJvdHRvbUtleVByZXNzZWQoZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlbnRlcktleVByZXNzZWQoZTogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5icmlja1NlbGVjdGlvbk1vZGFsUmVmKSB7XG4gICAgICAgICAgICB0aGlzLmVudGVyJC5uZXh0KCk7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZUJyaWNrc0xpc3QoKTtcbiAgICAgICAgICAgIH0sIDEwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzVGFnKCkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdUYWcgPSB0aGlzLnNjb3BlLnRleHQuc2xpY2UoMSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkuY29yZS50dXJuQnJpY2tJbnRvKHRoaXMuaWQsIG5ld1RhZyk7XG5cbiAgICAgICAgICAgICAgICAvLyBkIC0gZGl2aWRlciB0YWdcbiAgICAgICAgICAgICAgICBpZiAobmV3VGFnID09PSAnZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YWxsTW9kZWwuYXBpLmNvcmUuYWRkQnJpY2tBZnRlckJyaWNrSWQodGhpcy5pZCwgJ3RleHQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN1cGVyLmVudGVyS2V5UHJlc3NlZChlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFNwbGl0dGVkVGV4dChvZmZzZXQ6IG51bWJlciwgdGFyZ2V0OiBOb2RlKTogeyBsZWZ0OiBzdHJpbmcsIHJpZ2h0OiBzdHJpbmcgfSB7XG4gICAgICAgIGNvbnN0IG5vZGVUcmVlU3BsaXQgPSBuZXcgTm9kZVRyZWVTcGxpdCh0aGlzLmVkaXRvci5uYXRpdmVFbGVtZW50LCB0YXJnZXQsIG9mZnNldCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxlZnQ6IG5vZGVUcmVlU3BsaXQubGVmdFRyZWUuaW5uZXJIVE1MLFxuICAgICAgICAgICAgcmlnaHQ6IG5vZGVUcmVlU3BsaXQucmlnaHRUcmVlLmlubmVySFRNTFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGVzY2FwZUtleVByZXNzZWQoZTogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5icmlja1NlbGVjdGlvbk1vZGFsUmVmKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICB0aGlzLmhpZGVCcmlja3NMaXN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblRleHRDaGFuZ2UoKSB7XG4gICAgICAgIHN1cGVyLm9uVGV4dENoYW5nZSgpO1xuXG4gICAgICAgIGlmICh0aGlzLmJyaWNrU2VsZWN0aW9uTW9kYWxSZWYpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5zY29wZS50ZXh0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZUJyaWNrc0xpc3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNjb3BlLnRleHRbMF0gPT09ICcvJyAmJiB0aGlzLnNjb3BlLnRleHQubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmVkaXRvci5uYXRpdmVFbGVtZW50LmJsdXIoKTtcblxuICAgICAgICAgICAgY29uc3QgZWxlbWVudEJvdW5kaW5nUmVjdCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICAgICAgdGhpcy5icmlja1NlbGVjdGlvbk1vZGFsUmVmID0gdGhpcy5uZ3hTdGlja3lNb2RhbFNlcnZpY2Uub3Blbih7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50OiBCcmlja3NMaXN0Q29tcG9uZW50LFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dCQ6IHRoaXMudGV4dENoYW5nZSxcbiAgICAgICAgICAgICAgICAgICAgdXAkOiB0aGlzLnVwJCxcbiAgICAgICAgICAgICAgICAgICAgZG93biQ6IHRoaXMuZG93biQsXG4gICAgICAgICAgICAgICAgICAgIGVudGVyJDogdGhpcy5lbnRlciQsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVGFnJDogdGhpcy5zZWxlY3RlZFRhZyRcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uU3RyYXRlZ3k6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogU3RpY2t5UG9zaXRpb25TdHJhdGVneS5jb29yZGluYXRlLFxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGllbnRYOiBlbGVtZW50Qm91bmRpbmdSZWN0LngsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGllbnRZOiBlbGVtZW50Qm91bmRpbmdSZWN0LnkgKyAzNVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0b3IubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblBhc3RlKGU6IENsaXBib2FyZEV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGltYWdlRGF0YVRyYW5zZmVySXRlbSA9IHRoaXMuZXh0cmFjdEltYWdlRGF0YVRyYW5zZmVySXRlbShlLmNsaXBib2FyZERhdGEuaXRlbXMpO1xuXG4gICAgICAgIGlmIChpbWFnZURhdGFUcmFuc2Zlckl0ZW0pIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgKG5ldyBJbWdFbmNvZGVyKGltYWdlRGF0YVRyYW5zZmVySXRlbS5nZXRBc0ZpbGUoKSkpLmdldEJhc2U2NFJlcHJlc2VudGF0aW9uKCkudGhlbigoaW1nQmFzZTY0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy53YWxsTW9kZWwuYXBpLmNvcmUudHVybkJyaWNrSW50byh0aGlzLmlkLCAnaW1hZ2UnLCB7XG4gICAgICAgICAgICAgICAgICAgIHNyYzogaW1nQmFzZTY0XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN1cGVyLm9uUGFzdGUoZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblRleHRTZWxlY3Rpb24oKSB7XG4gICAgICAgIGlmICghdGhpcy5jb250ZXh0TWVudU1vZGFsUmVmKSB7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG5cbiAgICAgICAgICAgIGlmICghc2VsZWN0aW9uLmlzQ29sbGFwc2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93Q29udGV4dE1vZGFsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBUElcbiAgICBib2xkKCk6IHZvaWQge1xuICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnYm9sZCcsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBpdGFsaWMoKTogdm9pZCB7XG4gICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdpdGFsaWMnLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgY3JlYXRlTGluayh1cmw6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnY3JlYXRlTGluaycsIGZhbHNlLCB1cmwpO1xuICAgIH1cblxuICAgIGdldFNlbGVjdGVkTGlua0hyZWYoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uSW5mby5zZWxlY3RlZExpbmspIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbkluZm8uc2VsZWN0ZWRMaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5saW5rKCk6IHZvaWQge1xuICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgndW5saW5rJywgZmFsc2UpO1xuICAgIH1cblxuICAgIGNoYW5nZUxpbmtVcmwodXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uSW5mby5zZWxlY3RlZExpbmspIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uSW5mby5zZWxlY3RlZExpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgdXJsKTtcblxuICAgICAgICAgICAgdGhpcy50cmlnZ2VyRWRpdG9yQ2hhbmdlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0xpbmtTZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4odGhpcy5zZWxlY3Rpb25JbmZvICYmIHRoaXMuc2VsZWN0aW9uSW5mby5zZWxlY3RlZExpbmspO1xuICAgIH1cblxuICAgIHNhdmVTZWxlY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uSW5mbyA9IHtcbiAgICAgICAgICAgIHNlbGVjdGVkTGluazogdGhpcy5nZXRTZWxlY3RlZExpbmsoKSxcbiAgICAgICAgICAgIHJhbmdlczogdGhpcy5nZXRTZWxlY3RlZFJhbmdlcygpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmVzdG9yZVNlbGVjdGlvbigpIHtcbiAgICAgICAgY29uc3Qgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuXG4gICAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy5zZWxlY3Rpb25JbmZvLnJhbmdlcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgICAgICAgc2VsLmFkZFJhbmdlKHRoaXMuc2VsZWN0aW9uSW5mby5yYW5nZXNbaV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZW5kIEFQSVxuXG4gICAgcHJpdmF0ZSBnZXRTZWxlY3RlZExpbmsoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG5cbiAgICAgICAgbGV0IGFuY2hvck5vZGVMaW5rO1xuICAgICAgICBsZXQgZm9jdXNOb2RlTGluaztcblxuICAgICAgICBjb25zdCBpc0FuY2hvck5vZGVCZWxvbmdUb0JyaWNrID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKHNlbGVjdGlvbi5hbmNob3JOb2RlKTtcbiAgICAgICAgY29uc3QgaXNGb2N1c05vZGVCZWxvbmdUb0JyaWNrID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKHNlbGVjdGlvbi5mb2N1c05vZGUpO1xuXG4gICAgICAgIGlmIChpc0FuY2hvck5vZGVCZWxvbmdUb0JyaWNrKSB7XG4gICAgICAgICAgICBhbmNob3JOb2RlTGluayA9IHRoaXMuZmluZFBhcmVudExpbmsoc2VsZWN0aW9uLmFuY2hvck5vZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRm9jdXNOb2RlQmVsb25nVG9Ccmljaykge1xuICAgICAgICAgICAgZm9jdXNOb2RlTGluayA9IHRoaXMuZmluZFBhcmVudExpbmsoc2VsZWN0aW9uLmZvY3VzTm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYW5jaG9yTm9kZUxpbmspIHtcbiAgICAgICAgICAgIHJldHVybiBhbmNob3JOb2RlTGluaztcbiAgICAgICAgfSBlbHNlIGlmIChmb2N1c05vZGVMaW5rKSB7XG4gICAgICAgICAgICByZXR1cm4gZm9jdXNOb2RlTGluaztcbiAgICAgICAgfSBlbHNlIGlmIChzZWxlY3Rpb24uYW5jaG9yTm9kZSAhPT0gc2VsZWN0aW9uLmZvY3VzTm9kZSAmJlxuICAgICAgICAgICAgaXNGb2N1c05vZGVCZWxvbmdUb0JyaWNrICYmIGlzQW5jaG9yTm9kZUJlbG9uZ1RvQnJpY2spIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbmRMaW5rQmV0d2Vlbk5vZGVzKHNlbGVjdGlvbi5hbmNob3JOb2RlLCBzZWxlY3Rpb24uZm9jdXNOb2RlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdHJpZ2dlckVkaXRvckNoYW5nZSgpIHtcbiAgICAgICAgdGhpcy5lZGl0b3IubmF0aXZlRWxlbWVudC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnaW5wdXQnKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93Q29udGV4dE1vZGFsKCkge1xuICAgICAgICB0aGlzLmVkaXRvci5uYXRpdmVFbGVtZW50LmJsdXIoKTtcblxuICAgICAgICBjb25zdCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG5cbiAgICAgICAgY29uc3QgZWxlbWVudEJvdW5kaW5nUmVjdCA9IHNlbC5nZXRSYW5nZUF0KDApLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIHRoaXMuY29udGV4dE1lbnVNb2RhbFJlZiA9IHRoaXMubmd4U3RpY2t5TW9kYWxTZXJ2aWNlLm9wZW4oe1xuICAgICAgICAgICAgY29tcG9uZW50OiBUZXh0Q29udGV4dE1lbnVDb21wb25lbnQsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgYXBpOiB0aGlzLmFwaVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBvc2l0aW9uU3RyYXRlZ3k6IHtcbiAgICAgICAgICAgICAgICBuYW1lOiBTdGlja3lQb3NpdGlvblN0cmF0ZWd5LmNvb3JkaW5hdGUsXG4gICAgICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICBjbGllbnRYOiBlbGVtZW50Qm91bmRpbmdSZWN0LmxlZnQgKyAoKGVsZW1lbnRCb3VuZGluZ1JlY3QucmlnaHQgLSBlbGVtZW50Qm91bmRpbmdSZWN0LmxlZnQpIC8gMi41KSxcbiAgICAgICAgICAgICAgICAgICAgY2xpZW50WTogZWxlbWVudEJvdW5kaW5nUmVjdC50b3AgLSAzNVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvdmVybGF5Q29uZmlnOiB7XG4gICAgICAgICAgICAgICAgaGFzQmFja2Ryb3A6IGZhbHNlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlclxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNvbnRleHRNZW51TW9kYWxSZWYucmVzdWx0LnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5oaWRlQ29udGV4dE1lbnVNb2RhbCgpO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmhpZGVDb250ZXh0TWVudU1vZGFsKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5lZGl0b3IubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyB0b2RvOiBtaWdodCBiZSBhcyB1dGlsIG1ldGhvZFxuICAgIHByaXZhdGUgZ2V0U2VsZWN0ZWRSYW5nZXMoKTogUmFuZ2VbXSB7XG4gICAgICAgIGNvbnN0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgY29uc3QgcmFuZ2VzID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHNlbC5yYW5nZUNvdW50OyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgICAgIHJhbmdlcy5wdXNoKHNlbC5nZXRSYW5nZUF0KGkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByYW5nZXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBleHRyYWN0SW1hZ2VEYXRhVHJhbnNmZXJJdGVtKGl0ZW1zOiBEYXRhVHJhbnNmZXJJdGVtTGlzdCk6IERhdGFUcmFuc2Zlckl0ZW0ge1xuICAgICAgICBsZXQgaW5kZXg7XG5cbiAgICAgICAgZm9yIChpbmRleCBpbiBpdGVtcykge1xuICAgICAgICAgICAgaWYgKGl0ZW1zLmhhc093blByb3BlcnR5KGluZGV4KSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBpdGVtc1tpbmRleF07XG5cbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5raW5kID09PSAnZmlsZScpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc1RhZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NvcGUudGV4dCAmJiB0aGlzLnNjb3BlLnRleHRbMF0gPT09ICcvJyAmJlxuICAgICAgICAgICAgdGhpcy53YWxsTW9kZWwuYXBpLmNvcmUuaXNSZWdpc3RlcmVkQnJpY2sodGhpcy5zY29wZS50ZXh0LnNsaWNlKDEpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhpZGVCcmlja3NMaXN0KCkge1xuICAgICAgICBpZiAodGhpcy5icmlja1NlbGVjdGlvbk1vZGFsUmVmKSB7XG4gICAgICAgICAgICB0aGlzLmJyaWNrU2VsZWN0aW9uTW9kYWxSZWYuY2xvc2UoKTtcblxuICAgICAgICAgICAgdGhpcy5icmlja1NlbGVjdGlvbk1vZGFsUmVmID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaGlkZUNvbnRleHRNZW51TW9kYWwoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRleHRNZW51TW9kYWxSZWYpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dE1lbnVNb2RhbFJlZi5jbG9zZSgpO1xuXG4gICAgICAgICAgICB0aGlzLmNvbnRleHRNZW51TW9kYWxSZWYgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmaW5kUGFyZW50TGluayhub2RlOiBOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgY3VycmVudE5vZGU6IE5vZGUgPSBub2RlO1xuICAgICAgICBsZXQgbGlua05vZGUgPSBudWxsO1xuXG4gICAgICAgIHdoaWxlICghbGlua05vZGUgJiYgY3VycmVudE5vZGUgIT09IHRoaXMuZWwubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKChjdXJyZW50Tm9kZSBhcyBIVE1MRWxlbWVudCkudGFnTmFtZSA9PT0gJ0EnKSB7XG4gICAgICAgICAgICAgICAgbGlua05vZGUgPSBjdXJyZW50Tm9kZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5wYXJlbnRFbGVtZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGxpbmtOb2RlO1xuICAgIH1cblxuICAgIHByaXZhdGUgZmluZExpbmtCZXR3ZWVuTm9kZXMobm9kZUE6IE5vZGUsIG5vZGVCOiBOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBjb25zdCB0cmVlTm9kZVRyYXZlcnNlID0gbmV3IFRyZWVOb2RlVHJhdmVyc2UodGhpcy5lZGl0b3IubmF0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgY29uc3Qgb3JkZXJlZE5vZGVzID0gdHJlZU5vZGVUcmF2ZXJzZS5nZXRQb3N0UHJlT3JkZXJOb2RlcygpO1xuXG4gICAgICAgIGxldCBub2RlQUluZGV4ID0gb3JkZXJlZE5vZGVzLmluZGV4T2Yobm9kZUEpO1xuICAgICAgICBsZXQgbm9kZUJJbmRleCA9IG9yZGVyZWROb2Rlcy5pbmRleE9mKG5vZGVCKTtcblxuICAgICAgICBpZiAobm9kZUJJbmRleCA8IG5vZGVBSW5kZXgpIHtcbiAgICAgICAgICAgIGNvbnN0IHRlbXAgPSBub2RlQkluZGV4O1xuXG4gICAgICAgICAgICBub2RlQkluZGV4ID0gbm9kZUFJbmRleDtcbiAgICAgICAgICAgIG5vZGVBSW5kZXggPSB0ZW1wO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb3JkZXJlZE5vZGVzQmV0d2Vlbk5vZGVzID0gb3JkZXJlZE5vZGVzLnNsaWNlKG5vZGVBSW5kZXgsIG5vZGVCSW5kZXgpO1xuXG4gICAgICAgIGNvbnN0IGxpbmtOb2RlcyA9IG9yZGVyZWROb2Rlc0JldHdlZW5Ob2Rlcy5maWx0ZXIoKG5vZGUpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzSFRNTEVsZW1lbnQobm9kZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZS50YWdOYW1lID09PSAnQSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBsaW5rTm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0hUTUxFbGVtZW50KG5vZGU6IE5vZGUgfCBIVE1MRWxlbWVudCk6IG5vZGUgaXMgSFRNTEVsZW1lbnQge1xuICAgICAgICByZXR1cm4gKG5vZGUgYXMgSFRNTEVsZW1lbnQpLnF1ZXJ5U2VsZWN0b3IgIT09IHVuZGVmaW5lZDtcbiAgICB9XG59XG4iXX0=