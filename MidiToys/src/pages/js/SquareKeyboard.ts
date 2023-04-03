import { InputManager } from "./InputManager";
import { MIDIDataTable } from "./MIDIDataTable";
import { MIDIReceiver } from "./MIDIReceiver";
import { MIDIKeyboard } from "./MIDIKeyboard";
import { Vector2D } from "./MIDIKeyboard";
import paper, { Color } from "paper";
import { Size } from "paper/dist/paper-core";

//Takes a canvas HTMLElement and draws cool things on it
export class SquareKeyboard extends MIDIKeyboard {
    // squareSize: number[] = [];
    targetSquareSize = 20;
    paperKeys: paper.Path.Circle[] = [];
    bpm: number = 0;

    constructor(canvas: HTMLCanvasElement, inputManager: InputManager, targetChannel: number, numberOfKeys: number, startNote: number) {
        super(inputManager, targetChannel, canvas, numberOfKeys, startNote, true);
        // this.canvasReverences = canvasReverences;

        this.SetupKeyboard();
        // window.addEventListener("resize", this.CalculateXValues);
    }

    CalculateDrawPositions = () => {
        this.drawPositions.length = 0;

        const {width} = this.canvas.getBoundingClientRect();
        const {height} = this.canvas.getBoundingClientRect();
        let avgCellSize = width / this.numberOfKeys;

        this.targetSquareSize = avgCellSize;
        var s = this.targetSquareSize;

        for(let i = 0; i < this.numberOfKeys; i++) {
            let xCalc = avgCellSize*i ;
            let vec: Vector2D = ({x: xCalc, y: height / 2 - s / 4});
            this.drawPositions.push(vec);
        }
    }

    SetupKeyboard() {
        this.CalculateDrawPositions();

        for(let i = 0; i < this.numberOfKeys; i++) {
            // this.squareSize.push(this.targetSquareSize);

            var x = this.drawPositions[i].x;
            var y = this.drawPositions[i].y;
            let s = this.targetSquareSize;

            var square = new paper.Path.Rectangle({
                point: [x, y],
                size: [s, s/2],
                //strokeColor: 'white',
                fillColor: "white"
                });
            this.paperKeys.push(square);
        }
    }

    UpdateKeyboard = () => {
        let holdingKeys = this.inputManager.getHoldingKeys(this.targetChannel);
        let velocities = this.inputManager.getVelocity(this.targetChannel);
        this.bpm = this.inputManager.getBPM();

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        let indexValue = 0;
        this.receiver.forEach(element => {
            let square = element as MIDIReceiver;
            if(square.GetMIDIInput(holdingKeys, velocities))
            {
                this.UpdatePaperKey(square, indexValue, true);
            }
            else {
                this.UpdatePaperKey(square, indexValue, false);
            }
            indexValue++;
        })
    }


    // UpdateKey(midiReceiver: MIDIReceiver, indexValue: number, triggerd: boolean) {
    //     var x = this.drawPositions[indexValue].x;
    //     var y = this.drawPositions[indexValue].y;
    //     let size = this.squareSize[indexValue];

    //     if(triggerd) { //Key was triggerd
    //         if(this.drawPositions[indexValue].y < this.canvas.height - this.targetSquareSize) {
    //             this.drawPositions[indexValue].y += 10;
    //         }
    //         if(size < this.targetSquareSize*10) this.squareSize[indexValue] *= 1.09;

    //         this.ctx.fillStyle = "red";
    //         this.ctx.fillRect(x, 0, this.targetSquareSize, size);
    //     } else { //Key was NOT triggerd
    //         if(this.drawPositions[indexValue].y > 0) {
    //             this.drawPositions[indexValue].y *= 0.95;
    //         } else this.drawPositions[indexValue].y = 0;

    //         if(size > this.targetSquareSize) this.squareSize[indexValue] *= 0.98;
    //         else this.squareSize[indexValue] = this.targetSquareSize;

    //         // if(size > this.targetSquareSize) this.targetSquareSize[indexValue] -= 2;
    //         // else this.targetSquareSize[indexValue] = this.targetSquareSize;

    //         this.ctx.strokeStyle = "white";
    //         this.ctx.fillStyle = "white";

    //         this.ctx.strokeRect(this.drawPositions[indexValue].x, 0, this.targetSquareSize , size);
    //         //this.ctx.fillRect(this.canvas.width/2, this.canvas.height/2, 10,10);
    //     }
    // }

    UpdatePaperKey(midiReceiver: MIDIReceiver, indexValue: number, triggerd: boolean) {
        // let size = this.squareSize[indexValue];
        const {width} = this.canvas.getBoundingClientRect();
        const {height} = this.canvas.getBoundingClientRect();

        // var x = this.drawPositions[indexValue].x;
        // var y = this.drawPositions[indexValue].y;
        var s = this.targetSquareSize;
        var maxY = height - s;
        var targetY = 0;
        var minY = s / 4;
        
        let square = this.paperKeys[indexValue] as paper.Path.Rectangle;
        var fillColor = square.fillColor as paper.Color;
        // var strokeColor = square.strokeColor as paper.Color;
        let pos = square.position;

        //X movement
        if(pos.x > width) pos.x = 0;
        else {
            pos.x += 0.5 + Math.round(this.bpm * 0.01 * this.targetChannel);
        }

        //If key is triggerd
        if(triggerd) {
            if(fillColor.alpha < 1) fillColor.alpha += midiReceiver.velocityValue * 0.01;
            if(square.bounds.height < height*0.9) square.bounds.height *= 1.01 + midiReceiver.velocityValue * 0.0005;
            else square.bounds.height = height*0.9;

            // square.fillColor = new Color(0.5 + midiReceiver.velocityValue * 0.001);
            if(pos.y < maxY) {
                var calc = (maxY - pos.y) / 8 + midiReceiver.velocityValue * 0.01; 
                pos.y += calc;
            } else pos.y = maxY;
        }
        else //If key is not triggerd
        {
            if(fillColor.alpha > 0.01) fillColor.alpha -= fillColor.alpha / 16;
            
            if(square.bounds.height > this.targetSquareSize /2) {
                square.bounds.height *= 0.95;
            } else square.bounds.height = this.targetSquareSize /2;
            if(pos.y > targetY) pos.y *= 0.95;
            else pos.y = targetY;
        }

        square.fillColor = fillColor;
        // square.strokeColor = strokeColor;
        square.position = pos;
    }
}
