import { InputManager } from "@inputmanager";
import { ToyManager } from "@toymanager";
import * as paper from "paper";

export class CanvasManager {
    private static instance: CanvasManager;
    
    inputManager: InputManager;
    targetCanvas: HTMLCanvasElement;
    toyManager: ToyManager;

    //Events
    fullFramerate: (() => void)[];
    halfFramerate: (() => void)[];
    oneFPS: (() => void)[];


    constructor() {
        if (CanvasManager.instance) {
        return CanvasManager.instance;
        }
        CanvasManager.instance = this;

        this.inputManager = new InputManager();
        this.toyManager = new ToyManager();

        this.fullFramerate = [];
        this.halfFramerate = [];
        this.oneFPS = [];
    }
    
    SetupCanvas(canvas: HTMLCanvasElement) {
        if(this.targetCanvas === undefined) {
            this.targetCanvas = canvas;
            paper.setup(this.targetCanvas); // Paper setup
            paper.view.onFrame = this.OnFrame;
        } else this.targetCanvas = canvas;
    }

    SubscribeFullFramerate(handler: () => void) {
        this.fullFramerate.push(handler);
    }
    SubscribeHalfFramerate(handler: () => void) {
        this.halfFramerate.push(handler);
    }
    SubscribeOneFPS(handler: () => void) {
        this.oneFPS.push(handler);
    }


    UnsubscribeOnFrame(handler: () => void) {
        const index = this.fullFramerate.indexOf(handler);
        if (index !== -1) {
          this.fullFramerate.splice(index, 1);
        }
    }
    UnsubscribeHalfFrame(handler: () => void) {
        const index = this.halfFramerate.indexOf(handler);
        if (index !== -1) {
          this.halfFramerate.splice(index, 1);
        }
    }
    UnsubscribeOneFPS(handler: () => void) {
        const index = this.oneFPS.indexOf(handler);
        if (index !== -1) {
          this.oneFPS.splice(index, 1);
        }
    }



    frameCountHalf: number = 0;
    frameCountOneFPS: number = 0;
    private OnFrame = () => {
        if(this.targetCanvas != null) {
            
            // Call registered frame event handlers
            this.fullFramerate.forEach((handler) => handler());
            this.toyManager.UpdateToys(); // Update all keyboards, 60 times a second
            
            //30FPS update and 1 FPS update
            if(this.frameCountHalf > 1) {
                this.frameCountHalf = 0
                this.halfFramerate.forEach((handler) => handler());
            }
            if(this.frameCountOneFPS > 60) {
                this.frameCountOneFPS = 0;
                this.oneFPS.forEach((handler) => handler());
            }

            this.frameCountHalf++;
            this.frameCountOneFPS++;
        }
    };
}
