//takes a QWERTY or QWERTZ keyboard
//and convertes it into MIDI signal

import { InputManager } from "@inputmanager";
import { MIDIDataTable } from "@mididata";

export class KeyboardInputModule {
  private static instance: KeyboardInputModule;
  inputManager: InputManager;
  channel: number = 1;

  constructor() {
    if (KeyboardInputModule.instance) {
      return KeyboardInputModule.instance
    }
    KeyboardInputModule.instance = this
    
    // console.log("CREATED new KeyboardInputModule");
    this.inputManager = new InputManager();
    this.SetKeyboardListener();
  }

  SetKeyboardListener() {
    if (typeof window !== 'undefined') {
      document.addEventListener("keydown", (event) => {
        switch (event.keyCode) {
          case 65:
            this.SendMIDIMessage("A", true);
            break;
          case 87:
            this.SendMIDIMessage("W", true);
            break;
          case 83:
            this.SendMIDIMessage("S", true);
            break;
          case 69:
            this.SendMIDIMessage("E", true);
            break;
          case 68:
            this.SendMIDIMessage("D", true);
            break;
          case 70:
            this.SendMIDIMessage("F", true);
            break;
          case 71:
            this.SendMIDIMessage("G", true);
            break;
          case 84:
            this.SendMIDIMessage("T", true);
            break;
          case 90:
            this.SendMIDIMessage("Z", true);
            break;
          case 85:
            this.SendMIDIMessage("U", true);
            break;
          case 72:
            this.SendMIDIMessage("H", true);
            break;
          case 74:
            this.SendMIDIMessage("J", true);
            break;
          case 75:
            this.SendMIDIMessage("K", true);
            break;
          default:
            // console.log("Eine andere Taste wurde gedrückt.");
        }
      });

      document.addEventListener("keyup", (event) => {
        switch (event.keyCode) {
          case 65:
            this.SendMIDIMessage("A", false);
            break;
          case 87:
            this.SendMIDIMessage("W", false);
            break;
          case 83:
            this.SendMIDIMessage("S", false);
            break;
          case 69:
            this.SendMIDIMessage("E", false);
            break;
          case 68:
            this.SendMIDIMessage("D", false);
            break;
          case 70:
            this.SendMIDIMessage("F", false);
            break;
          case 71:
            this.SendMIDIMessage("G", false);
            break;
          case 84:
            this.SendMIDIMessage("T", false);
            break;
          case 90:
            this.SendMIDIMessage("Z", false);
            break;
          case 85:
            this.SendMIDIMessage("U", false);
            break;
          case 72:
            this.SendMIDIMessage("H", false);
            break;
          case 74:
            this.SendMIDIMessage("J", false);
            break;
          case 75:
            this.SendMIDIMessage("K", false);
            break;
        }
      });
    }
  }

  SendMIDIMessage(key, downPress: boolean) {
    // do something with the key
    let midiCommand = this.GetMIDICommand(downPress);
    let midiNote = this.GetMIDINote(key);
    let midiVelocity = 127;

    this.inputManager.GetInputKeyboard(this.channel, midiCommand, midiNote, midiVelocity);
  }

  SetChannel(channel: number) {
    if(channel > 0 && channel < 17) {
      this.channel = channel;
    }
  }

  //Takes a keyboard key and returns a string note
  GetStringNote(key) {
    switch(key) {
      case "A": return MIDIDataTable.MIDINoteToString(60);  //C 
      case "W": return MIDIDataTable.MIDINoteToString(61);  //Cä
      case "S": return MIDIDataTable.MIDINoteToString(62);  //D
      case "E": return MIDIDataTable.MIDINoteToString(63);  //D#
      case "D": return MIDIDataTable.MIDINoteToString(64);  //E
      case "F": return MIDIDataTable.MIDINoteToString(65);  //F
      case "T": return MIDIDataTable.MIDINoteToString(66);  //F#
      case "G": return MIDIDataTable.MIDINoteToString(67);  //G
      case "Z": return MIDIDataTable.MIDINoteToString(68);  //G#
      case "H": return MIDIDataTable.MIDINoteToString(69);  //A
      case "U": return MIDIDataTable.MIDINoteToString(70);  //A#
      case "J": return MIDIDataTable.MIDINoteToString(71);  //B
    }
  }

  GetMIDINote(key) {
    switch(key) {
      case "A": return 60;  //C 
      case "W": return 61;  //Cä
      case "S": return 62;  //D
      case "E": return 63;  //D#
      case "D": return 64;  //E
      case "F": return 65;  //F
      case "T": return 66;  //F#
      case "G": return 67;  //G
      case "Z": return 68;  //G#
      case "H": return 69;  //A
      case "U": return 70;  //A#
      case "J": return 71;  //B
      case "K": return 72;  //C higher
    }
  }

  GetMIDICommand(downPress: boolean) {
    //Return either 128 (NoteOff) or 144 (NoteOn)
    if(downPress) return 144;
    else return 128;
  }
}

