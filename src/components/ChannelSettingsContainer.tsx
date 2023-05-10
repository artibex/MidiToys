import { createSignal, createEffect } from "solid-js";
import { MIDIToy } from "../js/miditoy/MIDIToy";
import { ToyManager } from "../js/miditoy/ToyManager";
import { RGBA } from "../js/Interfaces";
import { MIDIDataTable } from "../js/MIDIDataTable";
import MusicSpheresUI from "./classSpecific/MusicSpheresUI";
import PolyDrumUI from "./classSpecific/PolyDrumUI";

var manager = new ToyManager();

export default function SetupContainer( props: {channel: number}) {
    var channel = props.channel;
    var toy;
    var prevToyType: number = -1;

    //General Toy Settings
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
        console.log("TRIGGER effect");
        if(toyType() > 0) {
            UpdateToyValues();
        }
        //CreateToy();
        //UpdateUIValues();
    })

    function InitToy(){
        toy = manager.GetToy(channel);
    }

    //Toy data Functions
    function UpdateUIValues() {
        console.log("UPDATE UI values");
        if (typeof window !== 'undefined') {
            InitToy();
            if(toy != undefined) {
                setToyName(toy.toyName);
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
        } else setToyName("ManagerNotFound");
    }
    function UpdateToyValues() {
        console.log("UPDATE toy values");
        if (typeof window !== 'undefined') {
            toy.RemoveChildrenFromLayer();
            toy.numberOfKeys = numberOfKeys();
            toy.startKey = startKey();
            toy.useRegExp = collapsNote();

            UpdateToyColorValues();
            if(toyType() != 0) {
                toy.SetupMIDIReceiver(collapsNote());
                toy.SetupKeyboard();
            }
        }
    }
    function UpdateToyColorValues() {
        if (typeof window !== 'undefined') {
            console.log("UPDATE toy color values");
            // var t = manager.GetToy(channel) as MIDIToy;
            toy.SetColor(toy.fillColor, fillColor().r, fillColor().g, fillColor().b, fillColor().a);
            toy.SetColor(toy.strokeColor, strokeColor().r, strokeColor().g, strokeColor().b, strokeColor().a);
            toy.SetColor(toy.accentColor, accentColor().r, accentColor().g, accentColor().b, accentColor().a);
        }
    }
    function CreateToy() {
        //If toyType changed, create toy, otherwise, just udpate
        if(prevToyType != toyType()) {
            switch(toyType()) {
                case 0: manager.CreateEmptyToy(channel, numberOfKeys(), startKey()); break;
                case 1: manager.CreateMusicBall(channel, numberOfKeys(), startKey()); break;
                case 2: manager.CreatePolyDrum(channel, numberOfKeys(), startKey()); break;
                case 3: manager.CreateSquareKeyboard(channel, numberOfKeys(), startKey()); break;
                default: break;
            }
            InitToy();
            UpdateUIValues();
        }
        prevToyType = toyType();
    }

    function UpdateToyType(value: number) {
        var calc = toyType();
        calc += value;
        if(calc < 0) calc = 3;
        if(calc > 3) calc = 0;
        setToyType(calc);
        CreateToy();
    }
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
    //Ui Rendering Functions
    function RenderDefaultUIElements() {
        if(toyType() < 1) return (<></>)
        else {
            return(
                <div class="noSelect">
                    <details>
                        <summary class="textAlignCenter marginAuto">
                            <h3 class="marginAuto thinButton">Key Settings</h3>
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
                </div>
            )
        }
    }
    function RenderColorSettings() {
        return (
            <div>
                <details>
                    <summary class="textAlignCenter marginAuto">
                        <h3 class="marginAuto thinButton noSelect">Color Settings</h3>
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
    function RenderSpecialUIElements() {
        if(toyType() == 0) return(<></>)
        else {
            CreateToy();
            switch(toyType()) {
                case 1: return (<MusicSpheresUI channel={channel}></MusicSpheresUI>);
                case 2: return (<PolyDrumUI channel={channel}></PolyDrumUI>);
                default: return(<></>);
            }
        }
    }

    return (
    <div class="channelContainer noSelect">
        <div class="flexContainer noSelect">
            <div>
                <h3 class="marginAuto">{toyName()}</h3>
                <div>MIDI Channel: {channel}</div>
            </div>
            <div>
                <button id="thinButton" onClick={() => UpdateToyType(-1)}>Prev</button>
                <button id="thinButton" onClick={() => UpdateToyType(1)}>Next</button>                       
            </div>
        </div>
        <br></br>
        
        {RenderDefaultUIElements()}
    </div>
    )
}