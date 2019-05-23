/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PickOutAreaComponent } from './pick-out-area/pick-out-area.component';
import { PickOutAreaDirective } from './pick-out-area/pick-out-area.directive';
import { PickOutCoordinator } from './pick-out-coordinator.service';
import { PickOutService } from './pick-out.service';
import { RadarModule } from '../radar/radar.module';
export class PickOutModule {
}
PickOutModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    RadarModule
                ],
                declarations: [
                    PickOutAreaComponent,
                    PickOutAreaDirective
                ],
                providers: [
                    PickOutService,
                    PickOutCoordinator
                ],
                exports: [
                    PickOutAreaDirective
                ],
                entryComponents: [
                    PickOutAreaComponent
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGljay1vdXQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvbW9kdWxlcy9waWNrLW91dC9waWNrLW91dC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBQzdFLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBQzdFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUEyQmxELE1BQU0sT0FBTyxhQUFhOzs7WUF6QnpCLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUU7b0JBQ0wsWUFBWTtvQkFDWixXQUFXO2lCQUNkO2dCQUVELFlBQVksRUFBRTtvQkFDVixvQkFBb0I7b0JBQ3BCLG9CQUFvQjtpQkFDdkI7Z0JBRUQsU0FBUyxFQUFFO29CQUNQLGNBQWM7b0JBQ2Qsa0JBQWtCO2lCQUNyQjtnQkFFRCxPQUFPLEVBQUU7b0JBQ0wsb0JBQW9CO2lCQUN2QjtnQkFFRCxlQUFlLEVBQUU7b0JBQ2Isb0JBQW9CO2lCQUN2QjthQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7UGlja091dEFyZWFDb21wb25lbnR9IGZyb20gJy4vcGljay1vdXQtYXJlYS9waWNrLW91dC1hcmVhLmNvbXBvbmVudCc7XG5pbXBvcnQge1BpY2tPdXRBcmVhRGlyZWN0aXZlfSBmcm9tICcuL3BpY2stb3V0LWFyZWEvcGljay1vdXQtYXJlYS5kaXJlY3RpdmUnO1xuaW1wb3J0IHtQaWNrT3V0Q29vcmRpbmF0b3J9IGZyb20gJy4vcGljay1vdXQtY29vcmRpbmF0b3Iuc2VydmljZSc7XG5pbXBvcnQge1BpY2tPdXRTZXJ2aWNlfSBmcm9tICcuL3BpY2stb3V0LnNlcnZpY2UnO1xuaW1wb3J0IHtSYWRhck1vZHVsZX0gZnJvbSAnLi4vcmFkYXIvcmFkYXIubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgUmFkYXJNb2R1bGVcbiAgICBdLFxuXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFBpY2tPdXRBcmVhQ29tcG9uZW50LFxuICAgICAgICBQaWNrT3V0QXJlYURpcmVjdGl2ZVxuICAgIF0sXG5cbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgUGlja091dFNlcnZpY2UsXG4gICAgICAgIFBpY2tPdXRDb29yZGluYXRvclxuICAgIF0sXG5cbiAgICBleHBvcnRzOiBbXG4gICAgICAgIFBpY2tPdXRBcmVhRGlyZWN0aXZlXG4gICAgXSxcblxuICAgIGVudHJ5Q29tcG9uZW50czogW1xuICAgICAgICBQaWNrT3V0QXJlYUNvbXBvbmVudFxuICAgIF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBQaWNrT3V0TW9kdWxlIHtcbn1cbiJdfQ==