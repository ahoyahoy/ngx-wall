export declare class CursorPositionInLine {
    private leftText;
    private rightText;
    private targetNode;
    isOnLastLine: boolean;
    isOnFirstLine: boolean;
    constructor(leftText: string, rightText: string, targetNode: HTMLElement);
    private createElementClone;
}
