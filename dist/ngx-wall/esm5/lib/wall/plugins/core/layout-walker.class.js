/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        var brickIdsSequence = this.getBrickSequence((/**
         * @return {?}
         */
        function () { return true; })).map((/**
         * @param {?} brick
         * @return {?}
         */
        function (brick) { return brick.id; }));
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
        return this.getBrickSequence((/**
         * @param {?} brick
         * @return {?}
         */
        function (brick) {
            return brick.id === brickId;
        }))[0];
    };
    /**
     * @return {?}
     */
    LayoutWalker.prototype.getBrickIds = /**
     * @return {?}
     */
    function () {
        return this.getBrickSequence((/**
         * @return {?}
         */
        function () { return true; })).map((/**
         * @param {?} brick
         * @return {?}
         */
        function (brick) { return brick.id; }));
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
        return this.getBrickSequence((/**
         * @param {?} wallBrick
         * @return {?}
         */
        function (wallBrick) {
            return predictor(wallBrick.getSnapshot());
        }));
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
            this.rows[i].columns.forEach((/**
             * @param {?} column
             * @param {?} columnIndex
             * @return {?}
             */
            function (column, columnIndex) {
                /** @type {?} */
                var brickIndex = null;
                column.bricks.forEach((/**
                 * @param {?} brick
                 * @param {?} index
                 * @return {?}
                 */
                function (brick, index) {
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
        return this.getBrickSequence((/**
         * @return {?}
         */
        function () { return true; })).length;
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
        var bricksSequence = this.getBrickSequence((/**
         * @return {?}
         */
        function () { return true; }));
        /** @type {?} */
        var brickIndex = bricksSequence.findIndex((/**
         * @param {?} brick
         * @return {?}
         */
        function (brick) {
            return brick.id === brickId;
        }));
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
        var bricksSequence = this.getBrickSequence((/**
         * @return {?}
         */
        function () { return true; }));
        /** @type {?} */
        var brickIndex = bricksSequence.findIndex((/**
         * @param {?} brick
         * @return {?}
         */
        function (brick) {
            return brick.id === brickId;
        }));
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
        this.traverse((/**
         * @param {?} row
         * @return {?}
         */
        function (row) {
            row.columns.forEach((/**
             * @param {?} column
             * @return {?}
             */
            function (column) {
                column.bricks.forEach((/**
                 * @param {?} brick
                 * @return {?}
                 */
                function (brick) {
                    if (predicate(brick)) {
                        brickSequence.push(brick);
                    }
                }));
            }));
        }));
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
        var nextTextBricks = this.findBricksAfter(brickId, (/**
         * @param {?} currentBrick
         * @return {?}
         */
        function (currentBrick) {
            return _this.brickRegistry.get(currentBrick.tag).supportText;
        }));
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
        var previousTextBricks = this.findBrickBefore(brickId, (/**
         * @param {?} currentBrick
         * @return {?}
         */
        function (currentBrick) {
            return _this.brickRegistry.get(currentBrick.tag).supportText;
        }));
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
        var bricksSequence = this.getBrickSequence((/**
         * @return {?}
         */
        function () { return true; }));
        /** @type {?} */
        var brickIdsSequence = bricksSequence.map((/**
         * @param {?} brick
         * @return {?}
         */
        function (brick) { return brick.id; }));
        /** @type {?} */
        var currentBrickIdIndex = brickIdsSequence.indexOf(brickId);
        if (currentBrickIdIndex !== -1) {
            /** @type {?} */
            var brickIdsAfter = brickIdsSequence.splice(currentBrickIdIndex + 1);
            brickIdsAfter.forEach((/**
             * @param {?} brickIdAfter
             * @return {?}
             */
            function (brickIdAfter) {
                /** @type {?} */
                var currentBrick = bricksSequence.find((/**
                 * @param {?} brick
                 * @return {?}
                 */
                function (brick) {
                    return brick.id === brickIdAfter;
                }));
                if (predicate(currentBrick)) {
                    bricks.push(currentBrick);
                }
            }));
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
        var bricksSequence = this.getBrickSequence((/**
         * @return {?}
         */
        function () { return true; }));
        /** @type {?} */
        var brickIdsSequence = bricksSequence.map((/**
         * @param {?} brick
         * @return {?}
         */
        function (brick) { return brick.id; }));
        /** @type {?} */
        var currentBrickIdIndex = brickIdsSequence.indexOf(brickId);
        if (currentBrickIdIndex !== -1) {
            /** @type {?} */
            var brickIdsBefore = brickIdsSequence.splice(0, currentBrickIdIndex);
            brickIdsBefore.forEach((/**
             * @param {?} brickIdBefore
             * @return {?}
             */
            function (brickIdBefore) {
                /** @type {?} */
                var currentBrick = bricksSequence.find((/**
                 * @param {?} brick
                 * @return {?}
                 */
                function (brick) { return brick.id === brickIdBefore; }));
                if (predicate(currentBrick)) {
                    bricks.push(currentBrick);
                }
            }));
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
        this.rows.forEach((/**
         * @param {?} row
         * @return {?}
         */
        function (row) {
            fn(row);
        }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LXdhbGtlci5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL3dhbGwvcGx1Z2lucy9jb3JlL2xheW91dC13YWxrZXIuY2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQVFBOzs7O0lBR0ksc0JBQW9CLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBRmhELFNBQUksR0FBZSxFQUFFLENBQUM7SUFHdEIsQ0FBQztJQUVELGFBQWE7Ozs7O0lBRWIsa0NBQVc7Ozs7O0lBQVg7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQzVCLENBQUM7Ozs7OztJQUVELHFDQUFjOzs7OztJQUFkLFVBQWUsWUFBb0IsRUFBRSxhQUFxQjs7WUFDaEQsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQjs7O1FBQUMsY0FBTSxPQUFBLElBQUksRUFBSixDQUFJLEVBQUMsQ0FBQyxHQUFHOzs7O1FBQUMsVUFBQyxLQUFLLElBQUssT0FBQSxLQUFLLENBQUMsRUFBRSxFQUFSLENBQVEsRUFBQztRQUVuRixPQUFPLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDNUYsQ0FBQzs7Ozs7SUFFRCxrQ0FBVzs7OztJQUFYLFVBQVksT0FBZTtRQUN2QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQzFDLENBQUM7Ozs7O0lBRUQsbUNBQVk7Ozs7SUFBWixVQUFhLE9BQWU7UUFDeEIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCOzs7O1FBQUMsVUFBQyxLQUFnQjtZQUMxQyxPQUFPLEtBQUssQ0FBQyxFQUFFLEtBQUssT0FBTyxDQUFDO1FBQ2hDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ1YsQ0FBQzs7OztJQUVELGtD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QixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2lCQUM3QjtZQUNMLENBQUMsRUFBQyxDQUFDO1NBQ047UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDOzs7OztJQUVELGdDQUFTOzs7O0lBQVQsVUFBVSxJQUFnQjtRQUN0QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDOzs7OztJQUVELCtCQUFROzs7O0lBQVIsVUFBUyxFQUEyQjtRQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU87Ozs7UUFBQyxVQUFDLEdBQUc7WUFDbEIsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1osQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQUFDLEFBdk5ELElBdU5DOzs7Ozs7O0lBdE5HLDRCQUFzQjs7Ozs7SUFFVixxQ0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0JyaWNrUmVnaXN0cnl9IGZyb20gJy4uLy4uL3JlZ2lzdHJ5L2JyaWNrLXJlZ2lzdHJ5LnNlcnZpY2UnO1xuaW1wb3J0IHtXYWxsQnJpY2t9IGZyb20gJy4uLy4uL21vZGVsL3dhbGwtYnJpY2subW9kZWwnO1xuaW1wb3J0IHtJV2FsbFJvd30gZnJvbSAnLi4vLi4vbW9kZWwvaW50ZXJmYWNlcy93YWxsLXJvdy5pbnRlcmZhY2UnO1xuaW1wb3J0IHtJQnJpY2tTbmFwc2hvdH0gZnJvbSAnLi4vLi4vbW9kZWwvaW50ZXJmYWNlcy9icmljay1zbmFwc2hvdC5pbnRlcmZhY2UnO1xuXG4vKlxuKiBFeGVjdXRlIHF1ZXJpZXMgY29tbWFuZHMgb3ZlciByb3dzXG4qICovXG5leHBvcnQgY2xhc3MgTGF5b3V0V2Fsa2VyIHtcbiAgICByb3dzOiBJV2FsbFJvd1tdID0gW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJyaWNrUmVnaXN0cnk6IEJyaWNrUmVnaXN0cnkpIHtcbiAgICB9XG5cbiAgICAvLyBwdWJsaWMgQVBJXG5cbiAgICBnZXRSb3dDb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucm93cy5sZW5ndGg7XG4gICAgfVxuXG4gICAgaXNCcmlja0FoZWFkT2YoZmlyc3RCcmlja0lkOiBzdHJpbmcsIHNlY29uZEJyaWNrSWQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBicmlja0lkc1NlcXVlbmNlID0gdGhpcy5nZXRCcmlja1NlcXVlbmNlKCgpID0+IHRydWUpLm1hcCgoYnJpY2spID0+IGJyaWNrLmlkKTtcblxuICAgICAgICByZXR1cm4gYnJpY2tJZHNTZXF1ZW5jZS5pbmRleE9mKGZpcnN0QnJpY2tJZCkgPCBicmlja0lkc1NlcXVlbmNlLmluZGV4T2Yoc2Vjb25kQnJpY2tJZCk7XG4gICAgfVxuXG4gICAgZ2V0QnJpY2tUYWcoYnJpY2tJZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QnJpY2tCeUlkKGJyaWNrSWQpLnRhZztcbiAgICB9XG5cbiAgICBnZXRCcmlja0J5SWQoYnJpY2tJZDogc3RyaW5nKTogV2FsbEJyaWNrIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QnJpY2tTZXF1ZW5jZSgoYnJpY2s6IFdhbGxCcmljaykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGJyaWNrLmlkID09PSBicmlja0lkO1xuICAgICAgICB9KVswXTtcbiAgICB9XG5cbiAgICBnZXRCcmlja0lkcygpOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEJyaWNrU2VxdWVuY2UoKCkgPT4gdHJ1ZSkubWFwKChicmljaykgPT4gYnJpY2suaWQpO1xuICAgIH1cblxuICAgIGZpbHRlckJyaWNrcyhwcmVkaWN0b3I6IChicmljazogSUJyaWNrU25hcHNob3QpID0+IGJvb2xlYW4pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QnJpY2tTZXF1ZW5jZSgod2FsbEJyaWNrKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcHJlZGljdG9yKHdhbGxCcmljay5nZXRTbmFwc2hvdCgpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0QnJpY2tQb3NpdGlvbihicmlja0lkOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgYnJpY2tQb3NpdGlvbiA9IHtcbiAgICAgICAgICAgIHJvd0luZGV4OiBudWxsLFxuICAgICAgICAgICAgY29sdW1uSW5kZXg6IG51bGwsXG4gICAgICAgICAgICBicmlja0luZGV4OiBudWxsXG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IGkgPSAwO1xuXG4gICAgICAgIHdoaWxlIChicmlja1Bvc2l0aW9uLnJvd0luZGV4ID09PSBudWxsICYmIGkgPCB0aGlzLnJvd3MubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnJvd3NbaV0uY29sdW1ucy5mb3JFYWNoKChjb2x1bW4sIGNvbHVtbkluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGJyaWNrSW5kZXggPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgY29sdW1uLmJyaWNrcy5mb3JFYWNoKChicmljaywgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJyaWNrLmlkID09PSBicmlja0lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmlja0luZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmIChicmlja0luZGV4IHx8IGJyaWNrSW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgYnJpY2tQb3NpdGlvbi5yb3dJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIGJyaWNrUG9zaXRpb24uY29sdW1uSW5kZXggPSBjb2x1bW5JbmRleDtcbiAgICAgICAgICAgICAgICAgICAgYnJpY2tQb3NpdGlvbi5icmlja0luZGV4ID0gYnJpY2tJbmRleDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGJyaWNrUG9zaXRpb247XG4gICAgfVxuXG4gICAgZ2V0Q29sdW1uQ291bnQocm93SW5kZXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnJvd3Nbcm93SW5kZXhdLmNvbHVtbnMubGVuZ3RoO1xuICAgIH1cblxuICAgIGdldEJyaWNrc0NvdW50KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEJyaWNrU2VxdWVuY2UoKCkgPT4gdHJ1ZSkubGVuZ3RoO1xuICAgIH1cblxuICAgIGdldE5leHRCcmljayhicmlja0lkOiBzdHJpbmcpOiBXYWxsQnJpY2sge1xuICAgICAgICBjb25zdCBicmlja3NTZXF1ZW5jZSA9IHRoaXMuZ2V0QnJpY2tTZXF1ZW5jZSgoKSA9PiB0cnVlKTtcblxuICAgICAgICBjb25zdCBicmlja0luZGV4ID0gYnJpY2tzU2VxdWVuY2UuZmluZEluZGV4KChicmljaykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGJyaWNrLmlkID09PSBicmlja0lkO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gYnJpY2tzU2VxdWVuY2VbYnJpY2tJbmRleCArIDFdO1xuICAgIH1cblxuICAgIGdldE5leHRCcmlja0lkKGJyaWNrSWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IG5leHRCcmljayA9IHRoaXMuZ2V0TmV4dEJyaWNrKGJyaWNrSWQpO1xuXG4gICAgICAgIHJldHVybiBuZXh0QnJpY2sgJiYgbmV4dEJyaWNrLmlkO1xuICAgIH1cblxuICAgIGdldFByZXZpb3VzQnJpY2soYnJpY2tJZDogc3RyaW5nKTogV2FsbEJyaWNrIHtcbiAgICAgICAgY29uc3QgYnJpY2tzU2VxdWVuY2UgPSB0aGlzLmdldEJyaWNrU2VxdWVuY2UoKCkgPT4gdHJ1ZSk7XG5cbiAgICAgICAgY29uc3QgYnJpY2tJbmRleCA9IGJyaWNrc1NlcXVlbmNlLmZpbmRJbmRleCgoYnJpY2spID0+IHtcbiAgICAgICAgICAgIHJldHVybiBicmljay5pZCA9PT0gYnJpY2tJZDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGJyaWNrc1NlcXVlbmNlW2JyaWNrSW5kZXggLSAxXTtcbiAgICB9XG5cbiAgICBnZXRQcmV2aW91c0JyaWNrSWQoYnJpY2tJZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNCcmljayA9IHRoaXMuZ2V0UHJldmlvdXNCcmljayhicmlja0lkKTtcblxuICAgICAgICByZXR1cm4gcHJldmlvdXNCcmljayAmJiBwcmV2aW91c0JyaWNrLmlkO1xuICAgIH1cblxuICAgIGdldEJyaWNrU2VxdWVuY2UocHJlZGljYXRlKTogV2FsbEJyaWNrW10ge1xuICAgICAgICBjb25zdCBicmlja1NlcXVlbmNlID0gW107XG5cbiAgICAgICAgdGhpcy50cmF2ZXJzZSgocm93OiBJV2FsbFJvdykgPT4ge1xuICAgICAgICAgICAgcm93LmNvbHVtbnMuZm9yRWFjaCgoY29sdW1uKSA9PiB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmJyaWNrcy5mb3JFYWNoKChicmljaykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJlZGljYXRlKGJyaWNrKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJpY2tTZXF1ZW5jZS5wdXNoKGJyaWNrKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBicmlja1NlcXVlbmNlO1xuICAgIH1cblxuICAgIGdldE5leHRUZXh0QnJpY2tJZChicmlja0lkOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBuZXh0VGV4dEJyaWNrID0gdGhpcy5nZXROZXh0VGV4dEJyaWNrKGJyaWNrSWQpO1xuXG4gICAgICAgIHJldHVybiBuZXh0VGV4dEJyaWNrICYmIG5leHRUZXh0QnJpY2suaWQ7XG4gICAgfVxuXG4gICAgZ2V0UHJldmlvdXNUZXh0QnJpY2tJZChicmlja0lkOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBwcmV2aW91c1RleHRCcmljayA9IHRoaXMuZ2V0UHJldmlvdXNUZXh0QnJpY2soYnJpY2tJZCk7XG5cbiAgICAgICAgcmV0dXJuIHByZXZpb3VzVGV4dEJyaWNrICYmIHByZXZpb3VzVGV4dEJyaWNrLmlkO1xuICAgIH1cblxuICAgIC8vIGVuZCBwdWJsaWMgQVBJXG5cbiAgICBnZXROZXh0VGV4dEJyaWNrKGJyaWNrSWQ6IHN0cmluZyk6IFdhbGxCcmljayB7XG4gICAgICAgIGNvbnN0IG5leHRUZXh0QnJpY2tzID0gdGhpcy5maW5kQnJpY2tzQWZ0ZXIoYnJpY2tJZCwgKGN1cnJlbnRCcmljazogV2FsbEJyaWNrKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5icmlja1JlZ2lzdHJ5LmdldChjdXJyZW50QnJpY2sudGFnKS5zdXBwb3J0VGV4dDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG5leHRUZXh0QnJpY2tzWzBdO1xuICAgIH1cblxuICAgIGdldFByZXZpb3VzVGV4dEJyaWNrKGJyaWNrSWQ6IHN0cmluZyk6IFdhbGxCcmljayB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzVGV4dEJyaWNrcyA9IHRoaXMuZmluZEJyaWNrQmVmb3JlKGJyaWNrSWQsIChjdXJyZW50QnJpY2s6IFdhbGxCcmljaykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnJpY2tSZWdpc3RyeS5nZXQoY3VycmVudEJyaWNrLnRhZykuc3VwcG9ydFRleHQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBwcmV2aW91c1RleHRCcmlja3NbcHJldmlvdXNUZXh0QnJpY2tzLmxlbmd0aCAtIDFdO1xuICAgIH1cblxuICAgIGZpbmRCcmlja3NBZnRlcihicmlja0lkOiBzdHJpbmcsIHByZWRpY2F0ZSk6IFdhbGxCcmlja1tdIHtcbiAgICAgICAgY29uc3QgYnJpY2tzID0gW107XG5cbiAgICAgICAgY29uc3QgYnJpY2tzU2VxdWVuY2UgPSB0aGlzLmdldEJyaWNrU2VxdWVuY2UoKCkgPT4gdHJ1ZSk7XG5cbiAgICAgICAgY29uc3QgYnJpY2tJZHNTZXF1ZW5jZSA9IGJyaWNrc1NlcXVlbmNlLm1hcCgoYnJpY2spID0+IGJyaWNrLmlkKTtcblxuICAgICAgICBjb25zdCBjdXJyZW50QnJpY2tJZEluZGV4ID0gYnJpY2tJZHNTZXF1ZW5jZS5pbmRleE9mKGJyaWNrSWQpO1xuXG4gICAgICAgIGlmIChjdXJyZW50QnJpY2tJZEluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgY29uc3QgYnJpY2tJZHNBZnRlciA9IGJyaWNrSWRzU2VxdWVuY2Uuc3BsaWNlKGN1cnJlbnRCcmlja0lkSW5kZXggKyAxKTtcblxuICAgICAgICAgICAgYnJpY2tJZHNBZnRlci5mb3JFYWNoKChicmlja0lkQWZ0ZXIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50QnJpY2sgPSBicmlja3NTZXF1ZW5jZS5maW5kKChicmljaykgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYnJpY2suaWQgPT09IGJyaWNrSWRBZnRlcjtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmIChwcmVkaWNhdGUoY3VycmVudEJyaWNrKSkge1xuICAgICAgICAgICAgICAgICAgICBicmlja3MucHVzaChjdXJyZW50QnJpY2spO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGJyaWNrcztcbiAgICB9XG5cbiAgICBmaW5kQnJpY2tCZWZvcmUoYnJpY2tJZDogc3RyaW5nLCBwcmVkaWNhdGUpIHtcbiAgICAgICAgY29uc3QgYnJpY2tzID0gW107XG5cbiAgICAgICAgY29uc3QgYnJpY2tzU2VxdWVuY2UgPSB0aGlzLmdldEJyaWNrU2VxdWVuY2UoKCkgPT4gdHJ1ZSk7XG5cbiAgICAgICAgY29uc3QgYnJpY2tJZHNTZXF1ZW5jZSA9IGJyaWNrc1NlcXVlbmNlLm1hcCgoYnJpY2spID0+IGJyaWNrLmlkKTtcblxuICAgICAgICBjb25zdCBjdXJyZW50QnJpY2tJZEluZGV4ID0gYnJpY2tJZHNTZXF1ZW5jZS5pbmRleE9mKGJyaWNrSWQpO1xuXG4gICAgICAgIGlmIChjdXJyZW50QnJpY2tJZEluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgY29uc3QgYnJpY2tJZHNCZWZvcmUgPSBicmlja0lkc1NlcXVlbmNlLnNwbGljZSgwLCBjdXJyZW50QnJpY2tJZEluZGV4KTtcblxuICAgICAgICAgICAgYnJpY2tJZHNCZWZvcmUuZm9yRWFjaCgoYnJpY2tJZEJlZm9yZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRCcmljayA9IGJyaWNrc1NlcXVlbmNlLmZpbmQoKGJyaWNrKSA9PiBicmljay5pZCA9PT0gYnJpY2tJZEJlZm9yZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAocHJlZGljYXRlKGN1cnJlbnRCcmljaykpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJpY2tzLnB1c2goY3VycmVudEJyaWNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBicmlja3M7XG4gICAgfVxuXG4gICAgc2V0TGF5b3V0KHJvd3M6IElXYWxsUm93W10pIHtcbiAgICAgICAgdGhpcy5yb3dzID0gcm93cztcbiAgICB9XG5cbiAgICB0cmF2ZXJzZShmbjogKHJvdzogSVdhbGxSb3cpID0+IHZvaWQpIHtcbiAgICAgICAgdGhpcy5yb3dzLmZvckVhY2goKHJvdykgPT4ge1xuICAgICAgICAgICAgZm4ocm93KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19