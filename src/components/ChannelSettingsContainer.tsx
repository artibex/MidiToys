import { createSignal, createEffect } from "solid-js";
import { MIDIToy } from "../js/miditoy/MIDIToy";
import { ToyManager } from "../js/miditoy/ToyManager";
import { RGBA } from "../js/Interfaces";
import { MIDIDataTable } from "../js/MIDIDataTable";

var manager = new ToyManager();


export default function SetupContainer( props: {channel: number}) {
    var channel = props.channel;
    
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
        //CreateToy();
        UpdateToyValues();
        //UpdateUIValues();
    })

    //Toy data Functions
    function UpdateUIValues() {
        console.log("UPDATE UI values");
        if (typeof window !== 'undefined') {
            var t = manager.GetToy(channel);
            if(t != undefined) {
                setToyName(t.toyName);
                setNumberOfKeys(t.numberOfKeys);
                setStartKey(t.startKey);
                setCollapsNote(t.useRegExp);
    
                var mColor: RGBA = t.GetColor(t.mainColor);
                var sColor: RGBA = t.GetColor(t.secondaryColor);
                var aColor: RGBA = t.GetColor(t.accentColor);
                setMainColor({r:mColor.r, g:mColor.g , b:mColor.b, a:mColor.a});
                setSecondaryColor({r:sColor.r, g:sColor.g , b:sColor.b, a:sColor.a});
                setAccentColor({r:aColor.r, g:aColor.g , b:aColor.b, a:aColor.a});
            }
        } else setToyName("ManagerNotFound");
    }
    function UpdateToyValues() {
        console.log("UPDATE toy values");
        if (typeof window !== 'undefined') {
            manager.RemoveChildrenFromLayer(channel);
            var t = manager.GetToy(channel) as MIDIToy;
            t.numberOfKeys = numberOfKeys();
            t.startKey = startKey();
            t.useRegExp = collapsNote();

            UpdateToyColorValues();
            if(toyType() != 0) {
                t.SetupMIDIReceiver(collapsNote());
                t.SetupKeyboard();
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
        switch(toyType()) {
            case 0: manager.CreateEmptyToy(channel, numberOfKeys(), startKey()); break;
            case 1: manager.CreateMusicBall(channel, numberOfKeys(), startKey()); break;
            case 2: manager.CreateDrumMaschin(channel, numberOfKeys(), startKey()); break;
            case 3: manager.CreateSquareKeyboard(channel, numberOfKeys(), startKey()); break;
            default: break;
        }
        UpdateUIValues();
    }

    function PrevToyType() {
        var value = toyType();
        value--;
        if(value < 0) value = 3;
        setToyType(value);
        CreateToy();
        UpdateUIValues();
    }
    function NextToyType() {
        var value = toyType();
        value++;
        if(value > 3) value = 0;
        setToyType(value);
        CreateToy();
        UpdateUIValues();
    }

    //Ui Rendering Functions
    function RenderDefaultUIElements() {
        if(toyType() == 0) return (<></>)
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
                                    type="value"
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
                                    type="value" 
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
                </div>
            )
        }
    }
    function RenderSpecialUIElements() {
        if(toyType() == 0) return(<></>)
        else {
            switch(toyType()) {
                case 1: break;
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
                        type="value"
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
                        type="value"
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
                        type="value"
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
                        type="value"
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
                        type="value"
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
                        type="value"
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
                        type="value"
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
                        type="value"
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
                        type="value"
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
                        type="value"
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
                        type="value"
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
                        type="value"
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
    <div class="channelContainer">
        <div class="flexContainer noSelect">
            <div>
                <h3 class="marginAuto">{toyName()}</h3>
                <div>MIDI Channel: {channel}</div>
            </div>
            <div>
                <button id="thinButton" onClick={PrevToyType}>Prev</button>
                <button id="thinButton" onClick={NextToyType}>Next</button>                       
            </div>
        </div>
        <br></br>
        {RenderDefaultUIElements()}
        {RenderSpecialUIElements()}
    </div>
    )
}


export function ChangeToy() {
    console.log("CHANGING toy");
    
    return (
        <div>
            <button id="changeButton">Toy 1</button>            
        </div>
    )
}