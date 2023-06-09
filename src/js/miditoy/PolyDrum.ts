import { MIDIReceiver } from "@midireceiver";
import { MIDIToy } from "@miditoy";
import * as paper from 'paper';

export class PolyDrum extends MIDIToy {
    // shapes: paper.Path[] = [];
    shapeLimit: number = 10;
    polySides: number = 3;

    startSize: number = 500;

    xSizeChange: number = 0.98;
    ySizeChange: number = 0.98;

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

    xSpawnScale: number = 1;
    ySpawnScale: number = 1;

    constructor(targetChannel: number) {
        super("PolyDrum", targetChannel, 24, 12, true);
        // console.log("CREATED PolyDrum");
        // console.log(this.receiver.length);
        this.inputManager.Subscribe(targetChannel, this.InputEvent.bind(this));
        this.LoadDefaultColors();
        this.SetupKeyboard();
    }

    LoadDefaultColors() {
        this.fillColor = new paper.Color(0,0,0,0.1);
        this.strokeColor = new paper.Color(1);
        this.accentColor = new paper.Color(0,0,0,0);
    }

    ApplyColors() {
        this.paperLayer.children.forEach(element => {
            var s = element as paper.Path.RegularPolygon;

            s.fillColor = this.fillColor;
            s.strokeColor = this.strokeColor;
        });
    }

    ApplySettings() {
        
    }

    ToJSON() {
    return {
        //MIDIToy data
        ...this.GetBaseJSON(),

        //Class specific data
        shapeLimit: this.shapeLimit,
        polySides: this.polySides,
        startSize: this.startSize,
        sizeIncrease: this.xSizeChange,
        alphaDecrease: this.alphaDecrease,
        rotationSpeed: this.rotationSpeed,
        strokeWidth: this.strokeWidth,
        strokeWidthDecrease: this.strokeWidthDecrease,
        
        ySpawnOffset: this.ySpawnOffset,
        xSpawnOffset: this.xSpawnOffset,
        
        xSpawnScale: this.xSpawnScale,
        ySpawnScale: this.ySpawnScale,

        xSizeChange: this.xSizeChange,
        ySizeChange: this.ySizeChange
        };
    }
    LoadJSON(data: any) {
        //MIDIToy Loading
        this.LoadBaseJSON(data);

        //Class specific loading
        this.shapeLimit = data.shapeLimit;
        this.polySides = data.polySides;
        this.startSize = data.startSize;
        this.xSizeChange = data.sizeIncrease;
        this.alphaDecrease = data.alphaDecrease;
        this.rotationSpeed = data.rotationSpeed;
        this.strokeWidth = data.strokeWidth;
        this.strokeWidthDecrease = data.strokeWidthDecrease;
        
        this.xSpawnOffset = data.xSpawnOffset;
        this.ySpawnOffset = data.ySpawnOffset;

        this.xSpawnScale = data.xSpawnScale;
        this.ySpawnScale = data.ySpawnScale;

        this.xSizeChange = data.xSizeChange;
        this.ySizeChange = data.ySizeChange;

        this.SetupKeyboard();
    }

    SetupKeyboard() {
        this.RemoveChildrenFromLayer();
        // this.paperLayer.addChild(this.paperGroup);
        this.SpawnShape(120);
    }

    frameCount: number = 0;
    UpdateKeyboard() {
        this.UpdateShapes();
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
                // console.log("FOUND key, spawn square");
                this.SpawnShape(r.GetVelocity());
            }
        })

        // if(holdingKeys.length > 0) {
        //     this.SpawnSquare();
        // }
    }

    SpawnShape(velocity: number) {
        // console.log("DRAW shape");
        var xSpawn = this.xSpawnPos * this.xSpawnOffset;
        var ySpawn = this.ySpawnPos * this.ySpawnOffset;

        var point = new paper.Point(xSpawn, ySpawn);
        var poly = new paper.Path.RegularPolygon(point, this.polySides, this.startSize);
        poly.fillColor = new paper.Color(this.fillColor);
        poly.strokeColor = new paper.Color(this.strokeColor);
        poly.strokeWidth = this.strokeWidth + velocity/10;
        poly.scale([this.xSpawnScale, this.ySpawnScale]);

        this.paperLayer.addChild(poly);
        // this.paperGroup.addChild(poly);

        if (this.paperLayer.children.length > this.shapeLimit) {
            // console.log("REMOVE shape from layer, too many!");
            // console.log("LAYER children count = " + this.paperLayer.children.length);
            this.paperLayer.firstChild.remove();
        }
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
                scaling: poly.scaling.multiply([this.xSizeChange, this.ySizeChange]),
                strokeWidth: poly.strokeWidth * strokeWidthDecrease,
                strokeColor: newStrokeColor,
                fillColor: newFillColor
            });
            
            var center = poly.bounds.center;
            poly.rotate(rotationSpeed, center);

            // if(poly.strokeColor.alpha <= 0 && poly.fillColor.alpha <= 0) {
            //     this.RemoveShape(poly);
            // }
            indexValue++;
        })
    }

    RemoveShape(shape) {
        // console.log("REMOVING shape from layer");
        this.paperLayer.remove(shape);
    }
}