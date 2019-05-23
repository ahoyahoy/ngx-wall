/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { BaseTextBrickComponent } from '../../base-text-brick/base-text-brick.component';
export class QuoteBrickComponent extends BaseTextBrickComponent {
    constructor() {
        super(...arguments);
        this.placeholder = 'Quote';
    }
}
QuoteBrickComponent.decorators = [
    { type: Component, args: [{
                selector: 'quote-brick',
                template: "<div #editor\n     attr.placeholder=\"{{placeholder}}\"\n     (input)=\"onTextChange()\"\n     [(ngModel)]=\"scope.text\"\n     (keydown)=\"onKeyPress($event)\"\n     class=\"editor\"\n     contenteditable>\n</div>",
                styles: ["[contenteditable]{max-width:100%;width:100%;padding-left:1.25em;padding-right:1.25em;font-size:21px}[contenteditable]:focus{outline:0}[contenteditable]:empty:before{content:attr(placeholder)}"]
            }] }
];
if (false) {
    /** @type {?} */
    QuoteBrickComponent.prototype.placeholder;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVvdGUtYnJpY2suY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvYnJpY2tzL3F1b3RlLWJyaWNrL2NvbXBvbmVudC9xdW90ZS1icmljay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEMsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0saURBQWlELENBQUM7QUFPdkYsTUFBTSxPQUFPLG1CQUFvQixTQUFRLHNCQUFzQjtJQUwvRDs7UUFNSSxnQkFBVyxHQUFHLE9BQU8sQ0FBQztJQUMxQixDQUFDOzs7WUFQQSxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLGtPQUEyQzs7YUFFOUM7Ozs7SUFFRywwQ0FBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Jhc2VUZXh0QnJpY2tDb21wb25lbnR9IGZyb20gJy4uLy4uL2Jhc2UtdGV4dC1icmljay9iYXNlLXRleHQtYnJpY2suY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdxdW90ZS1icmljaycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3F1b3RlLWJyaWNrLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9xdW90ZS1icmljay5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFF1b3RlQnJpY2tDb21wb25lbnQgZXh0ZW5kcyBCYXNlVGV4dEJyaWNrQ29tcG9uZW50IHtcbiAgICBwbGFjZWhvbGRlciA9ICdRdW90ZSc7XG59XG4iXX0=