import { c as createComponent$1, e as addAttribute, r as renderHead, a as renderScript, b as renderComponent, d as renderTemplate } from '../chunks/astro/server_DtEHTjCW.mjs';
import 'piccolore';
import 'html-escaper';
import { T as ToyManager, F as FirebaseManager, b as CanvasManager, G as GetUser, D as DetailsFillerCenter, c as Button, d as TextInput, J as JsonFileUploader, e as ButtonIcon, N as NumberSliderUIElement, f as CheckboxUIElement, g as MIDIDataTable, B as BPM, a as MIDIDropdownUIElement, U as UpdateUsernameUIElement, E as EmailSignUpUIElement, h as EmailForgotPasswordUIElement, i as ServiceLogin, j as EmailLoginUIElement, K as KeyboardInputModule, k as StartText, O as OpenSettingsButton } from '../chunks/UIElements_CQERONV_.mjs';
/* empty css                                 */
import { createComponent, ssr, ssrHydrationKey, escape } from 'solid-js/web';
import { createSignal, createEffect } from 'solid-js';
export { renderers } from '../renderers.mjs';

const toyManager$2 = new ToyManager();
function InitToy(channel, toy2, ToyChanged) {
  toy2 = toyManager$2.GetToy(channel);
  if (toy2 != void 0) {
    toy2.SubscribeToToyChangedEvent(ToyChanged);
    return toy2;
  }
}
function ExtractRGBAColor(colorString) {
  const rgbaRegex = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/i;
  const matches = colorString.match(rgbaRegex);
  if (matches) {
    const r = parseInt(matches[1], 10);
    const g = parseInt(matches[2], 10);
    const b = parseInt(matches[3], 10);
    const a = matches[4] ? parseFloat(matches[4]) : 1;
    return { r, g, b, a };
  }
  return { r: 0, g: 0, b: 0, a: 0 };
}
function GetEnv() {
  return "production";
}
function GetPublicRef() {
  const mode = GetEnv();
  var publicRef = "";
  switch (mode) {
    case "development":
      break;
    case "production":
      publicRef = "/MidiToys";
      break;
  }
  return publicRef;
}
function GetPageTitle() {
  const mode = GetEnv();
  var title = "";
  switch (mode) {
    case "development":
      title = "MIDI Toys - Development";
      break;
    case "production":
      title = "MIDI Toys";
      break;
    default:
      title = "What is this Env??";
      break;
  }
  return title;
}

const firebaseManager$1 = new FirebaseManager();
class PresetManager {
  constructor() {
    if (PresetManager.instance) {
      return PresetManager.instance;
    }
    PresetManager.instance = this;
  }
  //Filter by toy type presets from the local storage
  FilterPresetsLocal(toyType) {
    const matchingItemsLocal = [];
    var search = toyType.toLowerCase().replace(/\s/g, "");
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.includes(search)) {
        const item = localStorage.getItem(key);
        matchingItemsLocal.push({ key, item });
      }
    }
    return matchingItemsLocal;
  }
  //Filter by toy type presets online
  async FilterMyPresetsOnline(toyType) {
    toyType = toyType.toLowerCase().replace(/\s/g, "");
    var data = await firebaseManager$1.ReadMyPresets(toyType);
    return data;
  }
  async SearchPresetsOnline(toyType, searchStr) {
    toyType = toyType.toLowerCase().replace(/\s/g, "");
    console.log("SearchPresetsOnline");
    var data = await firebaseManager$1.SearchPresetsByPresetName(
      toyType,
      searchStr
    );
    return data;
  }
  async GetNewesPresets(toyType) {
    toyType = toyType.toLowerCase().replace(/\s/g, "");
    var data = await firebaseManager$1.GetNewesPresets(toyType);
    return data;
  }
  DeletePresetLocal(item) {
    const key = item.key;
    localStorage.removeItem(key);
  }
  async DeletePresetOnline(id, data) {
    var jsonData = data;
    if (jsonData == void 0) {
      return;
    }
    var toyType = jsonData.toyType.toLowerCase().replace(/\s/g, "");
    const deleteStr = toyType + "/" + id;
    var b = await firebaseManager$1.RemoveDoc(deleteStr);
    return b;
  }
  //Returns a valid JSO object or undiefined
  GetValidJSON(data) {
    try {
      const jsonObj = JSON.parse(data);
      return jsonObj;
    } catch (error) {
      try {
        const cleanedData = data.replace(/\\(.)/g, "$1");
        const jsonObj = JSON.parse(cleanedData);
        return jsonObj;
      } catch (error2) {
      }
      try {
        const jsonObj = JSON.parse(data.data);
        return jsonObj;
      } catch {
      }
      return data;
    }
  }
  //Delete EVERYTHING out of local storage
  ClearLocalStorage() {
    localStorage.clear();
  }
  SaveNewPresetLocal(presetName, toy) {
    if (toy != void 0 && toy != null) {
      const toyType = toy.toyType.toLowerCase().replace(/\s/g, "");
      const jsonObj = JSON.stringify(toy.ToJSON());
      if (jsonObj == null || jsonObj == void 0) {
        return;
      }
      const saveName = presetName + "." + toyType;
      localStorage.setItem(saveName, jsonObj);
    }
  }
  SaveNewPresetOnline(presetName, toy) {
    console.log("SaveNewPresetOnline");
    if (toy == void 0) {
      console.log("toy is undefined");
      return;
    }
    const toyType = toy.toyType.toLowerCase().replace(/\s/g, "");
    const jsonObj = toy.ToJSON();
    firebaseManager$1.UploadNewPreset(presetName, jsonObj, toyType, true);
  }
  async SaveExistingPresetOnline(presetName, presetData) {
    if (presetName.length < 3) return false;
    if (presetData == void 0 || presetData == "") return false;
    var jsonObj = this.GetValidJSON(presetData);
    if (jsonObj == void 0) return false;
    if (jsonObj.toyType == void 0 || jsonObj.toyType == "") return false;
    var b = await firebaseManager$1.UploadNewPreset(
      presetName,
      presetData,
      jsonObj.toyType,
      true
    );
    if (b) return true;
    else return false;
  }
  SaveNewPresetUploadLocal(saveName, jsonObj) {
    if (saveName && jsonObj != void 0) {
      const saveNameNoExtension = saveName.toLowerCase().replace(/\.json$/, "");
      localStorage.setItem(saveNameNoExtension, jsonObj);
    }
  }
}

var _tmpl$$9 = ["<div", ">", "</div>"], _tmpl$2$5 = ["<div", ' class="flexContainer"><div class="width60 justifyStart marginRight20">', '</div><div class="flex justifyEnd width20 marginTopBottomAuto"><!--$-->', "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--></div></div>"], _tmpl$3$5 = ["<div", ' class="flexContainer"><div class="width60 justifyStart marginRight20">', '</div><div class="flex justifyEnd width20 marginTopBottomAuto"><!--$-->', "<!--/--><!--$-->", "<!--/--></div></div>"], _tmpl$4$4 = ["<div", ' class="flexContainer"><div class="width800 justifyStart marginRight20">', '</div><div class="flex justifyEnd width10 marginTopBottomAuto">', "</div></div>"], _tmpl$5$3 = ["<div", '><div class="flex"><div class="width70"><div class="flexList"><div class="marginBottom5">Save new preset</div><!--$-->', "<!--/--></div></div><!--$-->", '<!--/--></div><h3 class="textAlignCenter">Online Presets</h3><!--$-->', "<!--/--><br><!--$-->", '<!--/--><br><div class="justifyCenter">', "</div></div>"], _tmpl$6$3 = ["<div", '><div class="flex justifySpace marginAuto"><!--$-->', "<!--/--><!--$-->", "<!--/--></div><!--$-->", "<!--/--></div>"], _tmpl$7$1 = ["<div", '><div class="flex justifyCenter"><h3 class="marginTopBottomAuto">Get the newest created Presets</h3><div class="width40">', "</div></div><!--$-->", "<!--/--></div>"], _tmpl$8$1 = ["<div", '><div class="flex"><div class="width70"><div class="flexList"><div class="marginBottom5">Save new preset</div><!--$-->', "<!--/--></div></div><!--$-->", "<!--/--></div><br><!--$-->", '<!--/--><br><div class="justifyCenter">', "</div></div>"], _tmpl$9$1 = ["<div", '><div class="flex justifyCenter"><!--$-->', "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--></div><br><!--$-->", "<!--/--></div>"];
var presetManager$1 = new PresetManager();
const canvasManager$8 = new CanvasManager();
function SetupContainer$9(props) {
  var channel = props.channel;
  var toy;
  const [myOnlinePresets, setMyOnlinePresets] = createSignal([]);
  const [searchResult, setSearchResult] = createSignal([]);
  const [newestPresets, setNewestPresets] = createSignal([]);
  const [userLoggedIn, setUserLoggedIn] = createSignal(false);
  const [presetName, setPresetName] = createSignal("");
  const [matchingItems, setMetchingItems] = createSignal([]);
  const [useEffect, setUseEffect] = createSignal(true);
  const [onlineFunctionSelection, setOnlineFunctionSelection] = createSignal(0);
  const [presetSearchString, setPresetSearchString] = createSignal("");
  const [channelButtonClass, setChannelButtonClass] = createSignal(Array.from({
    length: 3
  }, () => "thinButton"));
  function GetMatchingPresetsLocal() {
    setMetchingItems(presetManager$1.FilterPresetsLocal(toy.toyType));
  }
  async function GetMyPresetsOnline() {
    if (toy != void 0 && presetManager$1 != void 0) {
      var data = await presetManager$1.FilterMyPresetsOnline(toy.toyType);
      setMyOnlinePresets(data);
    }
  }
  async function GetSearchResult(searchStr) {
    if (toy != void 0 && presetManager$1 != void 0) {
      var data = await presetManager$1.SearchPresetsOnline(toy.toyType, searchStr);
      setSearchResult(data);
    }
  }
  async function GetNewestPresets() {
    if (toy != void 0 && presetManager$1 != void 0) {
      var data = await presetManager$1.GetNewesPresets(toy.toyType);
      setNewestPresets(data);
    }
  }
  function UpdateComponent() {
    LoadToy();
    if (GetUser() != void 0) {
      setUserLoggedIn(true);
    }
  }
  function LoadToy() {
    var t = InitToy(channel, toy, UpdateComponent);
    if (toy != t) {
      toy = t;
      UpdateUIValues();
    }
  }
  function UpdateUIValues() {
    if (typeof window !== "undefined") {
      if (toy != void 0) {
        GetMatchingPresetsLocal();
      }
    }
  }
  function LoadPreset(data) {
    const jsonObj = presetManager$1.GetValidJSON(data);
    if (toy != void 0) {
      toy.LoadJSON(jsonObj);
    }
  }
  function SetOnlineFunctionSelection(number) {
    setOnlineFunctionSelection(number);
    var array = [...channelButtonClass()];
    switch (onlineFunctionSelection()) {
      case 0:
        array[0] = "thinButtonActive";
        array[1] = "thinButton";
        array[2] = "thinButton";
        break;
      case 1:
        array[0] = "thinButton";
        array[1] = "thinButtonActive";
        array[2] = "thinButton";
        break;
      case 2:
        array[0] = "thinButton";
        array[1] = "thinButton";
        array[2] = "thinButtonActive";
        break;
    }
    setChannelButtonClass(array);
  }
  function SaveNewPreset() {
    if (presetName() != "" && presetName().length > 2 && toy != void 0) {
      presetManager$1.SaveNewPresetLocal(presetName(), toy);
      if (userLoggedIn() == true) {
        presetManager$1.SaveNewPresetOnline(presetName(), toy);
      }
      GetMatchingPresetsLocal();
      UpdateUIValues();
      GetMyPresetsOnline();
      setPresetName("");
    } else console.log("Preset Name is null");
  }
  async function UploadExistingPresetOnline(item) {
    const pName = GetLocalPresetName(item);
    if (pName != "" && pName.length > 2 && toy != void 0) {
      presetManager$1.SaveExistingPresetOnline(pName, JSON.parse(item.item));
    } else console.log("pName is null, can't upload preset");
    UpdateUIValues();
    GetMyPresetsOnline();
  }
  function UploadPresetLocal(presetName2, jsonObj) {
    presetManager$1.SaveNewPresetUploadLocal(presetName2, jsonObj);
    UpdateUIValues();
  }
  function DeleteLocalPreset(item) {
    presetManager$1.DeletePresetLocal(item);
    GetMatchingPresetsLocal();
  }
  async function DeletePresetOnline(id, presetData) {
    await presetManager$1.DeletePresetOnline(id, presetData);
    GetMyPresetsOnline();
    UpdateUIValues();
  }
  function DownloadPreset(name, jsonData) {
    var blob;
    blob = new Blob([JSON.stringify(jsonData)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = name + ".json";
    link.click();
    URL.revokeObjectURL(url);
  }
  function GetLocalPresetName(item) {
    const split = item.key.split(".");
    return split[0];
  }
  function RenderLocalPresets() {
    return ssr(_tmpl$$9, ssrHydrationKey(), escape(matchingItems().map((item) => ssr(_tmpl$2$5, ssrHydrationKey(), escape(createComponent(Button, {
      "class": "thinButton",
      onClick: () => LoadPreset(item.item),
      get label() {
        return GetLocalPresetName(item);
      }
    })), escape(createComponent(ButtonIcon, {
      icon: "material-symbols:download",
      "class": "iconButton",
      divClass: "marginRight5",
      onClick: () => DownloadPreset(item.key, item.item)
    })), userLoggedIn() && escape(createComponent(ButtonIcon, {
      icon: "material-symbols:upload-sharp",
      "class": "iconButton",
      divClass: "marginRight5",
      onClick: () => UploadExistingPresetOnline(item)
    })), escape(createComponent(ButtonIcon, {
      icon: "material-symbols:delete-outline",
      "class": "iconButton",
      divClass: "",
      onClick: () => DeleteLocalPreset(item)
    }))))));
  }
  function RenderMyOnlinePresetsData() {
    if (myOnlinePresets().length > 0) return ssr(_tmpl$$9, ssrHydrationKey(), escape(myOnlinePresets()?.map((item) => ssr(_tmpl$3$5, ssrHydrationKey(), escape(createComponent(Button, {
      "class": "thinButton",
      onClick: () => LoadPreset(item.presetData),
      get label() {
        return item.presetName;
      }
    })), escape(createComponent(ButtonIcon, {
      icon: "material-symbols:download",
      "class": "iconButton",
      divClass: "marginRight5",
      onClick: () => DownloadPreset(item.presetName, item.presetData)
    })), escape(createComponent(ButtonIcon, {
      icon: "material-symbols:delete-outline",
      "class": "iconButton",
      divClass: "",
      onClick: () => DeletePresetOnline(item.id, item.presetData)
    }))))));
    else {
      return [];
    }
  }
  function RenderOnlineSearchData() {
    if (searchResult().length > 0) return ssr(_tmpl$$9, ssrHydrationKey(), escape(searchResult()?.map((item) => ssr(_tmpl$4$4, ssrHydrationKey(), escape(createComponent(Button, {
      "class": "thinButton",
      onClick: () => LoadPreset(item.presetData),
      get label() {
        return item.presetName;
      }
    })), escape(createComponent(ButtonIcon, {
      icon: "material-symbols:download",
      "class": "iconButton",
      divClass: "marginRight5",
      onClick: () => DownloadPreset(item.presetName, item.presetData)
    }))))));
    else {
      return [];
    }
  }
  function RenderNewestPresets() {
    if (newestPresets().length > 0) return ssr(_tmpl$$9, ssrHydrationKey(), escape(newestPresets()?.map((item) => ssr(_tmpl$4$4, ssrHydrationKey(), escape(createComponent(Button, {
      "class": "thinButton",
      onClick: () => LoadPreset(item.presetData),
      get label() {
        return item.presetName;
      }
    })), escape(createComponent(ButtonIcon, {
      icon: "material-symbols:download",
      "class": "iconButton",
      divClass: "marginRight5",
      onClick: () => DownloadPreset(item.presetName, item.presetData)
    }))))));
    else {
      return [];
    }
  }
  function RenderMyOnlinePresetsTab() {
    return ssr(_tmpl$5$3, ssrHydrationKey(), escape(createComponent(TextInput, {
      placeholder: "Preset",
      get value() {
        return presetName();
      },
      onChange: (event) => setPresetName(event)
    })), escape(createComponent(Button, {
      "class": "thinButton width30",
      id: "SaveOnline",
      onClick: () => SaveNewPreset(),
      label: "Save"
    })), escape(RenderMyOnlinePresetsData()), escape(createComponent(DetailsFillerCenter, {
      summeryName: "Local Presets",
      get content() {
        return RenderLocalPresets();
      },
      summeryClass: "summeryMinimal textAlignCenter marginAuto",
      detailClass: "detailsMinimal marginAuto"
    })), escape(createComponent(JsonFileUploader, {
      onFileUpload: UploadExistingPresetOnline
    })));
  }
  function RenderSearchPresetsTab() {
    return ssr(_tmpl$6$3, ssrHydrationKey(), escape(createComponent(TextInput, {
      type: "searchInput",
      placeholder: "Preset Name",
      onChange: (event) => setPresetSearchString(event)
    })), escape(createComponent(ButtonIcon, {
      icon: "mdi:search",
      divClass: "",
      onClick: () => GetSearchResult(presetSearchString())
    })), escape(RenderOnlineSearchData()));
  }
  function RenderNewestPresetsTab() {
    return ssr(_tmpl$7$1, ssrHydrationKey(), escape(createComponent(ButtonIcon, {
      label: "Reload",
      icon: "mdi:reload",
      onClick: () => GetNewestPresets()
    })), escape(RenderNewestPresets()));
  }
  function RenderLocalPresetManagement() {
    return ssr(_tmpl$8$1, ssrHydrationKey(), escape(createComponent(TextInput, {
      placeholder: "Preset",
      get value() {
        return presetName();
      },
      onChange: (event) => setPresetName(event)
    })), escape(createComponent(Button, {
      "class": "thinButton width30",
      onClick: () => SaveNewPreset(),
      label: "Save",
      id: "Save Local"
    })), escape(RenderLocalPresets()), escape(createComponent(JsonFileUploader, {
      onFileUpload: UploadPresetLocal
    })));
  }
  function RenderOnlineFunctionSelection() {
    switch (onlineFunctionSelection()) {
      case 0:
        return ssr(_tmpl$$9, ssrHydrationKey(), escape(RenderMyOnlinePresetsTab()));
      case 1:
        return ssr(_tmpl$$9, ssrHydrationKey(), escape(RenderSearchPresetsTab()));
      case 2:
        return ssr(_tmpl$$9, ssrHydrationKey(), escape(RenderNewestPresetsTab()));
    }
  }
  function RenderOnlinePresetManagement() {
    return ssr(_tmpl$9$1, ssrHydrationKey(), escape(createComponent(Button, {
      label: "My Presets",
      get ["class"]() {
        return channelButtonClass()[0];
      },
      divClass: "",
      onClick: () => SetOnlineFunctionSelection(0)
    })), escape(createComponent(Button, {
      label: "Browse",
      get ["class"]() {
        return channelButtonClass()[1];
      },
      divClass: "marginLeft5 marginRight5",
      onClick: () => SetOnlineFunctionSelection(1)
    })), escape(createComponent(Button, {
      label: "New",
      get ["class"]() {
        return channelButtonClass()[2];
      },
      divClass: "",
      onClick: () => SetOnlineFunctionSelection(2)
    })), escape(RenderOnlineFunctionSelection()));
  }
  function RenderUI() {
    if (userLoggedIn()) {
      return RenderOnlinePresetManagement();
    } else {
      return RenderLocalPresetManagement();
    }
  }
  LoadToy();
  if (GetUser() != void 0) {
    setUserLoggedIn(true);
    setTimeout(() => {
      GetMyPresetsOnline();
      GetNewestPresets();
    }, 1e3);
  }
  canvasManager$8.SubscribeOneFPS(UpdateComponent);
  return createComponent(DetailsFillerCenter, {
    summeryName: "Presets",
    get content() {
      return RenderUI();
    }
  });
}

var _tmpl$$8 = ["<div", ' class="flex"><div class="width70"><h3 class="textAlignCenter">', '</h3></div><div class="flex justifyEnd marginAuto"><!--$-->', "<!--/--><!--$-->", "<!--/--></div></div>"], _tmpl$2$4 = ["<br", ">"], _tmpl$3$4 = ["<div", "><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--></div>"];
const canvasManager$7 = new CanvasManager();
function SetupContainer$8(props) {
  var toy;
  var channel = props.channel;
  const [useEffect, setUseEffect] = createSignal(true);
  const [colorSelection, setColorSelection] = createSignal(0);
  const [colorSelectionName, setColorSelectionName] = createSignal("Fill Color");
  const [fillColor, setFillColor] = createSignal({
    r: 0,
    g: 0,
    b: 0,
    a: 0
  });
  const [strokeColor, setStrokeColor] = createSignal({
    r: 0,
    g: 0,
    b: 0,
    a: 0
  });
  const [accentColor, setAccentColor] = createSignal({
    r: 0,
    g: 0,
    b: 0,
    a: 0
  });
  createEffect(() => {
    if (useEffect()) {
      UpdateToyValues();
    }
  });
  function UpdateUIValues() {
    if (typeof window !== "undefined") {
      if (toy != void 0) {
        setUseEffect(false);
        var mColor = toy.GetPaperColor(toy.fillColor);
        var sColor = toy.GetPaperColor(toy.strokeColor);
        var aColor = toy.GetPaperColor(toy.accentColor);
        setFillColor({
          r: mColor.r,
          g: mColor.g,
          b: mColor.b,
          a: mColor.a
        });
        setStrokeColor({
          r: sColor.r,
          g: sColor.g,
          b: sColor.b,
          a: sColor.a
        });
        setAccentColor({
          r: aColor.r,
          g: aColor.g,
          b: aColor.b,
          a: aColor.a
        });
        setUseEffect(true);
      }
    }
  }
  function UpdateToyValues() {
    if (typeof window !== "undefined") {
      if (toy != void 0) {
        toy.SetPaperColor(toy.fillColor, fillColor().r, fillColor().g, fillColor().b, fillColor().a);
        toy.SetPaperColor(toy.strokeColor, strokeColor().r, strokeColor().g, strokeColor().b, strokeColor().a);
        toy.SetPaperColor(toy.accentColor, accentColor().r, accentColor().g, accentColor().b, accentColor().a);
        try {
          toy.ApplyColors();
        } catch {
        }
      }
    }
  }
  function UpdateComponent() {
    LoadToy();
  }
  function UpdateColorSelection(value) {
    var calc = colorSelection();
    calc += value;
    if (calc < 0) calc = 2;
    if (calc > 2) calc = 0;
    switch (calc) {
      case 0:
        setColorSelectionName("Fill Color");
        break;
      case 1:
        setColorSelectionName("Stroke Color");
        break;
      case 2:
        setColorSelectionName("Accent Color");
        break;
    }
    setColorSelection(calc);
  }
  function RenderColorSettings() {
    return [ssr(_tmpl$$8, ssrHydrationKey(), escape(colorSelectionName()), escape(createComponent(ButtonIcon, {
      icon: "material-symbols:chevron-left",
      "class": "squareButton",
      divClass: "marginRight5 marginAuto",
      onClick: () => UpdateColorSelection(-1),
      width: 30
    })), escape(createComponent(ButtonIcon, {
      icon: "material-symbols:chevron-right",
      "class": "squareButton",
      divClass: "marginAuto",
      onClick: () => UpdateColorSelection(1),
      width: 30
    }))), ssr(_tmpl$2$4, ssrHydrationKey()), RenderColorSettingsSelection()];
  }
  function RenderColorSettingsSelection() {
    switch (colorSelection()) {
      //fillColor
      case 0:
        return ssr(_tmpl$3$4, ssrHydrationKey(), escape(createComponent(NumberSliderUIElement, {
          name: "Red",
          minMaxStep: [0, 255, 1],
          get value() {
            return fillColor().r;
          },
          onChange: (value) => setFillColor({
            ...fillColor(),
            r: value
          })
        })), escape(createComponent(NumberSliderUIElement, {
          name: "Green",
          minMaxStep: [0, 255, 1],
          get value() {
            return fillColor().g;
          },
          onChange: (value) => setFillColor({
            ...fillColor(),
            g: value
          })
        })), escape(createComponent(NumberSliderUIElement, {
          name: "Blue",
          minMaxStep: [0, 255, 1],
          get value() {
            return fillColor().b;
          },
          onChange: (value) => setFillColor({
            ...fillColor(),
            b: value
          })
        })), escape(createComponent(NumberSliderUIElement, {
          name: "Alpha",
          minMaxStep: [0, 255, 1],
          get value() {
            return fillColor().a;
          },
          onChange: (value) => setFillColor({
            ...fillColor(),
            a: value
          })
        })));
      //strokeColor
      case 1:
        return ssr(_tmpl$3$4, ssrHydrationKey(), escape(createComponent(NumberSliderUIElement, {
          name: "Red",
          minMaxStep: [0, 255, 1],
          get value() {
            return strokeColor().r;
          },
          onChange: (value) => setStrokeColor({
            ...strokeColor(),
            r: value
          })
        })), escape(createComponent(NumberSliderUIElement, {
          name: "Green",
          minMaxStep: [0, 255, 1],
          get value() {
            return strokeColor().g;
          },
          onChange: (value) => setStrokeColor({
            ...strokeColor(),
            g: value
          })
        })), escape(createComponent(NumberSliderUIElement, {
          name: "Blue",
          minMaxStep: [0, 255, 1],
          get value() {
            return strokeColor().b;
          },
          onChange: (value) => setStrokeColor({
            ...strokeColor(),
            b: value
          })
        })), escape(createComponent(NumberSliderUIElement, {
          name: "Alpha",
          minMaxStep: [0, 255, 1],
          get value() {
            return strokeColor().a;
          },
          onChange: (value) => setStrokeColor({
            ...strokeColor(),
            a: value
          })
        })));
      //accentColor
      case 2:
        return ssr(_tmpl$3$4, ssrHydrationKey(), escape(createComponent(NumberSliderUIElement, {
          name: "Red",
          minMaxStep: [0, 255, 1],
          get value() {
            return accentColor().r;
          },
          onChange: (value) => setAccentColor({
            ...accentColor(),
            r: value
          })
        })), escape(createComponent(NumberSliderUIElement, {
          name: "Green",
          minMaxStep: [0, 255, 1],
          get value() {
            return accentColor().g;
          },
          onChange: (value) => setAccentColor({
            ...accentColor(),
            g: value
          })
        })), escape(createComponent(NumberSliderUIElement, {
          name: "Blue",
          minMaxStep: [0, 255, 1],
          get value() {
            return accentColor().b;
          },
          onChange: (value) => setAccentColor({
            ...accentColor(),
            b: value
          })
        })), escape(createComponent(NumberSliderUIElement, {
          name: "Alpha",
          minMaxStep: [0, 255, 1],
          get value() {
            return accentColor().a;
          },
          onChange: (value) => setAccentColor({
            ...accentColor(),
            a: value
          })
        })));
    }
  }
  function LoadToy() {
    var t = InitToy(channel, toy, UpdateComponent);
    if (toy != t) {
      toy = t;
      toy.SubscribeToToyChangedEvent(UpdateUIValues);
      UpdateUIValues();
    }
  }
  canvasManager$7.SubscribeOneFPS(UpdateComponent);
  return (
    // <ui.DetailsFillerCenter("Color Settings", RenderColorSettings()) />
    createComponent(DetailsFillerCenter, {
      summeryName: "Colors",
      content: RenderColorSettings
    })
  );
}

var _tmpl$$7 = ["<div", "></div>"];
const canvasManager$6 = new CanvasManager();
function SetupContainer$7(props) {
  var toy;
  var channel = props.channel;
  var updateToy = false;
  const [useEffect, setUseEffect] = createSignal(true);
  const [numberOfKeys, setNumberOfKeys] = createSignal(12);
  const [startKey, setStartKey] = createSignal(12);
  const [collapsNote, setCollapsNote] = createSignal(true);
  createEffect(() => {
    if (useEffect()) {
      UpdateToyValues();
    }
  });
  function UpdateComponent() {
    LoadToy();
  }
  function RenderKeySettings() {
    return [createComponent(NumberSliderUIElement, {
      name: "Keys",
      minMaxStep: [1, 100, 1],
      get value() {
        return numberOfKeys();
      },
      onChange: setNumberOfKeys
    }), RenderStartKeySetting(), createComponent(CheckboxUIElement, {
      name: "Collapse Notes",
      get checked() {
        return collapsNote();
      },
      onChange: setCollapsNote
    })];
  }
  function RenderStartKeySetting() {
    if (collapsNote() == true) {
      return (
        // Sorry, nothing
        ssr(_tmpl$$7, ssrHydrationKey())
      );
    } else {
      return createComponent(NumberSliderUIElement, {
        get name() {
          return "Start Key (" + MIDIDataTable.MIDINoteToString(startKey()) + ")";
        },
        minMaxStep: [1, 100, 1],
        get value() {
          return startKey();
        },
        onChange: setStartKey
      });
    }
  }
  function LoadToy() {
    var t = InitToy(channel, toy, UpdateComponent);
    if (toy != t) {
      toy = t;
      toy.SubscribeToToyChangedEvent(UpdateUIValues);
      UpdateUIValues();
    }
  }
  function UpdateUIValues() {
    if (typeof window !== "undefined") {
      if (toy != void 0) {
        setUseEffect(false);
        setNumberOfKeys(toy.numberOfKeys);
        setStartKey(toy.startKey);
        setCollapsNote(toy.useRegExp);
        setUseEffect(true);
      }
    }
  }
  function UpdateToyValues() {
    if (typeof window !== "undefined") {
      if (toy != void 0) {
        toy.numberOfKeys = numberOfKeys();
        toy.startKey = startKey();
        toy.useRegExp = collapsNote();
        try {
          if (updateToy) {
            toy.SetupMIDIReceiver(collapsNote());
            toy.SetupKeyboard();
          } else updateToy = true;
        } catch {
        }
      }
    }
  }
  canvasManager$6.SubscribeOneFPS(UpdateComponent);
  return createComponent(DetailsFillerCenter, {
    summeryName: "Keys",
    get content() {
      return RenderKeySettings();
    }
  });
}

var _tmpl$$6 = ["<br", ">"];
new ToyManager();
const canvasManager$5 = new CanvasManager();
function SetupContainer$6(props) {
  var channel = props.channel;
  var toy;
  const [useEffect, setUseEffect] = createSignal(true);
  const [toyTypeName, setToyTypeName] = createSignal("ToyType");
  const [horizontalAlign, setHorizontalAlign] = createSignal(true);
  const [strokeWidth, setStrokeWidth] = createSignal(2);
  const [polySides, setPolySides] = createSignal(4);
  const [velocityLimit, setVelocityLimit] = createSignal(20);
  const [yGravity, setYGravity] = createSignal(-0.9);
  const [xGravity, setXGravity] = createSignal(0);
  const [yFriction, setYFriction] = createSignal(0.9);
  const [xFriction, setXFriction] = createSignal(0.95);
  const [yImpulsPower, setYImpulsPower] = createSignal(30);
  const [xImpulsPower, setXImpulsPower] = createSignal(0);
  createEffect(() => {
    if (useEffect()) {
      UpdateToyValues();
    }
  });
  function UpdateComponent() {
    LoadToy();
  }
  function LoadToy() {
    var t = InitToy(channel, toy, UpdateComponent);
    if (toy != t) {
      toy = t;
      UpdateUIValues();
    }
  }
  function UpdateUIValues() {
    if (typeof window !== "undefined") {
      if (toy != void 0) {
        setUseEffect(false);
        setToyTypeName(toy.toyType);
        setHorizontalAlign(toy.horizontalAlign);
        setStrokeWidth(toy.strokeWidth);
        setPolySides(toy.polySides);
        setVelocityLimit(toy.velocityLimit);
        setYGravity(toy.yGravity);
        setXGravity(toy.xGravity);
        setYFriction(toy.yFriction);
        setXFriction(toy.xFriction);
        setYImpulsPower(toy.yImpulsPower);
        setXImpulsPower(toy.xImpulsPower);
        setUseEffect(true);
      }
    }
  }
  function UpdateToyValues() {
    if (typeof window !== "undefined") {
      if (toy != null) {
        toy.horizontalAlign = horizontalAlign();
        toy.strokeWidth = strokeWidth();
        toy.polySides = polySides();
        toy.velocityLimit = velocityLimit();
        toy.yGravity = yGravity();
        toy.xGravity = xGravity();
        toy.yFriction = yFriction();
        toy.xFriction = xFriction();
        toy.yImpulsPower = yImpulsPower();
        toy.xImpulsPower = xImpulsPower();
        try {
          toy.ApplySettings();
        } catch {
        }
      }
    }
  }
  function Reload() {
    try {
      toy.SetupKeyboard();
    } catch {
    }
  }
  function RenderUI() {
    return [createComponent(Button, {
      label: "Reload",
      onClick: Reload,
      "class": "thinButton width100"
    }), ssr(_tmpl$$6, ssrHydrationKey()), ssr(_tmpl$$6, ssrHydrationKey()), createComponent(CheckboxUIElement, {
      name: "Horizontal Align",
      get checked() {
        return horizontalAlign();
      },
      onChange: setHorizontalAlign
    }), createComponent(NumberSliderUIElement, {
      name: "Stroke Width",
      minMaxStep: [0, 80, 1],
      get value() {
        return strokeWidth();
      },
      onChange: setStrokeWidth
    }), createComponent(NumberSliderUIElement, {
      name: "Poly Sides",
      minMaxStep: [2, 20, 1],
      get value() {
        return polySides();
      },
      onChange: setPolySides
    }), ssr(_tmpl$$6, ssrHydrationKey()), createComponent(NumberSliderUIElement, {
      name: "Velocity Limit",
      minMaxStep: [1, 200, 1],
      get value() {
        return velocityLimit();
      },
      onChange: setVelocityLimit
    }), createComponent(NumberSliderUIElement, {
      factor: 100,
      name: "Y Gravity",
      minMaxStep: [-150, 150, 1],
      get value() {
        return yGravity();
      },
      onChange: setYGravity
    }), createComponent(NumberSliderUIElement, {
      factor: 100,
      name: "X Gravity",
      minMaxStep: [-150, 150, 1],
      get value() {
        return xGravity();
      },
      onChange: setXGravity
    }), ssr(_tmpl$$6, ssrHydrationKey()), createComponent(NumberSliderUIElement, {
      factor: 100,
      name: "Y Friction",
      minMaxStep: [20, 100, 1],
      get value() {
        return yFriction();
      },
      onChange: setYFriction
    }), createComponent(NumberSliderUIElement, {
      factor: 100,
      name: "X Friction",
      minMaxStep: [20, 100, 1],
      get value() {
        return xFriction();
      },
      onChange: setXFriction
    }), ssr(_tmpl$$6, ssrHydrationKey()), createComponent(NumberSliderUIElement, {
      name: "Y Impulse Power",
      minMaxStep: [1, 200, 1],
      get value() {
        return yImpulsPower();
      },
      onChange: setYImpulsPower
    }), createComponent(NumberSliderUIElement, {
      name: "X Impulse Power",
      minMaxStep: [1, 200, 1],
      get value() {
        return xImpulsPower();
      },
      onChange: setXImpulsPower
    })];
  }
  LoadToy();
  canvasManager$5.SubscribeOneFPS(UpdateComponent);
  return createComponent(DetailsFillerCenter, {
    get summeryName() {
      return toyTypeName() + " Settings";
    },
    get content() {
      return RenderUI();
    }
  });
}

var _tmpl$$5 = ["<br", ">"];
new ToyManager();
const canvasManager$4 = new CanvasManager();
function SetupContainer$5(props) {
  var channel = props.channel;
  var toy;
  var updateToy = false;
  const [useEffect, setUseEffect] = createSignal(true);
  const [toyTypeName, setToyTypeName] = createSignal("ToyType");
  const [shapeLimit, setShapeLimit] = createSignal(20);
  const [polySides, setPolySides] = createSignal(3);
  const [startSize, setStartSize] = createSignal(500);
  const [xSizeChange, setXSizeChange] = createSignal(0.98);
  const [ySizeChange, setYSizeChange] = createSignal(0.98);
  const [xSpawnScale, setXSpawnScale] = createSignal(1);
  const [ySpawnScale, setYSpawnScale] = createSignal(1);
  const [alphaDecrease, setAlphaDecrease] = createSignal(0);
  const [rotationSpeed, setRotationSpeed] = createSignal(0.01);
  const [strokeWidth, setStrokeWidth] = createSignal(10);
  const [strokeWidthDecrease, setStrokeWidthDecrease] = createSignal(1);
  const [xSpawnOffset, setXSpawnOffset] = createSignal(1);
  const [ySpawnOffset, setYSpawnOffset] = createSignal(1);
  createEffect(() => {
    if (useEffect()) {
      UpdateToyValues();
    }
  });
  function UpdateComponent() {
    LoadToy();
  }
  const ToyChanged = () => {
    setUseEffect(false);
    UpdateUIValues();
    setUseEffect(true);
  };
  function LoadToy() {
    var t = InitToy(channel, toy, UpdateComponent);
    if (toy != t) {
      toy = t;
      toy.SubscribeToToyChangedEvent(UpdateUIValues);
      UpdateUIValues();
    }
  }
  function UpdateUIValues() {
    if (typeof window !== "undefined") {
      toy = InitToy(channel, toy, ToyChanged);
      if (toy != void 0) {
        setUseEffect(false);
        setToyTypeName(toy.toyType);
        setShapeLimit(toy.shapeLimit);
        setPolySides(toy.polySides);
        setStartSize(toy.startSize);
        setXSizeChange(toy.xSizeChange);
        setYSizeChange(toy.ySizeChange);
        setXSpawnScale(toy.xSpawnScale);
        setYSpawnScale(toy.ySpawnScale);
        setAlphaDecrease(toy.alphaDecrease);
        setRotationSpeed(toy.rotationSpeed);
        setStrokeWidth(toy.strokeWidth);
        setStrokeWidthDecrease(toy.strokeWidthDecrease);
        setXSpawnOffset(toy.xSpawnOffset);
        setYSpawnOffset(toy.ySpawnOffset);
        setUseEffect(true);
      }
    }
  }
  function UpdateToyValues() {
    if (typeof window !== "undefined") {
      if (toy != void 0) {
        toy.shapeLimit = shapeLimit();
        toy.polySides = polySides();
        toy.startSize = startSize();
        toy.xSizeChange = xSizeChange();
        toy.ySizeChange = ySizeChange();
        toy.xSpawnScale = xSpawnScale();
        toy.ySpawnScale = ySpawnScale();
        toy.alphaDecrease = alphaDecrease();
        toy.rotationSpeed = rotationSpeed();
        toy.strokeWidth = strokeWidth();
        toy.strokeWidthDecrease = strokeWidthDecrease();
        toy.xSpawnOffset = xSpawnOffset();
        toy.ySpawnOffset = ySpawnOffset();
        try {
          if (updateToy) toy.SetupKeyboard();
          else updateToy = true;
        } catch {
        }
      }
    }
  }
  function RenderUI() {
    return [createComponent(NumberSliderUIElement, {
      name: "Shape Limit",
      minMaxStep: [1, 100, 1],
      get value() {
        return shapeLimit();
      },
      onChange: setShapeLimit
    }), createComponent(NumberSliderUIElement, {
      name: "Poly Sides",
      minMaxStep: [2, 20, 1],
      get value() {
        return polySides();
      },
      onChange: setPolySides
    }), createComponent(NumberSliderUIElement, {
      name: "Rotation Speed",
      factor: 100,
      minMaxStep: [-1e3, 1e3, 1],
      get value() {
        return rotationSpeed();
      },
      onChange: setRotationSpeed
    }), ssr(_tmpl$$5, ssrHydrationKey()), createComponent(NumberSliderUIElement, {
      name: "Start Size",
      minMaxStep: [1, 1e3, 1],
      get value() {
        return startSize();
      },
      onChange: setStartSize
    }), createComponent(NumberSliderUIElement, {
      name: "Stroke Size",
      minMaxStep: [1, 200, 1],
      get value() {
        return strokeWidth();
      },
      onChange: setStrokeWidth
    }), ssr(_tmpl$$5, ssrHydrationKey()), createComponent(NumberSliderUIElement, {
      factor: 100,
      name: "X Scale Start",
      minMaxStep: [50, 300, 1],
      get value() {
        return xSpawnScale();
      },
      onChange: setXSpawnScale
    }), createComponent(NumberSliderUIElement, {
      factor: 100,
      name: "Y Scale Start",
      minMaxStep: [50, 300, 1],
      get value() {
        return ySpawnScale();
      },
      onChange: setYSpawnScale
    }), ssr(_tmpl$$5, ssrHydrationKey()), createComponent(NumberSliderUIElement, {
      factor: 100,
      name: "X Scale Change",
      minMaxStep: [50, 120, 1],
      get value() {
        return xSizeChange();
      },
      onChange: setXSizeChange
    }), createComponent(NumberSliderUIElement, {
      factor: 100,
      name: "Y Scale Change",
      minMaxStep: [50, 120, 1],
      get value() {
        return ySizeChange();
      },
      onChange: setYSizeChange
    }), ssr(_tmpl$$5, ssrHydrationKey()), createComponent(NumberSliderUIElement, {
      factor: 100,
      name: "Stroke Change",
      minMaxStep: [50, 120, 1],
      get value() {
        return strokeWidthDecrease();
      },
      onChange: setStrokeWidthDecrease
    }), createComponent(NumberSliderUIElement, {
      factor: 100,
      name: "Alpha Change",
      minMaxStep: [0, 10, 1],
      get value() {
        return alphaDecrease();
      },
      onChange: setAlphaDecrease
    }), ssr(_tmpl$$5, ssrHydrationKey()), createComponent(NumberSliderUIElement, {
      factor: 100,
      name: "X SpawnOffset",
      minMaxStep: [0, 200, 1],
      get value() {
        return xSpawnOffset();
      },
      onChange: setXSpawnOffset
    }), createComponent(NumberSliderUIElement, {
      factor: 100,
      name: "Y Spawn Offset",
      minMaxStep: [0, 200, 1],
      get value() {
        return ySpawnOffset();
      },
      onChange: setYSpawnOffset
    })];
  }
  canvasManager$4.SubscribeOneFPS(UpdateComponent);
  return (
    // ui.DetailsFillerCenter(toy.toyType + " Settings", RenderUI());
    createComponent(DetailsFillerCenter, {
      get summeryName() {
        return toyTypeName() + " Settings";
      },
      get content() {
        return RenderUI();
      }
    })
  );
}

var _tmpl$$4 = ["<br", ">"];
new ToyManager();
const canvasManager$3 = new CanvasManager();
function SetupContainer$4(props) {
  var toy;
  var channel = props.channel;
  const [useEffect, setUseEffect] = createSignal(true);
  const [rows, setRows] = createSignal(5);
  const [colums, setColums] = createSignal(5);
  const [polySides, setPolySides] = createSignal(3);
  const [strokeWidth, setStrokeWidth] = createSignal(2);
  const [cellHeightScale, setCellHeightScale] = createSignal(1);
  const [cellWidthScale, setCellWidthScale] = createSignal(1);
  const [toyTypeName, setToyTypeName] = createSignal("ToyType");
  createEffect(() => {
    if (useEffect()) {
      UpdateToyValues();
    }
  });
  function UpdateComponent() {
    LoadToy();
  }
  function LoadToy() {
    var t = InitToy(channel, toy, UpdateComponent);
    if (toy != t) {
      toy = t;
      toy.SubscribeToToyChangedEvent(UpdateUIValues);
      UpdateUIValues();
    }
  }
  function UpdateUIValues() {
    if (typeof window !== "undefined") {
      if (toy != void 0) {
        setUseEffect(false);
        setToyTypeName(toy.toyType);
        setRows(toy.rows);
        setColums(toy.colums);
        setPolySides(toy.polySides);
        setStrokeWidth(toy.strokeWidth);
        setCellHeightScale(toy.cellHeightScale);
        setCellWidthScale(toy.cellWidthScale);
        setUseEffect(true);
      }
    }
  }
  function UpdateToyValues() {
    if (typeof window !== "undefined") {
      if (toy != void 0) {
        toy.rows = rows();
        toy.colums = colums();
        toy.polySides = polySides();
        toy.strokeWidth = strokeWidth();
        toy.cellHeightScale = cellHeightScale();
        toy.cellWidthScale = cellWidthScale();
        try {
          toy.ApplySettings();
        } catch {
        }
      }
    }
  }
  function RenderUI() {
    return [createComponent(NumberSliderUIElement, {
      name: "Poly Sides",
      minMaxStep: [3, 20, 1],
      get value() {
        return polySides();
      },
      onChange: setPolySides
    }), ssr(_tmpl$$4, ssrHydrationKey()), createComponent(NumberSliderUIElement, {
      name: "Rows",
      minMaxStep: [1, 50, 1],
      get value() {
        return rows();
      },
      onChange: setRows
    }), createComponent(NumberSliderUIElement, {
      name: "Colums",
      minMaxStep: [1, 50, 1],
      get value() {
        return colums();
      },
      onChange: setColums
    }), ssr(_tmpl$$4, ssrHydrationKey()), createComponent(NumberSliderUIElement, {
      name: "Stroke Width",
      minMaxStep: [0, 20, 1],
      get value() {
        return strokeWidth();
      },
      onChange: setStrokeWidth
    }), ssr(_tmpl$$4, ssrHydrationKey()), createComponent(NumberSliderUIElement, {
      name: "Cell Height",
      factor: 100,
      minMaxStep: [-200, 200, 1],
      get value() {
        return cellHeightScale();
      },
      onChange: setCellHeightScale
    }), createComponent(NumberSliderUIElement, {
      name: "Cell Width",
      factor: 100,
      minMaxStep: [-200, 200, 1],
      get value() {
        return cellWidthScale();
      },
      onChange: setCellWidthScale
    })];
  }
  LoadToy();
  canvasManager$3.SubscribeOneFPS(UpdateComponent);
  return createComponent(DetailsFillerCenter, {
    get summeryName() {
      return toyTypeName() + " Settings";
    },
    get content() {
      return RenderUI();
    }
  });
}

var _tmpl$$3 = ["<div", ">", "</div>"], _tmpl$2$3 = ["<div", ' class="noSelect"><!--$-->', "<!--/--><br><!--$-->", "<!--/--><br><!--$-->", "<!--/--><br><!--$-->", "<!--/--></div>"], _tmpl$3$3 = ["<h3", ">Sorry, nothing</h3>"], _tmpl$4$3 = ["<button", ' id="thinButton">X</button>'], _tmpl$5$2 = ["<button", ' id="thinButton">Gravi Board</button>'], _tmpl$6$2 = ["<button", ' id="thinButton">Poly Drum</button>'], _tmpl$7 = ["<button", ' id="thinButton">MIDI Matrix</button>'], _tmpl$8 = ["<div", "><!--$-->", "<!--/--><!--$-->", "<!--/--></div>"], _tmpl$9 = ["<div", ' class="marginRight20">', "</div>"], _tmpl$0 = ["<div", ' class="textAlignLeft paddingTop10"><h2 class="marginAuto">', "</h2></div>"], _tmpl$1 = ["<div", ' class="channelContainer"><div><div class="flex"><!--$-->', "<!--/--><!--$-->", "<!--/--></div></div><br><!--$-->", "<!--/--></div>"];
const canvasManager$2 = new CanvasManager();
const toyManager$1 = new ToyManager();
function SetupContainer$3(props) {
  var toy;
  var channel = props.channel;
  const [useEffect, setUseEffect] = createSignal(true);
  const [toyType, setToyType] = createSignal(0);
  const [selectToy, setSelectToy] = createSignal(false);
  const [toyTypeName, setToyTypeName] = createSignal("EmptyToy");
  function UpdateUIValues() {
    if (typeof window !== "undefined") {
      if (toy != void 0) {
        setUseEffect(false);
        setToyTypeName(toy.toyType);
        setUseEffect(true);
      }
    } else setToyTypeName("Empty");
  }
  function UpdateComponent() {
    UpdateUIValues();
  }
  function LoadToy() {
    var t = InitToy(channel, toy, UpdateComponent);
    if (toy != t) {
      toy = t;
      if (toy.toyType.includes("Empty")) {
        setSelectToy(true);
      } else {
        var value = toyManager$1.GetToyType(channel);
        SetToyType(value);
      }
      UpdateUIValues();
    }
  }
  function ToggleSelectToy() {
    var b = selectToy();
    if (b) setSelectToy(false);
    else setSelectToy(true);
  }
  function SetToyType(value, newToy) {
    setToyType(value);
    setSelectToy(false);
  }
  function RenderUI() {
    if (selectToy() == true) {
      return ssr(_tmpl$$3, ssrHydrationKey(), escape(RenderToySelection()));
    } else {
      if (toyType() < 1) {
        return ssr(_tmpl$$3, ssrHydrationKey(), escape(RenderToySelection()));
      } else {
        return ssr(_tmpl$2$3, ssrHydrationKey(), escape(createComponent(SetupContainer$9, {
          channel
        })), escape(RenderSpecificUISettings()), escape(createComponent(SetupContainer$8, {
          channel
        })), escape(createComponent(SetupContainer$7, {
          channel
        })));
      }
    }
  }
  function RenderSpecificUISettings() {
    if (toyType() == 0) return [];
    else {
      switch (toyType()) {
        case 1:
          return createComponent(SetupContainer$6, {
            channel
          });
        case 2:
          return createComponent(SetupContainer$5, {
            channel
          });
        case 3:
          return createComponent(SetupContainer$4, {
            channel
          });
        default:
          return ssr(_tmpl$3$3, ssrHydrationKey());
      }
    }
  }
  function RenderToySelection() {
    var emptyToy = ssr(_tmpl$4$3, ssrHydrationKey());
    var toys = [ssr(_tmpl$5$2, ssrHydrationKey()), ssr(_tmpl$6$2, ssrHydrationKey()), ssr(_tmpl$7, ssrHydrationKey())];
    if (toyType() > 0) {
      return ssr(_tmpl$8, ssrHydrationKey(), escape(emptyToy), escape(toys));
    } else {
      return toys;
    }
  }
  function RenderToyWrench() {
    if (toyType() != 0) {
      return ssr(_tmpl$9, ssrHydrationKey(), escape(createComponent(ButtonIcon, {
        icon: "material-symbols:build-outline-sharp",
        onClick: () => ToggleSelectToy(),
        width: "25"
      })));
    } else return [];
  }
  function RenderToyName() {
    if (toyType() == 0) {
      return ssr(_tmpl$0, ssrHydrationKey(), escape(toyTypeName()));
    } else {
      return ssr(_tmpl$0, ssrHydrationKey(), escape(toyTypeName()));
    }
  }
  LoadToy();
  UpdateUIValues();
  canvasManager$2.SubscribeOneFPS(UpdateComponent);
  return ssr(_tmpl$1, ssrHydrationKey(), escape(RenderToyWrench()), escape(RenderToyName()), escape(RenderUI()));
}

var _tmpl$$2 = ["<div", ' class="marginAuto width80"><!--$-->', "<!--/--><!--$-->", "<!--/--></div>"], _tmpl$2$2 = ["<div", '><h2 class="textAlignCenter">Credits</h2><div class="flex width70 marginAuto"><img class="width20 marginAuto" src="', '" alt="MIDI Toys Logo"><div class="marginAuto"><div class="textAlignCenter paddingTop20">MIDI Toys created by</div><h3 class="textAlignCenter">Korbinian Maag</h3></div></div></div>'], _tmpl$3$2 = ["<div", ' class="channelContainer"><!--$-->', "<!--/--><br><!--$-->", "<!--/--><br><!--$-->", "<!--/--><br><!--$-->", "<!--/--><br><!--$-->", "<!--/--></div>"], _tmpl$4$2 = ["<div", '><h2 class="textAlignCenter">Social</h2><div class="flexContainer justifyCenter marginAuto width50"><div>', '</div><div class="marginLeft20">', "</div></div></div>"], _tmpl$5$1 = ["<div", ' class="marginAuto width80"><h2 class="textAlignCenter">Background Color</h2><!--$-->', "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--></div>"], _tmpl$6$1 = ["<div", ' class="marginAuto width80">', "</div>"];
const presetManager = new PresetManager();
const publicRef = GetPublicRef();
function SetupContainer$2() {
  const [backGroundColor, setBackgroundColor] = createSignal({
    r: 0,
    g: 0,
    b: 0,
    a: 0
  });
  createEffect(() => {
    SetBackgroundColor();
  });
  function OpenLink(link) {
    window.open(link, "_blank");
  }
  function RenderMIDISettings() {
    return ssr(_tmpl$$2, ssrHydrationKey(), escape(createComponent(BPM, {})), escape(createComponent(MIDIDropdownUIElement, {})));
  }
  function RenderCredits() {
    return ssr(_tmpl$2$2, ssrHydrationKey(), `${escape(publicRef, true)}/logo.png`);
  }
  function RenderUI() {
    return ssr(_tmpl$3$2, ssrHydrationKey(), escape(RenderMIDISettings()), escape(RenderBgColorUI()), escape(RenderSocialUI()), escape(RenderCredits()), escape(createComponent(DetailsFillerCenter, {
      summeryName: "Danger Zone",
      get content() {
        return RenderDangerZoneUI();
      }
    })));
  }
  function RenderSocialUI() {
    return ssr(_tmpl$4$2, ssrHydrationKey(), escape(createComponent(ButtonIcon, {
      width: 50,
      icon: "mdi:github",
      get onClick() {
        return OpenLink("https://github.com/Artibex/MidiToys");
      }
    })), escape(createComponent(ButtonIcon, {
      width: 50,
      icon: "ic:baseline-reddit",
      get onClick() {
        return OpenLink("https://www.reddit.com/r/miditoys/");
      }
    })));
  }
  function RenderBgColorUI() {
    return ssr(_tmpl$5$1, ssrHydrationKey(), escape(createComponent(NumberSliderUIElement, {
      name: "Red",
      minMaxStep: [0, 255, 1],
      get value() {
        return backGroundColor().r;
      },
      onChange: (value) => setBackgroundColor({
        ...backGroundColor(),
        r: value
      })
    })), escape(createComponent(NumberSliderUIElement, {
      name: "Green",
      minMaxStep: [0, 255, 1],
      get value() {
        return backGroundColor().g;
      },
      onChange: (value) => setBackgroundColor({
        ...backGroundColor(),
        g: value
      })
    })), escape(createComponent(NumberSliderUIElement, {
      name: "Blue",
      minMaxStep: [0, 255, 1],
      get value() {
        return backGroundColor().b;
      },
      onChange: (value) => setBackgroundColor({
        ...backGroundColor(),
        b: value
      })
    })), escape(createComponent(NumberSliderUIElement, {
      name: "Alpha",
      minMaxStep: [0, 100, 1],
      factor: 100,
      get value() {
        return backGroundColor().a;
      },
      onChange: (value) => setBackgroundColor({
        ...backGroundColor(),
        a: value
      })
    })));
  }
  function RenderDangerZoneUI() {
    return ssr(_tmpl$6$1, ssrHydrationKey(), escape(createComponent(Button, {
      label: "Delete ALL local Data",
      get onClick() {
        return presetManager.ClearLocalStorage;
      }
    })));
  }
  function SetBackgroundColor() {
    if (typeof window !== "undefined") {
      const cssColor = `rgba(${backGroundColor().r}, ${backGroundColor().g}, ${backGroundColor().b}, ${backGroundColor().a})`;
      document.body.style.backgroundColor = cssColor;
    }
  }
  function GetBackgroundColor() {
    if (typeof window !== "undefined") {
      const bodyColor = window.getComputedStyle(document.body).backgroundColor;
      const color = ExtractRGBAColor(bodyColor);
      setBackgroundColor({
        r: color.r,
        g: color.g,
        b: color.b,
        a: color.a
      });
    }
  }
  GetBackgroundColor();
  return RenderUI();
}

var _tmpl$$1 = ["<div", ' class="channelContainer"><div class="flex"><!--$-->', "<!--/--><br></div><!--$-->", "<!--/--></div>"], _tmpl$2$1 = ["<div", ' class="channelContainer"><div class="flex justifyStart">', "</div><!--$-->", "<!--/--></div>"], _tmpl$3$1 = ["<div", ' class="channelContainer"><h2 class="textAlignCenter">Upload your presets or<br>use presets made by the community</h2><br><h3 class="textAlignCenter">Sign In with Account</h3><!--$-->', "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><br><!--$-->", "<!--/--></div>"], _tmpl$4$1 = ["<div", ' class="channelContainer"><h2 class="textAlignCenter">Hello <!--$-->', '<!--/-->,</h2><h3 class="textAlignCenter">You can now browse or upload presets in your toys </h3><!--$-->', '<!--/--><br><div class="width50">', "</div></div>"];
const canvasManager$1 = new CanvasManager();
const firebaseManager = new FirebaseManager();
function SetupContainer$1() {
  const [userLoggedIn, setUserLoggedIn] = createSignal(false);
  const [emailSignUp, setEmailSignUp] = createSignal(false);
  const [forgotPassword, setForgotPassword] = createSignal(false);
  const [userName, setUserName] = createSignal("Cool Username");
  function UpdateComponent() {
    if (GetUser() != void 0) {
      setUserLoggedIn(true);
      setUserName(GetUser().displayName);
    }
  }
  function SetEmailSignUp(showSignUp) {
    setEmailSignUp(showSignUp);
  }
  function SetForgotPassword(showForgotPassword) {
    setForgotPassword(showForgotPassword);
  }
  function RenderForgotPasswordUI() {
    return ssr(_tmpl$$1, ssrHydrationKey(), escape(createComponent(ButtonIcon, {
      label: "Go back",
      icon: "ep:back",
      iconFirst: true,
      get onClick() {
        return SetForgotPassword(false);
      }
    })), escape(createComponent(EmailForgotPasswordUIElement, {
      onClick: () => setEmailSignUp(false)
    })));
  }
  function RenderEmailSignUpUI() {
    return ssr(_tmpl$2$1, ssrHydrationKey(), escape(createComponent(ButtonIcon, {
      label: "Go back",
      icon: "ep:back",
      iconFirst: true,
      get onClick() {
        return SetEmailSignUp(false);
      }
    })), escape(createComponent(EmailSignUpUIElement, {})));
  }
  function RenderLogInUI() {
    return ssr(_tmpl$3$1, ssrHydrationKey(), escape(createComponent(ServiceLogin, {
      icon: "uit:google",
      get onClick() {
        return firebaseManager.SignUpWithGoogle;
      },
      label: "Login Google Account"
    })), escape(createComponent(ServiceLogin, {
      icon: "codicon:github",
      get onClick() {
        return firebaseManager.SignUpWithGitHub;
      },
      label: "Login GitHub Account"
    })), escape(createComponent(ServiceLogin, {
      icon: "mingcute:twitter-line",
      get onClick() {
        return firebaseManager.SignUpWithTwitter;
      },
      label: "Login Twitter Account"
    })), escape(createComponent(EmailLoginUIElement, {
      get onRegister() {
        return SetEmailSignUp(true);
      },
      get onPasswordForgot() {
        return SetForgotPassword(true);
      }
    })));
  }
  function RenderLoggedInUI() {
    return ssr(_tmpl$4$1, ssrHydrationKey(), escape(userName()), escape(createComponent(UpdateUsernameUIElement, {})), escape(createComponent(ButtonIcon, {
      label: "Sign Out",
      iconFirst: true,
      "class": "iconButton",
      icon: "gg:log-out",
      onClick: SignOut
    })));
  }
  function SignOut() {
    firebaseManager.SignOut();
    setUserLoggedIn(false);
  }
  function RenderUI() {
    if (userLoggedIn()) {
      return RenderLoggedInUI();
    } else {
      if (emailSignUp() == true) {
        return RenderEmailSignUpUI();
      } else if (forgotPassword() == true) {
        return RenderForgotPasswordUI();
      } else {
        return RenderLogInUI();
      }
    }
  }
  if (GetUser() != void 0) {
    setUserLoggedIn(true);
    setUserName(GetUser().displayName);
  }
  canvasManager$1.SubscribeOneFPS(UpdateComponent);
  return RenderUI();
}

var _tmpl$ = ["<div", ' class="flexList"><!--$-->', "<!--/--><!--$-->", "<!--/--><br><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--></div>"], _tmpl$2 = ["<h1", ' class="marginAuto marginLeft5">Channel <!--$-->', "<!--/--> </h1>"], _tmpl$3 = ["<h1", ' class="marginAuto marginLeft5">Settings</h1>'], _tmpl$4 = ["<h1", ' class="marginAuto marginLeft5">Account</h1>'], _tmpl$5 = ["<div", ' class="height10 width100"><div class="flexContainer"><div class="justifyStart textAlignLeft">', '</div><div class="justifyEnd">', "</div></div></div>"], _tmpl$6 = ["<div", ' id="settingsPanel" class="noSelect overflowAuto"><div class="flex justifyStart"><!--$-->', '<!--/--><div class="flexList marginLeft5 width100"><!--$-->', "<!--/--><!--$-->", "<!--/--></div></div></div>"];
const toyManager = new ToyManager();
const canvasManager = new CanvasManager();
const keyboardInput = new KeyboardInputModule();
function SetupContainer() {
  const [backGroundColor, setBackgroundColor] = createSignal({
    r: 0,
    g: 0,
    b: 0,
    a: 0
  });
  const [selectedChannel, setSelectedChannel] = createSignal(1);
  const [channelButtonClass, setChannelButtonClass] = createSignal(Array.from({
    length: 16
  }, () => "channelButton"));
  createEffect(() => {
    SetKeyboardChannel(selectedChannel());
  });
  function SetKeyboardChannel(channel) {
    keyboardInput.SetChannel(channel);
  }
  function CloseSettings() {
    var panel = document.getElementById("settingsPanel");
    if (panel != void 0) {
      panel.style.display = "none";
      ShowSettingsButton();
    }
  }
  function ShowSettingsButton() {
    var button = document.getElementById("openSettingsButton");
    if (button != void 0) {
      button.style.display = "block";
    }
  }
  function RenderContainer() {
    switch (selectedChannel()) {
      case -1:
        return createComponent(SetupContainer$1, {});
      case 0:
        return createComponent(SetupContainer$2, {});
      case 1:
        return createComponent(SetupContainer$3, {
          channel: 1
        });
      case 2:
        return createComponent(SetupContainer$3, {
          channel: 2
        });
      case 3:
        return createComponent(SetupContainer$3, {
          channel: 3
        });
      case 4:
        return createComponent(SetupContainer$3, {
          channel: 4
        });
      case 5:
        return createComponent(SetupContainer$3, {
          channel: 5
        });
      case 6:
        return createComponent(SetupContainer$3, {
          channel: 6
        });
      case 7:
        return createComponent(SetupContainer$3, {
          channel: 7
        });
      case 8:
        return createComponent(SetupContainer$3, {
          channel: 8
        });
      case 9:
        return createComponent(SetupContainer$3, {
          channel: 9
        });
      case 10:
        return createComponent(SetupContainer$3, {
          channel: 10
        });
      case 11:
        return createComponent(SetupContainer$3, {
          channel: 11
        });
      case 12:
        return createComponent(SetupContainer$3, {
          channel: 12
        });
      case 13:
        return createComponent(SetupContainer$3, {
          channel: 13
        });
      case 14:
        return createComponent(SetupContainer$3, {
          channel: 14
        });
      case 15:
        return createComponent(SetupContainer$3, {
          channel: 15
        });
      case 16:
        return createComponent(SetupContainer$3, {
          channel: 16
        });
    }
  }
  function RenderCloseButton() {
    return createComponent(ButtonIcon, {
      "class": "squareButton",
      icon: "ic:outline-arrow-back-ios",
      width: 30,
      onClick: () => CloseSettings()
    });
  }
  function UpdateChannelButtonClass() {
    var toys = toyManager.GetToys();
    var array = [...toys];
    if (toys != void 0) {
      for (var i = 0; i <= toys.length - 1; i++) {
        if (toys[i].toyType.includes("Empty")) {
          array[i] = "channelButton";
        } else {
          array[i] = "channelButtonActiv";
        }
      }
      setChannelButtonClass(array);
    }
  }
  function RenderSidebarButtons() {
    return ssr(_tmpl$, ssrHydrationKey(), escape(createComponent(ButtonIcon, {
      icon: "mdi:account-outline",
      width: 35,
      onClick: () => setSelectedChannel(-1)
    })), escape(createComponent(ButtonIcon, {
      icon: "mdi:cog-outline",
      width: 35,
      onClick: () => setSelectedChannel(0)
    })), escape(createComponent(Button, {
      label: "1",
      get ["class"]() {
        return channelButtonClass()[0];
      },
      onClick: () => setSelectedChannel(1)
    })), escape(createComponent(Button, {
      label: "2",
      get ["class"]() {
        return channelButtonClass()[1];
      },
      onClick: () => setSelectedChannel(2)
    })), escape(createComponent(Button, {
      label: "3",
      get ["class"]() {
        return channelButtonClass()[2];
      },
      onClick: () => setSelectedChannel(3)
    })), escape(createComponent(Button, {
      label: "4",
      get ["class"]() {
        return channelButtonClass()[3];
      },
      onClick: () => setSelectedChannel(4)
    })), escape(createComponent(Button, {
      label: "5",
      get ["class"]() {
        return channelButtonClass()[4];
      },
      onClick: () => setSelectedChannel(5)
    })), escape(createComponent(Button, {
      label: "6",
      get ["class"]() {
        return channelButtonClass()[5];
      },
      onClick: () => setSelectedChannel(6)
    })), escape(createComponent(Button, {
      label: "7",
      get ["class"]() {
        return channelButtonClass()[6];
      },
      onClick: () => setSelectedChannel(7)
    })), escape(createComponent(Button, {
      label: "8",
      get ["class"]() {
        return channelButtonClass()[7];
      },
      onClick: () => setSelectedChannel(8)
    })), escape(createComponent(Button, {
      label: "9",
      get ["class"]() {
        return channelButtonClass()[8];
      },
      onClick: () => setSelectedChannel(9)
    })), escape(createComponent(Button, {
      label: "10",
      get ["class"]() {
        return channelButtonClass()[9];
      },
      onClick: () => setSelectedChannel(10)
    })), escape(createComponent(Button, {
      label: "11",
      get ["class"]() {
        return channelButtonClass()[10];
      },
      onClick: () => setSelectedChannel(11)
    })), escape(createComponent(Button, {
      label: "12",
      get ["class"]() {
        return channelButtonClass()[11];
      },
      onClick: () => setSelectedChannel(12)
    })), escape(createComponent(Button, {
      label: "13",
      get ["class"]() {
        return channelButtonClass()[12];
      },
      onClick: () => setSelectedChannel(13)
    })), escape(createComponent(Button, {
      label: "14",
      get ["class"]() {
        return channelButtonClass()[13];
      },
      onClick: () => setSelectedChannel(14)
    })), escape(createComponent(Button, {
      label: "15",
      get ["class"]() {
        return channelButtonClass()[14];
      },
      onClick: () => setSelectedChannel(15)
    })), escape(createComponent(Button, {
      label: "16",
      get ["class"]() {
        return channelButtonClass()[15];
      },
      onClick: () => setSelectedChannel(16)
    })));
  }
  function RenderHeadline() {
    if (selectedChannel() > 0) {
      return ssr(_tmpl$2, ssrHydrationKey(), escape(selectedChannel()));
    } else {
      switch (selectedChannel()) {
        case 0:
          return ssr(_tmpl$3, ssrHydrationKey());
        case -1:
          return ssr(_tmpl$4, ssrHydrationKey());
      }
    }
  }
  function RenderUIHeadline() {
    return ssr(_tmpl$5, ssrHydrationKey(), escape(RenderHeadline()), escape(RenderCloseButton()));
  }
  function RenderUI() {
    return ssr(_tmpl$6, ssrHydrationKey(), escape(RenderSidebarButtons()), escape(RenderUIHeadline()), escape(RenderContainer()));
  }
  canvasManager.SubscribeOneFPS(UpdateChannelButtonClass);
  return RenderUI();
}

const $$Index = createComponent$1(($$result, $$props, $$slots) => {
  var publicRef = GetPublicRef();
  var title = GetPageTitle();
  return renderTemplate`<html lang="de"> <head><link rel="icon"${addAttribute(`${publicRef}/logo.ico`, "href")} type="image/x-icon"><meta charset="UTF-8"><title>${title}</title>${renderHead()}</head> <body> <!-- MIDI Toys Setup --> ${renderScript($$result, "/run/media/artibex/AI/GitHub/MidiToys/src/pages/index.astro?astro&type=script&index=0&lang.ts")} ${renderComponent($$result, "SettingsPanel", SetupContainer, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "@components/SettingsPanel", "client:component-export": "default" })} ${renderComponent($$result, "ui.StartText", StartText, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "@ui", "client:component-export": "StartText" })} ${renderComponent($$result, "ui.OpenSettingsButton", OpenSettingsButton, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "@ui", "client:component-export": "OpenSettingsButton" })} <canvas id="toyCanvas" class="toyCanvas"></canvas> </body></html>`;
}, "/run/media/artibex/AI/GitHub/MidiToys/src/pages/index.astro", void 0);

const $$file = "/run/media/artibex/AI/GitHub/MidiToys/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
