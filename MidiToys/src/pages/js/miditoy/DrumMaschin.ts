import { MIDIReceiver } from "./MIDIReceiver";
import { MIDIKeyboard } from "./MIDIKeyboard";
import { Vector2D } from "./MIDIKeyboard";

export class DrumMaschin extends MIDIKeyboard {
    
    constructor(canvas: HTMLCanvasElement, targetChannel: number, numberOfKeys: number, startNote: number) {
        super(canvas, targetChannel, numberOfKeys, startNote, true);
        
    }

    UpdateKeyboard() {
        let holdingKeys = this.inputManager.getHoldingKeys(this.targetChannel);
        let velocities = this.inputManager.getVelocity(this.targetChannel);
        this.bpm = this.inputManager.getBPM();
    }

    UpdatePaperKey(midiReceiver: MIDIReceiver, indexValue: number, triggerd: boolean) {

    }
}