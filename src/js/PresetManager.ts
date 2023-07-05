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

  //Filter by toy type presets from the local storage
  FilterPresetsLocal(toyType: string) {
      const matchingItemsLocal = [];
      var search = toyType.toLowerCase().replace(/\s/g, '');

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
    
        if (key.includes(search)) {
          const item = localStorage.getItem(key);
          matchingItemsLocal.push({ key, item });
        }
      }
    
      // console.log(matchingItems);
      return matchingItemsLocal;
  }

  //Filter by toy type presets online
  async FilterPresetsOnline(toyType: string) {
    toyType = toyType.toLowerCase().replace(/\s/g, '');

    var search = "users/" + client.GetUserID() + "/" + toyType;
    var data = await firebaseManager.ReadCollectionData(search);
    return data;
  }

  DeletePresetLocal(item) {
    const key = item.key;
    // console.log("DELETE " + key);
    localStorage.removeItem(key);
  }

  async DeletePresetOnline(item) {
    console.log(item);
    // console.log(item.data);
    if(item == undefined) {
      console.log("DELETE ABORTED, item is undefined");
      return false;
    }
    var parsedJSON;
    try {
      parsedJSON = JSON.parse(item.data.presetData);
    } catch {
      parsedJSON = item.data.presetData;
    }
    
    var toyType = parsedJSON.toyType.toLowerCase().replace(/\s/g, '');

    const deleteStr = "users/" + client.GetUserID() + "/" + toyType + "/" + item.id
    
    //console.log(toyType);
    // console.log(parsedJSON);
    // console.log(deleteStr);

    var b = await firebaseManager.RemoveDoc(deleteStr);
    return b;
  }

  //Delete EVERYTHING out of local storage
  ClearLocalStorage() {
    localStorage.clear();
  }

  SaveNewPresetLocal(presetName: string, toy: any) {
    if(toy != undefined && toy != null) {
      // const toyType = toy.toyType;
      const toyType = toy.toyType.toLowerCase().replace(/\s/g, '');
      const jsonObj = JSON.stringify(toy.ToJSON());
      // presetName = presetName.toLowerCase().replace(/\s/g, '');
      if(jsonObj == null || jsonObj == undefined) {
        console.log("ERROR: JSON is null");
        return;
      }

      const saveName = presetName + "." + toyType;
      localStorage.setItem(saveName, jsonObj);
      // console.log("SAVED to local storage new Preset:");
    }
  }

  SaveNewPresetOnline(presetName: string, toy: any) {
    if(toy == undefined) return;
    const toyType = toy.toyType.toLowerCase().replace(/\s/g, '');
    const jsonObj = toy.ToJSON();
    
    firebaseManager.UploadNewPreset(presetName, jsonObj, toyType, true)
  }

  async SaveExistingPresetOnline(presetName: string, jsonObj) {
    if(presetName.length < 3) return false;
    if(jsonObj == undefined || jsonObj == "") return false;
    
    var parsed = JSON.parse(jsonObj);
    if(parsed == undefined) return false;
    if(parsed.toyType == undefined || parsed.toyType == "") return false;
    
    var b = await firebaseManager.UploadNewPreset(presetName, jsonObj, parsed.toyType, true);
    if(b) return true;
    else return false;
  }

  SaveNewPresetUploadLocal(saveName: string, jsonObj: string) {
    if(saveName && jsonObj != undefined) {
      const saveNameNoExtension = saveName.toLowerCase().replace(/\.json$/, "");
      localStorage.setItem(saveNameNoExtension, jsonObj);
    }
  }
}