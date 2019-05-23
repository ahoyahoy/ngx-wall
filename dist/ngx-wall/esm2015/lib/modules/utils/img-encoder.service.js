/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class ImgEncoder {
    /**
     * @param {?} image
     */
    constructor(image) {
        this.image = image;
    }
    /**
     * @return {?}
     */
    getBase64Representation() {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            /** @type {?} */
            const reader = new FileReader();
            reader.onload = (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                resolve(event.target.result);
            });
            reader.onerror = (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                reject(event);
            });
            reader.readAsDataURL(this.image);
        }));
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    ImgEncoder.prototype.image;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1nLWVuY29kZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL21vZHVsZXMvdXRpbHMvaW1nLWVuY29kZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTSxPQUFPLFVBQVU7Ozs7SUFDbkIsWUFBb0IsS0FBVztRQUFYLFVBQUssR0FBTCxLQUFLLENBQU07SUFDL0IsQ0FBQzs7OztJQUVELHVCQUF1QjtRQUNuQixPQUFPLElBQUksT0FBTzs7Ozs7UUFBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTs7a0JBQzdCLE1BQU0sR0FBRyxJQUFJLFVBQVUsRUFBRTtZQUUvQixNQUFNLENBQUMsTUFBTTs7OztZQUFHLENBQUMsS0FBVSxFQUFFLEVBQUU7Z0JBQzNCLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pDLENBQUMsQ0FBQSxDQUFDO1lBRUYsTUFBTSxDQUFDLE9BQU87Ozs7WUFBRyxDQUFDLEtBQVUsRUFBRSxFQUFFO2dCQUM1QixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEIsQ0FBQyxDQUFBLENBQUM7WUFFRixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQyxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjs7Ozs7O0lBbEJlLDJCQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBJbWdFbmNvZGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGltYWdlOiBGaWxlKSB7XG4gICAgfVxuXG4gICAgZ2V0QmFzZTY0UmVwcmVzZW50YXRpb24oKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cbiAgICAgICAgICAgIHJlYWRlci5vbmxvYWQgPSAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoZXZlbnQudGFyZ2V0LnJlc3VsdCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZWFkZXIub25lcnJvciA9IChldmVudDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGV2ZW50KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKHRoaXMuaW1hZ2UpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=