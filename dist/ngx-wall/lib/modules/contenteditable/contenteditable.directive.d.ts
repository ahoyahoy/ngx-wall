import { ElementRef, Renderer2 } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare class ContenteditableDirective implements ControlValueAccessor {
    private elementRef;
    private renderer;
    propValueAccessor: string;
    private onChange;
    private onTouched;
    private removeDisabledState;
    constructor(elementRef: ElementRef, renderer: Renderer2);
    callOnChange(): void;
    callOnTouched(): void;
    /**
     * Writes a new value to the element.
     * This method will be called by the forms API to write
     * to the view when programmatic (model -> view) changes are requested.
     *
     * See: [ControlValueAccessor](https://angular.io/api/forms/ControlValueAccessor#members)
     */
    writeValue(value: any): void;
    /**
     * Registers a callback function that should be called when
     * the control's value changes in the UI.
     *
     * This is called by the forms API on initialization so it can update
     * the form model when values propagate from the view (view -> model).
     */
    registerOnChange(fn: () => void): void;
    /**
     * Registers a callback function that should be called when the control receives a blur event.
     * This is called by the forms API on initialization so it can update the form model on blur.
     */
    registerOnTouched(fn: () => void): void;
    /**
     * This function is called by the forms API when the control status changes to or from "DISABLED".
     * Depending on the value, it should enable or disable the appropriate DOM element.
     */
    setDisabledState(isDisabled: boolean): void;
    private listenerDisabledState;
}
