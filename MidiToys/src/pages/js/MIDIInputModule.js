//Takes input from a MIDI capable device and sends it into the InputManager

export class MIDIInputModule 
{
    constructor(inputManager) {
        this.inputs = [];
        this.inputDevices = [];
        this.inputManager = inputManager; 

        // navigator.requestMIDIAccess();
        this.ConnectMIDIDevice();

        //setTimeout(this.GetMIDIInputs(), 2000);
        this.GetMIDIInputs();
        console.log("CREATED new MIDIInputModule");
      }

    ConnectMIDIDevice() {
        if (navigator.requestMIDIAccess) {
          navigator.requestMIDIAccess()
          .then((midiAccess) => {
              for (let input of midiAccess.inputs.values()) {
                this.inputs.push(input);
                this.inputDevices.push(input.name);
                
                //console.log(input.name);
              input.onmidimessage = this.HandleMIDIMessage.bind(this);
            }
          });
      } else {
        console.log('WebMIDI is not supported in this browser.');
      }
    }

    HandleMIDIMessage(message) {
        // console.log("HANDLE MIDI Message");
        this.inputManager.GetMIDIInput(message);
      }

    GetMIDIInputs() {
      return this.inputDevices;
  }
}