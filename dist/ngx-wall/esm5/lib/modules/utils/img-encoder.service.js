/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ImgEncoder = /** @class */ (function () {
    function ImgEncoder(image) {
        this.image = image;
    }
    /**
     * @return {?}
     */
    ImgEncoder.prototype.getBase64Representation = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            /** @type {?} */
            var reader = new FileReader();
            reader.onload = (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                resolve(event.target.result);
            });
            reader.onerror = (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                reject(event);
            });
            reader.readAsDataURL(_this.image);
        }));
    };
    return ImgEncoder;
}());
export { ImgEncoder };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ImgEncoder.prototype.image;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1nLWVuY29kZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL21vZHVsZXMvdXRpbHMvaW1nLWVuY29kZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUE7SUFDSSxvQkFBb0IsS0FBVztRQUFYLFVBQUssR0FBTCxLQUFLLENBQU07SUFDL0IsQ0FBQzs7OztJQUVELDRDQUF1Qjs7O0lBQXZCO1FBQUEsaUJBY0M7UUFiRyxPQUFPLElBQUksT0FBTzs7Ozs7UUFBQyxVQUFDLE9BQU8sRUFBRSxNQUFNOztnQkFDekIsTUFBTSxHQUFHLElBQUksVUFBVSxFQUFFO1lBRS9CLE1BQU0sQ0FBQyxNQUFNOzs7O1lBQUcsVUFBQyxLQUFVO2dCQUN2QixPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNqQyxDQUFDLENBQUEsQ0FBQztZQUVGLE1BQU0sQ0FBQyxPQUFPOzs7O1lBQUcsVUFBQyxLQUFVO2dCQUN4QixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEIsQ0FBQyxDQUFBLENBQUM7WUFFRixNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQyxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7SUFDTCxpQkFBQztBQUFELENBQUMsQUFuQkQsSUFtQkM7Ozs7Ozs7SUFsQmUsMkJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEltZ0VuY29kZXIge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaW1hZ2U6IEZpbGUpIHtcbiAgICB9XG5cbiAgICBnZXRCYXNlNjRSZXByZXNlbnRhdGlvbigpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuICAgICAgICAgICAgcmVhZGVyLm9ubG9hZCA9IChldmVudDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShldmVudC50YXJnZXQucmVzdWx0KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJlYWRlci5vbmVycm9yID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXZlbnQpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwodGhpcy5pbWFnZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==