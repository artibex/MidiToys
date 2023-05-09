import { createSignal, createEffect } from "solid-js";
import { MIDIToy } from "../js/miditoy/MIDIToy";
import { ToyManager } from "../js/miditoy/ToyManager";
import { RGBA } from "../js/Interfaces";
import { MIDIDataTable } from "../js/MIDIDataTable";
import MusicSpheresUI from "./classSpecific/MusicSpheresUI";

var manager = new ToyManager();


export default function SetupContainer( props: {channel: number}) {
    var channel = props.channel;
    var toy;
    var prevToyType: number = -1;

    //General Toy Settings
    const [toyType, setToyType] = createSignal(0);
    const [toyName, setToyName] = createSignal("EmptyToy");
    const [numberOfKeys, setNumberOfKeys] = createSignal(13*2);
    const [startKey, setStartKey] = createSignal(12);
    const [collapsNote, setCollapsNote] = createSignal(true);
    //Colors
    const [colorSelection, setColorSelection] = createSignal(0);
    const [mainColor, setMainColor] = createSignal<RGBA>({ r:0, g:0, b:0, a:0});
    const [secondaryColor, setSecondaryColor] = createSignal<RGBA>({ r:0, g:0, b:0, a:0});
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
    
                var mColor: RGBA = toy.GetColor(toy.mainColor);
                var sColor: RGBA = toy.GetColor(toy.secondaryColor);
                var aColor: RGBA = toy.GetColor(toy.accentColor);
                setMainColor({r:mColor.r, g:mColor.g , b:mColor.b, a:mColor.a});
                setSecondaryColor({r:sColor.r, g:sColor.g , b:sColor.b, a:sColor.a});
                setAccentColor({r:aColor.r, g:aColor.g , b:aColor.b, a:aColor.a});
            }
        } else setToyName("ManagerNotFound");
    }
    function UpdateToyValues() {
        console.log("UPDATE toy values");
        if (typeof window !== 'undefined') {
            InitToy();
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
            var t = manager.GetToy(channel) as MIDIToy;
            t.SetColor(t.mainColor, mainColor().r, mainColor().g, mainColor().b, mainColor().a);
            t.SetColor(t.secondaryColor, secondaryColor().r, secondaryColor().g, secondaryColor().b, secondaryColor().a);
            t.SetColor(t.accentColor, accentColor().r, accentColor().g, accentColor().b, accentColor().a);
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
            UpdateUIValues();
        }
        InitToy();
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

                    <details>
                        <summary class="textAlignCenter marginAuto">
                            <h3 class="marginAuto thinButton noSelect">Color Settings</h3>
                        </summary>
                        <br></br>
                        <div class="flexContainer">
                            <button class="thinButton" onClick={() => setColorSelection(0)}>Main</button>
                            <button class="thinButton" onClick={() => setColorSelection(1)}>Secondary</button>
                            <button class="thinButton" onClick={() => setColorSelection(2)}>Accent</button>
                        </div>
                        <br></br>
                        {RenderColorSettings(colorSelection())}
                    </details>

                    <br></br>
                    {RenderSpecialUIElements()}
                </div>
            )
        }
    }
    function RenderSpecialUIElements() {
        if(toyType() == 0) return(<></>)
        else {
            CreateToy();
            switch(toyType()) {
                case 1: return <MusicSpheresUI channel={channel}></MusicSpheresUI>
                case 2: break;
            }
            return(
                <></>
            )
        }
    }

    function RenderColorSettings(colorSetting: number) {
        setColorSelection(colorSetting);
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
                        onChange={(event) => setMainColor({...mainColor(), r:parseInt(event.target.value)})}
                        value={mainColor().r} 
                    />
                    <input 
                        class="sliderInput marginLeft10" 
                        type="range"
                        min="0" 
                        max="255" 
                        onChange={(event) => setMainColor({...mainColor(), r:parseInt(event.target.value)})}
                        value={mainColor().r} 
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
                        onChange={(event) => setMainColor({...mainColor(), g:parseInt(event.target.value)})}
                        value={mainColor().g} 
                    />
                    <input 
                        class="sliderInput marginLeft10" 
                        type="range"
                        min="0" 
                        max="255" 
                        onChange={(event) => setMainColor({...mainColor(), g:parseInt(event.target.value)})}
                        value={mainColor().g} 
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
                        onChange={(event) => setMainColor({...mainColor(), b:parseInt(event.target.value)})}
                        value={mainColor().b} 
                    />
                    <input 
                        class="sliderInput marginLeft10" 
                        type="range"
                        min="0" 
                        max="255"
                        onChange={(event) => setMainColor({...mainColor(), b:parseInt(event.target.value)})}
                        value={mainColor().b} 
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
                        onChange={(event) => setMainColor({...mainColor(), a:parseInt(event.target.value)})}
                        value={mainColor().a} 
                    />
                    <input 
                        class="sliderInput marginLeft10" 
                        type="range"
                        min="0" 
                        max="255"
                        onChange={(event) => setMainColor({...mainColor(), a:parseInt(event.target.value)})}
                        value={mainColor().a} 
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
                        onChange={(event) => setSecondaryColor({...secondaryColor(), r:parseInt(event.target.value)})}
                        value={secondaryColor().r} 
                    />
                    <input 
                        class="sliderInput marginLeft10" 
                        type="range"
                        min="0" 
                        max="255" 
                        onChange={(event) => setSecondaryColor({...secondaryColor(), r:parseInt(event.target.value)})}
                        value={secondaryColor().r} 
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
                        onChange={(event) => setSecondaryColor({...secondaryColor(), g:parseInt(event.target.value)})}
                        value={secondaryColor().g} 
                    />
                    <input 
                        class="sliderInput marginLeft10" 
                        type="range"
                        min="0" 
                        max="255" 
                        onChange={(event) => setSecondaryColor({...secondaryColor(), g:parseInt(event.target.value)})}
                        value={secondaryColor().g} 
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
                        onChange={(event) => setSecondaryColor({...secondaryColor(), b:parseInt(event.target.value)})}
                        value={secondaryColor().b} 
                    />
                    <input 
                        class="sliderInput marginLeft10" 
                        type="range"
                        min="0" 
                        max="255"
                        onChange={(event) => setSecondaryColor({...secondaryColor(), b:parseInt(event.target.value)})}
                        value={secondaryColor().b} 
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
                        onChange={(event) => setSecondaryColor({...secondaryColor(), a:parseInt(event.target.value)})}
                        value={secondaryColor().a} 
                    />
                    <input 
                        class="sliderInput marginLeft10" 
                        type="range"
                        min="0"
                        max="255"
                        onChange={(event) => setSecondaryColor({...secondaryColor(), a:parseInt(event.target.value)})}
                        value={secondaryColor().a} 
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