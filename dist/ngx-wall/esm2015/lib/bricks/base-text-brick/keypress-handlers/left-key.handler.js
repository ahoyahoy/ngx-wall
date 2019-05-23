/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FOCUS_INITIATOR } from '../base-text-brick.constant';
export class LeftKeyHandler {
    /**
     * @param {?} baseTextBrickComponent
     */
    constructor(baseTextBrickComponent) {
        this.baseTextBrickComponent = baseTextBrickComponent;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    execute(e) {
        e.preventDefault();
        /** @type {?} */
        const focusContext = {
            initiator: FOCUS_INITIATOR,
            details: {
                leftKey: true
            }
        };
        this.baseTextBrickComponent.wallUiApi
            .focusOnPreviousTextBrick(this.baseTextBrickComponent.id, focusContext);
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    LeftKeyHandler.prototype.baseTextBrickComponent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVmdC1rZXkuaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL2JyaWNrcy9iYXNlLXRleHQtYnJpY2sva2V5cHJlc3MtaGFuZGxlcnMvbGVmdC1rZXkuaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBRTVELE1BQU0sT0FBTyxjQUFjOzs7O0lBQ3ZCLFlBQW9CLHNCQUE4QztRQUE5QywyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO0lBQ2xFLENBQUM7Ozs7O0lBRUQsT0FBTyxDQUFDLENBQWdCO1FBQ3BCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7Y0FFYixZQUFZLEdBQWtCO1lBQ2hDLFNBQVMsRUFBRSxlQUFlO1lBQzFCLE9BQU8sRUFBRTtnQkFDTCxPQUFPLEVBQUUsSUFBSTthQUNoQjtTQUNKO1FBRUQsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFNBQVM7YUFDaEMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUNoRixDQUFDO0NBQ0o7Ozs7OztJQWhCZSxnREFBc0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0lGb2N1c0NvbnRleHR9IGZyb20gJy4uLy4uLy4uL3dhbGwvd2FsbCc7XG5pbXBvcnQge0Jhc2VUZXh0QnJpY2tDb21wb25lbnR9IGZyb20gJy4uL2Jhc2UtdGV4dC1icmljay5jb21wb25lbnQnO1xuaW1wb3J0IHtGT0NVU19JTklUSUFUT1J9IGZyb20gJy4uL2Jhc2UtdGV4dC1icmljay5jb25zdGFudCc7XG5cbmV4cG9ydCBjbGFzcyBMZWZ0S2V5SGFuZGxlciB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBiYXNlVGV4dEJyaWNrQ29tcG9uZW50OiBCYXNlVGV4dEJyaWNrQ29tcG9uZW50KSB7XG4gICAgfVxuXG4gICAgZXhlY3V0ZShlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCBmb2N1c0NvbnRleHQ6IElGb2N1c0NvbnRleHQgPSB7XG4gICAgICAgICAgICBpbml0aWF0b3I6IEZPQ1VTX0lOSVRJQVRPUixcbiAgICAgICAgICAgIGRldGFpbHM6IHtcbiAgICAgICAgICAgICAgICBsZWZ0S2V5OiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5iYXNlVGV4dEJyaWNrQ29tcG9uZW50LndhbGxVaUFwaVxuICAgICAgICAgICAgLmZvY3VzT25QcmV2aW91c1RleHRCcmljayh0aGlzLmJhc2VUZXh0QnJpY2tDb21wb25lbnQuaWQsIGZvY3VzQ29udGV4dCk7XG4gICAgfVxufVxuIl19