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
        this.inputManager.Subscribe(targetChannel, this.InputEvent.bind(this));
        this.LoadDefaultColors();
        this.SetupKeyboard();
    }

    LoadDefaultColors() {
        this.fillColor = new paper.Color(0,0,0,0.4);
        this.strokeColor = new paper.Color(1);
        this.accentColor = new paper.Color(0,0,0,0);
    }

    ApplyColors() {
        this.paperLayer.children.forEach(element => {
            let s = element as paper.Path.RegularPolygon;

            s.fillColor = this.fillColor;
            s.strokeColor = this.strokeColor;
        });
    }

    ApplySettings() {
        //Something
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

        this.LoadBaseJSON(data);
    }

    SetupKeyboard() {
        this.RemoveChildrenFromLayer();
        this.SpawnShape(120);
        this.SetupMIDIReceiver(this.numberOfKeys, this.useRegExp);
    }

    frameCount: number = 0;
    UpdateKeyboard() {
        this.UpdateShapes();
    }

    ChangePolySideCount() {
        let rand = Math.random();

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
            let r = element;
            if(r.GetMIDIInput(holdingKeys, velocities)) {
                this.SpawnShape(r.GetVelocity());
            }
        })
    }

    SpawnShape(velocity: number) {
        let xSpawn = this.xSpawnPos * this.xSpawnOffset;
        let ySpawn = this.ySpawnPos * this.ySpawnOffset;

        let point = new paper.Point(xSpawn, ySpawn);
        let poly = new paper.Path.RegularPolygon(point, this.polySides, this.startSize);
        poly.fillColor = new paper.Color(this.fillColor);
        poly.strokeColor = new paper.Color(this.strokeColor);
        poly.strokeWidth = this.strokeWidth + velocity/10;
        poly.scale([this.xSpawnScale, this.ySpawnScale]);

        this.paperLayer.addChild(poly);

        if(this.paperLayer.child != undefined) {
            if (this.paperLayer.children.length > this.shapeLimit) {
                this.paperLayer.firstChild.remove();
            }
        }
    }

    UpdateShapes() {
        let alphaDecrease = this.alphaDecrease;
        let strokeWidthDecrease = this.strokeWidthDecrease;
        let rotationSpeed = this.rotationSpeed;

        let indexValue: number = 0;
        
        this.paperLayer.children.forEach(element => {
            let poly = element as paper.Path.RegularPolygon;

            let newStrokeColor = poly.strokeColor.clone();
            let newFillColor = poly.fillColor.clone();
            newStrokeColor.alpha -= alphaDecrease;
            newFillColor.alpha -= alphaDecrease;

            poly.set({
                scaling: poly.scaling.multiply([this.xSizeChange, this.ySizeChange]),
                strokeWidth: poly.strokeWidth * strokeWidthDecrease,
                strokeColor: newStrokeColor,
                fillColor: newFillColor
            });
            
            let center = poly.bounds.center;
            poly.rotate(rotationSpeed, center);

            indexValue++;
        })
    }

    RemoveShape(shape) {
        this.paperLayer.remove(shape);
    }
}