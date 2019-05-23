/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        return new Promise(function (resolve, reject) {
            /** @type {?} */
            var reader = new FileReader();
            reader.onload = function (event) {
                resolve(event.target.result);
            };
            reader.onerror = function (event) {
                reject(event);
            };
            reader.readAsDataURL(_this.image);
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1nLWVuY29kZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL21vZHVsZXMvdXRpbHMvaW1nLWVuY29kZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUE7SUFDSSxvQkFBb0IsS0FBVztRQUFYLFVBQUssR0FBTCxLQUFLLENBQU07SUFDL0IsQ0FBQzs7OztJQUVELDRDQUF1Qjs7O0lBQXZCO1FBQUEsaUJBY0M7UUFiRyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07O2dCQUN6QixNQUFNLEdBQUcsSUFBSSxVQUFVLEVBQUU7WUFFL0IsTUFBTSxDQUFDLE1BQU0sR0FBRyxVQUFDLEtBQVU7Z0JBQ3ZCLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pDLENBQUMsQ0FBQztZQUVGLE1BQU0sQ0FBQyxPQUFPLEdBQUcsVUFBQyxLQUFVO2dCQUN4QixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEIsQ0FBQyxDQUFDO1lBRUYsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0wsaUJBQUM7QUFBRCxDQUFDLEFBbkJELElBbUJDOzs7Ozs7O0lBbEJlLDJCQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBJbWdFbmNvZGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGltYWdlOiBGaWxlKSB7XG4gICAgfVxuXG4gICAgZ2V0QmFzZTY0UmVwcmVzZW50YXRpb24oKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cbiAgICAgICAgICAgIHJlYWRlci5vbmxvYWQgPSAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoZXZlbnQudGFyZ2V0LnJlc3VsdCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZWFkZXIub25lcnJvciA9IChldmVudDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGV2ZW50KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKHRoaXMuaW1hZ2UpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=