import { InputManager } from "./InputManager";
import { MIDIDataTable } from "./MIDIDataTable";
import { MIDIReceiver } from "./MIDIReceiver";

export class NoteSquare extends MIDIReceiver {
    //inputManager: InputManager; //in MIDIReceiver
    //targetChannel: number; //in MIDIReceiver
    // htmlID: HTMLElement; //in MIDIReceiver
    //targetNote: string; //in MIDIReceiver
    targetRegExp: RegExp;
    canvas: CanvasRenderingContext2D;

    constructor(inputManager: InputManager, targetChannel: number, targetNote: string, htmlID: HTMLElement) {
        super(inputManager, targetChannel, targetNote, htmlID);
        this.canvas = htmlID.getContext("2d") as CanvasRenderingContext2D;
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
            this.canvas.fillStyle = "red";
            this.canvas.fillRect(0,0,200,200);

            this.canvas.fillStyle = "white";
            this.canvas.font = "100px Arial";
            this.canvas.fillText(this.targetNote, 20,100);
    
        } else {
            this.canvas.fillStyle = "black";
            this.canvas.fillRect(0,0,200,200);
        }
    }
}