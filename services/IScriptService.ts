import { ScriptModel } from "../models";
import { ScriptArgument } from "../types/script.types";
import { IBaseService } from "./IBaseService";

export class IScriptService implements IBaseService{
    public start(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    public stop(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    public get name(): string {
        throw new Error("Method not implemented.");
    }
    public async executeScript(id: string, args: ScriptArgument): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public async createScript(script: ScriptModel): Promise<string> {
        throw new Error("Method not implemented.");
    }

    public async updateScript(script: ScriptModel): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async updateScriptCode(id: string, code: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async isAllowAnonymous(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public async deleteScript(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async getIds(): Promise<string[]> {
        throw new Error("Method not implemented.");
    }

    public async getScript(id: string): Promise<ScriptModel> {
        throw new Error("Method not implemented.");
    }
}