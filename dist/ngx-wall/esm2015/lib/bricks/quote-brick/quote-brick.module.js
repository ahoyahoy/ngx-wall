/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrickRegistry } from '../../wall/wall';
import { TextRepresentation } from '../base-text-brick/base-text-representation.class';
import { QuoteBrickComponent } from './component/quote-brick.component';
import { ContenteditableModule } from '../../modules/contenteditable/contenteditable.module';
export class QuoteBrickModule {
    /**
     * @param {?} brickRegistry
     */
    constructor(brickRegistry) {
        this.brickRegistry = brickRegistry;
        this.brickRegistry.register({
            tag: 'quote',
            component: QuoteBrickComponent,
            supportText: true,
            textRepresentation: TextRepresentation,
            name: 'Quote',
            description: 'Capture a quote'
        });
    }
}
QuoteBrickModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    FormsModule,
                    ContenteditableModule
                ],
                exports: [QuoteBrickComponent],
                declarations: [QuoteBrickComponent],
                entryComponents: [QuoteBrickComponent]
            },] }
];
/** @nocollapse */
QuoteBrickModule.ctorParameters = () => [
    { type: BrickRegistry }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    QuoteBrickModule.prototype.brickRegistry;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVvdGUtYnJpY2subW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvYnJpY2tzL3F1b3RlLWJyaWNrL3F1b3RlLWJyaWNrLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLG1EQUFtRCxDQUFDO0FBQ3JGLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBQ3RFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNEQUFzRCxDQUFDO0FBVzNGLE1BQU0sT0FBTyxnQkFBZ0I7Ozs7SUFDekIsWUFBb0IsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7WUFDeEIsR0FBRyxFQUFFLE9BQU87WUFDWixTQUFTLEVBQUUsbUJBQW1CO1lBQzlCLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLGtCQUFrQixFQUFFLGtCQUFrQjtZQUN0QyxJQUFJLEVBQUUsT0FBTztZQUNiLFdBQVcsRUFBRSxpQkFBaUI7U0FDakMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7O1lBbkJKLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUU7b0JBQ0wsV0FBVztvQkFDWCxxQkFBcUI7aUJBQ3hCO2dCQUNELE9BQU8sRUFBRSxDQUFDLG1CQUFtQixDQUFDO2dCQUM5QixZQUFZLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztnQkFDbkMsZUFBZSxFQUFFLENBQUMsbUJBQW1CLENBQUM7YUFDekM7Ozs7WUFiTyxhQUFhOzs7Ozs7O0lBZUwseUNBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Zvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0JyaWNrUmVnaXN0cnl9IGZyb20gJy4uLy4uL3dhbGwvd2FsbCc7XG5pbXBvcnQge1RleHRSZXByZXNlbnRhdGlvbn0gZnJvbSAnLi4vYmFzZS10ZXh0LWJyaWNrL2Jhc2UtdGV4dC1yZXByZXNlbnRhdGlvbi5jbGFzcyc7XG5pbXBvcnQge1F1b3RlQnJpY2tDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50L3F1b3RlLWJyaWNrLmNvbXBvbmVudCc7XG5pbXBvcnQge0NvbnRlbnRlZGl0YWJsZU1vZHVsZX0gZnJvbSAnLi4vLi4vbW9kdWxlcy9jb250ZW50ZWRpdGFibGUvY29udGVudGVkaXRhYmxlLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgQ29udGVudGVkaXRhYmxlTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbUXVvdGVCcmlja0NvbXBvbmVudF0sXG4gICAgZGVjbGFyYXRpb25zOiBbUXVvdGVCcmlja0NvbXBvbmVudF0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbUXVvdGVCcmlja0NvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUXVvdGVCcmlja01vZHVsZSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBicmlja1JlZ2lzdHJ5OiBCcmlja1JlZ2lzdHJ5KSB7XG4gICAgICAgIHRoaXMuYnJpY2tSZWdpc3RyeS5yZWdpc3Rlcih7XG4gICAgICAgICAgICB0YWc6ICdxdW90ZScsXG4gICAgICAgICAgICBjb21wb25lbnQ6IFF1b3RlQnJpY2tDb21wb25lbnQsXG4gICAgICAgICAgICBzdXBwb3J0VGV4dDogdHJ1ZSxcbiAgICAgICAgICAgIHRleHRSZXByZXNlbnRhdGlvbjogVGV4dFJlcHJlc2VudGF0aW9uLFxuICAgICAgICAgICAgbmFtZTogJ1F1b3RlJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQ2FwdHVyZSBhIHF1b3RlJ1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=