import { Subject } from 'rxjs';
import { Radar } from '../radar/radar.service';
export declare class PickOutCoordinator {
    private radar;
    changes: Subject<any>;
    private isPickOutAllowed;
    constructor(radar: Radar);
    disablePickOut(): void;
    enablePickOut(): void;
    stopPickOut(): void;
    startPickOut(): void;
    pickOutChanged(range: any): void;
    endPickOut(): void;
    private getSelectedItemIds;
}
