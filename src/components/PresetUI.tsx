import { createSignal, createEffect } from "solid-js";
import { ToyManager } from "../js/miditoy/ToyManager";
import { PresetManager } from "../js/PresetManager";
import { InitToy } from "../js/solidjs/ComponentUtils.js";

var tManager = new ToyManager();
var pManager = new PresetManager();

export default function SetupContainer( props: {channel: number}) {
    var channel = props.channel;
    var toy;

    const [presetName, setPresetName] = createSignal("");
    const [matchingItems, setMetchingItems] = createSignal([]);

    function GetMatchingItems() {
        setMetchingItems(pManager.FilterPresetsByType(toy.constructor.name));      
    }

    //Special settings

    const ToyChanged = () => {
        console.log("PRESET UI event");
        // UpdateUIValues();
        // Handle the event...
    };

    // function InitToy(){
    //     toy = tManager.GetToy(channel);
    //     // toy.SubscribeToToyChangedEvent(ToyChanged);
    // }

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
        pManager.SaveNewPreset(presetName(), toy);
        setPresetName(""); //Set it back to empty
        UpdateUIValues();
    }

    function DeletePreset(item) {
        pManager.DeletePreset(item)
        GetMatchingItems();
    }

    //Upload a Preset from local system
    function UploadPreset(item) {

    }

    //Open system file explorer and give a JSON file to save
    function DownloadPreset(item) {

    }

    //Get the name of the preset for button display
    function GetPresetName(item) {
        const split = item.key.split(".");
        return split[0];
    }

    function RenderAvailablePresets() {            
        return (
          <div class="flexList">
            {matchingItems().map((item) => (
                <div class="flexContainer">
                    <button class="thinButton textAlignLeft" onClick={() => LoadPreset(item)}>
                        {GetPresetName(item)}
                    </button>
                    <div class="flexContainer width50">
                    <button class="squareButton" onClick={() => DownloadPreset(item)}>
                        DL
                    </button>
                    <button class="squareButton" onClick={() => DeletePreset(item)}>
                        X
                    </button>
                    </div>
                </div>
            ))}
        </div>
        ) as HTMLDivElement; // Cast to HTMLDivElement
    }

    toy = InitToy(channel, toy, ToyChanged);
    UpdateUIValues(); //Get UI Values once at start
    return(
        <details>
        <summary class="textAlignCenter marginAuto">
            Load/Save Preset
        </summary>
        <br></br>
        <div class="flexContainer">
            <div class="flexList">
                <div class="marginBottom5">Save new preset</div>
                <input
                    class="textInput"
                    value={presetName()}
                    onChange={(event) => setPresetName(event.target.value)}
                />
            </div>
            <button class="thinButton heigt50" onClick={() => SaveNewPreset()} >
                Save
            </button>
        </div>
        
        <br></br>
        {RenderAvailablePresets()}
    </details>
    )
}