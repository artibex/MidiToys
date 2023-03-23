//Takes input from a MIDI capable device and sends it into the InputManager

export class MIDIInputModule 
{
    inputManager;

    constructor(inputManager) {
        this.inputs = [];
        this.inputManager = inputManager; 

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
        this.inputManager.GetMIDIInput(message);

      
        // if(velocity !== undefined) {
          //   // console.log(`command: ${stringCommand}, note: ${note}, velocity: ${velocity}`);
          // }
      }
  }