import { SceneObject } from './scene-object.model';

export class SceneModel {
    id: string;
    name: string;
    description: string;
    screenshot: string | null = null;
    sceneObjects: SceneObject[] = [];
    constructor(id: string, name: string, description: string){
        this.id = id;
        this.name = name;
        this.description = description;
    }
}