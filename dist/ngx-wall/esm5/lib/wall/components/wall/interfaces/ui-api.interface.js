/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function IWallUiApi() { }
if (false) {
    /**
     * @param {?} brickId
     * @return {?}
     */
    IWallUiApi.prototype.selectBrick = function (brickId) { };
    /**
     * @param {?} brickIds
     * @return {?}
     */
    IWallUiApi.prototype.selectBricks = function (brickIds) { };
    /**
     * @param {?} brickId
     * @return {?}
     */
    IWallUiApi.prototype.addBrickToSelection = function (brickId) { };
    /**
     * @param {?} brickId
     * @return {?}
     */
    IWallUiApi.prototype.removeBrickFromSelection = function (brickId) { };
    /**
     * @return {?}
     */
    IWallUiApi.prototype.unSelectBricks = function () { };
    /**
     * @param {?} brickId
     * @param {?=} focusContext
     * @return {?}
     */
    IWallUiApi.prototype.focusOnBrickId = function (brickId, focusContext) { };
    /**
     * @return {?}
     */
    IWallUiApi.prototype.getFocusedBrickId = function () { };
    /**
     * @param {?} brickId
     * @param {?=} focusContext
     * @return {?}
     */
    IWallUiApi.prototype.focusOnPreviousTextBrick = function (brickId, focusContext) { };
    /**
     * @param {?} brickId
     * @param {?=} focusContext
     * @return {?}
     */
    IWallUiApi.prototype.focusOnNextTextBrick = function (brickId, focusContext) { };
    /**
     * @param {?} brickId
     * @return {?}
     */
    IWallUiApi.prototype.removeBrick = function (brickId) { };
    /**
     * @param {?} brickIds
     * @return {?}
     */
    IWallUiApi.prototype.removeBricks = function (brickIds) { };
    /**
     * @return {?}
     */
    IWallUiApi.prototype.getSelectedBrickIds = function () { };
    /**
     * @return {?}
     */
    IWallUiApi.prototype.enableMediaInteraction = function () { };
    /**
     * @return {?}
     */
    IWallUiApi.prototype.disableMediaInteraction = function () { };
    /**
     * @param {?} callback
     * @return {?}
     */
    IWallUiApi.prototype.subscribe = function (callback) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktYXBpLmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL3dhbGwvY29tcG9uZW50cy93YWxsL2ludGVyZmFjZXMvdWktYXBpLmludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBR0EsZ0NBOEJDOzs7Ozs7SUE3QkcsMERBQW1DOzs7OztJQUVuQyw0REFBdUM7Ozs7O0lBRXZDLGtFQUEyQzs7Ozs7SUFFM0MsdUVBQWdEOzs7O0lBRWhELHNEQUF1Qjs7Ozs7O0lBRXZCLDJFQUE4RDs7OztJQUU5RCx5REFBNEI7Ozs7OztJQUU1QixxRkFBd0U7Ozs7OztJQUV4RSxpRkFBb0U7Ozs7O0lBRXBFLDBEQUFtQzs7Ozs7SUFFbkMsNERBQXVDOzs7O0lBRXZDLDJEQUFnQzs7OztJQUVoQyw4REFBK0I7Ozs7SUFFL0IsK0RBQWdDOzs7OztJQUVoQyx5REFBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0lGb2N1c0NvbnRleHR9IGZyb20gJy4vd2FsbC1jb21wb25lbnQvd2FsbC1jb21wb25lbnQtZm9jdXMtY29udGV4dC5pbnRlcmZhY2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElXYWxsVWlBcGkge1xuICAgIHNlbGVjdEJyaWNrKGJyaWNrSWQ6IHN0cmluZyk6IHZvaWQ7XG5cbiAgICBzZWxlY3RCcmlja3MoYnJpY2tJZHM6IHN0cmluZ1tdKTogdm9pZDtcblxuICAgIGFkZEJyaWNrVG9TZWxlY3Rpb24oYnJpY2tJZDogc3RyaW5nKTogdm9pZDtcblxuICAgIHJlbW92ZUJyaWNrRnJvbVNlbGVjdGlvbihicmlja0lkOiBzdHJpbmcpOiB2b2lkO1xuXG4gICAgdW5TZWxlY3RCcmlja3MoKTogdm9pZDtcblxuICAgIGZvY3VzT25Ccmlja0lkKGJyaWNrSWQ6IHN0cmluZywgZm9jdXNDb250ZXh0PzogSUZvY3VzQ29udGV4dCk7XG5cbiAgICBnZXRGb2N1c2VkQnJpY2tJZCgpOiBzdHJpbmc7XG5cbiAgICBmb2N1c09uUHJldmlvdXNUZXh0QnJpY2soYnJpY2tJZDogc3RyaW5nLCBmb2N1c0NvbnRleHQ/OiBJRm9jdXNDb250ZXh0KTtcblxuICAgIGZvY3VzT25OZXh0VGV4dEJyaWNrKGJyaWNrSWQ6IHN0cmluZywgZm9jdXNDb250ZXh0PzogSUZvY3VzQ29udGV4dCk7XG5cbiAgICByZW1vdmVCcmljayhicmlja0lkOiBzdHJpbmcpOiB2b2lkO1xuXG4gICAgcmVtb3ZlQnJpY2tzKGJyaWNrSWRzOiBzdHJpbmdbXSk6IHZvaWQ7XG5cbiAgICBnZXRTZWxlY3RlZEJyaWNrSWRzKCk6IHN0cmluZ1tdO1xuXG4gICAgZW5hYmxlTWVkaWFJbnRlcmFjdGlvbigpOiB2b2lkO1xuXG4gICAgZGlzYWJsZU1lZGlhSW50ZXJhY3Rpb24oKTogdm9pZDtcblxuICAgIHN1YnNjcmliZShjYWxsYmFjazogYW55KTogU3Vic2NyaXB0aW9uO1xufVxuIl19