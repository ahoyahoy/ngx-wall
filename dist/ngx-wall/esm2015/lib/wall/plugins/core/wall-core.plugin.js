/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        ].forEach((methodName) => {
            this[methodName] = this.layoutWalker[methodName].bind(this.layoutWalker);
        });
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
        plan.layout.bricks.forEach((row, rowIndex) => {
            row.columns.forEach((column, columnIndex) => {
                column.bricks.forEach((brick, brickIndex) => {
                    /** @type {?} */
                    const planBrick = plan.bricks.find((currentPlanBrick) => {
                        return brick.id === currentPlanBrick.id;
                    });
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
                });
            });
        });
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
        this.clearBrickResources(brickId).then(() => {
        });
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
        const clearPromises = brickIds.map((brickId) => this.clearBrickResources(brickId));
        Promise.all(clearPromises).then(() => {
        });
        /** @type {?} */
        const removedBricks = brickIds.map((brickId) => {
            /** @type {?} */
            const removedBrick = this.layoutWalker.getBrickById(brickId);
            this.layout.removeBrick(brickId);
            return {
                id: removedBrick.id,
                tag: removedBrick.tag,
                state: removedBrick.state
            };
        });
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
        const clearPromises = brickIds.map((brickId) => this.clearBrickResources(brickId));
        return Promise.all(clearPromises).then(() => {
            brickIds.forEach((brickId) => {
                this.layout.removeBrick(brickId);
            });
        });
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
        this.layoutWalker.traverse((row) => {
            /** @type {?} */
            const columns = [];
            row.columns.forEach((column) => {
                /** @type {?} */
                const planColumn = {
                    bricks: []
                };
                column.bricks.forEach((brick) => {
                    plan.bricks.push({
                        id: brick.id,
                        tag: brick.tag,
                        meta: brick.meta,
                        data: brick.state
                    });
                    planColumn.bricks.push({
                        id: brick.id
                    });
                });
                columns.push(planColumn);
            });
            plan.layout.bricks.push({
                columns,
                id: row.id
            });
        });
        return JSON.parse(JSON.stringify(plan));
    }
    /**
     * @param {?} brickIds
     * @return {?}
     */
    sortBrickIdsByLayoutOrder(brickIds) {
        /** @type {?} */
        const bricksSequence = this.layoutWalker.getBrickSequence(() => true);
        return bricksSequence
            .filter((brick) => brickIds.indexOf(brick.id) !== -1)
            .map((brick) => brick.id);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    traverse(fn) {
        return this.layoutWalker.traverse((row) => {
            /** @type {?} */
            const preparedRow = {
                id: row.id,
                columns: row.columns.map((column) => {
                    return {
                        bricks: column.bricks.map((brick) => brick.getSnapshot())
                    };
                })
            };
            fn(preparedRow);
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbC1jb3JlLnBsdWdpbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL3dhbGwvcGx1Z2lucy9jb3JlL3dhbGwtY29yZS5wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxPQUFPLEVBQWUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFDLElBQUksRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBS2xELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUV2RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDL0QsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUNyRCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUN4RSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDbkQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHFCQUFxQixDQUFDOzs7OztBQVMvQyxNQUFNLE9BQU8sY0FBYzs7OztJQWN2QixZQUFvQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQWJoRCxTQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ2QsWUFBTyxHQUFHLE9BQU8sQ0FBQztRQUlWLGlCQUFZLEdBQWlCLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FB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RSxtQ0FBOEI7Ozs7O0lBRTlCLHVDQUErQjs7Ozs7SUFFL0IsZ0NBQTZDOzs7OztJQUVqQyx1Q0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1N1YmplY3QsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0d1aWR9IGZyb20gJy4uLy4uLy4uL21vZHVsZXMvdXRpbHMvdXRpbHMnO1xuaW1wb3J0IHtJQnJpY2tEZWZpbml0aW9ufSBmcm9tICcuLi8uLi9tb2RlbC9pbnRlcmZhY2VzL2JyaWNrLWRlZmluaXRpb24uaW50ZXJmYWNlJztcbmltcG9ydCB7SVdhbGxDb2x1bW59IGZyb20gJy4uLy4uL21vZGVsL2ludGVyZmFjZXMvd2FsbC1jb2x1bW4uaW50ZXJmYWNlJztcbmltcG9ydCB7SVdhbGxEZWZpbml0aW9ufSBmcm9tICcuLi8uLi9tb2RlbC9pbnRlcmZhY2VzL3dhbGwtZGVmaW5pdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHtJV2FsbFJvd30gZnJvbSAnLi4vLi4vbW9kZWwvaW50ZXJmYWNlcy93YWxsLXJvdy5pbnRlcmZhY2UnO1xuaW1wb3J0IHtXYWxsQnJpY2t9IGZyb20gJy4uLy4uL21vZGVsL3dhbGwtYnJpY2subW9kZWwnO1xuaW1wb3J0IHtCcmlja1JlZ2lzdHJ5fSBmcm9tICcuLi8uLi9yZWdpc3RyeS9icmljay1yZWdpc3RyeS5zZXJ2aWNlJztcbmltcG9ydCB7QWRkQnJpY2tFdmVudH0gZnJvbSAnLi9ldmVudHMvYWRkLWJyaWNrLmV2ZW50JztcbmltcG9ydCB7QmVmb3JlQ2hhbmdlRXZlbnR9IGZyb20gJy4vZXZlbnRzL2JlZm9yZS1jaGFuZ2UuZXZlbnQnO1xuaW1wb3J0IHtNb3ZlQnJpY2tFdmVudH0gZnJvbSAnLi9ldmVudHMvbW92ZS1icmljay5ldmVudCc7XG5pbXBvcnQge1JlbW92ZUJyaWNrRXZlbnR9IGZyb20gJy4vZXZlbnRzL3JlbW92ZS1icmljay5ldmVudCc7XG5pbXBvcnQge1JlbW92ZUJyaWNrc0V2ZW50fSBmcm9tICcuL2V2ZW50cy9yZW1vdmUtYnJpY2tzLmV2ZW50JztcbmltcG9ydCB7U2V0UGxhbkV2ZW50fSBmcm9tICcuL2V2ZW50cy9zZXQtcGxhbi5ldmVudCc7XG5pbXBvcnQge1R1cm5Ccmlja0ludG9FdmVudH0gZnJvbSAnLi9ldmVudHMvdHVybi1icmljay1pbnRvLmV2ZW50JztcbmltcG9ydCB7VXBkYXRlQnJpY2tTdGF0ZUV2ZW50fSBmcm9tICcuL2V2ZW50cy91cGRhdGUtYnJpY2stc3RhdGUuZXZlbnQnO1xuaW1wb3J0IHtMYXlvdXRXYWxrZXJ9IGZyb20gJy4vbGF5b3V0LXdhbGtlci5jbGFzcyc7XG5pbXBvcnQge1dhbGxMYXlvdXR9IGZyb20gJy4vd2FsbC1sYXlvdXQubW9kZWwnO1xuaW1wb3J0IHtJV2FsbFBsdWdpbn0gZnJvbSAnLi4vLi4vbW9kZWwvaW50ZXJmYWNlcy93YWxsLXBsdWdpbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHtJV2FsbE1vZGVsfSBmcm9tICcuLi8uLi9tb2RlbC9pbnRlcmZhY2VzL3dhbGwtbW9kZWwuaW50ZXJmYWNlJztcbmltcG9ydCB7SUJyaWNrU25hcHNob3R9IGZyb20gJy4uLy4uL21vZGVsL2ludGVyZmFjZXMvYnJpY2stc25hcHNob3QuaW50ZXJmYWNlJztcblxuLypcbiogQ29udGFpbnMgV2FsbCBkYXRhIHN0cnVjdHVyZSBhbmQgcmVnaXN0ZXJzIEFQSSBmb3IgZGF0YSBtYW5pcHVsYXRpb24uXG4qIFJlc3BvbnNpYmxlIHRvIElXYWxsRGVmaW5pdGlvbi0+TGF5b3V0IGFuZCBMYXlvdXQtPklXYWxsRGVmaW5pdGlvbiB0cmFuc2Zvcm1hdGlvblxuKiAqL1xuZXhwb3J0IGNsYXNzIFdhbGxDb3JlUGx1Z2luIGltcGxlbWVudHMgSVdhbGxQbHVnaW4ge1xuICAgIG5hbWUgPSAnY29yZSc7XG4gICAgdmVyc2lvbiA9ICcwLjAuMCc7XG5cbiAgICAvLyBzdWIgcGx1Z2luc1xuICAgIHByaXZhdGUgbGF5b3V0OiBXYWxsTGF5b3V0O1xuICAgIHByaXZhdGUgbGF5b3V0V2Fsa2VyOiBMYXlvdXRXYWxrZXIgPSBuZXcgTGF5b3V0V2Fsa2VyKHRoaXMuYnJpY2tSZWdpc3RyeSk7XG5cbiAgICBwcml2YXRlIHdhbGxNb2RlbDogSVdhbGxNb2RlbDtcblxuICAgIHByaXZhdGUgREVGQVVMVF9CUklDSyA9ICd0ZXh0JztcblxuICAgIHByaXZhdGUgZXZlbnRzOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBicmlja1JlZ2lzdHJ5OiBCcmlja1JlZ2lzdHJ5KSB7XG4gICAgfVxuXG4gICAgLy8gU1RBUlQgQVBJXG5cbiAgICBvbldhbGxJbml0aWFsaXplKHdhbGxNb2RlbDogSVdhbGxNb2RlbCkge1xuICAgICAgICB0aGlzLndhbGxNb2RlbCA9IHdhbGxNb2RlbDtcblxuICAgICAgICBbXG4gICAgICAgICAgICAnZ2V0Um93Q291bnQnLFxuICAgICAgICAgICAgJ2dldEJyaWNrVGFnJyxcbiAgICAgICAgICAgICdnZXRQcmV2aW91c0JyaWNrSWQnLFxuICAgICAgICAgICAgJ2dldE5leHRCcmlja0lkJyxcbiAgICAgICAgICAgICdnZXRDb2x1bW5Db3VudCcsXG4gICAgICAgICAgICAnZ2V0QnJpY2tJZHMnLFxuICAgICAgICAgICAgJ2dldEJyaWNrc0NvdW50JyxcbiAgICAgICAgICAgICdnZXROZXh0VGV4dEJyaWNrSWQnLFxuICAgICAgICAgICAgJ2dldFByZXZpb3VzVGV4dEJyaWNrSWQnLFxuICAgICAgICAgICAgJ2ZpbHRlckJyaWNrcycsXG4gICAgICAgICAgICAnaXNCcmlja0FoZWFkT2YnXG4gICAgICAgIF0uZm9yRWFjaCgobWV0aG9kTmFtZSkgPT4ge1xuICAgICAgICAgICAgdGhpc1ttZXRob2ROYW1lXSA9IHRoaXMubGF5b3V0V2Fsa2VyW21ldGhvZE5hbWVdLmJpbmQodGhpcy5sYXlvdXRXYWxrZXIpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLndhbGxNb2RlbC5yZWdpc3RlckFwaSh0aGlzLm5hbWUsIHRoaXMpO1xuICAgIH1cblxuICAgIC8vIG9sZFxuXG4gICAgLy8gQ09NTUFORCBNRVRIT0RTXG4gICAgc2V0UGxhbihwbGFuOiBJV2FsbERlZmluaXRpb24pIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaChuZXcgQmVmb3JlQ2hhbmdlRXZlbnQoU2V0UGxhbkV2ZW50KSk7XG5cbiAgICAgICAgdGhpcy5sYXlvdXQgPSBuZXcgV2FsbExheW91dCh0aGlzLmJyaWNrUmVnaXN0cnksIHRoaXMubGF5b3V0V2Fsa2VyKTtcblxuICAgICAgICB0aGlzLmxheW91dFdhbGtlci5zZXRMYXlvdXQodGhpcy5sYXlvdXQucm93cyk7XG5cbiAgICAgICAgLy8gYnVpbGQgdHJlZVxuICAgICAgICBwbGFuLmxheW91dC5icmlja3MuZm9yRWFjaCgocm93LCByb3dJbmRleCkgPT4ge1xuICAgICAgICAgICAgcm93LmNvbHVtbnMuZm9yRWFjaCgoY29sdW1uLCBjb2x1bW5JbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5icmlja3MuZm9yRWFjaCgoYnJpY2ssIGJyaWNrSW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGxhbkJyaWNrID0gcGxhbi5icmlja3MuZmluZCgoY3VycmVudFBsYW5CcmljaykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJyaWNrLmlkID09PSBjdXJyZW50UGxhbkJyaWNrLmlkO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCB3YWxsQnJpY2sgPSB0aGlzLnJlc3RvcmVCcmljayhwbGFuQnJpY2spO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGZpcnN0IGNvbHVtbiBpbiBuZXcgcm93XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2x1bW5JbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJyaWNrSW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxheW91dC5hZGRCcmlja1RvTmV3Um93KHJvd0luZGV4LCB3YWxsQnJpY2ssIHJvdy5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGF5b3V0LmFkZEJyaWNrVG9FeGlzdGluZ0NvbHVtbihyb3dJbmRleCwgY29sdW1uSW5kZXgsIGJyaWNrSW5kZXgsIHdhbGxCcmljayk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYnJpY2tJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGF5b3V0LmFkZEJyaWNrVG9OZXdDb2x1bW4ocm93SW5kZXgsIGNvbHVtbkluZGV4LCB3YWxsQnJpY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxheW91dC5hZGRCcmlja1RvRXhpc3RpbmdDb2x1bW4ocm93SW5kZXgsIGNvbHVtbkluZGV4LCBicmlja0luZGV4LCB3YWxsQnJpY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5kaXNwYXRjaChuZXcgU2V0UGxhbkV2ZW50KCkpO1xuICAgIH1cblxuICAgIGFkZEJyaWNrQWZ0ZXJCcmlja0lkKGJyaWNrSWQ6IHN0cmluZywgdGFnOiBzdHJpbmcsIHN0YXRlPzogYW55KTogSUJyaWNrU25hcHNob3Qge1xuICAgICAgICB0aGlzLmRpc3BhdGNoKG5ldyBCZWZvcmVDaGFuZ2VFdmVudChBZGRCcmlja0V2ZW50KSk7XG5cbiAgICAgICAgY29uc3QgYnJpY2tQb3NpdGlvbiA9IHRoaXMubGF5b3V0V2Fsa2VyLmdldEJyaWNrUG9zaXRpb24oYnJpY2tJZCk7XG4gICAgICAgIGNvbnN0IGNvbHVtbkNvdW50ID0gdGhpcy5sYXlvdXRXYWxrZXIuZ2V0Q29sdW1uQ291bnQoYnJpY2tQb3NpdGlvbi5yb3dJbmRleCk7XG4gICAgICAgIGNvbnN0IG5ld0JyaWNrID0gdGhpcy5jcmVhdGVCcmljayh0YWcsIHN0YXRlKTtcblxuICAgICAgICBpZiAoY29sdW1uQ291bnQgPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMubGF5b3V0LmFkZEJyaWNrVG9OZXdSb3coYnJpY2tQb3NpdGlvbi5yb3dJbmRleCArIDEsIG5ld0JyaWNrKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb2x1bW5Db3VudCA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMubGF5b3V0LmFkZEJyaWNrVG9FeGlzdGluZ0NvbHVtbihcbiAgICAgICAgICAgICAgICBicmlja1Bvc2l0aW9uLnJvd0luZGV4LFxuICAgICAgICAgICAgICAgIGJyaWNrUG9zaXRpb24uY29sdW1uSW5kZXgsXG4gICAgICAgICAgICAgICAgYnJpY2tQb3NpdGlvbi5icmlja0luZGV4ICsgMSxcbiAgICAgICAgICAgICAgICBuZXdCcmljayk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRpc3BhdGNoKG5ldyBBZGRCcmlja0V2ZW50KG5ld0JyaWNrLmlkKSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QnJpY2tTbmFwc2hvdChuZXdCcmljay5pZCk7XG4gICAgfVxuXG4gICAgYWRkQnJpY2tCZWZvcmVCcmlja0lkKGJyaWNrSWQ6IHN0cmluZywgdGFnOiBzdHJpbmcsIHN0YXRlPzogYW55KTogSUJyaWNrU25hcHNob3Qge1xuICAgICAgICB0aGlzLmRpc3BhdGNoKG5ldyBCZWZvcmVDaGFuZ2VFdmVudChBZGRCcmlja0V2ZW50KSk7XG5cbiAgICAgICAgY29uc3QgYnJpY2tQb3NpdGlvbiA9IHRoaXMubGF5b3V0V2Fsa2VyLmdldEJyaWNrUG9zaXRpb24oYnJpY2tJZCk7XG4gICAgICAgIGNvbnN0IGNvbHVtbkNvdW50ID0gdGhpcy5sYXlvdXRXYWxrZXIuZ2V0Q29sdW1uQ291bnQoYnJpY2tQb3NpdGlvbi5yb3dJbmRleCk7XG4gICAgICAgIGNvbnN0IG5ld0JyaWNrID0gdGhpcy5jcmVhdGVCcmljayh0YWcsIHN0YXRlKTtcblxuICAgICAgICBpZiAoY29sdW1uQ291bnQgPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMubGF5b3V0LmFkZEJyaWNrVG9OZXdSb3coYnJpY2tQb3NpdGlvbi5yb3dJbmRleCwgbmV3QnJpY2spO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbHVtbkNvdW50ID4gMSkge1xuICAgICAgICAgICAgdGhpcy5sYXlvdXQuYWRkQnJpY2tUb0V4aXN0aW5nQ29sdW1uKFxuICAgICAgICAgICAgICAgIGJyaWNrUG9zaXRpb24ucm93SW5kZXgsXG4gICAgICAgICAgICAgICAgYnJpY2tQb3NpdGlvbi5jb2x1bW5JbmRleCxcbiAgICAgICAgICAgICAgICBicmlja1Bvc2l0aW9uLmJyaWNrSW5kZXgsXG4gICAgICAgICAgICAgICAgbmV3QnJpY2spO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kaXNwYXRjaChuZXcgQWRkQnJpY2tFdmVudChuZXdCcmljay5pZCkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmdldEJyaWNrU25hcHNob3QobmV3QnJpY2suaWQpO1xuICAgIH1cblxuICAgIC8vIEFkZCB0ZXh0IGJyaWNrIHRvIHRoZSBib3R0b20gb2Ygd2FsbCBpbiB0aGUgbmV3IHJvd1xuICAgIGFkZERlZmF1bHRCcmljaygpIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaChuZXcgQmVmb3JlQ2hhbmdlRXZlbnQoQWRkQnJpY2tFdmVudCkpO1xuXG4gICAgICAgIGNvbnN0IGJyaWNrQ291bnQgPSB0aGlzLmxheW91dFdhbGtlci5nZXRCcmlja3NDb3VudCgpO1xuICAgICAgICBjb25zdCBuZXdCcmljayA9IHRoaXMuY3JlYXRlQnJpY2sodGhpcy5ERUZBVUxUX0JSSUNLKTtcbiAgICAgICAgY29uc3Qgcm93SW5kZXggPSBicmlja0NvdW50ID8gdGhpcy5sYXlvdXRXYWxrZXIuZ2V0Um93Q291bnQoKSArIDEgOiAwO1xuXG4gICAgICAgIHRoaXMubGF5b3V0LmFkZEJyaWNrVG9OZXdSb3cocm93SW5kZXgsIG5ld0JyaWNrKTtcblxuICAgICAgICB0aGlzLmRpc3BhdGNoKG5ldyBBZGRCcmlja0V2ZW50KG5ld0JyaWNrLmlkKSk7XG4gICAgfVxuXG4gICAgYWRkQnJpY2tBdFN0YXJ0KHRhZzogc3RyaW5nLCBzdGF0ZT86IGFueSk6IElCcmlja1NuYXBzaG90IHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaChuZXcgQmVmb3JlQ2hhbmdlRXZlbnQoQWRkQnJpY2tFdmVudCkpO1xuXG4gICAgICAgIGNvbnN0IG5ld0JyaWNrID0gdGhpcy5jcmVhdGVCcmljayh0YWcsIHN0YXRlKTtcblxuICAgICAgICB0aGlzLmxheW91dC5hZGRCcmlja1RvTmV3Um93KDAsIG5ld0JyaWNrKTtcblxuICAgICAgICB0aGlzLmRpc3BhdGNoKG5ldyBBZGRCcmlja0V2ZW50KG5ld0JyaWNrLmlkKSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QnJpY2tTbmFwc2hvdChuZXdCcmljay5pZCk7XG4gICAgfVxuXG4gICAgdXBkYXRlQnJpY2tTdGF0ZShicmlja0lkLCBicmlja1N0YXRlKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2gobmV3IEJlZm9yZUNoYW5nZUV2ZW50KFVwZGF0ZUJyaWNrU3RhdGVFdmVudCkpO1xuXG4gICAgICAgIGNvbnN0IGJyaWNrID0gdGhpcy5sYXlvdXRXYWxrZXIuZ2V0QnJpY2tCeUlkKGJyaWNrSWQpO1xuXG4gICAgICAgIGNvbnN0IG9sZFN0YXRlID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShicmljay5nZXRTdGF0ZSgpKSk7XG5cbiAgICAgICAgYnJpY2sudXBkYXRlU3RhdGUoSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShicmlja1N0YXRlKSkpO1xuXG4gICAgICAgIHRoaXMuZGlzcGF0Y2gobmV3IFVwZGF0ZUJyaWNrU3RhdGVFdmVudChcbiAgICAgICAgICAgIGJyaWNrSWQsXG4gICAgICAgICAgICBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGJyaWNrLmdldFN0YXRlKCkpKSxcbiAgICAgICAgICAgIG9sZFN0YXRlXG4gICAgICAgICkpO1xuICAgIH1cblxuICAgIC8vIHRvZG86IHNob3VsZCBiZSBhc3luYyBvcGVyYXRpb25cbiAgICByZW1vdmVCcmljayhicmlja0lkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaChuZXcgQmVmb3JlQ2hhbmdlRXZlbnQoUmVtb3ZlQnJpY2tFdmVudCkpO1xuXG4gICAgICAgIGNvbnN0IG5leHRUZXh0QnJpY2sgPSB0aGlzLmxheW91dFdhbGtlci5nZXROZXh0VGV4dEJyaWNrKGJyaWNrSWQpO1xuICAgICAgICBjb25zdCBwcmV2aW91c1RleHRCcmljayA9IHRoaXMubGF5b3V0V2Fsa2VyLmdldFByZXZpb3VzVGV4dEJyaWNrKGJyaWNrSWQpO1xuXG4gICAgICAgIHRoaXMuY2xlYXJCcmlja1Jlc291cmNlcyhicmlja0lkKS50aGVuKCgpID0+IHtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgcmVtb3ZlZEJyaWNrID0gdGhpcy5sYXlvdXRXYWxrZXIuZ2V0QnJpY2tCeUlkKGJyaWNrSWQpO1xuXG4gICAgICAgIHRoaXMubGF5b3V0LnJlbW92ZUJyaWNrKGJyaWNrSWQpO1xuXG4gICAgICAgIHRoaXMuZGlzcGF0Y2gobmV3IFJlbW92ZUJyaWNrRXZlbnQoXG4gICAgICAgICAgICByZW1vdmVkQnJpY2suZ2V0U25hcHNob3QoKSxcbiAgICAgICAgICAgIHByZXZpb3VzVGV4dEJyaWNrICYmIHByZXZpb3VzVGV4dEJyaWNrLmlkLFxuICAgICAgICAgICAgbmV4dFRleHRCcmljayAmJiBuZXh0VGV4dEJyaWNrLmlkXG4gICAgICAgICkpO1xuICAgIH1cblxuICAgIC8vIHRvZG86IHNob3VsZCBiZSBhc3luYyBvcGVyYXRpb25cbiAgICByZW1vdmVCcmlja3MoYnJpY2tJZHMpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaChuZXcgQmVmb3JlQ2hhbmdlRXZlbnQoUmVtb3ZlQnJpY2tzRXZlbnQpKTtcblxuICAgICAgICBjb25zdCBuZXh0VGV4dEJyaWNrID0gdGhpcy5sYXlvdXRXYWxrZXIuZ2V0TmV4dEJyaWNrKGJyaWNrSWRzW2JyaWNrSWRzLmxlbmd0aCAtIDFdKTtcbiAgICAgICAgY29uc3QgcHJldmlvdXNCcmljayA9IHRoaXMubGF5b3V0V2Fsa2VyLmdldFByZXZpb3VzQnJpY2soYnJpY2tJZHNbMF0pO1xuXG4gICAgICAgIGNvbnN0IGNsZWFyUHJvbWlzZXMgPSBicmlja0lkcy5tYXAoKGJyaWNrSWQpID0+IHRoaXMuY2xlYXJCcmlja1Jlc291cmNlcyhicmlja0lkKSk7XG5cbiAgICAgICAgUHJvbWlzZS5hbGwoY2xlYXJQcm9taXNlcykudGhlbigoKSA9PiB7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHJlbW92ZWRCcmlja3MgPSBicmlja0lkcy5tYXAoKGJyaWNrSWQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlbW92ZWRCcmljayA9IHRoaXMubGF5b3V0V2Fsa2VyLmdldEJyaWNrQnlJZChicmlja0lkKTtcblxuICAgICAgICAgICAgdGhpcy5sYXlvdXQucmVtb3ZlQnJpY2soYnJpY2tJZCk7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaWQ6IHJlbW92ZWRCcmljay5pZCxcbiAgICAgICAgICAgICAgICB0YWc6IHJlbW92ZWRCcmljay50YWcsXG4gICAgICAgICAgICAgICAgc3RhdGU6IHJlbW92ZWRCcmljay5zdGF0ZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5kaXNwYXRjaChuZXcgUmVtb3ZlQnJpY2tzRXZlbnQoXG4gICAgICAgICAgICByZW1vdmVkQnJpY2tzLFxuICAgICAgICAgICAgcHJldmlvdXNCcmljayAmJiBwcmV2aW91c0JyaWNrLmlkLFxuICAgICAgICAgICAgbmV4dFRleHRCcmljayAmJiBuZXh0VGV4dEJyaWNrLmlkXG4gICAgICAgICkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhbGwgYnJpY2tzIGZyb20gbGF5b3V0XG4gICAgICogQ2xlYXIgYWxsIGJyaWNrcyBleHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAgICAgKi9cbiAgICBjbGVhcigpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBjb25zdCBicmlja0lkcyA9IHRoaXMubGF5b3V0V2Fsa2VyLmdldEJyaWNrSWRzKCk7XG5cbiAgICAgICAgLy8gdG9kbzogcmVwbGFjZSBpdCBhZnRlciByZW1vdmVCcmlja3Mgd2lsbCBiZSBhc3luY1xuICAgICAgICBjb25zdCBjbGVhclByb21pc2VzID0gYnJpY2tJZHMubWFwKChicmlja0lkKSA9PiB0aGlzLmNsZWFyQnJpY2tSZXNvdXJjZXMoYnJpY2tJZCkpO1xuXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChjbGVhclByb21pc2VzKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGJyaWNrSWRzLmZvckVhY2goKGJyaWNrSWQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxheW91dC5yZW1vdmVCcmljayhicmlja0lkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB0dXJuQnJpY2tJbnRvKGJyaWNrSWQ6IHN0cmluZywgbmV3VGFnOiBzdHJpbmcsIHN0YXRlOiBhbnkgPSB7fSkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoKG5ldyBCZWZvcmVDaGFuZ2VFdmVudChUdXJuQnJpY2tJbnRvRXZlbnQpKTtcblxuICAgICAgICBjb25zdCBicmljayA9IHRoaXMubGF5b3V0V2Fsa2VyLmdldEJyaWNrQnlJZChicmlja0lkKTtcbiAgICAgICAgY29uc3Qgb2xkVGFnID0gYnJpY2sudGFnO1xuXG4gICAgICAgIGJyaWNrXG4gICAgICAgICAgICAudHVybkludG8obmV3VGFnKVxuICAgICAgICAgICAgLnVwZGF0ZVN0YXRlKHN0YXRlKTtcblxuICAgICAgICB0aGlzLmRpc3BhdGNoKG5ldyBUdXJuQnJpY2tJbnRvRXZlbnQoYnJpY2tJZCwgbmV3VGFnLCBvbGRUYWcpKTtcbiAgICB9XG5cbiAgICBtb3ZlQnJpY2tBZnRlckJyaWNrSWQobW92ZWRCcmlja0lkczogc3RyaW5nW10sIGFmdGVyQnJpY2tJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGlmIChtb3ZlZEJyaWNrSWRzLmluZGV4T2YoYWZ0ZXJCcmlja0lkKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2gobmV3IEJlZm9yZUNoYW5nZUV2ZW50KE1vdmVCcmlja0V2ZW50KSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGFmdGVyQnJpY2tQb3NpdGlvbiA9IHRoaXMubGF5b3V0V2Fsa2VyLmdldEJyaWNrUG9zaXRpb24oYWZ0ZXJCcmlja0lkKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbkNvdW50ID0gdGhpcy5sYXlvdXRXYWxrZXIuZ2V0Q29sdW1uQ291bnQoYWZ0ZXJCcmlja1Bvc2l0aW9uLnJvd0luZGV4KTtcblxuICAgICAgICAgICAgaWYgKGNvbHVtbkNvdW50ID09PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXlvdXQubW92ZUJyaWNrQWZ0ZXJJbk5ld1JvdyhhZnRlckJyaWNrSWQsIG1vdmVkQnJpY2tJZHMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxheW91dC5tb3ZlQnJpY2tBZnRlckluU2FtZUNvbHVtbihhZnRlckJyaWNrSWQsIG1vdmVkQnJpY2tJZHMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoKG5ldyBNb3ZlQnJpY2tFdmVudChtb3ZlZEJyaWNrSWRzLCBhZnRlckJyaWNrSWQpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVCcmlja0JlZm9yZUJyaWNrSWQobW92ZWRCcmlja0lkczogc3RyaW5nW10sIGJlZm9yZUJyaWNrSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBpZiAobW92ZWRCcmlja0lkcy5pbmRleE9mKGJlZm9yZUJyaWNrSWQpID09PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaChuZXcgQmVmb3JlQ2hhbmdlRXZlbnQoTW92ZUJyaWNrRXZlbnQpKTtcblxuICAgICAgICAgICAgY29uc3QgYmVmb3JlQnJpY2tQb3NpdGlvbiA9IHRoaXMubGF5b3V0V2Fsa2VyLmdldEJyaWNrUG9zaXRpb24oYmVmb3JlQnJpY2tJZCk7XG4gICAgICAgICAgICBjb25zdCBjb2x1bW5Db3VudCA9IHRoaXMubGF5b3V0V2Fsa2VyLmdldENvbHVtbkNvdW50KGJlZm9yZUJyaWNrUG9zaXRpb24ucm93SW5kZXgpO1xuXG4gICAgICAgICAgICBpZiAoY29sdW1uQ291bnQgPT09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxheW91dC5tb3ZlQnJpY2tCZWZvcmVJbk5ld1JvdyhiZWZvcmVCcmlja0lkLCBtb3ZlZEJyaWNrSWRzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXlvdXQubW92ZUJyaWNrQmVmb3JlSW5TYW1lQ29sdW1uKGJlZm9yZUJyaWNrSWQsIG1vdmVkQnJpY2tJZHMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoKG5ldyBNb3ZlQnJpY2tFdmVudChtb3ZlZEJyaWNrSWRzLCBiZWZvcmVCcmlja0lkKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlQnJpY2tUb05ld0NvbHVtbih0YXJnZXRCcmlja0lkczogc3RyaW5nW10sIGJlZm9yZUJyaWNrSWQ6IHN0cmluZywgc2lkZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGlmICh0YXJnZXRCcmlja0lkcy5pbmRleE9mKGJlZm9yZUJyaWNrSWQpID09PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaChuZXcgQmVmb3JlQ2hhbmdlRXZlbnQoTW92ZUJyaWNrRXZlbnQpKTtcblxuICAgICAgICAgICAgdGhpcy5sYXlvdXQubW92ZUJyaWNrVG9OZXdDb2x1bW4odGFyZ2V0QnJpY2tJZHMsIGJlZm9yZUJyaWNrSWQsIHNpZGUpO1xuXG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoKG5ldyBNb3ZlQnJpY2tFdmVudCh0YXJnZXRCcmlja0lkcywgYmVmb3JlQnJpY2tJZCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gUVVFUlkgTUVUSE9EU1xuICAgIGdldFBsYW4oKTogSVdhbGxEZWZpbml0aW9uIHtcbiAgICAgICAgY29uc3QgcGxhbiA9IHtcbiAgICAgICAgICAgIGJyaWNrczogW10sXG4gICAgICAgICAgICBsYXlvdXQ6IHtcbiAgICAgICAgICAgICAgICBicmlja3M6IFtdXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5sYXlvdXRXYWxrZXIudHJhdmVyc2UoKHJvdzogSVdhbGxSb3cpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbnMgPSBbXTtcblxuICAgICAgICAgICAgcm93LmNvbHVtbnMuZm9yRWFjaCgoY29sdW1uOiBJV2FsbENvbHVtbikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBsYW5Db2x1bW4gPSB7XG4gICAgICAgICAgICAgICAgICAgIGJyaWNrczogW11cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgY29sdW1uLmJyaWNrcy5mb3JFYWNoKChicmljazogV2FsbEJyaWNrKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHBsYW4uYnJpY2tzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGJyaWNrLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiBicmljay50YWcsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRhOiBicmljay5tZXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogYnJpY2suc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcGxhbkNvbHVtbi5icmlja3MucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogYnJpY2suaWRcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBjb2x1bW5zLnB1c2gocGxhbkNvbHVtbik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcGxhbi5sYXlvdXQuYnJpY2tzLnB1c2goe1xuICAgICAgICAgICAgICAgIGNvbHVtbnMsXG4gICAgICAgICAgICAgICAgaWQ6IHJvdy5pZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHBsYW4pKTtcbiAgICB9XG5cbiAgICBzb3J0QnJpY2tJZHNCeUxheW91dE9yZGVyKGJyaWNrSWRzOiBzdHJpbmdbXSkge1xuICAgICAgICBjb25zdCBicmlja3NTZXF1ZW5jZSA9IHRoaXMubGF5b3V0V2Fsa2VyLmdldEJyaWNrU2VxdWVuY2UoKCkgPT4gdHJ1ZSk7XG5cbiAgICAgICAgcmV0dXJuIGJyaWNrc1NlcXVlbmNlXG4gICAgICAgICAgICAuZmlsdGVyKChicmljaykgPT4gYnJpY2tJZHMuaW5kZXhPZihicmljay5pZCkgIT09IC0xKVxuICAgICAgICAgICAgLm1hcCgoYnJpY2spID0+IGJyaWNrLmlkKTtcbiAgICB9XG5cbiAgICB0cmF2ZXJzZShmbik6IHZvaWQge1xuICAgICAgICByZXR1cm4gdGhpcy5sYXlvdXRXYWxrZXIudHJhdmVyc2UoKHJvdzogSVdhbGxSb3cpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByZXBhcmVkUm93ID0ge1xuICAgICAgICAgICAgICAgIGlkOiByb3cuaWQsXG5cbiAgICAgICAgICAgICAgICBjb2x1bW5zOiByb3cuY29sdW1ucy5tYXAoKGNvbHVtbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJpY2tzOiBjb2x1bW4uYnJpY2tzLm1hcCgoYnJpY2spID0+IGJyaWNrLmdldFNuYXBzaG90KCkpXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGZuKHByZXBhcmVkUm93KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0QnJpY2tTbmFwc2hvdChicmlja0lkOiBzdHJpbmcpOiBJQnJpY2tTbmFwc2hvdCB7XG4gICAgICAgIGNvbnN0IGJyaWNrID0gdGhpcy5sYXlvdXRXYWxrZXIuZ2V0QnJpY2tCeUlkKGJyaWNrSWQpO1xuXG4gICAgICAgIHJldHVybiBicmljayA/IGJyaWNrLmdldFNuYXBzaG90KCkgOiBudWxsO1xuICAgIH1cblxuICAgIGdldEJyaWNrUmVzb3VyY2VQYXRocyhicmlja0lkOiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gICAgICAgIGNvbnN0IGJyaWNrID0gdGhpcy5sYXlvdXRXYWxrZXIuZ2V0QnJpY2tCeUlkKGJyaWNrSWQpO1xuXG4gICAgICAgIGNvbnN0IGJyaWNrU3BlY2lmaWNhdGlvbiA9IHRoaXMuYnJpY2tSZWdpc3RyeS5nZXQoYnJpY2sudGFnKTtcblxuICAgICAgICBpZiAoIWJyaWNrU3BlY2lmaWNhdGlvbi5nZXRCcmlja1Jlc291cmNlUGF0aHMpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBicmlja1NwZWNpZmljYXRpb24uZ2V0QnJpY2tSZXNvdXJjZVBhdGhzKGJyaWNrLmdldFNuYXBzaG90KCkpO1xuICAgIH1cblxuICAgIGdldEJyaWNrVGV4dFJlcHJlc2VudGF0aW9uKGJyaWNrSWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGJyaWNrID0gdGhpcy5sYXlvdXRXYWxrZXIuZ2V0QnJpY2tCeUlkKGJyaWNrSWQpO1xuXG4gICAgICAgIGNvbnN0IGJyaWNrU3BlY2lmaWNhdGlvbiA9IHRoaXMuYnJpY2tSZWdpc3RyeS5nZXQoYnJpY2sudGFnKTtcblxuICAgICAgICBpZiAoYnJpY2tTcGVjaWZpY2F0aW9uLnRleHRSZXByZXNlbnRhdGlvbikge1xuICAgICAgICAgICAgY29uc3QgYnJpY2tUZXh0UmVwcmVzZW50YXRpb24gPSBuZXcgYnJpY2tTcGVjaWZpY2F0aW9uLnRleHRSZXByZXNlbnRhdGlvbihicmljay5nZXRTbmFwc2hvdCgpKTtcblxuICAgICAgICAgICAgcmV0dXJuIGJyaWNrVGV4dFJlcHJlc2VudGF0aW9uLmdldFRleHQoKSB8fCAnJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN1YnNjcmliZShjYWxsYmFjayk6IFN1YnNjcmlwdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50cy5zdWJzY3JpYmUoY2FsbGJhY2spO1xuICAgIH1cblxuICAgIGlzUmVnaXN0ZXJlZEJyaWNrKHRhZzogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBCb29sZWFuKHRoaXMuYnJpY2tSZWdpc3RyeS5nZXQodGFnKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkaXNwYXRjaChlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ldmVudHMubmV4dChlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUJyaWNrKHRhZywgc3RhdGU/OiBhbnkpIHtcbiAgICAgICAgY29uc3QgaWQgPSB0aGlzLmdlbmVyYXRlR3VpZCgpO1xuICAgICAgICBjb25zdCBtZXRhID0ge307XG4gICAgICAgIGNvbnN0IGJyaWNrID0gbmV3IFdhbGxCcmljayhpZCwgdGFnLCBtZXRhKTtcblxuICAgICAgICBpZiAoc3RhdGUpIHtcbiAgICAgICAgICAgIGJyaWNrLnVwZGF0ZVN0YXRlKHN0YXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBicmljaztcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc3RvcmVCcmljayhicmlja0RlZmluaXRpb246IElCcmlja0RlZmluaXRpb24pOiBXYWxsQnJpY2sge1xuICAgICAgICBjb25zdCBicmljayA9IG5ldyBXYWxsQnJpY2soXG4gICAgICAgICAgICBicmlja0RlZmluaXRpb24uaWQsXG4gICAgICAgICAgICBicmlja0RlZmluaXRpb24udGFnLFxuICAgICAgICAgICAgYnJpY2tEZWZpbml0aW9uLm1ldGFcbiAgICAgICAgKTtcblxuICAgICAgICBicmljay51cGRhdGVTdGF0ZShicmlja0RlZmluaXRpb24uZGF0YSk7XG5cbiAgICAgICAgcmV0dXJuIGJyaWNrO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2xlYXJCcmlja1Jlc291cmNlcyhicmlja0lkKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgY29uc3QgYnJpY2sgPSB0aGlzLmxheW91dFdhbGtlci5nZXRCcmlja0J5SWQoYnJpY2tJZCk7XG5cbiAgICAgICAgY29uc3QgYnJpY2tTcGVjaWZpY2F0aW9uID0gdGhpcy5icmlja1JlZ2lzdHJ5LmdldChicmljay50YWcpO1xuXG4gICAgICAgIGlmIChicmlja1NwZWNpZmljYXRpb24uZGVzdHJ1Y3Rvcikge1xuICAgICAgICAgICAgcmV0dXJuIGJyaWNrU3BlY2lmaWNhdGlvbi5kZXN0cnVjdG9yKGJyaWNrLmdldFNuYXBzaG90KCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZUd1aWQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIChuZXcgR3VpZCgpKS5nZXQoKTtcbiAgICB9XG59XG4iXX0=