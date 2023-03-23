//Manages input and sends out a event that can be listend to
import { MIDIDataTable } from "./MIDIDataTable";

// var prevTimestamp = 0;
// var bpm = 0;

export class InputManager {

    constructor() {
        this.prevTimestamp = 0;
        this.bpm = 0;
        this.clockCount = 0;
        console.log("CREATED InputManager");
    }

    GetMIDIInput(message) {
        let [command, note, velocity] = message.data;
        let stringCommand = MIDIDataTable.MIDICommandToString(command);
        let stringNote = MIDIDataTable.MIDINoteToString(note);
        this.CalcBPM(message);

        if(stringCommand !== "") {
          console.log('command:', stringCommand, ' note:', stringNote, ' velocity:', velocity);
        }
    }   
        
    CalcBPM(message) {
        if (message.data[0] == 248) { // MIDI Clock message
            this.clockCount++;
            if (this.clockCount == 96) {
              let deltaTime = message.timeStamp - this.prevTimestamp;
              this.bpm = Math.round(60 / (deltaTime / 1000) * 4);
              this.prevTimestamp = message.timeStamp;
              console.log("BPM:" + this.bpm);
              this.clockCount = 0;
            }
        }
    }
    GetBPM() {
        // console.log("GETTING BPM for website");
        return this.bpm;
    }
    

    GetKeyboardInput() {
        

    }
}