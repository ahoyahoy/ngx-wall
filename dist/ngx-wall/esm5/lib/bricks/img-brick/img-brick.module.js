/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            destructor: function (brickSnapshot) {
                return _this.imgModel.remove(brickSnapshot);
            },
            getBrickResourcePaths: function (brickSnapshot) {
                /** @type {?} */
                var imageState = brickSnapshot.state;
                if (imageState.metadata && imageState.metadata.path) {
                    return [imageState.metadata.path];
                }
                return [];
            },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1nLWJyaWNrLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL2JyaWNrcy9pbWctYnJpY2svaW1nLWJyaWNrLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDbkQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDbEUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFDOUUsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBRXRELE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLHVDQUF1QyxDQUFDO0FBQ2pGLE9BQU8sRUFBQyxlQUFlLEVBQUUsa0JBQWtCLEVBQUUsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDdEYsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSwwREFBMEQsQ0FBQztBQUVoRyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFFekU7SUFtQkksd0JBQW9CLGFBQTRCLEVBQzVCLFFBQWtCO1FBRHRDLGlCQXdCQztRQXhCbUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztZQUN4QixHQUFHLEVBQUUsT0FBTztZQUNaLFNBQVMsRUFBRSxpQkFBaUI7WUFDNUIsa0JBQWtCLEVBQUUsMEJBQTBCO1lBRTlDLFVBQVUsRUFBRSxVQUFDLGFBQTZCO2dCQUN0QyxPQUFPLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQy9DLENBQUM7WUFFRCxxQkFBcUIsRUFBRSxVQUFDLGFBQTZCOztvQkFDM0MsVUFBVSxHQUFrQixhQUFhLENBQUMsS0FBSztnQkFFckQsSUFBSSxVQUFVLENBQUMsUUFBUSxJQUFJLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO29CQUNqRCxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDckM7Z0JBRUQsT0FBTyxFQUFFLENBQUM7WUFDZCxDQUFDO1lBRUQsSUFBSSxFQUFFLE9BQU87WUFDYixXQUFXLEVBQUUsbUJBQW1CO1NBQ25DLENBQUMsQ0FBQztJQUNQLENBQUM7O2dCQTNDSixRQUFRLFNBQUM7b0JBQ04sT0FBTyxFQUFFO3dCQUNMLFlBQVk7d0JBQ1osc0JBQXNCO3dCQUN0QixlQUFlO3dCQUNmLFNBQVM7d0JBQ1QsaUJBQWlCO3dCQUNqQixlQUFlO3dCQUNmLGNBQWM7d0JBQ2Qsa0JBQWtCO3FCQUNyQjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztvQkFDNUIsWUFBWSxFQUFFLENBQUMsaUJBQWlCLEVBQUUscUJBQXFCLENBQUM7b0JBQ3hELGVBQWUsRUFBRSxDQUFDLGlCQUFpQixFQUFFLHFCQUFxQixDQUFDO29CQUMzRCxTQUFTLEVBQUU7d0JBQ1AsUUFBUTtxQkFDWDtpQkFDSjs7OztnQkFuQk8sYUFBYTtnQkFSYixRQUFROztJQXNEaEIscUJBQUM7Q0FBQSxBQTVDRCxJQTRDQztTQTFCWSxjQUFjOzs7Ozs7SUFDWCx1Q0FBb0M7Ozs7O0lBQ3BDLGtDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N0aWNreU1vZGFsTW9kdWxlfSBmcm9tICduZ3gtc3RpY2t5LW1vZGFsJztcbmltcG9ydCB7SW1nQnJpY2tDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50L2ltZy1icmljay5jb21wb25lbnQnO1xuaW1wb3J0IHtJbnB1dENvbnRleHRDb21wb25lbnR9IGZyb20gJy4vaW5wdXQtY29udGV4dC9pbnB1dC1jb250ZXh0LmNvbXBvbmVudCc7XG5pbXBvcnQge0ltZ01vZGVsfSBmcm9tICcuL2ltZy1icmljay1kZXN0cnVjdG9yLmNsYXNzJztcbmltcG9ydCB7SW1nQnJpY2tTdGF0ZX0gZnJvbSAnLi9pbWctYnJpY2stc3RhdGUuaW50ZXJmYWNlJztcbmltcG9ydCB7SW1nQnJpY2tUZXh0UmVwcmVzZW50YXRpb259IGZyb20gJy4vaW1nLWJyaWNrLXRleHQtcmVwcmVzZW50YXRpb24uY2xhc3MnO1xuaW1wb3J0IHtNYXRCdXR0b25Nb2R1bGUsIE1hdEZvcm1GaWVsZE1vZHVsZSwgTWF0SW5wdXRNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7UmVzaXphYmxlTW9kdWxlfSBmcm9tICcuLi8uLi9tb2R1bGVzL3Jlc2l6YWJsZS9yZXNpemFibGUubW9kdWxlJztcbmltcG9ydCB7VG93TW9kdWxlfSBmcm9tICcuLi8uLi9tb2R1bGVzL3Rvdy90b3cubW9kdWxlJztcbmltcG9ydCB7SGVscGVyQ29tcG9uZW50c01vZHVsZX0gZnJvbSAnLi4vLi4vbW9kdWxlcy9oZWxwZXItY29tcG9uZW50cy9oZWxwZXItY29tcG9uZW50cy5tb2R1bGUnO1xuaW1wb3J0IHtJQnJpY2tTbmFwc2hvdH0gZnJvbSAnLi4vLi4vd2FsbC9tb2RlbC9pbnRlcmZhY2VzL2JyaWNrLXNuYXBzaG90LmludGVyZmFjZSc7XG5pbXBvcnQge0JyaWNrUmVnaXN0cnl9IGZyb20gJy4uLy4uL3dhbGwvcmVnaXN0cnkvYnJpY2stcmVnaXN0cnkuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEhlbHBlckNvbXBvbmVudHNNb2R1bGUsXG4gICAgICAgIFJlc2l6YWJsZU1vZHVsZSxcbiAgICAgICAgVG93TW9kdWxlLFxuICAgICAgICBTdGlja3lNb2RhbE1vZHVsZSxcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgICAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICAgICAgTWF0Rm9ybUZpZWxkTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbSW1nQnJpY2tDb21wb25lbnRdLFxuICAgIGRlY2xhcmF0aW9uczogW0ltZ0JyaWNrQ29tcG9uZW50LCBJbnB1dENvbnRleHRDb21wb25lbnRdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW0ltZ0JyaWNrQ29tcG9uZW50LCBJbnB1dENvbnRleHRDb21wb25lbnRdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBJbWdNb2RlbFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgSW1nQnJpY2tNb2R1bGUge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYnJpY2tSZWdpc3RyeTogQnJpY2tSZWdpc3RyeSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGltZ01vZGVsOiBJbWdNb2RlbCkge1xuICAgICAgICB0aGlzLmJyaWNrUmVnaXN0cnkucmVnaXN0ZXIoe1xuICAgICAgICAgICAgdGFnOiAnaW1hZ2UnLFxuICAgICAgICAgICAgY29tcG9uZW50OiBJbWdCcmlja0NvbXBvbmVudCxcbiAgICAgICAgICAgIHRleHRSZXByZXNlbnRhdGlvbjogSW1nQnJpY2tUZXh0UmVwcmVzZW50YXRpb24sXG5cbiAgICAgICAgICAgIGRlc3RydWN0b3I6IChicmlja1NuYXBzaG90OiBJQnJpY2tTbmFwc2hvdCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmltZ01vZGVsLnJlbW92ZShicmlja1NuYXBzaG90KTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGdldEJyaWNrUmVzb3VyY2VQYXRoczogKGJyaWNrU25hcHNob3Q6IElCcmlja1NuYXBzaG90KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW1hZ2VTdGF0ZTogSW1nQnJpY2tTdGF0ZSA9IGJyaWNrU25hcHNob3Quc3RhdGU7XG5cbiAgICAgICAgICAgICAgICBpZiAoaW1hZ2VTdGF0ZS5tZXRhZGF0YSAmJiBpbWFnZVN0YXRlLm1ldGFkYXRhLnBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtpbWFnZVN0YXRlLm1ldGFkYXRhLnBhdGhdO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIG5hbWU6ICdJbWFnZScsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0VtYmVkIHdpdGggYSBsaW5rJ1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=