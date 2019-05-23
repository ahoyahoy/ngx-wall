/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { SelectedBrickEvent } from './events/selected-brick.event';
import { BrickRegistry } from '../../registry/brick-registry.service';
import { RemoveBricksEvent } from '../../plugins/core/events/remove-bricks.event';
import { MoveBrickEvent } from '../../plugins/core/events/move-brick.event';
import { TurnBrickIntoEvent } from '../../plugins/core/events/turn-brick-into.event';
import { BeforeChangeEvent } from '../../plugins/core/events/before-change.event';
var WallViewModel = /** @class */ (function () {
    function WallViewModel(brickRegistry) {
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
    WallViewModel.prototype.getCanvasLayout = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var rows = [];
        this.wallModel.api.core.traverse(function (row) {
            rows.push({
                id: row.id,
                columns: row.columns.map(function (column) {
                    return {
                        bricks: column.bricks.map(function (brickConfig) {
                            /** @type {?} */
                            var component = _this.brickRegistry.get(brickConfig.tag).component;
                            return {
                                id: brickConfig.id,
                                hash: brickConfig.tag + brickConfig.id,
                                state: brickConfig.state,
                                component: component
                            };
                        })
                    };
                })
            });
        });
        return rows;
    };
    /**
     * @param {?} wallModel
     * @return {?}
     */
    WallViewModel.prototype.initialize = /**
     * @param {?} wallModel
     * @return {?}
     */
    function (wallModel) {
        var _this = this;
        this.wallModel = wallModel;
        // initialize view core API
        /** @type {?} */
        var coreApi = [
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
        ].reduce(function (result, methodName) {
            if (_this[methodName].bind) {
                result[methodName] = _this[methodName].bind(_this);
            }
            else {
                result[methodName] = _this[methodName];
            }
            return result;
        }, {});
        // protect API from extending
        Object.seal(coreApi);
        // register methods on model itself
        this.wallModel.registerApi('ui', coreApi);
        this.wallModelSubscription = this.wallModel.api.core.subscribe(function (event) {
            if (event instanceof TurnBrickIntoEvent) {
                _this.focusOnBrickId(event.brickId);
            }
            if (event instanceof MoveBrickEvent) {
                _this.unSelectBricks();
            }
            if (event instanceof RemoveBricksEvent) {
                if (!_this.wallModel.api.core.getBricksCount()) {
                    _this.wallModel.api.core.addDefaultBrick();
                }
            }
            if (!(event instanceof BeforeChangeEvent)) {
                _this.canvasLayout = _this.getCanvasLayout();
            }
        });
        this.canvasLayout = this.getCanvasLayout();
    };
    /**
     * @public-api
     */
    /**
     * \@public-api
     * @param {?} brickId
     * @return {?}
     */
    WallViewModel.prototype.selectBrick = /**
     * \@public-api
     * @param {?} brickId
     * @return {?}
     */
    function (brickId) {
        this.selectedBricks = [brickId];
        this.focusedBrick = null;
        /** @type {?} */
        var selectedBricksClone = this.selectedBricks.slice(0);
        this.dispatch(new SelectedBrickEvent(selectedBricksClone));
    };
    /**
     * @public-api
     */
    /**
     * \@public-api
     * @param {?} brickIds
     * @return {?}
     */
    WallViewModel.prototype.selectBricks = /**
     * \@public-api
     * @param {?} brickIds
     * @return {?}
     */
    function (brickIds) {
        if (JSON.stringify(brickIds) !== JSON.stringify(this.selectedBricks)) {
            this.selectedBricks = this.wallModel.api.core.sortBrickIdsByLayoutOrder(brickIds);
            /** @type {?} */
            var selectedBricksClone = this.selectedBricks.slice(0);
            this.dispatch(new SelectedBrickEvent(selectedBricksClone));
        }
    };
    /**
     * @deprecated
     * @public-api
     */
    /**
     * @deprecated
     * \@public-api
     * @param {?} brickId
     * @return {?}
     */
    WallViewModel.prototype.addBrickToSelection = /**
     * @deprecated
     * \@public-api
     * @param {?} brickId
     * @return {?}
     */
    function (brickId) {
        /** @type {?} */
        var selectedBrickIds = this.selectedBricks.slice(0);
        selectedBrickIds.push(brickId);
        this.selectedBricks = this.wallModel.api.core.sortBrickIdsByLayoutOrder(selectedBrickIds);
        /** @type {?} */
        var selectedBricksClone = this.selectedBricks.slice(0);
        this.dispatch(new SelectedBrickEvent(selectedBricksClone));
    };
    /**
     * @deprecated
     * @public-api
     */
    /**
     * @deprecated
     * \@public-api
     * @param {?} brickId
     * @return {?}
     */
    WallViewModel.prototype.removeBrickFromSelection = /**
     * @deprecated
     * \@public-api
     * @param {?} brickId
     * @return {?}
     */
    function (brickId) {
        /** @type {?} */
        var brickIdIndex = this.selectedBricks.indexOf(brickId);
        this.selectedBricks.splice(brickIdIndex, 1);
        this.selectedBricks = this.selectedBricks.slice(0);
        /** @type {?} */
        var selectedBricksClone = this.selectedBricks.slice(0);
        this.dispatch(new SelectedBrickEvent(selectedBricksClone));
    };
    /**
     * @public-api
     */
    /**
     * \@public-api
     * @return {?}
     */
    WallViewModel.prototype.unSelectBricks = /**
     * \@public-api
     * @return {?}
     */
    function () {
        this.selectedBricks = [];
        this.dispatch(new SelectedBrickEvent([]));
    };
    /**
     * @public-api
     */
    /**
     * \@public-api
     * @return {?}
     */
    WallViewModel.prototype.getSelectedBrickIds = /**
     * \@public-api
     * @return {?}
     */
    function () {
        return this.selectedBricks.slice(0);
    };
    /**
     * @public-api
     */
    /**
     * \@public-api
     * @return {?}
     */
    WallViewModel.prototype.getFocusedBrickId = /**
     * \@public-api
     * @return {?}
     */
    function () {
        return this.focusedBrick && this.focusedBrick.id;
    };
    /**
     * @public-api
     */
    /**
     * \@public-api
     * @param {?} brickId
     * @param {?=} focusContext
     * @return {?}
     */
    WallViewModel.prototype.focusOnBrickId = /**
     * \@public-api
     * @param {?} brickId
     * @param {?=} focusContext
     * @return {?}
     */
    function (brickId, focusContext) {
        this.focusedBrick = {
            id: brickId,
            context: focusContext
        };
    };
    /**
     * @public-api
     */
    /**
     * \@public-api
     * @param {?} brickId
     * @param {?=} focusContext
     * @return {?}
     */
    WallViewModel.prototype.focusOnPreviousTextBrick = /**
     * \@public-api
     * @param {?} brickId
     * @param {?=} focusContext
     * @return {?}
     */
    function (brickId, focusContext) {
        /** @type {?} */
        var previousTextBrickId = this.wallModel.api.core.getPreviousTextBrickId(brickId);
        if (previousTextBrickId) {
            this.focusOnBrickId(previousTextBrickId, focusContext);
        }
    };
    /**
     * @public-api
     */
    /**
     * \@public-api
     * @param {?} brickId
     * @param {?=} focusContext
     * @return {?}
     */
    WallViewModel.prototype.focusOnNextTextBrick = /**
     * \@public-api
     * @param {?} brickId
     * @param {?=} focusContext
     * @return {?}
     */
    function (brickId, focusContext) {
        /** @type {?} */
        var nextTextBrickId = this.wallModel.api.core.getNextTextBrickId(brickId);
        if (nextTextBrickId) {
            this.focusOnBrickId(nextTextBrickId, focusContext);
        }
    };
    /**
     * @public-api
     */
    /**
     * \@public-api
     * @return {?}
     */
    WallViewModel.prototype.enableMediaInteraction = /**
     * \@public-api
     * @return {?}
     */
    function () {
        ((/** @type {?} */ (this.isMediaInteractionEnabled$))).next(true);
    };
    /**
     * @public-api
     */
    /**
     * \@public-api
     * @return {?}
     */
    WallViewModel.prototype.disableMediaInteraction = /**
     * \@public-api
     * @return {?}
     */
    function () {
        ((/** @type {?} */ (this.isMediaInteractionEnabled$))).next(false);
    };
    /**
     * @public-api
     */
    /**
     * \@public-api
     * @param {?} callback
     * @return {?}
     */
    WallViewModel.prototype.subscribe = /**
     * \@public-api
     * @param {?} callback
     * @return {?}
     */
    function (callback) {
        return this.events.subscribe(callback);
    };
    /**
     * @public-api
     */
    /**
     * \@public-api
     * @param {?} brickId
     * @return {?}
     */
    WallViewModel.prototype.removeBrick = /**
     * \@public-api
     * @param {?} brickId
     * @return {?}
     */
    function (brickId) {
        this.removeBricks([brickId]);
    };
    /**
     * @public-api
     */
    /**
     * \@public-api
     * @param {?} brickIds
     * @return {?}
     */
    WallViewModel.prototype.removeBricks = /**
     * \@public-api
     * @param {?} brickIds
     * @return {?}
     */
    function (brickIds) {
        /** @type {?} */
        var currentBrickIds = this.wallModel.api.core.getBrickIds();
        if (currentBrickIds.length > 1) {
            this.wallModel.api.core.removeBricks(brickIds);
        }
        else if (currentBrickIds.length === 1) {
            /** @type {?} */
            var brickSnapshot = this.wallModel.api.core.getBrickSnapshot(currentBrickIds[0]);
            if (brickSnapshot.tag !== 'text' || brickSnapshot.state.text) {
                this.wallModel.api.core.removeBricks(brickIds);
            }
            else {
                this.focusOnBrickId(currentBrickIds[0]);
            }
        }
    };
    // canvas interaction
    // canvas interaction
    /**
     * @return {?}
     */
    WallViewModel.prototype.onCanvasClick = 
    // canvas interaction
    /**
     * @return {?}
     */
    function () {
        // check whether the last element is empty text brick
        // which is inside one column row
        // check whether the last element is empty text brick
        // which is inside one column row
        /** @type {?} */
        var rowCount = this.wallModel.api.core.getRowCount();
        /** @type {?} */
        var brickIds = this.wallModel.api.core.getBrickIds();
        if (rowCount > 0
            && this.wallModel.api.core.getColumnCount(rowCount - 1) === 1
            && brickIds.length) {
            /** @type {?} */
            var lastBrickSnapshot = this.wallModel.api.core.getBrickSnapshot(brickIds[brickIds.length - 1]);
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
    };
    // canvas interaction
    // canvas interaction
    /**
     * @param {?} brickId
     * @param {?} brickState
     * @return {?}
     */
    WallViewModel.prototype.onBrickStateChanged = 
    // canvas interaction
    /**
     * @param {?} brickId
     * @param {?} brickState
     * @return {?}
     */
    function (brickId, brickState) {
        this.wallModel.api.core.updateBrickState(brickId, brickState);
    };
    /**
     * @return {?}
     */
    WallViewModel.prototype.reset = /**
     * @return {?}
     */
    function () {
        this.wallModelSubscription.unsubscribe();
        this.wallModelSubscription = null;
        this.focusedBrick = null;
        this.unSelectBricks();
    };
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    WallViewModel.prototype.dispatch = /**
     * @private
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this.events.next(e);
    };
    WallViewModel.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    WallViewModel.ctorParameters = function () { return [
        { type: BrickRegistry }
    ]; };
    return WallViewModel;
}());
export { WallViewModel };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbC12aWV3Lm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvd2FsbC9jb21wb25lbnRzL3dhbGwvd2FsbC12aWV3Lm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxlQUFlLEVBQWMsT0FBTyxFQUFlLE1BQU0sTUFBTSxDQUFDO0FBQ3hFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBS2pFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUVwRSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSwrQ0FBK0MsQ0FBQztBQUNoRixPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFDMUUsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0saURBQWlELENBQUM7QUFDbkYsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sK0NBQStDLENBQUM7QUFFaEY7SUFjSSx1QkFBb0IsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFaaEQsY0FBUyxHQUFlLElBQUksQ0FBQztRQUU3QixXQUFNLEdBQWlCLElBQUksT0FBTyxFQUFFLENBQUM7O1FBR3JDLGlCQUFZLEdBQWtCLElBQUksQ0FBQztRQUNuQyxtQkFBYyxHQUFhLEVBQUUsQ0FBQztRQUM5QiwrQkFBMEIsR0FBd0IsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUUsaUJBQVksR0FBZSxFQUFFLENBQUM7SUFLOUIsQ0FBQzs7OztJQUVELHVDQUFlOzs7SUFBZjtRQUFBLGlCQXlCQzs7WUF4QlMsSUFBSSxHQUFHLEVBQUU7UUFFZixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQUMsR0FBRztZQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNOLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRTtnQkFFVixPQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQyxNQUFNO29CQUM1QixPQUFPO3dCQUNILE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFDLFdBQVc7O2dDQUM1QixTQUFTLEdBQUcsS0FBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVM7NEJBRW5FLE9BQU87Z0NBQ0gsRUFBRSxFQUFFLFdBQVcsQ0FBQyxFQUFFO2dDQUNsQixJQUFJLEVBQUUsV0FBVyxDQUFDLEdBQUcsR0FBRyxXQUFXLENBQUMsRUFBRTtnQ0FDdEMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxLQUFLO2dDQUN4QixTQUFTLFdBQUE7NkJBQ1osQ0FBQzt3QkFDTixDQUFDLENBQUM7cUJBQ0wsQ0FBQztnQkFDTixDQUFDLENBQUM7YUFDTCxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Ozs7O0lBRUQsa0NBQVU7Ozs7SUFBVixVQUFXLFNBQXFCO1FBQWhDLGlCQWtFQztRQWpFRyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQzs7O1lBR3JCLE9BQU8sR0FBRztZQUNaLFlBQVk7WUFDWixxQkFBcUI7WUFDckIsYUFBYTtZQUNiLGNBQWM7WUFDZCxxQkFBcUI7WUFDckIsMEJBQTBCO1lBQzFCLGdCQUFnQjtZQUVoQixRQUFRO1lBQ1IsZ0JBQWdCO1lBQ2hCLG1CQUFtQjtZQUNuQiwwQkFBMEI7WUFDMUIsc0JBQXNCO1lBRXRCLGVBQWU7WUFDZixhQUFhO1lBQ2IsY0FBYztZQUVkLFlBQVk7WUFDWix3QkFBd0I7WUFDeEIseUJBQXlCO1lBRXpCLFNBQVM7WUFDVCxXQUFXO1NBQ2QsQ0FBQyxNQUFNLENBQUMsVUFBQyxNQUFNLEVBQUUsVUFBVTtZQUN4QixJQUFJLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLEVBQUU7Z0JBQ3ZCLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDO2FBQ3BEO2lCQUFNO2dCQUNILE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDekM7WUFFRCxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDLEVBQUUsRUFBRSxDQUFDO1FBRU4sNkJBQTZCO1FBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFckIsbUNBQW1DO1FBQ25DLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUUxQyxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFDLEtBQUs7WUFDakUsSUFBSSxLQUFLLFlBQVksa0JBQWtCLEVBQUU7Z0JBQ3JDLEtBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3RDO1lBRUQsSUFBSSxLQUFLLFlBQVksY0FBYyxFQUFFO2dCQUNqQyxLQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDekI7WUFFRCxJQUFJLEtBQUssWUFBWSxpQkFBaUIsRUFBRTtnQkFDcEMsSUFBSSxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRTtvQkFDM0MsS0FBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2lCQUM3QzthQUNKO1lBRUQsSUFBSSxDQUFDLENBQUMsS0FBSyxZQUFZLGlCQUFpQixDQUFDLEVBQUU7Z0JBQ3ZDLEtBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2FBQzlDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7O09BRUc7Ozs7OztJQUNILG1DQUFXOzs7OztJQUFYLFVBQVksT0FBZTtRQUN2QixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7O1lBRW5CLG1CQUFtQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUV4RCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksa0JBQWtCLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0gsb0NBQVk7Ozs7O0lBQVosVUFBYSxRQUFrQjtRQUMzQixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUU7WUFDbEUsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsUUFBUSxDQUFDLENBQUM7O2dCQUU1RSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFFeEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLGtCQUFrQixDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztTQUM5RDtJQUNMLENBQUM7SUFFRDs7O09BR0c7Ozs7Ozs7SUFDSCwyQ0FBbUI7Ozs7OztJQUFuQixVQUFvQixPQUFlOztZQUN6QixnQkFBZ0IsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFckQsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRS9CLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLGdCQUFnQixDQUFDLENBQUM7O1lBRXBGLG1CQUFtQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUV4RCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksa0JBQWtCLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRDs7O09BR0c7Ozs7Ozs7SUFDSCxnREFBd0I7Ozs7OztJQUF4QixVQUF5QixPQUFlOztZQUM5QixZQUFZLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBRXpELElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUU1QyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUU3QyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFeEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLGtCQUFrQixDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsc0NBQWM7Ozs7SUFBZDtRQUNJLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBRXpCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCwyQ0FBbUI7Ozs7SUFBbkI7UUFDSSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCx5Q0FBaUI7Ozs7SUFBakI7UUFDSSxPQUFPLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUM7SUFDckQsQ0FBQztJQUVEOztPQUVHOzs7Ozs7O0lBQ0gsc0NBQWM7Ozs7OztJQUFkLFVBQWUsT0FBZSxFQUFFLFlBQTRCO1FBQ3hELElBQUksQ0FBQyxZQUFZLEdBQUc7WUFDaEIsRUFBRSxFQUFFLE9BQU87WUFDWCxPQUFPLEVBQUUsWUFBWTtTQUN4QixDQUFDO0lBQ04sQ0FBQztJQUVEOztPQUVHOzs7Ozs7O0lBQ0gsZ0RBQXdCOzs7Ozs7SUFBeEIsVUFBeUIsT0FBZSxFQUFFLFlBQTRCOztZQUM1RCxtQkFBbUIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDO1FBRW5GLElBQUksbUJBQW1CLEVBQUU7WUFDckIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsRUFBRSxZQUFZLENBQUMsQ0FBQztTQUMxRDtJQUNMLENBQUM7SUFFRDs7T0FFRzs7Ozs7OztJQUNILDRDQUFvQjs7Ozs7O0lBQXBCLFVBQXFCLE9BQWUsRUFBRSxZQUE0Qjs7WUFDeEQsZUFBZSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUM7UUFFM0UsSUFBSSxlQUFlLEVBQUU7WUFDakIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLEVBQUUsWUFBWSxDQUFDLENBQUM7U0FDdEQ7SUFDTCxDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsOENBQXNCOzs7O0lBQXRCO1FBQ0ksQ0FBQyxtQkFBQSxJQUFJLENBQUMsMEJBQTBCLEVBQTRCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVEOztPQUVHOzs7OztJQUNILCtDQUF1Qjs7OztJQUF2QjtRQUNJLENBQUMsbUJBQUEsSUFBSSxDQUFDLDBCQUEwQixFQUE0QixDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0gsaUNBQVM7Ozs7O0lBQVQsVUFBVSxRQUFhO1FBQ25CLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVEOztPQUVHOzs7Ozs7SUFDSCxtQ0FBVzs7Ozs7SUFBWCxVQUFZLE9BQWU7UUFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVEOztPQUVHOzs7Ozs7SUFDSCxvQ0FBWTs7Ozs7SUFBWixVQUFhLFFBQWtCOztZQUNyQixlQUFlLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtRQUU3RCxJQUFJLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDbEQ7YUFBTSxJQUFJLGVBQWUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFOztnQkFDL0IsYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFbEYsSUFBSSxhQUFhLENBQUMsR0FBRyxLQUFLLE1BQU0sSUFBSSxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtnQkFDMUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNsRDtpQkFBTTtnQkFDSCxJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzNDO1NBQ0o7SUFDTCxDQUFDO0lBRUQscUJBQXFCOzs7OztJQUNyQixxQ0FBYTs7Ozs7SUFBYjtRQUNJLHFEQUFxRDtRQUNyRCxpQ0FBaUM7Ozs7WUFFM0IsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7O1lBQ2hELFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1FBRXRELElBQUksUUFBUSxHQUFHLENBQUM7ZUFDVCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO2VBQzFELFFBQVEsQ0FBQyxNQUFNLEVBQUU7O2dCQUNkLGlCQUFpQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUVqRyxJQUFJLGlCQUFpQixDQUFDLEdBQUcsS0FBSyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO2dCQUNuRSxJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQzdDO2lCQUFNO2dCQUNILElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQzthQUM3QztTQUNKO2FBQU07WUFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDN0M7SUFDTCxDQUFDO0lBRUQscUJBQXFCOzs7Ozs7O0lBQ3JCLDJDQUFtQjs7Ozs7OztJQUFuQixVQUFvQixPQUFlLEVBQUUsVUFBZTtRQUNoRCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7Ozs7SUFFRCw2QkFBSzs7O0lBQUw7UUFDSSxJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFekMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQztRQUVsQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUV6QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDMUIsQ0FBQzs7Ozs7O0lBRU8sZ0NBQVE7Ozs7O0lBQWhCLFVBQWlCLENBQUM7UUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4QixDQUFDOztnQkF4VEosVUFBVTs7OztnQkFQSCxhQUFhOztJQWdVckIsb0JBQUM7Q0FBQSxBQXpURCxJQXlUQztTQXhUWSxhQUFhOzs7SUFDdEIsa0NBQTZCOztJQUU3QiwrQkFBcUM7O0lBR3JDLHFDQUFtQzs7SUFDbkMsdUNBQThCOztJQUM5QixtREFBNEU7O0lBQzVFLHFDQUE4Qjs7Ozs7SUFFOUIsOENBQTRDOzs7OztJQUVoQyxzQ0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1NlbGVjdGVkQnJpY2tFdmVudH0gZnJvbSAnLi9ldmVudHMvc2VsZWN0ZWQtYnJpY2suZXZlbnQnO1xuaW1wb3J0IHtJRm9jdXNlZEJyaWNrfSBmcm9tICcuL2ludGVyZmFjZXMvZm9jdXNlZC1icmljay5pbnRlcmZhY2UnO1xuaW1wb3J0IHtJV2FsbFVpQXBpfSBmcm9tICcuL2ludGVyZmFjZXMvdWktYXBpLmludGVyZmFjZSc7XG5pbXBvcnQge0lGb2N1c0NvbnRleHR9IGZyb20gJy4vaW50ZXJmYWNlcy93YWxsLWNvbXBvbmVudC93YWxsLWNvbXBvbmVudC1mb2N1cy1jb250ZXh0LmludGVyZmFjZSc7XG5pbXBvcnQge0lXYWxsTW9kZWx9IGZyb20gJy4uLy4uL21vZGVsL2ludGVyZmFjZXMvd2FsbC1tb2RlbC5pbnRlcmZhY2UnO1xuaW1wb3J0IHtCcmlja1JlZ2lzdHJ5fSBmcm9tICcuLi8uLi9yZWdpc3RyeS9icmljay1yZWdpc3RyeS5zZXJ2aWNlJztcbmltcG9ydCB7SVdhbGxSb3d9IGZyb20gJy4uLy4uL21vZGVsL2ludGVyZmFjZXMvd2FsbC1yb3cuaW50ZXJmYWNlJztcbmltcG9ydCB7UmVtb3ZlQnJpY2tzRXZlbnR9IGZyb20gJy4uLy4uL3BsdWdpbnMvY29yZS9ldmVudHMvcmVtb3ZlLWJyaWNrcy5ldmVudCc7XG5pbXBvcnQge01vdmVCcmlja0V2ZW50fSBmcm9tICcuLi8uLi9wbHVnaW5zL2NvcmUvZXZlbnRzL21vdmUtYnJpY2suZXZlbnQnO1xuaW1wb3J0IHtUdXJuQnJpY2tJbnRvRXZlbnR9IGZyb20gJy4uLy4uL3BsdWdpbnMvY29yZS9ldmVudHMvdHVybi1icmljay1pbnRvLmV2ZW50JztcbmltcG9ydCB7QmVmb3JlQ2hhbmdlRXZlbnR9IGZyb20gJy4uLy4uL3BsdWdpbnMvY29yZS9ldmVudHMvYmVmb3JlLWNoYW5nZS5ldmVudCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBXYWxsVmlld01vZGVsIGltcGxlbWVudHMgSVdhbGxVaUFwaSB7XG4gICAgd2FsbE1vZGVsOiBJV2FsbE1vZGVsID0gbnVsbDtcblxuICAgIGV2ZW50czogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcblxuICAgIC8vIFVJXG4gICAgZm9jdXNlZEJyaWNrOiBJRm9jdXNlZEJyaWNrID0gbnVsbDtcbiAgICBzZWxlY3RlZEJyaWNrczogc3RyaW5nW10gPSBbXTtcbiAgICBpc01lZGlhSW50ZXJhY3Rpb25FbmFibGVkJDogT2JzZXJ2YWJsZTxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3QodHJ1ZSk7XG4gICAgY2FudmFzTGF5b3V0OiBJV2FsbFJvd1tdID0gW107XG5cbiAgICBwcml2YXRlIHdhbGxNb2RlbFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBicmlja1JlZ2lzdHJ5OiBCcmlja1JlZ2lzdHJ5KSB7XG4gICAgfVxuXG4gICAgZ2V0Q2FudmFzTGF5b3V0KCk6IElXYWxsUm93W10ge1xuICAgICAgICBjb25zdCByb3dzID0gW107XG5cbiAgICAgICAgdGhpcy53YWxsTW9kZWwuYXBpLmNvcmUudHJhdmVyc2UoKHJvdykgPT4ge1xuICAgICAgICAgICAgcm93cy5wdXNoKHtcbiAgICAgICAgICAgICAgICBpZDogcm93LmlkLFxuXG4gICAgICAgICAgICAgICAgY29sdW1uczogcm93LmNvbHVtbnMubWFwKChjb2x1bW4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyaWNrczogY29sdW1uLmJyaWNrcy5tYXAoKGJyaWNrQ29uZmlnKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29tcG9uZW50ID0gdGhpcy5icmlja1JlZ2lzdHJ5LmdldChicmlja0NvbmZpZy50YWcpLmNvbXBvbmVudDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBicmlja0NvbmZpZy5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzaDogYnJpY2tDb25maWcudGFnICsgYnJpY2tDb25maWcuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlOiBicmlja0NvbmZpZy5zdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcm93cztcbiAgICB9XG5cbiAgICBpbml0aWFsaXplKHdhbGxNb2RlbDogSVdhbGxNb2RlbCkge1xuICAgICAgICB0aGlzLndhbGxNb2RlbCA9IHdhbGxNb2RlbDtcblxuICAgICAgICAvLyBpbml0aWFsaXplIHZpZXcgY29yZSBBUElcbiAgICAgICAgY29uc3QgY29yZUFwaSA9IFtcbiAgICAgICAgICAgIC8vIFNFTEVDVElPTlxuICAgICAgICAgICAgJ2dldFNlbGVjdGVkQnJpY2tJZHMnLFxuICAgICAgICAgICAgJ3NlbGVjdEJyaWNrJyxcbiAgICAgICAgICAgICdzZWxlY3RCcmlja3MnLFxuICAgICAgICAgICAgJ2FkZEJyaWNrVG9TZWxlY3Rpb24nLFxuICAgICAgICAgICAgJ3JlbW92ZUJyaWNrRnJvbVNlbGVjdGlvbicsXG4gICAgICAgICAgICAndW5TZWxlY3RCcmlja3MnLFxuXG4gICAgICAgICAgICAvLyBGT0NVU1xuICAgICAgICAgICAgJ2ZvY3VzT25Ccmlja0lkJyxcbiAgICAgICAgICAgICdnZXRGb2N1c2VkQnJpY2tJZCcsXG4gICAgICAgICAgICAnZm9jdXNPblByZXZpb3VzVGV4dEJyaWNrJyxcbiAgICAgICAgICAgICdmb2N1c09uTmV4dFRleHRCcmljaycsXG5cbiAgICAgICAgICAgIC8vIFJFTU9WRSBCUklDS1xuICAgICAgICAgICAgJ3JlbW92ZUJyaWNrJyxcbiAgICAgICAgICAgICdyZW1vdmVCcmlja3MnLFxuXG4gICAgICAgICAgICAvLyBCRUhBVklPVVJcbiAgICAgICAgICAgICdlbmFibGVNZWRpYUludGVyYWN0aW9uJyxcbiAgICAgICAgICAgICdkaXNhYmxlTWVkaWFJbnRlcmFjdGlvbicsXG5cbiAgICAgICAgICAgIC8vIENMSUVOVFxuICAgICAgICAgICAgJ3N1YnNjcmliZSdcbiAgICAgICAgXS5yZWR1Y2UoKHJlc3VsdCwgbWV0aG9kTmFtZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXNbbWV0aG9kTmFtZV0uYmluZCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdFttZXRob2ROYW1lXSA9IHRoaXNbbWV0aG9kTmFtZV0uYmluZCh0aGlzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0W21ldGhvZE5hbWVdID0gdGhpc1ttZXRob2ROYW1lXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSwge30pO1xuXG4gICAgICAgIC8vIHByb3RlY3QgQVBJIGZyb20gZXh0ZW5kaW5nXG4gICAgICAgIE9iamVjdC5zZWFsKGNvcmVBcGkpO1xuXG4gICAgICAgIC8vIHJlZ2lzdGVyIG1ldGhvZHMgb24gbW9kZWwgaXRzZWxmXG4gICAgICAgIHRoaXMud2FsbE1vZGVsLnJlZ2lzdGVyQXBpKCd1aScsIGNvcmVBcGkpO1xuXG4gICAgICAgIHRoaXMud2FsbE1vZGVsU3Vic2NyaXB0aW9uID0gdGhpcy53YWxsTW9kZWwuYXBpLmNvcmUuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgVHVybkJyaWNrSW50b0V2ZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1c09uQnJpY2tJZChldmVudC5icmlja0lkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTW92ZUJyaWNrRXZlbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVuU2VsZWN0QnJpY2tzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIFJlbW92ZUJyaWNrc0V2ZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLndhbGxNb2RlbC5hcGkuY29yZS5nZXRCcmlja3NDb3VudCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2FsbE1vZGVsLmFwaS5jb3JlLmFkZERlZmF1bHRCcmljaygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEoZXZlbnQgaW5zdGFuY2VvZiBCZWZvcmVDaGFuZ2VFdmVudCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbnZhc0xheW91dCA9IHRoaXMuZ2V0Q2FudmFzTGF5b3V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY2FudmFzTGF5b3V0ID0gdGhpcy5nZXRDYW52YXNMYXlvdXQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcHVibGljLWFwaVxuICAgICAqL1xuICAgIHNlbGVjdEJyaWNrKGJyaWNrSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdGVkQnJpY2tzID0gW2JyaWNrSWRdO1xuXG4gICAgICAgIHRoaXMuZm9jdXNlZEJyaWNrID0gbnVsbDtcblxuICAgICAgICBjb25zdCBzZWxlY3RlZEJyaWNrc0Nsb25lID0gdGhpcy5zZWxlY3RlZEJyaWNrcy5zbGljZSgwKTtcblxuICAgICAgICB0aGlzLmRpc3BhdGNoKG5ldyBTZWxlY3RlZEJyaWNrRXZlbnQoc2VsZWN0ZWRCcmlja3NDbG9uZSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwdWJsaWMtYXBpXG4gICAgICovXG4gICAgc2VsZWN0QnJpY2tzKGJyaWNrSWRzOiBzdHJpbmdbXSkge1xuICAgICAgICBpZiAoSlNPTi5zdHJpbmdpZnkoYnJpY2tJZHMpICE9PSBKU09OLnN0cmluZ2lmeSh0aGlzLnNlbGVjdGVkQnJpY2tzKSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEJyaWNrcyA9IHRoaXMud2FsbE1vZGVsLmFwaS5jb3JlLnNvcnRCcmlja0lkc0J5TGF5b3V0T3JkZXIoYnJpY2tJZHMpO1xuXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZEJyaWNrc0Nsb25lID0gdGhpcy5zZWxlY3RlZEJyaWNrcy5zbGljZSgwKTtcblxuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaChuZXcgU2VsZWN0ZWRCcmlja0V2ZW50KHNlbGVjdGVkQnJpY2tzQ2xvbmUpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXByZWNhdGVkXG4gICAgICogQHB1YmxpYy1hcGlcbiAgICAgKi9cbiAgICBhZGRCcmlja1RvU2VsZWN0aW9uKGJyaWNrSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBjb25zdCBzZWxlY3RlZEJyaWNrSWRzID0gdGhpcy5zZWxlY3RlZEJyaWNrcy5zbGljZSgwKTtcblxuICAgICAgICBzZWxlY3RlZEJyaWNrSWRzLnB1c2goYnJpY2tJZCk7XG5cbiAgICAgICAgdGhpcy5zZWxlY3RlZEJyaWNrcyA9IHRoaXMud2FsbE1vZGVsLmFwaS5jb3JlLnNvcnRCcmlja0lkc0J5TGF5b3V0T3JkZXIoc2VsZWN0ZWRCcmlja0lkcyk7XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRCcmlja3NDbG9uZSA9IHRoaXMuc2VsZWN0ZWRCcmlja3Muc2xpY2UoMCk7XG5cbiAgICAgICAgdGhpcy5kaXNwYXRjaChuZXcgU2VsZWN0ZWRCcmlja0V2ZW50KHNlbGVjdGVkQnJpY2tzQ2xvbmUpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVwcmVjYXRlZFxuICAgICAqIEBwdWJsaWMtYXBpXG4gICAgICovXG4gICAgcmVtb3ZlQnJpY2tGcm9tU2VsZWN0aW9uKGJyaWNrSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBjb25zdCBicmlja0lkSW5kZXggPSB0aGlzLnNlbGVjdGVkQnJpY2tzLmluZGV4T2YoYnJpY2tJZCk7XG5cbiAgICAgICAgdGhpcy5zZWxlY3RlZEJyaWNrcy5zcGxpY2UoYnJpY2tJZEluZGV4LCAxKTtcblxuICAgICAgICB0aGlzLnNlbGVjdGVkQnJpY2tzID0gdGhpcy5zZWxlY3RlZEJyaWNrcy5zbGljZSgwKTtcblxuICAgICAgICBjb25zdCBzZWxlY3RlZEJyaWNrc0Nsb25lID0gdGhpcy5zZWxlY3RlZEJyaWNrcy5zbGljZSgwKTtcblxuICAgICAgICB0aGlzLmRpc3BhdGNoKG5ldyBTZWxlY3RlZEJyaWNrRXZlbnQoc2VsZWN0ZWRCcmlja3NDbG9uZSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwdWJsaWMtYXBpXG4gICAgICovXG4gICAgdW5TZWxlY3RCcmlja3MoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRCcmlja3MgPSBbXTtcblxuICAgICAgICB0aGlzLmRpc3BhdGNoKG5ldyBTZWxlY3RlZEJyaWNrRXZlbnQoW10pKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcHVibGljLWFwaVxuICAgICAqL1xuICAgIGdldFNlbGVjdGVkQnJpY2tJZHMoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEJyaWNrcy5zbGljZSgwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcHVibGljLWFwaVxuICAgICAqL1xuICAgIGdldEZvY3VzZWRCcmlja0lkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvY3VzZWRCcmljayAmJiB0aGlzLmZvY3VzZWRCcmljay5pZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcHVibGljLWFwaVxuICAgICAqL1xuICAgIGZvY3VzT25Ccmlja0lkKGJyaWNrSWQ6IHN0cmluZywgZm9jdXNDb250ZXh0PzogSUZvY3VzQ29udGV4dCk6IHZvaWQge1xuICAgICAgICB0aGlzLmZvY3VzZWRCcmljayA9IHtcbiAgICAgICAgICAgIGlkOiBicmlja0lkLFxuICAgICAgICAgICAgY29udGV4dDogZm9jdXNDb250ZXh0XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHB1YmxpYy1hcGlcbiAgICAgKi9cbiAgICBmb2N1c09uUHJldmlvdXNUZXh0QnJpY2soYnJpY2tJZDogc3RyaW5nLCBmb2N1c0NvbnRleHQ/OiBJRm9jdXNDb250ZXh0KSB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzVGV4dEJyaWNrSWQgPSB0aGlzLndhbGxNb2RlbC5hcGkuY29yZS5nZXRQcmV2aW91c1RleHRCcmlja0lkKGJyaWNrSWQpO1xuXG4gICAgICAgIGlmIChwcmV2aW91c1RleHRCcmlja0lkKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzT25Ccmlja0lkKHByZXZpb3VzVGV4dEJyaWNrSWQsIGZvY3VzQ29udGV4dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcHVibGljLWFwaVxuICAgICAqL1xuICAgIGZvY3VzT25OZXh0VGV4dEJyaWNrKGJyaWNrSWQ6IHN0cmluZywgZm9jdXNDb250ZXh0PzogSUZvY3VzQ29udGV4dCkge1xuICAgICAgICBjb25zdCBuZXh0VGV4dEJyaWNrSWQgPSB0aGlzLndhbGxNb2RlbC5hcGkuY29yZS5nZXROZXh0VGV4dEJyaWNrSWQoYnJpY2tJZCk7XG5cbiAgICAgICAgaWYgKG5leHRUZXh0QnJpY2tJZCkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c09uQnJpY2tJZChuZXh0VGV4dEJyaWNrSWQsIGZvY3VzQ29udGV4dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcHVibGljLWFwaVxuICAgICAqL1xuICAgIGVuYWJsZU1lZGlhSW50ZXJhY3Rpb24oKSB7XG4gICAgICAgICh0aGlzLmlzTWVkaWFJbnRlcmFjdGlvbkVuYWJsZWQkIGFzIEJlaGF2aW9yU3ViamVjdDxib29sZWFuPikubmV4dCh0cnVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcHVibGljLWFwaVxuICAgICAqL1xuICAgIGRpc2FibGVNZWRpYUludGVyYWN0aW9uKCkge1xuICAgICAgICAodGhpcy5pc01lZGlhSW50ZXJhY3Rpb25FbmFibGVkJCBhcyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4pLm5leHQoZmFsc2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwdWJsaWMtYXBpXG4gICAgICovXG4gICAgc3Vic2NyaWJlKGNhbGxiYWNrOiBhbnkpOiBTdWJzY3JpcHRpb24ge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmVudHMuc3Vic2NyaWJlKGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcHVibGljLWFwaVxuICAgICAqL1xuICAgIHJlbW92ZUJyaWNrKGJyaWNrSWQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLnJlbW92ZUJyaWNrcyhbYnJpY2tJZF0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwdWJsaWMtYXBpXG4gICAgICovXG4gICAgcmVtb3ZlQnJpY2tzKGJyaWNrSWRzOiBzdHJpbmdbXSkge1xuICAgICAgICBjb25zdCBjdXJyZW50QnJpY2tJZHMgPSB0aGlzLndhbGxNb2RlbC5hcGkuY29yZS5nZXRCcmlja0lkcygpO1xuXG4gICAgICAgIGlmIChjdXJyZW50QnJpY2tJZHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgdGhpcy53YWxsTW9kZWwuYXBpLmNvcmUucmVtb3ZlQnJpY2tzKGJyaWNrSWRzKTtcbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50QnJpY2tJZHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBjb25zdCBicmlja1NuYXBzaG90ID0gdGhpcy53YWxsTW9kZWwuYXBpLmNvcmUuZ2V0QnJpY2tTbmFwc2hvdChjdXJyZW50QnJpY2tJZHNbMF0pO1xuXG4gICAgICAgICAgICBpZiAoYnJpY2tTbmFwc2hvdC50YWcgIT09ICd0ZXh0JyB8fCBicmlja1NuYXBzaG90LnN0YXRlLnRleHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkuY29yZS5yZW1vdmVCcmlja3MoYnJpY2tJZHMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzT25Ccmlja0lkKGN1cnJlbnRCcmlja0lkc1swXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjYW52YXMgaW50ZXJhY3Rpb25cbiAgICBvbkNhbnZhc0NsaWNrKCkge1xuICAgICAgICAvLyBjaGVjayB3aGV0aGVyIHRoZSBsYXN0IGVsZW1lbnQgaXMgZW1wdHkgdGV4dCBicmlja1xuICAgICAgICAvLyB3aGljaCBpcyBpbnNpZGUgb25lIGNvbHVtbiByb3dcblxuICAgICAgICBjb25zdCByb3dDb3VudCA9IHRoaXMud2FsbE1vZGVsLmFwaS5jb3JlLmdldFJvd0NvdW50KCk7XG4gICAgICAgIGNvbnN0IGJyaWNrSWRzID0gdGhpcy53YWxsTW9kZWwuYXBpLmNvcmUuZ2V0QnJpY2tJZHMoKTtcblxuICAgICAgICBpZiAocm93Q291bnQgPiAwXG4gICAgICAgICAgICAmJiB0aGlzLndhbGxNb2RlbC5hcGkuY29yZS5nZXRDb2x1bW5Db3VudChyb3dDb3VudCAtIDEpID09PSAxXG4gICAgICAgICAgICAmJiBicmlja0lkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RCcmlja1NuYXBzaG90ID0gdGhpcy53YWxsTW9kZWwuYXBpLmNvcmUuZ2V0QnJpY2tTbmFwc2hvdChicmlja0lkc1ticmlja0lkcy5sZW5ndGggLSAxXSk7XG5cbiAgICAgICAgICAgIGlmIChsYXN0QnJpY2tTbmFwc2hvdC50YWcgPT09ICd0ZXh0JyAmJiAhbGFzdEJyaWNrU25hcHNob3Quc3RhdGUudGV4dCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNPbkJyaWNrSWQobGFzdEJyaWNrU25hcHNob3QuaWQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkuY29yZS5hZGREZWZhdWx0QnJpY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMud2FsbE1vZGVsLmFwaS5jb3JlLmFkZERlZmF1bHRCcmljaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gY2FudmFzIGludGVyYWN0aW9uXG4gICAgb25Ccmlja1N0YXRlQ2hhbmdlZChicmlja0lkOiBzdHJpbmcsIGJyaWNrU3RhdGU6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkuY29yZS51cGRhdGVCcmlja1N0YXRlKGJyaWNrSWQsIGJyaWNrU3RhdGUpO1xuICAgIH1cblxuICAgIHJlc2V0KCkge1xuICAgICAgICB0aGlzLndhbGxNb2RlbFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuXG4gICAgICAgIHRoaXMud2FsbE1vZGVsU3Vic2NyaXB0aW9uID0gbnVsbDtcblxuICAgICAgICB0aGlzLmZvY3VzZWRCcmljayA9IG51bGw7XG5cbiAgICAgICAgdGhpcy51blNlbGVjdEJyaWNrcygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGlzcGF0Y2goZSkge1xuICAgICAgICB0aGlzLmV2ZW50cy5uZXh0KGUpO1xuICAgIH1cbn1cbiJdfQ==