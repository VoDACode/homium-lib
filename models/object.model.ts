import { ObjectProperty } from "./object-property.model";

export class ObjectModel{
    public name: string;
    public parentId: string | null;
    public children: string[] = [];
    public id: string;
    public description: string | null;
    public properties: ObjectProperty[] = [];
    public allowAnonymous: boolean;
    public systemObject: boolean;
    public updatedAt: number = Date.now();
    
    constructor(name: string, parentId: string | null, id: string, description: string | null, properties: ObjectProperty[], allowAnonymous: boolean = false, systemObject: boolean = false, updatedAt: number = Date.now()){
        this.name = name;
        this.parentId = parentId;
        this.id = id;
        this.description = description;
        this.properties = properties;
        this.allowAnonymous = allowAnonymous;
        this.systemObject = systemObject;
        this.updatedAt = updatedAt;
    }
}