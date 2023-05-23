import { createSignal, createEffect } from "solid-js";
import { ToyManager } from "../js/miditoy/ToyManager";
import { PresetManager } from "../js/PresetManager";
import * as utils from "../js/solidjs/ComponentUtils.js";
import * as ui from "./UIElements.jsx"

var tManager = new ToyManager();
var pManager = new PresetManager();

export default function SetupContainer( props: {channel: number}) {
    var channel = props.channel;
    var toy;

    const [presetName, setPresetName] = createSignal("");
    const [matchingItems, setMetchingItems] = createSignal([]);

    function GetMatchingItems() {
        setMetchingItems(pManager.FilterPresetsByType(toy.toyName));      
    }

    //Special settings

    const ToyChanged = () => {
        console.log("PRESET UI event");
        toy = utils.InitToy(channel, toy, ToyChanged);
        UpdateUIValues();
    };

    function LoadToy() {
        toy = utils.InitToy(channel, toy, ToyChanged);
    }

    function UpdateUIValues() {
        console.log("UPDATE PRESET UI values");
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
            console.log("DONE loading Preset with name = " + item.key);
        }
    }
    
    function SaveNewPreset() {
        if(presetName() != "") pManager.SaveNewPresetToy(presetName(), toy);
        setPresetName(""); //Set it back to empty
        UpdateUIValues();
    }

    function DeletePreset(item) {
        pManager.DeletePreset(item)
        GetMatchingItems();
    }

    //Upload a Preset from local system
    function UploadPreset(presetName, jsonObj) {
        // console.log("UPLOAD FILE");
        // console.log("name=" + presetName, " json=" + jsonObj);
        pManager.SaveNewPresetUpload(presetName, jsonObj);
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

    function RenderUI() {
        return (
            <div class="marginAuto">
                <div class="flexContainer width100">
                    <div class="flexList">
                        <div class="marginBottom5">Save new preset</div>
                        <input
                            class="textInput"
                            value={presetName()}
                            onChange={(event) => setPresetName(event.target.value)}
                        />
                        </div>
                        <ui.Button 
                            class="thinButton marginAuto"
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
                <ui.JsonFileUploader 
                onFileUpload={UploadPreset}
                />
            </div>
        )
    }

    function RenderAvailablePresets() {            
        return (
          <div class="">
            {matchingItems().map((item) => (
                <div class="flexContainer">
                        <ui.Button
                            class="width70 thinButton"
                            onClick={() => LoadPreset(item)}
                            label={GetPresetName(item)}
                        />
                    <div class="">
                        <ui.Button 
                            class="svgButton"
                            label={<ui.SVG src="src/public/icons/micions/download.svg" />}
                            onClick={() => DownloadPreset(item)}
                        />
                        <ui.Button 
                            class="svgButton"
                            label={<ui.SVG src="src/public/icons/micions/x-square.svg" />}
                            onClick={() => DeletePreset(item)}
                        />
                    </div>
                </div>
            ))}
        </div>
        )
    }

    LoadToy();
    UpdateUIValues(); //Get UI Values once at start
    var sumName = "Load/Save Preset";
    return ui.DetailsFillerCenter("Load/Save Settings", RenderUI());
}