/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class PickOutAreaModel {
    /**
     * @param {?} scrollableContainer
     * @param {?} x
     * @param {?} y
     * @param {?} overBrickId
     */
    constructor(scrollableContainer, x, y, overBrickId) {
        this.isPickOutProcessInitialized = false;
        this.minimumMoveDistance = 5;
        this.scrollableContainer = scrollableContainer;
        this.initialX = x;
        this.initialY = y;
        this.x = x;
        this.y = y;
        this.initialBrickId = overBrickId;
        this.currentBrickId = overBrickId;
    }
    /**
     * @return {?}
     */
    recalculatePositionAndSize() {
        /** @type {?} */
        const scrollContextRect = this.scrollableContainer.getBoundingClientRect();
        /** @type {?} */
        const pageX = this.previousClientX - scrollContextRect.left;
        /** @type {?} */
        const pageY = this.previousClientY - scrollContextRect.top + this.scrollableContainer.scrollTop;
        this.updatePickOutAreaPositionAndSize(pageX, pageY);
    }
    /**
     * @param {?} clientX
     * @param {?} clientY
     * @return {?}
     */
    updateCurrentClientPosition(clientX, clientY) {
        this.previousClientX = clientX;
        this.previousClientY = clientY;
        this.recalculatePositionAndSize();
    }
    /**
     * @param {?} brickId
     * @return {?}
     */
    updateCurrentBrickId(brickId) {
        this.currentBrickId = brickId;
    }
    /**
     * @return {?}
     */
    canInitiatePickOutProcess() {
        return this.isMouseMovedEnough() &&
            (!this.currentBrickId || this.currentBrickId !== this.initialBrickId);
    }
    /**
     * @return {?}
     */
    initiatePickOutProcess() {
        this.isPickOutProcessInitialized = true;
    }
    /**
     * @private
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    updatePickOutAreaPositionAndSize(x, y) {
        // update x position and width
        if (x < this.initialX) {
            this.width = this.initialX - x;
            this.x = x;
        }
        else {
            this.width = Math.abs(x - this.x);
        }
        // update y position and height
        if (y < this.initialY) {
            this.height = this.initialY - y;
            this.y = y;
        }
        else {
            this.height = Math.abs(y - this.y);
        }
        /** @type {?} */
        const scrollContextRect = this.scrollableContainer.getBoundingClientRect();
        this.clientX = scrollContextRect.left + this.x;
        this.clientY = scrollContextRect.top + this.y - this.scrollableContainer.scrollTop;
    }
    /**
     * @private
     * @return {?}
     */
    isMouseMovedEnough() {
        return this.width > this.minimumMoveDistance ||
            this.height > this.minimumMoveDistance;
    }
}
if (false) {
    /** @type {?} */
    PickOutAreaModel.prototype.initialBrickId;
    /** @type {?} */
    PickOutAreaModel.prototype.currentBrickId;
    /** @type {?} */
    PickOutAreaModel.prototype.initialX;
    /** @type {?} */
    PickOutAreaModel.prototype.initialY;
    /** @type {?} */
    PickOutAreaModel.prototype.previousClientX;
    /** @type {?} */
    PickOutAreaModel.prototype.previousClientY;
    /** @type {?} */
    PickOutAreaModel.prototype.x;
    /** @type {?} */
    PickOutAreaModel.prototype.y;
    /** @type {?} */
    PickOutAreaModel.prototype.clientX;
    /** @type {?} */
    PickOutAreaModel.prototype.clientY;
    /** @type {?} */
    PickOutAreaModel.prototype.width;
    /** @type {?} */
    PickOutAreaModel.prototype.height;
    /** @type {?} */
    PickOutAreaModel.prototype.isPickOutProcessInitialized;
    /** @type {?} */
    PickOutAreaModel.prototype.scrollableContainer;
    /**
     * @type {?}
     * @private
     */
    PickOutAreaModel.prototype.minimumMoveDistance;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGljay1vdXQtYXJlYS5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL21vZHVsZXMvcGljay1vdXQvcGljay1vdXQtYXJlYS9waWNrLW91dC1hcmVhLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNLE9BQU8sZ0JBQWdCOzs7Ozs7O0lBK0J6QixZQUFZLG1CQUFnQyxFQUNoQyxDQUFTLEVBQ1QsQ0FBUyxFQUNULFdBQW1CO1FBVC9CLGdDQUEyQixHQUFHLEtBQUssQ0FBQztRQUk1Qix3QkFBbUIsR0FBRyxDQUFDLENBQUM7UUFNNUIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLG1CQUFtQixDQUFDO1FBRS9DLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBRWxCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFWCxJQUFJLENBQUMsY0FBYyxHQUFHLFdBQVcsQ0FBQztRQUNsQyxJQUFJLENBQUMsY0FBYyxHQUFHLFdBQVcsQ0FBQztJQUN0QyxDQUFDOzs7O0lBRUQsMEJBQTBCOztjQUNoQixpQkFBaUIsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMscUJBQXFCLEVBQUU7O2NBRXBFLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxHQUFHLGlCQUFpQixDQUFDLElBQUk7O2NBQ3JELEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxHQUFHLGlCQUFpQixDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUztRQUUvRixJQUFJLENBQUMsZ0NBQWdDLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3hELENBQUM7Ozs7OztJQUVELDJCQUEyQixDQUFDLE9BQWUsRUFBRSxPQUFlO1FBQ3hELElBQUksQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDO1FBQy9CLElBQUksQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDO1FBRS9CLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO0lBQ3RDLENBQUM7Ozs7O0lBRUQsb0JBQW9CLENBQUMsT0FBZTtRQUNoQyxJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQztJQUNsQyxDQUFDOzs7O0lBRUQseUJBQXlCO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQzVCLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzlFLENBQUM7Ozs7SUFFRCxzQkFBc0I7UUFDbEIsSUFBSSxDQUFDLDJCQUEyQixHQUFHLElBQUksQ0FBQztJQUM1QyxDQUFDOzs7Ozs7O0lBRU8sZ0NBQWdDLENBQUMsQ0FBUyxFQUFFLENBQVM7UUFDekQsOEJBQThCO1FBQzlCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztZQUUvQixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNkO2FBQU07WUFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNyQztRQUVELCtCQUErQjtRQUMvQixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7WUFFaEMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDZDthQUFNO1lBQ0gsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEM7O2NBRUssaUJBQWlCLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLHFCQUFxQixFQUFFO1FBRTFFLElBQUksQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDO0lBQ3ZGLENBQUM7Ozs7O0lBRU8sa0JBQWtCO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsbUJBQW1CO1lBQ3hDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDO0lBQy9DLENBQUM7Q0FDSjs7O0lBdkdHLDBDQUF1Qjs7SUFDdkIsMENBQXVCOztJQUd2QixvQ0FBaUI7O0lBQ2pCLG9DQUFpQjs7SUFHakIsMkNBQXdCOztJQUN4QiwyQ0FBd0I7O0lBR3hCLDZCQUFVOztJQUNWLDZCQUFVOztJQUdWLG1DQUFnQjs7SUFDaEIsbUNBQWdCOztJQUdoQixpQ0FBYzs7SUFDZCxrQ0FBZTs7SUFFZix1REFBb0M7O0lBRXBDLCtDQUFpQzs7Ozs7SUFFakMsK0NBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFBpY2tPdXRBcmVhTW9kZWwge1xuICAgIC8vIGJyaWNrIGlkcyBhbGxvdyB0byBkZWZpbmUgc2hvdWxkIHdlIHJlbmRlciBhcmVhIGNvbXBvbmVudFxuICAgIGluaXRpYWxCcmlja0lkOiBzdHJpbmc7XG4gICAgY3VycmVudEJyaWNrSWQ6IHN0cmluZztcblxuICAgIC8vIGNhbGN1bGF0ZSBwaWNrIG91dCBhcmVhIHdpZHRoIGFuZCBoZWlnaHRcbiAgICBpbml0aWFsWDogbnVtYmVyO1xuICAgIGluaXRpYWxZOiBudW1iZXI7XG5cbiAgICAvLyBzdG9yZSBsYXN0IGNsaWVudCBYIGFuZCBZIHBvc2l0aW9uIGJlZm9yZSBzY3JvbGwgZXZlbnRcbiAgICBwcmV2aW91c0NsaWVudFg6IG51bWJlcjtcbiAgICBwcmV2aW91c0NsaWVudFk6IG51bWJlcjtcblxuICAgIC8vIGNvb3JkaW5hdGVzIGluc2lkZSBzY3JvbGxhYmxlIGNvbnRhaW5lclxuICAgIHg6IG51bWJlcjtcbiAgICB5OiBudW1iZXI7XG5cbiAgICAvLyBjb29yZGluYXRlcyByZWxhdGVkIHRvIHZpZXdwb3J0XG4gICAgY2xpZW50WDogbnVtYmVyO1xuICAgIGNsaWVudFk6IG51bWJlcjtcblxuICAgIC8vIHNpemUgb2YgcGljayBvdXQgYXJlYVxuICAgIHdpZHRoOiBudW1iZXI7XG4gICAgaGVpZ2h0OiBudW1iZXI7XG5cbiAgICBpc1BpY2tPdXRQcm9jZXNzSW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuICAgIHNjcm9sbGFibGVDb250YWluZXI6IEhUTUxFbGVtZW50O1xuXG4gICAgcHJpdmF0ZSBtaW5pbXVtTW92ZURpc3RhbmNlID0gNTtcblxuICAgIGNvbnN0cnVjdG9yKHNjcm9sbGFibGVDb250YWluZXI6IEhUTUxFbGVtZW50LFxuICAgICAgICAgICAgICAgIHg6IG51bWJlcixcbiAgICAgICAgICAgICAgICB5OiBudW1iZXIsXG4gICAgICAgICAgICAgICAgb3ZlckJyaWNrSWQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLnNjcm9sbGFibGVDb250YWluZXIgPSBzY3JvbGxhYmxlQ29udGFpbmVyO1xuXG4gICAgICAgIHRoaXMuaW5pdGlhbFggPSB4O1xuICAgICAgICB0aGlzLmluaXRpYWxZID0geTtcblxuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuXG4gICAgICAgIHRoaXMuaW5pdGlhbEJyaWNrSWQgPSBvdmVyQnJpY2tJZDtcbiAgICAgICAgdGhpcy5jdXJyZW50QnJpY2tJZCA9IG92ZXJCcmlja0lkO1xuICAgIH1cblxuICAgIHJlY2FsY3VsYXRlUG9zaXRpb25BbmRTaXplKCkge1xuICAgICAgICBjb25zdCBzY3JvbGxDb250ZXh0UmVjdCA9IHRoaXMuc2Nyb2xsYWJsZUNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICBjb25zdCBwYWdlWCA9IHRoaXMucHJldmlvdXNDbGllbnRYIC0gc2Nyb2xsQ29udGV4dFJlY3QubGVmdDtcbiAgICAgICAgY29uc3QgcGFnZVkgPSB0aGlzLnByZXZpb3VzQ2xpZW50WSAtIHNjcm9sbENvbnRleHRSZWN0LnRvcCArIHRoaXMuc2Nyb2xsYWJsZUNvbnRhaW5lci5zY3JvbGxUb3A7XG5cbiAgICAgICAgdGhpcy51cGRhdGVQaWNrT3V0QXJlYVBvc2l0aW9uQW5kU2l6ZShwYWdlWCwgcGFnZVkpO1xuICAgIH1cblxuICAgIHVwZGF0ZUN1cnJlbnRDbGllbnRQb3NpdGlvbihjbGllbnRYOiBudW1iZXIsIGNsaWVudFk6IG51bWJlcikge1xuICAgICAgICB0aGlzLnByZXZpb3VzQ2xpZW50WCA9IGNsaWVudFg7XG4gICAgICAgIHRoaXMucHJldmlvdXNDbGllbnRZID0gY2xpZW50WTtcblxuICAgICAgICB0aGlzLnJlY2FsY3VsYXRlUG9zaXRpb25BbmRTaXplKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlQ3VycmVudEJyaWNrSWQoYnJpY2tJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY3VycmVudEJyaWNrSWQgPSBicmlja0lkO1xuICAgIH1cblxuICAgIGNhbkluaXRpYXRlUGlja091dFByb2Nlc3MoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzTW91c2VNb3ZlZEVub3VnaCgpICYmXG4gICAgICAgICAgICAoIXRoaXMuY3VycmVudEJyaWNrSWQgfHwgdGhpcy5jdXJyZW50QnJpY2tJZCAhPT0gdGhpcy5pbml0aWFsQnJpY2tJZCk7XG4gICAgfVxuXG4gICAgaW5pdGlhdGVQaWNrT3V0UHJvY2VzcygpIHtcbiAgICAgICAgdGhpcy5pc1BpY2tPdXRQcm9jZXNzSW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlUGlja091dEFyZWFQb3NpdGlvbkFuZFNpemUoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICAgICAgLy8gdXBkYXRlIHggcG9zaXRpb24gYW5kIHdpZHRoXG4gICAgICAgIGlmICh4IDwgdGhpcy5pbml0aWFsWCkge1xuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuaW5pdGlhbFggLSB4O1xuXG4gICAgICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy53aWR0aCA9IE1hdGguYWJzKHggLSB0aGlzLngpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdXBkYXRlIHkgcG9zaXRpb24gYW5kIGhlaWdodFxuICAgICAgICBpZiAoeSA8IHRoaXMuaW5pdGlhbFkpIHtcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5pbml0aWFsWSAtIHk7XG5cbiAgICAgICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IE1hdGguYWJzKHkgLSB0aGlzLnkpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2Nyb2xsQ29udGV4dFJlY3QgPSB0aGlzLnNjcm9sbGFibGVDb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgdGhpcy5jbGllbnRYID0gc2Nyb2xsQ29udGV4dFJlY3QubGVmdCArIHRoaXMueDtcbiAgICAgICAgdGhpcy5jbGllbnRZID0gc2Nyb2xsQ29udGV4dFJlY3QudG9wICsgdGhpcy55IC0gdGhpcy5zY3JvbGxhYmxlQ29udGFpbmVyLnNjcm9sbFRvcDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzTW91c2VNb3ZlZEVub3VnaCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2lkdGggPiB0aGlzLm1pbmltdW1Nb3ZlRGlzdGFuY2UgfHxcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID4gdGhpcy5taW5pbXVtTW92ZURpc3RhbmNlO1xuICAgIH1cbn1cbiJdfQ==