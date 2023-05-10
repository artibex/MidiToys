import { MIDIReceiver } from "./MIDIReceiver";
import { MIDIToy } from "./MIDIToy";
import { Vector2D } from "../Interfaces";
import paper from 'paper';

export class PolyDrum extends MIDIToy {
    shapes: paper.Path[] = [];
    shapeLimit: number = 20;
    polySides: number = 3;

    startSize: number = 500;
    sizeIncrease: number = 0.98;
    alphaDecrease: number = 0.01;
    rotationSpeed: number = 0;

    //Stroke settings
    strokeWidth: number = 10;
    strokeWidthDecrease: number = 1

    minWidth: number = this.w * 0.5;
    maxWidth: number = this.w * 0.5;

    minHeight: number = this.h * 0.5;
    maxHeight: number = this.h * 0.5;

    constructor(targetChannel: number, numberOfKeys: number, startKey: number) {
        super("PolyDrum", targetChannel, numberOfKeys, startKey, true);
        console.log("CREATED PolyDrum");
        console.log(this.receiver.length);
        this.inputManager.Subscribe(targetChannel, this.InputEvent.bind(this));
        this.LoadDefaultColorSettings();
        this.SetupKeyboard();
    }

    LoadDefaultColorSettings() {
        this.fillColor = new paper.Color(0,0,0,0);
        this.strokeColor = new paper.Color(1);
        this.accentColor = new paper.Color(0,0,0,0);
    }

    SetupKeyboard() {
        this.SpawnShape(120);
    }

    frameCount: number = 0;
    UpdateKeyboard() {
        this.UpdateShapes();
        // this.frameCount++;
        // if(this.frameCount > 600) {
        //     this.frameCount = 0;
        //     this.ChangePolySideCount();
        // }
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

        let holdingKeys = this.inputManager.GetHoldingKeys(this.targetChannel);
        let velocities = this.inputManager.GetVelocity(this.targetChannel);
        this.bpm = this.inputManager.GetBPM();

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
        poly.fillColor = this.fillColor;
        poly.strokeColor = this.strokeColor;
        poly.strokeWidth = this.strokeWidth + velocity/10;
        this.paperLayer.addChild(poly);

        if(this.shapes.length >= this.shapeLimit) {
         this.RemoveShape(0);   
        } 
        this.shapes.push(poly);
    }

    UpdateShapes() {
        let indexValue: number = 0;
        this.shapes.forEach(element => {
            var poly = element as paper.Path.RegularPolygon;
            //Move and scale
            poly.scale(this.sizeIncrease)
            
            //poly.fillColor.alpha -= this.alphaDecrease;
            poly.strokeColor.alpha -= this.alphaDecrease;
            poly.strokeWidth *= this.strokeWidthDecrease;
            poly.rotate(this.rotationSpeed * poly.bounds.width / 1000);

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