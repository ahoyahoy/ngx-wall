/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { SelectedBrickEvent } from './events/selected-brick.event';
import { BrickRegistry } from '../../registry/brick-registry.service';
import { RemoveBricksEvent } from '../../plugins/core/events/remove-bricks.event';
import { MoveBrickEvent } from '../../plugins/core/events/move-brick.event';
import { TurnBrickIntoEvent } from '../../plugins/core/events/turn-brick-into.event';
import { BeforeChangeEvent } from '../../plugins/core/events/before-change.event';
export class WallViewModel {
    /**
     * @param {?} brickRegistry
     */
    constructor(brickRegistry) {
        this.brickRegistry = brickRegistry;
        this.wallModel = null;
        this.events = new Subject();
        // UI
        this.focusedBrick = null;
        this.selectedBricks = [];
        this.isMediaInteractionEnabled$ = new BehaviorSubject(true);
        this.canvasLayout = [];
    }
    /**
     * @return {?}
     */
    getCanvasLayout() {
        /** @type {?} */
        const rows = [];
        this.wallModel.api.core.traverse((/**
         * @param {?} row
         * @return {?}
         */
        (row) => {
            rows.push({
                id: row.id,
                columns: row.columns.map((/**
                 * @param {?} column
                 * @return {?}
                 */
                (column) => {
                    return {
                        bricks: column.bricks.map((/**
                         * @param {?} brickConfig
                         * @return {?}
                         */
                        (brickConfig) => {
                            /** @type {?} */
                            const component = this.brickRegistry.get(brickConfig.tag).component;
                            return {
                                id: brickConfig.id,
                                hash: brickConfig.tag + brickConfig.id,
                                state: brickConfig.state,
                                component
                            };
                        }))
                    };
                }))
            });
        }));
        return rows;
    }
    /**
     * @param {?} wallModel
     * @return {?}
     */
    initialize(wallModel) {
        this.wallModel = wallModel;
        // initialize view core API
        /** @type {?} */
        const coreApi = [
            // SELECTION
            'getSelectedBrickIds',
            'selectBrick',
            'selectBricks',
            'addBrickToSelection',
            'removeBrickFromSelection',
            'unSelectBricks',
            // FOCUS
            'focusOnBrickId',
            'getFocusedBrickId',
            'focusOnPreviousTextBrick',
            'focusOnNextTextBrick',
            // REMOVE BRICK
            'removeBrick',
            'removeBricks',
            // BEHAVIOUR
            'enableMediaInteraction',
            'disableMediaInteraction',
            // CLIENT
            'subscribe'
        ].reduce((/**
         * @param {?} result
         * @param {?} methodName
         * @return {?}
         */
        (result, methodName) => {
            if (this[methodName].bind) {
                result[methodName] = this[methodName].bind(this);
            }
            else {
                result[methodName] = this[methodName];
            }
            return result;
        }), {});
        // protect API from extending
        Object.seal(coreApi);
        // register methods on model itself
        this.wallModel.registerApi('ui', coreApi);
        this.wallModelSubscription = this.wallModel.api.core.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            if (event instanceof TurnBrickIntoEvent) {
                this.focusOnBrickId(event.brickId);
            }
            if (event instanceof MoveBrickEvent) {
                this.unSelectBricks();
            }
            if (event instanceof RemoveBricksEvent) {
                if (!this.wallModel.api.core.getBricksCount()) {
                    this.wallModel.api.core.addDefaultBrick();
                }
            }
            if (!(event instanceof BeforeChangeEvent)) {
                this.canvasLayout = this.getCanvasLayout();
            }
        }));
        this.canvasLayout = this.getCanvasLayout();
    }
    /**
     * \@public-api
     * @param {?} brickId
     * @return {?}
     */
    selectBrick(brickId) {
        this.selectedBricks = [brickId];
        this.focusedBrick = null;
        /** @type {?} */
        const selectedBricksClone = this.selectedBricks.slice(0);
        this.dispatch(new SelectedBrickEvent(selectedBricksClone));
    }
    /**
     * \@public-api
     * @param {?} brickIds
     * @return {?}
     */
    selectBricks(brickIds) {
        if (JSON.stringify(brickIds) !== JSON.stringify(this.selectedBricks)) {
            this.selectedBricks = this.wallModel.api.core.sortBrickIdsByLayoutOrder(brickIds);
            /** @type {?} */
            const selectedBricksClone = this.selectedBricks.slice(0);
            this.dispatch(new SelectedBrickEvent(selectedBricksClone));
        }
    }
    /**
     * @deprecated
     * \@public-api
     * @param {?} brickId
     * @return {?}
     */
    addBrickToSelection(brickId) {
        /** @type {?} */
        const selectedBrickIds = this.selectedBricks.slice(0);
        selectedBrickIds.push(brickId);
        this.selectedBricks = this.wallModel.api.core.sortBrickIdsByLayoutOrder(selectedBrickIds);
        /** @type {?} */
        const selectedBricksClone = this.selectedBricks.slice(0);
        this.dispatch(new SelectedBrickEvent(selectedBricksClone));
    }
    /**
     * @deprecated
     * \@public-api
     * @param {?} brickId
     * @return {?}
     */
    removeBrickFromSelection(brickId) {
        /** @type {?} */
        const brickIdIndex = this.selectedBricks.indexOf(brickId);
        this.selectedBricks.splice(brickIdIndex, 1);
        this.selectedBricks = this.selectedBricks.slice(0);
        /** @type {?} */
        const selectedBricksClone = this.selectedBricks.slice(0);
        this.dispatch(new SelectedBrickEvent(selectedBricksClone));
    }
    /**
     * \@public-api
     * @return {?}
     */
    unSelectBricks() {
        this.selectedBricks = [];
        this.dispatch(new SelectedBrickEvent([]));
    }
    /**
     * \@public-api
     * @return {?}
     */
    getSelectedBrickIds() {
        return this.selectedBricks.slice(0);
    }
    /**
     * \@public-api
     * @return {?}
     */
    getFocusedBrickId() {
        return this.focusedBrick && this.focusedBrick.id;
    }
    /**
     * \@public-api
     * @param {?} brickId
     * @param {?=} focusContext
     * @return {?}
     */
    focusOnBrickId(brickId, focusContext) {
        this.focusedBrick = {
            id: brickId,
            context: focusContext
        };
    }
    /**
     * \@public-api
     * @param {?} brickId
     * @param {?=} focusContext
     * @return {?}
     */
    focusOnPreviousTextBrick(brickId, focusContext) {
        /** @type {?} */
        const previousTextBrickId = this.wallModel.api.core.getPreviousTextBrickId(brickId);
        if (previousTextBrickId) {
            this.focusOnBrickId(previousTextBrickId, focusContext);
        }
    }
    /**
     * \@public-api
     * @param {?} brickId
     * @param {?=} focusContext
     * @return {?}
     */
    focusOnNextTextBrick(brickId, focusContext) {
        /** @type {?} */
        const nextTextBrickId = this.wallModel.api.core.getNextTextBrickId(brickId);
        if (nextTextBrickId) {
            this.focusOnBrickId(nextTextBrickId, focusContext);
        }
    }
    /**
     * \@public-api
     * @return {?}
     */
    enableMediaInteraction() {
        ((/** @type {?} */ (this.isMediaInteractionEnabled$))).next(true);
    }
    /**
     * \@public-api
     * @return {?}
     */
    disableMediaInteraction() {
        ((/** @type {?} */ (this.isMediaInteractionEnabled$))).next(false);
    }
    /**
     * \@public-api
     * @param {?} callback
     * @return {?}
     */
    subscribe(callback) {
        return this.events.subscribe(callback);
    }
    /**
     * \@public-api
     * @param {?} brickId
     * @return {?}
     */
    removeBrick(brickId) {
        this.removeBricks([brickId]);
    }
    /**
     * \@public-api
     * @param {?} brickIds
     * @return {?}
     */
    removeBricks(brickIds) {
        /** @type {?} */
        const currentBrickIds = this.wallModel.api.core.getBrickIds();
        if (currentBrickIds.length > 1) {
            this.wallModel.api.core.removeBricks(brickIds);
        }
        else if (currentBrickIds.length === 1) {
            /** @type {?} */
            const brickSnapshot = this.wallModel.api.core.getBrickSnapshot(currentBrickIds[0]);
            if (brickSnapshot.tag !== 'text' || brickSnapshot.state.text) {
                this.wallModel.api.core.removeBricks(brickIds);
            }
            else {
                this.focusOnBrickId(currentBrickIds[0]);
            }
        }
    }
    // canvas interaction
    /**
     * @return {?}
     */
    onCanvasClick() {
        // check whether the last element is empty text brick
        // which is inside one column row
        // check whether the last element is empty text brick
        // which is inside one column row
        /** @type {?} */
        const rowCount = this.wallModel.api.core.getRowCount();
        /** @type {?} */
        const brickIds = this.wallModel.api.core.getBrickIds();
        if (rowCount > 0
            && this.wallModel.api.core.getColumnCount(rowCount - 1) === 1
            && brickIds.length) {
            /** @type {?} */
            const lastBrickSnapshot = this.wallModel.api.core.getBrickSnapshot(brickIds[brickIds.length - 1]);
            if (lastBrickSnapshot.tag === 'text' && !lastBrickSnapshot.state.text) {
                this.focusOnBrickId(lastBrickSnapshot.id);
            }
            else {
                this.wallModel.api.core.addDefaultBrick();
            }
        }
        else {
            this.wallModel.api.core.addDefaultBrick();
        }
    }
    // canvas interaction
    /**
     * @param {?} brickId
     * @param {?} brickState
     * @return {?}
     */
    onBrickStateChanged(brickId, brickState) {
        this.wallModel.api.core.updateBrickState(brickId, brickState);
    }
    /**
     * @return {?}
     */
    reset() {
        this.wallModelSubscription.unsubscribe();
        this.wallModelSubscription = null;
        this.focusedBrick = null;
        this.unSelectBricks();
    }
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    dispatch(e) {
        this.events.next(e);
    }
}
WallViewModel.decorators = [
    { type: Injectable }
];
/** @nocollapse */
WallViewModel.ctorParameters = () => [
    { type: BrickRegistry }
];
if (false) {
    /** @type {?} */
    WallViewModel.prototype.wallModel;
    /** @type {?} */
    WallViewModel.prototype.events;
    /** @type {?} */
    WallViewModel.prototype.focusedBrick;
    /** @type {?} */
    WallViewModel.prototype.selectedBricks;
    /** @type {?} */
    WallViewModel.prototype.isMediaInteractionEnabled$;
    /** @type {?} */
    WallViewModel.prototype.canvasLayout;
    /**
     * @type {?}
     * @private
     */
    WallViewModel.prototype.wallModelSubscription;
    /**
     * @type {?}
     * @private
     */
    WallViewModel.prototype.brickRegistry;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbC12aWV3Lm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvd2FsbC9jb21wb25lbnRzL3dhbGwvd2FsbC12aWV3Lm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxlQUFlLEVBQWMsT0FBTyxFQUFlLE1BQU0sTUFBTSxDQUFDO0FBQ3hFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBS2pFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUVwRSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSwrQ0FBK0MsQ0FBQztBQUNoRixPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFDMUUsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0saURBQWlELENBQUM7QUFDbkYsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sK0NBQStDLENBQUM7QUFHaEYsTUFBTSxPQUFPLGFBQWE7Ozs7SUFhdEIsWUFBb0IsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFaaEQsY0FBUyxHQUFlLElBQUksQ0FBQztRQUU3QixXQUFNLEdBQWlCLElBQUksT0FBTyxFQUFFLENBQUM7O1FBR3JDLGlCQUFZLEdBQWtCLElBQUksQ0FBQztRQUNuQyxtQkFBYyxHQUFhLEVBQUUsQ0FBQztRQUM5QiwrQkFBMEIsR0FBd0IsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUUsaUJBQVksR0FBZSxFQUFFLENBQUM7SUFLOUIsQ0FBQzs7OztJQUVELGVBQWU7O2NBQ0wsSUFBSSxHQUFHLEVBQUU7UUFFZixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUTs7OztRQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7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bmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtTZWxlY3RlZEJyaWNrRXZlbnR9IGZyb20gJy4vZXZlbnRzL3NlbGVjdGVkLWJyaWNrLmV2ZW50JztcbmltcG9ydCB7SUZvY3VzZWRCcmlja30gZnJvbSAnLi9pbnRlcmZhY2VzL2ZvY3VzZWQtYnJpY2suaW50ZXJmYWNlJztcbmltcG9ydCB7SVdhbGxVaUFwaX0gZnJvbSAnLi9pbnRlcmZhY2VzL3VpLWFwaS5pbnRlcmZhY2UnO1xuaW1wb3J0IHtJRm9jdXNDb250ZXh0fSBmcm9tICcuL2ludGVyZmFjZXMvd2FsbC1jb21wb25lbnQvd2FsbC1jb21wb25lbnQtZm9jdXMtY29udGV4dC5pbnRlcmZhY2UnO1xuaW1wb3J0IHtJV2FsbE1vZGVsfSBmcm9tICcuLi8uLi9tb2RlbC9pbnRlcmZhY2VzL3dhbGwtbW9kZWwuaW50ZXJmYWNlJztcbmltcG9ydCB7QnJpY2tSZWdpc3RyeX0gZnJvbSAnLi4vLi4vcmVnaXN0cnkvYnJpY2stcmVnaXN0cnkuc2VydmljZSc7XG5pbXBvcnQge0lXYWxsUm93fSBmcm9tICcuLi8uLi9tb2RlbC9pbnRlcmZhY2VzL3dhbGwtcm93LmludGVyZmFjZSc7XG5pbXBvcnQge1JlbW92ZUJyaWNrc0V2ZW50fSBmcm9tICcuLi8uLi9wbHVnaW5zL2NvcmUvZXZlbnRzL3JlbW92ZS1icmlja3MuZXZlbnQnO1xuaW1wb3J0IHtNb3ZlQnJpY2tFdmVudH0gZnJvbSAnLi4vLi4vcGx1Z2lucy9jb3JlL2V2ZW50cy9tb3ZlLWJyaWNrLmV2ZW50JztcbmltcG9ydCB7VHVybkJyaWNrSW50b0V2ZW50fSBmcm9tICcuLi8uLi9wbHVnaW5zL2NvcmUvZXZlbnRzL3R1cm4tYnJpY2staW50by5ldmVudCc7XG5pbXBvcnQge0JlZm9yZUNoYW5nZUV2ZW50fSBmcm9tICcuLi8uLi9wbHVnaW5zL2NvcmUvZXZlbnRzL2JlZm9yZS1jaGFuZ2UuZXZlbnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgV2FsbFZpZXdNb2RlbCBpbXBsZW1lbnRzIElXYWxsVWlBcGkge1xuICAgIHdhbGxNb2RlbDogSVdhbGxNb2RlbCA9IG51bGw7XG5cbiAgICBldmVudHM6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgICAvLyBVSVxuICAgIGZvY3VzZWRCcmljazogSUZvY3VzZWRCcmljayA9IG51bGw7XG4gICAgc2VsZWN0ZWRCcmlja3M6IHN0cmluZ1tdID0gW107XG4gICAgaXNNZWRpYUludGVyYWN0aW9uRW5hYmxlZCQ6IE9ic2VydmFibGU8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHRydWUpO1xuICAgIGNhbnZhc0xheW91dDogSVdhbGxSb3dbXSA9IFtdO1xuXG4gICAgcHJpdmF0ZSB3YWxsTW9kZWxTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYnJpY2tSZWdpc3RyeTogQnJpY2tSZWdpc3RyeSkge1xuICAgIH1cblxuICAgIGdldENhbnZhc0xheW91dCgpOiBJV2FsbFJvd1tdIHtcbiAgICAgICAgY29uc3Qgcm93cyA9IFtdO1xuXG4gICAgICAgIHRoaXMud2FsbE1vZGVsLmFwaS5jb3JlLnRyYXZlcnNlKChyb3cpID0+IHtcbiAgICAgICAgICAgIHJvd3MucHVzaCh7XG4gICAgICAgICAgICAgICAgaWQ6IHJvdy5pZCxcblxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IHJvdy5jb2x1bW5zLm1hcCgoY29sdW1uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmlja3M6IGNvbHVtbi5icmlja3MubWFwKChicmlja0NvbmZpZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IHRoaXMuYnJpY2tSZWdpc3RyeS5nZXQoYnJpY2tDb25maWcudGFnKS5jb21wb25lbnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogYnJpY2tDb25maWcuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc2g6IGJyaWNrQ29uZmlnLnRhZyArIGJyaWNrQ29uZmlnLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZTogYnJpY2tDb25maWcuc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJvd3M7XG4gICAgfVxuXG4gICAgaW5pdGlhbGl6ZSh3YWxsTW9kZWw6IElXYWxsTW9kZWwpIHtcbiAgICAgICAgdGhpcy53YWxsTW9kZWwgPSB3YWxsTW9kZWw7XG5cbiAgICAgICAgLy8gaW5pdGlhbGl6ZSB2aWV3IGNvcmUgQVBJXG4gICAgICAgIGNvbnN0IGNvcmVBcGkgPSBbXG4gICAgICAgICAgICAvLyBTRUxFQ1RJT05cbiAgICAgICAgICAgICdnZXRTZWxlY3RlZEJyaWNrSWRzJyxcbiAgICAgICAgICAgICdzZWxlY3RCcmljaycsXG4gICAgICAgICAgICAnc2VsZWN0QnJpY2tzJyxcbiAgICAgICAgICAgICdhZGRCcmlja1RvU2VsZWN0aW9uJyxcbiAgICAgICAgICAgICdyZW1vdmVCcmlja0Zyb21TZWxlY3Rpb24nLFxuICAgICAgICAgICAgJ3VuU2VsZWN0QnJpY2tzJyxcblxuICAgICAgICAgICAgLy8gRk9DVVNcbiAgICAgICAgICAgICdmb2N1c09uQnJpY2tJZCcsXG4gICAgICAgICAgICAnZ2V0Rm9jdXNlZEJyaWNrSWQnLFxuICAgICAgICAgICAgJ2ZvY3VzT25QcmV2aW91c1RleHRCcmljaycsXG4gICAgICAgICAgICAnZm9jdXNPbk5leHRUZXh0QnJpY2snLFxuXG4gICAgICAgICAgICAvLyBSRU1PVkUgQlJJQ0tcbiAgICAgICAgICAgICdyZW1vdmVCcmljaycsXG4gICAgICAgICAgICAncmVtb3ZlQnJpY2tzJyxcblxuICAgICAgICAgICAgLy8gQkVIQVZJT1VSXG4gICAgICAgICAgICAnZW5hYmxlTWVkaWFJbnRlcmFjdGlvbicsXG4gICAgICAgICAgICAnZGlzYWJsZU1lZGlhSW50ZXJhY3Rpb24nLFxuXG4gICAgICAgICAgICAvLyBDTElFTlRcbiAgICAgICAgICAgICdzdWJzY3JpYmUnXG4gICAgICAgIF0ucmVkdWNlKChyZXN1bHQsIG1ldGhvZE5hbWUpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzW21ldGhvZE5hbWVdLmJpbmQpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRbbWV0aG9kTmFtZV0gPSB0aGlzW21ldGhvZE5hbWVdLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdFttZXRob2ROYW1lXSA9IHRoaXNbbWV0aG9kTmFtZV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0sIHt9KTtcblxuICAgICAgICAvLyBwcm90ZWN0IEFQSSBmcm9tIGV4dGVuZGluZ1xuICAgICAgICBPYmplY3Quc2VhbChjb3JlQXBpKTtcblxuICAgICAgICAvLyByZWdpc3RlciBtZXRob2RzIG9uIG1vZGVsIGl0c2VsZlxuICAgICAgICB0aGlzLndhbGxNb2RlbC5yZWdpc3RlckFwaSgndWknLCBjb3JlQXBpKTtcblxuICAgICAgICB0aGlzLndhbGxNb2RlbFN1YnNjcmlwdGlvbiA9IHRoaXMud2FsbE1vZGVsLmFwaS5jb3JlLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIFR1cm5Ccmlja0ludG9FdmVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNPbkJyaWNrSWQoZXZlbnQuYnJpY2tJZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE1vdmVCcmlja0V2ZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy51blNlbGVjdEJyaWNrcygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBSZW1vdmVCcmlja3NFdmVudCkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy53YWxsTW9kZWwuYXBpLmNvcmUuZ2V0QnJpY2tzQ291bnQoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkuY29yZS5hZGREZWZhdWx0QnJpY2soKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghKGV2ZW50IGluc3RhbmNlb2YgQmVmb3JlQ2hhbmdlRXZlbnQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXNMYXlvdXQgPSB0aGlzLmdldENhbnZhc0xheW91dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNhbnZhc0xheW91dCA9IHRoaXMuZ2V0Q2FudmFzTGF5b3V0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHB1YmxpYy1hcGlcbiAgICAgKi9cbiAgICBzZWxlY3RCcmljayhicmlja0lkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEJyaWNrcyA9IFticmlja0lkXTtcblxuICAgICAgICB0aGlzLmZvY3VzZWRCcmljayA9IG51bGw7XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRCcmlja3NDbG9uZSA9IHRoaXMuc2VsZWN0ZWRCcmlja3Muc2xpY2UoMCk7XG5cbiAgICAgICAgdGhpcy5kaXNwYXRjaChuZXcgU2VsZWN0ZWRCcmlja0V2ZW50KHNlbGVjdGVkQnJpY2tzQ2xvbmUpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcHVibGljLWFwaVxuICAgICAqL1xuICAgIHNlbGVjdEJyaWNrcyhicmlja0lkczogc3RyaW5nW10pIHtcbiAgICAgICAgaWYgKEpTT04uc3RyaW5naWZ5KGJyaWNrSWRzKSAhPT0gSlNPTi5zdHJpbmdpZnkodGhpcy5zZWxlY3RlZEJyaWNrcykpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRCcmlja3MgPSB0aGlzLndhbGxNb2RlbC5hcGkuY29yZS5zb3J0QnJpY2tJZHNCeUxheW91dE9yZGVyKGJyaWNrSWRzKTtcblxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRCcmlja3NDbG9uZSA9IHRoaXMuc2VsZWN0ZWRCcmlja3Muc2xpY2UoMCk7XG5cbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2gobmV3IFNlbGVjdGVkQnJpY2tFdmVudChzZWxlY3RlZEJyaWNrc0Nsb25lKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVwcmVjYXRlZFxuICAgICAqIEBwdWJsaWMtYXBpXG4gICAgICovXG4gICAgYWRkQnJpY2tUb1NlbGVjdGlvbihicmlja0lkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRCcmlja0lkcyA9IHRoaXMuc2VsZWN0ZWRCcmlja3Muc2xpY2UoMCk7XG5cbiAgICAgICAgc2VsZWN0ZWRCcmlja0lkcy5wdXNoKGJyaWNrSWQpO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRCcmlja3MgPSB0aGlzLndhbGxNb2RlbC5hcGkuY29yZS5zb3J0QnJpY2tJZHNCeUxheW91dE9yZGVyKHNlbGVjdGVkQnJpY2tJZHMpO1xuXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkQnJpY2tzQ2xvbmUgPSB0aGlzLnNlbGVjdGVkQnJpY2tzLnNsaWNlKDApO1xuXG4gICAgICAgIHRoaXMuZGlzcGF0Y2gobmV3IFNlbGVjdGVkQnJpY2tFdmVudChzZWxlY3RlZEJyaWNrc0Nsb25lKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlcHJlY2F0ZWRcbiAgICAgKiBAcHVibGljLWFwaVxuICAgICAqL1xuICAgIHJlbW92ZUJyaWNrRnJvbVNlbGVjdGlvbihicmlja0lkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgYnJpY2tJZEluZGV4ID0gdGhpcy5zZWxlY3RlZEJyaWNrcy5pbmRleE9mKGJyaWNrSWQpO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRCcmlja3Muc3BsaWNlKGJyaWNrSWRJbmRleCwgMSk7XG5cbiAgICAgICAgdGhpcy5zZWxlY3RlZEJyaWNrcyA9IHRoaXMuc2VsZWN0ZWRCcmlja3Muc2xpY2UoMCk7XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRCcmlja3NDbG9uZSA9IHRoaXMuc2VsZWN0ZWRCcmlja3Muc2xpY2UoMCk7XG5cbiAgICAgICAgdGhpcy5kaXNwYXRjaChuZXcgU2VsZWN0ZWRCcmlja0V2ZW50KHNlbGVjdGVkQnJpY2tzQ2xvbmUpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcHVibGljLWFwaVxuICAgICAqL1xuICAgIHVuU2VsZWN0QnJpY2tzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdGVkQnJpY2tzID0gW107XG5cbiAgICAgICAgdGhpcy5kaXNwYXRjaChuZXcgU2VsZWN0ZWRCcmlja0V2ZW50KFtdKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHB1YmxpYy1hcGlcbiAgICAgKi9cbiAgICBnZXRTZWxlY3RlZEJyaWNrSWRzKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRCcmlja3Muc2xpY2UoMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHB1YmxpYy1hcGlcbiAgICAgKi9cbiAgICBnZXRGb2N1c2VkQnJpY2tJZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5mb2N1c2VkQnJpY2sgJiYgdGhpcy5mb2N1c2VkQnJpY2suaWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHB1YmxpYy1hcGlcbiAgICAgKi9cbiAgICBmb2N1c09uQnJpY2tJZChicmlja0lkOiBzdHJpbmcsIGZvY3VzQ29udGV4dD86IElGb2N1c0NvbnRleHQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkQnJpY2sgPSB7XG4gICAgICAgICAgICBpZDogYnJpY2tJZCxcbiAgICAgICAgICAgIGNvbnRleHQ6IGZvY3VzQ29udGV4dFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwdWJsaWMtYXBpXG4gICAgICovXG4gICAgZm9jdXNPblByZXZpb3VzVGV4dEJyaWNrKGJyaWNrSWQ6IHN0cmluZywgZm9jdXNDb250ZXh0PzogSUZvY3VzQ29udGV4dCkge1xuICAgICAgICBjb25zdCBwcmV2aW91c1RleHRCcmlja0lkID0gdGhpcy53YWxsTW9kZWwuYXBpLmNvcmUuZ2V0UHJldmlvdXNUZXh0QnJpY2tJZChicmlja0lkKTtcblxuICAgICAgICBpZiAocHJldmlvdXNUZXh0QnJpY2tJZCkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c09uQnJpY2tJZChwcmV2aW91c1RleHRCcmlja0lkLCBmb2N1c0NvbnRleHQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHB1YmxpYy1hcGlcbiAgICAgKi9cbiAgICBmb2N1c09uTmV4dFRleHRCcmljayhicmlja0lkOiBzdHJpbmcsIGZvY3VzQ29udGV4dD86IElGb2N1c0NvbnRleHQpIHtcbiAgICAgICAgY29uc3QgbmV4dFRleHRCcmlja0lkID0gdGhpcy53YWxsTW9kZWwuYXBpLmNvcmUuZ2V0TmV4dFRleHRCcmlja0lkKGJyaWNrSWQpO1xuXG4gICAgICAgIGlmIChuZXh0VGV4dEJyaWNrSWQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNPbkJyaWNrSWQobmV4dFRleHRCcmlja0lkLCBmb2N1c0NvbnRleHQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHB1YmxpYy1hcGlcbiAgICAgKi9cbiAgICBlbmFibGVNZWRpYUludGVyYWN0aW9uKCkge1xuICAgICAgICAodGhpcy5pc01lZGlhSW50ZXJhY3Rpb25FbmFibGVkJCBhcyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4pLm5leHQodHJ1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHB1YmxpYy1hcGlcbiAgICAgKi9cbiAgICBkaXNhYmxlTWVkaWFJbnRlcmFjdGlvbigpIHtcbiAgICAgICAgKHRoaXMuaXNNZWRpYUludGVyYWN0aW9uRW5hYmxlZCQgYXMgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KS5uZXh0KGZhbHNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcHVibGljLWFwaVxuICAgICAqL1xuICAgIHN1YnNjcmliZShjYWxsYmFjazogYW55KTogU3Vic2NyaXB0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRzLnN1YnNjcmliZShjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHB1YmxpYy1hcGlcbiAgICAgKi9cbiAgICByZW1vdmVCcmljayhicmlja0lkOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVCcmlja3MoW2JyaWNrSWRdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcHVibGljLWFwaVxuICAgICAqL1xuICAgIHJlbW92ZUJyaWNrcyhicmlja0lkczogc3RyaW5nW10pIHtcbiAgICAgICAgY29uc3QgY3VycmVudEJyaWNrSWRzID0gdGhpcy53YWxsTW9kZWwuYXBpLmNvcmUuZ2V0QnJpY2tJZHMoKTtcblxuICAgICAgICBpZiAoY3VycmVudEJyaWNrSWRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMud2FsbE1vZGVsLmFwaS5jb3JlLnJlbW92ZUJyaWNrcyhicmlja0lkcyk7XG4gICAgICAgIH0gZWxzZSBpZiAoY3VycmVudEJyaWNrSWRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgY29uc3QgYnJpY2tTbmFwc2hvdCA9IHRoaXMud2FsbE1vZGVsLmFwaS5jb3JlLmdldEJyaWNrU25hcHNob3QoY3VycmVudEJyaWNrSWRzWzBdKTtcblxuICAgICAgICAgICAgaWYgKGJyaWNrU25hcHNob3QudGFnICE9PSAndGV4dCcgfHwgYnJpY2tTbmFwc2hvdC5zdGF0ZS50ZXh0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy53YWxsTW9kZWwuYXBpLmNvcmUucmVtb3ZlQnJpY2tzKGJyaWNrSWRzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1c09uQnJpY2tJZChjdXJyZW50QnJpY2tJZHNbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gY2FudmFzIGludGVyYWN0aW9uXG4gICAgb25DYW52YXNDbGljaygpIHtcbiAgICAgICAgLy8gY2hlY2sgd2hldGhlciB0aGUgbGFzdCBlbGVtZW50IGlzIGVtcHR5IHRleHQgYnJpY2tcbiAgICAgICAgLy8gd2hpY2ggaXMgaW5zaWRlIG9uZSBjb2x1bW4gcm93XG5cbiAgICAgICAgY29uc3Qgcm93Q291bnQgPSB0aGlzLndhbGxNb2RlbC5hcGkuY29yZS5nZXRSb3dDb3VudCgpO1xuICAgICAgICBjb25zdCBicmlja0lkcyA9IHRoaXMud2FsbE1vZGVsLmFwaS5jb3JlLmdldEJyaWNrSWRzKCk7XG5cbiAgICAgICAgaWYgKHJvd0NvdW50ID4gMFxuICAgICAgICAgICAgJiYgdGhpcy53YWxsTW9kZWwuYXBpLmNvcmUuZ2V0Q29sdW1uQ291bnQocm93Q291bnQgLSAxKSA9PT0gMVxuICAgICAgICAgICAgJiYgYnJpY2tJZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBsYXN0QnJpY2tTbmFwc2hvdCA9IHRoaXMud2FsbE1vZGVsLmFwaS5jb3JlLmdldEJyaWNrU25hcHNob3QoYnJpY2tJZHNbYnJpY2tJZHMubGVuZ3RoIC0gMV0pO1xuXG4gICAgICAgICAgICBpZiAobGFzdEJyaWNrU25hcHNob3QudGFnID09PSAndGV4dCcgJiYgIWxhc3RCcmlja1NuYXBzaG90LnN0YXRlLnRleHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzT25Ccmlja0lkKGxhc3RCcmlja1NuYXBzaG90LmlkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy53YWxsTW9kZWwuYXBpLmNvcmUuYWRkRGVmYXVsdEJyaWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkuY29yZS5hZGREZWZhdWx0QnJpY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNhbnZhcyBpbnRlcmFjdGlvblxuICAgIG9uQnJpY2tTdGF0ZUNoYW5nZWQoYnJpY2tJZDogc3RyaW5nLCBicmlja1N0YXRlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy53YWxsTW9kZWwuYXBpLmNvcmUudXBkYXRlQnJpY2tTdGF0ZShicmlja0lkLCBicmlja1N0YXRlKTtcbiAgICB9XG5cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy53YWxsTW9kZWxTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcblxuICAgICAgICB0aGlzLndhbGxNb2RlbFN1YnNjcmlwdGlvbiA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5mb2N1c2VkQnJpY2sgPSBudWxsO1xuXG4gICAgICAgIHRoaXMudW5TZWxlY3RCcmlja3MoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRpc3BhdGNoKGUpIHtcbiAgICAgICAgdGhpcy5ldmVudHMubmV4dChlKTtcbiAgICB9XG59XG4iXX0=