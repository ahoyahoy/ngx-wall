import { BaseTextBrickComponent } from '../base-text-brick.component';
export declare class EnterKeyHandler {
    private baseTextBrickComponent;
    constructor(baseTextBrickComponent: BaseTextBrickComponent);
    execute(e: KeyboardEvent): void;
    private splitBrickForTwoPart;
    private addEmptyTextBrickBefore;
    private addEmptyBrickAfter;
    private addBrickAfter;
}
