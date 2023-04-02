import { InputManager } from "./InputManager";
import { MIDIDataTable } from "./MIDIDataTable";

// Generic class that can listen to midi events
// Holds all important information
export class MIDIReceiver {
  // inputManager: InputManager;
  canvasContext: CanvasRenderingContext2D;
  targetChannel: number;
  targetNote: string;

  useRegExp: boolean = false;
  targetRegExp: RegExp;
  
  lastIndexValue: number = -1;
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
    this.holdingKeys = holdingKeys; //Save information
    this.velocityValues = velocityValues; //Save information
    let targetIndex = -1;

    //Check for corresponding key, one way or another
    if(this.useRegExp) {
      targetIndex = holdingKeys.findIndex((element) => element.match(this.targetRegExp));
    } else {
      targetIndex = holdingKeys.findIndex((element) => element.match(this.targetNote));
    }
    
    if (targetIndex !== -1) {
        this.lastIndexValue = targetIndex;
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
