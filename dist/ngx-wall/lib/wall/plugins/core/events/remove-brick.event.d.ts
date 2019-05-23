import { IBrickSnapshot } from '../../../model/interfaces/brick-snapshot.interface';
export declare class RemoveBrickEvent {
    brick: IBrickSnapshot;
    previousBrickId: string;
    nextBrickId: string;
    constructor(brick: IBrickSnapshot, previousBrickId: string, nextBrickId: string);
}
