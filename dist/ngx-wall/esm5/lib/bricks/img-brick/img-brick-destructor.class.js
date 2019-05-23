/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable } from '@angular/core';
import { WALL_FILE_UPLOADER } from '../../modules/file-uploader/file-uploader';
var ImgModel = /** @class */ (function () {
    function ImgModel(wallFileUploader) {
        this.wallFileUploader = wallFileUploader;
    }
    /**
     * @param {?} brickSnapshot
     * @return {?}
     */
    ImgModel.prototype.remove = /**
     * @param {?} brickSnapshot
     * @return {?}
     */
    function (brickSnapshot) {
        /** @type {?} */
        var state = brickSnapshot.state;
        if (state.src && state.metadata && state.metadata.path) {
            return this.wallFileUploader.remove(state.metadata.path);
        }
        return Promise.resolve();
    };
    ImgModel.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ImgModel.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [WALL_FILE_UPLOADER,] }] }
    ]; };
    return ImgModel;
}());
export { ImgModel };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ImgModel.prototype.wallFileUploader;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1nLWJyaWNrLWRlc3RydWN0b3IuY2xhc3MuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9icmlja3MvaW1nLWJyaWNrL2ltZy1icmljay1kZXN0cnVjdG9yLmNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQW9CLGtCQUFrQixFQUFDLE1BQU0sMkNBQTJDLENBQUM7QUFJaEc7SUFFSSxrQkFBZ0QsZ0JBQW1DO1FBQW5DLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBbUI7SUFDbkYsQ0FBQzs7Ozs7SUFFRCx5QkFBTTs7OztJQUFOLFVBQU8sYUFBNkI7O1lBQzFCLEtBQUssR0FBa0IsYUFBYSxDQUFDLEtBQUs7UUFFaEQsSUFBSSxLQUFLLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7WUFDcEQsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDNUQ7UUFFRCxPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM3QixDQUFDOztnQkFiSixVQUFVOzs7O2dEQUVNLE1BQU0sU0FBQyxrQkFBa0I7O0lBWTFDLGVBQUM7Q0FBQSxBQWRELElBY0M7U0FiWSxRQUFROzs7Ozs7SUFDTCxvQ0FBdUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0lXYWxsRmlsZVVwbG9hZGVyLCBXQUxMX0ZJTEVfVVBMT0FERVJ9IGZyb20gJy4uLy4uL21vZHVsZXMvZmlsZS11cGxvYWRlci9maWxlLXVwbG9hZGVyJztcbmltcG9ydCB7SUJyaWNrU25hcHNob3R9IGZyb20gJy4uLy4uL3dhbGwvd2FsbCc7XG5pbXBvcnQge0ltZ0JyaWNrU3RhdGV9IGZyb20gJy4vaW1nLWJyaWNrLXN0YXRlLmludGVyZmFjZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJbWdNb2RlbCB7XG4gICAgY29uc3RydWN0b3IoQEluamVjdChXQUxMX0ZJTEVfVVBMT0FERVIpIHByaXZhdGUgd2FsbEZpbGVVcGxvYWRlcjogSVdhbGxGaWxlVXBsb2FkZXIpIHtcbiAgICB9XG5cbiAgICByZW1vdmUoYnJpY2tTbmFwc2hvdDogSUJyaWNrU25hcHNob3QpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBjb25zdCBzdGF0ZTogSW1nQnJpY2tTdGF0ZSA9IGJyaWNrU25hcHNob3Quc3RhdGU7XG5cbiAgICAgICAgaWYgKHN0YXRlLnNyYyAmJiBzdGF0ZS5tZXRhZGF0YSAmJiBzdGF0ZS5tZXRhZGF0YS5wYXRoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy53YWxsRmlsZVVwbG9hZGVyLnJlbW92ZShzdGF0ZS5tZXRhZGF0YS5wYXRoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG59XG4iXX0=