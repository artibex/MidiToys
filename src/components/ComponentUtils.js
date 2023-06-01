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
        // case 3: tManager.CreateSquareKeyboard(channel, numberOfKeys, startKey); break;
        default: toyManager.CreateEmptyToy(channel);      break;
    }
    return toyManager.GetToy(channel);
}