import { MIDIReceiver } from "./MIDIReceiver";
import { MIDIKeyboard } from "./MIDIKeyboard";
import { Vector2D } from "./MIDIKeyboard";
import paper, { Color } from "paper";

export class DrumMaschin extends MIDIKeyboard {
    shapes: paper.Path[] = [];
    shapeLimit: number = 20;
    polySides: number = 3;

    startSize: number = 500;
    sizeIncrease: number = 0.98;
    alphaDecrease: number = 0;
    rotationSpeed: number = 0.01;

    //Stroke settings
    strokeWidth: number = 10;
    strokeWidthDecrease: number = 1

    minWidth: number = this.w * 0.5;
    maxWidth: number = this.w * 0.5;

    minHeight: number = this.h * 0.5;
    maxHeight: number = this.h * 0.5;

    constructor(canvas: HTMLCanvasElement, targetChannel: number, numberOfKeys: number, startNote: number) {
        super(canvas, targetChannel, numberOfKeys, startNote, false);
        console.log("CREATED DrumMaschin");
        console.log(this.receiver.length);
        this.inputManager.Subscribe(targetChannel, this.InputEvent.bind(this));
    }

    frameCount: number = 0;
    UpdateKeyboard() {
        this.UpdateShapes();
        this.frameCount++;
        if(this.frameCount > 600) {
            this.frameCount = 0;
            this.ChangePolySideCount();
        }
    }

    ChangePolySideCount() {
        var rand = Math.random();

        if(rand > 0.5) {
            if(this.polySides < 10) this.polySides += 1;
            else this.polySides -= 1;
        } 
        else {
            if(this.polySides > 2) this.polySides -= 1;
            else this.polySides += 1;
        }
    }

    InputEvent(onEvent: boolean) {
        if(!onEvent) {
            return;
        }

        let holdingKeys = this.inputManager.getHoldingKeys(this.targetChannel);
        let velocities = this.inputManager.getVelocity(this.targetChannel);
        this.bpm = this.inputManager.getBPM();

        this.receiver.forEach(element => {
            var r = element as MIDIReceiver;
            if(r.GetMIDIInput(holdingKeys, velocities)) {
                console.log("FOUND key, spawn square");
                this.SpawnShape(r.GetVelocity());
            }
        })

        // if(holdingKeys.length > 0) {
        //     this.SpawnSquare();
        // }
    }

    SpawnShape(velocity: number) {
        console.log("DRAW shape");
        var point = new paper.Point(this.GetRandomNumber(this.minWidth, this.maxWidth), this.GetRandomNumber(this.minHeight,this.maxHeight));
        var poly = new paper.Path.RegularPolygon(point, this.polySides, this.startSize);
        poly.strokeColor = new Color(255);
        poly.strokeWidth = this.strokeWidth + velocity/10;
        // poly.fillColor = new Color(200);

        if(this.shapes.length >= this.shapeLimit) {
         this.RemoveShape(0);   
        } 
        this.shapes.push(poly);
    }

    UpdateShapes() {
        let indexValue: number = 0;
        this.shapes.forEach(element => {
            var poly = element as paper.Path.Rectangle;
            //Move and scale
            poly.scale(this.sizeIncrease)
            // poly.bounds.height += this.sizeIncrease;
            // poly.bounds.width += this.sizeIncrease;
            // poly.position.x -= this.sizeIncrease/2;
            // poly.position.y -= this.sizeIncrease/2;
            
            poly.strokeColor.alpha -= this.alphaDecrease;
            //square.strokeWidth -= 0.1;
            poly.strokeWidth -= 0.5;
            //square.rotate(1 + square.bounds.height*0.1);
            poly.rotate(this.rotationSpeed + poly.bounds.width / 1000);

            if(poly.strokeColor?.alpha <= 0 || poly.strokeWidth <= 0) {
                this.RemoveShape(indexValue);
            }
            indexValue++;
        })
    }

    RemoveShape(indexValue: number) {
        var square = this.shapes[indexValue] as paper.Path.Rectangle;
        this.shapes.splice(indexValue, 1);
        square.remove();
    }

}