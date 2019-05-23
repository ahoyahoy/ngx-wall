import { EventEmitter } from '@angular/core';
export declare class ResizableHandlerComponent {
    customClassName: string;
    mouseDownEvent: EventEmitter<MouseEvent>;
    mouseDown(event: MouseEvent): void;
}
