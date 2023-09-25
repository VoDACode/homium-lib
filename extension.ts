import path from "path";
import serviceManager from "./services/ServiceManager";
import { IExtensionsService } from "./services/IExtensionsService";
import { ILogger } from "./services/ILogger";
import { ScriptArgument } from "./types/script.types";
import { IDatabaseService } from "./services/IDatabaseService";

export type EventName = {
    name: string;
    description: string;
};

export abstract class Extension  {
    private _id: string;
    private _storage: Storage;
    private _logger: ILogger;
    private _events: [string, Function][] = [];
    private _eventsNames: EventName[] = [];

    public abstract globalName: string;

    public abstract name: string;

    constructor(id: string) {
        this._id = id;
        this._logger = serviceManager.get(ILogger, `Extension ${id}`);
        this._storage = new Storage(id);
    }

    public abstract start(): void;
    public abstract stop(): void;

    protected static _getOriginal<T>(pathRoot: string): T {
        return serviceManager.get(IExtensionsService).getOriginal(pathRoot.split(`extensions${path.sep}`)[1].split(path.sep)[0], 'folder') as T;
    }

    public restart(): void {
        this.stop();
        this.start();
    }

    get events(): EventName[] {
        return this._eventsNames;
    }

    protected addEvent(names: EventName[] | EventName): void {
        if (!Array.isArray(names)) {
            names = [names];
        }
        names.forEach((n) => {
            if (this._eventsNames.findIndex((e) => e.name == n.name) == -1)
                this._eventsNames.push(n);
        });
    }

    protected emit(event: string, args: ScriptArgument): void {
        this._events.forEach((e) => {
            if (e[0] == event)
                e[1](args);
        });
    }

    on(event: string, callback: Function): void {
        if (this._events.findIndex((e) => e[0] == event && e[1] == callback) == -1)
            this._events.push([event, callback]);
    }

    off(event: string, callback: Function): void {
        let index = this._events.findIndex((e) => e[0] == event && e[1] == callback);
        if (index != -1)
            this._events.splice(index, 1);
    }

    public get id(): string {
        return this._id;
    }

    public get storage(): Storage {
        return this._storage;
    }

    public get logger(): ILogger {
        return this._logger;
    }
};

class Storage {
    private _data: any;
    private _id: string;
    private _loaded: boolean = false;
    private dbService: IDatabaseService;
    constructor(id: string) {
        this._id = id;
        this._data = {};
        this.dbService = serviceManager.get(IDatabaseService);
    }
    public async get(key: string): Promise<any> {
        if (this._loaded == false) {
            let data = await this.dbService.extensions.findOne({ id: this._id });
            this._data = data?.storage || {};
        }
        return this._data[key];
    }

    public has(key: string): boolean {
        return this._data[key] != undefined;
    }

    public async add(key: string, value: any): Promise<void> {
        if (this._data[key] == undefined)
            this._data[key] = [];
        this._data[key].push(value);
        await this.dbService.extensions.updateOne({ id: this._id }, { $set: { storage: this._data } });
    }

    public async remove(key: string, index: number): Promise<void> {
        if (this._data[key] == undefined)
            return;
        if (index < this._data[key].length && index >= 0) {
            this._data[key].splice(index, 1);
            await this.dbService.extensions.updateOne({ id: this._id }, { $set: { storage: this._data } });
        }
    }

    public async set(key: string, value: any): Promise<void> {
        this._data[key] = value;
        await this.dbService.extensions.updateOne({ id: this._id }, { $set: { storage: this._data } });
    }

    public async delete(key: string): Promise<void> {
        delete this._data[key];
        await this.dbService.extensions.updateOne({ id: this._id }, { $set: { storage: this._data } });
    }

    public async clear(): Promise<void> {
        this._data = {};
        await this.dbService.extensions.updateOne({ id: this._id }, { $set: { storage: this._data } });
    }
}