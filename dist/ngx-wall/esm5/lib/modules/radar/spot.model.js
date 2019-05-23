/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SpotModel = /** @class */ (function () {
    function SpotModel(instance) {
        this.id = instance.id;
        this.instance = instance;
        this.updateInfo();
    }
    /**
     * @return {?}
     */
    SpotModel.prototype.updateInfo = /**
     * @return {?}
     */
    function () {
        var _a = this.instance.getInfo(), position = _a.position, size = _a.size, data = _a.data;
        this.data = data;
        this.size = size;
        this.position = position;
    };
    /**
     * @param {?} y
     * @return {?}
     */
    SpotModel.prototype.isCross13Line = /**
     * @param {?} y
     * @return {?}
     */
    function (y) {
        return (y > this.position.y) && (y < this.position.y + this.size.height);
    };
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    SpotModel.prototype.getMinimalDistanceToPoint = /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    function (x, y) {
        /** @type {?} */
        var minimalDistance = null;
        // distances to horizontal lines
        /** @type {?} */
        var distanceToLine12 = Math.abs(this.position.y - y);
        /** @type {?} */
        var distanceToLine43 = Math.abs((this.position.y + this.size.height) - y);
        // distances to vertical lines
        /** @type {?} */
        var distanceToLine14 = Math.abs(this.position.x - x);
        /** @type {?} */
        var distanceToLine23 = Math.abs((this.position.x + this.size.width) - x);
        /** @type {?} */
        var minDistanceToHorizontalLine = Math.min.apply(null, [distanceToLine12, distanceToLine43]);
        /** @type {?} */
        var minDistanceToVerticalLine = Math.min.apply(null, [distanceToLine14, distanceToLine23]);
        if ((x > this.position.x) && (x < this.position.x + this.size.width)) {
            // point directly cross the beacon
            minimalDistance = minDistanceToHorizontalLine;
        }
        else if ((y > this.position.y) && (y < this.position.y + this.size.height)) {
            // point directly cross the beacon
            minimalDistance = minDistanceToVerticalLine;
        }
        else {
            // point doesn't cross beacon, calculate shortest distance to beacon
            minimalDistance = Math.sqrt(minDistanceToHorizontalLine *
                minDistanceToHorizontalLine +
                minDistanceToVerticalLine *
                    minDistanceToVerticalLine);
        }
        return minimalDistance;
    };
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    SpotModel.prototype.getDistanceToTopLeftPoint = /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    function (x, y) {
        /** @type {?} */
        var a = Math.abs(this.position.x - x);
        /** @type {?} */
        var b = Math.abs(this.position.y - y);
        return Math.sqrt(a * a + b * b);
    };
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    SpotModel.prototype.getDistanceToBottomLeftPoint = /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    function (x, y) {
        /** @type {?} */
        var a = Math.abs(this.position.x - x);
        /** @type {?} */
        var b = Math.abs(this.position.y + this.size.height - y);
        return Math.sqrt(a * a + b * b);
    };
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    SpotModel.prototype.getDistanceToLeftCenterPoint = /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    function (x, y) {
        /** @type {?} */
        var a = Math.abs(this.position.x - x);
        /** @type {?} */
        var b = Math.abs(this.position.y + (this.size.height / 2) - y);
        return Math.sqrt(a * a + b * b);
    };
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    SpotModel.prototype.isPointInsideSpot = /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    function (x, y) {
        if ((x > this.position.x) && (x < this.position.x + this.size.width) &&
            (y > this.position.y) && (y < this.position.y + this.size.height)) {
            return true;
        }
        else {
            return false;
        }
    };
    return SpotModel;
}());
export { SpotModel };
if (false) {
    /** @type {?} */
    SpotModel.prototype.id;
    /** @type {?} */
    SpotModel.prototype.data;
    /** @type {?} */
    SpotModel.prototype.position;
    /** @type {?} */
    SpotModel.prototype.size;
    /**
     * @type {?}
     * @private
     */
    SpotModel.prototype.instance;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BvdC5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL21vZHVsZXMvcmFkYXIvc3BvdC5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBSUE7SUFRSSxtQkFBWSxRQUF1QjtRQUMvQixJQUFJLENBQUMsRUFBRSxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFFekIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7Ozs7SUFFRCw4QkFBVTs7O0lBQVY7UUFDVSxJQUFBLDRCQUFnRCxFQUEvQyxzQkFBUSxFQUFFLGNBQUksRUFBRSxjQUErQjtRQUV0RCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUM3QixDQUFDOzs7OztJQUVELGlDQUFhOzs7O0lBQWIsVUFBYyxDQUFDO1FBQ1gsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0UsQ0FBQzs7Ozs7O0lBRUQsNkNBQXlCOzs7OztJQUF6QixVQUEwQixDQUFTLEVBQUUsQ0FBUzs7WUFDdEMsZUFBZSxHQUFHLElBQUk7OztZQUdwQixnQkFBZ0IsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7WUFDaEQsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENB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RWhFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7Ozs7SUFFRCxxQ0FBaUI7Ozs7O0lBQWpCLFVBQWtCLENBQVMsRUFBRSxDQUFTO1FBQ2xDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNoRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDbkUsT0FBTyxJQUFJLENBQUM7U0FDZjthQUFNO1lBQ0gsT0FBTyxLQUFLLENBQUM7U0FDaEI7SUFDTCxDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQUFDLEFBekZELElBeUZDOzs7O0lBeEZHLHVCQUFXOztJQUNYLHlCQUFVOztJQUNWLDZCQUF3Qjs7SUFDeEIseUJBQWdCOzs7OztJQUVoQiw2QkFBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1Nwb3REaXJlY3RpdmV9IGZyb20gJy4vZGlyZWN0aXZlL3Nwb3QuZGlyZWN0aXZlJztcbmltcG9ydCB7SVNwb3RQb3NpdGlvbiwgSVNwb3RTaXplfSBmcm9tICcuL2ludGVyZmFjZXMvZGlzdGFuY2UtdG8tc3BvdC5pbnRlcmZhY2UnO1xuaW1wb3J0IHtTcG90SWR9IGZyb20gJy4vaW50ZXJmYWNlcy9zcG90LWlkLnR5cGUnO1xuXG5leHBvcnQgY2xhc3MgU3BvdE1vZGVsIHtcbiAgICBpZDogU3BvdElkO1xuICAgIGRhdGE6IGFueTtcbiAgICBwb3NpdGlvbjogSVNwb3RQb3NpdGlvbjtcbiAgICBzaXplOiBJU3BvdFNpemU7XG5cbiAgICBwcml2YXRlIGluc3RhbmNlOiBTcG90RGlyZWN0aXZlO1xuXG4gICAgY29uc3RydWN0b3IoaW5zdGFuY2U6IFNwb3REaXJlY3RpdmUpIHtcbiAgICAgICAgdGhpcy5pZCA9IGluc3RhbmNlLmlkO1xuICAgICAgICB0aGlzLmluc3RhbmNlID0gaW5zdGFuY2U7XG5cbiAgICAgICAgdGhpcy51cGRhdGVJbmZvKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlSW5mbygpIHtcbiAgICAgICAgY29uc3Qge3Bvc2l0aW9uLCBzaXplLCBkYXRhfSA9IHRoaXMuaW5zdGFuY2UuZ2V0SW5mbygpO1xuXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICB9XG5cbiAgICBpc0Nyb3NzMTNMaW5lKHkpIHtcbiAgICAgICAgcmV0dXJuICh5ID4gdGhpcy5wb3NpdGlvbi55KSAmJiAoeSA8IHRoaXMucG9zaXRpb24ueSArIHRoaXMuc2l6ZS5oZWlnaHQpO1xuICAgIH1cblxuICAgIGdldE1pbmltYWxEaXN0YW5jZVRvUG9pbnQoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICAgICAgbGV0IG1pbmltYWxEaXN0YW5jZSA9IG51bGw7XG5cbiAgICAgICAgLy8gZGlzdGFuY2VzIHRvIGhvcml6b250YWwgbGluZXNcbiAgICAgICAgY29uc3QgZGlzdGFuY2VUb0xpbmUxMiA9IE1hdGguYWJzKHRoaXMucG9zaXRpb24ueSAtIHkpO1xuICAgICAgICBjb25zdCBkaXN0YW5jZVRvTGluZTQzID0gTWF0aC5hYnMoKHRoaXMucG9zaXRpb24ueSArIHRoaXMuc2l6ZS5oZWlnaHQpIC0geSk7XG5cbiAgICAgICAgLy8gZGlzdGFuY2VzIHRvIHZlcnRpY2FsIGxpbmVzXG4gICAgICAgIGNvbnN0IGRpc3RhbmNlVG9MaW5lMTQgPSBNYXRoLmFicyh0aGlzLnBvc2l0aW9uLnggLSB4KTtcbiAgICAgICAgY29uc3QgZGlzdGFuY2VUb0xpbmUyMyA9IE1hdGguYWJzKCh0aGlzLnBvc2l0aW9uLnggKyB0aGlzLnNpemUud2lkdGgpIC0geCk7XG5cbiAgICAgICAgY29uc3QgbWluRGlzdGFuY2VUb0hvcml6b250YWxMaW5lID0gTWF0aC5taW4uYXBwbHkobnVsbCwgW2Rpc3RhbmNlVG9MaW5lMTIsIGRpc3RhbmNlVG9MaW5lNDNdKTtcbiAgICAgICAgY29uc3QgbWluRGlzdGFuY2VUb1ZlcnRpY2FsTGluZSA9IE1hdGgubWluLmFwcGx5KG51bGwsIFtkaXN0YW5jZVRvTGluZTE0LCBkaXN0YW5jZVRvTGluZTIzXSk7XG5cbiAgICAgICAgaWYgKCh4ID4gdGhpcy5wb3NpdGlvbi54KSAmJiAoeCA8IHRoaXMucG9zaXRpb24ueCArIHRoaXMuc2l6ZS53aWR0aCkpIHtcbiAgICAgICAgICAgIC8vIHBvaW50IGRpcmVjdGx5IGNyb3NzIHRoZSBiZWFjb25cbiAgICAgICAgICAgIG1pbmltYWxEaXN0YW5jZSA9IG1pbkRpc3RhbmNlVG9Ib3Jpem9udGFsTGluZTtcbiAgICAgICAgfSBlbHNlIGlmICgoeSA+IHRoaXMucG9zaXRpb24ueSkgJiYgKHkgPCB0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLnNpemUuaGVpZ2h0KSkge1xuICAgICAgICAgICAgLy8gcG9pbnQgZGlyZWN0bHkgY3Jvc3MgdGhlIGJlYWNvblxuICAgICAgICAgICAgbWluaW1hbERpc3RhbmNlID0gbWluRGlzdGFuY2VUb1ZlcnRpY2FsTGluZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHBvaW50IGRvZXNuJ3QgY3Jvc3MgYmVhY29uLCBjYWxjdWxhdGUgc2hvcnRlc3QgZGlzdGFuY2UgdG8gYmVhY29uXG4gICAgICAgICAgICBtaW5pbWFsRGlzdGFuY2UgPSBNYXRoLnNxcnQoXG4gICAgICAgICAgICAgICAgbWluRGlzdGFuY2VUb0hvcml6b250YWxMaW5lICpcbiAgICAgICAgICAgICAgICBtaW5EaXN0YW5jZVRvSG9yaXpvbnRhbExpbmUgK1xuICAgICAgICAgICAgICAgIG1pbkRpc3RhbmNlVG9WZXJ0aWNhbExpbmUgKlxuICAgICAgICAgICAgICAgIG1pbkRpc3RhbmNlVG9WZXJ0aWNhbExpbmVcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbWluaW1hbERpc3RhbmNlO1xuICAgIH1cblxuICAgIGdldERpc3RhbmNlVG9Ub3BMZWZ0UG9pbnQoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgYSA9IE1hdGguYWJzKHRoaXMucG9zaXRpb24ueCAtIHgpO1xuICAgICAgICBjb25zdCBiID0gTWF0aC5hYnModGhpcy5wb3NpdGlvbi55IC0geSk7XG5cbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChhICogYSArIGIgKiBiKTtcbiAgICB9XG5cbiAgICBnZXREaXN0YW5jZVRvQm90dG9tTGVmdFBvaW50KHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGEgPSBNYXRoLmFicyh0aGlzLnBvc2l0aW9uLnggLSB4KTtcbiAgICAgICAgY29uc3QgYiA9IE1hdGguYWJzKHRoaXMucG9zaXRpb24ueSArIHRoaXMuc2l6ZS5oZWlnaHQgLSB5KTtcblxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KGEgKiBhICsgYiAqIGIpO1xuICAgIH1cblxuICAgIGdldERpc3RhbmNlVG9MZWZ0Q2VudGVyUG9pbnQoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgYSA9IE1hdGguYWJzKHRoaXMucG9zaXRpb24ueCAtIHgpO1xuICAgICAgICBjb25zdCBiID0gTWF0aC5hYnModGhpcy5wb3NpdGlvbi55ICsgKHRoaXMuc2l6ZS5oZWlnaHQgLyAyKSAtIHkpO1xuXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoYSAqIGEgKyBiICogYik7XG4gICAgfVxuXG4gICAgaXNQb2ludEluc2lkZVNwb3QoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKCh4ID4gdGhpcy5wb3NpdGlvbi54KSAmJiAoeCA8IHRoaXMucG9zaXRpb24ueCArIHRoaXMuc2l6ZS53aWR0aCkgJiZcbiAgICAgICAgICAgICh5ID4gdGhpcy5wb3NpdGlvbi55KSAmJiAoeSA8IHRoaXMucG9zaXRpb24ueSArIHRoaXMuc2l6ZS5oZWlnaHQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==