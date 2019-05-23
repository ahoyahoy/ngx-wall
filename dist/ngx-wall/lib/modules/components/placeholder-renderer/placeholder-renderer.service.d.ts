import { ApplicationRef, ComponentFactoryResolver, Injector } from '@angular/core';
export declare class PlaceholderRenderer {
    private componentFactoryResolver;
    private appRef;
    private injector;
    private placeholderComponentRef;
    constructor(componentFactoryResolver: ComponentFactoryResolver, appRef: ApplicationRef, injector: Injector);
    render(x: number, y: number, size: number, isHorizontal?: boolean): void;
    clear(): void;
    private renderPlaceholderComponent;
    private removePlaceholderComponent;
    private setCoordinate;
}
