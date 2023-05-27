import * as paper from "paper";
import { InputManager } from "./input/InputManager";
import { ToyManager } from "./miditoy/ToyManager";

export class PaperManager {
    private static instance: PaperManager;
    inputManager: InputManager;
    targetCanvas: HTMLCanvasElement;
    toyManager: ToyManager;
    frameEventHandlers: (() => void)[];

    constructor() {
        if (PaperManager.instance) {
        return PaperManager.instance;
        }
        PaperManager.instance = this;

        this.inputManager = new InputManager();
        this.toyManager = new ToyManager();
        this.frameEventHandlers = [];
    }
    
    SetTargetCanvas(canvas: HTMLCanvasElement) {
        if(this.targetCanvas === undefined) {
            this.targetCanvas = canvas;
            paper.setup(this.targetCanvas); // Paper setup
            paper.view.onFrame = this.OnFrame;
        } else this.targetCanvas = canvas;
    }

    SubscribeToOnFrame(handler: () => void) {
        this.frameEventHandlers.push(handler);
      }

    UnsubscribeToOnFrame(handler: () => void) {
        const index = this.frameEventHandlers.indexOf(handler);
        if (index !== -1) {
          this.frameEventHandlers.splice(index, 1);
        }
      }

    private OnFrame = () => {
        if(this.targetCanvas != undefined) {
            this.toyManager.UpdateToys(); // Update all keyboards, 60 times a second
            

            // Call registered frame event handlers
            this.frameEventHandlers.forEach((handler) => handler());
        }
    };
}
