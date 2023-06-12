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

//Takes a string and converts it into a RGBA interface object
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