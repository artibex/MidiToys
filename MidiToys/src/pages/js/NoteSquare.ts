import { InputManager } from "./InputManager";
import { MIDIDataTable } from "./MIDIDataTable";
import { MIDIReceiver } from "./MIDIReceiver";

export class NoteSquare extends MIDIReceiver {
    //inputManager: InputManager; //in MIDIReceiver
    //targetChannel: number; //in MIDIReceiver
    // htmlID: HTMLElement; //in MIDIReceiver
    //targetNote: string; //in MIDIReceiver
    //canvas: CanvasRenderingContext2D; in MIDIReceiver
    //targetRegExp: RegExp; in MIDIReceiver

    constructor(inputManager: InputManager, targetChannel: number, targetNote: string, htmlCanvas: HTMLCanvasElement) {
        super(inputManager, targetChannel, targetNote, htmlCanvas);
        this.targetRegExp = new RegExp(MIDIDataTable.MIDIStringNoteToRegExp(targetNote) as RegExp);
    }

    GetMIDIInput() {
        //console.log("UPDATE NoteSquare");
        let keys: string[] = this.inputManager.GetHoldingKeys(this.targetChannel) as string[];
        if(keys.some(element => element.match(this.targetRegExp))) {
            this.UpdateElement(true);
        } else this.UpdateElement(false);
    }

    UpdateElement(on) {
        if(on == true) {
            this.canvasContext.fillStyle = "red";
            this.canvasContext.fillRect(0,0,200,200);

            this.canvasContext.fillStyle = "white";
            this.canvasContext.font = "100px Arial";
            this.canvasContext.fillText(this.targetNote.toUpperCase(), 20,100);
    
        } else {
            this.canvasContext.fillStyle = "black";
            this.canvasContext.fillRect(0,0,200,200);
        }
    }
}