import { SquareKeyboard } from "./SquareKeyboard";
import { MusicBalls } from "./MusicBalls";
import { DrumMaschin } from "./DrumMaschin";
import { MIDIKeyboard } from "./MIDIKeyboard";
import * as paper from "paper";


export class ToyManager 
{
    static instance: ToyManager;
    toys: any = []; //Array of toys

    targetCanvas: HTMLCanvasElement;

    constructor() {
        if (ToyManager.instance) {
        return ToyManager.instance;
        }
        ToyManager.instance = this;
        
        console.log("CREATED ToyManager");
    }

    CreateEmptyToys() {
        for(var i = 0; i < 16; i++) {
            this.toys[i] = new MIDIKeyboard("PlaceHolderToy", i + 1, 13, 12, true);
        }
    }

    CreateMusicBall(channel:number, numberOfKeys: number, startKey: number) {
        var toy = this.GetToy(channel);
        if(toy != undefined) this.RemovePaperLayer(toy.paperLayer);

        console.log("CREATE MusicBalls on channel " + channel);
        this.toys[channel - 1] = new MusicBalls(channel, numberOfKeys, startKey);
    }

    SetTargetCanvas(canvas: HTMLCanvasElement) {
        this.targetCanvas = canvas;
    }

    GetToy(channel:number) {
        return this.toys[channel - 1];
    }

    UpdateToys() {
        for (let i = 0; i < 15; i++) 
        {
            if (this.toys[i] !== undefined) {
                this.toys[i].UpdateKeyboard();
            }
        }
    }

    GetToyName(channel: number) {
        return this.toys[channel -1].toyName;
    }
    GetNumberOfKeys(channel: number) {
        return this.toys[channel -1].numberOfKeys;
    }
    GetStartKey(channel: number) {
        return this.toys[channel -1].startKey;
    }

    //Clears the complete canvas with all elements on it
    ClearCanvas() {
        console.log("CLEAR paper canvas");
        paper.project.clear();
    }
    
    RemovePaperLayer(layer: paper.Layer) {
        layer.remove();
    }
}