/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BaseTextBrickComponent } from '../../base-text-brick/base-text-brick.component';
var QuoteBrickComponent = /** @class */ (function (_super) {
    tslib_1.__extends(QuoteBrickComponent, _super);
    function QuoteBrickComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.placeholder = 'Quote';
        return _this;
    }
    QuoteBrickComponent.decorators = [
        { type: Component, args: [{
                    selector: 'quote-brick',
                    template: "<div #editor\n     attr.placeholder=\"{{placeholder}}\"\n     (input)=\"onTextChange()\"\n     [(ngModel)]=\"scope.text\"\n     (keydown)=\"onKeyPress($event)\"\n     class=\"editor\"\n     contenteditable>\n</div>",
                    styles: ["[contenteditable]{max-width:100%;width:100%;padding-left:1.25em;padding-right:1.25em;font-size:21px}[contenteditable]:focus{outline:0}[contenteditable]:empty:before{content:attr(placeholder)}"]
                }] }
    ];
    return QuoteBrickComponent;
}(BaseTextBrickComponent));
export { QuoteBrickComponent };
if (false) {
    /** @type {?} */
    QuoteBrickComponent.prototype.placeholder;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVvdGUtYnJpY2suY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvYnJpY2tzL3F1b3RlLWJyaWNrL2NvbXBvbmVudC9xdW90ZS1icmljay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3hDLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLGlEQUFpRCxDQUFDO0FBRXZGO0lBS3lDLCtDQUFzQjtJQUwvRDtRQUFBLHFFQU9DO1FBREcsaUJBQVcsR0FBRyxPQUFPLENBQUM7O0lBQzFCLENBQUM7O2dCQVBBLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsa09BQTJDOztpQkFFOUM7O0lBR0QsMEJBQUM7Q0FBQSxBQVBELENBS3lDLHNCQUFzQixHQUU5RDtTQUZZLG1CQUFtQjs7O0lBQzVCLDBDQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QmFzZVRleHRCcmlja0NvbXBvbmVudH0gZnJvbSAnLi4vLi4vYmFzZS10ZXh0LWJyaWNrL2Jhc2UtdGV4dC1icmljay5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3F1b3RlLWJyaWNrJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcXVvdGUtYnJpY2suY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3F1b3RlLWJyaWNrLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUXVvdGVCcmlja0NvbXBvbmVudCBleHRlbmRzIEJhc2VUZXh0QnJpY2tDb21wb25lbnQge1xuICAgIHBsYWNlaG9sZGVyID0gJ1F1b3RlJztcbn1cbiJdfQ==