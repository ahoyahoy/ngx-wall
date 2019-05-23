/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { SpotDirective } from './directive/spot.directive';
import { RadarCoordinator } from './radar-coordinator.service';
import { Radar } from './radar.service';
export class RadarModule {
}
RadarModule.decorators = [
    { type: NgModule, args: [{
                exports: [SpotDirective],
                declarations: [SpotDirective],
                providers: [
                    Radar,
                    RadarCoordinator
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkYXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvbW9kdWxlcy9yYWRhci9yYWRhci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQVV0QyxNQUFNLE9BQU8sV0FBVzs7O1lBUnZCLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUUsQ0FBQyxhQUFhLENBQUM7Z0JBQ3hCLFlBQVksRUFBRSxDQUFDLGFBQWEsQ0FBQztnQkFDN0IsU0FBUyxFQUFFO29CQUNQLEtBQUs7b0JBQ0wsZ0JBQWdCO2lCQUNuQjthQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1Nwb3REaXJlY3RpdmV9IGZyb20gJy4vZGlyZWN0aXZlL3Nwb3QuZGlyZWN0aXZlJztcbmltcG9ydCB7UmFkYXJDb29yZGluYXRvcn0gZnJvbSAnLi9yYWRhci1jb29yZGluYXRvci5zZXJ2aWNlJztcbmltcG9ydCB7UmFkYXJ9IGZyb20gJy4vcmFkYXIuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgZXhwb3J0czogW1Nwb3REaXJlY3RpdmVdLFxuICAgIGRlY2xhcmF0aW9uczogW1Nwb3REaXJlY3RpdmVdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBSYWRhcixcbiAgICAgICAgUmFkYXJDb29yZGluYXRvclxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgUmFkYXJNb2R1bGUge1xufVxuIl19