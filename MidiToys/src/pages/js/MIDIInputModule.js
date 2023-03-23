//Takes input from a MIDI capable device and sends it into the InputManager
import { MIDIDataTable } from "./MIDIDataTable";

export class MIDIInputModule 
{
    constructor() {
        this.inputs = [];
        // navigator.requestMIDIAccess();

        if (navigator.requestMIDIAccess) {
            navigator.requestMIDIAccess()
            .then((midiAccess) => {
                for (let input of midiAccess.inputs.values()) {
                  this.inputs.push(input);
                input.onmidimessage = this.handleMidiMessage.bind(this);
              }
            });
        } else {
          console.log('WebMIDI is not supported in this browser.');
        }
      }

    handleMidiMessage(message) {
        //console.log("HANDLE MIDI Message");
        let [command, note, velocity] = message.data;

        let stringCommand = MIDIDataTable.MIDICommandToString(command);
        let stringNote = MIDIDataTable.MIDINoteToString(note);

        if(stringCommand !== "") {
          console.log('command:', stringCommand, ' note:', stringNote, ' velocity:', velocity);
        }
      
        // if(velocity !== undefined) {
          //   // console.log(`command: ${stringCommand}, note: ${note}, velocity: ${velocity}`);
          // }
      }
  }