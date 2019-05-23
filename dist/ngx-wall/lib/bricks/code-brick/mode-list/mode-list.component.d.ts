import { StickyModalRef } from 'ngx-sticky-modal';
export interface IModeListComponentConfig {
    modes: {
        value: string;
        name: string;
    }[];
}
export declare class ModeListComponent {
    config: IModeListComponentConfig;
    private ngxStickyModalRef;
    constructor(config: IModeListComponentConfig, ngxStickyModalRef: StickyModalRef);
    onSelected(mode: string): void;
}
