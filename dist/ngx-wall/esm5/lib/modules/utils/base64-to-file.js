/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Base64ToFile = /** @class */ (function () {
    function Base64ToFile(base64, fileName) {
        this.base64 = base64;
        this.fileName = fileName;
    }
    /**
     * @return {?}
     */
    Base64ToFile.prototype.getFile = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var arr = this.base64.split(',');
        /** @type {?} */
        var mime = arr[0].match(/:(.*?);/)[1];
        /** @type {?} */
        var bstr = atob(arr[1]);
        /** @type {?} */
        var n = bstr.length;
        /** @type {?} */
        var u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], this.fileName, { type: mime });
    };
    return Base64ToFile;
}());
export { Base64ToFile };
if (false) {
    /**
     * @type {?}
     * @private
     */
    Base64ToFile.prototype.base64;
    /**
     * @type {?}
     * @private
     */
    Base64ToFile.prototype.fileName;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZTY0LXRvLWZpbGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9tb2R1bGVzL3V0aWxzL2Jhc2U2NC10by1maWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtJQUNJLHNCQUFvQixNQUFjLEVBQVUsUUFBZ0I7UUFBeEMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVE7SUFDNUQsQ0FBQzs7OztJQUVELDhCQUFPOzs7SUFBUDs7WUFDVSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDOztZQUM1QixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7O1lBQ2pDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUNyQixDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU07O1lBQ2IsS0FBSyxHQUFHLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQztRQUUvQixPQUFPLENBQUMsRUFBRSxFQUFFO1lBQ1IsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDakM7UUFFRCxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFDTCxtQkFBQztBQUFELENBQUMsQUFqQkQsSUFpQkM7Ozs7Ozs7SUFoQmUsOEJBQXNCOzs7OztJQUFFLGdDQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBCYXNlNjRUb0ZpbGUge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYmFzZTY0OiBzdHJpbmcsIHByaXZhdGUgZmlsZU5hbWU6IHN0cmluZykge1xuICAgIH1cblxuICAgIGdldEZpbGUoKTogRmlsZSB7XG4gICAgICAgIGNvbnN0IGFyciA9IHRoaXMuYmFzZTY0LnNwbGl0KCcsJyk7XG4gICAgICAgIGNvbnN0IG1pbWUgPSBhcnJbMF0ubWF0Y2goLzooLio/KTsvKVsxXTtcbiAgICAgICAgY29uc3QgYnN0ciA9IGF0b2IoYXJyWzFdKTtcbiAgICAgICAgbGV0IG4gPSBic3RyLmxlbmd0aDtcbiAgICAgICAgY29uc3QgdThhcnIgPSBuZXcgVWludDhBcnJheShuKTtcblxuICAgICAgICB3aGlsZSAobi0tKSB7XG4gICAgICAgICAgICB1OGFycltuXSA9IGJzdHIuY2hhckNvZGVBdChuKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgRmlsZShbdThhcnJdLCB0aGlzLmZpbGVOYW1lLCB7dHlwZTogbWltZX0pO1xuICAgIH1cbn1cbiJdfQ==