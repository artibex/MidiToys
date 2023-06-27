import { createSignal, createEffect } from "solid-js";
import * as utils from "@utils";
import * as ui from "@ui";
import { RGBA } from "@interfaces";
import { CanvasManager } from "@canvasmanager";

const canvasManager = new CanvasManager();

export default function SetupContainer( props: {channel: number}) {
    var toy;
    var channel = props.channel;

    const [useEffect, setUseEffect] = createSignal(true);
    //Colors
    const [colorSelection, setColorSelection] = createSignal(0);
    const [colorSelectionName, setColorSelectionName] = createSignal("Fill Color");
    const [fillColor, setFillColor] = createSignal<RGBA>({ r:0, g:0, b:0, a:0});
    const [strokeColor, setStrokeColor] = createSignal<RGBA>({ r:0, g:0, b:0, a:0});
    const [accentColor, setAccentColor] = createSignal<RGBA>({ r:0, g:0, b:0, a:0});

    createEffect(() => {
        if(useEffect()) {
            UpdateToyValues();
        }
    })

    function UpdateUIValues() {
        // console.log("UPDATE DEFAULT UI values");
        if (typeof window !== 'undefined') {
            if(toy != undefined) {
                setUseEffect(false);

                var mColor: RGBA = toy.GetPaperColor(toy.fillColor);
                var sColor: RGBA = toy.GetPaperColor(toy.strokeColor);
                var aColor: RGBA = toy.GetPaperColor(toy.accentColor);
                setFillColor({r:mColor.r, g:mColor.g , b:mColor.b, a:mColor.a});
                setStrokeColor({r:sColor.r, g:sColor.g , b:sColor.b, a:sColor.a});
                setAccentColor({r:aColor.r, g:aColor.g , b:aColor.b, a:aColor.a});
            
                setUseEffect(true);
            }
        }
        // else setToyName("Empty");
    }
    //Update Toy data
    function UpdateToyValues() {
        // console.log("UPDATE toy values");
        if (typeof window !== 'undefined') {
            //Remove old children
            if(toy != undefined) {
                toy.SetPaperColor(toy.fillColor, fillColor().r, fillColor().g, fillColor().b, fillColor().a);
                toy.SetPaperColor(toy.strokeColor, strokeColor().r, strokeColor().g, strokeColor().b, strokeColor().a);
                toy.SetPaperColor(toy.accentColor, accentColor().r, accentColor().g, accentColor().b, accentColor().a);
    
                try {
                    toy.ApplyColors();
                } catch {}
            }
        }
    }
    // console.log("CREATE ColorSettingsUI");


    function UpdateComponent() {
        LoadToy();
    }

    //What kind of color do you want to edit?
    function UpdateColorSelection(value: number) {
        var calc = colorSelection();
        calc += value;
        if(calc < 0) calc = 2;
        if(calc > 2) calc = 0;

        switch(calc) {
            case 0: setColorSelectionName("Fill Color"); break;
            case 1: setColorSelectionName("Stroke Color"); break;
            case 2: setColorSelectionName("Accent Color"); break;
        }
        setColorSelection(calc);
    }
    
    function RenderColorSettings() {
        return (
            <>
                <div class="flex">
                    <div class="width70">
                        <h3 class="textAlignCenter">{colorSelectionName()}</h3>
                    </div>
                    <div class="flex justifyEnd marginAuto">
                        <ui.ButtonIcon
                            icon="material-symbols:chevron-left"
                            class="squareButton"
                            divClass="marginRight5 marginAuto"
                            onClick={() => UpdateColorSelection(-1)}
                            width={30}
                        />
                        <ui.ButtonIcon
                            icon="material-symbols:chevron-right"
                            class="squareButton"
                            divClass="marginAuto"
                            onClick={() => UpdateColorSelection(1)}
                            width={30}
                        />
                    </div>
                </div>
                <br></br>
                {RenderColorSettingsSelection()}
            </>
        )
    }

    //Returns fillColor, strokeColor or accentColor UI
    function RenderColorSettingsSelection() {
        switch(colorSelection()) {
            //fillColor
            case 0: return (
            <div>
                <ui.NumberSliderUIElement 
                    name={"Red"}
                    minMaxStep={[0,255,1]}
                    value={fillColor().r}
                    onChange={(value) => setFillColor({ ...fillColor(), r: value })}
                />
                <ui.NumberSliderUIElement 
                    name={"Green"}
                    minMaxStep={[0,255,1]}
                    value={fillColor().g}
                    onChange={(value) => setFillColor({ ...fillColor(), g: value })}
                />
                <ui.NumberSliderUIElement 
                    name={"Blue"}
                    minMaxStep={[0,255,1]}
                    value={fillColor().b}
                    onChange={(value) => setFillColor({ ...fillColor(), b: value })}
                />
                <ui.NumberSliderUIElement 
                    name={"Alpha"}
                    minMaxStep={[0,255,1]}
                    value={fillColor().a}
                    onChange={(value) => setFillColor({ ...fillColor(), a: value })}
                />
            </div>
            )
            //strokeColor
            case 1: return (
            <div>
                <ui.NumberSliderUIElement 
                    name={"Red"}
                    minMaxStep={[0,255,1]}
                    value={strokeColor().r}
                    onChange={(value) => setStrokeColor({ ...strokeColor(), r: value })}
                />
                <ui.NumberSliderUIElement 
                    name={"Green"}
                    minMaxStep={[0,255,1]}
                    value={strokeColor().g}
                    onChange={(value) => setStrokeColor({ ...strokeColor(), g: value })}
                />
                <ui.NumberSliderUIElement 
                    name={"Blue"}
                    minMaxStep={[0,255,1]}
                    value={strokeColor().b}
                    onChange={(value) => setStrokeColor({ ...strokeColor(), b: value })}
                />
                <ui.NumberSliderUIElement 
                    name={"Alpha"}
                    minMaxStep={[0,255,1]}
                    value={strokeColor().a}
                    onChange={(value) => setStrokeColor({ ...strokeColor(), a: value })}
                />
            </div>
            )
            //accentColor
            case 2: return (
            <div>
                <ui.NumberSliderUIElement 
                    name={"Red"}
                    minMaxStep={[0,255,1]}
                    value={accentColor().r}
                    onChange={(value) => setAccentColor({ ...accentColor(), r: value })}
                />
                <ui.NumberSliderUIElement 
                    name={"Green"}
                    minMaxStep={[0,255,1]}
                    value={accentColor().g}
                    onChange={(value) => setAccentColor({ ...accentColor(), g: value })}
                />
                <ui.NumberSliderUIElement 
                    name={"Blue"}
                    minMaxStep={[0,255,1]}
                    value={accentColor().b}
                    onChange={(value) => setAccentColor({ ...accentColor(), b: value })}
                />
                <ui.NumberSliderUIElement 
                    name={"Alpha"}
                    minMaxStep={[0,255,1]}
                    value={accentColor().a}
                    onChange={(value) => setAccentColor({ ...accentColor(), a: value })}
                />
            </div>
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

    // LoadToy();
    canvasManager.SubscribeOneFPS(UpdateComponent);
    return (
        // <ui.DetailsFillerCenter("Color Settings", RenderColorSettings()) />
        <ui.DetailsFillerCenter summeryName={"Colors"} content={RenderColorSettings} />
        )
}

