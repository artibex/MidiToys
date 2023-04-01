import { InputManager } from "./InputManager";
import { MIDIDataTable } from "./MIDIDataTable";
import { NoteSquare } from "./NoteSquare";
import { MIDIReceiver } from "./MIDIReceiver";
import { MIDIKeyboard } from "./MIDIKeyboard";
import { Vector2D } from "./MIDIKeyboard";

//Takes a canvas HTMLElement and draws cool things on it
export class SquareKeyboard extends MIDIKeyboard {
    squareSize: number[] = [];
    targetSquareSize: number = 20;

    constructor(canvas: HTMLCanvasElement, inputManager: InputManager, targetChannel: number, numberOfKeys: number, startNote: number) {
        super(inputManager, targetChannel, canvas, numberOfKeys, startNote);
        // this.canvasReverences = canvasReverences;
        this.targetSquareSize *= this.devicePixelRatio;
    
        this.SetupKeyboard();
        window.addEventListener("resize", this.CalculateXValues);
    }

    SetupKeyboard() {
        let counter = 0;
        let avgCellSize = this.canvas.width / this.numberOfKeys;
        // let halveCellSize = avgCellSize / 2;
        let note = this.startNote;

        for(let i = 0; i < this.numberOfKeys; i++) {
            var rec = new MIDIReceiver(this.targetChannel, MIDIDataTable.MIDINoteToString(note));
            this.receiver.push(rec);
            this.squareSize.push(this.targetSquareSize);
            note++;
        }
        this.CalculateXValues();
    }

    CalculateXValues = () => {
        this.drawPositions.length = 0;

        let counter = 0;
        let avgCellSize = this.canvas.width / this.numberOfKeys;

        for(let i = 0; i < this.numberOfKeys; i++) {
            let vec: Vector2D = ({x: 0 + avgCellSize*counter, y: 0});
            this.drawPositions.push(vec);

            counter++;
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
                //console.log("KEYPRESS:" + square.targetNote + " Velocity:" + square.GetVelocity());
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
}
