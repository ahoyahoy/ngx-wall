/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
export class WallModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: WallModule,
            providers: [
                BrickRegistry,
                WallModelFactory
            ]
        };
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi93YWxsL3dhbGwubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFzQixRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDOUQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBQ2hFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNoRCxPQUFPLEVBQUMseUJBQXlCLEVBQUMsTUFBTSx3RUFBd0UsQ0FBQztBQUNqSCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxtRkFBbUYsQ0FBQztBQUMzSCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSwrRUFBK0UsQ0FBQztBQUNySCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxnREFBZ0QsQ0FBQztBQUNuRixPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDL0QsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUMxRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0scUNBQXFDLENBQUM7QUF1QmxFLE1BQU0sT0FBTyxVQUFVOzs7O0lBQ25CLE1BQU0sQ0FBQyxPQUFPO1FBQ1YsT0FBTztZQUNILFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFNBQVMsRUFBRTtnQkFDUCxhQUFhO2dCQUNiLGdCQUFnQjthQUNuQjtTQUNKLENBQUM7SUFDTixDQUFDOzs7WUE5QkosUUFBUSxTQUFDO2dCQUNOLE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLGFBQWE7b0JBQ2IsU0FBUztvQkFDVCxXQUFXO29CQUNYLHlCQUF5QjtvQkFDekIsYUFBYTtpQkFDaEI7Z0JBRUQsWUFBWSxFQUFFO29CQUNWLGFBQWE7b0JBQ2IsbUJBQW1CO29CQUNuQixzQkFBc0I7b0JBQ3RCLHdCQUF3QjtpQkFDM0I7Z0JBRUQsT0FBTyxFQUFFO29CQUNMLGFBQWE7aUJBQ2hCO2FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtXYWxsTW9kZWxGYWN0b3J5fSBmcm9tICcuL2ZhY3Rvcnkvd2FsbC1tb2RlbC5mYWN0b3J5JztcbmltcG9ydCB7QnJpY2tSZWdpc3RyeX0gZnJvbSAnLi9yZWdpc3RyeS9icmljay1yZWdpc3RyeS5zZXJ2aWNlJztcbmltcG9ydCB7TWF0SWNvbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHtQbGFjZWhvbGRlclJlbmRlcmVyTW9kdWxlfSBmcm9tICcuLi9tb2R1bGVzL2NvbXBvbmVudHMvcGxhY2Vob2xkZXItcmVuZGVyZXIvcGxhY2Vob2xkZXItcmVuZGVyZXIubW9kdWxlJztcbmltcG9ydCB7V2FsbENhbnZhc0JyaWNrQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvd2FsbC1jYW52YXMvY29tcG9uZW50cy93YWxsLWNhbnZhcy1icmljay93YWxsLWNhbnZhcy1icmljay5jb21wb25lbnQnO1xuaW1wb3J0IHtXYWxsQ2FudmFzUm93Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvd2FsbC1jYW52YXMvY29tcG9uZW50cy93YWxsLWNhbnZhcy1yb3cvd2FsbC1jYW52YXMtcm93LmNvbXBvbmVudCc7XG5pbXBvcnQge1dhbGxDYW52YXNDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy93YWxsLWNhbnZhcy93YWxsLWNhbnZhcy5jb21wb25lbnQnO1xuaW1wb3J0IHtXYWxsQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvd2FsbC93YWxsLmNvbXBvbmVudCc7XG5pbXBvcnQge1Rvd01vZHVsZX0gZnJvbSAnLi4vbW9kdWxlcy90b3cvdG93Lm1vZHVsZSc7XG5pbXBvcnQge1JhZGFyTW9kdWxlfSBmcm9tICcuLi9tb2R1bGVzL3JhZGFyL3JhZGFyLm1vZHVsZSc7XG5pbXBvcnQge1BpY2tPdXRNb2R1bGV9IGZyb20gJy4uL21vZHVsZXMvcGljay1vdXQvcGljay1vdXQubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgUGlja091dE1vZHVsZSxcbiAgICAgICAgVG93TW9kdWxlLFxuICAgICAgICBSYWRhck1vZHVsZSxcbiAgICAgICAgUGxhY2Vob2xkZXJSZW5kZXJlck1vZHVsZSxcbiAgICAgICAgTWF0SWNvbk1vZHVsZVxuICAgIF0sXG5cbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgV2FsbENvbXBvbmVudCxcbiAgICAgICAgV2FsbENhbnZhc0NvbXBvbmVudCxcbiAgICAgICAgV2FsbENhbnZhc1Jvd0NvbXBvbmVudCxcbiAgICAgICAgV2FsbENhbnZhc0JyaWNrQ29tcG9uZW50XG4gICAgXSxcblxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgV2FsbENvbXBvbmVudFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgV2FsbE1vZHVsZSB7XG4gICAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZ01vZHVsZTogV2FsbE1vZHVsZSxcbiAgICAgICAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAgICAgICAgIEJyaWNrUmVnaXN0cnksXG4gICAgICAgICAgICAgICAgV2FsbE1vZGVsRmFjdG9yeVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgIH1cbn1cbiJdfQ==