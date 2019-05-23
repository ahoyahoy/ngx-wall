import { BaseTextBrickComponent } from '../base-text-brick.component';
export declare class RightKeyHandler {
    private baseTextBrickComponent;
    constructor(baseTextBrickComponent: BaseTextBrickComponent);
    execute(e: KeyboardEvent): void;
}
