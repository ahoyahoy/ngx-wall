/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DOCUMENT } from '@angular/common';
import { BeforeChangeEvent, SetPlanEvent } from '../../wall/wall';
import { UNDO_REDO_API_NAME } from './undo-redo.constant';
export class UndoRedoPlugin {
    /**
     * @param {?} injector
     */
    constructor(injector) {
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
    onWallInitialize(wallModel) {
        this.wallModel = wallModel;
        this.wallModel.registerApi(UNDO_REDO_API_NAME, (/** @type {?} */ ({
            undo: this.undo.bind(this),
            undoSize: this.undoSize.bind(this),
            redo: this.redo.bind(this),
            redoSize: this.redoSize.bind(this),
            clear: this.clear.bind(this)
        })));
        this.apiSubscription = this.wallModel.api.core.subscribe((e) => {
            this.wallModelEventHandler(e);
        });
        this.onUndoKeyHandlerBound = this.onUndoKeyHandler.bind(this);
        this.doc.addEventListener('keydown', this.onUndoKeyHandlerBound);
    }
    /**
     * @return {?}
     */
    onWallPluginDestroy() {
        this.apiSubscription.unsubscribe();
        this.doc.removeEventListener('keydown', this.onUndoKeyHandlerBound);
    }
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    onUndoKeyHandler(e) {
        /** @type {?} */
        const CTRL_KEY = 90;
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
    }
    /**
     * @private
     * @return {?}
     */
    undoSize() {
        return this.undoPlanStack.length;
    }
    /**
     * @private
     * @return {?}
     */
    redoSize() {
        return this.redoPlanStack.length;
    }
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    wallModelEventHandler(e) {
        if (!this.processingUndo) {
            if (e instanceof BeforeChangeEvent && ((/** @type {?} */ (e))).beforeEventType !== SetPlanEvent) {
                this.undoPlanStack.push(this.wallModel.api.core.getPlan());
                this.redoPlanStack = [];
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    redo() {
        /** @type {?} */
        const redoPlan = this.redoPlanStack.pop();
        if (redoPlan) {
            this.processingUndo = true;
            this.wallModel.api.core.setPlan(redoPlan);
            this.undoPlanStack.push(redoPlan);
            this.processingUndo = false;
        }
    }
    /**
     * @private
     * @return {?}
     */
    undo() {
        /** @type {?} */
        const previousPlan = this.undoPlanStack.pop();
        if (previousPlan) {
            this.processingUndo = true;
            this.wallModel.api.core.setPlan(previousPlan);
            this.redoPlanStack.push(previousPlan);
            this.processingUndo = false;
        }
    }
    /**
     * @private
     * @return {?}
     */
    clear() {
        this.undoPlanStack = [];
        this.redoPlanStack = [];
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5kby1yZWRvLnBsdWdpbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL3BsdWdpbnMvdW5kby1yZWRvL3VuZG8tcmVkby5wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUd6QyxPQUFPLEVBQUMsaUJBQWlCLEVBQTRDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRTFHLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRXhELE1BQU0sT0FBTyxjQUFjOzs7O0lBaUJ2QixZQUFvQixRQUFrQjtRQUFsQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBTDlCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBRXZCLGtCQUFhLEdBQXNCLEVBQUUsQ0FBQztRQUN0QyxrQkFBYSxHQUFzQixFQUFFLENBQUM7UUFHMUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMzQyxDQUFDOzs7OztJQUVELGdCQUFnQixDQUFDLFNBQXFCO1FBQ2xDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBRTNCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLGtCQUFrQixFQUFFLG1CQUFBO1lBQzNDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDMUIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNsQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzFCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDbEMsS0FBSyxFQUFFLElBQUksQ0FBQyxL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LENBQUM7U0FDL0I7SUFDTCxDQUFDOzs7OztJQUVPLEtBQUs7UUFDVCxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztJQUM1QixDQUFDO0NBQ0o7OztJQS9HRyw4QkFBaUI7O0lBQ2pCLGlDQUFpQjs7Ozs7SUFFakIsbUNBQThCOzs7OztJQUU5Qiw2QkFBc0I7Ozs7O0lBRXRCLCtDQUFtQzs7Ozs7SUFFbkMseUNBQXNDOzs7OztJQUV0Qyx3Q0FBK0I7Ozs7O0lBRS9CLHVDQUE4Qzs7Ozs7SUFDOUMsdUNBQThDOzs7OztJQUVsQyxrQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbmplY3Rvcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0JlZm9yZUNoYW5nZUV2ZW50LCBJV2FsbERlZmluaXRpb24sIElXYWxsTW9kZWwsIElXYWxsUGx1Z2luLCBTZXRQbGFuRXZlbnR9IGZyb20gJy4uLy4uL3dhbGwvd2FsbCc7XG5pbXBvcnQge0lVbmRvUmVkb0FwaX0gZnJvbSAnLi91bmRvLXJlZG8tYXBpLmludGVyZmFjZSc7XG5pbXBvcnQge1VORE9fUkVET19BUElfTkFNRX0gZnJvbSAnLi91bmRvLXJlZG8uY29uc3RhbnQnO1xuXG5leHBvcnQgY2xhc3MgVW5kb1JlZG9QbHVnaW4gaW1wbGVtZW50cyBJV2FsbFBsdWdpbiB7XG4gICAgbmFtZTogJ3VuZG9yZWRvJztcbiAgICB2ZXJzaW9uOiAnMC4wLjAnO1xuXG4gICAgcHJpdmF0ZSB3YWxsTW9kZWw6IElXYWxsTW9kZWw7XG5cbiAgICBwcml2YXRlIGRvYzogRG9jdW1lbnQ7XG5cbiAgICBwcml2YXRlIG9uVW5kb0tleUhhbmRsZXJCb3VuZDogYW55O1xuXG4gICAgcHJpdmF0ZSBhcGlTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIHByaXZhdGUgcHJvY2Vzc2luZ1VuZG8gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgdW5kb1BsYW5TdGFjazogSVdhbGxEZWZpbml0aW9uW10gPSBbXTtcbiAgICBwcml2YXRlIHJlZG9QbGFuU3RhY2s6IElXYWxsRGVmaW5pdGlvbltdID0gW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgICAgICB0aGlzLmRvYyA9IHRoaXMuaW5qZWN0b3IuZ2V0KERPQ1VNRU5UKTtcbiAgICB9XG5cbiAgICBvbldhbGxJbml0aWFsaXplKHdhbGxNb2RlbDogSVdhbGxNb2RlbCkge1xuICAgICAgICB0aGlzLndhbGxNb2RlbCA9IHdhbGxNb2RlbDtcblxuICAgICAgICB0aGlzLndhbGxNb2RlbC5yZWdpc3RlckFwaShVTkRPX1JFRE9fQVBJX05BTUUsIHtcbiAgICAgICAgICAgIHVuZG86IHRoaXMudW5kby5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgdW5kb1NpemU6IHRoaXMudW5kb1NpemUuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHJlZG86IHRoaXMucmVkby5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgcmVkb1NpemU6IHRoaXMucmVkb1NpemUuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGNsZWFyOiB0aGlzLmNsZWFyLmJpbmQodGhpcylcbiAgICAgICAgfSBhcyBJVW5kb1JlZG9BcGkpO1xuXG4gICAgICAgIHRoaXMuYXBpU3Vic2NyaXB0aW9uID0gdGhpcy53YWxsTW9kZWwuYXBpLmNvcmUuc3Vic2NyaWJlKChlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLndhbGxNb2RlbEV2ZW50SGFuZGxlcihlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vblVuZG9LZXlIYW5kbGVyQm91bmQgPSB0aGlzLm9uVW5kb0tleUhhbmRsZXIuYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLmRvYy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vblVuZG9LZXlIYW5kbGVyQm91bmQpO1xuICAgIH1cblxuICAgIG9uV2FsbFBsdWdpbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuYXBpU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG5cbiAgICAgICAgdGhpcy5kb2MucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25VbmRvS2V5SGFuZGxlckJvdW5kKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uVW5kb0tleUhhbmRsZXIoZTogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBjb25zdCBDVFJMX0tFWSA9IDkwO1xuXG4gICAgICAgIGlmIChlLmtleUNvZGUgPT09IENUUkxfS0VZICYmIGUuY3RybEtleSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgaWYgKGUuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZG8oKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy51bmRvKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHVuZG9TaXplKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnVuZG9QbGFuU3RhY2subGVuZ3RoO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVkb1NpemUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkb1BsYW5TdGFjay5sZW5ndGg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB3YWxsTW9kZWxFdmVudEhhbmRsZXIoZTogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5wcm9jZXNzaW5nVW5kbykge1xuICAgICAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBCZWZvcmVDaGFuZ2VFdmVudCAmJiAoZSBhcyBCZWZvcmVDaGFuZ2VFdmVudCkuYmVmb3JlRXZlbnRUeXBlICE9PSBTZXRQbGFuRXZlbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVuZG9QbGFuU3RhY2sucHVzaCh0aGlzLndhbGxNb2RlbC5hcGkuY29yZS5nZXRQbGFuKCkpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yZWRvUGxhblN0YWNrID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlZG8oKSB7XG4gICAgICAgIGNvbnN0IHJlZG9QbGFuID0gdGhpcy5yZWRvUGxhblN0YWNrLnBvcCgpO1xuXG4gICAgICAgIGlmIChyZWRvUGxhbikge1xuICAgICAgICAgICAgdGhpcy5wcm9jZXNzaW5nVW5kbyA9IHRydWU7XG5cbiAgICAgICAgICAgIHRoaXMud2FsbE1vZGVsLmFwaS5jb3JlLnNldFBsYW4ocmVkb1BsYW4pO1xuXG4gICAgICAgICAgICB0aGlzLnVuZG9QbGFuU3RhY2sucHVzaChyZWRvUGxhbik7XG5cbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc2luZ1VuZG8gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdW5kbygpIHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNQbGFuID0gdGhpcy51bmRvUGxhblN0YWNrLnBvcCgpO1xuXG4gICAgICAgIGlmIChwcmV2aW91c1BsYW4pIHtcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc2luZ1VuZG8gPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkuY29yZS5zZXRQbGFuKHByZXZpb3VzUGxhbik7XG5cbiAgICAgICAgICAgIHRoaXMucmVkb1BsYW5TdGFjay5wdXNoKHByZXZpb3VzUGxhbik7XG5cbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc2luZ1VuZG8gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMudW5kb1BsYW5TdGFjayA9IFtdO1xuICAgICAgICB0aGlzLnJlZG9QbGFuU3RhY2sgPSBbXTtcbiAgICB9XG59XG4iXX0=