/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { BaseTextBrickComponent } from '../../base-text-brick/base-text-brick.component';
export class HeaderBrickComponent extends BaseTextBrickComponent {
    constructor() {
        super(...arguments);
        this.placeholder = 'Header';
    }
}
HeaderBrickComponent.decorators = [
    { type: Component, args: [{
                selector: 'header-brick',
                template: "<div #editor\n     attr.placeholder=\"{{placeholder}}\"\n     (input)=\"onTextChange()\"\n     [(ngModel)]=\"scope.text\"\n     [ngClass]=\"'header-brick-tabs-' + scope.tabs\"\n     (keydown)=\"onKeyPress($event)\"\n     class=\"text-brick__editor\"\n     contenteditable>\n</div>\n",
                styles: ["div{display:block}div[contenteditable]{letter-spacing:-.002em;word-break:break-all;padding:6px 2px;margin:8px 0 0}div[contenteditable]:focus{outline:0}div[contenteditable]:empty:before{content:attr(placeholder)}div.header-brick-tabs-1{margin-left:1.5rem}div.header-brick-tabs-2{margin-left:3rem}div.header-brick-tabs-3{margin-left:4.5rem}"]
            }] }
];
if (false) {
    /** @type {?} */
    HeaderBrickComponent.prototype.placeholder;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWJyaWNrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL2JyaWNrcy9oZWFkZXItYnJpY2svY29tcG9uZW50L2hlYWRlci1icmljay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEMsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0saURBQWlELENBQUM7QUFPdkYsTUFBTSxPQUFPLG9CQUFxQixTQUFRLHNCQUFzQjtJQUxoRTs7UUFNSSxnQkFBVyxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDOzs7WUFQQSxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLHNTQUE0Qzs7YUFFL0M7Ozs7SUFFRywyQ0FBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Jhc2VUZXh0QnJpY2tDb21wb25lbnR9IGZyb20gJy4uLy4uL2Jhc2UtdGV4dC1icmljay9iYXNlLXRleHQtYnJpY2suY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdoZWFkZXItYnJpY2snLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9oZWFkZXItYnJpY2suY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2hlYWRlci1icmljay5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEhlYWRlckJyaWNrQ29tcG9uZW50IGV4dGVuZHMgQmFzZVRleHRCcmlja0NvbXBvbmVudCB7XG4gICAgcGxhY2Vob2xkZXIgPSAnSGVhZGVyJztcbn1cbiJdfQ==