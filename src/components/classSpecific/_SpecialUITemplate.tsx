import { createSignal, createEffect } from "solid-js";
import { ToyManager } from "../../js/miditoy/ToyManager";
import PresetUI from "../PresetUI"


var tManager = new ToyManager();

export default function SetupContainer( props: {channel: number}) {
    var channel = props.channel;
    var toy;
    const [useEffect, setUseEffect] = createSignal(true);

    //Special settings

    createEffect(() => {
        if(useEffect()) {
            console.log("TRIGGER SPECIAL effect");
            UpdateToyValues();
        }
    })

    function InitToy(){
        toy = tManager.GetToy(channel);
        // toy.UnsubscribeFromToyChangedEvent(ToyChanged);
        toy.SubscribeToToyChangedEvent(ToyChanged);
    }
    const ToyChanged = () => {
        // Handle the event...
        console.log("DEFAULT UI event");
        setUseEffect(false);
        UpdateUIValues();
        setUseEffect(true);
      };


    function UpdateUIValues() {
        console.log("UPDATE SPECIAL UI values");
        if (typeof window !== 'undefined') {
            InitToy();     
            
            //Put values here
            if(toy != undefined) {
                
            }
        }
    }
    
    function UpdateToyValues() {
        console.log("UPDATE toy values");
        if (typeof window !== 'undefined') {
            //Put values here
            if(toy != undefined) {
                //Remove old objects
                toy.RemoveChildrenFromLayer();
                
                //Reload Keyboard
                toy.SetupKeyboard();
            }
        }
    }

    UpdateUIValues(); //Get UI Values once at start
    return(
        <div>
            <details>
            <summary class="textAlignCenter marginAuto">
                <h3 class="marginAuto thinButton">Special Settings</h3>
            </summary>
            <br></br>
            {/* Put Special Stuff here */}
            </details>
            <br></br>
            <PresetUI channel={channel}></PresetUI>
        </div>  
    )
}