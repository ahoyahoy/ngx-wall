/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
import { WallPluginInitializedEvent } from './events/wall-plugin-initialized.event';
export class WallModel {
    /**
     * @param {?} brickRegistry
     * @param {?} config
     */
    constructor(brickRegistry, config) {
        this.brickRegistry = brickRegistry;
        // plugin api
        this.api = {
            core: null
        };
        this.events$ = new Subject();
        this.plugins = new Map();
        // initialize 3rd party plugins
        config.plugins.forEach((/**
         * @param {?} plugin
         * @return {?}
         */
        (plugin) => this.initializePlugin(plugin)));
    }
    // register external API
    /**
     * @param {?} apiName
     * @param {?} api
     * @return {?}
     */
    registerApi(apiName, api) {
        this.api[apiName] = api;
    }
    /**
     * @return {?}
     */
    destroy() {
        this.plugins.forEach((/**
         * @param {?} plugin
         * @return {?}
         */
        (plugin) => this.destroyPlugin(plugin)));
    }
    // proxy events from all plugins
    /**
     * @param {?} callback
     * @return {?}
     */
    subscribe(callback) {
        return this.events$.subscribe(callback);
    }
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    dispatch(e) {
        ((/** @type {?} */ (this.events$))).next(e);
    }
    /**
     * @private
     * @param {?} plugin
     * @return {?}
     */
    initializePlugin(plugin) {
        plugin.onWallInitialize(this);
        this.plugins.set(plugin.name, plugin);
        this.dispatch(new WallPluginInitializedEvent(plugin.name));
    }
    /**
     * @private
     * @param {?} plugin
     * @return {?}
     */
    destroyPlugin(plugin) {
        if (plugin.onWallPluginDestroy) {
            plugin.onWallPluginDestroy();
        }
    }
}
if (false) {
    /** @type {?} */
    WallModel.prototype.version;
    /** @type {?} */
    WallModel.prototype.api;
    /**
     * @type {?}
     * @private
     */
    WallModel.prototype.events$;
    /**
     * @type {?}
     * @private
     */
    WallModel.prototype.plugins;
    /**
     * @type {?}
     * @private
     */
    WallModel.prototype.brickRegistry;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbC5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL3dhbGwvbW9kZWwvd2FsbC5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFhLE9BQU8sRUFBZSxNQUFNLE1BQU0sQ0FBQztBQUV2RCxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQU1sRixNQUFNLE9BQU8sU0FBUzs7Ozs7SUFlbEIsWUFBb0IsYUFBNEIsRUFBRSxNQUF3QjtRQUF0RCxrQkFBYSxHQUFiLGFBQWEsQ0FBZTs7UUFYaEQsUUFBRyxHQUdDO1lBQ0EsSUFBSSxFQUFFLElBQUk7U0FDYixDQUFDO1FBRU0sWUFBTyxHQUFvQixJQUFJLE9BQU8sRUFBRSxDQUFDO1FBRXpDLFlBQU8sR0FBNkIsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUdsRCwrQkFBK0I7UUFDL0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPOzs7O1FBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsRUFBQyxDQUFDO0lBQ3RFLENBQUM7Ozs7Ozs7SUFHRCxXQUFXLENBQUMsT0FBZSxFQUFFLEdBQVc7UUFDcEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDNUIsQ0FBQzs7OztJQUVELE9BQU87UUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU87Ozs7UUFBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsRUFBQyxDQUFDO0lBQ2pFLENBQUM7Ozs7OztJQUdELFNBQVMsQ0FBQyxRQUFRO1FBQ2QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1QyxDQUFDOzs7Ozs7SUFFTyxRQUFRLENBQUMsQ0FBTTtRQUNuQixDQUFDLG1CQUFBLElBQUksQ0FBQyxPQUFPLEVBQWdCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7Ozs7O0lBRU8sZ0JBQWdCLENBQUMsTUFBbUI7UUFDeEMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTlCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLDBCQUEwQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7Ozs7OztJQUVPLGFBQWEsQ0FBQyxNQUFtQjtRQUNyQyxJQUFJLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRTtZQUM1QixNQUFNLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztTQUNoQztJQUNMLENBQUM7Q0FDSjs7O0lBbERHLDRCQUFpQjs7SUFHakIsd0JBS0U7Ozs7O0lBRUYsNEJBQWlEOzs7OztJQUVqRCw0QkFBc0Q7Ozs7O0lBRTFDLGtDQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T2JzZXJ2YWJsZSwgU3ViamVjdCwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7SVdhbGxQbHVnaW59IGZyb20gJy4vaW50ZXJmYWNlcy93YWxsLXBsdWdpbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHtXYWxsUGx1Z2luSW5pdGlhbGl6ZWRFdmVudH0gZnJvbSAnLi9ldmVudHMvd2FsbC1wbHVnaW4taW5pdGlhbGl6ZWQuZXZlbnQnO1xuaW1wb3J0IHtJV2FsbE1vZGVsQ29uZmlnfSBmcm9tICcuL2ludGVyZmFjZXMvd2FsbC1tb2RlbC1jb25maWcuaW50ZXJmYWNlJztcbmltcG9ydCB7SVdhbGxNb2RlbH0gZnJvbSAnLi9pbnRlcmZhY2VzL3dhbGwtbW9kZWwuaW50ZXJmYWNlJztcbmltcG9ydCB7SVdhbGxDb3JlUGx1Z2luQXBpfSBmcm9tICcuL2ludGVyZmFjZXMvd2FsbC1jb3JlLXBsdWdpbi1hcGkuaW50ZXJmYWNlJztcbmltcG9ydCB7QnJpY2tSZWdpc3RyeX0gZnJvbSAnLi4vcmVnaXN0cnkvYnJpY2stcmVnaXN0cnkuc2VydmljZSc7XG5cbmV4cG9ydCBjbGFzcyBXYWxsTW9kZWwgaW1wbGVtZW50cyBJV2FsbE1vZGVsIHtcbiAgICB2ZXJzaW9uOiAnMC4wLjAnO1xuXG4gICAgLy8gcGx1Z2luIGFwaVxuICAgIGFwaToge1xuICAgICAgICBbYXBpTmFtZTogc3RyaW5nXTogYW55O1xuICAgICAgICBjb3JlOiBJV2FsbENvcmVQbHVnaW5BcGlcbiAgICB9ID0ge1xuICAgICAgICBjb3JlOiBudWxsXG4gICAgfTtcblxuICAgIHByaXZhdGUgZXZlbnRzJDogT2JzZXJ2YWJsZTxhbnk+ID0gbmV3IFN1YmplY3QoKTtcblxuICAgIHByaXZhdGUgcGx1Z2luczogTWFwPHN0cmluZywgSVdhbGxQbHVnaW4+ID0gbmV3IE1hcCgpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBicmlja1JlZ2lzdHJ5OiBCcmlja1JlZ2lzdHJ5LCBjb25maWc6IElXYWxsTW9kZWxDb25maWcpIHtcbiAgICAgICAgLy8gaW5pdGlhbGl6ZSAzcmQgcGFydHkgcGx1Z2luc1xuICAgICAgICBjb25maWcucGx1Z2lucy5mb3JFYWNoKChwbHVnaW4pID0+IHRoaXMuaW5pdGlhbGl6ZVBsdWdpbihwbHVnaW4pKTtcbiAgICB9XG5cbiAgICAvLyByZWdpc3RlciBleHRlcm5hbCBBUElcbiAgICByZWdpc3RlckFwaShhcGlOYW1lOiBzdHJpbmcsIGFwaTogb2JqZWN0KSB7XG4gICAgICAgIHRoaXMuYXBpW2FwaU5hbWVdID0gYXBpO1xuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMucGx1Z2lucy5mb3JFYWNoKChwbHVnaW4pID0+IHRoaXMuZGVzdHJveVBsdWdpbihwbHVnaW4pKTtcbiAgICB9XG5cbiAgICAvLyBwcm94eSBldmVudHMgZnJvbSBhbGwgcGx1Z2luc1xuICAgIHN1YnNjcmliZShjYWxsYmFjayk6IFN1YnNjcmlwdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50cyQuc3Vic2NyaWJlKGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRpc3BhdGNoKGU6IGFueSk6IHZvaWQge1xuICAgICAgICAodGhpcy5ldmVudHMkIGFzIFN1YmplY3Q8YW55PikubmV4dChlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRpYWxpemVQbHVnaW4ocGx1Z2luOiBJV2FsbFBsdWdpbikge1xuICAgICAgICBwbHVnaW4ub25XYWxsSW5pdGlhbGl6ZSh0aGlzKTtcblxuICAgICAgICB0aGlzLnBsdWdpbnMuc2V0KHBsdWdpbi5uYW1lLCBwbHVnaW4pO1xuXG4gICAgICAgIHRoaXMuZGlzcGF0Y2gobmV3IFdhbGxQbHVnaW5Jbml0aWFsaXplZEV2ZW50KHBsdWdpbi5uYW1lKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkZXN0cm95UGx1Z2luKHBsdWdpbjogSVdhbGxQbHVnaW4pIHtcbiAgICAgICAgaWYgKHBsdWdpbi5vbldhbGxQbHVnaW5EZXN0cm95KSB7XG4gICAgICAgICAgICBwbHVnaW4ub25XYWxsUGx1Z2luRGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19