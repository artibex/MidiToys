import { createSignal, createEffect } from "solid-js";
import { RGBA } from "@interfaces";
import { CanvasManager } from "@canvasmanager";
import * as utils from "@utils";
import * as ui from "@ui";

export default function SetupContainer() {
    const [backGroundColor, setBackgroundColor] = createSignal<RGBA>({ r:0, g:0, b:0, a:0});

    createEffect(() => {
        SetBackgroundColor();
    })

    function OpenLink(link: string) {
        window.open(link, '_blank');
    }

    //Combines all settings
    function RenderUI() {
        return(
            <div class="channelContainer">
                <div>
                    <ui.MIDIDropdownUIElement />
                    <ui.BPM />
                </div>
                <br></br>
                {RenderBgColorUI()}
                <br></br>
                {RenderSocialUI()}
            </div>
        )
    }

    //Social Media Buttons etc.
    function RenderSocialUI() {
        return(
            <div>
                <h2 class="textAlignCenter">Social</h2>
                <div class="flexContainer justifyCenter marginAuto width50">
                    <div>
                        <ui.ButtonIcon 
                            width={50}
                            icon="mdi:github"
                            onClick={OpenLink("https://github.com/Artibex/MidiToys")}
                        />            
                    </div>
                    <div class="marginLeft20">
                        <ui.ButtonIcon 
                            width={50}
                            icon="ic:baseline-reddit"
                            onClick={OpenLink("https://www.reddit.com/r/miditoys/")}
                        />
                    </div>
                </div>

            </div>
        )
    }

    //Background Color UI
    function RenderBgColorUI() {
        return(
            <div class="marginAuto width80">
                <h2 class="textAlignCenter">Background Color</h2>
                <ui.NumberSliderUIElement 
                    name={"Red"}
                    minMaxStep={[0,255,1]}
                    value={backGroundColor().r}
                    onChange={(value) => setBackgroundColor({ ...backGroundColor(), r: value })}
                />
                <ui.NumberSliderUIElement 
                    name={"Green"}
                    minMaxStep={[0,255,1]}
                    value={backGroundColor().g}
                    onChange={(value) => setBackgroundColor({ ...backGroundColor(), g: value })}
                />
                <ui.NumberSliderUIElement 
                    name={"Blue"}
                    minMaxStep={[0,255,1]}
                    value={backGroundColor().b}
                    onChange={(value) => setBackgroundColor({ ...backGroundColor(), b: value })}
                />
                <ui.NumberSliderUIElement 
                    name={"Alpha"}
                    minMaxStep={[0,100,1]}
                    factor={100}
                    value={backGroundColor().a}
                    onChange={(value) => setBackgroundColor({ ...backGroundColor(), a: value })}
                />
            </div>
        )
    }

    //Background color functions
    function SetBackgroundColor() {
        if (typeof window !== 'undefined') { 
            const cssColor = `rgba(${backGroundColor().r}, ${backGroundColor().g}, ${backGroundColor().b}, ${backGroundColor().a})`;
            document.body.style.backgroundColor = cssColor;
        }
    }
    
    function GetBackgroundColor() {
        if (typeof window !== 'undefined') {
            const bodyColor = window.getComputedStyle(document.body).backgroundColor;
            const color = utils.ExtractRGBAColor(bodyColor); // Extract the RGBA values from the computed color
            
            setBackgroundColor({ ...backGroundColor(), r: color.r, g: color.g ,b: color.b, a: color.a })
            console.log(backGroundColor());
        }
    }

    GetBackgroundColor();
    return RenderUI();
}