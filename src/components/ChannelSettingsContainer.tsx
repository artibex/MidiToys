import { createSignal, createEffect } from "solid-js";
import { CanvasManager } from "@canvasmanager";

import PresetUI from "@components/PresetUI";
import ColorSettingsUI from "@components/ColorSettingsUI"
import KeySettingsUI from "@components/KeySettingsUI"

import * as SpecificUI from "@specificui";
import * as utils from "@utils";
import * as ui from "@ui";

const canvasManager = new CanvasManager;

export default function SetupContainer( props: {channel: number}) {
    var toy;
    var channel = props.channel;
    var prevToyType: number = -1;
    const [useEffect, setUseEffect] = createSignal(true);
    
    //General Toy Settings
    const [selectToy, setSelectToy] = createSignal(false);
    const [toyType, setToyType] = createSignal(0);
    const [toyName, setToyName] = createSignal("EmptyToy");

    // createEffect(() => {
    //     // if(useEffect()) {
    //     //     // console.log("TRIGGER effect");
    //     //     if(toyType() > 0 && toy != undefined) {
    //     //         // UpdateToyValues();
    //     //     }
    //     // } else {
    //     //     // console.log("DO NOT useEffect");
    //     // } 
    // })

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
            if(toy.toyName.toLowerCase().includes("Empty")) {
                setSelectToy(true);
            } else {
                GetToyType();
            }
            UpdateUIValues();
        }
    }

    //true or false, show Toy Selection or Toy Editing Panel
    function ToggleSelectToy() {
        var b = selectToy();
        if(b) setSelectToy(false);
        else setSelectToy(true);
    }

    function GetToyType() {
        if(toy != undefined) {
        var name = toy.toyName.toLowerCase();
            
            switch(true) {
                case name.includes("gravi"):
                    SetToyType(1, false);
                    break;
                case name.includes("poly"):
                    SetToyType(2, false);
                    break;
            }
        }
    }

    //Set's a new Toy Type and creates new Toy
    function SetToyType(value: number, newToy: boolean) {
        setToyType(value);
        setSelectToy(false);
        
        if(newToy) NewToy();
    }

    //Takes all UI functions and returns it in one big package
    function RenderUI() {
        if(selectToy() == true) {
            return(
                <div>
                    {RenderToySelection()}
                </div>
            )
        } 
        else {
            if(toyType() < 1) {
                return(
                    <div>
                        {RenderToySelection()}
                    </div>        
                )
            }
            else {
                return(
                    <div class="noSelect">
                        <PresetUI channel={channel} />
                        <br></br>
                        {RenderSpecificUISettings()}
                        <br></br>
                        <ColorSettingsUI channel={channel} />
                        <br></br>
                        <KeySettingsUI channel={channel} />
                    </div>
                )
            }
        }
    }

    //Specific UI's from a toy
    function RenderSpecificUISettings() {
        if(toyType() == 0) return(<></>)
        else {
            switch(toyType()) {
                case 1: return (<SpecificUI.GraviBoardUI channel={channel}></SpecificUI.GraviBoardUI>);
                case 2: return (<SpecificUI.PolyDrumUI channel={channel}></SpecificUI.PolyDrumUI>);
                default: return(<></>);
            }
        }
    }
    
    function RenderToySelection() {        
        var emptyToy = <button id="thinButton" onClick={() => SetToyType(0, true)}>None</button>
        var toys = <>
            <button id="thinButton" onClick={() => SetToyType(1, true)}>Gravi Board</button>
            <button id="thinButton" onClick={() => SetToyType(2, true)}>Poly Drum</button>
        </>;
        
        if(toyType() > 0) {
            return (
                <div>
                    {emptyToy}
                    {toys}
                </div>
            )
        } else {
            return (
                toys
            )
        }
        
    }

    LoadToy();
    UpdateUIValues();
    canvasManager.SubscribeOneFPS(UpdateComponent);
    return (
        <div class="channelContainer noSelect">
            <div>
                <div class="flexContainer">
                    <div class="">
                        <h2 class="marginAuto">{toyName()}</h2>
                    </div>
                    <div>
                        <ui.ButtonIcon 
                        icon="material-symbols:build-outline-sharp"
                        onClick={() => ToggleSelectToy()}
                        width="30"
                        />
                        {/* <button id="thinButton" onClick={() => ToggleSelectToy()}>Select</button> */}
                        {/* <button id="thinButton" onClick={() => UpdateToyType(1)}>Next</button>                        */}
                    </div>
                </div>
            </div>
            <br></br>
            {RenderUI()}
        </div>
    );
}
