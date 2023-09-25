import { ObjectModel } from "../models";
import { ObjectEventType, ObjectPropertyUpdateEvent, UpdateObjectEvent } from "../types/object.types";
import { ScriptArgument, ScriptTargetEvent } from "../types/script.types";
import { IBaseService } from "./IBaseService";

export class IObjectService implements IBaseService{
    public start(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    public stop(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    public get name(): string {
        return "ObjectService";
    }

    public get saveDelay(): number {
        throw new Error("Method not implemented.");
    }

    public set saveDelay(value: number) {
        throw new Error("Method not implemented.");
    }

    public get count(): number {
        throw new Error("Method not implemented.");
    }

    public add(object: ObjectModel): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public async get(id: string): Promise<ObjectModel | undefined> {
        throw new Error("Method not implemented.");
    }

    public async remove(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public async setChildren(parentId: string, childrenIds: string[]): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public async update(id: string, object: ObjectModel): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public updateObject(id: string, prop: string, value: any): boolean {
        throw new Error("Method not implemented.");
    }

    public async reload(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async any(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public clearCache(): void {
        throw new Error("Method not implemented.");
    }

    public addEventListener(id: string, eventType: ObjectEventType | ScriptTargetEvent, callback: UpdateObjectEvent | ObjectPropertyUpdateEvent | Function | ((args: ScriptArgument) => void)): boolean {
        throw new Error("Method not implemented.");
    }

    public removeEventListener(id: string, eventType: ObjectEventType | ScriptTargetEvent, callback: Function): boolean {
        throw new Error("Method not implemented.");
    }
}