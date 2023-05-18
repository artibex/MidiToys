import { createSignal, createEffect } from "solid-js";
import { ToyManager } from "../../js/miditoy/ToyManager";
import { GraviBoard } from "../../js/miditoy/GraviBoard";
import { InitToy } from "../../js/solidjs/ComponentUtils.jsx";
import { DetailsFillerCenter } from "../../js/solidjs/ComponentUtils.jsx";

var tManager = new ToyManager();

export default function SetupContainer( props: {channel: number}) {
    var channel = props.channel;
    var toy;
    const [useEffect, setUseEffect] = createSignal(true);

    //Special settings
    const [strokeWidth, setStrokeWidth] = createSignal(2);
    const [polySides, setPolySides] = createSignal(4);

    const [velocityLimit, setVelocityLimit] = createSignal(20);
    const [yGravity, setYGravity] = createSignal(-0.9);
    // const [xGravity, setXGravity] = createSignal(0);
    
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
                setStrokeWidth(toy.strokeWidth);
                setPolySides(toy.polySides);
                setVelocityLimit(toy.velocityLimit);
                setYGravity(toy.yGravity);
                // setXGravity(t.xGravity);
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

                toy.strokeWidth = strokeWidth();
                toy.polySides = polySides();
                toy.velocityLimit = velocityLimit();
                toy.yGravity = yGravity();
                // t.xGravity = xGravity();
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
                <div class="flexContainer">
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
                        max="40"
                        step="1"
                        value={polySides()}
                        onChange={(event) => setPolySides(parseInt(event.target.value))}
                    />
                </div>
            </div>
            <br></br>
            <div class="flexContainer">
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
            </div>
            <div class="flexContainer">
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
            </div>
            <br></br>
            <div class="flexContainer">
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
            </div>
            <div class="flexContainer">
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
            </div>
            <br></br>
            <div class="flexContainer">
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
            </div>
            <div class="flexContainer">
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
            </div>

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