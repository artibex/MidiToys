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
        let velocity: number[] = this.inputManager.GetVelocityHoldingKeys(this.targetChannel) as number[];

        let targetIndex = keys.findIndex(element => element.match(this.targetRegExp));
        if(targetIndex !== -1) {
            this.UpdateElement(true, velocity[targetIndex]);

        } else this.UpdateElement(false, 0);
        
        // if(keys.some(element => element.match(this.targetRegExp))) {
        //     this.UpdateElement(true, 1);

        // } else this.UpdateElement(false, 0);
    }

    UpdateElement(on, velocity) {
        if(on == true) {

            this.canvasContext.fillStyle = "rgb(" + velocity*1.5 +"," + velocity*0.3 + "," +  "0)";
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