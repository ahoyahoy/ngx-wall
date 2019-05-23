/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
if (false) {
    /** @type {?} */
    LayoutWalker.prototype.rows;
    /**
     * @type {?}
     * @private
     */
    LayoutWalker.prototype.brickRegistry;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LXdhbGtlci5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL3dhbGwvcGx1Z2lucy9jb3JlL2xheW91dC13YWxrZXIuY2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQVFBLE1BQU0sT0FBTyxZQUFZOzs7O0lBR3JCLFlBQW9CLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBRmhELFNBQUksR0FBZSxFQUFFLENBQUM7SUFHdEIsQ0FBQzs7Ozs7SUFJRCxXQUFXO1FBQ1AsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUM1QixDQUFDOzs7Ozs7SUFFRCxjQUFjLENBQUMsWUFBb0IsRUFBRSxhQUFxQjs7Y0FDaEQsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQjs7O1FBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFDLENBQUMsR0FBRzs7OztRQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFDO1FBRW5GLE9BQU8sZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM1RixDQUFDOzs7OztJQUVELFdBQVcsQ0FBQyxPQUFlO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDMUMsQ0FBQzs7Ozs7SUFFRCxZQUFZLENBQUMsT0FBZTtRQUN4QixPQUFPLElBQUksQ0FBQyxnQkFBZ0I7Ozs7UUFBQyxDQUFDLEtBQWdCLEVBQUUsRUFBRTtZQUM5QyxPQUFPLEtBQUssQ0FBQyxFQUFFLEtBQUssT0FBTyxDQUFDO1FBQ2hDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ1YsQ0FBQzs7OztJQUVELFdBQVc7UUFDUCxPQUFPLElBQUksQ0FBQyxnQkFBZ0I7OztR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R0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQzs7Ozs7SUFFRCxRQUFRLENBQUMsRUFBMkI7UUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPOzs7O1FBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUN0QixFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWixDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjs7O0lBdE5HLDRCQUFzQjs7Ozs7SUFFVixxQ0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0JyaWNrUmVnaXN0cnl9IGZyb20gJy4uLy4uL3JlZ2lzdHJ5L2JyaWNrLXJlZ2lzdHJ5LnNlcnZpY2UnO1xuaW1wb3J0IHtXYWxsQnJpY2t9IGZyb20gJy4uLy4uL21vZGVsL3dhbGwtYnJpY2subW9kZWwnO1xuaW1wb3J0IHtJV2FsbFJvd30gZnJvbSAnLi4vLi4vbW9kZWwvaW50ZXJmYWNlcy93YWxsLXJvdy5pbnRlcmZhY2UnO1xuaW1wb3J0IHtJQnJpY2tTbmFwc2hvdH0gZnJvbSAnLi4vLi4vbW9kZWwvaW50ZXJmYWNlcy9icmljay1zbmFwc2hvdC5pbnRlcmZhY2UnO1xuXG4vKlxuKiBFeGVjdXRlIHF1ZXJpZXMgY29tbWFuZHMgb3ZlciByb3dzXG4qICovXG5leHBvcnQgY2xhc3MgTGF5b3V0V2Fsa2VyIHtcbiAgICByb3dzOiBJV2FsbFJvd1tdID0gW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJyaWNrUmVnaXN0cnk6IEJyaWNrUmVnaXN0cnkpIHtcbiAgICB9XG5cbiAgICAvLyBwdWJsaWMgQVBJXG5cbiAgICBnZXRSb3dDb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucm93cy5sZW5ndGg7XG4gICAgfVxuXG4gICAgaXNCcmlja0FoZWFkT2YoZmlyc3RCcmlja0lkOiBzdHJpbmcsIHNlY29uZEJyaWNrSWQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBicmlja0lkc1NlcXVlbmNlID0gdGhpcy5nZXRCcmlja1NlcXVlbmNlKCgpID0+IHRydWUpLm1hcCgoYnJpY2spID0+IGJyaWNrLmlkKTtcblxuICAgICAgICByZXR1cm4gYnJpY2tJZHNTZXF1ZW5jZS5pbmRleE9mKGZpcnN0QnJpY2tJZCkgPCBicmlja0lkc1NlcXVlbmNlLmluZGV4T2Yoc2Vjb25kQnJpY2tJZCk7XG4gICAgfVxuXG4gICAgZ2V0QnJpY2tUYWcoYnJpY2tJZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QnJpY2tCeUlkKGJyaWNrSWQpLnRhZztcbiAgICB9XG5cbiAgICBnZXRCcmlja0J5SWQoYnJpY2tJZDogc3RyaW5nKTogV2FsbEJyaWNrIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QnJpY2tTZXF1ZW5jZSgoYnJpY2s6IFdhbGxCcmljaykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGJyaWNrLmlkID09PSBicmlja0lkO1xuICAgICAgICB9KVswXTtcbiAgICB9XG5cbiAgICBnZXRCcmlja0lkcygpOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEJyaWNrU2VxdWVuY2UoKCkgPT4gdHJ1ZSkubWFwKChicmljaykgPT4gYnJpY2suaWQpO1xuICAgIH1cblxuICAgIGZpbHRlckJyaWNrcyhwcmVkaWN0b3I6IChicmljazogSUJyaWNrU25hcHNob3QpID0+IGJvb2xlYW4pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QnJpY2tTZXF1ZW5jZSgod2FsbEJyaWNrKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcHJlZGljdG9yKHdhbGxCcmljay5nZXRTbmFwc2hvdCgpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0QnJpY2tQb3NpdGlvbihicmlja0lkOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgYnJpY2tQb3NpdGlvbiA9IHtcbiAgICAgICAgICAgIHJvd0luZGV4OiBudWxsLFxuICAgICAgICAgICAgY29sdW1uSW5kZXg6IG51bGwsXG4gICAgICAgICAgICBicmlja0luZGV4OiBudWxsXG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IGkgPSAwO1xuXG4gICAgICAgIHdoaWxlIChicmlja1Bvc2l0aW9uLnJvd0luZGV4ID09PSBudWxsICYmIGkgPCB0aGlzLnJvd3MubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnJvd3NbaV0uY29sdW1ucy5mb3JFYWNoKChjb2x1bW4sIGNvbHVtbkluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGJyaWNrSW5kZXggPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgY29sdW1uLmJyaWNrcy5mb3JFYWNoKChicmljaywgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJyaWNrLmlkID09PSBicmlja0lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmlja0luZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmIChicmlja0luZGV4IHx8IGJyaWNrSW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgYnJpY2tQb3NpdGlvbi5yb3dJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIGJyaWNrUG9zaXRpb24uY29sdW1uSW5kZXggPSBjb2x1bW5JbmRleDtcbiAgICAgICAgICAgICAgICAgICAgYnJpY2tQb3NpdGlvbi5icmlja0luZGV4ID0gYnJpY2tJbmRleDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGJyaWNrUG9zaXRpb247XG4gICAgfVxuXG4gICAgZ2V0Q29sdW1uQ291bnQocm93SW5kZXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnJvd3Nbcm93SW5kZXhdLmNvbHVtbnMubGVuZ3RoO1xuICAgIH1cblxuICAgIGdldEJyaWNrc0NvdW50KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEJyaWNrU2VxdWVuY2UoKCkgPT4gdHJ1ZSkubGVuZ3RoO1xuICAgIH1cblxuICAgIGdldE5leHRCcmljayhicmlja0lkOiBzdHJpbmcpOiBXYWxsQnJpY2sge1xuICAgICAgICBjb25zdCBicmlja3NTZXF1ZW5jZSA9IHRoaXMuZ2V0QnJpY2tTZXF1ZW5jZSgoKSA9PiB0cnVlKTtcblxuICAgICAgICBjb25zdCBicmlja0luZGV4ID0gYnJpY2tzU2VxdWVuY2UuZmluZEluZGV4KChicmljaykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGJyaWNrLmlkID09PSBicmlja0lkO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gYnJpY2tzU2VxdWVuY2VbYnJpY2tJbmRleCArIDFdO1xuICAgIH1cblxuICAgIGdldE5leHRCcmlja0lkKGJyaWNrSWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IG5leHRCcmljayA9IHRoaXMuZ2V0TmV4dEJyaWNrKGJyaWNrSWQpO1xuXG4gICAgICAgIHJldHVybiBuZXh0QnJpY2sgJiYgbmV4dEJyaWNrLmlkO1xuICAgIH1cblxuICAgIGdldFByZXZpb3VzQnJpY2soYnJpY2tJZDogc3RyaW5nKTogV2FsbEJyaWNrIHtcbiAgICAgICAgY29uc3QgYnJpY2tzU2VxdWVuY2UgPSB0aGlzLmdldEJyaWNrU2VxdWVuY2UoKCkgPT4gdHJ1ZSk7XG5cbiAgICAgICAgY29uc3QgYnJpY2tJbmRleCA9IGJyaWNrc1NlcXVlbmNlLmZpbmRJbmRleCgoYnJpY2spID0+IHtcbiAgICAgICAgICAgIHJldHVybiBicmljay5pZCA9PT0gYnJpY2tJZDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGJyaWNrc1NlcXVlbmNlW2JyaWNrSW5kZXggLSAxXTtcbiAgICB9XG5cbiAgICBnZXRQcmV2aW91c0JyaWNrSWQoYnJpY2tJZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNCcmljayA9IHRoaXMuZ2V0UHJldmlvdXNCcmljayhicmlja0lkKTtcblxuICAgICAgICByZXR1cm4gcHJldmlvdXNCcmljayAmJiBwcmV2aW91c0JyaWNrLmlkO1xuICAgIH1cblxuICAgIGdldEJyaWNrU2VxdWVuY2UocHJlZGljYXRlKTogV2FsbEJyaWNrW10ge1xuICAgICAgICBjb25zdCBicmlja1NlcXVlbmNlID0gW107XG5cbiAgICAgICAgdGhpcy50cmF2ZXJzZSgocm93OiBJV2FsbFJvdykgPT4ge1xuICAgICAgICAgICAgcm93LmNvbHVtbnMuZm9yRWFjaCgoY29sdW1uKSA9PiB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmJyaWNrcy5mb3JFYWNoKChicmljaykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJlZGljYXRlKGJyaWNrKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJpY2tTZXF1ZW5jZS5wdXNoKGJyaWNrKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBicmlja1NlcXVlbmNlO1xuICAgIH1cblxuICAgIGdldE5leHRUZXh0QnJpY2tJZChicmlja0lkOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBuZXh0VGV4dEJyaWNrID0gdGhpcy5nZXROZXh0VGV4dEJyaWNrKGJyaWNrSWQpO1xuXG4gICAgICAgIHJldHVybiBuZXh0VGV4dEJyaWNrICYmIG5leHRUZXh0QnJpY2suaWQ7XG4gICAgfVxuXG4gICAgZ2V0UHJldmlvdXNUZXh0QnJpY2tJZChicmlja0lkOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBwcmV2aW91c1RleHRCcmljayA9IHRoaXMuZ2V0UHJldmlvdXNUZXh0QnJpY2soYnJpY2tJZCk7XG5cbiAgICAgICAgcmV0dXJuIHByZXZpb3VzVGV4dEJyaWNrICYmIHByZXZpb3VzVGV4dEJyaWNrLmlkO1xuICAgIH1cblxuICAgIC8vIGVuZCBwdWJsaWMgQVBJXG5cbiAgICBnZXROZXh0VGV4dEJyaWNrKGJyaWNrSWQ6IHN0cmluZyk6IFdhbGxCcmljayB7XG4gICAgICAgIGNvbnN0IG5leHRUZXh0QnJpY2tzID0gdGhpcy5maW5kQnJpY2tzQWZ0ZXIoYnJpY2tJZCwgKGN1cnJlbnRCcmljazogV2FsbEJyaWNrKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5icmlja1JlZ2lzdHJ5LmdldChjdXJyZW50QnJpY2sudGFnKS5zdXBwb3J0VGV4dDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG5leHRUZXh0QnJpY2tzWzBdO1xuICAgIH1cblxuICAgIGdldFByZXZpb3VzVGV4dEJyaWNrKGJyaWNrSWQ6IHN0cmluZyk6IFdhbGxCcmljayB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzVGV4dEJyaWNrcyA9IHRoaXMuZmluZEJyaWNrQmVmb3JlKGJyaWNrSWQsIChjdXJyZW50QnJpY2s6IFdhbGxCcmljaykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnJpY2tSZWdpc3RyeS5nZXQoY3VycmVudEJyaWNrLnRhZykuc3VwcG9ydFRleHQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBwcmV2aW91c1RleHRCcmlja3NbcHJldmlvdXNUZXh0QnJpY2tzLmxlbmd0aCAtIDFdO1xuICAgIH1cblxuICAgIGZpbmRCcmlja3NBZnRlcihicmlja0lkOiBzdHJpbmcsIHByZWRpY2F0ZSk6IFdhbGxCcmlja1tdIHtcbiAgICAgICAgY29uc3QgYnJpY2tzID0gW107XG5cbiAgICAgICAgY29uc3QgYnJpY2tzU2VxdWVuY2UgPSB0aGlzLmdldEJyaWNrU2VxdWVuY2UoKCkgPT4gdHJ1ZSk7XG5cbiAgICAgICAgY29uc3QgYnJpY2tJZHNTZXF1ZW5jZSA9IGJyaWNrc1NlcXVlbmNlLm1hcCgoYnJpY2spID0+IGJyaWNrLmlkKTtcblxuICAgICAgICBjb25zdCBjdXJyZW50QnJpY2tJZEluZGV4ID0gYnJpY2tJZHNTZXF1ZW5jZS5pbmRleE9mKGJyaWNrSWQpO1xuXG4gICAgICAgIGlmIChjdXJyZW50QnJpY2tJZEluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgY29uc3QgYnJpY2tJZHNBZnRlciA9IGJyaWNrSWRzU2VxdWVuY2Uuc3BsaWNlKGN1cnJlbnRCcmlja0lkSW5kZXggKyAxKTtcblxuICAgICAgICAgICAgYnJpY2tJZHNBZnRlci5mb3JFYWNoKChicmlja0lkQWZ0ZXIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50QnJpY2sgPSBicmlja3NTZXF1ZW5jZS5maW5kKChicmljaykgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYnJpY2suaWQgPT09IGJyaWNrSWRBZnRlcjtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmIChwcmVkaWNhdGUoY3VycmVudEJyaWNrKSkge1xuICAgICAgICAgICAgICAgICAgICBicmlja3MucHVzaChjdXJyZW50QnJpY2spO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGJyaWNrcztcbiAgICB9XG5cbiAgICBmaW5kQnJpY2tCZWZvcmUoYnJpY2tJZDogc3RyaW5nLCBwcmVkaWNhdGUpIHtcbiAgICAgICAgY29uc3QgYnJpY2tzID0gW107XG5cbiAgICAgICAgY29uc3QgYnJpY2tzU2VxdWVuY2UgPSB0aGlzLmdldEJyaWNrU2VxdWVuY2UoKCkgPT4gdHJ1ZSk7XG5cbiAgICAgICAgY29uc3QgYnJpY2tJZHNTZXF1ZW5jZSA9IGJyaWNrc1NlcXVlbmNlLm1hcCgoYnJpY2spID0+IGJyaWNrLmlkKTtcblxuICAgICAgICBjb25zdCBjdXJyZW50QnJpY2tJZEluZGV4ID0gYnJpY2tJZHNTZXF1ZW5jZS5pbmRleE9mKGJyaWNrSWQpO1xuXG4gICAgICAgIGlmIChjdXJyZW50QnJpY2tJZEluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgY29uc3QgYnJpY2tJZHNCZWZvcmUgPSBicmlja0lkc1NlcXVlbmNlLnNwbGljZSgwLCBjdXJyZW50QnJpY2tJZEluZGV4KTtcblxuICAgICAgICAgICAgYnJpY2tJZHNCZWZvcmUuZm9yRWFjaCgoYnJpY2tJZEJlZm9yZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRCcmljayA9IGJyaWNrc1NlcXVlbmNlLmZpbmQoKGJyaWNrKSA9PiBicmljay5pZCA9PT0gYnJpY2tJZEJlZm9yZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAocHJlZGljYXRlKGN1cnJlbnRCcmljaykpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJpY2tzLnB1c2goY3VycmVudEJyaWNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBicmlja3M7XG4gICAgfVxuXG4gICAgc2V0TGF5b3V0KHJvd3M6IElXYWxsUm93W10pIHtcbiAgICAgICAgdGhpcy5yb3dzID0gcm93cztcbiAgICB9XG5cbiAgICB0cmF2ZXJzZShmbjogKHJvdzogSVdhbGxSb3cpID0+IHZvaWQpIHtcbiAgICAgICAgdGhpcy5yb3dzLmZvckVhY2goKHJvdykgPT4ge1xuICAgICAgICAgICAgZm4ocm93KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19