type Options<T> = {
    initEvent?: (instance: T) => void,
    constructorArgs?: Array<any>
}

class ServiceRecord {
    public iface: any;
    public implementation: any;
    public instance: any;
    public isSingleton: boolean = false;
    public isFactory: boolean = false;
}

class ServiceManager {
    private static instance: ServiceManager;
    private services: Array<ServiceRecord> = [];

    public static getInstance(): ServiceManager {
        if (!ServiceManager.instance) {
            ServiceManager.instance = new ServiceManager();
        }
        return ServiceManager.instance;
    }

    public singleton<I, T extends I>(iface: new () => I, type: new () => T, options: Options<T> | undefined = undefined): void {
        this.validateService(iface);

        let instance = new type();
        if (options && options.initEvent) {
            options.initEvent(instance);
        }

        this.services.push({
            instance: instance,
            implementation: type,
            iface: iface,
            isSingleton: true,
            isFactory: false
        });
    }

    public factory<I, T extends I>(iface: new () => I, type: new (...args: any) => T): void {
        this.validateService(iface);
        this.services.push({
            instance: null,
            implementation: type,
            iface: iface,
            isSingleton: false,
            isFactory: true
        });
    }

    public get<I>(iface: new () => I, ...args: any): I {
        let service = this.services.find((s) => s.iface === iface);
        if (service) {
            if (service.isSingleton) {
                return service.instance;
            }
            if (service.isFactory) {
                return new service.implementation(args);
            }
        }
        throw new Error(`Service not found for interface ${iface.name}`);
    }

    public hasService<I>(iface: new () => I): boolean {
        return this.services.find((s) => s.iface === iface) !== undefined;
    }

    private validateService<I>(iface: new () => I): void {
        if (this.hasService(iface)) {
            throw new Error(`Service already registered for interface ${iface.name}`);
        }
    }

}
export default ServiceManager.getInstance();