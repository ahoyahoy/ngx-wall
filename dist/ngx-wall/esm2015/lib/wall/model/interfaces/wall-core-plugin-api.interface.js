/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function IWallCorePluginApi() { }
if (false) {
    /**
     * @param {?} plan
     * @return {?}
     */
    IWallCorePluginApi.prototype.setPlan = function (plan) { };
    /**
     * @param {?} brickId
     * @param {?} tag
     * @param {?=} state
     * @return {?}
     */
    IWallCorePluginApi.prototype.addBrickAfterBrickId = function (brickId, tag, state) { };
    /**
     * @param {?} brickId
     * @param {?} tag
     * @param {?=} state
     * @return {?}
     */
    IWallCorePluginApi.prototype.addBrickBeforeBrickId = function (brickId, tag, state) { };
    /**
     * @param {?} brickId
     * @return {?}
     */
    IWallCorePluginApi.prototype.getBrickResourcePaths = function (brickId) { };
    /**
     * @param {?} brickId
     * @return {?}
     */
    IWallCorePluginApi.prototype.getNextBrickId = function (brickId) { };
    /**
     * @param {?} brickId
     * @return {?}
     */
    IWallCorePluginApi.prototype.getNextTextBrickId = function (brickId) { };
    /**
     * @param {?} brickId
     * @return {?}
     */
    IWallCorePluginApi.prototype.getPreviousTextBrickId = function (brickId) { };
    /**
     * @param {?} brickId
     * @return {?}
     */
    IWallCorePluginApi.prototype.getPreviousBrickId = function (brickId) { };
    /**
     * @return {?}
     */
    IWallCorePluginApi.prototype.getPlan = function () { };
    /**
     * @return {?}
     */
    IWallCorePluginApi.prototype.getRowCount = function () { };
    /**
     * @param {?} rowIndex
     * @return {?}
     */
    IWallCorePluginApi.prototype.getColumnCount = function (rowIndex) { };
    /**
     * @param {?} brickId
     * @param {?} brickState
     * @return {?}
     */
    IWallCorePluginApi.prototype.updateBrickState = function (brickId, brickState) { };
    /**
     * @param {?} brickId
     * @param {?} newTag
     * @param {?=} state
     * @return {?}
     */
    IWallCorePluginApi.prototype.turnBrickInto = function (brickId, newTag, state) { };
    /**
     * @param {?} tag
     * @param {?=} state
     * @return {?}
     */
    IWallCorePluginApi.prototype.addBrickAtStart = function (tag, state) { };
    /**
     * @return {?}
     */
    IWallCorePluginApi.prototype.addDefaultBrick = function () { };
    /**
     * @param {?} targetBrickIds
     * @param {?} beforeBrickId
     * @return {?}
     */
    IWallCorePluginApi.prototype.moveBrickAfterBrickId = function (targetBrickIds, beforeBrickId) { };
    /**
     * @param {?} targetBrickIds
     * @param {?} beforeBrickId
     * @return {?}
     */
    IWallCorePluginApi.prototype.moveBrickBeforeBrickId = function (targetBrickIds, beforeBrickId) { };
    /**
     * @param {?} targetBrickIds
     * @param {?} beforeBrickId
     * @param {?} side
     * @return {?}
     */
    IWallCorePluginApi.prototype.moveBrickToNewColumn = function (targetBrickIds, beforeBrickId, side) { };
    /**
     * @param {?} brickId
     * @return {?}
     */
    IWallCorePluginApi.prototype.removeBrick = function (brickId) { };
    /**
     * @param {?} brickIds
     * @return {?}
     */
    IWallCorePluginApi.prototype.removeBricks = function (brickIds) { };
    /**
     * @return {?}
     */
    IWallCorePluginApi.prototype.clear = function () { };
    /**
     * @return {?}
     */
    IWallCorePluginApi.prototype.getBricksCount = function () { };
    /**
     * @param {?} firstBrickId
     * @param {?} secondBrickId
     * @return {?}
     */
    IWallCorePluginApi.prototype.isBrickAheadOf = function (firstBrickId, secondBrickId) { };
    /**
     * @param {?} fn
     * @return {?}
     */
    IWallCorePluginApi.prototype.subscribe = function (fn) { };
    /**
     * @param {?} fn
     * @return {?}
     */
    IWallCorePluginApi.prototype.traverse = function (fn) { };
    /**
     * @param {?} predictor
     * @return {?}
     */
    IWallCorePluginApi.prototype.filterBricks = function (predictor) { };
    /**
     * @param {?} brickIds
     * @return {?}
     */
    IWallCorePluginApi.prototype.sortBrickIdsByLayoutOrder = function (brickIds) { };
    /**
     * @return {?}
     */
    IWallCorePluginApi.prototype.getBrickIds = function () { };
    /**
     * @param {?} brickId
     * @return {?}
     */
    IWallCorePluginApi.prototype.getBrickTag = function (brickId) { };
    /**
     * @param {?} brickId
     * @return {?}
     */
    IWallCorePluginApi.prototype.getBrickSnapshot = function (brickId) { };
    /**
     * @param {?} brickId
     * @return {?}
     */
    IWallCorePluginApi.prototype.getBrickTextRepresentation = function (brickId) { };
    /**
     * @param {?} tag
     * @return {?}
     */
    IWallCorePluginApi.prototype.isRegisteredBrick = function (tag) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbC1jb3JlLXBsdWdpbi1hcGkuaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvd2FsbC9tb2RlbC9pbnRlcmZhY2VzL3dhbGwtY29yZS1wbHVnaW4tYXBpLmludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBSUEsd0NBbUVDOzs7Ozs7SUFqRUcsMkRBQStCOzs7Ozs7O0lBRS9CLHVGQUFtRjs7Ozs7OztJQUVuRix3RkFBb0Y7Ozs7O0lBRXBGLDRFQUFpRDs7Ozs7SUFJakQscUVBQXdDOzs7OztJQUV4Qyx5RUFBNEM7Ozs7O0lBRTVDLDZFQUFnRDs7Ozs7SUFFaEQseUVBQTRDOzs7O0lBRTVDLHVEQUEyQjs7OztJQUUzQiwyREFBc0I7Ozs7O0lBRXRCLHNFQUF5Qzs7Ozs7O0lBRXpDLG1GQUE0Qzs7Ozs7OztJQUU1QyxtRkFBNEQ7Ozs7OztJQUU1RCx5RUFBMEQ7Ozs7SUFFMUQsK0RBQXdCOzs7Ozs7SUFFeEIsa0dBQTZFOzs7Ozs7SUFFN0UsbUdBQThFOzs7Ozs7O0lBRTlFLHVHQUEwRjs7Ozs7SUFFMUYsa0VBQW1DOzs7OztJQUVuQyxvRUFBNkI7Ozs7SUFFN0IscURBQXVCOzs7O0lBRXZCLDhEQUF5Qjs7Ozs7O0lBRXpCLHlGQUFxRTs7Ozs7SUFFckUsMkRBQWlEOzs7OztJQUVqRCwwREFBc0M7Ozs7O0lBRXRDLHFFQUFrRjs7Ozs7SUFFbEYsaUZBQXdEOzs7O0lBRXhELDJEQUF3Qjs7Ozs7SUFFeEIsa0VBQXFDOzs7OztJQUVyQyx1RUFBa0Q7Ozs7O0lBRWxELGlGQUFvRDs7Ozs7SUFFcEQsb0VBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtJV2FsbERlZmluaXRpb259IGZyb20gJy4vd2FsbC1kZWZpbml0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQge0lCcmlja1NuYXBzaG90fSBmcm9tICcuL2JyaWNrLXNuYXBzaG90LmludGVyZmFjZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVdhbGxDb3JlUGx1Z2luQXBpIHtcbiAgICAvLyBDT01NQU5EIE1FVEhPRFNcbiAgICBzZXRQbGFuKHBsYW46IElXYWxsRGVmaW5pdGlvbik7XG5cbiAgICBhZGRCcmlja0FmdGVyQnJpY2tJZChicmlja0lkOiBzdHJpbmcsIHRhZzogc3RyaW5nLCBzdGF0ZT86IG9iamVjdCk6IElCcmlja1NuYXBzaG90O1xuXG4gICAgYWRkQnJpY2tCZWZvcmVCcmlja0lkKGJyaWNrSWQ6IHN0cmluZywgdGFnOiBzdHJpbmcsIHN0YXRlPzogb2JqZWN0KTogSUJyaWNrU25hcHNob3Q7XG5cbiAgICBnZXRCcmlja1Jlc291cmNlUGF0aHMoYnJpY2tJZDogc3RyaW5nKTogc3RyaW5nW107XG5cbiAgICAvLyBRVUVSWSBNRVRIT0RTXG5cbiAgICBnZXROZXh0QnJpY2tJZChicmlja0lkOiBzdHJpbmcpOiBzdHJpbmc7XG5cbiAgICBnZXROZXh0VGV4dEJyaWNrSWQoYnJpY2tJZDogc3RyaW5nKTogc3RyaW5nO1xuXG4gICAgZ2V0UHJldmlvdXNUZXh0QnJpY2tJZChicmlja0lkOiBzdHJpbmcpOiBzdHJpbmc7XG5cbiAgICBnZXRQcmV2aW91c0JyaWNrSWQoYnJpY2tJZDogc3RyaW5nKTogc3RyaW5nO1xuXG4gICAgZ2V0UGxhbigpOiBJV2FsbERlZmluaXRpb247XG5cbiAgICBnZXRSb3dDb3VudCgpOiBudW1iZXI7XG5cbiAgICBnZXRDb2x1bW5Db3VudChyb3dJbmRleDogbnVtYmVyKTogbnVtYmVyO1xuXG4gICAgdXBkYXRlQnJpY2tTdGF0ZShicmlja0lkLCBicmlja1N0YXRlKTogdm9pZDtcblxuICAgIHR1cm5Ccmlja0ludG8oYnJpY2tJZDogc3RyaW5nLCBuZXdUYWc6IHN0cmluZywgc3RhdGU/OiBhbnkpO1xuXG4gICAgYWRkQnJpY2tBdFN0YXJ0KHRhZzogc3RyaW5nLCBzdGF0ZT86IGFueSk6IElCcmlja1NuYXBzaG90O1xuXG4gICAgYWRkRGVmYXVsdEJyaWNrKCk6IHZvaWQ7XG5cbiAgICBtb3ZlQnJpY2tBZnRlckJyaWNrSWQodGFyZ2V0QnJpY2tJZHM6IHN0cmluZ1tdLCBiZWZvcmVCcmlja0lkOiBzdHJpbmcpOiB2b2lkO1xuXG4gICAgbW92ZUJyaWNrQmVmb3JlQnJpY2tJZCh0YXJnZXRCcmlja0lkczogc3RyaW5nW10sIGJlZm9yZUJyaWNrSWQ6IHN0cmluZyk6IHZvaWQ7XG5cbiAgICBtb3ZlQnJpY2tUb05ld0NvbHVtbih0YXJnZXRCcmlja0lkczogc3RyaW5nW10sIGJlZm9yZUJyaWNrSWQ6IHN0cmluZywgc2lkZTogc3RyaW5nKTogdm9pZDtcblxuICAgIHJlbW92ZUJyaWNrKGJyaWNrSWQ6IHN0cmluZyk6IHZvaWQ7XG5cbiAgICByZW1vdmVCcmlja3MoYnJpY2tJZHMpOiB2b2lkO1xuXG4gICAgY2xlYXIoKTogUHJvbWlzZTx2b2lkPjtcblxuICAgIGdldEJyaWNrc0NvdW50KCk6IG51bWJlcjtcblxuICAgIGlzQnJpY2tBaGVhZE9mKGZpcnN0QnJpY2tJZDogc3RyaW5nLCBzZWNvbmRCcmlja0lkOiBzdHJpbmcpOiBib29sZWFuO1xuXG4gICAgc3Vic2NyaWJlKGZuOiAoZXZlbnQ6IGFueSkgPT4gYW55KTogU3Vic2NyaXB0aW9uO1xuXG4gICAgdHJhdmVyc2UoZm46IChyb3c6IGFueSkgPT4gYW55KTogdm9pZDsgLy8gdG9kbyAtIHRyYXZlcnNlIHF1aXRlIHN0cmFuZ2UgbWV0aG9kP1xuXG4gICAgZmlsdGVyQnJpY2tzKHByZWRpY3RvcjogKHdhbGxCcmljazogSUJyaWNrU25hcHNob3QpID0+IGJvb2xlYW4pOiBJQnJpY2tTbmFwc2hvdFtdO1xuXG4gICAgc29ydEJyaWNrSWRzQnlMYXlvdXRPcmRlcihicmlja0lkczogc3RyaW5nW10pOiBzdHJpbmdbXTtcblxuICAgIGdldEJyaWNrSWRzKCk6IHN0cmluZ1tdO1xuXG4gICAgZ2V0QnJpY2tUYWcoYnJpY2tJZDogc3RyaW5nKTogc3RyaW5nO1xuXG4gICAgZ2V0QnJpY2tTbmFwc2hvdChicmlja0lkOiBzdHJpbmcpOiBJQnJpY2tTbmFwc2hvdDtcblxuICAgIGdldEJyaWNrVGV4dFJlcHJlc2VudGF0aW9uKGJyaWNrSWQ6IHN0cmluZyk6IHN0cmluZztcblxuICAgIGlzUmVnaXN0ZXJlZEJyaWNrKHRhZzogc3RyaW5nKTogYm9vbGVhbjtcbn1cbiJdfQ==