import { createSignal, createEffect } from "solid-js";
import { ToyManager } from "../js/miditoy/ToyManager";
import { PresetManager } from "../js/PresetManager";
import { Item } from "paper/dist/paper-core";

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

    // createEffect(() => {
    //     console.log("TRIGGER SPECIAL effect");
    //     //UpdateToyValues();
    // })

    const ToyChanged = () => {
        console.log("PRESET UI event");
        // UpdateUIValues();
        // Handle the event...
    };

    function InitToy(){
        toy = tManager.GetToy(channel);
        toy.SubscribeToToyChangedEvent(ToyChanged);
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
                <button
                    class="thinButton"
                    onClick={() => LoadPreset(item)}
                >
                    {GetPresetName(item)}
                </button>
                <button
                    class="marginLeft20"
                    onClick={() => DownloadPreset(item)}
                >
                    DL
                </button>
                <button
                    class=""
                    onClick={() => DeletePreset(item)}
                >
                    Delete
                </button>
                </div>
            ))}
          </div>
        ) as HTMLDivElement; // Cast to HTMLDivElement
    }

    InitToy();
    UpdateUIValues(); //Get UI Values once at start
    return(
        <details>
        <summary class="textAlignCenter marginAuto">
            <h3 class="marginAuto thinButton noSelect">Load/Save Preset</h3>
        </summary>
        <br></br>
        <div class="flexContainer">
            <h3 class="marginAuto">Save new preset</h3>
            </div>
            <div class="flexContainer">
            <input
                class="textInput"
                value={presetName()}
                onChange={(event) => setPresetName(event.target.value)}
            />
            <button class="thinButton" onClick={() => SaveNewPreset()} >
                Save
            </button>
            <br></br>
        </div>
        <br></br>
        {RenderAvailablePresets()}
    </details>
    )
}