import { Subscription } from 'rxjs';
import { IWallModelConfig } from './interfaces/wall-model-config.interface';
import { IWallModel } from './interfaces/wall-model.interface';
import { IWallCorePluginApi } from './interfaces/wall-core-plugin-api.interface';
import { BrickRegistry } from '../registry/brick-registry.service';
export declare class WallModel implements IWallModel {
    private brickRegistry;
    version: '0.0.0';
    api: {
        [apiName: string]: any;
        core: IWallCorePluginApi;
    };
    private events$;
    private plugins;
    constructor(brickRegistry: BrickRegistry, config: IWallModelConfig);
    registerApi(apiName: string, api: object): void;
    destroy(): void;
    subscribe(callback: any): Subscription;
    private dispatch;
    private initializePlugin;
    private destroyPlugin;
}
