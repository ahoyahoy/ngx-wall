import { BrickRegistry } from '../registry/brick-registry.service';
import { IWallModel } from '../model/interfaces/wall-model.interface';
import { IWallModelConfig } from '../model/interfaces/wall-model-config.interface';
export declare class WallModelFactory {
    private brickRegistry;
    constructor(brickRegistry: BrickRegistry);
    create(config?: IWallModelConfig): IWallModel;
}
