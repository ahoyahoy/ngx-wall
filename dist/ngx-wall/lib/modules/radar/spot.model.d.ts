import { SpotDirective } from './directive/spot.directive';
import { ISpotPosition, ISpotSize } from './interfaces/distance-to-spot.interface';
import { SpotId } from './interfaces/spot-id.type';
export declare class SpotModel {
    id: SpotId;
    data: any;
    position: ISpotPosition;
    size: ISpotSize;
    private instance;
    constructor(instance: SpotDirective);
    updateInfo(): void;
    isCross13Line(y: any): boolean;
    getMinimalDistanceToPoint(x: number, y: number): any;
    getDistanceToTopLeftPoint(x: number, y: number): number;
    getDistanceToBottomLeftPoint(x: number, y: number): number;
    getDistanceToLeftCenterPoint(x: number, y: number): number;
    isPointInsideSpot(x: number, y: number): boolean;
}
