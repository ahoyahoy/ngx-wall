/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
import { Guid } from '../../../modules/utils/utils';
import { WallBrick } from '../../model/wall-brick.model';
import { AddBrickEvent } from './events/add-brick.event';
import { BeforeChangeEvent } from './events/before-change.event';
import { MoveBrickEvent } from './events/move-brick.event';
import { RemoveBrickEvent } from './events/remove-brick.event';
import { RemoveBricksEvent } from './events/remove-bricks.event';
import { SetPlanEvent } from './events/set-plan.event';
import { TurnBrickIntoEvent } from './events/turn-brick-into.event';
import { UpdateBrickStateEvent } from './events/update-brick-state.event';
import { LayoutWalker } from './layout-walker.class';
import { WallLayout } from './wall-layout.model';
/*
* Contains Wall data structure and registers API for data manipulation.
* Responsible to IWallDefinition->Layout and Layout->IWallDefinition transformation
* */
export class WallCorePlugin {
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
if (false) {
    /** @type {?} */
    WallCorePlugin.prototype.name;
    /** @type {?} */
    WallCorePlugin.prototype.version;
    /**
     * @type {?}
     * @private
     */
    WallCorePlugin.prototype.layout;
    /**
     * @type {?}
     * @private
     */
    WallCorePlugin.prototype.layoutWalker;
    /**
     * @type {?}
     * @private
     */
    WallCorePlugin.prototype.wallModel;
    /**
     * @type {?}
     * @private
     */
    WallCorePlugin.prototype.DEFAULT_BRICK;
    /**
     * @type {?}
     * @private
     */
    WallCorePlugin.prototype.events;
    /**
     * @type {?}
     * @private
     */
    WallCorePlugin.prototype.brickRegistry;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbC1jb3JlLnBsdWdpbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL3dhbGwvcGx1Z2lucy9jb3JlL3dhbGwtY29yZS5wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxPQUFPLEVBQWUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFDLElBQUksRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBS2xELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUV2RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDL0QsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUNyRCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUN4RSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDbkQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHFCQUFxQixDQUFDOzs7OztBQVMvQyxNQUFNLE9BQU8sY0FBYzs7OztJQWN2QixZQUFvQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQWJoRCxTQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ2QsWUFBTyxHQUFHLE9BQU8sQ0FBQztRQUlWLGlCQUFZLEdBQWlCLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FB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SUF6YkcsOEJBQWM7O0lBQ2QsaUNBQWtCOzs7OztJQUdsQixnQ0FBMkI7Ozs7O0lBQzNCLHNDQUEwRTs7Ozs7SUFFMUUsbUNBQThCOzs7OztJQUU5Qix1Q0FBK0I7Ozs7O0lBRS9CLGdDQUE2Qzs7Ozs7SUFFakMsdUNBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTdWJqZWN0LCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtHdWlkfSBmcm9tICcuLi8uLi8uLi9tb2R1bGVzL3V0aWxzL3V0aWxzJztcbmltcG9ydCB7SUJyaWNrRGVmaW5pdGlvbn0gZnJvbSAnLi4vLi4vbW9kZWwvaW50ZXJmYWNlcy9icmljay1kZWZpbml0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQge0lXYWxsQ29sdW1ufSBmcm9tICcuLi8uLi9tb2RlbC9pbnRlcmZhY2VzL3dhbGwtY29sdW1uLmludGVyZmFjZSc7XG5pbXBvcnQge0lXYWxsRGVmaW5pdGlvbn0gZnJvbSAnLi4vLi4vbW9kZWwvaW50ZXJmYWNlcy93YWxsLWRlZmluaXRpb24uaW50ZXJmYWNlJztcbmltcG9ydCB7SVdhbGxSb3d9IGZyb20gJy4uLy4uL21vZGVsL2ludGVyZmFjZXMvd2FsbC1yb3cuaW50ZXJmYWNlJztcbmltcG9ydCB7V2FsbEJyaWNrfSBmcm9tICcuLi8uLi9tb2RlbC93YWxsLWJyaWNrLm1vZGVsJztcbmltcG9ydCB7QnJpY2tSZWdpc3RyeX0gZnJvbSAnLi4vLi4vcmVnaXN0cnkvYnJpY2stcmVnaXN0cnkuc2VydmljZSc7XG5pbXBvcnQge0FkZEJyaWNrRXZlbnR9IGZyb20gJy4vZXZlbnRzL2FkZC1icmljay5ldmVudCc7XG5pbXBvcnQge0JlZm9yZUNoYW5nZUV2ZW50fSBmcm9tICcuL2V2ZW50cy9iZWZvcmUtY2hhbmdlLmV2ZW50JztcbmltcG9ydCB7TW92ZUJyaWNrRXZlbnR9IGZyb20gJy4vZXZlbnRzL21vdmUtYnJpY2suZXZlbnQnO1xuaW1wb3J0IHtSZW1vdmVCcmlja0V2ZW50fSBmcm9tICcuL2V2ZW50cy9yZW1vdmUtYnJpY2suZXZlbnQnO1xuaW1wb3J0IHtSZW1vdmVCcmlja3NFdmVudH0gZnJvbSAnLi9ldmVudHMvcmVtb3ZlLWJyaWNrcy5ldmVudCc7XG5pbXBvcnQge1NldFBsYW5FdmVudH0gZnJvbSAnLi9ldmVudHMvc2V0LXBsYW4uZXZlbnQnO1xuaW1wb3J0IHtUdXJuQnJpY2tJbnRvRXZlbnR9IGZyb20gJy4vZXZlbnRzL3R1cm4tYnJpY2staW50by5ldmVudCc7XG5pbXBvcnQge1VwZGF0ZUJyaWNrU3RhdGVFdmVudH0gZnJvbSAnLi9ldmVudHMvdXBkYXRlLWJyaWNrLXN0YXRlLmV2ZW50JztcbmltcG9ydCB7TGF5b3V0V2Fsa2VyfSBmcm9tICcuL2xheW91dC13YWxrZXIuY2xhc3MnO1xuaW1wb3J0IHtXYWxsTGF5b3V0fSBmcm9tICcuL3dhbGwtbGF5b3V0Lm1vZGVsJztcbmltcG9ydCB7SVdhbGxQbHVnaW59IGZyb20gJy4uLy4uL21vZGVsL2ludGVyZmFjZXMvd2FsbC1wbHVnaW4uaW50ZXJmYWNlJztcbmltcG9ydCB7SVdhbGxNb2RlbH0gZnJvbSAnLi4vLi4vbW9kZWwvaW50ZXJmYWNlcy93YWxsLW1vZGVsLmludGVyZmFjZSc7XG5pbXBvcnQge0lCcmlja1NuYXBzaG90fSBmcm9tICcuLi8uLi9tb2RlbC9pbnRlcmZhY2VzL2JyaWNrLXNuYXBzaG90LmludGVyZmFjZSc7XG5cbi8qXG4qIENvbnRhaW5zIFdhbGwgZGF0YSBzdHJ1Y3R1cmUgYW5kIHJlZ2lzdGVycyBBUEkgZm9yIGRhdGEgbWFuaXB1bGF0aW9uLlxuKiBSZXNwb25zaWJsZSB0byBJV2FsbERlZmluaXRpb24tPkxheW91dCBhbmQgTGF5b3V0LT5JV2FsbERlZmluaXRpb24gdHJhbnNmb3JtYXRpb25cbiogKi9cbmV4cG9ydCBjbGFzcyBXYWxsQ29yZVBsdWdpbiBpbXBsZW1lbnRzIElXYWxsUGx1Z2luIHtcbiAgICBuYW1lID0gJ2NvcmUnO1xuICAgIHZlcnNpb24gPSAnMC4wLjAnO1xuXG4gICAgLy8gc3ViIHBsdWdpbnNcbiAgICBwcml2YXRlIGxheW91dDogV2FsbExheW91dDtcbiAgICBwcml2YXRlIGxheW91dFdhbGtlcjogTGF5b3V0V2Fsa2VyID0gbmV3IExheW91dFdhbGtlcih0aGlzLmJyaWNrUmVnaXN0cnkpO1xuXG4gICAgcHJpdmF0ZSB3YWxsTW9kZWw6IElXYWxsTW9kZWw7XG5cbiAgICBwcml2YXRlIERFRkFVTFRfQlJJQ0sgPSAndGV4dCc7XG5cbiAgICBwcml2YXRlIGV2ZW50czogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYnJpY2tSZWdpc3RyeTogQnJpY2tSZWdpc3RyeSkge1xuICAgIH1cblxuICAgIC8vIFNUQVJUIEFQSVxuXG4gICAgb25XYWxsSW5pdGlhbGl6ZSh3YWxsTW9kZWw6IElXYWxsTW9kZWwpIHtcbiAgICAgICAgdGhpcy53YWxsTW9kZWwgPSB3YWxsTW9kZWw7XG5cbiAgICAgICAgW1xuICAgICAgICAgICAgJ2dldFJvd0NvdW50JyxcbiAgICAgICAgICAgICdnZXRCcmlja1RhZycsXG4gICAgICAgICAgICAnZ2V0UHJldmlvdXNCcmlja0lkJyxcbiAgICAgICAgICAgICdnZXROZXh0QnJpY2tJZCcsXG4gICAgICAgICAgICAnZ2V0Q29sdW1uQ291bnQnLFxuICAgICAgICAgICAgJ2dldEJyaWNrSWRzJyxcbiAgICAgICAgICAgICdnZXRCcmlja3NDb3VudCcsXG4gICAgICAgICAgICAnZ2V0TmV4dFRleHRCcmlja0lkJyxcbiAgICAgICAgICAgICdnZXRQcmV2aW91c1RleHRCcmlja0lkJyxcbiAgICAgICAgICAgICdmaWx0ZXJCcmlja3MnLFxuICAgICAgICAgICAgJ2lzQnJpY2tBaGVhZE9mJ1xuICAgICAgICBdLmZvckVhY2goKG1ldGhvZE5hbWUpID0+IHtcbiAgICAgICAgICAgIHRoaXNbbWV0aG9kTmFtZV0gPSB0aGlzLmxheW91dFdhbGtlclttZXRob2ROYW1lXS5iaW5kKHRoaXMubGF5b3V0V2Fsa2VyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy53YWxsTW9kZWwucmVnaXN0ZXJBcGkodGhpcy5uYW1lLCB0aGlzKTtcbiAgICB9XG5cbiAgICAvLyBvbGRcblxuICAgIC8vIENPTU1BTkQgTUVUSE9EU1xuICAgIHNldFBsYW4ocGxhbjogSVdhbGxEZWZpbml0aW9uKSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2gobmV3IEJlZm9yZUNoYW5nZUV2ZW50KFNldFBsYW5FdmVudCkpO1xuXG4gICAgICAgIHRoaXMubGF5b3V0ID0gbmV3IFdhbGxMYXlvdXQodGhpcy5icmlja1JlZ2lzdHJ5LCB0aGlzLmxheW91dFdhbGtlcik7XG5cbiAgICAgICAgdGhpcy5sYXlvdXRXYWxrZXIuc2V0TGF5b3V0KHRoaXMubGF5b3V0LnJvd3MpO1xuXG4gICAgICAgIC8vIGJ1aWxkIHRyZWVcbiAgICAgICAgcGxhbi5sYXlvdXQuYnJpY2tzLmZvckVhY2goKHJvdywgcm93SW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJvdy5jb2x1bW5zLmZvckVhY2goKGNvbHVtbiwgY29sdW1uSW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uYnJpY2tzLmZvckVhY2goKGJyaWNrLCBicmlja0luZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBsYW5CcmljayA9IHBsYW4uYnJpY2tzLmZpbmQoKGN1cnJlbnRQbGFuQnJpY2spID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBicmljay5pZCA9PT0gY3VycmVudFBsYW5Ccmljay5pZDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgd2FsbEJyaWNrID0gdGhpcy5yZXN0b3JlQnJpY2socGxhbkJyaWNrKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBmaXJzdCBjb2x1bW4gaW4gbmV3IHJvd1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29sdW1uSW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChicmlja0luZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXlvdXQuYWRkQnJpY2tUb05ld1Jvdyhyb3dJbmRleCwgd2FsbEJyaWNrLCByb3cuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxheW91dC5hZGRCcmlja1RvRXhpc3RpbmdDb2x1bW4ocm93SW5kZXgsIGNvbHVtbkluZGV4LCBicmlja0luZGV4LCB3YWxsQnJpY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJyaWNrSW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxheW91dC5hZGRCcmlja1RvTmV3Q29sdW1uKHJvd0luZGV4LCBjb2x1bW5JbmRleCwgd2FsbEJyaWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXlvdXQuYWRkQnJpY2tUb0V4aXN0aW5nQ29sdW1uKHJvd0luZGV4LCBjb2x1bW5JbmRleCwgYnJpY2tJbmRleCwgd2FsbEJyaWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZGlzcGF0Y2gobmV3IFNldFBsYW5FdmVudCgpKTtcbiAgICB9XG5cbiAgICBhZGRCcmlja0FmdGVyQnJpY2tJZChicmlja0lkOiBzdHJpbmcsIHRhZzogc3RyaW5nLCBzdGF0ZT86IGFueSk6IElCcmlja1NuYXBzaG90IHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaChuZXcgQmVmb3JlQ2hhbmdlRXZlbnQoQWRkQnJpY2tFdmVudCkpO1xuXG4gICAgICAgIGNvbnN0IGJyaWNrUG9zaXRpb24gPSB0aGlzLmxheW91dFdhbGtlci5nZXRCcmlja1Bvc2l0aW9uKGJyaWNrSWQpO1xuICAgICAgICBjb25zdCBjb2x1bW5Db3VudCA9IHRoaXMubGF5b3V0V2Fsa2VyLmdldENvbHVtbkNvdW50KGJyaWNrUG9zaXRpb24ucm93SW5kZXgpO1xuICAgICAgICBjb25zdCBuZXdCcmljayA9IHRoaXMuY3JlYXRlQnJpY2sodGFnLCBzdGF0ZSk7XG5cbiAgICAgICAgaWYgKGNvbHVtbkNvdW50ID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmxheW91dC5hZGRCcmlja1RvTmV3Um93KGJyaWNrUG9zaXRpb24ucm93SW5kZXggKyAxLCBuZXdCcmljayk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29sdW1uQ291bnQgPiAxKSB7XG4gICAgICAgICAgICB0aGlzLmxheW91dC5hZGRCcmlja1RvRXhpc3RpbmdDb2x1bW4oXG4gICAgICAgICAgICAgICAgYnJpY2tQb3NpdGlvbi5yb3dJbmRleCxcbiAgICAgICAgICAgICAgICBicmlja1Bvc2l0aW9uLmNvbHVtbkluZGV4LFxuICAgICAgICAgICAgICAgIGJyaWNrUG9zaXRpb24uYnJpY2tJbmRleCArIDEsXG4gICAgICAgICAgICAgICAgbmV3QnJpY2spO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kaXNwYXRjaChuZXcgQWRkQnJpY2tFdmVudChuZXdCcmljay5pZCkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmdldEJyaWNrU25hcHNob3QobmV3QnJpY2suaWQpO1xuICAgIH1cblxuICAgIGFkZEJyaWNrQmVmb3JlQnJpY2tJZChicmlja0lkOiBzdHJpbmcsIHRhZzogc3RyaW5nLCBzdGF0ZT86IGFueSk6IElCcmlja1NuYXBzaG90IHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaChuZXcgQmVmb3JlQ2hhbmdlRXZlbnQoQWRkQnJpY2tFdmVudCkpO1xuXG4gICAgICAgIGNvbnN0IGJyaWNrUG9zaXRpb24gPSB0aGlzLmxheW91dFdhbGtlci5nZXRCcmlja1Bvc2l0aW9uKGJyaWNrSWQpO1xuICAgICAgICBjb25zdCBjb2x1bW5Db3VudCA9IHRoaXMubGF5b3V0V2Fsa2VyLmdldENvbHVtbkNvdW50KGJyaWNrUG9zaXRpb24ucm93SW5kZXgpO1xuICAgICAgICBjb25zdCBuZXdCcmljayA9IHRoaXMuY3JlYXRlQnJpY2sodGFnLCBzdGF0ZSk7XG5cbiAgICAgICAgaWYgKGNvbHVtbkNvdW50ID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmxheW91dC5hZGRCcmlja1RvTmV3Um93KGJyaWNrUG9zaXRpb24ucm93SW5kZXgsIG5ld0JyaWNrKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb2x1bW5Db3VudCA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMubGF5b3V0LmFkZEJyaWNrVG9FeGlzdGluZ0NvbHVtbihcbiAgICAgICAgICAgICAgICBicmlja1Bvc2l0aW9uLnJvd0luZGV4LFxuICAgICAgICAgICAgICAgIGJyaWNrUG9zaXRpb24uY29sdW1uSW5kZXgsXG4gICAgICAgICAgICAgICAgYnJpY2tQb3NpdGlvbi5icmlja0luZGV4LFxuICAgICAgICAgICAgICAgIG5ld0JyaWNrKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGlzcGF0Y2gobmV3IEFkZEJyaWNrRXZlbnQobmV3QnJpY2suaWQpKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5nZXRCcmlja1NuYXBzaG90KG5ld0JyaWNrLmlkKTtcbiAgICB9XG5cbiAgICAvLyBBZGQgdGV4dCBicmljayB0byB0aGUgYm90dG9tIG9mIHdhbGwgaW4gdGhlIG5ldyByb3dcbiAgICBhZGREZWZhdWx0QnJpY2soKSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2gobmV3IEJlZm9yZUNoYW5nZUV2ZW50KEFkZEJyaWNrRXZlbnQpKTtcblxuICAgICAgICBjb25zdCBicmlja0NvdW50ID0gdGhpcy5sYXlvdXRXYWxrZXIuZ2V0QnJpY2tzQ291bnQoKTtcbiAgICAgICAgY29uc3QgbmV3QnJpY2sgPSB0aGlzLmNyZWF0ZUJyaWNrKHRoaXMuREVGQVVMVF9CUklDSyk7XG4gICAgICAgIGNvbnN0IHJvd0luZGV4ID0gYnJpY2tDb3VudCA/IHRoaXMubGF5b3V0V2Fsa2VyLmdldFJvd0NvdW50KCkgKyAxIDogMDtcblxuICAgICAgICB0aGlzLmxheW91dC5hZGRCcmlja1RvTmV3Um93KHJvd0luZGV4LCBuZXdCcmljayk7XG5cbiAgICAgICAgdGhpcy5kaXNwYXRjaChuZXcgQWRkQnJpY2tFdmVudChuZXdCcmljay5pZCkpO1xuICAgIH1cblxuICAgIGFkZEJyaWNrQXRTdGFydCh0YWc6IHN0cmluZywgc3RhdGU/OiBhbnkpOiBJQnJpY2tTbmFwc2hvdCB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2gobmV3IEJlZm9yZUNoYW5nZUV2ZW50KEFkZEJyaWNrRXZlbnQpKTtcblxuICAgICAgICBjb25zdCBuZXdCcmljayA9IHRoaXMuY3JlYXRlQnJpY2sodGFnLCBzdGF0ZSk7XG5cbiAgICAgICAgdGhpcy5sYXlvdXQuYWRkQnJpY2tUb05ld1JvdygwLCBuZXdCcmljayk7XG5cbiAgICAgICAgdGhpcy5kaXNwYXRjaChuZXcgQWRkQnJpY2tFdmVudChuZXdCcmljay5pZCkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmdldEJyaWNrU25hcHNob3QobmV3QnJpY2suaWQpO1xuICAgIH1cblxuICAgIHVwZGF0ZUJyaWNrU3RhdGUoYnJpY2tJZCwgYnJpY2tTdGF0ZSk6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc3BhdGNoKG5ldyBCZWZvcmVDaGFuZ2VFdmVudChVcGRhdGVCcmlja1N0YXRlRXZlbnQpKTtcblxuICAgICAgICBjb25zdCBicmljayA9IHRoaXMubGF5b3V0V2Fsa2VyLmdldEJyaWNrQnlJZChicmlja0lkKTtcblxuICAgICAgICBjb25zdCBvbGRTdGF0ZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYnJpY2suZ2V0U3RhdGUoKSkpO1xuXG4gICAgICAgIGJyaWNrLnVwZGF0ZVN0YXRlKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYnJpY2tTdGF0ZSkpKTtcblxuICAgICAgICB0aGlzLmRpc3BhdGNoKG5ldyBVcGRhdGVCcmlja1N0YXRlRXZlbnQoXG4gICAgICAgICAgICBicmlja0lkLFxuICAgICAgICAgICAgSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShicmljay5nZXRTdGF0ZSgpKSksXG4gICAgICAgICAgICBvbGRTdGF0ZVxuICAgICAgICApKTtcbiAgICB9XG5cbiAgICAvLyB0b2RvOiBzaG91bGQgYmUgYXN5bmMgb3BlcmF0aW9uXG4gICAgcmVtb3ZlQnJpY2soYnJpY2tJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2gobmV3IEJlZm9yZUNoYW5nZUV2ZW50KFJlbW92ZUJyaWNrRXZlbnQpKTtcblxuICAgICAgICBjb25zdCBuZXh0VGV4dEJyaWNrID0gdGhpcy5sYXlvdXRXYWxrZXIuZ2V0TmV4dFRleHRCcmljayhicmlja0lkKTtcbiAgICAgICAgY29uc3QgcHJldmlvdXNUZXh0QnJpY2sgPSB0aGlzLmxheW91dFdhbGtlci5nZXRQcmV2aW91c1RleHRCcmljayhicmlja0lkKTtcblxuICAgICAgICB0aGlzLmNsZWFyQnJpY2tSZXNvdXJjZXMoYnJpY2tJZCkudGhlbigoKSA9PiB7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHJlbW92ZWRCcmljayA9IHRoaXMubGF5b3V0V2Fsa2VyLmdldEJyaWNrQnlJZChicmlja0lkKTtcblxuICAgICAgICB0aGlzLmxheW91dC5yZW1vdmVCcmljayhicmlja0lkKTtcblxuICAgICAgICB0aGlzLmRpc3BhdGNoKG5ldyBSZW1vdmVCcmlja0V2ZW50KFxuICAgICAgICAgICAgcmVtb3ZlZEJyaWNrLmdldFNuYXBzaG90KCksXG4gICAgICAgICAgICBwcmV2aW91c1RleHRCcmljayAmJiBwcmV2aW91c1RleHRCcmljay5pZCxcbiAgICAgICAgICAgIG5leHRUZXh0QnJpY2sgJiYgbmV4dFRleHRCcmljay5pZFxuICAgICAgICApKTtcbiAgICB9XG5cbiAgICAvLyB0b2RvOiBzaG91bGQgYmUgYXN5bmMgb3BlcmF0aW9uXG4gICAgcmVtb3ZlQnJpY2tzKGJyaWNrSWRzKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2gobmV3IEJlZm9yZUNoYW5nZUV2ZW50KFJlbW92ZUJyaWNrc0V2ZW50KSk7XG5cbiAgICAgICAgY29uc3QgbmV4dFRleHRCcmljayA9IHRoaXMubGF5b3V0V2Fsa2VyLmdldE5leHRCcmljayhicmlja0lkc1ticmlja0lkcy5sZW5ndGggLSAxXSk7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzQnJpY2sgPSB0aGlzLmxheW91dFdhbGtlci5nZXRQcmV2aW91c0JyaWNrKGJyaWNrSWRzWzBdKTtcblxuICAgICAgICBjb25zdCBjbGVhclByb21pc2VzID0gYnJpY2tJZHMubWFwKChicmlja0lkKSA9PiB0aGlzLmNsZWFyQnJpY2tSZXNvdXJjZXMoYnJpY2tJZCkpO1xuXG4gICAgICAgIFByb21pc2UuYWxsKGNsZWFyUHJvbWlzZXMpLnRoZW4oKCkgPT4ge1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCByZW1vdmVkQnJpY2tzID0gYnJpY2tJZHMubWFwKChicmlja0lkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCByZW1vdmVkQnJpY2sgPSB0aGlzLmxheW91dFdhbGtlci5nZXRCcmlja0J5SWQoYnJpY2tJZCk7XG5cbiAgICAgICAgICAgIHRoaXMubGF5b3V0LnJlbW92ZUJyaWNrKGJyaWNrSWQpO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGlkOiByZW1vdmVkQnJpY2suaWQsXG4gICAgICAgICAgICAgICAgdGFnOiByZW1vdmVkQnJpY2sudGFnLFxuICAgICAgICAgICAgICAgIHN0YXRlOiByZW1vdmVkQnJpY2suc3RhdGVcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZGlzcGF0Y2gobmV3IFJlbW92ZUJyaWNrc0V2ZW50KFxuICAgICAgICAgICAgcmVtb3ZlZEJyaWNrcyxcbiAgICAgICAgICAgIHByZXZpb3VzQnJpY2sgJiYgcHJldmlvdXNCcmljay5pZCxcbiAgICAgICAgICAgIG5leHRUZXh0QnJpY2sgJiYgbmV4dFRleHRCcmljay5pZFxuICAgICAgICApKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYWxsIGJyaWNrcyBmcm9tIGxheW91dFxuICAgICAqIENsZWFyIGFsbCBicmlja3MgZXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gICAgICovXG4gICAgY2xlYXIoKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgY29uc3QgYnJpY2tJZHMgPSB0aGlzLmxheW91dFdhbGtlci5nZXRCcmlja0lkcygpO1xuXG4gICAgICAgIC8vIHRvZG86IHJlcGxhY2UgaXQgYWZ0ZXIgcmVtb3ZlQnJpY2tzIHdpbGwgYmUgYXN5bmNcbiAgICAgICAgY29uc3QgY2xlYXJQcm9taXNlcyA9IGJyaWNrSWRzLm1hcCgoYnJpY2tJZCkgPT4gdGhpcy5jbGVhckJyaWNrUmVzb3VyY2VzKGJyaWNrSWQpKTtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoY2xlYXJQcm9taXNlcykudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBicmlja0lkcy5mb3JFYWNoKChicmlja0lkKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXlvdXQucmVtb3ZlQnJpY2soYnJpY2tJZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdHVybkJyaWNrSW50byhicmlja0lkOiBzdHJpbmcsIG5ld1RhZzogc3RyaW5nLCBzdGF0ZTogYW55ID0ge30pIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaChuZXcgQmVmb3JlQ2hhbmdlRXZlbnQoVHVybkJyaWNrSW50b0V2ZW50KSk7XG5cbiAgICAgICAgY29uc3QgYnJpY2sgPSB0aGlzLmxheW91dFdhbGtlci5nZXRCcmlja0J5SWQoYnJpY2tJZCk7XG4gICAgICAgIGNvbnN0IG9sZFRhZyA9IGJyaWNrLnRhZztcblxuICAgICAgICBicmlja1xuICAgICAgICAgICAgLnR1cm5JbnRvKG5ld1RhZylcbiAgICAgICAgICAgIC51cGRhdGVTdGF0ZShzdGF0ZSk7XG5cbiAgICAgICAgdGhpcy5kaXNwYXRjaChuZXcgVHVybkJyaWNrSW50b0V2ZW50KGJyaWNrSWQsIG5ld1RhZywgb2xkVGFnKSk7XG4gICAgfVxuXG4gICAgbW92ZUJyaWNrQWZ0ZXJCcmlja0lkKG1vdmVkQnJpY2tJZHM6IHN0cmluZ1tdLCBhZnRlckJyaWNrSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBpZiAobW92ZWRCcmlja0lkcy5pbmRleE9mKGFmdGVyQnJpY2tJZCkgPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoKG5ldyBCZWZvcmVDaGFuZ2VFdmVudChNb3ZlQnJpY2tFdmVudCkpO1xuXG4gICAgICAgICAgICBjb25zdCBhZnRlckJyaWNrUG9zaXRpb24gPSB0aGlzLmxheW91dFdhbGtlci5nZXRCcmlja1Bvc2l0aW9uKGFmdGVyQnJpY2tJZCk7XG4gICAgICAgICAgICBjb25zdCBjb2x1bW5Db3VudCA9IHRoaXMubGF5b3V0V2Fsa2VyLmdldENvbHVtbkNvdW50KGFmdGVyQnJpY2tQb3NpdGlvbi5yb3dJbmRleCk7XG5cbiAgICAgICAgICAgIGlmIChjb2x1bW5Db3VudCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMubGF5b3V0Lm1vdmVCcmlja0FmdGVySW5OZXdSb3coYWZ0ZXJCcmlja0lkLCBtb3ZlZEJyaWNrSWRzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXlvdXQubW92ZUJyaWNrQWZ0ZXJJblNhbWVDb2x1bW4oYWZ0ZXJCcmlja0lkLCBtb3ZlZEJyaWNrSWRzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaChuZXcgTW92ZUJyaWNrRXZlbnQobW92ZWRCcmlja0lkcywgYWZ0ZXJCcmlja0lkKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlQnJpY2tCZWZvcmVCcmlja0lkKG1vdmVkQnJpY2tJZHM6IHN0cmluZ1tdLCBiZWZvcmVCcmlja0lkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKG1vdmVkQnJpY2tJZHMuaW5kZXhPZihiZWZvcmVCcmlja0lkKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2gobmV3IEJlZm9yZUNoYW5nZUV2ZW50KE1vdmVCcmlja0V2ZW50KSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGJlZm9yZUJyaWNrUG9zaXRpb24gPSB0aGlzLmxheW91dFdhbGtlci5nZXRCcmlja1Bvc2l0aW9uKGJlZm9yZUJyaWNrSWQpO1xuICAgICAgICAgICAgY29uc3QgY29sdW1uQ291bnQgPSB0aGlzLmxheW91dFdhbGtlci5nZXRDb2x1bW5Db3VudChiZWZvcmVCcmlja1Bvc2l0aW9uLnJvd0luZGV4KTtcblxuICAgICAgICAgICAgaWYgKGNvbHVtbkNvdW50ID09PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXlvdXQubW92ZUJyaWNrQmVmb3JlSW5OZXdSb3coYmVmb3JlQnJpY2tJZCwgbW92ZWRCcmlja0lkcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubGF5b3V0Lm1vdmVCcmlja0JlZm9yZUluU2FtZUNvbHVtbihiZWZvcmVCcmlja0lkLCBtb3ZlZEJyaWNrSWRzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaChuZXcgTW92ZUJyaWNrRXZlbnQobW92ZWRCcmlja0lkcywgYmVmb3JlQnJpY2tJZCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZUJyaWNrVG9OZXdDb2x1bW4odGFyZ2V0QnJpY2tJZHM6IHN0cmluZ1tdLCBiZWZvcmVCcmlja0lkOiBzdHJpbmcsIHNpZGU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBpZiAodGFyZ2V0QnJpY2tJZHMuaW5kZXhPZihiZWZvcmVCcmlja0lkKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2gobmV3IEJlZm9yZUNoYW5nZUV2ZW50KE1vdmVCcmlja0V2ZW50KSk7XG5cbiAgICAgICAgICAgIHRoaXMubGF5b3V0Lm1vdmVCcmlja1RvTmV3Q29sdW1uKHRhcmdldEJyaWNrSWRzLCBiZWZvcmVCcmlja0lkLCBzaWRlKTtcblxuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaChuZXcgTW92ZUJyaWNrRXZlbnQodGFyZ2V0QnJpY2tJZHMsIGJlZm9yZUJyaWNrSWQpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFFVRVJZIE1FVEhPRFNcbiAgICBnZXRQbGFuKCk6IElXYWxsRGVmaW5pdGlvbiB7XG4gICAgICAgIGNvbnN0IHBsYW4gPSB7XG4gICAgICAgICAgICBicmlja3M6IFtdLFxuICAgICAgICAgICAgbGF5b3V0OiB7XG4gICAgICAgICAgICAgICAgYnJpY2tzOiBbXVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMubGF5b3V0V2Fsa2VyLnRyYXZlcnNlKChyb3c6IElXYWxsUm93KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb2x1bW5zID0gW107XG5cbiAgICAgICAgICAgIHJvdy5jb2x1bW5zLmZvckVhY2goKGNvbHVtbjogSVdhbGxDb2x1bW4pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwbGFuQ29sdW1uID0ge1xuICAgICAgICAgICAgICAgICAgICBicmlja3M6IFtdXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGNvbHVtbi5icmlja3MuZm9yRWFjaCgoYnJpY2s6IFdhbGxCcmljaykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBwbGFuLmJyaWNrcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBicmljay5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogYnJpY2sudGFnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWV0YTogYnJpY2subWV0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGJyaWNrLnN0YXRlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHBsYW5Db2x1bW4uYnJpY2tzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGJyaWNrLmlkXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgY29sdW1ucy5wdXNoKHBsYW5Db2x1bW4pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHBsYW4ubGF5b3V0LmJyaWNrcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBjb2x1bW5zLFxuICAgICAgICAgICAgICAgIGlkOiByb3cuaWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShwbGFuKSk7XG4gICAgfVxuXG4gICAgc29ydEJyaWNrSWRzQnlMYXlvdXRPcmRlcihicmlja0lkczogc3RyaW5nW10pIHtcbiAgICAgICAgY29uc3QgYnJpY2tzU2VxdWVuY2UgPSB0aGlzLmxheW91dFdhbGtlci5nZXRCcmlja1NlcXVlbmNlKCgpID0+IHRydWUpO1xuXG4gICAgICAgIHJldHVybiBicmlja3NTZXF1ZW5jZVxuICAgICAgICAgICAgLmZpbHRlcigoYnJpY2spID0+IGJyaWNrSWRzLmluZGV4T2YoYnJpY2suaWQpICE9PSAtMSlcbiAgICAgICAgICAgIC5tYXAoKGJyaWNrKSA9PiBicmljay5pZCk7XG4gICAgfVxuXG4gICAgdHJhdmVyc2UoZm4pOiB2b2lkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGF5b3V0V2Fsa2VyLnRyYXZlcnNlKChyb3c6IElXYWxsUm93KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcmVwYXJlZFJvdyA9IHtcbiAgICAgICAgICAgICAgICBpZDogcm93LmlkLFxuXG4gICAgICAgICAgICAgICAgY29sdW1uczogcm93LmNvbHVtbnMubWFwKChjb2x1bW4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyaWNrczogY29sdW1uLmJyaWNrcy5tYXAoKGJyaWNrKSA9PiBicmljay5nZXRTbmFwc2hvdCgpKVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBmbihwcmVwYXJlZFJvdyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldEJyaWNrU25hcHNob3QoYnJpY2tJZDogc3RyaW5nKTogSUJyaWNrU25hcHNob3Qge1xuICAgICAgICBjb25zdCBicmljayA9IHRoaXMubGF5b3V0V2Fsa2VyLmdldEJyaWNrQnlJZChicmlja0lkKTtcblxuICAgICAgICByZXR1cm4gYnJpY2sgPyBicmljay5nZXRTbmFwc2hvdCgpIDogbnVsbDtcbiAgICB9XG5cbiAgICBnZXRCcmlja1Jlc291cmNlUGF0aHMoYnJpY2tJZDogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgICAgICBjb25zdCBicmljayA9IHRoaXMubGF5b3V0V2Fsa2VyLmdldEJyaWNrQnlJZChicmlja0lkKTtcblxuICAgICAgICBjb25zdCBicmlja1NwZWNpZmljYXRpb24gPSB0aGlzLmJyaWNrUmVnaXN0cnkuZ2V0KGJyaWNrLnRhZyk7XG5cbiAgICAgICAgaWYgKCFicmlja1NwZWNpZmljYXRpb24uZ2V0QnJpY2tSZXNvdXJjZVBhdGhzKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYnJpY2tTcGVjaWZpY2F0aW9uLmdldEJyaWNrUmVzb3VyY2VQYXRocyhicmljay5nZXRTbmFwc2hvdCgpKTtcbiAgICB9XG5cbiAgICBnZXRCcmlja1RleHRSZXByZXNlbnRhdGlvbihicmlja0lkOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBicmljayA9IHRoaXMubGF5b3V0V2Fsa2VyLmdldEJyaWNrQnlJZChicmlja0lkKTtcblxuICAgICAgICBjb25zdCBicmlja1NwZWNpZmljYXRpb24gPSB0aGlzLmJyaWNrUmVnaXN0cnkuZ2V0KGJyaWNrLnRhZyk7XG5cbiAgICAgICAgaWYgKGJyaWNrU3BlY2lmaWNhdGlvbi50ZXh0UmVwcmVzZW50YXRpb24pIHtcbiAgICAgICAgICAgIGNvbnN0IGJyaWNrVGV4dFJlcHJlc2VudGF0aW9uID0gbmV3IGJyaWNrU3BlY2lmaWNhdGlvbi50ZXh0UmVwcmVzZW50YXRpb24oYnJpY2suZ2V0U25hcHNob3QoKSk7XG5cbiAgICAgICAgICAgIHJldHVybiBicmlja1RleHRSZXByZXNlbnRhdGlvbi5nZXRUZXh0KCkgfHwgJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdWJzY3JpYmUoY2FsbGJhY2spOiBTdWJzY3JpcHRpb24ge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmVudHMuc3Vic2NyaWJlKGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBpc1JlZ2lzdGVyZWRCcmljayh0YWc6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gQm9vbGVhbih0aGlzLmJyaWNrUmVnaXN0cnkuZ2V0KHRhZykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGlzcGF0Y2goZTogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMuZXZlbnRzLm5leHQoZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVCcmljayh0YWcsIHN0YXRlPzogYW55KSB7XG4gICAgICAgIGNvbnN0IGlkID0gdGhpcy5nZW5lcmF0ZUd1aWQoKTtcbiAgICAgICAgY29uc3QgbWV0YSA9IHt9O1xuICAgICAgICBjb25zdCBicmljayA9IG5ldyBXYWxsQnJpY2soaWQsIHRhZywgbWV0YSk7XG5cbiAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgICBicmljay51cGRhdGVTdGF0ZShzdGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYnJpY2s7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXN0b3JlQnJpY2soYnJpY2tEZWZpbml0aW9uOiBJQnJpY2tEZWZpbml0aW9uKTogV2FsbEJyaWNrIHtcbiAgICAgICAgY29uc3QgYnJpY2sgPSBuZXcgV2FsbEJyaWNrKFxuICAgICAgICAgICAgYnJpY2tEZWZpbml0aW9uLmlkLFxuICAgICAgICAgICAgYnJpY2tEZWZpbml0aW9uLnRhZyxcbiAgICAgICAgICAgIGJyaWNrRGVmaW5pdGlvbi5tZXRhXG4gICAgICAgICk7XG5cbiAgICAgICAgYnJpY2sudXBkYXRlU3RhdGUoYnJpY2tEZWZpbml0aW9uLmRhdGEpO1xuXG4gICAgICAgIHJldHVybiBicmljaztcbiAgICB9XG5cbiAgICBwcml2YXRlIGNsZWFyQnJpY2tSZXNvdXJjZXMoYnJpY2tJZCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGNvbnN0IGJyaWNrID0gdGhpcy5sYXlvdXRXYWxrZXIuZ2V0QnJpY2tCeUlkKGJyaWNrSWQpO1xuXG4gICAgICAgIGNvbnN0IGJyaWNrU3BlY2lmaWNhdGlvbiA9IHRoaXMuYnJpY2tSZWdpc3RyeS5nZXQoYnJpY2sudGFnKTtcblxuICAgICAgICBpZiAoYnJpY2tTcGVjaWZpY2F0aW9uLmRlc3RydWN0b3IpIHtcbiAgICAgICAgICAgIHJldHVybiBicmlja1NwZWNpZmljYXRpb24uZGVzdHJ1Y3Rvcihicmljay5nZXRTbmFwc2hvdCgpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2VuZXJhdGVHdWlkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAobmV3IEd1aWQoKSkuZ2V0KCk7XG4gICAgfVxufVxuIl19