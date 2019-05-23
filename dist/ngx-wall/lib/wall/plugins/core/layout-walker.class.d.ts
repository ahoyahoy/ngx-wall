import { BrickRegistry } from '../../registry/brick-registry.service';
import { WallBrick } from '../../model/wall-brick.model';
import { IWallRow } from '../../model/interfaces/wall-row.interface';
import { IBrickSnapshot } from '../../model/interfaces/brick-snapshot.interface';
export declare class LayoutWalker {
    private brickRegistry;
    rows: IWallRow[];
    constructor(brickRegistry: BrickRegistry);
    getRowCount(): number;
    isBrickAheadOf(firstBrickId: string, secondBrickId: string): boolean;
    getBrickTag(brickId: string): string;
    getBrickById(brickId: string): WallBrick;
    getBrickIds(): string[];
    filterBricks(predictor: (brick: IBrickSnapshot) => boolean): WallBrick[];
    getBrickPosition(brickId: string): {
        rowIndex: any;
        columnIndex: any;
        brickIndex: any;
    };
    getColumnCount(rowIndex: number): number;
    getBricksCount(): number;
    getNextBrick(brickId: string): WallBrick;
    getNextBrickId(brickId: string): string;
    getPreviousBrick(brickId: string): WallBrick;
    getPreviousBrickId(brickId: string): string;
    getBrickSequence(predicate: any): WallBrick[];
    getNextTextBrickId(brickId: string): string;
    getPreviousTextBrickId(brickId: string): string;
    getNextTextBrick(brickId: string): WallBrick;
    getPreviousTextBrick(brickId: string): WallBrick;
    findBricksAfter(brickId: string, predicate: any): WallBrick[];
    findBrickBefore(brickId: string, predicate: any): any[];
    setLayout(rows: IWallRow[]): void;
    traverse(fn: (row: IWallRow) => void): void;
}
