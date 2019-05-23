import { IWallFileUploader } from '../../modules/file-uploader/file-uploader';
import { IBrickSnapshot } from '../../wall/wall';
export declare class ImgModel {
    private wallFileUploader;
    constructor(wallFileUploader: IWallFileUploader);
    remove(brickSnapshot: IBrickSnapshot): Promise<any>;
}
