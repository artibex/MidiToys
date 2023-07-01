import { createSignal, createEffect } from "solid-js";
import * as ui from "@ui"
import * as utils from "@utils";
import { PresetManager } from "@presetmanager";
import { CanvasManager } from "@canvasmanager";
import {GetUser} from "@firebaseClient";


var presetManager = new PresetManager();
const canvasManager = new CanvasManager();

export default function SetupContainer( props: {channel: number}) {
    var channel = props.channel;
    var toy;

    const [userLoggedIn, setUserLoggedIn] = createSignal(false);
    const [presetName, setPresetName] = createSignal("");
    const [matchingItems, setMetchingItems] = createSignal([]);

    const [useEffect, setUseEffect] = createSignal(true);
    const [onlineFunctionSelection, setOnlineFunctionSelection] = createSignal(0);
    const [presetSearchString, setPresetSearchString] = createSignal("");

    const [channelButtonClass, setChannelButtonClass] = createSignal(
        Array.from({ length: 3 }, () => "thinButton")
    );
    


    function GetMatchingItems() {
        setMetchingItems(presetManager.FilterPresetsByType(toy.toyName));      
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
                GetMatchingItems();
            }
        }
    }
    
    function LoadPreset(item) {
        if(toy != undefined) {
            toy.LoadJSON(JSON.parse(item.item));
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
            GetMatchingItems();
            UpdateUIValues();
        }
    }

    function SaveNewPresetOnline() {
        if(presetName() != "" && presetName().length > 4 && toy != undefined) {
            presetManager.SaveNewPresetLocal(presetName(), toy);
            presetManager.SaveNewPresetOnline(presetName(), toy);
        }
        setPresetName(""); //Set it back to empty
        UpdateUIValues();

    }

    //Gives item with key value
    function DeletePreset(item) {
        presetManager.DeletePresetLocal(item)
        GetMatchingItems();
    }

    function DeletePresetOnline(item) {

    }

    //Upload a Preset from local system
    function UploadPreset(presetName, jsonObj) {
        // console.log("UPLOAD FILE");
        // console.log("name=" + presetName, " json=" + jsonObj);
        presetManager.SaveNewPresetUploadLocal(presetName, jsonObj);
        UpdateUIValues();
    }

    function UploadPresetOnline(jsonObj) {

    }

    //Open system file explorer and give a JSON file to save
    function DownloadPreset(item) {
        const blob = new Blob([JSON.stringify(item.item)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = item.key + ".json";
      
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
                                onClick={() => LoadPreset(item)}
                                label={GetPresetName(item)}
                            />
                        </div>
                    <div class="flex justifyEnd width20 marginTopBottomAuto">
                        <ui.ButtonIcon
                            icon="material-symbols:download"
                            class="iconButton"
                            divClass="marginRight5"
                            onClick={() => DownloadPreset(item)}
                        />
                        {userLoggedIn() && (
                            <ui.ButtonIcon
                                icon="material-symbols:upload-sharp"
                                class="iconButton"
                                divClass="marginRight5"
                                onClick={() => UploadPresetOnline(item)}
                            />
                        )}
                        <ui.ButtonIcon
                            icon="material-symbols:delete-outline"
                            class="iconButton"
                            divClass=""
                            onClick={() => DeletePreset(item)}
                        />
                    </div>
                </div>
            ))}
        </div>
        )
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
                    onClick={() => SaveNewPresetOnline()}
                    label="Save"
                />
                </div>

                <h3 class="textAlignCenter"> Online Presets</h3>

                <br></br>
                <h3 class="textAlignCenter"> Local Presets</h3>
                {RenderLocalPresets()}
                <br></br>
                <div class="justifyCenter">
                    <ui.JsonFileUploader 
                        onFileUpload={UploadPresetOnline}
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
                    onFileUpload={UploadPreset}
                />
            </div>
        </div>

        )
    }

    //Returns whole HTML package
    function SearchOnlinePresets() {
        console.log("SEARCH presets online");
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