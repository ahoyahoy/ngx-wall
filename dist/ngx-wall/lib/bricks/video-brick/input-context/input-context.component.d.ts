import { ElementRef, OnInit } from '@angular/core';
import { StickyModalRef } from 'ngx-sticky-modal';
export declare class InputContextComponent implements OnInit {
    private ngxStickyModalRef;
    srcInput: ElementRef;
    constructor(ngxStickyModalRef: StickyModalRef);
    ngOnInit(): void;
    applySrc(): void;
    onSubmit(e: any): void;
}
