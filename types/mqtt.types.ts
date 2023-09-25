import { ServiceEvent } from "./service.types";

export type MqttServiceEvent = 'published' | 'subscribed' | 'unsubscribed' | 'reconnect' | 'disconnected' | 'clientIdChanged' | ServiceEvent;