import { InputManager } from "./InputManager";

export class MIDIInputModule {
  private inputs: WebMidi.MIDIInput[] = [];
  private inputDevices: string[] = [];
  private inputManager: InputManager;

  constructor(inputManager: InputManager) {
    this.inputManager = inputManager;

    // navigator.requestMIDIAccess();
    this.ConnectMIDIDevice();

    //setTimeout(this.GetMIDIInputs(), 2000);
    this.GetMIDIInputs();
    console.log("CREATED new MIDIInputModule");
}

private ConnectMIDIDevice(): void {
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess()
            .then((midiAccess) => {
                for (let input of midiAccess.inputs.values()) {
                    this.inputs.push(input);
                    this.inputDevices.push(input.name as string);

                    //console.log(input.name);
                    input.onmidimessage = this.HandleMIDIMessage.bind(this);
                }
            });
    } else {
        console.log('WebMIDI is not supported in this browser.');
    }
}

private HandleMIDIMessage(message: WebMidi.MIDIMessageEvent): void {
    // console.log("HANDLE MIDI Message");
    this.inputManager.GetMIDIInput(message);
}

public GetMIDIInputs(): string[] {
    return this.inputDevices;
}

}