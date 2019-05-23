import { ElementRef, OnInit } from '@angular/core';
import { StickyModalRef } from 'ngx-sticky-modal';
export declare class InputContextComponent implements OnInit {
    private ngxStickyModalRef;
    srcInput: ElementRef;
    constructor(ngxStickyModalRef: StickyModalRef);
    ngOnInit(): void;
    applyImageSrc(): void;
    onFileChange(event: any): void;
    notify(data: any): void;
    onSubmit(e: any): void;
}
