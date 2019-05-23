/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DOCUMENT } from '@angular/common';
import { ApplicationRef, ComponentFactoryResolver, Directive, ElementRef, HostListener, Inject, Injector, Input, NgZone } from '@angular/core';
import { PickOutCoordinator } from '../pick-out-coordinator.service';
import { MOUSE_LEFT_KEY_CODE } from '../pick-out.constant';
import { PickOutAreaComponent } from './pick-out-area.component';
import { PickOutAreaModel } from './pick-out-area.model';
var PickOutAreaDirective = /** @class */ (function () {
    function PickOutAreaDirective(doc, pickOutCoordinator, componentFactoryResolver, appRef, zone, el, injector) {
        this.pickOutCoordinator = pickOutCoordinator;
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.zone = zone;
        this.el = el;
        this.injector = injector;
        this.doc = null;
        this.pickOutAreaModel = null;
        this.selectionRangeComponentRef = null;
        this.doc = doc;
    }
    /**
     * @return {?}
     */
    PickOutAreaDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.onMouseUpBound = this.onMouseUp.bind(this);
        this.onMouseMoveBound = this.onMouseMove.bind(this);
        this.onSelectionStartBound = this.onSelectionStart.bind(this);
        this.onContainerScrollBound = this.onContainerScroll.bind(this);
        this.doc.addEventListener('mousemove', this.onMouseMoveBound);
        this.doc.addEventListener('mouseup', this.onMouseUpBound);
        this.doc.addEventListener('selectstart', this.onSelectionStartBound);
        this.config.scrollableContainer.addEventListener('scroll', this.onContainerScrollBound);
    };
    /**
     * @return {?}
     */
    PickOutAreaDirective.prototype.triggerPickOutChanged = /**
     * @return {?}
     */
    function () {
        this.pickOutCoordinator.pickOutChanged({
            x: this.pickOutAreaModel.clientX,
            y: this.pickOutAreaModel.clientY,
            width: this.pickOutAreaModel.width,
            height: this.pickOutAreaModel.height
        });
    };
    /**
     * @param {?} event
     * @return {?}
     */
    PickOutAreaDirective.prototype.mouseDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.button === MOUSE_LEFT_KEY_CODE && !this.isMouseOverDraggableElement(event.clientX, event.clientY)) {
            /** @type {?} */
            var scrollContextRect = this.config.scrollableContainer.getBoundingClientRect();
            /** @type {?} */
            var pageX = event.clientX - scrollContextRect.left;
            /** @type {?} */
            var pageY = event.clientY - scrollContextRect.top + this.config.scrollableContainer.scrollTop;
            /** @type {?} */
            var brickIdOverMouse = this.findBrickIdByCoordinate(event.clientX, event.clientY);
            this.pickOutAreaModel = new PickOutAreaModel(this.config.scrollableContainer, pageX, pageY, brickIdOverMouse);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    PickOutAreaDirective.prototype.onMouseMove = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.pickOutAreaModel) {
            this.pickOutAreaModel.updateCurrentClientPosition(event.clientX, event.clientY);
            this.pickOutAreaModel.updateCurrentBrickId(this.findBrickIdByCoordinate(event.clientX, event.clientY));
            if (this.pickOutAreaModel.isPickOutProcessInitialized) {
                event.preventDefault();
                this.triggerPickOutChanged();
            }
            else if (this.pickOutAreaModel.canInitiatePickOutProcess()) {
                this.pickOutAreaModel.initiatePickOutProcess();
                this.onStartPicKOut();
            }
        }
    };
    /**
     * @return {?}
     */
    PickOutAreaDirective.prototype.onMouseUp = /**
     * @return {?}
     */
    function () {
        this.onStopPickOut();
    };
    /**
     * @return {?}
     */
    PickOutAreaDirective.prototype.onContainerScroll = /**
     * @return {?}
     */
    function () {
        if (this.pickOutAreaModel && this.pickOutAreaModel.isPickOutProcessInitialized) {
            this.pickOutAreaModel.recalculatePositionAndSize();
            this.triggerPickOutChanged();
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    PickOutAreaDirective.prototype.onSelectionStart = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        // does not allow select text during pick out process
        if (this.pickOutAreaModel && this.pickOutAreaModel.isPickOutProcessInitialized) {
            e.preventDefault();
        }
    };
    /**
     * @return {?}
     */
    PickOutAreaDirective.prototype.renderRangeComponent = /**
     * @return {?}
     */
    function () {
        // https://medium.com/@caroso1222/angular-pro-tip-how-to-dynamically-create-components-in-body-ba200cc289e6
        // 1. Create a component reference from the component
        this.selectionRangeComponentRef = this.componentFactoryResolver
            .resolveComponentFactory(PickOutAreaComponent)
            .create(this.injector);
        this.selectionRangeComponentRef.instance.initialize(this.pickOutAreaModel);
        // 2. Attach component to the appRef so that it's inside the ng component tree
        this.appRef.attachView(this.selectionRangeComponentRef.hostView);
        // 3. Get DOM element from component
        /** @type {?} */
        var domElem = (/** @type {?} */ (((/** @type {?} */ (this.selectionRangeComponentRef.hostView)))
            .rootNodes[0]));
        // 4. Append DOM element to the body
        this.config.scrollableContainer.appendChild(domElem);
    };
    /**
     * @return {?}
     */
    PickOutAreaDirective.prototype.removeRangeComponent = /**
     * @return {?}
     */
    function () {
        this.appRef.detachView(this.selectionRangeComponentRef.hostView);
        this.selectionRangeComponentRef.destroy();
        this.selectionRangeComponentRef = null;
    };
    /**
     * @return {?}
     */
    PickOutAreaDirective.prototype.onStartPicKOut = /**
     * @return {?}
     */
    function () {
        this.pickOutCoordinator.startPickOut();
        this.doc.activeElement.blur();
        this.renderRangeComponent();
        this.clearSelection();
    };
    /**
     * @return {?}
     */
    PickOutAreaDirective.prototype.onStopPickOut = /**
     * @return {?}
     */
    function () {
        if (this.pickOutAreaModel && this.pickOutAreaModel.isPickOutProcessInitialized) {
            this.removeRangeComponent();
            this.pickOutCoordinator.endPickOut();
        }
        this.pickOutAreaModel = null;
    };
    /**
     * @return {?}
     */
    PickOutAreaDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.doc.removeEventListener('mouseup', this.onMouseUpBound);
        this.doc.removeEventListener('mousemove', this.onMouseMoveBound);
        this.doc.removeEventListener('selectstart', this.onSelectionStartBound);
        this.config.scrollableContainer.removeEventListener('scroll', this.onContainerScrollBound);
    };
    /**
     * @private
     * @return {?}
     */
    PickOutAreaDirective.prototype.clearSelection = /**
     * @private
     * @return {?}
     */
    function () {
        window.getSelection().empty();
    };
    /**
     * @private
     * @param {?} pageX
     * @param {?} clientY
     * @return {?}
     */
    PickOutAreaDirective.prototype.findBrickIdByCoordinate = /**
     * @private
     * @param {?} pageX
     * @param {?} clientY
     * @return {?}
     */
    function (pageX, clientY) {
        /** @type {?} */
        var currentElement = document.elementFromPoint(pageX, clientY);
        while (currentElement && currentElement.tagName !== 'WALL-CANVAS-BRICK') {
            currentElement = currentElement.parentElement;
        }
        if (currentElement) {
            // there is canvas bricks
            return currentElement
                .getElementsByClassName('wall-canvas-brick__wrapper')[0]
                .getAttribute('id');
        }
        else {
            return null;
        }
    };
    /**
     * @private
     * @param {?} clientX
     * @param {?} clientY
     * @return {?}
     */
    PickOutAreaDirective.prototype.isMouseOverDraggableElement = /**
     * @private
     * @param {?} clientX
     * @param {?} clientY
     * @return {?}
     */
    function (clientX, clientY) {
        /** @type {?} */
        var currentElement = document.elementFromPoint(clientX, clientY);
        while (currentElement &&
            !((/** @type {?} */ (currentElement))).draggable &&
            !currentElement.classList.contains('wall-canvas-brick__draggable-box')) {
            currentElement = currentElement.parentElement;
        }
        return Boolean(currentElement);
    };
    PickOutAreaDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[pick-out-area]'
                },] }
    ];
    /** @nocollapse */
    PickOutAreaDirective.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: PickOutCoordinator },
        { type: ComponentFactoryResolver },
        { type: ApplicationRef },
        { type: NgZone },
        { type: ElementRef },
        { type: Injector }
    ]; };
    PickOutAreaDirective.propDecorators = {
        config: [{ type: Input, args: ['pick-out-area',] }],
        mouseDown: [{ type: HostListener, args: ['mousedown', ['$event'],] }]
    };
    return PickOutAreaDirective;
}());
export { PickOutAreaDirective };
if (false) {
    /** @type {?} */
    PickOutAreaDirective.prototype.config;
    /** @type {?} */
    PickOutAreaDirective.prototype.doc;
    /** @type {?} */
    PickOutAreaDirective.prototype.pickOutAreaModel;
    /** @type {?} */
    PickOutAreaDirective.prototype.selectionRangeComponentRef;
    /** @type {?} */
    PickOutAreaDirective.prototype.onMouseUpBound;
    /** @type {?} */
    PickOutAreaDirective.prototype.onMouseMoveBound;
    /** @type {?} */
    PickOutAreaDirective.prototype.onSelectionStartBound;
    /** @type {?} */
    PickOutAreaDirective.prototype.onContainerScrollBound;
    /** @type {?} */
    PickOutAreaDirective.prototype.previousClientX;
    /** @type {?} */
    PickOutAreaDirective.prototype.previousClientY;
    /**
     * @type {?}
     * @private
     */
    PickOutAreaDirective.prototype.pickOutCoordinator;
    /**
     * @type {?}
     * @private
     */
    PickOutAreaDirective.prototype.componentFactoryResolver;
    /**
     * @type {?}
     * @private
     */
    PickOutAreaDirective.prototype.appRef;
    /**
     * @type {?}
     * @private
     */
    PickOutAreaDirective.prototype.zone;
    /**
     * @type {?}
     * @private
     */
    PickOutAreaDirective.prototype.el;
    /**
     * @type {?}
     * @private
     */
    PickOutAreaDirective.prototype.injector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGljay1vdXQtYXJlYS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9tb2R1bGVzL3BpY2stb3V0L3BpY2stb3V0LWFyZWEvcGljay1vdXQtYXJlYS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQ0gsY0FBYyxFQUNkLHdCQUF3QixFQUV4QixTQUFTLEVBQ1QsVUFBVSxFQUVWLFlBQVksRUFDWixNQUFNLEVBQ04sUUFBUSxFQUNSLEtBQUssRUFDTCxNQUFNLEVBR1QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDbkUsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFFekQsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDL0QsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFFdkQ7SUFvQkksOEJBQThCLEdBQUcsRUFDYixrQkFBc0MsRUFDdEMsd0JBQWtELEVBQ2xELE1BQXNCLEVBQ3RCLElBQVksRUFDWixFQUFjLEVBQ2QsUUFBa0I7UUFMbEIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0Qyw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBQ2xELFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQ3RCLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ2QsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQXBCdEMsUUFBRyxHQUFRLElBQUksQ0FBQztRQUVoQixxQkFBZ0IsR0FBcUIsSUFBSSxDQUFDO1FBRTFDLCtCQUEwQixHQUF1QyxJQUFJLENBQUM7UUFpQmxFLElBQUksQ0FBQyxHQUFHLEdBQUcs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QUMsU0FBUztZQUMxQyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGtDQUFrQyxDQUFDLEVBQUU7WUFDcEUsY0FBYyxHQUFHLGNBQWMsQ0FBQyxhQUFhLENBQUM7U0FDakQ7UUFFRCxPQUFPLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNuQyxDQUFDOztnQkEvTEosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxpQkFBaUI7aUJBQzlCOzs7O2dEQWtCZ0IsTUFBTSxTQUFDLFFBQVE7Z0JBMUJ4QixrQkFBa0I7Z0JBYnRCLHdCQUF3QjtnQkFEeEIsY0FBYztnQkFVZCxNQUFNO2dCQU5OLFVBQVU7Z0JBSVYsUUFBUTs7O3lCQWdCUCxLQUFLLFNBQUMsZUFBZTs0QkErQ3JCLFlBQVksU0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUM7O0lBNkl6QywyQkFBQztDQUFBLEFBaE1ELElBZ01DO1NBN0xZLG9CQUFvQjs7O0lBQzdCLHNDQUFtRDs7SUFFbkQsbUNBQWdCOztJQUVoQixnREFBMEM7O0lBRTFDLDBEQUFzRTs7SUFFdEUsOENBQTBCOztJQUMxQixnREFBOEM7O0lBQzlDLHFEQUFpQzs7SUFDakMsc0RBQWtDOztJQUVsQywrQ0FBd0I7O0lBQ3hCLCtDQUF3Qjs7Ozs7SUFHWixrREFBOEM7Ozs7O0lBQzlDLHdEQUEwRDs7Ozs7SUFDMUQsc0NBQThCOzs7OztJQUM5QixvQ0FBb0I7Ozs7O0lBQ3BCLGtDQUFzQjs7Ozs7SUFDdEIsd0NBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gICAgQXBwbGljYXRpb25SZWYsXG4gICAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIENvbXBvbmVudFJlZixcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBFbWJlZGRlZFZpZXdSZWYsXG4gICAgSG9zdExpc3RlbmVyLFxuICAgIEluamVjdCxcbiAgICBJbmplY3RvcixcbiAgICBJbnB1dCxcbiAgICBOZ1pvbmUsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7UGlja091dENvb3JkaW5hdG9yfSBmcm9tICcuLi9waWNrLW91dC1jb29yZGluYXRvci5zZXJ2aWNlJztcbmltcG9ydCB7TU9VU0VfTEVGVF9LRVlfQ09ERX0gZnJvbSAnLi4vcGljay1vdXQuY29uc3RhbnQnO1xuaW1wb3J0IHtJUGlja091dEFyZWFDb25maWd9IGZyb20gJy4vcGljay1vdXQtYXJlYS1jb25maWcuaW50ZXJmYWNlJztcbmltcG9ydCB7UGlja091dEFyZWFDb21wb25lbnR9IGZyb20gJy4vcGljay1vdXQtYXJlYS5jb21wb25lbnQnO1xuaW1wb3J0IHtQaWNrT3V0QXJlYU1vZGVsfSBmcm9tICcuL3BpY2stb3V0LWFyZWEubW9kZWwnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twaWNrLW91dC1hcmVhXSdcbn0pXG5leHBvcnQgY2xhc3MgUGlja091dEFyZWFEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KCdwaWNrLW91dC1hcmVhJykgY29uZmlnOiBJUGlja091dEFyZWFDb25maWc7XG5cbiAgICBkb2M6IGFueSA9IG51bGw7XG5cbiAgICBwaWNrT3V0QXJlYU1vZGVsOiBQaWNrT3V0QXJlYU1vZGVsID0gbnVsbDtcblxuICAgIHNlbGVjdGlvblJhbmdlQ29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8UGlja091dEFyZWFDb21wb25lbnQ+ID0gbnVsbDtcblxuICAgIG9uTW91c2VVcEJvdW5kOiAoKSA9PiBhbnk7XG4gICAgb25Nb3VzZU1vdmVCb3VuZDogKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB2b2lkO1xuICAgIG9uU2VsZWN0aW9uU3RhcnRCb3VuZDogKCkgPT4gYW55O1xuICAgIG9uQ29udGFpbmVyU2Nyb2xsQm91bmQ6ICgpID0+IGFueTtcblxuICAgIHByZXZpb3VzQ2xpZW50WDogbnVtYmVyO1xuICAgIHByZXZpb3VzQ2xpZW50WTogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgZG9jLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcGlja091dENvb3JkaW5hdG9yOiBQaWNrT3V0Q29vcmRpbmF0b3IsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgICAgICAgICBwcml2YXRlIGFwcFJlZjogQXBwbGljYXRpb25SZWYsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgICAgICB0aGlzLmRvYyA9IGRvYztcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5vbk1vdXNlVXBCb3VuZCA9IHRoaXMub25Nb3VzZVVwLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25Nb3VzZU1vdmVCb3VuZCA9IHRoaXMub25Nb3VzZU1vdmUuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vblNlbGVjdGlvblN0YXJ0Qm91bmQgPSB0aGlzLm9uU2VsZWN0aW9uU3RhcnQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vbkNvbnRhaW5lclNjcm9sbEJvdW5kID0gdGhpcy5vbkNvbnRhaW5lclNjcm9sbC5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMub25Nb3VzZU1vdmVCb3VuZCk7XG4gICAgICAgIHRoaXMuZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm9uTW91c2VVcEJvdW5kKTtcbiAgICAgICAgdGhpcy5kb2MuYWRkRXZlbnRMaXN0ZW5lcignc2VsZWN0c3RhcnQnLCB0aGlzLm9uU2VsZWN0aW9uU3RhcnRCb3VuZCk7XG4gICAgICAgIHRoaXMuY29uZmlnLnNjcm9sbGFibGVDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5vbkNvbnRhaW5lclNjcm9sbEJvdW5kKTtcbiAgICB9XG5cbiAgICB0cmlnZ2VyUGlja091dENoYW5nZWQoKSB7XG4gICAgICAgIHRoaXMucGlja091dENvb3JkaW5hdG9yLnBpY2tPdXRDaGFuZ2VkKHtcbiAgICAgICAgICAgIHg6IHRoaXMucGlja091dEFyZWFNb2RlbC5jbGllbnRYLFxuICAgICAgICAgICAgeTogdGhpcy5waWNrT3V0QXJlYU1vZGVsLmNsaWVudFksXG4gICAgICAgICAgICB3aWR0aDogdGhpcy5waWNrT3V0QXJlYU1vZGVsLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnBpY2tPdXRBcmVhTW9kZWwuaGVpZ2h0XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlZG93bicsIFsnJGV2ZW50J10pXG4gICAgbW91c2VEb3duKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5idXR0b24gPT09IE1PVVNFX0xFRlRfS0VZX0NPREUgJiYgIXRoaXMuaXNNb3VzZU92ZXJEcmFnZ2FibGVFbGVtZW50KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpKSB7XG4gICAgICAgICAgICBjb25zdCBzY3JvbGxDb250ZXh0UmVjdCA9IHRoaXMuY29uZmlnLnNjcm9sbGFibGVDb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBjb25zdCBwYWdlWCA9IGV2ZW50LmNsaWVudFggLSBzY3JvbGxDb250ZXh0UmVjdC5sZWZ0O1xuICAgICAgICAgICAgY29uc3QgcGFnZVkgPSBldmVudC5jbGllbnRZIC0gc2Nyb2xsQ29udGV4dFJlY3QudG9wICsgdGhpcy5jb25maWcuc2Nyb2xsYWJsZUNvbnRhaW5lci5zY3JvbGxUb3A7XG5cbiAgICAgICAgICAgIGNvbnN0IGJyaWNrSWRPdmVyTW91c2UgPSB0aGlzLmZpbmRCcmlja0lkQnlDb29yZGluYXRlKGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuXG4gICAgICAgICAgICB0aGlzLnBpY2tPdXRBcmVhTW9kZWwgPSBuZXcgUGlja091dEFyZWFNb2RlbChcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5zY3JvbGxhYmxlQ29udGFpbmVyLFxuICAgICAgICAgICAgICAgIHBhZ2VYLFxuICAgICAgICAgICAgICAgIHBhZ2VZLFxuICAgICAgICAgICAgICAgIGJyaWNrSWRPdmVyTW91c2VcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk1vdXNlTW92ZShldmVudDogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLnBpY2tPdXRBcmVhTW9kZWwpIHtcbiAgICAgICAgICAgIHRoaXMucGlja091dEFyZWFNb2RlbC51cGRhdGVDdXJyZW50Q2xpZW50UG9zaXRpb24oZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgICAgICAgICB0aGlzLnBpY2tPdXRBcmVhTW9kZWwudXBkYXRlQ3VycmVudEJyaWNrSWQodGhpcy5maW5kQnJpY2tJZEJ5Q29vcmRpbmF0ZShldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnBpY2tPdXRBcmVhTW9kZWwuaXNQaWNrT3V0UHJvY2Vzc0luaXRpYWxpemVkKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlclBpY2tPdXRDaGFuZ2VkKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucGlja091dEFyZWFNb2RlbC5jYW5Jbml0aWF0ZVBpY2tPdXRQcm9jZXNzKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tPdXRBcmVhTW9kZWwuaW5pdGlhdGVQaWNrT3V0UHJvY2VzcygpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5vblN0YXJ0UGljS091dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Nb3VzZVVwKCkge1xuICAgICAgICB0aGlzLm9uU3RvcFBpY2tPdXQoKTtcbiAgICB9XG5cbiAgICBvbkNvbnRhaW5lclNjcm9sbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucGlja091dEFyZWFNb2RlbCAmJiB0aGlzLnBpY2tPdXRBcmVhTW9kZWwuaXNQaWNrT3V0UHJvY2Vzc0luaXRpYWxpemVkKSB7XG4gICAgICAgICAgICB0aGlzLnBpY2tPdXRBcmVhTW9kZWwucmVjYWxjdWxhdGVQb3NpdGlvbkFuZFNpemUoKTtcblxuICAgICAgICAgICAgdGhpcy50cmlnZ2VyUGlja091dENoYW5nZWQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uU2VsZWN0aW9uU3RhcnQoZSkge1xuICAgICAgICAvLyBkb2VzIG5vdCBhbGxvdyBzZWxlY3QgdGV4dCBkdXJpbmcgcGljayBvdXQgcHJvY2Vzc1xuICAgICAgICBpZiAodGhpcy5waWNrT3V0QXJlYU1vZGVsICYmIHRoaXMucGlja091dEFyZWFNb2RlbC5pc1BpY2tPdXRQcm9jZXNzSW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclJhbmdlQ29tcG9uZW50KCkge1xuICAgICAgICAvLyBodHRwczovL21lZGl1bS5jb20vQGNhcm9zbzEyMjIvYW5ndWxhci1wcm8tdGlwLWhvdy10by1keW5hbWljYWxseS1jcmVhdGUtY29tcG9uZW50cy1pbi1ib2R5LWJhMjAwY2MyODllNlxuXG4gICAgICAgIC8vIDEuIENyZWF0ZSBhIGNvbXBvbmVudCByZWZlcmVuY2UgZnJvbSB0aGUgY29tcG9uZW50XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uUmFuZ2VDb21wb25lbnRSZWYgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlclxuICAgICAgICAgICAgLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFBpY2tPdXRBcmVhQ29tcG9uZW50KVxuICAgICAgICAgICAgLmNyZWF0ZSh0aGlzLmluamVjdG9yKTtcblxuICAgICAgICB0aGlzLnNlbGVjdGlvblJhbmdlQ29tcG9uZW50UmVmLmluc3RhbmNlLmluaXRpYWxpemUodGhpcy5waWNrT3V0QXJlYU1vZGVsKTtcblxuICAgICAgICAvLyAyLiBBdHRhY2ggY29tcG9uZW50IHRvIHRoZSBhcHBSZWYgc28gdGhhdCBpdCdzIGluc2lkZSB0aGUgbmcgY29tcG9uZW50IHRyZWVcbiAgICAgICAgdGhpcy5hcHBSZWYuYXR0YWNoVmlldyh0aGlzLnNlbGVjdGlvblJhbmdlQ29tcG9uZW50UmVmLmhvc3RWaWV3KTtcblxuICAgICAgICAvLyAzLiBHZXQgRE9NIGVsZW1lbnQgZnJvbSBjb21wb25lbnRcbiAgICAgICAgY29uc3QgZG9tRWxlbSA9ICh0aGlzLnNlbGVjdGlvblJhbmdlQ29tcG9uZW50UmVmLmhvc3RWaWV3IGFzIEVtYmVkZGVkVmlld1JlZjxhbnk+KVxuICAgICAgICAgICAgLnJvb3ROb2Rlc1swXSBhcyBIVE1MRWxlbWVudDtcblxuICAgICAgICAvLyA0LiBBcHBlbmQgRE9NIGVsZW1lbnQgdG8gdGhlIGJvZHlcblxuICAgICAgICB0aGlzLmNvbmZpZy5zY3JvbGxhYmxlQ29udGFpbmVyLmFwcGVuZENoaWxkKGRvbUVsZW0pO1xuICAgIH1cblxuICAgIHJlbW92ZVJhbmdlQ29tcG9uZW50KCkge1xuICAgICAgICB0aGlzLmFwcFJlZi5kZXRhY2hWaWV3KHRoaXMuc2VsZWN0aW9uUmFuZ2VDb21wb25lbnRSZWYuaG9zdFZpZXcpO1xuICAgICAgICB0aGlzLnNlbGVjdGlvblJhbmdlQ29tcG9uZW50UmVmLmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25SYW5nZUNvbXBvbmVudFJlZiA9IG51bGw7XG4gICAgfVxuXG4gICAgb25TdGFydFBpY0tPdXQoKSB7XG4gICAgICAgIHRoaXMucGlja091dENvb3JkaW5hdG9yLnN0YXJ0UGlja091dCgpO1xuXG4gICAgICAgIHRoaXMuZG9jLmFjdGl2ZUVsZW1lbnQuYmx1cigpO1xuXG4gICAgICAgIHRoaXMucmVuZGVyUmFuZ2VDb21wb25lbnQoKTtcblxuICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgfVxuXG4gICAgb25TdG9wUGlja091dCgpIHtcbiAgICAgICAgaWYgKHRoaXMucGlja091dEFyZWFNb2RlbCAmJiB0aGlzLnBpY2tPdXRBcmVhTW9kZWwuaXNQaWNrT3V0UHJvY2Vzc0luaXRpYWxpemVkKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVJhbmdlQ29tcG9uZW50KCk7XG5cbiAgICAgICAgICAgIHRoaXMucGlja091dENvb3JkaW5hdG9yLmVuZFBpY2tPdXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucGlja091dEFyZWFNb2RlbCA9IG51bGw7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZG9jLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm9uTW91c2VVcEJvdW5kKTtcbiAgICAgICAgdGhpcy5kb2MucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5vbk1vdXNlTW92ZUJvdW5kKTtcbiAgICAgICAgdGhpcy5kb2MucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2VsZWN0c3RhcnQnLCB0aGlzLm9uU2VsZWN0aW9uU3RhcnRCb3VuZCk7XG4gICAgICAgIHRoaXMuY29uZmlnLnNjcm9sbGFibGVDb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5vbkNvbnRhaW5lclNjcm9sbEJvdW5kKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNsZWFyU2VsZWN0aW9uKCkge1xuICAgICAgICB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuZW1wdHkoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZpbmRCcmlja0lkQnlDb29yZGluYXRlKHBhZ2VYOiBudW1iZXIsIGNsaWVudFk6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIGxldCBjdXJyZW50RWxlbWVudCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQocGFnZVgsIGNsaWVudFkpO1xuXG4gICAgICAgIHdoaWxlIChjdXJyZW50RWxlbWVudCAmJiBjdXJyZW50RWxlbWVudC50YWdOYW1lICE9PSAnV0FMTC1DQU5WQVMtQlJJQ0snKSB7XG4gICAgICAgICAgICBjdXJyZW50RWxlbWVudCA9IGN1cnJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY3VycmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIHRoZXJlIGlzIGNhbnZhcyBicmlja3NcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50RWxlbWVudFxuICAgICAgICAgICAgICAgIC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd3YWxsLWNhbnZhcy1icmlja19fd3JhcHBlcicpWzBdXG4gICAgICAgICAgICAgICAgLmdldEF0dHJpYnV0ZSgnaWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc01vdXNlT3ZlckRyYWdnYWJsZUVsZW1lbnQoY2xpZW50WDogbnVtYmVyLCBjbGllbnRZOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGN1cnJlbnRFbGVtZW50ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChjbGllbnRYLCBjbGllbnRZKTtcblxuICAgICAgICB3aGlsZSAoY3VycmVudEVsZW1lbnQgJiZcbiAgICAgICAgIShjdXJyZW50RWxlbWVudCBhcyBIVE1MRWxlbWVudCkuZHJhZ2dhYmxlICYmXG4gICAgICAgICFjdXJyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ3dhbGwtY2FudmFzLWJyaWNrX19kcmFnZ2FibGUtYm94JykpIHtcbiAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50ID0gY3VycmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBCb29sZWFuKGN1cnJlbnRFbGVtZW50KTtcbiAgICB9XG59XG4iXX0=