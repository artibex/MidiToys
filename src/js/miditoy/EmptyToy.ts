import { MIDIToy } from "./MIDIToy";

//Empty Toy class, does nothing
export class EmptyToy extends MIDIToy {

    constructor(targetChannel: number) {
        super( "Click 'Select'", targetChannel, 13, 12, true);
    }

    LoadDefaultColorSettings() {
        
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