import { createSignal, createEffect } from "solid-js";
import ChannelSettingsContainer from "@components/ChannelSettingsContainer";
import * as utils from "@utils";
import * as ui from "@ui";
import { RGBA } from "@interfaces";
import { ToyManager } from "@miditoy/ToyManager";
import { CanvasManager } from "@canvasmanager";

const toyManager = new ToyManager();
const canvasManager = new CanvasManager();

export default function SetupContainer() {
    var toy;

    const [backGroundColor, setBackgroundColor] = createSignal<RGBA>({ r:0, g:0, b:0, a:0});
    const [selectedChannel, setSelectedChannel] = createSignal(1);
    const [channelButtonClass, setChannelButtonClass] = createSignal(
        Array.from({ length: 16 }, () => "channelButton")
    );

    createEffect(() => {
        SetBackgroundColor();
    })

    function LoadToy() {
        var t = utils.InitToy(selectedChannel(), toy);
        if(toy != t) {
            toy = t;
        }
    }

    function CloseSettings() {
        var panel = document.getElementById("settingsPanel");
        if(panel != undefined) {
            panel.style.display = "none";
            ShowSettingsButton();
        }
    }

    function ShowSettingsButton() {
        var button = document.getElementById("openSettingsButton");
        if(button != undefined) {
          button.style.display = "block";
        }
    }

    function OpenLink(link: string) {
        window.open(link, '_blank');
    }

    function RenderGlobalSettingsUI() {
        return(
            <div class="channelContainer">
                <div>
                    <ui.MIDIDropdown />
                    <ui.BPM />
                </div>
                <br></br>
                {RenderBgColorUI()}
                <br></br>
                {RenderSocialUI()}
            </div>
       )
    }

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

    function RenderContainer() {
            switch(selectedChannel()) {
                case 0: return RenderGlobalSettingsUI();
                case 1: return <ChannelSettingsContainer channel={1} />;
                case 2: return <ChannelSettingsContainer channel={2} />;
                case 3: return <ChannelSettingsContainer channel={3} />;
                case 4: return <ChannelSettingsContainer channel={4} />;
                case 5: return <ChannelSettingsContainer channel={5} />;
                case 6: return <ChannelSettingsContainer channel={6} />;
                case 7: return <ChannelSettingsContainer channel={7} />;
                case 8: return <ChannelSettingsContainer channel={8} />;
                case 9: return <ChannelSettingsContainer channel={9} />;
                case 10: return <ChannelSettingsContainer channel={10} />;
                case 11: return <ChannelSettingsContainer channel={11} />;
                case 12: return <ChannelSettingsContainer channel={12} />;
                case 13: return <ChannelSettingsContainer channel={13} />;
                case 14: return <ChannelSettingsContainer channel={14} />;
                case 15: return <ChannelSettingsContainer channel={15} />;
                case 16: return <ChannelSettingsContainer channel={16} />;
            }
    }

    function RenderCloseButton() {
        return(
            <ui.ButtonIcon 
                class="squareButton"
                icon="mdi:close-thick"
                width={30}
                onClick={() => CloseSettings()}
            />
        )
    }

    function UpdateChannelButtonClass() {
        var toys = toyManager.GetToys();
        var array = [...toys];

        if(toys != undefined) {
            for(var i = 0; i <= toys.length -1; i++) {
                if(toys[i].toyName.includes("Empty")){
                    array[i] = "channelButton";
                } else {
                    array[i] = "channelButtonActiv";
                }
            }
            setChannelButtonClass(array);
        }
    }

    function RenderChannelButtons() {
        return(
            <div class="flexList width10">
                <ui.ButtonIcon 
                    class="channelButton"
                    icon="grommet-icons:globe"
                    onClick={() => setSelectedChannel(0)}
                />
                <ui.Button
                    label="1"
                    class={channelButtonClass()[0]}
                    onClick={() => setSelectedChannel(1)}
                />
                <ui.Button
                    label="2"
                    class={channelButtonClass()[1]}
                    onClick={() => setSelectedChannel(2)}
                />
                <ui.Button
                    label="3"
                    class={channelButtonClass()[2]}
                    onClick={() => setSelectedChannel(3)}            
                />
                <ui.Button
                    label="4"
                    class={channelButtonClass()[3]}
                    onClick={() => setSelectedChannel(4)}
                />
                <ui.Button
                    label="5"
                    class={channelButtonClass()[4]}
                    onClick={() => setSelectedChannel(5)}
                />
                <ui.Button
                    label="6"
                    class={channelButtonClass()[5]}
                    onClick={() => setSelectedChannel(6)}
                /> 
                <ui.Button
                    label="7"
                    class={channelButtonClass()[6]}
                    onClick={() => setSelectedChannel(7)}
                />
                <ui.Button
                    label="8"
                    class={channelButtonClass()[7]}
                    onClick={() => setSelectedChannel(8)}
                /> 
                <ui.Button
                    label="9"
                    class={channelButtonClass()[8]}
                    onClick={() => setSelectedChannel(9)}
                /> 
                <ui.Button
                    label="10"
                    class={channelButtonClass()[9]}
                    onClick={() => setSelectedChannel(10)}
                /> 
                <ui.Button
                    label="11"
                    class={channelButtonClass()[10]}
                    onClick={() => setSelectedChannel(11)}
                /> 
                <ui.Button
                    label="12"
                    class={channelButtonClass()[11]}
                    onClick={() => setSelectedChannel(12)}
                /> 
                <ui.Button
                    label="13"
                    class={channelButtonClass()[12]}
                    onClick={() => setSelectedChannel(13)}
                /> 
                <ui.Button
                    label="14"
                    class={channelButtonClass()[13]}
                    onClick={() => setSelectedChannel(14)}
                /> 
                <ui.Button
                    label="15"
                    class={channelButtonClass()[14]}
                    onClick={() => setSelectedChannel(15)}
                /> 
                <ui.Button
                    label="16"
                    class={channelButtonClass()[15]}
                    onClick={() => setSelectedChannel(16)}
                />                                                                                                                                                                              
            </div>
        )
    }

    function RenderHeadline() {
        if(selectedChannel() > 0) {
            return(
                <h1 class="marginAuto">Channel {selectedChannel()} </h1>
            )
        } else {
            return(
                <h1 class="marginAuto">Global Settings</h1>
            )
        }
        
    }

    function RenderUIHeadline() {
        return(
            <div class="height10 width100">
                <div class="flexContainer">
                    <div class="justifyStart textAlignLeft">
                        {RenderHeadline()}
                    </div>
                    <div class="alignFlexEnd">
                        {RenderCloseButton()}
                    </div>
                </div>
            <div>
            </div>
        </div>

        )
    }

    function RenderMIDIDeviceSelection() {
        return(
            <div class="">
                <ui.MIDIDropdown />
            </div>
        )
    }

    function RenderUI() {
        return(
            <div id="settingsPanel" class="noSelect width100 height90">
                <div class="flexContainer justifyStart">
                    {RenderChannelButtons()}
                    <div class="flexList marginLeft20 width100">
                        {RenderUIHeadline()}           
                        {RenderContainer()}
                    </div>   
                </div>
            </div>
        )
    }

    GetBackgroundColor();
    canvasManager.SubscribeOneFPS(UpdateChannelButtonClass);
    return RenderUI();
}