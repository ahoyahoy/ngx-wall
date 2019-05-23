import { ComponentFactoryResolver, ElementRef, EventEmitter, OnInit } from '@angular/core';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/shell/shell';
import 'codemirror/mode/xml/xml';
import { StickyModalService } from 'ngx-sticky-modal';
export interface ICodeBrickState {
    code: string;
    mode: string;
}
export declare class CodeBrickComponent implements OnInit {
    private ngxStickyModalService;
    private componentFactoryResolver;
    scope: ICodeBrickState;
    ui: {
        displayModeName: string;
    };
    codeMirrorInstance: any;
    id: string;
    state: ICodeBrickState;
    container: ElementRef;
    mode: ElementRef;
    stateChanges: EventEmitter<ICodeBrickState>;
    constructor(ngxStickyModalService: StickyModalService, componentFactoryResolver: ComponentFactoryResolver);
    ngOnInit(): void;
    onWallStateChange(newState: ICodeBrickState): void;
    processNewState(): void;
    saveState(): void;
    onModeSelected(): void;
}
