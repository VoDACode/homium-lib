import { LogLevel, LogListener, LogRecord, LogServiceEvent } from "../types/log.types";
import { IBaseService } from "./IBaseService";

export class ILogService implements IBaseService {
    public get name(): string {
        return "LogService";
    }
    public get onlyConsole(): boolean {
        throw new Error("Method not implemented.");
    }
    public set onlyConsole(value: boolean) {
        throw new Error("Method not implemented.");
    }

    public start(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public stop(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public log(level: LogLevel, message: string, serviceName: string): void {
        throw new Error("Method not implemented.");
    }

    public clear(): void {
        throw new Error("Method not implemented.");
    }

    public getLogRecords(): LogRecord[] {
        throw new Error("Method not implemented.");
    }

    public waitToFinish(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public on(event: LogServiceEvent, listener: LogListener): void {
        throw new Error("Method not implemented.");
    }

    public off(event: LogServiceEvent, listener: LogListener): void {
        throw new Error("Method not implemented.");
    }
}