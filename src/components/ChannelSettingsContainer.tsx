import { createSignal, createEffect } from "solid-js";
import { MIDIToy } from "../js/miditoy/MIDIToy";
import { ToyManager } from "../js/miditoy/ToyManager";
import { RGB } from "../js/Interfaces";

var manager = new ToyManager();


export default function SetupContainer( props: {channel: number}) {
    var channel = props.channel;
    
    //General Toy Settings
    const [toyType, setToyType] = createSignal(0);
    const [toyName, setToyName] = createSignal("Placeholder");
    const [numberOfKeys, setNumberOfKeys] = createSignal(13*2);
    const [startKey, setStartKey] = createSignal(12);
    const [collapsNote, setCollapsNote] = createSignal(true);
    //Colors
    const [mainColor, setMainColor] = createSignal<RGB>({ r: 0, g: 0, b: 0 });
    const [secondaryColor, setSecondaryColor] = createSignal<RGB>({ r: 0, g: 0, b: 0 });
    const [accentColor, setAccentColor] = createSignal<RGB>({ r: 0, g: 0, b: 0 });

    createEffect(() => {
        console.log("TRIGGER effect");
        //CreateToy();
        UpdateToyValues();
        UpdateUIValues();
    })

    function UpdateUIValues() {
        console.log("UPDATE UI values");
        if (typeof window !== 'undefined') {
            var t = manager.GetToy(channel);
            setToyName(t.toyName);
            setNumberOfKeys(t.numberOfKeys);
            setStartKey(t.startKey);
            setCollapsNote(t.useRegExp);
            
        } else setToyName("ManagerNotFound");
    }
    function UpdateToyValues() {
        console.log("UPDATE toy values");
        manager.RemoveChildrenFromLayer(channel);
        // manager.SetToyNumberOfKeys(channel, numberOfKeys());
        // manager.SetToyStartKey(channel, startKey());
        var t = manager.GetToy(channel) as MIDIToy;
        t.numberOfKeys = numberOfKeys();
        t.startKey = startKey();
        t.useRegExp = collapsNote();
        t.SetupMIDIReceiver(collapsNote());
        t.SetupKeyboard();
    }
    function CreateToy() {
        switch(toyType()) {
            case 0: manager.CreateEmptyToy(channel, numberOfKeys(), startKey()); break;
            case 1: manager.CreateMusicBall(channel, numberOfKeys(), startKey()); break;
            case 2: manager.CreateDrumMaschin(channel, numberOfKeys(), startKey()); break;
            case 3: manager.CreateSquareKeyboard(channel, numberOfKeys(), startKey()); break;
            default: break;
        }
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

    function RenderDefaultUIElements() {
        if(toyType() == 0) return (<></>)
        else {
            return(
                <div>
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
                        <div >Start Key</div>
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

    return (
    <div class="channelContainer">
        <h2>MIDI Channel {channel}</h2>
        <div class="toyNameSetting">
        <button id="changeButton" onClick={PrevToyType}>Prev</button>
        <button id="changeButton" onClick={NextToyType}>Next</button>                       
        <h2 class="marginLeft20">{toyName()}</h2> 
        </div>

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