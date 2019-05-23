export declare class Base64ToFile {
    private base64;
    private fileName;
    constructor(base64: string, fileName: string);
    getFile(): File;
}
