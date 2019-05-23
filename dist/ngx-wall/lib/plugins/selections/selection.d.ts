import { Injector } from '@angular/core';
import { IWallPlugin } from '../../wall/model/interfaces/wall-plugin.interface';
import { IWallModel } from '../../wall/model/interfaces/wall-model.interface';
export interface ISelectionOptions {
    shouldUnselectBrick: (e: MouseEvent) => boolean;
}
export declare class SelectionPlugin implements IWallPlugin {
    private injector;
    name: 'selection';
    version: '0.0.0';
    doc: Document;
    isMouseSelection: boolean;
    onMouseDownBound: any;
    onKeyDownHandlerBound: any;
    wallModel: IWallModel;
    private pickOutService;
    private radar;
    private towService;
    private placeholderRenderer;
    private nearestBrickToDrop;
    private placeholderHeight;
    private isEnableDropZoneHighlight;
    private towServiceSubscription;
    private pickOutServiceSubscription;
    private options;
    constructor(injector: Injector, options?: ISelectionOptions);
    onWallInitialize(wallModel: IWallModel): void;
    onMouseDown(e: MouseEvent): void;
    onKeyDownHandler(e: KeyboardEvent): void;
    onWallPluginDestroy(): void;
    private isMouseOverDraggableBox;
    private isDownSelectionDirection;
    private renderPlaceholder;
}
