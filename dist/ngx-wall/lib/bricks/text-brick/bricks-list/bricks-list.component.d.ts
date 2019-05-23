import { OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { BrickRegistry, IBrickDefinition, IBrickSpecification } from '../../../wall/wall';
export interface IBricksListComponentConfig {
    text$: Observable<string>;
    up$: Observable<any>;
    down$: Observable<any>;
    enter$: Observable<any>;
    selectedTag$: Subject<string>;
}
export declare class BricksListComponent implements OnInit, OnDestroy {
    private brickRegistry;
    config: IBricksListComponentConfig;
    selectedTag$: BehaviorSubject<string>;
    bricksList$: BehaviorSubject<IBrickSpecification[]>;
    private subscriptions;
    constructor(brickRegistry: BrickRegistry, config: IBricksListComponentConfig);
    ngOnInit(): void;
    onBrickSelected(brickDescription: IBrickDefinition): void;
    trackByFn(index: any, item: any): any;
    ngOnDestroy(): void;
    private notifySelectedTag;
    private updateBricksList;
    private onNavigationUpDownHandler;
}
