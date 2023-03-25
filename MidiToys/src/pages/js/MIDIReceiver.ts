import { InputManager } from "./InputManager";

//Generic class that can listen to midi events
export class MIDIReceiver {
    inputManager: InputManager;
    targetChannel: number;
    htmlID: HTMLElement;

    constructor(inputManager: InputManager, targetChannel: number, htmlID) {
        this.inputManager = inputManager; 
        this.targetChannel = targetChannel;
        this.htmlID = htmlID;
    }
}