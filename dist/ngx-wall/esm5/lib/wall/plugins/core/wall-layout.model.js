/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Guid } from '../../../modules/utils/utils';
/*
* Modify layout wall rows
* */
var /*
* Modify layout wall rows
* */
WallLayout = /** @class */ (function () {
    function WallLayout(brickRegistry, layoutWalker) {
        this.brickRegistry = brickRegistry;
        this.layoutWalker = layoutWalker;
        this.rows = [];
    }
    // create new row and one column inside
    // create new row and one column inside
    /**
     * @param {?} rowIndex
     * @param {?} brick
     * @param {?=} rowId
     * @return {?}
     */
    WallLayout.prototype.addBrickToNewRow = 
    // create new row and one column inside
    /**
     * @param {?} rowIndex
     * @param {?} brick
     * @param {?=} rowId
     * @return {?}
     */
    function (rowIndex, brick, rowId) {
        /** @type {?} */
        var totalRowCount = this.rows.length;
        /** @type {?} */
        var lastRowIndex = totalRowCount - 1;
        // user cannot create row in position more than last row index + 1
        // todo: remove helper checks, lets face the problem earlier
        if (rowIndex > (lastRowIndex + 1)) {
            rowIndex = lastRowIndex + 1;
        }
        this.createNewRow(rowIndex, rowId || this.generateId());
        this.addBrick(rowIndex, 0, 0, brick);
    };
    // add only in already existing row and column
    // add only in already existing row and column
    /**
     * @param {?} rowIndex
     * @param {?} columnIndex
     * @param {?} brickIndex
     * @param {?} brick
     * @return {?}
     */
    WallLayout.prototype.addBrickToExistingColumn = 
    // add only in already existing row and column
    /**
     * @param {?} rowIndex
     * @param {?} columnIndex
     * @param {?} brickIndex
     * @param {?} brick
     * @return {?}
     */
    function (rowIndex, columnIndex, brickIndex, brick) {
        /** @type {?} */
        var column = this.getColumn(rowIndex, columnIndex);
        if (column) {
            /** @type {?} */
            var bricksCount = column.bricks.length;
            // user cannot put brick in position more than total brick count + 1
            // todo: remove helper checks, lets face the problem earlier
            if (brickIndex > (bricksCount + 1)) {
                brickIndex = bricksCount + 1;
            }
            this.addBrick(rowIndex, columnIndex, brickIndex, brick);
        }
    };
    // create new column in existing row
    // create new column in existing row
    /**
     * @param {?} rowIndex
     * @param {?} columnIndex
     * @param {?} brick
     * @return {?}
     */
    WallLayout.prototype.addBrickToNewColumn = 
    // create new column in existing row
    /**
     * @param {?} rowIndex
     * @param {?} columnIndex
     * @param {?} brick
     * @return {?}
     */
    function (rowIndex, columnIndex, brick) {
        /** @type {?} */
        var row = this.rows[rowIndex];
        if (row) {
            /** @type {?} */
            var columnCount = row.columns.length;
            // user cannot create column in position more than total column cound + 1
            // todo: remove helper checks, lets face the problem earlier
            if (columnIndex > (columnCount + 1)) {
                columnIndex = columnCount + 1;
            }
            this.createNewColumn(rowIndex, columnIndex);
            this.addBrick(rowIndex, columnIndex, 0, brick);
        }
    };
    /**
     * @param {?} afterBrickId
     * @param {?} movedBrickIds
     * @return {?}
     */
    WallLayout.prototype.moveBrickAfterInNewRow = /**
     * @param {?} afterBrickId
     * @param {?} movedBrickIds
     * @return {?}
     */
    function (afterBrickId, movedBrickIds) {
        var _this = this;
        movedBrickIds.reverse();
        movedBrickIds.forEach((/**
         * @param {?} movedBrickId
         * @return {?}
         */
        function (movedBrickId) {
            /** @type {?} */
            var currentMovedBrick = _this.layoutWalker.getBrickById(movedBrickId);
            _this.removeBrick(movedBrickId);
            /** @type {?} */
            var afterBrickPosition = _this.layoutWalker.getBrickPosition(afterBrickId);
            /** @type {?} */
            var newRowIndex = afterBrickPosition.rowIndex + 1;
            _this.addBrickToNewRow(newRowIndex, currentMovedBrick);
        }));
    };
    /**
     * @param {?} afterBrickId
     * @param {?} movedBrickIds
     * @return {?}
     */
    WallLayout.prototype.moveBrickAfterInSameColumn = /**
     * @param {?} afterBrickId
     * @param {?} movedBrickIds
     * @return {?}
     */
    function (afterBrickId, movedBrickIds) {
        var _this = this;
        movedBrickIds.forEach((/**
         * @param {?} movedBrickId
         * @param {?} index
         * @return {?}
         */
        function (movedBrickId, index) {
            /** @type {?} */
            var currentMovedBrick = _this.layoutWalker.getBrickById(movedBrickId);
            _this.removeBrick(movedBrickId);
            /** @type {?} */
            var afterBrickPosition = _this.layoutWalker.getBrickPosition(afterBrickId);
            _this.addBrickToExistingColumn(afterBrickPosition.rowIndex, afterBrickPosition.columnIndex, afterBrickPosition.brickIndex + index + 1, currentMovedBrick);
        }));
    };
    /**
     * @param {?} beforeBrickId
     * @param {?} movedBrickIds
     * @return {?}
     */
    WallLayout.prototype.moveBrickBeforeInNewRow = /**
     * @param {?} beforeBrickId
     * @param {?} movedBrickIds
     * @return {?}
     */
    function (beforeBrickId, movedBrickIds) {
        var _this = this;
        movedBrickIds.reverse();
        movedBrickIds.forEach((/**
         * @param {?} movedBrickId
         * @param {?} index
         * @return {?}
         */
        function (movedBrickId, index) {
            /** @type {?} */
            var currentMovedBrick = _this.layoutWalker.getBrickById(movedBrickId);
            _this.removeBrick(movedBrickId);
            /** @type {?} */
            var beforeBrickPosition;
            if (index === 0) {
                beforeBrickPosition = _this.layoutWalker.getBrickPosition(beforeBrickId);
            }
            else {
                beforeBrickPosition = _this.layoutWalker.getBrickPosition(movedBrickIds[index - 1]);
            }
            _this.addBrickToNewRow(beforeBrickPosition.rowIndex, currentMovedBrick);
        }));
    };
    /**
     * @param {?} beforeBrickId
     * @param {?} movedBrickIds
     * @return {?}
     */
    WallLayout.prototype.moveBrickBeforeInSameColumn = /**
     * @param {?} beforeBrickId
     * @param {?} movedBrickIds
     * @return {?}
     */
    function (beforeBrickId, movedBrickIds) {
        var _this = this;
        movedBrickIds.forEach((/**
         * @param {?} movedBrickId
         * @return {?}
         */
        function (movedBrickId) {
            /** @type {?} */
            var currentMovedBrick = _this.layoutWalker.getBrickById(movedBrickId);
            _this.removeBrick(movedBrickId);
            /** @type {?} */
            var beforeBrickPosition = _this.layoutWalker.getBrickPosition(beforeBrickId);
            _this.addBrickToExistingColumn(beforeBrickPosition.rowIndex, beforeBrickPosition.columnIndex, beforeBrickPosition.brickIndex, currentMovedBrick);
        }));
    };
    /**
     * @param {?} movedBrickIds
     * @param {?} beforeBrickId
     * @param {?} side
     * @return {?}
     */
    WallLayout.prototype.moveBrickToNewColumn = /**
     * @param {?} movedBrickIds
     * @param {?} beforeBrickId
     * @param {?} side
     * @return {?}
     */
    function (movedBrickIds, beforeBrickId, side) {
        var _this = this;
        /** @type {?} */
        var movedBricks = movedBrickIds.map((/**
         * @param {?} movedBrickId
         * @return {?}
         */
        function (movedBrickId) {
            /** @type {?} */
            var currentMovedBrick = _this.layoutWalker.getBrickById(movedBrickId);
            _this.removeBrick(movedBrickId);
            return currentMovedBrick;
        }));
        /** @type {?} */
        var beforeBrickPosition = this.layoutWalker.getBrickPosition(beforeBrickId);
        /** @type {?} */
        var columnIndex;
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
        function (movedBrick, index) {
            if (index === 0) {
                _this.addBrickToNewColumn(beforeBrickPosition.rowIndex, columnIndex, movedBrick);
            }
            else {
                _this.addBrickToExistingColumn(beforeBrickPosition.rowIndex, columnIndex, index, movedBrick);
            }
        }));
    };
    /**
     * @param {?} brickId
     * @return {?}
     */
    WallLayout.prototype.removeBrick = /**
     * @param {?} brickId
     * @return {?}
     */
    function (brickId) {
        /** @type {?} */
        var brickPosition = this.layoutWalker.getBrickPosition(brickId);
        /** @type {?} */
        var row = this.rows[brickPosition.rowIndex];
        /** @type {?} */
        var column = row.columns[brickPosition.columnIndex];
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
    };
    // COMMANDS
    // COMMANDS
    /**
     * @private
     * @param {?} rowIndex
     * @param {?} columnIndex
     * @param {?} brickIndex
     * @param {?} brick
     * @return {?}
     */
    WallLayout.prototype.addBrick = 
    // COMMANDS
    /**
     * @private
     * @param {?} rowIndex
     * @param {?} columnIndex
     * @param {?} brickIndex
     * @param {?} brick
     * @return {?}
     */
    function (rowIndex, columnIndex, brickIndex, brick) {
        this.rows[rowIndex].columns[columnIndex].bricks.splice(brickIndex, 0, brick);
    };
    /**
     * @private
     * @param {?} rowIndex
     * @param {?} columnIndex
     * @return {?}
     */
    WallLayout.prototype.getColumn = /**
     * @private
     * @param {?} rowIndex
     * @param {?} columnIndex
     * @return {?}
     */
    function (rowIndex, columnIndex) {
        /** @type {?} */
        var row = this.rows[rowIndex];
        if (row) {
            return row.columns[columnIndex];
        }
        else {
            return null;
        }
    };
    /**
     * @private
     * @param {?} rowIndex
     * @param {?} rowId
     * @return {?}
     */
    WallLayout.prototype.createNewRow = /**
     * @private
     * @param {?} rowIndex
     * @param {?} rowId
     * @return {?}
     */
    function (rowIndex, rowId) {
        this.rows.splice(rowIndex, 0, this.initializeNewRow(rowId));
    };
    /**
     * @private
     * @param {?} rowIndex
     * @param {?} columnIndex
     * @return {?}
     */
    WallLayout.prototype.createNewColumn = /**
     * @private
     * @param {?} rowIndex
     * @param {?} columnIndex
     * @return {?}
     */
    function (rowIndex, columnIndex) {
        this.rows[rowIndex].columns.splice(columnIndex, 0, this.initializeNewColumn());
    };
    /**
     * @private
     * @param {?} rowId
     * @return {?}
     */
    WallLayout.prototype.initializeNewRow = /**
     * @private
     * @param {?} rowId
     * @return {?}
     */
    function (rowId) {
        return {
            id: rowId,
            columns: [
                this.initializeNewColumn()
            ]
        };
    };
    /**
     * @private
     * @return {?}
     */
    WallLayout.prototype.initializeNewColumn = /**
     * @private
     * @return {?}
     */
    function () {
        return {
            bricks: []
        };
    };
    /**
     * @private
     * @return {?}
     */
    WallLayout.prototype.generateId = /**
     * @private
     * @return {?}
     */
    function () {
        return (new Guid()).get();
    };
    return WallLayout;
}());
/*
* Modify layout wall rows
* */
export { WallLayout };
if (false) {
    /** @type {?} */
    WallLayout.prototype.rows;
    /**
     * @type {?}
     * @private
     */
    WallLayout.prototype.brickRegistry;
    /**
     * @type {?}
     * @private
     */
    WallLayout.prototype.layoutWalker;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbC1sYXlvdXQubW9kZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi93YWxsL3BsdWdpbnMvY29yZS93YWxsLWxheW91dC5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLElBQUksRUFBQyxNQUFNLDhCQUE4QixDQUFDOzs7O0FBVWxEOzs7O0lBR0ksb0JBQW9CLGFBQTRCLEVBQVUsWUFBMEI7UUFBaEUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUZwRixTQUFJLEdBQWUsRUFBRSxDQUFDO0lBR3RCLENBQUM7SUFFRCx1Q0FBdUM7Ozs7Ozs7O0lBQ3ZDLHFDQUFnQjs7Ozs7Ozs7SUFBaEIsVUFBaUIsUUFBZ0IsRUFBRSxLQUFnQixFQUFFLEtBQWM7O1lBQ3pELGFBQWEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU07O1lBQ2hDLFlBQVksR0FBRyxhQUFhLEdBQUcsQ0FBQztRQUV0QyxrRUFBa0U7UUFDbEUsNERBQTREO1FBQzVELElBQUksUUFBUSxHQUFHLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQy9CLFFBQVEsR0FBRyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1NBQy9CO1FBRUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsS0FBSyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBRXhELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELDhDQUE4Qzs7Ozs7Ozs7O0lBQzlDLDZDQUF3Qjs7Ozs7Ozs7O0lBQXhCLFVBQXlCLFFBQWdCLEVBQUUsV0FBbUIsRUFBRSxVQUFrQixFQUFFLEtBQWdCOztZQUMxRixNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsV0FB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TTtZQUNILE9BQU8sSUFBSSxDQUFDO1NBQ2Y7SUFDTCxDQUFDOzs7Ozs7O0lBRU8saUNBQVk7Ozs7OztJQUFwQixVQUFxQixRQUFnQixFQUFFLEtBQWE7UUFDaEQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNoRSxDQUFDOzs7Ozs7O0lBRU8sb0NBQWU7Ozs7OztJQUF2QixVQUF3QixRQUFnQixFQUFFLFdBQW1CO1FBQ3pELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUM7SUFDbkYsQ0FBQzs7Ozs7O0lBRU8scUNBQWdCOzs7OztJQUF4QixVQUF5QixLQUFhO1FBQ2xDLE9BQU87WUFDSCxFQUFFLEVBQUUsS0FBSztZQUNULE9BQU8sRUFBRTtnQkFDTCxJQUFJLENBQUMsbUJBQW1CLEVBQUU7YUFDN0I7U0FDSixDQUFDO0lBQ04sQ0FBQzs7Ozs7SUFFTyx3Q0FBbUI7Ozs7SUFBM0I7UUFDSSxPQUFPO1lBQ0gsTUFBTSxFQUFFLEVBQUU7U0FDYixDQUFDO0lBQ04sQ0FBQzs7Ozs7SUFFTywrQkFBVTs7OztJQUFsQjtRQUNJLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUNMLGlCQUFDO0FBQUQsQ0FBQyxBQXZPRCxJQXVPQzs7Ozs7OztJQXRPRywwQkFBc0I7Ozs7O0lBRVYsbUNBQW9DOzs7OztJQUFFLGtDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7R3VpZH0gZnJvbSAnLi4vLi4vLi4vbW9kdWxlcy91dGlscy91dGlscyc7XG5pbXBvcnQge0JyaWNrUmVnaXN0cnl9IGZyb20gJy4uLy4uL3JlZ2lzdHJ5L3B1YmxpY19hcGknO1xuaW1wb3J0IHtXYWxsQnJpY2t9IGZyb20gJy4uLy4uL21vZGVsL3dhbGwtYnJpY2subW9kZWwnO1xuaW1wb3J0IHtJV2FsbENvbHVtbn0gZnJvbSAnLi4vLi4vbW9kZWwvaW50ZXJmYWNlcy93YWxsLWNvbHVtbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHtJV2FsbFJvd30gZnJvbSAnLi4vLi4vbW9kZWwvaW50ZXJmYWNlcy93YWxsLXJvdy5pbnRlcmZhY2UnO1xuaW1wb3J0IHtMYXlvdXRXYWxrZXJ9IGZyb20gJy4vbGF5b3V0LXdhbGtlci5jbGFzcyc7XG5cbi8qXG4qIE1vZGlmeSBsYXlvdXQgd2FsbCByb3dzXG4qICovXG5leHBvcnQgY2xhc3MgV2FsbExheW91dCB7XG4gICAgcm93czogSVdhbGxSb3dbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBicmlja1JlZ2lzdHJ5OiBCcmlja1JlZ2lzdHJ5LCBwcml2YXRlIGxheW91dFdhbGtlcjogTGF5b3V0V2Fsa2VyKSB7XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIG5ldyByb3cgYW5kIG9uZSBjb2x1bW4gaW5zaWRlXG4gICAgYWRkQnJpY2tUb05ld1Jvdyhyb3dJbmRleDogbnVtYmVyLCBicmljazogV2FsbEJyaWNrLCByb3dJZD86IHN0cmluZykge1xuICAgICAgICBjb25zdCB0b3RhbFJvd0NvdW50ID0gdGhpcy5yb3dzLmxlbmd0aDtcbiAgICAgICAgY29uc3QgbGFzdFJvd0luZGV4ID0gdG90YWxSb3dDb3VudCAtIDE7XG5cbiAgICAgICAgLy8gdXNlciBjYW5ub3QgY3JlYXRlIHJvdyBpbiBwb3NpdGlvbiBtb3JlIHRoYW4gbGFzdCByb3cgaW5kZXggKyAxXG4gICAgICAgIC8vIHRvZG86IHJlbW92ZSBoZWxwZXIgY2hlY2tzLCBsZXRzIGZhY2UgdGhlIHByb2JsZW0gZWFybGllclxuICAgICAgICBpZiAocm93SW5kZXggPiAobGFzdFJvd0luZGV4ICsgMSkpIHtcbiAgICAgICAgICAgIHJvd0luZGV4ID0gbGFzdFJvd0luZGV4ICsgMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY3JlYXRlTmV3Um93KHJvd0luZGV4LCByb3dJZCB8fCB0aGlzLmdlbmVyYXRlSWQoKSk7XG5cbiAgICAgICAgdGhpcy5hZGRCcmljayhyb3dJbmRleCwgMCwgMCwgYnJpY2spO1xuICAgIH1cblxuICAgIC8vIGFkZCBvbmx5IGluIGFscmVhZHkgZXhpc3Rpbmcgcm93IGFuZCBjb2x1bW5cbiAgICBhZGRCcmlja1RvRXhpc3RpbmdDb2x1bW4ocm93SW5kZXg6IG51bWJlciwgY29sdW1uSW5kZXg6IG51bWJlciwgYnJpY2tJbmRleDogbnVtYmVyLCBicmljazogV2FsbEJyaWNrKSB7XG4gICAgICAgIGNvbnN0IGNvbHVtbiA9IHRoaXMuZ2V0Q29sdW1uKHJvd0luZGV4LCBjb2x1bW5JbmRleCk7XG5cbiAgICAgICAgaWYgKGNvbHVtbikge1xuICAgICAgICAgICAgY29uc3QgYnJpY2tzQ291bnQgPSBjb2x1bW4uYnJpY2tzLmxlbmd0aDtcblxuICAgICAgICAgICAgLy8gdXNlciBjYW5ub3QgcHV0IGJyaWNrIGluIHBvc2l0aW9uIG1vcmUgdGhhbiB0b3RhbCBicmljayBjb3VudCArIDFcbiAgICAgICAgICAgIC8vIHRvZG86IHJlbW92ZSBoZWxwZXIgY2hlY2tzLCBsZXRzIGZhY2UgdGhlIHByb2JsZW0gZWFybGllclxuICAgICAgICAgICAgaWYgKGJyaWNrSW5kZXggPiAoYnJpY2tzQ291bnQgKyAxKSkge1xuICAgICAgICAgICAgICAgIGJyaWNrSW5kZXggPSBicmlja3NDb3VudCArIDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuYWRkQnJpY2socm93SW5kZXgsIGNvbHVtbkluZGV4LCBicmlja0luZGV4LCBicmljayk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjcmVhdGUgbmV3IGNvbHVtbiBpbiBleGlzdGluZyByb3dcbiAgICBhZGRCcmlja1RvTmV3Q29sdW1uKHJvd0luZGV4LCBjb2x1bW5JbmRleCwgYnJpY2s6IFdhbGxCcmljaykge1xuICAgICAgICBjb25zdCByb3cgPSB0aGlzLnJvd3Nbcm93SW5kZXhdO1xuXG4gICAgICAgIGlmIChyb3cpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbkNvdW50ID0gcm93LmNvbHVtbnMubGVuZ3RoO1xuXG4gICAgICAgICAgICAvLyB1c2VyIGNhbm5vdCBjcmVhdGUgY29sdW1uIGluIHBvc2l0aW9uIG1vcmUgdGhhbiB0b3RhbCBjb2x1bW4gY291bmQgKyAxXG4gICAgICAgICAgICAvLyB0b2RvOiByZW1vdmUgaGVscGVyIGNoZWNrcywgbGV0cyBmYWNlIHRoZSBwcm9ibGVtIGVhcmxpZXJcbiAgICAgICAgICAgIGlmIChjb2x1bW5JbmRleCA+IChjb2x1bW5Db3VudCArIDEpKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uSW5kZXggPSBjb2x1bW5Db3VudCArIDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTmV3Q29sdW1uKHJvd0luZGV4LCBjb2x1bW5JbmRleCk7XG5cbiAgICAgICAgICAgIHRoaXMuYWRkQnJpY2socm93SW5kZXgsIGNvbHVtbkluZGV4LCAwLCBicmljayk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlQnJpY2tBZnRlckluTmV3Um93KGFmdGVyQnJpY2tJZDogc3RyaW5nLCBtb3ZlZEJyaWNrSWRzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgICAgICBtb3ZlZEJyaWNrSWRzLnJldmVyc2UoKTtcblxuICAgICAgICBtb3ZlZEJyaWNrSWRzLmZvckVhY2goKG1vdmVkQnJpY2tJZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudE1vdmVkQnJpY2sgPSB0aGlzLmxheW91dFdhbGtlci5nZXRCcmlja0J5SWQobW92ZWRCcmlja0lkKTtcblxuICAgICAgICAgICAgdGhpcy5yZW1vdmVCcmljayhtb3ZlZEJyaWNrSWQpO1xuXG4gICAgICAgICAgICBjb25zdCBhZnRlckJyaWNrUG9zaXRpb24gPSB0aGlzLmxheW91dFdhbGtlci5nZXRCcmlja1Bvc2l0aW9uKGFmdGVyQnJpY2tJZCk7XG5cbiAgICAgICAgICAgIGNvbnN0IG5ld1Jvd0luZGV4ID0gYWZ0ZXJCcmlja1Bvc2l0aW9uLnJvd0luZGV4ICsgMTtcblxuICAgICAgICAgICAgdGhpcy5hZGRCcmlja1RvTmV3Um93KG5ld1Jvd0luZGV4LCBjdXJyZW50TW92ZWRCcmljayk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG1vdmVCcmlja0FmdGVySW5TYW1lQ29sdW1uKGFmdGVyQnJpY2tJZDogc3RyaW5nLCBtb3ZlZEJyaWNrSWRzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgICAgICBtb3ZlZEJyaWNrSWRzLmZvckVhY2goKG1vdmVkQnJpY2tJZCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRNb3ZlZEJyaWNrID0gdGhpcy5sYXlvdXRXYWxrZXIuZ2V0QnJpY2tCeUlkKG1vdmVkQnJpY2tJZCk7XG5cbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQnJpY2sobW92ZWRCcmlja0lkKTtcblxuICAgICAgICAgICAgY29uc3QgYWZ0ZXJCcmlja1Bvc2l0aW9uID0gdGhpcy5sYXlvdXRXYWxrZXIuZ2V0QnJpY2tQb3NpdGlvbihhZnRlckJyaWNrSWQpO1xuXG4gICAgICAgICAgICB0aGlzLmFkZEJyaWNrVG9FeGlzdGluZ0NvbHVtbihcbiAgICAgICAgICAgICAgICBhZnRlckJyaWNrUG9zaXRpb24ucm93SW5kZXgsXG4gICAgICAgICAgICAgICAgYWZ0ZXJCcmlja1Bvc2l0aW9uLmNvbHVtbkluZGV4LFxuICAgICAgICAgICAgICAgIGFmdGVyQnJpY2tQb3NpdGlvbi5icmlja0luZGV4ICsgaW5kZXggKyAxLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRNb3ZlZEJyaWNrKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbW92ZUJyaWNrQmVmb3JlSW5OZXdSb3coYmVmb3JlQnJpY2tJZDogc3RyaW5nLCBtb3ZlZEJyaWNrSWRzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgICAgICBtb3ZlZEJyaWNrSWRzLnJldmVyc2UoKTtcblxuICAgICAgICBtb3ZlZEJyaWNrSWRzLmZvckVhY2goKG1vdmVkQnJpY2tJZCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRNb3ZlZEJyaWNrID0gdGhpcy5sYXlvdXRXYWxrZXIuZ2V0QnJpY2tCeUlkKG1vdmVkQnJpY2tJZCk7XG5cbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQnJpY2sobW92ZWRCcmlja0lkKTtcblxuICAgICAgICAgICAgbGV0IGJlZm9yZUJyaWNrUG9zaXRpb247XG5cbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGJlZm9yZUJyaWNrUG9zaXRpb24gPSB0aGlzLmxheW91dFdhbGtlci5nZXRCcmlja1Bvc2l0aW9uKGJlZm9yZUJyaWNrSWQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBiZWZvcmVCcmlja1Bvc2l0aW9uID0gdGhpcy5sYXlvdXRXYWxrZXIuZ2V0QnJpY2tQb3NpdGlvbihtb3ZlZEJyaWNrSWRzW2luZGV4IC0gMV0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmFkZEJyaWNrVG9OZXdSb3coYmVmb3JlQnJpY2tQb3NpdGlvbi5yb3dJbmRleCwgY3VycmVudE1vdmVkQnJpY2spO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtb3ZlQnJpY2tCZWZvcmVJblNhbWVDb2x1bW4oYmVmb3JlQnJpY2tJZDogc3RyaW5nLCBtb3ZlZEJyaWNrSWRzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgICAgICBtb3ZlZEJyaWNrSWRzLmZvckVhY2goKG1vdmVkQnJpY2tJZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudE1vdmVkQnJpY2sgPSB0aGlzLmxheW91dFdhbGtlci5nZXRCcmlja0J5SWQobW92ZWRCcmlja0lkKTtcblxuICAgICAgICAgICAgdGhpcy5yZW1vdmVCcmljayhtb3ZlZEJyaWNrSWQpO1xuXG4gICAgICAgICAgICBjb25zdCBiZWZvcmVCcmlja1Bvc2l0aW9uID0gdGhpcy5sYXlvdXRXYWxrZXIuZ2V0QnJpY2tQb3NpdGlvbihiZWZvcmVCcmlja0lkKTtcblxuICAgICAgICAgICAgdGhpcy5hZGRCcmlja1RvRXhpc3RpbmdDb2x1bW4oXG4gICAgICAgICAgICAgICAgYmVmb3JlQnJpY2tQb3NpdGlvbi5yb3dJbmRleCxcbiAgICAgICAgICAgICAgICBiZWZvcmVCcmlja1Bvc2l0aW9uLmNvbHVtbkluZGV4LFxuICAgICAgICAgICAgICAgIGJlZm9yZUJyaWNrUG9zaXRpb24uYnJpY2tJbmRleCxcbiAgICAgICAgICAgICAgICBjdXJyZW50TW92ZWRCcmljayk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG1vdmVCcmlja1RvTmV3Q29sdW1uKG1vdmVkQnJpY2tJZHMsIGJlZm9yZUJyaWNrSWQsIHNpZGUpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbW92ZWRCcmlja3MgPSBtb3ZlZEJyaWNrSWRzLm1hcCgobW92ZWRCcmlja0lkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50TW92ZWRCcmljayA9IHRoaXMubGF5b3V0V2Fsa2VyLmdldEJyaWNrQnlJZChtb3ZlZEJyaWNrSWQpO1xuXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUJyaWNrKG1vdmVkQnJpY2tJZCk7XG5cbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50TW92ZWRCcmljaztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgYmVmb3JlQnJpY2tQb3NpdGlvbiA9IHRoaXMubGF5b3V0V2Fsa2VyLmdldEJyaWNrUG9zaXRpb24oYmVmb3JlQnJpY2tJZCk7XG5cbiAgICAgICAgbGV0IGNvbHVtbkluZGV4O1xuXG4gICAgICAgIC8vIHRvZG86IG1vdmUgc2lkZSB0byBjb25zdGFudFxuICAgICAgICAvLyB0b2RvOiBzZWFyY2ggYWNyb3NzIHByb2plY3QgZm9yIGFsbCBoYXJkIGNvZGVkIHZhcmlhYmxlc1xuICAgICAgICBpZiAoc2lkZSA9PT0gJ2xlZnQnKSB7XG4gICAgICAgICAgICBjb2x1bW5JbmRleCA9IGJlZm9yZUJyaWNrUG9zaXRpb24uY29sdW1uSW5kZXg7XG4gICAgICAgIH0gZWxzZSBpZiAoc2lkZSA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICAgICAgY29sdW1uSW5kZXggPSBiZWZvcmVCcmlja1Bvc2l0aW9uLmNvbHVtbkluZGV4ICsgMTtcbiAgICAgICAgfVxuXG4gICAgICAgIG1vdmVkQnJpY2tzLmZvckVhY2goKG1vdmVkQnJpY2ssIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEJyaWNrVG9OZXdDb2x1bW4oXG4gICAgICAgICAgICAgICAgICAgIGJlZm9yZUJyaWNrUG9zaXRpb24ucm93SW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbkluZGV4LFxuICAgICAgICAgICAgICAgICAgICBtb3ZlZEJyaWNrXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRCcmlja1RvRXhpc3RpbmdDb2x1bW4oXG4gICAgICAgICAgICAgICAgICAgIGJlZm9yZUJyaWNrUG9zaXRpb24ucm93SW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbkluZGV4LFxuICAgICAgICAgICAgICAgICAgICBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgbW92ZWRCcmlja1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbW92ZUJyaWNrKGJyaWNrSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBjb25zdCBicmlja1Bvc2l0aW9uID0gdGhpcy5sYXlvdXRXYWxrZXIuZ2V0QnJpY2tQb3NpdGlvbihicmlja0lkKTtcblxuICAgICAgICBjb25zdCByb3cgPSB0aGlzLnJvd3NbYnJpY2tQb3NpdGlvbi5yb3dJbmRleF07XG4gICAgICAgIGNvbnN0IGNvbHVtbiA9IHJvdy5jb2x1bW5zW2JyaWNrUG9zaXRpb24uY29sdW1uSW5kZXhdO1xuXG4gICAgICAgIC8vIHJlbW92ZSBicmlja1xuICAgICAgICBjb2x1bW4uYnJpY2tzLnNwbGljZShicmlja1Bvc2l0aW9uLmJyaWNrSW5kZXgsIDEpO1xuXG4gICAgICAgIC8vIHJlbW92ZSBjb2x1bW4gaWYgdGhlcmUgYXJlIG5vIGJyaWNrcyBpbnNpZGVcbiAgICAgICAgaWYgKGNvbHVtbi5icmlja3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByb3cuY29sdW1ucy5zcGxpY2UoYnJpY2tQb3NpdGlvbi5jb2x1bW5JbmRleCwgMSk7XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSByb3cgaWYgdGhlcmUgYXJlIG5vIGNvbHVtbnMgaW5zaWRlXG4gICAgICAgICAgICBpZiAocm93LmNvbHVtbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3dzLnNwbGljZShicmlja1Bvc2l0aW9uLnJvd0luZGV4LCAxKTtcblxuICAgICAgICAgICAgICAgIC8vIGlmIHRoZXJlIGFyZSBubyByb3dzLCBjcmVhdGUgZGVmYXVsdFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJvd3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm93cy5wdXNoKHRoaXMuaW5pdGlhbGl6ZU5ld1Jvdyh0aGlzLmdlbmVyYXRlSWQoKSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIENPTU1BTkRTXG4gICAgcHJpdmF0ZSBhZGRCcmljayhyb3dJbmRleCwgY29sdW1uSW5kZXgsIGJyaWNrSW5kZXgsIGJyaWNrKSB7XG4gICAgICAgIHRoaXMucm93c1tyb3dJbmRleF0uY29sdW1uc1tjb2x1bW5JbmRleF0uYnJpY2tzLnNwbGljZShicmlja0luZGV4LCAwLCBicmljayk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRDb2x1bW4ocm93SW5kZXg6IG51bWJlciwgY29sdW1uSW5kZXg6IG51bWJlcik6IElXYWxsQ29sdW1uIHtcbiAgICAgICAgY29uc3Qgcm93ID0gdGhpcy5yb3dzW3Jvd0luZGV4XTtcblxuICAgICAgICBpZiAocm93KSB7XG4gICAgICAgICAgICByZXR1cm4gcm93LmNvbHVtbnNbY29sdW1uSW5kZXhdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZU5ld1Jvdyhyb3dJbmRleDogbnVtYmVyLCByb3dJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMucm93cy5zcGxpY2Uocm93SW5kZXgsIDAsIHRoaXMuaW5pdGlhbGl6ZU5ld1Jvdyhyb3dJZCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlTmV3Q29sdW1uKHJvd0luZGV4OiBudW1iZXIsIGNvbHVtbkluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yb3dzW3Jvd0luZGV4XS5jb2x1bW5zLnNwbGljZShjb2x1bW5JbmRleCwgMCwgdGhpcy5pbml0aWFsaXplTmV3Q29sdW1uKCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZU5ld1Jvdyhyb3dJZDogc3RyaW5nKTogSVdhbGxSb3cge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6IHJvd0lkLFxuICAgICAgICAgICAgY29sdW1uczogW1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZU5ld0NvbHVtbigpXG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplTmV3Q29sdW1uKCk6IElXYWxsQ29sdW1uIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJyaWNrczogW11cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdlbmVyYXRlSWQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIChuZXcgR3VpZCgpKS5nZXQoKTtcbiAgICB9XG59XG4iXX0=