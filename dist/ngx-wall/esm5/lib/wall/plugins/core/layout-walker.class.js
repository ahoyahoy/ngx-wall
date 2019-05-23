/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
* Execute queries commands over rows
* */
var /*
* Execute queries commands over rows
* */
LayoutWalker = /** @class */ (function () {
    function LayoutWalker(brickRegistry) {
        this.brickRegistry = brickRegistry;
        this.rows = [];
    }
    // public API
    // public API
    /**
     * @return {?}
     */
    LayoutWalker.prototype.getRowCount = 
    // public API
    /**
     * @return {?}
     */
    function () {
        return this.rows.length;
    };
    /**
     * @param {?} firstBrickId
     * @param {?} secondBrickId
     * @return {?}
     */
    LayoutWalker.prototype.isBrickAheadOf = /**
     * @param {?} firstBrickId
     * @param {?} secondBrickId
     * @return {?}
     */
    function (firstBrickId, secondBrickId) {
        /** @type {?} */
        var brickIdsSequence = this.getBrickSequence(function () { return true; }).map(function (brick) { return brick.id; });
        return brickIdsSequence.indexOf(firstBrickId) < brickIdsSequence.indexOf(secondBrickId);
    };
    /**
     * @param {?} brickId
     * @return {?}
     */
    LayoutWalker.prototype.getBrickTag = /**
     * @param {?} brickId
     * @return {?}
     */
    function (brickId) {
        return this.getBrickById(brickId).tag;
    };
    /**
     * @param {?} brickId
     * @return {?}
     */
    LayoutWalker.prototype.getBrickById = /**
     * @param {?} brickId
     * @return {?}
     */
    function (brickId) {
        return this.getBrickSequence(function (brick) {
            return brick.id === brickId;
        })[0];
    };
    /**
     * @return {?}
     */
    LayoutWalker.prototype.getBrickIds = /**
     * @return {?}
     */
    function () {
        return this.getBrickSequence(function () { return true; }).map(function (brick) { return brick.id; });
    };
    /**
     * @param {?} predictor
     * @return {?}
     */
    LayoutWalker.prototype.filterBricks = /**
     * @param {?} predictor
     * @return {?}
     */
    function (predictor) {
        return this.getBrickSequence(function (wallBrick) {
            return predictor(wallBrick.getSnapshot());
        });
    };
    /**
     * @param {?} brickId
     * @return {?}
     */
    LayoutWalker.prototype.getBrickPosition = /**
     * @param {?} brickId
     * @return {?}
     */
    function (brickId) {
        /** @type {?} */
        var brickPosition = {
            rowIndex: null,
            columnIndex: null,
            brickIndex: null
        };
        /** @type {?} */
        var i = 0;
        while (brickPosition.rowIndex === null && i < this.rows.length) {
            this.rows[i].columns.forEach(function (column, columnIndex) {
                /** @type {?} */
                var brickIndex = null;
                column.bricks.forEach(function (brick, index) {
                    if (brick.id === brickId) {
                        brickIndex = index;
                    }
                });
                if (brickIndex || brickIndex === 0) {
                    brickPosition.rowIndex = i;
                    brickPosition.columnIndex = columnIndex;
                    brickPosition.brickIndex = brickIndex;
                }
            });
            i++;
        }
        return brickPosition;
    };
    /**
     * @param {?} rowIndex
     * @return {?}
     */
    LayoutWalker.prototype.getColumnCount = /**
     * @param {?} rowIndex
     * @return {?}
     */
    function (rowIndex) {
        return this.rows[rowIndex].columns.length;
    };
    /**
     * @return {?}
     */
    LayoutWalker.prototype.getBricksCount = /**
     * @return {?}
     */
    function () {
        return this.getBrickSequence(function () { return true; }).length;
    };
    /**
     * @param {?} brickId
     * @return {?}
     */
    LayoutWalker.prototype.getNextBrick = /**
     * @param {?} brickId
     * @return {?}
     */
    function (brickId) {
        /** @type {?} */
        var bricksSequence = this.getBrickSequence(function () { return true; });
        /** @type {?} */
        var brickIndex = bricksSequence.findIndex(function (brick) {
            return brick.id === brickId;
        });
        return bricksSequence[brickIndex + 1];
    };
    /**
     * @param {?} brickId
     * @return {?}
     */
    LayoutWalker.prototype.getNextBrickId = /**
     * @param {?} brickId
     * @return {?}
     */
    function (brickId) {
        /** @type {?} */
        var nextBrick = this.getNextBrick(brickId);
        return nextBrick && nextBrick.id;
    };
    /**
     * @param {?} brickId
     * @return {?}
     */
    LayoutWalker.prototype.getPreviousBrick = /**
     * @param {?} brickId
     * @return {?}
     */
    function (brickId) {
        /** @type {?} */
        var bricksSequence = this.getBrickSequence(function () { return true; });
        /** @type {?} */
        var brickIndex = bricksSequence.findIndex(function (brick) {
            return brick.id === brickId;
        });
        return bricksSequence[brickIndex - 1];
    };
    /**
     * @param {?} brickId
     * @return {?}
     */
    LayoutWalker.prototype.getPreviousBrickId = /**
     * @param {?} brickId
     * @return {?}
     */
    function (brickId) {
        /** @type {?} */
        var previousBrick = this.getPreviousBrick(brickId);
        return previousBrick && previousBrick.id;
    };
    /**
     * @param {?} predicate
     * @return {?}
     */
    LayoutWalker.prototype.getBrickSequence = /**
     * @param {?} predicate
     * @return {?}
     */
    function (predicate) {
        /** @type {?} */
        var brickSequence = [];
        this.traverse(function (row) {
            row.columns.forEach(function (column) {
                column.bricks.forEach(function (brick) {
                    if (predicate(brick)) {
                        brickSequence.push(brick);
                    }
                });
            });
        });
        return brickSequence;
    };
    /**
     * @param {?} brickId
     * @return {?}
     */
    LayoutWalker.prototype.getNextTextBrickId = /**
     * @param {?} brickId
     * @return {?}
     */
    function (brickId) {
        /** @type {?} */
        var nextTextBrick = this.getNextTextBrick(brickId);
        return nextTextBrick && nextTextBrick.id;
    };
    /**
     * @param {?} brickId
     * @return {?}
     */
    LayoutWalker.prototype.getPreviousTextBrickId = /**
     * @param {?} brickId
     * @return {?}
     */
    function (brickId) {
        /** @type {?} */
        var previousTextBrick = this.getPreviousTextBrick(brickId);
        return previousTextBrick && previousTextBrick.id;
    };
    // end public API
    // end public API
    /**
     * @param {?} brickId
     * @return {?}
     */
    LayoutWalker.prototype.getNextTextBrick = 
    // end public API
    /**
     * @param {?} brickId
     * @return {?}
     */
    function (brickId) {
        var _this = this;
        /** @type {?} */
        var nextTextBricks = this.findBricksAfter(brickId, function (currentBrick) {
            return _this.brickRegistry.get(currentBrick.tag).supportText;
        });
        return nextTextBricks[0];
    };
    /**
     * @param {?} brickId
     * @return {?}
     */
    LayoutWalker.prototype.getPreviousTextBrick = /**
     * @param {?} brickId
     * @return {?}
     */
    function (brickId) {
        var _this = this;
        /** @type {?} */
        var previousTextBricks = this.findBrickBefore(brickId, function (currentBrick) {
            return _this.brickRegistry.get(currentBrick.tag).supportText;
        });
        return previousTextBricks[previousTextBricks.length - 1];
    };
    /**
     * @param {?} brickId
     * @param {?} predicate
     * @return {?}
     */
    LayoutWalker.prototype.findBricksAfter = /**
     * @param {?} brickId
     * @param {?} predicate
     * @return {?}
     */
    function (brickId, predicate) {
        /** @type {?} */
        var bricks = [];
        /** @type {?} */
        var bricksSequence = this.getBrickSequence(function () { return true; });
        /** @type {?} */
        var brickIdsSequence = bricksSequence.map(function (brick) { return brick.id; });
        /** @type {?} */
        var currentBrickIdIndex = brickIdsSequence.indexOf(brickId);
        if (currentBrickIdIndex !== -1) {
            /** @type {?} */
            var brickIdsAfter = brickIdsSequence.splice(currentBrickIdIndex + 1);
            brickIdsAfter.forEach(function (brickIdAfter) {
                /** @type {?} */
                var currentBrick = bricksSequence.find(function (brick) {
                    return brick.id === brickIdAfter;
                });
                if (predicate(currentBrick)) {
                    bricks.push(currentBrick);
                }
            });
        }
        return bricks;
    };
    /**
     * @param {?} brickId
     * @param {?} predicate
     * @return {?}
     */
    LayoutWalker.prototype.findBrickBefore = /**
     * @param {?} brickId
     * @param {?} predicate
     * @return {?}
     */
    function (brickId, predicate) {
        /** @type {?} */
        var bricks = [];
        /** @type {?} */
        var bricksSequence = this.getBrickSequence(function () { return true; });
        /** @type {?} */
        var brickIdsSequence = bricksSequence.map(function (brick) { return brick.id; });
        /** @type {?} */
        var currentBrickIdIndex = brickIdsSequence.indexOf(brickId);
        if (currentBrickIdIndex !== -1) {
            /** @type {?} */
            var brickIdsBefore = brickIdsSequence.splice(0, currentBrickIdIndex);
            brickIdsBefore.forEach(function (brickIdBefore) {
                /** @type {?} */
                var currentBrick = bricksSequence.find(function (brick) { return brick.id === brickIdBefore; });
                if (predicate(currentBrick)) {
                    bricks.push(currentBrick);
                }
            });
        }
        return bricks;
    };
    /**
     * @param {?} rows
     * @return {?}
     */
    LayoutWalker.prototype.setLayout = /**
     * @param {?} rows
     * @return {?}
     */
    function (rows) {
        this.rows = rows;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    LayoutWalker.prototype.traverse = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.rows.forEach(function (row) {
            fn(row);
        });
    };
    return LayoutWalker;
}());
/*
* Execute queries commands over rows
* */
export { LayoutWalker };
if (false) {
    /** @type {?} */
    LayoutWalker.prototype.rows;
    /**
     * @type {?}
     * @private
     */
    LayoutWalker.prototype.brickRegistry;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LXdhbGtlci5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL3dhbGwvcGx1Z2lucy9jb3JlL2xheW91dC13YWxrZXIuY2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQVFBOzs7O0lBR0ksc0JBQW9CLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBRmhELFNBQUksR0FBZSxFQUFFLENBQUM7SUFHdEIsQ0FBQztJQUVELGFBQWE7Ozs7O0lBRWIsa0NBQVc7Ozs7O0lBQVg7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQzVCLENBQUM7Ozs7OztJQUVELHFDQUFjOzs7OztJQUFkLFVBQWUsWUFBb0IsRUFBRSxhQUFxQjs7WUFDaEQsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQU0sT0FBQSxJQUFJLEVBQUosQ0FBSSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSyxDQUFDLEVBQUUsRUFBUixDQUFRLENBQUM7UUFFbkYsT0FBTyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzVGLENBQUM7Ozs7O0lBRUQsa0NBQVc7Ozs7SUFBWCxVQUFZLE9BQWU7UUFDdkIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUMxQyxDQUFDOzs7OztJQUVELG1DQUFZOzs7O0lBQVosVUFBYSxPQUFlO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQUMsS0FBZ0I7WUFDMUMsT0FBTyxLQUFLLENBQUMsRUFBRSxLQUFLLE9BQU8sQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNWLENBQUM7Ozs7SUFFRCxrQ0FBVzs7O0lB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TyxNQUFNLENBQUM7SUFDbEIsQ0FBQzs7Ozs7SUFFRCxnQ0FBUzs7OztJQUFULFVBQVUsSUFBZ0I7UUFDdEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQzs7Ozs7SUFFRCwrQkFBUTs7OztJQUFSLFVBQVMsRUFBMkI7UUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFHO1lBQ2xCLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNaLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNMLG1CQUFDO0FBQUQsQ0FBQyxBQXZORCxJQXVOQzs7Ozs7OztJQXRORyw0QkFBc0I7Ozs7O0lBRVYscUNBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtCcmlja1JlZ2lzdHJ5fSBmcm9tICcuLi8uLi9yZWdpc3RyeS9icmljay1yZWdpc3RyeS5zZXJ2aWNlJztcbmltcG9ydCB7V2FsbEJyaWNrfSBmcm9tICcuLi8uLi9tb2RlbC93YWxsLWJyaWNrLm1vZGVsJztcbmltcG9ydCB7SVdhbGxSb3d9IGZyb20gJy4uLy4uL21vZGVsL2ludGVyZmFjZXMvd2FsbC1yb3cuaW50ZXJmYWNlJztcbmltcG9ydCB7SUJyaWNrU25hcHNob3R9IGZyb20gJy4uLy4uL21vZGVsL2ludGVyZmFjZXMvYnJpY2stc25hcHNob3QuaW50ZXJmYWNlJztcblxuLypcbiogRXhlY3V0ZSBxdWVyaWVzIGNvbW1hbmRzIG92ZXIgcm93c1xuKiAqL1xuZXhwb3J0IGNsYXNzIExheW91dFdhbGtlciB7XG4gICAgcm93czogSVdhbGxSb3dbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBicmlja1JlZ2lzdHJ5OiBCcmlja1JlZ2lzdHJ5KSB7XG4gICAgfVxuXG4gICAgLy8gcHVibGljIEFQSVxuXG4gICAgZ2V0Um93Q291bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJvd3MubGVuZ3RoO1xuICAgIH1cblxuICAgIGlzQnJpY2tBaGVhZE9mKGZpcnN0QnJpY2tJZDogc3RyaW5nLCBzZWNvbmRCcmlja0lkOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgYnJpY2tJZHNTZXF1ZW5jZSA9IHRoaXMuZ2V0QnJpY2tTZXF1ZW5jZSgoKSA9PiB0cnVlKS5tYXAoKGJyaWNrKSA9PiBicmljay5pZCk7XG5cbiAgICAgICAgcmV0dXJuIGJyaWNrSWRzU2VxdWVuY2UuaW5kZXhPZihmaXJzdEJyaWNrSWQpIDwgYnJpY2tJZHNTZXF1ZW5jZS5pbmRleE9mKHNlY29uZEJyaWNrSWQpO1xuICAgIH1cblxuICAgIGdldEJyaWNrVGFnKGJyaWNrSWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEJyaWNrQnlJZChicmlja0lkKS50YWc7XG4gICAgfVxuXG4gICAgZ2V0QnJpY2tCeUlkKGJyaWNrSWQ6IHN0cmluZyk6IFdhbGxCcmljayB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEJyaWNrU2VxdWVuY2UoKGJyaWNrOiBXYWxsQnJpY2spID0+IHtcbiAgICAgICAgICAgIHJldHVybiBicmljay5pZCA9PT0gYnJpY2tJZDtcbiAgICAgICAgfSlbMF07XG4gICAgfVxuXG4gICAgZ2V0QnJpY2tJZHMoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRCcmlja1NlcXVlbmNlKCgpID0+IHRydWUpLm1hcCgoYnJpY2spID0+IGJyaWNrLmlkKTtcbiAgICB9XG5cbiAgICBmaWx0ZXJCcmlja3MocHJlZGljdG9yOiAoYnJpY2s6IElCcmlja1NuYXBzaG90KSA9PiBib29sZWFuKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEJyaWNrU2VxdWVuY2UoKHdhbGxCcmljaykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHByZWRpY3Rvcih3YWxsQnJpY2suZ2V0U25hcHNob3QoKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldEJyaWNrUG9zaXRpb24oYnJpY2tJZDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGJyaWNrUG9zaXRpb24gPSB7XG4gICAgICAgICAgICByb3dJbmRleDogbnVsbCxcbiAgICAgICAgICAgIGNvbHVtbkluZGV4OiBudWxsLFxuICAgICAgICAgICAgYnJpY2tJbmRleDogbnVsbFxuICAgICAgICB9O1xuXG4gICAgICAgIGxldCBpID0gMDtcblxuICAgICAgICB3aGlsZSAoYnJpY2tQb3NpdGlvbi5yb3dJbmRleCA9PT0gbnVsbCAmJiBpIDwgdGhpcy5yb3dzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5yb3dzW2ldLmNvbHVtbnMuZm9yRWFjaCgoY29sdW1uLCBjb2x1bW5JbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBicmlja0luZGV4ID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIGNvbHVtbi5icmlja3MuZm9yRWFjaCgoYnJpY2ssIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChicmljay5pZCA9PT0gYnJpY2tJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJpY2tJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoYnJpY2tJbmRleCB8fCBicmlja0luZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyaWNrUG9zaXRpb24ucm93SW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICBicmlja1Bvc2l0aW9uLmNvbHVtbkluZGV4ID0gY29sdW1uSW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIGJyaWNrUG9zaXRpb24uYnJpY2tJbmRleCA9IGJyaWNrSW5kZXg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBicmlja1Bvc2l0aW9uO1xuICAgIH1cblxuICAgIGdldENvbHVtbkNvdW50KHJvd0luZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5yb3dzW3Jvd0luZGV4XS5jb2x1bW5zLmxlbmd0aDtcbiAgICB9XG5cbiAgICBnZXRCcmlja3NDb3VudCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRCcmlja1NlcXVlbmNlKCgpID0+IHRydWUpLmxlbmd0aDtcbiAgICB9XG5cbiAgICBnZXROZXh0QnJpY2soYnJpY2tJZDogc3RyaW5nKTogV2FsbEJyaWNrIHtcbiAgICAgICAgY29uc3QgYnJpY2tzU2VxdWVuY2UgPSB0aGlzLmdldEJyaWNrU2VxdWVuY2UoKCkgPT4gdHJ1ZSk7XG5cbiAgICAgICAgY29uc3QgYnJpY2tJbmRleCA9IGJyaWNrc1NlcXVlbmNlLmZpbmRJbmRleCgoYnJpY2spID0+IHtcbiAgICAgICAgICAgIHJldHVybiBicmljay5pZCA9PT0gYnJpY2tJZDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGJyaWNrc1NlcXVlbmNlW2JyaWNrSW5kZXggKyAxXTtcbiAgICB9XG5cbiAgICBnZXROZXh0QnJpY2tJZChicmlja0lkOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBuZXh0QnJpY2sgPSB0aGlzLmdldE5leHRCcmljayhicmlja0lkKTtcblxuICAgICAgICByZXR1cm4gbmV4dEJyaWNrICYmIG5leHRCcmljay5pZDtcbiAgICB9XG5cbiAgICBnZXRQcmV2aW91c0JyaWNrKGJyaWNrSWQ6IHN0cmluZyk6IFdhbGxCcmljayB7XG4gICAgICAgIGNvbnN0IGJyaWNrc1NlcXVlbmNlID0gdGhpcy5nZXRCcmlja1NlcXVlbmNlKCgpID0+IHRydWUpO1xuXG4gICAgICAgIGNvbnN0IGJyaWNrSW5kZXggPSBicmlja3NTZXF1ZW5jZS5maW5kSW5kZXgoKGJyaWNrKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYnJpY2suaWQgPT09IGJyaWNrSWQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBicmlja3NTZXF1ZW5jZVticmlja0luZGV4IC0gMV07XG4gICAgfVxuXG4gICAgZ2V0UHJldmlvdXNCcmlja0lkKGJyaWNrSWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzQnJpY2sgPSB0aGlzLmdldFByZXZpb3VzQnJpY2soYnJpY2tJZCk7XG5cbiAgICAgICAgcmV0dXJuIHByZXZpb3VzQnJpY2sgJiYgcHJldmlvdXNCcmljay5pZDtcbiAgICB9XG5cbiAgICBnZXRCcmlja1NlcXVlbmNlKHByZWRpY2F0ZSk6IFdhbGxCcmlja1tdIHtcbiAgICAgICAgY29uc3QgYnJpY2tTZXF1ZW5jZSA9IFtdO1xuXG4gICAgICAgIHRoaXMudHJhdmVyc2UoKHJvdzogSVdhbGxSb3cpID0+IHtcbiAgICAgICAgICAgIHJvdy5jb2x1bW5zLmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5icmlja3MuZm9yRWFjaCgoYnJpY2spID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZWRpY2F0ZShicmljaykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyaWNrU2VxdWVuY2UucHVzaChicmljayk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gYnJpY2tTZXF1ZW5jZTtcbiAgICB9XG5cbiAgICBnZXROZXh0VGV4dEJyaWNrSWQoYnJpY2tJZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgbmV4dFRleHRCcmljayA9IHRoaXMuZ2V0TmV4dFRleHRCcmljayhicmlja0lkKTtcblxuICAgICAgICByZXR1cm4gbmV4dFRleHRCcmljayAmJiBuZXh0VGV4dEJyaWNrLmlkO1xuICAgIH1cblxuICAgIGdldFByZXZpb3VzVGV4dEJyaWNrSWQoYnJpY2tJZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNUZXh0QnJpY2sgPSB0aGlzLmdldFByZXZpb3VzVGV4dEJyaWNrKGJyaWNrSWQpO1xuXG4gICAgICAgIHJldHVybiBwcmV2aW91c1RleHRCcmljayAmJiBwcmV2aW91c1RleHRCcmljay5pZDtcbiAgICB9XG5cbiAgICAvLyBlbmQgcHVibGljIEFQSVxuXG4gICAgZ2V0TmV4dFRleHRCcmljayhicmlja0lkOiBzdHJpbmcpOiBXYWxsQnJpY2sge1xuICAgICAgICBjb25zdCBuZXh0VGV4dEJyaWNrcyA9IHRoaXMuZmluZEJyaWNrc0FmdGVyKGJyaWNrSWQsIChjdXJyZW50QnJpY2s6IFdhbGxCcmljaykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnJpY2tSZWdpc3RyeS5nZXQoY3VycmVudEJyaWNrLnRhZykuc3VwcG9ydFRleHQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBuZXh0VGV4dEJyaWNrc1swXTtcbiAgICB9XG5cbiAgICBnZXRQcmV2aW91c1RleHRCcmljayhicmlja0lkOiBzdHJpbmcpOiBXYWxsQnJpY2sge1xuICAgICAgICBjb25zdCBwcmV2aW91c1RleHRCcmlja3MgPSB0aGlzLmZpbmRCcmlja0JlZm9yZShicmlja0lkLCAoY3VycmVudEJyaWNrOiBXYWxsQnJpY2spID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJyaWNrUmVnaXN0cnkuZ2V0KGN1cnJlbnRCcmljay50YWcpLnN1cHBvcnRUZXh0O1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcHJldmlvdXNUZXh0QnJpY2tzW3ByZXZpb3VzVGV4dEJyaWNrcy5sZW5ndGggLSAxXTtcbiAgICB9XG5cbiAgICBmaW5kQnJpY2tzQWZ0ZXIoYnJpY2tJZDogc3RyaW5nLCBwcmVkaWNhdGUpOiBXYWxsQnJpY2tbXSB7XG4gICAgICAgIGNvbnN0IGJyaWNrcyA9IFtdO1xuXG4gICAgICAgIGNvbnN0IGJyaWNrc1NlcXVlbmNlID0gdGhpcy5nZXRCcmlja1NlcXVlbmNlKCgpID0+IHRydWUpO1xuXG4gICAgICAgIGNvbnN0IGJyaWNrSWRzU2VxdWVuY2UgPSBicmlja3NTZXF1ZW5jZS5tYXAoKGJyaWNrKSA9PiBicmljay5pZCk7XG5cbiAgICAgICAgY29uc3QgY3VycmVudEJyaWNrSWRJbmRleCA9IGJyaWNrSWRzU2VxdWVuY2UuaW5kZXhPZihicmlja0lkKTtcblxuICAgICAgICBpZiAoY3VycmVudEJyaWNrSWRJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIGNvbnN0IGJyaWNrSWRzQWZ0ZXIgPSBicmlja0lkc1NlcXVlbmNlLnNwbGljZShjdXJyZW50QnJpY2tJZEluZGV4ICsgMSk7XG5cbiAgICAgICAgICAgIGJyaWNrSWRzQWZ0ZXIuZm9yRWFjaCgoYnJpY2tJZEFmdGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudEJyaWNrID0gYnJpY2tzU2VxdWVuY2UuZmluZCgoYnJpY2spID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJyaWNrLmlkID09PSBicmlja0lkQWZ0ZXI7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAocHJlZGljYXRlKGN1cnJlbnRCcmljaykpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJpY2tzLnB1c2goY3VycmVudEJyaWNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBicmlja3M7XG4gICAgfVxuXG4gICAgZmluZEJyaWNrQmVmb3JlKGJyaWNrSWQ6IHN0cmluZywgcHJlZGljYXRlKSB7XG4gICAgICAgIGNvbnN0IGJyaWNrcyA9IFtdO1xuXG4gICAgICAgIGNvbnN0IGJyaWNrc1NlcXVlbmNlID0gdGhpcy5nZXRCcmlja1NlcXVlbmNlKCgpID0+IHRydWUpO1xuXG4gICAgICAgIGNvbnN0IGJyaWNrSWRzU2VxdWVuY2UgPSBicmlja3NTZXF1ZW5jZS5tYXAoKGJyaWNrKSA9PiBicmljay5pZCk7XG5cbiAgICAgICAgY29uc3QgY3VycmVudEJyaWNrSWRJbmRleCA9IGJyaWNrSWRzU2VxdWVuY2UuaW5kZXhPZihicmlja0lkKTtcblxuICAgICAgICBpZiAoY3VycmVudEJyaWNrSWRJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIGNvbnN0IGJyaWNrSWRzQmVmb3JlID0gYnJpY2tJZHNTZXF1ZW5jZS5zcGxpY2UoMCwgY3VycmVudEJyaWNrSWRJbmRleCk7XG5cbiAgICAgICAgICAgIGJyaWNrSWRzQmVmb3JlLmZvckVhY2goKGJyaWNrSWRCZWZvcmUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50QnJpY2sgPSBicmlja3NTZXF1ZW5jZS5maW5kKChicmljaykgPT4gYnJpY2suaWQgPT09IGJyaWNrSWRCZWZvcmUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHByZWRpY2F0ZShjdXJyZW50QnJpY2spKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyaWNrcy5wdXNoKGN1cnJlbnRCcmljayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYnJpY2tzO1xuICAgIH1cblxuICAgIHNldExheW91dChyb3dzOiBJV2FsbFJvd1tdKSB7XG4gICAgICAgIHRoaXMucm93cyA9IHJvd3M7XG4gICAgfVxuXG4gICAgdHJhdmVyc2UoZm46IChyb3c6IElXYWxsUm93KSA9PiB2b2lkKSB7XG4gICAgICAgIHRoaXMucm93cy5mb3JFYWNoKChyb3cpID0+IHtcbiAgICAgICAgICAgIGZuKHJvdyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==