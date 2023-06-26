import * as client from "@firebaseClient";
import { FirebaseManager } from "@firebaseManager";
import { ToyManager } from "@miditoy/ToyManager";

const firebaseManager = new FirebaseManager();

//Manages your presets for toys
export class PresetManager{
  static instance: PresetManager;

  constructor() {
    if (PresetManager.instance) {
      return PresetManager.instance;
      }
      PresetManager.instance = this;
  }

  FilterPresetsByType(searchStr: string) {
      const matchingItems = [];
      var search = searchStr.toLowerCase().replace(/\s/g, '');

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i).toLowerCase().replace(/\s/g, '');;
    
        if (key.includes(search)) {
          const item = localStorage.getItem(key);
          matchingItems.push({ key, item });
        }
      }
    
      console.log(matchingItems);
      return matchingItems;
  }

  DeletePreset(item) {
    const key = item.key;
    console.log("DELETE " + key);
    localStorage.removeItem(key);
  }

  //Delete EVERYTHING out of local storage
  DeleteAllPresets() {
    localStorage.clear();
  }

  SaveNewPresetToyLocal(presetName: string, toy: any) {
    if(toy != undefined) {
      // const toyType = toy.toyName;
      const toyType = toy.toyName.toLowerCase().replace(/\s/g, '');
      const jsonObj = toy.ToJSON();
      const saveName = presetName + "." + toyType;
      localStorage.setItem(saveName, JSON.stringify(jsonObj));
      console.log("SAVED to local storage new Preset:");
    }
  }

  SaveNewPresetToyOnline(presetName: string, toy: any) {
    if(toy != undefined) {
      const toyType = toy.toyName.toLowerCase().replace(/\s/g, '');
      const jsonObj = toy.ToJSON();

    }
  }

  SaveNewPresetUpload(saveName: string, jsonObj: string) {
    if(saveName && jsonObj != undefined) {
      const saveNameNoExtension = saveName.toLowerCase().replace(/\.json$/, "");
      localStorage.setItem(saveNameNoExtension, jsonObj);
    }
  }
}