import { ServiceEvent } from "./service.types";

export type LogListener = (logRecord: LogRecord) => void;

export type LogServiceEvent = "all" | "debug" | "info" | "warn" | "error" | "fatal" | ServiceEvent;

export enum LogLevel {
    DEBUG = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3,
    FATAL = 4
}

export class LogRecord {
    public level: LogLevel;
    public message: string;
    public serviceName: string;
    public timestamp: Date;

    constructor(level: LogLevel, message: string, serviceName: string) {
        this.level = level;
        this.message = message;
        this.serviceName = serviceName;
        this.timestamp = new Date();
    }
}