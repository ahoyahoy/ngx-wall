/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { StickyModalModule } from 'ngx-sticky-modal';
import { CodeBrickComponent } from './component/code-brick.component';
import { ModeListComponent } from './mode-list/mode-list.component';
import { MatButtonModule, MatListModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { WallModule } from '../../wall/wall.module';
import { BrickRegistry } from '../../wall/registry/brick-registry.service';
import { HelperComponentsModule } from '../../modules/helper-components/helper-components.module';
export class CodeBrickModule {
    /**
     * @param {?} brickRegistry
     */
    constructor(brickRegistry) {
        this.brickRegistry = brickRegistry;
        this.brickRegistry.register({
            tag: 'code',
            component: CodeBrickComponent,
            name: 'Code',
            description: 'Capture a code snippet'
        });
    }
}
CodeBrickModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    WallModule,
                    HelperComponentsModule,
                    StickyModalModule,
                    MatButtonModule,
                    MatListModule
                ],
                declarations: [
                    CodeBrickComponent,
                    ModeListComponent
                ],
                entryComponents: [
                    CodeBrickComponent,
                    ModeListComponent
                ]
            },] }
];
/** @nocollapse */
CodeBrickModule.ctorParameters = () => [
    { type: BrickRegistry }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    CodeBrickModule.prototype.brickRegistry;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS1icmljay5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9icmlja3MvY29kZS1icmljay9jb2RlLWJyaWNrLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUNuRCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUNwRSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRSxPQUFPLEVBQUMsZUFBZSxFQUFFLGFBQWEsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDbEQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDRDQUE0QyxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLDBEQUEwRCxDQUFDO0FBb0JoRyxNQUFNLE9BQU8sZUFBZTs7OztJQUN4QixZQUFvQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztZQUN4QixHQUFHLEVBQUUsTUFBTTtZQUNYLFNBQVMsRUFBRSxrQkFBa0I7WUFDN0IsSUFBSSxFQUFFLE1BQU07WUFDWixXQUFXLEVBQUUsd0JBQXdCO1NBQ3hDLENBQUMsQ0FBQztJQUNQLENBQUM7OztZQTFCSixRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFO29CQUNMLFlBQVk7b0JBQ1osVUFBVTtvQkFDVixzQkFBc0I7b0JBQ3RCLGlCQUFpQjtvQkFDakIsZUFBZTtvQkFDZixhQUFhO2lCQUNoQjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1Ysa0JBQWtCO29CQUNsQixpQkFBaUI7aUJBQ3BCO2dCQUNELGVBQWUsRUFBRTtvQkFDYixrQkFBa0I7b0JBQ2xCLGlCQUFpQjtpQkFDcEI7YUFDSjs7OztZQXBCTyxhQUFhOzs7Ozs7O0lBc0JMLHdDQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdGlja3lNb2RhbE1vZHVsZX0gZnJvbSAnbmd4LXN0aWNreS1tb2RhbCc7XG5pbXBvcnQge0NvZGVCcmlja0NvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnQvY29kZS1icmljay5jb21wb25lbnQnO1xuaW1wb3J0IHtNb2RlTGlzdENvbXBvbmVudH0gZnJvbSAnLi9tb2RlLWxpc3QvbW9kZS1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQge01hdEJ1dHRvbk1vZHVsZSwgTWF0TGlzdE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1dhbGxNb2R1bGV9IGZyb20gJy4uLy4uL3dhbGwvd2FsbC5tb2R1bGUnO1xuaW1wb3J0IHtCcmlja1JlZ2lzdHJ5fSBmcm9tICcuLi8uLi93YWxsL3JlZ2lzdHJ5L2JyaWNrLXJlZ2lzdHJ5LnNlcnZpY2UnO1xuaW1wb3J0IHtIZWxwZXJDb21wb25lbnRzTW9kdWxlfSBmcm9tICcuLi8uLi9tb2R1bGVzL2hlbHBlci1jb21wb25lbnRzL2hlbHBlci1jb21wb25lbnRzLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIFdhbGxNb2R1bGUsXG4gICAgICAgIEhlbHBlckNvbXBvbmVudHNNb2R1bGUsXG4gICAgICAgIFN0aWNreU1vZGFsTW9kdWxlLFxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgICAgIE1hdExpc3RNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBDb2RlQnJpY2tDb21wb25lbnQsXG4gICAgICAgIE1vZGVMaXN0Q29tcG9uZW50XG4gICAgXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICAgICAgQ29kZUJyaWNrQ29tcG9uZW50LFxuICAgICAgICBNb2RlTGlzdENvbXBvbmVudFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgQ29kZUJyaWNrTW9kdWxlIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJyaWNrUmVnaXN0cnk6IEJyaWNrUmVnaXN0cnkpIHtcbiAgICAgICAgdGhpcy5icmlja1JlZ2lzdHJ5LnJlZ2lzdGVyKHtcbiAgICAgICAgICAgIHRhZzogJ2NvZGUnLFxuICAgICAgICAgICAgY29tcG9uZW50OiBDb2RlQnJpY2tDb21wb25lbnQsXG4gICAgICAgICAgICBuYW1lOiAnQ29kZScsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0NhcHR1cmUgYSBjb2RlIHNuaXBwZXQnXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==