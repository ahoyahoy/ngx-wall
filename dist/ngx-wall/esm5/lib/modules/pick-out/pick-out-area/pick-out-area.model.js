/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PickOutAreaModel = /** @class */ (function () {
    function PickOutAreaModel(scrollableContainer, x, y, overBrickId) {
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
    PickOutAreaModel.prototype.recalculatePositionAndSize = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var scrollContextRect = this.scrollableContainer.getBoundingClientRect();
        /** @type {?} */
        var pageX = this.previousClientX - scrollContextRect.left;
        /** @type {?} */
        var pageY = this.previousClientY - scrollContextRect.top + this.scrollableContainer.scrollTop;
        this.updatePickOutAreaPositionAndSize(pageX, pageY);
    };
    /**
     * @param {?} clientX
     * @param {?} clientY
     * @return {?}
     */
    PickOutAreaModel.prototype.updateCurrentClientPosition = /**
     * @param {?} clientX
     * @param {?} clientY
     * @return {?}
     */
    function (clientX, clientY) {
        this.previousClientX = clientX;
        this.previousClientY = clientY;
        this.recalculatePositionAndSize();
    };
    /**
     * @param {?} brickId
     * @return {?}
     */
    PickOutAreaModel.prototype.updateCurrentBrickId = /**
     * @param {?} brickId
     * @return {?}
     */
    function (brickId) {
        this.currentBrickId = brickId;
    };
    /**
     * @return {?}
     */
    PickOutAreaModel.prototype.canInitiatePickOutProcess = /**
     * @return {?}
     */
    function () {
        return this.isMouseMovedEnough() &&
            (!this.currentBrickId || this.currentBrickId !== this.initialBrickId);
    };
    /**
     * @return {?}
     */
    PickOutAreaModel.prototype.initiatePickOutProcess = /**
     * @return {?}
     */
    function () {
        this.isPickOutProcessInitialized = true;
    };
    /**
     * @private
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    PickOutAreaModel.prototype.updatePickOutAreaPositionAndSize = /**
     * @private
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    function (x, y) {
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
        var scrollContextRect = this.scrollableContainer.getBoundingClientRect();
        this.clientX = scrollContextRect.left + this.x;
        this.clientY = scrollContextRect.top + this.y - this.scrollableContainer.scrollTop;
    };
    /**
     * @private
     * @return {?}
     */
    PickOutAreaModel.prototype.isMouseMovedEnough = /**
     * @private
     * @return {?}
     */
    function () {
        return this.width > this.minimumMoveDistance ||
            this.height > this.minimumMoveDistance;
    };
    return PickOutAreaModel;
}());
export { PickOutAreaModel };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGljay1vdXQtYXJlYS5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL21vZHVsZXMvcGljay1vdXQvcGljay1vdXQtYXJlYS9waWNrLW91dC1hcmVhLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtJQStCSSwwQkFBWSxtQkFBZ0MsRUFDaEMsQ0FBUyxFQUNULENBQVMsRUFDVCxXQUFtQjtRQVQvQixnQ0FBMkIsR0FBRyxLQUFLLENBQUM7UUFJNUIsd0JBQW1CLEdBQUcsQ0FBQyxDQUFDO1FBTTVCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQztRQUUvQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUVsQixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNYLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRVgsSUFBSSxDQUFDLGNBQWMsR0FBRyxXQUFXLENBQUM7UUFDbEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxXQUFXLENBQUM7SUFDdEMsQ0FBQzs7OztJQUVELHFEQUEwQjs7O0lBQTFCOztZQUNVLGlCQUFpQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxxQkFBcUIsRUFBRTs7WUFFcEUsS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLEdBQUcsaUJBQWlCLENBQUMsSUFBSTs7WUFDckQsS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTO1FBRS9GLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7Ozs7O0lBRUQsc0RBQTJCOzs7OztJQUEzQixVQUE0QixPQUFlLEVBQUUsT0FBZTtRQUN4RCxJQUFJLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQztRQUMvQixJQUFJLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQztRQUUvQixJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztJQUN0QyxDQUFDOzs7OztJQUVELCtDQUFvQjs7OztJQUFwQixVQUFxQixPQUFlO1FBQ2hDLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDO0lBQ2xDLENBQUM7Ozs7SUFFRCxvREFBeUI7OztJQUF6QjtRQUNJLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQzVCLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzlFLENBQUM7Ozs7SUFFRCxpREFBc0I7OztJQUF0QjtRQUNJLElBQUksQ0FBQywyQkFBMkIsR0FBRyxJQUFJLENBQUM7SUFDNUMsQ0FBQzs7Ozs7OztJQUVPLDJEQUFnQzs7Ozs7O0lBQXhDLFVBQXlDLENBQVMsRUFBRSxDQUFTO1FBQ3pELDhCQUE4QjtRQUM5QixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7WUFFL0IsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDZDthQUFNO1lBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDckM7UUFFRCwrQkFBK0I7UUFDL0IsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1lBRWhDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2Q7YUFBTTtZQUNILElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3RDOztZQUVLLGlCQUFpQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxxQkFBcUIsRUFBRTtRQUUxRSxJQUFJLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQztJQUN2RixDQUFDOzs7OztJQUVPLDZDQUFrQjs7OztJQUExQjtRQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsbUJBQW1CO1lBQ3hDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDO0lBQy9DLENBQUM7SUFDTCx1QkFBQztBQUFELENBQUMsQUF6R0QsSUF5R0M7Ozs7SUF2R0csMENBQXVCOztJQUN2QiwwQ0FBdUI7O0lBR3ZCLG9DQUFpQjs7SUFDakIsb0NBQWlCOztJQUdqQiwyQ0FBd0I7O0lBQ3hCLDJDQUF3Qjs7SUFHeEIsNkJBQVU7O0lBQ1YsNkJBQVU7O0lBR1YsbUNBQWdCOztJQUNoQixtQ0FBZ0I7O0lBR2hCLGlDQUFjOztJQUNkLGtDQUFlOztJQUVmLHVEQUFvQzs7SUFFcEMsK0NBQWlDOzs7OztJQUVqQywrQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgUGlja091dEFyZWFNb2RlbCB7XG4gICAgLy8gYnJpY2sgaWRzIGFsbG93IHRvIGRlZmluZSBzaG91bGQgd2UgcmVuZGVyIGFyZWEgY29tcG9uZW50XG4gICAgaW5pdGlhbEJyaWNrSWQ6IHN0cmluZztcbiAgICBjdXJyZW50QnJpY2tJZDogc3RyaW5nO1xuXG4gICAgLy8gY2FsY3VsYXRlIHBpY2sgb3V0IGFyZWEgd2lkdGggYW5kIGhlaWdodFxuICAgIGluaXRpYWxYOiBudW1iZXI7XG4gICAgaW5pdGlhbFk6IG51bWJlcjtcblxuICAgIC8vIHN0b3JlIGxhc3QgY2xpZW50IFggYW5kIFkgcG9zaXRpb24gYmVmb3JlIHNjcm9sbCBldmVudFxuICAgIHByZXZpb3VzQ2xpZW50WDogbnVtYmVyO1xuICAgIHByZXZpb3VzQ2xpZW50WTogbnVtYmVyO1xuXG4gICAgLy8gY29vcmRpbmF0ZXMgaW5zaWRlIHNjcm9sbGFibGUgY29udGFpbmVyXG4gICAgeDogbnVtYmVyO1xuICAgIHk6IG51bWJlcjtcblxuICAgIC8vIGNvb3JkaW5hdGVzIHJlbGF0ZWQgdG8gdmlld3BvcnRcbiAgICBjbGllbnRYOiBudW1iZXI7XG4gICAgY2xpZW50WTogbnVtYmVyO1xuXG4gICAgLy8gc2l6ZSBvZiBwaWNrIG91dCBhcmVhXG4gICAgd2lkdGg6IG51bWJlcjtcbiAgICBoZWlnaHQ6IG51bWJlcjtcblxuICAgIGlzUGlja091dFByb2Nlc3NJbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gICAgc2Nyb2xsYWJsZUNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XG5cbiAgICBwcml2YXRlIG1pbmltdW1Nb3ZlRGlzdGFuY2UgPSA1O1xuXG4gICAgY29uc3RydWN0b3Ioc2Nyb2xsYWJsZUNvbnRhaW5lcjogSFRNTEVsZW1lbnQsXG4gICAgICAgICAgICAgICAgeDogbnVtYmVyLFxuICAgICAgICAgICAgICAgIHk6IG51bWJlcixcbiAgICAgICAgICAgICAgICBvdmVyQnJpY2tJZDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsYWJsZUNvbnRhaW5lciA9IHNjcm9sbGFibGVDb250YWluZXI7XG5cbiAgICAgICAgdGhpcy5pbml0aWFsWCA9IHg7XG4gICAgICAgIHRoaXMuaW5pdGlhbFkgPSB5O1xuXG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG5cbiAgICAgICAgdGhpcy5pbml0aWFsQnJpY2tJZCA9IG92ZXJCcmlja0lkO1xuICAgICAgICB0aGlzLmN1cnJlbnRCcmlja0lkID0gb3ZlckJyaWNrSWQ7XG4gICAgfVxuXG4gICAgcmVjYWxjdWxhdGVQb3NpdGlvbkFuZFNpemUoKSB7XG4gICAgICAgIGNvbnN0IHNjcm9sbENvbnRleHRSZWN0ID0gdGhpcy5zY3JvbGxhYmxlQ29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIGNvbnN0IHBhZ2VYID0gdGhpcy5wcmV2aW91c0NsaWVudFggLSBzY3JvbGxDb250ZXh0UmVjdC5sZWZ0O1xuICAgICAgICBjb25zdCBwYWdlWSA9IHRoaXMucHJldmlvdXNDbGllbnRZIC0gc2Nyb2xsQ29udGV4dFJlY3QudG9wICsgdGhpcy5zY3JvbGxhYmxlQ29udGFpbmVyLnNjcm9sbFRvcDtcblxuICAgICAgICB0aGlzLnVwZGF0ZVBpY2tPdXRBcmVhUG9zaXRpb25BbmRTaXplKHBhZ2VYLCBwYWdlWSk7XG4gICAgfVxuXG4gICAgdXBkYXRlQ3VycmVudENsaWVudFBvc2l0aW9uKGNsaWVudFg6IG51bWJlciwgY2xpZW50WTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucHJldmlvdXNDbGllbnRYID0gY2xpZW50WDtcbiAgICAgICAgdGhpcy5wcmV2aW91c0NsaWVudFkgPSBjbGllbnRZO1xuXG4gICAgICAgIHRoaXMucmVjYWxjdWxhdGVQb3NpdGlvbkFuZFNpemUoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVDdXJyZW50QnJpY2tJZChicmlja0lkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jdXJyZW50QnJpY2tJZCA9IGJyaWNrSWQ7XG4gICAgfVxuXG4gICAgY2FuSW5pdGlhdGVQaWNrT3V0UHJvY2VzcygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNNb3VzZU1vdmVkRW5vdWdoKCkgJiZcbiAgICAgICAgICAgICghdGhpcy5jdXJyZW50QnJpY2tJZCB8fCB0aGlzLmN1cnJlbnRCcmlja0lkICE9PSB0aGlzLmluaXRpYWxCcmlja0lkKTtcbiAgICB9XG5cbiAgICBpbml0aWF0ZVBpY2tPdXRQcm9jZXNzKCkge1xuICAgICAgICB0aGlzLmlzUGlja091dFByb2Nlc3NJbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVQaWNrT3V0QXJlYVBvc2l0aW9uQW5kU2l6ZSh4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICAgICAgICAvLyB1cGRhdGUgeCBwb3NpdGlvbiBhbmQgd2lkdGhcbiAgICAgICAgaWYgKHggPCB0aGlzLmluaXRpYWxYKSB7XG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5pbml0aWFsWCAtIHg7XG5cbiAgICAgICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLndpZHRoID0gTWF0aC5hYnMoeCAtIHRoaXMueCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1cGRhdGUgeSBwb3NpdGlvbiBhbmQgaGVpZ2h0XG4gICAgICAgIGlmICh5IDwgdGhpcy5pbml0aWFsWSkge1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmluaXRpYWxZIC0geTtcblxuICAgICAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gTWF0aC5hYnMoeSAtIHRoaXMueSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzY3JvbGxDb250ZXh0UmVjdCA9IHRoaXMuc2Nyb2xsYWJsZUNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICB0aGlzLmNsaWVudFggPSBzY3JvbGxDb250ZXh0UmVjdC5sZWZ0ICsgdGhpcy54O1xuICAgICAgICB0aGlzLmNsaWVudFkgPSBzY3JvbGxDb250ZXh0UmVjdC50b3AgKyB0aGlzLnkgLSB0aGlzLnNjcm9sbGFibGVDb250YWluZXIuc2Nyb2xsVG9wO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNNb3VzZU1vdmVkRW5vdWdoKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy53aWR0aCA+IHRoaXMubWluaW11bU1vdmVEaXN0YW5jZSB8fFxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPiB0aGlzLm1pbmltdW1Nb3ZlRGlzdGFuY2U7XG4gICAgfVxufVxuIl19