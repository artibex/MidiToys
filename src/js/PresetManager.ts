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
    
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
    
        if (key.includes(searchStr)) {
          const item = localStorage.getItem(key);
          matchingItems.push({ key, item });
        }
      }
    
      return matchingItems;
  }

  DeletePreset(item) {
    const key = item.key;
    localStorage.removeItem(key);
    console.log("DELETED " + key);
  }

  SaveNewPresetToy(presetName: string, toy: any) {
    if(toy != undefined) {
      const toyType = toy.toyName;
      const jsonObj = toy.ToJSON();
      const saveName = presetName + "." + toyType;
      localStorage.setItem(saveName, JSON.stringify(jsonObj));
      console.log("SAVED to local storage new Preset:");
    }
  }

  SaveNewPresetUpload(saveName: string, jsonObj: string) {
    if(saveName && jsonObj != undefined) {
      const saveNameNoExtension = saveName.replace(/\.json$/, "");
      localStorage.setItem(saveNameNoExtension, jsonObj);
    }
  }
}