import { Subscription } from 'rxjs';
import { IFocusContext } from './wall-component/wall-component-focus-context.interface';
export interface IWallUiApi {
    selectBrick(brickId: string): void;
    selectBricks(brickIds: string[]): void;
    addBrickToSelection(brickId: string): void;
    removeBrickFromSelection(brickId: string): void;
    unSelectBricks(): void;
    focusOnBrickId(brickId: string, focusContext?: IFocusContext): any;
    getFocusedBrickId(): string;
    focusOnPreviousTextBrick(brickId: string, focusContext?: IFocusContext): any;
    focusOnNextTextBrick(brickId: string, focusContext?: IFocusContext): any;
    removeBrick(brickId: string): void;
    removeBricks(brickIds: string[]): void;
    getSelectedBrickIds(): string[];
    enableMediaInteraction(): void;
    disableMediaInteraction(): void;
    subscribe(callback: any): Subscription;
}
