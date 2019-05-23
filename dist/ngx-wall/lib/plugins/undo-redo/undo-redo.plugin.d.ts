import { Injector } from '@angular/core';
import { IWallModel, IWallPlugin } from '../../wall/wall';
export declare class UndoRedoPlugin implements IWallPlugin {
    private injector;
    name: 'undoredo';
    version: '0.0.0';
    private wallModel;
    private doc;
    private onUndoKeyHandlerBound;
    private apiSubscription;
    private processingUndo;
    private undoPlanStack;
    private redoPlanStack;
    constructor(injector: Injector);
    onWallInitialize(wallModel: IWallModel): void;
    onWallPluginDestroy(): void;
    private onUndoKeyHandler;
    private undoSize;
    private redoSize;
    private wallModelEventHandler;
    private redo;
    private undo;
    private clear;
}
