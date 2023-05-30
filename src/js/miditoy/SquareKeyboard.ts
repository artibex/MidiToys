import { MIDIReceiver } from "./MIDIReceiver";
import { MIDIToy } from "./MIDIToy";
import paper from 'paper';

//Takes a canvas HTMLElement and draws cool things on it
export class SquareKeyboard extends MIDIToy {
    // squareSize: number[] = [];
    targetSquareSize = 20;
    paperKeys: paper.Path.Rectangle[] = [];

    constructor(targetChannel: number) {
        super("Square Keyboard", targetChannel, 26, 12, true);
        // this.canvasReverences = canvasReverences;

        this.SetupKeyboard();
        // window.addEventListener("resize", this.CalculateXValues);
    }

    LoadDefaultColors() {
        this.fillColor = new paper.Color(0,0,0,0);
        this.strokeColor = new paper.Color(1);
        this.accentColor = new paper.Color(0,0,0,0);
    }

    ApplyColors() {
        
    }

    LoadJSON(data: any) {
        
    }
    ToJSON() {
        
    }

    SetupKeyboard() {
        // this.CalculateDrawPositions();
        var cellSize = (this.w / this.numberOfKeys);
        this.targetSquareSize = this.HorizontalDrawPositionDistrubution(cellSize);

        for(let i = 0; i < this.numberOfKeys; i++) {
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
            this.paperLayer.addChild(square);    
        }
    }

    UpdateKeyboard = () => {
        let holdingKeys = this.inputManager.GetHoldingKeys(this.targetChannel);
        let velocities = this.inputManager.GetVelocity(this.targetChannel);
        this.bpm = this.inputManager.GetBPM();

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

    UpdatePaperKey(midiReceiver: MIDIReceiver, indexValue: number, triggerd: boolean) {
        var s = this.targetSquareSize;
        var maxY = this.h - s;
        var targetY = 0;
        // var minY = s / 4;
        
        let square = this.paperKeys[indexValue] as paper.Path.Rectangle;
        var fillColor = square.fillColor as paper.Color;
        // var strokeColor = square.strokeColor as paper.Color;
        let pos = square.position;

        //X movement
        if(pos.x > this.w) pos.x = 0;
        else {
            pos.x += this.targetChannel/2 + Math.round(this.bpm * 0.01);
        }

        //If key is triggerd
        if(triggerd) {
            //Color adjustment
            if(fillColor.alpha < 1) fillColor.alpha += midiReceiver.velocityValue * 0.01;
            
            //Height adjustment
            if(square.bounds.height < this.h) square.bounds.height *= 1.01 + midiReceiver.velocityValue * 0.0005;
            else square.bounds.height = this.h;

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
        square.position = pos;
        // square.strokeColor = strokeColor;
    }
}
