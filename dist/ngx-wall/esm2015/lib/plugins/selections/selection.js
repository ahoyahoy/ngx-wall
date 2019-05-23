/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class SelectionPlugin {
    /**
     * @param {?} injector
     * @param {?=} options
     */
    constructor(injector, options) {
        this.injector = injector;
        this.isMouseSelection = false;
        this.placeholderHeight = 2;
        this.isEnableDropZoneHighlight = false;
        // extension point for client to prevent brick un-selections
        this.options = Object.assign({ shouldUnselectBrick: (/**
             * @return {?}
             */
            () => true) }, options);
    }
    /**
     * @param {?} wallModel
     * @return {?}
     */
    onWallInitialize(wallModel) {
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
        (e) => {
            if (e instanceof StartPickOut) {
                this.isMouseSelection = true;
                this.wallModel.api.ui.disableMediaInteraction();
            }
            if (e instanceof PickOutItems) {
                this.wallModel.api.ui.selectBricks(e.ids);
            }
            if (e instanceof EndPickOut) {
                this.wallModel.api.ui.enableMediaInteraction();
            }
        }));
        // listen for draggable operation and move bricks accordingly
        this.towServiceSubscription = this.towService.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            if (e instanceof StartWorkingEvent) {
                if (this.wallModel.api.core.getBrickSnapshot(e.slaveId)) {
                    this.isEnableDropZoneHighlight = true;
                }
                else {
                    this.isEnableDropZoneHighlight = false;
                }
                this.nearestBrickToDrop = null;
                this.placeholderRenderer.clear();
            }
            if (e instanceof StopWorkingEvent && this.nearestBrickToDrop) {
                if (this.isEnableDropZoneHighlight) {
                    /** @type {?} */
                    let movedBrickIds = [];
                    /** @type {?} */
                    const selectedBrickIds = this.wallModel.api.ui.getSelectedBrickIds();
                    if (selectedBrickIds.length > 1) {
                        movedBrickIds = movedBrickIds.concat(selectedBrickIds);
                    }
                    else {
                        movedBrickIds.push(e.slaveId);
                    }
                    if (this.nearestBrickToDrop.type === TOW.dropTypes.horizontal) {
                        if (this.nearestBrickToDrop.side === TOW.dropSides.top) {
                            this.wallModel.api.core.moveBrickBeforeBrickId(movedBrickIds, this.nearestBrickToDrop.spot.data.brickId);
                        }
                        if (this.nearestBrickToDrop.side === TOW.dropSides.bottom) {
                            this.wallModel.api.core.moveBrickAfterBrickId(movedBrickIds, this.nearestBrickToDrop.spot.data.brickId);
                        }
                    }
                    if (this.nearestBrickToDrop.type === TOW.dropTypes.vertical) {
                        if (this.nearestBrickToDrop.side === TOW.dropSides.left) {
                            this.wallModel.api.core.moveBrickToNewColumn(movedBrickIds, this.nearestBrickToDrop.spot.data.brickId, TOW.dropSides.left);
                        }
                        if (this.nearestBrickToDrop.side === TOW.dropSides.right) {
                            this.wallModel.api.core.moveBrickToNewColumn(movedBrickIds, this.nearestBrickToDrop.spot.data.brickId, TOW.dropSides.right);
                        }
                    }
                    this.nearestBrickToDrop = null;
                    this.placeholderRenderer.clear();
                }
            }
            if (e instanceof WorkInProgressEvent) {
                if (this.isEnableDropZoneHighlight) {
                    /** @type {?} */
                    const spots = this.radar.filterSpots((/**
                     * @param {?} spot
                     * @return {?}
                     */
                    (spot) => spot.data.isBeacon));
                    /** @type {?} */
                    let nearestSpot;
                    spots.forEach((/**
                     * @param {?} spot
                     * @return {?}
                     */
                    (spot) => {
                        spot.updateInfo();
                        if (!nearestSpot) {
                            nearestSpot = spot;
                        }
                        else {
                            /** @type {?} */
                            const currentSpotMinimalDistance = spot.getMinimalDistanceToPoint(e.mousePosition.clientX, e.mousePosition.clientY);
                            /** @type {?} */
                            const nearestSpotMinimalDistance = nearestSpot.getMinimalDistanceToPoint(e.mousePosition.clientX, e.mousePosition.clientY);
                            if (currentSpotMinimalDistance < nearestSpotMinimalDistance) {
                                nearestSpot = spot;
                            }
                        }
                    }));
                    if (nearestSpot) {
                        /** @type {?} */
                        const nearestSpotMinimalDistance = nearestSpot.getMinimalDistanceToPoint(e.mousePosition.clientX, e.mousePosition.clientY);
                        if (nearestSpotMinimalDistance < 50) {
                            this.nearestBrickToDrop = {
                                spot: nearestSpot,
                                side: null,
                                type: null
                            };
                            if (e.mousePosition.clientX < nearestSpot.position.x) {
                                this.nearestBrickToDrop.type = TOW.dropTypes.vertical;
                                this.nearestBrickToDrop.side = TOW.dropSides.left;
                            }
                            if (e.mousePosition.clientX > nearestSpot.position.x + nearestSpot.size.width) {
                                this.nearestBrickToDrop.type = TOW.dropTypes.vertical;
                                this.nearestBrickToDrop.side = TOW.dropSides.right;
                            }
                            if (e.mousePosition.clientX > nearestSpot.position.x &&
                                e.mousePosition.clientX < nearestSpot.position.x + nearestSpot.size.width) {
                                this.nearestBrickToDrop.type = TOW.dropTypes.horizontal;
                                /** @type {?} */
                                const centerYPosition = nearestSpot.position.y + (nearestSpot.size.height / 2);
                                this.nearestBrickToDrop.side = e.mousePosition.clientY < centerYPosition ?
                                    TOW.dropSides.top : TOW.dropSides.bottom;
                            }
                            this.renderPlaceholder();
                        }
                        else {
                            this.nearestBrickToDrop = null;
                            this.placeholderRenderer.clear();
                        }
                    }
                    else {
                        this.nearestBrickToDrop = null;
                        this.placeholderRenderer.clear();
                    }
                }
            }
        }));
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onMouseDown(e) {
        if (!this.isMouseOverDraggableBox(e.clientX, e.clientY) && this.options.shouldUnselectBrick(e)) {
            this.wallModel.api.ui.unSelectBricks();
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onKeyDownHandler(e) {
        /** @type {?} */
        const selectedBrickIds = this.wallModel.api.ui.getSelectedBrickIds();
        /** @type {?} */
        const firstSelectedBrickId = selectedBrickIds[0];
        /** @type {?} */
        const lastSelectedBrickId = selectedBrickIds[selectedBrickIds.length - 1];
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
            const previousBrickId = this.wallModel.api.core.getPreviousBrickId(lastSelectedBrickId);
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
            const nextBrickId = this.wallModel.api.core.getNextBrickId(lastSelectedBrickId);
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
    }
    /**
     * @return {?}
     */
    onWallPluginDestroy() {
        this.doc.removeEventListener('mousedown', this.onMouseDownBound);
        this.doc.removeEventListener('keydown', this.onKeyDownHandlerBound);
        this.wallModel = null;
        this.pickOutServiceSubscription.unsubscribe();
        this.towServiceSubscription.unsubscribe();
    }
    /**
     * @private
     * @param {?} clientX
     * @param {?} clientY
     * @return {?}
     */
    isMouseOverDraggableBox(clientX, clientY) {
        /** @type {?} */
        let currentElement = document.elementFromPoint(clientX, clientY);
        while (currentElement && !currentElement.classList.contains('wall-canvas-brick__draggable-box')) {
            currentElement = currentElement.parentElement;
        }
        return Boolean(currentElement);
    }
    /**
     * @private
     * @return {?}
     */
    isDownSelectionDirection() {
        /** @type {?} */
        const selectedBrickIds = this.wallModel.api.ui.getSelectedBrickIds();
        /** @type {?} */
        const bricksCount = selectedBrickIds.length;
        /** @type {?} */
        const lastBrickId = selectedBrickIds[bricksCount - 1];
        /** @type {?} */
        const penultimateBrickId = selectedBrickIds[bricksCount - 2];
        return this.wallModel.api.core.isBrickAheadOf(penultimateBrickId, lastBrickId);
    }
    /**
     * @private
     * @return {?}
     */
    renderPlaceholder() {
        /** @type {?} */
        let placeholderX;
        /** @type {?} */
        let placeholderY;
        /** @type {?} */
        let placeholderSize;
        /** @type {?} */
        let placeholderIsHorizontal;
        /** @type {?} */
        const spot = this.nearestBrickToDrop.spot;
        /** @type {?} */
        const side = this.nearestBrickToDrop.side;
        /** @type {?} */
        const type = this.nearestBrickToDrop.type;
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
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvcGx1Z2lucy9zZWxlY3Rpb25zL3NlbGVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBR3pDLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUV4RCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFDdkUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLG9EQUFvRCxDQUFDO0FBQ2hGLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxvREFBb0QsQ0FBQztBQUNoRixPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sa0RBQWtELENBQUM7QUFHNUUsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQ3pELE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNuRCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSw2Q0FBNkMsQ0FBQztBQUM3RSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxpREFBaUQsQ0FBQztBQUNwRixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSw4Q0FBOEMsQ0FBQztBQUMvRSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSw0RUFBNEUsQ0FBQzs7OztBQUUvRyx1Q0FFQzs7O0lBREcsZ0RBQWdEOztBQUdwRCxNQUFNLE9BQU8sZUFBZTs7Ozs7SUE4QnhCLFlBQW9CLFFBQWtCLEVBQUUsT0FBMkI7UUFBL0MsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQXhCdEMscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBZ0JqQixzQkFBaUIsR0FBRyxDQUFDLENBQUM7UUFDdEIsOEJBQXlCLEdBQUcsS0FBSyxDQUFDO1FBUXRDLDREQUE0RDtRQUM1RCxJQUFJLENBQUMsT0FBTyxtQkFD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QUksQ0FBQztTQUNsQztRQUVELElBQUksSUFBSSxLQUFLLEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFO1lBQ2pDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMvQixlQUFlLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDbkMsdUJBQXVCLEdBQUcsS0FBSyxDQUFDO1lBRWhDLElBQUksSUFBSSxLQUFLLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFO2dCQUM3QixZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7YUFDbEM7WUFFRCxJQUFJLElBQUksS0FBSyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRTtnQkFDOUIsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2FBQ3BEO1NBQ0o7UUFFRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLHVCQUF1QixDQUFDLENBQUM7SUFDMUcsQ0FBQztDQUNKOzs7SUE3VkcsK0JBQWtCOztJQUNsQixrQ0FBaUI7O0lBRWpCLDhCQUFjOztJQUVkLDJDQUF5Qjs7SUFDekIsMkNBQXNCOztJQUN0QixnREFBMkI7O0lBRTNCLG9DQUFzQjs7Ozs7SUFFdEIseUNBQXVDOzs7OztJQUN2QyxnQ0FBcUI7Ozs7O0lBQ3JCLHFDQUErQjs7Ozs7SUFDL0IsOENBQWlEOzs7OztJQUVqRCw2Q0FJRTs7Ozs7SUFDRiw0Q0FBOEI7Ozs7O0lBQzlCLG9EQUEwQzs7Ozs7SUFFMUMsaURBQTZDOzs7OztJQUM3QyxxREFBaUQ7Ozs7O0lBRWpELGtDQUFtQzs7Ozs7SUFFdkIsbUNBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SW5qZWN0b3J9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtSYWRhcn0gZnJvbSAnLi4vLi4vbW9kdWxlcy9yYWRhci9yYWRhci5zZXJ2aWNlJztcbmltcG9ydCB7U3BvdE1vZGVsfSBmcm9tICcuLi8uLi9tb2R1bGVzL3JhZGFyL3Nwb3QubW9kZWwnO1xuaW1wb3J0IHtQaWNrT3V0U2VydmljZX0gZnJvbSAnLi4vLi4vbW9kdWxlcy9waWNrLW91dC9waWNrLW91dC5zZXJ2aWNlJztcbmltcG9ydCB7U3RhcnRQaWNrT3V0fSBmcm9tICcuLi8uLi9tb2R1bGVzL3BpY2stb3V0L2V2ZW50cy9zdGFydC1waWNrLW91dC5ldmVudCc7XG5pbXBvcnQge1BpY2tPdXRJdGVtc30gZnJvbSAnLi4vLi4vbW9kdWxlcy9waWNrLW91dC9ldmVudHMvcGljay1vdXQtaXRlbXMuZXZlbnQnO1xuaW1wb3J0IHtFbmRQaWNrT3V0fSBmcm9tICcuLi8uLi9tb2R1bGVzL3BpY2stb3V0L2V2ZW50cy9lbmQtcGljay1vdXQuZXZlbnQnO1xuaW1wb3J0IHtJV2FsbFBsdWdpbn0gZnJvbSAnLi4vLi4vd2FsbC9tb2RlbC9pbnRlcmZhY2VzL3dhbGwtcGx1Z2luLmludGVyZmFjZSc7XG5pbXBvcnQge0lXYWxsTW9kZWx9IGZyb20gJy4uLy4uL3dhbGwvbW9kZWwvaW50ZXJmYWNlcy93YWxsLW1vZGVsLmludGVyZmFjZSc7XG5pbXBvcnQge1Rvd1NlcnZpY2V9IGZyb20gJy4uLy4uL21vZHVsZXMvdG93L3Rvdy5zZXJ2aWNlJztcbmltcG9ydCB7VE9XfSBmcm9tICcuLi8uLi9tb2R1bGVzL3Rvdy90b3cuY29uc3RhbnQnO1xuaW1wb3J0IHtTdG9wV29ya2luZ0V2ZW50fSBmcm9tICcuLi8uLi9tb2R1bGVzL3Rvdy9ldmVudHMvc3RvcC13b3JraW5nLmV2ZW50JztcbmltcG9ydCB7V29ya0luUHJvZ3Jlc3NFdmVudH0gZnJvbSAnLi4vLi4vbW9kdWxlcy90b3cvZXZlbnRzL3dvcmstaW4tcHJvZ3Jlc3MuZXZlbnQnO1xuaW1wb3J0IHtTdGFydFdvcmtpbmdFdmVudH0gZnJvbSAnLi4vLi4vbW9kdWxlcy90b3cvZXZlbnRzL3N0YXJ0LXdvcmtpbmcuZXZlbnQnO1xuaW1wb3J0IHtQbGFjZWhvbGRlclJlbmRlcmVyfSBmcm9tICcuLi8uLi9tb2R1bGVzL2NvbXBvbmVudHMvcGxhY2Vob2xkZXItcmVuZGVyZXIvcGxhY2Vob2xkZXItcmVuZGVyZXIuc2VydmljZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNlbGVjdGlvbk9wdGlvbnMge1xuICAgIHNob3VsZFVuc2VsZWN0QnJpY2s6IChlOiBNb3VzZUV2ZW50KSA9PiBib29sZWFuO1xufVxuXG5leHBvcnQgY2xhc3MgU2VsZWN0aW9uUGx1Z2luIGltcGxlbWVudHMgSVdhbGxQbHVnaW4ge1xuICAgIG5hbWU6ICdzZWxlY3Rpb24nO1xuICAgIHZlcnNpb246ICcwLjAuMCc7XG5cbiAgICBkb2M6IERvY3VtZW50O1xuXG4gICAgaXNNb3VzZVNlbGVjdGlvbiA9IGZhbHNlO1xuICAgIG9uTW91c2VEb3duQm91bmQ6IGFueTtcbiAgICBvbktleURvd25IYW5kbGVyQm91bmQ6IGFueTtcblxuICAgIHdhbGxNb2RlbDogSVdhbGxNb2RlbDtcblxuICAgIHByaXZhdGUgcGlja091dFNlcnZpY2U6IFBpY2tPdXRTZXJ2aWNlO1xuICAgIHByaXZhdGUgcmFkYXI6IFJhZGFyO1xuICAgIHByaXZhdGUgdG93U2VydmljZTogVG93U2VydmljZTtcbiAgICBwcml2YXRlIHBsYWNlaG9sZGVyUmVuZGVyZXI6IFBsYWNlaG9sZGVyUmVuZGVyZXI7XG5cbiAgICBwcml2YXRlIG5lYXJlc3RCcmlja1RvRHJvcDoge1xuICAgICAgICBzcG90OiBTcG90TW9kZWw7XG4gICAgICAgIHR5cGU6IHN0cmluZztcbiAgICAgICAgc2lkZTogc3RyaW5nO1xuICAgIH07XG4gICAgcHJpdmF0ZSBwbGFjZWhvbGRlckhlaWdodCA9IDI7XG4gICAgcHJpdmF0ZSBpc0VuYWJsZURyb3Bab25lSGlnaGxpZ2h0ID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIHRvd1NlcnZpY2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICBwcml2YXRlIHBpY2tPdXRTZXJ2aWNlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBwcml2YXRlIG9wdGlvbnM6IElTZWxlY3Rpb25PcHRpb25zO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsIG9wdGlvbnM/OiBJU2VsZWN0aW9uT3B0aW9ucykge1xuICAgICAgICAvLyBleHRlbnNpb24gcG9pbnQgZm9yIGNsaWVudCB0byBwcmV2ZW50IGJyaWNrIHVuLXNlbGVjdGlvbnNcbiAgICAgICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgICAgICAgc2hvdWxkVW5zZWxlY3RCcmljazogKCkgPT4gdHJ1ZSxcbiAgICAgICAgICAgIC4uLm9wdGlvbnNcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBvbldhbGxJbml0aWFsaXplKHdhbGxNb2RlbDogSVdhbGxNb2RlbCkge1xuICAgICAgICB0aGlzLndhbGxNb2RlbCA9IHdhbGxNb2RlbDtcblxuICAgICAgICB0aGlzLmRvYyA9IHRoaXMuaW5qZWN0b3IuZ2V0KERPQ1VNRU5UKTtcbiAgICAgICAgdGhpcy5waWNrT3V0U2VydmljZSA9IHRoaXMuaW5qZWN0b3IuZ2V0KFBpY2tPdXRTZXJ2aWNlKTtcbiAgICAgICAgdGhpcy5yYWRhciA9IHRoaXMuaW5qZWN0b3IuZ2V0KFJhZGFyKTtcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlclJlbmRlcmVyID0gdGhpcy5pbmplY3Rvci5nZXQoUGxhY2Vob2xkZXJSZW5kZXJlcik7XG4gICAgICAgIHRoaXMudG93U2VydmljZSA9IHRoaXMuaW5qZWN0b3IuZ2V0KFRvd1NlcnZpY2UpO1xuXG4gICAgICAgIHRoaXMub25Nb3VzZURvd25Cb3VuZCA9IHRoaXMub25Nb3VzZURvd24uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vbktleURvd25IYW5kbGVyQm91bmQgPSB0aGlzLm9uS2V5RG93bkhhbmRsZXIuYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLmRvYy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2VEb3duQm91bmQpO1xuICAgICAgICB0aGlzLmRvYy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd25IYW5kbGVyQm91bmQpO1xuXG4gICAgICAgIC8vIGxpc3RlbiB0byBwaWNrZWQgb3V0IGl0ZW1zIGFuZCBzZWxlY3QgYXBwcm9wcmlhdGUgYnJpY2tzXG4gICAgICAgIHRoaXMucGlja091dFNlcnZpY2VTdWJzY3JpcHRpb24gPSB0aGlzLnBpY2tPdXRTZXJ2aWNlLnN1YnNjcmliZSgoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBTdGFydFBpY2tPdXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzTW91c2VTZWxlY3Rpb24gPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgdGhpcy53YWxsTW9kZWwuYXBpLnVpLmRpc2FibGVNZWRpYUludGVyYWN0aW9uKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChlIGluc3RhbmNlb2YgUGlja091dEl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53YWxsTW9kZWwuYXBpLnVpLnNlbGVjdEJyaWNrcyhlLmlkcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChlIGluc3RhbmNlb2YgRW5kUGlja091dCkge1xuICAgICAgICAgICAgICAgIHRoaXMud2FsbE1vZGVsLmFwaS51aS5lbmFibGVNZWRpYUludGVyYWN0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGxpc3RlbiBmb3IgZHJhZ2dhYmxlIG9wZXJhdGlvbiBhbmQgbW92ZSBicmlja3MgYWNjb3JkaW5nbHlcbiAgICAgICAgdGhpcy50b3dTZXJ2aWNlU3Vic2NyaXB0aW9uID0gdGhpcy50b3dTZXJ2aWNlLnN1YnNjcmliZSgoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBTdGFydFdvcmtpbmdFdmVudCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLndhbGxNb2RlbC5hcGkuY29yZS5nZXRCcmlja1NuYXBzaG90KGUuc2xhdmVJZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0VuYWJsZURyb3Bab25lSGlnaGxpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzRW5hYmxlRHJvcFpvbmVIaWdobGlnaHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLm5lYXJlc3RCcmlja1RvRHJvcCA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGFjZWhvbGRlclJlbmRlcmVyLmNsZWFyKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChlIGluc3RhbmNlb2YgU3RvcFdvcmtpbmdFdmVudCAmJiB0aGlzLm5lYXJlc3RCcmlja1RvRHJvcCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzRW5hYmxlRHJvcFpvbmVIaWdobGlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmVkQnJpY2tJZHMgPSBbXTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZEJyaWNrSWRzID0gdGhpcy53YWxsTW9kZWwuYXBpLnVpLmdldFNlbGVjdGVkQnJpY2tJZHMoKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRCcmlja0lkcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb3ZlZEJyaWNrSWRzID0gbW92ZWRCcmlja0lkcy5jb25jYXQoc2VsZWN0ZWRCcmlja0lkcyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb3ZlZEJyaWNrSWRzLnB1c2goZS5zbGF2ZUlkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm5lYXJlc3RCcmlja1RvRHJvcC50eXBlID09PSBUT1cuZHJvcFR5cGVzLmhvcml6b250YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm5lYXJlc3RCcmlja1RvRHJvcC5zaWRlID09PSBUT1cuZHJvcFNpZGVzLnRvcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2FsbE1vZGVsLmFwaS5jb3JlLm1vdmVCcmlja0JlZm9yZUJyaWNrSWQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVkQnJpY2tJZHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmVhcmVzdEJyaWNrVG9Ecm9wLnNwb3QuZGF0YS5icmlja0lkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubmVhcmVzdEJyaWNrVG9Ecm9wLnNpZGUgPT09IFRPVy5kcm9wU2lkZXMuYm90dG9tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53YWxsTW9kZWwuYXBpLmNvcmUubW92ZUJyaWNrQWZ0ZXJCcmlja0lkKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3ZlZEJyaWNrSWRzLCB0aGlzLm5lYXJlc3RCcmlja1RvRHJvcC5zcG90LmRhdGEuYnJpY2tJZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5uZWFyZXN0QnJpY2tUb0Ryb3AudHlwZSA9PT0gVE9XLmRyb3BUeXBlcy52ZXJ0aWNhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubmVhcmVzdEJyaWNrVG9Ecm9wLnNpZGUgPT09IFRPVy5kcm9wU2lkZXMubGVmdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2FsbE1vZGVsLmFwaS5jb3JlLm1vdmVCcmlja1RvTmV3Q29sdW1uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3ZlZEJyaWNrSWRzLCB0aGlzLm5lYXJlc3RCcmlja1RvRHJvcC5zcG90LmRhdGEuYnJpY2tJZCwgVE9XLmRyb3BTaWRlcy5sZWZ0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubmVhcmVzdEJyaWNrVG9Ecm9wLnNpZGUgPT09IFRPVy5kcm9wU2lkZXMucmlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkuY29yZS5tb3ZlQnJpY2tUb05ld0NvbHVtbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW92ZWRCcmlja0lkcywgdGhpcy5uZWFyZXN0QnJpY2tUb0Ryb3Auc3BvdC5kYXRhLmJyaWNrSWQsIFRPVy5kcm9wU2lkZXMucmlnaHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZWFyZXN0QnJpY2tUb0Ryb3AgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxhY2Vob2xkZXJSZW5kZXJlci5jbGVhcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBXb3JrSW5Qcm9ncmVzc0V2ZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVEcm9wWm9uZUhpZ2hsaWdodCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzcG90cyA9IHRoaXMucmFkYXIuZmlsdGVyU3BvdHMoKHNwb3Q6IFNwb3RNb2RlbCkgPT4gc3BvdC5kYXRhLmlzQmVhY29uKTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgbmVhcmVzdFNwb3Q6IFNwb3RNb2RlbDtcblxuICAgICAgICAgICAgICAgICAgICBzcG90cy5mb3JFYWNoKChzcG90KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcG90LnVwZGF0ZUluZm8oKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFuZWFyZXN0U3BvdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lYXJlc3RTcG90ID0gc3BvdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFNwb3RNaW5pbWFsRGlzdGFuY2UgPSBzcG90LmdldE1pbmltYWxEaXN0YW5jZVRvUG9pbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUubW91c2VQb3NpdGlvbi5jbGllbnRYLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLm1vdXNlUG9zaXRpb24uY2xpZW50WVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZWFyZXN0U3BvdE1pbmltYWxEaXN0YW5jZSA9IG5lYXJlc3RTcG90LmdldE1pbmltYWxEaXN0YW5jZVRvUG9pbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUubW91c2VQb3NpdGlvbi5jbGllbnRYLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLm1vdXNlUG9zaXRpb24uY2xpZW50WVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFNwb3RNaW5pbWFsRGlzdGFuY2UgPCBuZWFyZXN0U3BvdE1pbmltYWxEaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWFyZXN0U3BvdCA9IHNwb3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobmVhcmVzdFNwb3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5lYXJlc3RTcG90TWluaW1hbERpc3RhbmNlID0gbmVhcmVzdFNwb3QuZ2V0TWluaW1hbERpc3RhbmNlVG9Qb2ludChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLm1vdXNlUG9zaXRpb24uY2xpZW50WCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLm1vdXNlUG9zaXRpb24uY2xpZW50WVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5lYXJlc3RTcG90TWluaW1hbERpc3RhbmNlIDwgNTApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5lYXJlc3RCcmlja1RvRHJvcCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdDogbmVhcmVzdFNwb3QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZGU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUubW91c2VQb3NpdGlvbi5jbGllbnRYIDwgbmVhcmVzdFNwb3QucG9zaXRpb24ueCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5lYXJlc3RCcmlja1RvRHJvcC50eXBlID0gVE9XLmRyb3BUeXBlcy52ZXJ0aWNhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZWFyZXN0QnJpY2tUb0Ryb3Auc2lkZSA9IFRPVy5kcm9wU2lkZXMubGVmdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5tb3VzZVBvc2l0aW9uLmNsaWVudFggPiBuZWFyZXN0U3BvdC5wb3NpdGlvbi54ICsgbmVhcmVzdFNwb3Quc2l6ZS53aWR0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5lYXJlc3RCcmlja1RvRHJvcC50eXBlID0gVE9XLmRyb3BUeXBlcy52ZXJ0aWNhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZWFyZXN0QnJpY2tUb0Ryb3Auc2lkZSA9IFRPVy5kcm9wU2lkZXMucmlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUubW91c2VQb3NpdGlvbi5jbGllbnRYID4gbmVhcmVzdFNwb3QucG9zaXRpb24ueCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLm1vdXNlUG9zaXRpb24uY2xpZW50WCA8IG5lYXJlc3RTcG90LnBvc2l0aW9uLnggKyBuZWFyZXN0U3BvdC5zaXplLndpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmVhcmVzdEJyaWNrVG9Ecm9wLnR5cGUgPSBUT1cuZHJvcFR5cGVzLmhvcml6b250YWw7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2VudGVyWVBvc2l0aW9uID0gbmVhcmVzdFNwb3QucG9zaXRpb24ueSArIChuZWFyZXN0U3BvdC5zaXplLmhlaWdodCAvIDIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmVhcmVzdEJyaWNrVG9Ecm9wLnNpZGUgPSBlLm1vdXNlUG9zaXRpb24uY2xpZW50WSA8IGNlbnRlcllQb3NpdGlvbiA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUT1cuZHJvcFNpZGVzLnRvcCA6IFRPVy5kcm9wU2lkZXMuYm90dG9tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyUGxhY2Vob2xkZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZWFyZXN0QnJpY2tUb0Ryb3AgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFjZWhvbGRlclJlbmRlcmVyLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5lYXJlc3RCcmlja1RvRHJvcCA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxhY2Vob2xkZXJSZW5kZXJlci5jbGVhcigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbk1vdXNlRG93bihlOiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5pc01vdXNlT3ZlckRyYWdnYWJsZUJveChlLmNsaWVudFgsIGUuY2xpZW50WSkgJiYgdGhpcy5vcHRpb25zLnNob3VsZFVuc2VsZWN0QnJpY2soZSkpIHtcbiAgICAgICAgICAgIHRoaXMud2FsbE1vZGVsLmFwaS51aS51blNlbGVjdEJyaWNrcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25LZXlEb3duSGFuZGxlcihlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkQnJpY2tJZHMgPSB0aGlzLndhbGxNb2RlbC5hcGkudWkuZ2V0U2VsZWN0ZWRCcmlja0lkcygpO1xuICAgICAgICBjb25zdCBmaXJzdFNlbGVjdGVkQnJpY2tJZCA9IHNlbGVjdGVkQnJpY2tJZHNbMF07XG4gICAgICAgIGNvbnN0IGxhc3RTZWxlY3RlZEJyaWNrSWQgPSBzZWxlY3RlZEJyaWNrSWRzW3NlbGVjdGVkQnJpY2tJZHMubGVuZ3RoIC0gMV07XG5cbiAgICAgICAgaWYgKGUua2V5ID09PSAnRGVsZXRlJyAmJiBzZWxlY3RlZEJyaWNrSWRzLmxlbmd0aCkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkudWkudW5TZWxlY3RCcmlja3MoKTtcblxuICAgICAgICAgICAgdGhpcy53YWxsTW9kZWwuYXBpLnVpLnJlbW92ZUJyaWNrcyhzZWxlY3RlZEJyaWNrSWRzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJyAmJiBzZWxlY3RlZEJyaWNrSWRzLmxlbmd0aCkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkudWkuZm9jdXNPbkJyaWNrSWQoZmlyc3RTZWxlY3RlZEJyaWNrSWQpO1xuXG4gICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkudWkudW5TZWxlY3RCcmlja3MoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlLmtleSA9PT0gJ0Fycm93VXAnICYmIHNlbGVjdGVkQnJpY2tJZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzQnJpY2tJZCA9IHRoaXMud2FsbE1vZGVsLmFwaS5jb3JlLmdldFByZXZpb3VzQnJpY2tJZChsYXN0U2VsZWN0ZWRCcmlja0lkKTtcblxuICAgICAgICAgICAgaWYgKHByZXZpb3VzQnJpY2tJZCkge1xuICAgICAgICAgICAgICAgIGlmIChlLnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEJyaWNrSWRzLmxlbmd0aCA+IDEgJiYgdGhpcy5pc0Rvd25TZWxlY3Rpb25EaXJlY3Rpb24oKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53YWxsTW9kZWwuYXBpLnVpLnJlbW92ZUJyaWNrRnJvbVNlbGVjdGlvbihsYXN0U2VsZWN0ZWRCcmlja0lkKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2FsbE1vZGVsLmFwaS51aS5hZGRCcmlja1RvU2VsZWN0aW9uKHByZXZpb3VzQnJpY2tJZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkudWkuc2VsZWN0QnJpY2socHJldmlvdXNCcmlja0lkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZS5rZXkgPT09ICdBcnJvd0Rvd24nICYmIHNlbGVjdGVkQnJpY2tJZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGNvbnN0IG5leHRCcmlja0lkID0gdGhpcy53YWxsTW9kZWwuYXBpLmNvcmUuZ2V0TmV4dEJyaWNrSWQobGFzdFNlbGVjdGVkQnJpY2tJZCk7XG5cbiAgICAgICAgICAgIGlmIChuZXh0QnJpY2tJZCkge1xuICAgICAgICAgICAgICAgIGlmIChlLnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEJyaWNrSWRzLmxlbmd0aCA+IDEgJiYgIXRoaXMuaXNEb3duU2VsZWN0aW9uRGlyZWN0aW9uKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2FsbE1vZGVsLmFwaS51aS5yZW1vdmVCcmlja0Zyb21TZWxlY3Rpb24obGFzdFNlbGVjdGVkQnJpY2tJZCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkudWkuYWRkQnJpY2tUb1NlbGVjdGlvbihuZXh0QnJpY2tJZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkudWkuc2VsZWN0QnJpY2sobmV4dEJyaWNrSWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkQnJpY2tJZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53YWxsTW9kZWwuYXBpLnVpLnVuU2VsZWN0QnJpY2tzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbldhbGxQbHVnaW5EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRvYy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2VEb3duQm91bmQpO1xuICAgICAgICB0aGlzLmRvYy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd25IYW5kbGVyQm91bmQpO1xuXG4gICAgICAgIHRoaXMud2FsbE1vZGVsID0gbnVsbDtcbiAgICAgICAgdGhpcy5waWNrT3V0U2VydmljZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLnRvd1NlcnZpY2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzTW91c2VPdmVyRHJhZ2dhYmxlQm94KGNsaWVudFg6IG51bWJlciwgY2xpZW50WTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBjdXJyZW50RWxlbWVudCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoY2xpZW50WCwgY2xpZW50WSk7XG5cbiAgICAgICAgd2hpbGUgKGN1cnJlbnRFbGVtZW50ICYmICFjdXJyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ3dhbGwtY2FudmFzLWJyaWNrX19kcmFnZ2FibGUtYm94JykpIHtcbiAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50ID0gY3VycmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBCb29sZWFuKGN1cnJlbnRFbGVtZW50KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzRG93blNlbGVjdGlvbkRpcmVjdGlvbigpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRCcmlja0lkcyA9IHRoaXMud2FsbE1vZGVsLmFwaS51aS5nZXRTZWxlY3RlZEJyaWNrSWRzKCk7XG5cbiAgICAgICAgY29uc3QgYnJpY2tzQ291bnQgPSBzZWxlY3RlZEJyaWNrSWRzLmxlbmd0aDtcblxuICAgICAgICBjb25zdCBsYXN0QnJpY2tJZCA9IHNlbGVjdGVkQnJpY2tJZHNbYnJpY2tzQ291bnQgLSAxXTtcbiAgICAgICAgY29uc3QgcGVudWx0aW1hdGVCcmlja0lkID0gc2VsZWN0ZWRCcmlja0lkc1ticmlja3NDb3VudCAtIDJdO1xuXG4gICAgICAgIHJldHVybiB0aGlzLndhbGxNb2RlbC5hcGkuY29yZS5pc0JyaWNrQWhlYWRPZihwZW51bHRpbWF0ZUJyaWNrSWQsIGxhc3RCcmlja0lkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbmRlclBsYWNlaG9sZGVyKCkge1xuICAgICAgICBsZXQgcGxhY2Vob2xkZXJYO1xuICAgICAgICBsZXQgcGxhY2Vob2xkZXJZO1xuICAgICAgICBsZXQgcGxhY2Vob2xkZXJTaXplO1xuICAgICAgICBsZXQgcGxhY2Vob2xkZXJJc0hvcml6b250YWw7XG5cbiAgICAgICAgY29uc3Qgc3BvdCA9IHRoaXMubmVhcmVzdEJyaWNrVG9Ecm9wLnNwb3Q7XG4gICAgICAgIGNvbnN0IHNpZGUgPSB0aGlzLm5lYXJlc3RCcmlja1RvRHJvcC5zaWRlO1xuICAgICAgICBjb25zdCB0eXBlID0gdGhpcy5uZWFyZXN0QnJpY2tUb0Ryb3AudHlwZTtcblxuICAgICAgICBpZiAodHlwZSA9PT0gVE9XLmRyb3BUeXBlcy5ob3Jpem9udGFsKSB7XG4gICAgICAgICAgICBwbGFjZWhvbGRlclggPSBzcG90LnBvc2l0aW9uLng7XG4gICAgICAgICAgICBwbGFjZWhvbGRlclNpemUgPSBzcG90LnNpemUud2lkdGg7XG5cbiAgICAgICAgICAgIGlmIChzaWRlID09PSBUT1cuZHJvcFNpZGVzLnRvcCkge1xuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyWSA9IHNwb3QucG9zaXRpb24ueSAtIHRoaXMucGxhY2Vob2xkZXJIZWlnaHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzaWRlID09PSBUT1cuZHJvcFNpZGVzLmJvdHRvbSkge1xuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyWSA9IHNwb3QucG9zaXRpb24ueSArIHNwb3Quc2l6ZS5oZWlnaHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBsYWNlaG9sZGVySXNIb3Jpem9udGFsID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlID09PSBUT1cuZHJvcFR5cGVzLnZlcnRpY2FsKSB7XG4gICAgICAgICAgICBwbGFjZWhvbGRlclkgPSBzcG90LnBvc2l0aW9uLnk7XG4gICAgICAgICAgICBwbGFjZWhvbGRlclNpemUgPSBzcG90LnNpemUuaGVpZ2h0O1xuICAgICAgICAgICAgcGxhY2Vob2xkZXJJc0hvcml6b250YWwgPSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKHNpZGUgPT09IFRPVy5kcm9wU2lkZXMubGVmdCkge1xuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyWCA9IHNwb3QucG9zaXRpb24ueDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHNpZGUgPT09IFRPVy5kcm9wU2lkZXMucmlnaHQpIHtcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlclggPSBzcG90LnBvc2l0aW9uLnggKyBzcG90LnNpemUud2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyUmVuZGVyZXIucmVuZGVyKHBsYWNlaG9sZGVyWCwgcGxhY2Vob2xkZXJZLCBwbGFjZWhvbGRlclNpemUsIHBsYWNlaG9sZGVySXNIb3Jpem9udGFsKTtcbiAgICB9XG59XG4iXX0=