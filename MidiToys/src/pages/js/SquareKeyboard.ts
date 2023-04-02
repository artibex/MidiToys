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
    bpm: number = 0;

    constructor(canvas: HTMLCanvasElement, inputManager: InputManager, targetChannel: number, numberOfKeys: number, startNote: number) {
        super(inputManager, targetChannel, canvas, numberOfKeys, startNote, true);
        // this.canvasReverences = canvasReverences;
        this.targetSquareSize *= this.devicePixelRatio;

        this.SetupKeyboard();
        // window.addEventListener("resize", this.CalculateXValues);
    }

    CalculateDrawPositions = () => {
        this.drawPositions.length = 0;

        const {width} = this.canvas.getBoundingClientRect();
        let avgCellSize = width / this.numberOfKeys;
        // console.log("canvas width = " + width)
        
        for(let i = 0; i < this.numberOfKeys; i++) {
            let xCalc = avgCellSize*i ;
            let vec: Vector2D = ({x: xCalc, y: 100});
            this.drawPositions.push(vec);
        }

        // for(let i = avgCellSize /2; i < width; i += avgCellSize / 2) {
        //     let xCalc = i;
        //     let vec: Vector2D = ({x: xCalc, y: 100});
        //     this.drawPositions.push(vec);
        // }

    }

    SetupKeyboard() {
        this.CalculateDrawPositions();

        for(let i = 0; i < this.numberOfKeys; i++) {
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
        var x = this.drawPositions[indexValue].x;
        var y = this.drawPositions[indexValue].y;
        let size = this.squareSize[indexValue];
        const {width} = this.canvas.getBoundingClientRect();
        const {height} = this.canvas.getBoundingClientRect();

        let square = this.paperKeys[indexValue] as paper.Path.Rectangle;
        let pos = square.position;
        
        square.bounds.center = square.bounds.topCenter;

        if(pos.x > width) pos.x = 0;
        else {
            if(this.bpm > 70) pos.x += 1 + Math.round(this.bpm * 0.01 * this.targetChannel);
            else pos.x += 1 + Math.round(this.bpm * 0.02 * this.targetChannel);
        }

        if(triggerd) {
            if(square.bounds.height < 15 * 6 + midiReceiver.velocityValue* 0.01) {
                var calc = square.bounds.height * 1.001 + midiReceiver.velocityValue* 0.001;
                pos.y += calc;
                square.bounds.height += calc;
                square.bounds.width += calc;
            }

            if(pos.y < y*2*this.targetChannel) {
                pos.y *= 1.05 + midiReceiver.velocityValue* 0.001;
            } else pos.y = y*2*this.targetChannel;
            square.fillColor = new Color(0.2 + midiReceiver.velocityValue * 0.001);
        } 
        else {  
            if(square.bounds.height > 15) {
                var calc = square.bounds.height * 0.05;
                pos.y -= calc;
                square.bounds.width -= calc;
                square.bounds.height -= calc;
            }
            else {
                square.bounds.height = 15;
                square.bounds.width = 15;

                pos.y = y;
            }
            
            // if(pos.y > y) pos.y *= 0.95;
            // else pos.y = y;

            square.fillColor = new Color(0);
        }

        square.position = pos;
    }
}
