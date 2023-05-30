import { MIDIDataTable } from "../MIDIDataTable";
import { MIDIReceiver } from "./MIDIReceiver";
import { InputManager } from "../input/InputManager";
import { ToyManager } from "./ToyManager";
import { RGBA, Vector2D } from "../Interfaces";
import paper from 'paper';

//Abstract class that forms the base of every MIDIToy
export abstract class MIDIToy {
    //Basic information
    private toyChangedEventListeners: (() => void)[] = [];

    toyName: string; //Name of the toy in the UI
    inputManager: InputManager; //InputManager reference
    toyManager: ToyManager; //ToyManager reference
    paperLayer; //The paper layer on whith to draw on
    // toyName: string; //Name of the toy
    targetChannel: number; //The target MIDi channel of the toy
    bpm: number = 0; //The bpm value to calculate stuff
    
    //Canvas settings
    // devicePixelRatio: number;
    canvas: HTMLCanvasElement; //The canvas
    w: number;
    h: number;
    
    //MIDI Receiver settings
    numberOfKeys: number = 24; //How many keys are on this keyboard?
    startKey: number = 12; //The note from where you count up
    useRegExp: boolean; //Use regular expression in in MIDIReceiver?
    receiver: MIDIReceiver[] = [];
    
    //Vector Positions as array if needed
    drawPositions: Vector2D[] = [];

    //Color settings
    fillColor: paper.Color = new paper.Color(1);
    strokeColor: paper.Color = new paper.Color(1/4);
    accentColor: paper.Color = new paper.Color(1/2);

    //Abstract functions that need to exist
    abstract SetupKeyboard(); //Setup the keyboard
    abstract ApplySettings(); //Apply value change on running toy
    abstract UpdateKeyboard(); //Update function to fall 60 frames a second

    abstract LoadDefaultColors(); //Load the default settings
    abstract ApplyColors(); //Adjust only colors

    abstract ToJSON();
    abstract LoadJSON(data);


    //Construct everything basic that is needed for a MIDIKeyboard
    constructor(toyName: string, targetChannel: number, numberOfKeys: number, startKey: number, useRegExp: boolean) {
        this.toyName = toyName;
        this.inputManager = new InputManager(); //The Input Manager
        this.toyManager = new ToyManager();
        this.paperLayer = new paper.Layer();
        this.targetChannel = targetChannel; //The target channel
        this.canvas = this.toyManager.targetCanvas; //Canvas element to draw on
        
        //Fallback code in case canvas is not there
        if(this.canvas != null) {
            this.w = this.canvas.getBoundingClientRect().width;
            this.h = this.canvas.getBoundingClientRect().height;
        } else {
            this.w = 500;
            this.h = 500;
        }

        //Setup Keys
        this.numberOfKeys = numberOfKeys;
        this.startKey = startKey;
        this.useRegExp = useRegExp;

        // this.ResizeCanvas();
        this.SetupMIDIReceiver(this.useRegExp);
        // console.log("CREATED new MIDIToy on channel " + this.targetChannel);
    }

    // Event subscription method
    SubscribeToToyChangedEvent(listener: () => void): void {
        const index = this.toyChangedEventListeners.indexOf(listener);
        if(index == -1) {
            this.toyChangedEventListeners.push(listener);
        }
    }

    // Event unsubscription method
    UnsubscribeFromToyChangedEvent(listener: () => void): void {
        const index = this.toyChangedEventListeners.indexOf(listener);
        if (index !== -1) {
        this.toyChangedEventListeners.splice(index, 1);
        }
    }

    // Method to trigger the event and notify the listeners
    TriggerToyChangedEvent(): void {
        for (const listener of this.toyChangedEventListeners) {
            listener();
        }
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
    SetPaperColor(color: paper.Color, red: number, green: number, blue: number, alpha: number) {
        color.red = this.MapRGBAToPaperRGBA(red);
        color.green = this.MapRGBAToPaperRGBA(green);
        color.blue = this.MapRGBAToPaperRGBA(blue);
        color.alpha = this.MapRGBAToPaperRGBA(alpha);
    }
    //Returns a RGBA object with 0-255 values
    GetPaperColor(color: paper.Color) {
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


    //Base JSON data that this class uses
    GetBaseJSON() {
        return {
            toyName: this.toyName,
            numberOfKeys: this.numberOfKeys,
            startKey: this.startKey,
            useRegExp: this.useRegExp,
            
            //Color data
            fillColor: {
                red: this.fillColor.red,
                green: this.fillColor.green,
                blue: this.fillColor.blue,
                alpha: this.fillColor.alpha
            },
            strokeColor: {
                red: this.strokeColor.red,
                green: this.strokeColor.green,
                blue: this.strokeColor.blue,
                alpha: this.strokeColor.alpha
            },
            accentColor: {
                red: this.accentColor.red,
                green: this.accentColor.green,
                blue: this.accentColor.blue,
                alpha: this.accentColor.alpha
            }  
        }
    }
    //Load base data from every toy class
    LoadBaseJSON(data: any) {
        if(data.toyName != "" || data.toyName != undefined) this.toyName = data.toyName;
        this.numberOfKeys = data.numberOfKeys;
        this.startKey = data.startKey;
        this.useRegExp = data.useRegExp;

        this.fillColor = new paper.Color(
          data.fillColor.red,
          data.fillColor.green,
          data.fillColor.blue,
          data.fillColor.alpha
        );
      
        this.strokeColor = new paper.Color(
          data.strokeColor.red,
          data.strokeColor.green,
          data.strokeColor.blue,
          data.strokeColor.alpha
        );

        this.accentColor = new paper.Color(
          data.accentColor.red,
          data.accentColor.green,
          data.accentColor.blue,
          data.accentColor.alpha
        );
    }
}