import { ImgModel } from './img-brick-destructor.class';
import { BrickRegistry } from '../../wall/registry/brick-registry.service';
export declare class ImgBrickModule {
    private brickRegistry;
    private imgModel;
    constructor(brickRegistry: BrickRegistry, imgModel: ImgModel);
}
