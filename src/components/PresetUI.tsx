import { createSignal, createEffect } from "solid-js";
import * as ui from "@ui"
import * as utils from "@utils";
import { PresetManager } from "@presetmanager";
import { CanvasManager } from "@canvasmanager";

var presetManager = new PresetManager();
const canvasManager = new CanvasManager();

export default function SetupContainer( props: {channel: number}) {
    var channel = props.channel;
    var toy;
    var updateToy = false;

    const [useEffect, setUseEffect] = createSignal(true);
    const [presetName, setPresetName] = createSignal("");
    const [matchingItems, setMetchingItems] = createSignal([]);

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
    }

    function LoadToy() {
        var t = utils.InitToy(channel, toy, UpdateComponent);
        if(toy != t) {
            toy = t;
            UpdateUIValues();
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
            // console.log(item.item);
            toy.LoadJSON(JSON.parse(item.item));
            // console.log("DONE loading Preset with name = " + item.key);
        }
    }
    
    function SaveNewPreset() {
        if(presetName() != "") presetManager.SaveNewPresetToy(presetName(), toy);
        setPresetName(""); //Set it back to empty
        UpdateUIValues();
    }

    function DeletePreset(item) {
        presetManager.DeletePreset(item)
        GetMatchingItems();
    }
    //Upload a Preset from local system
    function UploadPreset(presetName, jsonObj) {
        // console.log("UPLOAD FILE");
        // console.log("name=" + presetName, " json=" + jsonObj);
        presetManager.SaveNewPresetUpload(presetName, jsonObj);
        UpdateUIValues();
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

    function RenderAvailablePresets() {            
        return (
          <div class="">
            {matchingItems().map((item) => (
                <div class="flexContainer">
                        <ui.Button
                            class="width80 thinButton"
                            onClick={() => LoadPreset(item)}
                            label={GetPresetName(item)}
                        />
                    <div class="width20"></div>
                    <div class="flexContainer">
                        <ui.ButtonIcon 
                            class="squareButton"
                            icon="material-symbols:download"
                            onClick={() => DownloadPreset(item)}
                        />
                        <ui.ButtonIcon
                            class="squareButton"
                            icon="material-symbols:delete-outline"
                            onClick={() => DeletePreset(item)}
                        />
                    </div>
                </div>
            ))}
        </div>
        )
    }
    
    function RenderUI() {
        return (
            <div class="">
                <div class="flexContainer">
                    <div class="flexList">
                        <div class="marginBottom5">Save new preset</div>
                        <input
                            class="textInput"
                            value={presetName()}
                            onChange={(event) => setPresetName(event.target.value)}
                        />
                        </div>
                        <div class="width20"></div>
                        <ui.Button 
                            class="marginAuto thinButton"
                            onClick={() => SaveNewPreset()}
                            label="Save"
                        />
                    {/* <button class="thinButton marginAuto" onClick={() => SaveNewPreset()} >
                        Save
                    </button> */}
                </div>
                <br></br>
                {RenderAvailablePresets()}
                <br></br>
                <div class="flexList">
                    <ui.JsonFileUploader 
                    onFileUpload={UploadPreset}
                    />
                </div>
            </div>
        )
    }

    LoadToy();
    canvasManager.SubscribeOneFPS(UpdateComponent);
    var sumName = "Load/Save Preset";
    return (
        <ui.DetailsFillerCenter summeryName={"Load/Save Settings"} content={RenderUI()} />
    )
}