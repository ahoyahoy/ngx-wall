/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { WallCorePlugin } from '../plugins/core/wall-core.plugin';
import { WallModel } from '../model/wall.model';
import { BrickRegistry } from '../registry/brick-registry.service';
var WallModelFactory = /** @class */ (function () {
    function WallModelFactory(brickRegistry) {
        this.brickRegistry = brickRegistry;
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    WallModelFactory.prototype.create = /**
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        /** @type {?} */
        var defaultConfig = {
            plan: {
                bricks: [],
                layout: {
                    bricks: []
                }
            },
            plugins: []
        };
        config = tslib_1.__assign({}, defaultConfig, config);
        // inject core plugin as initial first plugin
        // in this way factory will decouple WallModel from WallCorePlugin
        config.plugins.unshift(new WallCorePlugin(this.brickRegistry));
        /** @type {?} */
        var wallModel = new WallModel(this.brickRegistry, config);
        wallModel.api.core.setPlan(config.plan);
        return wallModel;
    };
    WallModelFactory.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    WallModelFactory.ctorParameters = function () { return [
        { type: BrickRegistry }
    ]; };
    return WallModelFactory;
}());
export { WallModelFactory };
if (false) {
    /**
     * @type {?}
     * @private
     */
    WallModelFactory.prototype.brickRegistry;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbC1tb2RlbC5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvd2FsbC9mYWN0b3J5L3dhbGwtbW9kZWwuZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQ2hFLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFJakU7SUFFSSwwQkFBb0IsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7SUFDaEQsQ0FBQzs7Ozs7SUFFRCxpQ0FBTTs7OztJQUFOLFVBQU8sTUFBeUI7O1lBQ3RCLGFBQWEsR0FBRztZQUNsQixJQUFJLEVBQUU7Z0JBQ0YsTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsTUFBTSxFQUFFO29CQUNKLE1BQU0sRUFBRSxFQUFFO2lCQUNiO2FBQ0o7WUFDRCxPQUFPLEVBQUUsRUFBRTtTQUNkO1FBRUQsTUFBTSx3QkFDQyxhQUFhLEVBQ2IsTUFBTSxDQUNaLENBQUM7UUFFRiw2Q0FBNkM7UUFDN0Msa0VBQWtFO1FBQ2xFLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDOztZQUV6RCxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQzNCLElBQUksQ0FBQyxhQUFhLEVBQ2xCLE1BQU0sQ0FDVDtRQUVELFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFeEMsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQzs7Z0JBakNKLFVBQVU7Ozs7Z0JBSkgsYUFBYTs7SUFzQ3JCLHVCQUFDO0NBQUEsQUFsQ0QsSUFrQ0M7U0FqQ1ksZ0JBQWdCOzs7Ozs7SUFDYix5Q0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtXYWxsQ29yZVBsdWdpbn0gZnJvbSAnLi4vcGx1Z2lucy9jb3JlL3dhbGwtY29yZS5wbHVnaW4nO1xuaW1wb3J0IHtXYWxsTW9kZWx9IGZyb20gJy4uL21vZGVsL3dhbGwubW9kZWwnO1xuaW1wb3J0IHtCcmlja1JlZ2lzdHJ5fSBmcm9tICcuLi9yZWdpc3RyeS9icmljay1yZWdpc3RyeS5zZXJ2aWNlJztcbmltcG9ydCB7SVdhbGxNb2RlbH0gZnJvbSAnLi4vbW9kZWwvaW50ZXJmYWNlcy93YWxsLW1vZGVsLmludGVyZmFjZSc7XG5pbXBvcnQge0lXYWxsTW9kZWxDb25maWd9IGZyb20gJy4uL21vZGVsL2ludGVyZmFjZXMvd2FsbC1tb2RlbC1jb25maWcuaW50ZXJmYWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFdhbGxNb2RlbEZhY3Rvcnkge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYnJpY2tSZWdpc3RyeTogQnJpY2tSZWdpc3RyeSkge1xuICAgIH1cblxuICAgIGNyZWF0ZShjb25maWc/OiBJV2FsbE1vZGVsQ29uZmlnKTogSVdhbGxNb2RlbCB7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRDb25maWcgPSB7XG4gICAgICAgICAgICBwbGFuOiB7XG4gICAgICAgICAgICAgICAgYnJpY2tzOiBbXSxcbiAgICAgICAgICAgICAgICBsYXlvdXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgYnJpY2tzOiBbXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwbHVnaW5zOiBbXVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbmZpZyA9IHtcbiAgICAgICAgICAgIC4uLmRlZmF1bHRDb25maWcsXG4gICAgICAgICAgICAuLi5jb25maWdcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBpbmplY3QgY29yZSBwbHVnaW4gYXMgaW5pdGlhbCBmaXJzdCBwbHVnaW5cbiAgICAgICAgLy8gaW4gdGhpcyB3YXkgZmFjdG9yeSB3aWxsIGRlY291cGxlIFdhbGxNb2RlbCBmcm9tIFdhbGxDb3JlUGx1Z2luXG4gICAgICAgIGNvbmZpZy5wbHVnaW5zLnVuc2hpZnQobmV3IFdhbGxDb3JlUGx1Z2luKHRoaXMuYnJpY2tSZWdpc3RyeSkpO1xuXG4gICAgICAgIGNvbnN0IHdhbGxNb2RlbCA9IG5ldyBXYWxsTW9kZWwoXG4gICAgICAgICAgICB0aGlzLmJyaWNrUmVnaXN0cnksXG4gICAgICAgICAgICBjb25maWdcbiAgICAgICAgKTtcblxuICAgICAgICB3YWxsTW9kZWwuYXBpLmNvcmUuc2V0UGxhbihjb25maWcucGxhbik7XG5cbiAgICAgICAgcmV0dXJuIHdhbGxNb2RlbDtcbiAgICB9XG59XG4iXX0=