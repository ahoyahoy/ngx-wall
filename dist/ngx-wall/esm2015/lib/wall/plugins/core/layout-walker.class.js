/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
* Execute queries commands over rows
* */
export class LayoutWalker {
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
        const brickIdsSequence = this.getBrickSequence(() => true).map((brick) => brick.id);
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
        return this.getBrickSequence((brick) => {
            return brick.id === brickId;
        })[0];
    }
    /**
     * @return {?}
     */
    getBrickIds() {
        return this.getBrickSequence(() => true).map((brick) => brick.id);
    }
    /**
     * @param {?} predictor
     * @return {?}
     */
    filterBricks(predictor) {
        return this.getBrickSequence((wallBrick) => {
            return predictor(wallBrick.getSnapshot());
        });
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
            this.rows[i].columns.forEach((column, columnIndex) => {
                /** @type {?} */
                let brickIndex = null;
                column.bricks.forEach((brick, index) => {
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
        return this.getBrickSequence(() => true).length;
    }
    /**
     * @param {?} brickId
     * @return {?}
     */
    getNextBrick(brickId) {
        /** @type {?} */
        const bricksSequence = this.getBrickSequence(() => true);
        /** @type {?} */
        const brickIndex = bricksSequence.findIndex((brick) => {
            return brick.id === brickId;
        });
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
        const bricksSequence = this.getBrickSequence(() => true);
        /** @type {?} */
        const brickIndex = bricksSequence.findIndex((brick) => {
            return brick.id === brickId;
        });
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
        this.traverse((row) => {
            row.columns.forEach((column) => {
                column.bricks.forEach((brick) => {
                    if (predicate(brick)) {
                        brickSequence.push(brick);
                    }
                });
            });
        });
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
        const nextTextBricks = this.findBricksAfter(brickId, (currentBrick) => {
            return this.brickRegistry.get(currentBrick.tag).supportText;
        });
        return nextTextBricks[0];
    }
    /**
     * @param {?} brickId
     * @return {?}
     */
    getPreviousTextBrick(brickId) {
        /** @type {?} */
        const previousTextBricks = this.findBrickBefore(brickId, (currentBrick) => {
            return this.brickRegistry.get(currentBrick.tag).supportText;
        });
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
        const bricksSequence = this.getBrickSequence(() => true);
        /** @type {?} */
        const brickIdsSequence = bricksSequence.map((brick) => brick.id);
        /** @type {?} */
        const currentBrickIdIndex = brickIdsSequence.indexOf(brickId);
        if (currentBrickIdIndex !== -1) {
            /** @type {?} */
            const brickIdsAfter = brickIdsSequence.splice(currentBrickIdIndex + 1);
            brickIdsAfter.forEach((brickIdAfter) => {
                /** @type {?} */
                const currentBrick = bricksSequence.find((brick) => {
                    return brick.id === brickIdAfter;
                });
                if (predicate(currentBrick)) {
                    bricks.push(currentBrick);
                }
            });
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
        const bricksSequence = this.getBrickSequence(() => true);
        /** @type {?} */
        const brickIdsSequence = bricksSequence.map((brick) => brick.id);
        /** @type {?} */
        const currentBrickIdIndex = brickIdsSequence.indexOf(brickId);
        if (currentBrickIdIndex !== -1) {
            /** @type {?} */
            const brickIdsBefore = brickIdsSequence.splice(0, currentBrickIdIndex);
            brickIdsBefore.forEach((brickIdBefore) => {
                /** @type {?} */
                const currentBrick = bricksSequence.find((brick) => brick.id === brickIdBefore);
                if (predicate(currentBrick)) {
                    bricks.push(currentBrick);
                }
            });
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
        this.rows.forEach((row) => {
            fn(row);
        });
    }
}
if (false) {
    /** @type {?} */
    LayoutWalker.prototype.rows;
    /**
     * @type {?}
     * @private
     */
    LayoutWalker.prototype.brickRegistry;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LXdhbGtlci5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL3dhbGwvcGx1Z2lucy9jb3JlL2xheW91dC13YWxrZXIuY2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQVFBLE1BQU0sT0FBTyxZQUFZOzs7O0lBR3JCLFlBQW9CLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBRmhELFNBQUksR0FBZSxFQUFFLENBQUM7SUFHdEIsQ0FBQzs7Ozs7SUFJRCxXQUFXO1FBQ1AsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUM1QixDQUFDOzs7Ozs7SUFFRCxjQUFjLENBQUMsWUFBb0IsRUFBRSxhQUFxQjs7Y0FDaEQsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztRQUVuRixPQUFPLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDNUYsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsT0FBZTtRQUN2QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQzFDLENBQUM7Ozs7O0lBRUQsWUFBWSxDQUFDLE9BQWU7UUFDeEIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxLQUFnQixFQUFFLEVBQUU7WUFDOUMsT0FBTyxLQUFLLENBQUMsRUFBRSxLQUFLLE9BQU8sQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNWLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1AsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxF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T0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDdEIsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1osQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7OztJQXRORyw0QkFBc0I7Ozs7O0lBRVYscUNBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtCcmlja1JlZ2lzdHJ5fSBmcm9tICcuLi8uLi9yZWdpc3RyeS9icmljay1yZWdpc3RyeS5zZXJ2aWNlJztcbmltcG9ydCB7V2FsbEJyaWNrfSBmcm9tICcuLi8uLi9tb2RlbC93YWxsLWJyaWNrLm1vZGVsJztcbmltcG9ydCB7SVdhbGxSb3d9IGZyb20gJy4uLy4uL21vZGVsL2ludGVyZmFjZXMvd2FsbC1yb3cuaW50ZXJmYWNlJztcbmltcG9ydCB7SUJyaWNrU25hcHNob3R9IGZyb20gJy4uLy4uL21vZGVsL2ludGVyZmFjZXMvYnJpY2stc25hcHNob3QuaW50ZXJmYWNlJztcblxuLypcbiogRXhlY3V0ZSBxdWVyaWVzIGNvbW1hbmRzIG92ZXIgcm93c1xuKiAqL1xuZXhwb3J0IGNsYXNzIExheW91dFdhbGtlciB7XG4gICAgcm93czogSVdhbGxSb3dbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBicmlja1JlZ2lzdHJ5OiBCcmlja1JlZ2lzdHJ5KSB7XG4gICAgfVxuXG4gICAgLy8gcHVibGljIEFQSVxuXG4gICAgZ2V0Um93Q291bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJvd3MubGVuZ3RoO1xuICAgIH1cblxuICAgIGlzQnJpY2tBaGVhZE9mKGZpcnN0QnJpY2tJZDogc3RyaW5nLCBzZWNvbmRCcmlja0lkOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgYnJpY2tJZHNTZXF1ZW5jZSA9IHRoaXMuZ2V0QnJpY2tTZXF1ZW5jZSgoKSA9PiB0cnVlKS5tYXAoKGJyaWNrKSA9PiBicmljay5pZCk7XG5cbiAgICAgICAgcmV0dXJuIGJyaWNrSWRzU2VxdWVuY2UuaW5kZXhPZihmaXJzdEJyaWNrSWQpIDwgYnJpY2tJZHNTZXF1ZW5jZS5pbmRleE9mKHNlY29uZEJyaWNrSWQpO1xuICAgIH1cblxuICAgIGdldEJyaWNrVGFnKGJyaWNrSWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEJyaWNrQnlJZChicmlja0lkKS50YWc7XG4gICAgfVxuXG4gICAgZ2V0QnJpY2tCeUlkKGJyaWNrSWQ6IHN0cmluZyk6IFdhbGxCcmljayB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEJyaWNrU2VxdWVuY2UoKGJyaWNrOiBXYWxsQnJpY2spID0+IHtcbiAgICAgICAgICAgIHJldHVybiBicmljay5pZCA9PT0gYnJpY2tJZDtcbiAgICAgICAgfSlbMF07XG4gICAgfVxuXG4gICAgZ2V0QnJpY2tJZHMoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRCcmlja1NlcXVlbmNlKCgpID0+IHRydWUpLm1hcCgoYnJpY2spID0+IGJyaWNrLmlkKTtcbiAgICB9XG5cbiAgICBmaWx0ZXJCcmlja3MocHJlZGljdG9yOiAoYnJpY2s6IElCcmlja1NuYXBzaG90KSA9PiBib29sZWFuKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEJyaWNrU2VxdWVuY2UoKHdhbGxCcmljaykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHByZWRpY3Rvcih3YWxsQnJpY2suZ2V0U25hcHNob3QoKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldEJyaWNrUG9zaXRpb24oYnJpY2tJZDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGJyaWNrUG9zaXRpb24gPSB7XG4gICAgICAgICAgICByb3dJbmRleDogbnVsbCxcbiAgICAgICAgICAgIGNvbHVtbkluZGV4OiBudWxsLFxuICAgICAgICAgICAgYnJpY2tJbmRleDogbnVsbFxuICAgICAgICB9O1xuXG4gICAgICAgIGxldCBpID0gMDtcblxuICAgICAgICB3aGlsZSAoYnJpY2tQb3NpdGlvbi5yb3dJbmRleCA9PT0gbnVsbCAmJiBpIDwgdGhpcy5yb3dzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5yb3dzW2ldLmNvbHVtbnMuZm9yRWFjaCgoY29sdW1uLCBjb2x1bW5JbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBicmlja0luZGV4ID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIGNvbHVtbi5icmlja3MuZm9yRWFjaCgoYnJpY2ssIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChicmljay5pZCA9PT0gYnJpY2tJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJpY2tJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoYnJpY2tJbmRleCB8fCBicmlja0luZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyaWNrUG9zaXRpb24ucm93SW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICBicmlja1Bvc2l0aW9uLmNvbHVtbkluZGV4ID0gY29sdW1uSW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIGJyaWNrUG9zaXRpb24uYnJpY2tJbmRleCA9IGJyaWNrSW5kZXg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBicmlja1Bvc2l0aW9uO1xuICAgIH1cblxuICAgIGdldENvbHVtbkNvdW50KHJvd0luZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5yb3dzW3Jvd0luZGV4XS5jb2x1bW5zLmxlbmd0aDtcbiAgICB9XG5cbiAgICBnZXRCcmlja3NDb3VudCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRCcmlja1NlcXVlbmNlKCgpID0+IHRydWUpLmxlbmd0aDtcbiAgICB9XG5cbiAgICBnZXROZXh0QnJpY2soYnJpY2tJZDogc3RyaW5nKTogV2FsbEJyaWNrIHtcbiAgICAgICAgY29uc3QgYnJpY2tzU2VxdWVuY2UgPSB0aGlzLmdldEJyaWNrU2VxdWVuY2UoKCkgPT4gdHJ1ZSk7XG5cbiAgICAgICAgY29uc3QgYnJpY2tJbmRleCA9IGJyaWNrc1NlcXVlbmNlLmZpbmRJbmRleCgoYnJpY2spID0+IHtcbiAgICAgICAgICAgIHJldHVybiBicmljay5pZCA9PT0gYnJpY2tJZDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGJyaWNrc1NlcXVlbmNlW2JyaWNrSW5kZXggKyAxXTtcbiAgICB9XG5cbiAgICBnZXROZXh0QnJpY2tJZChicmlja0lkOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBuZXh0QnJpY2sgPSB0aGlzLmdldE5leHRCcmljayhicmlja0lkKTtcblxuICAgICAgICByZXR1cm4gbmV4dEJyaWNrICYmIG5leHRCcmljay5pZDtcbiAgICB9XG5cbiAgICBnZXRQcmV2aW91c0JyaWNrKGJyaWNrSWQ6IHN0cmluZyk6IFdhbGxCcmljayB7XG4gICAgICAgIGNvbnN0IGJyaWNrc1NlcXVlbmNlID0gdGhpcy5nZXRCcmlja1NlcXVlbmNlKCgpID0+IHRydWUpO1xuXG4gICAgICAgIGNvbnN0IGJyaWNrSW5kZXggPSBicmlja3NTZXF1ZW5jZS5maW5kSW5kZXgoKGJyaWNrKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYnJpY2suaWQgPT09IGJyaWNrSWQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBicmlja3NTZXF1ZW5jZVticmlja0luZGV4IC0gMV07XG4gICAgfVxuXG4gICAgZ2V0UHJldmlvdXNCcmlja0lkKGJyaWNrSWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzQnJpY2sgPSB0aGlzLmdldFByZXZpb3VzQnJpY2soYnJpY2tJZCk7XG5cbiAgICAgICAgcmV0dXJuIHByZXZpb3VzQnJpY2sgJiYgcHJldmlvdXNCcmljay5pZDtcbiAgICB9XG5cbiAgICBnZXRCcmlja1NlcXVlbmNlKHByZWRpY2F0ZSk6IFdhbGxCcmlja1tdIHtcbiAgICAgICAgY29uc3QgYnJpY2tTZXF1ZW5jZSA9IFtdO1xuXG4gICAgICAgIHRoaXMudHJhdmVyc2UoKHJvdzogSVdhbGxSb3cpID0+IHtcbiAgICAgICAgICAgIHJvdy5jb2x1bW5zLmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5icmlja3MuZm9yRWFjaCgoYnJpY2spID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZWRpY2F0ZShicmljaykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyaWNrU2VxdWVuY2UucHVzaChicmljayk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gYnJpY2tTZXF1ZW5jZTtcbiAgICB9XG5cbiAgICBnZXROZXh0VGV4dEJyaWNrSWQoYnJpY2tJZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgbmV4dFRleHRCcmljayA9IHRoaXMuZ2V0TmV4dFRleHRCcmljayhicmlja0lkKTtcblxuICAgICAgICByZXR1cm4gbmV4dFRleHRCcmljayAmJiBuZXh0VGV4dEJyaWNrLmlkO1xuICAgIH1cblxuICAgIGdldFByZXZpb3VzVGV4dEJyaWNrSWQoYnJpY2tJZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNUZXh0QnJpY2sgPSB0aGlzLmdldFByZXZpb3VzVGV4dEJyaWNrKGJyaWNrSWQpO1xuXG4gICAgICAgIHJldHVybiBwcmV2aW91c1RleHRCcmljayAmJiBwcmV2aW91c1RleHRCcmljay5pZDtcbiAgICB9XG5cbiAgICAvLyBlbmQgcHVibGljIEFQSVxuXG4gICAgZ2V0TmV4dFRleHRCcmljayhicmlja0lkOiBzdHJpbmcpOiBXYWxsQnJpY2sge1xuICAgICAgICBjb25zdCBuZXh0VGV4dEJyaWNrcyA9IHRoaXMuZmluZEJyaWNrc0FmdGVyKGJyaWNrSWQsIChjdXJyZW50QnJpY2s6IFdhbGxCcmljaykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnJpY2tSZWdpc3RyeS5nZXQoY3VycmVudEJyaWNrLnRhZykuc3VwcG9ydFRleHQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBuZXh0VGV4dEJyaWNrc1swXTtcbiAgICB9XG5cbiAgICBnZXRQcmV2aW91c1RleHRCcmljayhicmlja0lkOiBzdHJpbmcpOiBXYWxsQnJpY2sge1xuICAgICAgICBjb25zdCBwcmV2aW91c1RleHRCcmlja3MgPSB0aGlzLmZpbmRCcmlja0JlZm9yZShicmlja0lkLCAoY3VycmVudEJyaWNrOiBXYWxsQnJpY2spID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJyaWNrUmVnaXN0cnkuZ2V0KGN1cnJlbnRCcmljay50YWcpLnN1cHBvcnRUZXh0O1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcHJldmlvdXNUZXh0QnJpY2tzW3ByZXZpb3VzVGV4dEJyaWNrcy5sZW5ndGggLSAxXTtcbiAgICB9XG5cbiAgICBmaW5kQnJpY2tzQWZ0ZXIoYnJpY2tJZDogc3RyaW5nLCBwcmVkaWNhdGUpOiBXYWxsQnJpY2tbXSB7XG4gICAgICAgIGNvbnN0IGJyaWNrcyA9IFtdO1xuXG4gICAgICAgIGNvbnN0IGJyaWNrc1NlcXVlbmNlID0gdGhpcy5nZXRCcmlja1NlcXVlbmNlKCgpID0+IHRydWUpO1xuXG4gICAgICAgIGNvbnN0IGJyaWNrSWRzU2VxdWVuY2UgPSBicmlja3NTZXF1ZW5jZS5tYXAoKGJyaWNrKSA9PiBicmljay5pZCk7XG5cbiAgICAgICAgY29uc3QgY3VycmVudEJyaWNrSWRJbmRleCA9IGJyaWNrSWRzU2VxdWVuY2UuaW5kZXhPZihicmlja0lkKTtcblxuICAgICAgICBpZiAoY3VycmVudEJyaWNrSWRJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIGNvbnN0IGJyaWNrSWRzQWZ0ZXIgPSBicmlja0lkc1NlcXVlbmNlLnNwbGljZShjdXJyZW50QnJpY2tJZEluZGV4ICsgMSk7XG5cbiAgICAgICAgICAgIGJyaWNrSWRzQWZ0ZXIuZm9yRWFjaCgoYnJpY2tJZEFmdGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudEJyaWNrID0gYnJpY2tzU2VxdWVuY2UuZmluZCgoYnJpY2spID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJyaWNrLmlkID09PSBicmlja0lkQWZ0ZXI7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAocHJlZGljYXRlKGN1cnJlbnRCcmljaykpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJpY2tzLnB1c2goY3VycmVudEJyaWNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBicmlja3M7XG4gICAgfVxuXG4gICAgZmluZEJyaWNrQmVmb3JlKGJyaWNrSWQ6IHN0cmluZywgcHJlZGljYXRlKSB7XG4gICAgICAgIGNvbnN0IGJyaWNrcyA9IFtdO1xuXG4gICAgICAgIGNvbnN0IGJyaWNrc1NlcXVlbmNlID0gdGhpcy5nZXRCcmlja1NlcXVlbmNlKCgpID0+IHRydWUpO1xuXG4gICAgICAgIGNvbnN0IGJyaWNrSWRzU2VxdWVuY2UgPSBicmlja3NTZXF1ZW5jZS5tYXAoKGJyaWNrKSA9PiBicmljay5pZCk7XG5cbiAgICAgICAgY29uc3QgY3VycmVudEJyaWNrSWRJbmRleCA9IGJyaWNrSWRzU2VxdWVuY2UuaW5kZXhPZihicmlja0lkKTtcblxuICAgICAgICBpZiAoY3VycmVudEJyaWNrSWRJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIGNvbnN0IGJyaWNrSWRzQmVmb3JlID0gYnJpY2tJZHNTZXF1ZW5jZS5zcGxpY2UoMCwgY3VycmVudEJyaWNrSWRJbmRleCk7XG5cbiAgICAgICAgICAgIGJyaWNrSWRzQmVmb3JlLmZvckVhY2goKGJyaWNrSWRCZWZvcmUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50QnJpY2sgPSBicmlja3NTZXF1ZW5jZS5maW5kKChicmljaykgPT4gYnJpY2suaWQgPT09IGJyaWNrSWRCZWZvcmUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHByZWRpY2F0ZShjdXJyZW50QnJpY2spKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyaWNrcy5wdXNoKGN1cnJlbnRCcmljayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYnJpY2tzO1xuICAgIH1cblxuICAgIHNldExheW91dChyb3dzOiBJV2FsbFJvd1tdKSB7XG4gICAgICAgIHRoaXMucm93cyA9IHJvd3M7XG4gICAgfVxuXG4gICAgdHJhdmVyc2UoZm46IChyb3c6IElXYWxsUm93KSA9PiB2b2lkKSB7XG4gICAgICAgIHRoaXMucm93cy5mb3JFYWNoKChyb3cpID0+IHtcbiAgICAgICAgICAgIGZuKHJvdyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==