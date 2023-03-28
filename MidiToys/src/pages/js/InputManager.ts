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

    updateHoldingKeys(command, ch, note, velocity) {
        let holdingKeysIndex = ch - 1;
        if (command.includes("NoteOn")) {
            console.log("TRIGGER NoteOn for key " + note);
            if (!this.holdingKeys[holdingKeysIndex].includes(note)) {
                this.holdingKeys[holdingKeysIndex].push(note);
                this.velocity[holdingKeysIndex].push(velocity);
              }            
        } else {
            let noteIndex = this.holdingKeys[holdingKeysIndex].indexOf(note);
            this.holdingKeys[holdingKeysIndex].splice(noteIndex, 1);
            this.velocity[holdingKeysIndex].splice(noteIndex, 1);
        }
    }

    calcBPM(message: any) {
        
    }
    


    getBPM() {
        return this.bpm;
    }
    getHoldingKeys(channel: number) {
        // console.log(this.holdingKeys[channel][0]);
        return this.holdingKeys[channel - 1];
    }
    getVelocity(channel) {
        return this.velocity[channel - 1];
    }
}
