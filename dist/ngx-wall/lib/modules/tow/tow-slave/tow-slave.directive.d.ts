import { ElementRef, OnInit, Renderer2 } from '@angular/core';
import { TowCoordinator } from '../tow-coordinator.service';
export declare class TowSlaveDirective implements OnInit {
    private renderer2;
    private el;
    private towCoordinator;
    id: any;
    constructor(renderer2: Renderer2, el: ElementRef, towCoordinator: TowCoordinator);
    dragStart(event: DragEvent): void;
    drag(event: DragEvent): void;
    dragEnd(e: any): void;
    ngOnInit(): void;
}
