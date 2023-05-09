import { createSignal, createEffect } from "solid-js";
import { MusicSpheres } from "../../js/miditoy/MusicSpheres";
import { ToyManager } from "../../js/miditoy/ToyManager";

var manager = new ToyManager();

export default function SetupContainer( props: {channel: number}) {
    var channel = props.channel;

    console.log("MIDIToy channel = " + channel);

    //Special settings
    const [strokeWidth, setStrokeWidth] = createSignal(2);
    
    const [velocityLimit, setVelocityLimit] = createSignal(20);
    const [yGravity, setYGravity] = createSignal(-0.9);
    // const [xGravity, setXGravity] = createSignal(0);
    
    const [yFriction, setYFriction] = createSignal(0.9);
    const [xFriction, setXFriction] = createSignal(0.95);

    const [yImpulsPower, setYImpulsPower] = createSignal(30);
    const [xImpulsPower, setXImpulsPower] = createSignal(0);

    createEffect(() => {
        console.log("TRIGGER SPECIAL effect");
        UpdateToyValues();
    })

    function UpdateUIValues() {
        console.log("UPDATE SPECIAL UI values");
        if (typeof window !== 'undefined') {
            var t = manager.GetToy(channel) as MusicSpheres;
            if(t != undefined) {
                console.log(t);
                setStrokeWidth(t.strokeWidth);
                console.log("UI strokewith = " + strokeWidth());
                setVelocityLimit(t.velocityLimit);
                setYGravity(t.yGravity);
                // setXGravity(t.xGravity);
                setYFriction(t.yFriction);
                setXFriction(t.xFriction);
                setYImpulsPower(t.yImpulsPower);
                setXImpulsPower(t.xImpulsPower);

                t.SetupKeyboard();
            }
        }
    }
    function UpdateToyValues() {
        console.log("UPDATE toy values");
        if (typeof window !== 'undefined') {
            var t = manager.GetToy(channel) as MusicSpheres;
            if(t != undefined) {
                t.RemoveChildrenFromLayer();
                t.strokeWidth = strokeWidth();
                t.velocityLimit = velocityLimit();
                t.yGravity = yGravity();
                // t.xGravity = xGravity();
                t.yFriction = yFriction();
                t.xFriction = xFriction();
                t.yImpulsPower = yImpulsPower();
                t.xImpulsPower = xImpulsPower();
                
                t.SetupKeyboard();
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
        <br></br>
        <div class="flexContainer">
            <div>Velocity Limit</div> 
            <div class="flexContainer">
                <input
                    class="numberInput"
                    type="number"
                    min="1"
                    max="50"
                    step="1"
                    value={velocityLimit()}
                    onChange={(event) => setVelocityLimit(parseInt(event.target.value))}
                />
                <input
                    class="sliderInput marginLeft10"
                    type="range"
                    min="1"
                    max="50"
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
                    min="-90"
                    max="90"
                    step="1"
                    value={yImpulsPower()}
                    onChange={(event) => setYImpulsPower(parseInt(event.target.value))}
                />
                <input
                    class="sliderInput marginLeft10"
                    type="range"
                    min="-90"
                    max="90"
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
                    min="-90"
                    max="90"
                    step="1"
                    value={xImpulsPower()}
                    onChange={(event) => setXImpulsPower(parseInt(event.target.value))}
                />
                <input
                    class="sliderInput marginLeft10"
                    type="range"
                    min="-60"
                    max="60"
                    step="1"
                    value={xImpulsPower()}
                    onChange={(event) => setXImpulsPower(parseInt(event.target.value))}
                />
            </div>
        </div>
    </details>
    )
}