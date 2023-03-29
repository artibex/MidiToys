import { InputManager } from "./InputManager";
import { MIDIDataTable } from "./MIDIDataTable";
import { NoteSquare } from "./NoteSquare";
import { MIDIReceiver } from "./MIDIReceiver";

interface Vector2D {
    x: number;
    y: number;
  }

//Takes a canvas HTMLElement and draws cool things on it
export class SquareKeyboard {
    // canvasReverences: HTMLCanvasElement[];
    inputManager: InputManager
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    // notereceiver: NoteSquare[] = new Array();
    targetChannel: number;
    receiver: MIDIReceiver[] = [];
    drawPositions: Vector2D[] = [];

    squareSize: number = 5;


    constructor(canvas: HTMLCanvasElement, inputManager: InputManager, targetChannel: number, numberOfKeys: number, startNote: number) {
        // this.canvasReverences = canvasReverences;
        this.canvas = canvas; //Canvas element to draw on
        this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        this.targetChannel = targetChannel; //Target channel to listen to
        this.inputManager = inputManager; //Input Manager to get the information
        const devicePixelRatio = window.devicePixelRatio || 1;

        this.ctx.scale(devicePixelRatio, devicePixelRatio);
        let canWidth = canvas.width * devicePixelRatio;
        let canHeight = canvas.height * devicePixelRatio;
        canvas.width = canWidth;
        canvas.height = canHeight;

        let avgCellSize = canWidth / numberOfKeys;
        let halveCellSize = avgCellSize / 2;

        let counter = 0;
        // this.receiver[] = [numberOfKeys]; //How many receiver need to be drawn
        for(let i = 0; i < numberOfKeys; i++) {
            var rec = new MIDIReceiver(targetChannel, MIDIDataTable.MIDINoteToString(startNote));
            this.receiver.push(rec);

            let vec: Vector2D = ({x: avgCellSize + avgCellSize*counter, y: 0});
            this.drawPositions.push(vec);
            console.log(this.drawPositions[counter].x);

            counter++;
            startNote++;
        }
    }

    UpdateKeyboard() {
        let holdingKeys = this.inputManager.getHoldingKeys(this.targetChannel);
        let velocities = this.inputManager.getVelocity(this.targetChannel);

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let indexValue = 0;
        this.receiver.forEach(element => {
            let square = element as MIDIReceiver;

            if(square.GetMIDIInput(holdingKeys, velocities)) {
                //console.log("KEYPRESS:" + square.targetNote + " Velocity:" + square.GetVelocity());
                this.UpdateKey(square, indexValue, true);
            } else this.UpdateKey(square, indexValue, false);
            indexValue++;
        })


    }

    
    UpdateKey(midiReceiver: MIDIReceiver, indexValue: number, triggerd: boolean) {
        var x = this.drawPositions[indexValue].x;
        var y = this.drawPositions[indexValue].y;

        if(triggerd) {
            if(this.drawPositions[indexValue].y < this.canvas.height - this.squareSize*2) {
                this.drawPositions[indexValue].y += 4;
            }

            this.ctx.fillStyle = "red";
            this.ctx.fillRect(x, y, this.squareSize,this.squareSize);
        } else {
            if(this.drawPositions[indexValue].y > 0) {
                this.drawPositions[indexValue].y -= 2;

            } else this.drawPositions[indexValue].y = 0;
            this.ctx.strokeStyle = "white";
            this.ctx.fillStyle = "white";

            this.ctx.fillRect(this.drawPositions[indexValue].x, y, this.squareSize,this.squareSize);
            //this.ctx.fillRect(this.canvas.width/2, this.canvas.height/2, 10,10);
            
        }
    }
}
