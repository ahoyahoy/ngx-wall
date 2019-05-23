/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
export class BrickRegistry {
    constructor() {
        this.bricks = [];
    }
    // todo: add unregister functionality
    /**
     * @param {?} brickConfiguration
     * @return {?}
     */
    register(brickConfiguration) {
        this.bricks.push(brickConfiguration);
    }
    /**
     * @param {?} tag
     * @return {?}
     */
    get(tag) {
        return this.bricks.find((/**
         * @param {?} brickConfiguration
         * @return {?}
         */
        (brickConfiguration) => brickConfiguration.tag === tag));
    }
    /**
     * @return {?}
     */
    getAll() {
        return this.bricks;
    }
}
BrickRegistry.decorators = [
    { type: Injectable }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    BrickRegistry.prototype.bricks;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJpY2stcmVnaXN0cnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL3dhbGwvcmVnaXN0cnkvYnJpY2stcmVnaXN0cnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUl6QyxNQUFNLE9BQU8sYUFBYTtJQUQxQjtRQUVZLFdBQU0sR0FBMEIsRUFBRSxDQUFDO0lBZS9DLENBQUM7Ozs7OztJQVhHLFFBQVEsQ0FBQyxrQkFBdUM7UUFDNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUN6QyxDQUFDOzs7OztJQUVELEdBQUcsQ0FBQyxHQUFXO1FBQ1gsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUk7Ozs7UUFBQyxDQUFDLGtCQUF1QyxFQUFFLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLEtBQUssR0FBRyxFQUFDLENBQUM7SUFDekcsQ0FBQzs7OztJQUVELE1BQU07UUFDRixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQzs7O1lBaEJKLFVBQVU7Ozs7Ozs7SUFFUCwrQkFBMkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtJQnJpY2tTcGVjaWZpY2F0aW9ufSBmcm9tICcuL2ludGVyZmFjZXMvYnJpY2stc3BlY2lmaWNhdGlvbi5pbnRlcmZhY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQnJpY2tSZWdpc3RyeSB7XG4gICAgcHJpdmF0ZSBicmlja3M6IElCcmlja1NwZWNpZmljYXRpb25bXSA9IFtdO1xuXG4gICAgLy8gdG9kbzogYWRkIHVucmVnaXN0ZXIgZnVuY3Rpb25hbGl0eVxuXG4gICAgcmVnaXN0ZXIoYnJpY2tDb25maWd1cmF0aW9uOiBJQnJpY2tTcGVjaWZpY2F0aW9uKSB7XG4gICAgICAgIHRoaXMuYnJpY2tzLnB1c2goYnJpY2tDb25maWd1cmF0aW9uKTtcbiAgICB9XG5cbiAgICBnZXQodGFnOiBzdHJpbmcpOiBJQnJpY2tTcGVjaWZpY2F0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnJpY2tzLmZpbmQoKGJyaWNrQ29uZmlndXJhdGlvbjogSUJyaWNrU3BlY2lmaWNhdGlvbikgPT4gYnJpY2tDb25maWd1cmF0aW9uLnRhZyA9PT0gdGFnKTtcbiAgICB9XG5cbiAgICBnZXRBbGwoKTogSUJyaWNrU3BlY2lmaWNhdGlvbltdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnJpY2tzO1xuICAgIH1cbn1cbiJdfQ==