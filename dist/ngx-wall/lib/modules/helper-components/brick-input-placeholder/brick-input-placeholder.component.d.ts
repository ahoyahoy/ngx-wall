import { EventEmitter, OnInit } from '@angular/core';
export declare class BrickInputPlaceholderComponent implements OnInit {
    text: string;
    icon: string;
    loading: boolean;
    selected: EventEmitter<MouseEvent>;
    constructor();
    onClick(event: MouseEvent): void;
    ngOnInit(): void;
}
