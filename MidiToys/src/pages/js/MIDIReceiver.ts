import { InputManager } from "./InputManager";

//Generic class that can listen to midi events
export class MIDIReceiver {
    inputManager: InputManager;
    targetChannel: number;
    targetNote: string;
    htmlID: HTMLElement;


    constructor(inputManager: InputManager, targetChannel: number, targetNote: string, htmlID: HTMLElement) {
        this.inputManager = inputManager; 
        this.targetChannel = targetChannel;
        this.targetNote = targetNote;
        this.htmlID = htmlID;
    }
}