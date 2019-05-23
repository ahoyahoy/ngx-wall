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
var /*
* Contains Wall data structure and registers API for data manipulation.
* Responsible to IWallDefinition->Layout and Layout->IWallDefinition transformation
* */
WallCorePlugin = /** @class */ (function () {
    function WallCorePlugin(brickRegistry) {
        this.brickRegistry = brickRegistry;
        this.name = 'core';
        this.version = '0.0.0';
        this.layoutWalker = new LayoutWalker(this.brickRegistry);
        this.DEFAULT_BRICK = 'text';
        this.events = new Subject();
    }
    // START API
    // START API
    /**
     * @param {?} wallModel
     * @return {?}
     */
    WallCorePlugin.prototype.onWallInitialize = 
    // START API
    /**
     * @param {?} wallModel
     * @return {?}
     */
    function (wallModel) {
        var _this = this;
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
        ].forEach(function (methodName) {
            _this[methodName] = _this.layoutWalker[methodName].bind(_this.layoutWalker);
        });
        this.wallModel.registerApi(this.name, this);
    };
    // old
    // COMMAND METHODS
    // old
    // COMMAND METHODS
    /**
     * @param {?} plan
     * @return {?}
     */
    WallCorePlugin.prototype.setPlan = 
    // old
    // COMMAND METHODS
    /**
     * @param {?} plan
     * @return {?}
     */
    function (plan) {
        var _this = this;
        this.dispatch(new BeforeChangeEvent(SetPlanEvent));
        this.layout = new WallLayout(this.brickRegistry, this.layoutWalker);
        this.layoutWalker.setLayout(this.layout.rows);
        // build tree
        plan.layout.bricks.forEach(function (row, rowIndex) {
            row.columns.forEach(function (column, columnIndex) {
                column.bricks.forEach(function (brick, brickIndex) {
                    /** @type {?} */
                    var planBrick = plan.bricks.find(function (currentPlanBrick) {
                        return brick.id === currentPlanBrick.id;
                    });
                    /** @type {?} */
                    var wallBrick = _this.restoreBrick(planBrick);
                    // first column in new row
                    if (columnIndex === 0) {
                        if (brickIndex === 0) {
                            _this.layout.addBrickToNewRow(rowIndex, wallBrick, row.id);
                        }
                        else {
                            _this.layout.addBrickToExistingColumn(rowIndex, columnIndex, brickIndex, wallBrick);
                        }
                    }
                    else {
                        if (brickIndex === 0) {
                            _this.layout.addBrickToNewColumn(rowIndex, columnIndex, wallBrick);
                        }
                        else {
                            _this.layout.addBrickToExistingColumn(rowIndex, columnIndex, brickIndex, wallBrick);
                        }
                    }
                });
            });
        });
        this.dispatch(new SetPlanEvent());
    };
    /**
     * @param {?} brickId
     * @param {?} tag
     * @param {?=} state
     * @return {?}
     */
    WallCorePlugin.prototype.addBrickAfterBrickId = /**
     * @param {?} brickId
     * @param {?} tag
     * @param {?=} state
     * @return {?}
     */
    function (brickId, tag, state) {
        this.dispatch(new BeforeChangeEvent(AddBrickEvent));
        /** @type {?} */
        var brickPosition = this.layoutWalker.getBrickPosition(brickId);
        /** @type {?} */
        var columnCount = this.layoutWalker.getColumnCount(brickPosition.rowIndex);
        /** @type {?} */
        var newBrick = this.createBrick(tag, state);
        if (columnCount === 1) {
            this.layout.addBrickToNewRow(brickPosition.rowIndex + 1, newBrick);
        }
        else if (columnCount > 1) {
            this.layout.addBrickToExistingColumn(brickPosition.rowIndex, brickPosition.columnIndex, brickPosition.brickIndex + 1, newBrick);
        }
        this.dispatch(new AddBrickEvent(newBrick.id));
        return this.getBrickSnapshot(newBrick.id);
    };
    /**
     * @param {?} brickId
     * @param {?} tag
     * @param {?=} state
     * @return {?}
     */
    WallCorePlugin.prototype.addBrickBeforeBrickId = /**
     * @param {?} brickId
     * @param {?} tag
     * @param {?=} state
     * @return {?}
     */
    function (brickId, tag, state) {
        this.dispatch(new BeforeChangeEvent(AddBrickEvent));
        /** @type {?} */
        var brickPosition = this.layoutWalker.getBrickPosition(brickId);
        /** @type {?} */
        var columnCount = this.layoutWalker.getColumnCount(brickPosition.rowIndex);
        /** @type {?} */
        var newBrick = this.createBrick(tag, state);
        if (columnCount === 1) {
            this.layout.addBrickToNewRow(brickPosition.rowIndex, newBrick);
        }
        else if (columnCount > 1) {
            this.layout.addBrickToExistingColumn(brickPosition.rowIndex, brickPosition.columnIndex, brickPosition.brickIndex, newBrick);
        }
        this.dispatch(new AddBrickEvent(newBrick.id));
        return this.getBrickSnapshot(newBrick.id);
    };
    // Add text brick to the bottom of wall in the new row
    // Add text brick to the bottom of wall in the new row
    /**
     * @return {?}
     */
    WallCorePlugin.prototype.addDefaultBrick = 
    // Add text brick to the bottom of wall in the new row
    /**
     * @return {?}
     */
    function () {
        this.dispatch(new BeforeChangeEvent(AddBrickEvent));
        /** @type {?} */
        var brickCount = this.layoutWalker.getBricksCount();
        /** @type {?} */
        var newBrick = this.createBrick(this.DEFAULT_BRICK);
        /** @type {?} */
        var rowIndex = brickCount ? this.layoutWalker.getRowCount() + 1 : 0;
        this.layout.addBrickToNewRow(rowIndex, newBrick);
        this.dispatch(new AddBrickEvent(newBrick.id));
    };
    /**
     * @param {?} tag
     * @param {?=} state
     * @return {?}
     */
    WallCorePlugin.prototype.addBrickAtStart = /**
     * @param {?} tag
     * @param {?=} state
     * @return {?}
     */
    function (tag, state) {
        this.dispatch(new BeforeChangeEvent(AddBrickEvent));
        /** @type {?} */
        var newBrick = this.createBrick(tag, state);
        this.layout.addBrickToNewRow(0, newBrick);
        this.dispatch(new AddBrickEvent(newBrick.id));
        return this.getBrickSnapshot(newBrick.id);
    };
    /**
     * @param {?} brickId
     * @param {?} brickState
     * @return {?}
     */
    WallCorePlugin.prototype.updateBrickState = /**
     * @param {?} brickId
     * @param {?} brickState
     * @return {?}
     */
    function (brickId, brickState) {
        this.dispatch(new BeforeChangeEvent(UpdateBrickStateEvent));
        /** @type {?} */
        var brick = this.layoutWalker.getBrickById(brickId);
        /** @type {?} */
        var oldState = JSON.parse(JSON.stringify(brick.getState()));
        brick.updateState(JSON.parse(JSON.stringify(brickState)));
        this.dispatch(new UpdateBrickStateEvent(brickId, JSON.parse(JSON.stringify(brick.getState())), oldState));
    };
    // todo: should be async operation
    // todo: should be async operation
    /**
     * @param {?} brickId
     * @return {?}
     */
    WallCorePlugin.prototype.removeBrick = 
    // todo: should be async operation
    /**
     * @param {?} brickId
     * @return {?}
     */
    function (brickId) {
        this.dispatch(new BeforeChangeEvent(RemoveBrickEvent));
        /** @type {?} */
        var nextTextBrick = this.layoutWalker.getNextTextBrick(brickId);
        /** @type {?} */
        var previousTextBrick = this.layoutWalker.getPreviousTextBrick(brickId);
        this.clearBrickResources(brickId).then(function () {
        });
        /** @type {?} */
        var removedBrick = this.layoutWalker.getBrickById(brickId);
        this.layout.removeBrick(brickId);
        this.dispatch(new RemoveBrickEvent(removedBrick.getSnapshot(), previousTextBrick && previousTextBrick.id, nextTextBrick && nextTextBrick.id));
    };
    // todo: should be async operation
    // todo: should be async operation
    /**
     * @param {?} brickIds
     * @return {?}
     */
    WallCorePlugin.prototype.removeBricks = 
    // todo: should be async operation
    /**
     * @param {?} brickIds
     * @return {?}
     */
    function (brickIds) {
        var _this = this;
        this.dispatch(new BeforeChangeEvent(RemoveBricksEvent));
        /** @type {?} */
        var nextTextBrick = this.layoutWalker.getNextBrick(brickIds[brickIds.length - 1]);
        /** @type {?} */
        var previousBrick = this.layoutWalker.getPreviousBrick(brickIds[0]);
        /** @type {?} */
        var clearPromises = brickIds.map(function (brickId) { return _this.clearBrickResources(brickId); });
        Promise.all(clearPromises).then(function () {
        });
        /** @type {?} */
        var removedBricks = brickIds.map(function (brickId) {
            /** @type {?} */
            var removedBrick = _this.layoutWalker.getBrickById(brickId);
            _this.layout.removeBrick(brickId);
            return {
                id: removedBrick.id,
                tag: removedBrick.tag,
                state: removedBrick.state
            };
        });
        this.dispatch(new RemoveBricksEvent(removedBricks, previousBrick && previousBrick.id, nextTextBrick && nextTextBrick.id));
    };
    /**
     * Remove all bricks from layout
     * Clear all bricks external dependencies
     */
    /**
     * Remove all bricks from layout
     * Clear all bricks external dependencies
     * @return {?}
     */
    WallCorePlugin.prototype.clear = /**
     * Remove all bricks from layout
     * Clear all bricks external dependencies
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var brickIds = this.layoutWalker.getBrickIds();
        // todo: replace it after removeBricks will be async
        /** @type {?} */
        var clearPromises = brickIds.map(function (brickId) { return _this.clearBrickResources(brickId); });
        return Promise.all(clearPromises).then(function () {
            brickIds.forEach(function (brickId) {
                _this.layout.removeBrick(brickId);
            });
        });
    };
    /**
     * @param {?} brickId
     * @param {?} newTag
     * @param {?=} state
     * @return {?}
     */
    WallCorePlugin.prototype.turnBrickInto = /**
     * @param {?} brickId
     * @param {?} newTag
     * @param {?=} state
     * @return {?}
     */
    function (brickId, newTag, state) {
        if (state === void 0) { state = {}; }
        this.dispatch(new BeforeChangeEvent(TurnBrickIntoEvent));
        /** @type {?} */
        var brick = this.layoutWalker.getBrickById(brickId);
        /** @type {?} */
        var oldTag = brick.tag;
        brick
            .turnInto(newTag)
            .updateState(state);
        this.dispatch(new TurnBrickIntoEvent(brickId, newTag, oldTag));
    };
    /**
     * @param {?} movedBrickIds
     * @param {?} afterBrickId
     * @return {?}
     */
    WallCorePlugin.prototype.moveBrickAfterBrickId = /**
     * @param {?} movedBrickIds
     * @param {?} afterBrickId
     * @return {?}
     */
    function (movedBrickIds, afterBrickId) {
        if (movedBrickIds.indexOf(afterBrickId) === -1) {
            this.dispatch(new BeforeChangeEvent(MoveBrickEvent));
            /** @type {?} */
            var afterBrickPosition = this.layoutWalker.getBrickPosition(afterBrickId);
            /** @type {?} */
            var columnCount = this.layoutWalker.getColumnCount(afterBrickPosition.rowIndex);
            if (columnCount === 1) {
                this.layout.moveBrickAfterInNewRow(afterBrickId, movedBrickIds);
            }
            else {
                this.layout.moveBrickAfterInSameColumn(afterBrickId, movedBrickIds);
            }
            this.dispatch(new MoveBrickEvent(movedBrickIds, afterBrickId));
        }
    };
    /**
     * @param {?} movedBrickIds
     * @param {?} beforeBrickId
     * @return {?}
     */
    WallCorePlugin.prototype.moveBrickBeforeBrickId = /**
     * @param {?} movedBrickIds
     * @param {?} beforeBrickId
     * @return {?}
     */
    function (movedBrickIds, beforeBrickId) {
        if (movedBrickIds.indexOf(beforeBrickId) === -1) {
            this.dispatch(new BeforeChangeEvent(MoveBrickEvent));
            /** @type {?} */
            var beforeBrickPosition = this.layoutWalker.getBrickPosition(beforeBrickId);
            /** @type {?} */
            var columnCount = this.layoutWalker.getColumnCount(beforeBrickPosition.rowIndex);
            if (columnCount === 1) {
                this.layout.moveBrickBeforeInNewRow(beforeBrickId, movedBrickIds);
            }
            else {
                this.layout.moveBrickBeforeInSameColumn(beforeBrickId, movedBrickIds);
            }
            this.dispatch(new MoveBrickEvent(movedBrickIds, beforeBrickId));
        }
    };
    /**
     * @param {?} targetBrickIds
     * @param {?} beforeBrickId
     * @param {?} side
     * @return {?}
     */
    WallCorePlugin.prototype.moveBrickToNewColumn = /**
     * @param {?} targetBrickIds
     * @param {?} beforeBrickId
     * @param {?} side
     * @return {?}
     */
    function (targetBrickIds, beforeBrickId, side) {
        if (targetBrickIds.indexOf(beforeBrickId) === -1) {
            this.dispatch(new BeforeChangeEvent(MoveBrickEvent));
            this.layout.moveBrickToNewColumn(targetBrickIds, beforeBrickId, side);
            this.dispatch(new MoveBrickEvent(targetBrickIds, beforeBrickId));
        }
    };
    // QUERY METHODS
    // QUERY METHODS
    /**
     * @return {?}
     */
    WallCorePlugin.prototype.getPlan = 
    // QUERY METHODS
    /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var plan = {
            bricks: [],
            layout: {
                bricks: []
            }
        };
        this.layoutWalker.traverse(function (row) {
            /** @type {?} */
            var columns = [];
            row.columns.forEach(function (column) {
                /** @type {?} */
                var planColumn = {
                    bricks: []
                };
                column.bricks.forEach(function (brick) {
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
                columns: columns,
                id: row.id
            });
        });
        return JSON.parse(JSON.stringify(plan));
    };
    /**
     * @param {?} brickIds
     * @return {?}
     */
    WallCorePlugin.prototype.sortBrickIdsByLayoutOrder = /**
     * @param {?} brickIds
     * @return {?}
     */
    function (brickIds) {
        /** @type {?} */
        var bricksSequence = this.layoutWalker.getBrickSequence(function () { return true; });
        return bricksSequence
            .filter(function (brick) { return brickIds.indexOf(brick.id) !== -1; })
            .map(function (brick) { return brick.id; });
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    WallCorePlugin.prototype.traverse = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        return this.layoutWalker.traverse(function (row) {
            /** @type {?} */
            var preparedRow = {
                id: row.id,
                columns: row.columns.map(function (column) {
                    return {
                        bricks: column.bricks.map(function (brick) { return brick.getSnapshot(); })
                    };
                })
            };
            fn(preparedRow);
        });
    };
    /**
     * @param {?} brickId
     * @return {?}
     */
    WallCorePlugin.prototype.getBrickSnapshot = /**
     * @param {?} brickId
     * @return {?}
     */
    function (brickId) {
        /** @type {?} */
        var brick = this.layoutWalker.getBrickById(brickId);
        return brick ? brick.getSnapshot() : null;
    };
    /**
     * @param {?} brickId
     * @return {?}
     */
    WallCorePlugin.prototype.getBrickResourcePaths = /**
     * @param {?} brickId
     * @return {?}
     */
    function (brickId) {
        /** @type {?} */
        var brick = this.layoutWalker.getBrickById(brickId);
        /** @type {?} */
        var brickSpecification = this.brickRegistry.get(brick.tag);
        if (!brickSpecification.getBrickResourcePaths) {
            return [];
        }
        return brickSpecification.getBrickResourcePaths(brick.getSnapshot());
    };
    /**
     * @param {?} brickId
     * @return {?}
     */
    WallCorePlugin.prototype.getBrickTextRepresentation = /**
     * @param {?} brickId
     * @return {?}
     */
    function (brickId) {
        /** @type {?} */
        var brick = this.layoutWalker.getBrickById(brickId);
        /** @type {?} */
        var brickSpecification = this.brickRegistry.get(brick.tag);
        if (brickSpecification.textRepresentation) {
            /** @type {?} */
            var brickTextRepresentation = new brickSpecification.textRepresentation(brick.getSnapshot());
            return brickTextRepresentation.getText() || '';
        }
        else {
            return '';
        }
    };
    /**
     * @param {?} callback
     * @return {?}
     */
    WallCorePlugin.prototype.subscribe = /**
     * @param {?} callback
     * @return {?}
     */
    function (callback) {
        return this.events.subscribe(callback);
    };
    /**
     * @param {?} tag
     * @return {?}
     */
    WallCorePlugin.prototype.isRegisteredBrick = /**
     * @param {?} tag
     * @return {?}
     */
    function (tag) {
        return Boolean(this.brickRegistry.get(tag));
    };
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    WallCorePlugin.prototype.dispatch = /**
     * @private
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this.events.next(e);
    };
    /**
     * @private
     * @param {?} tag
     * @param {?=} state
     * @return {?}
     */
    WallCorePlugin.prototype.createBrick = /**
     * @private
     * @param {?} tag
     * @param {?=} state
     * @return {?}
     */
    function (tag, state) {
        /** @type {?} */
        var id = this.generateGuid();
        /** @type {?} */
        var meta = {};
        /** @type {?} */
        var brick = new WallBrick(id, tag, meta);
        if (state) {
            brick.updateState(state);
        }
        return brick;
    };
    /**
     * @private
     * @param {?} brickDefinition
     * @return {?}
     */
    WallCorePlugin.prototype.restoreBrick = /**
     * @private
     * @param {?} brickDefinition
     * @return {?}
     */
    function (brickDefinition) {
        /** @type {?} */
        var brick = new WallBrick(brickDefinition.id, brickDefinition.tag, brickDefinition.meta);
        brick.updateState(brickDefinition.data);
        return brick;
    };
    /**
     * @private
     * @param {?} brickId
     * @return {?}
     */
    WallCorePlugin.prototype.clearBrickResources = /**
     * @private
     * @param {?} brickId
     * @return {?}
     */
    function (brickId) {
        /** @type {?} */
        var brick = this.layoutWalker.getBrickById(brickId);
        /** @type {?} */
        var brickSpecification = this.brickRegistry.get(brick.tag);
        if (brickSpecification.destructor) {
            return brickSpecification.destructor(brick.getSnapshot());
        }
        else {
            return Promise.resolve();
        }
    };
    /**
     * @private
     * @return {?}
     */
    WallCorePlugin.prototype.generateGuid = /**
     * @private
     * @return {?}
     */
    function () {
        return (new Guid()).get();
    };
    return WallCorePlugin;
}());
/*
* Contains Wall data structure and registers API for data manipulation.
* Responsible to IWallDefinition->Layout and Layout->IWallDefinition transformation
* */
export { WallCorePlugin };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbC1jb3JlLnBsdWdpbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL3dhbGwvcGx1Z2lucy9jb3JlL3dhbGwtY29yZS5wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxPQUFPLEVBQWUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFDLElBQUksRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBS2xELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUV2RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDL0QsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUNyRCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUN4RSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDbkQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHFCQUFxQixDQUFDOzs7OztBQVMvQzs7Ozs7SUFjSSx3QkFBb0IsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFiaEQsU0FBSSxHQUFHLE1BQU0sQ0FBQztRQUNkLFlBQU8sR0FBRyxPQUFPLENBQUM7UUFJVixpQkFBWSxHQUFpQixJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFJbEUsa0JBQWEs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QyxHQUFHLENBQUM7UUFFNUQsSUFBSSxrQkFBa0IsQ0FBQyxVQUFVLEVBQUU7WUFDL0IsT0FBTyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7U0FDN0Q7YUFBTTtZQUNILE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzVCO0lBQ0wsQ0FBQzs7Ozs7SUFFTyxxQ0FBWTs7OztJQUFwQjtRQUNJLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQyxBQTFiRCxJQTBiQzs7Ozs7Ozs7SUF6YkcsOEJBQWM7O0lBQ2QsaUNBQWtCOzs7OztJQUdsQixnQ0FBMkI7Ozs7O0lBQzNCLHNDQUEwRTs7Ozs7SUFFMUUsbUNBQThCOzs7OztJQUU5Qix1Q0FBK0I7Ozs7O0lBRS9CLGdDQUE2Qzs7Ozs7SUFFakMsdUNBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTdWJqZWN0LCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtHdWlkfSBmcm9tICcuLi8uLi8uLi9tb2R1bGVzL3V0aWxzL3V0aWxzJztcbmltcG9ydCB7SUJyaWNrRGVmaW5pdGlvbn0gZnJvbSAnLi4vLi4vbW9kZWwvaW50ZXJmYWNlcy9icmljay1kZWZpbml0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQge0lXYWxsQ29sdW1ufSBmcm9tICcuLi8uLi9tb2RlbC9pbnRlcmZhY2VzL3dhbGwtY29sdW1uLmludGVyZmFjZSc7XG5pbXBvcnQge0lXYWxsRGVmaW5pdGlvbn0gZnJvbSAnLi4vLi4vbW9kZWwvaW50ZXJmYWNlcy93YWxsLWRlZmluaXRpb24uaW50ZXJmYWNlJztcbmltcG9ydCB7SVdhbGxSb3d9IGZyb20gJy4uLy4uL21vZGVsL2ludGVyZmFjZXMvd2FsbC1yb3cuaW50ZXJmYWNlJztcbmltcG9ydCB7V2FsbEJyaWNrfSBmcm9tICcuLi8uLi9tb2RlbC93YWxsLWJyaWNrLm1vZGVsJztcbmltcG9ydCB7QnJpY2tSZWdpc3RyeX0gZnJvbSAnLi4vLi4vcmVnaXN0cnkvYnJpY2stcmVnaXN0cnkuc2VydmljZSc7XG5pbXBvcnQge0FkZEJyaWNrRXZlbnR9IGZyb20gJy4vZXZlbnRzL2FkZC1icmljay5ldmVudCc7XG5pbXBvcnQge0JlZm9yZUNoYW5nZUV2ZW50fSBmcm9tICcuL2V2ZW50cy9iZWZvcmUtY2hhbmdlLmV2ZW50JztcbmltcG9ydCB7TW92ZUJyaWNrRXZlbnR9IGZyb20gJy4vZXZlbnRzL21vdmUtYnJpY2suZXZlbnQnO1xuaW1wb3J0IHtSZW1vdmVCcmlja0V2ZW50fSBmcm9tICcuL2V2ZW50cy9yZW1vdmUtYnJpY2suZXZlbnQnO1xuaW1wb3J0IHtSZW1vdmVCcmlja3NFdmVudH0gZnJvbSAnLi9ldmVudHMvcmVtb3ZlLWJyaWNrcy5ldmVudCc7XG5pbXBvcnQge1NldFBsYW5FdmVudH0gZnJvbSAnLi9ldmVudHMvc2V0LXBsYW4uZXZlbnQnO1xuaW1wb3J0IHtUdXJuQnJpY2tJbnRvRXZlbnR9IGZyb20gJy4vZXZlbnRzL3R1cm4tYnJpY2staW50by5ldmVudCc7XG5pbXBvcnQge1VwZGF0ZUJyaWNrU3RhdGVFdmVudH0gZnJvbSAnLi9ldmVudHMvdXBkYXRlLWJyaWNrLXN0YXRlLmV2ZW50JztcbmltcG9ydCB7TGF5b3V0V2Fsa2VyfSBmcm9tICcuL2xheW91dC13YWxrZXIuY2xhc3MnO1xuaW1wb3J0IHtXYWxsTGF5b3V0fSBmcm9tICcuL3dhbGwtbGF5b3V0Lm1vZGVsJztcbmltcG9ydCB7SVdhbGxQbHVnaW59IGZyb20gJy4uLy4uL21vZGVsL2ludGVyZmFjZXMvd2FsbC1wbHVnaW4uaW50ZXJmYWNlJztcbmltcG9ydCB7SVdhbGxNb2RlbH0gZnJvbSAnLi4vLi4vbW9kZWwvaW50ZXJmYWNlcy93YWxsLW1vZGVsLmludGVyZmFjZSc7XG5pbXBvcnQge0lCcmlja1NuYXBzaG90fSBmcm9tICcuLi8uLi9tb2RlbC9pbnRlcmZhY2VzL2JyaWNrLXNuYXBzaG90LmludGVyZmFjZSc7XG5cbi8qXG4qIENvbnRhaW5zIFdhbGwgZGF0YSBzdHJ1Y3R1cmUgYW5kIHJlZ2lzdGVycyBBUEkgZm9yIGRhdGEgbWFuaXB1bGF0aW9uLlxuKiBSZXNwb25zaWJsZSB0byBJV2FsbERlZmluaXRpb24tPkxheW91dCBhbmQgTGF5b3V0LT5JV2FsbERlZmluaXRpb24gdHJhbnNmb3JtYXRpb25cbiogKi9cbmV4cG9ydCBjbGFzcyBXYWxsQ29yZVBsdWdpbiBpbXBsZW1lbnRzIElXYWxsUGx1Z2luIHtcbiAgICBuYW1lID0gJ2NvcmUnO1xuICAgIHZlcnNpb24gPSAnMC4wLjAnO1xuXG4gICAgLy8gc3ViIHBsdWdpbnNcbiAgICBwcml2YXRlIGxheW91dDogV2FsbExheW91dDtcbiAgICBwcml2YXRlIGxheW91dFdhbGtlcjogTGF5b3V0V2Fsa2VyID0gbmV3IExheW91dFdhbGtlcih0aGlzLmJyaWNrUmVnaXN0cnkpO1xuXG4gICAgcHJpdmF0ZSB3YWxsTW9kZWw6IElXYWxsTW9kZWw7XG5cbiAgICBwcml2YXRlIERFRkFVTFRfQlJJQ0sgPSAndGV4dCc7XG5cbiAgICBwcml2YXRlIGV2ZW50czogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYnJpY2tSZWdpc3RyeTogQnJpY2tSZWdpc3RyeSkge1xuICAgIH1cblxuICAgIC8vIFNUQVJUIEFQSVxuXG4gICAgb25XYWxsSW5pdGlhbGl6ZSh3YWxsTW9kZWw6IElXYWxsTW9kZWwpIHtcbiAgICAgICAgdGhpcy53YWxsTW9kZWwgPSB3YWxsTW9kZWw7XG5cbiAgICAgICAgW1xuICAgICAgICAgICAgJ2dldFJvd0NvdW50JyxcbiAgICAgICAgICAgICdnZXRCcmlja1RhZycsXG4gICAgICAgICAgICAnZ2V0UHJldmlvdXNCcmlja0lkJyxcbiAgICAgICAgICAgICdnZXROZXh0QnJpY2tJZCcsXG4gICAgICAgICAgICAnZ2V0Q29sdW1uQ291bnQnLFxuICAgICAgICAgICAgJ2dldEJyaWNrSWRzJyxcbiAgICAgICAgICAgICdnZXRCcmlja3NDb3VudCcsXG4gICAgICAgICAgICAnZ2V0TmV4dFRleHRCcmlja0lkJyxcbiAgICAgICAgICAgICdnZXRQcmV2aW91c1RleHRCcmlja0lkJyxcbiAgICAgICAgICAgICdmaWx0ZXJCcmlja3MnLFxuICAgICAgICAgICAgJ2lzQnJpY2tBaGVhZE9mJ1xuICAgICAgICBdLmZvckVhY2goKG1ldGhvZE5hbWUpID0+IHtcbiAgICAgICAgICAgIHRoaXNbbWV0aG9kTmFtZV0gPSB0aGlzLmxheW91dFdhbGtlclttZXRob2ROYW1lXS5iaW5kKHRoaXMubGF5b3V0V2Fsa2VyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy53YWxsTW9kZWwucmVnaXN0ZXJBcGkodGhpcy5uYW1lLCB0aGlzKTtcbiAgICB9XG5cbiAgICAvLyBvbGRcblxuICAgIC8vIENPTU1BTkQgTUVUSE9EU1xuICAgIHNldFBsYW4ocGxhbjogSVdhbGxEZWZpbml0aW9uKSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2gobmV3IEJlZm9yZUNoYW5nZUV2ZW50KFNldFBsYW5FdmVudCkpO1xuXG4gICAgICAgIHRoaXMubGF5b3V0ID0gbmV3IFdhbGxMYXlvdXQodGhpcy5icmlja1JlZ2lzdHJ5LCB0aGlzLmxheW91dFdhbGtlcik7XG5cbiAgICAgICAgdGhpcy5sYXlvdXRXYWxrZXIuc2V0TGF5b3V0KHRoaXMubGF5b3V0LnJvd3MpO1xuXG4gICAgICAgIC8vIGJ1aWxkIHRyZWVcbiAgICAgICAgcGxhbi5sYXlvdXQuYnJpY2tzLmZvckVhY2goKHJvdywgcm93SW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJvdy5jb2x1bW5zLmZvckVhY2goKGNvbHVtbiwgY29sdW1uSW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uYnJpY2tzLmZvckVhY2goKGJyaWNrLCBicmlja0luZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBsYW5CcmljayA9IHBsYW4uYnJpY2tzLmZpbmQoKGN1cnJlbnRQbGFuQnJpY2spID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBicmljay5pZCA9PT0gY3VycmVudFBsYW5Ccmljay5pZDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgd2FsbEJyaWNrID0gdGhpcy5yZXN0b3JlQnJpY2socGxhbkJyaWNrKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBmaXJzdCBjb2x1bW4gaW4gbmV3IHJvd1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29sdW1uSW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChicmlja0luZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXlvdXQuYWRkQnJpY2tUb05ld1Jvdyhyb3dJbmRleCwgd2FsbEJyaWNrLCByb3cuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxheW91dC5hZGRCcmlja1RvRXhpc3RpbmdDb2x1bW4ocm93SW5kZXgsIGNvbHVtbkluZGV4LCBicmlja0luZGV4LCB3YWxsQnJpY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJyaWNrSW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxheW91dC5hZGRCcmlja1RvTmV3Q29sdW1uKHJvd0luZGV4LCBjb2x1bW5JbmRleCwgd2FsbEJyaWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXlvdXQuYWRkQnJpY2tUb0V4aXN0aW5nQ29sdW1uKHJvd0luZGV4LCBjb2x1bW5JbmRleCwgYnJpY2tJbmRleCwgd2FsbEJyaWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZGlzcGF0Y2gobmV3IFNldFBsYW5FdmVudCgpKTtcbiAgICB9XG5cbiAgICBhZGRCcmlja0FmdGVyQnJpY2tJZChicmlja0lkOiBzdHJpbmcsIHRhZzogc3RyaW5nLCBzdGF0ZT86IGFueSk6IElCcmlja1NuYXBzaG90IHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaChuZXcgQmVmb3JlQ2hhbmdlRXZlbnQoQWRkQnJpY2tFdmVudCkpO1xuXG4gICAgICAgIGNvbnN0IGJyaWNrUG9zaXRpb24gPSB0aGlzLmxheW91dFdhbGtlci5nZXRCcmlja1Bvc2l0aW9uKGJyaWNrSWQpO1xuICAgICAgICBjb25zdCBjb2x1bW5Db3VudCA9IHRoaXMubGF5b3V0V2Fsa2VyLmdldENvbHVtbkNvdW50KGJyaWNrUG9zaXRpb24ucm93SW5kZXgpO1xuICAgICAgICBjb25zdCBuZXdCcmljayA9IHRoaXMuY3JlYXRlQnJpY2sodGFnLCBzdGF0ZSk7XG5cbiAgICAgICAgaWYgKGNvbHVtbkNvdW50ID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmxheW91dC5hZGRCcmlja1RvTmV3Um93KGJyaWNrUG9zaXRpb24ucm93SW5kZXggKyAxLCBuZXdCcmljayk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29sdW1uQ291bnQgPiAxKSB7XG4gICAgICAgICAgICB0aGlzLmxheW91dC5hZGRCcmlja1RvRXhpc3RpbmdDb2x1bW4oXG4gICAgICAgICAgICAgICAgYnJpY2tQb3NpdGlvbi5yb3dJbmRleCxcbiAgICAgICAgICAgICAgICBicmlja1Bvc2l0aW9uLmNvbHVtbkluZGV4LFxuICAgICAgICAgICAgICAgIGJyaWNrUG9zaXRpb24uYnJpY2tJbmRleCArIDEsXG4gICAgICAgICAgICAgICAgbmV3QnJpY2spO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kaXNwYXRjaChuZXcgQWRkQnJpY2tFdmVudChuZXdCcmljay5pZCkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmdldEJyaWNrU25hcHNob3QobmV3QnJpY2suaWQpO1xuICAgIH1cblxuICAgIGFkZEJyaWNrQmVmb3JlQnJpY2tJZChicmlja0lkOiBzdHJpbmcsIHRhZzogc3RyaW5nLCBzdGF0ZT86IGFueSk6IElCcmlja1NuYXBzaG90IHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaChuZXcgQmVmb3JlQ2hhbmdlRXZlbnQoQWRkQnJpY2tFdmVudCkpO1xuXG4gICAgICAgIGNvbnN0IGJyaWNrUG9zaXRpb24gPSB0aGlzLmxheW91dFdhbGtlci5nZXRCcmlja1Bvc2l0aW9uKGJyaWNrSWQpO1xuICAgICAgICBjb25zdCBjb2x1bW5Db3VudCA9IHRoaXMubGF5b3V0V2Fsa2VyLmdldENvbHVtbkNvdW50KGJyaWNrUG9zaXRpb24ucm93SW5kZXgpO1xuICAgICAgICBjb25zdCBuZXdCcmljayA9IHRoaXMuY3JlYXRlQnJpY2sodGFnLCBzdGF0ZSk7XG5cbiAgICAgICAgaWYgKGNvbHVtbkNvdW50ID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmxheW91dC5hZGRCcmlja1RvTmV3Um93KGJyaWNrUG9zaXRpb24ucm93SW5kZXgsIG5ld0JyaWNrKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb2x1bW5Db3VudCA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMubGF5b3V0LmFkZEJyaWNrVG9FeGlzdGluZ0NvbHVtbihcbiAgICAgICAgICAgICAgICBicmlja1Bvc2l0aW9uLnJvd0luZGV4LFxuICAgICAgICAgICAgICAgIGJyaWNrUG9zaXRpb24uY29sdW1uSW5kZXgsXG4gICAgICAgICAgICAgICAgYnJpY2tQb3NpdGlvbi5icmlja0luZGV4LFxuICAgICAgICAgICAgICAgIG5ld0JyaWNrKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGlzcGF0Y2gobmV3IEFkZEJyaWNrRXZlbnQobmV3QnJpY2suaWQpKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5nZXRCcmlja1NuYXBzaG90KG5ld0JyaWNrLmlkKTtcbiAgICB9XG5cbiAgICAvLyBBZGQgdGV4dCBicmljayB0byB0aGUgYm90dG9tIG9mIHdhbGwgaW4gdGhlIG5ldyByb3dcbiAgICBhZGREZWZhdWx0QnJpY2soKSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2gobmV3IEJlZm9yZUNoYW5nZUV2ZW50KEFkZEJyaWNrRXZlbnQpKTtcblxuICAgICAgICBjb25zdCBicmlja0NvdW50ID0gdGhpcy5sYXlvdXRXYWxrZXIuZ2V0QnJpY2tzQ291bnQoKTtcbiAgICAgICAgY29uc3QgbmV3QnJpY2sgPSB0aGlzLmNyZWF0ZUJyaWNrKHRoaXMuREVGQVVMVF9CUklDSyk7XG4gICAgICAgIGNvbnN0IHJvd0luZGV4ID0gYnJpY2tDb3VudCA/IHRoaXMubGF5b3V0V2Fsa2VyLmdldFJvd0NvdW50KCkgKyAxIDogMDtcblxuICAgICAgICB0aGlzLmxheW91dC5hZGRCcmlja1RvTmV3Um93KHJvd0luZGV4LCBuZXdCcmljayk7XG5cbiAgICAgICAgdGhpcy5kaXNwYXRjaChuZXcgQWRkQnJpY2tFdmVudChuZXdCcmljay5pZCkpO1xuICAgIH1cblxuICAgIGFkZEJyaWNrQXRTdGFydCh0YWc6IHN0cmluZywgc3RhdGU/OiBhbnkpOiBJQnJpY2tTbmFwc2hvdCB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2gobmV3IEJlZm9yZUNoYW5nZUV2ZW50KEFkZEJyaWNrRXZlbnQpKTtcblxuICAgICAgICBjb25zdCBuZXdCcmljayA9IHRoaXMuY3JlYXRlQnJpY2sodGFnLCBzdGF0ZSk7XG5cbiAgICAgICAgdGhpcy5sYXlvdXQuYWRkQnJpY2tUb05ld1JvdygwLCBuZXdCcmljayk7XG5cbiAgICAgICAgdGhpcy5kaXNwYXRjaChuZXcgQWRkQnJpY2tFdmVudChuZXdCcmljay5pZCkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmdldEJyaWNrU25hcHNob3QobmV3QnJpY2suaWQpO1xuICAgIH1cblxuICAgIHVwZGF0ZUJyaWNrU3RhdGUoYnJpY2tJZCwgYnJpY2tTdGF0ZSk6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc3BhdGNoKG5ldyBCZWZvcmVDaGFuZ2VFdmVudChVcGRhdGVCcmlja1N0YXRlRXZlbnQpKTtcblxuICAgICAgICBjb25zdCBicmljayA9IHRoaXMubGF5b3V0V2Fsa2VyLmdldEJyaWNrQnlJZChicmlja0lkKTtcblxuICAgICAgICBjb25zdCBvbGRTdGF0ZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYnJpY2suZ2V0U3RhdGUoKSkpO1xuXG4gICAgICAgIGJyaWNrLnVwZGF0ZVN0YXRlKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYnJpY2tTdGF0ZSkpKTtcblxuICAgICAgICB0aGlzLmRpc3BhdGNoKG5ldyBVcGRhdGVCcmlja1N0YXRlRXZlbnQoXG4gICAgICAgICAgICBicmlja0lkLFxuICAgICAgICAgICAgSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShicmljay5nZXRTdGF0ZSgpKSksXG4gICAgICAgICAgICBvbGRTdGF0ZVxuICAgICAgICApKTtcbiAgICB9XG5cbiAgICAvLyB0b2RvOiBzaG91bGQgYmUgYXN5bmMgb3BlcmF0aW9uXG4gICAgcmVtb3ZlQnJpY2soYnJpY2tJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2gobmV3IEJlZm9yZUNoYW5nZUV2ZW50KFJlbW92ZUJyaWNrRXZlbnQpKTtcblxuICAgICAgICBjb25zdCBuZXh0VGV4dEJyaWNrID0gdGhpcy5sYXlvdXRXYWxrZXIuZ2V0TmV4dFRleHRCcmljayhicmlja0lkKTtcbiAgICAgICAgY29uc3QgcHJldmlvdXNUZXh0QnJpY2sgPSB0aGlzLmxheW91dFdhbGtlci5nZXRQcmV2aW91c1RleHRCcmljayhicmlja0lkKTtcblxuICAgICAgICB0aGlzLmNsZWFyQnJpY2tSZXNvdXJjZXMoYnJpY2tJZCkudGhlbigoKSA9PiB7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHJlbW92ZWRCcmljayA9IHRoaXMubGF5b3V0V2Fsa2VyLmdldEJyaWNrQnlJZChicmlja0lkKTtcblxuICAgICAgICB0aGlzLmxheW91dC5yZW1vdmVCcmljayhicmlja0lkKTtcblxuICAgICAgICB0aGlzLmRpc3BhdGNoKG5ldyBSZW1vdmVCcmlja0V2ZW50KFxuICAgICAgICAgICAgcmVtb3ZlZEJyaWNrLmdldFNuYXBzaG90KCksXG4gICAgICAgICAgICBwcmV2aW91c1RleHRCcmljayAmJiBwcmV2aW91c1RleHRCcmljay5pZCxcbiAgICAgICAgICAgIG5leHRUZXh0QnJpY2sgJiYgbmV4dFRleHRCcmljay5pZFxuICAgICAgICApKTtcbiAgICB9XG5cbiAgICAvLyB0b2RvOiBzaG91bGQgYmUgYXN5bmMgb3BlcmF0aW9uXG4gICAgcmVtb3ZlQnJpY2tzKGJyaWNrSWRzKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2gobmV3IEJlZm9yZUNoYW5nZUV2ZW50KFJlbW92ZUJyaWNrc0V2ZW50KSk7XG5cbiAgICAgICAgY29uc3QgbmV4dFRleHRCcmljayA9IHRoaXMubGF5b3V0V2Fsa2VyLmdldE5leHRCcmljayhicmlja0lkc1ticmlja0lkcy5sZW5ndGggLSAxXSk7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzQnJpY2sgPSB0aGlzLmxheW91dFdhbGtlci5nZXRQcmV2aW91c0JyaWNrKGJyaWNrSWRzWzBdKTtcblxuICAgICAgICBjb25zdCBjbGVhclByb21pc2VzID0gYnJpY2tJZHMubWFwKChicmlja0lkKSA9PiB0aGlzLmNsZWFyQnJpY2tSZXNvdXJjZXMoYnJpY2tJZCkpO1xuXG4gICAgICAgIFByb21pc2UuYWxsKGNsZWFyUHJvbWlzZXMpLnRoZW4oKCkgPT4ge1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCByZW1vdmVkQnJpY2tzID0gYnJpY2tJZHMubWFwKChicmlja0lkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCByZW1vdmVkQnJpY2sgPSB0aGlzLmxheW91dFdhbGtlci5nZXRCcmlja0J5SWQoYnJpY2tJZCk7XG5cbiAgICAgICAgICAgIHRoaXMubGF5b3V0LnJlbW92ZUJyaWNrKGJyaWNrSWQpO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGlkOiByZW1vdmVkQnJpY2suaWQsXG4gICAgICAgICAgICAgICAgdGFnOiByZW1vdmVkQnJpY2sudGFnLFxuICAgICAgICAgICAgICAgIHN0YXRlOiByZW1vdmVkQnJpY2suc3RhdGVcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZGlzcGF0Y2gobmV3IFJlbW92ZUJyaWNrc0V2ZW50KFxuICAgICAgICAgICAgcmVtb3ZlZEJyaWNrcyxcbiAgICAgICAgICAgIHByZXZpb3VzQnJpY2sgJiYgcHJldmlvdXNCcmljay5pZCxcbiAgICAgICAgICAgIG5leHRUZXh0QnJpY2sgJiYgbmV4dFRleHRCcmljay5pZFxuICAgICAgICApKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYWxsIGJyaWNrcyBmcm9tIGxheW91dFxuICAgICAqIENsZWFyIGFsbCBicmlja3MgZXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gICAgICovXG4gICAgY2xlYXIoKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgY29uc3QgYnJpY2tJZHMgPSB0aGlzLmxheW91dFdhbGtlci5nZXRCcmlja0lkcygpO1xuXG4gICAgICAgIC8vIHRvZG86IHJlcGxhY2UgaXQgYWZ0ZXIgcmVtb3ZlQnJpY2tzIHdpbGwgYmUgYXN5bmNcbiAgICAgICAgY29uc3QgY2xlYXJQcm9taXNlcyA9IGJyaWNrSWRzLm1hcCgoYnJpY2tJZCkgPT4gdGhpcy5jbGVhckJyaWNrUmVzb3VyY2VzKGJyaWNrSWQpKTtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoY2xlYXJQcm9taXNlcykudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBicmlja0lkcy5mb3JFYWNoKChicmlja0lkKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXlvdXQucmVtb3ZlQnJpY2soYnJpY2tJZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdHVybkJyaWNrSW50byhicmlja0lkOiBzdHJpbmcsIG5ld1RhZzogc3RyaW5nLCBzdGF0ZTogYW55ID0ge30pIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaChuZXcgQmVmb3JlQ2hhbmdlRXZlbnQoVHVybkJyaWNrSW50b0V2ZW50KSk7XG5cbiAgICAgICAgY29uc3QgYnJpY2sgPSB0aGlzLmxheW91dFdhbGtlci5nZXRCcmlja0J5SWQoYnJpY2tJZCk7XG4gICAgICAgIGNvbnN0IG9sZFRhZyA9IGJyaWNrLnRhZztcblxuICAgICAgICBicmlja1xuICAgICAgICAgICAgLnR1cm5JbnRvKG5ld1RhZylcbiAgICAgICAgICAgIC51cGRhdGVTdGF0ZShzdGF0ZSk7XG5cbiAgICAgICAgdGhpcy5kaXNwYXRjaChuZXcgVHVybkJyaWNrSW50b0V2ZW50KGJyaWNrSWQsIG5ld1RhZywgb2xkVGFnKSk7XG4gICAgfVxuXG4gICAgbW92ZUJyaWNrQWZ0ZXJCcmlja0lkKG1vdmVkQnJpY2tJZHM6IHN0cmluZ1tdLCBhZnRlckJyaWNrSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBpZiAobW92ZWRCcmlja0lkcy5pbmRleE9mKGFmdGVyQnJpY2tJZCkgPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoKG5ldyBCZWZvcmVDaGFuZ2VFdmVudChNb3ZlQnJpY2tFdmVudCkpO1xuXG4gICAgICAgICAgICBjb25zdCBhZnRlckJyaWNrUG9zaXRpb24gPSB0aGlzLmxheW91dFdhbGtlci5nZXRCcmlja1Bvc2l0aW9uKGFmdGVyQnJpY2tJZCk7XG4gICAgICAgICAgICBjb25zdCBjb2x1bW5Db3VudCA9IHRoaXMubGF5b3V0V2Fsa2VyLmdldENvbHVtbkNvdW50KGFmdGVyQnJpY2tQb3NpdGlvbi5yb3dJbmRleCk7XG5cbiAgICAgICAgICAgIGlmIChjb2x1bW5Db3VudCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMubGF5b3V0Lm1vdmVCcmlja0FmdGVySW5OZXdSb3coYWZ0ZXJCcmlja0lkLCBtb3ZlZEJyaWNrSWRzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXlvdXQubW92ZUJyaWNrQWZ0ZXJJblNhbWVDb2x1bW4oYWZ0ZXJCcmlja0lkLCBtb3ZlZEJyaWNrSWRzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaChuZXcgTW92ZUJyaWNrRXZlbnQobW92ZWRCcmlja0lkcywgYWZ0ZXJCcmlja0lkKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlQnJpY2tCZWZvcmVCcmlja0lkKG1vdmVkQnJpY2tJZHM6IHN0cmluZ1tdLCBiZWZvcmVCcmlja0lkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKG1vdmVkQnJpY2tJZHMuaW5kZXhPZihiZWZvcmVCcmlja0lkKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2gobmV3IEJlZm9yZUNoYW5nZUV2ZW50KE1vdmVCcmlja0V2ZW50KSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGJlZm9yZUJyaWNrUG9zaXRpb24gPSB0aGlzLmxheW91dFdhbGtlci5nZXRCcmlja1Bvc2l0aW9uKGJlZm9yZUJyaWNrSWQpO1xuICAgICAgICAgICAgY29uc3QgY29sdW1uQ291bnQgPSB0aGlzLmxheW91dFdhbGtlci5nZXRDb2x1bW5Db3VudChiZWZvcmVCcmlja1Bvc2l0aW9uLnJvd0luZGV4KTtcblxuICAgICAgICAgICAgaWYgKGNvbHVtbkNvdW50ID09PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXlvdXQubW92ZUJyaWNrQmVmb3JlSW5OZXdSb3coYmVmb3JlQnJpY2tJZCwgbW92ZWRCcmlja0lkcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubGF5b3V0Lm1vdmVCcmlja0JlZm9yZUluU2FtZUNvbHVtbihiZWZvcmVCcmlja0lkLCBtb3ZlZEJyaWNrSWRzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaChuZXcgTW92ZUJyaWNrRXZlbnQobW92ZWRCcmlja0lkcywgYmVmb3JlQnJpY2tJZCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZUJyaWNrVG9OZXdDb2x1bW4odGFyZ2V0QnJpY2tJZHM6IHN0cmluZ1tdLCBiZWZvcmVCcmlja0lkOiBzdHJpbmcsIHNpZGU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBpZiAodGFyZ2V0QnJpY2tJZHMuaW5kZXhPZihiZWZvcmVCcmlja0lkKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2gobmV3IEJlZm9yZUNoYW5nZUV2ZW50KE1vdmVCcmlja0V2ZW50KSk7XG5cbiAgICAgICAgICAgIHRoaXMubGF5b3V0Lm1vdmVCcmlja1RvTmV3Q29sdW1uKHRhcmdldEJyaWNrSWRzLCBiZWZvcmVCcmlja0lkLCBzaWRlKTtcblxuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaChuZXcgTW92ZUJyaWNrRXZlbnQodGFyZ2V0QnJpY2tJZHMsIGJlZm9yZUJyaWNrSWQpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFFVRVJZIE1FVEhPRFNcbiAgICBnZXRQbGFuKCk6IElXYWxsRGVmaW5pdGlvbiB7XG4gICAgICAgIGNvbnN0IHBsYW4gPSB7XG4gICAgICAgICAgICBicmlja3M6IFtdLFxuICAgICAgICAgICAgbGF5b3V0OiB7XG4gICAgICAgICAgICAgICAgYnJpY2tzOiBbXVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMubGF5b3V0V2Fsa2VyLnRyYXZlcnNlKChyb3c6IElXYWxsUm93KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb2x1bW5zID0gW107XG5cbiAgICAgICAgICAgIHJvdy5jb2x1bW5zLmZvckVhY2goKGNvbHVtbjogSVdhbGxDb2x1bW4pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwbGFuQ29sdW1uID0ge1xuICAgICAgICAgICAgICAgICAgICBicmlja3M6IFtdXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGNvbHVtbi5icmlja3MuZm9yRWFjaCgoYnJpY2s6IFdhbGxCcmljaykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBwbGFuLmJyaWNrcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBicmljay5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogYnJpY2sudGFnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWV0YTogYnJpY2subWV0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGJyaWNrLnN0YXRlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHBsYW5Db2x1bW4uYnJpY2tzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGJyaWNrLmlkXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgY29sdW1ucy5wdXNoKHBsYW5Db2x1bW4pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHBsYW4ubGF5b3V0LmJyaWNrcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBjb2x1bW5zLFxuICAgICAgICAgICAgICAgIGlkOiByb3cuaWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShwbGFuKSk7XG4gICAgfVxuXG4gICAgc29ydEJyaWNrSWRzQnlMYXlvdXRPcmRlcihicmlja0lkczogc3RyaW5nW10pIHtcbiAgICAgICAgY29uc3QgYnJpY2tzU2VxdWVuY2UgPSB0aGlzLmxheW91dFdhbGtlci5nZXRCcmlja1NlcXVlbmNlKCgpID0+IHRydWUpO1xuXG4gICAgICAgIHJldHVybiBicmlja3NTZXF1ZW5jZVxuICAgICAgICAgICAgLmZpbHRlcigoYnJpY2spID0+IGJyaWNrSWRzLmluZGV4T2YoYnJpY2suaWQpICE9PSAtMSlcbiAgICAgICAgICAgIC5tYXAoKGJyaWNrKSA9PiBicmljay5pZCk7XG4gICAgfVxuXG4gICAgdHJhdmVyc2UoZm4pOiB2b2lkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGF5b3V0V2Fsa2VyLnRyYXZlcnNlKChyb3c6IElXYWxsUm93KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcmVwYXJlZFJvdyA9IHtcbiAgICAgICAgICAgICAgICBpZDogcm93LmlkLFxuXG4gICAgICAgICAgICAgICAgY29sdW1uczogcm93LmNvbHVtbnMubWFwKChjb2x1bW4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyaWNrczogY29sdW1uLmJyaWNrcy5tYXAoKGJyaWNrKSA9PiBicmljay5nZXRTbmFwc2hvdCgpKVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBmbihwcmVwYXJlZFJvdyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldEJyaWNrU25hcHNob3QoYnJpY2tJZDogc3RyaW5nKTogSUJyaWNrU25hcHNob3Qge1xuICAgICAgICBjb25zdCBicmljayA9IHRoaXMubGF5b3V0V2Fsa2VyLmdldEJyaWNrQnlJZChicmlja0lkKTtcblxuICAgICAgICByZXR1cm4gYnJpY2sgPyBicmljay5nZXRTbmFwc2hvdCgpIDogbnVsbDtcbiAgICB9XG5cbiAgICBnZXRCcmlja1Jlc291cmNlUGF0aHMoYnJpY2tJZDogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgICAgICBjb25zdCBicmljayA9IHRoaXMubGF5b3V0V2Fsa2VyLmdldEJyaWNrQnlJZChicmlja0lkKTtcblxuICAgICAgICBjb25zdCBicmlja1NwZWNpZmljYXRpb24gPSB0aGlzLmJyaWNrUmVnaXN0cnkuZ2V0KGJyaWNrLnRhZyk7XG5cbiAgICAgICAgaWYgKCFicmlja1NwZWNpZmljYXRpb24uZ2V0QnJpY2tSZXNvdXJjZVBhdGhzKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYnJpY2tTcGVjaWZpY2F0aW9uLmdldEJyaWNrUmVzb3VyY2VQYXRocyhicmljay5nZXRTbmFwc2hvdCgpKTtcbiAgICB9XG5cbiAgICBnZXRCcmlja1RleHRSZXByZXNlbnRhdGlvbihicmlja0lkOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBicmljayA9IHRoaXMubGF5b3V0V2Fsa2VyLmdldEJyaWNrQnlJZChicmlja0lkKTtcblxuICAgICAgICBjb25zdCBicmlja1NwZWNpZmljYXRpb24gPSB0aGlzLmJyaWNrUmVnaXN0cnkuZ2V0KGJyaWNrLnRhZyk7XG5cbiAgICAgICAgaWYgKGJyaWNrU3BlY2lmaWNhdGlvbi50ZXh0UmVwcmVzZW50YXRpb24pIHtcbiAgICAgICAgICAgIGNvbnN0IGJyaWNrVGV4dFJlcHJlc2VudGF0aW9uID0gbmV3IGJyaWNrU3BlY2lmaWNhdGlvbi50ZXh0UmVwcmVzZW50YXRpb24oYnJpY2suZ2V0U25hcHNob3QoKSk7XG5cbiAgICAgICAgICAgIHJldHVybiBicmlja1RleHRSZXByZXNlbnRhdGlvbi5nZXRUZXh0KCkgfHwgJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdWJzY3JpYmUoY2FsbGJhY2spOiBTdWJzY3JpcHRpb24ge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmVudHMuc3Vic2NyaWJlKGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBpc1JlZ2lzdGVyZWRCcmljayh0YWc6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gQm9vbGVhbih0aGlzLmJyaWNrUmVnaXN0cnkuZ2V0KHRhZykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGlzcGF0Y2goZTogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMuZXZlbnRzLm5leHQoZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVCcmljayh0YWcsIHN0YXRlPzogYW55KSB7XG4gICAgICAgIGNvbnN0IGlkID0gdGhpcy5nZW5lcmF0ZUd1aWQoKTtcbiAgICAgICAgY29uc3QgbWV0YSA9IHt9O1xuICAgICAgICBjb25zdCBicmljayA9IG5ldyBXYWxsQnJpY2soaWQsIHRhZywgbWV0YSk7XG5cbiAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgICBicmljay51cGRhdGVTdGF0ZShzdGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYnJpY2s7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXN0b3JlQnJpY2soYnJpY2tEZWZpbml0aW9uOiBJQnJpY2tEZWZpbml0aW9uKTogV2FsbEJyaWNrIHtcbiAgICAgICAgY29uc3QgYnJpY2sgPSBuZXcgV2FsbEJyaWNrKFxuICAgICAgICAgICAgYnJpY2tEZWZpbml0aW9uLmlkLFxuICAgICAgICAgICAgYnJpY2tEZWZpbml0aW9uLnRhZyxcbiAgICAgICAgICAgIGJyaWNrRGVmaW5pdGlvbi5tZXRhXG4gICAgICAgICk7XG5cbiAgICAgICAgYnJpY2sudXBkYXRlU3RhdGUoYnJpY2tEZWZpbml0aW9uLmRhdGEpO1xuXG4gICAgICAgIHJldHVybiBicmljaztcbiAgICB9XG5cbiAgICBwcml2YXRlIGNsZWFyQnJpY2tSZXNvdXJjZXMoYnJpY2tJZCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGNvbnN0IGJyaWNrID0gdGhpcy5sYXlvdXRXYWxrZXIuZ2V0QnJpY2tCeUlkKGJyaWNrSWQpO1xuXG4gICAgICAgIGNvbnN0IGJyaWNrU3BlY2lmaWNhdGlvbiA9IHRoaXMuYnJpY2tSZWdpc3RyeS5nZXQoYnJpY2sudGFnKTtcblxuICAgICAgICBpZiAoYnJpY2tTcGVjaWZpY2F0aW9uLmRlc3RydWN0b3IpIHtcbiAgICAgICAgICAgIHJldHVybiBicmlja1NwZWNpZmljYXRpb24uZGVzdHJ1Y3Rvcihicmljay5nZXRTbmFwc2hvdCgpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2VuZXJhdGVHdWlkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAobmV3IEd1aWQoKSkuZ2V0KCk7XG4gICAgfVxufVxuIl19