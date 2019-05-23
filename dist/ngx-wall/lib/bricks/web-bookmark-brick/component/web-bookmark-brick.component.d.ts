import { ComponentFactoryResolver, ElementRef, EventEmitter, OnInit } from '@angular/core';
import { StickyModalService } from 'ngx-sticky-modal';
import { IWebBookmarkBrickState } from '../web-bookmark-brick-state.interface';
export declare class WebBookmarkBrickComponent implements OnInit {
    private el;
    private componentFactoryResolver;
    private ngxStickyModalService;
    id: string;
    state: IWebBookmarkBrickState;
    stateChanges: EventEmitter<IWebBookmarkBrickState>;
    scope: IWebBookmarkBrickState;
    loading: boolean;
    constructor(el: ElementRef, componentFactoryResolver: ComponentFactoryResolver, ngxStickyModalService: StickyModalService);
    ngOnInit(): void;
    onWallStateChange(newState: IWebBookmarkBrickState): void;
    applySrc(src: string): void;
    showPanel(): void;
    onWallFocus(): void;
    private save;
    private getWebPageMetaInfo;
    private isValidUrl;
}
