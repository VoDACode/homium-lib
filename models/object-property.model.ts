import { ObjectPropertyHistory } from "./object-property-history.model";

export type MqttProperty = {
    // If the property is true, then it is displayed on the MQTT server
    display: boolean;
    // If the property is true, then it can change its value when requested by the MQTT server
    subscribe: boolean;
}

export class ObjectProperty {
    // Current value of the property
    value: any;
    // History of the property
    history: ObjectPropertyHistory[];
    // Property name
    key: string;
    // If true the property can have history
    canHaveHistory: boolean;
    // Limit of history
    historyLimit: number = 50;

    // MQTT property
    mqttProperty: MqttProperty = {
        display: true,
        subscribe: true,
    };

    get hasHistory(): boolean {
        return this.history.length > 0;
    }

    constructor(key: string, value: any, canHaveHistory: boolean, history: ObjectPropertyHistory[] = [], mqttProperty?: MqttProperty) {
        this.key = key;
        this.value = value;
        this.canHaveHistory = canHaveHistory;
        this.history = history;
        this.mqttProperty = mqttProperty || { display: false, subscribe: false };
    }
}