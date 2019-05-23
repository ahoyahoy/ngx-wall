/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
export class TextBrickModule {
    /**
     * @param {?} brickRegistry
     */
    constructor(brickRegistry) {
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
TextBrickModule.ctorParameters = () => [
    { type: BrickRegistry }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    TextBrickModule.prototype.brickRegistry;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1icmljay5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9icmlja3MvdGV4dC1icmljay90ZXh0LWJyaWNrLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLG1EQUFtRCxDQUFDO0FBQ3JGLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQ3hFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQ3BFLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLGlEQUFpRCxDQUFDO0FBQ3pGLE9BQU8sRUFBQyxlQUFlLEVBQUUsa0JBQWtCLEVBQUUsY0FBYyxFQUFFLGFBQWEsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ3JHLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLDBEQUEwRCxDQUFDO0FBQ2hHLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNEQUFzRCxDQUFDO0FBQzNGLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSw0Q0FBNEMsQ0FBQztBQWtDekUsTUFBTSxPQUFPLGVBQWU7Ozs7SUFDeEIsWUFBb0IsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7WUFDeEIsR0FBRyxFQUFFLE1BQU07WUFDWCxTQUFTLEVBQUUsa0JBQWtCO1lBQzdCLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLGtCQUFrQixFQUFFLGtCQUFrQjtZQUN0QyxJQUFJLEVBQUUsTUFBTTtZQUNaLFdBQVcsRUFBRSxvQ0FBb0M7U0FDcEQsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7O1lBMUNKLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUU7b0JBQ0wsV0FBVztvQkFDWCxZQUFZO29CQUNaLHFCQUFxQjtvQkFDckIsc0JBQXNCO29CQUN0QixpQkFBaUI7b0JBQ2pCLGVBQWU7b0JBQ2YsY0FBYztvQkFDZCxrQkFBa0I7b0JBQ2xCLGFBQWE7aUJBQ2hCO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxrQkFBa0I7b0JBQ2xCLG1CQUFtQjtvQkFDbkIsd0JBQXdCO2lCQUMzQjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1Ysa0JBQWtCO29CQUNsQixtQkFBbUI7b0JBRW5CLGVBQWU7b0JBQ2Ysd0JBQXdCO2lCQUMzQjtnQkFDRCxlQUFlLEVBQUU7b0JBQ2Isa0JBQWtCO29CQUNsQixtQkFBbUI7b0JBRW5CLGVBQWU7b0JBQ2Ysd0JBQXdCO2lCQUMzQjthQUNKOzs7O1lBakNPLGFBQWE7Ozs7Ozs7SUFtQ0wsd0NBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Rm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7U3RpY2t5TW9kYWxNb2R1bGV9IGZyb20gJ25neC1zdGlja3ktbW9kYWwnO1xuaW1wb3J0IHtUZXh0UmVwcmVzZW50YXRpb259IGZyb20gJy4uL2Jhc2UtdGV4dC1icmljay9iYXNlLXRleHQtcmVwcmVzZW50YXRpb24uY2xhc3MnO1xuaW1wb3J0IHtCcmlja3NMaXN0Q29tcG9uZW50fSBmcm9tICcuL2JyaWNrcy1saXN0L2JyaWNrcy1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQge1RleHRCcmlja0NvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnQvdGV4dC1icmljay5jb21wb25lbnQnO1xuaW1wb3J0IHtUZXh0Q29udGV4dE1lbnVDb21wb25lbnR9IGZyb20gJy4vdGV4dC1jb250ZXh0LW1lbnUvdGV4dC1jb250ZXh0LW1lbnUuY29tcG9uZW50JztcbmltcG9ydCB7TWF0QnV0dG9uTW9kdWxlLCBNYXRGb3JtRmllbGRNb2R1bGUsIE1hdElucHV0TW9kdWxlLCBNYXRMaXN0TW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQge0hlbHBlckNvbXBvbmVudHNNb2R1bGV9IGZyb20gJy4uLy4uL21vZHVsZXMvaGVscGVyLWNvbXBvbmVudHMvaGVscGVyLWNvbXBvbmVudHMubW9kdWxlJztcbmltcG9ydCB7Q29udGVudGVkaXRhYmxlTW9kdWxlfSBmcm9tICcuLi8uLi9tb2R1bGVzL2NvbnRlbnRlZGl0YWJsZS9jb250ZW50ZWRpdGFibGUubW9kdWxlJztcbmltcG9ydCB7QnJpY2tSZWdpc3RyeX0gZnJvbSAnLi4vLi4vd2FsbC9yZWdpc3RyeS9icmljay1yZWdpc3RyeS5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIENvbnRlbnRlZGl0YWJsZU1vZHVsZSxcbiAgICAgICAgSGVscGVyQ29tcG9uZW50c01vZHVsZSxcbiAgICAgICAgU3RpY2t5TW9kYWxNb2R1bGUsXG4gICAgICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICAgICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgICAgICAgTWF0TGlzdE1vZHVsZVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBUZXh0QnJpY2tDb21wb25lbnQsXG4gICAgICAgIEJyaWNrc0xpc3RDb21wb25lbnQsXG4gICAgICAgIFRleHRDb250ZXh0TWVudUNvbXBvbmVudFxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFRleHRCcmlja0NvbXBvbmVudCxcbiAgICAgICAgQnJpY2tzTGlzdENvbXBvbmVudCxcblxuICAgICAgICAvLyBjb250ZXh0IG1lbnVcbiAgICAgICAgVGV4dENvbnRleHRNZW51Q29tcG9uZW50XG4gICAgXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICAgICAgVGV4dEJyaWNrQ29tcG9uZW50LFxuICAgICAgICBCcmlja3NMaXN0Q29tcG9uZW50LFxuXG4gICAgICAgIC8vIGNvbnRleHQgbWVudVxuICAgICAgICBUZXh0Q29udGV4dE1lbnVDb21wb25lbnRcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFRleHRCcmlja01vZHVsZSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBicmlja1JlZ2lzdHJ5OiBCcmlja1JlZ2lzdHJ5KSB7XG4gICAgICAgIHRoaXMuYnJpY2tSZWdpc3RyeS5yZWdpc3Rlcih7XG4gICAgICAgICAgICB0YWc6ICd0ZXh0JyxcbiAgICAgICAgICAgIGNvbXBvbmVudDogVGV4dEJyaWNrQ29tcG9uZW50LFxuICAgICAgICAgICAgc3VwcG9ydFRleHQ6IHRydWUsXG4gICAgICAgICAgICB0ZXh0UmVwcmVzZW50YXRpb246IFRleHRSZXByZXNlbnRhdGlvbixcbiAgICAgICAgICAgIG5hbWU6ICdUZXh0JyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnSnVzdCBzdGFydCB3cml0aW5nIHdpdGggcGxhaW4gdGV4dCdcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19