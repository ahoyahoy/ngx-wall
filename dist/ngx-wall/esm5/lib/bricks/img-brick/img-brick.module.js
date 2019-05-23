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
var ImgBrickModule = /** @class */ (function () {
    function ImgBrickModule(brickRegistry, imgModel) {
        var _this = this;
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
            function (brickSnapshot) {
                return _this.imgModel.remove(brickSnapshot);
            }),
            getBrickResourcePaths: (/**
             * @param {?} brickSnapshot
             * @return {?}
             */
            function (brickSnapshot) {
                /** @type {?} */
                var imageState = brickSnapshot.state;
                if (imageState.metadata && imageState.metadata.path) {
                    return [imageState.metadata.path];
                }
                return [];
            }),
            name: 'Image',
            description: 'Embed with a link'
        });
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
    ImgBrickModule.ctorParameters = function () { return [
        { type: BrickRegistry },
        { type: ImgModel }
    ]; };
    return ImgBrickModule;
}());
export { ImgBrickModule };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1nLWJyaWNrLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL2JyaWNrcy9pbWctYnJpY2svaW1nLWJyaWNrLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDbkQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDbEUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFDOUUsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBRXRELE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLHVDQUF1QyxDQUFDO0FBQ2pGLE9BQU8sRUFBQyxlQUFlLEVBQUUsa0JBQWtCLEVBQUUsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDdEYsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSwwREFBMEQsQ0FBQztBQUVoRyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFFekU7SUFtQkksd0JBQW9CLGFBQTRCLEVBQzVCLFFBQWtCO1FBRHRDLGlCQXdCQztRQXhCbUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztZQUN4QixHQUFHLEVBQUUsT0FBTztZQUNaLFNBQVMsRUFBRSxpQkFBaUI7WUFDNUIsa0JBQWtCLEVBQUUsMEJBQTBCO1lBRTlDLFVBQVU7Ozs7WUFBRSxVQUFDLGFBQTZCO2dCQUN0QyxPQUFPLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQy9DLENBQUMsQ0FBQTtZQUVELHFCQUFxQjs7OztZQUFFLFVBQUMsYUFBNkI7O29CQUMzQyxVQUFVLEdBQWtCLGFBQWEsQ0FBQyxLQUFLO2dCQUVyRCxJQUFJLFVBQVUsQ0FBQyxRQUFRLElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7b0JBQ2pELE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNyQztnQkFFRCxPQUFPLEVBQUUsQ0FBQztZQUNkLENBQUMsQ0FBQTtZQUVELElBQUksRUFBRSxPQUFPO1lBQ2IsV0FBVyxFQUFFLG1CQUFtQjtTQUNuQyxDQUFDLENBQUM7SUFDUCxDQUFDOztnQkEzQ0osUUFBUSxTQUFDO29CQUNOLE9BQU8sRUFBRTt3QkFDTCxZQUFZO3dCQUNaLHNCQUFzQjt3QkFDdEIsZUFBZTt3QkFDZixTQUFTO3dCQUNULGlCQUFpQjt3QkFDakIsZUFBZTt3QkFDZixjQUFjO3dCQUNkLGtCQUFrQjtxQkFDckI7b0JBQ0QsT0FBTyxFQUFFLENBQUMsaUJBQWlCLENBQUM7b0JBQzVCLFlBQVksRUFBRSxDQUFDLGlCQUFpQixFQUFFLHFCQUFxQixDQUFDO29CQUN4RCxlQUFlLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxxQkFBcUIsQ0FBQztvQkFDM0QsU0FBUyxFQUFFO3dCQUNQLFFBQVE7cUJBQ1g7aUJBQ0o7Ozs7Z0JBbkJPLGFBQWE7Z0JBUmIsUUFBUTs7SUFzRGhCLHFCQUFDO0NBQUEsQUE1Q0QsSUE0Q0M7U0ExQlksY0FBYzs7Ozs7O0lBQ1gsdUNBQW9DOzs7OztJQUNwQyxrQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdGlja3lNb2RhbE1vZHVsZX0gZnJvbSAnbmd4LXN0aWNreS1tb2RhbCc7XG5pbXBvcnQge0ltZ0JyaWNrQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudC9pbWctYnJpY2suY29tcG9uZW50JztcbmltcG9ydCB7SW5wdXRDb250ZXh0Q29tcG9uZW50fSBmcm9tICcuL2lucHV0LWNvbnRleHQvaW5wdXQtY29udGV4dC5jb21wb25lbnQnO1xuaW1wb3J0IHtJbWdNb2RlbH0gZnJvbSAnLi9pbWctYnJpY2stZGVzdHJ1Y3Rvci5jbGFzcyc7XG5pbXBvcnQge0ltZ0JyaWNrU3RhdGV9IGZyb20gJy4vaW1nLWJyaWNrLXN0YXRlLmludGVyZmFjZSc7XG5pbXBvcnQge0ltZ0JyaWNrVGV4dFJlcHJlc2VudGF0aW9ufSBmcm9tICcuL2ltZy1icmljay10ZXh0LXJlcHJlc2VudGF0aW9uLmNsYXNzJztcbmltcG9ydCB7TWF0QnV0dG9uTW9kdWxlLCBNYXRGb3JtRmllbGRNb2R1bGUsIE1hdElucHV0TW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQge1Jlc2l6YWJsZU1vZHVsZX0gZnJvbSAnLi4vLi4vbW9kdWxlcy9yZXNpemFibGUvcmVzaXphYmxlLm1vZHVsZSc7XG5pbXBvcnQge1Rvd01vZHVsZX0gZnJvbSAnLi4vLi4vbW9kdWxlcy90b3cvdG93Lm1vZHVsZSc7XG5pbXBvcnQge0hlbHBlckNvbXBvbmVudHNNb2R1bGV9IGZyb20gJy4uLy4uL21vZHVsZXMvaGVscGVyLWNvbXBvbmVudHMvaGVscGVyLWNvbXBvbmVudHMubW9kdWxlJztcbmltcG9ydCB7SUJyaWNrU25hcHNob3R9IGZyb20gJy4uLy4uL3dhbGwvbW9kZWwvaW50ZXJmYWNlcy9icmljay1zbmFwc2hvdC5pbnRlcmZhY2UnO1xuaW1wb3J0IHtCcmlja1JlZ2lzdHJ5fSBmcm9tICcuLi8uLi93YWxsL3JlZ2lzdHJ5L2JyaWNrLXJlZ2lzdHJ5LnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBIZWxwZXJDb21wb25lbnRzTW9kdWxlLFxuICAgICAgICBSZXNpemFibGVNb2R1bGUsXG4gICAgICAgIFRvd01vZHVsZSxcbiAgICAgICAgU3RpY2t5TW9kYWxNb2R1bGUsXG4gICAgICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICAgICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgICAgIE1hdEZvcm1GaWVsZE1vZHVsZVxuICAgIF0sXG4gICAgZXhwb3J0czogW0ltZ0JyaWNrQ29tcG9uZW50XSxcbiAgICBkZWNsYXJhdGlvbnM6IFtJbWdCcmlja0NvbXBvbmVudCwgSW5wdXRDb250ZXh0Q29tcG9uZW50XSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtJbWdCcmlja0NvbXBvbmVudCwgSW5wdXRDb250ZXh0Q29tcG9uZW50XSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgSW1nTW9kZWxcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEltZ0JyaWNrTW9kdWxlIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJyaWNrUmVnaXN0cnk6IEJyaWNrUmVnaXN0cnksXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBpbWdNb2RlbDogSW1nTW9kZWwpIHtcbiAgICAgICAgdGhpcy5icmlja1JlZ2lzdHJ5LnJlZ2lzdGVyKHtcbiAgICAgICAgICAgIHRhZzogJ2ltYWdlJyxcbiAgICAgICAgICAgIGNvbXBvbmVudDogSW1nQnJpY2tDb21wb25lbnQsXG4gICAgICAgICAgICB0ZXh0UmVwcmVzZW50YXRpb246IEltZ0JyaWNrVGV4dFJlcHJlc2VudGF0aW9uLFxuXG4gICAgICAgICAgICBkZXN0cnVjdG9yOiAoYnJpY2tTbmFwc2hvdDogSUJyaWNrU25hcHNob3QpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbWdNb2RlbC5yZW1vdmUoYnJpY2tTbmFwc2hvdCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBnZXRCcmlja1Jlc291cmNlUGF0aHM6IChicmlja1NuYXBzaG90OiBJQnJpY2tTbmFwc2hvdCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGltYWdlU3RhdGU6IEltZ0JyaWNrU3RhdGUgPSBicmlja1NuYXBzaG90LnN0YXRlO1xuXG4gICAgICAgICAgICAgICAgaWYgKGltYWdlU3RhdGUubWV0YWRhdGEgJiYgaW1hZ2VTdGF0ZS5tZXRhZGF0YS5wYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbaW1hZ2VTdGF0ZS5tZXRhZGF0YS5wYXRoXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBuYW1lOiAnSW1hZ2UnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdFbWJlZCB3aXRoIGEgbGluaydcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19