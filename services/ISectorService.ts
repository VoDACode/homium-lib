import { DeviceModel, SectionModel, SectorModel } from "../models";
import { IBaseService } from "./IBaseService";

export class ISectorService implements IBaseService{
    start(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    stop(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    get name(): string {
        throw new Error("Method not implemented.");
    }

    public sector = {
        get: (sectorName: string): SectorModel => {
            throw new Error("Method not implemented.");
        },
        list: (): SectorModel[] => {
            throw new Error("Method not implemented.");
        },
        add: (sector: SectorModel): Promise<void> => {
            throw new Error("Method not implemented.");
        },
        remove: (sectorName: string): Promise<void> => {
            throw new Error("Method not implemented.");
        },
        update: (name: string, sector: SectorModel): Promise<void> => {
            throw new Error("Method not implemented.");
        }
    };

    public sections = {
        get: (sectorName: string, sectionName: string): SectionModel => {
            throw new Error("Method not implemented.");
        },
        list: (sectorName: string): SectionModel[] => {
            throw new Error("Method not implemented.");
        },
        add: (sectorName: string, section: SectionModel): Promise<void> => {
            throw new Error("Method not implemented.");
        },
        remove: (sectorName: string, sectionName: string): Promise<void> => {
            throw new Error("Method not implemented.");
        },
        update: (sectorName: string, sectionName: string, section: SectionModel): Promise<void> => {
            throw new Error("Method not implemented.");
        }
    };

    public devices = {
        get: (sectorName: string, sectionName: string, deviceName: string): DeviceModel => {
            throw new Error("Method not implemented.");
        },
        list: (sectorName: string, sectionName: string): DeviceModel[] => {
            throw new Error("Method not implemented.");
        },
        add: (sectorName: string, sectionName: string, device: DeviceModel): Promise<void> => {
            throw new Error("Method not implemented.");
        },
        remove: (sectorName: string, sectionName: string, deviceName: string): Promise<void> => {
            throw new Error("Method not implemented.");
        },
        update: (sectorName: string, sectionName: string, deviceName: string, device: DeviceModel): Promise<void> => {
            throw new Error("Method not implemented.");
        },
        setProperty: (sectorName: string, sectionName: string, deviceName: string, propertyName: string, propertyValue: any): void => {
            throw new Error("Method not implemented.");
        }
    };
}