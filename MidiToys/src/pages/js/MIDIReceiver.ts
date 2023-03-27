import { InputManager } from "./InputManager";
import { MIDIDataTable } from "./MIDIDataTable";

//Generic class that can listen to midi events
//Holds all important information
export class MIDIReceiver {
    inputManager: InputManager;
    targetChannel: number;
    targetNote: string;
    htmlCanvas: HTMLCanvasElement;
    canvasContext: CanvasRenderingContext2D;
    targetRegExp: RegExp;

    // attackTime: number = 10; //attack in MS, how long is the delay before the impact happens?
    // releaseTime: number = 1; //how long is the impact visible in MS

    constructor(inputManager: InputManager, targetChannel: number, targetNote: string, htmlCanvas: HTMLCanvasElement) {
        this.inputManager = inputManager; 
        this.targetChannel = targetChannel;
        this.targetNote = targetNote;
        this.htmlCanvas = htmlCanvas;
        this.targetRegExp = new RegExp(MIDIDataTable.MIDIStringNoteToRegExp(targetNote) as RegExp);
        
        if(htmlCanvas != null) this.canvasContext = htmlCanvas.getContext("2d")!;
        else (console.log("ERROR: htmlCanvas is NULL"));
    }
}