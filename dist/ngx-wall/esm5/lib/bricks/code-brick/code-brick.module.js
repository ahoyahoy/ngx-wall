/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
var CodeBrickModule = /** @class */ (function () {
    function CodeBrickModule(brickRegistry) {
        this.brickRegistry = brickRegistry;
        this.brickRegistry.register({
            tag: 'code',
            component: CodeBrickComponent,
            name: 'Code',
            description: 'Capture a code snippet'
        });
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
    CodeBrickModule.ctorParameters = function () { return [
        { type: BrickRegistry }
    ]; };
    return CodeBrickModule;
}());
export { CodeBrickModule };
if (false) {
    /**
     * @type {?}
     * @private
     */
    CodeBrickModule.prototype.brickRegistry;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS1icmljay5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9icmlja3MvY29kZS1icmljay9jb2RlLWJyaWNrLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUNuRCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUNwRSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRSxPQUFPLEVBQUMsZUFBZSxFQUFFLGFBQWEsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDbEQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDRDQUE0QyxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLDBEQUEwRCxDQUFDO0FBRWhHO0lBbUJJLHlCQUFvQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztZQUN4QixHQUFHLEVBQUUsTUFBTTtZQUNYLFNBQVMsRUFBRSxrQkFBa0I7WUFDN0IsSUFBSSxFQUFFLE1BQU07WUFDWixXQUFXLEVBQUUsd0JBQXdCO1NBQ3hDLENBQUMsQ0FBQztJQUNQLENBQUM7O2dCQTFCSixRQUFRLFNBQUM7b0JBQ04sT0FBTyxFQUFFO3dCQUNMLFlBQVk7d0JBQ1osVUFBVTt3QkFDVixzQkFBc0I7d0JBQ3RCLGlCQUFpQjt3QkFDakIsZUFBZTt3QkFDZixhQUFhO3FCQUNoQjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1Ysa0JBQWtCO3dCQUNsQixpQkFBaUI7cUJBQ3BCO29CQUNELGVBQWUsRUFBRTt3QkFDYixrQkFBa0I7d0JBQ2xCLGlCQUFpQjtxQkFDcEI7aUJBQ0o7Ozs7Z0JBcEJPLGFBQWE7O0lBOEJyQixzQkFBQztDQUFBLEFBM0JELElBMkJDO1NBVFksZUFBZTs7Ozs7O0lBQ1osd0NBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N0aWNreU1vZGFsTW9kdWxlfSBmcm9tICduZ3gtc3RpY2t5LW1vZGFsJztcbmltcG9ydCB7Q29kZUJyaWNrQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudC9jb2RlLWJyaWNrLmNvbXBvbmVudCc7XG5pbXBvcnQge01vZGVMaXN0Q29tcG9uZW50fSBmcm9tICcuL21vZGUtbGlzdC9tb2RlLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7TWF0QnV0dG9uTW9kdWxlLCBNYXRMaXN0TW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7V2FsbE1vZHVsZX0gZnJvbSAnLi4vLi4vd2FsbC93YWxsLm1vZHVsZSc7XG5pbXBvcnQge0JyaWNrUmVnaXN0cnl9IGZyb20gJy4uLy4uL3dhbGwvcmVnaXN0cnkvYnJpY2stcmVnaXN0cnkuc2VydmljZSc7XG5pbXBvcnQge0hlbHBlckNvbXBvbmVudHNNb2R1bGV9IGZyb20gJy4uLy4uL21vZHVsZXMvaGVscGVyLWNvbXBvbmVudHMvaGVscGVyLWNvbXBvbmVudHMubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgV2FsbE1vZHVsZSxcbiAgICAgICAgSGVscGVyQ29tcG9uZW50c01vZHVsZSxcbiAgICAgICAgU3RpY2t5TW9kYWxNb2R1bGUsXG4gICAgICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICAgICAgTWF0TGlzdE1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIENvZGVCcmlja0NvbXBvbmVudCxcbiAgICAgICAgTW9kZUxpc3RDb21wb25lbnRcbiAgICBdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW1xuICAgICAgICBDb2RlQnJpY2tDb21wb25lbnQsXG4gICAgICAgIE1vZGVMaXN0Q29tcG9uZW50XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBDb2RlQnJpY2tNb2R1bGUge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYnJpY2tSZWdpc3RyeTogQnJpY2tSZWdpc3RyeSkge1xuICAgICAgICB0aGlzLmJyaWNrUmVnaXN0cnkucmVnaXN0ZXIoe1xuICAgICAgICAgICAgdGFnOiAnY29kZScsXG4gICAgICAgICAgICBjb21wb25lbnQ6IENvZGVCcmlja0NvbXBvbmVudCxcbiAgICAgICAgICAgIG5hbWU6ICdDb2RlJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQ2FwdHVyZSBhIGNvZGUgc25pcHBldCdcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19