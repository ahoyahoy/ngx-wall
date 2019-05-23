import { Subscription } from 'rxjs';
import { IWallDefinition } from '../../model/interfaces/wall-definition.interface';
import { BrickRegistry } from '../../registry/brick-registry.service';
import { IWallPlugin } from '../../model/interfaces/wall-plugin.interface';
import { IWallModel } from '../../model/interfaces/wall-model.interface';
import { IBrickSnapshot } from '../../model/interfaces/brick-snapshot.interface';
export declare class WallCorePlugin implements IWallPlugin {
    private brickRegistry;
    name: string;
    version: string;
    private layout;
    private layoutWalker;
    private wallModel;
    private DEFAULT_BRICK;
    private events;
    constructor(brickRegistry: BrickRegistry);
    onWallInitialize(wallModel: IWallModel): void;
    setPlan(plan: IWallDefinition): void;
    addBrickAfterBrickId(brickId: string, tag: string, state?: any): IBrickSnapshot;
    addBrickBeforeBrickId(brickId: string, tag: string, state?: any): IBrickSnapshot;
    addDefaultBrick(): void;
    addBrickAtStart(tag: string, state?: any): IBrickSnapshot;
    updateBrickState(brickId: any, brickState: any): void;
    removeBrick(brickId: string): void;
    removeBricks(brickIds: any): void;
    /**
     * Remove all bricks from layout
     * Clear all bricks external dependencies
     */
    clear(): Promise<any>;
    turnBrickInto(brickId: string, newTag: string, state?: any): void;
    moveBrickAfterBrickId(movedBrickIds: string[], afterBrickId: string): void;
    moveBrickBeforeBrickId(movedBrickIds: string[], beforeBrickId: string): void;
    moveBrickToNewColumn(targetBrickIds: string[], beforeBrickId: string, side: string): void;
    getPlan(): IWallDefinition;
    sortBrickIdsByLayoutOrder(brickIds: string[]): string[];
    traverse(fn: any): void;
    getBrickSnapshot(brickId: string): IBrickSnapshot;
    getBrickResourcePaths(brickId: string): string[];
    getBrickTextRepresentation(brickId: string): string;
    subscribe(callback: any): Subscription;
    isRegisteredBrick(tag: string): boolean;
    private dispatch;
    private createBrick;
    private restoreBrick;
    private clearBrickResources;
    private generateGuid;
}
