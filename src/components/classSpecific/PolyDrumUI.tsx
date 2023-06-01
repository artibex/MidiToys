import { createSignal, createEffect } from "solid-js";
import { CanvasManager } from "@canvasmanager";
import { ToyManager } from "@toymanager";
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
    const [shapeLimit, setShapeLimit] = createSignal(20);
    const [polySides, setPolySides] = createSignal(3);
    const [startSize, setStartSize] = createSignal(500);
    const [sizeIncrease, setSizeIncrease] = createSignal(0.98);
    const [alphaDecrease, setAlphaDecrease] = createSignal(0);
    const [rotationSpeed, setRotationSpeed] = createSignal(0.01);
    const [strokeWidth, setStrokeWidth] = createSignal(10);
    const [strokeWidthDecrease, setStrokeWidthDecrease] = createSignal(1);
    const [xSpawnOffset, setXSpawnOffset] = createSignal(1);
    const [ySpawnOffset, setYSpawnOffset] = createSignal(1);

    createEffect(() => {
        if(useEffect()) {
            console.log("TRIGGER SPECIAL effect");
            UpdateToyValues();
        }
    })

    function UpdateComponent() {
        LoadToy();
    }

    const ToyChanged = () => {
        // Handle the event...
        console.log("DEFAULT UI event");
        setUseEffect(false);
        UpdateUIValues();
        setUseEffect(true);
    };

    function LoadToy() {
        var t = utils.InitToy(channel, toy, UpdateComponent);
        if(toy != t) {
            toy = t;
            UpdateUIValues();
        }
    }

    function UpdateUIValues() {
        console.log("UPDATE SPECIAL UI values");
        if (typeof window !== 'undefined') {
            toy = utils.InitToy(channel, toy, ToyChanged);

            if(toy != undefined) {
                setUseEffect(false);

                setToyName(toy.toyName);
                setShapeLimit(toy.shapeLimit);
                setPolySides(toy.polySides);
                setStartSize(toy.startSize);
                setSizeIncrease(toy.sizeIncrease);
                setAlphaDecrease(toy.alphaDecrease);
                setRotationSpeed(toy.rotationSpeed);
                setStrokeWidth(toy.strokeWidth);
                setStrokeWidthDecrease(toy.strokeWidthDecrease);
                setXSpawnOffset(toy.xSpawnOffset);
                setYSpawnOffset(toy.ySpawnOffset);

                setUseEffect(true);
            }
        }
    }
    function UpdateToyValues() {
        console.log("UPDATE PolyDrum toy values");
        if (typeof window !== 'undefined') {

            if(toy != undefined) {
                //Remove old objects
                // toy.RemoveChildrenFromLayer();

                toy.shapeLimit = shapeLimit();
                toy.polySides = polySides();
                toy.startSize = startSize();
                toy.sizeIncrease = sizeIncrease();
                toy.alphaDecrease = alphaDecrease();
                toy.rotationSpeed = rotationSpeed();
                toy.strokeWidth = strokeWidth();
                toy.strokeWidthDecrease = strokeWidthDecrease();
                toy.xSpawnOffset = xSpawnOffset();
                toy.ySpawnOffset = ySpawnOffset();

                //Reload Keyboard
                toy.SetupKeyboard();
            }
        }
    }

    function RenderUI() {
        return(
            <>
                <ui.NumberSliderUIElement 
                    name={"Shape Limit"}
                    minMaxStep={[1,100,1]}
                    value={shapeLimit()}
                    onChange={setShapeLimit}
                />
                <ui.NumberSliderUIElement 
                    name={"Poly Sides"}
                    minMaxStep={[2,20,1]}
                    value={polySides()}
                    onChange={setPolySides}
                />
                <ui.NumberSliderUIElement 
                    name={"Rotation Speed"}
                    factor={100}
                    minMaxStep={[-1000,1000,1]}
                    value={rotationSpeed()}
                    onChange={setRotationSpeed}
                />
            <br></br>
            <ui.NumberSliderUIElement 
                    name={"Start Size"}
                    minMaxStep={[1,1000,1]}
                    value={startSize()}
                    onChange={setStartSize}
                />   
            <ui.NumberSliderUIElement 
                    name={"Stroke Size"}
                    minMaxStep={[1,200,1]}
                    value={strokeWidth()}
                    onChange={setStrokeWidth}
                />                             
            <br></br>
            <ui.NumberSliderUIElement 
                    factor={100}
                    name={"Size Change"}
                    minMaxStep={[50,120,1]}
                    value={sizeIncrease()}
                    onChange={setSizeIncrease}
                />
            <ui.NumberSliderUIElement 
                    factor={100}
                    name={"Stroke Change"}
                    minMaxStep={[50,120,1]}
                    value={strokeWidthDecrease()}
                    onChange={setStrokeWidthDecrease}
                />    
            <ui.NumberSliderUIElement 
                    factor={100}
                    name={"Alpha Change"}
                    minMaxStep={[0,10,1]}
                    value={alphaDecrease()}
                    onChange={setAlphaDecrease}
                />    
            <br></br>
            <ui.NumberSliderUIElement 
                    factor={100}
                    name={"SpawnOffset X"}
                    minMaxStep={[0,200,1]}
                    value={xSpawnOffset()}
                    onChange={setXSpawnOffset}
                />    
            <ui.NumberSliderUIElement 
                    factor={100}
                    name={"Spawn Offset Y"}
                    minMaxStep={[0,200,1]}
                    value={ySpawnOffset()}
                    onChange={setYSpawnOffset}
                />    
            </>
        )
    }

    //Init Component
    LoadToy();
    // UpdateUIValues(); //Get UI Values once at start
    canvasManager.SubscribeOneFPS(UpdateComponent);
    return (
        // ui.DetailsFillerCenter(toy.toyName + " Settings", RenderUI());
        <ui.DetailsFillerCenter summeryName={toyName() + " Settings"} content={RenderUI()} />
    )

}