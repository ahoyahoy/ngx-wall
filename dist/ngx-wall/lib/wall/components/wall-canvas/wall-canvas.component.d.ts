import { ElementRef, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IWallModel } from '../../model/interfaces/wall-model.interface';
import { IWallRow } from '../../model/interfaces/wall-row.interface';
import { IFocusedBrick } from '../wall/interfaces/focused-brick.interface';
export declare class WallCanvasComponent implements OnChanges {
    wallModel: IWallModel;
    rows: IWallRow[];
    selectedBricks: string[];
    focusedBrick: IFocusedBrick;
    isMediaInteractionEnabled$: Observable<boolean>;
    canvasClick: EventEmitter<any>;
    onBrickStateChanged: EventEmitter<any>;
    focusedBrick$: Subject<IFocusedBrick>;
    selectedBricks$: Subject<string[]>;
    doc: any;
    expander: ElementRef;
    constructor(doc: any);
    onEditorClick(e: any): void;
    ngOnChanges(changes: SimpleChanges): void;
    brickStateChanged(brickId: string, brickState: any): void;
    trackRowsBy(index: any, item: any): string;
}
