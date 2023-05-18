import { createSignal, createEffect } from "solid-js";
import { ToyManager } from "../../js/miditoy/ToyManager";
import { PolyDrum } from "../../js/miditoy/PolyDrum";
import { InitToy } from "../../js/solidjs/ComponentUtils.jsx";
import { DetailsFillerCenter } from "../../js/solidjs/ComponentUtils.jsx";

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
                <div class="flexContainer">
                <div>Shape Limit</div> 
                <div class="flexContainer">
                    <input
                        class="numberInput"
                        type="number"
                        min="1"
                        max="100"
                        step="1"
                        value={shapeLimit()}
                        onChange={(event) => setShapeLimit(parseInt(event.target.value))}
                    />
                    <input
                        class="sliderInput marginLeft10"
                        type="range"
                        min="1"
                        max="100"
                        step="1"
                        value={shapeLimit()}
                        onChange={(event) => setShapeLimit(parseInt(event.target.value))}
                    />
                </div>
            </div>
            <div class="flexContainer">
                <div>Poly Sides</div> 
                <div class="flexContainer">
                    <input
                        class="numberInput"
                        type="number"
                        min="2"
                        max="20"
                        step="1"
                        value={polySides()}
                        onChange={(event) => setPolySides(parseInt(event.target.value))}
                    />
                    <input
                        class="sliderInput marginLeft10"
                        type="range"
                        min="2"
                        max="20"
                        step="1"
                        value={polySides()}
                        onChange={(event) => setPolySides(parseInt(event.target.value))}
                    />
                </div>
            </div>
            <div class="flexContainer">
                <div>Rotation Speed</div> 
                <div class="flexContainer">
                    <input
                        class="numberInput"
                        type="number"
                        min="-1000"
                        max="1000"
                        step="1"
                        value={rotationSpeed()*100}
                        onChange={(event) => setRotationSpeed(parseInt(event.target.value)/100)}
                    />
                    <input
                        class="sliderInput marginLeft10"
                        type="range"
                        min="-1000"
                        max="1000"
                        step="1"
                        value={rotationSpeed()*100}
                        onChange={(event) => setRotationSpeed(parseInt(event.target.value)/100)}
                    />
                </div>
            </div>
            <br></br>
            <div class="flexContainer">
                <div>Start Size</div> 
                <div class="flexContainer">
                    <input
                        class="numberInput"
                        type="number"
                        min="10"
                        max="1000"
                        step="1"
                        value={startSize()}
                        onChange={(event) => setStartSize(parseInt(event.target.value))}
                    />
                    <input
                        class="sliderInput marginLeft10"
                        type="range"
                        min="10"
                        max="1000"
                        step="1"
                        value={startSize()}
                        onChange={(event) => setStartSize(parseInt(event.target.value))}
                    />
                </div>
            </div>
            <div class="flexContainer">
                <div>Stroke Size</div> 
                <div class="flexContainer">
                    <input
                        class="numberInput"
                        type="number"
                        min="1"
                        max="100"
                        step="1"
                        value={strokeWidth()}
                        onChange={(event) => setStrokeWidth(parseInt(event.target.value))}
                    />
                    <input
                        class="sliderInput marginLeft10"
                        type="range"
                        min="1"
                        max="100"
                        step="1"
                        value={strokeWidth()}
                        onChange={(event) => setStrokeWidth(parseInt(event.target.value))}
                    />
                </div>
            </div>
            <br></br>
            <div class="flexContainer">
                <div>Size Change</div> 
                <div class="flexContainer">
                    <input
                        class="numberInput"
                        type="number"
                        min="60"
                        max="120"
                        step="1"
                        value={sizeIncrease()*100}
                        onChange={(event) => setSizeIncrease(parseInt(event.target.value)/100)}
                    />
                    <input
                        class="sliderInput marginLeft10"
                        type="range"
                        min="60"
                        max="120"
                        step="1"
                        value={sizeIncrease()*100}
                        onChange={(event) => setSizeIncrease(parseInt(event.target.value)/100)}
                    />
                </div>
            </div>
            <div class="flexContainer">
                <div>Stroke Change</div> 
                <div class="flexContainer">
                    <input
                        class="numberInput"
                        type="number"
                        min="50"
                        max="110"
                        step="1"
                        value={strokeWidthDecrease()*100}
                        onChange={(event) => setStrokeWidthDecrease(parseInt(event.target.value)/100)}
                    />
                    <input
                        class="sliderInput marginLeft10"
                        type="range"
                        min="50"
                        max="110"
                        step="1"
                        value={strokeWidthDecrease()*100}
                        onChange={(event) => setStrokeWidthDecrease(parseInt(event.target.value)/100)}
                    />
                </div>
            </div>
            <div class="flexContainer">
                <div>Alpha Change</div> 
                <div class="flexContainer">
                    <input
                        class="numberInput"
                        type="number"
                        min="1"
                        max="10"
                        step="1"
                        value={alphaDecrease()*100}
                        onChange={(event) => setAlphaDecrease(parseInt(event.target.value)/100)}
                    />
                    <input
                        class="sliderInput marginLeft10"
                        type="range"
                        min="1"
                        max="10"
                        step="1"
                        value={alphaDecrease()*100}
                        onChange={(event) => setAlphaDecrease(parseInt(event.target.value)/100)}
                    />
                </div>
            </div>
            <br></br>
            <div class="flexContainer">
                <div>X SpawnOffset</div> 
                <div class="flexContainer">
                    <input
                        class="numberInput"
                        type="number"
                        min="0"
                        max="200"
                        step="1"
                        value={xSpawnOffset()*100}
                        onChange={(event) => setXSpawnOffset(parseInt(event.target.value)/100)}
                    />
                    <input
                        class="sliderInput marginLeft10"
                        type="range"
                        min="0"
                        max="200"
                        step="1"
                        value={xSpawnOffset()*100}
                        onChange={(event) => setXSpawnOffset(parseInt(event.target.value)/100)}
                    />
                </div>
            </div>
            <div class="flexContainer">
                <div>Y SpawnOffset</div> 
                <div class="flexContainer">
                    <input
                        class="numberInput"
                        type="number"
                        min="0"
                        max="200"
                        step="1"
                        value={ySpawnOffset()*100}
                        onChange={(event) => setYSpawnOffset(parseInt(event.target.value)/100)}
                    />
                    <input
                        class="sliderInput marginLeft10"
                        type="range"
                        min="0"
                        max="200"
                        step="1"
                        value={ySpawnOffset()*100}
                        onChange={(event) => setYSpawnOffset(parseInt(event.target.value)/100)}
                    />
                </div>
            </div>

            </>
        )
    }

    //Init Component
    LoadToy();
    UpdateUIValues(); //Get UI Values once at start
    return DetailsFillerCenter("Specific Settings", RenderUI());
    // return(
    //     <div>
    //         <details>
    //         <summary class="textAlignCenter marginAuto">
    //             Specific Settings
    //         </summary>
    //         <br></br>
    //     </details>
    //     </div>
    // )
}