import { IBaseService } from "./IBaseService";

export class ISystemService implements IBaseService{
    start(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    stop(exit: boolean = true): Promise<void> {
        throw new Error("Method not implemented.");
    }
    get name(): string {
        throw new Error("Method not implemented.");
    }
    public async restart(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}