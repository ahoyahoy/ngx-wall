import { IWallModel } from './wall-model.interface';
export interface IWallPlugin {
    name: string;
    version: string;
    onWallInitialize(wallModel: IWallModel): any;
    onWallPluginDestroy?(): any;
}
