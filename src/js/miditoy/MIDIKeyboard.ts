import { MIDIDataTable } from "../MIDIDataTable";
import { MIDIReceiver } from "./MIDIReceiver";
import { InputManager } from "../input/InputManager";
import { Color } from "paper/dist/paper-core";

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

    //Color settings
    mainColor: paper.Color = new Color(255);
    secondaryColor: paper.Color = new Color(255/4);
    accentColor: paper.Color = new Color(255/2);

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

    //Evenly calculate draw positions and put them into the drawPositions array
    HorizontalDrawPositionDistrubution() {
        this.drawPositions.length = 0;
        let avgCellSize = this.w / this.numberOfKeys;

        for(let i = 0; i < this.numberOfKeys; i++) {
            let xCalc = avgCellSize/4 + avgCellSize*i;

            let vec: Vector2D = ({x: xCalc, y: this.h / 2 - avgCellSize / 4});
            this.drawPositions.push(vec);
        }
        return avgCellSize;
    }
    //Evenly calculate draw positions and put them into the drawPositions array
    VerticalDrawPositionDistrubution() {
        this.drawPositions.length = 0;
        let avgCellSize = this.h / this.numberOfKeys;

        for(let i = 0; i < this.numberOfKeys; i++) {
            let yCalc = avgCellSize/4 + avgCellSize*i;
            let vec: Vector2D = ({x: this.w / 2 - avgCellSize / 4, y: yCalc});
            this.drawPositions.push(vec);
        }
        return avgCellSize;
    }

    GetRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
}