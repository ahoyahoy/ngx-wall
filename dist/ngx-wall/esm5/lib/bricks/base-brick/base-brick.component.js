/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { StickyPositionStrategy } from 'ngx-sticky-modal';
/**
 * @param {?} el
 * @param {?} resolver
 * @param {?} component
 * @return {?}
 */
export function getModalConfig(el, resolver, component) {
    /** @type {?} */
    var elementBoundingRect = el.nativeElement.getBoundingClientRect();
    /** @type {?} */
    var elementHeight = el.nativeElement.offsetHeight;
    console.log('Getting modal config for:', el);
    console.log(el.nativeElement);
    console.log('BoundingRect:', elementBoundingRect);
    console.log('Height:', elementHeight);
    return {
        component: component,
        positionStrategy: {
            name: StickyPositionStrategy.coordinate,
            options: {
                clientX: elementBoundingRect.x,
                clientY: elementBoundingRect.y + elementHeight + window.scrollY
            }
        },
        componentFactoryResolver: resolver,
        closeOnEscape: true
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1icmljay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2FsbC8iLCJzb3VyY2VzIjpbImxpYi9icmlja3MvYmFzZS1icmljay9iYXNlLWJyaWNrLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7Ozs7Ozs7QUFJeEQsTUFBTSxVQUFVLGNBQWMsQ0FBQyxFQUFjLEVBQUUsUUFBa0MsRUFBRSxTQUFjOztRQUN2RixtQkFBbUIsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFOztRQUM5RCxhQUFhLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxZQUFZO0lBRW5ELE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztJQUNsRCxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUV0QyxPQUFPO1FBQ0gsU0FBUyxFQUFFLFNBQVM7UUFDcEIsZ0JBQWdCLEVBQUU7WUFDZCxJQUFJLEVBQUUsc0JBQXNCLENBQUMsVUFBVTtZQUN2QyxPQUFPLEVBQUU7Z0JBQ0wsT0FBTyxFQUFFLG1CQUFtQixDQUFDLENBQUM7Z0JBQzlCLE9BQU8sRUFBRSxtQkFBbUIsQ0FBQyxDQUFDLEdBQUcsYUFBYSxHQUFHLE1BQU0sQ0FBQyxPQUFPO2FBQ2xFO1NBQ0o7UUFDRCx3QkFBd0IsRUFBRSxRQUFRO1FBQ2xDLGFBQWEsRUFBRSxJQUFJO0tBQ3RCLENBQUM7QUFDTixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTdGlja3lQb3NpdGlvblN0cmF0ZWd5fSBmcm9tICduZ3gtc3RpY2t5LW1vZGFsJztcbmltcG9ydCB7Q29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBFbGVtZW50UmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SVN0aWNreU1vZGFsQ29uZmlnfSBmcm9tICduZ3gtc3RpY2t5LW1vZGFsL2xpYi9zdGlja3ktbW9kYWwtY29uZmlnLmludGVyZmFjZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNb2RhbENvbmZpZyhlbDogRWxlbWVudFJlZiwgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgY29tcG9uZW50OiBhbnkpOiBJU3RpY2t5TW9kYWxDb25maWcge1xuICAgIGNvbnN0IGVsZW1lbnRCb3VuZGluZ1JlY3QgPSBlbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IGVsZW1lbnRIZWlnaHQgPSBlbC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodDtcblxuICAgIGNvbnNvbGUubG9nKCdHZXR0aW5nIG1vZGFsIGNvbmZpZyBmb3I6JywgZWwpO1xuICAgIGNvbnNvbGUubG9nKGVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgIGNvbnNvbGUubG9nKCdCb3VuZGluZ1JlY3Q6JywgZWxlbWVudEJvdW5kaW5nUmVjdCk7XG4gICAgY29uc29sZS5sb2coJ0hlaWdodDonLCBlbGVtZW50SGVpZ2h0KTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGNvbXBvbmVudDogY29tcG9uZW50LFxuICAgICAgICBwb3NpdGlvblN0cmF0ZWd5OiB7XG4gICAgICAgICAgICBuYW1lOiBTdGlja3lQb3NpdGlvblN0cmF0ZWd5LmNvb3JkaW5hdGUsXG4gICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgY2xpZW50WDogZWxlbWVudEJvdW5kaW5nUmVjdC54LFxuICAgICAgICAgICAgICAgIGNsaWVudFk6IGVsZW1lbnRCb3VuZGluZ1JlY3QueSArIGVsZW1lbnRIZWlnaHQgKyB3aW5kb3cuc2Nyb2xsWVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IHJlc29sdmVyLFxuICAgICAgICBjbG9zZU9uRXNjYXBlOiB0cnVlXG4gICAgfTtcbn1cbiJdfQ==