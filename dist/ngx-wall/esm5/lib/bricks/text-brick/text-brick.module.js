/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StickyModalModule } from 'ngx-sticky-modal';
import { TextRepresentation } from '../base-text-brick/base-text-representation.class';
import { BricksListComponent } from './bricks-list/bricks-list.component';
import { TextBrickComponent } from './component/text-brick.component';
import { TextContextMenuComponent } from './text-context-menu/text-context-menu.component';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatListModule } from '@angular/material';
import { HelperComponentsModule } from '../../modules/helper-components/helper-components.module';
import { ContenteditableModule } from '../../modules/contenteditable/contenteditable.module';
import { BrickRegistry } from '../../wall/registry/brick-registry.service';
var TextBrickModule = /** @class */ (function () {
    function TextBrickModule(brickRegistry) {
        this.brickRegistry = brickRegistry;
        this.brickRegistry.register({
            tag: 'text',
            component: TextBrickComponent,
            supportText: true,
            textRepresentation: TextRepresentation,
            name: 'Text',
            description: 'Just start writing with plain text'
        });
    }
    TextBrickModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        FormsModule,
                        CommonModule,
                        ContenteditableModule,
                        HelperComponentsModule,
                        StickyModalModule,
                        MatButtonModule,
                        MatInputModule,
                        MatFormFieldModule,
                        MatListModule
                    ],
                    exports: [
                        TextBrickComponent,
                        BricksListComponent,
                        TextContextMenuComponent
                    ],
                    declarations: [
                        TextBrickComponent,
                        BricksListComponent,
                        // context menu
                        TextContextMenuComponent
                    ],
                    entryComponents: [
                        TextBrickComponent,
                        BricksListComponent,
                        // context menu
                        TextContextMenuComponent
                    ]
                },] }
    ];
    /** @nocollapse */
    TextBrickModule.ctorParameters = function () { return [
        { type: BrickRegistry }
    ]; };
    return TextBrickModule;
}());
export { TextBrickModule };
if (false) {
    /**
     * @type {?}
     * @private
     */
    TextBrickModule.prototype.brickRegistry;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1icmljay5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9icmlja3MvdGV4dC1icmljay90ZXh0LWJyaWNrLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLG1EQUFtRCxDQUFDO0FBQ3JGLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQ3hFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQ3BFLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLGlEQUFpRCxDQUFDO0FBQ3pGLE9BQU8sRUFBQyxlQUFlLEVBQUUsa0JBQWtCLEVBQUUsY0FBYyxFQUFFLGFBQWEsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ3JHLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLDBEQUEwRCxDQUFDO0FBQ2hHLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNEQUFzRCxDQUFDO0FBQzNGLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSw0Q0FBNEMsQ0FBQztBQUV6RTtJQWlDSSx5QkFBb0IsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7WUFDeEIsR0FBRyxFQUFFLE1BQU07WUFDWCxTQUFTLEVBQUUsa0JBQWtCO1lBQzdCLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLGtCQUFrQixFQUFFLGtCQUFrQjtZQUN0QyxJQUFJLEVBQUUsTUFBTTtZQUNaLFdBQVcsRUFBRSxvQ0FBb0M7U0FDcEQsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7Z0JBMUNKLFFBQVEsU0FBQztvQkFDTixPQUFPLEVBQUU7d0JBQ0wsV0FBVzt3QkFDWCxZQUFZO3dCQUNaLHFCQUFxQjt3QkFDckIsc0JBQXNCO3dCQUN0QixpQkFBaUI7d0JBQ2pCLGVBQWU7d0JBQ2YsY0FBYzt3QkFDZCxrQkFBa0I7d0JBQ2xCLGFBQWE7cUJBQ2hCO29CQUNELE9BQU8sRUFBRTt3QkFDTCxrQkFBa0I7d0JBQ2xCLG1CQUFtQjt3QkFDbkIsd0JBQXdCO3FCQUMzQjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1Ysa0JBQWtCO3dCQUNsQixtQkFBbUI7d0JBRW5CLGVBQWU7d0JBQ2Ysd0JBQXdCO3FCQUMzQjtvQkFDRCxlQUFlLEVBQUU7d0JBQ2Isa0JBQWtCO3dCQUNsQixtQkFBbUI7d0JBRW5CLGVBQWU7d0JBQ2Ysd0JBQXdCO3FCQUMzQjtpQkFDSjs7OztnQkFqQ08sYUFBYTs7SUE2Q3JCLHNCQUFDO0NBQUEsQUEzQ0QsSUEyQ0M7U0FYWSxlQUFlOzs7Ozs7SUFDWix3Q0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtTdGlja3lNb2RhbE1vZHVsZX0gZnJvbSAnbmd4LXN0aWNreS1tb2RhbCc7XG5pbXBvcnQge1RleHRSZXByZXNlbnRhdGlvbn0gZnJvbSAnLi4vYmFzZS10ZXh0LWJyaWNrL2Jhc2UtdGV4dC1yZXByZXNlbnRhdGlvbi5jbGFzcyc7XG5pbXBvcnQge0JyaWNrc0xpc3RDb21wb25lbnR9IGZyb20gJy4vYnJpY2tzLWxpc3QvYnJpY2tzLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7VGV4dEJyaWNrQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudC90ZXh0LWJyaWNrLmNvbXBvbmVudCc7XG5pbXBvcnQge1RleHRDb250ZXh0TWVudUNvbXBvbmVudH0gZnJvbSAnLi90ZXh0LWNvbnRleHQtbWVudS90ZXh0LWNvbnRleHQtbWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHtNYXRCdXR0b25Nb2R1bGUsIE1hdEZvcm1GaWVsZE1vZHVsZSwgTWF0SW5wdXRNb2R1bGUsIE1hdExpc3RNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7SGVscGVyQ29tcG9uZW50c01vZHVsZX0gZnJvbSAnLi4vLi4vbW9kdWxlcy9oZWxwZXItY29tcG9uZW50cy9oZWxwZXItY29tcG9uZW50cy5tb2R1bGUnO1xuaW1wb3J0IHtDb250ZW50ZWRpdGFibGVNb2R1bGV9IGZyb20gJy4uLy4uL21vZHVsZXMvY29udGVudGVkaXRhYmxlL2NvbnRlbnRlZGl0YWJsZS5tb2R1bGUnO1xuaW1wb3J0IHtCcmlja1JlZ2lzdHJ5fSBmcm9tICcuLi8uLi93YWxsL3JlZ2lzdHJ5L2JyaWNrLXJlZ2lzdHJ5LnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgQ29udGVudGVkaXRhYmxlTW9kdWxlLFxuICAgICAgICBIZWxwZXJDb21wb25lbnRzTW9kdWxlLFxuICAgICAgICBTdGlja3lNb2RhbE1vZHVsZSxcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgICAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICAgICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgICAgICBNYXRMaXN0TW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIFRleHRCcmlja0NvbXBvbmVudCxcbiAgICAgICAgQnJpY2tzTGlzdENvbXBvbmVudCxcbiAgICAgICAgVGV4dENvbnRleHRNZW51Q29tcG9uZW50XG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgVGV4dEJyaWNrQ29tcG9uZW50LFxuICAgICAgICBCcmlja3NMaXN0Q29tcG9uZW50LFxuXG4gICAgICAgIC8vIGNvbnRleHQgbWVudVxuICAgICAgICBUZXh0Q29udGV4dE1lbnVDb21wb25lbnRcbiAgICBdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW1xuICAgICAgICBUZXh0QnJpY2tDb21wb25lbnQsXG4gICAgICAgIEJyaWNrc0xpc3RDb21wb25lbnQsXG5cbiAgICAgICAgLy8gY29udGV4dCBtZW51XG4gICAgICAgIFRleHRDb250ZXh0TWVudUNvbXBvbmVudFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgVGV4dEJyaWNrTW9kdWxlIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJyaWNrUmVnaXN0cnk6IEJyaWNrUmVnaXN0cnkpIHtcbiAgICAgICAgdGhpcy5icmlja1JlZ2lzdHJ5LnJlZ2lzdGVyKHtcbiAgICAgICAgICAgIHRhZzogJ3RleHQnLFxuICAgICAgICAgICAgY29tcG9uZW50OiBUZXh0QnJpY2tDb21wb25lbnQsXG4gICAgICAgICAgICBzdXBwb3J0VGV4dDogdHJ1ZSxcbiAgICAgICAgICAgIHRleHRSZXByZXNlbnRhdGlvbjogVGV4dFJlcHJlc2VudGF0aW9uLFxuICAgICAgICAgICAgbmFtZTogJ1RleHQnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdKdXN0IHN0YXJ0IHdyaXRpbmcgd2l0aCBwbGFpbiB0ZXh0J1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=