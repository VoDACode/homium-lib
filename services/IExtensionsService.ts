import { Extension } from "../extension";
import { ExtensionModel } from "../models";

export class IExtensionsService{
    get count(): number {
        throw new Error("Method not implemented.");
    }

    get getContext(): any {
        throw new Error("Method not implemented.");
    }

    add(extension: Extension, original: any, info: ExtensionModel, folder: string): void {
        throw new Error("Method not implemented.");
    }

    getOriginal(name: string, searchBy: 'name' | 'folder' | 'id'): any {
        throw new Error("Method not implemented.");
    }

    get(name: string, searchBy: 'name' | 'folder' | 'id'): Extension | undefined {
        throw new Error("Method not implemented.");
    }

    reload(name: string, searchBy: 'name' | 'folder' | 'id'): boolean {
        throw new Error("Method not implemented.");
    }

    remove(name: string, searchBy: 'name' | 'folder' | 'id'): boolean {
        throw new Error("Method not implemented.");
    }

    any(name: string, searchBy: 'name' | 'folder' | 'id'): boolean {
        throw new Error("Method not implemented.");
    }

    addEventListener(name: string, searchBy: 'name' | 'folder' | 'id', event: string, callback: (...args: any[]) => void): void {
        throw new Error("Method not implemented.");
    }

    get allInfo(): ExtensionModel[] {
        throw new Error("Method not implemented.");
    }
}