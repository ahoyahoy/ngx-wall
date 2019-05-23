import { Subject } from 'rxjs';
export declare class TowCoordinator {
    events: Subject<any>;
    private isSlaveWorking;
    constructor();
    slaveStartWorking(id: string): void;
    slaveWorkProgress(clientX: number, clientY: number): void;
    slaveStopWorking(id: any): void;
}
