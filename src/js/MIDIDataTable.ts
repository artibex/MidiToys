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
      
    static MIDINoteToString(note: number) {
        const octave = Math.floor(note / 12) - 1;
        const noteName = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'][note % 12];
        return `${noteName}${octave}`;
      }
      
    //Takes a note converted into string and returns the correct RegEx
    static MIDIStringNoteToRegExp(stringNote: string): RegExp {
      const rawNote = stringNote.replace(/d/g, '').toUpperCase();
      switch (rawNote) {
          case 'C': return /C(?!#)/i;
          case 'C#': return /C#/i;
          case 'D': return /D(?!#)/i;
          case 'D#': return /D#/i;
          case 'E': return /E/i;
          case 'F': return /F(?!#)/i;
          case 'F#': return /F#/i;
          case 'G': return /G(?!#)/i;
          case 'G#': return /G#/i;
          case 'A': return /A(?!#)/i;
          case 'A#': return /A#/i;
          case 'B': return /B/i;
          default: return /./;
      }
  }
  }