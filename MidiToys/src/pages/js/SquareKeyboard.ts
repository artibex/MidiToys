import { InputManager } from "./InputManager";
import { MIDIDataTable } from "./MIDIDataTable";
import { MIDIReceiver } from "./MIDIReceiver";
import { MIDIKeyboard } from "./MIDIKeyboard";
import { Vector2D } from "./MIDIKeyboard";
import paper, { Color } from "paper";
import { Size } from "paper/dist/paper-core";

//Takes a canvas HTMLElement and draws cool things on it
export class SquareKeyboard extends MIDIKeyboard {
    squareSize: number[] = [];
    targetSquareSize: number = 10;
    paperKeys: paper.Path.Circle[] = [];


    constructor(canvas: HTMLCanvasElement, inputManager: InputManager, targetChannel: number, numberOfKeys: number, startNote: number) {
        super(inputManager, targetChannel, canvas, numberOfKeys, startNote);
        // this.canvasReverences = canvasReverences;
        this.targetSquareSize *= this.devicePixelRatio;

        this.SetupKeyboard();
        // window.addEventListener("resize", this.CalculateXValues);
    }

    SetupKeyboard() {
        let counter = 0;
        let avgCellSize = this.canvas.width / this.numberOfKeys;
        // let halveCellSize = avgCellSize / 2;
        let note = this.startNote;
        
        this.CalculateXValues();
        for(let i = 0; i < this.numberOfKeys; i++) {
            var rec = new MIDIReceiver(this.targetChannel, MIDIDataTable.MIDINoteToString(note));
            this.receiver.push(rec);
            this.squareSize.push(this.targetSquareSize);
            
            var x = this.drawPositions[i].x;
            var y = this.drawPositions[i].y + 50;

            let point = new paper.Point(x,y);
            let size = new paper.Size(1000, this.targetSquareSize);
            var square = new paper.Path.Rectangle({
                point: [x, y],
                size: [15, 15],
                strokeColor: 'white'
                });
            this.paperKeys.push(square);
            note++;
        }
    }

    CalculateXValues = () => {
        this.drawPositions.length = 0;

        let avgCellSize = this.canvas.width / (this.numberOfKeys*2);
        //let avgCellSize = 60;
        console.log("canvas width = " + this.canvas.width)
        let xCalc = 0;

        for(let i = 0; i < this.numberOfKeys; i++) {
            xCalc = avgCellSize + avgCellSize*(i+1) - (avgCellSize);
            let vec: Vector2D = ({x: xCalc, y: 100});
            this.drawPositions.push(vec);

        }
    }

    UpdateKeyboard = () => {
        let holdingKeys = this.inputManager.getHoldingKeys(this.targetChannel);
        let velocities = this.inputManager.getVelocity(this.targetChannel);

        // console.log("UPDATEING Keyboard");
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        let indexValue = 0;
        this.receiver.forEach(element => {
            let square = element as MIDIReceiver;
            if(square.GetMIDIInput(holdingKeys, velocities))
            {
                //console.log("KEYPRESS:" + square.targetNote + " Velocity:" + square.GetVelocity());
                //this.UpdateKey(square, indexValue, true);
                this.UpdatePaperKey(square, indexValue, true);
            }
            else {
                // this.UpdateKey(square, indexValue, false);
                this.UpdatePaperKey(square, indexValue, false);
            }
            indexValue++;
        })

    }


    UpdateKey(midiReceiver: MIDIReceiver, indexValue: number, triggerd: boolean) {
        var x = this.drawPositions[indexValue].x;
        var y = this.drawPositions[indexValue].y;
        let size = this.squareSize[indexValue];

        if(triggerd) { //Key was triggerd
            if(this.drawPositions[indexValue].y < this.canvas.height - this.targetSquareSize) {
                this.drawPositions[indexValue].y += 10;
            }
            if(size < this.targetSquareSize*10) this.squareSize[indexValue] *= 1.09;

            this.ctx.fillStyle = "red";
            this.ctx.fillRect(x, 0, this.targetSquareSize, size);
        } else { //Key was NOT triggerd
            if(this.drawPositions[indexValue].y > 0) {
                this.drawPositions[indexValue].y *= 0.95;
            } else this.drawPositions[indexValue].y = 0;

            if(size > this.targetSquareSize) this.squareSize[indexValue] *= 0.98;
            else this.squareSize[indexValue] = this.targetSquareSize;

            // if(size > this.targetSquareSize) this.targetSquareSize[indexValue] -= 2;
            // else this.targetSquareSize[indexValue] = this.targetSquareSize;

            this.ctx.strokeStyle = "white";
            this.ctx.fillStyle = "white";

            this.ctx.strokeRect(this.drawPositions[indexValue].x, 0, this.targetSquareSize , size);
            //this.ctx.fillRect(this.canvas.width/2, this.canvas.height/2, 10,10);
        }
    }

    UpdatePaperKey(midiReceiver: MIDIReceiver, indexValue: number, triggerd: boolean) {
        var x = this.drawPositions[indexValue].x;
        var y = this.drawPositions[indexValue].y;
        let size = this.squareSize[indexValue];
        
        let square = this.paperKeys[indexValue];
        let pos = square.position;
        //this.paperKeys[indexValue]
        // this.paperKeys[indexValue].position.x = x;
        // this.paperKeys[indexValue].position.y = y + 50;
        
        if(triggerd) {
            if(pos.y < this.canvas.height / 2) pos.y *= 1.05;
            square.position = pos;
            square.fillColor = new Color(0);
            // square.rotate(3);
        } 
        else {  
            if(pos.y > y) {
                pos.y *= 0.95;
            } else pos.y = y; 
            
            square.position = pos;
            square.fillColor = new Color(1);
        }
    }
}
