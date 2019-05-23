/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class SpotModel {
    /**
     * @param {?} instance
     */
    constructor(instance) {
        this.id = instance.id;
        this.instance = instance;
        this.updateInfo();
    }
    /**
     * @return {?}
     */
    updateInfo() {
        const { position, size, data } = this.instance.getInfo();
        this.data = data;
        this.size = size;
        this.position = position;
    }
    /**
     * @param {?} y
     * @return {?}
     */
    isCross13Line(y) {
        return (y > this.position.y) && (y < this.position.y + this.size.height);
    }
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    getMinimalDistanceToPoint(x, y) {
        /** @type {?} */
        let minimalDistance = null;
        // distances to horizontal lines
        /** @type {?} */
        const distanceToLine12 = Math.abs(this.position.y - y);
        /** @type {?} */
        const distanceToLine43 = Math.abs((this.position.y + this.size.height) - y);
        // distances to vertical lines
        /** @type {?} */
        const distanceToLine14 = Math.abs(this.position.x - x);
        /** @type {?} */
        const distanceToLine23 = Math.abs((this.position.x + this.size.width) - x);
        /** @type {?} */
        const minDistanceToHorizontalLine = Math.min.apply(null, [distanceToLine12, distanceToLine43]);
        /** @type {?} */
        const minDistanceToVerticalLine = Math.min.apply(null, [distanceToLine14, distanceToLine23]);
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
    }
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    getDistanceToTopLeftPoint(x, y) {
        /** @type {?} */
        const a = Math.abs(this.position.x - x);
        /** @type {?} */
        const b = Math.abs(this.position.y - y);
        return Math.sqrt(a * a + b * b);
    }
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    getDistanceToBottomLeftPoint(x, y) {
        /** @type {?} */
        const a = Math.abs(this.position.x - x);
        /** @type {?} */
        const b = Math.abs(this.position.y + this.size.height - y);
        return Math.sqrt(a * a + b * b);
    }
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    getDistanceToLeftCenterPoint(x, y) {
        /** @type {?} */
        const a = Math.abs(this.position.x - x);
        /** @type {?} */
        const b = Math.abs(this.position.y + (this.size.height / 2) - y);
        return Math.sqrt(a * a + b * b);
    }
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    isPointInsideSpot(x, y) {
        if ((x > this.position.x) && (x < this.position.x + this.size.width) &&
            (y > this.position.y) && (y < this.position.y + this.size.height)) {
            return true;
        }
        else {
            return false;
        }
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BvdC5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL21vZHVsZXMvcmFkYXIvc3BvdC5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBSUEsTUFBTSxPQUFPLFNBQVM7Ozs7SUFRbEIsWUFBWSxRQUF1QjtRQUMvQixJQUFJLENBQUMsRUFBRSxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFFekIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7Ozs7SUFFRCxVQUFVO2NBQ0EsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFO1FBRXRELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzdCLENBQUM7Ozs7O0lBRUQsYUFBYSxDQUFDLENBQUM7UUFDWCxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM3RSxDQUFDOzs7Ozs7SUFFRCx5QkFBeUIsQ0FBQyxDQUFTLEVBQUUsQ0FBUzs7WUFDdEMsZUFBZSxHQUFHLElBQUk7OztjQUdwQixnQkFBZ0IsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7Y0FDaEQsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElB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LElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7Ozs7SUFFRCxpQkFBaUIsQ0FBQyxDQUFTLEVBQUUsQ0FBUztRQUNsQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDaEUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ25FLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7YUFBTTtZQUNILE9BQU8sS0FBSyxDQUFDO1NBQ2hCO0lBQ0wsQ0FBQztDQUNKOzs7SUF4RkcsdUJBQVc7O0lBQ1gseUJBQVU7O0lBQ1YsNkJBQXdCOztJQUN4Qix5QkFBZ0I7Ozs7O0lBRWhCLDZCQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U3BvdERpcmVjdGl2ZX0gZnJvbSAnLi9kaXJlY3RpdmUvc3BvdC5kaXJlY3RpdmUnO1xuaW1wb3J0IHtJU3BvdFBvc2l0aW9uLCBJU3BvdFNpemV9IGZyb20gJy4vaW50ZXJmYWNlcy9kaXN0YW5jZS10by1zcG90LmludGVyZmFjZSc7XG5pbXBvcnQge1Nwb3RJZH0gZnJvbSAnLi9pbnRlcmZhY2VzL3Nwb3QtaWQudHlwZSc7XG5cbmV4cG9ydCBjbGFzcyBTcG90TW9kZWwge1xuICAgIGlkOiBTcG90SWQ7XG4gICAgZGF0YTogYW55O1xuICAgIHBvc2l0aW9uOiBJU3BvdFBvc2l0aW9uO1xuICAgIHNpemU6IElTcG90U2l6ZTtcblxuICAgIHByaXZhdGUgaW5zdGFuY2U6IFNwb3REaXJlY3RpdmU7XG5cbiAgICBjb25zdHJ1Y3RvcihpbnN0YW5jZTogU3BvdERpcmVjdGl2ZSkge1xuICAgICAgICB0aGlzLmlkID0gaW5zdGFuY2UuaWQ7XG4gICAgICAgIHRoaXMuaW5zdGFuY2UgPSBpbnN0YW5jZTtcblxuICAgICAgICB0aGlzLnVwZGF0ZUluZm8oKTtcbiAgICB9XG5cbiAgICB1cGRhdGVJbmZvKCkge1xuICAgICAgICBjb25zdCB7cG9zaXRpb24sIHNpemUsIGRhdGF9ID0gdGhpcy5pbnN0YW5jZS5nZXRJbmZvKCk7XG5cbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIH1cblxuICAgIGlzQ3Jvc3MxM0xpbmUoeSkge1xuICAgICAgICByZXR1cm4gKHkgPiB0aGlzLnBvc2l0aW9uLnkpICYmICh5IDwgdGhpcy5wb3NpdGlvbi55ICsgdGhpcy5zaXplLmhlaWdodCk7XG4gICAgfVxuXG4gICAgZ2V0TWluaW1hbERpc3RhbmNlVG9Qb2ludCh4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICAgICAgICBsZXQgbWluaW1hbERpc3RhbmNlID0gbnVsbDtcblxuICAgICAgICAvLyBkaXN0YW5jZXMgdG8gaG9yaXpvbnRhbCBsaW5lc1xuICAgICAgICBjb25zdCBkaXN0YW5jZVRvTGluZTEyID0gTWF0aC5hYnModGhpcy5wb3NpdGlvbi55IC0geSk7XG4gICAgICAgIGNvbnN0IGRpc3RhbmNlVG9MaW5lNDMgPSBNYXRoLmFicygodGhpcy5wb3NpdGlvbi55ICsgdGhpcy5zaXplLmhlaWdodCkgLSB5KTtcblxuICAgICAgICAvLyBkaXN0YW5jZXMgdG8gdmVydGljYWwgbGluZXNcbiAgICAgICAgY29uc3QgZGlzdGFuY2VUb0xpbmUxNCA9IE1hdGguYWJzKHRoaXMucG9zaXRpb24ueCAtIHgpO1xuICAgICAgICBjb25zdCBkaXN0YW5jZVRvTGluZTIzID0gTWF0aC5hYnMoKHRoaXMucG9zaXRpb24ueCArIHRoaXMuc2l6ZS53aWR0aCkgLSB4KTtcblxuICAgICAgICBjb25zdCBtaW5EaXN0YW5jZVRvSG9yaXpvbnRhbExpbmUgPSBNYXRoLm1pbi5hcHBseShudWxsLCBbZGlzdGFuY2VUb0xpbmUxMiwgZGlzdGFuY2VUb0xpbmU0M10pO1xuICAgICAgICBjb25zdCBtaW5EaXN0YW5jZVRvVmVydGljYWxMaW5lID0gTWF0aC5taW4uYXBwbHkobnVsbCwgW2Rpc3RhbmNlVG9MaW5lMTQsIGRpc3RhbmNlVG9MaW5lMjNdKTtcblxuICAgICAgICBpZiAoKHggPiB0aGlzLnBvc2l0aW9uLngpICYmICh4IDwgdGhpcy5wb3NpdGlvbi54ICsgdGhpcy5zaXplLndpZHRoKSkge1xuICAgICAgICAgICAgLy8gcG9pbnQgZGlyZWN0bHkgY3Jvc3MgdGhlIGJlYWNvblxuICAgICAgICAgICAgbWluaW1hbERpc3RhbmNlID0gbWluRGlzdGFuY2VUb0hvcml6b250YWxMaW5lO1xuICAgICAgICB9IGVsc2UgaWYgKCh5ID4gdGhpcy5wb3NpdGlvbi55KSAmJiAoeSA8IHRoaXMucG9zaXRpb24ueSArIHRoaXMuc2l6ZS5oZWlnaHQpKSB7XG4gICAgICAgICAgICAvLyBwb2ludCBkaXJlY3RseSBjcm9zcyB0aGUgYmVhY29uXG4gICAgICAgICAgICBtaW5pbWFsRGlzdGFuY2UgPSBtaW5EaXN0YW5jZVRvVmVydGljYWxMaW5lO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gcG9pbnQgZG9lc24ndCBjcm9zcyBiZWFjb24sIGNhbGN1bGF0ZSBzaG9ydGVzdCBkaXN0YW5jZSB0byBiZWFjb25cbiAgICAgICAgICAgIG1pbmltYWxEaXN0YW5jZSA9IE1hdGguc3FydChcbiAgICAgICAgICAgICAgICBtaW5EaXN0YW5jZVRvSG9yaXpvbnRhbExpbmUgKlxuICAgICAgICAgICAgICAgIG1pbkRpc3RhbmNlVG9Ib3Jpem9udGFsTGluZSArXG4gICAgICAgICAgICAgICAgbWluRGlzdGFuY2VUb1ZlcnRpY2FsTGluZSAqXG4gICAgICAgICAgICAgICAgbWluRGlzdGFuY2VUb1ZlcnRpY2FsTGluZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtaW5pbWFsRGlzdGFuY2U7XG4gICAgfVxuXG4gICAgZ2V0RGlzdGFuY2VUb1RvcExlZnRQb2ludCh4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICAgICAgICBjb25zdCBhID0gTWF0aC5hYnModGhpcy5wb3NpdGlvbi54IC0geCk7XG4gICAgICAgIGNvbnN0IGIgPSBNYXRoLmFicyh0aGlzLnBvc2l0aW9uLnkgLSB5KTtcblxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KGEgKiBhICsgYiAqIGIpO1xuICAgIH1cblxuICAgIGdldERpc3RhbmNlVG9Cb3R0b21MZWZ0UG9pbnQoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgYSA9IE1hdGguYWJzKHRoaXMucG9zaXRpb24ueCAtIHgpO1xuICAgICAgICBjb25zdCBiID0gTWF0aC5hYnModGhpcy5wb3NpdGlvbi55ICsgdGhpcy5zaXplLmhlaWdodCAtIHkpO1xuXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoYSAqIGEgKyBiICogYik7XG4gICAgfVxuXG4gICAgZ2V0RGlzdGFuY2VUb0xlZnRDZW50ZXJQb2ludCh4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICAgICAgICBjb25zdCBhID0gTWF0aC5hYnModGhpcy5wb3NpdGlvbi54IC0geCk7XG4gICAgICAgIGNvbnN0IGIgPSBNYXRoLmFicyh0aGlzLnBvc2l0aW9uLnkgKyAodGhpcy5zaXplLmhlaWdodCAvIDIpIC0geSk7XG5cbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChhICogYSArIGIgKiBiKTtcbiAgICB9XG5cbiAgICBpc1BvaW50SW5zaWRlU3BvdCh4OiBudW1iZXIsIHk6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoKHggPiB0aGlzLnBvc2l0aW9uLngpICYmICh4IDwgdGhpcy5wb3NpdGlvbi54ICsgdGhpcy5zaXplLndpZHRoKSAmJlxuICAgICAgICAgICAgKHkgPiB0aGlzLnBvc2l0aW9uLnkpICYmICh5IDwgdGhpcy5wb3NpdGlvbi55ICsgdGhpcy5zaXplLmhlaWdodCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19