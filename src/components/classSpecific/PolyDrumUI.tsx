import { createSignal, createEffect } from "solid-js";
import { ToyManager } from "../../js/miditoy/ToyManager";
import { PolyDrum } from "../../js/miditoy/PolyDrum";

var manager = new ToyManager();

export default function SetupContainer( props: {channel: number}) {
    var channel = props.channel;
    var toy;

    //Special settings
    const [shapeLimit, setShapeLimit] = createSignal(20);
    const [polySides, setPolySides] = createSignal(3);
    const [startSize, setStartSize] = createSignal(500);
    const [sizeIncrease, setSizeIncrease] = createSignal(0.98);
    const [alphaDecrease, setAlphaDecrease] = createSignal(0);
    const [rotationSpeed, setRotationSpeed] = createSignal(0.01);
    const [strokeWidth, setStrokeWidth] = createSignal(10);
    const [strokeWidthDecrease, setStrokeWidthDecrease] = createSignal(1);
    const [minWidth, setMinWidth] = createSignal(0.5);
    const [maxWidth, setMaxWidth] = createSignal(0.5);
    const [minHeight, setMinHeight] = createSignal(0.5);
    const [maxHeight, setMaxHeight] = createSignal(0.5);

    createEffect(() => {
        console.log("TRIGGER SPECIAL effect");
        UpdateToyValues();
    })

    function UpdateUIValues() {
        console.log("UPDATE SPECIAL UI values");
        if (typeof window !== 'undefined') {
            toy = manager.GetToy(channel) as PolyDrum;

            if(toy != undefined) {
                setShapeLimit(toy.shapeLimit);
                setPolySides(toy.polySides);
                setStartSize(toy.startSize);
                setSizeIncrease(toy.sizeIncrease);
                setAlphaDecrease(toy.alphaDecrease);
                setRotationSpeed(toy.rotationSpeed);
                setStrokeWidth(toy.strokeWidth);
                setStrokeWidthDecrease(toy.strokeWidthDecrease);
                setMinWidth(toy.minWidth);
                setMaxWidth(toy.maxWidth);
                setMinHeight(toy.minHeight);
                setMaxHeight(toy.maxHeight);

                toy.SetupKeyboard();
            }
        }
    }
    function UpdateToyValues() {
        console.log("UPDATE toy values");
        if (typeof window !== 'undefined') {
            toy = manager.GetToy(channel) as PolyDrum;

            //Remove old objects
            if(toy != undefined) {
                toy.RemoveChildrenFromLayer();
                toy.shapeLimit = shapeLimit();
                toy.polySides = polySides();
                toy.startSize = startSize();
                toy.sizeIncrease = sizeIncrease();
                toy.alphaDecrease = alphaDecrease();
                toy.rotationSpeed = rotationSpeed();
                toy.strokeWidth = strokeWidth();
                toy.strokeWidthDecrease = strokeWidthDecrease();
                toy.minWidth = minWidth();
                toy.maxWidth = maxWidth();
                toy.minHeight = minHeight();
                toy.maxHeight = maxHeight();
    
                //Reload Keyboard
                toy.SetupKeyboard();
            }
        }
    }

    UpdateUIValues(); //Get UI Values once at start

    return(
        <details>
        <summary class="textAlignCenter marginAuto">
            <h3 class="marginAuto thinButton">Special Settings</h3>
        </summary>
        <br></br>
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
            <div>Size Decrease</div> 
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
            <div>Alpha Decrease</div> 
            <div class="flexContainer">
                <input
                    class="numberInput"
                    type="number"
                    min="1"
                    max="100"
                    step="1"
                    value={alphaDecrease()*100}
                    onChange={(event) => setAlphaDecrease(parseInt(event.target.value)/100)}
                />
                <input
                    class="sliderInput marginLeft10"
                    type="range"
                    min="1"
                    max="100"
                    step="1"
                    value={alphaDecrease()*100}
                    onChange={(event) => setAlphaDecrease(parseInt(event.target.value)/100)}
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
        <div class="flexContainer">
            <div>Stroke Width</div> 
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
        <div class="flexContainer">
            <div>Stroke Width Decrease</div> 
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

    </details>
    )
}