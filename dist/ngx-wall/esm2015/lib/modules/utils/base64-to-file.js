/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class Base64ToFile {
    /**
     * @param {?} base64
     * @param {?} fileName
     */
    constructor(base64, fileName) {
        this.base64 = base64;
        this.fileName = fileName;
    }
    /**
     * @return {?}
     */
    getFile() {
        /** @type {?} */
        const arr = this.base64.split(',');
        /** @type {?} */
        const mime = arr[0].match(/:(.*?);/)[1];
        /** @type {?} */
        const bstr = atob(arr[1]);
        /** @type {?} */
        let n = bstr.length;
        /** @type {?} */
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], this.fileName, { type: mime });
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZTY0LXRvLWZpbGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9tb2R1bGVzL3V0aWxzL2Jhc2U2NC10by1maWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNLE9BQU8sWUFBWTs7Ozs7SUFDckIsWUFBb0IsTUFBYyxFQUFVLFFBQWdCO1FBQXhDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFRO0lBQzVELENBQUM7Ozs7SUFFRCxPQUFPOztjQUNHLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7O2NBQzVCLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Y0FDakMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7O1lBQ3JCLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTTs7Y0FDYixLQUFLLEdBQUcsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBRS9CLE9BQU8sQ0FBQyxFQUFFLEVBQUU7WUFDUixLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNqQztRQUVELE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7SUFDMUQsQ0FBQztDQUNKOzs7Ozs7SUFoQmUsOEJBQXNCOzs7OztJQUFFLGdDQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBCYXNlNjRUb0ZpbGUge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYmFzZTY0OiBzdHJpbmcsIHByaXZhdGUgZmlsZU5hbWU6IHN0cmluZykge1xuICAgIH1cblxuICAgIGdldEZpbGUoKTogRmlsZSB7XG4gICAgICAgIGNvbnN0IGFyciA9IHRoaXMuYmFzZTY0LnNwbGl0KCcsJyk7XG4gICAgICAgIGNvbnN0IG1pbWUgPSBhcnJbMF0ubWF0Y2goLzooLio/KTsvKVsxXTtcbiAgICAgICAgY29uc3QgYnN0ciA9IGF0b2IoYXJyWzFdKTtcbiAgICAgICAgbGV0IG4gPSBic3RyLmxlbmd0aDtcbiAgICAgICAgY29uc3QgdThhcnIgPSBuZXcgVWludDhBcnJheShuKTtcblxuICAgICAgICB3aGlsZSAobi0tKSB7XG4gICAgICAgICAgICB1OGFycltuXSA9IGJzdHIuY2hhckNvZGVBdChuKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgRmlsZShbdThhcnJdLCB0aGlzLmZpbGVOYW1lLCB7dHlwZTogbWltZX0pO1xuICAgIH1cbn1cbiJdfQ==