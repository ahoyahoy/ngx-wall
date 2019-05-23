/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
import { WallPluginInitializedEvent } from './events/wall-plugin-initialized.event';
var WallModel = /** @class */ (function () {
    function WallModel(brickRegistry, config) {
        var _this = this;
        this.brickRegistry = brickRegistry;
        // plugin api
        this.api = {
            core: null
        };
        this.events$ = new Subject();
        this.plugins = new Map();
        // initialize 3rd party plugins
        config.plugins.forEach(function (plugin) { return _this.initializePlugin(plugin); });
    }
    // register external API
    // register external API
    /**
     * @param {?} apiName
     * @param {?} api
     * @return {?}
     */
    WallModel.prototype.registerApi = 
    // register external API
    /**
     * @param {?} apiName
     * @param {?} api
     * @return {?}
     */
    function (apiName, api) {
        this.api[apiName] = api;
    };
    /**
     * @return {?}
     */
    WallModel.prototype.destroy = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.plugins.forEach(function (plugin) { return _this.destroyPlugin(plugin); });
    };
    // proxy events from all plugins
    // proxy events from all plugins
    /**
     * @param {?} callback
     * @return {?}
     */
    WallModel.prototype.subscribe = 
    // proxy events from all plugins
    /**
     * @param {?} callback
     * @return {?}
     */
    function (callback) {
        return this.events$.subscribe(callback);
    };
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    WallModel.prototype.dispatch = /**
     * @private
     * @param {?} e
     * @return {?}
     */
    function (e) {
        ((/** @type {?} */ (this.events$))).next(e);
    };
    /**
     * @private
     * @param {?} plugin
     * @return {?}
     */
    WallModel.prototype.initializePlugin = /**
     * @private
     * @param {?} plugin
     * @return {?}
     */
    function (plugin) {
        plugin.onWallInitialize(this);
        this.plugins.set(plugin.name, plugin);
        this.dispatch(new WallPluginInitializedEvent(plugin.name));
    };
    /**
     * @private
     * @param {?} plugin
     * @return {?}
     */
    WallModel.prototype.destroyPlugin = /**
     * @private
     * @param {?} plugin
     * @return {?}
     */
    function (plugin) {
        if (plugin.onWallPluginDestroy) {
            plugin.onWallPluginDestroy();
        }
    };
    return WallModel;
}());
export { WallModel };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbC5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL3dhbGwvbW9kZWwvd2FsbC5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFhLE9BQU8sRUFBZSxNQUFNLE1BQU0sQ0FBQztBQUV2RCxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQU1sRjtJQWVJLG1CQUFvQixhQUE0QixFQUFFLE1BQXdCO1FBQTFFLGlCQUdDO1FBSG1CLGtCQUFhLEdBQWIsYUFBYSxDQUFlOztRQVhoRCxRQUFHLEdBR0M7WUFDQSxJQUFJLEVBQUUsSUFBSTtTQUNiLENBQUM7UUFFTSxZQUFPLEdBQW9CLElBQUksT0FBTyxFQUFFLENBQUM7UUFFekMsWUFBTyxHQUE2QixJQUFJLEdBQUcsRUFBRSxDQUFDO1FBR2xELCtCQUErQjtRQUMvQixNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQU0sSUFBSyxPQUFBLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsRUFBN0IsQ0FBNkIsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFRCx3QkFBd0I7Ozs7Ozs7SUFDeEIsK0JBQVc7Ozs7Ozs7SUFBWCxVQUFZLE9BQWUsRUFBRSxHQUFXO1FBQ3BDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQzVCLENBQUM7Ozs7SUFFRCwyQkFBTzs7O0lBQVA7UUFBQSxpQkFFQztRQURHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBTSxJQUFLLE9BQUEsS0FBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsRUFBMUIsQ0FBMEIsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRCxnQ0FBZ0M7Ozs7OztJQUNoQyw2QkFBUzs7Ozs7O0lBQVQsVUFBVSxRQUFRO1FBQ2QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1QyxDQUFDOzs7Ozs7SUFFTyw0QkFBUTs7Ozs7SUFBaEIsVUFBaUIsQ0FBTTtRQUNuQixDQUFDLG1CQUFBLElBQUksQ0FBQyxPQUFPLEVBQWdCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7Ozs7O0lBRU8sb0NBQWdCOzs7OztJQUF4QixVQUF5QixNQUFtQjtRQUN4QyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUV0QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksMEJBQTBCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQzs7Ozs7O0lBRU8saUNBQWE7Ozs7O0lBQXJCLFVBQXNCLE1BQW1CO1FBQ3JDLElBQUksTUFBTSxDQUFDLG1CQUFtQixFQUFFO1lBQzVCLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1NBQ2hDO0lBQ0wsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0FBQyxBQW5ERCxJQW1EQzs7OztJQWxERyw0QkFBaUI7O0lBR2pCLHdCQUtFOzs7OztJQUVGLDRCQUFpRDs7Ozs7SUFFakQsNEJBQXNEOzs7OztJQUUxQyxrQ0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0lXYWxsUGx1Z2lufSBmcm9tICcuL2ludGVyZmFjZXMvd2FsbC1wbHVnaW4uaW50ZXJmYWNlJztcbmltcG9ydCB7V2FsbFBsdWdpbkluaXRpYWxpemVkRXZlbnR9IGZyb20gJy4vZXZlbnRzL3dhbGwtcGx1Z2luLWluaXRpYWxpemVkLmV2ZW50JztcbmltcG9ydCB7SVdhbGxNb2RlbENvbmZpZ30gZnJvbSAnLi9pbnRlcmZhY2VzL3dhbGwtbW9kZWwtY29uZmlnLmludGVyZmFjZSc7XG5pbXBvcnQge0lXYWxsTW9kZWx9IGZyb20gJy4vaW50ZXJmYWNlcy93YWxsLW1vZGVsLmludGVyZmFjZSc7XG5pbXBvcnQge0lXYWxsQ29yZVBsdWdpbkFwaX0gZnJvbSAnLi9pbnRlcmZhY2VzL3dhbGwtY29yZS1wbHVnaW4tYXBpLmludGVyZmFjZSc7XG5pbXBvcnQge0JyaWNrUmVnaXN0cnl9IGZyb20gJy4uL3JlZ2lzdHJ5L2JyaWNrLXJlZ2lzdHJ5LnNlcnZpY2UnO1xuXG5leHBvcnQgY2xhc3MgV2FsbE1vZGVsIGltcGxlbWVudHMgSVdhbGxNb2RlbCB7XG4gICAgdmVyc2lvbjogJzAuMC4wJztcblxuICAgIC8vIHBsdWdpbiBhcGlcbiAgICBhcGk6IHtcbiAgICAgICAgW2FwaU5hbWU6IHN0cmluZ106IGFueTtcbiAgICAgICAgY29yZTogSVdhbGxDb3JlUGx1Z2luQXBpXG4gICAgfSA9IHtcbiAgICAgICAgY29yZTogbnVsbFxuICAgIH07XG5cbiAgICBwcml2YXRlIGV2ZW50cyQ6IE9ic2VydmFibGU8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgICBwcml2YXRlIHBsdWdpbnM6IE1hcDxzdHJpbmcsIElXYWxsUGx1Z2luPiA9IG5ldyBNYXAoKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYnJpY2tSZWdpc3RyeTogQnJpY2tSZWdpc3RyeSwgY29uZmlnOiBJV2FsbE1vZGVsQ29uZmlnKSB7XG4gICAgICAgIC8vIGluaXRpYWxpemUgM3JkIHBhcnR5IHBsdWdpbnNcbiAgICAgICAgY29uZmlnLnBsdWdpbnMuZm9yRWFjaCgocGx1Z2luKSA9PiB0aGlzLmluaXRpYWxpemVQbHVnaW4ocGx1Z2luKSk7XG4gICAgfVxuXG4gICAgLy8gcmVnaXN0ZXIgZXh0ZXJuYWwgQVBJXG4gICAgcmVnaXN0ZXJBcGkoYXBpTmFtZTogc3RyaW5nLCBhcGk6IG9iamVjdCkge1xuICAgICAgICB0aGlzLmFwaVthcGlOYW1lXSA9IGFwaTtcbiAgICB9XG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgICB0aGlzLnBsdWdpbnMuZm9yRWFjaCgocGx1Z2luKSA9PiB0aGlzLmRlc3Ryb3lQbHVnaW4ocGx1Z2luKSk7XG4gICAgfVxuXG4gICAgLy8gcHJveHkgZXZlbnRzIGZyb20gYWxsIHBsdWdpbnNcbiAgICBzdWJzY3JpYmUoY2FsbGJhY2spOiBTdWJzY3JpcHRpb24ge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmVudHMkLnN1YnNjcmliZShjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkaXNwYXRjaChlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgKHRoaXMuZXZlbnRzJCBhcyBTdWJqZWN0PGFueT4pLm5leHQoZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplUGx1Z2luKHBsdWdpbjogSVdhbGxQbHVnaW4pIHtcbiAgICAgICAgcGx1Z2luLm9uV2FsbEluaXRpYWxpemUodGhpcyk7XG5cbiAgICAgICAgdGhpcy5wbHVnaW5zLnNldChwbHVnaW4ubmFtZSwgcGx1Z2luKTtcblxuICAgICAgICB0aGlzLmRpc3BhdGNoKG5ldyBXYWxsUGx1Z2luSW5pdGlhbGl6ZWRFdmVudChwbHVnaW4ubmFtZSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGVzdHJveVBsdWdpbihwbHVnaW46IElXYWxsUGx1Z2luKSB7XG4gICAgICAgIGlmIChwbHVnaW4ub25XYWxsUGx1Z2luRGVzdHJveSkge1xuICAgICAgICAgICAgcGx1Z2luLm9uV2FsbFBsdWdpbkRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==