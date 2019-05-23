/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WallModelFactory } from './factory/wall-model.factory';
import { BrickRegistry } from './registry/brick-registry.service';
import { MatIconModule } from '@angular/material';
import { PlaceholderRendererModule } from '../modules/components/placeholder-renderer/placeholder-renderer.module';
import { WallCanvasBrickComponent } from './components/wall-canvas/components/wall-canvas-brick/wall-canvas-brick.component';
import { WallCanvasRowComponent } from './components/wall-canvas/components/wall-canvas-row/wall-canvas-row.component';
import { WallCanvasComponent } from './components/wall-canvas/wall-canvas.component';
import { WallComponent } from './components/wall/wall.component';
import { TowModule } from '../modules/tow/tow.module';
import { RadarModule } from '../modules/radar/radar.module';
import { PickOutModule } from '../modules/pick-out/pick-out.module';
var WallModule = /** @class */ (function () {
    function WallModule() {
    }
    /**
     * @return {?}
     */
    WallModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: WallModule,
            providers: [
                BrickRegistry,
                WallModelFactory
            ]
        };
    };
    WallModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        PickOutModule,
                        TowModule,
                        RadarModule,
                        PlaceholderRendererModule,
                        MatIconModule
                    ],
                    declarations: [
                        WallComponent,
                        WallCanvasComponent,
                        WallCanvasRowComponent,
                        WallCanvasBrickComponent
                    ],
                    exports: [
                        WallComponent
                    ]
                },] }
    ];
    return WallModule;
}());
export { WallModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi93YWxsL3dhbGwubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFzQixRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDOUQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBQ2hFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNoRCxPQUFPLEVBQUMseUJBQXlCLEVBQUMsTUFBTSx3RUFBd0UsQ0FBQztBQUNqSCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxtRkFBbUYsQ0FBQztBQUMzSCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSwrRUFBK0UsQ0FBQztBQUNySCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxnREFBZ0QsQ0FBQztBQUNuRixPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDL0QsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUMxRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFFbEU7SUFBQTtJQStCQSxDQUFDOzs7O0lBVFUsa0JBQU87OztJQUFkO1FBQ0ksT0FBTztZQUNILFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFNBQVMsRUFBRTtnQkFDUCxhQUFhO2dCQUNiLGdCQUFnQjthQUNuQjtTQUNKLENBQUM7SUFDTixDQUFDOztnQkE5QkosUUFBUSxTQUFDO29CQUNOLE9BQU8sRUFBRTt3QkFDTCxZQUFZO3dCQUNaLGFBQWE7d0JBQ2IsU0FBUzt3QkFDVCxXQUFXO3dCQUNYLHlCQUF5Qjt3QkFDekIsYUFBYTtxQkFDaEI7b0JBRUQsWUFBWSxFQUFFO3dCQUNWLGFBQWE7d0JBQ2IsbUJBQW1CO3dCQUNuQixzQkFBc0I7d0JBQ3RCLHdCQUF3QjtxQkFDM0I7b0JBRUQsT0FBTyxFQUFFO3dCQUNMLGFBQWE7cUJBQ2hCO2lCQUNKOztJQVdELGlCQUFDO0NBQUEsQUEvQkQsSUErQkM7U0FWWSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7V2FsbE1vZGVsRmFjdG9yeX0gZnJvbSAnLi9mYWN0b3J5L3dhbGwtbW9kZWwuZmFjdG9yeSc7XG5pbXBvcnQge0JyaWNrUmVnaXN0cnl9IGZyb20gJy4vcmVnaXN0cnkvYnJpY2stcmVnaXN0cnkuc2VydmljZSc7XG5pbXBvcnQge01hdEljb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7UGxhY2Vob2xkZXJSZW5kZXJlck1vZHVsZX0gZnJvbSAnLi4vbW9kdWxlcy9jb21wb25lbnRzL3BsYWNlaG9sZGVyLXJlbmRlcmVyL3BsYWNlaG9sZGVyLXJlbmRlcmVyLm1vZHVsZSc7XG5pbXBvcnQge1dhbGxDYW52YXNCcmlja0NvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL3dhbGwtY2FudmFzL2NvbXBvbmVudHMvd2FsbC1jYW52YXMtYnJpY2svd2FsbC1jYW52YXMtYnJpY2suY29tcG9uZW50JztcbmltcG9ydCB7V2FsbENhbnZhc1Jvd0NvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL3dhbGwtY2FudmFzL2NvbXBvbmVudHMvd2FsbC1jYW52YXMtcm93L3dhbGwtY2FudmFzLXJvdy5jb21wb25lbnQnO1xuaW1wb3J0IHtXYWxsQ2FudmFzQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvd2FsbC1jYW52YXMvd2FsbC1jYW52YXMuY29tcG9uZW50JztcbmltcG9ydCB7V2FsbENvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL3dhbGwvd2FsbC5jb21wb25lbnQnO1xuaW1wb3J0IHtUb3dNb2R1bGV9IGZyb20gJy4uL21vZHVsZXMvdG93L3Rvdy5tb2R1bGUnO1xuaW1wb3J0IHtSYWRhck1vZHVsZX0gZnJvbSAnLi4vbW9kdWxlcy9yYWRhci9yYWRhci5tb2R1bGUnO1xuaW1wb3J0IHtQaWNrT3V0TW9kdWxlfSBmcm9tICcuLi9tb2R1bGVzL3BpY2stb3V0L3BpY2stb3V0Lm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIFBpY2tPdXRNb2R1bGUsXG4gICAgICAgIFRvd01vZHVsZSxcbiAgICAgICAgUmFkYXJNb2R1bGUsXG4gICAgICAgIFBsYWNlaG9sZGVyUmVuZGVyZXJNb2R1bGUsXG4gICAgICAgIE1hdEljb25Nb2R1bGVcbiAgICBdLFxuXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFdhbGxDb21wb25lbnQsXG4gICAgICAgIFdhbGxDYW52YXNDb21wb25lbnQsXG4gICAgICAgIFdhbGxDYW52YXNSb3dDb21wb25lbnQsXG4gICAgICAgIFdhbGxDYW52YXNCcmlja0NvbXBvbmVudFxuICAgIF0sXG5cbiAgICBleHBvcnRzOiBbXG4gICAgICAgIFdhbGxDb21wb25lbnRcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFdhbGxNb2R1bGUge1xuICAgIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmdNb2R1bGU6IFdhbGxNb2R1bGUsXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgICAgICBCcmlja1JlZ2lzdHJ5LFxuICAgICAgICAgICAgICAgIFdhbGxNb2RlbEZhY3RvcnlcbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICB9XG59XG4iXX0=