export class MIDIDataTable {
    static MIDICommandToString(command) {
        if (command === 248) {
          return "";
        }
      
        const commandType = command & 0xf0;
        const channel = command & 0x0f;
      
        switch (commandType) {
          case 0x80:
            return `NoteOff CH: ${channel + 1}`;
          case 0x90:
            return `NoteOn CH: ${channel + 1}`;
          case 0xfa:
            return "Start";
          case 0xfb:
            return "Continue";
          case 0xfc:
            return "Stop";
          default:
            return `Unknown Command ${command}`;
        }
      }
      
    static MIDINoteToString(note) {
        const octave = Math.floor(note / 12) - 1;
        const noteName = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'][note % 12];
        return `${noteName}${octave}`;
      }
      
    //Takes a note converted into string and returns the correct RegEx
    static MIDIStringNoteToRegExp(stringNote) {
        let rawNote = stringNote.replace(/[0-9]/g, ''); //Remove all numbers
        rawNote = rawNote.toUpperCase(); //Convert it to Uppercase for switch statement

        //Regular Note
        let cRegEx = new RegExp("C" + "(?!#)", "i");
        let dRegEx = new RegExp("D" + "(?!#)", "i");
        let eRegEx = new RegExp("E", "i");
        let fRegEx = new RegExp("F" + "(?!#)", "i");
        let gRegEx = new RegExp("G" + "(?!#)", "i");
        let aRegEx = new RegExp("A" + "(?!#)", "i");
        let bRegEx = new RegExp("B", "i");
        //Halftone Note
        let cisRegEx = new RegExp("C#", "i");
        let disRegEx = new RegExp("D#", "i");
        let fisRegEx = new RegExp("F#", "i");
        let gisRegEx = new RegExp("G#", "i");
        let aisRegEx = new RegExp("A#", "i");
        
        //SWitch statements, return the correct regular expression
        //Regular Note Check
        if(!rawNote.includes("#")) {
            switch(rawNote) {
                case "C": return cRegEx as RegExp;
                case "D": return dRegEx as RegExp;
                case "E": return eRegEx as RegExp;
                case "F": return fRegEx as RegExp;
                case "G": return gRegEx as RegExp;
                case "A": return aRegEx as RegExp;
                case "B": return bRegEx as RegExp;
            }
        } 
        //Halftone Check
        else {
            switch(rawNote) {
                case "C#": return cisRegEx as RegExp;
                case "D#": return disRegEx as RegExp;
                case "F#": return fisRegEx as RegExp;
                case "G#": return gisRegEx as RegExp;
                case "A#": return aisRegEx as RegExp;
            }
        }
    }
}