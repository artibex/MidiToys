import { MIDIDataTable } from "./MIDIDataTable";
import { MIDIReceiver } from "./MIDIReceiver";
import { InputManager } from "./InputManager";


export interface Vector2D {
    x: number;
    y: number;
  }
export class MIDIKeyboard {
    //Basic information
    inputManager: InputManager;
    targetChannel: number;
    
    //Canvas settings
    devicePixelRatio: number;
    canvas: HTMLCanvasElement; //The canvas
    ctx: CanvasRenderingContext2D; //The canvas context

    //MIDI Receiver settings
    numberOfKeys: number = 12; //How many keys are on this keyboard?
    startNote: number = 12; //The note from where you count up
    receiver: MIDIReceiver[] = [];
    
    //Vector Positions as array
    drawPositions: Vector2D[] = [];

    //Construct everything basic that is needed for a MIDIKeyboard
    constructor(inputManager: InputManager, targetChannel: number, canvas:HTMLCanvasElement, numberOfKeys: number, startNote: number) {
        this.inputManager = inputManager; //The Input Manager
        this.targetChannel = targetChannel; //The target channel
        this.canvas = canvas; //Canvas element to draw on
        this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        
        //Setup Keys
        this.numberOfKeys = numberOfKeys;
        this.startNote = startNote;
    
        this.ResizeCanvas();
        window.addEventListener("resize", this.ResizeCanvas);
        
        console.log("CREATED new MIDIKeyboard on channel " + this.targetChannel);
    }

    ResizeCanvas = () => {
        console.log("RESIZE keyboard")
        this.devicePixelRatio = window.devicePixelRatio || 1;

        // Set canvas dimensions to match actual number of pixels on screen
        const width = window.innerWidth * this.devicePixelRatio;
        const height = window.innerHeight * this.devicePixelRatio;
        this.canvas.width = width;
        this.canvas.height = height;

        // Scale the canvas context to match the new dimensions
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        // Scale the canvas down to match the CSS size
        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;

    }
}