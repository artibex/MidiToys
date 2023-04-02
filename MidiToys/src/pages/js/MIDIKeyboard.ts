import { MIDIDataTable } from "./MIDIDataTable";
import { MIDIReceiver } from "./MIDIReceiver";
import { InputManager } from "./InputManager";
import paper, { Color } from "paper";

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
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        
        //Paper.js stuff
        // paper.setup(this.canvas);
        //this.paperProject = new paper.Project(this.canvas);
        // this.paperLayer = new paper.Layer();
        // this.paperProject = paper.project;
        // this.paperProject.addLayer(this.paperLayer);

        //Setup Keys
        this.numberOfKeys = numberOfKeys;
        this.startNote = startNote;
    
        this.ResizeCanvas();
        // window.addEventListener("resize", this.ResizeCanvas);
        
        console.log("CREATED new MIDIKeyboard on channel " + this.targetChannel);
    }

    // PaperTest() {
    //     const circle = new paper.Path.Circle(new paper.Point(100, 100), 500);
    //     circle.fillColor = new Color(200);
    //     this.project.view.draw();
    // }

    PaperDraw() {
        // const circle = new paper.Path.Circle({
        //     center: [100 * this.targetChannel, 100],
        //     radius: 15,
        //     fillColor: 'red'
        //   });    
        //   this.paperLayer.addChild(circle);
        }

    ResizeCanvas = () => {
        console.log("RESIZE keyboard")
        // this.devicePixelRatio = window.devicePixelRatio || 1;

        // const devicePixelRatio = window.devicePixelRatio || 1;
        // let pxWidth = this.canvas.width;
        // let pxHeight = this.canvas.height;

        // this.canvas.width = pxWidth;
        // this.canvas.height = pxHeight;

        // this.canvas.style.width = pxWidth + "px";
        // this.canvas.style.height = pxHeight + "px";

        // this.ctx.scale(devicePixelRatio, devicePixelRatio);
    }
}