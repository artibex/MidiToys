import { ssrElement, mergeProps, ssr, ssrHydrationKey, ssrAttribute, escape, createComponent, ssrStyleProperty } from 'solid-js/web';
import { mergeProps as mergeProps$1, createSignal, createEffect } from 'solid-js';
import 'iconify-icon';
import * as paper from 'paper';
import { getAuth, browserLocalPersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup, GithubAuthProvider, TwitterAuthProvider, sendSignInLinkToEmail, signInWithEmailLink } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore, setDoc, doc, serverTimestamp, query, collection, where, getDocs, orderBy, deleteDoc } from 'firebase/firestore';
import { v5 } from 'uuid';

function Icon(props) {
  let {
    icon,
    mode,
    inline,
    rotate,
    flip,
    width,
    height,
    preserveAspectRatio
  } = props;
  if (typeof icon === "object") {
    icon = JSON.stringify(icon);
  }
  return (
    // @ts-ignore
    ssrElement("iconify-icon", mergeProps({
      "attr:icon": icon,
      "attr:mode": mode,
      "attr:inline": inline,
      "attr:rotate": rotate,
      "attr:flip": flip,
      "attr:width": width,
      "attr:height": height,
      "attr:preserveAspectRatio": preserveAspectRatio
    }, props), void 0, true)
  );
}

class MIDIDataTable {
  static MIDICommandToString(command) {
    if (command === 248) {
      return "";
    }
    const commandType = command & 240;
    const channel = command & 15;
    switch (commandType) {
      case 128:
        return `NoteOff CH: ${channel + 1}`;
      case 144:
        return `NoteOn CH: ${channel + 1}`;
      case 250:
        return "Start";
      case 251:
        return "Continue";
      case 252:
        return "Stop";
      default:
        return `Unknown Command ${command}`;
    }
  }
  static MIDINoteToString(note) {
    const octave = Math.floor(note / 12) - 1;
    const noteName = [
      "C",
      "C#",
      "D",
      "D#",
      "E",
      "F",
      "F#",
      "G",
      "G#",
      "A",
      "A#",
      "B"
    ][note % 12];
    return `${noteName}${octave}`;
  }
  //Takes a note converted into string and returns the correct RegEx
  static MIDIStringNoteToRegExp(stringNote) {
    const rawNote = stringNote.replace(/[0-9]/g, "").toUpperCase();
    switch (rawNote) {
      case "C":
        return /C(?!#)/i;
      case "C#":
        return /C#/i;
      case "D":
        return /D(?!#)/i;
      case "D#":
        return /D#/i;
      case "E":
        return /E/i;
      case "F":
        return /F(?!#)/i;
      case "F#":
        return /F#/i;
      case "G":
        return /G(?!#)/i;
      case "G#":
        return /G#/i;
      case "A":
        return /A(?!#)/i;
      case "A#":
        return /A#/i;
      case "B":
        return /B/i;
      default:
        return /./;
    }
  }
}

class KeyboardInputModule {
  constructor() {
    this.channel = 1;
    if (KeyboardInputModule.instance) {
      return KeyboardInputModule.instance;
    }
    KeyboardInputModule.instance = this;
    this.inputManager = new InputManager();
    this.SetKeyboardListener();
  }
  SetKeyboardListener() {
    if (typeof window !== "undefined") {
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
  SendMIDIMessage(key, downPress) {
    let midiCommand = this.GetMIDICommand(downPress);
    let midiNote = this.GetMIDINote(key);
    let midiVelocity = 127;
    this.inputManager.GetInputKeyboard(
      this.channel,
      midiCommand,
      midiNote,
      midiVelocity
    );
  }
  SetChannel(channel) {
    if (channel > 0 && channel < 17) {
      this.channel = channel;
    }
  }
  //Takes a keyboard key and returns a string note
  GetStringNote(key) {
    switch (key) {
      case "A":
        return MIDIDataTable.MIDINoteToString(60);
      //C
      case "W":
        return MIDIDataTable.MIDINoteToString(61);
      //Cä
      case "S":
        return MIDIDataTable.MIDINoteToString(62);
      //D
      case "E":
        return MIDIDataTable.MIDINoteToString(63);
      //D#
      case "D":
        return MIDIDataTable.MIDINoteToString(64);
      //E
      case "F":
        return MIDIDataTable.MIDINoteToString(65);
      //F
      case "T":
        return MIDIDataTable.MIDINoteToString(66);
      //F#
      case "G":
        return MIDIDataTable.MIDINoteToString(67);
      //G
      case "Z":
        return MIDIDataTable.MIDINoteToString(68);
      //G#
      case "H":
        return MIDIDataTable.MIDINoteToString(69);
      //A
      case "U":
        return MIDIDataTable.MIDINoteToString(70);
      //A#
      case "J":
        return MIDIDataTable.MIDINoteToString(71);
    }
  }
  GetMIDINote(key) {
    switch (key) {
      case "A":
        return 60;
      //C
      case "W":
        return 61;
      //Cä
      case "S":
        return 62;
      //D
      case "E":
        return 63;
      //D#
      case "D":
        return 64;
      //E
      case "F":
        return 65;
      //F
      case "T":
        return 66;
      //F#
      case "G":
        return 67;
      //G
      case "Z":
        return 68;
      //G#
      case "H":
        return 69;
      //A
      case "U":
        return 70;
      //A#
      case "J":
        return 71;
      //B
      case "K":
        return 72;
    }
  }
  GetMIDICommand(downPress) {
    if (downPress) return 144;
    else return 128;
  }
}

class MIDIInputModule {
  constructor() {
    this.midiInputs = [];
    if (MIDIInputModule.instance) {
      return MIDIInputModule.instance;
    }
    MIDIInputModule.instance = this;
    this.inputManager = new InputManager();
    this.LoadMIDIDevices();
  }
  async LoadMIDIDevices() {
    this.midiInputs = [];
    if (typeof window === "undefined") return;
    if (navigator.requestMIDIAccess) {
      const midiAccess = await navigator.requestMIDIAccess();
      for (let input of midiAccess.inputs.values()) {
        if (!this.midiInputs.includes(input)) {
          this.midiInputs.push(input);
          if (this.targetInput == void 0) this.BindMIDIInput(input);
        }
      }
    }
  }
  BindMIDIInput(input) {
    if (this.targetInput != void 0) this.UnbindMIDIInput(this.targetInput);
    input.onmidimessage = this.HandleMIDIMessage.bind(this);
    this.targetInput = input;
  }
  UnbindMIDIInput(input) {
    input.onmidimessage = null;
  }
  HandleMIDIMessage(message) {
    this.inputManager.GetMIDIInput(message);
  }
  GetMIDIDevices() {
    return this.midiInputs;
  }
  GetSelectedDevice() {
    if (this.targetInput != void 0) return this.targetInput;
    else return void 0;
  }
  SetTargetDevice(device) {
    this.midiInputs.forEach((element) => {
      if (element.name == device) {
        this.BindMIDIInput(element);
      }
    });
  }
}

class InputManager {
  constructor() {
    //Channel events to subscribe
    this.channel1 = [];
    this.channel2 = [];
    this.channel3 = [];
    this.channel4 = [];
    this.channel5 = [];
    this.channel6 = [];
    this.channel7 = [];
    this.channel8 = [];
    this.channel9 = [];
    this.channel10 = [];
    this.channel11 = [];
    this.channel12 = [];
    this.channel13 = [];
    this.channel14 = [];
    this.channel15 = [];
    this.channel16 = [];
    this.prevHoldingKeys = [];
    this.holdingKeys = [];
    this.velocity = [];
    this.oldBPM = 0;
    this.bpm = 0;
    this.prevTimestamp = 0;
    this.clockCount = 0;
    this.debounceTimeoutId = null;
    this.debounceTime = 100;
    if (InputManager.instance) {
      return InputManager.instance;
    }
    InputManager.instance = this;
    this.InitVariables();
    this.InitReaderModules();
  }
  Subscribe(channel, callback) {
    switch (channel) {
      case 1:
        this.channel1.push(callback);
        break;
      case 2:
        this.channel2.push(callback);
        break;
      case 3:
        this.channel3.push(callback);
        break;
      case 4:
        this.channel4.push(callback);
        break;
      case 5:
        this.channel5.push(callback);
        break;
      case 6:
        this.channel6.push(callback);
        break;
      case 7:
        this.channel7.push(callback);
        break;
      case 8:
        this.channel8.push(callback);
        break;
      case 9:
        this.channel9.push(callback);
        break;
      case 10:
        this.channel10.push(callback);
        break;
      case 11:
        this.channel11.push(callback);
        break;
      case 12:
        this.channel12.push(callback);
        break;
      case 13:
        this.channel13.push(callback);
        break;
      case 14:
        this.channel14.push(callback);
        break;
      case 15:
        this.channel15.push(callback);
        break;
      case 16:
        this.channel16.push(callback);
        break;
    }
  }
  //Call every function that subscribed to this
  CallKeysEvent(channel, onEvent) {
    switch (channel) {
      case 1:
        this.channel1.forEach((subscriber) => subscriber(onEvent));
        break;
      case 2:
        this.channel2.forEach((subscriber) => subscriber(onEvent));
        break;
      case 3:
        this.channel3.forEach((subscriber) => subscriber(onEvent));
        break;
      case 4:
        this.channel4.forEach((subscriber) => subscriber(onEvent));
        break;
      case 5:
        this.channel5.forEach((subscriber) => subscriber(onEvent));
        break;
      case 6:
        this.channel6.forEach((subscriber) => subscriber(onEvent));
        break;
      case 7:
        this.channel7.forEach((subscriber) => subscriber(onEvent));
        break;
      case 8:
        this.channel8.forEach((subscriber) => subscriber(onEvent));
        break;
      case 9:
        this.channel9.forEach((subscriber) => subscriber(onEvent));
        break;
      case 10:
        this.channel10.forEach((subscriber) => subscriber(onEvent));
        break;
      case 11:
        this.channel11.forEach((subscriber) => subscriber(onEvent));
        break;
      case 12:
        this.channel12.forEach((subscriber) => subscriber(onEvent));
        break;
      case 13:
        this.channel13.forEach((subscriber) => subscriber(onEvent));
        break;
      case 14:
        this.channel14.forEach((subscriber) => subscriber(onEvent));
        break;
      case 15:
        this.channel15.forEach((subscriber) => subscriber(onEvent));
        break;
      case 16:
        this.channel16.forEach((subscriber) => subscriber(onEvent));
        break;
    }
  }
  InitReaderModules() {
    if (typeof window !== "undefined") {
      this.keyboardReader = new KeyboardInputModule();
      this.midiReader = new MIDIInputModule();
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
  // the time to wait before executing the function
  //MIDI and Keyboard Input methods
  GetMIDIInput(message) {
    let [command, note, velocity] = message.data;
    let stringCommand = MIDIDataTable.MIDICommandToString(command);
    if (stringCommand.includes("NoteOn") || stringCommand.includes("NoteOff")) {
      let ch = Number(stringCommand.replace(/\D+/g, ""));
      let stringNote = MIDIDataTable.MIDINoteToString(note);
      this.UpdateHoldingKeys(stringCommand, ch, stringNote, velocity);
    }
    this.CalcBPM(message);
  }
  GetInputKeyboard(channel, command, note, velocity) {
    let stringCommand = MIDIDataTable.MIDICommandToString(command);
    let stringNote = MIDIDataTable.MIDINoteToString(note);
    if (stringCommand.includes("NoteOn") || stringCommand.includes("NoteOff")) {
      this.UpdateHoldingKeys(stringCommand, channel, stringNote, velocity);
    }
  }
  //Updating What keys are currently beeing hold
  UpdateHoldingKeys(command, ch, note, velocity) {
    let channelIndex = ch - 1;
    if (command.includes("NoteOn")) {
      if (!this.holdingKeys[channelIndex].includes(note)) {
        this.holdingKeys[channelIndex].push(note);
        this.velocity[channelIndex].push(velocity);
      }
      this.CallKeysEvent(ch, true);
    } else if (command.includes("NoteOff")) {
      if (this.holdingKeys[channelIndex].includes(note)) {
        let noteIndex = this.holdingKeys[channelIndex].indexOf(note);
        this.holdingKeys[channelIndex].splice(noteIndex, 1);
        this.velocity[channelIndex].splice(noteIndex, 1);
      }
      this.CallKeysEvent(ch, false);
    }
  }
  //BPM stuff
  CalcBPM(message) {
    if (message.data[0] == 248) {
      this.clockCount++;
      if (this.clockCount == 96) {
        let deltaTime = message.timeStamp - this.prevTimestamp;
        this.oldBPM = this.bpm;
        this.bpm = Math.round(60 / (deltaTime / 1e3) * 4);
        this.prevTimestamp = message.timeStamp;
        if (this.oldBPM != this.bpm) ;
        this.clockCount = 0;
      }
    }
  }
  GetBPM() {
    return this.bpm;
  }
  //Getter methods
  GetHoldingKeys(channel) {
    return this.holdingKeys[channel - 1];
  }
  GetVelocity(channel) {
    return this.velocity[channel - 1];
  }
  GetMIDIDevices() {
    if (this.midiReader != void 0) {
      var str = [];
      var devices = this.midiReader.GetMIDIDevices();
      if (devices.length > 0) {
        devices.forEach((device) => {
          var d = device;
          str.push(d.name);
        });
      } else str.push("Please Plug In a MIDI Decice");
      return str;
    } else return ["MIDI Reader not found"];
  }
  GetSelectedMIDIDevice() {
    if (this.midiReader != void 0) {
      var targetDevice = this.midiReader.GetSelectedDevice();
      if (targetDevice != void 0) return targetDevice.name;
      else return "[Selected Device is undefined]";
    } else return "MIDI Reader not found";
  }
  SetTargetMIDIDevice(device) {
    if (this.midiReader != void 0) {
      this.midiReader.SetTargetDevice(device);
    }
  }
}

class MIDIReceiver {
  //Stores last detected velocityValues
  constructor(targetChannel, targetNote) {
    this.useRegExp = false;
    this.lastIndexValue = -1;
    this.velocityValue = 0;
    this.targetChannel = targetChannel;
    this.targetNote = targetNote;
    this.targetRegExp = new RegExp(
      MIDIDataTable.MIDIStringNoteToRegExp(targetNote)
    );
  }
  //Get's currently Holding keys and velocity, if it's under these one, return true, else return false
  GetMIDIInput(holdingKeys, velocityValues) {
    this.holdingKeys = holdingKeys;
    this.velocityValues = velocityValues;
    let targetIndex = -1;
    if (this.useRegExp) {
      targetIndex = holdingKeys.findIndex(
        (element) => element.match(this.targetRegExp)
      );
    } else {
      targetIndex = holdingKeys.findIndex(
        (element) => element.match(this.targetNote)
      );
    }
    if (targetIndex !== -1) {
      this.lastIndexValue = targetIndex;
      this.velocityValue = velocityValues[targetIndex];
      return true;
    } else {
      return false;
    }
  }
  GetVelocity() {
    return this.velocityValue;
  }
}

class MIDIToy {
  //Construct everything basic that is needed for a MIDIKeyboard
  constructor(toyType, targetChannel, numberOfKeys, startKey, useRegExp) {
    //Basic information
    this.toyChangedEventListeners = [];
    //The target MIDi channel of the toy
    this.bpm = 0;
    //The height of the canvas
    //MIDI Receiver settings
    this.numberOfKeys = 24;
    //How many keys are on this keyboard?
    this.startKey = 12;
    //Use regular expression in in MIDIReceiver?
    this.receiver = [];
    //Vector Positions as array if needed
    this.drawPositions = [];
    //Color settings
    this.fillColor = new paper.Color(1);
    this.strokeColor = new paper.Color(1 / 4);
    this.accentColor = new paper.Color(1 / 2);
    this.toyType = toyType;
    this.inputManager = new InputManager();
    this.toyManager = new ToyManager();
    this.paperLayer = new paper.Layer();
    this.targetChannel = targetChannel;
    this.canvas = this.toyManager.targetCanvas;
    if (this.canvas != null) {
      this.w = this.canvas.getBoundingClientRect().width;
      this.h = this.canvas.getBoundingClientRect().height;
    } else {
      this.w = 500;
      this.h = 500;
    }
    this.numberOfKeys = numberOfKeys;
    this.startKey = startKey;
    this.useRegExp = useRegExp;
    this.SetupMIDIReceiver(this.numberOfKeys, this.useRegExp);
  }
  // Event subscription method
  SubscribeToToyChangedEvent(listener) {
    const index = this.toyChangedEventListeners.indexOf(listener);
    if (index == -1) {
      this.toyChangedEventListeners.push(listener);
    }
  }
  // Event unsubscription method
  UnsubscribeFromToyChangedEvent(listener) {
    const index = this.toyChangedEventListeners.indexOf(listener);
    if (index !== -1) {
      this.toyChangedEventListeners.splice(index, 1);
    }
  }
  // Method to trigger the event and notify the listeners
  TriggerToyChangedEvent() {
    for (const listener of this.toyChangedEventListeners) {
      listener();
    }
  }
  //Generates needed MIDI Receiver
  SetupMIDIReceiver(amount, useExpression) {
    this.receiver.length = 0;
    let note = this.startKey;
    for (let i = 0; i < amount; i++) {
      var rec = new MIDIReceiver(
        this.targetChannel,
        MIDIDataTable.MIDINoteToString(note)
      );
      rec.useRegExp = useExpression;
      this.receiver.push(rec);
      note++;
    }
  }
  //Takes 0-255 values and converts it to 0-1
  SetPaperColor(color, red, green, blue, alpha) {
    color.red = this.MapRGBAToPaperRGBA(red);
    color.green = this.MapRGBAToPaperRGBA(green);
    color.blue = this.MapRGBAToPaperRGBA(blue);
    color.alpha = this.MapRGBAToPaperRGBA(alpha);
  }
  //Returns a RGBA object with 0-255 values
  GetPaperColor(color) {
    var rgba = { r: 0, g: 0, b: 0, a: 0 };
    rgba.r = this.MapPaperRGBAToRGBA(color.red);
    rgba.g = this.MapPaperRGBAToRGBA(color.green);
    rgba.b = this.MapPaperRGBAToRGBA(color.blue);
    rgba.a = this.MapPaperRGBAToRGBA(color.alpha);
    return rgba;
  }
  //Evenly calculate draw positions and put them into the drawPositions array
  HorizontalDrawPositionDistrubution(cellSize) {
    this.drawPositions.length = 0;
    let avgCellSize = cellSize;
    for (let i = 0; i < this.numberOfKeys; i++) {
      let xCalc = avgCellSize / 2 + avgCellSize * i;
      let vec = { x: xCalc, y: this.h / 2 - avgCellSize / 4 };
      this.drawPositions.push(vec);
    }
    return avgCellSize;
  }
  //Evenly calculate draw positions and put them into the drawPositions array
  VerticalDrawPositionDistrubution(cellSize) {
    this.drawPositions.length = 0;
    let avgCellSize = cellSize;
    for (let i = 0; i < this.numberOfKeys; i++) {
      let yCalc = avgCellSize / 2 + avgCellSize * i;
      let vec = { x: this.w / 2 - avgCellSize / 4, y: yCalc };
      this.drawPositions.push(vec);
    }
    return avgCellSize;
  }
  GetRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  MapRGBAToPaperRGBA(x) {
    return (x - 0) / (255 - 0);
  }
  MapPaperRGBAToRGBA(x) {
    return Math.round(x * 255);
  }
  RemoveChildrenFromLayer() {
    this.paperLayer.removeChildren();
  }
  //Base JSON data that this class uses
  GetBaseJSON() {
    return {
      toyType: this.toyType,
      numberOfKeys: this.numberOfKeys,
      startKey: this.startKey,
      useRegExp: this.useRegExp,
      //Color data
      fillColor: {
        red: this.fillColor.red,
        green: this.fillColor.green,
        blue: this.fillColor.blue,
        alpha: this.fillColor.alpha
      },
      strokeColor: {
        red: this.strokeColor.red,
        green: this.strokeColor.green,
        blue: this.strokeColor.blue,
        alpha: this.strokeColor.alpha
      },
      accentColor: {
        red: this.accentColor.red,
        green: this.accentColor.green,
        blue: this.accentColor.blue,
        alpha: this.accentColor.alpha
      }
    };
  }
  //Load base data from every toy class
  LoadBaseJSON(data) {
    try {
      data = JSON.parse(data);
    } catch {
    }
    if (data.toyType != "" || data.toyType != void 0)
      this.toyType = data.toyType;
    this.numberOfKeys = data.numberOfKeys;
    this.startKey = data.startKey;
    this.useRegExp = data.useRegExp;
    this.fillColor = new paper.Color(
      data.fillColor.red,
      data.fillColor.green,
      data.fillColor.blue,
      data.fillColor.alpha
    );
    this.strokeColor = new paper.Color(
      data.strokeColor.red,
      data.strokeColor.green,
      data.strokeColor.blue,
      data.strokeColor.alpha
    );
    this.accentColor = new paper.Color(
      data.accentColor.red,
      data.accentColor.green,
      data.accentColor.blue,
      data.accentColor.alpha
    );
    this.TriggerToyChangedEvent();
    this.SetupKeyboard();
  }
}

class EmptyToy extends MIDIToy {
  constructor(targetChannel) {
    super("Empty", targetChannel, 13, 12, true);
  }
  LoadDefaultColors() {
  }
  SetupKeyboard() {
  }
  UpdateKeyboard() {
  }
  ToJSON() {
  }
  LoadJSON(data) {
  }
  ApplyColors() {
  }
  ApplySettings() {
  }
}

class GraviBoard extends MIDIToy {
  constructor(targetChannel) {
    super("GraviBoard", targetChannel, 24, 12, true);
    // shapes: paper.Path[] = [];
    this.circleRadius = 15;
    this.velocity = [];
    this.horizontalAlign = true;
    this.strokeWidth = 2;
    this.polySides = 20;
    this.velocityLimit = 50;
    this.yGravity = -0.9;
    this.xGravity = 0;
    this.yFriction = 0.9;
    this.xFriction = 0.9;
    this.yImpulsPower = 30;
    this.xImpulsPower = 0;
    this.inputManager.Subscribe(targetChannel, this.InputEvent.bind(this));
    this.LoadDefaultColors();
    this.SetupKeyboard();
  }
  LoadDefaultColors() {
    this.fillColor = new paper.Color(0, 0, 0, 1);
    this.strokeColor = new paper.Color(1);
    this.accentColor = new paper.Color(1);
    this.ApplyColors();
  }
  ApplyColors() {
    this.paperLayer.children.forEach((element) => {
      var s = element;
      s.fillColor = this.fillColor;
      s.strokeColor = this.strokeColor;
    });
  }
  ApplySettings() {
    this.paperLayer.children.forEach((element) => {
      var s = element;
      s.strokeWidth = this.strokeWidth;
    });
  }
  // [O][O][O][O][O][O][O][O]
  SetupKeyboard() {
    console.log("INIT keyboard");
    this.RemoveChildrenFromLayer();
    this.SetupMIDIReceiver(this.numberOfKeys, this.useRegExp);
    this.InitVelocity();
    var cellSize = this.w / this.numberOfKeys;
    this.circleRadius = cellSize / 4;
    if (this.horizontalAlign) this.HorizontalDrawPositionDistrubution(cellSize);
    else this.VerticalDrawPositionDistrubution(cellSize);
    this.drawPositions.forEach((element) => {
      var pos = element;
      var point = new paper.Point(pos.x, pos.y);
      var poly = new paper.Path.RegularPolygon(
        point,
        this.polySides,
        this.circleRadius
      );
      poly.strokeWidth = this.strokeWidth;
      this.paperLayer.addChild(poly);
    });
    this.ApplyColors();
  }
  ToJSON() {
    return {
      //MIDIToy data
      ...this.GetBaseJSON(),
      //Class specific data
      horizontalAlign: this.horizontalAlign,
      circleRadius: this.circleRadius,
      velocity: this.velocity.map((v) => ({ x: v.x, y: v.y })),
      strokeWidth: this.strokeWidth,
      polySides: this.polySides,
      velocityLimit: this.velocityLimit,
      yGravity: this.yGravity,
      xGravity: this.xGravity,
      yFriction: this.yFriction,
      xFriction: this.xFriction,
      yImpulsPower: this.yImpulsPower,
      xImpulsPower: this.xImpulsPower
    };
  }
  LoadJSON(data) {
    this.horizontalAlign = data.horizontalAlign;
    this.circleRadius = data.circleRadius;
    this.velocity = data.velocity.map((v) => ({ x: v.x, y: v.y }));
    this.strokeWidth = data.strokeWidth;
    this.polySides = data.polySides;
    this.velocityLimit = data.velocityLimit;
    this.yGravity = data.yGravity;
    this.xGravity = data.xGravity;
    this.yFriction = data.yFriction;
    this.xFriction = data.xFriction;
    this.yImpulsPower = data.yImpulsPower;
    this.xImpulsPower = data.xImpulsPower;
    this.LoadBaseJSON(data);
  }
  InitVelocity() {
    this.velocity.length = 0;
    for (let i = 0; i < this.numberOfKeys; i++) {
      let vec = { x: 0, y: 0 };
      this.velocity.push(vec);
    }
  }
  // prevHoldingKeys: string[] = [];
  InputEvent(onEvent) {
    let holdingKeys = this.inputManager.GetHoldingKeys(this.targetChannel);
    let velocities = this.inputManager.GetVelocity(this.targetChannel);
    this.bpm = this.inputManager.GetBPM();
    let index = 0;
    this.receiver.forEach((element) => {
      var r = element;
      if (r.GetMIDIInput(holdingKeys, velocities)) {
        this.SetAccentColor(index);
        this.Impuls(index, this.yImpulsPower, this.xImpulsPower);
      } else this.SetFillColor(index);
      index++;
    });
  }
  UpdateKeyboard() {
    let indexValue = 0;
    var yGravity = this.yGravity;
    var xGravity = this.xGravity;
    var yFriction = this.yFriction;
    var xFriction = this.xFriction;
    this.paperLayer.children.forEach((element) => {
      var s = element;
      var vel = this.velocity[indexValue];
      if (vel == void 0) return;
      if (yGravity == 0) vel.y *= yFriction;
      if (xGravity == 0) vel.x *= xFriction;
      if (yGravity < 0) {
        if (vel.y > 0) vel.y *= yFriction;
      }
      if (yGravity > 0) {
        if (vel.y < 0) vel.y *= yFriction;
      }
      if (xGravity < 0) {
        if (vel.x > 0) vel.x *= xFriction;
        else if (xGravity > 0) {
          if (vel.x < 0) vel.x *= xFriction;
        }
      }
      if (s.position.y > this.h - (this.circleRadius + this.strokeWidth / 2)) {
        if (vel.y < 0) {
          vel.y = -vel.y;
        }
      }
      if (s.position.y < 0 + (this.circleRadius + this.strokeWidth / 2)) {
        if (vel.y > 0) {
          vel.y = -vel.y;
        }
      }
      if (s.position.y > 0 + (this.circleRadius + this.strokeWidth / 2) && s.position.y < this.h - (this.circleRadius + this.strokeWidth / 2)) {
        vel.y += yGravity;
        vel.x += xGravity;
      }
      if (s.position.x > this.w - (this.circleRadius + this.strokeWidth / 2))
        vel.x = -vel.x;
      if (s.position.x < 0 + (this.circleRadius + this.strokeWidth / 2))
        vel.x = -vel.x;
      if (vel.y < -this.velocityLimit || vel.y > this.velocityLimit) {
        if (vel.y < 0) vel.y = -this.velocityLimit;
        if (vel.y > 0) vel.y = this.velocityLimit;
      }
      s.position.y -= vel.y;
      s.position.x -= vel.x;
      this.velocity[indexValue].y = vel.y;
      this.velocity[indexValue].x = vel.x;
      indexValue++;
    });
  }
  SetFillColor(index) {
    this.paperLayer.children[index].fillColor = this.fillColor;
  }
  SetAccentColor(index) {
    this.paperLayer.children[index].fillColor = this.accentColor;
  }
  Impuls(indexValue, yForce, xForce) {
    var vel = this.velocity[indexValue];
    if (this.yGravity < 0) vel.y += yForce;
    else vel.y -= yForce;
    if (this.xGravity < 0) vel.x += xForce;
    else vel.x -= xForce;
    this.velocity[indexValue] = vel;
  }
}

class PolyDrum extends MIDIToy {
  constructor(targetChannel) {
    super("PolyDrum", targetChannel, 24, 12, true);
    // shapes: paper.Path[] = [];
    this.shapeLimit = 10;
    this.polySides = 3;
    this.startSize = 500;
    this.xSizeChange = 0.98;
    this.ySizeChange = 0.98;
    this.alphaDecrease = 0.01;
    this.rotationSpeed = 0;
    //Stroke settings
    this.strokeWidth = 10;
    this.strokeWidthDecrease = 1;
    this.xSpawnPos = this.w * 0.5;
    this.ySpawnPos = this.h * 0.5;
    this.xSpawnOffset = 1;
    this.ySpawnOffset = 1;
    this.minWidth = this.w * 0.5;
    this.maxWidth = this.w * 0.5;
    this.minHeight = this.h * 0.5;
    this.maxHeight = this.h * 0.5;
    this.xSpawnScale = 1;
    this.ySpawnScale = 1;
    this.frameCount = 0;
    this.inputManager.Subscribe(targetChannel, this.InputEvent.bind(this));
    this.LoadDefaultColors();
    this.SetupKeyboard();
  }
  LoadDefaultColors() {
    this.fillColor = new paper.Color(0, 0, 0, 0.4);
    this.strokeColor = new paper.Color(1);
    this.accentColor = new paper.Color(0, 0, 0, 0);
  }
  ApplyColors() {
    this.paperLayer.children.forEach((element) => {
      var s = element;
      s.fillColor = this.fillColor;
      s.strokeColor = this.strokeColor;
    });
  }
  ApplySettings() {
  }
  ToJSON() {
    return {
      //MIDIToy data
      ...this.GetBaseJSON(),
      //Class specific data
      shapeLimit: this.shapeLimit,
      polySides: this.polySides,
      startSize: this.startSize,
      sizeIncrease: this.xSizeChange,
      alphaDecrease: this.alphaDecrease,
      rotationSpeed: this.rotationSpeed,
      strokeWidth: this.strokeWidth,
      strokeWidthDecrease: this.strokeWidthDecrease,
      ySpawnOffset: this.ySpawnOffset,
      xSpawnOffset: this.xSpawnOffset,
      xSpawnScale: this.xSpawnScale,
      ySpawnScale: this.ySpawnScale,
      xSizeChange: this.xSizeChange,
      ySizeChange: this.ySizeChange
    };
  }
  LoadJSON(data) {
    this.shapeLimit = data.shapeLimit;
    this.polySides = data.polySides;
    this.startSize = data.startSize;
    this.xSizeChange = data.sizeIncrease;
    this.alphaDecrease = data.alphaDecrease;
    this.rotationSpeed = data.rotationSpeed;
    this.strokeWidth = data.strokeWidth;
    this.strokeWidthDecrease = data.strokeWidthDecrease;
    this.xSpawnOffset = data.xSpawnOffset;
    this.ySpawnOffset = data.ySpawnOffset;
    this.xSpawnScale = data.xSpawnScale;
    this.ySpawnScale = data.ySpawnScale;
    this.xSizeChange = data.xSizeChange;
    this.ySizeChange = data.ySizeChange;
    this.LoadBaseJSON(data);
  }
  SetupKeyboard() {
    this.RemoveChildrenFromLayer();
    this.SpawnShape(120);
    this.SetupMIDIReceiver(this.numberOfKeys, this.useRegExp);
  }
  UpdateKeyboard() {
    this.UpdateShapes();
  }
  ChangePolySideCount() {
    var rand = Math.random();
    if (rand > 0.5) {
      if (this.polySides < 10) this.polySides += 1;
      else this.polySides -= 1;
    } else {
      if (this.polySides > 2) this.polySides -= 1;
      else this.polySides += 1;
    }
  }
  InputEvent(onEvent) {
    if (!onEvent) {
      return;
    }
    let holdingKeys = this.inputManager.GetHoldingKeys(this.targetChannel);
    let velocities = this.inputManager.GetVelocity(this.targetChannel);
    this.bpm = this.inputManager.GetBPM();
    this.receiver.forEach((element) => {
      let r = element;
      if (r.GetMIDIInput(holdingKeys, velocities)) {
        this.SpawnShape(r.GetVelocity());
      }
    });
  }
  SpawnShape(velocity) {
    let xSpawn = this.xSpawnPos * this.xSpawnOffset;
    let ySpawn = this.ySpawnPos * this.ySpawnOffset;
    let point = new paper.Point(xSpawn, ySpawn);
    let poly = new paper.Path.RegularPolygon(
      point,
      this.polySides,
      this.startSize
    );
    poly.fillColor = new paper.Color(this.fillColor);
    poly.strokeColor = new paper.Color(this.strokeColor);
    poly.strokeWidth = this.strokeWidth + velocity / 10;
    poly.scale(this.xSpawnScale, this.ySpawnScale);
    this.paperLayer.addChild(poly);
    if (this.paperLayer != void 0) {
      if (this.paperLayer.children.length > this.shapeLimit) {
        this.paperLayer.firstChild.remove();
      }
    }
  }
  UpdateShapes() {
    var alphaDecrease = this.alphaDecrease;
    var strokeWidthDecrease = this.strokeWidthDecrease;
    var rotationSpeed = this.rotationSpeed;
    this.paperLayer.children.forEach((element) => {
      var poly = element;
      var newStrokeColor = poly.strokeColor.clone();
      var newFillColor = poly.fillColor.clone();
      newStrokeColor.alpha -= alphaDecrease;
      newFillColor.alpha -= alphaDecrease;
      poly.set({
        scaling: poly.scaling.multiply([this.xSizeChange, this.ySizeChange]),
        strokeWidth: poly.strokeWidth * strokeWidthDecrease,
        strokeColor: newStrokeColor,
        fillColor: newFillColor
      });
      var center = poly.bounds.center;
      poly.rotate(rotationSpeed, center);
    });
  }
  RemoveShape(shape) {
    this.paperLayer.remove(shape);
  }
}

class MIDIMatrix extends MIDIToy {
  constructor(targetChannel) {
    super("MIDI Matrix", targetChannel, 10, 12, true);
    this.rows = 12;
    this.polySides = 4;
    this.strokeWidth = 5;
    this.cellHeightScale = 0.8;
    this.cellWidthScale = 0.8;
    this.gridCells = [];
    this.colums = this.numberOfKeys;
    this.inputManager.Subscribe(targetChannel, this.InputEvent.bind(this));
    this.LoadDefaultColors();
    this.SetupKeyboard();
  }
  SetupKeyboard() {
    this.RemoveChildrenFromLayer();
    this.CreateGrid();
    this.SetupMIDIReceiver(this.colums * this.rows, this.useRegExp);
  }
  CreateGrid() {
    var cellWidth = this.w / this.colums;
    var cellHeight = this.h / this.rows;
    for (let row = 0; row < this.rows; row++) {
      const gridRow = [];
      for (let col = 0; col < this.colums; col++) {
        const point = new paper.Point(
          col * cellWidth + cellWidth / 2,
          row * cellHeight + cellHeight / 2
        );
        var poly = new paper.Path.RegularPolygon(point, this.polySides, 1);
        poly.scale(
          cellWidth * this.cellWidthScale,
          cellHeight * this.cellHeightScale
        );
        poly.fillColor = this.fillColor;
        poly.strokeWidth = this.strokeWidth;
        poly.strokeColor = this.strokeColor;
        poly.strokeScaling = false;
        gridRow.push(poly);
        this.paperLayer.addChild(poly);
      }
      this.gridCells[row] = gridRow;
    }
  }
  InputEvent(onEvent) {
    let holdingKeys = this.inputManager.GetHoldingKeys(this.targetChannel);
    let velocities = this.inputManager.GetVelocity(this.targetChannel);
    var xIndex = 0;
    var yIndex = 0;
    this.receiver.forEach((element) => {
      if (element.GetMIDIInput(holdingKeys, velocities)) {
        this.MatrixONEvent(yIndex, xIndex);
      } else {
        this.MatrixOFFEvent(yIndex, xIndex);
      }
      xIndex++;
      if (xIndex >= this.colums) {
        xIndex = 0;
        yIndex++;
      }
    });
  }
  MatrixONEvent(x, y) {
    this.gridCells[x][y].fillColor = this.accentColor;
  }
  MatrixOFFEvent(x, y) {
    this.gridCells[x][y].fillColor = this.fillColor;
  }
  ApplySettings() {
    this.SetupKeyboard();
  }
  UpdateKeyboard() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.colums; col++) {
      }
    }
  }
  LoadDefaultColors() {
    this.fillColor = new paper.Color(100, 100, 100, 0.5);
    this.strokeColor = new paper.Color(100, 100, 100, 0.4);
    this.accentColor = new paper.Color(0, 0, 0, 1);
  }
  ApplyColors() {
    this.gridCells.forEach((row) => {
      row.forEach((cell) => {
        cell.fillColor = this.fillColor;
        cell.strokeColor = this.strokeColor;
      });
    });
  }
  ToJSON() {
    return {
      ...this.GetBaseJSON(),
      rows: this.rows,
      colums: this.colums,
      polySides: this.polySides,
      strokeWidth: this.strokeWidth,
      cellHeightScale: this.cellHeightScale,
      cellWidthScale: this.cellWidthScale
    };
  }
  LoadJSON(data) {
    this.rows = data.rows;
    this.colums = data.colums;
    this.polySides = data.polySides;
    this.strokeWidth = data.strokeWidth;
    this.cellHeightScale = data.cellHeightScale;
    this.cellWidthScale = data.cellWidthScale;
    this.LoadBaseJSON(data);
  }
}

class ToyManager {
  constructor() {
    this.toys = [];
    if (ToyManager.instance) {
      return ToyManager.instance;
    }
    ToyManager.instance = this;
  }
  //The canvas everything get's rendered on
  SetTargetCanvas(canvas) {
    this.targetCanvas = canvas;
  }
  GetToysToUpdate() {
    let array = [];
    for (let i = 0; i <= 15; i++) {
      if (!this.toys[i].toyType.includes("Empty")) {
        array.push(this.toys[i]);
      }
    }
    return array;
  }
  //Loop for updating toys that are not Empty
  UpdateToys() {
    let array = this.GetToysToUpdate();
    if (this.targetCanvas != null) {
      array.forEach((element) => {
        element.UpdateKeyboard();
      });
    }
  }
  //Creates 16 placeholder toys
  CreateEmptyToys() {
    for (let i = 0; i < 16; i++) {
      this.toys[i] = new EmptyToy(i + 1);
    }
  }
  //Creates a "empty" toy aka the base class
  CreateEmptyToy(channel) {
    this.RemovePaperLayer(channel);
    this.toys[channel - 1] = new EmptyToy(channel);
  }
  CreateGraviBoard(channel) {
    this.RemovePaperLayer(channel);
    this.toys[channel - 1] = new GraviBoard(channel);
  }
  CreatePolyDrum(channel) {
    this.RemovePaperLayer(channel);
    this.toys[channel - 1] = new PolyDrum(channel);
  }
  CreateMIDIMatrix(channel) {
    this.RemovePaperLayer(channel);
    this.toys[channel - 1] = new MIDIMatrix(channel);
  }
  CreateToy(channel, toyNumber) {
    switch (toyNumber) {
      case 0:
        this.CreateEmptyToy(channel);
        return this.GetToy(channel);
      case 1:
        this.CreateGraviBoard(channel);
        return this.GetToy(channel);
      case 2:
        this.CreatePolyDrum(channel);
        return this.GetToy(channel);
      case 3:
        this.CreateMIDIMatrix(channel);
        return this.GetToy(channel);
      default:
        this.CreateEmptyToy(channel);
        return this.GetToy(channel);
    }
  }
  GetToyType(channel) {
    let toy = this.GetToy(channel);
    if (toy != void 0) {
      let name = toy.toyType;
      switch (true) {
        case name.includes("Empty"):
          return 0;
        case name.includes("Gravi"):
          return 1;
        case name.includes("Poly"):
          return 2;
        case name.includes("Matrix"):
          return 3;
      }
    } else {
      this.CreateEmptyToy(channel);
      return 0;
    }
  }
  GetToy(channel) {
    if (channel < 1 || channel > this.toys.length) {
      return void 0;
    }
    return this.toys[channel - 1];
  }
  //Returns whole array of toys
  GetToys() {
    return this.toys;
  }
  //Clears the complete canvas with all elements on it
  ClearCanvas() {
    paper.project.clear();
  }
  RemovePaperLayer(channel) {
    let toy = this.GetToy(channel);
    if (toy != void 0) {
      toy.paperLayer.remove();
    }
  }
}

class CanvasManager {
  constructor() {
    this.frameCountHalf = 0;
    this.frameCountOneFPS = 0;
    this.OnFrame = () => {
      if (this.targetCanvas != null) {
        this.fullFramerate.forEach((handler) => handler());
        this.toyManager.UpdateToys();
        if (this.frameCountHalf > 1) {
          this.frameCountHalf = 0;
          this.halfFramerate.forEach((handler) => handler());
        }
        if (this.frameCountOneFPS > 60) {
          this.frameCountOneFPS = 0;
          this.oneFPS.forEach((handler) => handler());
        }
        this.frameCountHalf++;
        this.frameCountOneFPS++;
      }
    };
    if (CanvasManager.instance) {
      return CanvasManager.instance;
    }
    CanvasManager.instance = this;
    this.inputManager = new InputManager();
    this.toyManager = new ToyManager();
    this.fullFramerate = [];
    this.halfFramerate = [];
    this.oneFPS = [];
  }
  SetupCanvas(canvas) {
    if (this.targetCanvas === void 0) {
      this.targetCanvas = canvas;
      paper.setup(this.targetCanvas);
      paper.view.onFrame = this.OnFrame;
    } else this.targetCanvas = canvas;
  }
  SubscribeFullFramerate(handler) {
    this.fullFramerate.push(handler);
  }
  SubscribeHalfFramerate(handler) {
    this.halfFramerate.push(handler);
  }
  SubscribeOneFPS(handler) {
    this.oneFPS.push(handler);
  }
  UnsubscribeOnFrame(handler) {
    const index = this.fullFramerate.indexOf(handler);
    if (index !== -1) {
      this.fullFramerate.splice(index, 1);
    }
  }
  UnsubscribeHalfFrame(handler) {
    const index = this.halfFramerate.indexOf(handler);
    if (index !== -1) {
      this.halfFramerate.splice(index, 1);
    }
  }
  UnsubscribeOneFPS(handler) {
    const index = this.oneFPS.indexOf(handler);
    if (index !== -1) {
      this.oneFPS.splice(index, 1);
    }
  }
}

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
let app;
let auth = getAuth(app);
let db = getFirestore(app);
let user;
let userID = void 0;
async function AutoLogin() {
  SetUser(auth.currentUser);
}
function SetUser(u) {
  user = u;
  if (u == void 0) {
    userID = void 0;
  } else userID = user.uid;
}
function GetUser() {
  return user;
}
function GetUserID() {
  return userID;
}
async function SetLocalPersistence() {
  await auth.setPersistence(browserLocalPersistence).then((result) => {
    AutoLogin();
  });
}
SetLocalPersistence();

class FirebaseManager {
  constructor() {
    this.fetchedData = [];
    if (FirebaseManager.instance) {
      return FirebaseManager.instance;
    }
    FirebaseManager.instance = this;
  }
  //Create new email acount
  async EmailSignUp(email, password, username) {
    return new Promise((resolve) => {
      createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
        SetUser(user);
        console.log("User sign-up successful:", user);
        this.UpdateUsername(username);
        resolve(true);
      }).catch((error) => {
        resolve(false);
      });
    });
  }
  //Sign in with email and password
  async EmailSignIn(email, password) {
    return new Promise((resolve) => {
      signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
        SetUser(user);
        resolve(true);
      }).catch((error) => {
        console.log("Login error:", error);
        resolve(false);
      });
    });
  }
  async UpdateUsername(username) {
    return new Promise((resolve) => {
      updateProfile(GetUser(), { displayName: username }).then(() => {
        resolve(true);
      }).catch((error) => {
        resolve(false);
      });
    });
  }
  async SendPasswordResetEmail(email) {
    return new Promise((resolve) => {
      sendPasswordResetEmail(auth, email).then(() => {
        resolve(true);
      }).catch((error) => {
        resolve(false);
      });
    });
  }
  async SignUpWithGoogle() {
    const provider = new GoogleAuthProvider();
    return new Promise((resolve) => {
      signInWithPopup(auth, provider).then((userCredential) => {
        const user = userCredential.user;
        SetUser(user);
        resolve(true);
      }).catch((error) => {
        resolve(false);
      });
    });
  }
  async SignUpWithGitHub() {
    const provider = new GithubAuthProvider();
    return new Promise((resolve) => {
      signInWithPopup(auth, provider).then((userCredential) => {
        const user = userCredential.user;
        SetUser(user);
        resolve(true);
      }).catch((error) => {
        resolve(false);
      });
    });
  }
  async SignUpWithTwitter() {
    const provider = new TwitterAuthProvider();
    return new Promise((resolve) => {
      signInWithPopup(auth, provider).then((userCredential) => {
        const user = userCredential.user;
        SetUser(user);
        resolve(true);
      }).catch((error) => {
        resolve(false);
      });
    });
  }
  //Use this to create a new preset in user account
  async UploadNewPreset(presetName, presetData, toyType, publicPreset) {
    if (presetName == void 0 || presetName == "") {
      console.log("presetName is null");
      return false;
    }
    if (presetData == void 0 || presetData == "") {
      console.log("presetData is null");
      return false;
    }
    if (toyType == void 0 || toyType == "") {
      console.log("toyType is null");
      return false;
    }
    console.log("UPLOAD preset");
    toyType = toyType.toLowerCase().replace(/\s/g, "");
    const userID = GetUserID();
    if (userID == void 0) {
      console.log("ERROR: User-ID is undefined");
      return false;
    }
    const presetUUID = this.GenerateUniquiePresetID(
      presetName,
      presetData,
      userID
    );
    const collection2 = toyType + "/" + presetUUID;
    console.log("UPLOAD doc in: " + collection2);
    await setDoc(doc(db, collection2), {
      userID,
      presetName: presetName.toLowerCase(),
      presetData,
      publicPreset,
      uploadDate: serverTimestamp()
    }).then((event) => {
      return true;
    }).catch((error) => {
      return false;
    });
  }
  //Get some sweet ass data
  async ReadMyPresets(toyType) {
    try {
      const q = query(
        collection(db, toyType),
        where("userID", "==", GetUserID())
      );
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc2) => {
        data.push({ id: doc2.id, ...doc2.data() });
      });
      return data;
    } catch (error) {
      console.error("Error reading collection data:", error);
      return [];
    }
  }
  //Filter some sweet as data
  async SearchPresetsByPresetName(toyType, searchString) {
    const q = query(
      collection(db, toyType),
      where("presetName", ">=", searchString.toLowerCase()),
      where("presetName", "<=", searchString.toLowerCase() + "")
    );
    try {
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc2) => {
        data.push({ id: doc2.id, ...doc2.data() });
      });
      return data;
    } catch (error) {
      console.error("Error searching presets:", error);
      throw error;
    }
  }
  async GetNewesPresets(toyType) {
    const q = query(collection(db, toyType), orderBy("uploadDate"));
    try {
      const querySnapshot = await getDocs(q);
      const reversedSnapshot = querySnapshot.docs.reverse();
      const data = [];
      reversedSnapshot.forEach((doc2) => {
        if (doc2.data().userID != GetUserID()) {
          data.push({ id: doc2.id, ...doc2.data() });
        }
      });
      return data;
    } catch (error) {
      console.error("Error searching presets:", error);
      throw error;
    }
  }
  async RemoveDoc(documentPath) {
    try {
      const documentRef = doc(db, documentPath);
      await deleteDoc(documentRef);
      console.log("Document deleted successfully.");
      return true;
    } catch (error) {
      console.error("Error deleting document:", error);
      return false;
    }
  }
  // Function to sign out the user
  SignOut() {
    auth.signOut().then(() => {
      console.log("User signed out successfully");
      SetUser(void 0);
    }).catch((error) => {
      console.error("Error signing out:", error);
    });
  }
  //UUID of the preset to check for dublicates or something idk
  GenerateUniquiePresetID(presetName, presetData, toyType) {
    const userID = GetUserID();
    if (userID == void 0 || userID == "") return void 0;
    if (presetName == void 0 || presetName == "") return void 0;
    if (presetData == void 0 || presetData == "") return void 0;
    if (toyType == void 0 || toyType == "") return void 0;
    const combinedData = presetName + presetData + toyType + userID;
    const uniqueID = v5(combinedData, v5.URL);
    return uniqueID;
  }
  //Works
  SendSignInLinkToEmail(email) {
    if (typeof window == "undefined") return;
    const actionCodeSettings = {
      url: `${window.location.origin}`,
      // URL where the user will be redirected after clicking the sign-in link
      handleCodeInApp: true
      // Display the sign-in link in the app instead of opening it in a web browser
    };
    sendSignInLinkToEmail(auth, email, actionCodeSettings).then(() => {
      console.log("Sign-in link sent to:", email);
    }).catch((error) => {
      console.log("Error sending sign-in link:", error);
    });
    window.localStorage.setItem("emailForSignIn", email);
  }
  //Kinda not works
  AuthWithEmailLink() {
    console.log("REAUTH with EmailLink");
    if (typeof window == "undefined") return;
    let email = window.localStorage.getItem("emailForSignIn");
    signInWithEmailLink(auth, email, window.location.href).then((userCredential) => {
      SetUser(userCredential.user);
      return "Account created!";
    }).catch((error) => {
      return error.message;
    });
  }
}

var _tmpl$ = ["<details", "><summary", ">", "</summary><br><!--$-->", "<!--/--></details>"], _tmpl$2 = ["<input", ' type="range"', ">"], _tmpl$3 = ["<input", ' type="number"', ">"], _tmpl$4 = ["<input", " required>"], _tmpl$5 = ["<input", ">"], _tmpl$6 = ["<input", ' class="toggleInput" type="checkbox"', ">"], _tmpl$7 = ["<div", "><button", ">", "</button></div>"], _tmpl$8 = ["<div", "><button", "><div>", "</div></button></div>"], _tmpl$9 = ["<div", "><button", '><div class="flex justifyCenter"><div', '><div class="marginRight10">', "</div><div>", "</div></div></div></button></div>"], _tmpl$0 = ["<div", "><button", '><div class="flex"><div', '><div class="marginRight10">', "</div><div>", "</div></div></div></button></div>"], _tmpl$1 = ["<div", "><h3> MIDI Devices: <!--$-->", "<!--/--> </h3></div>"], _tmpl$10 = ["<div", '><h3 class="textAlignCenter">Sign In with Email</h3><div><!--$-->', "<!--/--><!--$-->", '<!--/--></div><div class="marginTop10 width100 justifyEnd"><div class="flex justifyEnd"><!--$-->', "<!--/--><!--$-->", "<!--/--></div><!--$-->", '<!--/--></div><div class="textAlignCenter marginTop10"> <!--$-->', "<!--/--> </div></div>"], _tmpl$11 = ["<div", ' class><h3 class="textAlignCenter">Create new Account</h3><!--$-->', "<!--/--><!--$-->", "<!--/--><br><!--$-->", "<!--/--><!--$-->", '<!--/--><br><div class="textAlignRight">', '</div><br><div class="justifyEnd flex">', "</div></div>"], _tmpl$12 = ["<div", '><h3 class="textAlignCenter">Change Username</h3><!--$-->', '<!--/--><div class="justifyEnd flex"><div class="textAlignRight width40 marginAuto">', "</div><!--$-->", "<!--/--></div></div>"], _tmpl$13 = ["<div", '><h3 class="textAlignCenter">Recover Account</h3><!--$-->', '<!--/--><br><div class="flex justifyEnd">', '</div><div class="textAlignRight">', "</div></div>"], _tmpl$14 = ["<div", '><div class="marginAuto">', '</div><div class="marginAuto paddingLeftRight10">', "</div><!--$-->", "<!--/--></div>"], _tmpl$15 = ["<div", "><a>", "</a></div>"], _tmpl$16 = ["<div", ">", "</div>"], _tmpl$17 = ["<div", ' class="flexContainer justifyEnd widthAuto"><!--$-->', '<!--/--><div class="marginLeft10">', "</div></div>"], _tmpl$18 = ["<div", '><div class="flexList"><div class="sliderContainer">', "</div><!--$-->", "<!--/-->Cool Text</div></div>"], _tmpl$19 = ["<div", ' class="flexContainer"><div>', "</div><!--$-->", "<!--/--></div>"], _tmpl$20 = ["<div", ' class="flexContainer"><div class="textAlignRight">', "</div><!--$-->", "<!--/--></div>"], _tmpl$21 = ["<div", ' class="flexContainer"><div class="width50">', "</div><!--$-->", "<!--/--></div>"], _tmpl$22 = ["<div", '><label for="file-input" class="file-input-button">select file(s) to upload</label><input type="file" accept=".json" multiple id="file-input" style="', '"></div>'], _tmpl$23 = ["<option", " value>No MIDI devices found</option>"], _tmpl$25 = ["<div", '><div><h3 class="textAlignCenter">', "</h3><!--$-->", '<!--/--></div><select class="dropdown"', ">", "</select></div>"], _tmpl$26 = ["<h2", ">BPM: <!--$-->", "<!--/--></h2>"], _tmpl$27 = ["<h1", ' class="noSelect">', "</h1>"], _tmpl$28 = ["<h3", ">Channel <!--$-->", "<!--/-->: <!--$-->", "<!--/--></h3>"];
const inputManager = new InputManager();
const frameManager = new CanvasManager();
const midiInputModule = new MIDIInputModule();
const toyManager = new ToyManager();
const firebaseManager = new FirebaseManager();
function DetailsFillerCenter(rawProps) {
  const props = mergeProps$1({
    summeryName: "",
    content: [],
    detailClass: "marginAuto width95",
    summeryClass: "textAlignCenter marginAuto"
  }, rawProps);
  return ssr(_tmpl$, ssrHydrationKey() + ssrAttribute("class", escape(props.detailClass, true), false), ssrAttribute("class", escape(props.summeryClass, true), false), escape(props.summeryName), escape(props.content));
}
function SliderInput(rawProps) {
  const props = mergeProps$1({
    class: "sliderInput "
  }, rawProps);
  const [value, setValue] = createSignal(props.value);
  var factor = props.factor;
  if (factor == void 0) factor = 1;
  createEffect(() => {
    setValue(props.value);
  });
  return ssr(_tmpl$2, ssrHydrationKey() + ssrAttribute("class", escape(props.class, true), false), ssrAttribute("min", escape(props.minMaxStep[0], true), false) + ssrAttribute("max", escape(props.minMaxStep[1], true), false) + ssrAttribute("step", escape(props.minMaxStep[2], true), false) + ssrAttribute("value", escape(value(), true) * escape(factor, true), false));
}
function NumberInput(rawProps) {
  const props = mergeProps$1({
    class: "numberInput"
  }, rawProps);
  const [value, setValue] = createSignal(props.value);
  var factor = props.factor;
  if (factor == void 0) factor = 1;
  createEffect(() => {
    setValue(props.value);
  });
  return ssr(_tmpl$3, ssrHydrationKey() + ssrAttribute("class", escape(props.class, true), false), ssrAttribute("min", escape(props.minMaxStep[0], true), false) + ssrAttribute("max", escape(props.minMaxStep[1], true), false) + ssrAttribute("step", escape(props.minMaxStep[2], true), false) + ssrAttribute("value", escape(value(), true) * escape(factor, true), false));
}
function TextInput(rawProps) {
  const props = mergeProps$1({
    placeholder: "Cool Placeholder",
    id: "",
    class: "textInput",
    type: "",
    required: false,
    value: ""
  }, rawProps);
  if (props.required) {
    return ssr(_tmpl$4, ssrHydrationKey() + ssrAttribute("type", escape(props.type, true), false) + ssrAttribute("class", escape(props.class, true), false) + ssrAttribute("id", escape(props.id, true), false) + ssrAttribute("placeholder", escape(props.placeholder, true), false) + ssrAttribute("value", escape(props.value, true), false));
  } else {
    return ssr(_tmpl$5, ssrHydrationKey() + ssrAttribute("type", escape(props.type, true), false) + ssrAttribute("class", escape(props.class, true), false) + ssrAttribute("id", escape(props.id, true), false) + ssrAttribute("placeholder", escape(props.placeholder, true), false) + ssrAttribute("value", escape(props.value, true), false));
  }
}
function CheckboxInput(props) {
  const [checked, setChecked] = createSignal(props.checked);
  createEffect(() => {
    setChecked(props.checked);
  });
  return ssr(_tmpl$6, ssrHydrationKey(), ssrAttribute("checked", checked(), true));
}
function Button(rawProps) {
  const props = mergeProps$1({
    class: "thinButton",
    label: "Please Set Label",
    id: ""
  }, rawProps);
  const divClass = () => props.divClass ?? props.class;
  return ssr(_tmpl$7, ssrHydrationKey() + ssrAttribute("class", escape(divClass(), true), false), ssrAttribute("class", escape(props.class, true), false) + ssrAttribute("id", escape(props.id, true), false), escape(props.label));
}
function ButtonIcon(rawProps) {
  const props = mergeProps$1({
    class: "iconButton",
    label: "",
    id: "",
    icon: "mdi-light:alert",
    iconFirst: true,
    width: "20",
    hFlip: false,
    vFlip: false
  }, rawProps);
  const divClass = () => props.divClass ?? props.class;
  if (props.label == "") {
    return ssr(_tmpl$8, ssrHydrationKey() + ssrAttribute("class", escape(divClass(), true), false), ssrAttribute("id", escape(props.id, true), false) + ssrAttribute("class", escape(props.class, true), false), escape(createComponent(Icon, {
      get icon() {
        return props.icon;
      },
      "class": "marginAuto",
      get width() {
        return props.width;
      },
      get hFlip() {
        return props.hFlip;
      },
      get vFlip() {
        return props.vFlip;
      }
    })));
  } else {
    if (props.iconFirst) {
      return ssr(_tmpl$9, ssrHydrationKey() + ssrAttribute("class", escape(divClass(), true), false), ssrAttribute("id", escape(props.id, true), false) + ssrAttribute("class", escape(props.class, true), false), ssrAttribute("class", escape(props.class, true), false), escape(createComponent(Icon, {
        get icon() {
          return props.icon;
        },
        get width() {
          return props.width;
        },
        get hFlip() {
          return props.hFlip;
        },
        get vFlip() {
          return props.vFlip;
        }
      })), escape(props.label));
    } else {
      return ssr(_tmpl$0, ssrHydrationKey() + ssrAttribute("class", escape(divClass(), true), false), ssrAttribute("id", escape(props.id, true), false) + ssrAttribute("class", escape(props.class, true), false), ssrAttribute("class", escape(props.class, true), false), escape(props.label), escape(createComponent(Icon, {
        get icon() {
          return props.icon;
        },
        get width() {
          return props.width;
        },
        get hFlip() {
          return props.hFlip;
        },
        get vFlip() {
          return props.vFlip;
        }
      })));
    }
  }
}
function MIDIDeviceReloadButton(rawProps) {
  const props = mergeProps$1({
    label: "Reload",
    class: "",
    id: "midiReloadBtn",
    width: "20",
    hFlip: false,
    vFlip: false
  }, rawProps);
  function handleClick() {
    midiInputModule.LoadMIDIDevices();
  }
  return createComponent(
    ButtonIcon,
    {
      icon: "mdi:reload",
      get label() {
        return props.label;
      },
      onClick: () => handleClick,
      get width() {
        return props.width;
      },
      get hFlip() {
        return props.hFlip;
      },
      get vFlip() {
        return props.vFlip;
      }
    }
  );
}
function AvailableMIDIDevicesUIElement(props) {
  const [midiDevices, setMidiDevices] = createSignal("");
  function UpdateSignal() {
    const devices = inputManager.GetMIDIDevices();
    const deviceElements = devices.map((device, index) => (
      // <div key={index}>{device}</div>
      [device] + " "
    ));
    setMidiDevices(deviceElements);
  }
  frameManager.SubscribeHalfFramerate(UpdateSignal);
  return ssr(_tmpl$1, ssrHydrationKey(), escape(midiDevices));
}
function EmailLoginUIElement(rawProps) {
  const props = mergeProps$1({
    class: "",
    id: "emailLogin",
    width: "30",
    hFlip: false,
    vFlip: false
  }, rawProps);
  const [infoText, setInfoText] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  function HandleLogin() {
    console.log("HANDLE email login");
    firebaseManager.EmailSignIn(email(), password());
    if (props.onLogin != void 0) {
      props.onLogin();
    }
  }
  function HandleRegister() {
    if (props.onRegister != void 0) {
      props.onRegister();
    }
  }
  function HandleForgotPassword() {
    if (props.onPasswordForgot != void 0) {
      props.onPasswordForgot();
    }
  }
  function HandleEmailChange(event2) {
    setEmail(event2.target.value);
  }
  function HandlePasswordChange(event2) {
    setPassword(event2.target.value);
  }
  return ssr(_tmpl$10, ssrHydrationKey() + ssrAttribute("id", escape(props.id, true), false), escape(createComponent(IconTextInputUIElement, {
    icon: "fontisto:email",
    required: true,
    type: "email",
    placeholder: "E-Mail",
    get onChange() {
      return HandleEmailChange(event);
    }
  })), escape(createComponent(IconTextInputUIElement, {
    icon: "bi:key",
    required: true,
    type: "password",
    placeholder: "Password",
    get onChange() {
      return HandlePasswordChange(event);
    }
  })), escape(createComponent(ClickableText, {
    "class": " textAlignRight justifyEnd paddingTop10 clickableText",
    onClick: HandleRegister,
    label: "register"
  })), escape(createComponent(Button, {
    "class": "width40 thinButton",
    label: "Login",
    onClick: HandleLogin
  })), escape(createComponent(ClickableText, {
    "class": " textAlignRight justifyEnd paddingTop10 clickableText",
    onClick: HandleForgotPassword,
    label: "Forgot password?"
  })), escape(infoText()));
}
function EmailSignUpUIElement(props) {
  const [infoText, setInfoText] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [repeatPassword, setRepeatPassword] = createSignal("");
  function SubmitCredentials() {
    HandleEmailSignUp(email(), password(), repeatPassword());
  }
  async function HandleEmailSignUp() {
    if (password() == repeatPassword() && email().includes("@")) {
      if (password().length >= 6) {
        if (username().length >= 3) {
          var result = await firebaseManager.EmailSignUp(email(), password(), username());
          if (result) {
            setInfoText("Created account!");
            if (props.onClick != void 0) {
              props.onClick();
            }
          } else setInfoText("Something went wrong...");
        } else {
          setInfoText("Please choose a longer username");
        }
      } else {
        setInfoText("Password must be at least 6 characters long");
      }
    } else {
      setInfoText("Please check your email and password");
    }
  }
  return ssr(_tmpl$11, ssrHydrationKey(), escape(createComponent(IconTextInputUIElement, {
    icon: "fontisto:email",
    placeholder: "E-Mail",
    type: "email",
    onChange: (value) => setEmail(value)
  })), escape(createComponent(IconTextInputUIElement, {
    icon: "mdi:account-outline",
    placeholder: "Username",
    type: "username",
    onChange: (value) => setUsername(value)
  })), escape(createComponent(IconTextInputUIElement, {
    icon: "bi:key-fill",
    placeholder: "Password",
    type: "password",
    onChange: (value) => setPassword(value)
  })), escape(createComponent(IconTextInputUIElement, {
    icon: "bi:key",
    placeholder: "Repeat Password",
    type: "password",
    onChange: (value) => setRepeatPassword(value)
  })), escape(infoText()), escape(createComponent(Button, {
    "class": "thinButton width50",
    label: "Submit",
    onClick: SubmitCredentials
  })));
}
function UpdateUsernameUIElement(props) {
  const [username, setUsername] = createSignal("");
  const [infoText, setInfoText] = createSignal("");
  function HandleSubmit() {
    if (username().length > 3) {
      firebaseManager.UpdateUsername(username());
    } else setInfoText("Please choose a longer username");
  }
  return ssr(_tmpl$12, ssrHydrationKey(), escape(createComponent(IconTextInputUIElement, {
    icon: "mdi:account-outline",
    placeholder: "Username",
    type: "username",
    onChange: (value) => setUsername(value)
  })), escape(infoText()), escape(createComponent(Button, {
    "class": "thinButton width50",
    label: "Change",
    onClick: HandleSubmit
  })));
}
function EmailForgotPasswordUIElement(props) {
  const [email, setEmail] = createSignal("");
  const [infoText, setInfoText] = createSignal("");
  async function HandleSubmit() {
    if (email().includes("@")) {
      var worked = await firebaseManager.SendPasswordResetEmail(email());
      if (worked == true) {
        setInfoText("Sent Recovery E-Mail");
      } else {
        setInfoText("Error: Please check your E-Mail");
      }
    } else {
      setInfoText("Please check your E-Mail");
    }
    if (props.onClick != void 0) {
      props.onClick();
    }
  }
  return ssr(_tmpl$13, ssrHydrationKey(), escape(createComponent(IconTextInputUIElement, {
    icon: "fontisto:email",
    placeholder: "E-Mail",
    onChange: (event2) => setEmail(event2)
  })), escape(createComponent(Button, {
    "class": "thinButton width50",
    label: "Submit",
    onClick: HandleSubmit
  })), escape(infoText()));
}
function IconTextInputUIElement(rawProps) {
  const props = mergeProps$1({
    class: "flex justifySpace",
    id: "textInput",
    icon: "ep:warn-triangle-filled",
    iconFirst: false,
    width: "30",
    hFlip: false,
    vFlip: false,
    required: false,
    type: "",
    placeholder: "My cool Placeholder",
    label: ""
  }, rawProps);
  function HandleValueChange(event2) {
    if (props.onChange != void 0) {
      props.onChange(event2.target.value);
    }
  }
  return ssr(_tmpl$14, ssrHydrationKey() + ssrAttribute("class", escape(props.class, true), false), escape(createComponent(Icon, {
    get icon() {
      return props.icon;
    },
    get width() {
      return props.width;
    },
    get hFlip() {
      return props.hFlip;
    },
    get vFlip() {
      return props.vFlip;
    }
  })), escape(props.label), escape(createComponent(TextInput, {
    get required() {
      return props.required;
    },
    get id() {
      return props.id;
    },
    get type() {
      return props.type;
    },
    get placeholder() {
      return props.placeholder;
    },
    onChange: HandleValueChange
  })));
}
function ClickableText(rawProps) {
  const props = mergeProps$1({
    label: "Click on me!",
    href: "",
    class: "clickableText textAlignCenter"
  }, rawProps);
  return ssr(_tmpl$15, ssrHydrationKey() + ssrAttribute("class", escape(props.class, true), false), escape(props.label));
}
function ServiceLogin(rawProps) {
  const props = mergeProps$1({
    class: "iconButton justifyCenter",
    label: "Sign in with",
    id: "myCoolService",
    icon: "zondicons:key",
    width: "30",
    hFlip: false,
    vFlip: false
  }, rawProps);
  function HandleClick() {
    if (props.onClick != void 0) {
      props.onClick();
    } else console.log("NO SERVICE FUNCTION");
  }
  return ssr(_tmpl$16, ssrHydrationKey() + ssrAttribute("id", escape(props.id, true), false), escape(createComponent(ButtonIcon, {
    get ["class"]() {
      return props.class;
    },
    get icon() {
      return props.icon;
    },
    get width() {
      return props.width;
    },
    get hFlip() {
      return props.hFlip;
    },
    get vFlip() {
      return props.vFlip;
    },
    get label() {
      return props.label;
    },
    onClick: HandleClick
  })));
}
function SelectedMIDIDeviceUIElement(props) {
  const [midiDevice, setMidiDevice] = createSignal("");
  function UpdateSignal() {
    setMidiDevice(inputManager.GetSelectedMIDIDevice());
  }
  frameManager.SubscribeHalfFramerate(UpdateSignal);
  return ssr(_tmpl$1, ssrHydrationKey(), escape(midiDevice));
}
function NumberSliderCombo(props) {
  return ssr(_tmpl$17, ssrHydrationKey(), escape(createComponent(NumberInput, {
    get factor() {
      return props.factor;
    },
    get minMaxStep() {
      return props.minMaxStep;
    },
    get value() {
      return props.value;
    },
    get onChange() {
      return props.onChange;
    }
  })), escape(createComponent(SliderInput, {
    get factor() {
      return props.factor;
    },
    get minMaxStep() {
      return props.minMaxStep;
    },
    get value() {
      return props.value;
    },
    get onChange() {
      return props.onChange;
    }
  })));
}
function NumberSliderComboVertical(props) {
  return ssr(_tmpl$18, ssrHydrationKey(), escape(createComponent(SliderInput, {
    "class": "verticalSlider",
    get factor() {
      return props.factor;
    },
    get minMaxStep() {
      return props.minMaxStep;
    },
    get value() {
      return props.value;
    },
    get onChange() {
      return props.onChange;
    }
  })), escape(createComponent(NumberInput, {
    get factor() {
      return props.factor;
    },
    get minMaxStep() {
      return props.minMaxStep;
    },
    get value() {
      return props.value;
    },
    get onChange() {
      return props.onChange;
    }
  })));
}
function CheckboxUIElement(props) {
  return ssr(_tmpl$19, ssrHydrationKey(), escape(props.name), escape(createComponent(CheckboxInput, {
    get checked() {
      return props.checked;
    },
    get onChange() {
      return props.onChange;
    }
  })));
}
function NumberSliderUIElement(rawProps) {
  const props = mergeProps$1({
    name: "define props.name pls",
    vertical: false
  }, rawProps);
  if (props.vertical) {
    return ssr(_tmpl$20, ssrHydrationKey(), escape(props.name), escape(createComponent(NumberSliderComboVertical, {
      get factor() {
        return props.factor;
      },
      get minMaxStep() {
        return props.minMaxStep;
      },
      get value() {
        return props.value;
      },
      get onChange() {
        return props.onChange;
      }
    })));
  } else {
    return ssr(_tmpl$21, ssrHydrationKey(), escape(props.name), escape(createComponent(NumberSliderCombo, {
      get factor() {
        return props.factor;
      },
      get minMaxStep() {
        return props.minMaxStep;
      },
      get value() {
        return props.value;
      },
      get onChange() {
        return props.onChange;
      }
    })));
  }
}
function JsonFileUploader(props) {
  return ssr(_tmpl$22, ssrHydrationKey(), ssrStyleProperty("display:", "none"));
}
function MIDIDropdownUIElement(rawProps) {
  const props = mergeProps$1({
    divClass: "flex",
    class: "dropdown",
    label: "MIDI Devices"
  }, rawProps);
  const [selectedOption, setSelectedOption] = createSignal("");
  const [devices, setDevices] = createSignal(["", ""]);
  const [options, setOptions] = createSignal(ssr(_tmpl$23, ssrHydrationKey()));
  return ssr(_tmpl$25, ssrHydrationKey() + ssrAttribute("class", escape(props.divClass, true), false), escape(props.label), escape(createComponent(MIDIDeviceReloadButton, {})), ssrAttribute("value", escape(selectedOption(), true), false), escape(options()));
}
function BPM(rawProps) {
  const props = mergeProps$1({
    class: "textAlignCenter"
  }, rawProps);
  const [bpm, setBPM] = createSignal(0);
  function GetBPM() {
    setBPM(inputManager.GetBPM());
  }
  frameManager.SubscribeFullFramerate(GetBPM);
  return ssr(_tmpl$26, ssrHydrationKey() + ssrAttribute("class", escape(props.class, true), false), escape(bpm));
}
function OpenSettingsButton(rawProps) {
  const props = mergeProps$1({
    width: "35",
    icon: "ic:baseline-arrow-forward-ios"
  }, rawProps);
  var panel;
  const [settingsOpen, setSettingsOpen] = createSignal(false);
  createEffect(() => {
    if (settingsOpen()) {
      HideButton();
    } else {
      ShowButton();
    }
  });
  function OpenSettings() {
    var panel2 = document.getElementById("settingsPanel");
    if (panel2 != void 0) {
      panel2.style.display = "block";
      HideButton();
    }
  }
  function HideButton() {
    var button = document.getElementById("openSettingsButton");
    if (button != void 0) {
      button.style.display = "none";
    }
  }
  function ShowButton() {
    var button = document.getElementById("openSettingsButton");
    if (button != void 0) {
      button.style.display = "block";
    }
  }
  function CheckAllEmpty(toys) {
    var toys = toyManager.GetToys();
    var allEmpty = true;
    if (toys != void 0) {
      toys.forEach((element) => {
        if (!element.toyType.includes("Empty")) {
          allEmpty = false;
          return;
        }
      });
      if (allEmpty) return true;
      else return false;
    }
  }
  if (typeof window !== "undefined") {
    document.addEventListener("mousemove", (event2) => {
      if (panel != void 0) {
        if (panel.style.display != "block") {
          if (CheckAllEmpty()) {
            ShowButton();
          } else {
            if (event2.clientY < window.innerHeight / 4) {
              if (event2.clientX < window.innerHeight / 4) {
                ShowButton();
              } else HideButton();
            } else HideButton();
          }
        }
      }
    });
  }
  function GetPanel() {
    if (typeof window !== "undefined") {
      panel = document.getElementById("settingsPanel");
    }
  }
  frameManager.SubscribeOneFPS(GetPanel);
  return createComponent(ButtonIcon, {
    id: "openSettingsButton",
    get icon() {
      return props.icon;
    },
    get width() {
      return props.width;
    },
    onClick: () => OpenSettings()
  });
}
function StartText(rawProps) {
  const props = mergeProps$1({
    label: "No MIDI toy loaded, add a toy to start",
    id: "startText"
  }, rawProps);
  const [text, setText] = createSignal(props.label);
  function CheckAllEmpty() {
    var toys = toyManager.GetToys();
    var allEmpty = true;
    if (toys != void 0) {
      toys.forEach((element) => {
        if (!element.toyType.includes("Empty")) {
          allEmpty = false;
          return;
        }
      });
      if (allEmpty) return true;
      else return false;
    }
  }
  function TextSetter() {
    if (CheckAllEmpty()) setText(props.label);
    else setText("");
  }
  frameManager.SubscribeOneFPS(TextSetter);
  return ssr(_tmpl$27, ssrHydrationKey() + ssrAttribute("id", escape(props.id, true), false), escape(text()));
}
function ChannelObserverUIElement(rawProps) {
  const props = mergeProps$1({
    channel: 1,
    class: "width20"
  }, rawProps);
  const [holdingKeys, setHoldingKeys] = createSignal([]);
  function UpdateHoldingKeys() {
    setHoldingKeys(inputManager.GetHoldingKeys(props.channel).toString());
  }
  frameManager.SubscribeHalfFramerate(UpdateHoldingKeys);
  return ssr(_tmpl$28, ssrHydrationKey() + ssrAttribute("class", escape(props.class, true), false), escape(props.channel), escape(holdingKeys));
}

export { AvailableMIDIDevicesUIElement as A, BPM as B, ChannelObserverUIElement as C, DetailsFillerCenter as D, EmailSignUpUIElement as E, FirebaseManager as F, GetUser as G, JsonFileUploader as J, KeyboardInputModule as K, MIDIDeviceReloadButton as M, NumberSliderUIElement as N, OpenSettingsButton as O, SelectedMIDIDeviceUIElement as S, ToyManager as T, UpdateUsernameUIElement as U, MIDIDropdownUIElement as a, CanvasManager as b, Button as c, TextInput as d, ButtonIcon as e, CheckboxUIElement as f, MIDIDataTable as g, EmailForgotPasswordUIElement as h, ServiceLogin as i, EmailLoginUIElement as j, StartText as k };
