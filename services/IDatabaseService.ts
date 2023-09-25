import { Collection, Db } from "mongodb";
import { BotModel, ExtensionModel, ObjectModel, SceneModel, ScriptModel, SectorModel, SessionModel, UserModel } from "../models";
import { IBaseService } from "./IBaseService";

export class IDatabaseService implements IBaseService{
    start(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    stop(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    get name(): string {
        throw new Error("Method not implemented.");
    }
    public get db(): Db {
        throw new Error("Method not implemented.");
    }

    public connect(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public get users() : Collection<UserModel> {
        throw new Error("Method not implemented.");
    }

    public get sessions(): Collection<SessionModel> {
        throw new Error("Method not implemented.");
    }

    public get extensions(): Collection<ExtensionModel> {
        throw new Error("Method not implemented.");
    }

    public get objects(): Collection<ObjectModel> {
        throw new Error("Method not implemented.");
    }

    public get scripts(): Collection<ScriptModel> {
        throw new Error("Method not implemented.");
    }

    public get scenes(): Collection<SceneModel> {
        throw new Error("Method not implemented.");
    }

    public get sectors(): Collection<SectorModel> {
        throw new Error("Method not implemented.");
    }

    public get bots(): Collection<BotModel> {
        throw new Error("Method not implemented.");
    }
}