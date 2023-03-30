import { MIDIDataTable } from "./MIDIDataTable";

export class InputManager {
    prevHoldingKeys: string[][] = [];
    holdingKeys: string[][] = [];
    velocity: number[][] = [];
    oldBPM: number = 0;
    bpm: number = 0;
    prevTimestamp: number = 0;
    clockCount: number = 0;
    
    constructor() {
        this.initVariables();
        console.log("CREATED InputManager");
    }

    initVariables() {
        for (let i = 0; i < 4; i++) {
            this.prevHoldingKeys[i] = [];
            this.holdingKeys[i] = [];
            this.velocity[i] = [];
            this.bpm = 0;
        }
    }

    //MIDI and Keyboard Input methods
    getMIDIInput(message) {
        let [command, note, velocity] = message.data;
        this.calcBPM(message);
        let stringCommand = MIDIDataTable.MIDICommandToString(command);

        if (stringCommand.includes("NoteOn") || stringCommand.includes("NoteOff")) {
            let ch = Number(stringCommand.replace(/\D+/g, ""));
            let stringNote = MIDIDataTable.MIDINoteToString(note);
            this.updateHoldingKeys(stringCommand, ch, stringNote, velocity);
        }
    }
    getInputKeyboard(command, note, velocity) {
        console.log("KEYBOARD detected");
        let stringCommand = MIDIDataTable.MIDICommandToString(command);
        let stringNote = MIDIDataTable.MIDINoteToString(note);

        if (stringCommand.includes("NoteOn") || stringCommand.includes("NoteOff")) {
            let ch = 1;
            this.updateHoldingKeys(stringCommand, ch, stringNote, velocity);
        }
    }

    //Updating What keys are currently beeing hold
    updateHoldingKeys(command, ch, note, velocity) {
        let channelIndex = ch - 1;
        if (command.includes("NoteOn")) {
            if (!this.holdingKeys[channelIndex].includes(note)) {
                this.holdingKeys[channelIndex].push(note);
                this.velocity[channelIndex].push(velocity);
              }
        } else {
            if(this.holdingKeys[channelIndex].includes(note)) {
                //console.log("REMOVE holding key: " + note);
                let noteIndex = this.holdingKeys[channelIndex].indexOf(note);
                this.holdingKeys[channelIndex].splice(noteIndex, 1);
                this.velocity[channelIndex].splice(noteIndex, 1);
            }
        }
    }

    //BPM stuff
    calcBPM(message) {
        if (message.data[0] == 248) { // MIDI Clock message
            this.clockCount++;
            if (this.clockCount == 96) {
                //Calculate deltaTime
                let deltaTime = message.timeStamp - this.prevTimestamp;
                
                //Update values
                this.oldBPM = this.bpm; //Store current BPM
                this.bpm = Math.round(60 / (deltaTime / 1000) * 4);
                this.prevTimestamp = message.timeStamp;
              
                //If bpm changed, put it into console
                if(this.oldBPM != this.bpm) console.log("BPM:" + this.bpm);
              
                this.clockCount = 0;
            }
        }
    }
    getBPM() {
        return this.bpm;
    }

    //Getter methods
    getHoldingKeys(channel: number) {
        // console.log(this.holdingKeys[channel][0]);
        return this.holdingKeys[channel - 1];
    }
    getVelocity(channel) {
        return this.velocity[channel - 1];
    }
}
