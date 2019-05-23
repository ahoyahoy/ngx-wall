/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { STICKY_MODAL_DATA } from 'ngx-sticky-modal';
import { BehaviorSubject } from 'rxjs';
import { BrickRegistry } from '../../../wall/wall';
import { TEXT_BRICK_TAG } from '../text-brick.constant';
/**
 * @record
 */
export function IBricksListComponentConfig() { }
if (false) {
    /** @type {?} */
    IBricksListComponentConfig.prototype.text$;
    /** @type {?} */
    IBricksListComponentConfig.prototype.up$;
    /** @type {?} */
    IBricksListComponentConfig.prototype.down$;
    /** @type {?} */
    IBricksListComponentConfig.prototype.enter$;
    /** @type {?} */
    IBricksListComponentConfig.prototype.selectedTag$;
}
export class BricksListComponent {
    /**
     * @param {?} brickRegistry
     * @param {?} config
     */
    constructor(brickRegistry, config) {
        this.brickRegistry = brickRegistry;
        this.config = config;
        this.selectedTag$ = new BehaviorSubject(null);
        this.bricksList$ = new BehaviorSubject([]);
        this.subscriptions = [];
        this.updateBricksList('');
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.subscriptions.push(this.config.text$.subscribe((filterText) => {
            this.updateBricksList(filterText.slice(1));
        }));
        this.subscriptions.push(this.config.up$.subscribe(() => {
            this.onNavigationUpDownHandler(true);
        }));
        this.subscriptions.push(this.config.down$.subscribe(() => {
            this.onNavigationUpDownHandler(false);
        }));
        this.subscriptions.push(this.config.enter$.subscribe(() => {
            this.notifySelectedTag();
        }));
    }
    /**
     * @param {?} brickDescription
     * @return {?}
     */
    onBrickSelected(brickDescription) {
        this.selectedTag$.next(brickDescription.tag);
        this.notifySelectedTag();
    }
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    trackByFn(index, item) {
        return item.tag;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        });
    }
    /**
     * @private
     * @return {?}
     */
    notifySelectedTag() {
        this.config.selectedTag$.next(this.selectedTag$.getValue());
    }
    /**
     * @private
     * @param {?} filterText
     * @return {?}
     */
    updateBricksList(filterText) {
        /** @type {?} */
        const brickDescriptors = this.brickRegistry.getAll()
            .filter((brickDescriptor) => {
            if (brickDescriptor.tag === TEXT_BRICK_TAG) {
                return false;
            }
            else {
                return brickDescriptor.tag.includes(filterText);
            }
        }).sort((a, b) => {
            if (a.tag.startsWith(filterText)) {
                return -1;
            }
            else if (b.tag.startsWith(filterText)) {
                return 1;
            }
            else {
                return 0;
            }
        });
        if (brickDescriptors.length) {
            this.selectedTag$.next(brickDescriptors[0].tag);
        }
        else {
            this.selectedTag$.next(null);
        }
        this.bricksList$.next(brickDescriptors);
    }
    /**
     * @private
     * @param {?} isUp
     * @return {?}
     */
    onNavigationUpDownHandler(isUp) {
        /** @type {?} */
        const currentSelectedTag = this.selectedTag$.getValue();
        /** @type {?} */
        const currentBrickList = this.bricksList$.getValue();
        if (currentSelectedTag && currentBrickList.length > 1) {
            /** @type {?} */
            const currentSelectedBrickIndex = currentBrickList.findIndex((brickDescriptor) => {
                return brickDescriptor.tag === currentSelectedTag;
            });
            /** @type {?} */
            let nextSelectedBrick;
            if (isUp) {
                nextSelectedBrick = currentBrickList[currentSelectedBrickIndex - 1];
                if (!nextSelectedBrick) {
                    // take last brick
                    nextSelectedBrick = currentBrickList[currentBrickList.length - 1];
                }
            }
            else {
                // is bottom
                nextSelectedBrick = currentBrickList[currentSelectedBrickIndex + 1];
                if (!nextSelectedBrick) {
                    // take first brick
                    nextSelectedBrick = currentBrickList[0];
                }
            }
            this.selectedTag$.next(nextSelectedBrick.tag);
            // wait until component re-renders
            setTimeout(() => {
                document.getElementsByClassName('w-bricks-list__selected')[0].scrollIntoView();
            });
        }
    }
}
BricksListComponent.decorators = [
    { type: Component, args: [{
                selector: 'w-bricks-list',
                template: "<div class=\"w-context-panel w-bricks-list mat-elevation-z4\">\n    <mat-list>\n        <mat-list-item *ngFor=\"let brickDescription of bricksList$ | async; trackBy: trackByFn\"\n                       [ngClass]=\"{'w-bricks-list__selected': (selectedTag$ | async) === brickDescription.tag}\"\n                       (click)=\"onBrickSelected(brickDescription)\">\n            <p mat-line>\n                {{brickDescription.name}}\n            </p>\n            <p mat-line>\n                {{brickDescription.description}}\n            </p>\n        </mat-list-item>\n    </mat-list>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
BricksListComponent.ctorParameters = () => [
    { type: BrickRegistry },
    { type: undefined, decorators: [{ type: Inject, args: [STICKY_MODAL_DATA,] }] }
];
if (false) {
    /** @type {?} */
    BricksListComponent.prototype.selectedTag$;
    /** @type {?} */
    BricksListComponent.prototype.bricksList$;
    /**
     * @type {?}
     * @private
     */
    BricksListComponent.prototype.subscriptions;
    /**
     * @type {?}
     * @private
     */
    BricksListComponent.prototype.brickRegistry;
    /** @type {?} */
    BricksListComponent.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJpY2tzLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvYnJpY2tzL3RleHQtYnJpY2svYnJpY2tzLWxpc3QvYnJpY2tzLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBb0IsTUFBTSxlQUFlLENBQUM7QUFDNUYsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDbkQsT0FBTyxFQUFDLGVBQWUsRUFBb0MsTUFBTSxNQUFNLENBQUM7QUFDeEUsT0FBTyxFQUFDLGFBQWEsRUFBd0MsTUFBTSxvQkFBb0IsQ0FBQztBQUN4RixPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7Ozs7QUFFdEQsZ0RBTUM7OztJQUxHLDJDQUEwQjs7SUFDMUIseUNBQXFCOztJQUNyQiwyQ0FBdUI7O0lBQ3ZCLDRDQUF3Qjs7SUFDeEIsa0RBQThCOztBQVFsQyxNQUFNLE9BQU8sbUJBQW1COzs7OztJQU81QixZQUFvQixhQUE0QixFQUNGLE1BQWtDO1FBRDVELGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQ0YsV0FBTSxHQUFOLE1BQU0sQ0FBNEI7UUFQaEYsaUJBQVksR0FBNEIsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFbEUsZ0JBQVcsR0FBMkMsSUFBSSxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFdEUsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBSXZDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM5QixDQUFDOzs7O0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUN2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Q1AsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLGltQkFBMkM7Z0JBQzNDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2xEOzs7O1lBZk8sYUFBYTs0Q0F3QkosTUFBTSxTQUFDLGlCQUFpQjs7OztJQVByQywyQ0FBa0U7O0lBRWxFLDBDQUE4RTs7Ozs7SUFFOUUsNENBQTJDOzs7OztJQUUvQiw0Q0FBb0M7O0lBQ3BDLHFDQUFvRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5qZWN0LCBPbkRlc3Ryb3ksIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1NUSUNLWV9NT0RBTF9EQVRBfSBmcm9tICduZ3gtc3RpY2t5LW1vZGFsJztcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtCcmlja1JlZ2lzdHJ5LCBJQnJpY2tEZWZpbml0aW9uLCBJQnJpY2tTcGVjaWZpY2F0aW9ufSBmcm9tICcuLi8uLi8uLi93YWxsL3dhbGwnO1xuaW1wb3J0IHtURVhUX0JSSUNLX1RBR30gZnJvbSAnLi4vdGV4dC1icmljay5jb25zdGFudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUJyaWNrc0xpc3RDb21wb25lbnRDb25maWcge1xuICAgIHRleHQkOiBPYnNlcnZhYmxlPHN0cmluZz47XG4gICAgdXAkOiBPYnNlcnZhYmxlPGFueT47XG4gICAgZG93biQ6IE9ic2VydmFibGU8YW55PjtcbiAgICBlbnRlciQ6IE9ic2VydmFibGU8YW55PjtcbiAgICBzZWxlY3RlZFRhZyQ6IFN1YmplY3Q8c3RyaW5nPjtcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd3LWJyaWNrcy1saXN0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vYnJpY2tzLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEJyaWNrc0xpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgc2VsZWN0ZWRUYWckOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9IG5ldyBCZWhhdmlvclN1YmplY3QobnVsbCk7XG5cbiAgICBicmlja3NMaXN0JDogQmVoYXZpb3JTdWJqZWN0PElCcmlja1NwZWNpZmljYXRpb25bXT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFtdKTtcblxuICAgIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYnJpY2tSZWdpc3RyeTogQnJpY2tSZWdpc3RyeSxcbiAgICAgICAgICAgICAgICBASW5qZWN0KFNUSUNLWV9NT0RBTF9EQVRBKSBwdWJsaWMgY29uZmlnOiBJQnJpY2tzTGlzdENvbXBvbmVudENvbmZpZykge1xuICAgICAgICB0aGlzLnVwZGF0ZUJyaWNrc0xpc3QoJycpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLnRleHQkLnN1YnNjcmliZSgoZmlsdGVyVGV4dCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQnJpY2tzTGlzdChmaWx0ZXJUZXh0LnNsaWNlKDEpKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy51cCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uTmF2aWdhdGlvblVwRG93bkhhbmRsZXIodHJ1ZSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgICAgICAgdGhpcy5jb25maWcuZG93biQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uTmF2aWdhdGlvblVwRG93bkhhbmRsZXIoZmFsc2UpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLmVudGVyJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5U2VsZWN0ZWRUYWcoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgb25Ccmlja1NlbGVjdGVkKGJyaWNrRGVzY3JpcHRpb246IElCcmlja0RlZmluaXRpb24pIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRhZyQubmV4dChicmlja0Rlc2NyaXB0aW9uLnRhZyk7XG5cbiAgICAgICAgdGhpcy5ub3RpZnlTZWxlY3RlZFRhZygpO1xuICAgIH1cblxuICAgIHRyYWNrQnlGbihpbmRleCwgaXRlbSkge1xuICAgICAgICByZXR1cm4gaXRlbS50YWc7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKChzdWJzY3JpcHRpb24pID0+IHtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG5vdGlmeVNlbGVjdGVkVGFnKCkge1xuICAgICAgICB0aGlzLmNvbmZpZy5zZWxlY3RlZFRhZyQubmV4dCh0aGlzLnNlbGVjdGVkVGFnJC5nZXRWYWx1ZSgpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZUJyaWNrc0xpc3QoZmlsdGVyVGV4dDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGJyaWNrRGVzY3JpcHRvcnMgPSB0aGlzLmJyaWNrUmVnaXN0cnkuZ2V0QWxsKClcbiAgICAgICAgICAgIC5maWx0ZXIoKGJyaWNrRGVzY3JpcHRvcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChicmlja0Rlc2NyaXB0b3IudGFnID09PSBURVhUX0JSSUNLX1RBRykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJyaWNrRGVzY3JpcHRvci50YWcuaW5jbHVkZXMoZmlsdGVyVGV4dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChhLnRhZy5zdGFydHNXaXRoKGZpbHRlclRleHQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGIudGFnLnN0YXJ0c1dpdGgoZmlsdGVyVGV4dCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGJyaWNrRGVzY3JpcHRvcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkVGFnJC5uZXh0KGJyaWNrRGVzY3JpcHRvcnNbMF0udGFnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRUYWckLm5leHQobnVsbCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJyaWNrc0xpc3QkLm5leHQoYnJpY2tEZXNjcmlwdG9ycyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbk5hdmlnYXRpb25VcERvd25IYW5kbGVyKGlzVXA6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgY29uc3QgY3VycmVudFNlbGVjdGVkVGFnID0gdGhpcy5zZWxlY3RlZFRhZyQuZ2V0VmFsdWUoKTtcbiAgICAgICAgY29uc3QgY3VycmVudEJyaWNrTGlzdCA9IHRoaXMuYnJpY2tzTGlzdCQuZ2V0VmFsdWUoKTtcblxuICAgICAgICBpZiAoY3VycmVudFNlbGVjdGVkVGFnICYmIGN1cnJlbnRCcmlja0xpc3QubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFNlbGVjdGVkQnJpY2tJbmRleCA9IGN1cnJlbnRCcmlja0xpc3QuZmluZEluZGV4KChicmlja0Rlc2NyaXB0b3IpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYnJpY2tEZXNjcmlwdG9yLnRhZyA9PT0gY3VycmVudFNlbGVjdGVkVGFnO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGxldCBuZXh0U2VsZWN0ZWRCcmljaztcblxuICAgICAgICAgICAgaWYgKGlzVXApIHtcbiAgICAgICAgICAgICAgICBuZXh0U2VsZWN0ZWRCcmljayA9IGN1cnJlbnRCcmlja0xpc3RbY3VycmVudFNlbGVjdGVkQnJpY2tJbmRleCAtIDFdO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFuZXh0U2VsZWN0ZWRCcmljaykge1xuICAgICAgICAgICAgICAgICAgICAvLyB0YWtlIGxhc3QgYnJpY2tcbiAgICAgICAgICAgICAgICAgICAgbmV4dFNlbGVjdGVkQnJpY2sgPSBjdXJyZW50QnJpY2tMaXN0W2N1cnJlbnRCcmlja0xpc3QubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBpcyBib3R0b21cbiAgICAgICAgICAgICAgICBuZXh0U2VsZWN0ZWRCcmljayA9IGN1cnJlbnRCcmlja0xpc3RbY3VycmVudFNlbGVjdGVkQnJpY2tJbmRleCArIDFdO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFuZXh0U2VsZWN0ZWRCcmljaykge1xuICAgICAgICAgICAgICAgICAgICAvLyB0YWtlIGZpcnN0IGJyaWNrXG4gICAgICAgICAgICAgICAgICAgIG5leHRTZWxlY3RlZEJyaWNrID0gY3VycmVudEJyaWNrTGlzdFswXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRUYWckLm5leHQobmV4dFNlbGVjdGVkQnJpY2sudGFnKTtcblxuICAgICAgICAgICAgLy8gd2FpdCB1bnRpbCBjb21wb25lbnQgcmUtcmVuZGVyc1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndy1icmlja3MtbGlzdF9fc2VsZWN0ZWQnKVswXS5zY3JvbGxJbnRvVmlldygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=