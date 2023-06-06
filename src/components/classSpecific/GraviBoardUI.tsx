import { createSignal, createEffect } from "solid-js";
import { ToyManager } from "@toymanager";
import { CanvasManager } from "@canvasmanager";
import * as utils from "@utils";
import * as ui from "@ui"

var tManager = new ToyManager();
const canvasManager = new CanvasManager();

export default function SetupContainer( props: {channel: number}) {
    var channel = props.channel;
    var toy;
    const [useEffect, setUseEffect] = createSignal(true);

    const [toyName, setToyName] = createSignal("ToyName");
    //Special settings
    const [horizontalAlign, setHorizontalAlign] = createSignal(true);
    const [strokeWidth, setStrokeWidth] = createSignal(2);
    const [polySides, setPolySides] = createSignal(4);

    const [velocityLimit, setVelocityLimit] = createSignal(20);
    const [yGravity, setYGravity] = createSignal(-0.9);
    const [xGravity, setXGravity] = createSignal(0);
    
    const [yFriction, setYFriction] = createSignal(0.9);
    const [xFriction, setXFriction] = createSignal(0.95);

    const [yImpulsPower, setYImpulsPower] = createSignal(30);
    const [xImpulsPower, setXImpulsPower] = createSignal(0);

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
                setHorizontalAlign(toy.horizontalAlign);
                setStrokeWidth(toy.strokeWidth);
                setPolySides(toy.polySides);
                setVelocityLimit(toy.velocityLimit);
                setYGravity(toy.yGravity);
                setXGravity(toy.xGravity);
                setYFriction(toy.yFriction);
                setXFriction(toy.xFriction);
                setYImpulsPower(toy.yImpulsPower);
                setXImpulsPower(toy.xImpulsPower);

                setUseEffect(true);
            }
        }
    }
    function UpdateToyValues() {
        // console.log("UPDATE GraviBoard toy values");
        if (typeof window !== 'undefined') {
            if(toy != null) {
                //Remove old objects
                // toy.RemoveChildrenFromLayer();
                toy.horizontalAlign = horizontalAlign();
                toy.strokeWidth = strokeWidth();
                toy.polySides = polySides();
                toy.velocityLimit = velocityLimit();
                toy.yGravity = yGravity();
                toy.xGravity = xGravity();
                toy.yFriction = yFriction();
                toy.xFriction = xFriction();
                toy.yImpulsPower = yImpulsPower();
                toy.xImpulsPower = xImpulsPower();
                
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
            <ui.Button 
                label="Reload"
                onClick={Reload}
                class="thinButton width100"
            />
            <br></br>
            <br></br>
            <ui.CheckboxUIElement 
                name="Horizontal Align"
                checked={horizontalAlign()}
                onChange={setHorizontalAlign}
            />
                 <ui.NumberSliderUIElement 
                    name={"Stroke Width"}
                    minMaxStep={[0,80,1]}
                    value={strokeWidth()}
                    onChange={setStrokeWidth}
                />
                <ui.NumberSliderUIElement 
                    name={"Poly Sides"}
                    minMaxStep={[2,20,1]}
                    value={polySides()}
                    onChange={setPolySides}
                />
            <br></br>
            <ui.NumberSliderUIElement 
                    name={"Velocity Limit"}
                    minMaxStep={[1,200,1]}
                    value={velocityLimit()}
                    onChange={setVelocityLimit}
            />
            <ui.NumberSliderUIElement 
                    factor={100}
                    name={"Y Gravity"}
                    minMaxStep={[-150,150,1]}
                    value={yGravity()}
                    onChange={setYGravity}
                />
            <ui.NumberSliderUIElement 
                    factor={100}
                    name={"X Gravity"}
                    minMaxStep={[-150,150,1]}
                    value={xGravity()}
                    onChange={setXGravity}
                />
            <br></br>
            <ui.NumberSliderUIElement 
                factor={100}
                name={"Y Friction"}
                minMaxStep={[20,100,1]}
                value={yFriction()}
                onChange={setYFriction}
            />
            <ui.NumberSliderUIElement 
                    factor={100}
                    name={"X Friction"}
                    minMaxStep={[20,100,1]}
                    value={xFriction()}
                    onChange={setXFriction}
                />
            <br></br>
            <ui.NumberSliderUIElement 
                    name={"Y Impulse Power"}
                    minMaxStep={[1,200,1]}
                    value={yImpulsPower()}
                    onChange={setYImpulsPower}
                />
            <ui.NumberSliderUIElement 
                    name={"X Impulse Power"}
                    minMaxStep={[1,200,1]}
                    value={xImpulsPower()}
                    onChange={setXImpulsPower}
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