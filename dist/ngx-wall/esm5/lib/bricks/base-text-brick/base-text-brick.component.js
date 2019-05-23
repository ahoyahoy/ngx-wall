/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DeepLeftNodeChild } from '../../modules/utils/deep-left-node-child';
import { DeepRightNodeChild } from '../../modules/utils/deep-right-node-child';
import { FirstSubStringNode } from '../../modules/utils/first-sub-string-node';
import { CaretStartEndPosition } from '../../modules/utils/node/caret-start-end-position';
import { CursorLeftCoordinate } from '../../modules/utils/node/cursor-left-coordinate';
import { CursorPositionInLine } from '../../modules/utils/node/cursor-position-in-line';
import { PlaceCaretToPosition } from '../../modules/utils/node/place-caret-to-position';
import { StringWithoutEmptyNodes } from '../../modules/utils/node/string-without-empty-nodes';
import { BACK_SPACE_KEY, BACK_SPACE_KEY_CODE_ANDROID, BOTTOM_KEY, DELETE_KEY, ENTER_KEY, ENTER_KEY_CODE_ANDROID, ESCAPE_KEY, FOCUS_INITIATOR, LEFT_KEY, NUMPUB_ENTER_KEY, RIGHT_KEY, TAB_KEY, TOP_KEY } from './base-text-brick.constant';
import { BottomKeyHandler } from './keypress-handlers/bottom-key.handler';
import { EnterKeyHandler } from './keypress-handlers/enter-key.handler';
import { LeftKeyHandler } from './keypress-handlers/left-key.handler';
import { RightKeyHandler } from './keypress-handlers/right-key.handler';
import { TopKeyHandler } from './keypress-handlers/top-key.handler';
/** @enum {string} */
var LineType = {
    first: 'FIRST',
    last: 'LAST',
};
/**
 * @record
 */
export function ICursorPositionInLine() { }
if (false) {
    /** @type {?} */
    ICursorPositionInLine.prototype.isOnLastLine;
    /** @type {?} */
    ICursorPositionInLine.prototype.isOnFirstLine;
}
/**
 * @abstract
 */
var BaseTextBrickComponent = /** @class */ (function () {
    function BaseTextBrickComponent() {
        this.stateChanges = new EventEmitter();
        this.keypressHandlers = {
            top: new TopKeyHandler(this),
            enter: new EnterKeyHandler(this),
            left: new LeftKeyHandler(this),
            right: new RightKeyHandler(this),
            bottom: new BottomKeyHandler(this)
        };
        this.scope = {
            text: '',
            tabs: 0
        };
        this.maxTabNumber = 3;
        this.textChange = new Subject();
    }
    /**
     * @return {?}
     */
    BaseTextBrickComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.state && this.state.text !== this.scope.text) {
            this.setTextState(this.state.text);
        }
        this.scope.tabs = this.state.tabs || 0;
        this.onPasteBound = this.onPaste.bind(this);
        this.editor.nativeElement.addEventListener('paste', this.onPasteBound);
        this.textChangeSubscription = this.textChange.subscribe(function () {
            _this.setTextState(_this.scope.text);
            _this.saveCurrentState();
        });
        this.wallUiApi = this.wallModel.api.ui;
    };
    /**
     * @param {?} newState
     * @return {?}
     */
    BaseTextBrickComponent.prototype.onWallStateChange = /**
     * @param {?} newState
     * @return {?}
     */
    function (newState) {
        this.scope.tabs = this.state.tabs || this.scope.tabs;
        if (newState && newState.text !== this.scope.text) {
            this.setTextState(newState.text);
        }
    };
    /**
     * @return {?}
     */
    BaseTextBrickComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.editor.nativeElement.removeEventListener('paste', this.onPasteBound);
        this.textChangeSubscription.unsubscribe();
    };
    /**
     * @param {?} e
     * @return {?}
     */
    BaseTextBrickComponent.prototype.onPaste = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        var _this = this;
        e.preventDefault();
        /** @type {?} */
        var textArr = e.clipboardData.getData('text/plain')
            .split('\n')
            .map(function (str) { return str.trim(); })
            .filter(function (str) { return str.length; });
        if (textArr.length === 1) {
            document.execCommand('insertHTML', false, textArr[0]);
        }
        else if (textArr.length > 1) {
            // todo: add interface for UI api
            textArr.reverse().forEach(function (text) { return _this.wallModel.api.core.addBrickAfterBrickId(_this.id, 'text', { text: text }); });
        }
    };
    /**
     * @return {?}
     */
    BaseTextBrickComponent.prototype.onTextChange = /**
     * @return {?}
     */
    function () {
        this.textChange.next(this.scope.text);
    };
    // general handler of all key events
    // general handler of all key events
    /**
     * @param {?} e
     * @return {?}
     */
    BaseTextBrickComponent.prototype.onKeyPress = 
    // general handler of all key events
    /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (this.noMetaKeyIsPressed(e)) {
            if (e.code === TOP_KEY) {
                this.topKeyPressed(e);
            }
            if (e.code === BOTTOM_KEY) {
                this.bottomKeyPressed(e);
            }
            if (e.code === LEFT_KEY && this.isCaretAtStart()) {
                this.leftKeyPressed(e);
            }
            if (e.code === RIGHT_KEY && this.isCaretAtEnd()) {
                this.rightKeyPressed(e);
            }
            if (e.code === ENTER_KEY || e.keyCode === ENTER_KEY_CODE_ANDROID || e.code === NUMPUB_ENTER_KEY) {
                this.enterKeyPressed(e);
            }
            if (e.keyCode === ESCAPE_KEY) {
                this.escapeKeyPressed(e);
            }
            if ((e.code === BACK_SPACE_KEY || e.keyCode === BACK_SPACE_KEY_CODE_ANDROID) && !this.isTextSelected()) {
                this.backSpaceKeyPressed(e);
            }
            if (e.code === DELETE_KEY && this.scope.text.length && this.isCaretAtEnd() && !this.isTextSelected()) {
                this.concatWithNextTextSupportingBrick(e);
            }
            if (e.code === TAB_KEY && this.isCaretAtStart()) {
                this.onTabPressed(e);
            }
            if (e.code === DELETE_KEY && this.scope.text === '') {
                this.onDeleteAndFocusToNext(e);
            }
        }
    };
    /**
     * @param {?} keyHandlerName
     * @param {?} e
     * @return {?}
     */
    BaseTextBrickComponent.prototype.proxyToKeyHandler = /**
     * @param {?} keyHandlerName
     * @param {?} e
     * @return {?}
     */
    function (keyHandlerName, e) {
        this.keypressHandlers[keyHandlerName].execute(e);
    };
    // key handler
    // key handler
    /**
     * @param {?} e
     * @return {?}
     */
    BaseTextBrickComponent.prototype.topKeyPressed = 
    // key handler
    /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this.proxyToKeyHandler('top', e);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    BaseTextBrickComponent.prototype.bottomKeyPressed = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this.proxyToKeyHandler('bottom', e);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    BaseTextBrickComponent.prototype.enterKeyPressed = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this.proxyToKeyHandler('enter', e);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    BaseTextBrickComponent.prototype.leftKeyPressed = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this.proxyToKeyHandler('left', e);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    BaseTextBrickComponent.prototype.rightKeyPressed = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this.proxyToKeyHandler('right', e);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    BaseTextBrickComponent.prototype.escapeKeyPressed = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        // do nothing
    };
    /**
     * @param {?} e
     * @return {?}
     */
    BaseTextBrickComponent.prototype.onTabPressed = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        e.preventDefault();
        this.increaseTab();
        this.saveCurrentState();
    };
    /**
     * @param {?} e
     * @return {?}
     */
    BaseTextBrickComponent.prototype.backSpaceKeyPressed = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (this.isCaretAtStart()) {
            if (this.scope.tabs) {
                this.decreaseTab();
                this.saveCurrentState();
            }
            else {
                if (this.scope.text.length) {
                    this.concatWithPreviousTextSupportingBrick(e);
                }
                else {
                    this.onDeleteAndFocusToPrevious(e);
                }
            }
        }
    };
    // end key handlers
    // end key handlers
    /**
     * @return {?}
     */
    BaseTextBrickComponent.prototype.isCaretAtFirstLine = 
    // end key handlers
    /**
     * @return {?}
     */
    function () {
        return this.getCursorPositionInLine().isOnFirstLine;
    };
    /**
     * @return {?}
     */
    BaseTextBrickComponent.prototype.isCaretAtLastLine = /**
     * @return {?}
     */
    function () {
        return this.getCursorPositionInLine().isOnLastLine;
    };
    /**
     * @return {?}
     */
    BaseTextBrickComponent.prototype.getCaretLeftCoordinate = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var sel = window.getSelection();
        /** @type {?} */
        var leftRightText = this.getSplittedText(sel.focusOffset, sel.focusNode);
        return (new CursorLeftCoordinate(leftRightText.left, leftRightText.right, this.editor.nativeElement)).get();
    };
    /**
     * @return {?}
     */
    BaseTextBrickComponent.prototype.getCursorPositionInLine = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var sel = window.getSelection();
        /** @type {?} */
        var leftRightText = this.getSplittedText(sel.focusOffset, sel.focusNode);
        return new CursorPositionInLine(leftRightText.left, leftRightText.right, this.editor.nativeElement);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    BaseTextBrickComponent.prototype.concatWithPreviousTextSupportingBrick = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        var _this = this;
        /** @type {?} */
        var previousTextBrickId = this.wallModel.api.core.getPreviousTextBrickId(this.id);
        if (previousTextBrickId) {
            e.preventDefault();
            /** @type {?} */
            var previousBrickSnapshot = this.wallModel.api.core.getBrickSnapshot(previousTextBrickId);
            this.wallModel.api.core.updateBrickState(previousTextBrickId, {
                text: this.cleanUpText(previousBrickSnapshot.state.text) + this.scope.text
            });
            // wait for component re-rendering
            setTimeout(function () {
                /** @type {?} */
                var focusContext = {
                    initiator: FOCUS_INITIATOR,
                    details: {
                        concatText: true,
                        concatenationText: _this.scope.text
                    }
                };
                _this.wallUiApi.focusOnBrickId(previousTextBrickId, focusContext);
                // remove only after focus will be established
                // that prevents flickering on mobile
                _this.wallUiApi.removeBrick(_this.id);
            });
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    BaseTextBrickComponent.prototype.concatWithNextTextSupportingBrick = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        var _this = this;
        /** @type {?} */
        var nextTextBrickId = this.wallModel.api.core.getNextTextBrickId(this.id);
        if (nextTextBrickId) {
            e.preventDefault();
            /** @type {?} */
            var nextTextBrickSnapshot = this.wallModel.api.core.getBrickSnapshot(nextTextBrickId);
            /** @type {?} */
            var concatenationText_1 = nextTextBrickSnapshot.state.text || '';
            this.setTextState(this.scope.text + concatenationText_1);
            this.saveCurrentState();
            this.wallModel.api.core.removeBrick(nextTextBrickId);
            setTimeout(function () {
                _this.placeCaretBaseOnConcatenatedText(concatenationText_1);
            }, 10);
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    BaseTextBrickComponent.prototype.onDeleteAndFocusToPrevious = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        e.preventDefault();
        /** @type {?} */
        var previousTextBrickId = this.wallModel.api.core.getPreviousTextBrickId(this.id);
        this.wallUiApi.removeBrick(this.id);
        if (previousTextBrickId) {
            /** @type {?} */
            var focusContext = {
                initiator: FOCUS_INITIATOR,
                details: {
                    deletePreviousText: true
                }
            };
            this.wallUiApi.focusOnBrickId(previousTextBrickId, focusContext);
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    BaseTextBrickComponent.prototype.onDeleteAndFocusToNext = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        e.preventDefault();
        /** @type {?} */
        var nextTextBrickId = this.wallModel.api.core.getNextTextBrickId(this.id);
        if (nextTextBrickId) {
            this.wallUiApi.removeBrick(this.id);
            /** @type {?} */
            var focusContext = {
                initiator: FOCUS_INITIATOR,
                details: {
                    deletePreviousText: true
                }
            };
            this.wallUiApi.focusOnBrickId(nextTextBrickId, focusContext);
        }
    };
    /**
     * @param {?} offset
     * @param {?} target
     * @return {?}
     */
    BaseTextBrickComponent.prototype.getSplittedText = /**
     * @param {?} offset
     * @param {?} target
     * @return {?}
     */
    function (offset, target) {
        return {
            left: this.scope.text.slice(0, offset),
            right: this.scope.text.slice(offset) || ''
        };
    };
    // key handler end
    // key handler end
    /**
     * @param {?=} context
     * @return {?}
     */
    BaseTextBrickComponent.prototype.onWallFocus = 
    // key handler end
    /**
     * @param {?=} context
     * @return {?}
     */
    function (context) {
        if (this.editor.nativeElement !== document.activeElement) {
            // focus by API call
            this.editor.nativeElement.focus();
            if (context && context.initiator === FOCUS_INITIATOR) {
                if (context.details.deletePreviousText) {
                    this.placeCaretAtEnd();
                }
                if (context.details.concatText) {
                    this.placeCaretBaseOnConcatenatedText(context.details.concatenationText);
                }
                if (context.details.leftKey) {
                    this.placeCaretAtEnd();
                }
                if (context.details.rightKey) {
                    this.placeCaretAtStart();
                }
                if (context.details.bottomKey || context.details.topKey) {
                    /** @type {?} */
                    var line = context.details.bottomKey ? LineType.first : LineType.last;
                    this.placeCaretAtLeftCoordinate(context.details.caretLeftCoordinate, line);
                }
            }
        }
    };
    /**
     * @param {?=} text
     * @return {?}
     */
    BaseTextBrickComponent.prototype.setTextState = /**
     * @param {?=} text
     * @return {?}
     */
    function (text) {
        if (text === void 0) { text = ''; }
        this.scope.text = this.cleanUpText(text);
    };
    /**
     * @return {?}
     */
    BaseTextBrickComponent.prototype.increaseTab = /**
     * @return {?}
     */
    function () {
        if (this.scope.tabs < this.maxTabNumber) {
            this.scope.tabs++;
        }
    };
    /**
     * @return {?}
     */
    BaseTextBrickComponent.prototype.decreaseTab = /**
     * @return {?}
     */
    function () {
        if (this.scope.tabs > 0) {
            this.scope.tabs--;
        }
    };
    /**
     * @return {?}
     */
    BaseTextBrickComponent.prototype.saveCurrentState = /**
     * @return {?}
     */
    function () {
        this.stateChanges.emit(this.scope);
    };
    // caret helpers
    // caret helpers
    /**
     * @return {?}
     */
    BaseTextBrickComponent.prototype.isTextSelected = 
    // caret helpers
    /**
     * @return {?}
     */
    function () {
        return !window.getSelection().isCollapsed;
    };
    /**
     * @return {?}
     */
    BaseTextBrickComponent.prototype.placeCaretAtStart = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var deepLeftNode = new DeepLeftNodeChild(this.editor.nativeElement);
        this.placeCaretAtNodeStart(deepLeftNode.child);
    };
    /**
     * @return {?}
     */
    BaseTextBrickComponent.prototype.placeCaretAtEnd = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var rightNode = new DeepRightNodeChild(this.editor.nativeElement);
        this.placeCaretAtNodeEnd(rightNode.child);
    };
    /**
     * @param {?} el
     * @return {?}
     */
    BaseTextBrickComponent.prototype.placeCaretAtNodeStart = /**
     * @param {?} el
     * @return {?}
     */
    function (el) {
        this.placeCaretAtNodeToPosition(el, 0);
    };
    /**
     * @param {?} el
     * @return {?}
     */
    BaseTextBrickComponent.prototype.placeCaretAtNodeEnd = /**
     * @param {?} el
     * @return {?}
     */
    function (el) {
        this.placeCaretAtNodeToPosition(el, el.textContent.length);
    };
    /**
     * @param {?} el
     * @param {?} position
     * @return {?}
     */
    BaseTextBrickComponent.prototype.placeCaretAtNodeToPosition = /**
     * @param {?} el
     * @param {?} position
     * @return {?}
     */
    function (el, position) {
        (new PlaceCaretToPosition(el, position)).place();
    };
    // find the node which contains concatenated text and position in this node where cursor should be placed
    // find the node which contains concatenated text and position in this node where cursor should be placed
    /**
     * @param {?} concatenationText
     * @return {?}
     */
    BaseTextBrickComponent.prototype.placeCaretBaseOnConcatenatedText = 
    // find the node which contains concatenated text and position in this node where cursor should be placed
    /**
     * @param {?} concatenationText
     * @return {?}
     */
    function (concatenationText) {
        if (concatenationText !== '') {
            // find first level nodes for the text that was concatenated
            /** @type {?} */
            var subStringNodes = new FirstSubStringNode(this.editor.nativeElement, concatenationText);
            // first level node which contains concatenated text
            /** @type {?} */
            var firstLevelSubStringNode = subStringNodes.firstLevelSubStringNodes[0];
            if (firstLevelSubStringNode) {
                /** @type {?} */
                var focusNode = void 0;
                /** @type {?} */
                var position = void 0;
                if (firstLevelSubStringNode.nodeType === Node.TEXT_NODE) {
                    // if first concatenated node is TEXT_NODE it might
                    // be automatically concatenated with previous existing TEXT_NODE
                    focusNode = firstLevelSubStringNode;
                    // find text content for first concatenated TEXT_NODE
                    /** @type {?} */
                    var p = document.createElement('P');
                    p.innerHTML = concatenationText;
                    /** @type {?} */
                    var firstLevelSubStringTextContent = p.childNodes[0].textContent;
                    // finally find cursor position
                    position = focusNode.textContent.length - firstLevelSubStringTextContent.length;
                }
                else {
                    focusNode = new DeepLeftNodeChild(firstLevelSubStringNode).child;
                    position = 0;
                }
                this.placeCaretAtNodeToPosition(focusNode, position);
            }
        }
    };
    /**
     * @param {?} leftCoordinate
     * @param {?} line
     * @return {?}
     */
    BaseTextBrickComponent.prototype.placeCaretAtLeftCoordinate = /**
     * @param {?} leftCoordinate
     * @param {?} line
     * @return {?}
     */
    function (leftCoordinate, line) {
        // todo: find the way to set caret based on coordinate number
        if (line === LineType.last) {
            this.placeCaretAtEnd();
        }
        else {
            this.placeCaretAtStart();
        }
    };
    /**
     * @return {?}
     */
    BaseTextBrickComponent.prototype.isCaretAtStart = /**
     * @return {?}
     */
    function () {
        return (new CaretStartEndPosition(this.editor.nativeElement)).isCaretAtStart();
    };
    /**
     * @return {?}
     */
    BaseTextBrickComponent.prototype.isCaretAtEnd = /**
     * @return {?}
     */
    function () {
        return (new CaretStartEndPosition(this.editor.nativeElement)).isCaretAtEnd();
    };
    // remove all unnecessary tags
    // remove all unnecessary tags
    /**
     * @param {?} text
     * @return {?}
     */
    BaseTextBrickComponent.prototype.cleanUpText = 
    // remove all unnecessary tags
    /**
     * @param {?} text
     * @return {?}
     */
    function (text) {
        return (new StringWithoutEmptyNodes(text)).get();
    };
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    BaseTextBrickComponent.prototype.noMetaKeyIsPressed = /**
     * @private
     * @param {?} e
     * @return {?}
     */
    function (e) {
        return !((e.shiftKey || e.altKey || e.ctrlKey || e.metaKey));
    };
    BaseTextBrickComponent.propDecorators = {
        id: [{ type: Input }],
        state: [{ type: Input }],
        wallModel: [{ type: Input }],
        stateChanges: [{ type: Output }],
        editor: [{ type: ViewChild, args: ['editor',] }]
    };
    return BaseTextBrickComponent;
}());
export { BaseTextBrickComponent };
if (false) {
    /** @type {?} */
    BaseTextBrickComponent.prototype.id;
    /** @type {?} */
    BaseTextBrickComponent.prototype.state;
    /** @type {?} */
    BaseTextBrickComponent.prototype.wallModel;
    /** @type {?} */
    BaseTextBrickComponent.prototype.stateChanges;
    /** @type {?} */
    BaseTextBrickComponent.prototype.editor;
    /** @type {?} */
    BaseTextBrickComponent.prototype.keypressHandlers;
    /** @type {?} */
    BaseTextBrickComponent.prototype.wallUiApi;
    /** @type {?} */
    BaseTextBrickComponent.prototype.scope;
    /** @type {?} */
    BaseTextBrickComponent.prototype.maxTabNumber;
    /** @type {?} */
    BaseTextBrickComponent.prototype.textChange;
    /** @type {?} */
    BaseTextBrickComponent.prototype.textChangeSubscription;
    /** @type {?} */
    BaseTextBrickComponent.prototype.onPasteBound;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS10ZXh0LWJyaWNrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL2JyaWNrcy9iYXNlLXRleHQtYnJpY2svYmFzZS10ZXh0LWJyaWNrLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BHLE9BQU8sRUFBQyxPQUFPLEVBQWUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sMENBQTBDLENBQUM7QUFDM0UsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sMkNBQTJDLENBQUM7QUFDN0UsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sMkNBQTJDLENBQUM7QUFDN0UsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sbURBQW1ELENBQUM7QUFDeEYsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0saURBQWlELENBQUM7QUFDckYsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sa0RBQWtELENBQUM7QUFDdEYsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sa0RBQWtELENBQUM7QUFDdEYsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0scURBQXFELENBQUM7QUFFNUYsT0FBTyxFQUNILGNBQWMsRUFDZCwyQkFBMkIsRUFDM0IsVUFBVSxFQUNWLFVBQVUsRUFDVixTQUFTLEVBQ1Qsc0JBQXNCLEVBQ3RCLFVBQVUsRUFDVixlQUFlLEVBQ2YsUUFBUSxFQUNSLGdCQUFnQixFQUNoQixTQUFTLEVBQ1QsT0FBTyxFQUNQLE9BQU8sRUFDVixNQUFNLDRCQUE0QixDQUFDO0FBRXBDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBQ3hFLE9BQU8sRUFBQyxlQUFlLEVB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Q0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNyRCxDQUFDOzs7Ozs7SUFFTyxtREFBa0I7Ozs7O0lBQTFCLFVBQTJCLENBQUM7UUFDeEIsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNqRSxDQUFDOztxQkE5YkEsS0FBSzt3QkFDTCxLQUFLOzRCQUNMLEtBQUs7K0JBRUwsTUFBTTt5QkFFTixTQUFTLFNBQUMsUUFBUTs7SUF5YnZCLDZCQUFDO0NBQUEsQUFoY0QsSUFnY0M7U0FoY3FCLHNCQUFzQjs7O0lBQ3hDLG9DQUFvQjs7SUFDcEIsdUNBQStCOztJQUMvQiwyQ0FBK0I7O0lBRS9CLDhDQUEwRTs7SUFFMUUsd0NBQXdDOztJQUV4QyxrREFNRTs7SUFFRiwyQ0FBc0I7O0lBRXRCLHVDQUdFOztJQUVGLDhDQUFpQjs7SUFFakIsNENBQTRDOztJQUU1Qyx3REFBcUM7O0lBRXJDLDhDQUF5QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3ViamVjdCwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7RGVlcExlZnROb2RlQ2hpbGR9IGZyb20gJy4uLy4uL21vZHVsZXMvdXRpbHMvZGVlcC1sZWZ0LW5vZGUtY2hpbGQnO1xuaW1wb3J0IHtEZWVwUmlnaHROb2RlQ2hpbGR9IGZyb20gJy4uLy4uL21vZHVsZXMvdXRpbHMvZGVlcC1yaWdodC1ub2RlLWNoaWxkJztcbmltcG9ydCB7Rmlyc3RTdWJTdHJpbmdOb2RlfSBmcm9tICcuLi8uLi9tb2R1bGVzL3V0aWxzL2ZpcnN0LXN1Yi1zdHJpbmctbm9kZSc7XG5pbXBvcnQge0NhcmV0U3RhcnRFbmRQb3NpdGlvbn0gZnJvbSAnLi4vLi4vbW9kdWxlcy91dGlscy9ub2RlL2NhcmV0LXN0YXJ0LWVuZC1wb3NpdGlvbic7XG5pbXBvcnQge0N1cnNvckxlZnRDb29yZGluYXRlfSBmcm9tICcuLi8uLi9tb2R1bGVzL3V0aWxzL25vZGUvY3Vyc29yLWxlZnQtY29vcmRpbmF0ZSc7XG5pbXBvcnQge0N1cnNvclBvc2l0aW9uSW5MaW5lfSBmcm9tICcuLi8uLi9tb2R1bGVzL3V0aWxzL25vZGUvY3Vyc29yLXBvc2l0aW9uLWluLWxpbmUnO1xuaW1wb3J0IHtQbGFjZUNhcmV0VG9Qb3NpdGlvbn0gZnJvbSAnLi4vLi4vbW9kdWxlcy91dGlscy9ub2RlL3BsYWNlLWNhcmV0LXRvLXBvc2l0aW9uJztcbmltcG9ydCB7U3RyaW5nV2l0aG91dEVtcHR5Tm9kZXN9IGZyb20gJy4uLy4uL21vZHVsZXMvdXRpbHMvbm9kZS9zdHJpbmctd2l0aG91dC1lbXB0eS1ub2Rlcyc7XG5pbXBvcnQge0lGb2N1c0NvbnRleHQsIElPbldhbGxGb2N1cywgSU9uV2FsbFN0YXRlQ2hhbmdlLCBJV2FsbENvbXBvbmVudCwgSVdhbGxNb2RlbCwgSVdhbGxVaUFwaX0gZnJvbSAnLi4vLi4vd2FsbC93YWxsJztcbmltcG9ydCB7XG4gICAgQkFDS19TUEFDRV9LRVksXG4gICAgQkFDS19TUEFDRV9LRVlfQ09ERV9BTkRST0lELFxuICAgIEJPVFRPTV9LRVksXG4gICAgREVMRVRFX0tFWSxcbiAgICBFTlRFUl9LRVksXG4gICAgRU5URVJfS0VZX0NPREVfQU5EUk9JRCxcbiAgICBFU0NBUEVfS0VZLFxuICAgIEZPQ1VTX0lOSVRJQVRPUixcbiAgICBMRUZUX0tFWSxcbiAgICBOVU1QVUJfRU5URVJfS0VZLFxuICAgIFJJR0hUX0tFWSxcbiAgICBUQUJfS0VZLFxuICAgIFRPUF9LRVlcbn0gZnJvbSAnLi9iYXNlLXRleHQtYnJpY2suY29uc3RhbnQnO1xuaW1wb3J0IHtJQmFzZVRleHRTdGF0ZX0gZnJvbSAnLi9iYXNlLXRleHQtc3RhdGUuaW50ZXJmYWNlJztcbmltcG9ydCB7Qm90dG9tS2V5SGFuZGxlcn0gZnJvbSAnLi9rZXlwcmVzcy1oYW5kbGVycy9ib3R0b20ta2V5LmhhbmRsZXInO1xuaW1wb3J0IHtFbnRlcktleUhhbmRsZXJ9IGZyb20gJy4va2V5cHJlc3MtaGFuZGxlcnMvZW50ZXIta2V5LmhhbmRsZXInO1xuaW1wb3J0IHtMZWZ0S2V5SGFuZGxlcn0gZnJvbSAnLi9rZXlwcmVzcy1oYW5kbGVycy9sZWZ0LWtleS5oYW5kbGVyJztcbmltcG9ydCB7UmlnaHRLZXlIYW5kbGVyfSBmcm9tICcuL2tleXByZXNzLWhhbmRsZXJzL3JpZ2h0LWtleS5oYW5kbGVyJztcbmltcG9ydCB7VG9wS2V5SGFuZGxlcn0gZnJvbSAnLi9rZXlwcmVzcy1oYW5kbGVycy90b3Ata2V5LmhhbmRsZXInO1xuXG5lbnVtIExpbmVUeXBlIHtcbiAgICBmaXJzdCA9ICdGSVJTVCcsXG4gICAgbGFzdCA9ICdMQVNUJ1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElDdXJzb3JQb3NpdGlvbkluTGluZSB7XG4gICAgaXNPbkxhc3RMaW5lOiBib29sZWFuO1xuICAgIGlzT25GaXJzdExpbmU6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlVGV4dEJyaWNrQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIElPbldhbGxTdGF0ZUNoYW5nZSwgSU9uV2FsbEZvY3VzLCBJV2FsbENvbXBvbmVudCB7XG4gICAgQElucHV0KCkgaWQ6IHN0cmluZztcbiAgICBASW5wdXQoKSBzdGF0ZTogSUJhc2VUZXh0U3RhdGU7XG4gICAgQElucHV0KCkgd2FsbE1vZGVsOiBJV2FsbE1vZGVsO1xuXG4gICAgQE91dHB1dCgpIHN0YXRlQ2hhbmdlczogRXZlbnRFbWl0dGVyPElCYXNlVGV4dFN0YXRlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2VkaXRvcicpIGVkaXRvcjogRWxlbWVudFJlZjtcblxuICAgIGtleXByZXNzSGFuZGxlcnMgPSB7XG4gICAgICAgIHRvcDogbmV3IFRvcEtleUhhbmRsZXIodGhpcyksXG4gICAgICAgIGVudGVyOiBuZXcgRW50ZXJLZXlIYW5kbGVyKHRoaXMpLFxuICAgICAgICBsZWZ0OiBuZXcgTGVmdEtleUhhbmRsZXIodGhpcyksXG4gICAgICAgIHJpZ2h0OiBuZXcgUmlnaHRLZXlIYW5kbGVyKHRoaXMpLFxuICAgICAgICBib3R0b206IG5ldyBCb3R0b21LZXlIYW5kbGVyKHRoaXMpXG4gICAgfTtcblxuICAgIHdhbGxVaUFwaTogSVdhbGxVaUFwaTtcblxuICAgIHNjb3BlOiBJQmFzZVRleHRTdGF0ZSA9IHtcbiAgICAgICAgdGV4dDogJycsXG4gICAgICAgIHRhYnM6IDBcbiAgICB9O1xuXG4gICAgbWF4VGFiTnVtYmVyID0gMztcblxuICAgIHRleHRDaGFuZ2U6IFN1YmplY3Q8c3RyaW5nPiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgICB0ZXh0Q2hhbmdlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBvblBhc3RlQm91bmQ6IChlOiBDbGlwYm9hcmRFdmVudCkgPT4gYW55O1xuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlICYmIHRoaXMuc3RhdGUudGV4dCAhPT0gdGhpcy5zY29wZS50ZXh0KSB7XG4gICAgICAgICAgICB0aGlzLnNldFRleHRTdGF0ZSh0aGlzLnN0YXRlLnRleHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zY29wZS50YWJzID0gdGhpcy5zdGF0ZS50YWJzIHx8IDA7XG5cbiAgICAgICAgdGhpcy5vblBhc3RlQm91bmQgPSB0aGlzLm9uUGFzdGUuYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLmVkaXRvci5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Bhc3RlJywgdGhpcy5vblBhc3RlQm91bmQpO1xuXG4gICAgICAgIHRoaXMudGV4dENoYW5nZVN1YnNjcmlwdGlvbiA9IHRoaXMudGV4dENoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRUZXh0U3RhdGUodGhpcy5zY29wZS50ZXh0KTtcbiAgICAgICAgICAgIHRoaXMuc2F2ZUN1cnJlbnRTdGF0ZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLndhbGxVaUFwaSA9IHRoaXMud2FsbE1vZGVsLmFwaS51aTtcbiAgICB9XG5cbiAgICBvbldhbGxTdGF0ZUNoYW5nZShuZXdTdGF0ZTogSUJhc2VUZXh0U3RhdGUpIHtcbiAgICAgICAgdGhpcy5zY29wZS50YWJzID0gdGhpcy5zdGF0ZS50YWJzIHx8IHRoaXMuc2NvcGUudGFicztcblxuICAgICAgICBpZiAobmV3U3RhdGUgJiYgbmV3U3RhdGUudGV4dCAhPT0gdGhpcy5zY29wZS50ZXh0KSB7XG4gICAgICAgICAgICB0aGlzLnNldFRleHRTdGF0ZShuZXdTdGF0ZS50ZXh0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmVkaXRvci5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Bhc3RlJywgdGhpcy5vblBhc3RlQm91bmQpO1xuXG4gICAgICAgIHRoaXMudGV4dENoYW5nZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIG9uUGFzdGUoZTogQ2xpcGJvYXJkRXZlbnQpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0IHRleHRBcnIgPSBlLmNsaXBib2FyZERhdGEuZ2V0RGF0YSgndGV4dC9wbGFpbicpXG4gICAgICAgICAgICAuc3BsaXQoJ1xcbicpXG4gICAgICAgICAgICAubWFwKChzdHIpID0+IHN0ci50cmltKCkpXG4gICAgICAgICAgICAuZmlsdGVyKChzdHIpID0+IHN0ci5sZW5ndGgpO1xuXG4gICAgICAgIGlmICh0ZXh0QXJyLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luc2VydEhUTUwnLCBmYWxzZSwgdGV4dEFyclswXSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGV4dEFyci5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAvLyB0b2RvOiBhZGQgaW50ZXJmYWNlIGZvciBVSSBhcGlcbiAgICAgICAgICAgIHRleHRBcnIucmV2ZXJzZSgpLmZvckVhY2goKHRleHQpID0+IHRoaXMud2FsbE1vZGVsLmFwaS5jb3JlLmFkZEJyaWNrQWZ0ZXJCcmlja0lkKHRoaXMuaWQsICd0ZXh0Jywge3RleHR9KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblRleHRDaGFuZ2UoKSB7XG4gICAgICAgIHRoaXMudGV4dENoYW5nZS5uZXh0KHRoaXMuc2NvcGUudGV4dCk7XG4gICAgfVxuXG4gICAgLy8gZ2VuZXJhbCBoYW5kbGVyIG9mIGFsbCBrZXkgZXZlbnRzXG4gICAgb25LZXlQcmVzcyhlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLm5vTWV0YUtleUlzUHJlc3NlZChlKSkge1xuICAgICAgICAgICAgaWYgKGUuY29kZSA9PT0gVE9QX0tFWSkge1xuICAgICAgICAgICAgICAgIHRoaXMudG9wS2V5UHJlc3NlZChlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGUuY29kZSA9PT0gQk9UVE9NX0tFWSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYm90dG9tS2V5UHJlc3NlZChlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGUuY29kZSA9PT0gTEVGVF9LRVkgJiYgdGhpcy5pc0NhcmV0QXRTdGFydCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sZWZ0S2V5UHJlc3NlZChlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGUuY29kZSA9PT0gUklHSFRfS0VZICYmIHRoaXMuaXNDYXJldEF0RW5kKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJpZ2h0S2V5UHJlc3NlZChlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGUuY29kZSA9PT0gRU5URVJfS0VZIHx8IGUua2V5Q29kZSA9PT0gRU5URVJfS0VZX0NPREVfQU5EUk9JRCB8fCBlLmNvZGUgPT09IE5VTVBVQl9FTlRFUl9LRVkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVudGVyS2V5UHJlc3NlZChlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gRVNDQVBFX0tFWSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZXNjYXBlS2V5UHJlc3NlZChlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKChlLmNvZGUgPT09IEJBQ0tfU1BBQ0VfS0VZIHx8IGUua2V5Q29kZSA9PT0gQkFDS19TUEFDRV9LRVlfQ09ERV9BTkRST0lEKSAmJiAhdGhpcy5pc1RleHRTZWxlY3RlZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iYWNrU3BhY2VLZXlQcmVzc2VkKGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZS5jb2RlID09PSBERUxFVEVfS0VZICYmIHRoaXMuc2NvcGUudGV4dC5sZW5ndGggJiYgdGhpcy5pc0NhcmV0QXRFbmQoKSAmJiAhdGhpcy5pc1RleHRTZWxlY3RlZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25jYXRXaXRoTmV4dFRleHRTdXBwb3J0aW5nQnJpY2soZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChlLmNvZGUgPT09IFRBQl9LRVkgJiYgdGhpcy5pc0NhcmV0QXRTdGFydCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vblRhYlByZXNzZWQoZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChlLmNvZGUgPT09IERFTEVURV9LRVkgJiYgdGhpcy5zY29wZS50ZXh0ID09PSAnJykge1xuICAgICAgICAgICAgICAgIHRoaXMub25EZWxldGVBbmRGb2N1c1RvTmV4dChlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3h5VG9LZXlIYW5kbGVyKGtleUhhbmRsZXJOYW1lOiBzdHJpbmcsIGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgdGhpcy5rZXlwcmVzc0hhbmRsZXJzW2tleUhhbmRsZXJOYW1lXS5leGVjdXRlKGUpO1xuICAgIH1cblxuICAgIC8vIGtleSBoYW5kbGVyXG4gICAgdG9wS2V5UHJlc3NlZChlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIHRoaXMucHJveHlUb0tleUhhbmRsZXIoJ3RvcCcsIGUpO1xuICAgIH1cblxuICAgIGJvdHRvbUtleVByZXNzZWQoZTogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICB0aGlzLnByb3h5VG9LZXlIYW5kbGVyKCdib3R0b20nLCBlKTtcbiAgICB9XG5cbiAgICBlbnRlcktleVByZXNzZWQoZTogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICB0aGlzLnByb3h5VG9LZXlIYW5kbGVyKCdlbnRlcicsIGUpO1xuICAgIH1cblxuICAgIGxlZnRLZXlQcmVzc2VkKGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgdGhpcy5wcm94eVRvS2V5SGFuZGxlcignbGVmdCcsIGUpO1xuICAgIH1cblxuICAgIHJpZ2h0S2V5UHJlc3NlZChlKSB7XG4gICAgICAgIHRoaXMucHJveHlUb0tleUhhbmRsZXIoJ3JpZ2h0JywgZSk7XG4gICAgfVxuXG4gICAgZXNjYXBlS2V5UHJlc3NlZChlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICB9XG5cbiAgICBvblRhYlByZXNzZWQoZTogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdGhpcy5pbmNyZWFzZVRhYigpO1xuICAgICAgICB0aGlzLnNhdmVDdXJyZW50U3RhdGUoKTtcbiAgICB9XG5cbiAgICBiYWNrU3BhY2VLZXlQcmVzc2VkKGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNDYXJldEF0U3RhcnQoKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NvcGUudGFicykge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVjcmVhc2VUYWIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNhdmVDdXJyZW50U3RhdGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NvcGUudGV4dC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25jYXRXaXRoUHJldmlvdXNUZXh0U3VwcG9ydGluZ0JyaWNrKGUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25EZWxldGVBbmRGb2N1c1RvUHJldmlvdXMoZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZW5kIGtleSBoYW5kbGVyc1xuXG4gICAgaXNDYXJldEF0Rmlyc3RMaW5lKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDdXJzb3JQb3NpdGlvbkluTGluZSgpLmlzT25GaXJzdExpbmU7XG4gICAgfVxuXG4gICAgaXNDYXJldEF0TGFzdExpbmUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEN1cnNvclBvc2l0aW9uSW5MaW5lKCkuaXNPbkxhc3RMaW5lO1xuICAgIH1cblxuICAgIGdldENhcmV0TGVmdENvb3JkaW5hdGUoKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3Qgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgICAgICBjb25zdCBsZWZ0UmlnaHRUZXh0ID0gdGhpcy5nZXRTcGxpdHRlZFRleHQoc2VsLmZvY3VzT2Zmc2V0LCBzZWwuZm9jdXNOb2RlKTtcblxuICAgICAgICByZXR1cm4gKG5ldyBDdXJzb3JMZWZ0Q29vcmRpbmF0ZShsZWZ0UmlnaHRUZXh0LmxlZnQsIGxlZnRSaWdodFRleHQucmlnaHQsIHRoaXMuZWRpdG9yLm5hdGl2ZUVsZW1lbnQpKS5nZXQoKTtcbiAgICB9XG5cbiAgICBnZXRDdXJzb3JQb3NpdGlvbkluTGluZSgpOiBJQ3Vyc29yUG9zaXRpb25JbkxpbmUge1xuICAgICAgICBjb25zdCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgIGNvbnN0IGxlZnRSaWdodFRleHQgPSB0aGlzLmdldFNwbGl0dGVkVGV4dChzZWwuZm9jdXNPZmZzZXQsIHNlbC5mb2N1c05vZGUpO1xuXG4gICAgICAgIHJldHVybiBuZXcgQ3Vyc29yUG9zaXRpb25JbkxpbmUobGVmdFJpZ2h0VGV4dC5sZWZ0LCBsZWZ0UmlnaHRUZXh0LnJpZ2h0LCB0aGlzLmVkaXRvci5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG5cbiAgICBjb25jYXRXaXRoUHJldmlvdXNUZXh0U3VwcG9ydGluZ0JyaWNrKGUpIHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNUZXh0QnJpY2tJZCA9IHRoaXMud2FsbE1vZGVsLmFwaS5jb3JlLmdldFByZXZpb3VzVGV4dEJyaWNrSWQodGhpcy5pZCk7XG5cbiAgICAgICAgaWYgKHByZXZpb3VzVGV4dEJyaWNrSWQpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgY29uc3QgcHJldmlvdXNCcmlja1NuYXBzaG90ID0gdGhpcy53YWxsTW9kZWwuYXBpLmNvcmUuZ2V0QnJpY2tTbmFwc2hvdChwcmV2aW91c1RleHRCcmlja0lkKTtcblxuICAgICAgICAgICAgdGhpcy53YWxsTW9kZWwuYXBpLmNvcmUudXBkYXRlQnJpY2tTdGF0ZShwcmV2aW91c1RleHRCcmlja0lkLCB7XG4gICAgICAgICAgICAgICAgdGV4dDogdGhpcy5jbGVhblVwVGV4dChwcmV2aW91c0JyaWNrU25hcHNob3Quc3RhdGUudGV4dCkgKyB0aGlzLnNjb3BlLnRleHRcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyB3YWl0IGZvciBjb21wb25lbnQgcmUtcmVuZGVyaW5nXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb2N1c0NvbnRleHQ6IElGb2N1c0NvbnRleHQgPSB7XG4gICAgICAgICAgICAgICAgICAgIGluaXRpYXRvcjogRk9DVVNfSU5JVElBVE9SLFxuICAgICAgICAgICAgICAgICAgICBkZXRhaWxzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25jYXRUZXh0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29uY2F0ZW5hdGlvblRleHQ6IHRoaXMuc2NvcGUudGV4dFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHRoaXMud2FsbFVpQXBpLmZvY3VzT25Ccmlja0lkKHByZXZpb3VzVGV4dEJyaWNrSWQsIGZvY3VzQ29udGV4dCk7XG5cbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgb25seSBhZnRlciBmb2N1cyB3aWxsIGJlIGVzdGFibGlzaGVkXG4gICAgICAgICAgICAgICAgLy8gdGhhdCBwcmV2ZW50cyBmbGlja2VyaW5nIG9uIG1vYmlsZVxuICAgICAgICAgICAgICAgIHRoaXMud2FsbFVpQXBpLnJlbW92ZUJyaWNrKHRoaXMuaWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25jYXRXaXRoTmV4dFRleHRTdXBwb3J0aW5nQnJpY2soZTogRXZlbnQpIHtcbiAgICAgICAgY29uc3QgbmV4dFRleHRCcmlja0lkID0gdGhpcy53YWxsTW9kZWwuYXBpLmNvcmUuZ2V0TmV4dFRleHRCcmlja0lkKHRoaXMuaWQpO1xuXG4gICAgICAgIGlmIChuZXh0VGV4dEJyaWNrSWQpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgY29uc3QgbmV4dFRleHRCcmlja1NuYXBzaG90ID0gdGhpcy53YWxsTW9kZWwuYXBpLmNvcmUuZ2V0QnJpY2tTbmFwc2hvdChuZXh0VGV4dEJyaWNrSWQpO1xuXG4gICAgICAgICAgICBjb25zdCBjb25jYXRlbmF0aW9uVGV4dCA9IG5leHRUZXh0QnJpY2tTbmFwc2hvdC5zdGF0ZS50ZXh0IHx8ICcnO1xuXG4gICAgICAgICAgICB0aGlzLnNldFRleHRTdGF0ZSh0aGlzLnNjb3BlLnRleHQgKyBjb25jYXRlbmF0aW9uVGV4dCk7XG5cbiAgICAgICAgICAgIHRoaXMuc2F2ZUN1cnJlbnRTdGF0ZSgpO1xuXG4gICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkuY29yZS5yZW1vdmVCcmljayhuZXh0VGV4dEJyaWNrSWQpO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYWNlQ2FyZXRCYXNlT25Db25jYXRlbmF0ZWRUZXh0KGNvbmNhdGVuYXRpb25UZXh0KTtcbiAgICAgICAgICAgIH0sIDEwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRGVsZXRlQW5kRm9jdXNUb1ByZXZpb3VzKGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0IHByZXZpb3VzVGV4dEJyaWNrSWQgPSB0aGlzLndhbGxNb2RlbC5hcGkuY29yZS5nZXRQcmV2aW91c1RleHRCcmlja0lkKHRoaXMuaWQpO1xuXG4gICAgICAgIHRoaXMud2FsbFVpQXBpLnJlbW92ZUJyaWNrKHRoaXMuaWQpO1xuXG4gICAgICAgIGlmIChwcmV2aW91c1RleHRCcmlja0lkKSB7XG4gICAgICAgICAgICBjb25zdCBmb2N1c0NvbnRleHQ6IElGb2N1c0NvbnRleHQgPSB7XG4gICAgICAgICAgICAgICAgaW5pdGlhdG9yOiBGT0NVU19JTklUSUFUT1IsXG4gICAgICAgICAgICAgICAgZGV0YWlsczoge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGVQcmV2aW91c1RleHQ6IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLndhbGxVaUFwaS5mb2N1c09uQnJpY2tJZChwcmV2aW91c1RleHRCcmlja0lkLCBmb2N1c0NvbnRleHQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25EZWxldGVBbmRGb2N1c1RvTmV4dChlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCBuZXh0VGV4dEJyaWNrSWQgPSB0aGlzLndhbGxNb2RlbC5hcGkuY29yZS5nZXROZXh0VGV4dEJyaWNrSWQodGhpcy5pZCk7XG5cbiAgICAgICAgaWYgKG5leHRUZXh0QnJpY2tJZCkge1xuICAgICAgICAgICAgdGhpcy53YWxsVWlBcGkucmVtb3ZlQnJpY2sodGhpcy5pZCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGZvY3VzQ29udGV4dDogSUZvY3VzQ29udGV4dCA9IHtcbiAgICAgICAgICAgICAgICBpbml0aWF0b3I6IEZPQ1VTX0lOSVRJQVRPUixcbiAgICAgICAgICAgICAgICBkZXRhaWxzOiB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZVByZXZpb3VzVGV4dDogdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMud2FsbFVpQXBpLmZvY3VzT25Ccmlja0lkKG5leHRUZXh0QnJpY2tJZCwgZm9jdXNDb250ZXh0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFNwbGl0dGVkVGV4dChvZmZzZXQ6IG51bWJlciwgdGFyZ2V0OiBOb2RlKTogeyBsZWZ0OiBzdHJpbmcsIHJpZ2h0OiBzdHJpbmcgfSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsZWZ0OiB0aGlzLnNjb3BlLnRleHQuc2xpY2UoMCwgb2Zmc2V0KSxcbiAgICAgICAgICAgIHJpZ2h0OiB0aGlzLnNjb3BlLnRleHQuc2xpY2Uob2Zmc2V0KSB8fCAnJ1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIGtleSBoYW5kbGVyIGVuZFxuICAgIG9uV2FsbEZvY3VzKGNvbnRleHQ/OiBJRm9jdXNDb250ZXh0KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmVkaXRvci5uYXRpdmVFbGVtZW50ICE9PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBmb2N1cyBieSBBUEkgY2FsbFxuICAgICAgICAgICAgdGhpcy5lZGl0b3IubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuXG4gICAgICAgICAgICBpZiAoY29udGV4dCAmJiBjb250ZXh0LmluaXRpYXRvciA9PT0gRk9DVVNfSU5JVElBVE9SKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRleHQuZGV0YWlscy5kZWxldGVQcmV2aW91c1RleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFjZUNhcmV0QXRFbmQoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoY29udGV4dC5kZXRhaWxzLmNvbmNhdFRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFjZUNhcmV0QmFzZU9uQ29uY2F0ZW5hdGVkVGV4dChjb250ZXh0LmRldGFpbHMuY29uY2F0ZW5hdGlvblRleHQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjb250ZXh0LmRldGFpbHMubGVmdEtleSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYWNlQ2FyZXRBdEVuZCgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjb250ZXh0LmRldGFpbHMucmlnaHRLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFjZUNhcmV0QXRTdGFydCgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjb250ZXh0LmRldGFpbHMuYm90dG9tS2V5IHx8IGNvbnRleHQuZGV0YWlscy50b3BLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGluZSA9IGNvbnRleHQuZGV0YWlscy5ib3R0b21LZXkgPyBMaW5lVHlwZS5maXJzdCA6IExpbmVUeXBlLmxhc3Q7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFjZUNhcmV0QXRMZWZ0Q29vcmRpbmF0ZShjb250ZXh0LmRldGFpbHMuY2FyZXRMZWZ0Q29vcmRpbmF0ZSwgbGluZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0VGV4dFN0YXRlKHRleHQ6IHN0cmluZyA9ICcnKSB7XG4gICAgICAgIHRoaXMuc2NvcGUudGV4dCA9IHRoaXMuY2xlYW5VcFRleHQodGV4dCk7XG4gICAgfVxuXG4gICAgaW5jcmVhc2VUYWIoKSB7XG4gICAgICAgIGlmICh0aGlzLnNjb3BlLnRhYnMgPCB0aGlzLm1heFRhYk51bWJlcikge1xuICAgICAgICAgICAgdGhpcy5zY29wZS50YWJzKys7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZWNyZWFzZVRhYigpIHtcbiAgICAgICAgaWYgKHRoaXMuc2NvcGUudGFicyA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2NvcGUudGFicy0tO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2F2ZUN1cnJlbnRTdGF0ZSgpIHtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMuZW1pdCh0aGlzLnNjb3BlKTtcbiAgICB9XG5cbiAgICAvLyBjYXJldCBoZWxwZXJzXG4gICAgaXNUZXh0U2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhd2luZG93LmdldFNlbGVjdGlvbigpLmlzQ29sbGFwc2VkO1xuICAgIH1cblxuICAgIHBsYWNlQ2FyZXRBdFN0YXJ0KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBkZWVwTGVmdE5vZGUgPSBuZXcgRGVlcExlZnROb2RlQ2hpbGQodGhpcy5lZGl0b3IubmF0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgdGhpcy5wbGFjZUNhcmV0QXROb2RlU3RhcnQoZGVlcExlZnROb2RlLmNoaWxkKTtcbiAgICB9XG5cbiAgICBwbGFjZUNhcmV0QXRFbmQoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHJpZ2h0Tm9kZSA9IG5ldyBEZWVwUmlnaHROb2RlQ2hpbGQodGhpcy5lZGl0b3IubmF0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgdGhpcy5wbGFjZUNhcmV0QXROb2RlRW5kKHJpZ2h0Tm9kZS5jaGlsZCk7XG4gICAgfVxuXG4gICAgcGxhY2VDYXJldEF0Tm9kZVN0YXJ0KGVsOiBOb2RlKSB7XG4gICAgICAgIHRoaXMucGxhY2VDYXJldEF0Tm9kZVRvUG9zaXRpb24oZWwsIDApO1xuICAgIH1cblxuICAgIHBsYWNlQ2FyZXRBdE5vZGVFbmQoZWw6IE5vZGUpIHtcbiAgICAgICAgdGhpcy5wbGFjZUNhcmV0QXROb2RlVG9Qb3NpdGlvbihlbCwgZWwudGV4dENvbnRlbnQubGVuZ3RoKTtcbiAgICB9XG5cbiAgICBwbGFjZUNhcmV0QXROb2RlVG9Qb3NpdGlvbihlbDogTm9kZSwgcG9zaXRpb246IG51bWJlcikge1xuICAgICAgICAobmV3IFBsYWNlQ2FyZXRUb1Bvc2l0aW9uKGVsLCBwb3NpdGlvbikpLnBsYWNlKCk7XG4gICAgfVxuXG4gICAgLy8gZmluZCB0aGUgbm9kZSB3aGljaCBjb250YWlucyBjb25jYXRlbmF0ZWQgdGV4dCBhbmQgcG9zaXRpb24gaW4gdGhpcyBub2RlIHdoZXJlIGN1cnNvciBzaG91bGQgYmUgcGxhY2VkXG4gICAgcGxhY2VDYXJldEJhc2VPbkNvbmNhdGVuYXRlZFRleHQoY29uY2F0ZW5hdGlvblRleHQ6IHN0cmluZykge1xuICAgICAgICBpZiAoY29uY2F0ZW5hdGlvblRleHQgIT09ICcnKSB7XG4gICAgICAgICAgICAvLyBmaW5kIGZpcnN0IGxldmVsIG5vZGVzIGZvciB0aGUgdGV4dCB0aGF0IHdhcyBjb25jYXRlbmF0ZWRcbiAgICAgICAgICAgIGNvbnN0IHN1YlN0cmluZ05vZGVzID0gbmV3IEZpcnN0U3ViU3RyaW5nTm9kZShcbiAgICAgICAgICAgICAgICB0aGlzLmVkaXRvci5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAgICAgIGNvbmNhdGVuYXRpb25UZXh0XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAvLyBmaXJzdCBsZXZlbCBub2RlIHdoaWNoIGNvbnRhaW5zIGNvbmNhdGVuYXRlZCB0ZXh0XG4gICAgICAgICAgICBjb25zdCBmaXJzdExldmVsU3ViU3RyaW5nTm9kZSA9IHN1YlN0cmluZ05vZGVzLmZpcnN0TGV2ZWxTdWJTdHJpbmdOb2Rlc1swXTtcblxuICAgICAgICAgICAgaWYgKGZpcnN0TGV2ZWxTdWJTdHJpbmdOb2RlKSB7XG4gICAgICAgICAgICAgICAgbGV0IGZvY3VzTm9kZTtcbiAgICAgICAgICAgICAgICBsZXQgcG9zaXRpb247XG5cbiAgICAgICAgICAgICAgICBpZiAoZmlyc3RMZXZlbFN1YlN0cmluZ05vZGUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIGZpcnN0IGNvbmNhdGVuYXRlZCBub2RlIGlzIFRFWFRfTk9ERSBpdCBtaWdodFxuICAgICAgICAgICAgICAgICAgICAvLyBiZSBhdXRvbWF0aWNhbGx5IGNvbmNhdGVuYXRlZCB3aXRoIHByZXZpb3VzIGV4aXN0aW5nIFRFWFRfTk9ERVxuICAgICAgICAgICAgICAgICAgICBmb2N1c05vZGUgPSBmaXJzdExldmVsU3ViU3RyaW5nTm9kZTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBmaW5kIHRleHQgY29udGVudCBmb3IgZmlyc3QgY29uY2F0ZW5hdGVkIFRFWFRfTk9ERVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnUCcpO1xuICAgICAgICAgICAgICAgICAgICBwLmlubmVySFRNTCA9IGNvbmNhdGVuYXRpb25UZXh0O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmaXJzdExldmVsU3ViU3RyaW5nVGV4dENvbnRlbnQgPSBwLmNoaWxkTm9kZXNbMF0udGV4dENvbnRlbnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gZmluYWxseSBmaW5kIGN1cnNvciBwb3NpdGlvblxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IGZvY3VzTm9kZS50ZXh0Q29udGVudC5sZW5ndGggLSBmaXJzdExldmVsU3ViU3RyaW5nVGV4dENvbnRlbnQubGVuZ3RoO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvY3VzTm9kZSA9IG5ldyBEZWVwTGVmdE5vZGVDaGlsZChmaXJzdExldmVsU3ViU3RyaW5nTm9kZSkuY2hpbGQ7XG5cbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24gPSAwO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMucGxhY2VDYXJldEF0Tm9kZVRvUG9zaXRpb24oZm9jdXNOb2RlLCBwb3NpdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwbGFjZUNhcmV0QXRMZWZ0Q29vcmRpbmF0ZShsZWZ0Q29vcmRpbmF0ZTogbnVtYmVyLCBsaW5lOiBzdHJpbmcpIHtcbiAgICAgICAgLy8gdG9kbzogZmluZCB0aGUgd2F5IHRvIHNldCBjYXJldCBiYXNlZCBvbiBjb29yZGluYXRlIG51bWJlclxuICAgICAgICBpZiAobGluZSA9PT0gTGluZVR5cGUubGFzdCkge1xuICAgICAgICAgICAgdGhpcy5wbGFjZUNhcmV0QXRFbmQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucGxhY2VDYXJldEF0U3RhcnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzQ2FyZXRBdFN0YXJ0KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKG5ldyBDYXJldFN0YXJ0RW5kUG9zaXRpb24odGhpcy5lZGl0b3IubmF0aXZlRWxlbWVudCkpLmlzQ2FyZXRBdFN0YXJ0KCk7XG4gICAgfVxuXG4gICAgaXNDYXJldEF0RW5kKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKG5ldyBDYXJldFN0YXJ0RW5kUG9zaXRpb24odGhpcy5lZGl0b3IubmF0aXZlRWxlbWVudCkpLmlzQ2FyZXRBdEVuZCgpO1xuICAgIH1cblxuICAgIC8vIHJlbW92ZSBhbGwgdW5uZWNlc3NhcnkgdGFnc1xuICAgIGNsZWFuVXBUZXh0KHRleHQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAobmV3IFN0cmluZ1dpdGhvdXRFbXB0eU5vZGVzKHRleHQpKS5nZXQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG5vTWV0YUtleUlzUHJlc3NlZChlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhKChlLnNoaWZ0S2V5IHx8IGUuYWx0S2V5IHx8IGUuY3RybEtleSB8fCBlLm1ldGFLZXkpKTtcbiAgICB9XG59XG4iXX0=