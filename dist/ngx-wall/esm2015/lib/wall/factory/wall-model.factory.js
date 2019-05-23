/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { WallCorePlugin } from '../plugins/core/wall-core.plugin';
import { WallModel } from '../model/wall.model';
import { BrickRegistry } from '../registry/brick-registry.service';
export class WallModelFactory {
    /**
     * @param {?} brickRegistry
     */
    constructor(brickRegistry) {
        this.brickRegistry = brickRegistry;
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    create(config) {
        /** @type {?} */
        const defaultConfig = {
            plan: {
                bricks: [],
                layout: {
                    bricks: []
                }
            },
            plugins: []
        };
        config = Object.assign({}, defaultConfig, config);
        // inject core plugin as initial first plugin
        // in this way factory will decouple WallModel from WallCorePlugin
        config.plugins.unshift(new WallCorePlugin(this.brickRegistry));
        /** @type {?} */
        const wallModel = new WallModel(this.brickRegistry, config);
        wallModel.api.core.setPlan(config.plan);
        return wallModel;
    }
}
WallModelFactory.decorators = [
    { type: Injectable }
];
/** @nocollapse */
WallModelFactory.ctorParameters = () => [
    { type: BrickRegistry }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    WallModelFactory.prototype.brickRegistry;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbC1tb2RlbC5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvd2FsbC9mYWN0b3J5L3dhbGwtbW9kZWwuZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDaEUsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQUtqRSxNQUFNLE9BQU8sZ0JBQWdCOzs7O0lBQ3pCLFlBQW9CLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBQ2hELENBQUM7Ozs7O0lBRUQsTUFBTSxDQUFDLE1BQXlCOztjQUN0QixhQUFhLEdBQUc7WUFDbEIsSUFBSSxFQUFFO2dCQUNGLE1BQU0sRUFBRSxFQUFFO2dCQUNWLE1BQU0sRUFBRTtvQkFDSixNQUFNLEVBQUUsRUFBRTtpQkFDYjthQUNKO1lBQ0QsT0FBTyxFQUFFLEVBQUU7U0FDZDtRQUVELE1BQU0scUJBQ0MsYUFBYSxFQUNiLE1BQU0sQ0FDWixDQUFDO1FBRUYsNkNBQTZDO1FBQzdDLGtFQUFrRTtRQUNsRSxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQzs7Y0FFekQsU0FBUyxHQUFHLElBQUksU0FBUyxDQUMzQixJQUFJLENBQUMsYUFBYSxFQUNsQixNQUFNLENBQ1Q7UUFFRCxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXhDLE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7OztZQWpDSixVQUFVOzs7O1lBSkgsYUFBYTs7Ozs7OztJQU1MLHlDQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1dhbGxDb3JlUGx1Z2lufSBmcm9tICcuLi9wbHVnaW5zL2NvcmUvd2FsbC1jb3JlLnBsdWdpbic7XG5pbXBvcnQge1dhbGxNb2RlbH0gZnJvbSAnLi4vbW9kZWwvd2FsbC5tb2RlbCc7XG5pbXBvcnQge0JyaWNrUmVnaXN0cnl9IGZyb20gJy4uL3JlZ2lzdHJ5L2JyaWNrLXJlZ2lzdHJ5LnNlcnZpY2UnO1xuaW1wb3J0IHtJV2FsbE1vZGVsfSBmcm9tICcuLi9tb2RlbC9pbnRlcmZhY2VzL3dhbGwtbW9kZWwuaW50ZXJmYWNlJztcbmltcG9ydCB7SVdhbGxNb2RlbENvbmZpZ30gZnJvbSAnLi4vbW9kZWwvaW50ZXJmYWNlcy93YWxsLW1vZGVsLWNvbmZpZy5pbnRlcmZhY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgV2FsbE1vZGVsRmFjdG9yeSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBicmlja1JlZ2lzdHJ5OiBCcmlja1JlZ2lzdHJ5KSB7XG4gICAgfVxuXG4gICAgY3JlYXRlKGNvbmZpZz86IElXYWxsTW9kZWxDb25maWcpOiBJV2FsbE1vZGVsIHtcbiAgICAgICAgY29uc3QgZGVmYXVsdENvbmZpZyA9IHtcbiAgICAgICAgICAgIHBsYW46IHtcbiAgICAgICAgICAgICAgICBicmlja3M6IFtdLFxuICAgICAgICAgICAgICAgIGxheW91dDoge1xuICAgICAgICAgICAgICAgICAgICBicmlja3M6IFtdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBsdWdpbnM6IFtdXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uZmlnID0ge1xuICAgICAgICAgICAgLi4uZGVmYXVsdENvbmZpZyxcbiAgICAgICAgICAgIC4uLmNvbmZpZ1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIGluamVjdCBjb3JlIHBsdWdpbiBhcyBpbml0aWFsIGZpcnN0IHBsdWdpblxuICAgICAgICAvLyBpbiB0aGlzIHdheSBmYWN0b3J5IHdpbGwgZGVjb3VwbGUgV2FsbE1vZGVsIGZyb20gV2FsbENvcmVQbHVnaW5cbiAgICAgICAgY29uZmlnLnBsdWdpbnMudW5zaGlmdChuZXcgV2FsbENvcmVQbHVnaW4odGhpcy5icmlja1JlZ2lzdHJ5KSk7XG5cbiAgICAgICAgY29uc3Qgd2FsbE1vZGVsID0gbmV3IFdhbGxNb2RlbChcbiAgICAgICAgICAgIHRoaXMuYnJpY2tSZWdpc3RyeSxcbiAgICAgICAgICAgIGNvbmZpZ1xuICAgICAgICApO1xuXG4gICAgICAgIHdhbGxNb2RlbC5hcGkuY29yZS5zZXRQbGFuKGNvbmZpZy5wbGFuKTtcblxuICAgICAgICByZXR1cm4gd2FsbE1vZGVsO1xuICAgIH1cbn1cbiJdfQ==