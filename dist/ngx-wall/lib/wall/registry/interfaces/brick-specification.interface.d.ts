import { IBrickDestructor } from './brick-destructor.interface';
import { IBrickResourcePaths } from './brick-resource-paths.interface';
import { IBrickTextRepresentationConstructor } from './brick-text-representation-constructor.interface';
export interface IBrickSpecification {
    tag: string;
    component: any;
    name: string;
    description: string;
    supportText?: boolean;
    textRepresentation?: IBrickTextRepresentationConstructor;
    destructor?: IBrickDestructor;
    getBrickResourcePaths?: IBrickResourcePaths;
}
