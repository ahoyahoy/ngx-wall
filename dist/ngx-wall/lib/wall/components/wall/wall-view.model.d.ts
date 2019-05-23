import { Observable, Subject, Subscription } from 'rxjs';
import { IFocusedBrick } from './interfaces/focused-brick.interface';
import { IWallUiApi } from './interfaces/ui-api.interface';
import { IFocusContext } from './interfaces/wall-component/wall-component-focus-context.interface';
import { IWallModel } from '../../model/interfaces/wall-model.interface';
import { BrickRegistry } from '../../registry/brick-registry.service';
import { IWallRow } from '../../model/interfaces/wall-row.interface';
export declare class WallViewModel implements IWallUiApi {
    private brickRegistry;
    wallModel: IWallModel;
    events: Subject<any>;
    focusedBrick: IFocusedBrick;
    selectedBricks: string[];
    isMediaInteractionEnabled$: Observable<boolean>;
    canvasLayout: IWallRow[];
    private wallModelSubscription;
    constructor(brickRegistry: BrickRegistry);
    getCanvasLayout(): IWallRow[];
    initialize(wallModel: IWallModel): void;
    /**
     * @public-api
     */
    selectBrick(brickId: string): void;
    /**
     * @public-api
     */
    selectBricks(brickIds: string[]): void;
    /**
     * @deprecated
     * @public-api
     */
    addBrickToSelection(brickId: string): void;
    /**
     * @deprecated
     * @public-api
     */
    removeBrickFromSelection(brickId: string): void;
    /**
     * @public-api
     */
    unSelectBricks(): void;
    /**
     * @public-api
     */
    getSelectedBrickIds(): string[];
    /**
     * @public-api
     */
    getFocusedBrickId(): string;
    /**
     * @public-api
     */
    focusOnBrickId(brickId: string, focusContext?: IFocusContext): void;
    /**
     * @public-api
     */
    focusOnPreviousTextBrick(brickId: string, focusContext?: IFocusContext): void;
    /**
     * @public-api
     */
    focusOnNextTextBrick(brickId: string, focusContext?: IFocusContext): void;
    /**
     * @public-api
     */
    enableMediaInteraction(): void;
    /**
     * @public-api
     */
    disableMediaInteraction(): void;
    /**
     * @public-api
     */
    subscribe(callback: any): Subscription;
    /**
     * @public-api
     */
    removeBrick(brickId: string): void;
    /**
     * @public-api
     */
    removeBricks(brickIds: string[]): void;
    onCanvasClick(): void;
    onBrickStateChanged(brickId: string, brickState: any): void;
    reset(): void;
    private dispatch;
}
