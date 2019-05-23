import { IBrickSpecification } from './interfaces/brick-specification.interface';
export declare class BrickRegistry {
    private bricks;
    register(brickConfiguration: IBrickSpecification): void;
    get(tag: string): IBrickSpecification;
    getAll(): IBrickSpecification[];
}
