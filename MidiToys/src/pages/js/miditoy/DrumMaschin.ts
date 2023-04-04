import { MIDIReceiver } from "./MIDIReceiver";
import { MIDIKeyboard } from "./MIDIKeyboard";
import { Vector2D } from "./MIDIKeyboard";
import paper, { Color } from "paper";

export class DrumMaschin extends MIDIKeyboard {
    rectangles: paper.Path.Rectangle[] = [];
    startSize: number = 10;
    prevHoldingKeys: string[] = [];

    constructor(canvas: HTMLCanvasElement, targetChannel: number, numberOfKeys: number, startNote: number) {
        super(canvas, targetChannel, numberOfKeys, startNote, false);
        console.log("CREATED DrumMaschin");
    }

    UpdateKeyboard() {
        let holdingKeys = this.inputManager.getHoldingKeys(this.targetChannel);
        let velocities = this.inputManager.getVelocity(this.targetChannel);
        this.bpm = this.inputManager.getBPM();
        
        this.UpdateSquares();
        
        if(holdingKeys.length > 0 && JSON.stringify(holdingKeys) !== JSON.stringify(this.prevHoldingKeys)) {
            this.SpawnSquare();
        }

        this.prevHoldingKeys = [...holdingKeys];
        // console.log(holdingKeys);
        
        // if(JSON.stringify(holdingKeys) !== JSON.stringify(this.prevHoldingKeys)) {
        //     this.prevHoldingKeys = [...holdingKeys];
        // }
        // this.prevHoldingKeys = [...holdingKeys];
    }

    SpawnSquare() {
        var s = this.startSize
        var square = new paper.Path.Rectangle({
            point: [this.w/2, this.h/2],
            size: [s, s],
            strokeColor: 'white',
            strokeWidth: 5
            //fillColor: "white"
            });

        //square.strokeColor?.alpha = 0;
        this.rectangles.push(square);
    }

    UpdateSquares() {
        let indexValue: number = 0;
        this.rectangles.forEach(element => {
            var square = element as paper.Path.Rectangle;
            square.bounds.height += 5;
            square.bounds.width += 5;
            square.position.x -= 5/2;
            square.position.y -= 5/2;
            square.strokeColor.alpha -= 0.01;
            //square.strokeWidth -= 0.1;
            //square.rotate(1 + square.bounds.height*0.1);
            square.rotate(1);
            square.strokeWidth -= 0.1;

            if(square.strokeColor?.alpha <= 0) {
                this.RemoveSquare(indexValue);
            }
            indexValue++;
        })
    }

    RemoveSquare(indexValue: number) {
        var square = this.rectangles[indexValue] as paper.Path.Rectangle;
        this.rectangles.splice(indexValue, 1);
        square.remove();
    }

    UpdatePaperKey(midiReceiver: MIDIReceiver, indexValue: number, triggerd: boolean) {

        if(triggerd) {

        } else {
            
        }
    }
}