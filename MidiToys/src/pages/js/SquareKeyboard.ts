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
    squareSize: number[] = [];

    canWidth: number;
    canHeight: number;

    devicePixelRatio: number = 1;
    numberOfKeys: number = 12;
    startNote: number = 12;
    targetSquareSize: number = 5;

    constructor(canvas: HTMLCanvasElement, inputManager: InputManager, targetChannel: number, numberOfKeys: number, startNote: number) {
        // this.canvasReverences = canvasReverences;
        this.canvas = canvas; //Canvas element to draw on
        this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        this.targetChannel = targetChannel; //Target channel to listen to
        this.inputManager = inputManager; //Input Manager to get the information
        this.devicePixelRatio = window.devicePixelRatio * 10 || 1;
        this.numberOfKeys = numberOfKeys;
        console.log("Number of Keys = " + this.numberOfKeys);
        this.startNote = startNote;

        this.targetSquareSize *= this.devicePixelRatio;
        this.ctx.scale(this.devicePixelRatio, this.devicePixelRatio);
        this.canWidth = canvas.width * this.devicePixelRatio;
        this.canHeight = canvas.height * this.devicePixelRatio;
        canvas.width = this.canWidth;
        canvas.height = this.canHeight;
        
        this.SetupKeyboard();
    }

    SetupKeyboard() {
        let counter = 0;
        let avgCellSize = this.canWidth / this.numberOfKeys;
        let halveCellSize = avgCellSize / 2;
        let note = this.startNote;

        for(let i = 0; i < this.numberOfKeys; i++) {
            var rec = new MIDIReceiver(this.targetChannel, MIDIDataTable.MIDINoteToString(note));
            this.receiver.push(rec);
            console.log("FOR LOOP");
            let vec: Vector2D = ({x: avgCellSize + avgCellSize*counter, y: 0});
            this.drawPositions.push(vec);
            this.squareSize.push(this.targetSquareSize);

            // console.log(this.drawPositions[counter].x);

            counter++;
            note++;
        }
    }

    UpdateKeyboard() {
        let holdingKeys = this.inputManager.getHoldingKeys(this.targetChannel);
        let velocities = this.inputManager.getVelocity(this.targetChannel);

        // console.log("UPDATEING Keyboard");
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        let indexValue = 0;
        this.receiver.forEach(element => {
            let square = element as MIDIReceiver;
            if(square.GetMIDIInput(holdingKeys, velocities)) 
            {
                console.log("KEYPRESS:" + square.targetNote + " Velocity:" + square.GetVelocity());
                this.UpdateKey(square, indexValue, true);
            } 
            else this.UpdateKey(square, indexValue, false);
            indexValue++;
        })


    }

    
    UpdateKey(midiReceiver: MIDIReceiver, indexValue: number, triggerd: boolean) {
        var x = this.drawPositions[indexValue].x;
        var y = this.drawPositions[indexValue].y;
        let size = this.squareSize[indexValue];

        if(triggerd) { //Key was triggerd
            console.log("KEY is triggerd");
            if(this.drawPositions[indexValue].y < this.canvas.height - this.targetSquareSize) {
                this.drawPositions[indexValue].y += 10;
            }
            if(size < this.targetSquareSize*10) this.squareSize[indexValue] *= 1.05;

            this.ctx.fillStyle = "red";
            this.ctx.fillRect(x, y, this.targetSquareSize, size);
        } else { //Key was NOT triggerd
            if(this.drawPositions[indexValue].y > 0) {
                this.drawPositions[indexValue].y *= 0.95;
            } else this.drawPositions[indexValue].y = 0;
            
            if(size > this.targetSquareSize) this.squareSize[indexValue] *= 0.95;
            else this.squareSize[indexValue] = this.targetSquareSize;

            // if(size > this.targetSquareSize) this.targetSquareSize[indexValue] -= 2;
            // else this.targetSquareSize[indexValue] = this.targetSquareSize;

            this.ctx.strokeStyle = "white";
            this.ctx.fillStyle = "white";

            this.ctx.strokeRect(this.drawPositions[indexValue].x, y, this.targetSquareSize , size);
            //this.ctx.fillRect(this.canvas.width/2, this.canvas.height/2, 10,10);
            
        }
    }
}
