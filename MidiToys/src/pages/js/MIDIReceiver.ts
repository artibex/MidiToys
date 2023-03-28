import { InputManager } from "./InputManager";
import { MIDIDataTable } from "./MIDIDataTable";

// Generic class that can listen to midi events
// Holds all important information
export class MIDIReceiver {
  // inputManager: InputManager;
  canvasContext: CanvasRenderingContext2D;
  targetChannel: number;
  targetNote: string;

  targetRegExp: RegExp;
  
  velocityValue: number = 0;
  holdingKeys: string[]; //Stores last detected holding keys
  velocityValues: number[]; //Stores last detected velocityValues

  constructor(targetChannel: number, targetNote: string) {
    // this.inputManager = inputManager; 
    this.targetChannel = targetChannel;
    this.targetNote = targetNote;
    this.targetRegExp = new RegExp(MIDIDataTable.MIDIStringNoteToRegExp(targetNote) as RegExp);
    console.log("CREATED MIDI Receiver. TargetNote: " + targetNote);
  }

  //Get's currently Holding keys and velocity, if it's under these one, return true, else return false
  GetMIDIInput(holdingKeys: string[], velocityValues: number[]) {
    this.holdingKeys = holdingKeys;
    this.velocityValues = velocityValues;
    
    const targetIndex = holdingKeys.findIndex((element) => element.match(this.targetNote));
    if (targetIndex !== -1) {
        this.velocityValue = velocityValues[targetIndex];
        return true;
    } else {
      return false;
    }
  }

  GetVelocity() {
    return this.velocityValue;
  }
}
