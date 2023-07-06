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
    
    const [fetchedOnlineData, setFetchedOnlineData] = createSignal([]); //online fetched data
    const [userLoggedIn, setUserLoggedIn] = createSignal(false);
    const [presetName, setPresetName] = createSignal("");
    const [matchingItems, setMetchingItems] = createSignal([]);

    const [useEffect, setUseEffect] = createSignal(true);
    const [onlineFunctionSelection, setOnlineFunctionSelection] = createSignal(0);
    const [presetSearchString, setPresetSearchString] = createSignal("");

    const [channelButtonClass, setChannelButtonClass] = createSignal(
        Array.from({ length: 3 }, () => "thinButton")
    );
    
    function GetMatchingPresetsLocal() {
        setMetchingItems(presetManager.FilterPresetsLocal(toy.toyType));      
    }
    async function GetMatchingPresetsOnline() {
        if(toy != undefined && presetManager != undefined) {
            var data = await presetManager.FilterPresetsOnline(toy.toyType);
            setFetchedOnlineData(data);
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
                if(userLoggedIn()) GetMatchingPresetsOnline();
            }
        }
    }
    
    function LoadPreset(data) {
        console.log("Loading Preset =" + data);
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

    function SaveNewPreset() {
        if(presetName() != "" && presetName().length > 4 && toy != undefined) {
            // console.log("presetName() = " + presetName());
            presetManager.SaveNewPresetLocal(presetName(), toy);
            setPresetName(""); //Set it back to empty
            GetMatchingPresetsLocal();
            UpdateUIValues();
        }
    }

    function SaveNewPresetOnline(pName) {
        if(pName != "" && pName.length > 4 && toy != undefined) {
            presetManager.SaveNewPresetLocal(pName, toy);
            presetManager.SaveNewPresetOnline(pName, toy);
        }
        setPresetName(""); //Set it back to empty
        UpdateUIValues();
    }

    //Returns whole HTML package
    function SearchOnlinePresets() {
        console.log("SEARCH presets online");
    }

    function SaveExistingPresetOnline(pName: string, item) {
        if(pName != "" && pName.length > 4 && toy != undefined) {
            // console.log("Upload existing Presets");
            // console.log("JSON = " + JSON.parse(item.item));
            presetManager.SaveExistingPresetOnline(pName, JSON.parse(item.item));
        }
    }

    //Gives item with key value
    function DeleteLocalPreset(item) {
        presetManager.DeletePresetLocal(item)
        GetMatchingPresetsLocal();
    }

    async function DeletePresetOnline(id: string, presetData) {
        // console.log("DELETE this preset online: " + presetData);
        // console.log("ID = " + id);
        await presetManager.DeletePresetOnline(id, presetData);
        GetMatchingPresetsOnline();
    }

    //Upload a Preset from local system
    function UploadPresetLocal(presetName, jsonObj) {
        // console.log("UPLOAD FILE");
        // console.log("name=" + presetName, " json=" + jsonObj);
        presetManager.SaveNewPresetUploadLocal(presetName, jsonObj);
        UpdateUIValues();
    }
    async function UploadExistingPresetOnline(item) {
        // console.log("Short preset Name =" + pName);
        const pName = GetPresetName(item)
        await SaveExistingPresetOnline(pName, item);
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
    function GetPresetName(item) {
        const split = item.key.split(".");
        return split[0];
    }

    function RenderLocalPresets() {            
        return (
          <div>
            {matchingItems().map((item) => (
                <div class="flexContainer">
                        <div class="width60 justifyStart marginRight20">
                            <ui.Button
                                class="thinButton"
                                onClick={() => LoadPreset(item.item)}
                                label={GetPresetName(item)}
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
    
    function RenderFetchedOnlinePresets() {
        if(fetchedOnlineData().length > 0)
        return (
            <div>
              {fetchedOnlineData()?.map((item) => (
                  <div class="flexContainer">
                          <div class="width60 justifyStart marginRight20">
                              <ui.Button
                                  class="thinButton"
                                  onClick={() => LoadPreset(item.data.presetData)}
                                  label={item.data.presetName}
                              />
                          </div>
                      <div class="flex justifyEnd width20 marginTopBottomAuto">
                          <ui.ButtonIcon
                              icon="material-symbols:download"
                              class="iconButton"
                              divClass="marginRight5"
                              onClick={() => DownloadPreset(item.data.presetName, item.data.presetData)}
                          />
                          <ui.ButtonIcon
                              icon="material-symbols:delete-outline"
                              class="iconButton"
                              divClass=""
                              onClick={() => DeletePresetOnline(item.id, item.data.presetData)}
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

    function RenderOnlinePresets() {
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
                            onChange={(event) => setPresetName(event.target.value)}
                        />
                    </div>
                </div>
                <ui.Button 
                    class="thinButton width30"
                    onClick={() => SaveNewPresetOnline(presetName())}
                    label="Save"
                />
                </div>

                <h3 class="textAlignCenter"> Online Presets</h3>
                {RenderFetchedOnlinePresets()}

                <br></br>
                <h3 class="textAlignCenter"> Local Presets</h3>
                {RenderLocalPresets()}
                <br></br>
                <div class="justifyCenter">
                    <ui.JsonFileUploader 
                        onFileUpload={UploadExistingPresetOnline}
                    />
                </div>

            </div>
        )
    }

    function RenderNewOnlinePresets() {
        //Show all newly created presets
        return(
            <></>
        )
    }

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
                            onChange={(event) => setPresetName(event.target.value)}
                        />
                    </div>
                </div>
                <ui.Button 
                    class="thinButton width30"
                    onClick={() => SaveNewPreset()}
                    label="Save"
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

    function RenderOnlineSearch() {
        return(
            <></>
        )
    }

    function RenderOnlineFunctionSelection() {
        switch(onlineFunctionSelection()) {
            case 0: //My Presets
                return(
                    <div>
                        {RenderOnlinePresets()}
                    </div>
                )
            case 1: //Browse
                return(
                    <div>
                        <div class="flex justifySpace marginAuto">
                            <ui.TextInput
                                type="searchInput" 
                                placeholder="Preset Name, User, or User ID"
                                onChange={setPresetSearchString()}
                            />
                            <ui.ButtonIcon
                                icon="mdi:search"
                                divClass=""
                                onClick={SearchOnlinePresets}
                            />
                        </div>
                        {RenderOnlineSearch()}
                    </div>
                )
            case 2: //New
                return(
                    <div>
                        <h2 class="textAlignCenter">Put new Presets here</h2>
                    </div>
                )
        }
    }

    function RenderOnlinePresetManagement() {
        return(
            <div>
                <div class="flex justifyCenter marginAuto">
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
    if(GetUser() != undefined) setUserLoggedIn(true);
    canvasManager.SubscribeOneFPS(UpdateComponent);
    return (
        <ui.DetailsFillerCenter summeryName={"Presets"} content={RenderUI()} />
    )
}