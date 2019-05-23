import { IBrickSnapshot } from './interfaces/brick-snapshot.interface';
export declare class WallBrick {
    id: string;
    tag: string;
    meta: any;
    state: any;
    constructor(id: string, tag: string, meta: any);
    getState(): any;
    updateState(newState: any): this;
    turnInto(tag: string): this;
    getSnapshot(): IBrickSnapshot;
}
