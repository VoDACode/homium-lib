import { Position, SceneObjectMargin, SceneObjectType } from "../types/scene.types";

export class SceneObject{
    type: SceneObjectType;
    position: Position;
    positionType: 'absolute' | 'relative' | 'fixed' = 'absolute';
    src: string | null = null;
    value: string | null = null;
    href: string | null = null;
    
    id: string | null = null;
    classNames: string[] = [];

    margin: SceneObjectMargin | null = null;
    padding: SceneObjectMargin | null = null;
    borderRadius: SceneObjectMargin | null = null;

    bagroundColor: string | null = null;
    color: string | null = null;

    html: string | null = null;

    backgroundColor: string | null = null;
    backgroundImage: string | null = null;
    
    parent: SceneObject | null = null;

    children: SceneObject[] = [];

    constructor(type: SceneObjectType, position: Position){
        this.position = position;
        this.type = type;
    }
}