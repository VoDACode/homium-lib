
type SectorServiceEvent = 'created' | 'updated' | 'deleted';
type Position = {
    height: number;
    width: number;
    zIndex: 0;
}

type SceneObjectMargin = {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

enum SceneObjectType {
    Text,
    Image,
    Video,
    Audio,
    Button,
    URL,
    Input,
    Select,
    Checkbox,
    Radio,
    List,
    IFrame,
    HTML
}

export { SectorServiceEvent, Position, SceneObjectMargin, SceneObjectType }