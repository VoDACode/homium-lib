import { LogLevel, LogListener, LogRecord, LogServiceEvent } from "../types/log.types";

export class ILogger {

    public get loggerName(): string {
        throw new Error("Method not implemented.");
    }

    public log(level: LogLevel, message: string): void {
        throw new Error("Method not implemented.");
    }

    public debug(message: string, ...data: string[]): void {
        throw new Error("Method not implemented.");
    }

    public info(message: string, ...data: string[]): void {
        throw new Error("Method not implemented.");
    }

    public warn(message: string, ...data: string[]): void {
        throw new Error("Method not implemented.");
    }

    public error(message: string, ...data: string[]): void {
        throw new Error("Method not implemented.");
    }

    public fatal(message: string, ...data: string[]): void {
        throw new Error("Method not implemented.");
    }
    
    public getLogRecords(): LogRecord[] {
        throw new Error("Method not implemented.");
    }

    public on(event: LogServiceEvent, listener: LogListener): void {
        throw new Error("Method not implemented.");
    }

    public off(event: LogServiceEvent, listener: LogListener): void {
        throw new Error("Method not implemented.");
    }
}