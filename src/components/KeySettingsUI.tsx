import { createSignal, createEffect } from "solid-js";
import * as utils from "@utils";
import * as ui from "@ui";
import { CanvasManager } from "@canvasmanager";
import { ToyManager } from "@toymanager";
import { MIDIDataTable } from "@mididata";

const canvasManager = new CanvasManager();

export default function SetupContainer( props: {channel: number}) {
    var toy;
    var channel = props.channel;
    var updateToy = false;

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
            toy.SubscribeToToyChangedEvent(UpdateUIValues);
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
            if(toy != undefined) {
                    toy.numberOfKeys = numberOfKeys();
                    toy.startKey = startKey();
                    toy.useRegExp = collapsNote();
        
                    try {
                        if(updateToy) {
                            toy.SetupMIDIReceiver(collapsNote());
                            toy.SetupKeyboard();
                        } else updateToy = true;
                    } catch {}
            }
        }
    }

    // LoadToy();
    canvasManager.SubscribeOneFPS(UpdateComponent);
    return(
        <ui.DetailsFillerCenter summeryName={"Keys"} content={RenderKeySettings()} />
    )
}
