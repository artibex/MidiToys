import { createSignal, createEffect } from "solid-js";
import * as SpecificUI from "@specificui";

import PresetUI from "@components/PresetUI";
import ColorSettingsUI from "@components/ColorSettingsUI"
import KeySettingsUI from "@components/KeySettingsUI"

import * as utils from "@utils";
import * as ui from "@ui";


export default function SetupContainer( props: {channel: number}) {
    var toy;
    var channel = props.channel;
    var prevToyType: number = -1;
    const [useEffect, setUseEffect] = createSignal(true);
    
    //General Toy Settings
    const [selectToy, setSelectToy] = createSignal(false);
    const [toyType, setToyType] = createSignal(0);
    const [toyName, setToyName] = createSignal("EmptyToy");
    // const [numberOfKeys, setNumberOfKeys] = createSignal(12);
    // const [startKey, setStartKey] = createSignal(12);
    // const [collapsNote, setCollapsNote] = createSignal(true);

    createEffect(() => {
        if(useEffect()) {
            // console.log("TRIGGER effect");
            if(toyType() > 0 && toy != undefined) {
                UpdateToyValues();
            }
        } else {
            // console.log("DO NOT useEffect");

        } 
    })

    // const ToyChanged = () => {
    //     // Handle the event...
    //     // console.log("DEFAULT UI event");
    //     setUseEffect(false);
    //     UpdateUIValues();
    //     setUseEffect(true);
    // };

    //Update UI data
    function UpdateUIValues() {
        // console.log("UPDATE DEFAULT UI values");
        if (typeof window !== 'undefined') {

            if(toy != undefined) {
                setUseEffect(false);
                setToyName(toy.toyName);
                setUseEffect(true);
            }
        } else setToyName("Empty");
    }
    //Update Toy data
    function UpdateToyValues() {
        // console.log("UPDATE toy values");
        if (typeof window !== 'undefined') {
            //Remove old children
            // toy.RemoveChildrenFromLayer();

            // toy.numberOfKeys = numberOfKeys();
            // toy.startKey = startKey();
            // toy.useRegExp = collapsNote();

            // toy.SetPaperColor(toy.fillColor, fillColor().r, fillColor().g, fillColor().b, fillColor().a);
            // toy.SetPaperColor(toy.strokeColor, strokeColor().r, strokeColor().g, strokeColor().b, strokeColor().a);
            // toy.SetPaperColor(toy.accentColor, accentColor().r, accentColor().g, accentColor().b, accentColor().a);

            try {
                // toy.SetupMIDIReceiver(collapsNote());
                // toy.SetupKeyboard();
            } catch{}
        }
    }

    //Create a new Toy, get help from imported function to reduce code
    function NewToy() {
        //If toyType changed, create toy, otherwise, just udpate
        if(prevToyType != toyType()) {
            toy = utils.CreateToy(channel, toyType());
            toy.TriggerToyChangedEvent();
        }
        LoadToy();
        UpdateUIValues();
        prevToyType = toyType();
    }
    function UpdateComponent() {
        UpdateUIValues();
    }

    function LoadToy() {
        var t = utils.InitToy(channel, toy, UpdateComponent);
        if(toy != t) {
            toy = t;
            UpdateUIValues();
        }
    }

    //true or false, show Toy Selection or Toy Editing Panel
    function ToggleSelectToy() {
        var b = selectToy();
        if(b) setSelectToy(false);
        else setSelectToy(true);
    }

    //Set's a new Toy Type and creates new Toy
    function SetToyType(value: number) {
        setToyType(value);
        setSelectToy(false);
        NewToy();
    }

    //Takes all UI functions and returns it in one big package
    function RenderUI() {
        if(selectToy() == true) {
            return(
                <div>
                    {RenderToySelection()}
                </div>
            )
        } else {
            if(toyType() < 1) return (<></>)
            else {
                return(
                    <div class="noSelect">
                        {/* {RenderPresetUI()} */}
                        <PresetUI channel={channel} />
                        <br></br>
                        {RenderSpecificUISettings()}
                        <br></br>
                        <ColorSettingsUI channel={channel} />
                        <br></br>
                        <KeySettingsUI channel={channel} />
                        {/* <ui.DetailsFillerCenter summeryName={"Key Settings"} content={RenderKeySettings} /> */}
                    </div>
                )
            }
        }
    }
    //Specific UI's from a toy
    function RenderSpecificUISettings() {
        if(toyType() == 0) return(<></>)
        else {
            // NewToy();
            switch(toyType()) {
                case 1: return (<SpecificUI.GraviBoardUI channel={channel}></SpecificUI.GraviBoardUI>);
                case 2: return (<SpecificUI.PolyDrumUI channel={channel}></SpecificUI.PolyDrumUI>);
                default: return(<></>);
            }
        }
    }
    function RenderToySelection() {
        return(
            <div class="flexList">
                <button id="thinButton" onClick={() => SetToyType(0)}>None</button>
                <button id="thinButton" onClick={() => SetToyType(1)}>Gravi Board</button>
                <button id="thinButton" onClick={() => SetToyType(2)}>Poly Drum</button>
                {/* <button id="thinButton" onClick={() => SetToyType(3)}>Square Keyboard</button> */}
            </div>
        )
    }

    LoadToy();
    UpdateUIValues();
    return (
        <div class="channelContainer noSelect">
            <div class="flexContainer noSelect">
                <div>
                    <h3 class="marginAuto">{toyName()}</h3>
                    <div>MIDI Channel: {channel}</div>
                </div>
                <div>
                    <ui.ButtonIcon 
                    icon="material-symbols:build-outline-sharp"
                    onClick={() => ToggleSelectToy()}
                    width="35"
                    />
                    {/* <button id="thinButton" onClick={() => ToggleSelectToy()}>Select</button> */}
                    {/* <button id="thinButton" onClick={() => UpdateToyType(1)}>Next</button>                        */}
                </div>
            </div>
            <br></br>
            {RenderUI()}
        </div>
    );
}
