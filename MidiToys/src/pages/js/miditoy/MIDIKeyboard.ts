import { MIDIDataTable } from "../MIDIDataTable";
import { MIDIReceiver } from "./MIDIReceiver";
import { InputManager } from "../input/InputManager";
import paper, { Color } from "paper";

export interface Vector2D {
    x: number;
    y: number;
  }
  
export class MIDIKeyboard {
    
    //Basic information
    inputManager: InputManager;
    targetChannel: number;
    bpm: number = 0;
    
    //Canvas settings
    devicePixelRatio: number;
    canvas: HTMLCanvasElement; //The canvas
    w: number;
    h: number;
    
    //MIDI Receiver settings
    numberOfKeys: number = 12; //How many keys are on this keyboard?
    startNote: number = 12; //The note from where you count up
    useRegExp: boolean;
    receiver: MIDIReceiver[] = [];
    
    //Vector Positions as array
    drawPositions: Vector2D[] = [];

    //Construct everything basic that is needed for a MIDIKeyboard
    constructor(canvas:HTMLCanvasElement, targetChannel: number, numberOfKeys: number, startNote: number, useRegExp: boolean) {
        this.inputManager = InputManager.GetInstance(); //The Input Manager
        this.targetChannel = targetChannel; //The target channel
        this.canvas = canvas; //Canvas element to draw on
        
        this.w = this.canvas.getBoundingClientRect().width;
        this.h = this.canvas.getBoundingClientRect().height;

        //Setup Keys
        this.numberOfKeys = numberOfKeys;
        this.startNote = startNote;
        this.useRegExp = useRegExp;

        // this.ResizeCanvas();
        this.SetupMidiReceiver();
        console.log("CREATED new MIDIKeyboard on channel " + this.targetChannel);
    }

    SetupMidiReceiver() {
        this.receiver.length = 0;
        let note = this.startNote;
        for(let i = 0; i < this.numberOfKeys; i++) {
            var rec = new MIDIReceiver(this.targetChannel, MIDIDataTable.MIDINoteToString(note));
            if(this.useRegExp) rec.useRegExp = true;
            this.receiver.push(rec);
            note++;
        }
    }
}