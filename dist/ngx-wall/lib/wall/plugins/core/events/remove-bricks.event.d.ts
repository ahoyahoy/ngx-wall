import { IBrickSnapshot } from '../../../model/interfaces/brick-snapshot.interface';
export declare class RemoveBricksEvent {
    bricks: IBrickSnapshot[];
    previousBrickId: string;
    nextBrickId: string;
    constructor(bricks: IBrickSnapshot[], previousBrickId: string, nextBrickId: string);
}
