import { MIDIToy } from "./MIDIToy";

//Empty Toy class, does nothing
export class EmptyToy extends MIDIToy {

    constructor(targetChannel: number) {
        super( "Empty", targetChannel, 13, 12, true);
    }

    LoadDefaultColors() {
        
    }
    SetupKeyboard() {
        
    }
    UpdateKeyboard() {
        
    }
    ToJSON() {
        
    }
    LoadJSON(data: any) {
        
    }
}