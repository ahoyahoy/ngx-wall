import { ComponentFactoryResolver, ElementRef, EventEmitter, OnInit, Renderer2 } from '@angular/core';
import { StickyModalRef, StickyModalService } from 'ngx-sticky-modal';
import { IOnWallFocus } from '../../../wall/wall';
import { IVideoBrickState } from '../video-brick-state.interface';
export declare class VideoBrickComponent implements OnInit, IOnWallFocus {
    private renderer2;
    private el;
    private componentFactoryResolver;
    private ngxStickyModalService;
    id: string;
    state: IVideoBrickState;
    stateChanges: EventEmitter<IVideoBrickState>;
    iframe: ElementRef;
    uiStates: any;
    uiState: string;
    scope: IVideoBrickState;
    videoSrcPlaceholderRef: StickyModalRef;
    constructor(renderer2: Renderer2, el: ElementRef, componentFactoryResolver: ComponentFactoryResolver, ngxStickyModalService: StickyModalService);
    ngOnInit(): void;
    onWallStateChange(newState: IVideoBrickState): void;
    onWallFocus(): void;
    applySrc(src: string): void;
    showVideoPanel(): void;
    private save;
}
