import { createSignal, createEffect } from "solid-js";
import { ToyManager } from "../../js/miditoy/ToyManager";
import { PolyDrum } from "../../js/miditoy/PolyDrum";
import { InitToy } from "../../js/solidjs/ComponentUtils.jsx";
import { DetailsFillerCenter, NumberSliderUIElement } from "../../js/solidjs/ComponentUtils.jsx";

var tManager = new ToyManager();

export default function SetupContainer( props: {channel: number}) {
    var channel = props.channel;
    var toy;
    const [useEffect, setUseEffect] = createSignal(true);

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

            if(toy != undefined) {
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
                <NumberSliderUIElement 
                    name={"Shape Limit"}
                    minMaxStep={[1,100,1]}
                    value={shapeLimit()}
                    onChange={setShapeLimit}
                />
                <NumberSliderUIElement 
                    name={"Poly Sides"}
                    minMaxStep={[2,20,1]}
                    value={polySides()}
                    onChange={setPolySides}
                />
                <NumberSliderUIElement 
                    name={"Rotation Speed"}
                    factor={100}
                    minMaxStep={[-1000,1000,1]}
                    value={rotationSpeed()}
                    onChange={setRotationSpeed}
                />
            <br></br>
            <NumberSliderUIElement 
                    name={"Start Size"}
                    minMaxStep={[1,1000,1]}
                    value={startSize()}
                    onChange={setStartSize}
                />   
            <NumberSliderUIElement 
                    name={"Stroke Size"}
                    minMaxStep={[1,200,1]}
                    value={strokeWidth()}
                    onChange={setStrokeWidth}
                />                             
            <br></br>
            <NumberSliderUIElement 
                    factor={100}
                    name={"Size Change"}
                    minMaxStep={[50,120,1]}
                    value={sizeIncrease()}
                    onChange={setSizeIncrease}
                />
            <NumberSliderUIElement 
                    factor={100}
                    name={"Stroke Change"}
                    minMaxStep={[50,120,1]}
                    value={strokeWidthDecrease()}
                    onChange={setStrokeWidthDecrease}
                />    
            <NumberSliderUIElement 
                    factor={100}
                    name={"Alpha Change"}
                    minMaxStep={[0,10,1]}
                    value={alphaDecrease()}
                    onChange={setAlphaDecrease}
                />    
            <br></br>
            <NumberSliderUIElement 
                    factor={100}
                    name={"SpawnOffset X"}
                    minMaxStep={[0,200,1]}
                    value={xSpawnOffset()}
                    onChange={setXSpawnOffset}
                />    
            <NumberSliderUIElement 
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
    UpdateUIValues(); //Get UI Values once at start
    return DetailsFillerCenter(toy.toyName + " Settings", RenderUI());
}