/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Guid } from '../../../modules/utils/utils';
/*
* Modify layout wall rows
* */
export class WallLayout {
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
        movedBrickIds.forEach((movedBrickId) => {
            /** @type {?} */
            const currentMovedBrick = this.layoutWalker.getBrickById(movedBrickId);
            this.removeBrick(movedBrickId);
            /** @type {?} */
            const afterBrickPosition = this.layoutWalker.getBrickPosition(afterBrickId);
            /** @type {?} */
            const newRowIndex = afterBrickPosition.rowIndex + 1;
            this.addBrickToNewRow(newRowIndex, currentMovedBrick);
        });
    }
    /**
     * @param {?} afterBrickId
     * @param {?} movedBrickIds
     * @return {?}
     */
    moveBrickAfterInSameColumn(afterBrickId, movedBrickIds) {
        movedBrickIds.forEach((movedBrickId, index) => {
            /** @type {?} */
            const currentMovedBrick = this.layoutWalker.getBrickById(movedBrickId);
            this.removeBrick(movedBrickId);
            /** @type {?} */
            const afterBrickPosition = this.layoutWalker.getBrickPosition(afterBrickId);
            this.addBrickToExistingColumn(afterBrickPosition.rowIndex, afterBrickPosition.columnIndex, afterBrickPosition.brickIndex + index + 1, currentMovedBrick);
        });
    }
    /**
     * @param {?} beforeBrickId
     * @param {?} movedBrickIds
     * @return {?}
     */
    moveBrickBeforeInNewRow(beforeBrickId, movedBrickIds) {
        movedBrickIds.reverse();
        movedBrickIds.forEach((movedBrickId, index) => {
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
        });
    }
    /**
     * @param {?} beforeBrickId
     * @param {?} movedBrickIds
     * @return {?}
     */
    moveBrickBeforeInSameColumn(beforeBrickId, movedBrickIds) {
        movedBrickIds.forEach((movedBrickId) => {
            /** @type {?} */
            const currentMovedBrick = this.layoutWalker.getBrickById(movedBrickId);
            this.removeBrick(movedBrickId);
            /** @type {?} */
            const beforeBrickPosition = this.layoutWalker.getBrickPosition(beforeBrickId);
            this.addBrickToExistingColumn(beforeBrickPosition.rowIndex, beforeBrickPosition.columnIndex, beforeBrickPosition.brickIndex, currentMovedBrick);
        });
    }
    /**
     * @param {?} movedBrickIds
     * @param {?} beforeBrickId
     * @param {?} side
     * @return {?}
     */
    moveBrickToNewColumn(movedBrickIds, beforeBrickId, side) {
        /** @type {?} */
        const movedBricks = movedBrickIds.map((movedBrickId) => {
            /** @type {?} */
            const currentMovedBrick = this.layoutWalker.getBrickById(movedBrickId);
            this.removeBrick(movedBrickId);
            return currentMovedBrick;
        });
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
        movedBricks.forEach((movedBrick, index) => {
            if (index === 0) {
                this.addBrickToNewColumn(beforeBrickPosition.rowIndex, columnIndex, movedBrick);
            }
            else {
                this.addBrickToExistingColumn(beforeBrickPosition.rowIndex, columnIndex, index, movedBrick);
            }
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbC1sYXlvdXQubW9kZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi93YWxsL3BsdWdpbnMvY29yZS93YWxsLWxheW91dC5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLElBQUksRUFBQyxNQUFNLDhCQUE4QixDQUFDOzs7O0FBVWxELE1BQU0sT0FBTyxVQUFVOzs7OztJQUduQixZQUFvQixhQUE0QixFQUFVLFlBQTBCO1FBQWhFLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWM7UUFGcEYsU0FBSSxHQUFlLEVBQUUsQ0FBQztJQUd0QixDQUFDOzs7Ozs7OztJQUdELGdCQUFnQixDQUFDLFFBQWdCLEVBQUUsS0FBZ0IsRUFBRSxLQUFjOztjQUN6RCxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNOztjQUNoQyxZQUFZLEdBQUcsYUFBYSxHQUFHLENBQUM7UUFFdEMsa0VBQWtFO1FBQ2xFLDREQUE0RDtRQUM1RCxJQUFJLFFBQVEsR0FBRyxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsRUFBRTtZQUMvQixRQUFRLEdBQUcsWUFBWSxHQUFHLENBQUMsQ0FBQztTQUMvQjtRQUVELElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEtBQUssSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUV4RCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUM7Ozs7Ozs7OztJQUdELHdCQUF3QixDQUFDLFFBQWdCLEVBQUUsV0FBbUIsRUFBRSxVQUFrQixFQUFFLEtBQWdCOztjQUMxRixNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDO1FBRXBELElBQUksTUFBTSxFQUFFOztrQkFDRixXQUFX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RU8sZUFBZSxDQUFDLFFBQWdCLEVBQUUsV0FBbUI7UUFDekQsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQztJQUNuRixDQUFDOzs7Ozs7SUFFTyxnQkFBZ0IsQ0FBQyxLQUFhO1FBQ2xDLE9BQU87WUFDSCxFQUFFLEVBQUUsS0FBSztZQUNULE9BQU8sRUFBRTtnQkFDTCxJQUFJLENBQUMsbUJBQW1CLEVBQUU7YUFDN0I7U0FDSixDQUFDO0lBQ04sQ0FBQzs7Ozs7SUFFTyxtQkFBbUI7UUFDdkIsT0FBTztZQUNILE1BQU0sRUFBRSxFQUFFO1NBQ2IsQ0FBQztJQUNOLENBQUM7Ozs7O0lBRU8sVUFBVTtRQUNkLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDOUIsQ0FBQztDQUNKOzs7SUF0T0csMEJBQXNCOzs7OztJQUVWLG1DQUFvQzs7Ozs7SUFBRSxrQ0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0d1aWR9IGZyb20gJy4uLy4uLy4uL21vZHVsZXMvdXRpbHMvdXRpbHMnO1xuaW1wb3J0IHtCcmlja1JlZ2lzdHJ5fSBmcm9tICcuLi8uLi9yZWdpc3RyeS9wdWJsaWNfYXBpJztcbmltcG9ydCB7V2FsbEJyaWNrfSBmcm9tICcuLi8uLi9tb2RlbC93YWxsLWJyaWNrLm1vZGVsJztcbmltcG9ydCB7SVdhbGxDb2x1bW59IGZyb20gJy4uLy4uL21vZGVsL2ludGVyZmFjZXMvd2FsbC1jb2x1bW4uaW50ZXJmYWNlJztcbmltcG9ydCB7SVdhbGxSb3d9IGZyb20gJy4uLy4uL21vZGVsL2ludGVyZmFjZXMvd2FsbC1yb3cuaW50ZXJmYWNlJztcbmltcG9ydCB7TGF5b3V0V2Fsa2VyfSBmcm9tICcuL2xheW91dC13YWxrZXIuY2xhc3MnO1xuXG4vKlxuKiBNb2RpZnkgbGF5b3V0IHdhbGwgcm93c1xuKiAqL1xuZXhwb3J0IGNsYXNzIFdhbGxMYXlvdXQge1xuICAgIHJvd3M6IElXYWxsUm93W10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYnJpY2tSZWdpc3RyeTogQnJpY2tSZWdpc3RyeSwgcHJpdmF0ZSBsYXlvdXRXYWxrZXI6IExheW91dFdhbGtlcikge1xuICAgIH1cblxuICAgIC8vIGNyZWF0ZSBuZXcgcm93IGFuZCBvbmUgY29sdW1uIGluc2lkZVxuICAgIGFkZEJyaWNrVG9OZXdSb3cocm93SW5kZXg6IG51bWJlciwgYnJpY2s6IFdhbGxCcmljaywgcm93SWQ/OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgdG90YWxSb3dDb3VudCA9IHRoaXMucm93cy5sZW5ndGg7XG4gICAgICAgIGNvbnN0IGxhc3RSb3dJbmRleCA9IHRvdGFsUm93Q291bnQgLSAxO1xuXG4gICAgICAgIC8vIHVzZXIgY2Fubm90IGNyZWF0ZSByb3cgaW4gcG9zaXRpb24gbW9yZSB0aGFuIGxhc3Qgcm93IGluZGV4ICsgMVxuICAgICAgICAvLyB0b2RvOiByZW1vdmUgaGVscGVyIGNoZWNrcywgbGV0cyBmYWNlIHRoZSBwcm9ibGVtIGVhcmxpZXJcbiAgICAgICAgaWYgKHJvd0luZGV4ID4gKGxhc3RSb3dJbmRleCArIDEpKSB7XG4gICAgICAgICAgICByb3dJbmRleCA9IGxhc3RSb3dJbmRleCArIDE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNyZWF0ZU5ld1Jvdyhyb3dJbmRleCwgcm93SWQgfHwgdGhpcy5nZW5lcmF0ZUlkKCkpO1xuXG4gICAgICAgIHRoaXMuYWRkQnJpY2socm93SW5kZXgsIDAsIDAsIGJyaWNrKTtcbiAgICB9XG5cbiAgICAvLyBhZGQgb25seSBpbiBhbHJlYWR5IGV4aXN0aW5nIHJvdyBhbmQgY29sdW1uXG4gICAgYWRkQnJpY2tUb0V4aXN0aW5nQ29sdW1uKHJvd0luZGV4OiBudW1iZXIsIGNvbHVtbkluZGV4OiBudW1iZXIsIGJyaWNrSW5kZXg6IG51bWJlciwgYnJpY2s6IFdhbGxCcmljaykge1xuICAgICAgICBjb25zdCBjb2x1bW4gPSB0aGlzLmdldENvbHVtbihyb3dJbmRleCwgY29sdW1uSW5kZXgpO1xuXG4gICAgICAgIGlmIChjb2x1bW4pIHtcbiAgICAgICAgICAgIGNvbnN0IGJyaWNrc0NvdW50ID0gY29sdW1uLmJyaWNrcy5sZW5ndGg7XG5cbiAgICAgICAgICAgIC8vIHVzZXIgY2Fubm90IHB1dCBicmljayBpbiBwb3NpdGlvbiBtb3JlIHRoYW4gdG90YWwgYnJpY2sgY291bnQgKyAxXG4gICAgICAgICAgICAvLyB0b2RvOiByZW1vdmUgaGVscGVyIGNoZWNrcywgbGV0cyBmYWNlIHRoZSBwcm9ibGVtIGVhcmxpZXJcbiAgICAgICAgICAgIGlmIChicmlja0luZGV4ID4gKGJyaWNrc0NvdW50ICsgMSkpIHtcbiAgICAgICAgICAgICAgICBicmlja0luZGV4ID0gYnJpY2tzQ291bnQgKyAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmFkZEJyaWNrKHJvd0luZGV4LCBjb2x1bW5JbmRleCwgYnJpY2tJbmRleCwgYnJpY2spO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIG5ldyBjb2x1bW4gaW4gZXhpc3Rpbmcgcm93XG4gICAgYWRkQnJpY2tUb05ld0NvbHVtbihyb3dJbmRleCwgY29sdW1uSW5kZXgsIGJyaWNrOiBXYWxsQnJpY2spIHtcbiAgICAgICAgY29uc3Qgcm93ID0gdGhpcy5yb3dzW3Jvd0luZGV4XTtcblxuICAgICAgICBpZiAocm93KSB7XG4gICAgICAgICAgICBjb25zdCBjb2x1bW5Db3VudCA9IHJvdy5jb2x1bW5zLmxlbmd0aDtcblxuICAgICAgICAgICAgLy8gdXNlciBjYW5ub3QgY3JlYXRlIGNvbHVtbiBpbiBwb3NpdGlvbiBtb3JlIHRoYW4gdG90YWwgY29sdW1uIGNvdW5kICsgMVxuICAgICAgICAgICAgLy8gdG9kbzogcmVtb3ZlIGhlbHBlciBjaGVja3MsIGxldHMgZmFjZSB0aGUgcHJvYmxlbSBlYXJsaWVyXG4gICAgICAgICAgICBpZiAoY29sdW1uSW5kZXggPiAoY29sdW1uQ291bnQgKyAxKSkge1xuICAgICAgICAgICAgICAgIGNvbHVtbkluZGV4ID0gY29sdW1uQ291bnQgKyAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU5ld0NvbHVtbihyb3dJbmRleCwgY29sdW1uSW5kZXgpO1xuXG4gICAgICAgICAgICB0aGlzLmFkZEJyaWNrKHJvd0luZGV4LCBjb2x1bW5JbmRleCwgMCwgYnJpY2spO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZUJyaWNrQWZ0ZXJJbk5ld1JvdyhhZnRlckJyaWNrSWQ6IHN0cmluZywgbW92ZWRCcmlja0lkczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICAgICAgbW92ZWRCcmlja0lkcy5yZXZlcnNlKCk7XG5cbiAgICAgICAgbW92ZWRCcmlja0lkcy5mb3JFYWNoKChtb3ZlZEJyaWNrSWQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRNb3ZlZEJyaWNrID0gdGhpcy5sYXlvdXRXYWxrZXIuZ2V0QnJpY2tCeUlkKG1vdmVkQnJpY2tJZCk7XG5cbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQnJpY2sobW92ZWRCcmlja0lkKTtcblxuICAgICAgICAgICAgY29uc3QgYWZ0ZXJCcmlja1Bvc2l0aW9uID0gdGhpcy5sYXlvdXRXYWxrZXIuZ2V0QnJpY2tQb3NpdGlvbihhZnRlckJyaWNrSWQpO1xuXG4gICAgICAgICAgICBjb25zdCBuZXdSb3dJbmRleCA9IGFmdGVyQnJpY2tQb3NpdGlvbi5yb3dJbmRleCArIDE7XG5cbiAgICAgICAgICAgIHRoaXMuYWRkQnJpY2tUb05ld1JvdyhuZXdSb3dJbmRleCwgY3VycmVudE1vdmVkQnJpY2spO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtb3ZlQnJpY2tBZnRlckluU2FtZUNvbHVtbihhZnRlckJyaWNrSWQ6IHN0cmluZywgbW92ZWRCcmlja0lkczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICAgICAgbW92ZWRCcmlja0lkcy5mb3JFYWNoKChtb3ZlZEJyaWNrSWQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50TW92ZWRCcmljayA9IHRoaXMubGF5b3V0V2Fsa2VyLmdldEJyaWNrQnlJZChtb3ZlZEJyaWNrSWQpO1xuXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUJyaWNrKG1vdmVkQnJpY2tJZCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGFmdGVyQnJpY2tQb3NpdGlvbiA9IHRoaXMubGF5b3V0V2Fsa2VyLmdldEJyaWNrUG9zaXRpb24oYWZ0ZXJCcmlja0lkKTtcblxuICAgICAgICAgICAgdGhpcy5hZGRCcmlja1RvRXhpc3RpbmdDb2x1bW4oXG4gICAgICAgICAgICAgICAgYWZ0ZXJCcmlja1Bvc2l0aW9uLnJvd0luZGV4LFxuICAgICAgICAgICAgICAgIGFmdGVyQnJpY2tQb3NpdGlvbi5jb2x1bW5JbmRleCxcbiAgICAgICAgICAgICAgICBhZnRlckJyaWNrUG9zaXRpb24uYnJpY2tJbmRleCArIGluZGV4ICsgMSxcbiAgICAgICAgICAgICAgICBjdXJyZW50TW92ZWRCcmljayk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG1vdmVCcmlja0JlZm9yZUluTmV3Um93KGJlZm9yZUJyaWNrSWQ6IHN0cmluZywgbW92ZWRCcmlja0lkczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICAgICAgbW92ZWRCcmlja0lkcy5yZXZlcnNlKCk7XG5cbiAgICAgICAgbW92ZWRCcmlja0lkcy5mb3JFYWNoKChtb3ZlZEJyaWNrSWQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50TW92ZWRCcmljayA9IHRoaXMubGF5b3V0V2Fsa2VyLmdldEJyaWNrQnlJZChtb3ZlZEJyaWNrSWQpO1xuXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUJyaWNrKG1vdmVkQnJpY2tJZCk7XG5cbiAgICAgICAgICAgIGxldCBiZWZvcmVCcmlja1Bvc2l0aW9uO1xuXG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICBiZWZvcmVCcmlja1Bvc2l0aW9uID0gdGhpcy5sYXlvdXRXYWxrZXIuZ2V0QnJpY2tQb3NpdGlvbihiZWZvcmVCcmlja0lkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYmVmb3JlQnJpY2tQb3NpdGlvbiA9IHRoaXMubGF5b3V0V2Fsa2VyLmdldEJyaWNrUG9zaXRpb24obW92ZWRCcmlja0lkc1tpbmRleCAtIDFdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5hZGRCcmlja1RvTmV3Um93KGJlZm9yZUJyaWNrUG9zaXRpb24ucm93SW5kZXgsIGN1cnJlbnRNb3ZlZEJyaWNrKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbW92ZUJyaWNrQmVmb3JlSW5TYW1lQ29sdW1uKGJlZm9yZUJyaWNrSWQ6IHN0cmluZywgbW92ZWRCcmlja0lkczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICAgICAgbW92ZWRCcmlja0lkcy5mb3JFYWNoKChtb3ZlZEJyaWNrSWQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRNb3ZlZEJyaWNrID0gdGhpcy5sYXlvdXRXYWxrZXIuZ2V0QnJpY2tCeUlkKG1vdmVkQnJpY2tJZCk7XG5cbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQnJpY2sobW92ZWRCcmlja0lkKTtcblxuICAgICAgICAgICAgY29uc3QgYmVmb3JlQnJpY2tQb3NpdGlvbiA9IHRoaXMubGF5b3V0V2Fsa2VyLmdldEJyaWNrUG9zaXRpb24oYmVmb3JlQnJpY2tJZCk7XG5cbiAgICAgICAgICAgIHRoaXMuYWRkQnJpY2tUb0V4aXN0aW5nQ29sdW1uKFxuICAgICAgICAgICAgICAgIGJlZm9yZUJyaWNrUG9zaXRpb24ucm93SW5kZXgsXG4gICAgICAgICAgICAgICAgYmVmb3JlQnJpY2tQb3NpdGlvbi5jb2x1bW5JbmRleCxcbiAgICAgICAgICAgICAgICBiZWZvcmVCcmlja1Bvc2l0aW9uLmJyaWNrSW5kZXgsXG4gICAgICAgICAgICAgICAgY3VycmVudE1vdmVkQnJpY2spO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtb3ZlQnJpY2tUb05ld0NvbHVtbihtb3ZlZEJyaWNrSWRzLCBiZWZvcmVCcmlja0lkLCBzaWRlKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG1vdmVkQnJpY2tzID0gbW92ZWRCcmlja0lkcy5tYXAoKG1vdmVkQnJpY2tJZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudE1vdmVkQnJpY2sgPSB0aGlzLmxheW91dFdhbGtlci5nZXRCcmlja0J5SWQobW92ZWRCcmlja0lkKTtcblxuICAgICAgICAgICAgdGhpcy5yZW1vdmVCcmljayhtb3ZlZEJyaWNrSWQpO1xuXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudE1vdmVkQnJpY2s7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGJlZm9yZUJyaWNrUG9zaXRpb24gPSB0aGlzLmxheW91dFdhbGtlci5nZXRCcmlja1Bvc2l0aW9uKGJlZm9yZUJyaWNrSWQpO1xuXG4gICAgICAgIGxldCBjb2x1bW5JbmRleDtcblxuICAgICAgICAvLyB0b2RvOiBtb3ZlIHNpZGUgdG8gY29uc3RhbnRcbiAgICAgICAgLy8gdG9kbzogc2VhcmNoIGFjcm9zcyBwcm9qZWN0IGZvciBhbGwgaGFyZCBjb2RlZCB2YXJpYWJsZXNcbiAgICAgICAgaWYgKHNpZGUgPT09ICdsZWZ0Jykge1xuICAgICAgICAgICAgY29sdW1uSW5kZXggPSBiZWZvcmVCcmlja1Bvc2l0aW9uLmNvbHVtbkluZGV4O1xuICAgICAgICB9IGVsc2UgaWYgKHNpZGUgPT09ICdyaWdodCcpIHtcbiAgICAgICAgICAgIGNvbHVtbkluZGV4ID0gYmVmb3JlQnJpY2tQb3NpdGlvbi5jb2x1bW5JbmRleCArIDE7XG4gICAgICAgIH1cblxuICAgICAgICBtb3ZlZEJyaWNrcy5mb3JFYWNoKChtb3ZlZEJyaWNrLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRCcmlja1RvTmV3Q29sdW1uKFxuICAgICAgICAgICAgICAgICAgICBiZWZvcmVCcmlja1Bvc2l0aW9uLnJvd0luZGV4LFxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5JbmRleCxcbiAgICAgICAgICAgICAgICAgICAgbW92ZWRCcmlja1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkQnJpY2tUb0V4aXN0aW5nQ29sdW1uKFxuICAgICAgICAgICAgICAgICAgICBiZWZvcmVCcmlja1Bvc2l0aW9uLnJvd0luZGV4LFxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5JbmRleCxcbiAgICAgICAgICAgICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIG1vdmVkQnJpY2tcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW1vdmVCcmljayhicmlja0lkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgYnJpY2tQb3NpdGlvbiA9IHRoaXMubGF5b3V0V2Fsa2VyLmdldEJyaWNrUG9zaXRpb24oYnJpY2tJZCk7XG5cbiAgICAgICAgY29uc3Qgcm93ID0gdGhpcy5yb3dzW2JyaWNrUG9zaXRpb24ucm93SW5kZXhdO1xuICAgICAgICBjb25zdCBjb2x1bW4gPSByb3cuY29sdW1uc1ticmlja1Bvc2l0aW9uLmNvbHVtbkluZGV4XTtcblxuICAgICAgICAvLyByZW1vdmUgYnJpY2tcbiAgICAgICAgY29sdW1uLmJyaWNrcy5zcGxpY2UoYnJpY2tQb3NpdGlvbi5icmlja0luZGV4LCAxKTtcblxuICAgICAgICAvLyByZW1vdmUgY29sdW1uIGlmIHRoZXJlIGFyZSBubyBicmlja3MgaW5zaWRlXG4gICAgICAgIGlmIChjb2x1bW4uYnJpY2tzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcm93LmNvbHVtbnMuc3BsaWNlKGJyaWNrUG9zaXRpb24uY29sdW1uSW5kZXgsIDEpO1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgcm93IGlmIHRoZXJlIGFyZSBubyBjb2x1bW5zIGluc2lkZVxuICAgICAgICAgICAgaWYgKHJvdy5jb2x1bW5zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMucm93cy5zcGxpY2UoYnJpY2tQb3NpdGlvbi5yb3dJbmRleCwgMSk7XG5cbiAgICAgICAgICAgICAgICAvLyBpZiB0aGVyZSBhcmUgbm8gcm93cywgY3JlYXRlIGRlZmF1bHRcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yb3dzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvd3MucHVzaCh0aGlzLmluaXRpYWxpemVOZXdSb3codGhpcy5nZW5lcmF0ZUlkKCkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDT01NQU5EU1xuICAgIHByaXZhdGUgYWRkQnJpY2socm93SW5kZXgsIGNvbHVtbkluZGV4LCBicmlja0luZGV4LCBicmljaykge1xuICAgICAgICB0aGlzLnJvd3Nbcm93SW5kZXhdLmNvbHVtbnNbY29sdW1uSW5kZXhdLmJyaWNrcy5zcGxpY2UoYnJpY2tJbmRleCwgMCwgYnJpY2spO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Q29sdW1uKHJvd0luZGV4OiBudW1iZXIsIGNvbHVtbkluZGV4OiBudW1iZXIpOiBJV2FsbENvbHVtbiB7XG4gICAgICAgIGNvbnN0IHJvdyA9IHRoaXMucm93c1tyb3dJbmRleF07XG5cbiAgICAgICAgaWYgKHJvdykge1xuICAgICAgICAgICAgcmV0dXJuIHJvdy5jb2x1bW5zW2NvbHVtbkluZGV4XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVOZXdSb3cocm93SW5kZXg6IG51bWJlciwgcm93SWQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnJvd3Muc3BsaWNlKHJvd0luZGV4LCAwLCB0aGlzLmluaXRpYWxpemVOZXdSb3cocm93SWQpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZU5ld0NvbHVtbihyb3dJbmRleDogbnVtYmVyLCBjb2x1bW5JbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMucm93c1tyb3dJbmRleF0uY29sdW1ucy5zcGxpY2UoY29sdW1uSW5kZXgsIDAsIHRoaXMuaW5pdGlhbGl6ZU5ld0NvbHVtbigpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRpYWxpemVOZXdSb3cocm93SWQ6IHN0cmluZyk6IElXYWxsUm93IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkOiByb3dJZCxcbiAgICAgICAgICAgIGNvbHVtbnM6IFtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxpemVOZXdDb2x1bW4oKVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZU5ld0NvbHVtbigpOiBJV2FsbENvbHVtbiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBicmlja3M6IFtdXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZUlkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAobmV3IEd1aWQoKSkuZ2V0KCk7XG4gICAgfVxufVxuIl19