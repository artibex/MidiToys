import { createSignal, createEffect } from "solid-js";
import { ToyManager } from "../js/miditoy/ToyManager";
import { PresetManager } from "../js/PresetManager";
import { InitToy } from "../js/solidjs/ComponentUtils.jsx";
import { DetailsFillerCenter, JsonFileUploader } from "../js/solidjs/ComponentUtils.jsx";

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
        toy = InitToy(channel, toy, ToyChanged);
        UpdateUIValues();
    };

    function LoadToy() {
        toy = InitToy(channel, toy, ToyChanged);
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
            <>
                <div class="flexContainer">
                    <div class="flexList">
                        <div class="marginBottom5">Save new preset</div>
                        <input
                            class="textInput"
                            value={presetName()}
                            onChange={(event) => setPresetName(event.target.value)}
                        />
                        </div>
                    <button class="thinButton marginAuto" onClick={() => SaveNewPreset()} >
                        Save
                    </button>
                </div>
                <br></br>
                {RenderAvailablePresets()}
                <br></br>
                <JsonFileUploader 
                onFileUpload={UploadPreset}
                />
            </>
        )
    }

    function RenderAvailablePresets() {            
        return (
          <div class="flexList">
            {matchingItems().map((item) => (
                <div class="flexContainer">
                    <div class="alignFlexStart">
                        <button class="thinButton" onClick={() => LoadPreset(item)}>
                            {GetPresetName(item)}
                        </button>
                    </div>
                    <div class="alignFlexEnd">
                        <div class="flexContainer">
                            <button class="squareButton" onClick={() => DownloadPreset(item)}>
                                DL
                            </button>
                            <button class="squareButton" onClick={() => DeletePreset(item)}>
                                X
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        ) as HTMLDivElement; // Cast to HTMLDivElement
    }

    LoadToy();
    UpdateUIValues(); //Get UI Values once at start
    var sumName = "Load/Save Preset";
    return DetailsFillerCenter("Load/Save Settings", RenderUI());
}