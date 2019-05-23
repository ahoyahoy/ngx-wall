/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable } from '@angular/core';
import { WALL_FILE_UPLOADER } from '../../modules/file-uploader/file-uploader';
export class ImgModel {
    /**
     * @param {?} wallFileUploader
     */
    constructor(wallFileUploader) {
        this.wallFileUploader = wallFileUploader;
    }
    /**
     * @param {?} brickSnapshot
     * @return {?}
     */
    remove(brickSnapshot) {
        /** @type {?} */
        const state = brickSnapshot.state;
        if (state.src && state.metadata && state.metadata.path) {
            return this.wallFileUploader.remove(state.metadata.path);
        }
        return Promise.resolve();
    }
}
ImgModel.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ImgModel.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [WALL_FILE_UPLOADER,] }] }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    ImgModel.prototype.wallFileUploader;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1nLWJyaWNrLWRlc3RydWN0b3IuY2xhc3MuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9icmlja3MvaW1nLWJyaWNrL2ltZy1icmljay1kZXN0cnVjdG9yLmNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQW9CLGtCQUFrQixFQUFDLE1BQU0sMkNBQTJDLENBQUM7QUFLaEcsTUFBTSxPQUFPLFFBQVE7Ozs7SUFDakIsWUFBZ0QsZ0JBQW1DO1FBQW5DLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBbUI7SUFDbkYsQ0FBQzs7Ozs7SUFFRCxNQUFNLENBQUMsYUFBNkI7O2NBQzFCLEtBQUssR0FBa0IsYUFBYSxDQUFDLEtBQUs7UUFFaEQsSUFBSSxLQUFLLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7WUFDcEQsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDNUQ7UUFFRCxPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM3QixDQUFDOzs7WUFiSixVQUFVOzs7OzRDQUVNLE1BQU0sU0FBQyxrQkFBa0I7Ozs7Ozs7SUFBMUIsb0NBQXVFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtJV2FsbEZpbGVVcGxvYWRlciwgV0FMTF9GSUxFX1VQTE9BREVSfSBmcm9tICcuLi8uLi9tb2R1bGVzL2ZpbGUtdXBsb2FkZXIvZmlsZS11cGxvYWRlcic7XG5pbXBvcnQge0lCcmlja1NuYXBzaG90fSBmcm9tICcuLi8uLi93YWxsL3dhbGwnO1xuaW1wb3J0IHtJbWdCcmlja1N0YXRlfSBmcm9tICcuL2ltZy1icmljay1zdGF0ZS5pbnRlcmZhY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSW1nTW9kZWwge1xuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoV0FMTF9GSUxFX1VQTE9BREVSKSBwcml2YXRlIHdhbGxGaWxlVXBsb2FkZXI6IElXYWxsRmlsZVVwbG9hZGVyKSB7XG4gICAgfVxuXG4gICAgcmVtb3ZlKGJyaWNrU25hcHNob3Q6IElCcmlja1NuYXBzaG90KTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgY29uc3Qgc3RhdGU6IEltZ0JyaWNrU3RhdGUgPSBicmlja1NuYXBzaG90LnN0YXRlO1xuXG4gICAgICAgIGlmIChzdGF0ZS5zcmMgJiYgc3RhdGUubWV0YWRhdGEgJiYgc3RhdGUubWV0YWRhdGEucGF0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMud2FsbEZpbGVVcGxvYWRlci5yZW1vdmUoc3RhdGUubWV0YWRhdGEucGF0aCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxufVxuIl19