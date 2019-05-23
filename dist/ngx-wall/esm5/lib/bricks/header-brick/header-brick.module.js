/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextRepresentation } from '../base-text-brick/base-text-representation.class';
import { HeaderBrickComponent } from './component/header-brick.component';
import { BrickRegistry } from '../../wall/registry/brick-registry.service';
import { ContenteditableModule } from '../../modules/contenteditable/contenteditable.module';
var HeaderBrickModule = /** @class */ (function () {
    function HeaderBrickModule(brickRegistry) {
        this.brickRegistry = brickRegistry;
        this.brickRegistry.register({
            tag: 'header',
            component: HeaderBrickComponent,
            supportText: true,
            textRepresentation: TextRepresentation,
            name: 'Header',
            description: 'A large header with margins'
        });
    }
    HeaderBrickModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        FormsModule,
                        CommonModule,
                        ContenteditableModule
                    ],
                    exports: [HeaderBrickComponent],
                    declarations: [HeaderBrickComponent],
                    entryComponents: [HeaderBrickComponent]
                },] }
    ];
    /** @nocollapse */
    HeaderBrickModule.ctorParameters = function () { return [
        { type: BrickRegistry }
    ]; };
    return HeaderBrickModule;
}());
export { HeaderBrickModule };
if (false) {
    /**
     * @type {?}
     * @private
     */
    HeaderBrickModule.prototype.brickRegistry;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWJyaWNrLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL2JyaWNrcy9oZWFkZXItYnJpY2svaGVhZGVyLWJyaWNrLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLG1EQUFtRCxDQUFDO0FBQ3JGLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLG9DQUFvQyxDQUFDO0FBQ3hFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSw0Q0FBNEMsQ0FBQztBQUN6RSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzREFBc0QsQ0FBQztBQUUzRjtJQVdJLDJCQUFvQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztZQUN4QixHQUFHLEVBQUUsUUFBUTtZQUNiLFNBQVMsRUFBRSxvQkFBb0I7WUFDL0IsV0FBVyxFQUFFLElBQUk7WUFDakIsa0JBQWtCLEVBQUUsa0JBQWtCO1lBQ3RDLElBQUksRUFBRSxRQUFRO1lBQ2QsV0FBVyxFQUFFLDZCQUE2QjtTQUM3QyxDQUFDLENBQUM7SUFDUCxDQUFDOztnQkFwQkosUUFBUSxTQUFDO29CQUNOLE9BQU8sRUFBRTt3QkFDTCxXQUFXO3dCQUNYLFlBQVk7d0JBQ1oscUJBQXFCO3FCQUN4QjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztvQkFDL0IsWUFBWSxFQUFFLENBQUMsb0JBQW9CLENBQUM7b0JBQ3BDLGVBQWUsRUFBRSxDQUFDLG9CQUFvQixDQUFDO2lCQUMxQzs7OztnQkFaTyxhQUFhOztJQXdCckIsd0JBQUM7Q0FBQSxBQXJCRCxJQXFCQztTQVhZLGlCQUFpQjs7Ozs7O0lBQ2QsMENBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Rm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7VGV4dFJlcHJlc2VudGF0aW9ufSBmcm9tICcuLi9iYXNlLXRleHQtYnJpY2svYmFzZS10ZXh0LXJlcHJlc2VudGF0aW9uLmNsYXNzJztcbmltcG9ydCB7SGVhZGVyQnJpY2tDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50L2hlYWRlci1icmljay5jb21wb25lbnQnO1xuaW1wb3J0IHtCcmlja1JlZ2lzdHJ5fSBmcm9tICcuLi8uLi93YWxsL3JlZ2lzdHJ5L2JyaWNrLXJlZ2lzdHJ5LnNlcnZpY2UnO1xuaW1wb3J0IHtDb250ZW50ZWRpdGFibGVNb2R1bGV9IGZyb20gJy4uLy4uL21vZHVsZXMvY29udGVudGVkaXRhYmxlL2NvbnRlbnRlZGl0YWJsZS5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgQ29udGVudGVkaXRhYmxlTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbSGVhZGVyQnJpY2tDb21wb25lbnRdLFxuICAgIGRlY2xhcmF0aW9uczogW0hlYWRlckJyaWNrQ29tcG9uZW50XSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtIZWFkZXJCcmlja0NvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgSGVhZGVyQnJpY2tNb2R1bGUge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYnJpY2tSZWdpc3RyeTogQnJpY2tSZWdpc3RyeSkge1xuICAgICAgICB0aGlzLmJyaWNrUmVnaXN0cnkucmVnaXN0ZXIoe1xuICAgICAgICAgICAgdGFnOiAnaGVhZGVyJyxcbiAgICAgICAgICAgIGNvbXBvbmVudDogSGVhZGVyQnJpY2tDb21wb25lbnQsXG4gICAgICAgICAgICBzdXBwb3J0VGV4dDogdHJ1ZSxcbiAgICAgICAgICAgIHRleHRSZXByZXNlbnRhdGlvbjogVGV4dFJlcHJlc2VudGF0aW9uLFxuICAgICAgICAgICAgbmFtZTogJ0hlYWRlcicsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0EgbGFyZ2UgaGVhZGVyIHdpdGggbWFyZ2lucydcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19