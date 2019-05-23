/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this.options = tslib_1.__assign({ shouldUnselectBrick: (/**
             * @return {?}
             */
            function () { return true; }) }, options);
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
        this.pickOutServiceSubscription = this.pickOutService.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
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
        }));
        // listen for draggable operation and move bricks accordingly
        this.towServiceSubscription = this.towService.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
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
                    var spots = _this.radar.filterSpots((/**
                     * @param {?} spot
                     * @return {?}
                     */
                    function (spot) { return spot.data.isBeacon; }));
                    /** @type {?} */
                    var nearestSpot_1;
                    spots.forEach((/**
                     * @param {?} spot
                     * @return {?}
                     */
                    function (spot) {
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
                    }));
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
        }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvcGx1Z2lucy9zZWxlY3Rpb25zL3NlbGVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUd6QyxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFFeEQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxvREFBb0QsQ0FBQztBQUNoRixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sb0RBQW9ELENBQUM7QUFDaEYsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGtEQUFrRCxDQUFDO0FBRzVFLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUN6RCxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sNkNBQTZDLENBQUM7QUFDN0UsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0saURBQWlELENBQUM7QUFDcEYsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sOENBQThDLENBQUM7QUFDL0UsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sNEVBQTRFLENBQUM7Ozs7QUFFL0csdUNBRUM7OztJQURHLGdEQUFnRDs7QUFHcEQ7SUE4QkkseUJBQW9CLFFBQWtCLEVBQUUsT0FBMkI7UUFBL0MsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQXhCdEMscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBZ0JqQixzQkFBaUIsR0FBRyxDQUFDLENBQUM7UUFDdEIsOEJBQXlCLEdBQUcsS0FBSyxDQUFDO1FBUXRDLDREQUE0RDtRQUM1RCxJQUFJLENBQUMsT0FBTyxzQkFDUixtQkFBbUI7OztZQUFFLGNB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cG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0luamVjdG9yfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7UmFkYXJ9IGZyb20gJy4uLy4uL21vZHVsZXMvcmFkYXIvcmFkYXIuc2VydmljZSc7XG5pbXBvcnQge1Nwb3RNb2RlbH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9yYWRhci9zcG90Lm1vZGVsJztcbmltcG9ydCB7UGlja091dFNlcnZpY2V9IGZyb20gJy4uLy4uL21vZHVsZXMvcGljay1vdXQvcGljay1vdXQuc2VydmljZSc7XG5pbXBvcnQge1N0YXJ0UGlja091dH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9waWNrLW91dC9ldmVudHMvc3RhcnQtcGljay1vdXQuZXZlbnQnO1xuaW1wb3J0IHtQaWNrT3V0SXRlbXN9IGZyb20gJy4uLy4uL21vZHVsZXMvcGljay1vdXQvZXZlbnRzL3BpY2stb3V0LWl0ZW1zLmV2ZW50JztcbmltcG9ydCB7RW5kUGlja091dH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9waWNrLW91dC9ldmVudHMvZW5kLXBpY2stb3V0LmV2ZW50JztcbmltcG9ydCB7SVdhbGxQbHVnaW59IGZyb20gJy4uLy4uL3dhbGwvbW9kZWwvaW50ZXJmYWNlcy93YWxsLXBsdWdpbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHtJV2FsbE1vZGVsfSBmcm9tICcuLi8uLi93YWxsL21vZGVsL2ludGVyZmFjZXMvd2FsbC1tb2RlbC5pbnRlcmZhY2UnO1xuaW1wb3J0IHtUb3dTZXJ2aWNlfSBmcm9tICcuLi8uLi9tb2R1bGVzL3Rvdy90b3cuc2VydmljZSc7XG5pbXBvcnQge1RPV30gZnJvbSAnLi4vLi4vbW9kdWxlcy90b3cvdG93LmNvbnN0YW50JztcbmltcG9ydCB7U3RvcFdvcmtpbmdFdmVudH0gZnJvbSAnLi4vLi4vbW9kdWxlcy90b3cvZXZlbnRzL3N0b3Atd29ya2luZy5ldmVudCc7XG5pbXBvcnQge1dvcmtJblByb2dyZXNzRXZlbnR9IGZyb20gJy4uLy4uL21vZHVsZXMvdG93L2V2ZW50cy93b3JrLWluLXByb2dyZXNzLmV2ZW50JztcbmltcG9ydCB7U3RhcnRXb3JraW5nRXZlbnR9IGZyb20gJy4uLy4uL21vZHVsZXMvdG93L2V2ZW50cy9zdGFydC13b3JraW5nLmV2ZW50JztcbmltcG9ydCB7UGxhY2Vob2xkZXJSZW5kZXJlcn0gZnJvbSAnLi4vLi4vbW9kdWxlcy9jb21wb25lbnRzL3BsYWNlaG9sZGVyLXJlbmRlcmVyL3BsYWNlaG9sZGVyLXJlbmRlcmVyLnNlcnZpY2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTZWxlY3Rpb25PcHRpb25zIHtcbiAgICBzaG91bGRVbnNlbGVjdEJyaWNrOiAoZTogTW91c2VFdmVudCkgPT4gYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNsYXNzIFNlbGVjdGlvblBsdWdpbiBpbXBsZW1lbnRzIElXYWxsUGx1Z2luIHtcbiAgICBuYW1lOiAnc2VsZWN0aW9uJztcbiAgICB2ZXJzaW9uOiAnMC4wLjAnO1xuXG4gICAgZG9jOiBEb2N1bWVudDtcblxuICAgIGlzTW91c2VTZWxlY3Rpb24gPSBmYWxzZTtcbiAgICBvbk1vdXNlRG93bkJvdW5kOiBhbnk7XG4gICAgb25LZXlEb3duSGFuZGxlckJvdW5kOiBhbnk7XG5cbiAgICB3YWxsTW9kZWw6IElXYWxsTW9kZWw7XG5cbiAgICBwcml2YXRlIHBpY2tPdXRTZXJ2aWNlOiBQaWNrT3V0U2VydmljZTtcbiAgICBwcml2YXRlIHJhZGFyOiBSYWRhcjtcbiAgICBwcml2YXRlIHRvd1NlcnZpY2U6IFRvd1NlcnZpY2U7XG4gICAgcHJpdmF0ZSBwbGFjZWhvbGRlclJlbmRlcmVyOiBQbGFjZWhvbGRlclJlbmRlcmVyO1xuXG4gICAgcHJpdmF0ZSBuZWFyZXN0QnJpY2tUb0Ryb3A6IHtcbiAgICAgICAgc3BvdDogU3BvdE1vZGVsO1xuICAgICAgICB0eXBlOiBzdHJpbmc7XG4gICAgICAgIHNpZGU6IHN0cmluZztcbiAgICB9O1xuICAgIHByaXZhdGUgcGxhY2Vob2xkZXJIZWlnaHQgPSAyO1xuICAgIHByaXZhdGUgaXNFbmFibGVEcm9wWm9uZUhpZ2hsaWdodCA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSB0b3dTZXJ2aWNlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gICAgcHJpdmF0ZSBwaWNrT3V0U2VydmljZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgcHJpdmF0ZSBvcHRpb25zOiBJU2VsZWN0aW9uT3B0aW9ucztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLCBvcHRpb25zPzogSVNlbGVjdGlvbk9wdGlvbnMpIHtcbiAgICAgICAgLy8gZXh0ZW5zaW9uIHBvaW50IGZvciBjbGllbnQgdG8gcHJldmVudCBicmljayB1bi1zZWxlY3Rpb25zXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHNob3VsZFVuc2VsZWN0QnJpY2s6ICgpID0+IHRydWUsXG4gICAgICAgICAgICAuLi5vcHRpb25zXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgb25XYWxsSW5pdGlhbGl6ZSh3YWxsTW9kZWw6IElXYWxsTW9kZWwpIHtcbiAgICAgICAgdGhpcy53YWxsTW9kZWwgPSB3YWxsTW9kZWw7XG5cbiAgICAgICAgdGhpcy5kb2MgPSB0aGlzLmluamVjdG9yLmdldChET0NVTUVOVCk7XG4gICAgICAgIHRoaXMucGlja091dFNlcnZpY2UgPSB0aGlzLmluamVjdG9yLmdldChQaWNrT3V0U2VydmljZSk7XG4gICAgICAgIHRoaXMucmFkYXIgPSB0aGlzLmluamVjdG9yLmdldChSYWRhcik7XG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXJSZW5kZXJlciA9IHRoaXMuaW5qZWN0b3IuZ2V0KFBsYWNlaG9sZGVyUmVuZGVyZXIpO1xuICAgICAgICB0aGlzLnRvd1NlcnZpY2UgPSB0aGlzLmluamVjdG9yLmdldChUb3dTZXJ2aWNlKTtcblxuICAgICAgICB0aGlzLm9uTW91c2VEb3duQm91bmQgPSB0aGlzLm9uTW91c2VEb3duLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25LZXlEb3duSGFuZGxlckJvdW5kID0gdGhpcy5vbktleURvd25IYW5kbGVyLmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5kb2MuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vbk1vdXNlRG93bkJvdW5kKTtcbiAgICAgICAgdGhpcy5kb2MuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25LZXlEb3duSGFuZGxlckJvdW5kKTtcblxuICAgICAgICAvLyBsaXN0ZW4gdG8gcGlja2VkIG91dCBpdGVtcyBhbmQgc2VsZWN0IGFwcHJvcHJpYXRlIGJyaWNrc1xuICAgICAgICB0aGlzLnBpY2tPdXRTZXJ2aWNlU3Vic2NyaXB0aW9uID0gdGhpcy5waWNrT3V0U2VydmljZS5zdWJzY3JpYmUoKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlIGluc3RhbmNlb2YgU3RhcnRQaWNrT3V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc01vdXNlU2VsZWN0aW9uID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIHRoaXMud2FsbE1vZGVsLmFwaS51aS5kaXNhYmxlTWVkaWFJbnRlcmFjdGlvbigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIFBpY2tPdXRJdGVtcykge1xuICAgICAgICAgICAgICAgIHRoaXMud2FsbE1vZGVsLmFwaS51aS5zZWxlY3RCcmlja3MoZS5pZHMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIEVuZFBpY2tPdXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkudWkuZW5hYmxlTWVkaWFJbnRlcmFjdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBsaXN0ZW4gZm9yIGRyYWdnYWJsZSBvcGVyYXRpb24gYW5kIG1vdmUgYnJpY2tzIGFjY29yZGluZ2x5XG4gICAgICAgIHRoaXMudG93U2VydmljZVN1YnNjcmlwdGlvbiA9IHRoaXMudG93U2VydmljZS5zdWJzY3JpYmUoKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlIGluc3RhbmNlb2YgU3RhcnRXb3JraW5nRXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy53YWxsTW9kZWwuYXBpLmNvcmUuZ2V0QnJpY2tTbmFwc2hvdChlLnNsYXZlSWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNFbmFibGVEcm9wWm9uZUhpZ2hsaWdodCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0VuYWJsZURyb3Bab25lSGlnaGxpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5uZWFyZXN0QnJpY2tUb0Ryb3AgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMucGxhY2Vob2xkZXJSZW5kZXJlci5jbGVhcigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIFN0b3BXb3JraW5nRXZlbnQgJiYgdGhpcy5uZWFyZXN0QnJpY2tUb0Ryb3ApIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0VuYWJsZURyb3Bab25lSGlnaGxpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlZEJyaWNrSWRzID0gW107XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRCcmlja0lkcyA9IHRoaXMud2FsbE1vZGVsLmFwaS51aS5nZXRTZWxlY3RlZEJyaWNrSWRzKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkQnJpY2tJZHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZWRCcmlja0lkcyA9IG1vdmVkQnJpY2tJZHMuY29uY2F0KHNlbGVjdGVkQnJpY2tJZHMpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZWRCcmlja0lkcy5wdXNoKGUuc2xhdmVJZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5uZWFyZXN0QnJpY2tUb0Ryb3AudHlwZSA9PT0gVE9XLmRyb3BUeXBlcy5ob3Jpem9udGFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5uZWFyZXN0QnJpY2tUb0Ryb3Auc2lkZSA9PT0gVE9XLmRyb3BTaWRlcy50b3ApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkuY29yZS5tb3ZlQnJpY2tCZWZvcmVCcmlja0lkKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3ZlZEJyaWNrSWRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5lYXJlc3RCcmlja1RvRHJvcC5zcG90LmRhdGEuYnJpY2tJZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm5lYXJlc3RCcmlja1RvRHJvcC5zaWRlID09PSBUT1cuZHJvcFNpZGVzLmJvdHRvbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2FsbE1vZGVsLmFwaS5jb3JlLm1vdmVCcmlja0FmdGVyQnJpY2tJZChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW92ZWRCcmlja0lkcywgdGhpcy5uZWFyZXN0QnJpY2tUb0Ryb3Auc3BvdC5kYXRhLmJyaWNrSWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubmVhcmVzdEJyaWNrVG9Ecm9wLnR5cGUgPT09IFRPVy5kcm9wVHlwZXMudmVydGljYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm5lYXJlc3RCcmlja1RvRHJvcC5zaWRlID09PSBUT1cuZHJvcFNpZGVzLmxlZnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkuY29yZS5tb3ZlQnJpY2tUb05ld0NvbHVtbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW92ZWRCcmlja0lkcywgdGhpcy5uZWFyZXN0QnJpY2tUb0Ryb3Auc3BvdC5kYXRhLmJyaWNrSWQsIFRPVy5kcm9wU2lkZXMubGVmdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm5lYXJlc3RCcmlja1RvRHJvcC5zaWRlID09PSBUT1cuZHJvcFNpZGVzLnJpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53YWxsTW9kZWwuYXBpLmNvcmUubW92ZUJyaWNrVG9OZXdDb2x1bW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVkQnJpY2tJZHMsIHRoaXMubmVhcmVzdEJyaWNrVG9Ecm9wLnNwb3QuZGF0YS5icmlja0lkLCBUT1cuZHJvcFNpZGVzLnJpZ2h0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmVhcmVzdEJyaWNrVG9Ecm9wID0gbnVsbDtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYWNlaG9sZGVyUmVuZGVyZXIuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChlIGluc3RhbmNlb2YgV29ya0luUHJvZ3Jlc3NFdmVudCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzRW5hYmxlRHJvcFpvbmVIaWdobGlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3BvdHMgPSB0aGlzLnJhZGFyLmZpbHRlclNwb3RzKChzcG90OiBTcG90TW9kZWwpID0+IHNwb3QuZGF0YS5pc0JlYWNvbik7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IG5lYXJlc3RTcG90OiBTcG90TW9kZWw7XG5cbiAgICAgICAgICAgICAgICAgICAgc3BvdHMuZm9yRWFjaCgoc3BvdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3BvdC51cGRhdGVJbmZvKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbmVhcmVzdFNwb3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWFyZXN0U3BvdCA9IHNwb3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRTcG90TWluaW1hbERpc3RhbmNlID0gc3BvdC5nZXRNaW5pbWFsRGlzdGFuY2VUb1BvaW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLm1vdXNlUG9zaXRpb24uY2xpZW50WCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5tb3VzZVBvc2l0aW9uLmNsaWVudFlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmVhcmVzdFNwb3RNaW5pbWFsRGlzdGFuY2UgPSBuZWFyZXN0U3BvdC5nZXRNaW5pbWFsRGlzdGFuY2VUb1BvaW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLm1vdXNlUG9zaXRpb24uY2xpZW50WCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5tb3VzZVBvc2l0aW9uLmNsaWVudFlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRTcG90TWluaW1hbERpc3RhbmNlIDwgbmVhcmVzdFNwb3RNaW5pbWFsRGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVhcmVzdFNwb3QgPSBzcG90O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG5lYXJlc3RTcG90KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZWFyZXN0U3BvdE1pbmltYWxEaXN0YW5jZSA9IG5lYXJlc3RTcG90LmdldE1pbmltYWxEaXN0YW5jZVRvUG9pbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5tb3VzZVBvc2l0aW9uLmNsaWVudFgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5tb3VzZVBvc2l0aW9uLmNsaWVudFlcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZWFyZXN0U3BvdE1pbmltYWxEaXN0YW5jZSA8IDUwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZWFyZXN0QnJpY2tUb0Ryb3AgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3Q6IG5lYXJlc3RTcG90LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWRlOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLm1vdXNlUG9zaXRpb24uY2xpZW50WCA8IG5lYXJlc3RTcG90LnBvc2l0aW9uLngpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZWFyZXN0QnJpY2tUb0Ryb3AudHlwZSA9IFRPVy5kcm9wVHlwZXMudmVydGljYWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmVhcmVzdEJyaWNrVG9Ecm9wLnNpZGUgPSBUT1cuZHJvcFNpZGVzLmxlZnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUubW91c2VQb3NpdGlvbi5jbGllbnRYID4gbmVhcmVzdFNwb3QucG9zaXRpb24ueCArIG5lYXJlc3RTcG90LnNpemUud2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZWFyZXN0QnJpY2tUb0Ryb3AudHlwZSA9IFRPVy5kcm9wVHlwZXMudmVydGljYWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmVhcmVzdEJyaWNrVG9Ecm9wLnNpZGUgPSBUT1cuZHJvcFNpZGVzLnJpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLm1vdXNlUG9zaXRpb24uY2xpZW50WCA+IG5lYXJlc3RTcG90LnBvc2l0aW9uLnggJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5tb3VzZVBvc2l0aW9uLmNsaWVudFggPCBuZWFyZXN0U3BvdC5wb3NpdGlvbi54ICsgbmVhcmVzdFNwb3Quc2l6ZS53aWR0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5lYXJlc3RCcmlja1RvRHJvcC50eXBlID0gVE9XLmRyb3BUeXBlcy5ob3Jpem9udGFsO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNlbnRlcllQb3NpdGlvbiA9IG5lYXJlc3RTcG90LnBvc2l0aW9uLnkgKyAobmVhcmVzdFNwb3Quc2l6ZS5oZWlnaHQgLyAyKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5lYXJlc3RCcmlja1RvRHJvcC5zaWRlID0gZS5tb3VzZVBvc2l0aW9uLmNsaWVudFkgPCBjZW50ZXJZUG9zaXRpb24gP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVE9XLmRyb3BTaWRlcy50b3AgOiBUT1cuZHJvcFNpZGVzLmJvdHRvbTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclBsYWNlaG9sZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmVhcmVzdEJyaWNrVG9Ecm9wID0gbnVsbDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxhY2Vob2xkZXJSZW5kZXJlci5jbGVhcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZWFyZXN0QnJpY2tUb0Ryb3AgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYWNlaG9sZGVyUmVuZGVyZXIuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25Nb3VzZURvd24oZTogTW91c2VFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNNb3VzZU92ZXJEcmFnZ2FibGVCb3goZS5jbGllbnRYLCBlLmNsaWVudFkpICYmIHRoaXMub3B0aW9ucy5zaG91bGRVbnNlbGVjdEJyaWNrKGUpKSB7XG4gICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkudWkudW5TZWxlY3RCcmlja3MoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uS2V5RG93bkhhbmRsZXIoZTogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBjb25zdCBzZWxlY3RlZEJyaWNrSWRzID0gdGhpcy53YWxsTW9kZWwuYXBpLnVpLmdldFNlbGVjdGVkQnJpY2tJZHMoKTtcbiAgICAgICAgY29uc3QgZmlyc3RTZWxlY3RlZEJyaWNrSWQgPSBzZWxlY3RlZEJyaWNrSWRzWzBdO1xuICAgICAgICBjb25zdCBsYXN0U2VsZWN0ZWRCcmlja0lkID0gc2VsZWN0ZWRCcmlja0lkc1tzZWxlY3RlZEJyaWNrSWRzLmxlbmd0aCAtIDFdO1xuXG4gICAgICAgIGlmIChlLmtleSA9PT0gJ0RlbGV0ZScgJiYgc2VsZWN0ZWRCcmlja0lkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy53YWxsTW9kZWwuYXBpLnVpLnVuU2VsZWN0QnJpY2tzKCk7XG5cbiAgICAgICAgICAgIHRoaXMud2FsbE1vZGVsLmFwaS51aS5yZW1vdmVCcmlja3Moc2VsZWN0ZWRCcmlja0lkcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicgJiYgc2VsZWN0ZWRCcmlja0lkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy53YWxsTW9kZWwuYXBpLnVpLmZvY3VzT25Ccmlja0lkKGZpcnN0U2VsZWN0ZWRCcmlja0lkKTtcblxuICAgICAgICAgICAgdGhpcy53YWxsTW9kZWwuYXBpLnVpLnVuU2VsZWN0QnJpY2tzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZS5rZXkgPT09ICdBcnJvd1VwJyAmJiBzZWxlY3RlZEJyaWNrSWRzLmxlbmd0aCkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c0JyaWNrSWQgPSB0aGlzLndhbGxNb2RlbC5hcGkuY29yZS5nZXRQcmV2aW91c0JyaWNrSWQobGFzdFNlbGVjdGVkQnJpY2tJZCk7XG5cbiAgICAgICAgICAgIGlmIChwcmV2aW91c0JyaWNrSWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZS5zaGlmdEtleSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRCcmlja0lkcy5sZW5ndGggPiAxICYmIHRoaXMuaXNEb3duU2VsZWN0aW9uRGlyZWN0aW9uKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2FsbE1vZGVsLmFwaS51aS5yZW1vdmVCcmlja0Zyb21TZWxlY3Rpb24obGFzdFNlbGVjdGVkQnJpY2tJZCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkudWkuYWRkQnJpY2tUb1NlbGVjdGlvbihwcmV2aW91c0JyaWNrSWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YWxsTW9kZWwuYXBpLnVpLnNlbGVjdEJyaWNrKHByZXZpb3VzQnJpY2tJZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGUua2V5ID09PSAnQXJyb3dEb3duJyAmJiBzZWxlY3RlZEJyaWNrSWRzLmxlbmd0aCkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBjb25zdCBuZXh0QnJpY2tJZCA9IHRoaXMud2FsbE1vZGVsLmFwaS5jb3JlLmdldE5leHRCcmlja0lkKGxhc3RTZWxlY3RlZEJyaWNrSWQpO1xuXG4gICAgICAgICAgICBpZiAobmV4dEJyaWNrSWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZS5zaGlmdEtleSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRCcmlja0lkcy5sZW5ndGggPiAxICYmICF0aGlzLmlzRG93blNlbGVjdGlvbkRpcmVjdGlvbigpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkudWkucmVtb3ZlQnJpY2tGcm9tU2VsZWN0aW9uKGxhc3RTZWxlY3RlZEJyaWNrSWQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53YWxsTW9kZWwuYXBpLnVpLmFkZEJyaWNrVG9TZWxlY3Rpb24obmV4dEJyaWNrSWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YWxsTW9kZWwuYXBpLnVpLnNlbGVjdEJyaWNrKG5leHRCcmlja0lkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGlmIChzZWxlY3RlZEJyaWNrSWRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMud2FsbE1vZGVsLmFwaS51aS51blNlbGVjdEJyaWNrcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25XYWxsUGx1Z2luRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kb2MucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vbk1vdXNlRG93bkJvdW5kKTtcbiAgICAgICAgdGhpcy5kb2MucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25LZXlEb3duSGFuZGxlckJvdW5kKTtcblxuICAgICAgICB0aGlzLndhbGxNb2RlbCA9IG51bGw7XG4gICAgICAgIHRoaXMucGlja091dFNlcnZpY2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy50b3dTZXJ2aWNlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc01vdXNlT3ZlckRyYWdnYWJsZUJveChjbGllbnRYOiBudW1iZXIsIGNsaWVudFk6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgY3VycmVudEVsZW1lbnQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGNsaWVudFgsIGNsaWVudFkpO1xuXG4gICAgICAgIHdoaWxlIChjdXJyZW50RWxlbWVudCAmJiAhY3VycmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCd3YWxsLWNhbnZhcy1icmlja19fZHJhZ2dhYmxlLWJveCcpKSB7XG4gICAgICAgICAgICBjdXJyZW50RWxlbWVudCA9IGN1cnJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gQm9vbGVhbihjdXJyZW50RWxlbWVudCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0Rvd25TZWxlY3Rpb25EaXJlY3Rpb24oKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkQnJpY2tJZHMgPSB0aGlzLndhbGxNb2RlbC5hcGkudWkuZ2V0U2VsZWN0ZWRCcmlja0lkcygpO1xuXG4gICAgICAgIGNvbnN0IGJyaWNrc0NvdW50ID0gc2VsZWN0ZWRCcmlja0lkcy5sZW5ndGg7XG5cbiAgICAgICAgY29uc3QgbGFzdEJyaWNrSWQgPSBzZWxlY3RlZEJyaWNrSWRzW2JyaWNrc0NvdW50IC0gMV07XG4gICAgICAgIGNvbnN0IHBlbnVsdGltYXRlQnJpY2tJZCA9IHNlbGVjdGVkQnJpY2tJZHNbYnJpY2tzQ291bnQgLSAyXTtcblxuICAgICAgICByZXR1cm4gdGhpcy53YWxsTW9kZWwuYXBpLmNvcmUuaXNCcmlja0FoZWFkT2YocGVudWx0aW1hdGVCcmlja0lkLCBsYXN0QnJpY2tJZCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW5kZXJQbGFjZWhvbGRlcigpIHtcbiAgICAgICAgbGV0IHBsYWNlaG9sZGVyWDtcbiAgICAgICAgbGV0IHBsYWNlaG9sZGVyWTtcbiAgICAgICAgbGV0IHBsYWNlaG9sZGVyU2l6ZTtcbiAgICAgICAgbGV0IHBsYWNlaG9sZGVySXNIb3Jpem9udGFsO1xuXG4gICAgICAgIGNvbnN0IHNwb3QgPSB0aGlzLm5lYXJlc3RCcmlja1RvRHJvcC5zcG90O1xuICAgICAgICBjb25zdCBzaWRlID0gdGhpcy5uZWFyZXN0QnJpY2tUb0Ryb3Auc2lkZTtcbiAgICAgICAgY29uc3QgdHlwZSA9IHRoaXMubmVhcmVzdEJyaWNrVG9Ecm9wLnR5cGU7XG5cbiAgICAgICAgaWYgKHR5cGUgPT09IFRPVy5kcm9wVHlwZXMuaG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgcGxhY2Vob2xkZXJYID0gc3BvdC5wb3NpdGlvbi54O1xuICAgICAgICAgICAgcGxhY2Vob2xkZXJTaXplID0gc3BvdC5zaXplLndpZHRoO1xuXG4gICAgICAgICAgICBpZiAoc2lkZSA9PT0gVE9XLmRyb3BTaWRlcy50b3ApIHtcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlclkgPSBzcG90LnBvc2l0aW9uLnkgLSB0aGlzLnBsYWNlaG9sZGVySGVpZ2h0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc2lkZSA9PT0gVE9XLmRyb3BTaWRlcy5ib3R0b20pIHtcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlclkgPSBzcG90LnBvc2l0aW9uLnkgKyBzcG90LnNpemUuaGVpZ2h0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwbGFjZWhvbGRlcklzSG9yaXpvbnRhbCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZSA9PT0gVE9XLmRyb3BUeXBlcy52ZXJ0aWNhbCkge1xuICAgICAgICAgICAgcGxhY2Vob2xkZXJZID0gc3BvdC5wb3NpdGlvbi55O1xuICAgICAgICAgICAgcGxhY2Vob2xkZXJTaXplID0gc3BvdC5zaXplLmhlaWdodDtcbiAgICAgICAgICAgIHBsYWNlaG9sZGVySXNIb3Jpem9udGFsID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGlmIChzaWRlID09PSBUT1cuZHJvcFNpZGVzLmxlZnQpIHtcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlclggPSBzcG90LnBvc2l0aW9uLng7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzaWRlID09PSBUT1cuZHJvcFNpZGVzLnJpZ2h0KSB7XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXJYID0gc3BvdC5wb3NpdGlvbi54ICsgc3BvdC5zaXplLndpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlclJlbmRlcmVyLnJlbmRlcihwbGFjZWhvbGRlclgsIHBsYWNlaG9sZGVyWSwgcGxhY2Vob2xkZXJTaXplLCBwbGFjZWhvbGRlcklzSG9yaXpvbnRhbCk7XG4gICAgfVxufVxuIl19