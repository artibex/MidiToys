import { createSignal, createEffect } from "solid-js";
import { ToyManager } from "../../js/miditoy/ToyManager";
import { InitToy } from "../../js/solidjs/ComponentUtils.jsx";


var tManager = new ToyManager();

//This is a template to create a UI for a ToyClass
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

    //Init Component
    toy = InitToy(channel, toy, ToyChanged);
    UpdateUIValues(); //Get UI Values once at start
    return(
        <div>
            <details>
                <summary class="textAlignCenter marginAuto">
                Specific Settings
                </summary>
            <br></br>
            {/* Put Special Stuff here */}
            </details>
        </div>  
    )
}