import { MIDIReceiver } from "./MIDIReceiver";
import { MIDIToy } from "./MIDIToy";
import { Vector2D } from "../Interfaces";
import paper from 'paper';

export class PolyDrum extends MIDIToy {
    // shapes: paper.Path[] = [];
    shapeLimit: number = 10;
    polySides: number = 3;

    startSize: number = 500;
    sizeIncrease: number = 0.98;
    alphaDecrease: number = 0.01;
    rotationSpeed: number = 0;

    //Stroke settings
    strokeWidth: number = 10;
    strokeWidthDecrease: number = 1

    xSpawnPos: number = this.w * 0.5;
    ySpawnPos: number = this.h * 0.5;
    xSpawnOffset: number = 1;
    ySpawnOffset: number = 1;

    minWidth: number = this.w * 0.5;
    maxWidth: number = this.w * 0.5;

    minHeight: number = this.h * 0.5;
    maxHeight: number = this.h * 0.5;

    constructor(targetChannel: number) {
        super(targetChannel, 24, 12, true);
        console.log("CREATED PolyDrum");
        console.log(this.receiver.length);
        this.inputManager.Subscribe(targetChannel, this.InputEvent.bind(this));
        this.LoadDefaultColorSettings();
        this.SetupKeyboard();
    }

    LoadDefaultColorSettings() {
        this.fillColor = new paper.Color(0,0,0,0.1);
        this.strokeColor = new paper.Color(1);
        this.accentColor = new paper.Color(0,0,0,0);
    }

    ToJSON() {
    return {
        //MIDIToy data
        numberOfKeys: this.numberOfKeys,
        startKey: this.startKey,
        useRegExp: this.useRegExp,
        fillColor: {
            red: this.fillColor.red,
            green: this.fillColor.green,
            blue: this.fillColor.blue,
            alpha: this.fillColor.alpha
        },
        strokeColor: {
            red: this.strokeColor.red,
            green: this.strokeColor.green,
            blue: this.strokeColor.blue,
            alpha: this.strokeColor.alpha
        },
        accentColor: {
            red: this.accentColor.red,
            green: this.accentColor.green,
            blue: this.accentColor.blue,
            alpha: this.accentColor.alpha
        },

        //Class specific data
        shapeLimit: this.shapeLimit,
        polySides: this.polySides,
        startSize: this.startSize,
        sizeIncrease: this.sizeIncrease,
        alphaDecrease: this.alphaDecrease,
        rotationSpeed: this.rotationSpeed,
        strokeWidth: this.strokeWidth,
        strokeWidthDecrease: this.strokeWidthDecrease,
        // xSpawnPos: this.xSpawnPos,
        // ySpawnPos: this.ySpawnPos,
        xSpawnOffset: this.xSpawnOffset,
        ySpawnOffset: this.ySpawnOffset,
        // minWidth: this.minWidth,
        // maxWidth: this.maxWidth,
        // minHeight: this.minHeight,
        // maxHeight: this.maxHeight
        };
    }
    LoadJSON(data: any) {
        //MIDIToy Loading
        this.numberOfKeys = data.numberOfKeys;
        this.startKey = data.startKey;
        this.useRegExp = data.useRegExp;

        this.fillColor = new paper.Color(
          data.fillColor.red,
          data.fillColor.green,
          data.fillColor.blue,
          data.fillColor.alpha
        );
      
        this.strokeColor = new paper.Color(
          data.strokeColor.red,
          data.strokeColor.green,
          data.strokeColor.blue,
          data.strokeColor.alpha
        );

        this.accentColor = new paper.Color(
          data.accentColor.red,
          data.accentColor.green,
          data.accentColor.blue,
          data.accentColor.alpha
        );
      
        //Class specific loading
        this.shapeLimit = data.shapeLimit;
        this.polySides = data.polySides;
        this.startSize = data.startSize;
        this.sizeIncrease = data.sizeIncrease;
        this.alphaDecrease = data.alphaDecrease;
        this.rotationSpeed = data.rotationSpeed;
        this.strokeWidth = data.strokeWidth;
        this.strokeWidthDecrease = data.strokeWidthDecrease;
        // this.xSpawnPos = data.xSpawnPos;
        // this.ySpawnPos = data.ySpawnPos;
        this.xSpawnOffset = data.xSpawnOffset;
        this.ySpawnOffset = data.ySpawnOffset;
        // this.minWidth = data.minWidth;
        // this.maxWidth = data.maxWidth;
        // this.minHeight = data.minHeight;
        // this.maxHeight = data.maxHeight;
        this.TriggerToyChangedEvent();
        setTimeout(() => {
        }, 50);
    }

    SetupKeyboard() {
        this.RemoveChildrenFromLayer();
        // this.paperLayer.addChild(this.paperGroup);
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
        var xSpawn = this.xSpawnPos * this.xSpawnOffset;
        var ySpawn = this.ySpawnPos * this.ySpawnOffset;

        var point = new paper.Point(xSpawn, ySpawn);
        var poly = new paper.Path.RegularPolygon(point, this.polySides, this.startSize);
        poly.fillColor = new paper.Color(this.fillColor);
        poly.strokeColor = new paper.Color(this.strokeColor);
        poly.strokeWidth = this.strokeWidth + velocity/10;

        this.paperLayer.addChild(poly);
        // this.paperGroup.addChild(poly);

        if(this.paperLayer.length >= this.shapeLimit) {
         this.RemoveShape(0);   
        } 
        // this.shapes.push(poly);
    }

    UpdateShapes() {
        var alphaDecrease = this.alphaDecrease;
        var strokeWidthDecrease = this.strokeWidthDecrease;
        var rotationSpeed = this.rotationSpeed;

        let indexValue: number = 0;
        
        this.paperLayer.children.forEach(element => {
            var poly = element as paper.Path.RegularPolygon;

            var newStrokeColor = poly.strokeColor.clone();
            var newFillColor = poly.fillColor.clone();
            newStrokeColor.alpha -= alphaDecrease;
            newFillColor.alpha -= alphaDecrease;

            poly.set({
                scaling: poly.scaling.multiply(this.sizeIncrease),
                strokeWidth: poly.strokeWidth * strokeWidthDecrease,
                strokeColor: newStrokeColor,
                fillColor: newFillColor
            });
            
            var center = poly.bounds.center;
            poly.rotate(rotationSpeed, center);

            if(poly.strokeColor.alpha <= 0 && poly.fillColor.alpha <= 0) {
                this.RemoveShape(poly);
            }
            indexValue++;
        })
    }

    RemoveShape(shape) {
        // var poly = this.shapes[indexValue];
        // this.shapes.splice(indexValue, 1);
        shape.remove();
    }
}