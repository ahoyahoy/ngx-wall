export declare class PickOutAreaModel {
    initialBrickId: string;
    currentBrickId: string;
    initialX: number;
    initialY: number;
    previousClientX: number;
    previousClientY: number;
    x: number;
    y: number;
    clientX: number;
    clientY: number;
    width: number;
    height: number;
    isPickOutProcessInitialized: boolean;
    scrollableContainer: HTMLElement;
    private minimumMoveDistance;
    constructor(scrollableContainer: HTMLElement, x: number, y: number, overBrickId: string);
    recalculatePositionAndSize(): void;
    updateCurrentClientPosition(clientX: number, clientY: number): void;
    updateCurrentBrickId(brickId: string): void;
    canInitiatePickOutProcess(): boolean;
    initiatePickOutProcess(): void;
    private updatePickOutAreaPositionAndSize;
    private isMouseMovedEnough;
}
