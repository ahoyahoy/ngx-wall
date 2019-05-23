import { Subject, Subscription } from 'rxjs';
import { TowCoordinator } from './tow-coordinator.service';
export declare class TowService {
    private towCoordinator;
    events: Subject<any>;
    constructor(towCoordinator: TowCoordinator);
    subscribe(fn: any): Subscription;
}
