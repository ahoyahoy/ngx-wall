/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input } from '@angular/core';
import { RadarCoordinator } from '../radar-coordinator.service';
export class SpotDirective {
    /**
     * @param {?} radarCoordinator
     * @param {?} el
     */
    constructor(radarCoordinator, el) {
        this.radarCoordinator = radarCoordinator;
        this.el = el;
        this.id = String(Math.random());
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.radarCoordinator.register(this.id, this);
    }
    /**
     * @return {?}
     */
    getInfo() {
        return {
            id: this.id,
            data: this.getData(),
            size: this.getSize(),
            position: this.getPosition()
        };
    }
    /**
     * @return {?}
     */
    getData() {
        return this.spot;
    }
    /**
     * @return {?}
     */
    getSize() {
        return {
            width: this.el.nativeElement.offsetWidth,
            height: this.el.nativeElement.offsetHeight
        };
    }
    /**
     * @return {?}
     */
    getPosition() {
        /** @type {?} */
        const offsets = this.el.nativeElement.getBoundingClientRect();
        return {
            x: offsets.left,
            y: offsets.top
        };
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.radarCoordinator.unRegister(this.id);
    }
}
SpotDirective.decorators = [
    { type: Directive, args: [{
                selector: '[spot]'
            },] }
];
/** @nocollapse */
SpotDirective.ctorParameters = () => [
    { type: RadarCoordinator },
    { type: ElementRef }
];
SpotDirective.propDecorators = {
    spot: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    SpotDirective.prototype.spot;
    /** @type {?} */
    SpotDirective.prototype.id;
    /**
     * @type {?}
     * @private
     */
    SpotDirective.prototype.radarCoordinator;
    /**
     * @type {?}
     * @private
     */
    SpotDirective.prototype.el;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BvdC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9tb2R1bGVzL3JhZGFyL2RpcmVjdGl2ZS9zcG90LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFvQixNQUFNLGVBQWUsQ0FBQztBQUc5RSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUs5RCxNQUFNLE9BQU8sYUFBYTs7Ozs7SUFLdEIsWUFBb0IsZ0JBQWtDLEVBQ2xDLEVBQWM7UUFEZCxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLE9BQUUsR0FBRixFQUFFLENBQVk7UUFIbEMsT0FBRSxHQUFXLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUluQyxDQUFDOzs7O0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsRCxDQUFDOzs7O0lBRUQsT0FBTztRQUNILE9BQU87WUFDSCxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDWCxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNwQixJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNwQixRQUFRLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRTtTQUMvQixDQUFDO0lBQ04sQ0FBQzs7OztJQUVELE9BQU87UUFDSCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQzs7OztJQUVELE9BQU87UUFDSCxPQUFPO1lBQ0gsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFdBQVc7WUFDeEMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFlBQVk7U0FDN0MsQ0FBQztJQUNOLENBQUM7Ozs7SUFFRCxXQUFXOztjQUNELE9BQU8sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRTtRQUU3RCxPQUFPO1lBQ0gsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJO1lBQ2YsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxHQUFHO1NBQ2pCLENBQUM7SUFDTixDQUFDOzs7O0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzlDLENBQUM7OztZQS9DSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFFBQVE7YUFDckI7Ozs7WUFKTyxnQkFBZ0I7WUFITCxVQUFVOzs7bUJBU3hCLEtBQUs7Ozs7SUFBTiw2QkFBbUI7O0lBRW5CLDJCQUFtQzs7Ozs7SUFFdkIseUNBQTBDOzs7OztJQUMxQywyQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SVNwb3RJbmZvLCBJU3BvdFBvc2l0aW9uLCBJU3BvdFNpemV9IGZyb20gJy4uL2ludGVyZmFjZXMvZGlzdGFuY2UtdG8tc3BvdC5pbnRlcmZhY2UnO1xuaW1wb3J0IHtTcG90SWR9IGZyb20gJy4uL2ludGVyZmFjZXMvc3BvdC1pZC50eXBlJztcbmltcG9ydCB7UmFkYXJDb29yZGluYXRvcn0gZnJvbSAnLi4vcmFkYXItY29vcmRpbmF0b3Iuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3Nwb3RdJ1xufSlcbmV4cG9ydCBjbGFzcyBTcG90RGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpIHNwb3Q6IGFueTtcblxuICAgIGlkOiBTcG90SWQgPSBTdHJpbmcoTWF0aC5yYW5kb20oKSk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJhZGFyQ29vcmRpbmF0b3I6IFJhZGFyQ29vcmRpbmF0b3IsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZikge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnJhZGFyQ29vcmRpbmF0b3IucmVnaXN0ZXIodGhpcy5pZCwgdGhpcyk7XG4gICAgfVxuXG4gICAgZ2V0SW5mbygpOiBJU3BvdEluZm8ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICAgICAgICBkYXRhOiB0aGlzLmdldERhdGEoKSxcbiAgICAgICAgICAgIHNpemU6IHRoaXMuZ2V0U2l6ZSgpLFxuICAgICAgICAgICAgcG9zaXRpb246IHRoaXMuZ2V0UG9zaXRpb24oKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdldERhdGEoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3BvdDtcbiAgICB9XG5cbiAgICBnZXRTaXplKCk6IElTcG90U2l6ZSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0UG9zaXRpb24oKTogSVNwb3RQb3NpdGlvbiB7XG4gICAgICAgIGNvbnN0IG9mZnNldHMgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IG9mZnNldHMubGVmdCxcbiAgICAgICAgICAgIHk6IG9mZnNldHMudG9wXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMucmFkYXJDb29yZGluYXRvci51blJlZ2lzdGVyKHRoaXMuaWQpO1xuICAgIH1cbn1cbiJdfQ==