import { Subject, Subscription } from 'rxjs';
import { PickOutCoordinator } from './pick-out-coordinator.service';
export declare class PickOutService {
    private pickOutHandlerService;
    events: Subject<any>;
    constructor(pickOutHandlerService: PickOutCoordinator);
    enablePickOut(): void;
    disablePickOut(): void;
    stopPickOut(): void;
    subscribe(fn: any): Subscription;
}
