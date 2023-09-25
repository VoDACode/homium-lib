type ScriptTargetEvent = "init" | "update" | "stop" | "start" | "call" | "remove" | string;
type ScriptTargetType = "Object" | "Extension" | "System";
type ScriptArgument = { [key: string]: any}
type ScriptServiceEvent = 'created' | 'updated' | 'deleted' | 'enabled' | 'disabled' | 'executed' | 'loaded';

export { ScriptTargetEvent, ScriptTargetType, ScriptArgument, ScriptServiceEvent}