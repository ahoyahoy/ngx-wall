/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DOCUMENT } from '@angular/common';
import { BeforeChangeEvent, SetPlanEvent } from '../../wall/wall';
import { UNDO_REDO_API_NAME } from './undo-redo.constant';
var UndoRedoPlugin = /** @class */ (function () {
    function UndoRedoPlugin(injector) {
        this.injector = injector;
        this.processingUndo = false;
        this.undoPlanStack = [];
        this.redoPlanStack = [];
        this.doc = this.injector.get(DOCUMENT);
    }
    /**
     * @param {?} wallModel
     * @return {?}
     */
    UndoRedoPlugin.prototype.onWallInitialize = /**
     * @param {?} wallModel
     * @return {?}
     */
    function (wallModel) {
        var _this = this;
        this.wallModel = wallModel;
        this.wallModel.registerApi(UNDO_REDO_API_NAME, (/** @type {?} */ ({
            undo: this.undo.bind(this),
            undoSize: this.undoSize.bind(this),
            redo: this.redo.bind(this),
            redoSize: this.redoSize.bind(this),
            clear: this.clear.bind(this)
        })));
        this.apiSubscription = this.wallModel.api.core.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            _this.wallModelEventHandler(e);
        }));
        this.onUndoKeyHandlerBound = this.onUndoKeyHandler.bind(this);
        this.doc.addEventListener('keydown', this.onUndoKeyHandlerBound);
    };
    /**
     * @return {?}
     */
    UndoRedoPlugin.prototype.onWallPluginDestroy = /**
     * @return {?}
     */
    function () {
        this.apiSubscription.unsubscribe();
        this.doc.removeEventListener('keydown', this.onUndoKeyHandlerBound);
    };
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    UndoRedoPlugin.prototype.onUndoKeyHandler = /**
     * @private
     * @param {?} e
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var CTRL_KEY = 90;
        if (e.keyCode === CTRL_KEY && e.ctrlKey) {
            e.preventDefault();
            e.stopPropagation();
            if (e.shiftKey) {
                this.redo();
            }
            else {
                this.undo();
            }
        }
    };
    /**
     * @private
     * @return {?}
     */
    UndoRedoPlugin.prototype.undoSize = /**
     * @private
     * @return {?}
     */
    function () {
        return this.undoPlanStack.length;
    };
    /**
     * @private
     * @return {?}
     */
    UndoRedoPlugin.prototype.redoSize = /**
     * @private
     * @return {?}
     */
    function () {
        return this.redoPlanStack.length;
    };
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    UndoRedoPlugin.prototype.wallModelEventHandler = /**
     * @private
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (!this.processingUndo) {
            if (e instanceof BeforeChangeEvent && ((/** @type {?} */ (e))).beforeEventType !== SetPlanEvent) {
                this.undoPlanStack.push(this.wallModel.api.core.getPlan());
                this.redoPlanStack = [];
            }
        }
    };
    /**
     * @private
     * @return {?}
     */
    UndoRedoPlugin.prototype.redo = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var redoPlan = this.redoPlanStack.pop();
        if (redoPlan) {
            this.processingUndo = true;
            this.wallModel.api.core.setPlan(redoPlan);
            this.undoPlanStack.push(redoPlan);
            this.processingUndo = false;
        }
    };
    /**
     * @private
     * @return {?}
     */
    UndoRedoPlugin.prototype.undo = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var previousPlan = this.undoPlanStack.pop();
        if (previousPlan) {
            this.processingUndo = true;
            this.wallModel.api.core.setPlan(previousPlan);
            this.redoPlanStack.push(previousPlan);
            this.processingUndo = false;
        }
    };
    /**
     * @private
     * @return {?}
     */
    UndoRedoPlugin.prototype.clear = /**
     * @private
     * @return {?}
     */
    function () {
        this.undoPlanStack = [];
        this.redoPlanStack = [];
    };
    return UndoRedoPlugin;
}());
export { UndoRedoPlugin };
if (false) {
    /** @type {?} */
    UndoRedoPlugin.prototype.name;
    /** @type {?} */
    UndoRedoPlugin.prototype.version;
    /**
     * @type {?}
     * @private
     */
    UndoRedoPlugin.prototype.wallModel;
    /**
     * @type {?}
     * @private
     */
    UndoRedoPlugin.prototype.doc;
    /**
     * @type {?}
     * @private
     */
    UndoRedoPlugin.prototype.onUndoKeyHandlerBound;
    /**
     * @type {?}
     * @private
     */
    UndoRedoPlugin.prototype.apiSubscription;
    /**
     * @type {?}
     * @private
     */
    UndoRedoPlugin.prototype.processingUndo;
    /**
     * @type {?}
     * @private
     */
    UndoRedoPlugin.prototype.undoPlanStack;
    /**
     * @type {?}
     * @private
     */
    UndoRedoPlugin.prototype.redoPlanStack;
    /**
     * @type {?}
     * @private
     */
    UndoRedoPlugin.prototype.injector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5kby1yZWRvLnBsdWdpbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL3BsdWdpbnMvdW5kby1yZWRvL3VuZG8tcmVkby5wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUd6QyxPQUFPLEVBQUMsaUJBQWlCLEVBQTRDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRTFHLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRXhEO0lBaUJJLHdCQUFvQixRQUFrQjtRQUFsQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBTDlCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBRXZCLGtCQUFhLEdBQXNCLEVBQUUsQ0FBQztRQUN0QyxrQkFBYSxHQUFzQixFQUFFLENBQUM7UUFHMUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMzQyxDQUFDOzs7OztJQUVELHlDQUFnQjs7OztJQUFoQixVQUFpQixTQUFxQjtRQUF0QyxpQkFrQkM7UUFqQkcsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFFM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLEVBQUUsbUJBQUE7WUFDM0MsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUMxQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2xDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDMUIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNsQyxLQUFLLEVBQUUsSUFBSSxD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LGFBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFdEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7U0FDL0I7SUFDTCxDQUFDOzs7OztJQUVPLDhCQUFLOzs7O0lBQWI7UUFDSSxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBaEhELElBZ0hDOzs7O0lBL0dHLDhCQUFpQjs7SUFDakIsaUNBQWlCOzs7OztJQUVqQixtQ0FBOEI7Ozs7O0lBRTlCLDZCQUFzQjs7Ozs7SUFFdEIsK0NBQW1DOzs7OztJQUVuQyx5Q0FBc0M7Ozs7O0lBRXRDLHdDQUErQjs7Ozs7SUFFL0IsdUNBQThDOzs7OztJQUM5Qyx1Q0FBOEM7Ozs7O0lBRWxDLGtDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0luamVjdG9yfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7QmVmb3JlQ2hhbmdlRXZlbnQsIElXYWxsRGVmaW5pdGlvbiwgSVdhbGxNb2RlbCwgSVdhbGxQbHVnaW4sIFNldFBsYW5FdmVudH0gZnJvbSAnLi4vLi4vd2FsbC93YWxsJztcbmltcG9ydCB7SVVuZG9SZWRvQXBpfSBmcm9tICcuL3VuZG8tcmVkby1hcGkuaW50ZXJmYWNlJztcbmltcG9ydCB7VU5ET19SRURPX0FQSV9OQU1FfSBmcm9tICcuL3VuZG8tcmVkby5jb25zdGFudCc7XG5cbmV4cG9ydCBjbGFzcyBVbmRvUmVkb1BsdWdpbiBpbXBsZW1lbnRzIElXYWxsUGx1Z2luIHtcbiAgICBuYW1lOiAndW5kb3JlZG8nO1xuICAgIHZlcnNpb246ICcwLjAuMCc7XG5cbiAgICBwcml2YXRlIHdhbGxNb2RlbDogSVdhbGxNb2RlbDtcblxuICAgIHByaXZhdGUgZG9jOiBEb2N1bWVudDtcblxuICAgIHByaXZhdGUgb25VbmRvS2V5SGFuZGxlckJvdW5kOiBhbnk7XG5cbiAgICBwcml2YXRlIGFwaVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgcHJpdmF0ZSBwcm9jZXNzaW5nVW5kbyA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSB1bmRvUGxhblN0YWNrOiBJV2FsbERlZmluaXRpb25bXSA9IFtdO1xuICAgIHByaXZhdGUgcmVkb1BsYW5TdGFjazogSVdhbGxEZWZpbml0aW9uW10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgICAgIHRoaXMuZG9jID0gdGhpcy5pbmplY3Rvci5nZXQoRE9DVU1FTlQpO1xuICAgIH1cblxuICAgIG9uV2FsbEluaXRpYWxpemUod2FsbE1vZGVsOiBJV2FsbE1vZGVsKSB7XG4gICAgICAgIHRoaXMud2FsbE1vZGVsID0gd2FsbE1vZGVsO1xuXG4gICAgICAgIHRoaXMud2FsbE1vZGVsLnJlZ2lzdGVyQXBpKFVORE9fUkVET19BUElfTkFNRSwge1xuICAgICAgICAgICAgdW5kbzogdGhpcy51bmRvLmJpbmQodGhpcyksXG4gICAgICAgICAgICB1bmRvU2l6ZTogdGhpcy51bmRvU2l6ZS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgcmVkbzogdGhpcy5yZWRvLmJpbmQodGhpcyksXG4gICAgICAgICAgICByZWRvU2l6ZTogdGhpcy5yZWRvU2l6ZS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgY2xlYXI6IHRoaXMuY2xlYXIuYmluZCh0aGlzKVxuICAgICAgICB9IGFzIElVbmRvUmVkb0FwaSk7XG5cbiAgICAgICAgdGhpcy5hcGlTdWJzY3JpcHRpb24gPSB0aGlzLndhbGxNb2RlbC5hcGkuY29yZS5zdWJzY3JpYmUoKGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMud2FsbE1vZGVsRXZlbnRIYW5kbGVyKGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm9uVW5kb0tleUhhbmRsZXJCb3VuZCA9IHRoaXMub25VbmRvS2V5SGFuZGxlci5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uVW5kb0tleUhhbmRsZXJCb3VuZCk7XG4gICAgfVxuXG4gICAgb25XYWxsUGx1Z2luRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5hcGlTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcblxuICAgICAgICB0aGlzLmRvYy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vblVuZG9LZXlIYW5kbGVyQm91bmQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25VbmRvS2V5SGFuZGxlcihlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGNvbnN0IENUUkxfS0VZID0gOTA7XG5cbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gQ1RSTF9LRVkgJiYgZS5jdHJsS2V5KSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICBpZiAoZS5zaGlmdEtleSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVkbygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVuZG8oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdW5kb1NpemUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudW5kb1BsYW5TdGFjay5sZW5ndGg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWRvU2l6ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRvUGxhblN0YWNrLmxlbmd0aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHdhbGxNb2RlbEV2ZW50SGFuZGxlcihlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb2Nlc3NpbmdVbmRvKSB7XG4gICAgICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIEJlZm9yZUNoYW5nZUV2ZW50ICYmIChlIGFzIEJlZm9yZUNoYW5nZUV2ZW50KS5iZWZvcmVFdmVudFR5cGUgIT09IFNldFBsYW5FdmVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMudW5kb1BsYW5TdGFjay5wdXNoKHRoaXMud2FsbE1vZGVsLmFwaS5jb3JlLmdldFBsYW4oKSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlZG9QbGFuU3RhY2sgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVkbygpIHtcbiAgICAgICAgY29uc3QgcmVkb1BsYW4gPSB0aGlzLnJlZG9QbGFuU3RhY2sucG9wKCk7XG5cbiAgICAgICAgaWYgKHJlZG9QbGFuKSB7XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NpbmdVbmRvID0gdHJ1ZTtcblxuICAgICAgICAgICAgdGhpcy53YWxsTW9kZWwuYXBpLmNvcmUuc2V0UGxhbihyZWRvUGxhbik7XG5cbiAgICAgICAgICAgIHRoaXMudW5kb1BsYW5TdGFjay5wdXNoKHJlZG9QbGFuKTtcblxuICAgICAgICAgICAgdGhpcy5wcm9jZXNzaW5nVW5kbyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1bmRvKCkge1xuICAgICAgICBjb25zdCBwcmV2aW91c1BsYW4gPSB0aGlzLnVuZG9QbGFuU3RhY2sucG9wKCk7XG5cbiAgICAgICAgaWYgKHByZXZpb3VzUGxhbikge1xuICAgICAgICAgICAgdGhpcy5wcm9jZXNzaW5nVW5kbyA9IHRydWU7XG5cbiAgICAgICAgICAgIHRoaXMud2FsbE1vZGVsLmFwaS5jb3JlLnNldFBsYW4ocHJldmlvdXNQbGFuKTtcblxuICAgICAgICAgICAgdGhpcy5yZWRvUGxhblN0YWNrLnB1c2gocHJldmlvdXNQbGFuKTtcblxuICAgICAgICAgICAgdGhpcy5wcm9jZXNzaW5nVW5kbyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjbGVhcigpIHtcbiAgICAgICAgdGhpcy51bmRvUGxhblN0YWNrID0gW107XG4gICAgICAgIHRoaXMucmVkb1BsYW5TdGFjayA9IFtdO1xuICAgIH1cbn1cbiJdfQ==