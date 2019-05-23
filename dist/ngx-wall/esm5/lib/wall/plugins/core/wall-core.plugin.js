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
        ].forEach((/**
         * @param {?} methodName
         * @return {?}
         */
        function (methodName) {
            _this[methodName] = _this.layoutWalker[methodName].bind(_this.layoutWalker);
        }));
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
        plan.layout.bricks.forEach((/**
         * @param {?} row
         * @param {?} rowIndex
         * @return {?}
         */
        function (row, rowIndex) {
            row.columns.forEach((/**
             * @param {?} column
             * @param {?} columnIndex
             * @return {?}
             */
            function (column, columnIndex) {
                column.bricks.forEach((/**
                 * @param {?} brick
                 * @param {?} brickIndex
                 * @return {?}
                 */
                function (brick, brickIndex) {
                    /** @type {?} */
                    var planBrick = plan.bricks.find((/**
                     * @param {?} currentPlanBrick
                     * @return {?}
                     */
                    function (currentPlanBrick) {
                        return brick.id === currentPlanBrick.id;
                    }));
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
                }));
            }));
        }));
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
        this.clearBrickResources(brickId).then((/**
         * @return {?}
         */
        function () {
        }));
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
        var clearPromises = brickIds.map((/**
         * @param {?} brickId
         * @return {?}
         */
        function (brickId) { return _this.clearBrickResources(brickId); }));
        Promise.all(clearPromises).then((/**
         * @return {?}
         */
        function () {
        }));
        /** @type {?} */
        var removedBricks = brickIds.map((/**
         * @param {?} brickId
         * @return {?}
         */
        function (brickId) {
            /** @type {?} */
            var removedBrick = _this.layoutWalker.getBrickById(brickId);
            _this.layout.removeBrick(brickId);
            return {
                id: removedBrick.id,
                tag: removedBrick.tag,
                state: removedBrick.state
            };
        }));
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
        var clearPromises = brickIds.map((/**
         * @param {?} brickId
         * @return {?}
         */
        function (brickId) { return _this.clearBrickResources(brickId); }));
        return Promise.all(clearPromises).then((/**
         * @return {?}
         */
        function () {
            brickIds.forEach((/**
             * @param {?} brickId
             * @return {?}
             */
            function (brickId) {
                _this.layout.removeBrick(brickId);
            }));
        }));
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
        this.layoutWalker.traverse((/**
         * @param {?} row
         * @return {?}
         */
        function (row) {
            /** @type {?} */
            var columns = [];
            row.columns.forEach((/**
             * @param {?} column
             * @return {?}
             */
            function (column) {
                /** @type {?} */
                var planColumn = {
                    bricks: []
                };
                column.bricks.forEach((/**
                 * @param {?} brick
                 * @return {?}
                 */
                function (brick) {
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
                columns: columns,
                id: row.id
            });
        }));
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
        var bricksSequence = this.layoutWalker.getBrickSequence((/**
         * @return {?}
         */
        function () { return true; }));
        return bricksSequence
            .filter((/**
         * @param {?} brick
         * @return {?}
         */
        function (brick) { return brickIds.indexOf(brick.id) !== -1; }))
            .map((/**
         * @param {?} brick
         * @return {?}
         */
        function (brick) { return brick.id; }));
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
        return this.layoutWalker.traverse((/**
         * @param {?} row
         * @return {?}
         */
        function (row) {
            /** @type {?} */
            var preparedRow = {
                id: row.id,
                columns: row.columns.map((/**
                 * @param {?} column
                 * @return {?}
                 */
                function (column) {
                    return {
                        bricks: column.bricks.map((/**
                         * @param {?} brick
                         * @return {?}
                         */
                        function (brick) { return brick.getSnapshot(); }))
                    };
                }))
            };
            fn(preparedRow);
        }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbC1jb3JlLnBsdWdpbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL3dhbGwvcGx1Z2lucy9jb3JlL3dhbGwtY29yZS5wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxPQUFPLEVBQWUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFDLElBQUksRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBS2xELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUV2RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDL0QsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUNyRCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUN4RSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDbkQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHFCQUFxQixDQUFDOzs7OztBQVMvQzs7Ozs7SUFjSSx3QkFBb0IsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFiaEQsU0FBSSxHQUFHLE1BQU0sQ0FBQztRQUNkLFlBQU8sR0FBRyxPQUFPLENBQUM7UUFJVixpQkFBWSxHQUFpQixJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFJbEUsa0JBQWEsR0FBRyxNQUFNLENBQUM7UUFFdkIsV0FBTSxHQUFpQixJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRzdDLENBQUM7SUFFRCxZQUFZOzs7Ozs7SUFFWix5Q0FBZ0I7Ozs7OztJQUFoQixVQUFpQixTQUFxQjtRQUF0QyxpQkFvQkM7UUFuQkcsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFFM0I7WUFDSSxhQUFhO1lBQ2IsYUFBYTtZQUNiLG9CQUFvQjtZQUNwQixnQkFBZ0I7WUFDaEIsZ0JBQWdCO1lBQ2hCLGFBQWE7WUFDYixnQkFBZ0I7WUFDaEIsb0JBQW9CO1lBQ3BCLHdCQUF3QjtZQUN4QixjQUFjO1lBQ2QsZ0JBQWdCO1NBQ25CLENBQUMsT0FBTzs7OztRQUFDLFVBQUMsVUFBVTtZQUNqQixLQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzdFLENBQUMsRUFBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsTUFBTTtJQUVOLGtCQUFrQjs7Ozs7OztJQUNsQixnQ0FBTzs7Ozs7OztJQUFQLFVBQVEsSUFBcUI7UUFBN0IsaUJBb0NDO1FBbkNHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBRW5ELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFcEUsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU5QyxhQUFhO1FBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTzs7Ozs7UUFBQyxVQUFDLEdBQUcsRUFBRSxRQUFRO1lBQ3JDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTzs7Ozs7WUFBQyxVQUFDLE1BQU0sRUFBRSxXQUFXO2dCQUNwQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU87Ozs7O2dCQUFDLFVBQUMsS0FBSyxFQUFFLFVBQVU7O3dCQUM5QixTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJOzs7O29CQUFDLFVBQUMsZ0JBQWdCO3dCQUNoRCxPQUFPLEtBQUssQ0FBQyxFQUFFLEtBQUssZ0JBQWdCLENBQUMsRUFBRSxDQUFDO29CQUM1QyxDQUFDLEVBQUM7O3dCQUVJLFNBQVMsR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQztvQkFFOUMsMEJBQTBCO29CQUMxQixJQUFJLFdBQVcsS0FBSyxDQUFDLEVBQUU7d0JBQ25CLElBQUksVUFBVSxLQUFLLENBQUMsRUFBRTs0QkFDbEIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQzt5QkFDN0Q7NkJBQU07NEJBQ0gsS0FBSSxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQzt5QkFDdEY7cUJBQ0o7eUJBQU07d0JBQ0gsSUFBSSxVQUFVLEtBQUssQ0FBQyxFQUFFOzRCQUNsQixLQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7eUJBQ3JFOzZCQUFNOzRCQUNILEtBQUksQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7eUJBQ3RGO3FCQUNKO2dCQUNMLENBQUMsRUFBQyxDQUFDO1lBQ1AsQ0FBQyxFQUFDLENBQUM7UUFDUCxDQUFDLEVBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxZQUFZLEVBQUUsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7Ozs7Ozs7SUFFRCw2Q0FBb0I7Ozs7OztJQUFwQixVQUFxQixPQUFlLEVBQUUsR0FBVyxFQUFFLEtBQVc7UUFDMUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7O1lBRTlDLGFBQWEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQzs7WUFDM0QsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7O1lBQ3RFLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUM7UUFFN0MsSUFBSSxXQUFXLEtBQUssQ0FBQyxFQUFFO1lBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDdEU7YUFBTSxJQUFJLFdBQVcsR0FBRyxDQUFDLEVBQUU7WUFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsQ0FDaEMsYUFBYSxDQUFDLFFBQVEsRUFDdEIsYUFBYSxDQUFDLFdBQVcsRUFDekIsYUFBYSxDQUFDLFVBQVUsR0FBRyxDQUFDLEVBQzVCLFFBQVEsQ0FBQyxDQUFDO1NBQ2pCO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUU5QyxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDOUMsQ0FBQzs7Ozs7OztJQUVELDhDQUFxQjs7Ozs7O0lBQXJCLFVBQXNCLE9BQWUsRUFBRSxHQUFXLEVBQUUsS0FBVztRQUMzRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksaUJBQWlCLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQzs7WUFFOUMsYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDOztZQUMzRCxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQzs7WUFDdEUsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQztRQUU3QyxJQUFJLFdBQVcsS0FBSyxDQUFDLEVBQUU7WUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ2xFO2FBQU0sSUFBSSxXQUFXLEdBQUcsQ0FBQyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQ2hDLGFBQWEsQ0FBQyxRQUFRLEVBQ3RCLGFBQWEsQ0FBQyxXQUFXLEVBQ3pCLGFBQWEsQ0FBQyxVQUFVLEVBQ3hCLFFBQVEsQ0FBQyxDQUFDO1NBQ2pCO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUU5QyxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELHNEQUFzRDs7Ozs7SUFDdEQsd0NBQWU7Ozs7O0lBQWY7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksaUJBQWlCLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQzs7WUFFOUMsVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFFOztZQUMvQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDOztZQUMvQyxRQUFRLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVyRSxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUVqRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7Ozs7OztJQUVELHdDQUFlOzs7OztJQUFmLFVBQWdCLEdBQVcsRUFBRSxLQUFXO1FBQ3BDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDOztZQUU5QyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDO1FBRTdDLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRTFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxhQUFhLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFOUMsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzlDLENBQUM7Ozs7OztJQUVELHlDQUFnQjs7Ozs7SUFBaEIsVUFBaUIsT0FBTyxFQUFFLFVBQVU7UUFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLGlCQUFpQixDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQzs7WUFFdEQsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQzs7WUFFL0MsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUU3RCxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFMUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLHFCQUFxQixDQUNuQyxPQUFPLEVBQ1AsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQzVDLFFBQVEsQ0FDWCxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsa0NBQWtDOzs7Ozs7SUFDbEMsb0NBQVc7Ozs7OztJQUFYLFVBQVksT0FBZTtRQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDOztZQUVqRCxhQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUM7O1lBQzNELGlCQUFpQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDO1FBRXpFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJOzs7UUFBQztRQUN2QyxDQUFDLEVBQUMsQ0FBQzs7WUFFRyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDO1FBRTVELElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWpDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxnQkFBZ0IsQ0FDOUIsWUFBWSxDQUFDLFdBQVcsRUFBRSxFQUMxQixpQkFBaUIsSUFBSSxpQkFBaUIsQ0FBQyxFQUFFLEVBQ3pDLGFBQWEsSUFBSSxhQUFhLENBQUMsRUFBRSxDQUNwQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsa0NBQWtDOzs7Ozs7SUFDbEMscUNBQVk7Ozs7OztJQUFaLFVBQWEsUUFBUTtRQUFyQixpQkE0QkM7UUEzQkcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQzs7WUFFbEQsYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDOztZQUM3RSxhQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7O1lBRS9ELGFBQWEsR0FBRyxRQUFRLENBQUMsR0FBRzs7OztRQUFDLFVBQUMsT0FBTyxJQUFLLE9BQUEsS0FBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxFQUFqQyxDQUFpQyxFQUFDO1FBRWxGLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSTs7O1FBQUM7UUFDaEMsQ0FBQyxFQUFDLENBQUM7O1lBRUcsYUFBYSxHQUFHLFFBQVEsQ0FBQyxHQUFHOzs7O1FBQUMsVUFBQyxPQUFPOztnQkFDakMsWUFBWSxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQztZQUU1RCxLQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUVqQyxPQUFPO2dCQUNILEVBQUUsRUFBRSxZQUFZLENBQUMsRUFBRTtnQkFDbkIsR0FBRyxFQUFFLFlBQVksQ0FBQyxHQUFHO2dCQUNyQixLQUFLLEVBQUUsWUFBWSxDQUFDLEtBQUs7YUFDNUIsQ0FBQztRQUNOLENBQUMsRUFBQztRQUVGLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxpQkFBaUIsQ0FDL0IsYUFBYSxFQUNiLGFBQWEsSUFBSSxhQUFhLENBQUMsRUFBRSxFQUNqQyxhQUFhLElBQUksYUFBYSxDQUFDLEVBQUUsQ0FDcEMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsOEJBQUs7Ozs7O0lBQUw7UUFBQSxpQkFXQzs7WUFWUyxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUU7OztZQUcxQyxhQUFhLEdBQUcsUUFBUSxDQUFDLEdBQUc7Ozs7UUFBQyxVQUFDLE9BQU8sSUFBSyxPQUFBLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsRUFBakMsQ0FBaUMsRUFBQztRQUVsRixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSTs7O1FBQUM7WUFDbkMsUUFBUSxDQUFDLE9BQU87Ozs7WUFBQyxVQUFDLE9BQU87Z0JBQ3JCLEtBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3JDLENBQUMsRUFBQyxDQUFDO1FBQ1AsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7Ozs7O0lBRUQsc0NBQWE7Ozs7OztJQUFiLFVBQWMsT0FBZSxFQUFFLE1BQWMsRUFBRSxLQUFlO1FBQWYsc0JBQUEsRUFBQSxVQUFlO1FBQzFELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7O1lBRW5ELEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUM7O1lBQy9DLE1BQU0sR0FBRyxLQUFLLENBQUMsR0FBRztRQUV4QixLQUFLO2FBQ0EsUUFBUSxDQUFDLE1BQU0sQ0FBQzthQUNoQixXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNuRSxDQUFDOzs7Ozs7SUFFRCw4Q0FBcUI7Ozs7O0lBQXJCLFVBQXNCLGFBQXVCLEVBQUUsWUFBb0I7UUFDL0QsSUFBSSxhQUFhLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQzVDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDOztnQkFFL0Msa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7O2dCQUNyRSxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDO1lBRWpGLElBQUksV0FBVyxLQUFLLENBQUMsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDLENBQUM7YUFDbkU7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDLENBQUM7YUFDdkU7WUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksY0FBYyxDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDO1NBQ2xFO0lBQ0wsQ0FBQzs7Ozs7O0lBRUQsK0NBQXNCOzs7OztJQUF0QixVQUF1QixhQUF1QixFQUFFLGFBQXFCO1FBQ2pFLElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUM3QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQzs7Z0JBRS9DLG1CQUFtQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDOztnQkFDdkUsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQztZQUVsRixJQUFJLFdBQVcsS0FBSyxDQUFDLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxDQUFDO2FBQ3JFO2lCQUFNO2dCQUNILElBQUksQ0FBQyxNQUFNLENBQUMsMkJBQTJCLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxDQUFDO2FBQ3pFO1lBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLGNBQWMsQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQztTQUNuRTtJQUNMLENBQUM7Ozs7Ozs7SUFFRCw2Q0FBb0I7Ozs7OztJQUFwQixVQUFxQixjQUF3QixFQUFFLGFBQXFCLEVBQUUsSUFBWTtRQUM5RSxJQUFJLGNBQWMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDOUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFFckQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxjQUFjLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRXRFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxjQUFjLENBQUMsY0FBYyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUM7U0FDcEU7SUFDTCxDQUFDO0lBRUQsZ0JBQWdCOzs7OztJQUNoQixnQ0FBTzs7Ozs7SUFBUDs7WUFDVSxJQUFJLEdBQUc7WUFDVCxNQUFNLEVBQUUsRUFBRTtZQUNWLE1BQU0sRUFBRTtnQkFDSixNQUFNLEVBQUUsRUFBRTthQUNiO1NBQ0o7UUFFRCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVE7Ozs7UUFBQyxVQUFDLEdBQWE7O2dCQUMvQixPQUFPLEdBQUcsRUFBRTtZQUVsQixHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU87Ozs7WUFBQyxVQUFDLE1BQW1COztvQkFDOUIsVUFBVSxHQUFHO29CQUNmLE1BQU0sRUFBRSxFQUFFO2lCQUNiO2dCQUVELE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTzs7OztnQkFBQyxVQUFDLEtBQWdCO29CQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQzt3QkFDYixFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUU7d0JBQ1osR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHO3dCQUNkLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSTt3QkFDaEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxLQUFLO3FCQUNwQixDQUFDLENBQUM7b0JBRUgsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7d0JBQ25CLEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRTtxQkFDZixDQUFDLENBQUM7Z0JBQ1AsQ0FBQyxFQUFDLENBQUM7Z0JBRUgsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM3QixDQUFDLEVBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDcEIsT0FBTyxTQUFBO2dCQUNQLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRTthQUNiLENBQUMsQ0FBQztRQUNQLENBQUMsRUFBQyxDQUFDO1FBRUgsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM1QyxDQUFDOzs7OztJQUVELGtEQUF5Qjs7OztJQUF6QixVQUEwQixRQUFrQjs7WUFDbEMsY0FBYyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCOzs7UUFBQyxjQUFNLE9BQUEsSUFBSSxFQUFKLENBQUksRUFBQztRQUVyRSxPQUFPLGNBQWM7YUFDaEIsTUFBTTs7OztRQUFDLFVBQUMsS0FBSyxJQUFLLE9BQUEsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQWpDLENBQWlDLEVBQUM7YUFDcEQsR0FBRzs7OztRQUFDLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSyxDQUFDLEVBQUUsRUFBUixDQUFRLEVBQUMsQ0FBQztJQUNsQyxDQUFDOzs7OztJQUVELGlDQUFROzs7O0lBQVIsVUFBUyxFQUFFO1FBQ1AsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVE7Ozs7UUFBQyxVQUFDLEdBQWE7O2dCQUN0QyxXQUFXLEdBQUc7Z0JBQ2hCLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRTtnQkFFVixPQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHOzs7O2dCQUFDLFVBQUMsTUFBTTtvQkFDNUIsT0FBTzt3QkFDSCxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHOzs7O3dCQUFDLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSyxDQUFDLFdBQVcsRUFBRSxFQUFuQixDQUFtQixFQUFDO3FCQUM1RCxDQUFDO2dCQUNOLENBQUMsRUFBQzthQUNMO1lBRUQsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BCLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7SUFFRCx5Q0FBZ0I7Ozs7SUFBaEIsVUFBaUIsT0FBZTs7WUFDdEIsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQztRQUVyRCxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDOUMsQ0FBQzs7Ozs7SUFFRCw4Q0FBcUI7Ozs7SUFBckIsVUFBc0IsT0FBZTs7WUFDM0IsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQzs7WUFFL0Msa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUU1RCxJQUFJLENBQUMsa0JBQWtCLENBQUMscUJBQXFCLEVBQUU7WUFDM0MsT0FBTyxFQUFFLENBQUM7U0FDYjtRQUVELE9BQU8sa0JBQWtCLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDekUsQ0FBQzs7Ozs7SUFFRCxtREFBMEI7Ozs7SUFBMUIsVUFBMkIsT0FBZTs7WUFDaEMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQzs7WUFFL0Msa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUU1RCxJQUFJLGtCQUFrQixDQUFDLGtCQUFrQixFQUFFOztnQkFDakMsdUJBQXVCLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7WUFFOUYsT0FBTyx1QkFBdUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7U0FDbEQ7YUFBTTtZQUNILE9BQU8sRUFBRSxDQUFDO1NBQ2I7SUFDTCxDQUFDOzs7OztJQUVELGtDQUFTOzs7O0lBQVQsVUFBVSxRQUFRO1FBQ2QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMzQyxDQUFDOzs7OztJQUVELDBDQUFpQjs7OztJQUFqQixVQUFrQixHQUFXO1FBQ3pCLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7Ozs7O0lBRU8saUNBQVE7Ozs7O0lBQWhCLFVBQWlCLENBQU07UUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEIsQ0FBQzs7Ozs7OztJQUVPLG9DQUFXOzs7Ozs7SUFBbkIsVUFBb0IsR0FBRyxFQUFFLEtBQVc7O1lBQzFCLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFOztZQUN4QixJQUFJLEdBQUcsRUFBRTs7WUFDVCxLQUFLLEdBQUcsSUFBSSxTQUFTLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUM7UUFFMUMsSUFBSSxLQUFLLEVBQUU7WUFDUCxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzVCO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQzs7Ozs7O0lBRU8scUNBQVk7Ozs7O0lBQXBCLFVBQXFCLGVBQWlDOztZQUM1QyxLQUFLLEdBQUcsSUFBSSxTQUFTLENBQ3ZCLGVBQWUsQ0FBQyxFQUFFLEVBQ2xCLGVBQWUsQ0FBQyxHQUFHLEVBQ25CLGVBQWUsQ0FBQyxJQUFJLENBQ3ZCO1FBRUQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFeEMsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQzs7Ozs7O0lBRU8sNENBQW1COzs7OztJQUEzQixVQUE0QixPQUFPOztZQUN6QixLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDOztZQUUvQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBRTVELElBQUksa0JBQWtCLENBQUMsVUFBVSxFQUFFO1lBQy9CLE9BQU8sa0JBQWtCLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1NBQzdEO2FBQU07WUFDSCxPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUM1QjtJQUNMLENBQUM7Ozs7O0lBRU8scUNBQVk7Ozs7SUFBcEI7UUFDSSxPQUFPLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUExYkQsSUEwYkM7Ozs7Ozs7O0lBemJHLDhCQUFjOztJQUNkLGlDQUFrQjs7Ozs7SUFHbEIsZ0NBQTJCOzs7OztJQUMzQixzQ0FBMEU7Ozs7O0lBRTFFLG1DQUE4Qjs7Ozs7SUFFOUIsdUNBQStCOzs7OztJQUUvQixnQ0FBNkM7Ozs7O0lBRWpDLHVDQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U3ViamVjdCwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7R3VpZH0gZnJvbSAnLi4vLi4vLi4vbW9kdWxlcy91dGlscy91dGlscyc7XG5pbXBvcnQge0lCcmlja0RlZmluaXRpb259IGZyb20gJy4uLy4uL21vZGVsL2ludGVyZmFjZXMvYnJpY2stZGVmaW5pdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHtJV2FsbENvbHVtbn0gZnJvbSAnLi4vLi4vbW9kZWwvaW50ZXJmYWNlcy93YWxsLWNvbHVtbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHtJV2FsbERlZmluaXRpb259IGZyb20gJy4uLy4uL21vZGVsL2ludGVyZmFjZXMvd2FsbC1kZWZpbml0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQge0lXYWxsUm93fSBmcm9tICcuLi8uLi9tb2RlbC9pbnRlcmZhY2VzL3dhbGwtcm93LmludGVyZmFjZSc7XG5pbXBvcnQge1dhbGxCcmlja30gZnJvbSAnLi4vLi4vbW9kZWwvd2FsbC1icmljay5tb2RlbCc7XG5pbXBvcnQge0JyaWNrUmVnaXN0cnl9IGZyb20gJy4uLy4uL3JlZ2lzdHJ5L2JyaWNrLXJlZ2lzdHJ5LnNlcnZpY2UnO1xuaW1wb3J0IHtBZGRCcmlja0V2ZW50fSBmcm9tICcuL2V2ZW50cy9hZGQtYnJpY2suZXZlbnQnO1xuaW1wb3J0IHtCZWZvcmVDaGFuZ2VFdmVudH0gZnJvbSAnLi9ldmVudHMvYmVmb3JlLWNoYW5nZS5ldmVudCc7XG5pbXBvcnQge01vdmVCcmlja0V2ZW50fSBmcm9tICcuL2V2ZW50cy9tb3ZlLWJyaWNrLmV2ZW50JztcbmltcG9ydCB7UmVtb3ZlQnJpY2tFdmVudH0gZnJvbSAnLi9ldmVudHMvcmVtb3ZlLWJyaWNrLmV2ZW50JztcbmltcG9ydCB7UmVtb3ZlQnJpY2tzRXZlbnR9IGZyb20gJy4vZXZlbnRzL3JlbW92ZS1icmlja3MuZXZlbnQnO1xuaW1wb3J0IHtTZXRQbGFuRXZlbnR9IGZyb20gJy4vZXZlbnRzL3NldC1wbGFuLmV2ZW50JztcbmltcG9ydCB7VHVybkJyaWNrSW50b0V2ZW50fSBmcm9tICcuL2V2ZW50cy90dXJuLWJyaWNrLWludG8uZXZlbnQnO1xuaW1wb3J0IHtVcGRhdGVCcmlja1N0YXRlRXZlbnR9IGZyb20gJy4vZXZlbnRzL3VwZGF0ZS1icmljay1zdGF0ZS5ldmVudCc7XG5pbXBvcnQge0xheW91dFdhbGtlcn0gZnJvbSAnLi9sYXlvdXQtd2Fsa2VyLmNsYXNzJztcbmltcG9ydCB7V2FsbExheW91dH0gZnJvbSAnLi93YWxsLWxheW91dC5tb2RlbCc7XG5pbXBvcnQge0lXYWxsUGx1Z2lufSBmcm9tICcuLi8uLi9tb2RlbC9pbnRlcmZhY2VzL3dhbGwtcGx1Z2luLmludGVyZmFjZSc7XG5pbXBvcnQge0lXYWxsTW9kZWx9IGZyb20gJy4uLy4uL21vZGVsL2ludGVyZmFjZXMvd2FsbC1tb2RlbC5pbnRlcmZhY2UnO1xuaW1wb3J0IHtJQnJpY2tTbmFwc2hvdH0gZnJvbSAnLi4vLi4vbW9kZWwvaW50ZXJmYWNlcy9icmljay1zbmFwc2hvdC5pbnRlcmZhY2UnO1xuXG4vKlxuKiBDb250YWlucyBXYWxsIGRhdGEgc3RydWN0dXJlIGFuZCByZWdpc3RlcnMgQVBJIGZvciBkYXRhIG1hbmlwdWxhdGlvbi5cbiogUmVzcG9uc2libGUgdG8gSVdhbGxEZWZpbml0aW9uLT5MYXlvdXQgYW5kIExheW91dC0+SVdhbGxEZWZpbml0aW9uIHRyYW5zZm9ybWF0aW9uXG4qICovXG5leHBvcnQgY2xhc3MgV2FsbENvcmVQbHVnaW4gaW1wbGVtZW50cyBJV2FsbFBsdWdpbiB7XG4gICAgbmFtZSA9ICdjb3JlJztcbiAgICB2ZXJzaW9uID0gJzAuMC4wJztcblxuICAgIC8vIHN1YiBwbHVnaW5zXG4gICAgcHJpdmF0ZSBsYXlvdXQ6IFdhbGxMYXlvdXQ7XG4gICAgcHJpdmF0ZSBsYXlvdXRXYWxrZXI6IExheW91dFdhbGtlciA9IG5ldyBMYXlvdXRXYWxrZXIodGhpcy5icmlja1JlZ2lzdHJ5KTtcblxuICAgIHByaXZhdGUgd2FsbE1vZGVsOiBJV2FsbE1vZGVsO1xuXG4gICAgcHJpdmF0ZSBERUZBVUxUX0JSSUNLID0gJ3RleHQnO1xuXG4gICAgcHJpdmF0ZSBldmVudHM6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJyaWNrUmVnaXN0cnk6IEJyaWNrUmVnaXN0cnkpIHtcbiAgICB9XG5cbiAgICAvLyBTVEFSVCBBUElcblxuICAgIG9uV2FsbEluaXRpYWxpemUod2FsbE1vZGVsOiBJV2FsbE1vZGVsKSB7XG4gICAgICAgIHRoaXMud2FsbE1vZGVsID0gd2FsbE1vZGVsO1xuXG4gICAgICAgIFtcbiAgICAgICAgICAgICdnZXRSb3dDb3VudCcsXG4gICAgICAgICAgICAnZ2V0QnJpY2tUYWcnLFxuICAgICAgICAgICAgJ2dldFByZXZpb3VzQnJpY2tJZCcsXG4gICAgICAgICAgICAnZ2V0TmV4dEJyaWNrSWQnLFxuICAgICAgICAgICAgJ2dldENvbHVtbkNvdW50JyxcbiAgICAgICAgICAgICdnZXRCcmlja0lkcycsXG4gICAgICAgICAgICAnZ2V0QnJpY2tzQ291bnQnLFxuICAgICAgICAgICAgJ2dldE5leHRUZXh0QnJpY2tJZCcsXG4gICAgICAgICAgICAnZ2V0UHJldmlvdXNUZXh0QnJpY2tJZCcsXG4gICAgICAgICAgICAnZmlsdGVyQnJpY2tzJyxcbiAgICAgICAgICAgICdpc0JyaWNrQWhlYWRPZidcbiAgICAgICAgXS5mb3JFYWNoKChtZXRob2ROYW1lKSA9PiB7XG4gICAgICAgICAgICB0aGlzW21ldGhvZE5hbWVdID0gdGhpcy5sYXlvdXRXYWxrZXJbbWV0aG9kTmFtZV0uYmluZCh0aGlzLmxheW91dFdhbGtlcik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMud2FsbE1vZGVsLnJlZ2lzdGVyQXBpKHRoaXMubmFtZSwgdGhpcyk7XG4gICAgfVxuXG4gICAgLy8gb2xkXG5cbiAgICAvLyBDT01NQU5EIE1FVEhPRFNcbiAgICBzZXRQbGFuKHBsYW46IElXYWxsRGVmaW5pdGlvbikge1xuICAgICAgICB0aGlzLmRpc3BhdGNoKG5ldyBCZWZvcmVDaGFuZ2VFdmVudChTZXRQbGFuRXZlbnQpKTtcblxuICAgICAgICB0aGlzLmxheW91dCA9IG5ldyBXYWxsTGF5b3V0KHRoaXMuYnJpY2tSZWdpc3RyeSwgdGhpcy5sYXlvdXRXYWxrZXIpO1xuXG4gICAgICAgIHRoaXMubGF5b3V0V2Fsa2VyLnNldExheW91dCh0aGlzLmxheW91dC5yb3dzKTtcblxuICAgICAgICAvLyBidWlsZCB0cmVlXG4gICAgICAgIHBsYW4ubGF5b3V0LmJyaWNrcy5mb3JFYWNoKChyb3csIHJvd0luZGV4KSA9PiB7XG4gICAgICAgICAgICByb3cuY29sdW1ucy5mb3JFYWNoKChjb2x1bW4sIGNvbHVtbkluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmJyaWNrcy5mb3JFYWNoKChicmljaywgYnJpY2tJbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwbGFuQnJpY2sgPSBwbGFuLmJyaWNrcy5maW5kKChjdXJyZW50UGxhbkJyaWNrKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYnJpY2suaWQgPT09IGN1cnJlbnRQbGFuQnJpY2suaWQ7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHdhbGxCcmljayA9IHRoaXMucmVzdG9yZUJyaWNrKHBsYW5Ccmljayk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gZmlyc3QgY29sdW1uIGluIG5ldyByb3dcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbHVtbkluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYnJpY2tJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGF5b3V0LmFkZEJyaWNrVG9OZXdSb3cocm93SW5kZXgsIHdhbGxCcmljaywgcm93LmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXlvdXQuYWRkQnJpY2tUb0V4aXN0aW5nQ29sdW1uKHJvd0luZGV4LCBjb2x1bW5JbmRleCwgYnJpY2tJbmRleCwgd2FsbEJyaWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChicmlja0luZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXlvdXQuYWRkQnJpY2tUb05ld0NvbHVtbihyb3dJbmRleCwgY29sdW1uSW5kZXgsIHdhbGxCcmljayk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGF5b3V0LmFkZEJyaWNrVG9FeGlzdGluZ0NvbHVtbihyb3dJbmRleCwgY29sdW1uSW5kZXgsIGJyaWNrSW5kZXgsIHdhbGxCcmljayk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmRpc3BhdGNoKG5ldyBTZXRQbGFuRXZlbnQoKSk7XG4gICAgfVxuXG4gICAgYWRkQnJpY2tBZnRlckJyaWNrSWQoYnJpY2tJZDogc3RyaW5nLCB0YWc6IHN0cmluZywgc3RhdGU/OiBhbnkpOiBJQnJpY2tTbmFwc2hvdCB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2gobmV3IEJlZm9yZUNoYW5nZUV2ZW50KEFkZEJyaWNrRXZlbnQpKTtcblxuICAgICAgICBjb25zdCBicmlja1Bvc2l0aW9uID0gdGhpcy5sYXlvdXRXYWxrZXIuZ2V0QnJpY2tQb3NpdGlvbihicmlja0lkKTtcbiAgICAgICAgY29uc3QgY29sdW1uQ291bnQgPSB0aGlzLmxheW91dFdhbGtlci5nZXRDb2x1bW5Db3VudChicmlja1Bvc2l0aW9uLnJvd0luZGV4KTtcbiAgICAgICAgY29uc3QgbmV3QnJpY2sgPSB0aGlzLmNyZWF0ZUJyaWNrKHRhZywgc3RhdGUpO1xuXG4gICAgICAgIGlmIChjb2x1bW5Db3VudCA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy5sYXlvdXQuYWRkQnJpY2tUb05ld1Jvdyhicmlja1Bvc2l0aW9uLnJvd0luZGV4ICsgMSwgbmV3QnJpY2spO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbHVtbkNvdW50ID4gMSkge1xuICAgICAgICAgICAgdGhpcy5sYXlvdXQuYWRkQnJpY2tUb0V4aXN0aW5nQ29sdW1uKFxuICAgICAgICAgICAgICAgIGJyaWNrUG9zaXRpb24ucm93SW5kZXgsXG4gICAgICAgICAgICAgICAgYnJpY2tQb3NpdGlvbi5jb2x1bW5JbmRleCxcbiAgICAgICAgICAgICAgICBicmlja1Bvc2l0aW9uLmJyaWNrSW5kZXggKyAxLFxuICAgICAgICAgICAgICAgIG5ld0JyaWNrKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGlzcGF0Y2gobmV3IEFkZEJyaWNrRXZlbnQobmV3QnJpY2suaWQpKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5nZXRCcmlja1NuYXBzaG90KG5ld0JyaWNrLmlkKTtcbiAgICB9XG5cbiAgICBhZGRCcmlja0JlZm9yZUJyaWNrSWQoYnJpY2tJZDogc3RyaW5nLCB0YWc6IHN0cmluZywgc3RhdGU/OiBhbnkpOiBJQnJpY2tTbmFwc2hvdCB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2gobmV3IEJlZm9yZUNoYW5nZUV2ZW50KEFkZEJyaWNrRXZlbnQpKTtcblxuICAgICAgICBjb25zdCBicmlja1Bvc2l0aW9uID0gdGhpcy5sYXlvdXRXYWxrZXIuZ2V0QnJpY2tQb3NpdGlvbihicmlja0lkKTtcbiAgICAgICAgY29uc3QgY29sdW1uQ291bnQgPSB0aGlzLmxheW91dFdhbGtlci5nZXRDb2x1bW5Db3VudChicmlja1Bvc2l0aW9uLnJvd0luZGV4KTtcbiAgICAgICAgY29uc3QgbmV3QnJpY2sgPSB0aGlzLmNyZWF0ZUJyaWNrKHRhZywgc3RhdGUpO1xuXG4gICAgICAgIGlmIChjb2x1bW5Db3VudCA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy5sYXlvdXQuYWRkQnJpY2tUb05ld1Jvdyhicmlja1Bvc2l0aW9uLnJvd0luZGV4LCBuZXdCcmljayk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29sdW1uQ291bnQgPiAxKSB7XG4gICAgICAgICAgICB0aGlzLmxheW91dC5hZGRCcmlja1RvRXhpc3RpbmdDb2x1bW4oXG4gICAgICAgICAgICAgICAgYnJpY2tQb3NpdGlvbi5yb3dJbmRleCxcbiAgICAgICAgICAgICAgICBicmlja1Bvc2l0aW9uLmNvbHVtbkluZGV4LFxuICAgICAgICAgICAgICAgIGJyaWNrUG9zaXRpb24uYnJpY2tJbmRleCxcbiAgICAgICAgICAgICAgICBuZXdCcmljayk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRpc3BhdGNoKG5ldyBBZGRCcmlja0V2ZW50KG5ld0JyaWNrLmlkKSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QnJpY2tTbmFwc2hvdChuZXdCcmljay5pZCk7XG4gICAgfVxuXG4gICAgLy8gQWRkIHRleHQgYnJpY2sgdG8gdGhlIGJvdHRvbSBvZiB3YWxsIGluIHRoZSBuZXcgcm93XG4gICAgYWRkRGVmYXVsdEJyaWNrKCkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoKG5ldyBCZWZvcmVDaGFuZ2VFdmVudChBZGRCcmlja0V2ZW50KSk7XG5cbiAgICAgICAgY29uc3QgYnJpY2tDb3VudCA9IHRoaXMubGF5b3V0V2Fsa2VyLmdldEJyaWNrc0NvdW50KCk7XG4gICAgICAgIGNvbnN0IG5ld0JyaWNrID0gdGhpcy5jcmVhdGVCcmljayh0aGlzLkRFRkFVTFRfQlJJQ0spO1xuICAgICAgICBjb25zdCByb3dJbmRleCA9IGJyaWNrQ291bnQgPyB0aGlzLmxheW91dFdhbGtlci5nZXRSb3dDb3VudCgpICsgMSA6IDA7XG5cbiAgICAgICAgdGhpcy5sYXlvdXQuYWRkQnJpY2tUb05ld1Jvdyhyb3dJbmRleCwgbmV3QnJpY2spO1xuXG4gICAgICAgIHRoaXMuZGlzcGF0Y2gobmV3IEFkZEJyaWNrRXZlbnQobmV3QnJpY2suaWQpKTtcbiAgICB9XG5cbiAgICBhZGRCcmlja0F0U3RhcnQodGFnOiBzdHJpbmcsIHN0YXRlPzogYW55KTogSUJyaWNrU25hcHNob3Qge1xuICAgICAgICB0aGlzLmRpc3BhdGNoKG5ldyBCZWZvcmVDaGFuZ2VFdmVudChBZGRCcmlja0V2ZW50KSk7XG5cbiAgICAgICAgY29uc3QgbmV3QnJpY2sgPSB0aGlzLmNyZWF0ZUJyaWNrKHRhZywgc3RhdGUpO1xuXG4gICAgICAgIHRoaXMubGF5b3V0LmFkZEJyaWNrVG9OZXdSb3coMCwgbmV3QnJpY2spO1xuXG4gICAgICAgIHRoaXMuZGlzcGF0Y2gobmV3IEFkZEJyaWNrRXZlbnQobmV3QnJpY2suaWQpKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5nZXRCcmlja1NuYXBzaG90KG5ld0JyaWNrLmlkKTtcbiAgICB9XG5cbiAgICB1cGRhdGVCcmlja1N0YXRlKGJyaWNrSWQsIGJyaWNrU3RhdGUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaChuZXcgQmVmb3JlQ2hhbmdlRXZlbnQoVXBkYXRlQnJpY2tTdGF0ZUV2ZW50KSk7XG5cbiAgICAgICAgY29uc3QgYnJpY2sgPSB0aGlzLmxheW91dFdhbGtlci5nZXRCcmlja0J5SWQoYnJpY2tJZCk7XG5cbiAgICAgICAgY29uc3Qgb2xkU3RhdGUgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGJyaWNrLmdldFN0YXRlKCkpKTtcblxuICAgICAgICBicmljay51cGRhdGVTdGF0ZShKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGJyaWNrU3RhdGUpKSk7XG5cbiAgICAgICAgdGhpcy5kaXNwYXRjaChuZXcgVXBkYXRlQnJpY2tTdGF0ZUV2ZW50KFxuICAgICAgICAgICAgYnJpY2tJZCxcbiAgICAgICAgICAgIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYnJpY2suZ2V0U3RhdGUoKSkpLFxuICAgICAgICAgICAgb2xkU3RhdGVcbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgLy8gdG9kbzogc2hvdWxkIGJlIGFzeW5jIG9wZXJhdGlvblxuICAgIHJlbW92ZUJyaWNrKGJyaWNrSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc3BhdGNoKG5ldyBCZWZvcmVDaGFuZ2VFdmVudChSZW1vdmVCcmlja0V2ZW50KSk7XG5cbiAgICAgICAgY29uc3QgbmV4dFRleHRCcmljayA9IHRoaXMubGF5b3V0V2Fsa2VyLmdldE5leHRUZXh0QnJpY2soYnJpY2tJZCk7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzVGV4dEJyaWNrID0gdGhpcy5sYXlvdXRXYWxrZXIuZ2V0UHJldmlvdXNUZXh0QnJpY2soYnJpY2tJZCk7XG5cbiAgICAgICAgdGhpcy5jbGVhckJyaWNrUmVzb3VyY2VzKGJyaWNrSWQpLnRoZW4oKCkgPT4ge1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCByZW1vdmVkQnJpY2sgPSB0aGlzLmxheW91dFdhbGtlci5nZXRCcmlja0J5SWQoYnJpY2tJZCk7XG5cbiAgICAgICAgdGhpcy5sYXlvdXQucmVtb3ZlQnJpY2soYnJpY2tJZCk7XG5cbiAgICAgICAgdGhpcy5kaXNwYXRjaChuZXcgUmVtb3ZlQnJpY2tFdmVudChcbiAgICAgICAgICAgIHJlbW92ZWRCcmljay5nZXRTbmFwc2hvdCgpLFxuICAgICAgICAgICAgcHJldmlvdXNUZXh0QnJpY2sgJiYgcHJldmlvdXNUZXh0QnJpY2suaWQsXG4gICAgICAgICAgICBuZXh0VGV4dEJyaWNrICYmIG5leHRUZXh0QnJpY2suaWRcbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgLy8gdG9kbzogc2hvdWxkIGJlIGFzeW5jIG9wZXJhdGlvblxuICAgIHJlbW92ZUJyaWNrcyhicmlja0lkcyk6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc3BhdGNoKG5ldyBCZWZvcmVDaGFuZ2VFdmVudChSZW1vdmVCcmlja3NFdmVudCkpO1xuXG4gICAgICAgIGNvbnN0IG5leHRUZXh0QnJpY2sgPSB0aGlzLmxheW91dFdhbGtlci5nZXROZXh0QnJpY2soYnJpY2tJZHNbYnJpY2tJZHMubGVuZ3RoIC0gMV0pO1xuICAgICAgICBjb25zdCBwcmV2aW91c0JyaWNrID0gdGhpcy5sYXlvdXRXYWxrZXIuZ2V0UHJldmlvdXNCcmljayhicmlja0lkc1swXSk7XG5cbiAgICAgICAgY29uc3QgY2xlYXJQcm9taXNlcyA9IGJyaWNrSWRzLm1hcCgoYnJpY2tJZCkgPT4gdGhpcy5jbGVhckJyaWNrUmVzb3VyY2VzKGJyaWNrSWQpKTtcblxuICAgICAgICBQcm9taXNlLmFsbChjbGVhclByb21pc2VzKS50aGVuKCgpID0+IHtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgcmVtb3ZlZEJyaWNrcyA9IGJyaWNrSWRzLm1hcCgoYnJpY2tJZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVtb3ZlZEJyaWNrID0gdGhpcy5sYXlvdXRXYWxrZXIuZ2V0QnJpY2tCeUlkKGJyaWNrSWQpO1xuXG4gICAgICAgICAgICB0aGlzLmxheW91dC5yZW1vdmVCcmljayhicmlja0lkKTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBpZDogcmVtb3ZlZEJyaWNrLmlkLFxuICAgICAgICAgICAgICAgIHRhZzogcmVtb3ZlZEJyaWNrLnRhZyxcbiAgICAgICAgICAgICAgICBzdGF0ZTogcmVtb3ZlZEJyaWNrLnN0YXRlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmRpc3BhdGNoKG5ldyBSZW1vdmVCcmlja3NFdmVudChcbiAgICAgICAgICAgIHJlbW92ZWRCcmlja3MsXG4gICAgICAgICAgICBwcmV2aW91c0JyaWNrICYmIHByZXZpb3VzQnJpY2suaWQsXG4gICAgICAgICAgICBuZXh0VGV4dEJyaWNrICYmIG5leHRUZXh0QnJpY2suaWRcbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGFsbCBicmlja3MgZnJvbSBsYXlvdXRcbiAgICAgKiBDbGVhciBhbGwgYnJpY2tzIGV4dGVybmFsIGRlcGVuZGVuY2llc1xuICAgICAqL1xuICAgIGNsZWFyKCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGNvbnN0IGJyaWNrSWRzID0gdGhpcy5sYXlvdXRXYWxrZXIuZ2V0QnJpY2tJZHMoKTtcblxuICAgICAgICAvLyB0b2RvOiByZXBsYWNlIGl0IGFmdGVyIHJlbW92ZUJyaWNrcyB3aWxsIGJlIGFzeW5jXG4gICAgICAgIGNvbnN0IGNsZWFyUHJvbWlzZXMgPSBicmlja0lkcy5tYXAoKGJyaWNrSWQpID0+IHRoaXMuY2xlYXJCcmlja1Jlc291cmNlcyhicmlja0lkKSk7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKGNsZWFyUHJvbWlzZXMpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgYnJpY2tJZHMuZm9yRWFjaCgoYnJpY2tJZCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubGF5b3V0LnJlbW92ZUJyaWNrKGJyaWNrSWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHR1cm5Ccmlja0ludG8oYnJpY2tJZDogc3RyaW5nLCBuZXdUYWc6IHN0cmluZywgc3RhdGU6IGFueSA9IHt9KSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2gobmV3IEJlZm9yZUNoYW5nZUV2ZW50KFR1cm5Ccmlja0ludG9FdmVudCkpO1xuXG4gICAgICAgIGNvbnN0IGJyaWNrID0gdGhpcy5sYXlvdXRXYWxrZXIuZ2V0QnJpY2tCeUlkKGJyaWNrSWQpO1xuICAgICAgICBjb25zdCBvbGRUYWcgPSBicmljay50YWc7XG5cbiAgICAgICAgYnJpY2tcbiAgICAgICAgICAgIC50dXJuSW50byhuZXdUYWcpXG4gICAgICAgICAgICAudXBkYXRlU3RhdGUoc3RhdGUpO1xuXG4gICAgICAgIHRoaXMuZGlzcGF0Y2gobmV3IFR1cm5Ccmlja0ludG9FdmVudChicmlja0lkLCBuZXdUYWcsIG9sZFRhZykpO1xuICAgIH1cblxuICAgIG1vdmVCcmlja0FmdGVyQnJpY2tJZChtb3ZlZEJyaWNrSWRzOiBzdHJpbmdbXSwgYWZ0ZXJCcmlja0lkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKG1vdmVkQnJpY2tJZHMuaW5kZXhPZihhZnRlckJyaWNrSWQpID09PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaChuZXcgQmVmb3JlQ2hhbmdlRXZlbnQoTW92ZUJyaWNrRXZlbnQpKTtcblxuICAgICAgICAgICAgY29uc3QgYWZ0ZXJCcmlja1Bvc2l0aW9uID0gdGhpcy5sYXlvdXRXYWxrZXIuZ2V0QnJpY2tQb3NpdGlvbihhZnRlckJyaWNrSWQpO1xuICAgICAgICAgICAgY29uc3QgY29sdW1uQ291bnQgPSB0aGlzLmxheW91dFdhbGtlci5nZXRDb2x1bW5Db3VudChhZnRlckJyaWNrUG9zaXRpb24ucm93SW5kZXgpO1xuXG4gICAgICAgICAgICBpZiAoY29sdW1uQ291bnQgPT09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxheW91dC5tb3ZlQnJpY2tBZnRlckluTmV3Um93KGFmdGVyQnJpY2tJZCwgbW92ZWRCcmlja0lkcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubGF5b3V0Lm1vdmVCcmlja0FmdGVySW5TYW1lQ29sdW1uKGFmdGVyQnJpY2tJZCwgbW92ZWRCcmlja0lkcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2gobmV3IE1vdmVCcmlja0V2ZW50KG1vdmVkQnJpY2tJZHMsIGFmdGVyQnJpY2tJZCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZUJyaWNrQmVmb3JlQnJpY2tJZChtb3ZlZEJyaWNrSWRzOiBzdHJpbmdbXSwgYmVmb3JlQnJpY2tJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGlmIChtb3ZlZEJyaWNrSWRzLmluZGV4T2YoYmVmb3JlQnJpY2tJZCkgPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoKG5ldyBCZWZvcmVDaGFuZ2VFdmVudChNb3ZlQnJpY2tFdmVudCkpO1xuXG4gICAgICAgICAgICBjb25zdCBiZWZvcmVCcmlja1Bvc2l0aW9uID0gdGhpcy5sYXlvdXRXYWxrZXIuZ2V0QnJpY2tQb3NpdGlvbihiZWZvcmVCcmlja0lkKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbkNvdW50ID0gdGhpcy5sYXlvdXRXYWxrZXIuZ2V0Q29sdW1uQ291bnQoYmVmb3JlQnJpY2tQb3NpdGlvbi5yb3dJbmRleCk7XG5cbiAgICAgICAgICAgIGlmIChjb2x1bW5Db3VudCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMubGF5b3V0Lm1vdmVCcmlja0JlZm9yZUluTmV3Um93KGJlZm9yZUJyaWNrSWQsIG1vdmVkQnJpY2tJZHMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxheW91dC5tb3ZlQnJpY2tCZWZvcmVJblNhbWVDb2x1bW4oYmVmb3JlQnJpY2tJZCwgbW92ZWRCcmlja0lkcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2gobmV3IE1vdmVCcmlja0V2ZW50KG1vdmVkQnJpY2tJZHMsIGJlZm9yZUJyaWNrSWQpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVCcmlja1RvTmV3Q29sdW1uKHRhcmdldEJyaWNrSWRzOiBzdHJpbmdbXSwgYmVmb3JlQnJpY2tJZDogc3RyaW5nLCBzaWRlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRhcmdldEJyaWNrSWRzLmluZGV4T2YoYmVmb3JlQnJpY2tJZCkgPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoKG5ldyBCZWZvcmVDaGFuZ2VFdmVudChNb3ZlQnJpY2tFdmVudCkpO1xuXG4gICAgICAgICAgICB0aGlzLmxheW91dC5tb3ZlQnJpY2tUb05ld0NvbHVtbih0YXJnZXRCcmlja0lkcywgYmVmb3JlQnJpY2tJZCwgc2lkZSk7XG5cbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2gobmV3IE1vdmVCcmlja0V2ZW50KHRhcmdldEJyaWNrSWRzLCBiZWZvcmVCcmlja0lkKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBRVUVSWSBNRVRIT0RTXG4gICAgZ2V0UGxhbigpOiBJV2FsbERlZmluaXRpb24ge1xuICAgICAgICBjb25zdCBwbGFuID0ge1xuICAgICAgICAgICAgYnJpY2tzOiBbXSxcbiAgICAgICAgICAgIGxheW91dDoge1xuICAgICAgICAgICAgICAgIGJyaWNrczogW11cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmxheW91dFdhbGtlci50cmF2ZXJzZSgocm93OiBJV2FsbFJvdykgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29sdW1ucyA9IFtdO1xuXG4gICAgICAgICAgICByb3cuY29sdW1ucy5mb3JFYWNoKChjb2x1bW46IElXYWxsQ29sdW1uKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGxhbkNvbHVtbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgYnJpY2tzOiBbXVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBjb2x1bW4uYnJpY2tzLmZvckVhY2goKGJyaWNrOiBXYWxsQnJpY2spID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcGxhbi5icmlja3MucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogYnJpY2suaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWc6IGJyaWNrLnRhZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGE6IGJyaWNrLm1ldGEsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBicmljay5zdGF0ZVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBwbGFuQ29sdW1uLmJyaWNrcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBicmljay5pZFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGNvbHVtbnMucHVzaChwbGFuQ29sdW1uKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBwbGFuLmxheW91dC5icmlja3MucHVzaCh7XG4gICAgICAgICAgICAgICAgY29sdW1ucyxcbiAgICAgICAgICAgICAgICBpZDogcm93LmlkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocGxhbikpO1xuICAgIH1cblxuICAgIHNvcnRCcmlja0lkc0J5TGF5b3V0T3JkZXIoYnJpY2tJZHM6IHN0cmluZ1tdKSB7XG4gICAgICAgIGNvbnN0IGJyaWNrc1NlcXVlbmNlID0gdGhpcy5sYXlvdXRXYWxrZXIuZ2V0QnJpY2tTZXF1ZW5jZSgoKSA9PiB0cnVlKTtcblxuICAgICAgICByZXR1cm4gYnJpY2tzU2VxdWVuY2VcbiAgICAgICAgICAgIC5maWx0ZXIoKGJyaWNrKSA9PiBicmlja0lkcy5pbmRleE9mKGJyaWNrLmlkKSAhPT0gLTEpXG4gICAgICAgICAgICAubWFwKChicmljaykgPT4gYnJpY2suaWQpO1xuICAgIH1cblxuICAgIHRyYXZlcnNlKGZuKTogdm9pZCB7XG4gICAgICAgIHJldHVybiB0aGlzLmxheW91dFdhbGtlci50cmF2ZXJzZSgocm93OiBJV2FsbFJvdykgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJlcGFyZWRSb3cgPSB7XG4gICAgICAgICAgICAgICAgaWQ6IHJvdy5pZCxcblxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IHJvdy5jb2x1bW5zLm1hcCgoY29sdW1uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmlja3M6IGNvbHVtbi5icmlja3MubWFwKChicmljaykgPT4gYnJpY2suZ2V0U25hcHNob3QoKSlcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZm4ocHJlcGFyZWRSb3cpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRCcmlja1NuYXBzaG90KGJyaWNrSWQ6IHN0cmluZyk6IElCcmlja1NuYXBzaG90IHtcbiAgICAgICAgY29uc3QgYnJpY2sgPSB0aGlzLmxheW91dFdhbGtlci5nZXRCcmlja0J5SWQoYnJpY2tJZCk7XG5cbiAgICAgICAgcmV0dXJuIGJyaWNrID8gYnJpY2suZ2V0U25hcHNob3QoKSA6IG51bGw7XG4gICAgfVxuXG4gICAgZ2V0QnJpY2tSZXNvdXJjZVBhdGhzKGJyaWNrSWQ6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICAgICAgY29uc3QgYnJpY2sgPSB0aGlzLmxheW91dFdhbGtlci5nZXRCcmlja0J5SWQoYnJpY2tJZCk7XG5cbiAgICAgICAgY29uc3QgYnJpY2tTcGVjaWZpY2F0aW9uID0gdGhpcy5icmlja1JlZ2lzdHJ5LmdldChicmljay50YWcpO1xuXG4gICAgICAgIGlmICghYnJpY2tTcGVjaWZpY2F0aW9uLmdldEJyaWNrUmVzb3VyY2VQYXRocykge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGJyaWNrU3BlY2lmaWNhdGlvbi5nZXRCcmlja1Jlc291cmNlUGF0aHMoYnJpY2suZ2V0U25hcHNob3QoKSk7XG4gICAgfVxuXG4gICAgZ2V0QnJpY2tUZXh0UmVwcmVzZW50YXRpb24oYnJpY2tJZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgYnJpY2sgPSB0aGlzLmxheW91dFdhbGtlci5nZXRCcmlja0J5SWQoYnJpY2tJZCk7XG5cbiAgICAgICAgY29uc3QgYnJpY2tTcGVjaWZpY2F0aW9uID0gdGhpcy5icmlja1JlZ2lzdHJ5LmdldChicmljay50YWcpO1xuXG4gICAgICAgIGlmIChicmlja1NwZWNpZmljYXRpb24udGV4dFJlcHJlc2VudGF0aW9uKSB7XG4gICAgICAgICAgICBjb25zdCBicmlja1RleHRSZXByZXNlbnRhdGlvbiA9IG5ldyBicmlja1NwZWNpZmljYXRpb24udGV4dFJlcHJlc2VudGF0aW9uKGJyaWNrLmdldFNuYXBzaG90KCkpO1xuXG4gICAgICAgICAgICByZXR1cm4gYnJpY2tUZXh0UmVwcmVzZW50YXRpb24uZ2V0VGV4dCgpIHx8ICcnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3Vic2NyaWJlKGNhbGxiYWNrKTogU3Vic2NyaXB0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRzLnN1YnNjcmliZShjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgaXNSZWdpc3RlcmVkQnJpY2sodGFnOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4odGhpcy5icmlja1JlZ2lzdHJ5LmdldCh0YWcpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRpc3BhdGNoKGU6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLmV2ZW50cy5uZXh0KGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlQnJpY2sodGFnLCBzdGF0ZT86IGFueSkge1xuICAgICAgICBjb25zdCBpZCA9IHRoaXMuZ2VuZXJhdGVHdWlkKCk7XG4gICAgICAgIGNvbnN0IG1ldGEgPSB7fTtcbiAgICAgICAgY29uc3QgYnJpY2sgPSBuZXcgV2FsbEJyaWNrKGlkLCB0YWcsIG1ldGEpO1xuXG4gICAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICAgICAgYnJpY2sudXBkYXRlU3RhdGUoc3RhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGJyaWNrO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVzdG9yZUJyaWNrKGJyaWNrRGVmaW5pdGlvbjogSUJyaWNrRGVmaW5pdGlvbik6IFdhbGxCcmljayB7XG4gICAgICAgIGNvbnN0IGJyaWNrID0gbmV3IFdhbGxCcmljayhcbiAgICAgICAgICAgIGJyaWNrRGVmaW5pdGlvbi5pZCxcbiAgICAgICAgICAgIGJyaWNrRGVmaW5pdGlvbi50YWcsXG4gICAgICAgICAgICBicmlja0RlZmluaXRpb24ubWV0YVxuICAgICAgICApO1xuXG4gICAgICAgIGJyaWNrLnVwZGF0ZVN0YXRlKGJyaWNrRGVmaW5pdGlvbi5kYXRhKTtcblxuICAgICAgICByZXR1cm4gYnJpY2s7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjbGVhckJyaWNrUmVzb3VyY2VzKGJyaWNrSWQpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBjb25zdCBicmljayA9IHRoaXMubGF5b3V0V2Fsa2VyLmdldEJyaWNrQnlJZChicmlja0lkKTtcblxuICAgICAgICBjb25zdCBicmlja1NwZWNpZmljYXRpb24gPSB0aGlzLmJyaWNrUmVnaXN0cnkuZ2V0KGJyaWNrLnRhZyk7XG5cbiAgICAgICAgaWYgKGJyaWNrU3BlY2lmaWNhdGlvbi5kZXN0cnVjdG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gYnJpY2tTcGVjaWZpY2F0aW9uLmRlc3RydWN0b3IoYnJpY2suZ2V0U25hcHNob3QoKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdlbmVyYXRlR3VpZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gKG5ldyBHdWlkKCkpLmdldCgpO1xuICAgIH1cbn1cbiJdfQ==