import { IBrickTextRepresentation } from './brick-text-representation.interface';
import { IBrickSnapshot } from '../../model/interfaces/brick-snapshot.interface';
export interface IBrickTextRepresentationConstructor {
    new (brickSnapshot: IBrickSnapshot): IBrickTextRepresentation;
}
