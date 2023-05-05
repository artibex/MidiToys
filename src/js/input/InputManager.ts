import { MIDIDataTable } from "../MIDIDataTable";
import { KeyboardInputModule } from "./KeyboardInputModule";
import { MIDIInputModule } from "./MIDIInputModule";

interface UpdateEvent {
    // Define properties and/or methods for the event
  }

export class InputManager {
    private static instance: InputManager;
    
    //Channel events to subscribe
    private channel1: ((event: UpdateEvent) => void)[] = [];
    private channel2: ((event: UpdateEvent) => void)[] = [];
    private channel3: ((event: UpdateEvent) => void)[] = [];
    private channel4: ((event: UpdateEvent) => void)[] = [];
    private channel5: ((event: UpdateEvent) => void)[] = [];
    private channel6: ((event: UpdateEvent) => void)[] = [];
    private channel7: ((event: UpdateEvent) => void)[] = [];
    private channel8: ((event: UpdateEvent) => void)[] = [];
    private channel9: ((event: UpdateEvent) => void)[] = [];
    private channel10: ((event: UpdateEvent) => void)[] = [];
    private channel11: ((event: UpdateEvent) => void)[] = [];
    private channel12: ((event: UpdateEvent) => void)[] = [];
    private channel13: ((event: UpdateEvent) => void)[] = [];
    private channel14: ((event: UpdateEvent) => void)[] = [];
    private channel15: ((event: UpdateEvent) => void)[] = [];
    private channel16: ((event: UpdateEvent) => void)[] = [];

    keyboardReader: KeyboardInputModule;
    midiReader: MIDIInputModule;

    prevHoldingKeys: string[][] = [];
    holdingKeys: string[][] = [];
    velocity: number[][] = [];
    oldBPM: number = 0;
    bpm: number = 0;
    prevTimestamp: number = 0;
    clockCount: number = 0;
    
    constructor() {
        if (InputManager.instance) {
            return InputManager.instance
        }
        InputManager.instance = this
        
        this.InitVariables();
        this.InitReaderModules();
        console.log("CREATED InputManager");
    }

    public Subscribe(channel: number, callback: (event: UpdateEvent) => void) {
        switch(channel) {
            case 1: this.channel1.push(callback); break;
            case 2: this.channel2.push(callback); break;
            case 3: this.channel3.push(callback); break;
            case 4: this.channel4.push(callback); break;
            case 5: this.channel5.push(callback); break;
            case 6: this.channel6.push(callback); break;
            case 7: this.channel7.push(callback); break;
            case 8: this.channel8.push(callback); break;
            case 9: this.channel9.push(callback); break;
            case 10: this.channel10.push(callback); break;
            case 11: this.channel11.push(callback); break;
            case 12: this.channel12.push(callback); break;
            case 13: this.channel13.push(callback); break;
            case 14: this.channel14.push(callback); break;
            case 15: this.channel15.push(callback); break;
            case 16: this.channel16.push(callback); break;
        }
      }
    
    //Call every function that subscribed to this
    CallKeysEvent(channel: number, onEvent: boolean) {
        // console.log("CALL key event");
        switch(channel) {
            case 1: this.channel1.forEach((subscriber) => subscriber(onEvent)); break;
            case 2: this.channel2.forEach((subscriber) => subscriber(onEvent)); break;
            case 3: this.channel3.forEach((subscriber) => subscriber(onEvent)); break;
            case 4: this.channel4.forEach((subscriber) => subscriber(onEvent)); break;
            case 5: this.channel5.forEach((subscriber) => subscriber(onEvent)); break;
            case 6: this.channel6.forEach((subscriber) => subscriber(onEvent)); break;
            case 7: this.channel7.forEach((subscriber) => subscriber(onEvent)); break;
            case 8: this.channel8.forEach((subscriber) => subscriber(onEvent)); break;
            case 9: this.channel9.forEach((subscriber) => subscriber(onEvent)); break;
            case 10: this.channel10.forEach((subscriber) => subscriber(onEvent)); break;
            case 11: this.channel11.forEach((subscriber) => subscriber(onEvent)); break;
            case 12: this.channel12.forEach((subscriber) => subscriber(onEvent)); break;
            case 13: this.channel13.forEach((subscriber) => subscriber(onEvent)); break;
            case 14: this.channel14.forEach((subscriber) => subscriber(onEvent)); break;
            case 15: this.channel15.forEach((subscriber) => subscriber(onEvent)); break;
            case 16: this.channel16.forEach((subscriber) => subscriber(onEvent)); break;
        }
    }

    // static GetInstance(): InputManager {
    //     if (!InputManager.instance) {
    //       InputManager.instance = new InputManager();
    //     }
    //     return InputManager.instance;
    //   }

    InitReaderModules() {
        if(typeof window !== "undefined") {
            this.keyboardReader = new KeyboardInputModule(this);
            this.midiReader = new MIDIInputModule(this);
            console.log("CREATED Keyboard and MIDI Reader");
        }
    }

    InitVariables() {
        for (let i = 0; i < 16; i++) {
            this.prevHoldingKeys[i] = [];
            this.holdingKeys[i] = [];
            this.velocity[i] = [];
            this.bpm = 0;
        }
    }

    debounceTimeoutId: number | null = null;
    debounceTime: number = 100; // the time to wait before executing the function

    //MIDI and Keyboard Input methods
    GetMIDIInput(message) {
        let [command, note, velocity] = message.data;
        let stringCommand = MIDIDataTable.MIDICommandToString(command);
        // console.log("command: " + stringCommand, " note: " + note + " velocity: " + velocity);
        
        if (stringCommand.includes("NoteOn") || stringCommand.includes("NoteOff")) {
            let ch = Number(stringCommand.replace(/\D+/g, ""));
            let stringNote = MIDIDataTable.MIDINoteToString(note);
            this.UpdateHoldingKeys(stringCommand, ch, stringNote, velocity);
        }
        this.CalcBPM(message);
    }

    GetInputKeyboard(command, note, velocity) {
        console.log("KEYBOARD detected");
        let stringCommand = MIDIDataTable.MIDICommandToString(command);
        let stringNote = MIDIDataTable.MIDINoteToString(note);

        if (stringCommand.includes("NoteOn") || stringCommand.includes("NoteOff")) {
            let ch = 1;
            this.UpdateHoldingKeys(stringCommand, ch, stringNote, velocity);
        }
    }

    //Updating What keys are currently beeing hold
    UpdateHoldingKeys(command, ch, note, velocity) {
        let channelIndex = ch - 1;

        if (command.includes("NoteOn")) {
            // console.log("ADD holding key: " + note);
            if (!this.holdingKeys[channelIndex].includes(note)) {
                this.holdingKeys[channelIndex].push(note);
                this.velocity[channelIndex].push(velocity);
              }
            this.CallKeysEvent(ch, true);
        } else if(command.includes("NoteOff")) {
            // console.log("REMOVE holding key: " + note);
            if(this.holdingKeys[channelIndex].includes(note)) {
                let noteIndex = this.holdingKeys[channelIndex].indexOf(note);
                this.holdingKeys[channelIndex].splice(noteIndex, 1);
                this.velocity[channelIndex].splice(noteIndex, 1);
            }
            this.CallKeysEvent(ch, false);
        }
    }


    //BPM stuff
    CalcBPM(message) {
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
    GetBPM() {
        return this.bpm;
    }

    //Getter methods
    GetHoldingKeys(channel: number) {
        // console.log(this.holdingKeys[channel][0]);
        return this.holdingKeys[channel - 1];
    }
    GetVelocity(channel) {
        return this.velocity[channel - 1];
    }
}
