//Manages and updates all toys
export class ToyManager {
    channel1Toy; channel2Toy; channel3Toy; channel4Toy;
    channel5Toy; channel6Toy; channel7Toy; channel8Toy;
    channel9Toy; channel10Toy; channel11Toy; channel12Toy;
    channel13Toy; channel14Toy; channel15Toy; channel16Toy;
    
    constructor() {

    }

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