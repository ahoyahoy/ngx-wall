/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DOCUMENT } from '@angular/common';
export class CopyPlugin {
    /**
     * @param {?} injector
     */
    constructor(injector) {
        this.injector = injector;
        this.doc = null;
        this.doc = this.injector.get(DOCUMENT);
        this.onCopyBound = this.onCopy.bind(this);
        this.doc.addEventListener('copy', this.onCopyBound);
    }
    /**
     * @param {?} model
     * @return {?}
     */
    onWallInitialize(model) {
        this.wallModel = model;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onCopy(e) {
        /** @type {?} */
        const selectedTextRepresentation = this.getSelectedTextRepresentation();
        if (selectedTextRepresentation.length) {
            e.preventDefault();
            this.addToClipboard(e, selectedTextRepresentation);
        }
    }
    /**
     * @return {?}
     */
    onWallPluginDestroy() {
        this.doc.removeEventListener('click', this.onCopy);
    }
    /**
     * @private
     * @param {?} e
     * @param {?} str
     * @return {?}
     */
    addToClipboard(e, str) {
        e.clipboardData.setData('text/plain', str);
    }
    /**
     * @private
     * @return {?}
     */
    getSelectedTextRepresentation() {
        /** @type {?} */
        const selectedBrickIds = this.wallModel.api.ui.getSelectedBrickIds();
        return selectedBrickIds
            .map((selectedBrickId) => this.wallModel.api.core.getBrickTextRepresentation(selectedBrickId))
            .map((textRepresentation) => textRepresentation.trim())
            .join('\n');
    }
}
if (false) {
    /** @type {?} */
    CopyPlugin.prototype.name;
    /** @type {?} */
    CopyPlugin.prototype.version;
    /** @type {?} */
    CopyPlugin.prototype.doc;
    /** @type {?} */
    CopyPlugin.prototype.onCopyBound;
    /** @type {?} */
    CopyPlugin.prototype.wallModel;
    /**
     * @type {?}
     * @private
     */
    CopyPlugin.prototype.injector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weS5wbHVnaW4uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9wbHVnaW5zL2NvcHkvY29weS5wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUl6QyxNQUFNLE9BQU8sVUFBVTs7OztJQVVuQixZQUFvQixRQUFrQjtRQUFsQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBTnRDLFFBQUcsR0FBYSxJQUFJLENBQUM7UUFPakIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV2QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTFDLElBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN4RCxDQUFDOzs7OztJQUVELGdCQUFnQixDQUFDLEtBQWlCO1FBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQzNCLENBQUM7Ozs7O0lBRUQsTUFBTSxDQUFDLENBQWlCOztjQUNkLDBCQUEwQixHQUFHLElBQUksQ0FBQyw2QkFBNkIsRUFBRTtRQUV2RSxJQUFJLDBCQUEwQixDQUFDLE1BQU0sRUFBRTtZQUNuQyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7WUFFbkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztTQUN0RDtJQUNMLENBQUM7Ozs7SUFFRCxtQkFBbUI7UUFDZixJQUFJLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkQsQ0FBQzs7Ozs7OztJQUVPLGNBQWMsQ0FBQyxDQUFpQixFQUFFLEdBQVc7UUFDakQsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQy9DLENBQUM7Ozs7O0lBRU8sNkJBQTZCOztjQUMzQixnQkFBZ0IsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUU7UUFFcEUsT0FBTyxnQkFBZ0I7YUFDbEIsR0FBRyxDQUFDLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsZUFBZSxDQUFDLENBQUM7YUFDN0YsR0FBRyxDQUFDLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxDQUFDO2FBQ3RELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQixDQUFDO0NBQ0o7OztJQS9DRywwQkFBYTs7SUFDYiw2QkFBaUI7O0lBRWpCLHlCQUFxQjs7SUFFckIsaUNBQWlCOztJQUVqQiwrQkFBc0I7Ozs7O0lBRVYsOEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SW5qZWN0b3J9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtJV2FsbE1vZGVsLCBJV2FsbFBsdWdpbn0gZnJvbSAnLi4vLi4vd2FsbC93YWxsJztcblxuZXhwb3J0IGNsYXNzIENvcHlQbHVnaW4gaW1wbGVtZW50cyBJV2FsbFBsdWdpbiB7XG4gICAgbmFtZTogJ2NvcHknO1xuICAgIHZlcnNpb246ICcwLjAuMCc7XG5cbiAgICBkb2M6IERvY3VtZW50ID0gbnVsbDtcblxuICAgIG9uQ29weUJvdW5kOiBhbnk7XG5cbiAgICB3YWxsTW9kZWw6IElXYWxsTW9kZWw7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgICAgICB0aGlzLmRvYyA9IHRoaXMuaW5qZWN0b3IuZ2V0KERPQ1VNRU5UKTtcblxuICAgICAgICB0aGlzLm9uQ29weUJvdW5kID0gdGhpcy5vbkNvcHkuYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLmRvYy5hZGRFdmVudExpc3RlbmVyKCdjb3B5JywgdGhpcy5vbkNvcHlCb3VuZCk7XG4gICAgfVxuXG4gICAgb25XYWxsSW5pdGlhbGl6ZShtb2RlbDogSVdhbGxNb2RlbCkge1xuICAgICAgICB0aGlzLndhbGxNb2RlbCA9IG1vZGVsO1xuICAgIH1cblxuICAgIG9uQ29weShlOiBDbGlwYm9hcmRFdmVudCkge1xuICAgICAgICBjb25zdCBzZWxlY3RlZFRleHRSZXByZXNlbnRhdGlvbiA9IHRoaXMuZ2V0U2VsZWN0ZWRUZXh0UmVwcmVzZW50YXRpb24oKTtcblxuICAgICAgICBpZiAoc2VsZWN0ZWRUZXh0UmVwcmVzZW50YXRpb24ubGVuZ3RoKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHRoaXMuYWRkVG9DbGlwYm9hcmQoZSwgc2VsZWN0ZWRUZXh0UmVwcmVzZW50YXRpb24pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25XYWxsUGx1Z2luRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kb2MucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQ29weSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRUb0NsaXBib2FyZChlOiBDbGlwYm9hcmRFdmVudCwgc3RyOiBzdHJpbmcpIHtcbiAgICAgICAgZS5jbGlwYm9hcmREYXRhLnNldERhdGEoJ3RleHQvcGxhaW4nLCBzdHIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0U2VsZWN0ZWRUZXh0UmVwcmVzZW50YXRpb24oKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRCcmlja0lkcyA9IHRoaXMud2FsbE1vZGVsLmFwaS51aS5nZXRTZWxlY3RlZEJyaWNrSWRzKCk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkQnJpY2tJZHNcbiAgICAgICAgICAgIC5tYXAoKHNlbGVjdGVkQnJpY2tJZCkgPT4gdGhpcy53YWxsTW9kZWwuYXBpLmNvcmUuZ2V0QnJpY2tUZXh0UmVwcmVzZW50YXRpb24oc2VsZWN0ZWRCcmlja0lkKSlcbiAgICAgICAgICAgIC5tYXAoKHRleHRSZXByZXNlbnRhdGlvbikgPT4gdGV4dFJlcHJlc2VudGF0aW9uLnRyaW0oKSlcbiAgICAgICAgICAgIC5qb2luKCdcXG4nKTtcbiAgICB9XG59XG4iXX0=