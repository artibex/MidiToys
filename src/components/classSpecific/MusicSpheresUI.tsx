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
    const [xGravity, setXGravity] = createSignal(0);
    
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
                setXGravity(t.xGravity);
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
                t.xGravity = xGravity();
                t.yFriction = yFriction();
                t.xFriction = xFriction();
                t.yImpulsPower = yImpulsPower();
                t.xImpulsPower = xImpulsPower();
                
                t.SetupKeyboard();
            }
        }
    }

    UpdateUIValues();

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
                    type="value"
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
                    max="10"
                    step="1"
                    value={strokeWidth()}
                    onChange={(event) => setStrokeWidth(parseInt(event.target.value))}
                />
            </div>
        </div>
        <div class="flexContainer">
            <div >Start Key</div>
            <div class="flexContainer">
                {/* <input 
                    class="numberInput" 
                    type="value" 
                    min="1" 
                    max="100" 
                    onChange={(event) => setStartKey(parseInt(event.target.value))}
                    value={startKey()} 
                />
                <input 
                    class="sliderInput marginLeft10" 
                    type="range" 
                    min="1" 
                    max="100" 
                    onChange={(event) => setStartKey(parseInt(event.target.value))}
                    value={startKey()} 
                /> */}
            </div>
        </div>
        <div class="flexContainer">
            <div>Collapse Notes</div>
            {/* <input 
                class="toggleInput" 
                type="checkbox" 
                checked={collapsNote()}
                onChange={(event) => setCollapsNote(event.target.checked)}
            /> */}
        </div>
    </details>
)
}