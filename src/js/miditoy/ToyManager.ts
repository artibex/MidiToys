//Manages and updates all toys
import { SquareKeyboard } from "./SquareKeyboard";
import { MusicBalls } from "./MusicBalls";
import { DrumMaschin } from "./DrumMaschin";

export class ToyManager {
    private static instance: ToyManager;
    targetCanvas: HTMLCanvasElement;

    //Channel toys
    channel1Toy; channel2Toy; channel3Toy; channel4Toy;
    channel5Toy; channel6Toy; channel7Toy; channel8Toy;
    channel9Toy; channel10Toy; channel11Toy; channel12Toy;
    channel13Toy; channel14Toy; channel15Toy; channel16Toy;
    
    constructor() {
        console.log("CREATED ToyManager");
    }

    SetTargetCanvas(canvas: HTMLCanvasElement) {
        this.targetCanvas = canvas;
    }

    //Should always return the one and only toy manager
    static GetInstance(): ToyManager {
        if (!ToyManager.instance) {
            ToyManager.instance = new ToyManager();
        }
        return ToyManager.instance;
    }

    SetupMusicBalls(channel: number, numberofKeys: number, startNote: number) {
        let toy = this.GetToy(channel);
        toy = new MusicBalls(this.targetCanvas, channel, numberofKeys, startNote);
        this.SetToy(channel, toy);
    }

    
    UpdateToys() {
        for (let i = 1; i <= 16; i++) {
          let toy = this.GetToy(i);
          if (toy !== undefined) {
              toy.UpdateKeyboard();
          }
        }
    }

    //Gets the toy by channel number
    GetToy(channel: number) {
        switch(channel) {
          case 1: return this.channel1Toy;
          case 2: return this.channel2Toy;
          case 3: return this.channel3Toy;
          case 4: return this.channel4Toy;
          case 5: return this.channel5Toy;
          case 6: return this.channel6Toy;
          case 7: return this.channel7Toy;
          case 8: return this.channel8Toy;
          case 9: return this.channel9Toy;
          case 10: return this.channel10Toy;
          case 11: return this.channel11Toy;
          case 12: return this.channel12Toy;
          case 13: return this.channel13Toy;
          case 14: return this.channel14Toy;
          case 15: return this.channel15Toy;
          case 16: return this.channel16Toy;
        }
    }
    SetToy(channel: number, toy: any) {
        switch(channel) {
            case 1: this.channel1Toy = toy; break;
            case 2: this.channel2Toy = toy; break;
            case 3: this.channel3Toy = toy; break;
            case 4: this.channel4Toy = toy; break;
            case 5: this.channel5Toy = toy; break;
            case 6: this.channel6Toy = toy; break;
            case 7: this.channel7Toy = toy; break;
            case 8: this.channel8Toy = toy; break;
            case 9: this.channel9Toy = toy; break;
            case 10: this.channel10Toy = toy; break;
            case 11: this.channel11Toy = toy; break;
            case 12: this.channel12Toy = toy; break;
            case 13: this.channel13Toy = toy; break;
            case 14: this.channel14Toy = toy; break;
            case 15: this.channel15Toy = toy; break;
            case 16: this.channel16Toy = toy; break;
        }
    }

    //Gets toy type by channel number
    GetToyType(channel: number) {
        switch (channel) {
            case 1: return this.channel1Toy.constructor.name;
            case 2: return this.channel2Toy.constructor.name;
            case 3: return this.channel3Toy.constructor.name;
            case 4: return this.channel4Toy.constructor.name;
            case 5: return this.channel5Toy.constructor.name;
            case 6: return this.channel6Toy.constructor.name;
            case 7: return this.channel7Toy.constructor.name;
            case 8: return this.channel8Toy.constructor.name;
            case 9: return this.channel9Toy.constructor.name;
            case 10: return this.channel10Toy.constructor.name;
            case 11: return this.channel11Toy.constructor.name;
            case 12: return this.channel12Toy.constructor.name;
            case 13: return this.channel13Toy.constructor.name;
            case 14: return this.channel14Toy.constructor.name;
            case 15: return this.channel15Toy.constructor.name;
            case 16: return this.channel16Toy.constructor.name;
            default: return "Invalid channel number";
        }
    }
}