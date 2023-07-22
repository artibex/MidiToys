import { InputManager } from "@inputmanager";

export class MIDIInputModule {
  static instance: MIDIInputModule;

  private midiInputs: WebMidi.MIDIInput[] = [];
  private targetInput: WebMidi.MIDIInput;
  private inputManager: InputManager;

  constructor() {
    if (MIDIInputModule.instance != undefined) {
      return MIDIInputModule.instance
    }
    MIDIInputModule.instance = this
  
    this.inputManager = new InputManager();
    this.LoadMIDIDevices();
  }

  async LoadMIDIDevices() {
    // console.log("LOAD MIDI devices");
    this.midiInputs = [];
    if (typeof window === 'undefined') return;
    if (navigator.requestMIDIAccess) {
      const midiAccess = await navigator.requestMIDIAccess();
      
      for (let input of midiAccess.inputs.values()) {
        if (!this.midiInputs.includes(input)) {
          this.midiInputs.push(input);
          if(this.targetInput == undefined) this.BindMIDIInput(input);
          // console.log("MIDI DEVICE = " + input.name as string);
        }
      }
    } else {
      // console.log("WebMIDI is not supported in this browser.");
    }
  }
  public BindMIDIInput(input : WebMidi.MIDIInput) {
    if(this.targetInput != undefined) this.UnbindMIDIInput(this.targetInput);
    // console.log("BIND MIDI Device = " + input.name as string);
    this.targetInput = input;
    input.onmidimessage = this.HandleMIDIMessage.bind(this);
  }

  public UnbindMIDIInput(input: WebMidi.MIDIInput) {
    // console.log("UNBIND MIDI Device = " + input.name as string);
    input.onmidimessage = null;
  }

  private HandleMIDIMessage(message: WebMidi.MIDIMessageEvent): void {
    if(message.data[0] != 248) {
      console.log(message.data);
    }
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

  public SetTargetDevice(device: string) {
    this.midiInputs.forEach((element) => {
      if(element.name == device) {
        this.BindMIDIInput(element);
      }
    })
  }

}
