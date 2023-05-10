import { MIDIDataTable } from "../MIDIDataTable";
import { MIDIReceiver } from "./MIDIReceiver";
import { InputManager } from "../input/InputManager";
import { ToyManager } from "./ToyManager";
import { RGBA, Vector2D } from "../Interfaces";
import paper from 'paper';

//Abstract class that forms the base of every MIDIToy
export abstract class MIDIToy {
    //Basic information
    inputManager: InputManager; //InputManager reference
    toyManager: ToyManager; //ToyManager reference
    paperLayer; //The paper layer on whith to draw on
    toyName: string; //Name of the toy
    targetChannel: number; //The target MIDi channel of the toy
    bpm: number = 0; //The bpm value to calculate stuff
    
    //Canvas settings
    // devicePixelRatio: number;
    canvas: HTMLCanvasElement; //The canvas
    w: number;
    h: number;
    
    //MIDI Receiver settings
    numberOfKeys: number = 12; //How many keys are on this keyboard?
    startKey: number = 12; //The note from where you count up
    useRegExp: boolean; //Use regular expression in in MIDIReceiver?
    receiver: MIDIReceiver[] = [];
    
    //Vector Positions as array if needed
    drawPositions: Vector2D[] = [];

    //Color settings
    fillColor: paper.Color = new paper.Color(1);
    strokeColor: paper.Color = new paper.Color(1/4);
    accentColor: paper.Color = new paper.Color(1/2);

    //Construct everything basic that is needed for a MIDIKeyboard
    constructor(toyName: string, targetChannel: number, numberOfKeys: number, startKey: number, useRegExp: boolean) {
        this.inputManager = new InputManager(); //The Input Manager
        this.toyManager = new ToyManager();
        this.toyName = toyName;
        this.paperLayer = new paper.Layer();
        this.targetChannel = targetChannel; //The target channel
        this.canvas = this.toyManager.targetCanvas; //Canvas element to draw on
        
        this.w = this.canvas.getBoundingClientRect().width;
        this.h = this.canvas.getBoundingClientRect().height;

        //Setup Keys
        this.numberOfKeys = numberOfKeys;
        this.startKey = startKey;
        this.useRegExp = useRegExp;

        // this.ResizeCanvas();
        this.SetupMIDIReceiver(this.useRegExp);
        // console.log("CREATED new MIDIToy on channel " + this.targetChannel);
    }

    //Generates needed MIDI Receiver
    SetupMIDIReceiver(value: boolean) {
        this.receiver.length = 0;
        //this.receiver.length = 0;
        let note = this.startKey;
        for(let i = 0; i < this.numberOfKeys; i++) {
            var rec = new MIDIReceiver(this.targetChannel, MIDIDataTable.MIDINoteToString(note));
            rec.useRegExp = value;
            this.receiver.push(rec);
            note++;
        }
    }

    //Takes 0-255 values and converts it to 0-1
    SetColor(color: paper.Color, red: number, green: number, blue: number, alpha: number) {
        color.red = this.MapRGBAToPaperRGBA(red);
        color.green = this.MapRGBAToPaperRGBA(green);
        color.blue = this.MapRGBAToPaperRGBA(blue);
        color.alpha = this.MapRGBAToPaperRGBA(alpha);
    }
    //Returns a RGBA object with 0-255 values
    GetColor(color: paper.Color) {
        var rgba: RGBA = {r:0,g:0,b:0, a:0};
        rgba.r = this.MapPaperRGBAToRGBA(color.red);
        rgba.g = this.MapPaperRGBAToRGBA(color.green);
        rgba.b = this.MapPaperRGBAToRGBA(color.blue);
        rgba.a = this.MapPaperRGBAToRGBA(color.alpha);
        return rgba;
    }

    //Evenly calculate draw positions and put them into the drawPositions array
    HorizontalDrawPositionDistrubution(cellSize: number) {
        this.drawPositions.length = 0;
        // let avgCellSize = this.w / this.numberOfKeys;
        let avgCellSize = cellSize;

        for(let i = 0; i < this.numberOfKeys; i++) {
            let xCalc = avgCellSize/2 + avgCellSize*i;

            let vec: Vector2D = ({x: xCalc, y: this.h / 2 - avgCellSize / 4});
            this.drawPositions.push(vec);
        }
        return avgCellSize;
    }
    //Evenly calculate draw positions and put them into the drawPositions array
    VerticalDrawPositionDistrubution(cellSize: number) {
        this.drawPositions.length = 0;
        // let avgCellSize = this.h / this.numberOfKeys;
        let avgCellSize = cellSize;

        for(let i = 0; i < this.numberOfKeys; i++) {
            let yCalc = avgCellSize/2 + avgCellSize*i;
            let vec: Vector2D = ({x: this.w / 2 - avgCellSize / 4, y: yCalc});
            this.drawPositions.push(vec);
        }
        return avgCellSize;
    }

    GetRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    MapRGBAToPaperRGBA(x: number) {
        return (x - 0) / (255 - 0);
    }
    MapPaperRGBAToRGBA(x: number) {
        return Math.round(x * 255);
    }

    RemoveChildrenFromLayer() {
        this.paperLayer.removeChildren();
    }

    //Abstract functions that need to exist
    abstract UpdateKeyboard();
    abstract SetupKeyboard();
    abstract LoadDefaultColorSettings();
}