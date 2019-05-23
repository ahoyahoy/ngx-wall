/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StickyModalModule } from 'ngx-sticky-modal';
import { ImgBrickComponent } from './component/img-brick.component';
import { InputContextComponent } from './input-context/input-context.component';
import { ImgModel } from './img-brick-destructor.class';
import { ImgBrickTextRepresentation } from './img-brick-text-representation.class';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { ResizableModule } from '../../modules/resizable/resizable.module';
import { TowModule } from '../../modules/tow/tow.module';
import { HelperComponentsModule } from '../../modules/helper-components/helper-components.module';
import { BrickRegistry } from '../../wall/registry/brick-registry.service';
export class ImgBrickModule {
    /**
     * @param {?} brickRegistry
     * @param {?} imgModel
     */
    constructor(brickRegistry, imgModel) {
        this.brickRegistry = brickRegistry;
        this.imgModel = imgModel;
        this.brickRegistry.register({
            tag: 'image',
            component: ImgBrickComponent,
            textRepresentation: ImgBrickTextRepresentation,
            destructor: (/**
             * @param {?} brickSnapshot
             * @return {?}
             */
            (brickSnapshot) => {
                return this.imgModel.remove(brickSnapshot);
            }),
            getBrickResourcePaths: (/**
             * @param {?} brickSnapshot
             * @return {?}
             */
            (brickSnapshot) => {
                /** @type {?} */
                const imageState = brickSnapshot.state;
                if (imageState.metadata && imageState.metadata.path) {
                    return [imageState.metadata.path];
                }
                return [];
            }),
            name: 'Image',
            description: 'Embed with a link'
        });
    }
}
ImgBrickModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    HelperComponentsModule,
                    ResizableModule,
                    TowModule,
                    StickyModalModule,
                    MatButtonModule,
                    MatInputModule,
                    MatFormFieldModule
                ],
                exports: [ImgBrickComponent],
                declarations: [ImgBrickComponent, InputContextComponent],
                entryComponents: [ImgBrickComponent, InputContextComponent],
                providers: [
                    ImgModel
                ]
            },] }
];
/** @nocollapse */
ImgBrickModule.ctorParameters = () => [
    { type: BrickRegistry },
    { type: ImgModel }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    ImgBrickModule.prototype.brickRegistry;
    /**
     * @type {?}
     * @private
     */
    ImgBrickModule.prototype.imgModel;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1nLWJyaWNrLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL2JyaWNrcy9pbWctYnJpY2svaW1nLWJyaWNrLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDbkQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDbEUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFDOUUsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBRXRELE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLHVDQUF1QyxDQUFDO0FBQ2pGLE9BQU8sRUFBQyxlQUFlLEVBQUUsa0JBQWtCLEVBQUUsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDdEYsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSwwREFBMEQsQ0FBQztBQUVoRyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFvQnpFLE1BQU0sT0FBTyxjQUFjOzs7OztJQUN2QixZQUFvQixhQUE0QixFQUM1QixRQUFrQjtRQURsQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO1lBQ3hCLEdBQUcsRUFBRSxPQUFPO1lBQ1osU0FBUyxFQUFFLGlCQUFpQjtZQUM1QixrQkFBa0IsRUFBRSwwQkFBMEI7WUFFOUMsVUFBVTs7OztZQUFFLENBQUMsYUFBNkIsRUFBaUIsRUFBRTtnQkFDekQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUMvQyxDQUFDLENBQUE7WUFFRCxxQkFBcUI7Ozs7WUFBRSxDQUFDLGFBQTZCLEVBQUUsRUFBRTs7c0JBQy9DLFVBQVUsR0FBa0IsYUFBYSxDQUFDLEtBQUs7Z0JBRXJELElBQUksVUFBVSxDQUFDLFFBQVEsSUFBSSxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRTtvQkFDakQsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3JDO2dCQUVELE9BQU8sRUFBRSxDQUFDO1lBQ2QsQ0FBQyxDQUFBO1lBRUQsSUFBSSxFQUFFLE9BQU87WUFDYixXQUFXLEVBQUUsbUJBQW1CO1NBQ25DLENBQUMsQ0FBQztJQUNQLENBQUM7OztZQTNDSixRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFO29CQUNMLFlBQVk7b0JBQ1osc0JBQXNCO29CQUN0QixlQUFlO29CQUNmLFNBQVM7b0JBQ1QsaUJBQWlCO29CQUNqQixlQUFlO29CQUNmLGNBQWM7b0JBQ2Qsa0JBQWtCO2lCQUNyQjtnQkFDRCxPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztnQkFDNUIsWUFBWSxFQUFFLENBQUMsaUJBQWlCLEVBQUUscUJBQXFCLENBQUM7Z0JBQ3hELGVBQWUsRUFBRSxDQUFDLGlCQUFpQixFQUFFLHFCQUFxQixDQUFDO2dCQUMzRCxTQUFTLEVBQUU7b0JBQ1AsUUFBUTtpQkFDWDthQUNKOzs7O1lBbkJPLGFBQWE7WUFSYixRQUFROzs7Ozs7O0lBNkJBLHVDQUFvQzs7Ozs7SUFDcEMsa0NBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3RpY2t5TW9kYWxNb2R1bGV9IGZyb20gJ25neC1zdGlja3ktbW9kYWwnO1xuaW1wb3J0IHtJbWdCcmlja0NvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnQvaW1nLWJyaWNrLmNvbXBvbmVudCc7XG5pbXBvcnQge0lucHV0Q29udGV4dENvbXBvbmVudH0gZnJvbSAnLi9pbnB1dC1jb250ZXh0L2lucHV0LWNvbnRleHQuY29tcG9uZW50JztcbmltcG9ydCB7SW1nTW9kZWx9IGZyb20gJy4vaW1nLWJyaWNrLWRlc3RydWN0b3IuY2xhc3MnO1xuaW1wb3J0IHtJbWdCcmlja1N0YXRlfSBmcm9tICcuL2ltZy1icmljay1zdGF0ZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHtJbWdCcmlja1RleHRSZXByZXNlbnRhdGlvbn0gZnJvbSAnLi9pbWctYnJpY2stdGV4dC1yZXByZXNlbnRhdGlvbi5jbGFzcyc7XG5pbXBvcnQge01hdEJ1dHRvbk1vZHVsZSwgTWF0Rm9ybUZpZWxkTW9kdWxlLCBNYXRJbnB1dE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHtSZXNpemFibGVNb2R1bGV9IGZyb20gJy4uLy4uL21vZHVsZXMvcmVzaXphYmxlL3Jlc2l6YWJsZS5tb2R1bGUnO1xuaW1wb3J0IHtUb3dNb2R1bGV9IGZyb20gJy4uLy4uL21vZHVsZXMvdG93L3Rvdy5tb2R1bGUnO1xuaW1wb3J0IHtIZWxwZXJDb21wb25lbnRzTW9kdWxlfSBmcm9tICcuLi8uLi9tb2R1bGVzL2hlbHBlci1jb21wb25lbnRzL2hlbHBlci1jb21wb25lbnRzLm1vZHVsZSc7XG5pbXBvcnQge0lCcmlja1NuYXBzaG90fSBmcm9tICcuLi8uLi93YWxsL21vZGVsL2ludGVyZmFjZXMvYnJpY2stc25hcHNob3QuaW50ZXJmYWNlJztcbmltcG9ydCB7QnJpY2tSZWdpc3RyeX0gZnJvbSAnLi4vLi4vd2FsbC9yZWdpc3RyeS9icmljay1yZWdpc3RyeS5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgSGVscGVyQ29tcG9uZW50c01vZHVsZSxcbiAgICAgICAgUmVzaXphYmxlTW9kdWxlLFxuICAgICAgICBUb3dNb2R1bGUsXG4gICAgICAgIFN0aWNreU1vZGFsTW9kdWxlLFxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgICAgIE1hdElucHV0TW9kdWxlLFxuICAgICAgICBNYXRGb3JtRmllbGRNb2R1bGVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtJbWdCcmlja0NvbXBvbmVudF0sXG4gICAgZGVjbGFyYXRpb25zOiBbSW1nQnJpY2tDb21wb25lbnQsIElucHV0Q29udGV4dENvbXBvbmVudF0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbSW1nQnJpY2tDb21wb25lbnQsIElucHV0Q29udGV4dENvbXBvbmVudF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIEltZ01vZGVsXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBJbWdCcmlja01vZHVsZSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBicmlja1JlZ2lzdHJ5OiBCcmlja1JlZ2lzdHJ5LFxuICAgICAgICAgICAgICAgIHByaXZhdGUgaW1nTW9kZWw6IEltZ01vZGVsKSB7XG4gICAgICAgIHRoaXMuYnJpY2tSZWdpc3RyeS5yZWdpc3Rlcih7XG4gICAgICAgICAgICB0YWc6ICdpbWFnZScsXG4gICAgICAgICAgICBjb21wb25lbnQ6IEltZ0JyaWNrQ29tcG9uZW50LFxuICAgICAgICAgICAgdGV4dFJlcHJlc2VudGF0aW9uOiBJbWdCcmlja1RleHRSZXByZXNlbnRhdGlvbixcblxuICAgICAgICAgICAgZGVzdHJ1Y3RvcjogKGJyaWNrU25hcHNob3Q6IElCcmlja1NuYXBzaG90KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW1nTW9kZWwucmVtb3ZlKGJyaWNrU25hcHNob3QpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZ2V0QnJpY2tSZXNvdXJjZVBhdGhzOiAoYnJpY2tTbmFwc2hvdDogSUJyaWNrU25hcHNob3QpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbWFnZVN0YXRlOiBJbWdCcmlja1N0YXRlID0gYnJpY2tTbmFwc2hvdC5zdGF0ZTtcblxuICAgICAgICAgICAgICAgIGlmIChpbWFnZVN0YXRlLm1ldGFkYXRhICYmIGltYWdlU3RhdGUubWV0YWRhdGEucGF0aCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW2ltYWdlU3RhdGUubWV0YWRhdGEucGF0aF07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgbmFtZTogJ0ltYWdlJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnRW1iZWQgd2l0aCBhIGxpbmsnXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==