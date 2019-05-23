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
const LineType = {
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
export class BaseTextBrickComponent {
    constructor() {
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
    ngOnInit() {
        if (this.state && this.state.text !== this.scope.text) {
            this.setTextState(this.state.text);
        }
        this.scope.tabs = this.state.tabs || 0;
        this.onPasteBound = this.onPaste.bind(this);
        this.editor.nativeElement.addEventListener('paste', this.onPasteBound);
        this.textChangeSubscription = this.textChange.subscribe(() => {
            this.setTextState(this.scope.text);
            this.saveCurrentState();
        });
        this.wallUiApi = this.wallModel.api.ui;
    }
    /**
     * @param {?} newState
     * @return {?}
     */
    onWallStateChange(newState) {
        this.scope.tabs = this.state.tabs || this.scope.tabs;
        if (newState && newState.text !== this.scope.text) {
            this.setTextState(newState.text);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.editor.nativeElement.removeEventListener('paste', this.onPasteBound);
        this.textChangeSubscription.unsubscribe();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onPaste(e) {
        e.preventDefault();
        /** @type {?} */
        const textArr = e.clipboardData.getData('text/plain')
            .split('\n')
            .map((str) => str.trim())
            .filter((str) => str.length);
        if (textArr.length === 1) {
            document.execCommand('insertHTML', false, textArr[0]);
        }
        else if (textArr.length > 1) {
            // todo: add interface for UI api
            textArr.reverse().forEach((text) => this.wallModel.api.core.addBrickAfterBrickId(this.id, 'text', { text }));
        }
    }
    /**
     * @return {?}
     */
    onTextChange() {
        this.textChange.next(this.scope.text);
    }
    // general handler of all key events
    /**
     * @param {?} e
     * @return {?}
     */
    onKeyPress(e) {
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
    }
    /**
     * @param {?} keyHandlerName
     * @param {?} e
     * @return {?}
     */
    proxyToKeyHandler(keyHandlerName, e) {
        this.keypressHandlers[keyHandlerName].execute(e);
    }
    // key handler
    /**
     * @param {?} e
     * @return {?}
     */
    topKeyPressed(e) {
        this.proxyToKeyHandler('top', e);
    }
    /**
     * @param {?} e
     * @return {?}
     */
    bottomKeyPressed(e) {
        this.proxyToKeyHandler('bottom', e);
    }
    /**
     * @param {?} e
     * @return {?}
     */
    enterKeyPressed(e) {
        this.proxyToKeyHandler('enter', e);
    }
    /**
     * @param {?} e
     * @return {?}
     */
    leftKeyPressed(e) {
        this.proxyToKeyHandler('left', e);
    }
    /**
     * @param {?} e
     * @return {?}
     */
    rightKeyPressed(e) {
        this.proxyToKeyHandler('right', e);
    }
    /**
     * @param {?} e
     * @return {?}
     */
    escapeKeyPressed(e) {
        // do nothing
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onTabPressed(e) {
        e.preventDefault();
        this.increaseTab();
        this.saveCurrentState();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    backSpaceKeyPressed(e) {
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
    }
    // end key handlers
    /**
     * @return {?}
     */
    isCaretAtFirstLine() {
        return this.getCursorPositionInLine().isOnFirstLine;
    }
    /**
     * @return {?}
     */
    isCaretAtLastLine() {
        return this.getCursorPositionInLine().isOnLastLine;
    }
    /**
     * @return {?}
     */
    getCaretLeftCoordinate() {
        /** @type {?} */
        const sel = window.getSelection();
        /** @type {?} */
        const leftRightText = this.getSplittedText(sel.focusOffset, sel.focusNode);
        return (new CursorLeftCoordinate(leftRightText.left, leftRightText.right, this.editor.nativeElement)).get();
    }
    /**
     * @return {?}
     */
    getCursorPositionInLine() {
        /** @type {?} */
        const sel = window.getSelection();
        /** @type {?} */
        const leftRightText = this.getSplittedText(sel.focusOffset, sel.focusNode);
        return new CursorPositionInLine(leftRightText.left, leftRightText.right, this.editor.nativeElement);
    }
    /**
     * @param {?} e
     * @return {?}
     */
    concatWithPreviousTextSupportingBrick(e) {
        /** @type {?} */
        const previousTextBrickId = this.wallModel.api.core.getPreviousTextBrickId(this.id);
        if (previousTextBrickId) {
            e.preventDefault();
            /** @type {?} */
            const previousBrickSnapshot = this.wallModel.api.core.getBrickSnapshot(previousTextBrickId);
            this.wallModel.api.core.updateBrickState(previousTextBrickId, {
                text: this.cleanUpText(previousBrickSnapshot.state.text) + this.scope.text
            });
            // wait for component re-rendering
            setTimeout(() => {
                /** @type {?} */
                const focusContext = {
                    initiator: FOCUS_INITIATOR,
                    details: {
                        concatText: true,
                        concatenationText: this.scope.text
                    }
                };
                this.wallUiApi.focusOnBrickId(previousTextBrickId, focusContext);
                // remove only after focus will be established
                // that prevents flickering on mobile
                this.wallUiApi.removeBrick(this.id);
            });
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    concatWithNextTextSupportingBrick(e) {
        /** @type {?} */
        const nextTextBrickId = this.wallModel.api.core.getNextTextBrickId(this.id);
        if (nextTextBrickId) {
            e.preventDefault();
            /** @type {?} */
            const nextTextBrickSnapshot = this.wallModel.api.core.getBrickSnapshot(nextTextBrickId);
            /** @type {?} */
            const concatenationText = nextTextBrickSnapshot.state.text || '';
            this.setTextState(this.scope.text + concatenationText);
            this.saveCurrentState();
            this.wallModel.api.core.removeBrick(nextTextBrickId);
            setTimeout(() => {
                this.placeCaretBaseOnConcatenatedText(concatenationText);
            }, 10);
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onDeleteAndFocusToPrevious(e) {
        e.preventDefault();
        /** @type {?} */
        const previousTextBrickId = this.wallModel.api.core.getPreviousTextBrickId(this.id);
        this.wallUiApi.removeBrick(this.id);
        if (previousTextBrickId) {
            /** @type {?} */
            const focusContext = {
                initiator: FOCUS_INITIATOR,
                details: {
                    deletePreviousText: true
                }
            };
            this.wallUiApi.focusOnBrickId(previousTextBrickId, focusContext);
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onDeleteAndFocusToNext(e) {
        e.preventDefault();
        /** @type {?} */
        const nextTextBrickId = this.wallModel.api.core.getNextTextBrickId(this.id);
        if (nextTextBrickId) {
            this.wallUiApi.removeBrick(this.id);
            /** @type {?} */
            const focusContext = {
                initiator: FOCUS_INITIATOR,
                details: {
                    deletePreviousText: true
                }
            };
            this.wallUiApi.focusOnBrickId(nextTextBrickId, focusContext);
        }
    }
    /**
     * @param {?} offset
     * @param {?} target
     * @return {?}
     */
    getSplittedText(offset, target) {
        return {
            left: this.scope.text.slice(0, offset),
            right: this.scope.text.slice(offset) || ''
        };
    }
    // key handler end
    /**
     * @param {?=} context
     * @return {?}
     */
    onWallFocus(context) {
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
                    const line = context.details.bottomKey ? LineType.first : LineType.last;
                    this.placeCaretAtLeftCoordinate(context.details.caretLeftCoordinate, line);
                }
            }
        }
    }
    /**
     * @param {?=} text
     * @return {?}
     */
    setTextState(text = '') {
        this.scope.text = this.cleanUpText(text);
    }
    /**
     * @return {?}
     */
    increaseTab() {
        if (this.scope.tabs < this.maxTabNumber) {
            this.scope.tabs++;
        }
    }
    /**
     * @return {?}
     */
    decreaseTab() {
        if (this.scope.tabs > 0) {
            this.scope.tabs--;
        }
    }
    /**
     * @return {?}
     */
    saveCurrentState() {
        this.stateChanges.emit(this.scope);
    }
    // caret helpers
    /**
     * @return {?}
     */
    isTextSelected() {
        return !window.getSelection().isCollapsed;
    }
    /**
     * @return {?}
     */
    placeCaretAtStart() {
        /** @type {?} */
        const deepLeftNode = new DeepLeftNodeChild(this.editor.nativeElement);
        this.placeCaretAtNodeStart(deepLeftNode.child);
    }
    /**
     * @return {?}
     */
    placeCaretAtEnd() {
        /** @type {?} */
        const rightNode = new DeepRightNodeChild(this.editor.nativeElement);
        this.placeCaretAtNodeEnd(rightNode.child);
    }
    /**
     * @param {?} el
     * @return {?}
     */
    placeCaretAtNodeStart(el) {
        this.placeCaretAtNodeToPosition(el, 0);
    }
    /**
     * @param {?} el
     * @return {?}
     */
    placeCaretAtNodeEnd(el) {
        this.placeCaretAtNodeToPosition(el, el.textContent.length);
    }
    /**
     * @param {?} el
     * @param {?} position
     * @return {?}
     */
    placeCaretAtNodeToPosition(el, position) {
        (new PlaceCaretToPosition(el, position)).place();
    }
    // find the node which contains concatenated text and position in this node where cursor should be placed
    /**
     * @param {?} concatenationText
     * @return {?}
     */
    placeCaretBaseOnConcatenatedText(concatenationText) {
        if (concatenationText !== '') {
            // find first level nodes for the text that was concatenated
            /** @type {?} */
            const subStringNodes = new FirstSubStringNode(this.editor.nativeElement, concatenationText);
            // first level node which contains concatenated text
            /** @type {?} */
            const firstLevelSubStringNode = subStringNodes.firstLevelSubStringNodes[0];
            if (firstLevelSubStringNode) {
                /** @type {?} */
                let focusNode;
                /** @type {?} */
                let position;
                if (firstLevelSubStringNode.nodeType === Node.TEXT_NODE) {
                    // if first concatenated node is TEXT_NODE it might
                    // be automatically concatenated with previous existing TEXT_NODE
                    focusNode = firstLevelSubStringNode;
                    // find text content for first concatenated TEXT_NODE
                    /** @type {?} */
                    const p = document.createElement('P');
                    p.innerHTML = concatenationText;
                    /** @type {?} */
                    const firstLevelSubStringTextContent = p.childNodes[0].textContent;
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
    }
    /**
     * @param {?} leftCoordinate
     * @param {?} line
     * @return {?}
     */
    placeCaretAtLeftCoordinate(leftCoordinate, line) {
        // todo: find the way to set caret based on coordinate number
        if (line === LineType.last) {
            this.placeCaretAtEnd();
        }
        else {
            this.placeCaretAtStart();
        }
    }
    /**
     * @return {?}
     */
    isCaretAtStart() {
        return (new CaretStartEndPosition(this.editor.nativeElement)).isCaretAtStart();
    }
    /**
     * @return {?}
     */
    isCaretAtEnd() {
        return (new CaretStartEndPosition(this.editor.nativeElement)).isCaretAtEnd();
    }
    // remove all unnecessary tags
    /**
     * @param {?} text
     * @return {?}
     */
    cleanUpText(text) {
        return (new StringWithoutEmptyNodes(text)).get();
    }
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    noMetaKeyIsPressed(e) {
        return !((e.shiftKey || e.altKey || e.ctrlKey || e.metaKey));
    }
}
BaseTextBrickComponent.propDecorators = {
    id: [{ type: Input }],
    state: [{ type: Input }],
    wallModel: [{ type: Input }],
    stateChanges: [{ type: Output }],
    editor: [{ type: ViewChild, args: ['editor',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS10ZXh0LWJyaWNrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL2JyaWNrcy9iYXNlLXRleHQtYnJpY2svYmFzZS10ZXh0LWJyaWNrLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BHLE9BQU8sRUFBQyxPQUFPLEVBQWUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sMENBQTBDLENBQUM7QUFDM0UsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sMkNBQTJDLENBQUM7QUFDN0UsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sMkNBQTJDLENBQUM7QUFDN0UsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sbURBQW1ELENBQUM7QUFDeEYsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0saURBQWlELENBQUM7QUFDckYsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sa0RBQWtELENBQUM7QUFDdEYsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sa0RBQWtELENBQUM7QUFDdEYsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0scURBQXFELENBQUM7QUFFNUYsT0FBTyxFQUNILGNBQWMsRUFDZCwyQkFBMkIsRUFDM0IsVUFBVSxFQUNWLFVBQVUsRUFDVixTQUFTLEVBQ1Qsc0JBQXNCLEVBQ3RCLFVBQVUsRUFDVixlQUFlLEVBQ2YsUUFBUSxFQUNSLGdCQUFnQixFQUNoQixTQUFTLEVBQ1QsT0FBTyxFQUNQLE9BQU8sRUFDVixNQUFNLDRCQUE0QixDQUFDO0FBRXBDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBQ3hFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUN0RSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDcEUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHVDQUF1QyxDQUFDO0FBQ3RFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQzs7O0lBRzlELE9BQVEsT0FBTztJQUNmLE1BQU8sTUFBTTs7Ozs7QUFHakIsMkNBR0M7OztJQUZHLDZDQUFzQjs7SUFDdEIsOENBQXVCOzs7OztBQUczQixNQUFNLE9BQWdCLHNCQUFzQjtJQUE1QztRQUtjLGlCQUFZLEdBQWlDLElBQUksWUFBWSxFQUFFLENBQUM7UUFJMUUscUJBQWdCLEdBQUc7WUFDZixHQUFHLEVBQUUsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDO1lBQzVCLEtBQUssRUFBRSxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUM7WUFDaEMsSUFBSSxFQUFFLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQztZQUM5QixLQUFLLEVBQUUsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDO1lBQ2hDLE1BQU0sRUFBRSxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQztTQUNyQyxDQUFDO1FBSUYsVUFBSyxHQUFtQjtZQUNwQixJQUFJLEVBQUUsRUFBRTtZQUNSLElBQUksRUFBRSxDQUFDO1NBQ1YsQ0FBQztRQUVGLGlCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBRWpCLGVBQVUsR0FBb0IsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQXNhaEQsQ0FBQzs7OztJQWhhRyxRQUFRO1FBQ0osSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQ25ELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN0QztRQUVELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztRQUV2QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTVDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFdkUsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUN6RCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztJQUMzQyxDQUFDOzs7OztJQUVELGlCQUFpQixDQUFDLFFBQXdCO1FBQ3RDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBRXJELElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFDL0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDcEM7SUFDTCxDQUFDOzs7O0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFMUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzlDLENBQUM7Ozs7O0lBRUQsT0FBTyxDQUFDLENBQWlCO1FBQ3JCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7Y0FFYixPQUFPLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDO2FBQ2hELEtBQUssQ0FBQyxJQUFJLENBQUM7YUFDWCxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUN4QixNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFFaEMsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUN0QixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDekQ7YUFBTSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzNCLGlDQUFpQztZQUNqQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUM7U0FDOUc7SUFDTCxDQUFDOzs7O0lBRUQsWUFBWTtRQUNSLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUMsQ0FBQzs7Ozs7O0lBR0QsVUFBVSxDQUFDLENBQWdCO1FBQ3ZCLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzVCLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDekI7WUFFRCxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUFFO2dCQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDNUI7WUFFRCxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRTtnQkFDOUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMxQjtZQUVELElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFO2dCQUM3QyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzNCO1lBRUQsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLFNBQVMsSUFBSSxDQUFDLENBQUMsT0FBTyxLQUFLLHNCQUFzQixJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssZ0JBQWdCLEVBQUU7Z0JBQzdGLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDM0I7WUFFRCxJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssVUFBVSxFQUFFO2dCQUMxQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDNUI7WUFFRCxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxjQUFjLElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFO2dCQUNwRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDL0I7WUFFRCxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssVUFBVSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUU7Z0JBQ2xHLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM3QztZQUVELElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxPQUFPLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFO2dCQUM3QyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3hCO1lBRUQsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLFVBQVUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxFQUFFLEVBQUU7Z0JBQ2pELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNsQztTQUNKO0lBQ0wsQ0FBQzs7Ozs7O0lBRUQsaUJBQWlCLENBQUMsY0FBc0IsRUFBRSxDQUFnQjtRQUN0RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JELENBQUM7Ozs7OztJQUdELGFBQWEsQ0FBQyxDQUFnQjtRQUMxQixJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Ozs7O0lBRUQsZ0JBQWdCLENBQUMsQ0FBZ0I7UUFDN0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4QyxDQUFDOzs7OztJQUVELGVBQWUsQ0FBQyxDQUFnQjtRQUM1QixJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7Ozs7O0lBRUQsY0FBYyxDQUFDLENBQWdCO1FBQzNCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7Ozs7SUFFRCxlQUFlLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxDQUFnQjtRQUM3QixhQUFhO0lBQ2pCLENBQUM7Ozs7O0lBRUQsWUFBWSxDQUFDLENBQWdCO1FBQ3pCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUVuQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDNUIsQ0FBQzs7Ozs7SUFFRCxtQkFBbUIsQ0FBQyxDQUFnQjtRQUNoQyxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRTtZQUN2QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO2dCQUNqQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2FBQzNCO2lCQUFNO2dCQUNILElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO29CQUN4QixJQUFJLENBQUMscUNBQXFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2pEO3FCQUFNO29CQUNILElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDdEM7YUFDSjtTQUNKO0lBQ0wsQ0FBQzs7Ozs7SUFJRCxrQkFBa0I7UUFDZCxPQUFPLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLGFBQWEsQ0FBQztJQUN4RCxDQUFDOzs7O0lBRUQsaUJBQWlCO1FBQ2IsT0FBTyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxZQUFZLENBQUM7SUFDdkQsQ0FBQzs7OztJQUVELHNCQUFzQjs7Y0FDWixHQUFHLEdBQUcsTUFBTSxDQUFDLFlBQVksRUFBRTs7Y0FDM0IsYUFBYSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsU0FBUyxDQUFDO1FBRTFFLE9BQU8sQ0FBQyxJQUFJLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDaEgsQ0FBQzs7OztJQUVELHVCQUF1Qjs7Y0FDYixHQUFHLEdBQUcsTUFBTSxDQUFDLFlBQVksRUFBRTs7Y0FDM0IsYUFBYSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsU0FBUyxDQUFDO1FBRTFFLE9BQU8sSUFBSSxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN4RyxDQUFDOzs7OztJQUVELHFDQUFxQyxDQUFDLENBQUM7O2NBQzdCLG1CQUFtQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBRW5GLElBQUksbUJBQW1CLEVBQUU7WUFDckIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDOztrQkFFYixxQkFBcUIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLENBQUM7WUFFM0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixFQUFFO2dCQUMxRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJO2FBQzdFLENBQUMsQ0FBQztZQUVILGtDQUFrQztZQUNsQyxVQUFVLENBQUMsR0FBRyxFQUFFOztzQkFDTixZQUFZLEdBQWtCO29CQUNoQyxTQUFTLEVBQUUsZUFBZTtvQkFDMUIsT0FBTyxFQUFFO3dCQUNMLFVBQVUsRUFBRSxJQUFJO3dCQUNoQixpQkFBaUIsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7cUJBQ3JDO2lCQUNKO2dCQUVELElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLG1CQUFtQixFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUVqRSw4Q0FBOEM7Z0JBQzlDLHFDQUFxQztnQkFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3hDLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDOzs7OztJQUVELGlDQUFpQyxDQUFDLENBQVE7O2NBQ2hDLGVBQWUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUUzRSxJQUFJLGVBQWUsRUFBRTtZQUNqQixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7O2tCQUViLHFCQUFxQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUM7O2tCQUVqRixpQkFBaUIsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFFaEUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxpQkFBaUIsQ0FBQyxDQUFDO1lBRXZELElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBRXhCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUM7WUFFckQsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDWixJQUFJLENBQUMsZ0NBQWdDLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUM3RCxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDVjtJQUNMLENBQUM7Ozs7O0lBRUQsMEJBQTBCLENBQUMsQ0FBZ0I7UUFDdkMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDOztjQUViLG1CQUFtQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBRW5GLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVwQyxJQUFJLG1CQUFtQixFQUFFOztrQkFDZixZQUFZLEdBQWtCO2dCQUNoQyxTQUFTLEVBQUUsZUFBZTtnQkFDMUIsT0FBTyxFQUFFO29CQUNMLGtCQUFrQixFQUFFLElBQUk7aUJBQzNCO2FBQ0o7WUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsRUFBRSxZQUFZLENBQUMsQ0FBQztTQUNwRTtJQUNMLENBQUM7Ozs7O0lBRUQsc0JBQXNCLENBQUMsQ0FBZ0I7UUFDbkMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDOztjQUViLGVBQWUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUUzRSxJQUFJLGVBQWUsRUFBRTtZQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7O2tCQUU5QixZQUFZLEdBQWtCO2dCQUNoQyxTQUFTLEVBQUUsZUFBZTtnQkFDMUIsT0FBTyxFQUFFO29CQUNMLGtCQUFrQixFQUFFLElBQUk7aUJBQzNCO2FBQ0o7WUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxlQUFlLEVBQUUsWUFBWSxDQUFDLENBQUM7U0FDaEU7SUFDTCxDQUFDOzs7Ozs7SUFFRCxlQUFlLENBQUMsTUFBYyxFQUFFLE1BQVk7UUFDeEMsT0FBTztZQUNILElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQztZQUN0QyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7U0FDN0MsQ0FBQztJQUNOLENBQUM7Ozs7OztJQUdELFdBQVcsQ0FBQyxPQUF1QjtRQUMvQixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxLQUFLLFFBQVEsQ0FBQyxhQUFhLEVBQUU7WUFDdEQsb0JBQW9CO1lBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRWxDLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEtBQUssZUFBZSxFQUFFO2dCQUNsRCxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUU7b0JBQ3BDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztpQkFDMUI7Z0JBRUQsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRTtvQkFDNUIsSUFBSSxDQUFDLGdDQUFnQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztpQkFDNUU7Z0JBRUQsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtvQkFDekIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2lCQUMxQjtnQkFFRCxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFO29CQUMxQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztpQkFDNUI7Z0JBRUQsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTs7MEJBQy9DLElBQUksR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUk7b0JBRXZFLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUM5RTthQUNKO1NBQ0o7SUFDTCxDQUFDOzs7OztJQUVELFlBQVksQ0FBQyxPQUFlLEVBQUU7UUFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QyxDQUFDOzs7O0lBRUQsV0FBVztRQUNQLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3JCO0lBQ0wsQ0FBQzs7OztJQUVELFdBQVc7UUFDUCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRTtZQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3JCO0lBQ0wsQ0FBQzs7OztJQUVELGdCQUFnQjtRQUNaLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDOzs7OztJQUdELGNBQWM7UUFDVixPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLFdBQVcsQ0FBQztJQUM5QyxDQUFDOzs7O0lBRUQsaUJBQWlCOztjQUNQLFlBQVksR0FBRyxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDO1FBRXJFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkQsQ0FBQzs7OztJQUVELGVBQWU7O2NBQ0wsU0FBUyxHQUFHLElBQUksa0JBQWtCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUM7UUFFbkUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QyxDQUFDOzs7OztJQUVELHFCQUFxQixDQUFDLEVBQVE7UUFDMUIsSUFBSSxDQUFDLDBCQUEwQixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMzQyxDQUFDOzs7OztJQUVELG1CQUFtQixDQUFDLEVBQVE7UUFDeEIsSUFBSSxDQUFDLDBCQUEwQixDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9ELENBQUM7Ozs7OztJQUVELDBCQUEwQixDQUFDLEVBQVEsRUFBRSxRQUFnQjtRQUNqRCxDQUFDLElBQUksb0JBQW9CLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDckQsQ0FBQzs7Ozs7O0lBR0QsZ0NBQWdDLENBQUMsaUJBQXlCO1FBQ3RELElBQUksaUJBQWlCLEtBQUssRUFBRSxFQUFFOzs7a0JBRXBCLGNBQWMsR0FBRyxJQUFJLGtCQUFrQixDQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFDekIsaUJBQWlCLENBQ3BCOzs7a0JBR0ssdUJBQXVCLEdBQUcsY0FBYyxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQztZQUUxRSxJQUFJLHVCQUF1QixFQUFFOztvQkFDckIsU0FBUzs7b0JBQ1QsUUFBUTtnQkFFWixJQUFJLHVCQUF1QixDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFO29CQUNyRCxtREFBbUQ7b0JBQ25ELGlFQUFpRTtvQkFDakUsU0FBUyxHQUFHLHVCQUF1QixDQUFDOzs7MEJBRzlCLENBQUMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQztvQkFDckMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQzs7MEJBQzFCLDhCQUE4QixHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVztvQkFFbEUsK0JBQStCO29CQUMvQixRQUFRLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsOEJBQThCLENBQUMsTUFBTSxDQUFDO2lCQUNuRjtxQkFBTTtvQkFDSCxTQUFTLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLEtBQUssQ0FBQztvQkFFakUsUUFBUSxHQUFHLENBQUMsQ0FBQztpQkFDaEI7Z0JBRUQsSUFBSSxDQUFDLDBCQUEwQixDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQzthQUN4RDtTQUNKO0lBQ0wsQ0FBQzs7Ozs7O0lBRUQsMEJBQTBCLENBQUMsY0FBc0IsRUFBRSxJQUFZO1FBQzNELDZEQUE2RDtRQUM3RCxJQUFJLElBQUksS0FBSyxRQUFRLENBQUMsSUFBSSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUMxQjthQUFNO1lBQ0gsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7U0FDNUI7SUFDTCxDQUFDOzs7O0lBRUQsY0FBYztRQUNWLE9BQU8sQ0FBQyxJQUFJLHFCQUFxQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUNuRixDQUFDOzs7O0lBRUQsWUFBWTtRQUNSLE9BQU8sQ0FBQyxJQUFJLHFCQUFxQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNqRixDQUFDOzs7Ozs7SUFHRCxXQUFXLENBQUMsSUFBWTtRQUNwQixPQUFPLENBQUMsSUFBSSx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3JELENBQUM7Ozs7OztJQUVPLGtCQUFrQixDQUFDLENBQUM7UUFDeEIsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNqRSxDQUFDOzs7aUJBOWJBLEtBQUs7b0JBQ0wsS0FBSzt3QkFDTCxLQUFLOzJCQUVMLE1BQU07cUJBRU4sU0FBUyxTQUFDLFFBQVE7Ozs7SUFObkIsb0NBQW9COztJQUNwQix1Q0FBK0I7O0lBQy9CLDJDQUErQjs7SUFFL0IsOENBQTBFOztJQUUxRSx3Q0FBd0M7O0lBRXhDLGtEQU1FOztJQUVGLDJDQUFzQjs7SUFFdEIsdUNBR0U7O0lBRUYsOENBQWlCOztJQUVqQiw0Q0FBNEM7O0lBRTVDLHdEQUFxQzs7SUFFckMsOENBQXlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdWJqZWN0LCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtEZWVwTGVmdE5vZGVDaGlsZH0gZnJvbSAnLi4vLi4vbW9kdWxlcy91dGlscy9kZWVwLWxlZnQtbm9kZS1jaGlsZCc7XG5pbXBvcnQge0RlZXBSaWdodE5vZGVDaGlsZH0gZnJvbSAnLi4vLi4vbW9kdWxlcy91dGlscy9kZWVwLXJpZ2h0LW5vZGUtY2hpbGQnO1xuaW1wb3J0IHtGaXJzdFN1YlN0cmluZ05vZGV9IGZyb20gJy4uLy4uL21vZHVsZXMvdXRpbHMvZmlyc3Qtc3ViLXN0cmluZy1ub2RlJztcbmltcG9ydCB7Q2FyZXRTdGFydEVuZFBvc2l0aW9ufSBmcm9tICcuLi8uLi9tb2R1bGVzL3V0aWxzL25vZGUvY2FyZXQtc3RhcnQtZW5kLXBvc2l0aW9uJztcbmltcG9ydCB7Q3Vyc29yTGVmdENvb3JkaW5hdGV9IGZyb20gJy4uLy4uL21vZHVsZXMvdXRpbHMvbm9kZS9jdXJzb3ItbGVmdC1jb29yZGluYXRlJztcbmltcG9ydCB7Q3Vyc29yUG9zaXRpb25JbkxpbmV9IGZyb20gJy4uLy4uL21vZHVsZXMvdXRpbHMvbm9kZS9jdXJzb3ItcG9zaXRpb24taW4tbGluZSc7XG5pbXBvcnQge1BsYWNlQ2FyZXRUb1Bvc2l0aW9ufSBmcm9tICcuLi8uLi9tb2R1bGVzL3V0aWxzL25vZGUvcGxhY2UtY2FyZXQtdG8tcG9zaXRpb24nO1xuaW1wb3J0IHtTdHJpbmdXaXRob3V0RW1wdHlOb2Rlc30gZnJvbSAnLi4vLi4vbW9kdWxlcy91dGlscy9ub2RlL3N0cmluZy13aXRob3V0LWVtcHR5LW5vZGVzJztcbmltcG9ydCB7SUZvY3VzQ29udGV4dCwgSU9uV2FsbEZvY3VzLCBJT25XYWxsU3RhdGVDaGFuZ2UsIElXYWxsQ29tcG9uZW50LCBJV2FsbE1vZGVsLCBJV2FsbFVpQXBpfSBmcm9tICcuLi8uLi93YWxsL3dhbGwnO1xuaW1wb3J0IHtcbiAgICBCQUNLX1NQQUNFX0tFWSxcbiAgICBCQUNLX1NQQUNFX0tFWV9DT0RFX0FORFJPSUQsXG4gICAgQk9UVE9NX0tFWSxcbiAgICBERUxFVEVfS0VZLFxuICAgIEVOVEVSX0tFWSxcbiAgICBFTlRFUl9LRVlfQ09ERV9BTkRST0lELFxuICAgIEVTQ0FQRV9LRVksXG4gICAgRk9DVVNfSU5JVElBVE9SLFxuICAgIExFRlRfS0VZLFxuICAgIE5VTVBVQl9FTlRFUl9LRVksXG4gICAgUklHSFRfS0VZLFxuICAgIFRBQl9LRVksXG4gICAgVE9QX0tFWVxufSBmcm9tICcuL2Jhc2UtdGV4dC1icmljay5jb25zdGFudCc7XG5pbXBvcnQge0lCYXNlVGV4dFN0YXRlfSBmcm9tICcuL2Jhc2UtdGV4dC1zdGF0ZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHtCb3R0b21LZXlIYW5kbGVyfSBmcm9tICcuL2tleXByZXNzLWhhbmRsZXJzL2JvdHRvbS1rZXkuaGFuZGxlcic7XG5pbXBvcnQge0VudGVyS2V5SGFuZGxlcn0gZnJvbSAnLi9rZXlwcmVzcy1oYW5kbGVycy9lbnRlci1rZXkuaGFuZGxlcic7XG5pbXBvcnQge0xlZnRLZXlIYW5kbGVyfSBmcm9tICcuL2tleXByZXNzLWhhbmRsZXJzL2xlZnQta2V5LmhhbmRsZXInO1xuaW1wb3J0IHtSaWdodEtleUhhbmRsZXJ9IGZyb20gJy4va2V5cHJlc3MtaGFuZGxlcnMvcmlnaHQta2V5LmhhbmRsZXInO1xuaW1wb3J0IHtUb3BLZXlIYW5kbGVyfSBmcm9tICcuL2tleXByZXNzLWhhbmRsZXJzL3RvcC1rZXkuaGFuZGxlcic7XG5cbmVudW0gTGluZVR5cGUge1xuICAgIGZpcnN0ID0gJ0ZJUlNUJyxcbiAgICBsYXN0ID0gJ0xBU1QnXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUN1cnNvclBvc2l0aW9uSW5MaW5lIHtcbiAgICBpc09uTGFzdExpbmU6IGJvb2xlYW47XG4gICAgaXNPbkZpcnN0TGluZTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VUZXh0QnJpY2tDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgSU9uV2FsbFN0YXRlQ2hhbmdlLCBJT25XYWxsRm9jdXMsIElXYWxsQ29tcG9uZW50IHtcbiAgICBASW5wdXQoKSBpZDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHN0YXRlOiBJQmFzZVRleHRTdGF0ZTtcbiAgICBASW5wdXQoKSB3YWxsTW9kZWw6IElXYWxsTW9kZWw7XG5cbiAgICBAT3V0cHV0KCkgc3RhdGVDaGFuZ2VzOiBFdmVudEVtaXR0ZXI8SUJhc2VUZXh0U3RhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQFZpZXdDaGlsZCgnZWRpdG9yJykgZWRpdG9yOiBFbGVtZW50UmVmO1xuXG4gICAga2V5cHJlc3NIYW5kbGVycyA9IHtcbiAgICAgICAgdG9wOiBuZXcgVG9wS2V5SGFuZGxlcih0aGlzKSxcbiAgICAgICAgZW50ZXI6IG5ldyBFbnRlcktleUhhbmRsZXIodGhpcyksXG4gICAgICAgIGxlZnQ6IG5ldyBMZWZ0S2V5SGFuZGxlcih0aGlzKSxcbiAgICAgICAgcmlnaHQ6IG5ldyBSaWdodEtleUhhbmRsZXIodGhpcyksXG4gICAgICAgIGJvdHRvbTogbmV3IEJvdHRvbUtleUhhbmRsZXIodGhpcylcbiAgICB9O1xuXG4gICAgd2FsbFVpQXBpOiBJV2FsbFVpQXBpO1xuXG4gICAgc2NvcGU6IElCYXNlVGV4dFN0YXRlID0ge1xuICAgICAgICB0ZXh0OiAnJyxcbiAgICAgICAgdGFiczogMFxuICAgIH07XG5cbiAgICBtYXhUYWJOdW1iZXIgPSAzO1xuXG4gICAgdGV4dENoYW5nZTogU3ViamVjdDxzdHJpbmc+ID0gbmV3IFN1YmplY3QoKTtcblxuICAgIHRleHRDaGFuZ2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIG9uUGFzdGVCb3VuZDogKGU6IENsaXBib2FyZEV2ZW50KSA9PiBhbnk7XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgJiYgdGhpcy5zdGF0ZS50ZXh0ICE9PSB0aGlzLnNjb3BlLnRleHQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VGV4dFN0YXRlKHRoaXMuc3RhdGUudGV4dCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNjb3BlLnRhYnMgPSB0aGlzLnN0YXRlLnRhYnMgfHwgMDtcblxuICAgICAgICB0aGlzLm9uUGFzdGVCb3VuZCA9IHRoaXMub25QYXN0ZS5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuZWRpdG9yLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncGFzdGUnLCB0aGlzLm9uUGFzdGVCb3VuZCk7XG5cbiAgICAgICAgdGhpcy50ZXh0Q2hhbmdlU3Vic2NyaXB0aW9uID0gdGhpcy50ZXh0Q2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFRleHRTdGF0ZSh0aGlzLnNjb3BlLnRleHQpO1xuICAgICAgICAgICAgdGhpcy5zYXZlQ3VycmVudFN0YXRlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMud2FsbFVpQXBpID0gdGhpcy53YWxsTW9kZWwuYXBpLnVpO1xuICAgIH1cblxuICAgIG9uV2FsbFN0YXRlQ2hhbmdlKG5ld1N0YXRlOiBJQmFzZVRleHRTdGF0ZSkge1xuICAgICAgICB0aGlzLnNjb3BlLnRhYnMgPSB0aGlzLnN0YXRlLnRhYnMgfHwgdGhpcy5zY29wZS50YWJzO1xuXG4gICAgICAgIGlmIChuZXdTdGF0ZSAmJiBuZXdTdGF0ZS50ZXh0ICE9PSB0aGlzLnNjb3BlLnRleHQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VGV4dFN0YXRlKG5ld1N0YXRlLnRleHQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZWRpdG9yLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncGFzdGUnLCB0aGlzLm9uUGFzdGVCb3VuZCk7XG5cbiAgICAgICAgdGhpcy50ZXh0Q2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgb25QYXN0ZShlOiBDbGlwYm9hcmRFdmVudCkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgdGV4dEFyciA9IGUuY2xpcGJvYXJkRGF0YS5nZXREYXRhKCd0ZXh0L3BsYWluJylcbiAgICAgICAgICAgIC5zcGxpdCgnXFxuJylcbiAgICAgICAgICAgIC5tYXAoKHN0cikgPT4gc3RyLnRyaW0oKSlcbiAgICAgICAgICAgIC5maWx0ZXIoKHN0cikgPT4gc3RyLmxlbmd0aCk7XG5cbiAgICAgICAgaWYgKHRleHRBcnIubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnaW5zZXJ0SFRNTCcsIGZhbHNlLCB0ZXh0QXJyWzBdKTtcbiAgICAgICAgfSBlbHNlIGlmICh0ZXh0QXJyLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIC8vIHRvZG86IGFkZCBpbnRlcmZhY2UgZm9yIFVJIGFwaVxuICAgICAgICAgICAgdGV4dEFyci5yZXZlcnNlKCkuZm9yRWFjaCgodGV4dCkgPT4gdGhpcy53YWxsTW9kZWwuYXBpLmNvcmUuYWRkQnJpY2tBZnRlckJyaWNrSWQodGhpcy5pZCwgJ3RleHQnLCB7dGV4dH0pKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uVGV4dENoYW5nZSgpIHtcbiAgICAgICAgdGhpcy50ZXh0Q2hhbmdlLm5leHQodGhpcy5zY29wZS50ZXh0KTtcbiAgICB9XG5cbiAgICAvLyBnZW5lcmFsIGhhbmRsZXIgb2YgYWxsIGtleSBldmVudHNcbiAgICBvbktleVByZXNzKGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMubm9NZXRhS2V5SXNQcmVzc2VkKGUpKSB7XG4gICAgICAgICAgICBpZiAoZS5jb2RlID09PSBUT1BfS0VZKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50b3BLZXlQcmVzc2VkKGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZS5jb2RlID09PSBCT1RUT01fS0VZKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3R0b21LZXlQcmVzc2VkKGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZS5jb2RlID09PSBMRUZUX0tFWSAmJiB0aGlzLmlzQ2FyZXRBdFN0YXJ0KCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxlZnRLZXlQcmVzc2VkKGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZS5jb2RlID09PSBSSUdIVF9LRVkgJiYgdGhpcy5pc0NhcmV0QXRFbmQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmlnaHRLZXlQcmVzc2VkKGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZS5jb2RlID09PSBFTlRFUl9LRVkgfHwgZS5rZXlDb2RlID09PSBFTlRFUl9LRVlfQ09ERV9BTkRST0lEIHx8IGUuY29kZSA9PT0gTlVNUFVCX0VOVEVSX0tFWSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW50ZXJLZXlQcmVzc2VkKGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSBFU0NBUEVfS0VZKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lc2NhcGVLZXlQcmVzc2VkKGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoKGUuY29kZSA9PT0gQkFDS19TUEFDRV9LRVkgfHwgZS5rZXlDb2RlID09PSBCQUNLX1NQQUNFX0tFWV9DT0RFX0FORFJPSUQpICYmICF0aGlzLmlzVGV4dFNlbGVjdGVkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJhY2tTcGFjZUtleVByZXNzZWQoZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChlLmNvZGUgPT09IERFTEVURV9LRVkgJiYgdGhpcy5zY29wZS50ZXh0Lmxlbmd0aCAmJiB0aGlzLmlzQ2FyZXRBdEVuZCgpICYmICF0aGlzLmlzVGV4dFNlbGVjdGVkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmNhdFdpdGhOZXh0VGV4dFN1cHBvcnRpbmdCcmljayhlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGUuY29kZSA9PT0gVEFCX0tFWSAmJiB0aGlzLmlzQ2FyZXRBdFN0YXJ0KCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uVGFiUHJlc3NlZChlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGUuY29kZSA9PT0gREVMRVRFX0tFWSAmJiB0aGlzLnNjb3BlLnRleHQgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkRlbGV0ZUFuZEZvY3VzVG9OZXh0KGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJveHlUb0tleUhhbmRsZXIoa2V5SGFuZGxlck5hbWU6IHN0cmluZywgZTogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICB0aGlzLmtleXByZXNzSGFuZGxlcnNba2V5SGFuZGxlck5hbWVdLmV4ZWN1dGUoZSk7XG4gICAgfVxuXG4gICAgLy8ga2V5IGhhbmRsZXJcbiAgICB0b3BLZXlQcmVzc2VkKGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgdGhpcy5wcm94eVRvS2V5SGFuZGxlcigndG9wJywgZSk7XG4gICAgfVxuXG4gICAgYm90dG9tS2V5UHJlc3NlZChlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIHRoaXMucHJveHlUb0tleUhhbmRsZXIoJ2JvdHRvbScsIGUpO1xuICAgIH1cblxuICAgIGVudGVyS2V5UHJlc3NlZChlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIHRoaXMucHJveHlUb0tleUhhbmRsZXIoJ2VudGVyJywgZSk7XG4gICAgfVxuXG4gICAgbGVmdEtleVByZXNzZWQoZTogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICB0aGlzLnByb3h5VG9LZXlIYW5kbGVyKCdsZWZ0JywgZSk7XG4gICAgfVxuXG4gICAgcmlnaHRLZXlQcmVzc2VkKGUpIHtcbiAgICAgICAgdGhpcy5wcm94eVRvS2V5SGFuZGxlcigncmlnaHQnLCBlKTtcbiAgICB9XG5cbiAgICBlc2NhcGVLZXlQcmVzc2VkKGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgLy8gZG8gbm90aGluZ1xuICAgIH1cblxuICAgIG9uVGFiUHJlc3NlZChlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB0aGlzLmluY3JlYXNlVGFiKCk7XG4gICAgICAgIHRoaXMuc2F2ZUN1cnJlbnRTdGF0ZSgpO1xuICAgIH1cblxuICAgIGJhY2tTcGFjZUtleVByZXNzZWQoZTogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5pc0NhcmV0QXRTdGFydCgpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zY29wZS50YWJzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWNyZWFzZVRhYigpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2F2ZUN1cnJlbnRTdGF0ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zY29wZS50ZXh0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmNhdFdpdGhQcmV2aW91c1RleHRTdXBwb3J0aW5nQnJpY2soZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkRlbGV0ZUFuZEZvY3VzVG9QcmV2aW91cyhlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBlbmQga2V5IGhhbmRsZXJzXG5cbiAgICBpc0NhcmV0QXRGaXJzdExpbmUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEN1cnNvclBvc2l0aW9uSW5MaW5lKCkuaXNPbkZpcnN0TGluZTtcbiAgICB9XG5cbiAgICBpc0NhcmV0QXRMYXN0TGluZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q3Vyc29yUG9zaXRpb25JbkxpbmUoKS5pc09uTGFzdExpbmU7XG4gICAgfVxuXG4gICAgZ2V0Q2FyZXRMZWZ0Q29vcmRpbmF0ZSgpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgIGNvbnN0IGxlZnRSaWdodFRleHQgPSB0aGlzLmdldFNwbGl0dGVkVGV4dChzZWwuZm9jdXNPZmZzZXQsIHNlbC5mb2N1c05vZGUpO1xuXG4gICAgICAgIHJldHVybiAobmV3IEN1cnNvckxlZnRDb29yZGluYXRlKGxlZnRSaWdodFRleHQubGVmdCwgbGVmdFJpZ2h0VGV4dC5yaWdodCwgdGhpcy5lZGl0b3IubmF0aXZlRWxlbWVudCkpLmdldCgpO1xuICAgIH1cblxuICAgIGdldEN1cnNvclBvc2l0aW9uSW5MaW5lKCk6IElDdXJzb3JQb3NpdGlvbkluTGluZSB7XG4gICAgICAgIGNvbnN0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgY29uc3QgbGVmdFJpZ2h0VGV4dCA9IHRoaXMuZ2V0U3BsaXR0ZWRUZXh0KHNlbC5mb2N1c09mZnNldCwgc2VsLmZvY3VzTm9kZSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBDdXJzb3JQb3NpdGlvbkluTGluZShsZWZ0UmlnaHRUZXh0LmxlZnQsIGxlZnRSaWdodFRleHQucmlnaHQsIHRoaXMuZWRpdG9yLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIGNvbmNhdFdpdGhQcmV2aW91c1RleHRTdXBwb3J0aW5nQnJpY2soZSkge1xuICAgICAgICBjb25zdCBwcmV2aW91c1RleHRCcmlja0lkID0gdGhpcy53YWxsTW9kZWwuYXBpLmNvcmUuZ2V0UHJldmlvdXNUZXh0QnJpY2tJZCh0aGlzLmlkKTtcblxuICAgICAgICBpZiAocHJldmlvdXNUZXh0QnJpY2tJZCkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c0JyaWNrU25hcHNob3QgPSB0aGlzLndhbGxNb2RlbC5hcGkuY29yZS5nZXRCcmlja1NuYXBzaG90KHByZXZpb3VzVGV4dEJyaWNrSWQpO1xuXG4gICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkuY29yZS51cGRhdGVCcmlja1N0YXRlKHByZXZpb3VzVGV4dEJyaWNrSWQsIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLmNsZWFuVXBUZXh0KHByZXZpb3VzQnJpY2tTbmFwc2hvdC5zdGF0ZS50ZXh0KSArIHRoaXMuc2NvcGUudGV4dFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIHdhaXQgZm9yIGNvbXBvbmVudCByZS1yZW5kZXJpbmdcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvY3VzQ29udGV4dDogSUZvY3VzQ29udGV4dCA9IHtcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhdG9yOiBGT0NVU19JTklUSUFUT1IsXG4gICAgICAgICAgICAgICAgICAgIGRldGFpbHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmNhdFRleHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25jYXRlbmF0aW9uVGV4dDogdGhpcy5zY29wZS50ZXh0XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgdGhpcy53YWxsVWlBcGkuZm9jdXNPbkJyaWNrSWQocHJldmlvdXNUZXh0QnJpY2tJZCwgZm9jdXNDb250ZXh0KTtcblxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBvbmx5IGFmdGVyIGZvY3VzIHdpbGwgYmUgZXN0YWJsaXNoZWRcbiAgICAgICAgICAgICAgICAvLyB0aGF0IHByZXZlbnRzIGZsaWNrZXJpbmcgb24gbW9iaWxlXG4gICAgICAgICAgICAgICAgdGhpcy53YWxsVWlBcGkucmVtb3ZlQnJpY2sodGhpcy5pZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbmNhdFdpdGhOZXh0VGV4dFN1cHBvcnRpbmdCcmljayhlOiBFdmVudCkge1xuICAgICAgICBjb25zdCBuZXh0VGV4dEJyaWNrSWQgPSB0aGlzLndhbGxNb2RlbC5hcGkuY29yZS5nZXROZXh0VGV4dEJyaWNrSWQodGhpcy5pZCk7XG5cbiAgICAgICAgaWYgKG5leHRUZXh0QnJpY2tJZCkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBjb25zdCBuZXh0VGV4dEJyaWNrU25hcHNob3QgPSB0aGlzLndhbGxNb2RlbC5hcGkuY29yZS5nZXRCcmlja1NuYXBzaG90KG5leHRUZXh0QnJpY2tJZCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGNvbmNhdGVuYXRpb25UZXh0ID0gbmV4dFRleHRCcmlja1NuYXBzaG90LnN0YXRlLnRleHQgfHwgJyc7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0VGV4dFN0YXRlKHRoaXMuc2NvcGUudGV4dCArIGNvbmNhdGVuYXRpb25UZXh0KTtcblxuICAgICAgICAgICAgdGhpcy5zYXZlQ3VycmVudFN0YXRlKCk7XG5cbiAgICAgICAgICAgIHRoaXMud2FsbE1vZGVsLmFwaS5jb3JlLnJlbW92ZUJyaWNrKG5leHRUZXh0QnJpY2tJZCk7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucGxhY2VDYXJldEJhc2VPbkNvbmNhdGVuYXRlZFRleHQoY29uY2F0ZW5hdGlvblRleHQpO1xuICAgICAgICAgICAgfSwgMTApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25EZWxldGVBbmRGb2N1c1RvUHJldmlvdXMoZTogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgcHJldmlvdXNUZXh0QnJpY2tJZCA9IHRoaXMud2FsbE1vZGVsLmFwaS5jb3JlLmdldFByZXZpb3VzVGV4dEJyaWNrSWQodGhpcy5pZCk7XG5cbiAgICAgICAgdGhpcy53YWxsVWlBcGkucmVtb3ZlQnJpY2sodGhpcy5pZCk7XG5cbiAgICAgICAgaWYgKHByZXZpb3VzVGV4dEJyaWNrSWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGZvY3VzQ29udGV4dDogSUZvY3VzQ29udGV4dCA9IHtcbiAgICAgICAgICAgICAgICBpbml0aWF0b3I6IEZPQ1VTX0lOSVRJQVRPUixcbiAgICAgICAgICAgICAgICBkZXRhaWxzOiB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZVByZXZpb3VzVGV4dDogdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMud2FsbFVpQXBpLmZvY3VzT25Ccmlja0lkKHByZXZpb3VzVGV4dEJyaWNrSWQsIGZvY3VzQ29udGV4dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkRlbGV0ZUFuZEZvY3VzVG9OZXh0KGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0IG5leHRUZXh0QnJpY2tJZCA9IHRoaXMud2FsbE1vZGVsLmFwaS5jb3JlLmdldE5leHRUZXh0QnJpY2tJZCh0aGlzLmlkKTtcblxuICAgICAgICBpZiAobmV4dFRleHRCcmlja0lkKSB7XG4gICAgICAgICAgICB0aGlzLndhbGxVaUFwaS5yZW1vdmVCcmljayh0aGlzLmlkKTtcblxuICAgICAgICAgICAgY29uc3QgZm9jdXNDb250ZXh0OiBJRm9jdXNDb250ZXh0ID0ge1xuICAgICAgICAgICAgICAgIGluaXRpYXRvcjogRk9DVVNfSU5JVElBVE9SLFxuICAgICAgICAgICAgICAgIGRldGFpbHM6IHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlUHJldmlvdXNUZXh0OiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy53YWxsVWlBcGkuZm9jdXNPbkJyaWNrSWQobmV4dFRleHRCcmlja0lkLCBmb2N1c0NvbnRleHQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0U3BsaXR0ZWRUZXh0KG9mZnNldDogbnVtYmVyLCB0YXJnZXQ6IE5vZGUpOiB7IGxlZnQ6IHN0cmluZywgcmlnaHQ6IHN0cmluZyB9IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxlZnQ6IHRoaXMuc2NvcGUudGV4dC5zbGljZSgwLCBvZmZzZXQpLFxuICAgICAgICAgICAgcmlnaHQ6IHRoaXMuc2NvcGUudGV4dC5zbGljZShvZmZzZXQpIHx8ICcnXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8ga2V5IGhhbmRsZXIgZW5kXG4gICAgb25XYWxsRm9jdXMoY29udGV4dD86IElGb2N1c0NvbnRleHQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZWRpdG9yLm5hdGl2ZUVsZW1lbnQgIT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIGZvY3VzIGJ5IEFQSSBjYWxsXG4gICAgICAgICAgICB0aGlzLmVkaXRvci5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG5cbiAgICAgICAgICAgIGlmIChjb250ZXh0ICYmIGNvbnRleHQuaW5pdGlhdG9yID09PSBGT0NVU19JTklUSUFUT1IpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29udGV4dC5kZXRhaWxzLmRlbGV0ZVByZXZpb3VzVGV4dCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYWNlQ2FyZXRBdEVuZCgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjb250ZXh0LmRldGFpbHMuY29uY2F0VGV4dCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYWNlQ2FyZXRCYXNlT25Db25jYXRlbmF0ZWRUZXh0KGNvbnRleHQuZGV0YWlscy5jb25jYXRlbmF0aW9uVGV4dCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRleHQuZGV0YWlscy5sZWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxhY2VDYXJldEF0RW5kKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRleHQuZGV0YWlscy5yaWdodEtleSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYWNlQ2FyZXRBdFN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRleHQuZGV0YWlscy5ib3R0b21LZXkgfHwgY29udGV4dC5kZXRhaWxzLnRvcEtleSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsaW5lID0gY29udGV4dC5kZXRhaWxzLmJvdHRvbUtleSA/IExpbmVUeXBlLmZpcnN0IDogTGluZVR5cGUubGFzdDtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYWNlQ2FyZXRBdExlZnRDb29yZGluYXRlKGNvbnRleHQuZGV0YWlscy5jYXJldExlZnRDb29yZGluYXRlLCBsaW5lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRUZXh0U3RhdGUodGV4dDogc3RyaW5nID0gJycpIHtcbiAgICAgICAgdGhpcy5zY29wZS50ZXh0ID0gdGhpcy5jbGVhblVwVGV4dCh0ZXh0KTtcbiAgICB9XG5cbiAgICBpbmNyZWFzZVRhYigpIHtcbiAgICAgICAgaWYgKHRoaXMuc2NvcGUudGFicyA8IHRoaXMubWF4VGFiTnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLnNjb3BlLnRhYnMrKztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlY3JlYXNlVGFiKCkge1xuICAgICAgICBpZiAodGhpcy5zY29wZS50YWJzID4gMCkge1xuICAgICAgICAgICAgdGhpcy5zY29wZS50YWJzLS07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzYXZlQ3VycmVudFN0YXRlKCkge1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5lbWl0KHRoaXMuc2NvcGUpO1xuICAgIH1cblxuICAgIC8vIGNhcmV0IGhlbHBlcnNcbiAgICBpc1RleHRTZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICF3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuaXNDb2xsYXBzZWQ7XG4gICAgfVxuXG4gICAgcGxhY2VDYXJldEF0U3RhcnQoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGRlZXBMZWZ0Tm9kZSA9IG5ldyBEZWVwTGVmdE5vZGVDaGlsZCh0aGlzLmVkaXRvci5uYXRpdmVFbGVtZW50KTtcblxuICAgICAgICB0aGlzLnBsYWNlQ2FyZXRBdE5vZGVTdGFydChkZWVwTGVmdE5vZGUuY2hpbGQpO1xuICAgIH1cblxuICAgIHBsYWNlQ2FyZXRBdEVuZCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgcmlnaHROb2RlID0gbmV3IERlZXBSaWdodE5vZGVDaGlsZCh0aGlzLmVkaXRvci5uYXRpdmVFbGVtZW50KTtcblxuICAgICAgICB0aGlzLnBsYWNlQ2FyZXRBdE5vZGVFbmQocmlnaHROb2RlLmNoaWxkKTtcbiAgICB9XG5cbiAgICBwbGFjZUNhcmV0QXROb2RlU3RhcnQoZWw6IE5vZGUpIHtcbiAgICAgICAgdGhpcy5wbGFjZUNhcmV0QXROb2RlVG9Qb3NpdGlvbihlbCwgMCk7XG4gICAgfVxuXG4gICAgcGxhY2VDYXJldEF0Tm9kZUVuZChlbDogTm9kZSkge1xuICAgICAgICB0aGlzLnBsYWNlQ2FyZXRBdE5vZGVUb1Bvc2l0aW9uKGVsLCBlbC50ZXh0Q29udGVudC5sZW5ndGgpO1xuICAgIH1cblxuICAgIHBsYWNlQ2FyZXRBdE5vZGVUb1Bvc2l0aW9uKGVsOiBOb2RlLCBwb3NpdGlvbjogbnVtYmVyKSB7XG4gICAgICAgIChuZXcgUGxhY2VDYXJldFRvUG9zaXRpb24oZWwsIHBvc2l0aW9uKSkucGxhY2UoKTtcbiAgICB9XG5cbiAgICAvLyBmaW5kIHRoZSBub2RlIHdoaWNoIGNvbnRhaW5zIGNvbmNhdGVuYXRlZCB0ZXh0IGFuZCBwb3NpdGlvbiBpbiB0aGlzIG5vZGUgd2hlcmUgY3Vyc29yIHNob3VsZCBiZSBwbGFjZWRcbiAgICBwbGFjZUNhcmV0QmFzZU9uQ29uY2F0ZW5hdGVkVGV4dChjb25jYXRlbmF0aW9uVGV4dDogc3RyaW5nKSB7XG4gICAgICAgIGlmIChjb25jYXRlbmF0aW9uVGV4dCAhPT0gJycpIHtcbiAgICAgICAgICAgIC8vIGZpbmQgZmlyc3QgbGV2ZWwgbm9kZXMgZm9yIHRoZSB0ZXh0IHRoYXQgd2FzIGNvbmNhdGVuYXRlZFxuICAgICAgICAgICAgY29uc3Qgc3ViU3RyaW5nTm9kZXMgPSBuZXcgRmlyc3RTdWJTdHJpbmdOb2RlKFxuICAgICAgICAgICAgICAgIHRoaXMuZWRpdG9yLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICAgICAgY29uY2F0ZW5hdGlvblRleHRcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIC8vIGZpcnN0IGxldmVsIG5vZGUgd2hpY2ggY29udGFpbnMgY29uY2F0ZW5hdGVkIHRleHRcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0TGV2ZWxTdWJTdHJpbmdOb2RlID0gc3ViU3RyaW5nTm9kZXMuZmlyc3RMZXZlbFN1YlN0cmluZ05vZGVzWzBdO1xuXG4gICAgICAgICAgICBpZiAoZmlyc3RMZXZlbFN1YlN0cmluZ05vZGUpIHtcbiAgICAgICAgICAgICAgICBsZXQgZm9jdXNOb2RlO1xuICAgICAgICAgICAgICAgIGxldCBwb3NpdGlvbjtcblxuICAgICAgICAgICAgICAgIGlmIChmaXJzdExldmVsU3ViU3RyaW5nTm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgZmlyc3QgY29uY2F0ZW5hdGVkIG5vZGUgaXMgVEVYVF9OT0RFIGl0IG1pZ2h0XG4gICAgICAgICAgICAgICAgICAgIC8vIGJlIGF1dG9tYXRpY2FsbHkgY29uY2F0ZW5hdGVkIHdpdGggcHJldmlvdXMgZXhpc3RpbmcgVEVYVF9OT0RFXG4gICAgICAgICAgICAgICAgICAgIGZvY3VzTm9kZSA9IGZpcnN0TGV2ZWxTdWJTdHJpbmdOb2RlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGZpbmQgdGV4dCBjb250ZW50IGZvciBmaXJzdCBjb25jYXRlbmF0ZWQgVEVYVF9OT0RFXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdQJyk7XG4gICAgICAgICAgICAgICAgICAgIHAuaW5uZXJIVE1MID0gY29uY2F0ZW5hdGlvblRleHQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0TGV2ZWxTdWJTdHJpbmdUZXh0Q29udGVudCA9IHAuY2hpbGROb2Rlc1swXS50ZXh0Q29udGVudDtcblxuICAgICAgICAgICAgICAgICAgICAvLyBmaW5hbGx5IGZpbmQgY3Vyc29yIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gZm9jdXNOb2RlLnRleHRDb250ZW50Lmxlbmd0aCAtIGZpcnN0TGV2ZWxTdWJTdHJpbmdUZXh0Q29udGVudC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9jdXNOb2RlID0gbmV3IERlZXBMZWZ0Tm9kZUNoaWxkKGZpcnN0TGV2ZWxTdWJTdHJpbmdOb2RlKS5jaGlsZDtcblxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IDA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5wbGFjZUNhcmV0QXROb2RlVG9Qb3NpdGlvbihmb2N1c05vZGUsIHBvc2l0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBsYWNlQ2FyZXRBdExlZnRDb29yZGluYXRlKGxlZnRDb29yZGluYXRlOiBudW1iZXIsIGxpbmU6IHN0cmluZykge1xuICAgICAgICAvLyB0b2RvOiBmaW5kIHRoZSB3YXkgdG8gc2V0IGNhcmV0IGJhc2VkIG9uIGNvb3JkaW5hdGUgbnVtYmVyXG4gICAgICAgIGlmIChsaW5lID09PSBMaW5lVHlwZS5sYXN0KSB7XG4gICAgICAgICAgICB0aGlzLnBsYWNlQ2FyZXRBdEVuZCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wbGFjZUNhcmV0QXRTdGFydCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNDYXJldEF0U3RhcnQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAobmV3IENhcmV0U3RhcnRFbmRQb3NpdGlvbih0aGlzLmVkaXRvci5uYXRpdmVFbGVtZW50KSkuaXNDYXJldEF0U3RhcnQoKTtcbiAgICB9XG5cbiAgICBpc0NhcmV0QXRFbmQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAobmV3IENhcmV0U3RhcnRFbmRQb3NpdGlvbih0aGlzLmVkaXRvci5uYXRpdmVFbGVtZW50KSkuaXNDYXJldEF0RW5kKCk7XG4gICAgfVxuXG4gICAgLy8gcmVtb3ZlIGFsbCB1bm5lY2Vzc2FyeSB0YWdzXG4gICAgY2xlYW5VcFRleHQodGV4dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIChuZXcgU3RyaW5nV2l0aG91dEVtcHR5Tm9kZXModGV4dCkpLmdldCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbm9NZXRhS2V5SXNQcmVzc2VkKGUpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEoKGUuc2hpZnRLZXkgfHwgZS5hbHRLZXkgfHwgZS5jdHJsS2V5IHx8IGUubWV0YUtleSkpO1xuICAgIH1cbn1cbiJdfQ==