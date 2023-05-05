import { createSignal, createEffect } from "solid-js";
import { MIDIKeyboard } from "../js/miditoy/MIDIKeyboard";
import { ToyManager } from "../js/miditoy/ToyManager";

var manager = new ToyManager();

export default function SetupContainer( props: {channel: number}) {
    var channel = props.channel;
    const [toyName, setToyName] = createSignal("Placeholder");
    const [numberOfKeys, setNumberOfKeys] = createSignal(13*2);
    const [startKey, setStartKey] = createSignal(12);

    function UpdateToyData() {
        if (typeof window !== 'undefined') {
            setToyName(manager.GetToyName(channel));
            setNumberOfKeys(manager.GetNumberOfKeys(channel));
            setStartKey(manager.GetStartKey(channel));
        } else setToyName("ManagerNotFound");
    }
    
    createEffect(() => {
        UpdateToy();
        UpdateToyData();
    });

    function UpdateToy() {
        manager.CreateMusicBall(channel, numberOfKeys(), startKey());
    }

    return (
    <div class="channelContainer">
        <div class="toyNameSetting">
        <button id="changeButton" onClick={UpdateToyData}>Change</button>            
        <h2 class="marginLeft20">{toyName()}</h2> 
        </div>
        Number of Keys 
            <input 
            class="numberInput" 
            type="number" min="1" 
            max="100" step="1" 
            onChange={(event) => setNumberOfKeys(parseInt(event.target.value))}
            value={numberOfKeys()} 
            /> 

        <br />
        Start Key 
        <input 
        class="numberInput" 
        type="number" 
        min="1" 
        max="100" 
        onChange={(event) => setStartKey(parseInt(event.target.value))}
        value={startKey()} 
        /> 
        <br />
        Collaps Notes <input class="toggleInput" type="checkbox" />          
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