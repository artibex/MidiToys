import { createSignal, createEffect } from "solid-js";
import { ToyManager } from "../../js/miditoy/ToyManager";
import { GraviBoard } from "../../js/miditoy/GraviBoard";
import { InitToy } from "../../js/solidjs/ComponentUtils.jsx";
import { DetailsFillerCenter, NumberSliderUIElement, CheckboxUIElement } from "../../js/solidjs/ComponentUtils.jsx";

var tManager = new ToyManager();

export default function SetupContainer( props: {channel: number}) {
    var channel = props.channel;
    var toy;
    const [useEffect, setUseEffect] = createSignal(true);

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
            console.log("TRIGGER SPECIAL effect");
            UpdateToyValues();
        }
    })

    const ToyChanged = () => {
        // Handle the event...
        console.log("TOY changed event");
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
            }
        }
    }
    function UpdateToyValues() {
        console.log("UPDATE GraviBoard toy values");
        if (typeof window !== 'undefined') {
            if(toy != undefined) {
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
                
                //Reload Keyboard
                toy.SetupKeyboard();
            }
        }
    }

    function RenderUI() {
        return(
            <>
            <CheckboxUIElement 
                name="Horizontal Align"
                checked={horizontalAlign()}
                onChange={setHorizontalAlign}
            />
                 <NumberSliderUIElement 
                    name={"Stroke Width"}
                    minMaxStep={[0,80,1]}
                    value={strokeWidth()}
                    onChange={setStrokeWidth}
                />
                <NumberSliderUIElement 
                    name={"Poly Sides"}
                    minMaxStep={[2,20,1]}
                    value={polySides()}
                    onChange={setPolySides}
                />

            {/* <div class="flexContainer">
                <div>Stroke Width</div> 
                <div class="flexContainer">
                    <input
                        class="numberInput"
                        type="number"
                        min="1"
                        max="40"
                        step="1"
                        value={strokeWidth()}
                        onChange={(event) => setStrokeWidth(parseInt(event.target.value))}
                    />
                    <input
                        class="sliderInput marginLeft10"
                        type="range"
                        min="1"
                        max="40"
                        step="1"
                        value={strokeWidth()}
                        onChange={(event) => setStrokeWidth(parseInt(event.target.value))}
                    />
                </div>
            </div> */}
            {/* <div class="flexContainer">
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
                        max="40"
                        step="1"
                        value={polySides()}
                        onChange={(event) => setPolySides(parseInt(event.target.value))}
                    />
                </div>
            </div> */}
            <br></br>
            <NumberSliderUIElement 
                    name={"Velocity Limit"}
                    minMaxStep={[1,200,1]}
                    value={velocityLimit()}
                    onChange={setVelocityLimit}
            />
            <NumberSliderUIElement 
                    factor={100}
                    name={"Y Gravity"}
                    minMaxStep={[-150,150,1]}
                    value={yGravity()}
                    onChange={setYGravity}
                />
            <NumberSliderUIElement 
                    factor={100}
                    name={"X Gravity"}
                    minMaxStep={[-150,150,1]}
                    value={xGravity()}
                    onChange={setXGravity}
                />

            {/* <div class="flexContainer">
                <div>Velocity Limit</div> 
                <div class="flexContainer">
                    <input
                        class="numberInput"
                        type="number"
                        min="1"
                        max="200"
                        step="1"
                        value={velocityLimit()}
                        onChange={(event) => setVelocityLimit(parseInt(event.target.value))}
                    />
                    <input
                        class="sliderInput marginLeft10"
                        type="range"
                        min="1"
                        max="200"
                        value={velocityLimit()}
                        onChange={(event) => setVelocityLimit(parseInt(event.target.value))}
                    />
                </div>
            </div> */}
            {/* <div class="flexContainer">
                <div>Y Gravity</div> 
                <div class="flexContainer">
                    <input
                        class="numberInput"
                        type="number"
                        min="-20"
                        max="20"
                        step="1"
                        value={yGravity()*10}
                        onChange={(event) => setYGravity(parseInt(event.target.value)/10)}
                    />
                    <input
                        class="sliderInput marginLeft10"
                        type="range"
                        min="-20"
                        max="20"
                        value={yGravity()*10}
                        onChange={(event) => setYGravity(parseInt(event.target.value)/10)}
                    />
                </div>
            </div> */}
            <br></br>
            <NumberSliderUIElement 
                factor={100}
                name={"Y Friction"}
                minMaxStep={[20,100,1]}
                value={yFriction()}
                onChange={setYFriction}
            />
            <NumberSliderUIElement 
                    factor={100}
                    name={"X Friction"}
                    minMaxStep={[20,100,1]}
                    value={xFriction()}
                    onChange={setXFriction}
                />


            {/* <div class="flexContainer">
                <div>Y Friction</div> 
                <div class="flexContainer">
                    <input
                        class="numberInput"
                        type="number"
                        min="10"
                        max="100"
                        step="1"
                        value={yFriction()*100}
                        onChange={(event) => setYFriction(parseInt(event.target.value)/100)}
                    />
                    <input
                        class="sliderInput marginLeft10"
                        type="range"
                        min="10"
                        max="100"
                        value={yFriction()*100}
                        onChange={(event) => setYFriction(parseInt(event.target.value)/100)}
                    />
                </div>
            </div> */}
            {/* <div class="flexContainer">
                <div>X Friction</div> 
                <div class="flexContainer">
                    <input
                        class="numberInput"
                        type="number"
                        min="10"
                        max="100"
                        step="1"
                        value={xFriction()*100}
                        onChange={(event) => setXFriction(parseInt(event.target.value)/100)}
                    />
                    <input
                        class="sliderInput marginLeft10"
                        type="range"
                        min="10"
                        max="100"
                        value={xFriction()*100}
                        onChange={(event) => setXFriction(parseInt(event.target.value)/100)}
                    />
                </div>
            </div> */}
            <br></br>
            <NumberSliderUIElement 
                    name={"Y Impulse Power"}
                    minMaxStep={[1,200,1]}
                    value={yImpulsPower()}
                    onChange={setYImpulsPower}
                />
            <NumberSliderUIElement 
                    name={"X Impulse Power"}
                    minMaxStep={[1,200,1]}
                    value={xImpulsPower()}
                    onChange={setXImpulsPower}
                />


            {/* <div class="flexContainer">
                <div>Y Impuls Power</div> 
                <div class="flexContainer">
                    <input
                        class="numberInput"
                        type="number"
                        min="1"
                        max="200"
                        step="1"
                        value={yImpulsPower()}
                        onChange={(event) => setYImpulsPower(parseInt(event.target.value))}
                    />
                    <input
                        class="sliderInput marginLeft10"
                        type="range"
                        min="1"
                        max="200"
                        step="1"
                        value={yImpulsPower()}
                        onChange={(event) => setYImpulsPower(parseInt(event.target.value))}
                    />
                </div>
            </div> */}
            {/* <div class="flexContainer">
                <div>X Impuls Power</div> 
                <div class="flexContainer">
                    <input
                        class="numberInput"
                        type="number"
                        min="1"
                        max="200"
                        step="1"
                        value={xImpulsPower()}
                        onChange={(event) => setXImpulsPower(parseInt(event.target.value))}
                    />
                    <input
                        class="sliderInput marginLeft10"
                        type="range"
                        min="1"
                        max="200"
                        step="1"
                        value={xImpulsPower()}
                        onChange={(event) => setXImpulsPower(parseInt(event.target.value))}
                    />
                </div>
            </div> */}

            </>
        )
    }

    //Init Component
    LoadToy();
    UpdateUIValues(); //Get UI Values once at start
    return DetailsFillerCenter(toy.toyName + " Settings", RenderUI());

    // return(
    //     <div>
    //         <details>
    //         <summary class="textAlignCenter marginAuto">
    //             Specific Settings
    //         </summary>
    //         <br></br>
    //         <div class="flexContainer">
    //             <div>Stroke Width</div> 
    //             <div class="flexContainer">
    //                 <input
    //                     class="numberInput"
    //                     type="number"
    //                     min="1"
    //                     max="40"
    //                     step="1"
    //                     value={strokeWidth()}
    //                     onChange={(event) => setStrokeWidth(parseInt(event.target.value))}
    //                 />
    //                 <input
    //                     class="sliderInput marginLeft10"
    //                     type="range"
    //                     min="1"
    //                     max="40"
    //                     step="1"
    //                     value={strokeWidth()}
    //                     onChange={(event) => setStrokeWidth(parseInt(event.target.value))}
    //                 />
    //             </div>
    //         </div>
    //         <div class="flexContainer">
    //             <div>Poly Sides</div> 
    //             <div class="flexContainer">
    //                 <input
    //                     class="numberInput"
    //                     type="number"
    //                     min="2"
    //                     max="20"
    //                     step="1"
    //                     value={polySides()}
    //                     onChange={(event) => setPolySides(parseInt(event.target.value))}
    //                 />
    //                 <input
    //                     class="sliderInput marginLeft10"
    //                     type="range"
    //                     min="2"
    //                     max="40"
    //                     step="1"
    //                     value={polySides()}
    //                     onChange={(event) => setPolySides(parseInt(event.target.value))}
    //                 />
    //             </div>
    //         </div>
    //         <br></br>
    //         <div class="flexContainer">
    //             <div>Velocity Limit</div> 
    //             <div class="flexContainer">
    //                 <input
    //                     class="numberInput"
    //                     type="number"
    //                     min="1"
    //                     max="200"
    //                     step="1"
    //                     value={velocityLimit()}
    //                     onChange={(event) => setVelocityLimit(parseInt(event.target.value))}
    //                 />
    //                 <input
    //                     class="sliderInput marginLeft10"
    //                     type="range"
    //                     min="1"
    //                     max="200"
    //                     value={velocityLimit()}
    //                     onChange={(event) => setVelocityLimit(parseInt(event.target.value))}
    //                 />
    //             </div>
    //         </div>
    //         <div class="flexContainer">
    //             <div>Y Gravity</div> 
    //             <div class="flexContainer">
    //                 <input
    //                     class="numberInput"
    //                     type="number"
    //                     min="-20"
    //                     max="20"
    //                     step="1"
    //                     value={yGravity()*10}
    //                     onChange={(event) => setYGravity(parseInt(event.target.value)/10)}
    //                 />
    //                 <input
    //                     class="sliderInput marginLeft10"
    //                     type="range"
    //                     min="-20"
    //                     max="20"
    //                     value={yGravity()*10}
    //                     onChange={(event) => setYGravity(parseInt(event.target.value)/10)}
    //                 />
    //             </div>
    //         </div>
    //         <br></br>
    //         <div class="flexContainer">
    //             <div>Y Friction</div> 
    //             <div class="flexContainer">
    //                 <input
    //                     class="numberInput"
    //                     type="number"
    //                     min="10"
    //                     max="100"
    //                     step="1"
    //                     value={yFriction()*100}
    //                     onChange={(event) => setYFriction(parseInt(event.target.value)/100)}
    //                 />
    //                 <input
    //                     class="sliderInput marginLeft10"
    //                     type="range"
    //                     min="10"
    //                     max="100"
    //                     value={yFriction()*100}
    //                     onChange={(event) => setYFriction(parseInt(event.target.value)/100)}
    //                 />
    //             </div>
    //         </div>
    //         <div class="flexContainer">
    //             <div>X Friction</div> 
    //             <div class="flexContainer">
    //                 <input
    //                     class="numberInput"
    //                     type="number"
    //                     min="10"
    //                     max="100"
    //                     step="1"
    //                     value={xFriction()*100}
    //                     onChange={(event) => setXFriction(parseInt(event.target.value)/100)}
    //                 />
    //                 <input
    //                     class="sliderInput marginLeft10"
    //                     type="range"
    //                     min="10"
    //                     max="100"
    //                     value={xFriction()*100}
    //                     onChange={(event) => setXFriction(parseInt(event.target.value)/100)}
    //                 />
    //             </div>
    //         </div>
    //         <br></br>
    //         <div class="flexContainer">
    //             <div>Y Impuls Power</div> 
    //             <div class="flexContainer">
    //                 <input
    //                     class="numberInput"
    //                     type="number"
    //                     min="1"
    //                     max="200"
    //                     step="1"
    //                     value={yImpulsPower()}
    //                     onChange={(event) => setYImpulsPower(parseInt(event.target.value))}
    //                 />
    //                 <input
    //                     class="sliderInput marginLeft10"
    //                     type="range"
    //                     min="1"
    //                     max="200"
    //                     step="1"
    //                     value={yImpulsPower()}
    //                     onChange={(event) => setYImpulsPower(parseInt(event.target.value))}
    //                 />
    //             </div>
    //         </div>
    //         <div class="flexContainer">
    //             <div>X Impuls Power</div> 
    //             <div class="flexContainer">
    //                 <input
    //                     class="numberInput"
    //                     type="number"
    //                     min="1"
    //                     max="200"
    //                     step="1"
    //                     value={xImpulsPower()}
    //                     onChange={(event) => setXImpulsPower(parseInt(event.target.value))}
    //                 />
    //                 <input
    //                     class="sliderInput marginLeft10"
    //                     type="range"
    //                     min="1"
    //                     max="200"
    //                     step="1"
    //                     value={xImpulsPower()}
    //                     onChange={(event) => setXImpulsPower(parseInt(event.target.value))}
    //                 />
    //             </div>
    //         </div>
    //     </details>
    //     </div>
    // )
}