import { IWallCorePluginApi } from './wall-core-plugin-api.interface';
export interface IWallModel {
    version: string;
    api: {
        [apiName: string]: any;
        core: IWallCorePluginApi;
    };
    destroy(): any;
    subscribe(callback: any): any;
    registerApi(apiName: string, api: object): any;
}
