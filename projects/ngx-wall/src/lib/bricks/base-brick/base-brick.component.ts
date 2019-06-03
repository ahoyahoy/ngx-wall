import {StickyPositionStrategy} from 'ngx-sticky-modal';
import {ComponentFactoryResolver, ElementRef} from '@angular/core';
import {IStickyModalConfig} from 'ngx-sticky-modal/lib/sticky-modal-config.interface';

export function getModalConfig(el: ElementRef, resolver: ComponentFactoryResolver, component: any): IStickyModalConfig {
    const elementBoundingRect = el.nativeElement.getBoundingClientRect();
    const elementHeight = el.nativeElement.offsetHeight;

    console.log('Getting modal config for:', el);
    console.log(el.nativeElement);
    console.log('BoundingRect:', elementBoundingRect);
    console.log('Height:', elementHeight);

    return {
        component: component,
        positionStrategy: {
            name: StickyPositionStrategy.coordinate,
            options: {
                clientX: elementBoundingRect.x,
                clientY: elementBoundingRect.y + elementHeight + window.scrollY
            }
        },
        componentFactoryResolver: resolver,
        closeOnEscape: true
    };
}
