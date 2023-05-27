import { InputManager } from "./InputManager";

export class MIDIInputModule {
  private midiInputs: WebMidi.MIDIInput[] = [];
  private targetInput: WebMidi.MIDIInput;
  private inputManager: InputManager;

  constructor(inputManager: InputManager) {
    this.inputManager = inputManager;
    
    this.LoadMIDIDevices();
    // this.LoadMIDIDevices().then(() => {
    //     console.log("DONE loading MIDI devices");
    //     if(this.midiInputs[0] != undefined) this.BindMIDIInput(this.midiInputs[0]);
    // })

    // this.GetMIDIDevices();

    console.log("CREATED new MIDIInputModule");
  }

  private async LoadMIDIDevices() {
    this.midiInputs = [];
    if (navigator.requestMIDIAccess) {
      const midiAccess = await navigator.requestMIDIAccess();
      
      for (let input of midiAccess.inputs.values()) {
        if (!this.midiInputs.includes(input)) {
          this.midiInputs.push(input);
          if(this.targetInput == undefined) this.BindMIDIInput(input);
          console.log("MIDI DEVICE = " + input.name as string);
        }
      }
    } else {
      console.log("WebMIDI is not supported in this browser.");
    }
  }
  public BindMIDIInput(input : WebMidi.MIDIInput) {
    if(this.targetInput != undefined) this.UnbindMIDIInput(this.targetInput);
    console.log("BIND MIDI Device = " + input.name as string);
    input.onmidimessage = this.HandleMIDIMessage.bind(this);
    this.targetInput = input;
  }

  public UnbindMIDIInput(input: WebMidi.MIDIInput) {
    console.log("UNBIND MIDI Device = " + input.name as string);
    input.onmidimessage = null;
  }

  private HandleMIDIMessage(message: WebMidi.MIDIMessageEvent): void {
    this.inputManager.GetMIDIInput(message);
  }

  public GetMIDIDevices(): WebMidi.MIDIInput[]  {
    // this.LoadMIDIDevices();
    return this.midiInputs;
  }

  public GetSelectedDevice(): WebMidi.MIDIInput {
    if(this.targetInput != undefined) return this.targetInput;
    else return undefined;
  }

  // public SetInputDevice(device: WebMidi.MIDIInput): void {
  //   //this.selectedInput = device;
  //   this.BindMIDIInput(device);
  //   console.log("Selected MIDI device:", device.name as string);
  //   // Perform any necessary actions with the selected MIDI device
  //   // ...
  // }
  public SetTargetDevice(device: string) {
    this.midiInputs.forEach((element) => {
      if(element.name == device) {
        this.BindMIDIInput(element);
      }
    })
  }

}
