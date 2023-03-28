import { InputManager } from "./InputManager";
import { MIDIDataTable } from "./MIDIDataTable";
import { NoteSquare } from "./NoteSquare";
import { MIDIReceiver } from "./MIDIReceiver";

//The goal of this class is to take all canvas references
//and link it to a MIDI device
export class SquareKeyboard {
    // canvasReverences: HTMLCanvasElement[];
    canvas: HTMLCanvasElement;
    // noteSquares: NoteSquare[] = new Array();
    targetChannel: number;
    squares: MIDIReceiver[] = [];
    inputManager: InputManager

    constructor(canvas: HTMLCanvasElement, inputManager: InputManager, targetChannel: number, numberOfKeys: number, startNote: number) {
        // this.canvasReverences = canvasReverences;
        this.canvas = canvas; //Canvas element to draw on
        this.targetChannel = targetChannel; //Target channel to listen to
        this.inputManager = inputManager; //Input Manager to get the information
        
        // this.squares[] = [numberOfKeys]; //How many squares need to be drawn
        for(let i = 0; i < numberOfKeys; i++) {
           var rec = new MIDIReceiver(targetChannel, MIDIDataTable.MIDINoteToString(startNote));
           this.squares.push(rec);
           startNote++;
        }

        // canvasReverences.forEach(element => {
        //     let html = element as HTMLElement;
        //     let rawNote = html.id.replace("Canvas", "");
        //     let regExp = MIDIDataTable.MIDIStringNoteToRegExp(rawNote);
        //     this.noteSquares.push(new NoteSquare(this.inputManager, targetChannel, rawNote, element))

        //     // console.log(rawNote);
        //     // console.log(regExp);
        // });
        // console.log("Note squares = " + this.noteSquares.length)
    }

    UpdateKeyboard() {
        let holdingKeys = this.inputManager.getHoldingKeys(this.targetChannel);
        let velocities = this.inputManager.getVelocity(this.targetChannel);

        this.squares.forEach(element => {
            let square = element as MIDIReceiver;
            if(square.GetMIDIInput(holdingKeys, velocities)) {
                console.log("KEYPRESS:" + square.targetNote + " Velocity:" + square.GetVelocity());
            }
            square.GetMIDIInput(holdingKeys, velocities);
        })
        // this.noteSquares.forEach(element => {
        //     let square = element as NoteSquare;
        //     square.GetMIDIInput();
        // });
    }
}
