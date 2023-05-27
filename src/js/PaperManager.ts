import * as paper from "paper";
import { InputManager } from "./input/InputManager";
import { ToyManager } from "./miditoy/ToyManager";

export class PaperManager {
    private static instance: PaperManager;
    
    inputManager: InputManager;
    targetCanvas: HTMLCanvasElement;
    toyManager: ToyManager;

    //Events
    fullEvent: (() => void)[];
    uiEvent: (() => void)[];

    constructor() {
        if (PaperManager.instance) {
        return PaperManager.instance;
        }
        PaperManager.instance = this;

        this.inputManager = new InputManager();
        this.toyManager = new ToyManager();

        this.fullEvent = [];
        this.uiEvent = [];
    }
    
    SetTargetCanvas(canvas: HTMLCanvasElement) {
        if(this.targetCanvas === undefined) {
            this.targetCanvas = canvas;
            paper.setup(this.targetCanvas); // Paper setup
            paper.view.onFrame = this.OnFrame;
        } else this.targetCanvas = canvas;
    }

    SubscribeToOnFrame(handler: () => void) {
        this.fullEvent.push(handler);
    }
    SubscribeToUIFrame(handler: () => void) {
        this.uiEvent.push(handler);
    }


    UnsubscribeToOnFrame(handler: () => void) {
        const index = this.fullEvent.indexOf(handler);
        if (index !== -1) {
          this.fullEvent.splice(index, 1);
        }
    }

    frameCount: number = 0;
    private OnFrame = () => {
        if(this.targetCanvas != null) {
            this.toyManager.UpdateToys(); // Update all keyboards, 60 times a second
            
            // Call registered frame event handlers
            this.fullEvent.forEach((handler) => handler());
           
            //Update UI with half FPS. Because: why?
            if(this.frameCount > 1) {
                this.frameCount = 0
                this.uiEvent.forEach((handler) => handler());
            }
            this.frameCount++;
        }
    };
}
