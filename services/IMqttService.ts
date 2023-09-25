import { IBaseService } from './IBaseService';

export class IMqttService implements IBaseService {
    public get name(): string {
        return 'MqttService';
    }

    public get clientId(): string {
        throw new Error("Method not implemented.");
    }

    public set clientId(value: string) {
        throw new Error("Method not implemented.");
    }

    public get isConnected(): boolean {
        throw new Error("Method not implemented.");
    }

    public start(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public stop(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public publish(topic: string, message: string | number | boolean) {
        throw new Error("Method not implemented.");
    }

    public subscribe(topic: string, callback: (topic: string, message: string) => void) {
        throw new Error("Method not implemented.");
    }

    public unsubscribe(topic: string) {
        throw new Error("Method not implemented.");
    }
}