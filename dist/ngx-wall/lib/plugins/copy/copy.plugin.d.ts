import { Injector } from '@angular/core';
import { IWallModel, IWallPlugin } from '../../wall/wall';
export declare class CopyPlugin implements IWallPlugin {
    private injector;
    name: 'copy';
    version: '0.0.0';
    doc: Document;
    onCopyBound: any;
    wallModel: IWallModel;
    constructor(injector: Injector);
    onWallInitialize(model: IWallModel): void;
    onCopy(e: ClipboardEvent): void;
    onWallPluginDestroy(): void;
    private addToClipboard;
    private getSelectedTextRepresentation;
}
