/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TowCoordinator } from './tow-coordinator.service';
import { TowSlaveDirective } from './tow-slave/tow-slave.directive';
import { TowService } from './tow.service';
import { RadarModule } from '../radar/radar.module';
export class TowModule {
}
TowModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    RadarModule
                ],
                declarations: [
                    TowSlaveDirective
                ],
                exports: [
                    TowSlaveDirective
                ],
                providers: [
                    TowService,
                    TowCoordinator
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG93Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL21vZHVsZXMvdG93L3Rvdy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQXFCbEQsTUFBTSxPQUFPLFNBQVM7OztZQW5CckIsUUFBUSxTQUFDO2dCQUNOLE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLFdBQVc7aUJBQ2Q7Z0JBRUQsWUFBWSxFQUFFO29CQUNWLGlCQUFpQjtpQkFDcEI7Z0JBRUQsT0FBTyxFQUFFO29CQUNMLGlCQUFpQjtpQkFDcEI7Z0JBRUQsU0FBUyxFQUFFO29CQUNQLFVBQVU7b0JBQ1YsY0FBYztpQkFDakI7YUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1Rvd0Nvb3JkaW5hdG9yfSBmcm9tICcuL3Rvdy1jb29yZGluYXRvci5zZXJ2aWNlJztcbmltcG9ydCB7VG93U2xhdmVEaXJlY3RpdmV9IGZyb20gJy4vdG93LXNsYXZlL3Rvdy1zbGF2ZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHtUb3dTZXJ2aWNlfSBmcm9tICcuL3Rvdy5zZXJ2aWNlJztcbmltcG9ydCB7UmFkYXJNb2R1bGV9IGZyb20gJy4uL3JhZGFyL3JhZGFyLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIFJhZGFyTW9kdWxlXG4gICAgXSxcblxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBUb3dTbGF2ZURpcmVjdGl2ZVxuICAgIF0sXG5cbiAgICBleHBvcnRzOiBbXG4gICAgICAgIFRvd1NsYXZlRGlyZWN0aXZlXG4gICAgXSxcblxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBUb3dTZXJ2aWNlLFxuICAgICAgICBUb3dDb29yZGluYXRvclxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgVG93TW9kdWxlIHtcbn1cbiJdfQ==