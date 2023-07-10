import { createSignal, createEffect } from "solid-js";
import * as ui from "@ui"
import * as utils from "@utils";
import { PresetManager } from "@presetmanager";
import { CanvasManager } from "@canvasmanager";
import {GetUser} from "@firebaseClient";
import { json } from "stream/consumers";


var presetManager = new PresetManager();
const canvasManager = new CanvasManager();

export default function SetupContainer( props: {channel: number}) {
    var channel = props.channel;
    
    var toy;
    
    const [myOnlinePresets, setMyOnlinePresets] = createSignal([]); //My Presets tab
    const [searchResult, setSearchResult] = createSignal([]); //Search tab
    const [newestPresets, setNewestPresets] = createSignal([]); //Search tab

    const [userLoggedIn, setUserLoggedIn] = createSignal(false);
    const [presetName, setPresetName] = createSignal("");
    const [matchingItems, setMetchingItems] = createSignal([]);

    const [useEffect, setUseEffect] = createSignal(true);
    const [onlineFunctionSelection, setOnlineFunctionSelection] = createSignal(0);
    const [presetSearchString, setPresetSearchString] = createSignal("");

    const [channelButtonClass, setChannelButtonClass] = createSignal(
        Array.from({ length: 3 }, () => "thinButton")
    );
    
    //Preset Data loading
    function GetMatchingPresetsLocal() {
        setMetchingItems(presetManager.FilterPresetsLocal(toy.toyType));      
    }
    async function GetMyPresetsOnline() {
        if(toy != undefined && presetManager != undefined) {
            var data = await presetManager.FilterMyPresetsOnline(toy.toyType);
            setMyOnlinePresets(data);
        }
    }
    async function GetSearchResult(searchStr: string) {
        if(toy != undefined && presetManager != undefined) {
            // console.log("SEARCH = " + searchStr);

            var data = await presetManager.SearchPresetsOnline(toy.toyType, searchStr);
            setSearchResult(data);
            // console.log(data);
        }
    }
    async function GetNewestPresets() {
        if(toy != undefined && presetManager != undefined) {
            console.log("GET newes presets");
            var data = await presetManager.GetNewesPresets(toy.toyType);
            setNewestPresets(data)
        }
    }

    //Special settings
    const ToyChanged = () => {
        // console.log("PRESET UI event");
        toy = utils.InitToy(channel, toy, ToyChanged);
        UpdateUIValues();
    };

    function UpdateComponent() {
        LoadToy();
        if(GetUser() != undefined) {
            setUserLoggedIn(true);
            // if(lastFetchedData().length > 0) {
            //     console.log(lastFetchedData()[0].data.presetData);  
            //     console.log(lastFetchedData()[0].data.presetName);      
            // }
        }
    }

    function LoadToy() {
        var t = utils.InitToy(channel, toy, UpdateComponent);
        if(toy != t) {
            toy = t;
            UpdateUIValues();
            // toy.SubscribeToToyChangedEvent(UpdateUIValues);
        }
    }

    function UpdateUIValues() {
    // console.log("UPDATE PRESET UI values");
    if (typeof window !== 'undefined') {
            //Put values here
            if(toy != undefined) {
                GetMatchingPresetsLocal();
                // if(userLoggedIn()) GetMyPresetsOnline();
            }
        }
    }
    
    function LoadPreset(data) {
        // console.log("Loading Preset =" + data);
        const jsonObj = presetManager.GetValidJSON(data);

        if(toy != undefined) {
            toy.LoadJSON(jsonObj);
            // try{
            //     toy.LoadJSON(jsonObj);
            // } catch {
            //     toy.LoadJSON(JSON.parse(item));
            // }

            // console.log("DONE loading Preset with name = " + item.key);
        }
    }
    
    function SetOnlineFunctionSelection(number) {
        setOnlineFunctionSelection(number);
        var array = [...channelButtonClass()];

        switch(onlineFunctionSelection()) {
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

    //Preset saving
    function SaveNewPreset() {
        if(presetName() != "" && presetName().length > 2 && toy != undefined) {
            // console.log("presetName() = " + presetName());
            presetManager.SaveNewPresetLocal(presetName(), toy);
            if(userLoggedIn() == true) {
                presetManager.SaveNewPresetOnline(presetName(), toy);
            }
            
            GetMatchingPresetsLocal();
            UpdateUIValues();
            GetMyPresetsOnline();

            setPresetName(""); //Set it back to empty
        } else console.log("Preset Name is null");
    }
    async function UploadExistingPresetOnline(item) {
        const pName = GetLocalPresetName(item)
        if(pName != "" && pName.length > 2 && toy != undefined) {
            presetManager.SaveExistingPresetOnline(pName, JSON.parse(item.item));
        } else console.log("pName is null, can't upload preset");
        // console.log("Short preset Name =" + pName);
        // await SaveExistingPresetOnline(pName, item);
        UpdateUIValues();
        GetMyPresetsOnline();
    }
    //Upload a Preset from local system
    function UploadPresetLocal(presetName, jsonObj) {
        // console.log("UPLOAD FILE");
        // console.log("name=" + presetName, " json=" + jsonObj);
        presetManager.SaveNewPresetUploadLocal(presetName, jsonObj);
        UpdateUIValues();
    }

    function DeleteLocalPreset(item) {
        presetManager.DeletePresetLocal(item)
        GetMatchingPresetsLocal();
    }
    async function DeletePresetOnline(id: string, presetData) {
        // console.log("DELETE this preset online: " + presetData);
        // console.log("ID = " + id);
        await presetManager.DeletePresetOnline(id, presetData);
        GetMyPresetsOnline();
        UpdateUIValues();
    }

    //Open system file explorer and give a JSON file to save
    function DownloadPreset(name, jsonData) {
        var blob;
        blob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });
        // try {
        //     blob = new Blob([JSON.stringify(item.item)], { type: 'application/json' });
        // }

        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = name + ".json";
      
        // Trigger the click event to initiate the download
        link.click();
      
        // Clean up the URL object
        URL.revokeObjectURL(url);
    }
    //Get the name of the preset for button display
    function GetLocalPresetName(item) {
        const split = item.key.split(".");
        return split[0];
    }

    //Preset rendering
    function RenderLocalPresets() {            
        return (
          <div>
            {matchingItems().map((item) => (
                <div class="flexContainer">
                        <div class="width60 justifyStart marginRight20">
                            <ui.Button
                                class="thinButton"
                                onClick={() => LoadPreset(item.item)}
                                label={GetLocalPresetName(item)}
                            />
                        </div>
                    <div class="flex justifyEnd width20 marginTopBottomAuto">
                        <ui.ButtonIcon
                            icon="material-symbols:download"
                            class="iconButton"
                            divClass="marginRight5"
                            onClick={() => DownloadPreset(item.key, item.item)}
                        />
                        {userLoggedIn() && (
                            <ui.ButtonIcon
                                icon="material-symbols:upload-sharp"
                                class="iconButton"
                                divClass="marginRight5"
                                onClick={() => UploadExistingPresetOnline(item)}
                            />
                        )}
                        <ui.ButtonIcon
                            icon="material-symbols:delete-outline"
                            class="iconButton"
                            divClass=""
                            onClick={() => DeleteLocalPreset(item)}
                        />
                    </div>
                </div>
            ))}
        </div>
        )
    }
    function RenderMyOnlinePresetsData() {
        if(myOnlinePresets().length > 0)
        return (
            <div>
              {myOnlinePresets()?.map((item) => (
                  <div class="flexContainer">
                          <div class="width60 justifyStart marginRight20">
                              <ui.Button
                                  class="thinButton"
                                  onClick={() => LoadPreset(item.presetData)}
                                  label={item.presetName}
                              />
                          </div>
                      <div class="flex justifyEnd width20 marginTopBottomAuto">
                          <ui.ButtonIcon
                              icon="material-symbols:download"
                              class="iconButton"
                              divClass="marginRight5"
                              onClick={() => DownloadPreset(item.presetName, item.presetData)}
                          />
                          <ui.ButtonIcon
                              icon="material-symbols:delete-outline"
                              class="iconButton"
                              divClass=""
                              onClick={() => DeletePresetOnline(item.id, item.presetData)}
                          />
                      </div>
                  </div>
              ))}
          </div>
        )
    
        else {
            return(
                <></>
            )
        }
    }
    function RenderOnlineSearchData() {
        if(searchResult().length > 0)
        return (
            <div>
              {searchResult()?.map((item) => (
                  <div class="flexContainer">
                          <div class="width800 justifyStart marginRight20">
                              <ui.Button
                                  class="thinButton"
                                  onClick={() => LoadPreset(item.presetData)}
                                  label={item.presetName}
                              />
                          </div>
                      <div class="flex justifyEnd width10 marginTopBottomAuto">
                          <ui.ButtonIcon
                              icon="material-symbols:download"
                              class="iconButton"
                              divClass="marginRight5"
                              onClick={() => DownloadPreset(item.presetName, item.presetData)}
                          />
                          {/* <ui.ButtonIcon
                              icon="material-symbols:delete-outline"
                              class="iconButton"
                              divClass=""
                              onClick={() => DeletePresetOnline(item.id, item.presetData)}
                          /> */}
                      </div>
                  </div>
              ))}
          </div>
        )
        else {
            return(
                <></>
            )
        }
    }
    function RenderNewestPresets() {
        if(newestPresets().length > 0)
        return (
            <div>
              {newestPresets()?.map((item) => (
                  <div class="flexContainer">
                          <div class="width800 justifyStart marginRight20">
                              <ui.Button
                                  class="thinButton"
                                  onClick={() => LoadPreset(item.presetData)}
                                  label={item.presetName}
                              />
                          </div>
                      <div class="flex justifyEnd width10 marginTopBottomAuto">
                          <ui.ButtonIcon
                              icon="material-symbols:download"
                              class="iconButton"
                              divClass="marginRight5"
                              onClick={() => DownloadPreset(item.presetName, item.presetData)}
                          />
                          {/* <ui.ButtonIcon
                              icon="material-symbols:delete-outline"
                              class="iconButton"
                              divClass=""
                              onClick={() => DeletePresetOnline(item.id, item.presetData)}
                          /> */}
                      </div>
                  </div>
              ))}
          </div>
        )
        else {
            return(
                <></>
            )
        }
    }

    function RenderMyOnlinePresetsTab() {
        return (
            <div>                
                <div class="flex">
                <div class="width70">
                    <div class="flexList">
                        <div class="marginBottom5">Save new preset</div>
                        <ui.TextInput
                            // class="textInput"
                            placeholder="Preset"
                            value={presetName()}
                            onChange={(event) => setPresetName(event)}
                        />
                    </div>
                </div>
                <ui.Button 
                    class="thinButton width30"
                    id="SaveOnline"
                    onClick={() => SaveNewPreset()}
                    label="Save"
                />
                </div>

                <h3 class="textAlignCenter">Online Presets</h3>
                {RenderMyOnlinePresetsData()}

                <br></br>
                <ui.DetailsFillerCenter 
                    summeryName={"Local Presets"} 
                    content={RenderLocalPresets()}
                    summeryClass="summeryMinimal textAlignCenter marginAuto"
                    detailClass="detailsMinimal marginAuto"
                />
                {/* <h3 class="textAlignCenter">Local Presets</h3>
                {RenderLocalPresets()} */}
                <br></br>
                <div class="justifyCenter">
                    <ui.JsonFileUploader 
                        onFileUpload={UploadExistingPresetOnline}
                    />
                </div>

            </div>
        )
    }
    function RenderSearchPresetsTab() {
        return(
            <div>
                <div class="flex justifySpace marginAuto">
                    <ui.TextInput
                        type="searchInput" 
                        placeholder="Preset Name"
                        onChange={(event) => setPresetSearchString(event)}
                    />
                    <ui.ButtonIcon
                        icon="mdi:search"
                        divClass=""
                        onClick={() => GetSearchResult(presetSearchString())}
                    />
                </div>
                {RenderOnlineSearchData()}
            </div>
        )
    }
    function RenderNewestPresetsTab() {
        return(
            <div>
                <div class="flex justifyCenter">
                    <h3 class="marginTopBottomAuto">Get the newest created Presets</h3>
                    <div class="width40">
                        <ui.ButtonIcon
                            label="Reload"
                            icon="mdi:reload"
                            onClick={() => GetNewestPresets()}
                        />
                    </div>
                </div>
                {RenderNewestPresets()}
            </div>
        )
    }

    //Local version of preset managment
    function RenderLocalPresetManagement() {
        return(
            <div>
                <div class="flex">
                <div class="width70">
                    <div class="flexList">
                        <div class="marginBottom5">Save new preset</div>
                        <ui.TextInput
                            // class="textInput"
                            placeholder="Preset"
                            value={presetName()}
                            onChange={(event) => setPresetName(event)}
                        />
                    </div>
                </div>
                <ui.Button 
                    class="thinButton width30"
                    onClick={() => SaveNewPreset()}
                    label="Save"
                    id="Save Local"
                />
                </div>

            <br></br>
            {RenderLocalPresets()}
            
            <br></br>
            <div class="justifyCenter">
                <ui.JsonFileUploader 
                    onFileUpload={UploadPresetLocal}
                />
            </div>
        </div>

        )
    }
    //The function the user wanted to interact with
    function RenderOnlineFunctionSelection() {
        switch(onlineFunctionSelection()) {
            case 0: //My Presets
                return(
                    <div>
                        {RenderMyOnlinePresetsTab()}
                    </div>
                )
            case 1: //Browse for presets
                return(
                    <div>
                        {RenderSearchPresetsTab()}
                    </div>
                )
            case 2: //New
                return(
                    <div>
                        {RenderNewestPresetsTab()}
                        {/* <h2 class="textAlignCenter">Put new Presets here</h2> */}
                    </div>
                )
        }
    }

    //Collects all other functions of online preset management here
    function RenderOnlinePresetManagement() {
        return(
            <div>
                <div class="flex justifyCenter">
                    <ui.Button 
                        label="My Presets"
                        class={channelButtonClass()[0]}
                        divClass=""
                        onClick={() => SetOnlineFunctionSelection(0)}
                    />
                    <ui.Button 
                        label="Browse"
                        class={channelButtonClass()[1]}
                        divClass="marginLeft5 marginRight5"
                        onClick={() => SetOnlineFunctionSelection(1)}
                    />
                    <ui.Button 
                        label="New"
                        class={channelButtonClass()[2]}
                        divClass=""
                        onClick={() => SetOnlineFunctionSelection(2)}
                    />
                </div>
                <br></br>
                {RenderOnlineFunctionSelection()}
            </div>
        )
    }

    function RenderUI() {
        if(userLoggedIn()) {
            return RenderOnlinePresetManagement();
        } else {
            return RenderLocalPresetManagement();
        }
    }

    LoadToy();
    if(GetUser() != undefined) {
        setUserLoggedIn(true);

        setTimeout(() => {
            GetMyPresetsOnline();
            GetNewestPresets();
        }, 1000);
    }
    canvasManager.SubscribeOneFPS(UpdateComponent);
    return (
        <ui.DetailsFillerCenter summeryName={"Presets"} content={RenderUI()} />
    )
}