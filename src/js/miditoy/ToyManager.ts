import { MIDIToy } from "@miditoy";
import { EmptyToy } from "@miditoy/EmptyToy";
import { GraviBoard } from "@miditoy/GraviBoard";
import { PolyDrum } from "@miditoy/PolyDrum";
import * as paper from "paper";

export class ToyManager 
{
    static instance: ToyManager;
    toys = []; //Array of toys

    targetCanvas: HTMLCanvasElement;

    constructor() {
        if (ToyManager.instance) {
        return ToyManager.instance;
        }
        ToyManager.instance = this;
        // console.log("CREATED ToyManager");
    }

    //The canvas everything get's rendered on
    SetTargetCanvas(canvas: HTMLCanvasElement) {
        this.targetCanvas = canvas;
    }

    //Loop for updating all toys
    UpdateToys() {
        if(this.targetCanvas != null) {
            for (let i = 0; i <= 15; i++) 
            {
                if (this.toys[i] !== undefined) {
                    this.toys[i].UpdateKeyboard();
                }
            }
            paper.view.update();
        }
    }

    //Creates 16 placeholder toys
    CreateEmptyToys() {
        for(var i = 0; i < 16; i++) {
            this.toys[i] = new EmptyToy(i + 1);
        }
    }
    //Creates a "empty" toy aka the base class
    CreateEmptyToy(channel: number) {
        this.RemovePaperLayer(channel);
        // console.log("CREATE EmptyToy on channel " + channel);
        this.toys[channel -1] = new EmptyToy(channel);
    }
    CreateGraviBoard(channel:number, numberOfKeys: number, startKey: number) {
        this.RemovePaperLayer(channel);
        // console.log("CREATE GraviBoard on channel " + channel);
        this.toys[channel - 1] = new GraviBoard(channel);
    }
    CreatePolyDrum(channel: number, numberOfKeys: number, startKey: number) {
        this.RemovePaperLayer(channel);
        // console.log("CREATE PolyDrum on channel " + channel);
        this.toys[channel - 1] = new PolyDrum(channel);
    }

    GetToy(channel: number) {
        if (channel < 1 || channel > this.toys.length) {
            return undefined;
        }
        return this.toys[channel - 1] as MIDIToy;
    }

    //Returns whole array of toys
    GetToys() {
        return this.toys;
    }

    //Clears the complete canvas with all elements on it
    ClearCanvas() {
        // console.log("CLEAR paper canvas");
        paper.project.clear();
    }
    RemovePaperLayer(channel: number) {
        var toy = this.GetToy(channel);
        if(toy != undefined) {
            toy.paperLayer.remove();
        }
    }
}