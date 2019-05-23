/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { TowCoordinator } from '../tow-coordinator.service';
// Notify Tow Coordinator about drag operation
var TowSlaveDirective = /** @class */ (function () {
    function TowSlaveDirective(renderer2, el, towCoordinator) {
        this.renderer2 = renderer2;
        this.el = el;
        this.towCoordinator = towCoordinator;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    TowSlaveDirective.prototype.dragStart = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.dataTransfer.dropEffect = 'move';
        event.dataTransfer.setData('FAKE', JSON.stringify({}));
        this.towCoordinator.slaveStartWorking(this.id);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TowSlaveDirective.prototype.drag = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.dataTransfer.dropEffect = 'move';
    };
    /**
     * @param {?} e
     * @return {?}
     */
    TowSlaveDirective.prototype.dragEnd = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.towCoordinator.slaveStopWorking(this.id);
    };
    /**
     * @return {?}
     */
    TowSlaveDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.renderer2.setAttribute(this.el.nativeElement, 'draggable', 'true');
    };
    TowSlaveDirective.decorators = [
        { type: Directive, args: [{ selector: '[tow-slave]' },] }
    ];
    /** @nocollapse */
    TowSlaveDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef },
        { type: TowCoordinator }
    ]; };
    TowSlaveDirective.propDecorators = {
        id: [{ type: Input, args: ['tow-slave',] }],
        dragStart: [{ type: HostListener, args: ['dragstart', ['$event'],] }],
        drag: [{ type: HostListener, args: ['drag', ['$event'],] }],
        dragEnd: [{ type: HostListener, args: ['dragend', ['$event'],] }]
    };
    return TowSlaveDirective;
}());
export { TowSlaveDirective };
if (false) {
    /** @type {?} */
    TowSlaveDirective.prototype.id;
    /**
     * @type {?}
     * @private
     */
    TowSlaveDirective.prototype.renderer2;
    /**
     * @type {?}
     * @private
     */
    TowSlaveDirective.prototype.el;
    /**
     * @type {?}
     * @private
     */
    TowSlaveDirective.prototype.towCoordinator;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG93LXNsYXZlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL21vZHVsZXMvdG93L3Rvdy1zbGF2ZS90b3ctc2xhdmUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1RixPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sNEJBQTRCLENBQUM7O0FBRzFEO0lBSUksMkJBQW9CLFNBQW9CLEVBQ3BCLEVBQWMsRUFDZCxjQUE4QjtRQUY5QixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7SUFDbEQsQ0FBQzs7Ozs7SUFHRCxxQ0FBUzs7OztJQURULFVBQ1UsS0FBZ0I7UUFDdEIsS0FBSyxDQUFDLFlBQVksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO1FBRXZDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFdkQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbkQsQ0FBQzs7Ozs7SUFHRCxnQ0FBSTs7OztJQURKLFVBQ0ssS0FBZ0I7UUFDakIsS0FBSyxDQUFDLFlBQVksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO0lBQzNDLENBQUM7Ozs7O0lBR0QsbUNBQU87Ozs7SUFEUCxVQUNRLENBQUM7UUFDTCxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDbkIsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXBCLElBQUksQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2xELENBQUM7Ozs7SUFFRCxvQ0FBUTs7O0lBQVI7UUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDNUUsQ0FBQzs7Z0JBakNKLFNBQVMsU0FBQyxFQUFDLFFBQVEsRUFBRSxhQUFhLEVBQUM7Ozs7Z0JBSndCLFNBQVM7Z0JBQWxELFVBQVU7Z0JBQ3JCLGNBQWM7OztxQkFLakIsS0FBSyxTQUFDLFdBQVc7NEJBT2pCLFlBQVksU0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUM7dUJBU3BDLFlBQVksU0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUM7MEJBSy9CLFlBQVksU0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUM7O0lBV3ZDLHdCQUFDO0NBQUEsQUFsQ0QsSUFrQ0M7U0FqQ1ksaUJBQWlCOzs7SUFDMUIsK0JBQXVCOzs7OztJQUVYLHNDQUE0Qjs7Ozs7SUFDNUIsK0JBQXNCOzs7OztJQUN0QiwyQ0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25Jbml0LCBSZW5kZXJlcjJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtUb3dDb29yZGluYXRvcn0gZnJvbSAnLi4vdG93LWNvb3JkaW5hdG9yLnNlcnZpY2UnO1xuXG4vLyBOb3RpZnkgVG93IENvb3JkaW5hdG9yIGFib3V0IGRyYWcgb3BlcmF0aW9uXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ1t0b3ctc2xhdmVdJ30pXG5leHBvcnQgY2xhc3MgVG93U2xhdmVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgndG93LXNsYXZlJykgaWQ7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyMjogUmVuZGVyZXIyLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB0b3dDb29yZGluYXRvcjogVG93Q29vcmRpbmF0b3IpIHtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdkcmFnc3RhcnQnLCBbJyRldmVudCddKVxuICAgIGRyYWdTdGFydChldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ21vdmUnO1xuXG4gICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCdGQUtFJywgSlNPTi5zdHJpbmdpZnkoe30pKTtcblxuICAgICAgICB0aGlzLnRvd0Nvb3JkaW5hdG9yLnNsYXZlU3RhcnRXb3JraW5nKHRoaXMuaWQpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2RyYWcnLCBbJyRldmVudCddKVxuICAgIGRyYWcoZXZlbnQ6IERyYWdFdmVudCkge1xuICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdtb3ZlJztcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdkcmFnZW5kJywgWyckZXZlbnQnXSlcbiAgICBkcmFnRW5kKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIHRoaXMudG93Q29vcmRpbmF0b3Iuc2xhdmVTdG9wV29ya2luZyh0aGlzLmlkKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlcjIuc2V0QXR0cmlidXRlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2RyYWdnYWJsZScsICd0cnVlJyk7XG4gICAgfVxufVxuIl19