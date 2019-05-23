/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StartWorkingEvent } from './events/start-working.event';
import { StopWorkingEvent } from './events/stop-working.event';
import { WorkInProgressEvent } from './events/work-in-progress.event';
export class TowCoordinator {
    constructor() {
        this.events = new Subject();
        // start track when slave start working
        this.isSlaveWorking = false;
        document.addEventListener('dragover', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            if (this.isSlaveWorking) {
                event.preventDefault();
                event.dataTransfer.dropEffect = 'move';
                this.slaveWorkProgress(event.clientX, event.clientY);
            }
        }));
    }
    /**
     * @param {?} id
     * @return {?}
     */
    slaveStartWorking(id) {
        this.isSlaveWorking = true;
        this.events.next(new StartWorkingEvent(id));
    }
    /**
     * @param {?} clientX
     * @param {?} clientY
     * @return {?}
     */
    slaveWorkProgress(clientX, clientY) {
        this.events.next(new WorkInProgressEvent({
            clientX,
            clientY
        }));
    }
    /**
     * @param {?} id
     * @return {?}
     */
    slaveStopWorking(id) {
        this.isSlaveWorking = false;
        this.events.next(new StopWorkingEvent(id));
    }
}
TowCoordinator.decorators = [
    { type: Injectable }
];
/** @nocollapse */
TowCoordinator.ctorParameters = () => [];
if (false) {
    /** @type {?} */
    TowCoordinator.prototype.events;
    /**
     * @type {?}
     * @private
     */
    TowCoordinator.prototype.isSlaveWorking;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG93LWNvb3JkaW5hdG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9tb2R1bGVzL3Rvdy90b3ctY29vcmRpbmF0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzdCLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBR3BFLE1BQU0sT0FBTyxjQUFjO0lBTXZCO1FBTEEsV0FBTSxHQUFpQixJQUFJLE9BQU8sRUFBRSxDQUFDOztRQUc3QixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUczQixRQUFRLENBQUMsZ0JBQWdCLENBQUMsVUFBVTs7OztRQUFFLENBQUMsS0FBZ0IsRUFBRSxFQUFFO1lBQ3ZELElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtnQkFDckIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUV2QixLQUFLLENBQUMsWUFBWSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7Z0JBRXZDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUN4RDtRQUNMLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7SUFFRCxpQkFBaUIsQ0FBQyxFQUFVO1FBQ3hCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBRTNCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDOzs7Ozs7SUFFRCxpQkFBaUIsQ0FBQyxPQUFlLEVBQUUsT0FBZTtRQUM5QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLG1CQUFtQixDQUFDO1lBQ3JDLE9BQU87WUFDUCxPQUFPO1NBQ1YsQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDOzs7OztJQUVELGdCQUFnQixDQUFDLEVBQUU7UUFDZixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUU1QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDL0MsQ0FBQzs7O1lBcENKLFVBQVU7Ozs7OztJQUVQLGdDQUFxQzs7Ozs7SUFHckMsd0NBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1N0YXJ0V29ya2luZ0V2ZW50fSBmcm9tICcuL2V2ZW50cy9zdGFydC13b3JraW5nLmV2ZW50JztcbmltcG9ydCB7U3RvcFdvcmtpbmdFdmVudH0gZnJvbSAnLi9ldmVudHMvc3RvcC13b3JraW5nLmV2ZW50JztcbmltcG9ydCB7V29ya0luUHJvZ3Jlc3NFdmVudH0gZnJvbSAnLi9ldmVudHMvd29yay1pbi1wcm9ncmVzcy5ldmVudCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUb3dDb29yZGluYXRvciB7XG4gICAgZXZlbnRzOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpO1xuXG4gICAgLy8gc3RhcnQgdHJhY2sgd2hlbiBzbGF2ZSBzdGFydCB3b3JraW5nXG4gICAgcHJpdmF0ZSBpc1NsYXZlV29ya2luZyA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgKGV2ZW50OiBEcmFnRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU2xhdmVXb3JraW5nKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ21vdmUnO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zbGF2ZVdvcmtQcm9ncmVzcyhldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2xhdmVTdGFydFdvcmtpbmcoaWQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLmlzU2xhdmVXb3JraW5nID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLmV2ZW50cy5uZXh0KG5ldyBTdGFydFdvcmtpbmdFdmVudChpZCkpO1xuICAgIH1cblxuICAgIHNsYXZlV29ya1Byb2dyZXNzKGNsaWVudFg6IG51bWJlciwgY2xpZW50WTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzLm5leHQobmV3IFdvcmtJblByb2dyZXNzRXZlbnQoe1xuICAgICAgICAgICAgY2xpZW50WCxcbiAgICAgICAgICAgIGNsaWVudFlcbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIHNsYXZlU3RvcFdvcmtpbmcoaWQpIHtcbiAgICAgICAgdGhpcy5pc1NsYXZlV29ya2luZyA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuZXZlbnRzLm5leHQobmV3IFN0b3BXb3JraW5nRXZlbnQoaWQpKTtcbiAgICB9XG59XG4iXX0=