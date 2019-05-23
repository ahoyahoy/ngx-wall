import { OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { WallViewModel } from './wall-view.model';
import { IWallModel } from '../../model/interfaces/wall-model.interface';
import { IWallConfiguration } from './interfaces/wall-configuration.interface';
export declare class WallComponent implements OnChanges, OnDestroy {
    wallViewModel: WallViewModel;
    model: IWallModel;
    configuration: IWallConfiguration;
    constructor(wallViewModel: WallViewModel);
    onCanvasClick(): void;
    onBrickStateChanged(event: any): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private initialize;
    private cleanUp;
}
