/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BaseTextBrickComponent } from '../../base-text-brick/base-text-brick.component';
var HeaderBrickComponent = /** @class */ (function (_super) {
    tslib_1.__extends(HeaderBrickComponent, _super);
    function HeaderBrickComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.placeholder = 'Header';
        return _this;
    }
    HeaderBrickComponent.decorators = [
        { type: Component, args: [{
                    selector: 'header-brick',
                    template: "<div #editor\n     attr.placeholder=\"{{placeholder}}\"\n     (input)=\"onTextChange()\"\n     [(ngModel)]=\"scope.text\"\n     [ngClass]=\"'header-brick-tabs-' + scope.tabs\"\n     (keydown)=\"onKeyPress($event)\"\n     class=\"text-brick__editor\"\n     contenteditable>\n</div>\n",
                    styles: ["div{display:block}div[contenteditable]{letter-spacing:-.002em;word-break:break-all;padding:6px 2px;margin:8px 0 0}div[contenteditable]:focus{outline:0}div[contenteditable]:empty:before{content:attr(placeholder)}div.header-brick-tabs-1{margin-left:1.5rem}div.header-brick-tabs-2{margin-left:3rem}div.header-brick-tabs-3{margin-left:4.5rem}"]
                }] }
    ];
    return HeaderBrickComponent;
}(BaseTextBrickComponent));
export { HeaderBrickComponent };
if (false) {
    /** @type {?} */
    HeaderBrickComponent.prototype.placeholder;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWJyaWNrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13YWxsLyIsInNvdXJjZXMiOlsibGliL2JyaWNrcy9oZWFkZXItYnJpY2svY29tcG9uZW50L2hlYWRlci1icmljay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3hDLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLGlEQUFpRCxDQUFDO0FBRXZGO0lBSzBDLGdEQUFzQjtJQUxoRTtRQUFBLHFFQU9DO1FBREcsaUJBQVcsR0FBRyxRQUFRLENBQUM7O0lBQzNCLENBQUM7O2dCQVBBLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsY0FBYztvQkFDeEIsc1NBQTRDOztpQkFFL0M7O0lBR0QsMkJBQUM7Q0FBQSxBQVBELENBSzBDLHNCQUFzQixHQUUvRDtTQUZZLG9CQUFvQjs7O0lBQzdCLDJDQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QmFzZVRleHRCcmlja0NvbXBvbmVudH0gZnJvbSAnLi4vLi4vYmFzZS10ZXh0LWJyaWNrL2Jhc2UtdGV4dC1icmljay5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2hlYWRlci1icmljaycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2hlYWRlci1icmljay5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vaGVhZGVyLWJyaWNrLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgSGVhZGVyQnJpY2tDb21wb25lbnQgZXh0ZW5kcyBCYXNlVGV4dEJyaWNrQ29tcG9uZW50IHtcbiAgICBwbGFjZWhvbGRlciA9ICdIZWFkZXInO1xufVxuIl19