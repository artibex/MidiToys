import { createSignal, createEffect } from "solid-js";
import { ToyManager } from "../../js/miditoy/ToyManager";

var manager = new ToyManager();

export default function SetupContainer( props: {channel: number}) {
    var channel = props.channel;
    var toy;

    //Special settings

    createEffect(() => {
        console.log("TRIGGER SPECIAL effect");
        UpdateToyValues();
    })

    function UpdateUIValues() {
        console.log("UPDATE SPECIAL UI values");
        if (typeof window !== 'undefined') {
            toy = manager.GetToy(channel);
            
            //Put values here
            if(toy != undefined) {
                
            }
        }
    }
    
    function UpdateToyValues() {
        console.log("UPDATE toy values");
        if (typeof window !== 'undefined') {
            //Remove old objects
            toy.RemoveChildrenFromLayer();
            
            //Put values here
            if(toy != undefined) {
                
                //Reload Keyboard
                toy.SetupKeyboard();
            }
        }
    }

    UpdateUIValues(); //Get UI Values once at start

    return(
        <details>
        <summary class="textAlignCenter marginAuto">
            <h3 class="marginAuto thinButton">Special Settings</h3>
        </summary>
        <br></br>
        {/* Put Special Stuff here */}

    </details>
    )
}