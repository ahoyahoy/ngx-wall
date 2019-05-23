/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
var BrickRegistry = /** @class */ (function () {
    function BrickRegistry() {
        this.bricks = [];
    }
    // todo: add unregister functionality
    // todo: add unregister functionality
    /**
     * @param {?} brickConfiguration
     * @return {?}
     */
    BrickRegistry.prototype.register = 
    // todo: add unregister functionality
    /**
     * @param {?} brickConfiguration
     * @return {?}
     */
    function (brickConfiguration) {
        this.bricks.push(brickConfiguration);
    };
    /**
     * @param {?} tag
     * @return {?}
     */
    BrickRegistry.prototype.get = /**
     * @param {?} tag
     * @return {?}
     */
    function (tag) {
        return this.bricks.find((/**
         * @param {?} brickConfiguration
         * @return {?}
         */
        function (brickConfiguration) { return brickConfiguration.tag === tag; }));
    };
    /**
     * @return {?}
     */
    BrickRegistry.prototype.getAll = /**
     * @return {?}
     */
    function () {
        return this.bricks;
    };
    BrickRegistry.decorators = [
        { type: Injectable }
    ];
    return BrickRegistry;
}());
export { BrickRegistry };
if (false) {
    /**
     * @type {?}
     * @private
     */
    BrickRegistry.prototype.bricks;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJpY2stcmVnaXN0cnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL3dhbGwvcmVnaXN0cnkvYnJpY2stcmVnaXN0cnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUd6QztJQUFBO1FBRVksV0FBTSxHQUEwQixFQUFFLENBQUM7SUFlL0MsQ0FBQztJQWJHLHFDQUFxQzs7Ozs7O0lBRXJDLGdDQUFROzs7Ozs7SUFBUixVQUFTLGtCQUF1QztRQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7Ozs7O0lBRUQsMkJBQUc7Ozs7SUFBSCxVQUFJLEdBQVc7UUFDWCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSTs7OztRQUFDLFVBQUMsa0JBQXVDLElBQUssT0FBQSxrQkFBa0IsQ0FBQyxHQUFHLEtBQUssR0FBRyxFQUE5QixDQUE4QixFQUFDLENBQUM7SUFDekcsQ0FBQzs7OztJQUVELDhCQUFNOzs7SUFBTjtRQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDOztnQkFoQkosVUFBVTs7SUFpQlgsb0JBQUM7Q0FBQSxBQWpCRCxJQWlCQztTQWhCWSxhQUFhOzs7Ozs7SUFDdEIsK0JBQTJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SUJyaWNrU3BlY2lmaWNhdGlvbn0gZnJvbSAnLi9pbnRlcmZhY2VzL2JyaWNrLXNwZWNpZmljYXRpb24uaW50ZXJmYWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJyaWNrUmVnaXN0cnkge1xuICAgIHByaXZhdGUgYnJpY2tzOiBJQnJpY2tTcGVjaWZpY2F0aW9uW10gPSBbXTtcblxuICAgIC8vIHRvZG86IGFkZCB1bnJlZ2lzdGVyIGZ1bmN0aW9uYWxpdHlcblxuICAgIHJlZ2lzdGVyKGJyaWNrQ29uZmlndXJhdGlvbjogSUJyaWNrU3BlY2lmaWNhdGlvbikge1xuICAgICAgICB0aGlzLmJyaWNrcy5wdXNoKGJyaWNrQ29uZmlndXJhdGlvbik7XG4gICAgfVxuXG4gICAgZ2V0KHRhZzogc3RyaW5nKTogSUJyaWNrU3BlY2lmaWNhdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmJyaWNrcy5maW5kKChicmlja0NvbmZpZ3VyYXRpb246IElCcmlja1NwZWNpZmljYXRpb24pID0+IGJyaWNrQ29uZmlndXJhdGlvbi50YWcgPT09IHRhZyk7XG4gICAgfVxuXG4gICAgZ2V0QWxsKCk6IElCcmlja1NwZWNpZmljYXRpb25bXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJyaWNrcztcbiAgICB9XG59XG4iXX0=