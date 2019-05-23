/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { DOCUMENT } from '@angular/common';
import { Radar } from '../../modules/radar/radar.service';
import { PickOutService } from '../../modules/pick-out/pick-out.service';
import { StartPickOut } from '../../modules/pick-out/events/start-pick-out.event';
import { PickOutItems } from '../../modules/pick-out/events/pick-out-items.event';
import { EndPickOut } from '../../modules/pick-out/events/end-pick-out.event';
import { TowService } from '../../modules/tow/tow.service';
import { TOW } from '../../modules/tow/tow.constant';
import { StopWorkingEvent } from '../../modules/tow/events/stop-working.event';
import { WorkInProgressEvent } from '../../modules/tow/events/work-in-progress.event';
import { StartWorkingEvent } from '../../modules/tow/events/start-working.event';
import { PlaceholderRenderer } from '../../modules/components/placeholder-renderer/placeholder-renderer.service';
/**
 * @record
 */
export function ISelectionOptions() { }
if (false) {
    /** @type {?} */
    ISelectionOptions.prototype.shouldUnselectBrick;
}
var SelectionPlugin = /** @class */ (function () {
    function SelectionPlugin(injector, options) {
        this.injector = injector;
        this.isMouseSelection = false;
        this.placeholderHeight = 2;
        this.isEnableDropZoneHighlight = false;
        // extension point for client to prevent brick un-selections
        this.options = tslib_1.__assign({ shouldUnselectBrick: function () { return true; } }, options);
    }
    /**
     * @param {?} wallModel
     * @return {?}
     */
    SelectionPlugin.prototype.onWallInitialize = /**
     * @param {?} wallModel
     * @return {?}
     */
    function (wallModel) {
        var _this = this;
        this.wallModel = wallModel;
        this.doc = this.injector.get(DOCUMENT);
        this.pickOutService = this.injector.get(PickOutService);
        this.radar = this.injector.get(Radar);
        this.placeholderRenderer = this.injector.get(PlaceholderRenderer);
        this.towService = this.injector.get(TowService);
        this.onMouseDownBound = this.onMouseDown.bind(this);
        this.onKeyDownHandlerBound = this.onKeyDownHandler.bind(this);
        this.doc.addEventListener('mousedown', this.onMouseDownBound);
        this.doc.addEventListener('keydown', this.onKeyDownHandlerBound);
        // listen to picked out items and select appropriate bricks
        this.pickOutServiceSubscription = this.pickOutService.subscribe(function (e) {
            if (e instanceof StartPickOut) {
                _this.isMouseSelection = true;
                _this.wallModel.api.ui.disableMediaInteraction();
            }
            if (e instanceof PickOutItems) {
                _this.wallModel.api.ui.selectBricks(e.ids);
            }
            if (e instanceof EndPickOut) {
                _this.wallModel.api.ui.enableMediaInteraction();
            }
        });
        // listen for draggable operation and move bricks accordingly
        this.towServiceSubscription = this.towService.subscribe(function (e) {
            if (e instanceof StartWorkingEvent) {
                if (_this.wallModel.api.core.getBrickSnapshot(e.slaveId)) {
                    _this.isEnableDropZoneHighlight = true;
                }
                else {
                    _this.isEnableDropZoneHighlight = false;
                }
                _this.nearestBrickToDrop = null;
                _this.placeholderRenderer.clear();
            }
            if (e instanceof StopWorkingEvent && _this.nearestBrickToDrop) {
                if (_this.isEnableDropZoneHighlight) {
                    /** @type {?} */
                    var movedBrickIds = [];
                    /** @type {?} */
                    var selectedBrickIds = _this.wallModel.api.ui.getSelectedBrickIds();
                    if (selectedBrickIds.length > 1) {
                        movedBrickIds = movedBrickIds.concat(selectedBrickIds);
                    }
                    else {
                        movedBrickIds.push(e.slaveId);
                    }
                    if (_this.nearestBrickToDrop.type === TOW.dropTypes.horizontal) {
                        if (_this.nearestBrickToDrop.side === TOW.dropSides.top) {
                            _this.wallModel.api.core.moveBrickBeforeBrickId(movedBrickIds, _this.nearestBrickToDrop.spot.data.brickId);
                        }
                        if (_this.nearestBrickToDrop.side === TOW.dropSides.bottom) {
                            _this.wallModel.api.core.moveBrickAfterBrickId(movedBrickIds, _this.nearestBrickToDrop.spot.data.brickId);
                        }
                    }
                    if (_this.nearestBrickToDrop.type === TOW.dropTypes.vertical) {
                        if (_this.nearestBrickToDrop.side === TOW.dropSides.left) {
                            _this.wallModel.api.core.moveBrickToNewColumn(movedBrickIds, _this.nearestBrickToDrop.spot.data.brickId, TOW.dropSides.left);
                        }
                        if (_this.nearestBrickToDrop.side === TOW.dropSides.right) {
                            _this.wallModel.api.core.moveBrickToNewColumn(movedBrickIds, _this.nearestBrickToDrop.spot.data.brickId, TOW.dropSides.right);
                        }
                    }
                    _this.nearestBrickToDrop = null;
                    _this.placeholderRenderer.clear();
                }
            }
            if (e instanceof WorkInProgressEvent) {
                if (_this.isEnableDropZoneHighlight) {
                    /** @type {?} */
                    var spots = _this.radar.filterSpots(function (spot) { return spot.data.isBeacon; });
                    /** @type {?} */
                    var nearestSpot_1;
                    spots.forEach(function (spot) {
                        spot.updateInfo();
                        if (!nearestSpot_1) {
                            nearestSpot_1 = spot;
                        }
                        else {
                            /** @type {?} */
                            var currentSpotMinimalDistance = spot.getMinimalDistanceToPoint(e.mousePosition.clientX, e.mousePosition.clientY);
                            /** @type {?} */
                            var nearestSpotMinimalDistance = nearestSpot_1.getMinimalDistanceToPoint(e.mousePosition.clientX, e.mousePosition.clientY);
                            if (currentSpotMinimalDistance < nearestSpotMinimalDistance) {
                                nearestSpot_1 = spot;
                            }
                        }
                    });
                    if (nearestSpot_1) {
                        /** @type {?} */
                        var nearestSpotMinimalDistance = nearestSpot_1.getMinimalDistanceToPoint(e.mousePosition.clientX, e.mousePosition.clientY);
                        if (nearestSpotMinimalDistance < 50) {
                            _this.nearestBrickToDrop = {
                                spot: nearestSpot_1,
                                side: null,
                                type: null
                            };
                            if (e.mousePosition.clientX < nearestSpot_1.position.x) {
                                _this.nearestBrickToDrop.type = TOW.dropTypes.vertical;
                                _this.nearestBrickToDrop.side = TOW.dropSides.left;
                            }
                            if (e.mousePosition.clientX > nearestSpot_1.position.x + nearestSpot_1.size.width) {
                                _this.nearestBrickToDrop.type = TOW.dropTypes.vertical;
                                _this.nearestBrickToDrop.side = TOW.dropSides.right;
                            }
                            if (e.mousePosition.clientX > nearestSpot_1.position.x &&
                                e.mousePosition.clientX < nearestSpot_1.position.x + nearestSpot_1.size.width) {
                                _this.nearestBrickToDrop.type = TOW.dropTypes.horizontal;
                                /** @type {?} */
                                var centerYPosition = nearestSpot_1.position.y + (nearestSpot_1.size.height / 2);
                                _this.nearestBrickToDrop.side = e.mousePosition.clientY < centerYPosition ?
                                    TOW.dropSides.top : TOW.dropSides.bottom;
                            }
                            _this.renderPlaceholder();
                        }
                        else {
                            _this.nearestBrickToDrop = null;
                            _this.placeholderRenderer.clear();
                        }
                    }
                    else {
                        _this.nearestBrickToDrop = null;
                        _this.placeholderRenderer.clear();
                    }
                }
            }
        });
    };
    /**
     * @param {?} e
     * @return {?}
     */
    SelectionPlugin.prototype.onMouseDown = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (!this.isMouseOverDraggableBox(e.clientX, e.clientY) && this.options.shouldUnselectBrick(e)) {
            this.wallModel.api.ui.unSelectBricks();
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    SelectionPlugin.prototype.onKeyDownHandler = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var selectedBrickIds = this.wallModel.api.ui.getSelectedBrickIds();
        /** @type {?} */
        var firstSelectedBrickId = selectedBrickIds[0];
        /** @type {?} */
        var lastSelectedBrickId = selectedBrickIds[selectedBrickIds.length - 1];
        if (e.key === 'Delete' && selectedBrickIds.length) {
            e.preventDefault();
            this.wallModel.api.ui.unSelectBricks();
            this.wallModel.api.ui.removeBricks(selectedBrickIds);
        }
        if (e.key === 'Enter' && selectedBrickIds.length) {
            e.preventDefault();
            this.wallModel.api.ui.focusOnBrickId(firstSelectedBrickId);
            this.wallModel.api.ui.unSelectBricks();
        }
        if (e.key === 'ArrowUp' && selectedBrickIds.length) {
            e.preventDefault();
            /** @type {?} */
            var previousBrickId = this.wallModel.api.core.getPreviousBrickId(lastSelectedBrickId);
            if (previousBrickId) {
                if (e.shiftKey) {
                    if (selectedBrickIds.length > 1 && this.isDownSelectionDirection()) {
                        this.wallModel.api.ui.removeBrickFromSelection(lastSelectedBrickId);
                    }
                    else {
                        this.wallModel.api.ui.addBrickToSelection(previousBrickId);
                    }
                }
                else {
                    this.wallModel.api.ui.selectBrick(previousBrickId);
                }
            }
        }
        if (e.key === 'ArrowDown' && selectedBrickIds.length) {
            e.preventDefault();
            /** @type {?} */
            var nextBrickId = this.wallModel.api.core.getNextBrickId(lastSelectedBrickId);
            if (nextBrickId) {
                if (e.shiftKey) {
                    if (selectedBrickIds.length > 1 && !this.isDownSelectionDirection()) {
                        this.wallModel.api.ui.removeBrickFromSelection(lastSelectedBrickId);
                    }
                    else {
                        this.wallModel.api.ui.addBrickToSelection(nextBrickId);
                    }
                }
                else {
                    this.wallModel.api.ui.selectBrick(nextBrickId);
                }
            }
        }
        if (e.key === 'Escape') {
            e.preventDefault();
            if (selectedBrickIds.length) {
                this.wallModel.api.ui.unSelectBricks();
            }
        }
    };
    /**
     * @return {?}
     */
    SelectionPlugin.prototype.onWallPluginDestroy = /**
     * @return {?}
     */
    function () {
        this.doc.removeEventListener('mousedown', this.onMouseDownBound);
        this.doc.removeEventListener('keydown', this.onKeyDownHandlerBound);
        this.wallModel = null;
        this.pickOutServiceSubscription.unsubscribe();
        this.towServiceSubscription.unsubscribe();
    };
    /**
     * @private
     * @param {?} clientX
     * @param {?} clientY
     * @return {?}
     */
    SelectionPlugin.prototype.isMouseOverDraggableBox = /**
     * @private
     * @param {?} clientX
     * @param {?} clientY
     * @return {?}
     */
    function (clientX, clientY) {
        /** @type {?} */
        var currentElement = document.elementFromPoint(clientX, clientY);
        while (currentElement && !currentElement.classList.contains('wall-canvas-brick__draggable-box')) {
            currentElement = currentElement.parentElement;
        }
        return Boolean(currentElement);
    };
    /**
     * @private
     * @return {?}
     */
    SelectionPlugin.prototype.isDownSelectionDirection = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var selectedBrickIds = this.wallModel.api.ui.getSelectedBrickIds();
        /** @type {?} */
        var bricksCount = selectedBrickIds.length;
        /** @type {?} */
        var lastBrickId = selectedBrickIds[bricksCount - 1];
        /** @type {?} */
        var penultimateBrickId = selectedBrickIds[bricksCount - 2];
        return this.wallModel.api.core.isBrickAheadOf(penultimateBrickId, lastBrickId);
    };
    /**
     * @private
     * @return {?}
     */
    SelectionPlugin.prototype.renderPlaceholder = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var placeholderX;
        /** @type {?} */
        var placeholderY;
        /** @type {?} */
        var placeholderSize;
        /** @type {?} */
        var placeholderIsHorizontal;
        /** @type {?} */
        var spot = this.nearestBrickToDrop.spot;
        /** @type {?} */
        var side = this.nearestBrickToDrop.side;
        /** @type {?} */
        var type = this.nearestBrickToDrop.type;
        if (type === TOW.dropTypes.horizontal) {
            placeholderX = spot.position.x;
            placeholderSize = spot.size.width;
            if (side === TOW.dropSides.top) {
                placeholderY = spot.position.y - this.placeholderHeight;
            }
            if (side === TOW.dropSides.bottom) {
                placeholderY = spot.position.y + spot.size.height;
            }
            placeholderIsHorizontal = true;
        }
        if (type === TOW.dropTypes.vertical) {
            placeholderY = spot.position.y;
            placeholderSize = spot.size.height;
            placeholderIsHorizontal = false;
            if (side === TOW.dropSides.left) {
                placeholderX = spot.position.x;
            }
            if (side === TOW.dropSides.right) {
                placeholderX = spot.position.x + spot.size.width;
            }
        }
        this.placeholderRenderer.render(placeholderX, placeholderY, placeholderSize, placeholderIsHorizontal);
    };
    return SelectionPlugin;
}());
export { SelectionPlugin };
if (false) {
    /** @type {?} */
    SelectionPlugin.prototype.name;
    /** @type {?} */
    SelectionPlugin.prototype.version;
    /** @type {?} */
    SelectionPlugin.prototype.doc;
    /** @type {?} */
    SelectionPlugin.prototype.isMouseSelection;
    /** @type {?} */
    SelectionPlugin.prototype.onMouseDownBound;
    /** @type {?} */
    SelectionPlugin.prototype.onKeyDownHandlerBound;
    /** @type {?} */
    SelectionPlugin.prototype.wallModel;
    /**
     * @type {?}
     * @private
     */
    SelectionPlugin.prototype.pickOutService;
    /**
     * @type {?}
     * @private
     */
    SelectionPlugin.prototype.radar;
    /**
     * @type {?}
     * @private
     */
    SelectionPlugin.prototype.towService;
    /**
     * @type {?}
     * @private
     */
    SelectionPlugin.prototype.placeholderRenderer;
    /**
     * @type {?}
     * @private
     */
    SelectionPlugin.prototype.nearestBrickToDrop;
    /**
     * @type {?}
     * @private
     */
    SelectionPlugin.prototype.placeholderHeight;
    /**
     * @type {?}
     * @private
     */
    SelectionPlugin.prototype.isEnableDropZoneHighlight;
    /**
     * @type {?}
     * @private
     */
    SelectionPlugin.prototype.towServiceSubscription;
    /**
     * @type {?}
     * @private
     */
    SelectionPlugin.prototype.pickOutServiceSubscription;
    /**
     * @type {?}
     * @private
     */
    SelectionPlugin.prototype.options;
    /**
     * @type {?}
     * @private
     */
    SelectionPlugin.prototype.injector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvcGx1Z2lucy9zZWxlY3Rpb25zL3NlbGVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUd6QyxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFFeEQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxvREFBb0QsQ0FBQztBQUNoRixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sb0RBQW9ELENBQUM7QUFDaEYsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGtEQUFrRCxDQUFDO0FBRzVFLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUN6RCxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sNkNBQTZDLENBQUM7QUFDN0UsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0saURBQWlELENBQUM7QUFDcEYsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sOENBQThDLENBQUM7QUFDL0UsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sNEVBQTRFLENBQUM7Ozs7QUFFL0csdUNBRUM7OztJQURHLGdEQUFnRDs7QUFHcEQ7SUE4QkkseUJBQW9CLFFBQWtCLEVBQUUsT0FBMkI7UUFBL0MsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQXhCdEMscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBZ0JqQixzQkFBaUIsR0FBRyxDQUFDLENBQUM7UUFDdEIsOEJBQXlCLEdBQUcsS0FBSyxDQUFDO1FBUXRDLDREQUE0RDtRQUM1RCxJQUFJLENBQUMsT0FBTyxzQkFDUixtQkFBbUIsRUFBRSxjQUFN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ZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SW5qZWN0b3J9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtSYWRhcn0gZnJvbSAnLi4vLi4vbW9kdWxlcy9yYWRhci9yYWRhci5zZXJ2aWNlJztcbmltcG9ydCB7U3BvdE1vZGVsfSBmcm9tICcuLi8uLi9tb2R1bGVzL3JhZGFyL3Nwb3QubW9kZWwnO1xuaW1wb3J0IHtQaWNrT3V0U2VydmljZX0gZnJvbSAnLi4vLi4vbW9kdWxlcy9waWNrLW91dC9waWNrLW91dC5zZXJ2aWNlJztcbmltcG9ydCB7U3RhcnRQaWNrT3V0fSBmcm9tICcuLi8uLi9tb2R1bGVzL3BpY2stb3V0L2V2ZW50cy9zdGFydC1waWNrLW91dC5ldmVudCc7XG5pbXBvcnQge1BpY2tPdXRJdGVtc30gZnJvbSAnLi4vLi4vbW9kdWxlcy9waWNrLW91dC9ldmVudHMvcGljay1vdXQtaXRlbXMuZXZlbnQnO1xuaW1wb3J0IHtFbmRQaWNrT3V0fSBmcm9tICcuLi8uLi9tb2R1bGVzL3BpY2stb3V0L2V2ZW50cy9lbmQtcGljay1vdXQuZXZlbnQnO1xuaW1wb3J0IHtJV2FsbFBsdWdpbn0gZnJvbSAnLi4vLi4vd2FsbC9tb2RlbC9pbnRlcmZhY2VzL3dhbGwtcGx1Z2luLmludGVyZmFjZSc7XG5pbXBvcnQge0lXYWxsTW9kZWx9IGZyb20gJy4uLy4uL3dhbGwvbW9kZWwvaW50ZXJmYWNlcy93YWxsLW1vZGVsLmludGVyZmFjZSc7XG5pbXBvcnQge1Rvd1NlcnZpY2V9IGZyb20gJy4uLy4uL21vZHVsZXMvdG93L3Rvdy5zZXJ2aWNlJztcbmltcG9ydCB7VE9XfSBmcm9tICcuLi8uLi9tb2R1bGVzL3Rvdy90b3cuY29uc3RhbnQnO1xuaW1wb3J0IHtTdG9wV29ya2luZ0V2ZW50fSBmcm9tICcuLi8uLi9tb2R1bGVzL3Rvdy9ldmVudHMvc3RvcC13b3JraW5nLmV2ZW50JztcbmltcG9ydCB7V29ya0luUHJvZ3Jlc3NFdmVudH0gZnJvbSAnLi4vLi4vbW9kdWxlcy90b3cvZXZlbnRzL3dvcmstaW4tcHJvZ3Jlc3MuZXZlbnQnO1xuaW1wb3J0IHtTdGFydFdvcmtpbmdFdmVudH0gZnJvbSAnLi4vLi4vbW9kdWxlcy90b3cvZXZlbnRzL3N0YXJ0LXdvcmtpbmcuZXZlbnQnO1xuaW1wb3J0IHtQbGFjZWhvbGRlclJlbmRlcmVyfSBmcm9tICcuLi8uLi9tb2R1bGVzL2NvbXBvbmVudHMvcGxhY2Vob2xkZXItcmVuZGVyZXIvcGxhY2Vob2xkZXItcmVuZGVyZXIuc2VydmljZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNlbGVjdGlvbk9wdGlvbnMge1xuICAgIHNob3VsZFVuc2VsZWN0QnJpY2s6IChlOiBNb3VzZUV2ZW50KSA9PiBib29sZWFuO1xufVxuXG5leHBvcnQgY2xhc3MgU2VsZWN0aW9uUGx1Z2luIGltcGxlbWVudHMgSVdhbGxQbHVnaW4ge1xuICAgIG5hbWU6ICdzZWxlY3Rpb24nO1xuICAgIHZlcnNpb246ICcwLjAuMCc7XG5cbiAgICBkb2M6IERvY3VtZW50O1xuXG4gICAgaXNNb3VzZVNlbGVjdGlvbiA9IGZhbHNlO1xuICAgIG9uTW91c2VEb3duQm91bmQ6IGFueTtcbiAgICBvbktleURvd25IYW5kbGVyQm91bmQ6IGFueTtcblxuICAgIHdhbGxNb2RlbDogSVdhbGxNb2RlbDtcblxuICAgIHByaXZhdGUgcGlja091dFNlcnZpY2U6IFBpY2tPdXRTZXJ2aWNlO1xuICAgIHByaXZhdGUgcmFkYXI6IFJhZGFyO1xuICAgIHByaXZhdGUgdG93U2VydmljZTogVG93U2VydmljZTtcbiAgICBwcml2YXRlIHBsYWNlaG9sZGVyUmVuZGVyZXI6IFBsYWNlaG9sZGVyUmVuZGVyZXI7XG5cbiAgICBwcml2YXRlIG5lYXJlc3RCcmlja1RvRHJvcDoge1xuICAgICAgICBzcG90OiBTcG90TW9kZWw7XG4gICAgICAgIHR5cGU6IHN0cmluZztcbiAgICAgICAgc2lkZTogc3RyaW5nO1xuICAgIH07XG4gICAgcHJpdmF0ZSBwbGFjZWhvbGRlckhlaWdodCA9IDI7XG4gICAgcHJpdmF0ZSBpc0VuYWJsZURyb3Bab25lSGlnaGxpZ2h0ID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIHRvd1NlcnZpY2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICBwcml2YXRlIHBpY2tPdXRTZXJ2aWNlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBwcml2YXRlIG9wdGlvbnM6IElTZWxlY3Rpb25PcHRpb25zO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsIG9wdGlvbnM/OiBJU2VsZWN0aW9uT3B0aW9ucykge1xuICAgICAgICAvLyBleHRlbnNpb24gcG9pbnQgZm9yIGNsaWVudCB0byBwcmV2ZW50IGJyaWNrIHVuLXNlbGVjdGlvbnNcbiAgICAgICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgICAgICAgc2hvdWxkVW5zZWxlY3RCcmljazogKCkgPT4gdHJ1ZSxcbiAgICAgICAgICAgIC4uLm9wdGlvbnNcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBvbldhbGxJbml0aWFsaXplKHdhbGxNb2RlbDogSVdhbGxNb2RlbCkge1xuICAgICAgICB0aGlzLndhbGxNb2RlbCA9IHdhbGxNb2RlbDtcblxuICAgICAgICB0aGlzLmRvYyA9IHRoaXMuaW5qZWN0b3IuZ2V0KERPQ1VNRU5UKTtcbiAgICAgICAgdGhpcy5waWNrT3V0U2VydmljZSA9IHRoaXMuaW5qZWN0b3IuZ2V0KFBpY2tPdXRTZXJ2aWNlKTtcbiAgICAgICAgdGhpcy5yYWRhciA9IHRoaXMuaW5qZWN0b3IuZ2V0KFJhZGFyKTtcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlclJlbmRlcmVyID0gdGhpcy5pbmplY3Rvci5nZXQoUGxhY2Vob2xkZXJSZW5kZXJlcik7XG4gICAgICAgIHRoaXMudG93U2VydmljZSA9IHRoaXMuaW5qZWN0b3IuZ2V0KFRvd1NlcnZpY2UpO1xuXG4gICAgICAgIHRoaXMub25Nb3VzZURvd25Cb3VuZCA9IHRoaXMub25Nb3VzZURvd24uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vbktleURvd25IYW5kbGVyQm91bmQgPSB0aGlzLm9uS2V5RG93bkhhbmRsZXIuYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLmRvYy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2VEb3duQm91bmQpO1xuICAgICAgICB0aGlzLmRvYy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd25IYW5kbGVyQm91bmQpO1xuXG4gICAgICAgIC8vIGxpc3RlbiB0byBwaWNrZWQgb3V0IGl0ZW1zIGFuZCBzZWxlY3QgYXBwcm9wcmlhdGUgYnJpY2tzXG4gICAgICAgIHRoaXMucGlja091dFNlcnZpY2VTdWJzY3JpcHRpb24gPSB0aGlzLnBpY2tPdXRTZXJ2aWNlLnN1YnNjcmliZSgoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBTdGFydFBpY2tPdXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzTW91c2VTZWxlY3Rpb24gPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgdGhpcy53YWxsTW9kZWwuYXBpLnVpLmRpc2FibGVNZWRpYUludGVyYWN0aW9uKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChlIGluc3RhbmNlb2YgUGlja091dEl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53YWxsTW9kZWwuYXBpLnVpLnNlbGVjdEJyaWNrcyhlLmlkcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChlIGluc3RhbmNlb2YgRW5kUGlja091dCkge1xuICAgICAgICAgICAgICAgIHRoaXMud2FsbE1vZGVsLmFwaS51aS5lbmFibGVNZWRpYUludGVyYWN0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGxpc3RlbiBmb3IgZHJhZ2dhYmxlIG9wZXJhdGlvbiBhbmQgbW92ZSBicmlja3MgYWNjb3JkaW5nbHlcbiAgICAgICAgdGhpcy50b3dTZXJ2aWNlU3Vic2NyaXB0aW9uID0gdGhpcy50b3dTZXJ2aWNlLnN1YnNjcmliZSgoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBTdGFydFdvcmtpbmdFdmVudCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLndhbGxNb2RlbC5hcGkuY29yZS5nZXRCcmlja1NuYXBzaG90KGUuc2xhdmVJZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0VuYWJsZURyb3Bab25lSGlnaGxpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzRW5hYmxlRHJvcFpvbmVIaWdobGlnaHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLm5lYXJlc3RCcmlja1RvRHJvcCA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGFjZWhvbGRlclJlbmRlcmVyLmNsZWFyKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChlIGluc3RhbmNlb2YgU3RvcFdvcmtpbmdFdmVudCAmJiB0aGlzLm5lYXJlc3RCcmlja1RvRHJvcCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzRW5hYmxlRHJvcFpvbmVIaWdobGlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmVkQnJpY2tJZHMgPSBbXTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZEJyaWNrSWRzID0gdGhpcy53YWxsTW9kZWwuYXBpLnVpLmdldFNlbGVjdGVkQnJpY2tJZHMoKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRCcmlja0lkcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb3ZlZEJyaWNrSWRzID0gbW92ZWRCcmlja0lkcy5jb25jYXQoc2VsZWN0ZWRCcmlja0lkcyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb3ZlZEJyaWNrSWRzLnB1c2goZS5zbGF2ZUlkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm5lYXJlc3RCcmlja1RvRHJvcC50eXBlID09PSBUT1cuZHJvcFR5cGVzLmhvcml6b250YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm5lYXJlc3RCcmlja1RvRHJvcC5zaWRlID09PSBUT1cuZHJvcFNpZGVzLnRvcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2FsbE1vZGVsLmFwaS5jb3JlLm1vdmVCcmlja0JlZm9yZUJyaWNrSWQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVkQnJpY2tJZHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmVhcmVzdEJyaWNrVG9Ecm9wLnNwb3QuZGF0YS5icmlja0lkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubmVhcmVzdEJyaWNrVG9Ecm9wLnNpZGUgPT09IFRPVy5kcm9wU2lkZXMuYm90dG9tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53YWxsTW9kZWwuYXBpLmNvcmUubW92ZUJyaWNrQWZ0ZXJCcmlja0lkKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3ZlZEJyaWNrSWRzLCB0aGlzLm5lYXJlc3RCcmlja1RvRHJvcC5zcG90LmRhdGEuYnJpY2tJZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5uZWFyZXN0QnJpY2tUb0Ryb3AudHlwZSA9PT0gVE9XLmRyb3BUeXBlcy52ZXJ0aWNhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubmVhcmVzdEJyaWNrVG9Ecm9wLnNpZGUgPT09IFRPVy5kcm9wU2lkZXMubGVmdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2FsbE1vZGVsLmFwaS5jb3JlLm1vdmVCcmlja1RvTmV3Q29sdW1uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3ZlZEJyaWNrSWRzLCB0aGlzLm5lYXJlc3RCcmlja1RvRHJvcC5zcG90LmRhdGEuYnJpY2tJZCwgVE9XLmRyb3BTaWRlcy5sZWZ0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubmVhcmVzdEJyaWNrVG9Ecm9wLnNpZGUgPT09IFRPVy5kcm9wU2lkZXMucmlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkuY29yZS5tb3ZlQnJpY2tUb05ld0NvbHVtbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW92ZWRCcmlja0lkcywgdGhpcy5uZWFyZXN0QnJpY2tUb0Ryb3Auc3BvdC5kYXRhLmJyaWNrSWQsIFRPVy5kcm9wU2lkZXMucmlnaHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZWFyZXN0QnJpY2tUb0Ryb3AgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxhY2Vob2xkZXJSZW5kZXJlci5jbGVhcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBXb3JrSW5Qcm9ncmVzc0V2ZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVEcm9wWm9uZUhpZ2hsaWdodCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzcG90cyA9IHRoaXMucmFkYXIuZmlsdGVyU3BvdHMoKHNwb3Q6IFNwb3RNb2RlbCkgPT4gc3BvdC5kYXRhLmlzQmVhY29uKTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgbmVhcmVzdFNwb3Q6IFNwb3RNb2RlbDtcblxuICAgICAgICAgICAgICAgICAgICBzcG90cy5mb3JFYWNoKChzcG90KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcG90LnVwZGF0ZUluZm8oKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFuZWFyZXN0U3BvdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lYXJlc3RTcG90ID0gc3BvdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFNwb3RNaW5pbWFsRGlzdGFuY2UgPSBzcG90LmdldE1pbmltYWxEaXN0YW5jZVRvUG9pbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUubW91c2VQb3NpdGlvbi5jbGllbnRYLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLm1vdXNlUG9zaXRpb24uY2xpZW50WVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZWFyZXN0U3BvdE1pbmltYWxEaXN0YW5jZSA9IG5lYXJlc3RTcG90LmdldE1pbmltYWxEaXN0YW5jZVRvUG9pbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUubW91c2VQb3NpdGlvbi5jbGllbnRYLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLm1vdXNlUG9zaXRpb24uY2xpZW50WVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFNwb3RNaW5pbWFsRGlzdGFuY2UgPCBuZWFyZXN0U3BvdE1pbmltYWxEaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWFyZXN0U3BvdCA9IHNwb3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobmVhcmVzdFNwb3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5lYXJlc3RTcG90TWluaW1hbERpc3RhbmNlID0gbmVhcmVzdFNwb3QuZ2V0TWluaW1hbERpc3RhbmNlVG9Qb2ludChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLm1vdXNlUG9zaXRpb24uY2xpZW50WCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLm1vdXNlUG9zaXRpb24uY2xpZW50WVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5lYXJlc3RTcG90TWluaW1hbERpc3RhbmNlIDwgNTApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5lYXJlc3RCcmlja1RvRHJvcCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdDogbmVhcmVzdFNwb3QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZGU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUubW91c2VQb3NpdGlvbi5jbGllbnRYIDwgbmVhcmVzdFNwb3QucG9zaXRpb24ueCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5lYXJlc3RCcmlja1RvRHJvcC50eXBlID0gVE9XLmRyb3BUeXBlcy52ZXJ0aWNhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZWFyZXN0QnJpY2tUb0Ryb3Auc2lkZSA9IFRPVy5kcm9wU2lkZXMubGVmdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5tb3VzZVBvc2l0aW9uLmNsaWVudFggPiBuZWFyZXN0U3BvdC5wb3NpdGlvbi54ICsgbmVhcmVzdFNwb3Quc2l6ZS53aWR0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5lYXJlc3RCcmlja1RvRHJvcC50eXBlID0gVE9XLmRyb3BUeXBlcy52ZXJ0aWNhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZWFyZXN0QnJpY2tUb0Ryb3Auc2lkZSA9IFRPVy5kcm9wU2lkZXMucmlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUubW91c2VQb3NpdGlvbi5jbGllbnRYID4gbmVhcmVzdFNwb3QucG9zaXRpb24ueCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLm1vdXNlUG9zaXRpb24uY2xpZW50WCA8IG5lYXJlc3RTcG90LnBvc2l0aW9uLnggKyBuZWFyZXN0U3BvdC5zaXplLndpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmVhcmVzdEJyaWNrVG9Ecm9wLnR5cGUgPSBUT1cuZHJvcFR5cGVzLmhvcml6b250YWw7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2VudGVyWVBvc2l0aW9uID0gbmVhcmVzdFNwb3QucG9zaXRpb24ueSArIChuZWFyZXN0U3BvdC5zaXplLmhlaWdodCAvIDIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmVhcmVzdEJyaWNrVG9Ecm9wLnNpZGUgPSBlLm1vdXNlUG9zaXRpb24uY2xpZW50WSA8IGNlbnRlcllQb3NpdGlvbiA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUT1cuZHJvcFNpZGVzLnRvcCA6IFRPVy5kcm9wU2lkZXMuYm90dG9tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyUGxhY2Vob2xkZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZWFyZXN0QnJpY2tUb0Ryb3AgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFjZWhvbGRlclJlbmRlcmVyLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5lYXJlc3RCcmlja1RvRHJvcCA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxhY2Vob2xkZXJSZW5kZXJlci5jbGVhcigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbk1vdXNlRG93bihlOiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5pc01vdXNlT3ZlckRyYWdnYWJsZUJveChlLmNsaWVudFgsIGUuY2xpZW50WSkgJiYgdGhpcy5vcHRpb25zLnNob3VsZFVuc2VsZWN0QnJpY2soZSkpIHtcbiAgICAgICAgICAgIHRoaXMud2FsbE1vZGVsLmFwaS51aS51blNlbGVjdEJyaWNrcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25LZXlEb3duSGFuZGxlcihlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkQnJpY2tJZHMgPSB0aGlzLndhbGxNb2RlbC5hcGkudWkuZ2V0U2VsZWN0ZWRCcmlja0lkcygpO1xuICAgICAgICBjb25zdCBmaXJzdFNlbGVjdGVkQnJpY2tJZCA9IHNlbGVjdGVkQnJpY2tJZHNbMF07XG4gICAgICAgIGNvbnN0IGxhc3RTZWxlY3RlZEJyaWNrSWQgPSBzZWxlY3RlZEJyaWNrSWRzW3NlbGVjdGVkQnJpY2tJZHMubGVuZ3RoIC0gMV07XG5cbiAgICAgICAgaWYgKGUua2V5ID09PSAnRGVsZXRlJyAmJiBzZWxlY3RlZEJyaWNrSWRzLmxlbmd0aCkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkudWkudW5TZWxlY3RCcmlja3MoKTtcblxuICAgICAgICAgICAgdGhpcy53YWxsTW9kZWwuYXBpLnVpLnJlbW92ZUJyaWNrcyhzZWxlY3RlZEJyaWNrSWRzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJyAmJiBzZWxlY3RlZEJyaWNrSWRzLmxlbmd0aCkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkudWkuZm9jdXNPbkJyaWNrSWQoZmlyc3RTZWxlY3RlZEJyaWNrSWQpO1xuXG4gICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkudWkudW5TZWxlY3RCcmlja3MoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlLmtleSA9PT0gJ0Fycm93VXAnICYmIHNlbGVjdGVkQnJpY2tJZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzQnJpY2tJZCA9IHRoaXMud2FsbE1vZGVsLmFwaS5jb3JlLmdldFByZXZpb3VzQnJpY2tJZChsYXN0U2VsZWN0ZWRCcmlja0lkKTtcblxuICAgICAgICAgICAgaWYgKHByZXZpb3VzQnJpY2tJZCkge1xuICAgICAgICAgICAgICAgIGlmIChlLnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEJyaWNrSWRzLmxlbmd0aCA+IDEgJiYgdGhpcy5pc0Rvd25TZWxlY3Rpb25EaXJlY3Rpb24oKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53YWxsTW9kZWwuYXBpLnVpLnJlbW92ZUJyaWNrRnJvbVNlbGVjdGlvbihsYXN0U2VsZWN0ZWRCcmlja0lkKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2FsbE1vZGVsLmFwaS51aS5hZGRCcmlja1RvU2VsZWN0aW9uKHByZXZpb3VzQnJpY2tJZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkudWkuc2VsZWN0QnJpY2socHJldmlvdXNCcmlja0lkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZS5rZXkgPT09ICdBcnJvd0Rvd24nICYmIHNlbGVjdGVkQnJpY2tJZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGNvbnN0IG5leHRCcmlja0lkID0gdGhpcy53YWxsTW9kZWwuYXBpLmNvcmUuZ2V0TmV4dEJyaWNrSWQobGFzdFNlbGVjdGVkQnJpY2tJZCk7XG5cbiAgICAgICAgICAgIGlmIChuZXh0QnJpY2tJZCkge1xuICAgICAgICAgICAgICAgIGlmIChlLnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEJyaWNrSWRzLmxlbmd0aCA+IDEgJiYgIXRoaXMuaXNEb3duU2VsZWN0aW9uRGlyZWN0aW9uKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2FsbE1vZGVsLmFwaS51aS5yZW1vdmVCcmlja0Zyb21TZWxlY3Rpb24obGFzdFNlbGVjdGVkQnJpY2tJZCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkudWkuYWRkQnJpY2tUb1NlbGVjdGlvbihuZXh0QnJpY2tJZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkudWkuc2VsZWN0QnJpY2sobmV4dEJyaWNrSWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkQnJpY2tJZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53YWxsTW9kZWwuYXBpLnVpLnVuU2VsZWN0QnJpY2tzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbldhbGxQbHVnaW5EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRvYy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2VEb3duQm91bmQpO1xuICAgICAgICB0aGlzLmRvYy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd25IYW5kbGVyQm91bmQpO1xuXG4gICAgICAgIHRoaXMud2FsbE1vZGVsID0gbnVsbDtcbiAgICAgICAgdGhpcy5waWNrT3V0U2VydmljZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLnRvd1NlcnZpY2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzTW91c2VPdmVyRHJhZ2dhYmxlQm94KGNsaWVudFg6IG51bWJlciwgY2xpZW50WTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBjdXJyZW50RWxlbWVudCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoY2xpZW50WCwgY2xpZW50WSk7XG5cbiAgICAgICAgd2hpbGUgKGN1cnJlbnRFbGVtZW50ICYmICFjdXJyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ3dhbGwtY2FudmFzLWJyaWNrX19kcmFnZ2FibGUtYm94JykpIHtcbiAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50ID0gY3VycmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBCb29sZWFuKGN1cnJlbnRFbGVtZW50KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzRG93blNlbGVjdGlvbkRpcmVjdGlvbigpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRCcmlja0lkcyA9IHRoaXMud2FsbE1vZGVsLmFwaS51aS5nZXRTZWxlY3RlZEJyaWNrSWRzKCk7XG5cbiAgICAgICAgY29uc3QgYnJpY2tzQ291bnQgPSBzZWxlY3RlZEJyaWNrSWRzLmxlbmd0aDtcblxuICAgICAgICBjb25zdCBsYXN0QnJpY2tJZCA9IHNlbGVjdGVkQnJpY2tJZHNbYnJpY2tzQ291bnQgLSAxXTtcbiAgICAgICAgY29uc3QgcGVudWx0aW1hdGVCcmlja0lkID0gc2VsZWN0ZWRCcmlja0lkc1ticmlja3NDb3VudCAtIDJdO1xuXG4gICAgICAgIHJldHVybiB0aGlzLndhbGxNb2RlbC5hcGkuY29yZS5pc0JyaWNrQWhlYWRPZihwZW51bHRpbWF0ZUJyaWNrSWQsIGxhc3RCcmlja0lkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbmRlclBsYWNlaG9sZGVyKCkge1xuICAgICAgICBsZXQgcGxhY2Vob2xkZXJYO1xuICAgICAgICBsZXQgcGxhY2Vob2xkZXJZO1xuICAgICAgICBsZXQgcGxhY2Vob2xkZXJTaXplO1xuICAgICAgICBsZXQgcGxhY2Vob2xkZXJJc0hvcml6b250YWw7XG5cbiAgICAgICAgY29uc3Qgc3BvdCA9IHRoaXMubmVhcmVzdEJyaWNrVG9Ecm9wLnNwb3Q7XG4gICAgICAgIGNvbnN0IHNpZGUgPSB0aGlzLm5lYXJlc3RCcmlja1RvRHJvcC5zaWRlO1xuICAgICAgICBjb25zdCB0eXBlID0gdGhpcy5uZWFyZXN0QnJpY2tUb0Ryb3AudHlwZTtcblxuICAgICAgICBpZiAodHlwZSA9PT0gVE9XLmRyb3BUeXBlcy5ob3Jpem9udGFsKSB7XG4gICAgICAgICAgICBwbGFjZWhvbGRlclggPSBzcG90LnBvc2l0aW9uLng7XG4gICAgICAgICAgICBwbGFjZWhvbGRlclNpemUgPSBzcG90LnNpemUud2lkdGg7XG5cbiAgICAgICAgICAgIGlmIChzaWRlID09PSBUT1cuZHJvcFNpZGVzLnRvcCkge1xuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyWSA9IHNwb3QucG9zaXRpb24ueSAtIHRoaXMucGxhY2Vob2xkZXJIZWlnaHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzaWRlID09PSBUT1cuZHJvcFNpZGVzLmJvdHRvbSkge1xuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyWSA9IHNwb3QucG9zaXRpb24ueSArIHNwb3Quc2l6ZS5oZWlnaHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBsYWNlaG9sZGVySXNIb3Jpem9udGFsID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlID09PSBUT1cuZHJvcFR5cGVzLnZlcnRpY2FsKSB7XG4gICAgICAgICAgICBwbGFjZWhvbGRlclkgPSBzcG90LnBvc2l0aW9uLnk7XG4gICAgICAgICAgICBwbGFjZWhvbGRlclNpemUgPSBzcG90LnNpemUuaGVpZ2h0O1xuICAgICAgICAgICAgcGxhY2Vob2xkZXJJc0hvcml6b250YWwgPSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKHNpZGUgPT09IFRPVy5kcm9wU2lkZXMubGVmdCkge1xuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyWCA9IHNwb3QucG9zaXRpb24ueDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHNpZGUgPT09IFRPVy5kcm9wU2lkZXMucmlnaHQpIHtcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlclggPSBzcG90LnBvc2l0aW9uLnggKyBzcG90LnNpemUud2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyUmVuZGVyZXIucmVuZGVyKHBsYWNlaG9sZGVyWCwgcGxhY2Vob2xkZXJZLCBwbGFjZWhvbGRlclNpemUsIHBsYWNlaG9sZGVySXNIb3Jpem9udGFsKTtcbiAgICB9XG59XG4iXX0=