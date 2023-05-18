import { createSignal, createEffect } from "solid-js";
import { ToyManager } from "../../js/miditoy/ToyManager";
import { InitToy } from "../../js/solidjs/ComponentUtils.jsx";
import { DetailsFillerCenter, NumberSliderUIElement } from "../../js/solidjs/ComponentUtils.jsx";

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

      function LoadToy() {
        toy = InitToy(channel, toy, ToyChanged);
    }


    function UpdateUIValues() {
        console.log("UPDATE SPECIAL UI values");
        if (typeof window !== 'undefined') {
            toy = InitToy(channel, toy, ToyChanged);

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

    function RenderUI() {
        
    }

    //Init Component
    LoadToy();
    UpdateUIValues(); //Get UI Values once at start
    return DetailsFillerCenter(toy.constructor.name + " Settings", RenderUI());
    // return(
    //     <div>
    //         <details>
    //             <summary class="textAlignCenter marginAuto">
    //             Specific Settings
    //             </summary>
    //         <br></br>
    //         {/* Put Special Stuff here */}
    //         </details>
    //     </div>  
    // )
}