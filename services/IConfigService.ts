import { IConfigScheme } from "../schemas";

export class IConfigService{
    public get loaded(): boolean {
        throw new Error("Method not implemented.");
    }
    public getPath(): string{
        throw new Error("Method not implemented.");
    }

    public get config(): IConfigScheme {
        throw new Error("Method not implemented.");
    }

    public async loadConfig(): Promise<void>{
        throw new Error("Method not implemented.");
    }
}