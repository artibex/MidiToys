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
    // attackTime: number; //attack in MS, how long is the delay before the impact happens?
    // releaseTime: number; //how long is the impact visible in MS

    targetSize: number = 100;
    calculatedSize: number;
    lastTargetIndex: number;

    triggerColor: number = 255;
    calculatedColor: number;

    triggerAlpha: number = 1;
    calculatedAlpha: number;

    constructor(inputManager: InputManager, targetChannel: number, targetNote: string, htmlCanvas: HTMLCanvasElement) {
        super(inputManager, targetChannel, targetNote, htmlCanvas);
        this.targetRegExp = new RegExp(MIDIDataTable.MIDIStringNoteToRegExp(targetNote) as RegExp);
        this.calculatedSize = this.targetSize;
        this.calculatedColor = this.triggerColor;
        this.calculatedAlpha = this.triggerAlpha;
    }

    GetMIDIInput() {
        //console.log("UPDATE NoteSquare");
        let keys: string[] = this.inputManager.GetHoldingKeys(this.targetChannel) as string[];
        let velocity: number[] = this.inputManager.GetVelocityHoldingKeys(this.targetChannel) as number[];

        let targetIndex = keys.findIndex(element => element.match(this.targetRegExp));
        if(targetIndex !== -1) {
            this.UpdateElement(true, velocity[targetIndex]);
        }
        else this.UpdateElement(false, 0);
        
        this.lastTargetIndex = targetIndex;
    }

    UpdateElement(on, velocity) {
        var canWidth = this.htmlCanvas.width;
        var canHeight = this.htmlCanvas.height;
        
        this.canvasContext.clearRect(0,0, canWidth, canHeight);
        if(this.calculatedColor > 100) this.calculatedColor *= 0.95;
        if(this.calculatedAlpha > 0) this.calculatedAlpha *= 0.95;

        if(on == true) {
            this.calculatedColor = this.triggerColor;
            this.calculatedAlpha = this.triggerAlpha;
            if(this.calculatedSize < canHeight / 4 + velocity * 4) this.calculatedSize += (canHeight / 4 + velocity * 4) * 0.2;

            this.canvasContext.fillStyle = "rgba(" + this.calculatedColor +"," + 0 + "," + 0 + "," + this.calculatedAlpha + ")";
            //this.canvasContext.fillRect(0,0,canWidth,this.calculatedSize);
            this.canvasContext.fillRect(0,canHeight,canWidth,-this.calculatedSize);
            this.canvasContext.strokeRect(0,canHeight,canWidth,-this.calculatedSize);

            this.canvasContext.fillStyle = "white";
            this.canvasContext.font = "100px Arial";
            this.canvasContext.fillText(this.targetNote.toUpperCase(), canWidth/4,canHeight - 10);
    
        } else {
            if(this.calculatedSize > this.targetSize) this.calculatedSize = this.calculatedSize * 0.95;
            
            this.canvasContext.fillStyle = "rgba(" + this.calculatedColor +"," + 0 + "," + 0 + "," + this.calculatedAlpha + ")";
            this.canvasContext.strokeStyle = "white";
            this.canvasContext.lineWidth = 5;
            this.canvasContext.fillRect(0,canHeight,canWidth,-this.calculatedSize);
            this.canvasContext.strokeRect(0,canHeight,canWidth,-this.calculatedSize);

            this.canvasContext.fillStyle = "rgba(" + this.calculatedColor * 2 +"," + 0 + "," + 0 + "," + this.calculatedAlpha + ")";
            //this.canvasContext.fillStyle = "rgb(" + this.calculatedColor * 2 +"," + 0 + "," +  "0)";
            this.canvasContext.font = "100px Arial";
            this.canvasContext.fillText(this.targetNote.toUpperCase(), canWidth/4,canHeight - 10);

        }
    }
}