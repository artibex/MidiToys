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
    
    const [rows, setRows] = createSignal(5);
    const [colums, setColums] = createSignal(5);
    const [polySides, setPolySides] = createSignal(3);
    const [strokeWidth, setStrokeWidth] = createSignal(2);
    const [cellHeightScale, setCellHeightScale] = createSignal(1);
    const [cellWidthScale, setCellWidthScale] = createSignal(1);
    
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

                setToyName(toy.toyName);
                setRows(toy.rows);
                setColums(toy.colums);
                setPolySides(toy.polySides);
                setStrokeWidth(toy.strokeWidth);
                setCellHeightScale(toy.cellHeightScale);
                setCellWidthScale(toy.cellWidthScale);

                setUseEffect(true);
            }
        }
    }

    function UpdateToyValues() {
        // console.log("UPDATE GraviBoard toy values");
        if (typeof window !== 'undefined') {
            if(toy != undefined) {
                
                toy.rows = rows();
                toy.colums = colums();
                toy.polySides = polySides();
                toy.strokeWidth = strokeWidth();
                toy.cellHeightScale = cellHeightScale();
                toy.cellWidthScale = cellWidthScale();

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

    // const [cellHeightScale, setCellHeightScale] = createSignal(1);
    // const [cellWidthScale, setCellWidthScale] = createSignal(1);

    function RenderUI() {
        return(
            <>
                <ui.NumberSliderUIElement 
                    name={"Poly Sides"}
                    minMaxStep={[3,20,1]}
                    value={polySides()}
                    onChange={setPolySides}
                />
                <br></br>
                <ui.NumberSliderUIElement 
                    name={"Rows"}
                    minMaxStep={[1,50,1]}
                    value={rows()}
                    onChange={setRows}
                />
                <ui.NumberSliderUIElement 
                    name={"Colums"}
                    minMaxStep={[1,50,1]}
                    value={colums()}
                    onChange={setColums}
                />
                <br></br>
                <ui.NumberSliderUIElement 
                    name={"Stroke Width"}
                    minMaxStep={[0,20,1]}
                    value={strokeWidth()}
                    onChange={setStrokeWidth}
                />    
                <br></br>             
                <ui.NumberSliderUIElement 
                    name={"Cell Height"}
                    factor={100}
                    minMaxStep={[-200,200,1]}
                    value={cellHeightScale()}
                    onChange={setCellHeightScale}
                />                 
                <ui.NumberSliderUIElement 
                    name={"Cell Width"}
                    factor={100}
                    minMaxStep={[-200,200,1]}
                    value={cellWidthScale()}
                    onChange={setCellWidthScale}
                />
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