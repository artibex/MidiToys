import * as utils from "@utils";
import * as ui from "@ui";
import { createSignal, createEffect } from "solid-js";
import { CanvasManager } from "../js/CanvasManager";
import { ToyManager } from "../js/miditoy/ToyManager";
import { MIDIDataTable } from "../js/MIDIDataTable.js";

const canvasManager = new CanvasManager();

export default function SetupContainer( props: {channel: number}) {
    var toy;
    var channel = props.channel;

    const [useEffect, setUseEffect] = createSignal(true);


    const [numberOfKeys, setNumberOfKeys] = createSignal(12);
    const [startKey, setStartKey] = createSignal(12);
    const [collapsNote, setCollapsNote] = createSignal(true);

    createEffect(() => {
        if(useEffect()) {
            UpdateToyValues();
        }
    })

    function UpdateComponent() {
        LoadToy();
    }
    //Key note settings
    function RenderKeySettings() {
        return(
            <>
                <ui.NumberSliderUIElement 
                    name={"Keys"}
                    minMaxStep={[1,100,1]}
                    value={numberOfKeys()}
                    onChange={setNumberOfKeys}
                />
                {/* <div class="flexContainer">
                    <div>Keys</div>
                    <div class="flexContainer">
                        <NumberSliderCombo
                            minMaxStep={[1, 100, 1]}
                            value={numberOfKeys()}
                            onChange={setNumberOfKeys}
                        />
                    </div>
                </div> */}
                {RenderStartKeySetting()}
                <ui.CheckboxUIElement 
                name="Collapse Notes"
                checked={collapsNote()}
                onChange={setCollapsNote}
                />
            </>
        )
    }
    //Retusn more or less UI, depends on a settings
    function RenderStartKeySetting() {
        //If collaps note is true, there is no need to set a start key, hide it
        if(collapsNote() == true) {
            return (
                // Sorry, nothing
                <div></div>
            )
        } else {
            return (
                <ui.NumberSliderUIElement 
                    name={"Start Key (" + MIDIDataTable.MIDINoteToString(startKey()) + ")"}
                    minMaxStep={[1,100,1]}
                    value={startKey()}
                    onChange={setStartKey}
                />
            )
        }
    }
    function LoadToy() {
        var t = utils.InitToy(channel, toy, UpdateComponent);
        if(toy != t) {
            toy = t;
            UpdateUIValues();
        }
    }
    function UpdateUIValues() {
        // console.log("UPDATE DEFAULT UI values");
        if (typeof window !== 'undefined') {
            if(toy != undefined) {
                setUseEffect(false);

                setNumberOfKeys(toy.numberOfKeys);
                setStartKey(toy.startKey);
                setCollapsNote(toy.useRegExp);

                setUseEffect(true);
            }
        }
    }
    function UpdateToyValues() {
        // console.log("UPDATE toy values");
        if (typeof window !== 'undefined') {
            //Remove old children
            // toy.RemoveChildrenFromLayer();

            toy.numberOfKeys = numberOfKeys();
            toy.startKey = startKey();
            toy.useRegExp = collapsNote();

            try {
                toy.SetupMIDIReceiver(collapsNote());
                toy.SetupKeyboard();

            } catch {}

            // if(toyType() != 0) {
            // }
        }
    }



    LoadToy();
    canvasManager.SubscribeOneFPS(UpdateComponent);
    return(
        <ui.DetailsFillerCenter summeryName={"Key settings"} content={RenderKeySettings()} />
    )
}
