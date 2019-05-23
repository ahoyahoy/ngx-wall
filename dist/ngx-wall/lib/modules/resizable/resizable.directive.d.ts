import { ComponentFactoryResolver, NgZone, OnInit, ViewContainerRef } from '@angular/core';
export interface IResizeData {
    xInitial: number;
    xCurrent: number;
    offset: number;
    isLeftDirection: boolean;
    isRightDirection: boolean;
}
/**
 * @description
 * 1. dynamically add left and right handlers
 * 2. allow to show/hide handlers
 * 3. call callback, where to pass
 *  - distance on which handlers is moved
 *  - handler type (left of right)
 */
export declare class ResizableDirective implements OnInit {
    private el;
    private zone;
    private cfr;
    private doc;
    wResizable: {
        resize: (resizeData: IResizeData) => void;
        resizeStart: (resizeData: IResizeData) => void;
        resizeEnd: (resizeData: IResizeData) => void;
    };
    private resizeData;
    constructor(el: ViewContainerRef, zone: NgZone, cfr: ComponentFactoryResolver, doc: any);
    ngOnInit(): void;
    private createHandler;
    private mouseDownHandler;
}
