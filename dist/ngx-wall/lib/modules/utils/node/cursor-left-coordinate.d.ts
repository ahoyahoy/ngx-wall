export declare class CursorLeftCoordinate {
    private leftText;
    private rightText;
    private targetNode;
    constructor(leftText: string, rightText: string, targetNode: HTMLElement);
    get(): number;
    private createElementClone;
}
