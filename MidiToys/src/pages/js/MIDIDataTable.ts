export class MIDIDataTable {
    static MIDICommandToString(command) {
        let channel = 1;

        //If NOT Timing Clock command, make debug output
        //if(command != 248) console.log("MIDI command =" + command );

        if(command < 144) { //Calculate NoteOff Channel
            channel = 1 + command - 128;
            command = 128;
        }
        else if(command < 160) { //Calculate NoteOn Channel
            channel = 1 + command - 144;
            command = 144;
        }

        switch(command) {
            case 128:
                return "NoteOff CH: " + channel;
            case 144:
                return "NoteOn CH: " + channel;
            case 250:
                return "Start";   
            case 248:
                return "";
                // return "Timing Clock"; 
            case 251:
                return "Continue";    
            case 252:
                return "Stop";    

        }
        var defaultReturn = "Unknown Command " + command;
        return defaultReturn;
    }

    static MIDINoteToString(note) {
        //C notes
        switch(note) {
            case 24: return "C1";
            case 36: return "C2";
            case 48: return "C3";
            case 60: return "C4";
            case 72: return "C5";
            case 84: return "C6";
            case 96: return "C7";
            case 108: return "C8";
            case 120: return "C9";
        }
        //C# Notes
        switch(note) { 
            case 25: return "C#1"; 
            case 37: return "C#2"; 
            case 49: return "C#3"; 
            case 61: return "C#4"; 
            case 73: return "C#5"; 
            case 85: return "C#6"; 
            case 97: return "C#7"; 
            case 109: return "C#8"; 
            case 121: return "C#9"; 
        }
        //D notes
        switch(note) { 
            case 26: return "D1"; 
            case 38: return "D2"; 
            case 50: return "D3"; 
            case 62: return "D4"; 
            case 74: return "D5"; 
            case 86: return "D6"; 
            case 98: return "D7"; 
            case 110: return "D8"; 
            case 122: return "D9"; 
        }
        //D# Notes
        switch(note) { 
            case 27: return "D#1"; 
            case 39: return "D#2"; 
            case 51: return "D#3"; 
            case 63: return "D#4"; 
            case 75: return "D#5"; 
            case 87: return "D#6"; 
            case 99: return "D#7"; 
            case 111: return "D#8"; 
            case 123: return "D#9"; 
        }
        //E notes 
        switch(note) { 
            case 28: return "E1"; 
            case 40: return "E2"; 
            case 52: return "E3"; 
            case 64: return "E4"; 
            case 76: return "E5"; 
            case 88: return "E6"; 
            case 100: return "E7"; 
            case 112: return "E8"; 
            case 124: return "E9"; 
        }
        //F notes 
        switch(note) { 
            case 29: return "F1"; 
            case 41: return "F2"; 
            case 53: return "F3"; 
            case 65: return "F4"; 
            case 77: return "F5"; 
            case 89: return "F6"; 
            case 101: return "F7"; 
            case 113: return "F8"; 
            case 125: return "F9"; 
        }
        //F# notes 
        switch(note) { 
            case 30: return "F#1"; 
            case 42: return "F#2"; 
            case 54: return "F#3"; 
            case 66: return "F#4"; 
            case 78: return "F#5"; 
            case 90: return "F#6"; 
            case 102: return "F#7"; 
            case 114: return "F#8"; 
            case 126: return "F#9"; 
        }
        //G notes 
        switch(note) { 
            case 31: return "G1"; 
            case 43: return "G2"; 
            case 55: return "G3"; 
            case 67: return "G4"; 
            case 79: return "G5"; 
            case 91: return "G6"; 
            case 103: return "G7"; 
            case 115: return "G8"; 
            case 127: return "G9"; 
        }
        //G# notes 
        switch(note) { 
            case 32: return "G#1"; 
            case 44: return "G#2"; 
            case 56: return "G#3"; 
            case 68: return "G#4"; 
            case 80: return "G#5"; 
            case 92: return "G#6"; 
            case 104: return "G#7"; 
            case 116: return "G#8"; 
        }
        //A notes 
        switch(note) { 
            case 33: return "A1"; 
            case 45: return "A2"; 
            case 57: return "A3"; 
            case 69: return "A4"; 
            case 81: return "A5"; 
            case 93: return "A6"; 
            case 105: return "A7"; 
            case 117: return "A8"; 
        }
        //A# notes 
        switch(note) { 
            case 34: return "A#1"; 
            case 46: return "A#2"; 
            case 58: return "A#3"; 
            case 70: return "A#4"; 
            case 82: return "A#5"; 
            case 94: return "A#6"; 
            case 106: return "A#7"; 
            case 118: return "A#8"; 
        }
        //B notes 
        switch(note) { 
            case 35: return "B1"; 
            case 47: return "B2"; 
            case 59: return "B3"; 
            case 71: return "B4"; 
            case 83: return "B5"; 
            case 95: return "B6"; 
            case 107: return "B7"; 
            case 119: return "B8"; 
        }
        return note;
    }
}