/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this.options = Object.assign({ shouldUnselectBrick: () => true }, options);
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
        this.pickOutServiceSubscription = this.pickOutService.subscribe((e) => {
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
        });
        // listen for draggable operation and move bricks accordingly
        this.towServiceSubscription = this.towService.subscribe((e) => {
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
                    const spots = this.radar.filterSpots((spot) => spot.data.isBeacon);
                    /** @type {?} */
                    let nearestSpot;
                    spots.forEach((spot) => {
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
                    });
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
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvcGx1Z2lucy9zZWxlY3Rpb25zL3NlbGVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBR3pDLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUV4RCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFDdkUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLG9EQUFvRCxDQUFDO0FBQ2hGLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxvREFBb0QsQ0FBQztBQUNoRixPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sa0RBQWtELENBQUM7QUFHNUUsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQ3pELE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNuRCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSw2Q0FBNkMsQ0FBQztBQUM3RSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxpREFBaUQsQ0FBQztBQUNwRixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSw4Q0FBOEMsQ0FBQztBQUMvRSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSw0RUFBNEUsQ0FBQzs7OztBQUUvRyx1Q0FFQzs7O0lBREcsZ0RBQWdEOztBQUdwRCxNQUFNLE9BQU8sZUFBZTs7Ozs7SUE4QnhCLFlBQW9CLFFBQWtCLEVBQUUsT0FBMkI7UUFBL0MsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQXhCdEMscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBZ0JqQixzQkFBaUIsR0FBRyxDQUFDLENBQUM7UUFDdEIsOEJBQXlCLEdBQUcsS0FBSyxDQUFDO1FBUXRDLDREQUE0RDtRQUM1RCxJQUFJLENBQUMsT0FBTyxtQkFD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RUQsSUFBSSxJQUFJLEtBQUssR0FBRyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUU7WUFDakMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQy9CLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUNuQyx1QkFBdUIsR0FBRyxLQUFLLENBQUM7WUFFaEMsSUFBSSxJQUFJLEtBQUssR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUU7Z0JBQzdCLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzthQUNsQztZQUVELElBQUksSUFBSSxLQUFLLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFO2dCQUM5QixZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7YUFDcEQ7U0FDSjtRQUVELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztJQUMxRyxDQUFDO0NBQ0o7OztJQTdWRywrQkFBa0I7O0lBQ2xCLGtDQUFpQjs7SUFFakIsOEJBQWM7O0lBRWQsMkNBQXlCOztJQUN6QiwyQ0FBc0I7O0lBQ3RCLGdEQUEyQjs7SUFFM0Isb0NBQXNCOzs7OztJQUV0Qix5Q0FBdUM7Ozs7O0lBQ3ZDLGdDQUFxQjs7Ozs7SUFDckIscUNBQStCOzs7OztJQUMvQiw4Q0FBaUQ7Ozs7O0lBRWpELDZDQUlFOzs7OztJQUNGLDRDQUE4Qjs7Ozs7SUFDOUIsb0RBQTBDOzs7OztJQUUxQyxpREFBNkM7Ozs7O0lBQzdDLHFEQUFpRDs7Ozs7SUFFakQsa0NBQW1DOzs7OztJQUV2QixtQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbmplY3Rvcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1JhZGFyfSBmcm9tICcuLi8uLi9tb2R1bGVzL3JhZGFyL3JhZGFyLnNlcnZpY2UnO1xuaW1wb3J0IHtTcG90TW9kZWx9IGZyb20gJy4uLy4uL21vZHVsZXMvcmFkYXIvc3BvdC5tb2RlbCc7XG5pbXBvcnQge1BpY2tPdXRTZXJ2aWNlfSBmcm9tICcuLi8uLi9tb2R1bGVzL3BpY2stb3V0L3BpY2stb3V0LnNlcnZpY2UnO1xuaW1wb3J0IHtTdGFydFBpY2tPdXR9IGZyb20gJy4uLy4uL21vZHVsZXMvcGljay1vdXQvZXZlbnRzL3N0YXJ0LXBpY2stb3V0LmV2ZW50JztcbmltcG9ydCB7UGlja091dEl0ZW1zfSBmcm9tICcuLi8uLi9tb2R1bGVzL3BpY2stb3V0L2V2ZW50cy9waWNrLW91dC1pdGVtcy5ldmVudCc7XG5pbXBvcnQge0VuZFBpY2tPdXR9IGZyb20gJy4uLy4uL21vZHVsZXMvcGljay1vdXQvZXZlbnRzL2VuZC1waWNrLW91dC5ldmVudCc7XG5pbXBvcnQge0lXYWxsUGx1Z2lufSBmcm9tICcuLi8uLi93YWxsL21vZGVsL2ludGVyZmFjZXMvd2FsbC1wbHVnaW4uaW50ZXJmYWNlJztcbmltcG9ydCB7SVdhbGxNb2RlbH0gZnJvbSAnLi4vLi4vd2FsbC9tb2RlbC9pbnRlcmZhY2VzL3dhbGwtbW9kZWwuaW50ZXJmYWNlJztcbmltcG9ydCB7VG93U2VydmljZX0gZnJvbSAnLi4vLi4vbW9kdWxlcy90b3cvdG93LnNlcnZpY2UnO1xuaW1wb3J0IHtUT1d9IGZyb20gJy4uLy4uL21vZHVsZXMvdG93L3Rvdy5jb25zdGFudCc7XG5pbXBvcnQge1N0b3BXb3JraW5nRXZlbnR9IGZyb20gJy4uLy4uL21vZHVsZXMvdG93L2V2ZW50cy9zdG9wLXdvcmtpbmcuZXZlbnQnO1xuaW1wb3J0IHtXb3JrSW5Qcm9ncmVzc0V2ZW50fSBmcm9tICcuLi8uLi9tb2R1bGVzL3Rvdy9ldmVudHMvd29yay1pbi1wcm9ncmVzcy5ldmVudCc7XG5pbXBvcnQge1N0YXJ0V29ya2luZ0V2ZW50fSBmcm9tICcuLi8uLi9tb2R1bGVzL3Rvdy9ldmVudHMvc3RhcnQtd29ya2luZy5ldmVudCc7XG5pbXBvcnQge1BsYWNlaG9sZGVyUmVuZGVyZXJ9IGZyb20gJy4uLy4uL21vZHVsZXMvY29tcG9uZW50cy9wbGFjZWhvbGRlci1yZW5kZXJlci9wbGFjZWhvbGRlci1yZW5kZXJlci5zZXJ2aWNlJztcblxuZXhwb3J0IGludGVyZmFjZSBJU2VsZWN0aW9uT3B0aW9ucyB7XG4gICAgc2hvdWxkVW5zZWxlY3RCcmljazogKGU6IE1vdXNlRXZlbnQpID0+IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBTZWxlY3Rpb25QbHVnaW4gaW1wbGVtZW50cyBJV2FsbFBsdWdpbiB7XG4gICAgbmFtZTogJ3NlbGVjdGlvbic7XG4gICAgdmVyc2lvbjogJzAuMC4wJztcblxuICAgIGRvYzogRG9jdW1lbnQ7XG5cbiAgICBpc01vdXNlU2VsZWN0aW9uID0gZmFsc2U7XG4gICAgb25Nb3VzZURvd25Cb3VuZDogYW55O1xuICAgIG9uS2V5RG93bkhhbmRsZXJCb3VuZDogYW55O1xuXG4gICAgd2FsbE1vZGVsOiBJV2FsbE1vZGVsO1xuXG4gICAgcHJpdmF0ZSBwaWNrT3V0U2VydmljZTogUGlja091dFNlcnZpY2U7XG4gICAgcHJpdmF0ZSByYWRhcjogUmFkYXI7XG4gICAgcHJpdmF0ZSB0b3dTZXJ2aWNlOiBUb3dTZXJ2aWNlO1xuICAgIHByaXZhdGUgcGxhY2Vob2xkZXJSZW5kZXJlcjogUGxhY2Vob2xkZXJSZW5kZXJlcjtcblxuICAgIHByaXZhdGUgbmVhcmVzdEJyaWNrVG9Ecm9wOiB7XG4gICAgICAgIHNwb3Q6IFNwb3RNb2RlbDtcbiAgICAgICAgdHlwZTogc3RyaW5nO1xuICAgICAgICBzaWRlOiBzdHJpbmc7XG4gICAgfTtcbiAgICBwcml2YXRlIHBsYWNlaG9sZGVySGVpZ2h0ID0gMjtcbiAgICBwcml2YXRlIGlzRW5hYmxlRHJvcFpvbmVIaWdobGlnaHQgPSBmYWxzZTtcblxuICAgIHByaXZhdGUgdG93U2VydmljZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICAgIHByaXZhdGUgcGlja091dFNlcnZpY2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIHByaXZhdGUgb3B0aW9uczogSVNlbGVjdGlvbk9wdGlvbnM7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvciwgb3B0aW9ucz86IElTZWxlY3Rpb25PcHRpb25zKSB7XG4gICAgICAgIC8vIGV4dGVuc2lvbiBwb2ludCBmb3IgY2xpZW50IHRvIHByZXZlbnQgYnJpY2sgdW4tc2VsZWN0aW9uc1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSB7XG4gICAgICAgICAgICBzaG91bGRVbnNlbGVjdEJyaWNrOiAoKSA9PiB0cnVlLFxuICAgICAgICAgICAgLi4ub3B0aW9uc1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIG9uV2FsbEluaXRpYWxpemUod2FsbE1vZGVsOiBJV2FsbE1vZGVsKSB7XG4gICAgICAgIHRoaXMud2FsbE1vZGVsID0gd2FsbE1vZGVsO1xuXG4gICAgICAgIHRoaXMuZG9jID0gdGhpcy5pbmplY3Rvci5nZXQoRE9DVU1FTlQpO1xuICAgICAgICB0aGlzLnBpY2tPdXRTZXJ2aWNlID0gdGhpcy5pbmplY3Rvci5nZXQoUGlja091dFNlcnZpY2UpO1xuICAgICAgICB0aGlzLnJhZGFyID0gdGhpcy5pbmplY3Rvci5nZXQoUmFkYXIpO1xuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyUmVuZGVyZXIgPSB0aGlzLmluamVjdG9yLmdldChQbGFjZWhvbGRlclJlbmRlcmVyKTtcbiAgICAgICAgdGhpcy50b3dTZXJ2aWNlID0gdGhpcy5pbmplY3Rvci5nZXQoVG93U2VydmljZSk7XG5cbiAgICAgICAgdGhpcy5vbk1vdXNlRG93bkJvdW5kID0gdGhpcy5vbk1vdXNlRG93bi5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uS2V5RG93bkhhbmRsZXJCb3VuZCA9IHRoaXMub25LZXlEb3duSGFuZGxlci5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25Nb3VzZURvd25Cb3VuZCk7XG4gICAgICAgIHRoaXMuZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5RG93bkhhbmRsZXJCb3VuZCk7XG5cbiAgICAgICAgLy8gbGlzdGVuIHRvIHBpY2tlZCBvdXQgaXRlbXMgYW5kIHNlbGVjdCBhcHByb3ByaWF0ZSBicmlja3NcbiAgICAgICAgdGhpcy5waWNrT3V0U2VydmljZVN1YnNjcmlwdGlvbiA9IHRoaXMucGlja091dFNlcnZpY2Uuc3Vic2NyaWJlKChlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIFN0YXJ0UGlja091dCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNNb3VzZVNlbGVjdGlvbiA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkudWkuZGlzYWJsZU1lZGlhSW50ZXJhY3Rpb24oKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBQaWNrT3V0SXRlbXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkudWkuc2VsZWN0QnJpY2tzKGUuaWRzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBFbmRQaWNrT3V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy53YWxsTW9kZWwuYXBpLnVpLmVuYWJsZU1lZGlhSW50ZXJhY3Rpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gbGlzdGVuIGZvciBkcmFnZ2FibGUgb3BlcmF0aW9uIGFuZCBtb3ZlIGJyaWNrcyBhY2NvcmRpbmdseVxuICAgICAgICB0aGlzLnRvd1NlcnZpY2VTdWJzY3JpcHRpb24gPSB0aGlzLnRvd1NlcnZpY2Uuc3Vic2NyaWJlKChlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIFN0YXJ0V29ya2luZ0V2ZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMud2FsbE1vZGVsLmFwaS5jb3JlLmdldEJyaWNrU25hcHNob3QoZS5zbGF2ZUlkKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzRW5hYmxlRHJvcFpvbmVIaWdobGlnaHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNFbmFibGVEcm9wWm9uZUhpZ2hsaWdodCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMubmVhcmVzdEJyaWNrVG9Ecm9wID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYWNlaG9sZGVyUmVuZGVyZXIuY2xlYXIoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBTdG9wV29ya2luZ0V2ZW50ICYmIHRoaXMubmVhcmVzdEJyaWNrVG9Ecm9wKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVEcm9wWm9uZUhpZ2hsaWdodCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZWRCcmlja0lkcyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkQnJpY2tJZHMgPSB0aGlzLndhbGxNb2RlbC5hcGkudWkuZ2V0U2VsZWN0ZWRCcmlja0lkcygpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEJyaWNrSWRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVkQnJpY2tJZHMgPSBtb3ZlZEJyaWNrSWRzLmNvbmNhdChzZWxlY3RlZEJyaWNrSWRzKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVkQnJpY2tJZHMucHVzaChlLnNsYXZlSWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubmVhcmVzdEJyaWNrVG9Ecm9wLnR5cGUgPT09IFRPVy5kcm9wVHlwZXMuaG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubmVhcmVzdEJyaWNrVG9Ecm9wLnNpZGUgPT09IFRPVy5kcm9wU2lkZXMudG9wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53YWxsTW9kZWwuYXBpLmNvcmUubW92ZUJyaWNrQmVmb3JlQnJpY2tJZChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW92ZWRCcmlja0lkcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZWFyZXN0QnJpY2tUb0Ryb3Auc3BvdC5kYXRhLmJyaWNrSWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5uZWFyZXN0QnJpY2tUb0Ryb3Auc2lkZSA9PT0gVE9XLmRyb3BTaWRlcy5ib3R0b20pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkuY29yZS5tb3ZlQnJpY2tBZnRlckJyaWNrSWQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVkQnJpY2tJZHMsIHRoaXMubmVhcmVzdEJyaWNrVG9Ecm9wLnNwb3QuZGF0YS5icmlja0lkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm5lYXJlc3RCcmlja1RvRHJvcC50eXBlID09PSBUT1cuZHJvcFR5cGVzLnZlcnRpY2FsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5uZWFyZXN0QnJpY2tUb0Ryb3Auc2lkZSA9PT0gVE9XLmRyb3BTaWRlcy5sZWZ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53YWxsTW9kZWwuYXBpLmNvcmUubW92ZUJyaWNrVG9OZXdDb2x1bW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVkQnJpY2tJZHMsIHRoaXMubmVhcmVzdEJyaWNrVG9Ecm9wLnNwb3QuZGF0YS5icmlja0lkLCBUT1cuZHJvcFNpZGVzLmxlZnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5uZWFyZXN0QnJpY2tUb0Ryb3Auc2lkZSA9PT0gVE9XLmRyb3BTaWRlcy5yaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2FsbE1vZGVsLmFwaS5jb3JlLm1vdmVCcmlja1RvTmV3Q29sdW1uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3ZlZEJyaWNrSWRzLCB0aGlzLm5lYXJlc3RCcmlja1RvRHJvcC5zcG90LmRhdGEuYnJpY2tJZCwgVE9XLmRyb3BTaWRlcy5yaWdodFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5lYXJlc3RCcmlja1RvRHJvcCA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFjZWhvbGRlclJlbmRlcmVyLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIFdvcmtJblByb2dyZXNzRXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0VuYWJsZURyb3Bab25lSGlnaGxpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNwb3RzID0gdGhpcy5yYWRhci5maWx0ZXJTcG90cygoc3BvdDogU3BvdE1vZGVsKSA9PiBzcG90LmRhdGEuaXNCZWFjb24pO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZWFyZXN0U3BvdDogU3BvdE1vZGVsO1xuXG4gICAgICAgICAgICAgICAgICAgIHNwb3RzLmZvckVhY2goKHNwb3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwb3QudXBkYXRlSW5mbygpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5lYXJlc3RTcG90KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVhcmVzdFNwb3QgPSBzcG90O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50U3BvdE1pbmltYWxEaXN0YW5jZSA9IHNwb3QuZ2V0TWluaW1hbERpc3RhbmNlVG9Qb2ludChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5tb3VzZVBvc2l0aW9uLmNsaWVudFgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUubW91c2VQb3NpdGlvbi5jbGllbnRZXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5lYXJlc3RTcG90TWluaW1hbERpc3RhbmNlID0gbmVhcmVzdFNwb3QuZ2V0TWluaW1hbERpc3RhbmNlVG9Qb2ludChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5tb3VzZVBvc2l0aW9uLmNsaWVudFgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUubW91c2VQb3NpdGlvbi5jbGllbnRZXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50U3BvdE1pbmltYWxEaXN0YW5jZSA8IG5lYXJlc3RTcG90TWluaW1hbERpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lYXJlc3RTcG90ID0gc3BvdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZWFyZXN0U3BvdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmVhcmVzdFNwb3RNaW5pbWFsRGlzdGFuY2UgPSBuZWFyZXN0U3BvdC5nZXRNaW5pbWFsRGlzdGFuY2VUb1BvaW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUubW91c2VQb3NpdGlvbi5jbGllbnRYLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUubW91c2VQb3NpdGlvbi5jbGllbnRZXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmVhcmVzdFNwb3RNaW5pbWFsRGlzdGFuY2UgPCA1MCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmVhcmVzdEJyaWNrVG9Ecm9wID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcG90OiBuZWFyZXN0U3BvdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lkZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5tb3VzZVBvc2l0aW9uLmNsaWVudFggPCBuZWFyZXN0U3BvdC5wb3NpdGlvbi54KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmVhcmVzdEJyaWNrVG9Ecm9wLnR5cGUgPSBUT1cuZHJvcFR5cGVzLnZlcnRpY2FsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5lYXJlc3RCcmlja1RvRHJvcC5zaWRlID0gVE9XLmRyb3BTaWRlcy5sZWZ0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLm1vdXNlUG9zaXRpb24uY2xpZW50WCA+IG5lYXJlc3RTcG90LnBvc2l0aW9uLnggKyBuZWFyZXN0U3BvdC5zaXplLndpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmVhcmVzdEJyaWNrVG9Ecm9wLnR5cGUgPSBUT1cuZHJvcFR5cGVzLnZlcnRpY2FsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5lYXJlc3RCcmlja1RvRHJvcC5zaWRlID0gVE9XLmRyb3BTaWRlcy5yaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5tb3VzZVBvc2l0aW9uLmNsaWVudFggPiBuZWFyZXN0U3BvdC5wb3NpdGlvbi54ICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUubW91c2VQb3NpdGlvbi5jbGllbnRYIDwgbmVhcmVzdFNwb3QucG9zaXRpb24ueCArIG5lYXJlc3RTcG90LnNpemUud2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZWFyZXN0QnJpY2tUb0Ryb3AudHlwZSA9IFRPVy5kcm9wVHlwZXMuaG9yaXpvbnRhbDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjZW50ZXJZUG9zaXRpb24gPSBuZWFyZXN0U3BvdC5wb3NpdGlvbi55ICsgKG5lYXJlc3RTcG90LnNpemUuaGVpZ2h0IC8gMik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZWFyZXN0QnJpY2tUb0Ryb3Auc2lkZSA9IGUubW91c2VQb3NpdGlvbi5jbGllbnRZIDwgY2VudGVyWVBvc2l0aW9uID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRPVy5kcm9wU2lkZXMudG9wIDogVE9XLmRyb3BTaWRlcy5ib3R0b207XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJQbGFjZWhvbGRlcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5lYXJlc3RCcmlja1RvRHJvcCA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYWNlaG9sZGVyUmVuZGVyZXIuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmVhcmVzdEJyaWNrVG9Ecm9wID0gbnVsbDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFjZWhvbGRlclJlbmRlcmVyLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uTW91c2VEb3duKGU6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzTW91c2VPdmVyRHJhZ2dhYmxlQm94KGUuY2xpZW50WCwgZS5jbGllbnRZKSAmJiB0aGlzLm9wdGlvbnMuc2hvdWxkVW5zZWxlY3RCcmljayhlKSkge1xuICAgICAgICAgICAgdGhpcy53YWxsTW9kZWwuYXBpLnVpLnVuU2VsZWN0QnJpY2tzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbktleURvd25IYW5kbGVyKGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRCcmlja0lkcyA9IHRoaXMud2FsbE1vZGVsLmFwaS51aS5nZXRTZWxlY3RlZEJyaWNrSWRzKCk7XG4gICAgICAgIGNvbnN0IGZpcnN0U2VsZWN0ZWRCcmlja0lkID0gc2VsZWN0ZWRCcmlja0lkc1swXTtcbiAgICAgICAgY29uc3QgbGFzdFNlbGVjdGVkQnJpY2tJZCA9IHNlbGVjdGVkQnJpY2tJZHNbc2VsZWN0ZWRCcmlja0lkcy5sZW5ndGggLSAxXTtcblxuICAgICAgICBpZiAoZS5rZXkgPT09ICdEZWxldGUnICYmIHNlbGVjdGVkQnJpY2tJZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHRoaXMud2FsbE1vZGVsLmFwaS51aS51blNlbGVjdEJyaWNrcygpO1xuXG4gICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkudWkucmVtb3ZlQnJpY2tzKHNlbGVjdGVkQnJpY2tJZHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGUua2V5ID09PSAnRW50ZXInICYmIHNlbGVjdGVkQnJpY2tJZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHRoaXMud2FsbE1vZGVsLmFwaS51aS5mb2N1c09uQnJpY2tJZChmaXJzdFNlbGVjdGVkQnJpY2tJZCk7XG5cbiAgICAgICAgICAgIHRoaXMud2FsbE1vZGVsLmFwaS51aS51blNlbGVjdEJyaWNrcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGUua2V5ID09PSAnQXJyb3dVcCcgJiYgc2VsZWN0ZWRCcmlja0lkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgY29uc3QgcHJldmlvdXNCcmlja0lkID0gdGhpcy53YWxsTW9kZWwuYXBpLmNvcmUuZ2V0UHJldmlvdXNCcmlja0lkKGxhc3RTZWxlY3RlZEJyaWNrSWQpO1xuXG4gICAgICAgICAgICBpZiAocHJldmlvdXNCcmlja0lkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGUuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkQnJpY2tJZHMubGVuZ3RoID4gMSAmJiB0aGlzLmlzRG93blNlbGVjdGlvbkRpcmVjdGlvbigpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkudWkucmVtb3ZlQnJpY2tGcm9tU2VsZWN0aW9uKGxhc3RTZWxlY3RlZEJyaWNrSWQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53YWxsTW9kZWwuYXBpLnVpLmFkZEJyaWNrVG9TZWxlY3Rpb24ocHJldmlvdXNCcmlja0lkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2FsbE1vZGVsLmFwaS51aS5zZWxlY3RCcmljayhwcmV2aW91c0JyaWNrSWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlLmtleSA9PT0gJ0Fycm93RG93bicgJiYgc2VsZWN0ZWRCcmlja0lkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgY29uc3QgbmV4dEJyaWNrSWQgPSB0aGlzLndhbGxNb2RlbC5hcGkuY29yZS5nZXROZXh0QnJpY2tJZChsYXN0U2VsZWN0ZWRCcmlja0lkKTtcblxuICAgICAgICAgICAgaWYgKG5leHRCcmlja0lkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGUuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkQnJpY2tJZHMubGVuZ3RoID4gMSAmJiAhdGhpcy5pc0Rvd25TZWxlY3Rpb25EaXJlY3Rpb24oKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53YWxsTW9kZWwuYXBpLnVpLnJlbW92ZUJyaWNrRnJvbVNlbGVjdGlvbihsYXN0U2VsZWN0ZWRCcmlja0lkKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2FsbE1vZGVsLmFwaS51aS5hZGRCcmlja1RvU2VsZWN0aW9uKG5leHRCcmlja0lkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2FsbE1vZGVsLmFwaS51aS5zZWxlY3RCcmljayhuZXh0QnJpY2tJZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGUua2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRCcmlja0lkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndhbGxNb2RlbC5hcGkudWkudW5TZWxlY3RCcmlja3MoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uV2FsbFBsdWdpbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZG9jLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25Nb3VzZURvd25Cb3VuZCk7XG4gICAgICAgIHRoaXMuZG9jLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5RG93bkhhbmRsZXJCb3VuZCk7XG5cbiAgICAgICAgdGhpcy53YWxsTW9kZWwgPSBudWxsO1xuICAgICAgICB0aGlzLnBpY2tPdXRTZXJ2aWNlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMudG93U2VydmljZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNNb3VzZU92ZXJEcmFnZ2FibGVCb3goY2xpZW50WDogbnVtYmVyLCBjbGllbnRZOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGN1cnJlbnRFbGVtZW50ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChjbGllbnRYLCBjbGllbnRZKTtcblxuICAgICAgICB3aGlsZSAoY3VycmVudEVsZW1lbnQgJiYgIWN1cnJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnd2FsbC1jYW52YXMtYnJpY2tfX2RyYWdnYWJsZS1ib3gnKSkge1xuICAgICAgICAgICAgY3VycmVudEVsZW1lbnQgPSBjdXJyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEJvb2xlYW4oY3VycmVudEVsZW1lbnQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNEb3duU2VsZWN0aW9uRGlyZWN0aW9uKCk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBzZWxlY3RlZEJyaWNrSWRzID0gdGhpcy53YWxsTW9kZWwuYXBpLnVpLmdldFNlbGVjdGVkQnJpY2tJZHMoKTtcblxuICAgICAgICBjb25zdCBicmlja3NDb3VudCA9IHNlbGVjdGVkQnJpY2tJZHMubGVuZ3RoO1xuXG4gICAgICAgIGNvbnN0IGxhc3RCcmlja0lkID0gc2VsZWN0ZWRCcmlja0lkc1ticmlja3NDb3VudCAtIDFdO1xuICAgICAgICBjb25zdCBwZW51bHRpbWF0ZUJyaWNrSWQgPSBzZWxlY3RlZEJyaWNrSWRzW2JyaWNrc0NvdW50IC0gMl07XG5cbiAgICAgICAgcmV0dXJuIHRoaXMud2FsbE1vZGVsLmFwaS5jb3JlLmlzQnJpY2tBaGVhZE9mKHBlbnVsdGltYXRlQnJpY2tJZCwgbGFzdEJyaWNrSWQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVuZGVyUGxhY2Vob2xkZXIoKSB7XG4gICAgICAgIGxldCBwbGFjZWhvbGRlclg7XG4gICAgICAgIGxldCBwbGFjZWhvbGRlclk7XG4gICAgICAgIGxldCBwbGFjZWhvbGRlclNpemU7XG4gICAgICAgIGxldCBwbGFjZWhvbGRlcklzSG9yaXpvbnRhbDtcblxuICAgICAgICBjb25zdCBzcG90ID0gdGhpcy5uZWFyZXN0QnJpY2tUb0Ryb3Auc3BvdDtcbiAgICAgICAgY29uc3Qgc2lkZSA9IHRoaXMubmVhcmVzdEJyaWNrVG9Ecm9wLnNpZGU7XG4gICAgICAgIGNvbnN0IHR5cGUgPSB0aGlzLm5lYXJlc3RCcmlja1RvRHJvcC50eXBlO1xuXG4gICAgICAgIGlmICh0eXBlID09PSBUT1cuZHJvcFR5cGVzLmhvcml6b250YWwpIHtcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyWCA9IHNwb3QucG9zaXRpb24ueDtcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyU2l6ZSA9IHNwb3Quc2l6ZS53aWR0aDtcblxuICAgICAgICAgICAgaWYgKHNpZGUgPT09IFRPVy5kcm9wU2lkZXMudG9wKSB7XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXJZID0gc3BvdC5wb3NpdGlvbi55IC0gdGhpcy5wbGFjZWhvbGRlckhlaWdodDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHNpZGUgPT09IFRPVy5kcm9wU2lkZXMuYm90dG9tKSB7XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXJZID0gc3BvdC5wb3NpdGlvbi55ICsgc3BvdC5zaXplLmhlaWdodDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcGxhY2Vob2xkZXJJc0hvcml6b250YWwgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGUgPT09IFRPVy5kcm9wVHlwZXMudmVydGljYWwpIHtcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyWSA9IHNwb3QucG9zaXRpb24ueTtcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyU2l6ZSA9IHNwb3Quc2l6ZS5oZWlnaHQ7XG4gICAgICAgICAgICBwbGFjZWhvbGRlcklzSG9yaXpvbnRhbCA9IGZhbHNlO1xuXG4gICAgICAgICAgICBpZiAoc2lkZSA9PT0gVE9XLmRyb3BTaWRlcy5sZWZ0KSB7XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXJYID0gc3BvdC5wb3NpdGlvbi54O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc2lkZSA9PT0gVE9XLmRyb3BTaWRlcy5yaWdodCkge1xuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyWCA9IHNwb3QucG9zaXRpb24ueCArIHNwb3Quc2l6ZS53aWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXJSZW5kZXJlci5yZW5kZXIocGxhY2Vob2xkZXJYLCBwbGFjZWhvbGRlclksIHBsYWNlaG9sZGVyU2l6ZSwgcGxhY2Vob2xkZXJJc0hvcml6b250YWwpO1xuICAgIH1cbn1cbiJdfQ==