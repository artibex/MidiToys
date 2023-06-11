import { ToyManager } from "@toymanager";

const toyManager = new ToyManager();

export function InitToy(channel, toy, ToyChanged) {
    toy = toyManager.GetToy(channel);
    // toy.UnsubscribeFromToyChangedEvent(ToyChanged);
    if(toy != undefined) {
        toy.SubscribeToToyChangedEvent(ToyChanged);
        return toy;
    }
}

export function UnsubscribeEvent(targetFunction) {
    toy.UnsubscribeFromToyChangedEvent(targetFunction);
}

export function CreateToy(channel, type) {
    //If toyType changed, create toy, otherwise, just udpate
    switch(type) {
        case 0: toyManager.CreateEmptyToy(channel);       break;
        case 1: toyManager.CreateGraviBoard(channel);     break;
        case 2: toyManager.CreatePolyDrum(channel);       break;
        case 3: toyManager.CreateMIDIMatrix(channel);     break;
        // case 3: tManager.CreateSquareKeyboard(channel, numberOfKeys, startKey); break;
        default: toyManager.CreateEmptyToy(channel);      break;
    }
    return toyManager.GetToy(channel);
}


export function ExtractRGBAColor(colorString) {
    const rgbaRegex = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/i;
    const matches = colorString.match(rgbaRegex);
  
    if (matches) {
      const r = parseInt(matches[1], 10);
      const g = parseInt(matches[2], 10);
      const b = parseInt(matches[3], 10);
      const a = matches[4] ? parseFloat(matches[4]) : 1;
  
      return { r, g, b, a };
    }
  
    // Return default color if extraction fails
    return { r: 0, g: 0, b: 0, a: 0 };
  }