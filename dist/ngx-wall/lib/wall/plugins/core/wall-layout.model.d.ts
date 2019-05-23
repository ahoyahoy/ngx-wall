import { BrickRegistry } from '../../registry/public_api';
import { WallBrick } from '../../model/wall-brick.model';
import { IWallRow } from '../../model/interfaces/wall-row.interface';
import { LayoutWalker } from './layout-walker.class';
export declare class WallLayout {
    private brickRegistry;
    private layoutWalker;
    rows: IWallRow[];
    constructor(brickRegistry: BrickRegistry, layoutWalker: LayoutWalker);
    addBrickToNewRow(rowIndex: number, brick: WallBrick, rowId?: string): void;
    addBrickToExistingColumn(rowIndex: number, columnIndex: number, brickIndex: number, brick: WallBrick): void;
    addBrickToNewColumn(rowIndex: any, columnIndex: any, brick: WallBrick): void;
    moveBrickAfterInNewRow(afterBrickId: string, movedBrickIds: string[]): void;
    moveBrickAfterInSameColumn(afterBrickId: string, movedBrickIds: string[]): void;
    moveBrickBeforeInNewRow(beforeBrickId: string, movedBrickIds: string[]): void;
    moveBrickBeforeInSameColumn(beforeBrickId: string, movedBrickIds: string[]): void;
    moveBrickToNewColumn(movedBrickIds: any, beforeBrickId: any, side: any): void;
    removeBrick(brickId: string): void;
    private addBrick;
    private getColumn;
    private createNewRow;
    private createNewColumn;
    private initializeNewRow;
    private initializeNewColumn;
    private generateId;
}
