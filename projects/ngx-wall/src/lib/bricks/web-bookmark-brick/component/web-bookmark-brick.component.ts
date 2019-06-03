import {Component, ComponentFactoryResolver, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StickyModalRef, StickyModalService, StickyPositionStrategy} from 'ngx-sticky-modal';
import {IWebBookmarkBrickState} from '../web-bookmark-brick-state.interface';
import {InputContextComponent} from '../input-context/input-context.component';
import {getModalConfig} from '../../base-brick/base-brick.component';
import {BricksListComponent} from '../../text-brick/bricks-list/bricks-list.component';

@Component({
    selector: 'web-bookmark-brick',
    templateUrl: './web-bookmark-brick.component.html',
    styleUrls: ['./web-bookmark-brick.component.scss']
})
export class WebBookmarkBrickComponent implements OnInit {
    @Input() id: string;
    @Input() state: IWebBookmarkBrickState;

    @Output() stateChanges: EventEmitter<IWebBookmarkBrickState> = new EventEmitter();

    scope: IWebBookmarkBrickState = {
        src: null,
        description: null,
        image: {
            height: null,
            width: null,
            url: null
        },
        logo: {
            height: null,
            width: null,
            url: null
        },
        title: null,
        author: null
    };

    loading = false;
    modalRef: StickyModalRef;

    constructor(private el: ElementRef,
                private componentFactoryResolver: ComponentFactoryResolver,
                private ngxStickyModalService: StickyModalService) {
    }

    ngOnInit() {
        Object.assign(this.scope, this.state);
    }

    onWallStateChange(newState: IWebBookmarkBrickState) {
        if (newState && newState.src !== this.scope.src) {
            Object.assign(this.scope, this.state);
        }
    }

    applySrc(src: string) {
        if (src.length) {
            if (this.isValidUrl(src)) {
                this.loading = true;

                this.getWebPageMetaInfo(src).then((webPageMetaInfo) => {
                    Object.assign(this.scope, webPageMetaInfo);

                    this.scope.src = src;

                    this.save();

                    this.loading = false;
                }, () => {
                    this.loading = false;
                });
            } else {
                alert('Url is invalid');
            }
        }
    }

    showPanel() {
        if (!this.loading) {
            const modalConfig = getModalConfig(this.el, this.componentFactoryResolver, InputContextComponent);
            this.modalRef = this.ngxStickyModalService.open(modalConfig);
            this.modalRef.result.then(result => {
                this.modalRef = null;
                this.applySrc(result.src);
            }, () => {
                this.modalRef = null;
            });
        }
    }

    onWallFocus(): void {
        if (!this.scope.src) {
            setTimeout(() => {
                this.showPanel();
            }, 0);
        }
    }

    private save() {
        this.stateChanges.emit(this.scope);
    }

    private getWebPageMetaInfo(url: string): Promise<any> {
        return fetch(`https://api.microlink.io/?url=${url}`).then((page) => {
            return page.json().then((pageMetadata) => {
                const {
                    image,
                    description,
                    logo,
                    title,
                    author
                } = pageMetadata.data;

                return {
                    image,
                    description,
                    logo,
                    title,
                    author
                };
            });
        });
    }

    private isValidUrl(src: string): boolean {
        let url;

        try {
            url = new URL(src);
        } catch (e) {
        }

        return Boolean(url);
    }
}
