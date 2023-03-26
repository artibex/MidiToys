import { InputManager } from "./InputManager";
import { MIDIDataTable } from "./MIDIDataTable";
import { NoteSquare } from "./NoteSquare";

//The goal of this class is to take all canvas references
//and link it to a MIDI device
export class SquareKeyboard {
    canvasReverences: HTMLCanvasElement[];
    noteSquares: NoteSquare[] = new Array();
    targetChannel: number;
    inputManager: InputManager

    constructor(canvasReverences, inputManager: InputManager, targetChannel: number) {
        this.canvasReverences = canvasReverences;
        this.targetChannel = targetChannel;
        this.inputManager = inputManager;

        canvasReverences.forEach(element => {
            let html = element as HTMLElement;
            let rawNote = html.id.replace("Canvas", "");
            let regExp = MIDIDataTable.MIDIStringNoteToRegExp(rawNote);
            this.noteSquares.push(new NoteSquare(this.inputManager as InputManager, targetChannel, rawNote, element as HTMLCanvasElement))

            // console.log(rawNote);
            // console.log(regExp);
        });
        console.log("Note squares = " + this.noteSquares.length)
    }

    GetMIDIInput() {
        this.noteSquares.forEach(element => {
            let square = element as NoteSquare;
            square.GetMIDIInput();
        });
    }
}
