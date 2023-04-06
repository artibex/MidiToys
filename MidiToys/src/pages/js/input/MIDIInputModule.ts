import { InputManager } from "./InputManager";

export class MIDIInputModule {
  private inputs: WebMidi.MIDIInput[] = [];
  private inputDevices: string[] = [];
  private inputManager: InputManager;

  constructor(inputManager: InputManager) {
    this.inputManager = inputManager;

    // navigator.requestMIDIAccess();
    this.ConnectMIDIDevice();
    this.GetMIDIInputs();

    console.log("CREATED new MIDIInputModule");
}

private ConnectMIDIDevice(): void {
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess()
            .then((midiAccess) => {
                for (let input of midiAccess.inputs.values()) {
                    if (!this.inputs.includes(input)) {
                        this.inputs.push(input);
                        this.inputDevices.push(input.name as string);
                        input.onmidimessage = this.HandleMIDIMessage.bind(this);
                    }
                }
            });
            console.log("Detected midi inputs = " + (this.inputs.length + 1));
        } else {
            console.log('WebMIDI is not supported in this browser.');
    }
}
private HandleMIDIMessage(message: WebMidi.MIDIMessageEvent): void {
    // console.log("HANDLE MIDI Message");
    this.inputManager.getMIDIInput(message);
}

public GetMIDIInputs(): string[] {
    return this.inputDevices;
}

}