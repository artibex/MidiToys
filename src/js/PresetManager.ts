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
  async FilterMyPresetsOnline(toyType: string) {
    toyType = toyType.toLowerCase().replace(/\s/g, '');

    var search = "toys/" + toyType + "/" + client.GetUserID();
    var data = await firebaseManager.ReadCollectionData(search);
    return data;
  }

  async SearchPresetsOnline(toyType: string, searchStr: string) {
    toyType = toyType.toLowerCase().replace(/\s/g, '');
    console.log("SearchPresetsOnline");
    var data = await firebaseManager.SearchPresetsByPresetName(toyType, searchStr);
    var filteredData = [];

    data.forEach((result) => {
      if(result.data.presetData.toyType == toyType) {
        filteredData.push(result);
      }
    })
    return filteredData;
  }

  DeletePresetLocal(item) {
    const key = item.key;
    // console.log("DELETE " + key);
    localStorage.removeItem(key);
  }

  async DeletePresetOnline(id: string, data) {
    // console.log("Full data = " + data);
    var jsonData = data;

    // console.log("JSON data =" + jsonData);
    
    if(jsonData == undefined) {
      // console.log("JSON is undefined");
      return;
    }
    var toyType = jsonData.toyType.toLowerCase().replace(/\s/g, '');


    const deleteStr = "users/" + client.GetUserID() + "/" + toyType + "/" + id;
    
    //console.log(toyType);
    // console.log(deleteStr);

    var b = await firebaseManager.RemoveDoc(deleteStr);
    return b;
  }

  //Returns a valid JSO object or undiefined
  GetValidJSON(data) {
    // console.log("not valid JSON = " + data);
    
    try {
      const jsonObj = JSON.parse(data);
      return jsonObj;
    } catch (error) {
      try {
        const cleanedData = data.replace(/\\(.)/g, "$1"); // Remove backslashes
        const jsonObj = JSON.parse(cleanedData);
        return jsonObj;
      } catch (error) {}
      try {
        const jsonObj = JSON.parse(data.data);
        return jsonObj;
      } catch {}
    
    return data;
    }
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
        // console.log("ERROR: JSON is null");
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

  async SaveExistingPresetOnline(presetName: string, presetData) {
    if(presetName.length < 3) return false;
    if(presetData == undefined || presetData == "") return false;
    
    var jsonObj = this.GetValidJSON(presetData);
    if(jsonObj == undefined) return false;
    if(jsonObj.toyType == undefined || jsonObj.toyType == "") return false;
    
    var b = await firebaseManager.UploadNewPreset(presetName, presetData, jsonObj.toyType, true);
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