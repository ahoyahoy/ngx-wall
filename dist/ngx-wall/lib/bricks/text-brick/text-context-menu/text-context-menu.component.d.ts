import { ElementRef, OnInit } from '@angular/core';
import { ITextBrickApi } from '../text-brick-api.interface';
export interface ITextContextMenuComponent {
    api: ITextBrickApi;
}
export declare class TextContextMenuComponent implements OnInit {
    config: ITextContextMenuComponent;
    linkEl: ElementRef;
    ui: {
        showLinkForm: boolean;
    };
    constructor(config: ITextContextMenuComponent);
    ngOnInit(): void;
    bold(): void;
    italic(): void;
    link(): void;
    applyLink(): void;
    unlink(): void;
    switchLinkFormVisibility(): void;
}
