import { ObjectModel } from "../models";
import { ObjectPropertyHistory } from "../models/object-property-history.model";
import { ObjectProperty } from "../models/object-property.model";

export function getPropertyToJsonObject(object: ObjectModel): any {
    let data: any = {};
    object.properties.forEach((prop) => {
        data = { ...data, ...objectPropertyToJson(prop) };
    });
    return data;
}

export function objectPropertyToJson(prop: ObjectProperty): any {
    let data: any = {};
    data[prop.key] = prop.value;
    return data;
}

export function pushObjectPropertyHistory(object: ObjectModel, key: string, value: any): boolean {
    let prop = object.properties.find((o) => o.key === key);
    if (!prop) {
        return false;
    }

    if(prop.canHaveHistory == false){
        return false;
    }

    if (prop.history.length >= prop.historyLimit) {
        prop.history.shift();
    }
    prop.history.push(new ObjectPropertyHistory(prop.value, new Date()));
    prop.value = value;
    return true;
}

export function convertAnyToCorrectType(value: any, inputVal: string): any | undefined {
    let newVal:any = value;
    if(typeof inputVal === 'number')
        newVal = parseFloat(value);
    else if(typeof inputVal === 'boolean')
        newVal = value == 'true' || value == true;
    else if(typeof inputVal === 'string')
        newVal = String(value);
    if(Number.isNaN(newVal))
        return undefined;
    return newVal;
}