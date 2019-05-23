/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class WallBrick {
    /**
     * @param {?} id
     * @param {?} tag
     * @param {?} meta
     */
    constructor(id, tag, meta) {
        this.state = {};
        this.id = id;
        this.tag = tag;
        this.meta = meta;
    }
    /**
     * @return {?}
     */
    getState() {
        return JSON.parse(JSON.stringify(this.state));
    }
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} newState
     * @return {THIS}
     */
    updateState(newState) {
        if (Object.keys(newState).length) {
            Object.assign((/** @type {?} */ (this)).state, newState);
        }
        else {
            (/** @type {?} */ (this)).state = {};
        }
        return (/** @type {?} */ (this));
    }
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} tag
     * @return {THIS}
     */
    turnInto(tag) {
        (/** @type {?} */ (this)).tag = tag;
        (/** @type {?} */ (this)).updateState({});
        return (/** @type {?} */ (this));
    }
    /**
     * @return {?}
     */
    getSnapshot() {
        return {
            id: this.id,
            tag: this.tag,
            meta: this.meta,
            state: this.getState()
        };
    }
}
if (false) {
    /** @type {?} */
    WallBrick.prototype.id;
    /** @type {?} */
    WallBrick.prototype.tag;
    /** @type {?} */
    WallBrick.prototype.meta;
    /** @type {?} */
    WallBrick.prototype.state;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbC1icmljay5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL3dhbGwvbW9kZWwvd2FsbC1icmljay5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsTUFBTSxPQUFPLFNBQVM7Ozs7OztJQU1sQixZQUFZLEVBQVUsRUFBRSxHQUFXLEVBQUUsSUFBUztRQUY5QyxVQUFLLEdBQVEsRUFBRSxDQUFDO1FBR1osSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ0osT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDbEQsQ0FBQzs7Ozs7OztJQUVELFdBQVcsQ0FBQyxRQUFRO1FBQ2hCLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUU7WUFDOUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxtQkFBQSxJQUFJLEVBQUEsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDdkM7YUFBTTtZQUNILG1CQUFBLElBQUksRUFBQSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7U0FDbkI7UUFFRCxPQUFPLG1CQUFBLElBQUksRUFBQSxDQUFDO0lBQ2hCLENBQUM7Ozs7Ozs7SUFFRCxRQUFRLENBQUMsR0FBVztRQUNoQixtQkFBQSxJQUFJLEVBQUEsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBRWYsbUJBQUEsSUFBSSxFQUFBLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXJCLE9BQU8sbUJBQUEsSUFBSSxFQUFBLENBQUM7SUFDaEIsQ0FBQzs7OztJQUVELFdBQVc7UUFDUCxPQUFPO1lBQ0gsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ1gsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO1lBQ2IsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUU7U0FDekIsQ0FBQztJQUNOLENBQUM7Q0FDSjs7O0lBekNHLHVCQUFXOztJQUNYLHdCQUFZOztJQUNaLHlCQUFVOztJQUNWLDBCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SUJyaWNrU25hcHNob3R9IGZyb20gJy4vaW50ZXJmYWNlcy9icmljay1zbmFwc2hvdC5pbnRlcmZhY2UnO1xuXG5leHBvcnQgY2xhc3MgV2FsbEJyaWNrIHtcbiAgICBpZDogc3RyaW5nO1xuICAgIHRhZzogc3RyaW5nO1xuICAgIG1ldGE6IGFueTtcbiAgICBzdGF0ZTogYW55ID0ge307XG5cbiAgICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCB0YWc6IHN0cmluZywgbWV0YTogYW55KSB7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy50YWcgPSB0YWc7XG4gICAgICAgIHRoaXMubWV0YSA9IG1ldGE7XG4gICAgfVxuXG4gICAgZ2V0U3RhdGUoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5zdGF0ZSkpO1xuICAgIH1cblxuICAgIHVwZGF0ZVN0YXRlKG5ld1N0YXRlKSB7XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhuZXdTdGF0ZSkubGVuZ3RoKSB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuc3RhdGUsIG5ld1N0YXRlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHR1cm5JbnRvKHRhZzogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMudGFnID0gdGFnO1xuXG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGUoe30pO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGdldFNuYXBzaG90KCk6IElCcmlja1NuYXBzaG90IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkOiB0aGlzLmlkLFxuICAgICAgICAgICAgdGFnOiB0aGlzLnRhZyxcbiAgICAgICAgICAgIG1ldGE6IHRoaXMubWV0YSxcbiAgICAgICAgICAgIHN0YXRlOiB0aGlzLmdldFN0YXRlKClcbiAgICAgICAgfTtcbiAgICB9XG59XG4iXX0=