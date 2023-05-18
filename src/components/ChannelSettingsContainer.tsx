import { createSignal, createEffect } from "solid-js";
import { ToyManager } from "../js/miditoy/ToyManager";
import { RGBA } from "../js/Interfaces";
import { MIDIDataTable } from "../js/MIDIDataTable";
import GraviBoardUI from "./classSpecific/GraviBoardUI";
import PolyDrumUI from "./classSpecific/PolyDrumUI";
import PresetUI from "./PresetUI";
import { InitToy, CreateToy } from "../js/solidjs/ComponentUtils.jsx";
import { DetailsFillerCenter, NumberInput, SliderInput, CheckboxInput, NumberSliderCombo } from "../js/solidjs/ComponentUtils.jsx";

export default function SetupContainer( props: {channel: number}) {
    var toy;
    var channel = props.channel;
    var prevToyType: number = -1;
    const [useEffect, setUseEffect] = createSignal(true);
    
    //General Toy Settings
    const [selectToy, setSelectToy] = createSignal(false);
    const [toyType, setToyType] = createSignal(0);
    const [toyName, setToyName] = createSignal("EmptyToy");
    const [numberOfKeys, setNumberOfKeys] = createSignal(12);
    const [startKey, setStartKey] = createSignal(12);
    const [collapsNote, setCollapsNote] = createSignal(true);
    //Colors
    const [colorSelection, setColorSelection] = createSignal(0);
    const [colorSelectionName, setColorSelectionName] = createSignal("Fill Color");
    const [fillColor, setFillColor] = createSignal<RGBA>({ r:0, g:0, b:0, a:0});
    const [strokeColor, setStrokeColor] = createSignal<RGBA>({ r:0, g:0, b:0, a:0});
    const [accentColor, setAccentColor] = createSignal<RGBA>({ r:0, g:0, b:0, a:0});

    createEffect(() => {
        if(useEffect()) {
            console.log("TRIGGER effect");
            if(toyType() > 0 && toy != undefined) {
                UpdateToyValues();
            }
        } else console.log("DO NOT useEffect");
    })

    const ToyChanged = () => {
        // Handle the event...
        console.log("DEFAULT UI event");
        setUseEffect(false);
        UpdateUIValues();
        setUseEffect(true);
    };

    //Update UI data
    function UpdateUIValues() {
        console.log("UPDATE DEFAULT UI values");
        if (typeof window !== 'undefined') {

            if(toy != undefined) {
                setToyName(toy.constructor.name);
                setNumberOfKeys(toy.numberOfKeys);
                setStartKey(toy.startKey);
                setCollapsNote(toy.useRegExp);

                var mColor: RGBA = toy.GetColor(toy.fillColor);
                var sColor: RGBA = toy.GetColor(toy.strokeColor);
                var aColor: RGBA = toy.GetColor(toy.accentColor);
                setFillColor({r:mColor.r, g:mColor.g , b:mColor.b, a:mColor.a});
                setStrokeColor({r:sColor.r, g:sColor.g , b:sColor.b, a:sColor.a});
                setAccentColor({r:aColor.r, g:aColor.g , b:aColor.b, a:aColor.a});
            }
        } else setToyName("Click 'Select'");
    }
    //Update Toy data
    function UpdateToyValues() {
        console.log("UPDATE toy values");
        if (typeof window !== 'undefined') {
            //Remove old children
            toy.RemoveChildrenFromLayer();

            toy.numberOfKeys = numberOfKeys();
            toy.startKey = startKey();
            toy.useRegExp = collapsNote();

            toy.SetColor(toy.fillColor, fillColor().r, fillColor().g, fillColor().b, fillColor().a);
            toy.SetColor(toy.strokeColor, strokeColor().r, strokeColor().g, strokeColor().b, strokeColor().a);
            toy.SetColor(toy.accentColor, accentColor().r, accentColor().g, accentColor().b, accentColor().a);

            if(toyType() != 0) {
                toy.SetupMIDIReceiver(collapsNote());
                toy.SetupKeyboard();
            }
        }
    }

    //Create a new Toy, get help from imported function to reduce code
    function NewToy() {
        //If toyType changed, create toy, otherwise, just udpate
        if(prevToyType != toyType()) {
            toy = CreateToy(channel, toyType());
            toy.TriggerToyChangedEvent();
        }
        LoadToy();
        UpdateUIValues();
        prevToyType = toyType();
    }

    function LoadToy() {
        toy = InitToy(channel, toy, ToyChanged);
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
    //What kind of color do you want to edit?
    function UpdateColorSelection(value: number) {
        var calc = colorSelection();
        calc += value;
        if(calc < 0) calc = 2;
        if(calc > 2) calc = 0;

        switch(calc) {
            case 0: setColorSelectionName("Fill Color"); break;
            case 1: setColorSelectionName("Stroke Color"); break;
            case 2: setColorSelectionName("Accent Color"); break;
        }
        setColorSelection(calc);
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
                        {RenderPresetUI()}
                        <br></br>
                        {RenderSpecificUISettings()}
                        <br></br>
                        {DetailsFillerCenter("Color Settings", RenderColorSettings())}
                        <br></br>
                        {DetailsFillerCenter("Key Settings", RenderKeySettings())}
                    </div>
                )
            }
        }
    }
    //Key note settings
    function RenderKeySettings() {
        return(
            <>
                <div class="flexContainer">
                    <div>Keys</div>
                    <div class="flexContainer">
                        <NumberSliderCombo
                            minMaxStep={[1, 100, 1]}
                            value={numberOfKeys()}
                            onChange={setNumberOfKeys}
                        />
                    </div>
                </div>
                {RenderStartKeySetting()}
                <div class="flexContainer">
                    <div>Collapse Notes</div>
                    <CheckboxInput checked={collapsNote()} onChange={setCollapsNote} />
                </div>
            </>
        )
    }
    //Retusn more or less UI, depends on a settings
    function RenderStartKeySetting() {
        //If collaps note is true, there is no need to set a start key, hide it
        if(collapsNote() == true) {
            return (
                // Sorry, nothing
                <div></div>
            )
        } else {
            return (
                <div class="flexContainer">
                <div >Start Key ({MIDIDataTable.MIDINoteToString(startKey())}) </div>
                <div class="flexContainer">
                    <NumberSliderCombo 
                        minMaxStep={[1,100,1]}
                        value={startKey()}
                        onChange={setStartKey}
                    />
                </div>
            </div>

            )
        }
    }
    //Renders basic Color UI (Buttons and Name)
    function RenderColorSettings() {
        return (
            <>
                <div class="flexContainer">
                    <h3 class="marginAuto">{colorSelectionName()}</h3>
                    <div class="flexContainer">
                    <button class="thinButton" onClick={() => UpdateColorSelection(-1)}>Prev</button>
                    <button class="thinButton" onClick={() => UpdateColorSelection(1)}>Next</button>
                    </div>
                </div>
                <br></br>
                {RenderColorSettingsSelection()}
            </>
        )
    }
    //Returns fillColor, strokeColor or accentColor UI
    function RenderColorSettingsSelection() {
        switch(colorSelection()) {
            //fillColor
            case 0: return (
            <div>
                <div class="flexContainer">
                    <div>Red:</div>
                    <NumberSliderCombo 
                        minMaxStep={[0, 255, 1]}
                        value={fillColor().r}
                        onChange={(value) => setFillColor({ ...fillColor(), r: value })}
                    />
                </div>
                <div class="flexContainer">
                    <div>Green:</div>
                    <NumberSliderCombo 
                        minMaxStep={[0, 255, 1]}
                        value={fillColor().g}
                        onChange={(value) => setFillColor({ ...fillColor(), g: value })}
                    />
                </div>
                <div class="flexContainer">
                    <div>Blue:</div>
                    <NumberSliderCombo 
                        minMaxStep={[0, 255, 1]}
                        value={fillColor().b}
                        onChange={(value) => setFillColor({ ...fillColor(), b: value })}
                    />
                </div>
                <div class="flexContainer">
                    <div>Alpha:</div>
                    <NumberSliderCombo 
                        minMaxStep={[0, 255, 1]}
                        value={fillColor().a}
                        onChange={(value) => setFillColor({ ...fillColor(), a: value })}
                    />
                </div>
            </div>
            )
            //strokeColor
            case 1: return (
            <div>
                <div class="flexContainer">
                    <div>Red:</div>
                    <NumberSliderCombo 
                        minMaxStep={[0, 255, 1]}
                        value={strokeColor().r}
                        onChange={(value) => setStrokeColor({ ...strokeColor(), r: value })}
                    />
                </div>
                <div class="flexContainer">
                    <div>Green:</div>
                    <NumberSliderCombo 
                        minMaxStep={[0, 255, 1]}
                        value={strokeColor().g}
                        onChange={(value) => setStrokeColor({ ...strokeColor(), g: value })}
                    />
                </div>
                <div class="flexContainer">
                    <div>Blue:</div>
                    <NumberSliderCombo 
                        minMaxStep={[0, 255, 1]}
                        value={strokeColor().b}
                        onChange={(value) => setStrokeColor({ ...strokeColor(), b: value })}
                    />
                </div>
                <div class="flexContainer">
                    <div>Alpha:</div>
                    <NumberSliderCombo 
                        minMaxStep={[0, 255, 1]}
                        value={strokeColor().a}
                        onChange={(value) => setStrokeColor({ ...strokeColor(), a: value })}
                    />
                </div>
            </div>
            )
            //accentColor
            case 2: return (
            <div>
                <div class="flexContainer">
                    <div>Red:</div>
                    <NumberSliderCombo 
                        minMaxStep={[0, 255, 1]}
                        value={accentColor().r}
                        onChange={(value) => setAccentColor({ ...accentColor(), r: value })}
                    />
                </div>
                <div class="flexContainer">
                    <div>Green:</div>
                    <NumberSliderCombo
                        minMaxStep={[0, 255, 1]}
                        value={accentColor().g}
                        onChange={(value) => setAccentColor({ ...accentColor(), g: value })}
                    />
                </div>
                <div class="flexContainer">
                    <div>Blue:</div>
                    <NumberSliderCombo
                        minMaxStep={[0, 255, 1]}
                        value={accentColor().b}
                        onChange={(value) => setAccentColor({ ...accentColor(), b: value })}
                    />
                </div>
                <div class="flexContainer">
                    <div>Alpha:</div>
                    <NumberSliderCombo
                        minMaxStep={[0, 255, 1]}
                        value={accentColor().a}
                        onChange={(value) => setAccentColor({ ...accentColor(), a: value })}
                    />
                </div>
            </div>
            )
        }
    }
    //Specific UI's from a toy
    function RenderSpecificUISettings() {
        if(toyType() == 0) return(<></>)
        else {
            NewToy();
            switch(toyType()) {
                case 1: return (<GraviBoardUI channel={channel}></GraviBoardUI>);
                case 2: return (<PolyDrumUI channel={channel}></PolyDrumUI>);
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
                <button id="thinButton" onClick={() => SetToyType(3)}>Square Keyboard</button>
            </div>
        )
    }
    //Renders the Preset Managemtn UI system
    function RenderPresetUI() {
        NewToy();
        return(
            <PresetUI channel={channel}></PresetUI>
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
                    <button id="thinButton" onClick={() => ToggleSelectToy()}>Select</button>
                    {/* <button id="thinButton" onClick={() => UpdateToyType(1)}>Next</button>                        */}
                </div>
            </div>
            <br></br>
            {RenderUI()}
        </div>
    );
}
