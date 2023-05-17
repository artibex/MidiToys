import { createSignal, createEffect } from "solid-js";
import { ToyManager } from "../js/miditoy/ToyManager";
import { RGBA } from "../js/Interfaces";
import { MIDIDataTable } from "../js/MIDIDataTable";
import GraviBoardUI from "./classSpecific/GraviBoardUI";
import PolyDrumUI from "./classSpecific/PolyDrumUI";
import PresetUI from "./PresetUI";
import { InitToy } from "../js/solidjs/ComponentUtils.js";
import { CreateToy } from "../js/solidjs/ComponentUtils.js";

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
            toy = InitToy(channel, toy, ToyChanged);

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
            UpdateUIValues();
        }
        prevToyType = toyType();
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
    function RenderUIElements() {
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
                        <details>
                            <summary class="textAlignCenter ">
                                Key Settings
                                {/* <h3 class="marginAuto thinButton">Key Settings</h3> */}
                            </summary>
                            <br></br>
                            <div class="flexContainer">
                                <div>Keys</div>
                                <div class="flexContainer">
                                    <input
                                        class="numberInput"
                                        type="number"
                                        min="1"
                                        max="100"
                                        step="1"
                                        value={numberOfKeys()}
                                        onChange={(event) => setNumberOfKeys(parseInt(event.target.value))}
                                    />
                                    <input
                                        class="sliderInput marginLeft10"
                                        type="range"
                                        min="1"
                                        max="100"
                                        step="1"
                                        value={numberOfKeys()}
                                        onChange={(event) => setNumberOfKeys(parseInt(event.target.value))}
                                    />
                                </div>
                            </div>
                            {RenderStartKeySetting()}
                            <div class="flexContainer">
                                <div>Collapse Notes</div>
                                <input
                                    class="toggleInput"
                                    type="checkbox"
                                    checked={collapsNote()}
                                    onChange={(event) => setCollapsNote(event.target.checked)}
                                />
                            </div>
                        </details>
                        <br></br>
                        {RenderColorSettings()}
                        <br></br>
                        {RenderSpecialUIElements()}
                        <br></br>
                        {RenderPresetUI()}
                    </div>
                )
            }
        }
    }
    //Renders basic Color UI (Buttons and Name)
    function RenderColorSettings() {
        return (
            <div>
                <details>
                    <summary class="textAlignCenter marginAuto">
                        Color Settings
                    </summary>
                    <br></br>
                    <div class="flexContainer">
                        <h3 class="marginAuto">{colorSelectionName()}</h3>
                        <div class="flexContainer">
                        <button class="thinButton" onClick={() => UpdateColorSelection(-1)}>Prev</button>
                        <button class="thinButton" onClick={() => UpdateColorSelection(1)}>Next</button>
                        </div>
                    </div>
                    <br></br>
                    {RenderColorSettingsSelection()}
                </details>
            </div>
        )
    }
    //Returns fillColor, strokeColor or accentColor UI
    function RenderColorSettingsSelection() {
        switch(colorSelection()) {
            case 0: return (
            <div>
                <div class="flexContainer">
                    <div>Red:</div>
                    <div class="flexContainer">
                    <input
                        class="numberInput"
                        type="number"
                        min="0"
                        max="255"
                        onChange={(event) => setFillColor({...fillColor(), r:parseInt(event.target.value)})}
                        value={fillColor().r}
                    />
                    <input
                        class="sliderInput marginLeft10"
                        type="range"
                        min="0"
                        max="255"
                        onChange={(event) => setFillColor({...fillColor(), r:parseInt(event.target.value)})}
                        value={fillColor().r}
                    />
                    </div>
                </div>
                <div class="flexContainer">
                    <div>Green:</div>
                    <div class="flexContainer">
                    <input
                        class="numberInput"
                        type="number"
                        min="0"
                        max="255"
                        onChange={(event) => setFillColor({...fillColor(), g:parseInt(event.target.value)})}
                        value={fillColor().g}
                    />
                    <input
                        class="sliderInput marginLeft10"
                        type="range"
                        min="0"
                        max="255"
                        onChange={(event) => setFillColor({...fillColor(), g:parseInt(event.target.value)})}
                        value={fillColor().g}
                    />
                    </div>
                </div>
                <div class="flexContainer">
                    <div>Blue:</div>
                    <div class="flexContainer">
                    <input
                        class="numberInput"
                        type="number"
                        min="0"
                        max="255"
                        onChange={(event) => setFillColor({...fillColor(), b:parseInt(event.target.value)})}
                        value={fillColor().b}
                    />
                    <input
                        class="sliderInput marginLeft10"
                        type="range"
                        min="0"
                        max="255"
                        onChange={(event) => setFillColor({...fillColor(), b:parseInt(event.target.value)})}
                        value={fillColor().b}
                    />
                    </div>
                </div>
                <div class="flexContainer">
                    <div>Alpha:</div>
                    <div class="flexContainer">
                    <input
                        class="numberInput"
                        type="number"
                        min="0"
                        max="255"
                        onChange={(event) => setFillColor({...fillColor(), a:parseInt(event.target.value)})}
                        value={fillColor().a}
                    />
                    <input
                        class="sliderInput marginLeft10"
                        type="range"
                        min="0"
                        max="255"
                        onChange={(event) => setFillColor({...fillColor(), a:parseInt(event.target.value)})}
                        value={fillColor().a}
                    />
                    </div>
                </div>
            </div>
            )
            case 1: return (
            <div>
                <div class="flexContainer">
                    <div>Red:</div>
                    <div class="flexContainer">
                    <input
                        class="numberInput"
                        type="number"
                        min="0"
                        max="255"
                        onChange={(event) => setStrokeColor({...strokeColor(), r:parseInt(event.target.value)})}
                        value={strokeColor().r}
                    />
                    <input
                        class="sliderInput marginLeft10"
                        type="range"
                        min="0"
                        max="255"
                        onChange={(event) => setStrokeColor({...strokeColor(), r:parseInt(event.target.value)})}
                        value={strokeColor().r}
                    />
                    </div>
                </div>
                <div class="flexContainer">
                    <div>Green:</div>
                    <div class="flexContainer">
                    <input
                        class="numberInput"
                        type="number"
                        min="0"
                        max="255"
                        onChange={(event) => setStrokeColor({...strokeColor(), g:parseInt(event.target.value)})}
                        value={strokeColor().g}
                    />
                    <input
                        class="sliderInput marginLeft10"
                        type="range"
                        min="0"
                        max="255"
                        onChange={(event) => setStrokeColor({...strokeColor(), g:parseInt(event.target.value)})}
                        value={strokeColor().g}
                    />
                    </div>
                </div>
                <div class="flexContainer">
                    <div>Blue:</div>
                    <div class="flexContainer">
                    <input
                        class="numberInput"
                        type="number"
                        min="0"
                        max="255"
                        onChange={(event) => setStrokeColor({...strokeColor(), b:parseInt(event.target.value)})}
                        value={strokeColor().b}
                    />
                    <input
                        class="sliderInput marginLeft10"
                        type="range"
                        min="0"
                        max="255"
                        onChange={(event) => setStrokeColor({...strokeColor(), b:parseInt(event.target.value)})}
                        value={strokeColor().b}
                    />
                    </div>
                </div>
                <div class="flexContainer">
                    <div>Alpha:</div>
                    <div class="flexContainer">
                    <input
                        class="numberInput"
                        type="number"
                        min="0"
                        max="255"
                        onChange={(event) => setStrokeColor({...strokeColor(), a:parseInt(event.target.value)})}
                        value={strokeColor().a}
                    />
                    <input
                        class="sliderInput marginLeft10"
                        type="range"
                        min="0"
                        max="255"
                        onChange={(event) => setStrokeColor({...strokeColor(), a:parseInt(event.target.value)})}
                        value={strokeColor().a}
                    />
                    </div>
                </div>
            </div>
            )
            case 2: return (
            <div>
                <div class="flexContainer">
                    <div>Red:</div>
                    <div class="flexContainer">
                    <input
                        class="numberInput"
                        type="number"
                        min="0"
                        max="255"
                        onChange={(event) => setAccentColor({...accentColor(), r:parseInt(event.target.value)})}
                        value={accentColor().r}
                    />
                    <input
                        class="sliderInput marginLeft10"
                        type="range"
                        min="0"
                        max="255"
                        onChange={(event) => setAccentColor({...accentColor(), r:parseInt(event.target.value)})}
                        value={accentColor().r}
                    />
                    </div>
                </div>
                <div class="flexContainer">
                    <div>Green:</div>
                    <div class="flexContainer">
                    <input
                        class="numberInput"
                        type="number"
                        min="0"
                        max="255"
                        onChange={(event) => setAccentColor({...accentColor(), g:parseInt(event.target.value)})}
                        value={accentColor().g}
                    />
                    <input
                        class="sliderInput marginLeft10"
                        type="range"
                        min="0"
                        max="255"
                        onChange={(event) => setAccentColor({...accentColor(), g:parseInt(event.target.value)})}
                        value={accentColor().g}
                    />
                    </div>
                </div>
                <div class="flexContainer">
                    <div>Blue:</div>
                    <div class="flexContainer">
                    <input
                        class="numberInput"
                        type="number"
                        min="0"
                        max="255"
                        onChange={(event) => setAccentColor({...accentColor(), b:parseInt(event.target.value)})}
                        value={accentColor().b}
                    />
                    <input
                        class="sliderInput marginLeft10"
                        type="range"
                        min="0"
                        max="255"
                        onChange={(event) => setAccentColor({...accentColor(), b:parseInt(event.target.value)})}
                        value={accentColor().b}
                    />
                    </div>
                </div>
                <div class="flexContainer">
                    <div>Alpha:</div>
                    <div class="flexContainer">
                    <input
                        class="numberInput"
                        type="number"
                        min="0"
                        max="255"
                        onChange={(event) => setAccentColor({...accentColor(), a:parseInt(event.target.value)})}
                        value={accentColor().a}
                    />
                    <input
                        class="sliderInput marginLeft10"
                        type="range"
                        min="0"
                        max="255"
                        onChange={(event) => setAccentColor({...accentColor(), a:parseInt(event.target.value)})}
                        value={accentColor().a}
                    />
                    </div>
                </div>
            </div>
            )
        }
    }
    //Specific UI's from a toy
    function RenderSpecialUIElements() {
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
    function RenderStartKeySetting() {
        //If collaps note is true, there is no need to set a start key, hide it
        if(collapsNote() == true) {
            return (
                <div></div>
            )
        } else {
            return (
                <div class="flexContainer">
                <div >Start Key ({MIDIDataTable.MIDINoteToString(startKey())}) </div>
                <div class="flexContainer">
                    <input
                        class="numberInput"
                        type="number"
                        min="1"
                        max="100"
                        onChange={(event) => setStartKey(parseInt(event.target.value))}
                        value={startKey()}
                    />
                    <input
                        class="sliderInput marginLeft10"
                        type="range"
                        min="1"
                        max="100"
                        onChange={(event) => setStartKey(parseInt(event.target.value))}
                        value={startKey()}
                    />
                </div>
            </div>

            )
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
        return(
            <PresetUI channel={channel}></PresetUI>
        )
    }

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
            {RenderUIElements()}
        </div>
    );
}
