/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StartWorkingEvent } from './events/start-working.event';
import { StopWorkingEvent } from './events/stop-working.event';
import { WorkInProgressEvent } from './events/work-in-progress.event';
var TowCoordinator = /** @class */ (function () {
    function TowCoordinator() {
        var _this = this;
        this.events = new Subject();
        // start track when slave start working
        this.isSlaveWorking = false;
        document.addEventListener('dragover', function (event) {
            if (_this.isSlaveWorking) {
                event.preventDefault();
                event.dataTransfer.dropEffect = 'move';
                _this.slaveWorkProgress(event.clientX, event.clientY);
            }
        });
    }
    /**
     * @param {?} id
     * @return {?}
     */
    TowCoordinator.prototype.slaveStartWorking = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        this.isSlaveWorking = true;
        this.events.next(new StartWorkingEvent(id));
    };
    /**
     * @param {?} clientX
     * @param {?} clientY
     * @return {?}
     */
    TowCoordinator.prototype.slaveWorkProgress = /**
     * @param {?} clientX
     * @param {?} clientY
     * @return {?}
     */
    function (clientX, clientY) {
        this.events.next(new WorkInProgressEvent({
            clientX: clientX,
            clientY: clientY
        }));
    };
    /**
     * @param {?} id
     * @return {?}
     */
    TowCoordinator.prototype.slaveStopWorking = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        this.isSlaveWorking = false;
        this.events.next(new StopWorkingEvent(id));
    };
    TowCoordinator.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    TowCoordinator.ctorParameters = function () { return []; };
    return TowCoordinator;
}());
export { TowCoordinator };
if (false) {
    /** @type {?} */
    TowCoordinator.prototype.events;
    /**
     * @type {?}
     * @private
     */
    TowCoordinator.prototype.isSlaveWorking;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG93LWNvb3JkaW5hdG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9tb2R1bGVzL3Rvdy90b3ctY29vcmRpbmF0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzdCLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBRXBFO0lBT0k7UUFBQSxpQkFVQztRQWZELFdBQU0sR0FBaUIsSUFBSSxPQUFPLEVBQUUsQ0FBQzs7UUFHN0IsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFHM0IsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxVQUFDLEtBQWdCO1lBQ25ELElBQUksS0FBSSxDQUFDLGNBQWMsRUFBRTtnQkFDckIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUV2QixLQUFLLENBQUMsWUFBWSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7Z0JBRXZDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUN4RDtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7SUFFRCwwQ0FBaUI7Ozs7SUFBakIsVUFBa0IsRUFBVTtRQUN4QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztRQUUzQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7Ozs7O0lBRUQsMENBQWlCOzs7OztJQUFqQixVQUFrQixPQUFlLEVBQUUsT0FBZTtRQUM5QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLG1CQUFtQixDQUFDO1lBQ3JDLE9BQU8sU0FBQTtZQUNQLE9BQU8sU0FBQTtTQUNWLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQzs7Ozs7SUFFRCx5Q0FBZ0I7Ozs7SUFBaEIsVUFBaUIsRUFBRTtRQUNmLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBRTVCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMvQyxDQUFDOztnQkFwQ0osVUFBVTs7OztJQXFDWCxxQkFBQztDQUFBLEFBckNELElBcUNDO1NBcENZLGNBQWM7OztJQUN2QixnQ0FBcUM7Ozs7O0lBR3JDLHdDQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtTdGFydFdvcmtpbmdFdmVudH0gZnJvbSAnLi9ldmVudHMvc3RhcnQtd29ya2luZy5ldmVudCc7XG5pbXBvcnQge1N0b3BXb3JraW5nRXZlbnR9IGZyb20gJy4vZXZlbnRzL3N0b3Atd29ya2luZy5ldmVudCc7XG5pbXBvcnQge1dvcmtJblByb2dyZXNzRXZlbnR9IGZyb20gJy4vZXZlbnRzL3dvcmstaW4tcHJvZ3Jlc3MuZXZlbnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVG93Q29vcmRpbmF0b3Ige1xuICAgIGV2ZW50czogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcblxuICAgIC8vIHN0YXJ0IHRyYWNrIHdoZW4gc2xhdmUgc3RhcnQgd29ya2luZ1xuICAgIHByaXZhdGUgaXNTbGF2ZVdvcmtpbmcgPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIChldmVudDogRHJhZ0V2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1NsYXZlV29ya2luZykge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdtb3ZlJztcblxuICAgICAgICAgICAgICAgIHRoaXMuc2xhdmVXb3JrUHJvZ3Jlc3MoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNsYXZlU3RhcnRXb3JraW5nKGlkOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5pc1NsYXZlV29ya2luZyA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5ldmVudHMubmV4dChuZXcgU3RhcnRXb3JraW5nRXZlbnQoaWQpKTtcbiAgICB9XG5cbiAgICBzbGF2ZVdvcmtQcm9ncmVzcyhjbGllbnRYOiBudW1iZXIsIGNsaWVudFk6IG51bWJlcikge1xuICAgICAgICB0aGlzLmV2ZW50cy5uZXh0KG5ldyBXb3JrSW5Qcm9ncmVzc0V2ZW50KHtcbiAgICAgICAgICAgIGNsaWVudFgsXG4gICAgICAgICAgICBjbGllbnRZXG4gICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBzbGF2ZVN0b3BXb3JraW5nKGlkKSB7XG4gICAgICAgIHRoaXMuaXNTbGF2ZVdvcmtpbmcgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLmV2ZW50cy5uZXh0KG5ldyBTdG9wV29ya2luZ0V2ZW50KGlkKSk7XG4gICAgfVxufVxuIl19