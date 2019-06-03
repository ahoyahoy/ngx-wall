import { CommonModule, DOCUMENT } from '@angular/common';
import { Injectable, Component, ComponentFactoryResolver, ApplicationRef, Injector, NgModule, EventEmitter, Inject, Input, Output, ViewChild, NgZone, ChangeDetectorRef, ViewContainerRef, Directive, Renderer2, ElementRef, HostListener, ChangeDetectionStrategy, InjectionToken } from '@angular/core';
import { Subject, fromEvent, BehaviorSubject } from 'rxjs';
import { MatIconModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatListModule } from '@angular/material';
import { throttleTime, filter, debounceTime } from 'rxjs/operators';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { StickyModalRef, StickyPositionStrategy, StickyModalService, StickyModalModule, STICKY_MODAL_DATA } from 'ngx-sticky-modal';
import { __awaiter } from 'tslib';
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/shell/shell';
import 'codemirror/mode/xml/xml';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Guid {
    /**
     * @return {?}
     */
    get() {
        /**
         * @return {?}
         */
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Base64ToFile {
    /**
     * @param {?} base64
     * @param {?} fileName
     */
    constructor(base64, fileName) {
        this.base64 = base64;
        this.fileName = fileName;
    }
    /**
     * @return {?}
     */
    getFile() {
        /** @type {?} */
        const arr = this.base64.split(',');
        /** @type {?} */
        const mime = arr[0].match(/:(.*?);/)[1];
        /** @type {?} */
        const bstr = atob(arr[1]);
        /** @type {?} */
        let n = bstr.length;
        /** @type {?} */
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], this.fileName, { type: mime });
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ImgEncoder {
    /**
     * @param {?} image
     */
    constructor(image) {
        this.image = image;
    }
    /**
     * @return {?}
     */
    getBase64Representation() {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            /** @type {?} */
            const reader = new FileReader();
            reader.onload = (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                resolve(event.target.result);
            });
            reader.onerror = (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                reject(event);
            });
            reader.readAsDataURL(this.image);
        }));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WallBrick {
    /**
     * @param {?} id
     * @param {?} tag
     * @param {?} meta
     */
    constructor(id, tag, meta) {
        this.state = {};
        this.id = id;
        this.tag = tag;
        this.meta = meta;
    }
    /**
     * @return {?}
     */
    getState() {
        return JSON.parse(JSON.stringify(this.state));
    }
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} newState
     * @return {THIS}
     */
    updateState(newState) {
        if (Object.keys(newState).length) {
            Object.assign((/** @type {?} */ (this)).state, newState);
        }
        else {
            (/** @type {?} */ (this)).state = {};
        }
        return (/** @type {?} */ (this));
    }
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} tag
     * @return {THIS}
     */
    turnInto(tag) {
        (/** @type {?} */ (this)).tag = tag;
        (/** @type {?} */ (this)).updateState({});
        return (/** @type {?} */ (this));
    }
    /**
     * @return {?}
     */
    getSnapshot() {
        return {
            id: this.id,
            tag: this.tag,
            meta: this.meta,
            state: this.getState()
        };
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AddBrickEvent {
    /**
     * @param {?} brickId
     */
    constructor(brickId) {
        this.brickId = brickId;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BeforeChangeEvent {
    /**
     * @param {?} beforeEventType
     */
    constructor(beforeEventType) {
        this.beforeEventType = beforeEventType;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MoveBrickEvent {
    /**
     * @param {?} movedBrickIds
     * @param {?} beforeBrickId
     */
    constructor(movedBrickIds, beforeBrickId) {
        this.movedBrickIds = movedBrickIds;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class RemoveBrickEvent {
    /**
     * @param {?} brick
     * @param {?} previousBrickId
     * @param {?} nextBrickId
     */
    constructor(brick, previousBrickId, nextBrickId) {
        this.brick = brick;
        this.previousBrickId = previousBrickId;
        this.nextBrickId = nextBrickId;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class RemoveBricksEvent {
    /**
     * @param {?} bricks
     * @param {?} previousBrickId
     * @param {?} nextBrickId
     */
    constructor(bricks, previousBrickId, nextBrickId) {
        this.bricks = bricks;
        this.previousBrickId = previousBrickId;
        this.nextBrickId = nextBrickId;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SetPlanEvent {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TurnBrickIntoEvent {
    /**
     * @param {?} brickId
     * @param {?} newTag
     * @param {?} oldTag
     */
    constructor(brickId, newTag, oldTag) {
        this.brickId = brickId;
        this.newTag = newTag;
        this.oldTag = oldTag;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class UpdateBrickStateEvent {
    /**
     * @param {?} brickId
     * @param {?} brickState
     * @param {?} oldBrickState
     */
    constructor(brickId, brickState, oldBrickState) {
        this.brickId = brickId;
        this.brickState = brickState;
        this.oldBrickState = oldBrickState;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
* Execute queries commands over rows
* */
class LayoutWalker {
    /**
     * @param {?} brickRegistry
     */
    constructor(brickRegistry) {
        this.brickRegistry = brickRegistry;
        this.rows = [];
    }
    // public API
    /**
     * @return {?}
     */
    getRowCount() {
        return this.rows.length;
    }
    /**
     * @param {?} firstBrickId
     * @param {?} secondBrickId
     * @return {?}
     */
    isBrickAheadOf(firstBrickId, secondBrickId) {
        /** @type {?} */
        const brickIdsSequence = this.getBrickSequence((/**
         * @return {?}
         */
        () => true)).map((/**
         * @param {?} brick
         * @return {?}
         */
        (brick) => brick.id));
        return brickIdsSequence.indexOf(firstBrickId) < brickIdsSequence.indexOf(secondBrickId);
    }
    /**
     * @param {?} brickId
     * @return {?}
     */
    getBrickTag(brickId) {
        return this.getBrickById(brickId).tag;
    }
    /**
     * @param {?} brickId
     * @return {?}
     */
    getBrickById(brickId) {
        return this.getBrickSequence((/**
         * @param {?} brick
         * @return {?}
         */
        (brick) => {
            return brick.id === brickId;
        }))[0];
    }
    /**
     * @return {?}
     */
    getBrickIds() {
        return this.getBrickSequence((/**
         * @return {?}
         */
        () => true)).map((/**
         * @param {?} brick
         * @return {?}
         */
        (brick) => brick.id));
    }
    /**
     * @param {?} predictor
     * @return {?}
     */
    filterBricks(predictor) {
        return this.getBrickSequence((/**
         * @param {?} wallBrick
         * @return {?}
         */
        (wallBrick) => {
            return predictor(wallBrick.getSnapshot());
        }));
    }
    /**
     * @param {?} brickId
     * @return {?}
     */
    getBrickPosition(brickId) {
        /** @type {?} */
        const brickPosition = {
            rowIndex: null,
            columnIndex: null,
            brickIndex: null
        };
        /** @type {?} */
        let i = 0;
        while (brickPosition.rowIndex === null && i < this.rows.length) {
            this.rows[i].columns.forEach((/**
             * @param {?} column
             * @param {?} columnIndex
             * @return {?}
             */
            (column, columnIndex) => {
                /** @type {?} */
                let brickIndex = null;
                column.bricks.forEach((/**
                 * @param {?} brick
                 * @param {?} index
                 * @return {?}
                 */
                (brick, index) => {
                    if (brick.id === brickId) {
                        brickIndex = index;
                    }
                }));
                if (brickIndex || brickIndex === 0) {
                    brickPosition.rowIndex = i;
                    brickPosition.columnIndex = columnIndex;
                    brickPosition.brickIndex = brickIndex;
                }
            }));
            i++;
        }
        return brickPosition;
    }
    /**
     * @param {?} rowIndex
     * @return {?}
     */
    getColumnCount(rowIndex) {
        return this.rows[rowIndex].columns.length;
    }
    /**
     * @return {?}
     */
    getBricksCount() {
        return this.getBrickSequence((/**
         * @return {?}
         */
        () => true)).length;
    }
    /**
     * @param {?} brickId
     * @return {?}
     */
    getNextBrick(brickId) {
        /** @type {?} */
        const bricksSequence = this.getBrickSequence((/**
         * @return {?}
         */
        () => true));
        /** @type {?} */
        const brickIndex = bricksSequence.findIndex((/**
         * @param {?} brick
         * @return {?}
         */
        (brick) => {
            return brick.id === brickId;
        }));
        return bricksSequence[brickIndex + 1];
    }
    /**
     * @param {?} brickId
     * @return {?}
     */
    getNextBrickId(brickId) {
        /** @type {?} */
        const nextBrick = this.getNextBrick(brickId);
        return nextBrick && nextBrick.id;
    }
    /**
     * @param {?} brickId
     * @return {?}
     */
    getPreviousBrick(brickId) {
        /** @type {?} */
        const bricksSequence = this.getBrickSequence((/**
         * @return {?}
         */
        () => true));
        /** @type {?} */
        const brickIndex = bricksSequence.findIndex((/**
         * @param {?} brick
         * @return {?}
         */
        (brick) => {
            return brick.id === brickId;
        }));
        return bricksSequence[brickIndex - 1];
    }
    /**
     * @param {?} brickId
     * @return {?}
     */
    getPreviousBrickId(brickId) {
        /** @type {?} */
        const previousBrick = this.getPreviousBrick(brickId);
        return previousBrick && previousBrick.id;
    }
    /**
     * @param {?} predicate
     * @return {?}
     */
    getBrickSequence(predicate) {
        /** @type {?} */
        const brickSequence = [];
        this.traverse((/**
         * @param {?} row
         * @return {?}
         */
        (row) => {
            row.columns.forEach((/**
             * @param {?} column
             * @return {?}
             */
            (column) => {
                column.bricks.forEach((/**
                 * @param {?} brick
                 * @return {?}
                 */
                (brick) => {
                    if (predicate(brick)) {
                        brickSequence.push(brick);
                    }
                }));
            }));
        }));
        return brickSequence;
    }
    /**
     * @param {?} brickId
     * @return {?}
     */
    getNextTextBrickId(brickId) {
        /** @type {?} */
        const nextTextBrick = this.getNextTextBrick(brickId);
        return nextTextBrick && nextTextBrick.id;
    }
    /**
     * @param {?} brickId
     * @return {?}
     */
    getPreviousTextBrickId(brickId) {
        /** @type {?} */
        const previousTextBrick = this.getPreviousTextBrick(brickId);
        return previousTextBrick && previousTextBrick.id;
    }
    // end public API
    /**
     * @param {?} brickId
     * @return {?}
     */
    getNextTextBrick(brickId) {
        /** @type {?} */
        const nextTextBricks = this.findBricksAfter(brickId, (/**
         * @param {?} currentBrick
         * @return {?}
         */
        (currentBrick) => {
            return this.brickRegistry.get(currentBrick.tag).supportText;
        }));
        return nextTextBricks[0];
    }
    /**
     * @param {?} brickId
     * @return {?}
     */
    getPreviousTextBrick(brickId) {
        /** @type {?} */
        const previousTextBricks = this.findBrickBefore(brickId, (/**
         * @param {?} currentBrick
         * @return {?}
         */
        (currentBrick) => {
            return this.brickRegistry.get(currentBrick.tag).supportText;
        }));
        return previousTextBricks[previousTextBricks.length - 1];
    }
    /**
     * @param {?} brickId
     * @param {?} predicate
     * @return {?}
     */
    findBricksAfter(brickId, predicate) {
        /** @type {?} */
        const bricks = [];
        /** @type {?} */
        const bricksSequence = this.getBrickSequence((/**
         * @return {?}
         */
        () => true));
        /** @type {?} */
        const brickIdsSequence = bricksSequence.map((/**
         * @param {?} brick
         * @return {?}
         */
        (brick) => brick.id));
        /** @type {?} */
        const currentBrickIdIndex = brickIdsSequence.indexOf(brickId);
        if (currentBrickIdIndex !== -1) {
            /** @type {?} */
            const brickIdsAfter = brickIdsSequence.splice(currentBrickIdIndex + 1);
            brickIdsAfter.forEach((/**
             * @param {?} brickIdAfter
             * @return {?}
             */
            (brickIdAfter) => {
                /** @type {?} */
                const currentBrick = bricksSequence.find((/**
                 * @param {?} brick
                 * @return {?}
                 */
                (brick) => {
                    return brick.id === brickIdAfter;
                }));
                if (predicate(currentBrick)) {
                    bricks.push(currentBrick);
                }
            }));
        }
        return bricks;
    }
    /**
     * @param {?} brickId
     * @param {?} predicate
     * @return {?}
     */
    findBrickBefore(brickId, predicate) {
        /** @type {?} */
        const bricks = [];
        /** @type {?} */
        const bricksSequence = this.getBrickSequence((/**
         * @return {?}
         */
        () => true));
        /** @type {?} */
        const brickIdsSequence = bricksSequence.map((/**
         * @param {?} brick
         * @return {?}
         */
        (brick) => brick.id));
        /** @type {?} */
        const currentBrickIdIndex = brickIdsSequence.indexOf(brickId);
        if (currentBrickIdIndex !== -1) {
            /** @type {?} */
            const brickIdsBefore = brickIdsSequence.splice(0, currentBrickIdIndex);
            brickIdsBefore.forEach((/**
             * @param {?} brickIdBefore
             * @return {?}
             */
            (brickIdBefore) => {
                /** @type {?} */
                const currentBrick = bricksSequence.find((/**
                 * @param {?} brick
                 * @return {?}
                 */
                (brick) => brick.id === brickIdBefore));
                if (predicate(currentBrick)) {
                    bricks.push(currentBrick);
                }
            }));
        }
        return bricks;
    }
    /**
     * @param {?} rows
     * @return {?}
     */
    setLayout(rows) {
        this.rows = rows;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    traverse(fn) {
        this.rows.forEach((/**
         * @param {?} row
         * @return {?}
         */
        (row) => {
            fn(row);
        }));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
* Modify layout wall rows
* */
class WallLayout {
    /**
     * @param {?} brickRegistry
     * @param {?} layoutWalker
     */
    constructor(brickRegistry, layoutWalker) {
        this.brickRegistry = brickRegistry;
        this.layoutWalker = layoutWalker;
        this.rows = [];
    }
    // create new row and one column inside
    /**
     * @param {?} rowIndex
     * @param {?} brick
     * @param {?=} rowId
     * @return {?}
     */
    addBrickToNewRow(rowIndex, brick, rowId) {
        /** @type {?} */
        const totalRowCount = this.rows.length;
        /** @type {?} */
        const lastRowIndex = totalRowCount - 1;
        // user cannot create row in position more than last row index + 1
        // todo: remove helper checks, lets face the problem earlier
        if (rowIndex > (lastRowIndex + 1)) {
            rowIndex = lastRowIndex + 1;
        }
        this.createNewRow(rowIndex, rowId || this.generateId());
        this.addBrick(rowIndex, 0, 0, brick);
    }
    // add only in already existing row and column
    /**
     * @param {?} rowIndex
     * @param {?} columnIndex
     * @param {?} brickIndex
     * @param {?} brick
     * @return {?}
     */
    addBrickToExistingColumn(rowIndex, columnIndex, brickIndex, brick) {
        /** @type {?} */
        const column = this.getColumn(rowIndex, columnIndex);
        if (column) {
            /** @type {?} */
            const bricksCount = column.bricks.length;
            // user cannot put brick in position more than total brick count + 1
            // todo: remove helper checks, lets face the problem earlier
            if (brickIndex > (bricksCount + 1)) {
                brickIndex = bricksCount + 1;
            }
            this.addBrick(rowIndex, columnIndex, brickIndex, brick);
        }
    }
    // create new column in existing row
    /**
     * @param {?} rowIndex
     * @param {?} columnIndex
     * @param {?} brick
     * @return {?}
     */
    addBrickToNewColumn(rowIndex, columnIndex, brick) {
        /** @type {?} */
        const row = this.rows[rowIndex];
        if (row) {
            /** @type {?} */
            const columnCount = row.columns.length;
            // user cannot create column in position more than total column cound + 1
            // todo: remove helper checks, lets face the problem earlier
            if (columnIndex > (columnCount + 1)) {
                columnIndex = columnCount + 1;
            }
            this.createNewColumn(rowIndex, columnIndex);
            this.addBrick(rowIndex, columnIndex, 0, brick);
        }
    }
    /**
     * @param {?} afterBrickId
     * @param {?} movedBrickIds
     * @return {?}
     */
    moveBrickAfterInNewRow(afterBrickId, movedBrickIds) {
        movedBrickIds.reverse();
        movedBrickIds.forEach((/**
         * @param {?} movedBrickId
         * @return {?}
         */
        (movedBrickId) => {
            /** @type {?} */
            const currentMovedBrick = this.layoutWalker.getBrickById(movedBrickId);
            this.removeBrick(movedBrickId);
            /** @type {?} */
            const afterBrickPosition = this.layoutWalker.getBrickPosition(afterBrickId);
            /** @type {?} */
            const newRowIndex = afterBrickPosition.rowIndex + 1;
            this.addBrickToNewRow(newRowIndex, currentMovedBrick);
        }));
    }
    /**
     * @param {?} afterBrickId
     * @param {?} movedBrickIds
     * @return {?}
     */
    moveBrickAfterInSameColumn(afterBrickId, movedBrickIds) {
        movedBrickIds.forEach((/**
         * @param {?} movedBrickId
         * @param {?} index
         * @return {?}
         */
        (movedBrickId, index) => {
            /** @type {?} */
            const currentMovedBrick = this.layoutWalker.getBrickById(movedBrickId);
            this.removeBrick(movedBrickId);
            /** @type {?} */
            const afterBrickPosition = this.layoutWalker.getBrickPosition(afterBrickId);
            this.addBrickToExistingColumn(afterBrickPosition.rowIndex, afterBrickPosition.columnIndex, afterBrickPosition.brickIndex + index + 1, currentMovedBrick);
        }));
    }
    /**
     * @param {?} beforeBrickId
     * @param {?} movedBrickIds
     * @return {?}
     */
    moveBrickBeforeInNewRow(beforeBrickId, movedBrickIds) {
        movedBrickIds.reverse();
        movedBrickIds.forEach((/**
         * @param {?} movedBrickId
         * @param {?} index
         * @return {?}
         */
        (movedBrickId, index) => {
            /** @type {?} */
            const currentMovedBrick = this.layoutWalker.getBrickById(movedBrickId);
            this.removeBrick(movedBrickId);
            /** @type {?} */
            let beforeBrickPosition;
            if (index === 0) {
                beforeBrickPosition = this.layoutWalker.getBrickPosition(beforeBrickId);
            }
            else {
                beforeBrickPosition = this.layoutWalker.getBrickPosition(movedBrickIds[index - 1]);
            }
            this.addBrickToNewRow(beforeBrickPosition.rowIndex, currentMovedBrick);
        }));
    }
    /**
     * @param {?} beforeBrickId
     * @param {?} movedBrickIds
     * @return {?}
     */
    moveBrickBeforeInSameColumn(beforeBrickId, movedBrickIds) {
        movedBrickIds.forEach((/**
         * @param {?} movedBrickId
         * @return {?}
         */
        (movedBrickId) => {
            /** @type {?} */
            const currentMovedBrick = this.layoutWalker.getBrickById(movedBrickId);
            this.removeBrick(movedBrickId);
            /** @type {?} */
            const beforeBrickPosition = this.layoutWalker.getBrickPosition(beforeBrickId);
            this.addBrickToExistingColumn(beforeBrickPosition.rowIndex, beforeBrickPosition.columnIndex, beforeBrickPosition.brickIndex, currentMovedBrick);
        }));
    }
    /**
     * @param {?} movedBrickIds
     * @param {?} beforeBrickId
     * @param {?} side
     * @return {?}
     */
    moveBrickToNewColumn(movedBrickIds, beforeBrickId, side) {
        /** @type {?} */
        const movedBricks = movedBrickIds.map((/**
         * @param {?} movedBrickId
         * @return {?}
         */
        (movedBrickId) => {
            /** @type {?} */
            const currentMovedBrick = this.layoutWalker.getBrickById(movedBrickId);
            this.removeBrick(movedBrickId);
            return currentMovedBrick;
        }));
        /** @type {?} */
        const beforeBrickPosition = this.layoutWalker.getBrickPosition(beforeBrickId);
        /** @type {?} */
        let columnIndex;
        // todo: move side to constant
        // todo: search across project for all hard coded variables
        if (side === 'left') {
            columnIndex = beforeBrickPosition.columnIndex;
        }
        else if (side === 'right') {
            columnIndex = beforeBrickPosition.columnIndex + 1;
        }
        movedBricks.forEach((/**
         * @param {?} movedBrick
         * @param {?} index
         * @return {?}
         */
        (movedBrick, index) => {
            if (index === 0) {
                this.addBrickToNewColumn(beforeBrickPosition.rowIndex, columnIndex, movedBrick);
            }
            else {
                this.addBrickToExistingColumn(beforeBrickPosition.rowIndex, columnIndex, index, movedBrick);
            }
        }));
    }
    /**
     * @param {?} brickId
     * @return {?}
     */
    removeBrick(brickId) {
        /** @type {?} */
        const brickPosition = this.layoutWalker.getBrickPosition(brickId);
        /** @type {?} */
        const row = this.rows[brickPosition.rowIndex];
        /** @type {?} */
        const column = row.columns[brickPosition.columnIndex];
        // remove brick
        column.bricks.splice(brickPosition.brickIndex, 1);
        // remove column if there are no bricks inside
        if (column.bricks.length === 0) {
            row.columns.splice(brickPosition.columnIndex, 1);
            // remove row if there are no columns inside
            if (row.columns.length === 0) {
                this.rows.splice(brickPosition.rowIndex, 1);
                // if there are no rows, create default
                if (this.rows.length === 0) {
                    this.rows.push(this.initializeNewRow(this.generateId()));
                }
            }
        }
    }
    // COMMANDS
    /**
     * @private
     * @param {?} rowIndex
     * @param {?} columnIndex
     * @param {?} brickIndex
     * @param {?} brick
     * @return {?}
     */
    addBrick(rowIndex, columnIndex, brickIndex, brick) {
        this.rows[rowIndex].columns[columnIndex].bricks.splice(brickIndex, 0, brick);
    }
    /**
     * @private
     * @param {?} rowIndex
     * @param {?} columnIndex
     * @return {?}
     */
    getColumn(rowIndex, columnIndex) {
        /** @type {?} */
        const row = this.rows[rowIndex];
        if (row) {
            return row.columns[columnIndex];
        }
        else {
            return null;
        }
    }
    /**
     * @private
     * @param {?} rowIndex
     * @param {?} rowId
     * @return {?}
     */
    createNewRow(rowIndex, rowId) {
        this.rows.splice(rowIndex, 0, this.initializeNewRow(rowId));
    }
    /**
     * @private
     * @param {?} rowIndex
     * @param {?} columnIndex
     * @return {?}
     */
    createNewColumn(rowIndex, columnIndex) {
        this.rows[rowIndex].columns.splice(columnIndex, 0, this.initializeNewColumn());
    }
    /**
     * @private
     * @param {?} rowId
     * @return {?}
     */
    initializeNewRow(rowId) {
        return {
            id: rowId,
            columns: [
                this.initializeNewColumn()
            ]
        };
    }
    /**
     * @private
     * @return {?}
     */
    initializeNewColumn() {
        return {
            bricks: []
        };
    }
    /**
     * @private
     * @return {?}
     */
    generateId() {
        return (new Guid()).get();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
* Contains Wall data structure and registers API for data manipulation.
* Responsible to IWallDefinition->Layout and Layout->IWallDefinition transformation
* */
class WallCorePlugin {
    /**
     * @param {?} brickRegistry
     */
    constructor(brickRegistry) {
        this.brickRegistry = brickRegistry;
        this.name = 'core';
        this.version = '0.0.0';
        this.layoutWalker = new LayoutWalker(this.brickRegistry);
        this.DEFAULT_BRICK = 'text';
        this.events = new Subject();
    }
    // START API
    /**
     * @param {?} wallModel
     * @return {?}
     */
    onWallInitialize(wallModel) {
        this.wallModel = wallModel;
        [
            'getRowCount',
            'getBrickTag',
            'getPreviousBrickId',
            'getNextBrickId',
            'getColumnCount',
            'getBrickIds',
            'getBricksCount',
            'getNextTextBrickId',
            'getPreviousTextBrickId',
            'filterBricks',
            'isBrickAheadOf'
        ].forEach((/**
         * @param {?} methodName
         * @return {?}
         */
        (methodName) => {
            this[methodName] = this.layoutWalker[methodName].bind(this.layoutWalker);
        }));
        this.wallModel.registerApi(this.name, this);
    }
    // old
    // COMMAND METHODS
    /**
     * @param {?} plan
     * @return {?}
     */
    setPlan(plan) {
        this.dispatch(new BeforeChangeEvent(SetPlanEvent));
        this.layout = new WallLayout(this.brickRegistry, this.layoutWalker);
        this.layoutWalker.setLayout(this.layout.rows);
        // build tree
        plan.layout.bricks.forEach((/**
         * @param {?} row
         * @param {?} rowIndex
         * @return {?}
         */
        (row, rowIndex) => {
            row.columns.forEach((/**
             * @param {?} column
             * @param {?} columnIndex
             * @return {?}
             */
            (column, columnIndex) => {
                column.bricks.forEach((/**
                 * @param {?} brick
                 * @param {?} brickIndex
                 * @return {?}
                 */
                (brick, brickIndex) => {
                    /** @type {?} */
                    const planBrick = plan.bricks.find((/**
                     * @param {?} currentPlanBrick
                     * @return {?}
                     */
                    (currentPlanBrick) => {
                        return brick.id === currentPlanBrick.id;
                    }));
                    /** @type {?} */
                    const wallBrick = this.restoreBrick(planBrick);
                    // first column in new row
                    if (columnIndex === 0) {
                        if (brickIndex === 0) {
                            this.layout.addBrickToNewRow(rowIndex, wallBrick, row.id);
                        }
                        else {
                            this.layout.addBrickToExistingColumn(rowIndex, columnIndex, brickIndex, wallBrick);
                        }
                    }
                    else {
                        if (brickIndex === 0) {
                            this.layout.addBrickToNewColumn(rowIndex, columnIndex, wallBrick);
                        }
                        else {
                            this.layout.addBrickToExistingColumn(rowIndex, columnIndex, brickIndex, wallBrick);
                        }
                    }
                }));
            }));
        }));
        this.dispatch(new SetPlanEvent());
    }
    /**
     * @param {?} brickId
     * @param {?} tag
     * @param {?=} state
     * @return {?}
     */
    addBrickAfterBrickId(brickId, tag, state) {
        this.dispatch(new BeforeChangeEvent(AddBrickEvent));
        /** @type {?} */
        const brickPosition = this.layoutWalker.getBrickPosition(brickId);
        /** @type {?} */
        const columnCount = this.layoutWalker.getColumnCount(brickPosition.rowIndex);
        /** @type {?} */
        const newBrick = this.createBrick(tag, state);
        if (columnCount === 1) {
            this.layout.addBrickToNewRow(brickPosition.rowIndex + 1, newBrick);
        }
        else if (columnCount > 1) {
            this.layout.addBrickToExistingColumn(brickPosition.rowIndex, brickPosition.columnIndex, brickPosition.brickIndex + 1, newBrick);
        }
        this.dispatch(new AddBrickEvent(newBrick.id));
        return this.getBrickSnapshot(newBrick.id);
    }
    /**
     * @param {?} brickId
     * @param {?} tag
     * @param {?=} state
     * @return {?}
     */
    addBrickBeforeBrickId(brickId, tag, state) {
        this.dispatch(new BeforeChangeEvent(AddBrickEvent));
        /** @type {?} */
        const brickPosition = this.layoutWalker.getBrickPosition(brickId);
        /** @type {?} */
        const columnCount = this.layoutWalker.getColumnCount(brickPosition.rowIndex);
        /** @type {?} */
        const newBrick = this.createBrick(tag, state);
        if (columnCount === 1) {
            this.layout.addBrickToNewRow(brickPosition.rowIndex, newBrick);
        }
        else if (columnCount > 1) {
            this.layout.addBrickToExistingColumn(brickPosition.rowIndex, brickPosition.columnIndex, brickPosition.brickIndex, newBrick);
        }
        this.dispatch(new AddBrickEvent(newBrick.id));
        return this.getBrickSnapshot(newBrick.id);
    }
    // Add text brick to the bottom of wall in the new row
    /**
     * @return {?}
     */
    addDefaultBrick() {
        this.dispatch(new BeforeChangeEvent(AddBrickEvent));
        /** @type {?} */
        const brickCount = this.layoutWalker.getBricksCount();
        /** @type {?} */
        const newBrick = this.createBrick(this.DEFAULT_BRICK);
        /** @type {?} */
        const rowIndex = brickCount ? this.layoutWalker.getRowCount() + 1 : 0;
        this.layout.addBrickToNewRow(rowIndex, newBrick);
        this.dispatch(new AddBrickEvent(newBrick.id));
    }
    /**
     * @param {?} tag
     * @param {?=} state
     * @return {?}
     */
    addBrickAtStart(tag, state) {
        this.dispatch(new BeforeChangeEvent(AddBrickEvent));
        /** @type {?} */
        const newBrick = this.createBrick(tag, state);
        this.layout.addBrickToNewRow(0, newBrick);
        this.dispatch(new AddBrickEvent(newBrick.id));
        return this.getBrickSnapshot(newBrick.id);
    }
    /**
     * @param {?} brickId
     * @param {?} brickState
     * @return {?}
     */
    updateBrickState(brickId, brickState) {
        this.dispatch(new BeforeChangeEvent(UpdateBrickStateEvent));
        /** @type {?} */
        const brick = this.layoutWalker.getBrickById(brickId);
        /** @type {?} */
        const oldState = JSON.parse(JSON.stringify(brick.getState()));
        brick.updateState(JSON.parse(JSON.stringify(brickState)));
        this.dispatch(new UpdateBrickStateEvent(brickId, JSON.parse(JSON.stringify(brick.getState())), oldState));
    }
    // todo: should be async operation
    /**
     * @param {?} brickId
     * @return {?}
     */
    removeBrick(brickId) {
        this.dispatch(new BeforeChangeEvent(RemoveBrickEvent));
        /** @type {?} */
        const nextTextBrick = this.layoutWalker.getNextTextBrick(brickId);
        /** @type {?} */
        const previousTextBrick = this.layoutWalker.getPreviousTextBrick(brickId);
        this.clearBrickResources(brickId).then((/**
         * @return {?}
         */
        () => {
        }));
        /** @type {?} */
        const removedBrick = this.layoutWalker.getBrickById(brickId);
        this.layout.removeBrick(brickId);
        this.dispatch(new RemoveBrickEvent(removedBrick.getSnapshot(), previousTextBrick && previousTextBrick.id, nextTextBrick && nextTextBrick.id));
    }
    // todo: should be async operation
    /**
     * @param {?} brickIds
     * @return {?}
     */
    removeBricks(brickIds) {
        this.dispatch(new BeforeChangeEvent(RemoveBricksEvent));
        /** @type {?} */
        const nextTextBrick = this.layoutWalker.getNextBrick(brickIds[brickIds.length - 1]);
        /** @type {?} */
        const previousBrick = this.layoutWalker.getPreviousBrick(brickIds[0]);
        /** @type {?} */
        const clearPromises = brickIds.map((/**
         * @param {?} brickId
         * @return {?}
         */
        (brickId) => this.clearBrickResources(brickId)));
        Promise.all(clearPromises).then((/**
         * @return {?}
         */
        () => {
        }));
        /** @type {?} */
        const removedBricks = brickIds.map((/**
         * @param {?} brickId
         * @return {?}
         */
        (brickId) => {
            /** @type {?} */
            const removedBrick = this.layoutWalker.getBrickById(brickId);
            this.layout.removeBrick(brickId);
            return {
                id: removedBrick.id,
                tag: removedBrick.tag,
                state: removedBrick.state
            };
        }));
        this.dispatch(new RemoveBricksEvent(removedBricks, previousBrick && previousBrick.id, nextTextBrick && nextTextBrick.id));
    }
    /**
     * Remove all bricks from layout
     * Clear all bricks external dependencies
     * @return {?}
     */
    clear() {
        /** @type {?} */
        const brickIds = this.layoutWalker.getBrickIds();
        // todo: replace it after removeBricks will be async
        /** @type {?} */
        const clearPromises = brickIds.map((/**
         * @param {?} brickId
         * @return {?}
         */
        (brickId) => this.clearBrickResources(brickId)));
        return Promise.all(clearPromises).then((/**
         * @return {?}
         */
        () => {
            brickIds.forEach((/**
             * @param {?} brickId
             * @return {?}
             */
            (brickId) => {
                this.layout.removeBrick(brickId);
            }));
        }));
    }
    /**
     * @param {?} brickId
     * @param {?} newTag
     * @param {?=} state
     * @return {?}
     */
    turnBrickInto(brickId, newTag, state = {}) {
        this.dispatch(new BeforeChangeEvent(TurnBrickIntoEvent));
        /** @type {?} */
        const brick = this.layoutWalker.getBrickById(brickId);
        /** @type {?} */
        const oldTag = brick.tag;
        brick
            .turnInto(newTag)
            .updateState(state);
        this.dispatch(new TurnBrickIntoEvent(brickId, newTag, oldTag));
    }
    /**
     * @param {?} movedBrickIds
     * @param {?} afterBrickId
     * @return {?}
     */
    moveBrickAfterBrickId(movedBrickIds, afterBrickId) {
        if (movedBrickIds.indexOf(afterBrickId) === -1) {
            this.dispatch(new BeforeChangeEvent(MoveBrickEvent));
            /** @type {?} */
            const afterBrickPosition = this.layoutWalker.getBrickPosition(afterBrickId);
            /** @type {?} */
            const columnCount = this.layoutWalker.getColumnCount(afterBrickPosition.rowIndex);
            if (columnCount === 1) {
                this.layout.moveBrickAfterInNewRow(afterBrickId, movedBrickIds);
            }
            else {
                this.layout.moveBrickAfterInSameColumn(afterBrickId, movedBrickIds);
            }
            this.dispatch(new MoveBrickEvent(movedBrickIds, afterBrickId));
        }
    }
    /**
     * @param {?} movedBrickIds
     * @param {?} beforeBrickId
     * @return {?}
     */
    moveBrickBeforeBrickId(movedBrickIds, beforeBrickId) {
        if (movedBrickIds.indexOf(beforeBrickId) === -1) {
            this.dispatch(new BeforeChangeEvent(MoveBrickEvent));
            /** @type {?} */
            const beforeBrickPosition = this.layoutWalker.getBrickPosition(beforeBrickId);
            /** @type {?} */
            const columnCount = this.layoutWalker.getColumnCount(beforeBrickPosition.rowIndex);
            if (columnCount === 1) {
                this.layout.moveBrickBeforeInNewRow(beforeBrickId, movedBrickIds);
            }
            else {
                this.layout.moveBrickBeforeInSameColumn(beforeBrickId, movedBrickIds);
            }
            this.dispatch(new MoveBrickEvent(movedBrickIds, beforeBrickId));
        }
    }
    /**
     * @param {?} targetBrickIds
     * @param {?} beforeBrickId
     * @param {?} side
     * @return {?}
     */
    moveBrickToNewColumn(targetBrickIds, beforeBrickId, side) {
        if (targetBrickIds.indexOf(beforeBrickId) === -1) {
            this.dispatch(new BeforeChangeEvent(MoveBrickEvent));
            this.layout.moveBrickToNewColumn(targetBrickIds, beforeBrickId, side);
            this.dispatch(new MoveBrickEvent(targetBrickIds, beforeBrickId));
        }
    }
    // QUERY METHODS
    /**
     * @return {?}
     */
    getPlan() {
        /** @type {?} */
        const plan = {
            bricks: [],
            layout: {
                bricks: []
            }
        };
        this.layoutWalker.traverse((/**
         * @param {?} row
         * @return {?}
         */
        (row) => {
            /** @type {?} */
            const columns = [];
            row.columns.forEach((/**
             * @param {?} column
             * @return {?}
             */
            (column) => {
                /** @type {?} */
                const planColumn = {
                    bricks: []
                };
                column.bricks.forEach((/**
                 * @param {?} brick
                 * @return {?}
                 */
                (brick) => {
                    plan.bricks.push({
                        id: brick.id,
                        tag: brick.tag,
                        meta: brick.meta,
                        data: brick.state
                    });
                    planColumn.bricks.push({
                        id: brick.id
                    });
                }));
                columns.push(planColumn);
            }));
            plan.layout.bricks.push({
                columns,
                id: row.id
            });
        }));
        return JSON.parse(JSON.stringify(plan));
    }
    /**
     * @param {?} brickIds
     * @return {?}
     */
    sortBrickIdsByLayoutOrder(brickIds) {
        /** @type {?} */
        const bricksSequence = this.layoutWalker.getBrickSequence((/**
         * @return {?}
         */
        () => true));
        return bricksSequence
            .filter((/**
         * @param {?} brick
         * @return {?}
         */
        (brick) => brickIds.indexOf(brick.id) !== -1))
            .map((/**
         * @param {?} brick
         * @return {?}
         */
        (brick) => brick.id));
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    traverse(fn) {
        return this.layoutWalker.traverse((/**
         * @param {?} row
         * @return {?}
         */
        (row) => {
            /** @type {?} */
            const preparedRow = {
                id: row.id,
                columns: row.columns.map((/**
                 * @param {?} column
                 * @return {?}
                 */
                (column) => {
                    return {
                        bricks: column.bricks.map((/**
                         * @param {?} brick
                         * @return {?}
                         */
                        (brick) => brick.getSnapshot()))
                    };
                }))
            };
            fn(preparedRow);
        }));
    }
    /**
     * @param {?} brickId
     * @return {?}
     */
    getBrickSnapshot(brickId) {
        /** @type {?} */
        const brick = this.layoutWalker.getBrickById(brickId);
        return brick ? brick.getSnapshot() : null;
    }
    /**
     * @param {?} brickId
     * @return {?}
     */
    getBrickResourcePaths(brickId) {
        /** @type {?} */
        const brick = this.layoutWalker.getBrickById(brickId);
        /** @type {?} */
        const brickSpecification = this.brickRegistry.get(brick.tag);
        if (!brickSpecification.getBrickResourcePaths) {
            return [];
        }
        return brickSpecification.getBrickResourcePaths(brick.getSnapshot());
    }
    /**
     * @param {?} brickId
     * @return {?}
     */
    getBrickTextRepresentation(brickId) {
        /** @type {?} */
        const brick = this.layoutWalker.getBrickById(brickId);
        /** @type {?} */
        const brickSpecification = this.brickRegistry.get(brick.tag);
        if (brickSpecification.textRepresentation) {
            /** @type {?} */
            const brickTextRepresentation = new brickSpecification.textRepresentation(brick.getSnapshot());
            return brickTextRepresentation.getText() || '';
        }
        else {
            return '';
        }
    }
    /**
     * @param {?} callback
     * @return {?}
     */
    subscribe(callback) {
        return this.events.subscribe(callback);
    }
    /**
     * @param {?} tag
     * @return {?}
     */
    isRegisteredBrick(tag) {
        return Boolean(this.brickRegistry.get(tag));
    }
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    dispatch(e) {
        this.events.next(e);
    }
    /**
     * @private
     * @param {?} tag
     * @param {?=} state
     * @return {?}
     */
    createBrick(tag, state) {
        /** @type {?} */
        const id = this.generateGuid();
        /** @type {?} */
        const meta = {};
        /** @type {?} */
        const brick = new WallBrick(id, tag, meta);
        if (state) {
            brick.updateState(state);
        }
        return brick;
    }
    /**
     * @private
     * @param {?} brickDefinition
     * @return {?}
     */
    restoreBrick(brickDefinition) {
        /** @type {?} */
        const brick = new WallBrick(brickDefinition.id, brickDefinition.tag, brickDefinition.meta);
        brick.updateState(brickDefinition.data);
        return brick;
    }
    /**
     * @private
     * @param {?} brickId
     * @return {?}
     */
    clearBrickResources(brickId) {
        /** @type {?} */
        const brick = this.layoutWalker.getBrickById(brickId);
        /** @type {?} */
        const brickSpecification = this.brickRegistry.get(brick.tag);
        if (brickSpecification.destructor) {
            return brickSpecification.destructor(brick.getSnapshot());
        }
        else {
            return Promise.resolve();
        }
    }
    /**
     * @private
     * @return {?}
     */
    generateGuid() {
        return (new Guid()).get();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WallPluginInitializedEvent {
    /**
     * @param {?} pluginName
     */
    constructor(pluginName) {
        this.pluginName = pluginName;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WallModel {
    /**
     * @param {?} brickRegistry
     * @param {?} config
     */
    constructor(brickRegistry, config) {
        this.brickRegistry = brickRegistry;
        // plugin api
        this.api = {
            core: null
        };
        this.events$ = new Subject();
        this.plugins = new Map();
        // initialize 3rd party plugins
        config.plugins.forEach((/**
         * @param {?} plugin
         * @return {?}
         */
        (plugin) => this.initializePlugin(plugin)));
    }
    // register external API
    /**
     * @param {?} apiName
     * @param {?} api
     * @return {?}
     */
    registerApi(apiName, api) {
        this.api[apiName] = api;
    }
    /**
     * @return {?}
     */
    destroy() {
        this.plugins.forEach((/**
         * @param {?} plugin
         * @return {?}
         */
        (plugin) => this.destroyPlugin(plugin)));
    }
    // proxy events from all plugins
    /**
     * @param {?} callback
     * @return {?}
     */
    subscribe(callback) {
        return this.events$.subscribe(callback);
    }
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    dispatch(e) {
        ((/** @type {?} */ (this.events$))).next(e);
    }
    /**
     * @private
     * @param {?} plugin
     * @return {?}
     */
    initializePlugin(plugin) {
        plugin.onWallInitialize(this);
        this.plugins.set(plugin.name, plugin);
        this.dispatch(new WallPluginInitializedEvent(plugin.name));
    }
    /**
     * @private
     * @param {?} plugin
     * @return {?}
     */
    destroyPlugin(plugin) {
        if (plugin.onWallPluginDestroy) {
            plugin.onWallPluginDestroy();
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BrickRegistry {
    constructor() {
        this.bricks = [];
    }
    // todo: add unregister functionality
    /**
     * @param {?} brickConfiguration
     * @return {?}
     */
    register(brickConfiguration) {
        this.bricks.push(brickConfiguration);
    }
    /**
     * @param {?} tag
     * @return {?}
     */
    get(tag) {
        return this.bricks.find((/**
         * @param {?} brickConfiguration
         * @return {?}
         */
        (brickConfiguration) => brickConfiguration.tag === tag));
    }
    /**
     * @return {?}
     */
    getAll() {
        return this.bricks;
    }
}
BrickRegistry.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WallModelFactory {
    /**
     * @param {?} brickRegistry
     */
    constructor(brickRegistry) {
        this.brickRegistry = brickRegistry;
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    create(config) {
        /** @type {?} */
        const defaultConfig = {
            plan: {
                bricks: [],
                layout: {
                    bricks: []
                }
            },
            plugins: []
        };
        config = Object.assign({}, defaultConfig, config);
        // inject core plugin as initial first plugin
        // in this way factory will decouple WallModel from WallCorePlugin
        config.plugins.unshift(new WallCorePlugin(this.brickRegistry));
        /** @type {?} */
        const wallModel = new WallModel(this.brickRegistry, config);
        wallModel.api.core.setPlan(config.plan);
        return wallModel;
    }
}
WallModelFactory.decorators = [
    { type: Injectable }
];
/** @nocollapse */
WallModelFactory.ctorParameters = () => [
    { type: BrickRegistry }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PlaceholderComponent {
    /**
     * @param {?} x
     * @param {?} y
     * @param {?} size
     * @param {?} isHorizontal
     * @return {?}
     */
    setCoordinate(x, y, size, isHorizontal) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.isHorizontal = isHorizontal;
    }
}
PlaceholderComponent.decorators = [
    { type: Component, args: [{
                template: "<div *ngIf=\"x\">\n    <div *ngIf=\"isHorizontal\"\n         [style.left.px]=\"x\"\n         [style.top.px]=\"y\"\n         [style.width.px]=\"size\"\n         [style.height.px]=\"3\"\n         class=\"tow-placeholder\">\n    </div>\n\n    <div *ngIf=\"!isHorizontal\"\n         [style.left.px]=\"x\"\n         [style.top.px]=\"y\"\n         [style.width.px]=\"3\"\n         [style.height.px]=\"size\"\n         class=\"tow-placeholder\">\n    </div>\n</div>",
                styles: [".tow-placeholder{opacity:.5;position:fixed;border-radius:2px}"]
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PlaceholderRenderer {
    /**
     * @param {?} componentFactoryResolver
     * @param {?} appRef
     * @param {?} injector
     */
    constructor(componentFactoryResolver, appRef, injector) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.injector = injector;
        this.placeholderComponentRef = null;
    }
    /**
     * @param {?} x
     * @param {?} y
     * @param {?} size
     * @param {?=} isHorizontal
     * @return {?}
     */
    render(x, y, size, isHorizontal = true) {
        if (!this.placeholderComponentRef) {
            this.renderPlaceholderComponent();
        }
        this.setCoordinate(x, y, size, isHorizontal);
    }
    /**
     * @return {?}
     */
    clear() {
        if (this.placeholderComponentRef) {
            this.removePlaceholderComponent();
        }
    }
    /**
     * @private
     * @return {?}
     */
    renderPlaceholderComponent() {
        this.placeholderComponentRef = this.componentFactoryResolver
            .resolveComponentFactory(PlaceholderComponent)
            .create(this.injector);
        // 2. Attach component to the appRef so that it's inside the ng component tree
        this.appRef.attachView(this.placeholderComponentRef.hostView);
        // 3. Get DOM element from component
        /** @type {?} */
        const domElem = (/** @type {?} */ (((/** @type {?} */ (this.placeholderComponentRef.hostView)))
            .rootNodes[0]));
        // 4. Append DOM element to the body
        document.body.appendChild(domElem);
    }
    /**
     * @private
     * @return {?}
     */
    removePlaceholderComponent() {
        this.appRef.detachView(this.placeholderComponentRef.hostView);
        this.placeholderComponentRef.destroy();
        this.placeholderComponentRef = null;
    }
    /**
     * @private
     * @param {?} x
     * @param {?} y
     * @param {?} size
     * @param {?} isHorizontal
     * @return {?}
     */
    setCoordinate(x, y, size, isHorizontal) {
        this.placeholderComponentRef.instance.setCoordinate(x, y, size, isHorizontal);
    }
}
PlaceholderRenderer.decorators = [
    { type: Injectable }
];
/** @nocollapse */
PlaceholderRenderer.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: ApplicationRef },
    { type: Injector }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PlaceholderRendererModule {
}
PlaceholderRendererModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    PlaceholderComponent
                ],
                providers: [
                    PlaceholderRenderer
                ],
                entryComponents: [
                    PlaceholderComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WallCanvasComponent {
    /**
     * @param {?} doc
     */
    constructor(doc) {
        this.rows = [];
        this.selectedBricks = null;
        this.focusedBrick = null;
        this.canvasClick = new EventEmitter();
        this.onBrickStateChanged = new EventEmitter();
        // public API for sub components
        this.focusedBrick$ = new Subject();
        this.selectedBricks$ = new Subject();
        this.doc = null;
        this.doc = doc;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onEditorClick(e) {
        if (e.target === this.expander.nativeElement) {
            this.canvasClick.emit();
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.focusedBrick && changes.focusedBrick.currentValue) {
            this.focusedBrick$.next(changes.focusedBrick.currentValue);
        }
        if (changes.selectedBricks) {
            this.selectedBricks$.next(changes.selectedBricks.currentValue || []);
        }
    }
    /**
     * @param {?} brickId
     * @param {?} brickState
     * @return {?}
     */
    brickStateChanged(brickId, brickState) {
        this.onBrickStateChanged.emit({
            brickId,
            brickState
        });
    }
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    trackRowsBy(index, item) {
        return item.id;
    }
}
WallCanvasComponent.decorators = [
    { type: Component, args: [{
                selector: 'wall-canvas',
                template: "<div #editor class=\"wall-canvas__editor\" (click)=\"onEditorClick($event)\">\n    <wall-canvas-row *ngFor=\"let row of rows; trackBy: trackRowsBy\" [row]=\"row\"></wall-canvas-row>\n\n    <div #expander class=\"wall-canvas__expander\"></div>\n</div>\n",
                styles: [":host{display:block}:host .wall-canvas__editor{min-height:200px;cursor:text}:host .wall-canvas__expander{min-height:250px}"]
            }] }
];
/** @nocollapse */
WallCanvasComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
WallCanvasComponent.propDecorators = {
    wallModel: [{ type: Input }],
    rows: [{ type: Input }],
    selectedBricks: [{ type: Input }],
    focusedBrick: [{ type: Input }],
    isMediaInteractionEnabled$: [{ type: Input }],
    canvasClick: [{ type: Output }],
    onBrickStateChanged: [{ type: Output }],
    expander: [{ type: ViewChild, args: ['expander',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LocationUpdatedEvent {
    /**
     * @param {?} spots
     */
    constructor(spots) {
        this.spots = spots;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SpotModel {
    /**
     * @param {?} instance
     */
    constructor(instance) {
        this.id = instance.id;
        this.instance = instance;
        this.updateInfo();
    }
    /**
     * @return {?}
     */
    updateInfo() {
        const { position, size, data } = this.instance.getInfo();
        this.data = data;
        this.size = size;
        this.position = position;
    }
    /**
     * @param {?} y
     * @return {?}
     */
    isCross13Line(y) {
        return (y > this.position.y) && (y < this.position.y + this.size.height);
    }
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    getMinimalDistanceToPoint(x, y) {
        /** @type {?} */
        let minimalDistance = null;
        // distances to horizontal lines
        /** @type {?} */
        const distanceToLine12 = Math.abs(this.position.y - y);
        /** @type {?} */
        const distanceToLine43 = Math.abs((this.position.y + this.size.height) - y);
        // distances to vertical lines
        /** @type {?} */
        const distanceToLine14 = Math.abs(this.position.x - x);
        /** @type {?} */
        const distanceToLine23 = Math.abs((this.position.x + this.size.width) - x);
        /** @type {?} */
        const minDistanceToHorizontalLine = Math.min.apply(null, [distanceToLine12, distanceToLine43]);
        /** @type {?} */
        const minDistanceToVerticalLine = Math.min.apply(null, [distanceToLine14, distanceToLine23]);
        if ((x > this.position.x) && (x < this.position.x + this.size.width)) {
            // point directly cross the beacon
            minimalDistance = minDistanceToHorizontalLine;
        }
        else if ((y > this.position.y) && (y < this.position.y + this.size.height)) {
            // point directly cross the beacon
            minimalDistance = minDistanceToVerticalLine;
        }
        else {
            // point doesn't cross beacon, calculate shortest distance to beacon
            minimalDistance = Math.sqrt(minDistanceToHorizontalLine *
                minDistanceToHorizontalLine +
                minDistanceToVerticalLine *
                    minDistanceToVerticalLine);
        }
        return minimalDistance;
    }
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    getDistanceToTopLeftPoint(x, y) {
        /** @type {?} */
        const a = Math.abs(this.position.x - x);
        /** @type {?} */
        const b = Math.abs(this.position.y - y);
        return Math.sqrt(a * a + b * b);
    }
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    getDistanceToBottomLeftPoint(x, y) {
        /** @type {?} */
        const a = Math.abs(this.position.x - x);
        /** @type {?} */
        const b = Math.abs(this.position.y + this.size.height - y);
        return Math.sqrt(a * a + b * b);
    }
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    getDistanceToLeftCenterPoint(x, y) {
        /** @type {?} */
        const a = Math.abs(this.position.x - x);
        /** @type {?} */
        const b = Math.abs(this.position.y + (this.size.height / 2) - y);
        return Math.sqrt(a * a + b * b);
    }
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    isPointInsideSpot(x, y) {
        if ((x > this.position.x) && (x < this.position.x + this.size.width) &&
            (y > this.position.y) && (y < this.position.y + this.size.height)) {
            return true;
        }
        else {
            return false;
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class RadarCoordinator {
    /**
     * @param {?} doc
     * @param {?} zone
     */
    constructor(doc, zone) {
        this.zone = zone;
        this.spots = new Map();
        this.events = new Subject();
        this.mouseMove$ = fromEvent(doc, 'mousemove');
        /** @type {?} */
        const throttleMouseTime = 30;
        // run outside Angular Zone in order to decrease performance hit
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.mouseMove$
                .pipe(throttleTime(throttleMouseTime))
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                this.updateSpotsInfo();
                this.updateLocationPosition(event.clientX, event.clientY);
            }));
        }));
    }
    /**
     * @param {?} spotId
     * @param {?} spotInstance
     * @return {?}
     */
    register(spotId, spotInstance) {
        this.spots.set(spotId, new SpotModel(spotInstance));
    }
    /**
     * @param {?} spotId
     * @return {?}
     */
    unRegister(spotId) {
        this.spots.delete(spotId);
    }
    /**
     * @return {?}
     */
    updateSpotsInfo() {
        this.spots.forEach((/**
         * @param {?} spot
         * @return {?}
         */
        (spot) => spot.updateInfo()));
    }
    /**
     * @param {?} predicate
     * @return {?}
     */
    filterSpots(predicate) {
        return Array.from(this.spots)
            .map((/**
         * @param {?} __0
         * @return {?}
         */
        ([id, spot]) => spot))
            .filter((/**
         * @param {?} spot
         * @return {?}
         */
        (spot) => predicate(spot)));
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    subscribe(fn) {
        return this.events.subscribe(fn);
    }
    /**
     * @private
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    updateLocationPosition(x, y) {
        /** @type {?} */
        const sortedSpots = [];
        this.spots.forEach((/**
         * @param {?} spot
         * @return {?}
         */
        (spot) => {
            /** @type {?} */
            const minimalDistance = spot.getMinimalDistanceToPoint(x, y);
            /** @type {?} */
            const topLeftPointDistance = spot.getDistanceToTopLeftPoint(x, y);
            /** @type {?} */
            const bottomLeftPointDistance = spot.getDistanceToBottomLeftPoint(x, y);
            /** @type {?} */
            const centerLeftPointDistance = spot.getDistanceToLeftCenterPoint(x, y);
            /** @type {?} */
            const isCross13Line = spot.isCross13Line(y);
            sortedSpots.push({
                minimalDistance,
                topLeftPointDistance,
                bottomLeftPointDistance,
                centerLeftPointDistance,
                isCross13Line,
                data: spot.data
            });
        }));
        this.events.next(new LocationUpdatedEvent(sortedSpots));
    }
}
RadarCoordinator.decorators = [
    { type: Injectable }
];
/** @nocollapse */
RadarCoordinator.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: NgZone }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Radar {
    /**
     * @param {?} radarCoordinator
     */
    constructor(radarCoordinator) {
        this.radarCoordinator = radarCoordinator;
        this.events = new Subject();
        this.radarCoordinator.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this.events.next(event);
        }));
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    filterSpots(fn) {
        return this.radarCoordinator.filterSpots(fn);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    subscribe(fn) {
        return this.events.subscribe(fn);
    }
}
Radar.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Radar.ctorParameters = () => [
    { type: RadarCoordinator }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WallCanvasBrickComponent {
    /**
     * @param {?} injector
     * @param {?} resolver
     * @param {?} radar
     * @param {?} cdRef
     * @param {?} wallCanvasComponent
     */
    constructor(injector, resolver, radar, cdRef, wallCanvasComponent) {
        this.injector = injector;
        this.resolver = resolver;
        this.radar = radar;
        this.cdRef = cdRef;
        this.wallCanvasComponent = wallCanvasComponent;
        this.selected = false;
        this.isMouseNear = false;
        this.isMediaInteractionEnabled = true;
        this.minimalDistanceToMouse = 100;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.spot = {
            brickId: this.brick.id,
            isPickOutItem: true,
            isBeacon: true
        };
        this.componentReference = this.renderBrick();
        this.radarSubscription = this.radar.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            if (e instanceof LocationUpdatedEvent) {
                /** @type {?} */
                const currentSpot = e.spots.find((/**
                 * @param {?} spot
                 * @return {?}
                 */
                (spot) => spot.data.brickId === this.brick.id));
                if (currentSpot.isCross13Line) {
                    this.isMouseNear = currentSpot.topLeftPointDistance < this.minimalDistanceToMouse;
                }
                else {
                    this.isMouseNear = false;
                }
                this.cdRef.detectChanges();
            }
        }));
        this.focusedBrickSubscription = this.wallCanvasComponent.focusedBrick$.subscribe((/**
         * @param {?} focusedBrick
         * @return {?}
         */
        (focusedBrick) => {
            if (focusedBrick.id === this.brick.id) {
                this.callInstanceApi('onWallFocus', focusedBrick.context);
            }
        }));
        this.selectedBricksSubscription = this.wallCanvasComponent.selectedBricks$.subscribe((/**
         * @param {?} selectedBricks
         * @return {?}
         */
        (selectedBricks) => {
            this.selected = !Boolean(selectedBricks.indexOf(this.brick.id) === -1);
        }));
        this.isMediaInteractionEnabledSubscription = this.wallCanvasComponent.isMediaInteractionEnabled$
            .subscribe((/**
         * @param {?} isMediaInteractionEnabled
         * @return {?}
         */
        (isMediaInteractionEnabled) => this.isMediaInteractionEnabled = isMediaInteractionEnabled));
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.brick && !changes.brick.firstChange && changes.brick.currentValue) {
            this.componentReference.instance.state = this.brick.state;
            this.callInstanceApi('onWallStateChange', this.componentReference.instance.state);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.radarSubscription.unsubscribe();
        this.focusedBrickSubscription.unsubscribe();
        this.selectedBricksSubscription.unsubscribe();
        this.isMediaInteractionEnabledSubscription.unsubscribe();
        if (this.stateChangesSubscription) {
            this.stateChangesSubscription.unsubscribe();
        }
    }
    /**
     * @private
     * @param {?} methodName
     * @param {?=} data
     * @return {?}
     */
    callInstanceApi(methodName, data) {
        if (this.componentReference.instance[methodName]) {
            this.componentReference.instance[methodName](data);
        }
    }
    /**
     * @private
     * @return {?}
     */
    renderBrick() {
        /** @type {?} */
        const factory = this.resolver.resolveComponentFactory(this.brick.component);
        /** @type {?} */
        const componentReference = this.container.createComponent(factory, null, this.injector);
        /** @type {?} */
        const componentInstance = (/** @type {?} */ (componentReference.instance));
        componentInstance.id = this.brick.id;
        componentInstance.state = this.brick.state;
        componentInstance.wallModel = this.wallCanvasComponent.wallModel;
        if (componentInstance.stateChanges) {
            this.stateChangesSubscription = componentInstance.stateChanges.subscribe((/**
             * @param {?} newState
             * @return {?}
             */
            (newState) => {
                this.wallCanvasComponent.brickStateChanged(this.brick.id, newState);
            }));
        }
        return componentReference;
    }
}
WallCanvasBrickComponent.decorators = [
    { type: Component, args: [{
                selector: 'wall-canvas-brick',
                template: "<div [spot]=\"spot\"\n     data-id=\"{{brick.id}}\"\n     class=\"wall-canvas-brick__wrapper wall-canvas-brick__draggable\"\n     [ngClass]=\"{'wall-canvas-brick__selected': selected,\n     \t\t'wall-canvas-brick__draggable': isMouseNear}\">\n\n    <div class=\"wall-canvas-brick__draggable-handler\" [tow-slave]=\"brick.id\">\n        <div class=\"wall-canvas-brick__draggable-box\">\n            <mat-icon>drag_handle</mat-icon>\n        </div>\n    </div>\n\n    <div [ngClass]=\"{'wall-canvas-brick__disabled-interaction': !isMediaInteractionEnabled}\">\n        <ng-container #brickContainer></ng-container>\n    </div>\n</div>\n",
                styles: [":host{display:block;margin:0 0 2px}:host .wall-canvas-brick__draggable .wall-canvas-brick__draggable-handler{display:block}:host .wall-canvas-brick__wrapper{position:relative}:host .wall-canvas-brick__wrapper:after{content:'';position:absolute;top:0;bottom:0;left:0;right:0;pointer-events:none;opacity:.2;transition:background-color .1s}:host .wall-canvas-brick__draggable-box{padding:1px;border-radius:3px;line-height:0}:host .wall-canvas-brick__draggable-handler{display:none;position:absolute;left:-35px;top:-4px;padding:5px;margin:0;cursor:pointer;border-radius:3px}:host .wall-canvas-brick__selected{position:relative}:host .wall-canvas-brick__disabled-interaction{pointer-events:none}"]
            }] }
];
/** @nocollapse */
WallCanvasBrickComponent.ctorParameters = () => [
    { type: Injector },
    { type: ComponentFactoryResolver },
    { type: Radar },
    { type: ChangeDetectorRef },
    { type: WallCanvasComponent }
];
WallCanvasBrickComponent.propDecorators = {
    brick: [{ type: Input }],
    container: [{ type: ViewChild, args: ['brickContainer', { read: ViewContainerRef },] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WallCanvasRowComponent {
    // todo add type
    /**
     * @param {?} index
     * @return {?}
     */
    trackColumnsBy(index) {
        return index;
    }
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    trackBricksBy(index, item) {
        return item.hash;
    }
}
WallCanvasRowComponent.decorators = [
    { type: Component, args: [{
                selector: 'wall-canvas-row',
                template: "<div class=\"wall-canvas-row__column\" *ngFor=\"let column of row.columns; trackBy: trackColumnsBy\">\n    <wall-canvas-brick [brick]=\"brick\" *ngFor=\"let brick of column.bricks; trackBy: trackBricksBy\"></wall-canvas-brick>\n</div>",
                styles: [":host{display:flex}:host .wall-canvas-row__column{flex:1;margin:0 10px;min-width:0}:host .wall-canvas-row__column:first-child{margin-left:0}:host .wall-canvas-row__column:last-child{margin-right:0}"]
            }] }
];
WallCanvasRowComponent.propDecorators = {
    row: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SelectedBrickEvent {
    /**
     * @param {?} selectedBrickIds
     */
    constructor(selectedBrickIds) {
        this.selectedBrickIds = selectedBrickIds;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WallViewModel {
    /**
     * @param {?} brickRegistry
     */
    constructor(brickRegistry) {
        this.brickRegistry = brickRegistry;
        this.wallModel = null;
        this.events = new Subject();
        // UI
        this.focusedBrick = null;
        this.selectedBricks = [];
        this.isMediaInteractionEnabled$ = new BehaviorSubject(true);
        this.canvasLayout = [];
    }
    /**
     * @return {?}
     */
    getCanvasLayout() {
        /** @type {?} */
        const rows = [];
        this.wallModel.api.core.traverse((/**
         * @param {?} row
         * @return {?}
         */
        (row) => {
            rows.push({
                id: row.id,
                columns: row.columns.map((/**
                 * @param {?} column
                 * @return {?}
                 */
                (column) => {
                    return {
                        bricks: column.bricks.map((/**
                         * @param {?} brickConfig
                         * @return {?}
                         */
                        (brickConfig) => {
                            /** @type {?} */
                            const component = this.brickRegistry.get(brickConfig.tag).component;
                            return {
                                id: brickConfig.id,
                                hash: brickConfig.tag + brickConfig.id,
                                state: brickConfig.state,
                                component
                            };
                        }))
                    };
                }))
            });
        }));
        return rows;
    }
    /**
     * @param {?} wallModel
     * @return {?}
     */
    initialize(wallModel) {
        this.wallModel = wallModel;
        // initialize view core API
        /** @type {?} */
        const coreApi = [
            // SELECTION
            'getSelectedBrickIds',
            'selectBrick',
            'selectBricks',
            'addBrickToSelection',
            'removeBrickFromSelection',
            'unSelectBricks',
            // FOCUS
            'focusOnBrickId',
            'getFocusedBrickId',
            'focusOnPreviousTextBrick',
            'focusOnNextTextBrick',
            // REMOVE BRICK
            'removeBrick',
            'removeBricks',
            // BEHAVIOUR
            'enableMediaInteraction',
            'disableMediaInteraction',
            // CLIENT
            'subscribe'
        ].reduce((/**
         * @param {?} result
         * @param {?} methodName
         * @return {?}
         */
        (result, methodName) => {
            if (this[methodName].bind) {
                result[methodName] = this[methodName].bind(this);
            }
            else {
                result[methodName] = this[methodName];
            }
            return result;
        }), {});
        // protect API from extending
        Object.seal(coreApi);
        // register methods on model itself
        this.wallModel.registerApi('ui', coreApi);
        this.wallModelSubscription = this.wallModel.api.core.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            if (event instanceof TurnBrickIntoEvent) {
                this.focusOnBrickId(event.brickId);
            }
            if (event instanceof MoveBrickEvent) {
                this.unSelectBricks();
            }
            if (event instanceof RemoveBricksEvent) {
                if (!this.wallModel.api.core.getBricksCount()) {
                    this.wallModel.api.core.addDefaultBrick();
                }
            }
            if (!(event instanceof BeforeChangeEvent)) {
                this.canvasLayout = this.getCanvasLayout();
            }
        }));
        this.canvasLayout = this.getCanvasLayout();
    }
    /**
     * \@public-api
     * @param {?} brickId
     * @return {?}
     */
    selectBrick(brickId) {
        this.selectedBricks = [brickId];
        this.focusedBrick = null;
        /** @type {?} */
        const selectedBricksClone = this.selectedBricks.slice(0);
        this.dispatch(new SelectedBrickEvent(selectedBricksClone));
    }
    /**
     * \@public-api
     * @param {?} brickIds
     * @return {?}
     */
    selectBricks(brickIds) {
        if (JSON.stringify(brickIds) !== JSON.stringify(this.selectedBricks)) {
            this.selectedBricks = this.wallModel.api.core.sortBrickIdsByLayoutOrder(brickIds);
            /** @type {?} */
            const selectedBricksClone = this.selectedBricks.slice(0);
            this.dispatch(new SelectedBrickEvent(selectedBricksClone));
        }
    }
    /**
     * @deprecated
     * \@public-api
     * @param {?} brickId
     * @return {?}
     */
    addBrickToSelection(brickId) {
        /** @type {?} */
        const selectedBrickIds = this.selectedBricks.slice(0);
        selectedBrickIds.push(brickId);
        this.selectedBricks = this.wallModel.api.core.sortBrickIdsByLayoutOrder(selectedBrickIds);
        /** @type {?} */
        const selectedBricksClone = this.selectedBricks.slice(0);
        this.dispatch(new SelectedBrickEvent(selectedBricksClone));
    }
    /**
     * @deprecated
     * \@public-api
     * @param {?} brickId
     * @return {?}
     */
    removeBrickFromSelection(brickId) {
        /** @type {?} */
        const brickIdIndex = this.selectedBricks.indexOf(brickId);
        this.selectedBricks.splice(brickIdIndex, 1);
        this.selectedBricks = this.selectedBricks.slice(0);
        /** @type {?} */
        const selectedBricksClone = this.selectedBricks.slice(0);
        this.dispatch(new SelectedBrickEvent(selectedBricksClone));
    }
    /**
     * \@public-api
     * @return {?}
     */
    unSelectBricks() {
        this.selectedBricks = [];
        this.dispatch(new SelectedBrickEvent([]));
    }
    /**
     * \@public-api
     * @return {?}
     */
    getSelectedBrickIds() {
        return this.selectedBricks.slice(0);
    }
    /**
     * \@public-api
     * @return {?}
     */
    getFocusedBrickId() {
        return this.focusedBrick && this.focusedBrick.id;
    }
    /**
     * \@public-api
     * @param {?} brickId
     * @param {?=} focusContext
     * @return {?}
     */
    focusOnBrickId(brickId, focusContext) {
        this.focusedBrick = {
            id: brickId,
            context: focusContext
        };
    }
    /**
     * \@public-api
     * @param {?} brickId
     * @param {?=} focusContext
     * @return {?}
     */
    focusOnPreviousTextBrick(brickId, focusContext) {
        /** @type {?} */
        const previousTextBrickId = this.wallModel.api.core.getPreviousTextBrickId(brickId);
        if (previousTextBrickId) {
            this.focusOnBrickId(previousTextBrickId, focusContext);
        }
    }
    /**
     * \@public-api
     * @param {?} brickId
     * @param {?=} focusContext
     * @return {?}
     */
    focusOnNextTextBrick(brickId, focusContext) {
        /** @type {?} */
        const nextTextBrickId = this.wallModel.api.core.getNextTextBrickId(brickId);
        if (nextTextBrickId) {
            this.focusOnBrickId(nextTextBrickId, focusContext);
        }
    }
    /**
     * \@public-api
     * @return {?}
     */
    enableMediaInteraction() {
        ((/** @type {?} */ (this.isMediaInteractionEnabled$))).next(true);
    }
    /**
     * \@public-api
     * @return {?}
     */
    disableMediaInteraction() {
        ((/** @type {?} */ (this.isMediaInteractionEnabled$))).next(false);
    }
    /**
     * \@public-api
     * @param {?} callback
     * @return {?}
     */
    subscribe(callback) {
        return this.events.subscribe(callback);
    }
    /**
     * \@public-api
     * @param {?} brickId
     * @return {?}
     */
    removeBrick(brickId) {
        this.removeBricks([brickId]);
    }
    /**
     * \@public-api
     * @param {?} brickIds
     * @return {?}
     */
    removeBricks(brickIds) {
        /** @type {?} */
        const currentBrickIds = this.wallModel.api.core.getBrickIds();
        if (currentBrickIds.length > 1) {
            this.wallModel.api.core.removeBricks(brickIds);
        }
        else if (currentBrickIds.length === 1) {
            /** @type {?} */
            const brickSnapshot = this.wallModel.api.core.getBrickSnapshot(currentBrickIds[0]);
            if (brickSnapshot.tag !== 'text' || brickSnapshot.state.text) {
                this.wallModel.api.core.removeBricks(brickIds);
            }
            else {
                this.focusOnBrickId(currentBrickIds[0]);
            }
        }
    }
    // canvas interaction
    /**
     * @return {?}
     */
    onCanvasClick() {
        // check whether the last element is empty text brick
        // which is inside one column row
        // check whether the last element is empty text brick
        // which is inside one column row
        /** @type {?} */
        const rowCount = this.wallModel.api.core.getRowCount();
        /** @type {?} */
        const brickIds = this.wallModel.api.core.getBrickIds();
        if (rowCount > 0
            && this.wallModel.api.core.getColumnCount(rowCount - 1) === 1
            && brickIds.length) {
            /** @type {?} */
            const lastBrickSnapshot = this.wallModel.api.core.getBrickSnapshot(brickIds[brickIds.length - 1]);
            if (lastBrickSnapshot.tag === 'text' && !lastBrickSnapshot.state.text) {
                this.focusOnBrickId(lastBrickSnapshot.id);
            }
            else {
                this.wallModel.api.core.addDefaultBrick();
            }
        }
        else {
            this.wallModel.api.core.addDefaultBrick();
        }
    }
    // canvas interaction
    /**
     * @param {?} brickId
     * @param {?} brickState
     * @return {?}
     */
    onBrickStateChanged(brickId, brickState) {
        this.wallModel.api.core.updateBrickState(brickId, brickState);
    }
    /**
     * @return {?}
     */
    reset() {
        this.wallModelSubscription.unsubscribe();
        this.wallModelSubscription = null;
        this.focusedBrick = null;
        this.unSelectBricks();
    }
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    dispatch(e) {
        this.events.next(e);
    }
}
WallViewModel.decorators = [
    { type: Injectable }
];
/** @nocollapse */
WallViewModel.ctorParameters = () => [
    { type: BrickRegistry }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WallComponent {
    /**
     * @param {?} wallViewModel
     */
    constructor(wallViewModel) {
        this.wallViewModel = wallViewModel;
        this.model = null;
        this.configuration = null;
    }
    // click on empty space
    /**
     * @return {?}
     */
    onCanvasClick() {
        this.wallViewModel.onCanvasClick();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onBrickStateChanged(event) {
        this.wallViewModel.onBrickStateChanged(event.brickId, event.brickState);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.model) {
            if (!changes.model.firstChange) {
                this.cleanUp();
            }
            this.initialize();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.cleanUp();
    }
    /**
     * @private
     * @return {?}
     */
    initialize() {
        // initialize view model by business model
        this.wallViewModel.initialize(this.model);
    }
    /**
     * @private
     * @return {?}
     */
    cleanUp() {
        this.wallViewModel.reset();
    }
}
WallComponent.decorators = [
    { type: Component, args: [{
                selector: 'wall',
                template: "<wall-canvas *ngIf=\"wallViewModel.canvasLayout\"\n             (canvasClick)=\"onCanvasClick()\"\n             (onBrickStateChanged)=\"onBrickStateChanged($event)\"\n\n             [wallModel]=\"wallViewModel.wallModel\"\n             [isMediaInteractionEnabled$]=\"wallViewModel.isMediaInteractionEnabled$\"\n             [focusedBrick]=\"wallViewModel.focusedBrick\"\n             [selectedBricks]=\"wallViewModel.selectedBricks\"\n             [rows]=\"wallViewModel.canvasLayout\">\n</wall-canvas>\n",
                providers: [
                    WallViewModel
                ],
                styles: [""]
            }] }
];
/** @nocollapse */
WallComponent.ctorParameters = () => [
    { type: WallViewModel }
];
WallComponent.propDecorators = {
    model: [{ type: Input }],
    configuration: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class StartWorkingEvent {
    /**
     * @param {?} slaveId
     */
    constructor(slaveId) {
        this.slaveId = slaveId;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class StopWorkingEvent {
    /**
     * @param {?} slaveId
     */
    constructor(slaveId) {
        this.slaveId = slaveId;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WorkInProgressEvent {
    /**
     * @param {?} mousePosition
     */
    constructor(mousePosition) {
        this.mousePosition = mousePosition;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TowCoordinator {
    constructor() {
        this.events = new Subject();
        // start track when slave start working
        this.isSlaveWorking = false;
        document.addEventListener('dragover', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            if (this.isSlaveWorking) {
                event.preventDefault();
                event.dataTransfer.dropEffect = 'move';
                this.slaveWorkProgress(event.clientX, event.clientY);
            }
        }));
    }
    /**
     * @param {?} id
     * @return {?}
     */
    slaveStartWorking(id) {
        this.isSlaveWorking = true;
        this.events.next(new StartWorkingEvent(id));
    }
    /**
     * @param {?} clientX
     * @param {?} clientY
     * @return {?}
     */
    slaveWorkProgress(clientX, clientY) {
        this.events.next(new WorkInProgressEvent({
            clientX,
            clientY
        }));
    }
    /**
     * @param {?} id
     * @return {?}
     */
    slaveStopWorking(id) {
        this.isSlaveWorking = false;
        this.events.next(new StopWorkingEvent(id));
    }
}
TowCoordinator.decorators = [
    { type: Injectable }
];
/** @nocollapse */
TowCoordinator.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// Notify Tow Coordinator about drag operation
class TowSlaveDirective {
    /**
     * @param {?} renderer2
     * @param {?} el
     * @param {?} towCoordinator
     */
    constructor(renderer2, el, towCoordinator) {
        this.renderer2 = renderer2;
        this.el = el;
        this.towCoordinator = towCoordinator;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dragStart(event) {
        event.dataTransfer.dropEffect = 'move';
        event.dataTransfer.setData('FAKE', JSON.stringify({}));
        this.towCoordinator.slaveStartWorking(this.id);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    drag(event) {
        event.dataTransfer.dropEffect = 'move';
    }
    /**
     * @param {?} e
     * @return {?}
     */
    dragEnd(e) {
        e.preventDefault();
        e.stopPropagation();
        this.towCoordinator.slaveStopWorking(this.id);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.renderer2.setAttribute(this.el.nativeElement, 'draggable', 'true');
    }
}
TowSlaveDirective.decorators = [
    { type: Directive, args: [{ selector: '[tow-slave]' },] }
];
/** @nocollapse */
TowSlaveDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: TowCoordinator }
];
TowSlaveDirective.propDecorators = {
    id: [{ type: Input, args: ['tow-slave',] }],
    dragStart: [{ type: HostListener, args: ['dragstart', ['$event'],] }],
    drag: [{ type: HostListener, args: ['drag', ['$event'],] }],
    dragEnd: [{ type: HostListener, args: ['dragend', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TowService {
    /**
     * @param {?} towCoordinator
     */
    constructor(towCoordinator) {
        this.towCoordinator = towCoordinator;
        this.events = new Subject();
        this.towCoordinator.events.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            this.events.next(e);
        }));
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    subscribe(fn) {
        return this.events.subscribe(fn);
    }
}
TowService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
TowService.ctorParameters = () => [
    { type: TowCoordinator }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SpotDirective {
    /**
     * @param {?} radarCoordinator
     * @param {?} el
     */
    constructor(radarCoordinator, el) {
        this.radarCoordinator = radarCoordinator;
        this.el = el;
        this.id = String(Math.random());
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.radarCoordinator.register(this.id, this);
    }
    /**
     * @return {?}
     */
    getInfo() {
        return {
            id: this.id,
            data: this.getData(),
            size: this.getSize(),
            position: this.getPosition()
        };
    }
    /**
     * @return {?}
     */
    getData() {
        return this.spot;
    }
    /**
     * @return {?}
     */
    getSize() {
        return {
            width: this.el.nativeElement.offsetWidth,
            height: this.el.nativeElement.offsetHeight
        };
    }
    /**
     * @return {?}
     */
    getPosition() {
        /** @type {?} */
        const offsets = this.el.nativeElement.getBoundingClientRect();
        return {
            x: offsets.left,
            y: offsets.top
        };
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.radarCoordinator.unRegister(this.id);
    }
}
SpotDirective.decorators = [
    { type: Directive, args: [{
                selector: '[spot]'
            },] }
];
/** @nocollapse */
SpotDirective.ctorParameters = () => [
    { type: RadarCoordinator },
    { type: ElementRef }
];
SpotDirective.propDecorators = {
    spot: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class RadarModule {
}
RadarModule.decorators = [
    { type: NgModule, args: [{
                exports: [SpotDirective],
                declarations: [SpotDirective],
                providers: [
                    Radar,
                    RadarCoordinator
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TowModule {
}
TowModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    RadarModule
                ],
                declarations: [
                    TowSlaveDirective
                ],
                exports: [
                    TowSlaveDirective
                ],
                providers: [
                    TowService,
                    TowCoordinator
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PickOutAreaComponent {
    constructor() {
        this.pickOutAreaModel = null;
    }
    /**
     * @param {?} pickOutAreaModel
     * @return {?}
     */
    initialize(pickOutAreaModel) {
        this.pickOutAreaModel = pickOutAreaModel;
    }
}
PickOutAreaComponent.decorators = [
    { type: Component, args: [{
                template: "<div *ngIf=\"pickOutAreaModel\"\n     [style.left.px]=\"pickOutAreaModel.x\"\n     [style.top.px]=\"pickOutAreaModel.y\"\n     [style.width.px]=\"pickOutAreaModel.width\"\n     [style.height.px]=\"pickOutAreaModel.height\"\n     class=\"pick-out-area\">\n</div>\n",
                styles: [".pick-out-area{opacity:.5;position:absolute}"]
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class EndPickOut {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PickOutItems {
    /**
     * @param {?} ids
     */
    constructor(ids) {
        this.ids = ids;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class StartPickOut {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class StopPickOut {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PickOutCoordinator {
    /**
     * @param {?} radar
     */
    constructor(radar) {
        this.radar = radar;
        this.changes = new Subject();
        this.isPickOutAllowed = true;
    }
    /**
     * @return {?}
     */
    disablePickOut() {
        this.isPickOutAllowed = false;
    }
    /**
     * @return {?}
     */
    enablePickOut() {
        this.isPickOutAllowed = true;
    }
    /**
     * @return {?}
     */
    stopPickOut() {
        this.changes.next(new StopPickOut());
    }
    /**
     * @return {?}
     */
    startPickOut() {
        this.changes.next(new StartPickOut());
    }
    /**
     * @param {?} range
     * @return {?}
     */
    pickOutChanged(range) {
        /** @type {?} */
        const pickOutSpotModels = this.radar.filterSpots((/**
         * @param {?} spot
         * @return {?}
         */
        (spot) => spot.data.isPickOutItem));
        pickOutSpotModels.forEach((/**
         * @param {?} spotModel
         * @return {?}
         */
        (spotModel) => {
            spotModel.updateInfo();
        }));
        this.changes.next(new PickOutItems(this.getSelectedItemIds(range, pickOutSpotModels)));
    }
    /**
     * @return {?}
     */
    endPickOut() {
        this.changes.next(new EndPickOut());
    }
    /**
     * @private
     * @param {?} range
     * @param {?} pickOutsItem
     * @return {?}
     */
    getSelectedItemIds(range, pickOutsItem) {
        return pickOutsItem
            .filter((/**
         * @param {?} pickOutItem
         * @return {?}
         */
        (pickOutItem) => {
            return (range.x < (pickOutItem.position.x + pickOutItem.size.width) &&
                (range.x + range.width) > pickOutItem.position.x &&
                (range.y + range.height) > pickOutItem.position.y &&
                range.y < (pickOutItem.position.y + pickOutItem.size.height));
        }))
            .map((/**
         * @param {?} pickOutItem
         * @return {?}
         */
        (pickOutItem) => pickOutItem.data.brickId));
    }
}
PickOutCoordinator.decorators = [
    { type: Injectable }
];
/** @nocollapse */
PickOutCoordinator.ctorParameters = () => [
    { type: Radar }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const MOUSE_LEFT_KEY_CODE = 0;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PickOutAreaModel {
    /**
     * @param {?} scrollableContainer
     * @param {?} x
     * @param {?} y
     * @param {?} overBrickId
     */
    constructor(scrollableContainer, x, y, overBrickId) {
        this.isPickOutProcessInitialized = false;
        this.minimumMoveDistance = 5;
        this.scrollableContainer = scrollableContainer;
        this.initialX = x;
        this.initialY = y;
        this.x = x;
        this.y = y;
        this.initialBrickId = overBrickId;
        this.currentBrickId = overBrickId;
    }
    /**
     * @return {?}
     */
    recalculatePositionAndSize() {
        /** @type {?} */
        const scrollContextRect = this.scrollableContainer.getBoundingClientRect();
        /** @type {?} */
        const pageX = this.previousClientX - scrollContextRect.left;
        /** @type {?} */
        const pageY = this.previousClientY - scrollContextRect.top + this.scrollableContainer.scrollTop;
        this.updatePickOutAreaPositionAndSize(pageX, pageY);
    }
    /**
     * @param {?} clientX
     * @param {?} clientY
     * @return {?}
     */
    updateCurrentClientPosition(clientX, clientY) {
        this.previousClientX = clientX;
        this.previousClientY = clientY;
        this.recalculatePositionAndSize();
    }
    /**
     * @param {?} brickId
     * @return {?}
     */
    updateCurrentBrickId(brickId) {
        this.currentBrickId = brickId;
    }
    /**
     * @return {?}
     */
    canInitiatePickOutProcess() {
        return this.isMouseMovedEnough() &&
            (!this.currentBrickId || this.currentBrickId !== this.initialBrickId);
    }
    /**
     * @return {?}
     */
    initiatePickOutProcess() {
        this.isPickOutProcessInitialized = true;
    }
    /**
     * @private
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    updatePickOutAreaPositionAndSize(x, y) {
        // update x position and width
        if (x < this.initialX) {
            this.width = this.initialX - x;
            this.x = x;
        }
        else {
            this.width = Math.abs(x - this.x);
        }
        // update y position and height
        if (y < this.initialY) {
            this.height = this.initialY - y;
            this.y = y;
        }
        else {
            this.height = Math.abs(y - this.y);
        }
        /** @type {?} */
        const scrollContextRect = this.scrollableContainer.getBoundingClientRect();
        this.clientX = scrollContextRect.left + this.x;
        this.clientY = scrollContextRect.top + this.y - this.scrollableContainer.scrollTop;
    }
    /**
     * @private
     * @return {?}
     */
    isMouseMovedEnough() {
        return this.width > this.minimumMoveDistance ||
            this.height > this.minimumMoveDistance;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PickOutAreaDirective {
    /**
     * @param {?} doc
     * @param {?} pickOutCoordinator
     * @param {?} componentFactoryResolver
     * @param {?} appRef
     * @param {?} zone
     * @param {?} el
     * @param {?} injector
     */
    constructor(doc, pickOutCoordinator, componentFactoryResolver, appRef, zone, el, injector) {
        this.pickOutCoordinator = pickOutCoordinator;
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.zone = zone;
        this.el = el;
        this.injector = injector;
        this.doc = null;
        this.pickOutAreaModel = null;
        this.selectionRangeComponentRef = null;
        this.doc = doc;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.onMouseUpBound = this.onMouseUp.bind(this);
        this.onMouseMoveBound = this.onMouseMove.bind(this);
        this.onSelectionStartBound = this.onSelectionStart.bind(this);
        this.onContainerScrollBound = this.onContainerScroll.bind(this);
        this.doc.addEventListener('mousemove', this.onMouseMoveBound);
        this.doc.addEventListener('mouseup', this.onMouseUpBound);
        this.doc.addEventListener('selectstart', this.onSelectionStartBound);
        this.config.scrollableContainer.addEventListener('scroll', this.onContainerScrollBound);
    }
    /**
     * @return {?}
     */
    triggerPickOutChanged() {
        this.pickOutCoordinator.pickOutChanged({
            x: this.pickOutAreaModel.clientX,
            y: this.pickOutAreaModel.clientY,
            width: this.pickOutAreaModel.width,
            height: this.pickOutAreaModel.height
        });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    mouseDown(event) {
        if (event.button === MOUSE_LEFT_KEY_CODE && !this.isMouseOverDraggableElement(event.clientX, event.clientY)) {
            /** @type {?} */
            const scrollContextRect = this.config.scrollableContainer.getBoundingClientRect();
            /** @type {?} */
            const pageX = event.clientX - scrollContextRect.left;
            /** @type {?} */
            const pageY = event.clientY - scrollContextRect.top + this.config.scrollableContainer.scrollTop;
            /** @type {?} */
            const brickIdOverMouse = this.findBrickIdByCoordinate(event.clientX, event.clientY);
            this.pickOutAreaModel = new PickOutAreaModel(this.config.scrollableContainer, pageX, pageY, brickIdOverMouse);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMouseMove(event) {
        if (this.pickOutAreaModel) {
            this.pickOutAreaModel.updateCurrentClientPosition(event.clientX, event.clientY);
            this.pickOutAreaModel.updateCurrentBrickId(this.findBrickIdByCoordinate(event.clientX, event.clientY));
            if (this.pickOutAreaModel.isPickOutProcessInitialized) {
                event.preventDefault();
                this.triggerPickOutChanged();
            }
            else if (this.pickOutAreaModel.canInitiatePickOutProcess()) {
                this.pickOutAreaModel.initiatePickOutProcess();
                this.onStartPicKOut();
            }
        }
    }
    /**
     * @return {?}
     */
    onMouseUp() {
        this.onStopPickOut();
    }
    /**
     * @return {?}
     */
    onContainerScroll() {
        if (this.pickOutAreaModel && this.pickOutAreaModel.isPickOutProcessInitialized) {
            this.pickOutAreaModel.recalculatePositionAndSize();
            this.triggerPickOutChanged();
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onSelectionStart(e) {
        // does not allow select text during pick out process
        if (this.pickOutAreaModel && this.pickOutAreaModel.isPickOutProcessInitialized) {
            e.preventDefault();
        }
    }
    /**
     * @return {?}
     */
    renderRangeComponent() {
        // https://medium.com/@caroso1222/angular-pro-tip-how-to-dynamically-create-components-in-body-ba200cc289e6
        // 1. Create a component reference from the component
        this.selectionRangeComponentRef = this.componentFactoryResolver
            .resolveComponentFactory(PickOutAreaComponent)
            .create(this.injector);
        this.selectionRangeComponentRef.instance.initialize(this.pickOutAreaModel);
        // 2. Attach component to the appRef so that it's inside the ng component tree
        this.appRef.attachView(this.selectionRangeComponentRef.hostView);
        // 3. Get DOM element from component
        /** @type {?} */
        const domElem = (/** @type {?} */ (((/** @type {?} */ (this.selectionRangeComponentRef.hostView)))
            .rootNodes[0]));
        // 4. Append DOM element to the body
        this.config.scrollableContainer.appendChild(domElem);
    }
    /**
     * @return {?}
     */
    removeRangeComponent() {
        this.appRef.detachView(this.selectionRangeComponentRef.hostView);
        this.selectionRangeComponentRef.destroy();
        this.selectionRangeComponentRef = null;
    }
    /**
     * @return {?}
     */
    onStartPicKOut() {
        this.pickOutCoordinator.startPickOut();
        this.doc.activeElement.blur();
        this.renderRangeComponent();
        this.clearSelection();
    }
    /**
     * @return {?}
     */
    onStopPickOut() {
        if (this.pickOutAreaModel && this.pickOutAreaModel.isPickOutProcessInitialized) {
            this.removeRangeComponent();
            this.pickOutCoordinator.endPickOut();
        }
        this.pickOutAreaModel = null;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.doc.removeEventListener('mouseup', this.onMouseUpBound);
        this.doc.removeEventListener('mousemove', this.onMouseMoveBound);
        this.doc.removeEventListener('selectstart', this.onSelectionStartBound);
        this.config.scrollableContainer.removeEventListener('scroll', this.onContainerScrollBound);
    }
    /**
     * @private
     * @return {?}
     */
    clearSelection() {
        window.getSelection().empty();
    }
    /**
     * @private
     * @param {?} pageX
     * @param {?} clientY
     * @return {?}
     */
    findBrickIdByCoordinate(pageX, clientY) {
        /** @type {?} */
        let currentElement = document.elementFromPoint(pageX, clientY);
        while (currentElement && currentElement.tagName !== 'WALL-CANVAS-BRICK') {
            currentElement = currentElement.parentElement;
        }
        if (currentElement) {
            // there is canvas bricks
            return currentElement
                .getElementsByClassName('wall-canvas-brick__wrapper')[0]
                .getAttribute('id');
        }
        else {
            return null;
        }
    }
    /**
     * @private
     * @param {?} clientX
     * @param {?} clientY
     * @return {?}
     */
    isMouseOverDraggableElement(clientX, clientY) {
        /** @type {?} */
        let currentElement = document.elementFromPoint(clientX, clientY);
        while (currentElement &&
            !((/** @type {?} */ (currentElement))).draggable &&
            !currentElement.classList.contains('wall-canvas-brick__draggable-box')) {
            currentElement = currentElement.parentElement;
        }
        return Boolean(currentElement);
    }
}
PickOutAreaDirective.decorators = [
    { type: Directive, args: [{
                selector: '[pick-out-area]'
            },] }
];
/** @nocollapse */
PickOutAreaDirective.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: PickOutCoordinator },
    { type: ComponentFactoryResolver },
    { type: ApplicationRef },
    { type: NgZone },
    { type: ElementRef },
    { type: Injector }
];
PickOutAreaDirective.propDecorators = {
    config: [{ type: Input, args: ['pick-out-area',] }],
    mouseDown: [{ type: HostListener, args: ['mousedown', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PickOutService {
    /**
     * @param {?} pickOutHandlerService
     */
    constructor(pickOutHandlerService) {
        this.pickOutHandlerService = pickOutHandlerService;
        this.events = new Subject();
        this.pickOutHandlerService.changes.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            this.events.next(e);
        }));
    }
    /**
     * @return {?}
     */
    enablePickOut() {
        this.pickOutHandlerService.enablePickOut();
    }
    /**
     * @return {?}
     */
    disablePickOut() {
        this.pickOutHandlerService.disablePickOut();
    }
    /**
     * @return {?}
     */
    stopPickOut() {
        this.pickOutHandlerService.stopPickOut();
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    subscribe(fn) {
        return this.events.subscribe(fn);
    }
}
PickOutService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
PickOutService.ctorParameters = () => [
    { type: PickOutCoordinator }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PickOutModule {
}
PickOutModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    RadarModule
                ],
                declarations: [
                    PickOutAreaComponent,
                    PickOutAreaDirective
                ],
                providers: [
                    PickOutService,
                    PickOutCoordinator
                ],
                exports: [
                    PickOutAreaDirective
                ],
                entryComponents: [
                    PickOutAreaComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WallModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: WallModule,
            providers: [
                BrickRegistry,
                WallModelFactory
            ]
        };
    }
}
WallModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    PickOutModule,
                    TowModule,
                    RadarModule,
                    PlaceholderRendererModule,
                    MatIconModule
                ],
                declarations: [
                    WallComponent,
                    WallCanvasComponent,
                    WallCanvasRowComponent,
                    WallCanvasBrickComponent
                ],
                exports: [
                    WallComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BrickInputPlaceholderComponent {
    constructor() {
        this.selected = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onClick(event) {
        this.selected.emit(event);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
BrickInputPlaceholderComponent.decorators = [
    { type: Component, args: [{
                selector: 'w-brick-input-placeholder',
                template: "<div class=\"placeholder\" (click)=\"onClick($event)\">\n    <mat-icon>{{icon}}</mat-icon>\n    <span> {{ text }} </span>\n</div>\n\n<w-loading-wrapper [message]=\"'Loading'\" *ngIf=\"loading\"></w-loading-wrapper>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".placeholder{padding:15px;display:flex;cursor:pointer;border-radius:4px;align-items:center}mat-icon{margin-right:10px}:host{position:relative;display:block}"]
            }] }
];
/** @nocollapse */
BrickInputPlaceholderComponent.ctorParameters = () => [];
BrickInputPlaceholderComponent.propDecorators = {
    text: [{ type: Input }],
    icon: [{ type: Input }],
    loading: [{ type: Input }],
    selected: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LoadingWrapperComponent {
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
LoadingWrapperComponent.decorators = [
    { type: Component, args: [{
                selector: 'w-loading-wrapper',
                template: "<div *ngIf=\"message\" class=\"w-loading-wrapper__message\">{{message}}</div>\n<div class=\"w-loading-wrapper__wrapper\"></div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".w-loading-wrapper__message,.w-loading-wrapper__wrapper{position:absolute;top:0;left:0;bottom:0;right:0}.w-loading-wrapper__wrapper{opacity:.2;cursor:progress}.w-loading-wrapper__message{display:flex;justify-content:center;align-items:center}"]
            }] }
];
LoadingWrapperComponent.propDecorators = {
    message: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class HelperComponentsModule {
}
HelperComponentsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MatIconModule
                ],
                exports: [
                    BrickInputPlaceholderComponent,
                    LoadingWrapperComponent,
                ],
                declarations: [
                    BrickInputPlaceholderComponent,
                    LoadingWrapperComponent,
                ],
                providers: []
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const WALL = {
    MODES: {
        EDIT: 'edit',
        READ: 'READ'
    }
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CopyPlugin {
    /**
     * @param {?} injector
     */
    constructor(injector) {
        this.injector = injector;
        this.doc = null;
        this.doc = this.injector.get(DOCUMENT);
        this.onCopyBound = this.onCopy.bind(this);
        this.doc.addEventListener('copy', this.onCopyBound);
    }
    /**
     * @param {?} model
     * @return {?}
     */
    onWallInitialize(model) {
        this.wallModel = model;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onCopy(e) {
        /** @type {?} */
        const selectedTextRepresentation = this.getSelectedTextRepresentation();
        if (selectedTextRepresentation.length) {
            e.preventDefault();
            this.addToClipboard(e, selectedTextRepresentation);
        }
    }
    /**
     * @return {?}
     */
    onWallPluginDestroy() {
        this.doc.removeEventListener('click', this.onCopy);
    }
    /**
     * @private
     * @param {?} e
     * @param {?} str
     * @return {?}
     */
    addToClipboard(e, str) {
        e.clipboardData.setData('text/plain', str);
    }
    /**
     * @private
     * @return {?}
     */
    getSelectedTextRepresentation() {
        /** @type {?} */
        const selectedBrickIds = this.wallModel.api.ui.getSelectedBrickIds();
        return selectedBrickIds
            .map((/**
         * @param {?} selectedBrickId
         * @return {?}
         */
        (selectedBrickId) => this.wallModel.api.core.getBrickTextRepresentation(selectedBrickId)))
            .map((/**
         * @param {?} textRepresentation
         * @return {?}
         */
        (textRepresentation) => textRepresentation.trim()))
            .join('\n');
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const UNDO_REDO_API_NAME = 'undo';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class UndoRedoPlugin {
    /**
     * @param {?} injector
     */
    constructor(injector) {
        this.injector = injector;
        this.processingUndo = false;
        this.undoPlanStack = [];
        this.redoPlanStack = [];
        this.doc = this.injector.get(DOCUMENT);
    }
    /**
     * @param {?} wallModel
     * @return {?}
     */
    onWallInitialize(wallModel) {
        this.wallModel = wallModel;
        this.wallModel.registerApi(UNDO_REDO_API_NAME, (/** @type {?} */ ({
            undo: this.undo.bind(this),
            undoSize: this.undoSize.bind(this),
            redo: this.redo.bind(this),
            redoSize: this.redoSize.bind(this),
            clear: this.clear.bind(this)
        })));
        this.apiSubscription = this.wallModel.api.core.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            this.wallModelEventHandler(e);
        }));
        this.onUndoKeyHandlerBound = this.onUndoKeyHandler.bind(this);
        this.doc.addEventListener('keydown', this.onUndoKeyHandlerBound);
    }
    /**
     * @return {?}
     */
    onWallPluginDestroy() {
        this.apiSubscription.unsubscribe();
        this.doc.removeEventListener('keydown', this.onUndoKeyHandlerBound);
    }
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    onUndoKeyHandler(e) {
        /** @type {?} */
        const CTRL_KEY = 90;
        if (e.keyCode === CTRL_KEY && e.ctrlKey) {
            e.preventDefault();
            e.stopPropagation();
            if (e.shiftKey) {
                this.redo();
            }
            else {
                this.undo();
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    undoSize() {
        return this.undoPlanStack.length;
    }
    /**
     * @private
     * @return {?}
     */
    redoSize() {
        return this.redoPlanStack.length;
    }
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    wallModelEventHandler(e) {
        if (!this.processingUndo) {
            if (e instanceof BeforeChangeEvent && ((/** @type {?} */ (e))).beforeEventType !== SetPlanEvent) {
                this.undoPlanStack.push(this.wallModel.api.core.getPlan());
                this.redoPlanStack = [];
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    redo() {
        /** @type {?} */
        const redoPlan = this.redoPlanStack.pop();
        if (redoPlan) {
            this.processingUndo = true;
            this.wallModel.api.core.setPlan(redoPlan);
            this.undoPlanStack.push(redoPlan);
            this.processingUndo = false;
        }
    }
    /**
     * @private
     * @return {?}
     */
    undo() {
        /** @type {?} */
        const previousPlan = this.undoPlanStack.pop();
        if (previousPlan) {
            this.processingUndo = true;
            this.wallModel.api.core.setPlan(previousPlan);
            this.redoPlanStack.push(previousPlan);
            this.processingUndo = false;
        }
    }
    /**
     * @private
     * @return {?}
     */
    clear() {
        this.undoPlanStack = [];
        this.redoPlanStack = [];
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const TOW = {
    dropTypes: {
        horizontal: 'horizontal',
        vertical: 'vertical'
    },
    dropSides: {
        left: 'left',
        right: 'right',
        top: 'top',
        bottom: 'bottom'
    }
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SelectionPlugin {
    /**
     * @param {?} injector
     * @param {?=} options
     */
    constructor(injector, options) {
        this.injector = injector;
        this.isMouseSelection = false;
        this.placeholderHeight = 2;
        this.isEnableDropZoneHighlight = false;
        // extension point for client to prevent brick un-selections
        this.options = Object.assign({ shouldUnselectBrick: (/**
             * @return {?}
             */
            () => true) }, options);
    }
    /**
     * @param {?} wallModel
     * @return {?}
     */
    onWallInitialize(wallModel) {
        this.wallModel = wallModel;
        this.doc = this.injector.get(DOCUMENT);
        this.pickOutService = this.injector.get(PickOutService);
        this.radar = this.injector.get(Radar);
        this.placeholderRenderer = this.injector.get(PlaceholderRenderer);
        this.towService = this.injector.get(TowService);
        this.onMouseDownBound = this.onMouseDown.bind(this);
        this.onKeyDownHandlerBound = this.onKeyDownHandler.bind(this);
        this.doc.addEventListener('mousedown', this.onMouseDownBound);
        this.doc.addEventListener('keydown', this.onKeyDownHandlerBound);
        // listen to picked out items and select appropriate bricks
        this.pickOutServiceSubscription = this.pickOutService.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            if (e instanceof StartPickOut) {
                this.isMouseSelection = true;
                this.wallModel.api.ui.disableMediaInteraction();
            }
            if (e instanceof PickOutItems) {
                this.wallModel.api.ui.selectBricks(e.ids);
            }
            if (e instanceof EndPickOut) {
                this.wallModel.api.ui.enableMediaInteraction();
            }
        }));
        // listen for draggable operation and move bricks accordingly
        this.towServiceSubscription = this.towService.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            if (e instanceof StartWorkingEvent) {
                if (this.wallModel.api.core.getBrickSnapshot(e.slaveId)) {
                    this.isEnableDropZoneHighlight = true;
                }
                else {
                    this.isEnableDropZoneHighlight = false;
                }
                this.nearestBrickToDrop = null;
                this.placeholderRenderer.clear();
            }
            if (e instanceof StopWorkingEvent && this.nearestBrickToDrop) {
                if (this.isEnableDropZoneHighlight) {
                    /** @type {?} */
                    let movedBrickIds = [];
                    /** @type {?} */
                    const selectedBrickIds = this.wallModel.api.ui.getSelectedBrickIds();
                    if (selectedBrickIds.length > 1) {
                        movedBrickIds = movedBrickIds.concat(selectedBrickIds);
                    }
                    else {
                        movedBrickIds.push(e.slaveId);
                    }
                    if (this.nearestBrickToDrop.type === TOW.dropTypes.horizontal) {
                        if (this.nearestBrickToDrop.side === TOW.dropSides.top) {
                            this.wallModel.api.core.moveBrickBeforeBrickId(movedBrickIds, this.nearestBrickToDrop.spot.data.brickId);
                        }
                        if (this.nearestBrickToDrop.side === TOW.dropSides.bottom) {
                            this.wallModel.api.core.moveBrickAfterBrickId(movedBrickIds, this.nearestBrickToDrop.spot.data.brickId);
                        }
                    }
                    if (this.nearestBrickToDrop.type === TOW.dropTypes.vertical) {
                        if (this.nearestBrickToDrop.side === TOW.dropSides.left) {
                            this.wallModel.api.core.moveBrickToNewColumn(movedBrickIds, this.nearestBrickToDrop.spot.data.brickId, TOW.dropSides.left);
                        }
                        if (this.nearestBrickToDrop.side === TOW.dropSides.right) {
                            this.wallModel.api.core.moveBrickToNewColumn(movedBrickIds, this.nearestBrickToDrop.spot.data.brickId, TOW.dropSides.right);
                        }
                    }
                    this.nearestBrickToDrop = null;
                    this.placeholderRenderer.clear();
                }
            }
            if (e instanceof WorkInProgressEvent) {
                if (this.isEnableDropZoneHighlight) {
                    /** @type {?} */
                    const spots = this.radar.filterSpots((/**
                     * @param {?} spot
                     * @return {?}
                     */
                    (spot) => spot.data.isBeacon));
                    /** @type {?} */
                    let nearestSpot;
                    spots.forEach((/**
                     * @param {?} spot
                     * @return {?}
                     */
                    (spot) => {
                        spot.updateInfo();
                        if (!nearestSpot) {
                            nearestSpot = spot;
                        }
                        else {
                            /** @type {?} */
                            const currentSpotMinimalDistance = spot.getMinimalDistanceToPoint(e.mousePosition.clientX, e.mousePosition.clientY);
                            /** @type {?} */
                            const nearestSpotMinimalDistance = nearestSpot.getMinimalDistanceToPoint(e.mousePosition.clientX, e.mousePosition.clientY);
                            if (currentSpotMinimalDistance < nearestSpotMinimalDistance) {
                                nearestSpot = spot;
                            }
                        }
                    }));
                    if (nearestSpot) {
                        /** @type {?} */
                        const nearestSpotMinimalDistance = nearestSpot.getMinimalDistanceToPoint(e.mousePosition.clientX, e.mousePosition.clientY);
                        if (nearestSpotMinimalDistance < 50) {
                            this.nearestBrickToDrop = {
                                spot: nearestSpot,
                                side: null,
                                type: null
                            };
                            if (e.mousePosition.clientX < nearestSpot.position.x) {
                                this.nearestBrickToDrop.type = TOW.dropTypes.vertical;
                                this.nearestBrickToDrop.side = TOW.dropSides.left;
                            }
                            if (e.mousePosition.clientX > nearestSpot.position.x + nearestSpot.size.width) {
                                this.nearestBrickToDrop.type = TOW.dropTypes.vertical;
                                this.nearestBrickToDrop.side = TOW.dropSides.right;
                            }
                            if (e.mousePosition.clientX > nearestSpot.position.x &&
                                e.mousePosition.clientX < nearestSpot.position.x + nearestSpot.size.width) {
                                this.nearestBrickToDrop.type = TOW.dropTypes.horizontal;
                                /** @type {?} */
                                const centerYPosition = nearestSpot.position.y + (nearestSpot.size.height / 2);
                                this.nearestBrickToDrop.side = e.mousePosition.clientY < centerYPosition ?
                                    TOW.dropSides.top : TOW.dropSides.bottom;
                            }
                            this.renderPlaceholder();
                        }
                        else {
                            this.nearestBrickToDrop = null;
                            this.placeholderRenderer.clear();
                        }
                    }
                    else {
                        this.nearestBrickToDrop = null;
                        this.placeholderRenderer.clear();
                    }
                }
            }
        }));
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onMouseDown(e) {
        if (!this.isMouseOverDraggableBox(e.clientX, e.clientY) && this.options.shouldUnselectBrick(e)) {
            this.wallModel.api.ui.unSelectBricks();
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onKeyDownHandler(e) {
        /** @type {?} */
        const selectedBrickIds = this.wallModel.api.ui.getSelectedBrickIds();
        /** @type {?} */
        const firstSelectedBrickId = selectedBrickIds[0];
        /** @type {?} */
        const lastSelectedBrickId = selectedBrickIds[selectedBrickIds.length - 1];
        if (e.key === 'Delete' && selectedBrickIds.length) {
            e.preventDefault();
            this.wallModel.api.ui.unSelectBricks();
            this.wallModel.api.ui.removeBricks(selectedBrickIds);
        }
        if (e.key === 'Enter' && selectedBrickIds.length) {
            e.preventDefault();
            this.wallModel.api.ui.focusOnBrickId(firstSelectedBrickId);
            this.wallModel.api.ui.unSelectBricks();
        }
        if (e.key === 'ArrowUp' && selectedBrickIds.length) {
            e.preventDefault();
            /** @type {?} */
            const previousBrickId = this.wallModel.api.core.getPreviousBrickId(lastSelectedBrickId);
            if (previousBrickId) {
                if (e.shiftKey) {
                    if (selectedBrickIds.length > 1 && this.isDownSelectionDirection()) {
                        this.wallModel.api.ui.removeBrickFromSelection(lastSelectedBrickId);
                    }
                    else {
                        this.wallModel.api.ui.addBrickToSelection(previousBrickId);
                    }
                }
                else {
                    this.wallModel.api.ui.selectBrick(previousBrickId);
                }
            }
        }
        if (e.key === 'ArrowDown' && selectedBrickIds.length) {
            e.preventDefault();
            /** @type {?} */
            const nextBrickId = this.wallModel.api.core.getNextBrickId(lastSelectedBrickId);
            if (nextBrickId) {
                if (e.shiftKey) {
                    if (selectedBrickIds.length > 1 && !this.isDownSelectionDirection()) {
                        this.wallModel.api.ui.removeBrickFromSelection(lastSelectedBrickId);
                    }
                    else {
                        this.wallModel.api.ui.addBrickToSelection(nextBrickId);
                    }
                }
                else {
                    this.wallModel.api.ui.selectBrick(nextBrickId);
                }
            }
        }
        if (e.key === 'Escape') {
            e.preventDefault();
            if (selectedBrickIds.length) {
                this.wallModel.api.ui.unSelectBricks();
            }
        }
    }
    /**
     * @return {?}
     */
    onWallPluginDestroy() {
        this.doc.removeEventListener('mousedown', this.onMouseDownBound);
        this.doc.removeEventListener('keydown', this.onKeyDownHandlerBound);
        this.wallModel = null;
        this.pickOutServiceSubscription.unsubscribe();
        this.towServiceSubscription.unsubscribe();
    }
    /**
     * @private
     * @param {?} clientX
     * @param {?} clientY
     * @return {?}
     */
    isMouseOverDraggableBox(clientX, clientY) {
        /** @type {?} */
        let currentElement = document.elementFromPoint(clientX, clientY);
        while (currentElement && !currentElement.classList.contains('wall-canvas-brick__draggable-box')) {
            currentElement = currentElement.parentElement;
        }
        return Boolean(currentElement);
    }
    /**
     * @private
     * @return {?}
     */
    isDownSelectionDirection() {
        /** @type {?} */
        const selectedBrickIds = this.wallModel.api.ui.getSelectedBrickIds();
        /** @type {?} */
        const bricksCount = selectedBrickIds.length;
        /** @type {?} */
        const lastBrickId = selectedBrickIds[bricksCount - 1];
        /** @type {?} */
        const penultimateBrickId = selectedBrickIds[bricksCount - 2];
        return this.wallModel.api.core.isBrickAheadOf(penultimateBrickId, lastBrickId);
    }
    /**
     * @private
     * @return {?}
     */
    renderPlaceholder() {
        /** @type {?} */
        let placeholderX;
        /** @type {?} */
        let placeholderY;
        /** @type {?} */
        let placeholderSize;
        /** @type {?} */
        let placeholderIsHorizontal;
        /** @type {?} */
        const spot = this.nearestBrickToDrop.spot;
        /** @type {?} */
        const side = this.nearestBrickToDrop.side;
        /** @type {?} */
        const type = this.nearestBrickToDrop.type;
        if (type === TOW.dropTypes.horizontal) {
            placeholderX = spot.position.x;
            placeholderSize = spot.size.width;
            if (side === TOW.dropSides.top) {
                placeholderY = spot.position.y - this.placeholderHeight;
            }
            if (side === TOW.dropSides.bottom) {
                placeholderY = spot.position.y + spot.size.height;
            }
            placeholderIsHorizontal = true;
        }
        if (type === TOW.dropTypes.vertical) {
            placeholderY = spot.position.y;
            placeholderSize = spot.size.height;
            placeholderIsHorizontal = false;
            if (side === TOW.dropSides.left) {
                placeholderX = spot.position.x;
            }
            if (side === TOW.dropSides.right) {
                placeholderX = spot.position.x + spot.size.width;
            }
        }
        this.placeholderRenderer.render(placeholderX, placeholderY, placeholderSize, placeholderIsHorizontal);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const DIVIDER_BRICK_TAG = 'divider';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DividerBrickComponent {
}
DividerBrickComponent.decorators = [
    { type: Component, args: [{
                selector: 'divider-brick',
                template: "<div class=\"wrapper\">\n    <div class=\"divider\"></div>\n</div>\n",
                styles: [".wrapper{height:36px}.divider{border-bottom:1px solid silver;height:1px;padding-top:17px}"]
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DividerBrickModule {
    /**
     * @param {?} brickRegistry
     */
    constructor(brickRegistry) {
        this.brickRegistry = brickRegistry;
        this.brickRegistry.register({
            tag: DIVIDER_BRICK_TAG,
            component: DividerBrickComponent,
            name: 'Divider',
            description: 'Visually divide blocks'
        });
    }
}
DividerBrickModule.decorators = [
    { type: NgModule, args: [{
                exports: [DividerBrickComponent],
                declarations: [DividerBrickComponent],
                entryComponents: [DividerBrickComponent]
            },] }
];
/** @nocollapse */
DividerBrickModule.ctorParameters = () => [
    { type: BrickRegistry }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TextRepresentation {
    /**
     * @param {?} brickSnapshot
     */
    constructor(brickSnapshot) {
        this.brickSnapshot = brickSnapshot;
    }
    /**
     * @return {?}
     */
    getText() {
        return ((/** @type {?} */ (this.brickSnapshot.state))).text;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DeepLeftNodeChild {
    /**
     * @param {?} root
     */
    constructor(root) {
        /** @type {?} */
        let currentNode = root;
        while (currentNode.childNodes.length) {
            currentNode = currentNode.childNodes[0];
        }
        this.child = currentNode;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DeepRightNodeChild {
    /**
     * @param {?} root
     */
    constructor(root) {
        /** @type {?} */
        let currentNode = root;
        while (currentNode.childNodes.length) {
            currentNode = currentNode.childNodes[currentNode.childNodes.length - 1];
        }
        this.child = currentNode;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FirstSubStringNode {
    /**
     * @param {?} root
     * @param {?} subStringHTML
     */
    constructor(root, subStringHTML) {
        this.root = root;
        this.subStringHTML = subStringHTML;
        this.firstLevelSubStringNodes = [];
        // get text representation
        this.subString = this.getSubStringTextContent();
        if (subStringHTML.length !== 0) {
            if (this.root.childNodes.length === 1) {
                this.firstLevelSubStringNodes = Array.from(this.root.childNodes);
            }
            else if (this.root.childNodes.length > 1) {
                this.firstLevelSubStringNodes = this.findFirstLevelSubStringNodes();
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    findFirstLevelSubStringNodes() {
        /** @type {?} */
        let i = this.root.childNodes.length - 1;
        /** @type {?} */
        let currentNode = this.root.childNodes[i];
        /** @type {?} */
        let text = '';
        /** @type {?} */
        const firstLevelSubStringNodes = [];
        while (currentNode && !text.includes(this.subString)) {
            text = currentNode.textContent + text;
            firstLevelSubStringNodes.push(currentNode);
            i--;
            currentNode = this.root.childNodes[i];
        }
        return firstLevelSubStringNodes.reverse();
    }
    /**
     * @private
     * @return {?}
     */
    getSubStringTextContent() {
        /** @type {?} */
        const pNode = document.createElement('P');
        pNode.innerHTML = this.subStringHTML;
        return pNode.textContent;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CaretStartEndPosition {
    /**
     * @param {?} el
     */
    constructor(el) {
        this.el = el;
    }
    /**
     * @return {?}
     */
    isCaretAtEnd() {
        /** @type {?} */
        let result = false;
        /** @type {?} */
        const sel = window.getSelection();
        if (sel.rangeCount) {
            /** @type {?} */
            const selRange = sel.getRangeAt(0);
            /** @type {?} */
            const testRange = selRange.cloneRange();
            testRange.selectNodeContents(this.el);
            testRange.setStart(selRange.endContainer, selRange.endOffset);
            result = (testRange.toString().trim() === '');
        }
        return result;
    }
    /**
     * @return {?}
     */
    isCaretAtStart() {
        /** @type {?} */
        let result = false;
        /** @type {?} */
        const sel = window.getSelection();
        if (sel.rangeCount) {
            /** @type {?} */
            const selRange = sel.getRangeAt(0);
            /** @type {?} */
            const testRange = selRange.cloneRange();
            testRange.selectNodeContents(this.el);
            testRange.setEnd(selRange.startContainer, selRange.startOffset);
            result = (testRange.toString().trim() === '');
        }
        return result;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CursorLeftCoordinate {
    /**
     * @param {?} leftText
     * @param {?} rightText
     * @param {?} targetNode
     */
    constructor(leftText, rightText, targetNode) {
        this.leftText = leftText;
        this.rightText = rightText;
        this.targetNode = targetNode;
    }
    /**
     * @return {?}
     */
    get() {
        /** @type {?} */
        const div = this.createElementClone(this.targetNode);
        /** @type {?} */
        const span = document.createElement('SPAN');
        div.innerHTML = this.leftText;
        span.innerHTML = this.rightText;
        div.appendChild(span);
        // make sure element stay at top left corner
        div.style.position = 'absolute';
        div.style.top = '0';
        div.style.left = '0';
        div.style.padding = '0';
        div.style.margin = '0';
        document.body.appendChild(div);
        /** @type {?} */
        const leftCoordinate = span.offsetLeft;
        div.remove();
        return leftCoordinate;
    }
    /**
     * @private
     * @param {?} node
     * @return {?}
     */
    createElementClone(node) {
        /** @type {?} */
        const div = document.createElement('DIV');
        /** @type {?} */
        const style = getComputedStyle(node);
        [].forEach.call(style, (/**
         * @param {?} prop
         * @return {?}
         */
        (prop) => {
            div.style[prop] = style[prop];
        }));
        return div;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CursorPositionInLine {
    /**
     * @param {?} leftText
     * @param {?} rightText
     * @param {?} targetNode
     */
    constructor(leftText, rightText, targetNode) {
        this.leftText = leftText;
        this.rightText = rightText;
        this.targetNode = targetNode;
        if (leftText === '' && rightText === '') {
            this.isOnFirstLine = true;
            this.isOnLastLine = true;
        }
        else {
            // http://jsbin.com/qifezupu/31/edit?js,output
            /** @type {?} */
            const div = this.createElementClone(this.targetNode);
            document.body.appendChild(div);
            /** @type {?} */
            const span1 = document.createElement('SPAN');
            /** @type {?} */
            const span2 = document.createElement('SPAN');
            div.appendChild(span1);
            div.appendChild(span2);
            span1.innerText = 'a';
            /** @type {?} */
            const lh = span1.offsetHeight;
            span1.innerHTML = leftText;
            span2.innerHTML = rightText;
            this.isOnFirstLine = span1.textContent.length === 0 ||
                (span1.offsetHeight === lh && span1.getBoundingClientRect().top === span2.getBoundingClientRect().top);
            this.isOnLastLine = span2.offsetHeight === lh;
            div.remove();
        }
    }
    /**
     * @private
     * @param {?} node
     * @return {?}
     */
    createElementClone(node) {
        /** @type {?} */
        const div = document.createElement('DIV');
        /** @type {?} */
        const style = getComputedStyle(node);
        [].forEach.call(style, (/**
         * @param {?} prop
         * @return {?}
         */
        (prop) => {
            div.style[prop] = style[prop];
        }));
        return div;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PlaceCaretToPosition {
    /**
     * @param {?} el
     * @param {?} position
     */
    constructor(el, position) {
        this.el = el;
        this.position = position;
    }
    /**
     * @return {?}
     */
    place() {
        /** @type {?} */
        const range = document.createRange();
        /** @type {?} */
        const sel = window.getSelection();
        range.setStart(this.el, this.position);
        sel.removeAllRanges();
        sel.addRange(range);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Returns string which does not contains empty nodes inside
 */
class StringWithoutEmptyNodes {
    /**
     * @param {?} str
     */
    constructor(str) {
        this.str = str;
    }
    /**
     * @return {?}
     */
    get() {
        /** @type {?} */
        const pNode = document.createElement('P');
        pNode.innerHTML = this.str;
        if (!pNode.textContent.trim().length) {
            // there are no text itself, so replace any tags to empty string
            return '';
        }
        else {
            return this.str;
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const FOCUS_INITIATOR = 'text-supporting-brick';
/** @type {?} */
const ENTER_KEY = 'Enter';
/** @type {?} */
const NUMPUB_ENTER_KEY = 'NumpadEnter';
/** @type {?} */
const ENTER_KEY_CODE_ANDROID = 13;
/** @type {?} */
const DELETE_KEY = 'Delete';
/** @type {?} */
const BACK_SPACE_KEY = 'Backspace';
/** @type {?} */
const BACK_SPACE_KEY_CODE_ANDROID = 8;
/** @type {?} */
const LEFT_KEY = 'ArrowLeft';
/** @type {?} */
const TOP_KEY = 'ArrowUp';
/** @type {?} */
const RIGHT_KEY = 'ArrowRight';
/** @type {?} */
const BOTTOM_KEY = 'ArrowDown';
/** @type {?} */
const ESCAPE_KEY = 27;
/** @type {?} */
const TAB_KEY = 'Tab';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BottomKeyHandler {
    /**
     * @param {?} baseTextBrickComponent
     */
    constructor(baseTextBrickComponent) {
        this.baseTextBrickComponent = baseTextBrickComponent;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    execute(e) {
        if (this.baseTextBrickComponent.isCaretAtLastLine()) {
            e.preventDefault();
            /** @type {?} */
            const caretLeftCoordinate = this.baseTextBrickComponent.getCaretLeftCoordinate();
            /** @type {?} */
            const focusContext = {
                initiator: FOCUS_INITIATOR,
                details: {
                    bottomKey: true,
                    caretLeftCoordinate
                }
            };
            this.baseTextBrickComponent.wallUiApi.focusOnNextTextBrick(this.baseTextBrickComponent.id, focusContext);
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class EnterKeyHandler {
    /**
     * @param {?} baseTextBrickComponent
     */
    constructor(baseTextBrickComponent) {
        this.baseTextBrickComponent = baseTextBrickComponent;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    execute(e) {
        e.preventDefault();
        /** @type {?} */
        const sel = window.getSelection();
        /** @type {?} */
        const splittedText = this.baseTextBrickComponent.getSplittedText(sel.focusOffset, sel.focusNode);
        splittedText.left = this.baseTextBrickComponent.cleanUpText(splittedText.left);
        splittedText.right = this.baseTextBrickComponent.cleanUpText(splittedText.right);
        if (splittedText.left.length) {
            if (splittedText.right.length) {
                // text is splitted to two part
                this.splitBrickForTwoPart(splittedText.left, splittedText.right);
            }
            else {
                // cursor at end - text's exist - create new and focus on it
                this.addEmptyBrickAfter();
            }
        }
        else {
            if (splittedText.right.length) {
                // cursor at start, text exists - just create new line at top, do not move focus
                this.addEmptyTextBrickBefore();
            }
            else {
                // there are no text at all - create new and focus on it
                this.addEmptyBrickAfter();
            }
        }
    }
    /**
     * @private
     * @param {?} left
     * @param {?} right
     * @return {?}
     */
    splitBrickForTwoPart(left, right) {
        this.addBrickAfter(right);
        this.baseTextBrickComponent.setTextState(left);
        this.baseTextBrickComponent.saveCurrentState();
    }
    /**
     * @private
     * @return {?}
     */
    addEmptyTextBrickBefore() {
        /** @type {?} */
        const newTextState = {
            text: '',
            tabs: this.baseTextBrickComponent.scope.tabs
        };
        this.baseTextBrickComponent.wallModel.api.core
            .addBrickBeforeBrickId(this.baseTextBrickComponent.id, 'text', newTextState);
        // scroll browser view to element
        this.baseTextBrickComponent.editor.nativeElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'start'
        });
    }
    /**
     * @private
     * @return {?}
     */
    addEmptyBrickAfter() {
        // cursor at end - text's exist - create new and focus on it
        this.addBrickAfter('');
    }
    /**
     * @private
     * @param {?} text
     * @return {?}
     */
    addBrickAfter(text) {
        /** @type {?} */
        const newTextState = {
            text: text,
            tabs: this.baseTextBrickComponent.scope.tabs
        };
        /** @type {?} */
        const addedBrick = this.baseTextBrickComponent.wallModel.api.core
            .addBrickAfterBrickId(this.baseTextBrickComponent.id, 'text', newTextState);
        // wait one tick for component rendering
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.baseTextBrickComponent.wallUiApi.focusOnBrickId(addedBrick.id);
        }));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LeftKeyHandler {
    /**
     * @param {?} baseTextBrickComponent
     */
    constructor(baseTextBrickComponent) {
        this.baseTextBrickComponent = baseTextBrickComponent;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    execute(e) {
        e.preventDefault();
        /** @type {?} */
        const focusContext = {
            initiator: FOCUS_INITIATOR,
            details: {
                leftKey: true
            }
        };
        this.baseTextBrickComponent.wallUiApi
            .focusOnPreviousTextBrick(this.baseTextBrickComponent.id, focusContext);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class RightKeyHandler {
    /**
     * @param {?} baseTextBrickComponent
     */
    constructor(baseTextBrickComponent) {
        this.baseTextBrickComponent = baseTextBrickComponent;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    execute(e) {
        e.preventDefault();
        /** @type {?} */
        const focusContext = {
            initiator: FOCUS_INITIATOR,
            details: {
                rightKey: true
            }
        };
        this.baseTextBrickComponent.wallUiApi.focusOnNextTextBrick(this.baseTextBrickComponent.id, focusContext);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TopKeyHandler {
    /**
     * @param {?} baseTextBrickComponent
     */
    constructor(baseTextBrickComponent) {
        this.baseTextBrickComponent = baseTextBrickComponent;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    execute(e) {
        /** @type {?} */
        const caretLeftCoordinate = this.baseTextBrickComponent.getCaretLeftCoordinate();
        if (this.baseTextBrickComponent.isCaretAtFirstLine()) {
            e.preventDefault();
            /** @type {?} */
            const focusContext = {
                initiator: FOCUS_INITIATOR,
                details: {
                    topKey: true,
                    caretLeftCoordinate
                }
            };
            this.baseTextBrickComponent.wallModel.api.ui
                .focusOnPreviousTextBrick(this.baseTextBrickComponent.id, focusContext);
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const LineType = {
    first: 'FIRST',
    last: 'LAST',
};
/**
 * @abstract
 */
class BaseTextBrickComponent {
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
        this.textChangeSubscription = this.textChange.subscribe((/**
         * @return {?}
         */
        () => {
            this.setTextState(this.scope.text);
            this.saveCurrentState();
        }));
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
            .map((/**
         * @param {?} str
         * @return {?}
         */
        (str) => str.trim()))
            .filter((/**
         * @param {?} str
         * @return {?}
         */
        (str) => str.length));
        if (textArr.length === 1) {
            document.execCommand('insertHTML', false, textArr[0]);
        }
        else if (textArr.length > 1) {
            // todo: add interface for UI api
            textArr.reverse().forEach((/**
             * @param {?} text
             * @return {?}
             */
            (text) => this.wallModel.api.core.addBrickAfterBrickId(this.id, 'text', { text })));
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
            setTimeout((/**
             * @return {?}
             */
            () => {
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
            }));
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
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.placeCaretBaseOnConcatenatedText(concatenationText);
            }), 10);
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class HeaderBrickComponent extends BaseTextBrickComponent {
    constructor() {
        super(...arguments);
        this.placeholder = 'Header';
    }
}
HeaderBrickComponent.decorators = [
    { type: Component, args: [{
                selector: 'header-brick',
                template: "<div #editor\n     attr.placeholder=\"{{placeholder}}\"\n     (input)=\"onTextChange()\"\n     [(ngModel)]=\"scope.text\"\n     [ngClass]=\"'header-brick-tabs-' + scope.tabs\"\n     (keydown)=\"onKeyPress($event)\"\n     class=\"text-brick__editor\"\n     contenteditable>\n</div>\n",
                styles: ["div{display:block}div[contenteditable]{letter-spacing:-.002em;word-break:break-all;padding:6px 2px;margin:8px 0 0}div[contenteditable]:focus{outline:0}div[contenteditable]:empty:before{content:attr(placeholder)}div.header-brick-tabs-1{margin-left:1.5rem}div.header-brick-tabs-2{margin-left:3rem}div.header-brick-tabs-3{margin-left:4.5rem}"]
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ContenteditableDirective {
    /**
     * @param {?} elementRef
     * @param {?} renderer
     */
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.propValueAccessor = 'textContent';
    }
    /**
     * @return {?}
     */
    callOnChange() {
        if (typeof this.onChange === 'function') {
            this.onChange(this.elementRef.nativeElement[this.propValueAccessor]);
        }
    }
    /**
     * @return {?}
     */
    callOnTouched() {
        if (typeof this.onTouched === 'function') {
            this.onTouched();
        }
    }
    /**
     * Writes a new value to the element.
     * This method will be called by the forms API to write
     * to the view when programmatic (model -> view) changes are requested.
     *
     * See: [ControlValueAccessor](https://angular.io/api/forms/ControlValueAccessor#members)
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        // todo add type
        /** @type {?} */
        const normalizedValue = value === null ? '' : value;
        this.renderer.setProperty(this.elementRef.nativeElement, this.propValueAccessor, normalizedValue);
    }
    /**
     * Registers a callback function that should be called when
     * the control's value changes in the UI.
     *
     * This is called by the forms API on initialization so it can update
     * the form model when values propagate from the view (view -> model).
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * Registers a callback function that should be called when the control receives a blur event.
     * This is called by the forms API on initialization so it can update the form model on blur.
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * This function is called by the forms API when the control status changes to or from "DISABLED".
     * Depending on the value, it should enable or disable the appropriate DOM element.
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        if (isDisabled) {
            this.renderer.setAttribute(this.elementRef.nativeElement, 'disabled', 'true');
            this.removeDisabledState = this.renderer
                .listen(this.elementRef.nativeElement, 'keydown', this.listenerDisabledState);
        }
        else {
            if (this.removeDisabledState) {
                this.renderer.removeAttribute(this.elementRef.nativeElement, 'disabled');
                this.removeDisabledState();
            }
        }
    }
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    listenerDisabledState(e) {
        e.preventDefault();
    }
}
ContenteditableDirective.decorators = [
    { type: Directive, args: [{
                selector: '[contenteditable]',
                providers: [
                    { provide: NG_VALUE_ACCESSOR, useExisting: ContenteditableDirective, multi: true }
                ]
            },] }
];
/** @nocollapse */
ContenteditableDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
ContenteditableDirective.propDecorators = {
    propValueAccessor: [{ type: Input }],
    callOnChange: [{ type: HostListener, args: ['input',] }],
    callOnTouched: [{ type: HostListener, args: ['blur',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ContenteditableModule {
}
ContenteditableModule.decorators = [
    { type: NgModule, args: [{
                imports: [FormsModule],
                exports: [ContenteditableDirective],
                declarations: [ContenteditableDirective]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class HeaderBrickModule {
    /**
     * @param {?} brickRegistry
     */
    constructor(brickRegistry) {
        this.brickRegistry = brickRegistry;
        this.brickRegistry.register({
            tag: 'header',
            component: HeaderBrickComponent,
            supportText: true,
            textRepresentation: TextRepresentation,
            name: 'Header',
            description: 'A large header with margins'
        });
    }
}
HeaderBrickModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    FormsModule,
                    CommonModule,
                    ContenteditableModule
                ],
                exports: [HeaderBrickComponent],
                declarations: [HeaderBrickComponent],
                entryComponents: [HeaderBrickComponent]
            },] }
];
/** @nocollapse */
HeaderBrickModule.ctorParameters = () => [
    { type: BrickRegistry }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const WALL_FILE_UPLOADER = new InjectionToken('IWallFileUploader');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class InputContextComponent {
    /**
     * @param {?} ngxStickyModalRef
     */
    constructor(ngxStickyModalRef) {
        this.ngxStickyModalRef = ngxStickyModalRef;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.srcInput.nativeElement.focus();
        }), 10);
    }
    /**
     * @return {?}
     */
    applyImageSrc() {
        this.notify({
            src: this.srcInput.nativeElement.value
        });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onFileChange(event) {
        this.notify({
            file: event.target.files[0]
        });
    }
    /**
     * @param {?} data
     * @return {?}
     */
    notify(data) {
        this.ngxStickyModalRef.close(data);
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onSubmit(e) {
        e.preventDefault();
        this.applyImageSrc();
    }
    /**
     * @return {?}
     */
    close() {
        this.ngxStickyModalRef.dismiss();
    }
}
InputContextComponent.decorators = [
    { type: Component, args: [{
                template: "<div class=\"w-context-panel w-brick-input mat-elevation-z4\">\n    <div class=\"w-brick-input__body\">\n        <a class=\"w-context-panel-close\" (click)=\"close()\">x</a>\n\n        <form (submit)=\"onSubmit($event)\">\n            <mat-form-field>\n                <input #src matInput placeholder=\"Paste the image link\">\n            </mat-form-field>\n\n            <button mat-flat-button color=\"primary\" (click)=\"applyImageSrc()\" type=\"button\">\n                Add image\n            </button>\n        </form>\n\n        <p class=\"w-brick-input__description mb-2\">\n            Add link or upload image\n        </p>\n\n        <input accept=\"image/*\" (change)=\"onFileChange($event)\" type=\"file\">\n    </div>\n</div>\n",
                styles: ["button,mat-form-field{width:100%}:host .w-context-panel{position:relative}:host .w-context-panel-close{position:absolute;top:10px;right:10px;color:#333;text-decoration:none;cursor:pointer}"]
            }] }
];
/** @nocollapse */
InputContextComponent.ctorParameters = () => [
    { type: StickyModalRef }
];
InputContextComponent.propDecorators = {
    srcInput: [{ type: ViewChild, args: ['src',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} el
 * @param {?} resolver
 * @param {?} component
 * @return {?}
 */
function getModalConfig(el, resolver, component) {
    /** @type {?} */
    const elementBoundingRect = el.nativeElement.getBoundingClientRect();
    /** @type {?} */
    const elementHeight = el.nativeElement.offsetHeight;
    console.log('Getting modal config for:', el);
    console.log(el.nativeElement);
    console.log('BoundingRect:', elementBoundingRect);
    console.log('Height:', elementHeight);
    return {
        component: component,
        positionStrategy: {
            name: StickyPositionStrategy.coordinate,
            options: {
                clientX: elementBoundingRect.x,
                clientY: elementBoundingRect.y + elementHeight + window.scrollY
            }
        },
        componentFactoryResolver: resolver,
        closeOnEscape: true
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ImgBrickComponent {
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
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.showPanel();
            }), 0);
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
            .then((/**
         * @return {?}
         */
        () => {
            this.scope.src = imageSrc;
            this.isSrcBase64 = false;
            if (metadata) {
                this.scope.metadata = metadata;
            }
            this.save();
            return this.setUpImageWidth();
        }))
            .catch((/**
         * @return {?}
         */
        () => {
            alert('Please enter valid url');
        }));
    }
    /**
     * @param {?} imgFile
     * @return {?}
     */
    applyImageFile(imgFile) {
        return (new ImgEncoder(imgFile)).getBase64Representation().then((/**
         * @param {?} imgBase64
         * @return {?}
         */
        (imgBase64) => {
            return this.applyImageSrc(imgBase64).then((/**
             * @return {?}
             */
            () => {
                return this.processBase64ImgSrc();
            }));
        }));
    }
    /**
     * @return {?}
     */
    processBase64ImgSrc() {
        return this.uploadImage().then((/**
         * @param {?} uploadInfo
         * @return {?}
         */
        (uploadInfo) => {
            return this.applyImageSrc(uploadInfo.downloadURL, {
                path: uploadInfo.path
            });
        }), (/**
         * @return {?}
         */
        () => {
        }));
    }
    /**
     * @return {?}
     */
    showPanel() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.imageSrcPlaceholderRef) {
                /** @type {?} */
                const modalConfig = getModalConfig(this.el, this.componentFactoryResolver, InputContextComponent);
                this.imageSrcPlaceholderRef = this.ngxStickyModalService.open(modalConfig);
                this.imageSrcPlaceholderRef.result.then((/**
                 * @param {?} result
                 * @return {?}
                 */
                (result) => {
                    this.imageSrcPlaceholderRef = null;
                    if (result.src) {
                        this.applyImageSrc(result.src);
                    }
                    else {
                        this.applyImageFile(result.file);
                    }
                }), (/**
                 * @return {?}
                 */
                () => {
                    this.imageSrcPlaceholderRef = null;
                }));
            }
        });
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
        return this.loadImage(this.scope.src).then((/**
         * @return {?}
         */
        () => {
            this.scope.width = this.image.nativeElement.width;
            this.save();
        }));
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
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            /** @type {?} */
            const img = new Image();
            img.onload = (/**
             * @return {?}
             */
            () => {
                resolve();
            });
            img.onerror = (/**
             * @return {?}
             */
            () => {
                reject();
            });
            img.src = src;
        }));
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ImgModel {
    /**
     * @param {?} wallFileUploader
     */
    constructor(wallFileUploader) {
        this.wallFileUploader = wallFileUploader;
    }
    /**
     * @param {?} brickSnapshot
     * @return {?}
     */
    remove(brickSnapshot) {
        /** @type {?} */
        const state = brickSnapshot.state;
        if (state.src && state.metadata && state.metadata.path) {
            return this.wallFileUploader.remove(state.metadata.path);
        }
        return Promise.resolve();
    }
}
ImgModel.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ImgModel.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [WALL_FILE_UPLOADER,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ImgBrickTextRepresentation {
    /**
     * @param {?} brickSnapshot
     */
    constructor(brickSnapshot) {
        this.brickSnapshot = brickSnapshot;
    }
    /**
     * @return {?}
     */
    getText() {
        return `img!${((/** @type {?} */ (this.brickSnapshot.state))).src}`;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ResizableHandlerComponent {
    constructor() {
        this.mouseDownEvent = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    mouseDown(event) {
        this.mouseDownEvent.emit(event);
    }
}
ResizableHandlerComponent.decorators = [
    { type: Component, args: [{
                template: `<span [ngClass]="customClassName"></span>`
            }] }
];
ResizableHandlerComponent.propDecorators = {
    customClassName: [{ type: Input }],
    mouseDownEvent: [{ type: Output }],
    mouseDown: [{ type: HostListener, args: ['mousedown', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const LEFT_HANDLER_CLASS = 'left-handler';
/** @type {?} */
const RIGHT_HANDLER_CLASS = 'right-handler';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * \@description
 * 1. dynamically add left and right handlers
 * 2. allow to show/hide handlers
 * 3. call callback, where to pass
 *  - distance on which handlers is moved
 *  - handler type (left of right)
 */
class ResizableDirective {
    /**
     * @param {?} el
     * @param {?} zone
     * @param {?} cfr
     * @param {?} doc
     */
    constructor(el, zone, cfr, doc) {
        this.el = el;
        this.zone = zone;
        this.cfr = cfr;
        this.doc = doc;
        this.resizeData = null;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const leftHandler = this.createHandler(LEFT_HANDLER_CLASS);
        /** @type {?} */
        const rightHandler = this.createHandler(RIGHT_HANDLER_CLASS);
        leftHandler.instance.mouseDownEvent.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            this.mouseDownHandler(e, true);
        }));
        rightHandler.instance.mouseDownEvent.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            this.mouseDownHandler(e, false);
        }));
        this.doc.addEventListener('mousemove', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            if (this.resizeData) {
                this.resizeData.xCurrent = event.clientX;
                if (this.resizeData.isLeftDirection) {
                    this.resizeData.offset = this.resizeData.xInitial - this.resizeData.xCurrent;
                }
                else if (this.resizeData.isRightDirection) {
                    this.resizeData.offset = this.resizeData.xCurrent - this.resizeData.xInitial;
                }
                if (this.wResizable.resize) {
                    this.wResizable.resize(this.resizeData);
                }
            }
        }));
        this.doc.addEventListener('mouseup', (/**
         * @return {?}
         */
        () => {
            if (this.wResizable.resizeEnd) {
                this.wResizable.resizeEnd(this.resizeData);
            }
            this.resizeData = null;
        }));
    }
    /**
     * @private
     * @param {?} customClassName
     * @return {?}
     */
    createHandler(customClassName) {
        /** @type {?} */
        const handler = this.el.createComponent(this.cfr.resolveComponentFactory(ResizableHandlerComponent));
        handler.instance.customClassName = customClassName;
        return handler;
    }
    /**
     * @private
     * @param {?} e
     * @param {?} isLeftDirection
     * @return {?}
     */
    mouseDownHandler(e, isLeftDirection) {
        e.preventDefault();
        e.stopPropagation();
        this.resizeData = {
            xInitial: e.clientX,
            xCurrent: e.clientX,
            offset: 0,
            isLeftDirection,
            isRightDirection: !isLeftDirection
        };
        if (this.wResizable.resizeStart) {
            this.wResizable.resizeStart(this.resizeData);
        }
    }
}
ResizableDirective.decorators = [
    { type: Directive, args: [{
                selector: '[wResizable]'
            },] }
];
/** @nocollapse */
ResizableDirective.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: NgZone },
    { type: ComponentFactoryResolver },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
ResizableDirective.propDecorators = {
    wResizable: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ResizableModule {
}
ResizableModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [ResizableDirective],
                declarations: [ResizableDirective, ResizableHandlerComponent],
                entryComponents: [ResizableHandlerComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ImgBrickModule {
    /**
     * @param {?} brickRegistry
     * @param {?} imgModel
     */
    constructor(brickRegistry, imgModel) {
        this.brickRegistry = brickRegistry;
        this.imgModel = imgModel;
        this.brickRegistry.register({
            tag: 'image',
            component: ImgBrickComponent,
            textRepresentation: ImgBrickTextRepresentation,
            destructor: (/**
             * @param {?} brickSnapshot
             * @return {?}
             */
            (brickSnapshot) => {
                return this.imgModel.remove(brickSnapshot);
            }),
            getBrickResourcePaths: (/**
             * @param {?} brickSnapshot
             * @return {?}
             */
            (brickSnapshot) => {
                /** @type {?} */
                const imageState = brickSnapshot.state;
                if (imageState.metadata && imageState.metadata.path) {
                    return [imageState.metadata.path];
                }
                return [];
            }),
            name: 'Image',
            description: 'Embed with a link'
        });
    }
}
ImgBrickModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    HelperComponentsModule,
                    ResizableModule,
                    TowModule,
                    StickyModalModule,
                    MatButtonModule,
                    MatInputModule,
                    MatFormFieldModule
                ],
                exports: [ImgBrickComponent],
                declarations: [ImgBrickComponent, InputContextComponent],
                entryComponents: [ImgBrickComponent, InputContextComponent],
                providers: [
                    ImgModel
                ]
            },] }
];
/** @nocollapse */
ImgBrickModule.ctorParameters = () => [
    { type: BrickRegistry },
    { type: ImgModel }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class QuoteBrickComponent extends BaseTextBrickComponent {
    constructor() {
        super(...arguments);
        this.placeholder = 'Quote';
    }
}
QuoteBrickComponent.decorators = [
    { type: Component, args: [{
                selector: 'quote-brick',
                template: "<div #editor\n     attr.placeholder=\"{{placeholder}}\"\n     (input)=\"onTextChange()\"\n     [(ngModel)]=\"scope.text\"\n     (keydown)=\"onKeyPress($event)\"\n     class=\"editor\"\n     contenteditable>\n</div>",
                styles: ["[contenteditable]{max-width:100%;width:100%;padding-left:1.25em;padding-right:1.25em;font-size:21px}[contenteditable]:focus{outline:0}[contenteditable]:empty:before{content:attr(placeholder)}"]
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class QuoteBrickModule {
    /**
     * @param {?} brickRegistry
     */
    constructor(brickRegistry) {
        this.brickRegistry = brickRegistry;
        this.brickRegistry.register({
            tag: 'quote',
            component: QuoteBrickComponent,
            supportText: true,
            textRepresentation: TextRepresentation,
            name: 'Quote',
            description: 'Capture a quote'
        });
    }
}
QuoteBrickModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    FormsModule,
                    ContenteditableModule
                ],
                exports: [QuoteBrickComponent],
                declarations: [QuoteBrickComponent],
                entryComponents: [QuoteBrickComponent]
            },] }
];
/** @nocollapse */
QuoteBrickModule.ctorParameters = () => [
    { type: BrickRegistry }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class InputContextComponent$1 {
    /**
     * @param {?} ngxStickyModalRef
     */
    constructor(ngxStickyModalRef) {
        this.ngxStickyModalRef = ngxStickyModalRef;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.srcInput.nativeElement.focus();
        }), 10);
    }
    /**
     * @return {?}
     */
    applySrc() {
        this.ngxStickyModalRef.close({
            src: this.srcInput.nativeElement.value
        });
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onSubmit(e) {
        e.preventDefault();
        this.applySrc();
    }
    /**
     * @return {?}
     */
    close() {
        this.ngxStickyModalRef.dismiss();
    }
}
InputContextComponent$1.decorators = [
    { type: Component, args: [{
                template: "<div class=\"w-context-panel w-brick-input mat-elevation-z4\">\n    <div class=\"w-brick-input__header\"></div>\n\n    <div class=\"w-brick-input__body\">\n        <a class=\"w-context-panel-close\" (click)=\"close()\">x</a>\n\n        <form (submit)=\"onSubmit($event)\">\n            <mat-form-field>\n                <input #src matInput placeholder=\"Paste the youtube video link\">\n            </mat-form-field>\n\n            <button mat-flat-button color=\"primary\" (click)=\"applySrc()\" type=\"button\">\n                Add video\n            </button>\n        </form>\n\n        <p class=\"w-brick-input__description\">\n            Youtube video\n        </p>\n    </div>\n\n    <div class=\"w-brick-input__footer\"></div>\n</div>\n",
                styles: ["button,mat-form-field{width:100%}:host .w-context-panel{position:relative}:host .w-context-panel-close{position:absolute;top:10px;right:10px;color:#333;text-decoration:none;cursor:pointer}"]
            }] }
];
/** @nocollapse */
InputContextComponent$1.ctorParameters = () => [
    { type: StickyModalRef }
];
InputContextComponent$1.propDecorators = {
    srcInput: [{ type: ViewChild, args: ['src',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class VideoBrickComponent {
    /**
     * @param {?} renderer2
     * @param {?} el
     * @param {?} componentFactoryResolver
     * @param {?} ngxStickyModalService
     */
    constructor(renderer2, el, componentFactoryResolver, ngxStickyModalService) {
        this.renderer2 = renderer2;
        this.el = el;
        this.componentFactoryResolver = componentFactoryResolver;
        this.ngxStickyModalService = ngxStickyModalService;
        this.stateChanges = new EventEmitter();
        // ui
        this.uiStates = {
            initial: 'initial',
            video: 'video'
        };
        this.uiState = this.uiStates.initial;
        this.scope = {
            src: ''
        };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.state && this.state.src !== this.scope.src) {
            this.scope.src = this.state.src;
            if (this.scope.src) {
                this.uiState = this.uiStates.video;
                setTimeout((/**
                 * @return {?}
                 */
                () => {
                    this.renderer2.setAttribute(this.iframe.nativeElement, 'src', this.scope.src);
                }), 10);
            }
        }
    }
    /**
     * @param {?} newState
     * @return {?}
     */
    onWallStateChange(newState) {
        if (newState && newState.src !== this.scope.src) {
            this.scope.src = newState.src;
            if (this.scope.src) {
                this.uiState = this.uiStates.video;
                setTimeout((/**
                 * @return {?}
                 */
                () => {
                    this.renderer2.setAttribute(this.iframe.nativeElement, 'src', this.scope.src);
                }), 10);
            }
        }
    }
    /**
     * @return {?}
     */
    onWallFocus() {
        if (this.uiState === this.uiStates.initial && !this.videoSrcPlaceholderRef) {
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.showVideoPanel();
            }), 0);
        }
    }
    /**
     * @param {?} src
     * @return {?}
     */
    applySrc(src) {
        this.uiState = this.uiStates.initial;
        if (src.length) {
            /** @type {?} */
            const srcArray = src.split('=');
            /** @type {?} */
            const youtubeId = srcArray[1];
            if (youtubeId) {
                this.scope.src = `https://www.youtube.com/embed/${youtubeId}`;
                this.renderer2.setAttribute(this.iframe.nativeElement, 'src', this.scope.src);
                this.save();
                this.uiState = this.uiStates.video;
            }
        }
    }
    /**
     * @return {?}
     */
    showVideoPanel() {
        /** @type {?} */
        const modalConfig = getModalConfig(this.el, this.componentFactoryResolver, InputContextComponent$1);
        this.videoSrcPlaceholderRef = this.ngxStickyModalService.open(modalConfig);
        this.videoSrcPlaceholderRef.result.then((/**
         * @param {?} result
         * @return {?}
         */
        (result) => {
            this.videoSrcPlaceholderRef = null;
            this.applySrc(result.src);
        }), (/**
         * @return {?}
         */
        () => {
            this.videoSrcPlaceholderRef = null;
        }));
    }
    /**
     * @private
     * @return {?}
     */
    save() {
        this.stateChanges.emit(this.scope);
    }
}
VideoBrickComponent.decorators = [
    { type: Component, args: [{
                selector: 'video-brick',
                template: "<iframe height=\"400\" [hidden]=\"uiState !== uiStates.video\" #iframe frameborder=\"0\" allowfullscreen></iframe>\n\n<w-brick-input-placeholder\n    [text]=\"'Add a Video'\"\n    [icon]=\"'music_video'\"\n    [hidden]=\"uiState === uiStates.video\" (selected)=\"showVideoPanel()\">\n</w-brick-input-placeholder>\n",
                styles: [":host{position:relative;display:block}:host iframe{width:100%}"]
            }] }
];
/** @nocollapse */
VideoBrickComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: ComponentFactoryResolver },
    { type: StickyModalService }
];
VideoBrickComponent.propDecorators = {
    id: [{ type: Input }],
    state: [{ type: Input }],
    stateChanges: [{ type: Output }],
    iframe: [{ type: ViewChild, args: ['iframe',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class VideoBrickTextRepresentationClass {
    /**
     * @param {?} brickSnapshot
     */
    constructor(brickSnapshot) {
        this.brickSnapshot = brickSnapshot;
    }
    /**
     * @return {?}
     */
    getText() {
        return `video!${((/** @type {?} */ (this.brickSnapshot.state))).src}`;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class VideoBrickModule {
    /**
     * @param {?} brickRegistry
     */
    constructor(brickRegistry) {
        this.brickRegistry = brickRegistry;
        this.brickRegistry.register({
            tag: 'video',
            component: VideoBrickComponent,
            textRepresentation: VideoBrickTextRepresentationClass,
            name: 'Video',
            description: 'Embed from Youtube and more'
        });
    }
}
VideoBrickModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    StickyModalModule,
                    HelperComponentsModule,
                    MatButtonModule,
                    MatInputModule,
                    MatFormFieldModule
                ],
                exports: [VideoBrickComponent],
                declarations: [VideoBrickComponent, InputContextComponent$1],
                entryComponents: [VideoBrickComponent, InputContextComponent$1]
            },] }
];
/** @nocollapse */
VideoBrickModule.ctorParameters = () => [
    { type: BrickRegistry }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class InputContextComponent$2 {
    /**
     * @param {?} ngxStickyModalRef
     */
    constructor(ngxStickyModalRef) {
        this.ngxStickyModalRef = ngxStickyModalRef;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.srcInput.nativeElement.focus();
        }), 10);
    }
    /**
     * @return {?}
     */
    applySrc() {
        this.ngxStickyModalRef.close({
            src: this.srcInput.nativeElement.value
        });
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onSubmit(e) {
        e.preventDefault();
        this.applySrc();
    }
    /**
     * @return {?}
     */
    close() {
        this.ngxStickyModalRef.dismiss();
    }
}
InputContextComponent$2.decorators = [
    { type: Component, args: [{
                template: "<div class=\"w-context-panel w-brick-input mat-elevation-z4\">\n    <div class=\"w-brick-input__body\">\n        <a class=\"w-context-panel-close\" (click)=\"close()\">x</a>\n\n        <form (submit)=\"onSubmit($event)\">\n            <mat-form-field>\n                <input #src matInput placeholder=\"Paste in https://...\">\n            </mat-form-field>\n\n            <button mat-flat-button color=\"primary\" (click)=\"applySrc()\" type=\"button\">\n                Create Bookmark\n            </button>\n        </form>\n\n        <p class=\"w-brick-input__description\">\n            Create a visual bookmark from a link...\n        </p>\n    </div>\n</div>\n",
                styles: ["button,mat-form-field{width:100%}:host .w-context-panel{position:relative}:host .w-context-panel-close{position:absolute;top:10px;right:10px;color:#333;text-decoration:none;cursor:pointer}"]
            }] }
];
/** @nocollapse */
InputContextComponent$2.ctorParameters = () => [
    { type: StickyModalRef }
];
InputContextComponent$2.propDecorators = {
    srcInput: [{ type: ViewChild, args: ['src',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WebBookmarkBrickComponent {
    /**
     * @param {?} el
     * @param {?} componentFactoryResolver
     * @param {?} ngxStickyModalService
     */
    constructor(el, componentFactoryResolver, ngxStickyModalService) {
        this.el = el;
        this.componentFactoryResolver = componentFactoryResolver;
        this.ngxStickyModalService = ngxStickyModalService;
        this.stateChanges = new EventEmitter();
        this.scope = {
            src: null,
            description: null,
            image: {
                height: null,
                width: null,
                url: null
            },
            logo: {
                height: null,
                width: null,
                url: null
            },
            title: null,
            author: null
        };
        this.loading = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        Object.assign(this.scope, this.state);
    }
    /**
     * @param {?} newState
     * @return {?}
     */
    onWallStateChange(newState) {
        if (newState && newState.src !== this.scope.src) {
            Object.assign(this.scope, this.state);
        }
    }
    /**
     * @param {?} src
     * @return {?}
     */
    applySrc(src) {
        if (src.length) {
            if (this.isValidUrl(src)) {
                this.loading = true;
                this.getWebPageMetaInfo(src).then((/**
                 * @param {?} webPageMetaInfo
                 * @return {?}
                 */
                (webPageMetaInfo) => {
                    Object.assign(this.scope, webPageMetaInfo);
                    this.scope.src = src;
                    this.save();
                    this.loading = false;
                }), (/**
                 * @return {?}
                 */
                () => {
                    this.loading = false;
                }));
            }
            else {
                alert('Url is invalid');
            }
        }
    }
    /**
     * @return {?}
     */
    showPanel() {
        if (!this.loading) {
            /** @type {?} */
            const modalConfig = getModalConfig(this.el, this.componentFactoryResolver, InputContextComponent$2);
            this.modalRef = this.ngxStickyModalService.open(modalConfig);
            this.modalRef.result.then((/**
             * @param {?} result
             * @return {?}
             */
            result => {
                this.modalRef = null;
                this.applySrc(result.src);
            }), (/**
             * @return {?}
             */
            () => {
                this.modalRef = null;
            }));
        }
    }
    /**
     * @return {?}
     */
    onWallFocus() {
        if (!this.scope.src) {
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.showPanel();
            }), 0);
        }
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
     * @param {?} url
     * @return {?}
     */
    getWebPageMetaInfo(url) {
        return fetch(`https://api.microlink.io/?url=${url}`).then((/**
         * @param {?} page
         * @return {?}
         */
        (page) => {
            return page.json().then((/**
             * @param {?} pageMetadata
             * @return {?}
             */
            (pageMetadata) => {
                const { image, description, logo, title, author } = pageMetadata.data;
                return {
                    image,
                    description,
                    logo,
                    title,
                    author
                };
            }));
        }));
    }
    /**
     * @private
     * @param {?} src
     * @return {?}
     */
    isValidUrl(src) {
        /** @type {?} */
        let url;
        try {
            url = new URL(src);
        }
        catch (e) {
        }
        return Boolean(url);
    }
}
WebBookmarkBrickComponent.decorators = [
    { type: Component, args: [{
                selector: 'web-bookmark-brick',
                template: "<w-brick-input-placeholder\n    [text]=\"'Add a Web Bookmark'\"\n    [icon]=\"'link'\"\n    [loading]=\"loading\"\n    *ngIf=\"!scope.src\"\n    (selected)=\"showPanel()\">\n</w-brick-input-placeholder>\n\n<div *ngIf=\"scope.src\" class=\"web-bookmark\">\n    <a [href]=\"scope.src\" class=\"web-bookmark__content\" target=\"_blank\" [title]=\"scope.src\">\n        <p class=\"web-bookmark__title\">{{scope.title}}</p>\n        <p class=\"web-bookmark__description\">{{scope.description}}</p>\n\n        <div class=\"web-bookmark__link\">\n            <img *ngIf=\"scope.logo\" [src]=\"scope.logo.url\" alt=\"scope.title\">\n            <p>{{scope.src}}</p>\n        </div>\n    </a>\n\n    <div class=\"web-bookmark__img\" [tow-slave]=\"id\" [style.backgroundImage]=\"'url('+ scope.image?.url +')'\">\n    </div>\n</div>\n",
                styles: [":host{position:relative;display:block}:host .web-bookmark{display:flex;height:6rem;overflow:hidden;outline:silver solid 1px;margin:.3rem 0}:host .web-bookmark:hover{cursor:pointer}:host .web-bookmark__content{width:70%;border-right:none;text-decoration:none;margin:.4rem .7rem;border-radius:2px;overflow:hidden}:host .web-bookmark__title{margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .web-bookmark__description{overflow:hidden;height:2.4rem;margin-bottom:.3rem}:host .web-bookmark__link{display:flex;align-items:center}:host .web-bookmark__link img{width:18px;height:18px;-o-object-fit:cover;object-fit:cover;margin-right:.4rem}:host .web-bookmark__link p{overflow:hidden;margin:0;height:1.2rem}:host .web-bookmark__img{width:30%;background-position:center center;background-size:cover}"]
            }] }
];
/** @nocollapse */
WebBookmarkBrickComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ComponentFactoryResolver },
    { type: StickyModalService }
];
WebBookmarkBrickComponent.propDecorators = {
    id: [{ type: Input }],
    state: [{ type: Input }],
    stateChanges: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WebBookmarkBrickModule {
    /**
     * @param {?} brickRegistry
     */
    constructor(brickRegistry) {
        this.brickRegistry = brickRegistry;
        this.brickRegistry.register({
            tag: 'webbookmark',
            component: WebBookmarkBrickComponent,
            textRepresentation: VideoBrickTextRepresentationClass,
            name: 'Web Bookmark',
            description: 'Save a link as a visual bookmark'
        });
    }
}
WebBookmarkBrickModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    StickyModalModule,
                    HelperComponentsModule,
                    TowModule,
                    MatButtonModule,
                    MatInputModule,
                    MatFormFieldModule
                ],
                exports: [
                    WebBookmarkBrickComponent
                ],
                declarations: [
                    InputContextComponent$2,
                    WebBookmarkBrickComponent
                ],
                entryComponents: [
                    InputContextComponent$2,
                    WebBookmarkBrickComponent
                ],
                providers: []
            },] }
];
/** @nocollapse */
WebBookmarkBrickModule.ctorParameters = () => [
    { type: BrickRegistry }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const SUPPORTED_MODES = [
    {
        value: 'javascript',
        name: 'Javascript'
    },
    {
        value: 'shell',
        name: 'Shell'
    },
    {
        value: 'xml',
        name: 'XML'
    }
];
/** @type {?} */
const DEFAULT_THEME = 'neo';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ModeListComponent {
    /**
     * @param {?} config
     * @param {?} ngxStickyModalRef
     */
    constructor(config, ngxStickyModalRef) {
        this.config = config;
        this.ngxStickyModalRef = ngxStickyModalRef;
    }
    /**
     * @param {?} mode
     * @return {?}
     */
    onSelected(mode) {
        this.ngxStickyModalRef.close(mode);
    }
}
ModeListComponent.decorators = [
    { type: Component, args: [{
                selector: 'w-mode-list-component',
                template: "<div class=\"w-context-panel mat-elevation-z4\">\n    <mat-action-list>\n        <button mat-list-item *ngFor=\"let mode of config.modes\" (click)=\"onSelected(mode)\">\n            {{mode.name}}\n        </button>\n    </mat-action-list>\n</div>\n"
            }] }
];
/** @nocollapse */
ModeListComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [STICKY_MODAL_DATA,] }] },
    { type: StickyModalRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CodeBrickComponent {
    /**
     * @param {?} ngxStickyModalService
     * @param {?} componentFactoryResolver
     */
    constructor(ngxStickyModalService, componentFactoryResolver) {
        this.ngxStickyModalService = ngxStickyModalService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.scope = {
            code: '',
            mode: SUPPORTED_MODES[0].value
        };
        this.ui = {
            displayModeName: SUPPORTED_MODES[0].name
        };
        this.stateChanges = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        Object.assign(this.scope, this.state);
        this.codeMirrorInstance = CodeMirror(this.container.nativeElement, {
            value: ``,
            mode: this.scope.mode,
            theme: DEFAULT_THEME,
            dragDrop: false,
            scrollbarStyle: null
        });
        this.codeMirrorInstance.on('change', (/**
         * @return {?}
         */
        () => {
            this.scope.code = this.codeMirrorInstance.getValue();
            this.saveState();
        }));
        this.processNewState();
    }
    /**
     * @param {?} newState
     * @return {?}
     */
    onWallStateChange(newState) {
        if (newState && newState.code !== this.scope.code) {
            Object.assign(this.scope, this.state);
            this.processNewState();
        }
    }
    /**
     * @return {?}
     */
    processNewState() {
        this.codeMirrorInstance.setValue(this.scope.code);
        if (this.scope.mode !== this.codeMirrorInstance.getMode().name) {
            this.codeMirrorInstance.setOption('mode', this.scope.mode);
        }
        this.ui.displayModeName = SUPPORTED_MODES.find((/**
         * @param {?} mode
         * @return {?}
         */
        (mode) => mode.value === this.scope.mode)).name;
    }
    /**
     * @return {?}
     */
    saveState() {
        this.stateChanges.emit(this.scope);
    }
    /**
     * @return {?}
     */
    onModeSelected() {
        /** @type {?} */
        const elementBoundingRect = this.mode.nativeElement.getBoundingClientRect();
        /** @type {?} */
        const modes = SUPPORTED_MODES.map((/**
         * @param {?} mode
         * @return {?}
         */
        (mode) => {
            return Object.assign({}, mode, { selected: mode.value === this.scope.mode });
        }));
        this.ngxStickyModalService.open({
            component: ModeListComponent,
            data: { modes },
            positionStrategy: {
                name: StickyPositionStrategy.coordinate,
                options: {
                    clientX: elementBoundingRect.x,
                    clientY: elementBoundingRect.y + 35
                }
            },
            componentFactoryResolver: this.componentFactoryResolver
        }).result.then((/**
         * @param {?} mode
         * @return {?}
         */
        (mode) => {
            Object.assign(this.scope, Object.assign({}, this.state, { mode: mode.value }));
            this.processNewState();
        }), (/**
         * @return {?}
         */
        () => {
            // nothing
        }));
    }
}
CodeBrickComponent.decorators = [
    { type: Component, args: [{
                selector: 'code-brick',
                template: "<div #container></div>\n\n<button #mode (click)=\"onModeSelected()\" mat-button>{{ui.displayModeName}}</button>\n",
                styles: ["::ng-deep .CodeMirror{padding:1rem 1.4rem;height:auto}::ng-deep .CodeMirror .CodeMirror-cursor{width:1px}::ng-deep .CodeMirror .CodeMirror-scroll{overflow:hidden!important}.mat-button{position:absolute;right:.7rem;bottom:.7rem;z-index:2}"]
            }] }
];
/** @nocollapse */
CodeBrickComponent.ctorParameters = () => [
    { type: StickyModalService },
    { type: ComponentFactoryResolver }
];
CodeBrickComponent.propDecorators = {
    id: [{ type: Input }],
    state: [{ type: Input }],
    container: [{ type: ViewChild, args: ['container', { read: ElementRef },] }],
    mode: [{ type: ViewChild, args: ['mode', { read: ElementRef },] }],
    stateChanges: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CodeBrickModule {
    /**
     * @param {?} brickRegistry
     */
    constructor(brickRegistry) {
        this.brickRegistry = brickRegistry;
        this.brickRegistry.register({
            tag: 'code',
            component: CodeBrickComponent,
            name: 'Code',
            description: 'Capture a code snippet'
        });
    }
}
CodeBrickModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    WallModule,
                    HelperComponentsModule,
                    StickyModalModule,
                    MatButtonModule,
                    MatListModule
                ],
                declarations: [
                    CodeBrickComponent,
                    ModeListComponent
                ],
                entryComponents: [
                    CodeBrickComponent,
                    ModeListComponent
                ]
            },] }
];
/** @nocollapse */
CodeBrickModule.ctorParameters = () => [
    { type: BrickRegistry }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const TEXT_BRICK_TAG = 'text';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BricksListComponent {
    /**
     * @param {?} brickRegistry
     * @param {?} config
     */
    constructor(brickRegistry, config) {
        this.brickRegistry = brickRegistry;
        this.config = config;
        this.selectedTag$ = new BehaviorSubject(null);
        this.bricksList$ = new BehaviorSubject([]);
        this.subscriptions = [];
        this.updateBricksList('');
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.subscriptions.push(this.config.text$.subscribe((/**
         * @param {?} filterText
         * @return {?}
         */
        (filterText) => {
            this.updateBricksList(filterText.slice(1));
        })));
        this.subscriptions.push(this.config.up$.subscribe((/**
         * @return {?}
         */
        () => {
            this.onNavigationUpDownHandler(true);
        })));
        this.subscriptions.push(this.config.down$.subscribe((/**
         * @return {?}
         */
        () => {
            this.onNavigationUpDownHandler(false);
        })));
        this.subscriptions.push(this.config.enter$.subscribe((/**
         * @return {?}
         */
        () => {
            this.notifySelectedTag();
        })));
    }
    /**
     * @param {?} brickDescription
     * @return {?}
     */
    onBrickSelected(brickDescription) {
        this.selectedTag$.next(brickDescription.tag);
        this.notifySelectedTag();
    }
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    trackByFn(index, item) {
        return item.tag;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach((/**
         * @param {?} subscription
         * @return {?}
         */
        (subscription) => {
            subscription.unsubscribe();
        }));
    }
    /**
     * @private
     * @return {?}
     */
    notifySelectedTag() {
        this.config.selectedTag$.next(this.selectedTag$.getValue());
    }
    /**
     * @private
     * @param {?} filterText
     * @return {?}
     */
    updateBricksList(filterText) {
        /** @type {?} */
        const brickDescriptors = this.brickRegistry.getAll()
            .filter((/**
         * @param {?} brickDescriptor
         * @return {?}
         */
        (brickDescriptor) => {
            if (brickDescriptor.tag === TEXT_BRICK_TAG) {
                return false;
            }
            else {
                return brickDescriptor.tag.includes(filterText);
            }
        })).sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        (a, b) => {
            if (a.tag.startsWith(filterText)) {
                return -1;
            }
            else if (b.tag.startsWith(filterText)) {
                return 1;
            }
            else {
                return 0;
            }
        }));
        if (brickDescriptors.length) {
            this.selectedTag$.next(brickDescriptors[0].tag);
        }
        else {
            this.selectedTag$.next(null);
        }
        this.bricksList$.next(brickDescriptors);
    }
    /**
     * @private
     * @param {?} isUp
     * @return {?}
     */
    onNavigationUpDownHandler(isUp) {
        /** @type {?} */
        const currentSelectedTag = this.selectedTag$.getValue();
        /** @type {?} */
        const currentBrickList = this.bricksList$.getValue();
        if (currentSelectedTag && currentBrickList.length > 1) {
            /** @type {?} */
            const currentSelectedBrickIndex = currentBrickList.findIndex((/**
             * @param {?} brickDescriptor
             * @return {?}
             */
            (brickDescriptor) => {
                return brickDescriptor.tag === currentSelectedTag;
            }));
            /** @type {?} */
            let nextSelectedBrick;
            if (isUp) {
                nextSelectedBrick = currentBrickList[currentSelectedBrickIndex - 1];
                if (!nextSelectedBrick) {
                    // take last brick
                    nextSelectedBrick = currentBrickList[currentBrickList.length - 1];
                }
            }
            else {
                // is bottom
                nextSelectedBrick = currentBrickList[currentSelectedBrickIndex + 1];
                if (!nextSelectedBrick) {
                    // take first brick
                    nextSelectedBrick = currentBrickList[0];
                }
            }
            this.selectedTag$.next(nextSelectedBrick.tag);
            // wait until component re-renders
            setTimeout((/**
             * @return {?}
             */
            () => {
                document.getElementsByClassName('w-bricks-list__selected')[0].scrollIntoView();
            }));
        }
    }
}
BricksListComponent.decorators = [
    { type: Component, args: [{
                selector: 'w-bricks-list',
                template: "<div class=\"w-context-panel w-bricks-list mat-elevation-z4\">\n    <mat-list>\n        <mat-list-item *ngFor=\"let brickDescription of bricksList$ | async; trackBy: trackByFn\"\n                       [ngClass]=\"{'w-bricks-list__selected': (selectedTag$ | async) === brickDescription.tag}\"\n                       (click)=\"onBrickSelected(brickDescription)\">\n            <p mat-line>\n                {{brickDescription.name}}\n            </p>\n            <p mat-line>\n                {{brickDescription.description}}\n            </p>\n        </mat-list-item>\n    </mat-list>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
BricksListComponent.ctorParameters = () => [
    { type: BrickRegistry },
    { type: undefined, decorators: [{ type: Inject, args: [STICKY_MODAL_DATA,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NodeTreeSplit {
    /**
     * @param {?} root
     * @param {?} targetElement
     * @param {?} offset
     */
    constructor(root, targetElement, // text node
    offset) {
        this.root = root;
        this.targetElement = targetElement;
        this.offset = offset;
        if (root === targetElement) {
            // edge case scenario, just return root node itself
            this.leftTree = (/** @type {?} */ (root));
            this.rightTree = (/** @type {?} */ (root));
        }
        else {
            // get direct parent of target node
            /** @type {?} */
            let parent = targetElement.parentNode;
            // create left and right trees which will be returned as result
            /** @type {?} */
            let rightTree = parent.cloneNode(false);
            /** @type {?} */
            let leftTree = parent.cloneNode(false);
            // Build Right tree
            // as soon as targetElement is a Text Node, split text of that node using offset
            rightTree.appendChild(document.createTextNode(targetElement.textContent.slice(offset)));
            // parent node could contains other Nodes besides target node
            // add all next siblings of target node to the right tree
            this.appendNextSiblingsToNode(rightTree, targetElement);
            // Build Left tree
            // as soon as targetElement is a Text Node, split text of that node using offset
            leftTree.appendChild(document.createTextNode(targetElement.textContent.slice(0, offset)));
            // parent node could contains other Nodes besides target node
            // add all previous siblings of target node to the left tree
            this.prependPreviousSiblingsToNode(leftTree, targetElement);
            if (root === parent) {
                // we already fully build left and right trees
                this.leftTree = (/** @type {?} */ (leftTree));
                this.rightTree = (/** @type {?} */ (rightTree));
            }
            else {
                // recursively build left and right trees
                // climbing from parent node to the root node
                /** @type {?} */
                let leftParentTree;
                /** @type {?} */
                let rightParentTree;
                /** @type {?} */
                let grandparent = parent.parentNode;
                while (root.contains(grandparent) || grandparent === root) {
                    rightParentTree = grandparent.cloneNode(false);
                    leftParentTree = grandparent.cloneNode(false);
                    // Process Left tree
                    this.prependPreviousSiblingsToNode(leftParentTree, parent);
                    leftParentTree.appendChild(leftTree);
                    leftTree = leftParentTree;
                    // Process Right tree
                    this.appendNextSiblingsToNode(rightParentTree, parent);
                    rightParentTree.prepend(rightTree);
                    rightTree = rightParentTree;
                    parent = grandparent;
                    grandparent = grandparent.parentNode;
                }
                this.leftTree = (/** @type {?} */ (leftTree));
                this.rightTree = (/** @type {?} */ (rightTree));
            }
        }
    }
    /**
     * @private
     * @param {?} leftTree
     * @param {?} targetNode
     * @return {?}
     */
    prependPreviousSiblingsToNode(leftTree, targetNode) {
        /** @type {?} */
        let previousSibling = targetNode.previousSibling;
        while (previousSibling) {
            leftTree.prepend(previousSibling.cloneNode(true));
            previousSibling = previousSibling.previousSibling;
        }
    }
    /**
     * @private
     * @param {?} rightTree
     * @param {?} targetElement
     * @return {?}
     */
    appendNextSiblingsToNode(rightTree, targetElement) {
        /** @type {?} */
        let nextSibling = targetElement.nextSibling;
        while (nextSibling) {
            rightTree.appendChild(nextSibling.cloneNode(true));
            nextSibling = nextSibling.nextSibling;
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TreeNodeTraverse {
    /**
     * @param {?} root
     */
    constructor(root) {
        this.root = root;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    traversePostOrder(fn) {
        this._traversePostOrder(this.root, fn);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    traversePreOrder(fn) {
        this._traversePreOrder(this.root, fn);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    traversePostPreOrder(fn) {
        this._traversePostPreOrder(this.root, fn);
    }
    /**
     * @return {?}
     */
    getPreOrderNodes() {
        /** @type {?} */
        const nodes = [];
        this.traversePreOrder((/**
         * @param {?} node
         * @return {?}
         */
        (node) => {
            nodes.push(node);
        }));
        return nodes;
    }
    /**
     * @return {?}
     */
    getPostOrderNodes() {
        /** @type {?} */
        const nodes = [];
        this.traversePostOrder((/**
         * @param {?} node
         * @return {?}
         */
        (node) => {
            nodes.push(node);
        }));
        return nodes;
    }
    /**
     * @return {?}
     */
    getPostPreOrderNodes() {
        /** @type {?} */
        const nodes = [];
        this.traversePostPreOrder((/**
         * @param {?} node
         * @return {?}
         */
        (node) => {
            nodes.push(node);
        }));
        return nodes;
    }
    /**
     * @private
     * @param {?} node
     * @param {?} fn
     * @return {?}
     */
    _traversePostOrder(node, fn) {
        Array.from(node.childNodes).forEach((/**
         * @param {?} childNode
         * @return {?}
         */
        (childNode) => {
            if (childNode.childNodes && childNode.childNodes.length) {
                this._traversePostOrder(childNode, fn);
            }
            fn(childNode);
        }));
    }
    /**
     * @private
     * @param {?} node
     * @param {?} fn
     * @return {?}
     */
    _traversePreOrder(node, fn) {
        Array.from(node.childNodes).forEach((/**
         * @param {?} childNode
         * @return {?}
         */
        (childNode) => {
            fn(childNode);
            if (childNode.childNodes && childNode.childNodes.length) {
                this._traversePreOrder(childNode, fn);
            }
        }));
    }
    /**
     * @private
     * @param {?} node
     * @param {?} fn
     * @return {?}
     */
    _traversePostPreOrder(node, fn) {
        Array.from(node.childNodes).forEach((/**
         * @param {?} childNode
         * @return {?}
         */
        (childNode) => {
            fn(childNode);
            if (childNode.childNodes && childNode.childNodes.length) {
                this._traversePostPreOrder(childNode, fn);
            }
            fn(childNode);
        }));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TextContextMenuComponent {
    /**
     * @param {?} config
     */
    constructor(config) {
        this.config = config;
        this.ui = {
            showLinkForm: false
        };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.config.api.saveSelection();
    }
    /**
     * @return {?}
     */
    bold() {
        this.config.api.bold();
    }
    /**
     * @return {?}
     */
    italic() {
        this.config.api.italic();
    }
    /**
     * @return {?}
     */
    link() {
        this.switchLinkFormVisibility();
        if (this.ui.showLinkForm) {
            this.config.api.saveSelection();
            setTimeout((/**
             * @return {?}
             */
            () => {
                if (this.config.api.isLinkSelected()) {
                    this.linkEl.nativeElement.value = this.config.api.getSelectedLinkHref();
                }
                this.linkEl.nativeElement.focus();
            }));
        }
        else {
            this.config.api.restoreSelection();
        }
    }
    /**
     * @return {?}
     */
    applyLink() {
        this.config.api.restoreSelection();
        if (this.config.api.isLinkSelected()) {
            this.config.api.changeLinkUrl(this.linkEl.nativeElement.value);
        }
        else {
            this.config.api.createLink(this.linkEl.nativeElement.value);
        }
        this.switchLinkFormVisibility();
    }
    /**
     * @return {?}
     */
    unlink() {
        this.config.api.restoreSelection();
        this.config.api.unlink();
        this.switchLinkFormVisibility();
    }
    /**
     * @return {?}
     */
    switchLinkFormVisibility() {
        this.ui.showLinkForm = !this.ui.showLinkForm;
    }
}
TextContextMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'w-text-context-menu',
                template: "<div class=\"w-context-panel w-text-context-menu-panel mat-elevation-z4\">\n    <div>\n        <button [ngClass]=\"{'w-text-context-menu__selected-link': config.api.isLinkSelected()}\"\n                mat-button\n                (click)=\"link()\">\n            Link\n        </button>\n\n        <button mat-button (click)=\"bold()\">Bold</button>\n        <button mat-button (click)=\"italic()\">Italic</button>\n    </div>\n\n    <div>\n        <form *ngIf=\"ui.showLinkForm\" (submit)=\"applyLink()\">\n            <mat-form-field>\n                <input #linkEl #src matInput placeholder=\"Paste the url\">\n            </mat-form-field>\n\n            <div>\n                <button (click)=\"applyLink()\"\n                        type=\"button\"\n                        mat-button>\n                    Link\n                </button>\n\n                <button *ngIf=\"config.api.isLinkSelected()\"\n                        (click)=\"unlink()\"\n                        type=\"button\"\n                        mat-button>\n                    Unlink\n                </button>\n            </div>\n        </form>\n    </div>\n</div>\n"
            }] }
];
/** @nocollapse */
TextContextMenuComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [STICKY_MODAL_DATA,] }] }
];
TextContextMenuComponent.propDecorators = {
    linkEl: [{ type: ViewChild, args: ['linkEl',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TextBrickComponent extends BaseTextBrickComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TextBrickModule {
    /**
     * @param {?} brickRegistry
     */
    constructor(brickRegistry) {
        this.brickRegistry = brickRegistry;
        this.brickRegistry.register({
            tag: 'text',
            component: TextBrickComponent,
            supportText: true,
            textRepresentation: TextRepresentation,
            name: 'Text',
            description: 'Just start writing with plain text'
        });
    }
}
TextBrickModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    FormsModule,
                    CommonModule,
                    ContenteditableModule,
                    HelperComponentsModule,
                    StickyModalModule,
                    MatButtonModule,
                    MatInputModule,
                    MatFormFieldModule,
                    MatListModule,
                    MatIconModule
                ],
                exports: [
                    TextBrickComponent,
                    BricksListComponent,
                    TextContextMenuComponent
                ],
                declarations: [
                    TextBrickComponent,
                    BricksListComponent,
                    // context menu
                    TextContextMenuComponent
                ],
                entryComponents: [
                    TextBrickComponent,
                    BricksListComponent,
                    // context menu
                    TextContextMenuComponent
                ]
            },] }
];
/** @nocollapse */
TextBrickModule.ctorParameters = () => [
    { type: BrickRegistry }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LocationToTopLeftPointEvent {
    /**
     * @param {?} spots
     */
    constructor(spots) {
        this.spots = spots;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LocationToLeftCenterPointEvent {
    /**
     * @param {?} spots
     */
    constructor(spots) {
        this.spots = spots;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AddBrickEvent, BeforeChangeEvent, BrickRegistry, CodeBrickModule, CopyPlugin, DIVIDER_BRICK_TAG, DividerBrickModule, EndPickOut, HeaderBrickComponent, HeaderBrickModule, HelperComponentsModule, ImgBrickComponent, ImgBrickModule, LocationToLeftCenterPointEvent, LocationToTopLeftPointEvent, LocationUpdatedEvent, MoveBrickEvent, PickOutAreaComponent, PickOutAreaDirective, PickOutItems, PickOutModule, PickOutService, QuoteBrickModule, Radar, RadarModule, RemoveBrickEvent, RemoveBricksEvent, SelectedBrickEvent, SelectionPlugin, SetPlanEvent, SpotDirective, SpotModel, StartPickOut, StartWorkingEvent, StopPickOut, StopWorkingEvent, TOW, TextBrickComponent, TextBrickModule, TowModule, TowService, TurnBrickIntoEvent, UNDO_REDO_API_NAME, UndoRedoPlugin, UpdateBrickStateEvent, VideoBrickModule, WALL, WALL_FILE_UPLOADER, WallModelFactory, WallModule, WallPluginInitializedEvent, WebBookmarkBrickModule, WorkInProgressEvent, RadarCoordinator as ɵa, PickOutCoordinator as ɵb, WebBookmarkBrickComponent as ɵba, InputContextComponent$2 as ɵbb, CodeBrickComponent as ɵbc, ModeListComponent as ɵbd, BricksListComponent as ɵbe, TextContextMenuComponent as ɵbf, TowSlaveDirective as ɵc, TowCoordinator as ɵd, PlaceholderRendererModule as ɵe, PlaceholderComponent as ɵf, PlaceholderRenderer as ɵg, WallComponent as ɵh, WallViewModel as ɵi, WallCanvasComponent as ɵj, WallCanvasRowComponent as ɵk, WallCanvasBrickComponent as ɵl, BrickInputPlaceholderComponent as ɵm, LoadingWrapperComponent as ɵn, DividerBrickComponent as ɵo, ContenteditableModule as ɵp, ContenteditableDirective as ɵq, BaseTextBrickComponent as ɵr, ResizableModule as ɵs, ResizableDirective as ɵt, ResizableHandlerComponent as ɵu, InputContextComponent as ɵv, ImgModel as ɵw, QuoteBrickComponent as ɵx, VideoBrickComponent as ɵy, InputContextComponent$1 as ɵz };
//# sourceMappingURL=ngx-wall.js.map
