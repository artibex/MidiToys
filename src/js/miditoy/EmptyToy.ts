import { MIDIToy } from "./MIDIToy";

//Empty Toy class, does nothing
export class EmptyToy extends MIDIToy {

    constructor(targetChannel: number) {
        super("EmptyToy", targetChannel, 13, 12, true);
    }

    SetupKeyboard() {
        
    }
    UpdateKeyboard() {
        
    }
}