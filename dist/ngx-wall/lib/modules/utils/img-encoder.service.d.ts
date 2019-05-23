export declare class ImgEncoder {
    private image;
    constructor(image: File);
    getBase64Representation(): Promise<string>;
}
