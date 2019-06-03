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
import { getModalConfig } from '../../base-brick/base-brick.component';
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
        _super.prototype.onTextChange.call(this);
        if (this.brickSelectionModalRef) {
            if (!this.scope.text.length) {
                this.hideBricksList();
            }
        }
        else if (this.scope.text[0] === '/' && this.scope.text.length === 1) {
            this.openBricksListModal();
        }
    };
    /**
     * @return {?}
     */
    TextBrickComponent.prototype.openBricksListModal = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.editor.nativeElement.blur();
        /** @type {?} */
        var modalConfig = getModalConfig(this.el, this.componentFactoryResolver, BricksListComponent);
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
        function () {
            _this.editor.nativeElement.focus();
        }));
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
                    template: "<p #editor\n   attr.placeholder=\"{{placeholder}}\"\n   (input)=\"onTextChange()\"\n   [(ngModel)]=\"scope.text\"\n   (keydown)=\"onKeyPress($event)\"\n   (click)=\"onClick($event)\"\n   class=\"text-brick__editor\"\n   [ngClass]=\"'text-brick-tabs-' + scope.tabs\"\n   (blur)=\"onBlur()\"\n   (focus)=\"onFocus()\"\n   contenteditable\n   [propValueAccessor]=\"'innerHTML'\">\n</p>\n<!--<mat-icon *ngIf=\"!brickSelectionModalRef\" (click)=\"openBricksListModal()\">add_box</mat-icon>-->\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1icmljay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9icmlja3MvdGV4dC1icmljay9jb21wb25lbnQvdGV4dC1icmljay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLHdCQUF3QixFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFvQixNQUFNLGVBQWUsQ0FBQztBQUNuSSxPQUFPLEVBQWlCLGtCQUFrQixFQUFFLHNCQUFzQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDNUYsT0FBTyxFQUFDLFNBQVMsRUFBRSxPQUFPLEVBQWUsTUFBTSxNQUFNLENBQUM7QUFDdEQsT0FBTyxFQUFDLFlBQVksRUFBRSxNQUFNLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFDdEUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBQ3JFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGdEQUFnRCxDQUFDO0FBQ2hGLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLGlEQUFpRCxDQUFDO0FBQ3ZGLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBRXpFLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLGtEQUFrRCxDQUFDO0FBRTFGLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLDRDQUE0QyxDQUFDO0FBQzdFLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUVyRTtJQUt3Qyw4Q0FBc0I7SUFnQzFELDRCQUFvQixJQUFZLEVBQ1oscUJBQXlDLEVBQ3pDLEVBQXFCLEVBQ3JCLHdCQUFrRCxFQUNsRCxFQUFjO1FBSmxDLFlBS0ksaUJBQU8sU0EwQlY7UUEvQm1C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QyxzQkFBc0IsR0FpYjdEO1NBamJZLGtCQUFrQjs7O0lBQzNCLHVDQUErQjs7SUFFL0IseUNBQW1COztJQUVuQixvREFBdUM7O0lBQ3ZDLGlEQUFvQzs7SUFFcEMsaUNBQW9COztJQUNwQixtQ0FBc0I7O0lBQ3RCLG9DQUF1Qjs7SUFDdkIsMENBQThDOztJQUU5QywyQ0FBbUM7O0lBRW5DLDJDQUdFOztJQUVGLGlDQVVFOzs7OztJQUVVLGtDQUFvQjs7Ozs7SUFDcEIsbURBQWlEOzs7OztJQUNqRCxnQ0FBNkI7Ozs7O0lBQzdCLHNEQUEwRDs7Ozs7SUFDMUQsZ0NBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIEVsZW1lbnRSZWYsIElucHV0LCBOZ1pvbmUsIE9uRGVzdHJveSwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3RpY2t5TW9kYWxSZWYsIFN0aWNreU1vZGFsU2VydmljZSwgU3RpY2t5UG9zaXRpb25TdHJhdGVneX0gZnJvbSAnbmd4LXN0aWNreS1tb2RhbCc7XG5pbXBvcnQge2Zyb21FdmVudCwgU3ViamVjdCwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZGVib3VuY2VUaW1lLCBmaWx0ZXJ9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7SW1nRW5jb2Rlcn0gZnJvbSAnLi4vLi4vLi4vbW9kdWxlcy91dGlscy9pbWctZW5jb2Rlci5zZXJ2aWNlJztcbmltcG9ydCB7Tm9kZVRyZWVTcGxpdH0gZnJvbSAnLi4vLi4vLi4vbW9kdWxlcy91dGlscy9ub2RlLXRyZWUtc3BsaXQnO1xuaW1wb3J0IHtUcmVlTm9kZVRyYXZlcnNlfSBmcm9tICcuLi8uLi8uLi9tb2R1bGVzL3V0aWxzL25vZGUvdHJlZS1ub2RlLXRyYXZlcnNlJztcbmltcG9ydCB7QmFzZVRleHRCcmlja0NvbXBvbmVudH0gZnJvbSAnLi4vLi4vYmFzZS10ZXh0LWJyaWNrL2Jhc2UtdGV4dC1icmljay5jb21wb25lbnQnO1xuaW1wb3J0IHtCcmlja3NMaXN0Q29tcG9uZW50fSBmcm9tICcuLi9icmlja3MtbGlzdC9icmlja3MtbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHtJVGV4dEJyaWNrQXBpfSBmcm9tICcuLi90ZXh0LWJyaWNrLWFwaS5pbnRlcmZhY2UnO1xuaW1wb3J0IHtUZXh0Q29udGV4dE1lbnVDb21wb25lbnR9IGZyb20gJy4uL3RleHQtY29udGV4dC1tZW51L3RleHQtY29udGV4dC1tZW51LmNvbXBvbmVudCc7XG5pbXBvcnQge0lXYWxsTW9kZWx9IGZyb20gJy4uLy4uLy4uL3dhbGwvbW9kZWwvaW50ZXJmYWNlcy93YWxsLW1vZGVsLmludGVyZmFjZSc7XG5pbXBvcnQge0RJVklERVJfQlJJQ0tfVEFHfSBmcm9tICcuLi8uLi9kaXZpZGVyLWJyaWNrL2RpdmlkZXItYnJpY2suY29uc3RhbnQnO1xuaW1wb3J0IHtnZXRNb2RhbENvbmZpZ30gZnJvbSAnLi4vLi4vYmFzZS1icmljay9iYXNlLWJyaWNrLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndGV4dC1icmljaycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3RleHQtYnJpY2suY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3RleHQtYnJpY2suY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBUZXh0QnJpY2tDb21wb25lbnQgZXh0ZW5kcyBCYXNlVGV4dEJyaWNrQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIElUZXh0QnJpY2tBcGkge1xuICAgIEBJbnB1dCgpIHdhbGxNb2RlbDogSVdhbGxNb2RlbDtcblxuICAgIHBsYWNlaG9sZGVyID0gbnVsbDtcblxuICAgIGJyaWNrU2VsZWN0aW9uTW9kYWxSZWY6IFN0aWNreU1vZGFsUmVmO1xuICAgIGNvbnRleHRNZW51TW9kYWxSZWY6IFN0aWNreU1vZGFsUmVmO1xuXG4gICAgdXAkID0gbmV3IFN1YmplY3QoKTtcbiAgICBkb3duJCA9IG5ldyBTdWJqZWN0KCk7XG4gICAgZW50ZXIkID0gbmV3IFN1YmplY3QoKTtcbiAgICBzZWxlY3RlZFRhZyQ6IFN1YmplY3Q8c3RyaW5nPiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgICBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gICAgc2VsZWN0aW9uSW5mbzoge1xuICAgICAgICByYW5nZXM6IFJhbmdlW10sXG4gICAgICAgIHNlbGVjdGVkTGluazogSFRNTEVsZW1lbnRcbiAgICB9O1xuXG4gICAgYXBpOiBJVGV4dEJyaWNrQXBpID0ge1xuICAgICAgICBib2xkOiB0aGlzLmJvbGQuYmluZCh0aGlzKSxcbiAgICAgICAgaXRhbGljOiB0aGlzLml0YWxpYy5iaW5kKHRoaXMpLFxuICAgICAgICBjcmVhdGVMaW5rOiB0aGlzLmNyZWF0ZUxpbmsuYmluZCh0aGlzKSxcbiAgICAgICAgY2hhbmdlTGlua1VybDogdGhpcy5jaGFuZ2VMaW5rVXJsLmJpbmQodGhpcyksXG4gICAgICAgIGlzTGlua1NlbGVjdGVkOiB0aGlzLmlzTGlua1NlbGVjdGVkLmJpbmQodGhpcyksXG4gICAgICAgIGdldFNlbGVjdGVkTGlua0hyZWY6IHRoaXMuZ2V0U2VsZWN0ZWRMaW5rSHJlZi5iaW5kKHRoaXMpLFxuICAgICAgICBzYXZlU2VsZWN0aW9uOiB0aGlzLnNhdmVTZWxlY3Rpb24uYmluZCh0aGlzKSxcbiAgICAgICAgcmVzdG9yZVNlbGVjdGlvbjogdGhpcy5yZXN0b3JlU2VsZWN0aW9uLmJpbmQodGhpcyksXG4gICAgICAgIHVubGluazogdGhpcy51bmxpbmsuYmluZCh0aGlzKVxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHpvbmU6IE5nWm9uZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIG5neFN0aWNreU1vZGFsU2VydmljZTogU3RpY2t5TW9kYWxTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZikge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUYWckLnN1YnNjcmliZSgobmV3VGFnKSA9PiB7XG4gICAgICAgICAgICBpZiAobmV3VGFnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlQnJpY2tzTGlzdCgpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy53YWxsTW9kZWwuYXBpLmNvcmUudHVybkJyaWNrSW50byh0aGlzLmlkLCBuZXdUYWcpO1xuXG4gICAgICAgICAgICAgICAgaWYgKG5ld1RhZyA9PT0gRElWSURFUl9CUklDS19UQUcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YWxsTW9kZWwuYXBpLmNvcmUuYWRkQnJpY2tBZnRlckJyaWNrSWQodGhpcy5pZCwgJ3RleHQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgICAgICAgLy8gc2hvdyBzdWItbWVudSBmb3Igc2VsZWN0ZWQgdGV4dFxuICAgICAgICAgICAgZnJvbUV2ZW50KHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ21vdXNldXAnKVxuICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXIoKCkgPT4gQm9vbGVhbih0aGlzLnNjb3BlLnRleHQubGVuZ3RoKSksXG4gICAgICAgICAgICAgICAgICAgIGRlYm91bmNlVGltZSg1MDApLFxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXIoKCkgPT4gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5hbmNob3JOb2RlKSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25UZXh0U2VsZWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcblxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaCgoc3Vic2NyaXB0aW9uKSA9PiB7XG4gICAgICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25CbHVyKCkge1xuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBvbkZvY3VzKCkge1xuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyID0gJ1R5cGUgXFwnL1xcJyBmb3IgY29tbWFuZHMnO1xuICAgIH1cblxuICAgIG9uS2V5UHJlc3MoZTogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBzdXBlci5vbktleVByZXNzKGUpO1xuXG4gICAgICAgIHRoaXMuaGlkZUNvbnRleHRNZW51TW9kYWwoKTtcbiAgICB9XG5cbiAgICAvLyBvcGVuIHRoZSBsaW5rIGluIG5ldyB3aW5kb3dcbiAgICBvbkNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBOb2RlO1xuXG4gICAgICAgIGlmICh0aGlzLmlzSFRNTEVsZW1lbnQodGFyZ2V0KSkge1xuICAgICAgICAgICAgaWYgKHRhcmdldC50YWdOYW1lID09PSAnQScpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cub3Blbih0YXJnZXQuZ2V0QXR0cmlidXRlKCdocmVmJyksICdfYmxhbmsnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvcEtleVByZXNzZWQoZTogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5icmlja1NlbGVjdGlvbk1vZGFsUmVmKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICB0aGlzLnVwJC5uZXh0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdXBlci50b3BLZXlQcmVzc2VkKGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYm90dG9tS2V5UHJlc3NlZChlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmJyaWNrU2VsZWN0aW9uTW9kYWxSZWYpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgIHRoaXMuZG93biQubmV4dCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3VwZXIuYm90dG9tS2V5UHJlc3NlZChlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVudGVyS2V5UHJlc3NlZChlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmJyaWNrU2VsZWN0aW9uTW9kYWxSZWYpIHtcbiAgICAgICAgICAgIHRoaXMuZW50ZXIkLm5leHQoKTtcblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlQnJpY2tzTGlzdCgpO1xuICAgICAgICAgICAgfSwgMTApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNUYWcoKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1RhZyA9IHRoaXMuc2NvcGUudGV4dC5zbGljZSgxKTtcblxuICAgICAgICAgICAgICAgIHRoaXMud2FsbE1vZGVsLmFwaS5jb3JlLnR1cm5Ccmlja0ludG8odGhpcy5pZCwgbmV3VGFnKTtcblxuICAgICAgICAgICAgICAgIC8vIGQgLSBkaXZpZGVyIHRhZ1xuICAgICAgICAgICAgICAgIGlmIChuZXdUYWcgPT09ICdkJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkuY29yZS5hZGRCcmlja0FmdGVyQnJpY2tJZCh0aGlzLmlkLCAndGV4dCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3VwZXIuZW50ZXJLZXlQcmVzc2VkKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0U3BsaXR0ZWRUZXh0KG9mZnNldDogbnVtYmVyLCB0YXJnZXQ6IE5vZGUpOiB7IGxlZnQ6IHN0cmluZywgcmlnaHQ6IHN0cmluZyB9IHtcbiAgICAgICAgY29uc3Qgbm9kZVRyZWVTcGxpdCA9IG5ldyBOb2RlVHJlZVNwbGl0KHRoaXMuZWRpdG9yLm5hdGl2ZUVsZW1lbnQsIHRhcmdldCwgb2Zmc2V0KTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGVmdDogbm9kZVRyZWVTcGxpdC5sZWZ0VHJlZS5pbm5lckhUTUwsXG4gICAgICAgICAgICByaWdodDogbm9kZVRyZWVTcGxpdC5yaWdodFRyZWUuaW5uZXJIVE1MXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZXNjYXBlS2V5UHJlc3NlZChlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmJyaWNrU2VsZWN0aW9uTW9kYWxSZWYpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgIHRoaXMuaGlkZUJyaWNrc0xpc3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uVGV4dENoYW5nZSgpIHtcbiAgICAgICAgc3VwZXIub25UZXh0Q2hhbmdlKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuYnJpY2tTZWxlY3Rpb25Nb2RhbFJlZikge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnNjb3BlLnRleHQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlQnJpY2tzTGlzdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2NvcGUudGV4dFswXSA9PT0gJy8nICYmIHRoaXMuc2NvcGUudGV4dC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMub3BlbkJyaWNrc0xpc3RNb2RhbCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb3BlbkJyaWNrc0xpc3RNb2RhbCgpIHtcbiAgICAgICAgdGhpcy5lZGl0b3IubmF0aXZlRWxlbWVudC5ibHVyKCk7XG5cbiAgICAgICAgY29uc3QgbW9kYWxDb25maWcgPSBnZXRNb2RhbENvbmZpZyh0aGlzLmVsLCB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQnJpY2tzTGlzdENvbXBvbmVudCk7XG4gICAgICAgIG1vZGFsQ29uZmlnLmRhdGEgPSB7XG4gICAgICAgICAgICB0ZXh0JDogdGhpcy50ZXh0Q2hhbmdlLFxuICAgICAgICAgICAgdXAkOiB0aGlzLnVwJCxcbiAgICAgICAgICAgIGRvd24kOiB0aGlzLmRvd24kLFxuICAgICAgICAgICAgZW50ZXIkOiB0aGlzLmVudGVyJCxcbiAgICAgICAgICAgIHNlbGVjdGVkVGFnJDogdGhpcy5zZWxlY3RlZFRhZyRcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5icmlja1NlbGVjdGlvbk1vZGFsUmVmID0gdGhpcy5uZ3hTdGlja3lNb2RhbFNlcnZpY2Uub3Blbihtb2RhbENvbmZpZyk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVkaXRvci5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uUGFzdGUoZTogQ2xpcGJvYXJkRXZlbnQpIHtcbiAgICAgICAgY29uc3QgaW1hZ2VEYXRhVHJhbnNmZXJJdGVtID0gdGhpcy5leHRyYWN0SW1hZ2VEYXRhVHJhbnNmZXJJdGVtKGUuY2xpcGJvYXJkRGF0YS5pdGVtcyk7XG5cbiAgICAgICAgaWYgKGltYWdlRGF0YVRyYW5zZmVySXRlbSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAobmV3IEltZ0VuY29kZXIoaW1hZ2VEYXRhVHJhbnNmZXJJdGVtLmdldEFzRmlsZSgpKSkuZ2V0QmFzZTY0UmVwcmVzZW50YXRpb24oKS50aGVuKChpbWdCYXNlNjQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkuY29yZS50dXJuQnJpY2tJbnRvKHRoaXMuaWQsICdpbWFnZScsIHtcbiAgICAgICAgICAgICAgICAgICAgc3JjOiBpbWdCYXNlNjRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3VwZXIub25QYXN0ZShlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uVGV4dFNlbGVjdGlvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbnRleHRNZW51TW9kYWxSZWYpIHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcblxuICAgICAgICAgICAgaWYgKCFzZWxlY3Rpb24uaXNDb2xsYXBzZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dDb250ZXh0TW9kYWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFQSVxuICAgIGJvbGQoKTogdm9pZCB7XG4gICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdib2xkJywgZmFsc2UpO1xuICAgIH1cblxuICAgIGl0YWxpYygpOiB2b2lkIHtcbiAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2l0YWxpYycsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBjcmVhdGVMaW5rKHVybDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjcmVhdGVMaW5rJywgZmFsc2UsIHVybCk7XG4gICAgfVxuXG4gICAgZ2V0U2VsZWN0ZWRMaW5rSHJlZigpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25JbmZvLnNlbGVjdGVkTGluaykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uSW5mby5zZWxlY3RlZExpbmsuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmxpbmsoKTogdm9pZCB7XG4gICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCd1bmxpbmsnLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgY2hhbmdlTGlua1VybCh1cmw6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25JbmZvLnNlbGVjdGVkTGluaykge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25JbmZvLnNlbGVjdGVkTGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCB1cmwpO1xuXG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJFZGl0b3JDaGFuZ2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzTGlua1NlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gQm9vbGVhbih0aGlzLnNlbGVjdGlvbkluZm8gJiYgdGhpcy5zZWxlY3Rpb25JbmZvLnNlbGVjdGVkTGluayk7XG4gICAgfVxuXG4gICAgc2F2ZVNlbGVjdGlvbigpIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25JbmZvID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRMaW5rOiB0aGlzLmdldFNlbGVjdGVkTGluaygpLFxuICAgICAgICAgICAgcmFuZ2VzOiB0aGlzLmdldFNlbGVjdGVkUmFuZ2VzKClcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXN0b3JlU2VsZWN0aW9uKCkge1xuICAgICAgICBjb25zdCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG5cbiAgICAgICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0aGlzLnNlbGVjdGlvbkluZm8ucmFuZ2VzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgICAgICBzZWwuYWRkUmFuZ2UodGhpcy5zZWxlY3Rpb25JbmZvLnJhbmdlc1tpXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBlbmQgQVBJXG5cbiAgICBwcml2YXRlIGdldFNlbGVjdGVkTGluaygpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcblxuICAgICAgICBsZXQgYW5jaG9yTm9kZUxpbms7XG4gICAgICAgIGxldCBmb2N1c05vZGVMaW5rO1xuXG4gICAgICAgIGNvbnN0IGlzQW5jaG9yTm9kZUJlbG9uZ1RvQnJpY2sgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoc2VsZWN0aW9uLmFuY2hvck5vZGUpO1xuICAgICAgICBjb25zdCBpc0ZvY3VzTm9kZUJlbG9uZ1RvQnJpY2sgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoc2VsZWN0aW9uLmZvY3VzTm9kZSk7XG5cbiAgICAgICAgaWYgKGlzQW5jaG9yTm9kZUJlbG9uZ1RvQnJpY2spIHtcbiAgICAgICAgICAgIGFuY2hvck5vZGVMaW5rID0gdGhpcy5maW5kUGFyZW50TGluayhzZWxlY3Rpb24uYW5jaG9yTm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGb2N1c05vZGVCZWxvbmdUb0JyaWNrKSB7XG4gICAgICAgICAgICBmb2N1c05vZGVMaW5rID0gdGhpcy5maW5kUGFyZW50TGluayhzZWxlY3Rpb24uZm9jdXNOb2RlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhbmNob3JOb2RlTGluaykge1xuICAgICAgICAgICAgcmV0dXJuIGFuY2hvck5vZGVMaW5rO1xuICAgICAgICB9IGVsc2UgaWYgKGZvY3VzTm9kZUxpbmspIHtcbiAgICAgICAgICAgIHJldHVybiBmb2N1c05vZGVMaW5rO1xuICAgICAgICB9IGVsc2UgaWYgKHNlbGVjdGlvbi5hbmNob3JOb2RlICE9PSBzZWxlY3Rpb24uZm9jdXNOb2RlICYmXG4gICAgICAgICAgICBpc0ZvY3VzTm9kZUJlbG9uZ1RvQnJpY2sgJiYgaXNBbmNob3JOb2RlQmVsb25nVG9Ccmljaykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmluZExpbmtCZXR3ZWVuTm9kZXMoc2VsZWN0aW9uLmFuY2hvck5vZGUsIHNlbGVjdGlvbi5mb2N1c05vZGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0cmlnZ2VyRWRpdG9yQ2hhbmdlKCkge1xuICAgICAgICB0aGlzLmVkaXRvci5uYXRpdmVFbGVtZW50LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdpbnB1dCcpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dDb250ZXh0TW9kYWwoKSB7XG4gICAgICAgIHRoaXMuZWRpdG9yLm5hdGl2ZUVsZW1lbnQuYmx1cigpO1xuXG4gICAgICAgIGNvbnN0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcblxuICAgICAgICBjb25zdCBlbGVtZW50Qm91bmRpbmdSZWN0ID0gc2VsLmdldFJhbmdlQXQoMCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgdGhpcy5jb250ZXh0TWVudU1vZGFsUmVmID0gdGhpcy5uZ3hTdGlja3lNb2RhbFNlcnZpY2Uub3Blbih7XG4gICAgICAgICAgICBjb21wb25lbnQ6IFRleHRDb250ZXh0TWVudUNvbXBvbmVudCxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBhcGk6IHRoaXMuYXBpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcG9zaXRpb25TdHJhdGVneToge1xuICAgICAgICAgICAgICAgIG5hbWU6IFN0aWNreVBvc2l0aW9uU3RyYXRlZ3kuY29vcmRpbmF0ZSxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWVudFg6IGVsZW1lbnRCb3VuZGluZ1JlY3QubGVmdCArICgoZWxlbWVudEJvdW5kaW5nUmVjdC5yaWdodCAtIGVsZW1lbnRCb3VuZGluZ1JlY3QubGVmdCkgLyAyLjUpLFxuICAgICAgICAgICAgICAgICAgICBjbGllbnRZOiBlbGVtZW50Qm91bmRpbmdSZWN0LnRvcCAtIDM1XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG92ZXJsYXlDb25maWc6IHtcbiAgICAgICAgICAgICAgICBoYXNCYWNrZHJvcDogZmFsc2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY29udGV4dE1lbnVNb2RhbFJlZi5yZXN1bHQudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmhpZGVDb250ZXh0TWVudU1vZGFsKCk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGlkZUNvbnRleHRNZW51TW9kYWwoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVkaXRvci5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIHRvZG86IG1pZ2h0IGJlIGFzIHV0aWwgbWV0aG9kXG4gICAgcHJpdmF0ZSBnZXRTZWxlY3RlZFJhbmdlcygpOiBSYW5nZVtdIHtcbiAgICAgICAgY29uc3Qgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgICAgICBjb25zdCByYW5nZXMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gc2VsLnJhbmdlQ291bnQ7IGkgPCBsZW47ICsraSkge1xuICAgICAgICAgICAgcmFuZ2VzLnB1c2goc2VsLmdldFJhbmdlQXQoaSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJhbmdlcztcbiAgICB9XG5cbiAgICBwcml2YXRlIGV4dHJhY3RJbWFnZURhdGFUcmFuc2Zlckl0ZW0oaXRlbXM6IERhdGFUcmFuc2Zlckl0ZW1MaXN0KTogRGF0YVRyYW5zZmVySXRlbSB7XG4gICAgICAgIGxldCBpbmRleDtcblxuICAgICAgICBmb3IgKGluZGV4IGluIGl0ZW1zKSB7XG4gICAgICAgICAgICBpZiAoaXRlbXMuaGFzT3duUHJvcGVydHkoaW5kZXgpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IGl0ZW1zW2luZGV4XTtcblxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmtpbmQgPT09ICdmaWxlJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGlzVGFnKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY29wZS50ZXh0ICYmIHRoaXMuc2NvcGUudGV4dFswXSA9PT0gJy8nICYmXG4gICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkuY29yZS5pc1JlZ2lzdGVyZWRCcmljayh0aGlzLnNjb3BlLnRleHQuc2xpY2UoMSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGlkZUJyaWNrc0xpc3QoKSB7XG4gICAgICAgIGlmICh0aGlzLmJyaWNrU2VsZWN0aW9uTW9kYWxSZWYpIHtcbiAgICAgICAgICAgIHRoaXMuYnJpY2tTZWxlY3Rpb25Nb2RhbFJlZi5jbG9zZSgpO1xuXG4gICAgICAgICAgICB0aGlzLmJyaWNrU2VsZWN0aW9uTW9kYWxSZWYgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoaWRlQ29udGV4dE1lbnVNb2RhbCgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGV4dE1lbnVNb2RhbFJlZikge1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0TWVudU1vZGFsUmVmLmNsb3NlKCk7XG5cbiAgICAgICAgICAgIHRoaXMuY29udGV4dE1lbnVNb2RhbFJlZiA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGZpbmRQYXJlbnRMaW5rKG5vZGU6IE5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBjdXJyZW50Tm9kZTogTm9kZSA9IG5vZGU7XG4gICAgICAgIGxldCBsaW5rTm9kZSA9IG51bGw7XG5cbiAgICAgICAgd2hpbGUgKCFsaW5rTm9kZSAmJiBjdXJyZW50Tm9kZSAhPT0gdGhpcy5lbC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAoKGN1cnJlbnROb2RlIGFzIEhUTUxFbGVtZW50KS50YWdOYW1lID09PSAnQScpIHtcbiAgICAgICAgICAgICAgICBsaW5rTm9kZSA9IGN1cnJlbnROb2RlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbGlua05vZGU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmaW5kTGlua0JldHdlZW5Ob2Rlcyhub2RlQTogTm9kZSwgbm9kZUI6IE5vZGUpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IHRyZWVOb2RlVHJhdmVyc2UgPSBuZXcgVHJlZU5vZGVUcmF2ZXJzZSh0aGlzLmVkaXRvci5uYXRpdmVFbGVtZW50KTtcblxuICAgICAgICBjb25zdCBvcmRlcmVkTm9kZXMgPSB0cmVlTm9kZVRyYXZlcnNlLmdldFBvc3RQcmVPcmRlck5vZGVzKCk7XG5cbiAgICAgICAgbGV0IG5vZGVBSW5kZXggPSBvcmRlcmVkTm9kZXMuaW5kZXhPZihub2RlQSk7XG4gICAgICAgIGxldCBub2RlQkluZGV4ID0gb3JkZXJlZE5vZGVzLmluZGV4T2Yobm9kZUIpO1xuXG4gICAgICAgIGlmIChub2RlQkluZGV4IDwgbm9kZUFJbmRleCkge1xuICAgICAgICAgICAgY29uc3QgdGVtcCA9IG5vZGVCSW5kZXg7XG5cbiAgICAgICAgICAgIG5vZGVCSW5kZXggPSBub2RlQUluZGV4O1xuICAgICAgICAgICAgbm9kZUFJbmRleCA9IHRlbXA7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvcmRlcmVkTm9kZXNCZXR3ZWVuTm9kZXMgPSBvcmRlcmVkTm9kZXMuc2xpY2Uobm9kZUFJbmRleCwgbm9kZUJJbmRleCk7XG5cbiAgICAgICAgY29uc3QgbGlua05vZGVzID0gb3JkZXJlZE5vZGVzQmV0d2Vlbk5vZGVzLmZpbHRlcigobm9kZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNIVE1MRWxlbWVudChub2RlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBub2RlLnRhZ05hbWUgPT09ICdBJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGxpbmtOb2Rlc1swXSBhcyBIVE1MRWxlbWVudDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzSFRNTEVsZW1lbnQobm9kZTogTm9kZSB8IEhUTUxFbGVtZW50KTogbm9kZSBpcyBIVE1MRWxlbWVudCB7XG4gICAgICAgIHJldHVybiAobm9kZSBhcyBIVE1MRWxlbWVudCkucXVlcnlTZWxlY3RvciAhPT0gdW5kZWZpbmVkO1xuICAgIH1cbn1cbiJdfQ==