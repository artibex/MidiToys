import { createSignal, createEffect } from "solid-js";
import { ToyManager } from "@toymanager";
import { CanvasManager } from "@canvasmanager";
import * as utils from "@utils";
import * as ui from "@ui";

var toyManager = new ToyManager();
const canvasManager = new CanvasManager


//This is a template to create a UI for a ToyClass
export default function SetupContainer( props: {channel: number}) {
    var toy;
    var channel = props.channel;
    const [useEffect, setUseEffect] = createSignal(true);

    const [toyName, setToyName] = createSignal("ToyName");
    //Special settings

    createEffect(() => {
        if(useEffect()) {
            UpdateToyValues();
            // console.log("TRIGGER SPECIAL effect");
        }
    })

    function UpdateComponent() {
        LoadToy();
    }

    function LoadToy() {
        var t = utils.InitToy(channel, toy, UpdateComponent);
        if(toy != t) {
            toy = t;
            UpdateUIValues();
        }
    }

    function UpdateUIValues() {
        // console.log("UPDATE SPECIAL UI values");
        if (typeof window !== 'undefined') {
            if(toy != undefined) {
                setUseEffect(false);

                setUseEffect(true);
            }
        }
    }
    function UpdateToyValues() {
        // console.log("UPDATE GraviBoard toy values");
        if (typeof window !== 'undefined') {
            if(toy != undefined) {
                
                try {
                    //Reload Keyboard
                    toy.ApplySettings();
                } catch {}
            }
        }
    }
    function Reload() {
        try{toy.SetupKeyboard()}
        catch{}
    }

    function RenderUI() {
        return(
            <>

            </>
        )
    }

    //Init Component
    LoadToy();
    canvasManager.SubscribeOneFPS(UpdateComponent);
    return (
        <ui.DetailsFillerCenter summeryName={toyName() + " Settings"} content={RenderUI()}  />
    )
}