/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var WallBrick = /** @class */ (function () {
    function WallBrick(id, tag, meta) {
        this.state = {};
        this.id = id;
        this.tag = tag;
        this.meta = meta;
    }
    /**
     * @return {?}
     */
    WallBrick.prototype.getState = /**
     * @return {?}
     */
    function () {
        return JSON.parse(JSON.stringify(this.state));
    };
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} newState
     * @return {THIS}
     */
    WallBrick.prototype.updateState = /**
     * @template THIS
     * @this {THIS}
     * @param {?} newState
     * @return {THIS}
     */
    function (newState) {
        if (Object.keys(newState).length) {
            Object.assign((/** @type {?} */ (this)).state, newState);
        }
        else {
            (/** @type {?} */ (this)).state = {};
        }
        return (/** @type {?} */ (this));
    };
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} tag
     * @return {THIS}
     */
    WallBrick.prototype.turnInto = /**
     * @template THIS
     * @this {THIS}
     * @param {?} tag
     * @return {THIS}
     */
    function (tag) {
        (/** @type {?} */ (this)).tag = tag;
        (/** @type {?} */ (this)).updateState({});
        return (/** @type {?} */ (this));
    };
    /**
     * @return {?}
     */
    WallBrick.prototype.getSnapshot = /**
     * @return {?}
     */
    function () {
        return {
            id: this.id,
            tag: this.tag,
            meta: this.meta,
            state: this.getState()
        };
    };
    return WallBrick;
}());
export { WallBrick };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbC1icmljay5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL3dhbGwvbW9kZWwvd2FsbC1icmljay5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUE7SUFNSSxtQkFBWSxFQUFVLEVBQUUsR0FBVyxFQUFFLElBQVM7UUFGOUMsVUFBSyxHQUFRLEVBQUUsQ0FBQztRQUdaLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDOzs7O0lBRUQsNEJBQVE7OztJQUFSO1FBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDbEQsQ0FBQzs7Ozs7OztJQUVELCtCQUFXOzs7Ozs7SUFBWCxVQUFZLFFBQVE7UUFDaEIsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRTtZQUM5QixNQUFNLENBQUMsTUFBTSxDQUFDLG1CQUFBLElBQUksRUFBQSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztTQUN2QzthQUFNO1lBQ0gsbUJBQUEsSUFBSSxFQUFBLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztTQUNuQjtRQUVELE9BQU8sbUJBQUEsSUFBSSxFQUFBLENBQUM7SUFDaEIsQ0FBQzs7Ozs7OztJQUVELDRCQUFROzs7Ozs7SUFBUixVQUFTLEdBQVc7UUFDaEIsbUJBQUEsSUFBSSxFQUFBLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUVmLG1CQUFBLElBQUksRUFBQSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVyQixPQUFPLG1CQUFBLElBQUksRUFBQSxDQUFDO0lBQ2hCLENBQUM7Ozs7SUFFRCwrQkFBVzs7O0lBQVg7UUFDSSxPQUFPO1lBQ0gsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ1gsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO1lBQ2IsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUU7U0FDekIsQ0FBQztJQUNOLENBQUM7SUFDTCxnQkFBQztBQUFELENBQUMsQUExQ0QsSUEwQ0M7Ozs7SUF6Q0csdUJBQVc7O0lBQ1gsd0JBQVk7O0lBQ1oseUJBQVU7O0lBQ1YsMEJBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJQnJpY2tTbmFwc2hvdH0gZnJvbSAnLi9pbnRlcmZhY2VzL2JyaWNrLXNuYXBzaG90LmludGVyZmFjZSc7XG5cbmV4cG9ydCBjbGFzcyBXYWxsQnJpY2sge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdGFnOiBzdHJpbmc7XG4gICAgbWV0YTogYW55O1xuICAgIHN0YXRlOiBhbnkgPSB7fTtcblxuICAgIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcsIHRhZzogc3RyaW5nLCBtZXRhOiBhbnkpIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLnRhZyA9IHRhZztcbiAgICAgICAgdGhpcy5tZXRhID0gbWV0YTtcbiAgICB9XG5cbiAgICBnZXRTdGF0ZSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlKSk7XG4gICAgfVxuXG4gICAgdXBkYXRlU3RhdGUobmV3U3RhdGUpIHtcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKG5ld1N0YXRlKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5zdGF0ZSwgbmV3U3RhdGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdHVybkludG8odGFnOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy50YWcgPSB0YWc7XG5cbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSh7fSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZ2V0U25hcHNob3QoKTogSUJyaWNrU25hcHNob3Qge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICAgICAgICB0YWc6IHRoaXMudGFnLFxuICAgICAgICAgICAgbWV0YTogdGhpcy5tZXRhLFxuICAgICAgICAgICAgc3RhdGU6IHRoaXMuZ2V0U3RhdGUoKVxuICAgICAgICB9O1xuICAgIH1cbn1cbiJdfQ==