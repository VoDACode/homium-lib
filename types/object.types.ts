import { ObjectModel } from "../models";
import { ServiceEvent } from "./service.types";

export type UpdateObjectEvent = (object: ObjectModel) => void;
export type ObjectPropertyUpdateEvent = (object: ObjectModel, property: string, value: any) => void;

export type ObjectEventType = "loaded" | 'save' | 'saveObject' | 'clearCache' |
    'objectAdded' | 'objectRemoved' | 'objectUpdated' |
    'propertyUpdated' |
    'publishObjects' | 'publishObject' | 'publishObjectProperty' |
    ServiceEvent;