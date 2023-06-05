import { createSignal, createEffect } from "solid-js";
import ChannelSettingsContainer from "@components/ChannelSettingsContainer";
import * as utils from "@utils";
import * as ui from "@ui";

export default function SetupContainer() {
    const [selectedChannel, setSelectedChannel] = createSignal(1);
    var toy;

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

    function RenderGlobalSettings() {
        return(
            <div>
                {RenderMIDIDeviceSelection()}
            </div>
       )
    }

    function RenderContainer() {
            switch(selectedChannel()) {
                case 0: return RenderGlobalSettings();
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
                class="marginLeft20 squareButton"
                icon="mdi:close-thick"
                width={30}
                onClick={() => CloseSettings()}
            />
        )
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
                    class="channelButton"
                    onClick={() => setSelectedChannel(1)}
                />
                <ui.Button
                    label="2"
                    class="channelButton"
                    onClick={() => setSelectedChannel(2)}
                />
                <ui.Button
                    label="3"
                    class="channelButton"
                    onClick={() => setSelectedChannel(3)}            
                />
                <ui.Button
                    label="4"
                    class="channelButton"
                    onClick={() => setSelectedChannel(4)}
                />
                <ui.Button
                    label="5"
                    class="channelButton"
                    onClick={() => setSelectedChannel(5)}
                />
                <ui.Button
                    label="6"
                    class="channelButton"
                    onClick={() => setSelectedChannel(6)}
                /> 
                <ui.Button
                    label="7"
                    class="channelButton"
                    onClick={() => setSelectedChannel(7)}
                />
                <ui.Button
                    label="8"
                    class="channelButton"
                    onClick={() => setSelectedChannel(8)}
                /> 
                <ui.Button
                    label="9"
                    class="channelButton"
                    onClick={() => setSelectedChannel(9)}
                /> 
                <ui.Button
                    label="10"
                    class="channelButton"
                    onClick={() => setSelectedChannel(10)}
                /> 
                <ui.Button
                    label="11"
                    class="channelButton"
                    onClick={() => setSelectedChannel(11)}
                /> 
                <ui.Button
                    label="12"
                    class="channelButton"
                    onClick={() => setSelectedChannel(12)}
                /> 
                <ui.Button
                    label="13"
                    class="channelButton"
                    onClick={() => setSelectedChannel(13)}
                /> 
                <ui.Button
                    label="14"
                    class="channelButton"
                    onClick={() => setSelectedChannel(14)}
                /> 
                <ui.Button
                    label="15"
                    class="channelButton"
                    onClick={() => setSelectedChannel(15)}
                /> 
                <ui.Button
                    label="16"
                    class="channelButton"
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
            <div class="height10 width95">
            <div>
                <div class="flexContainer heightAuto">
                    <div class="flexContainer">
                        <div class="marginLeft20">
                            MIDI Device 
                        </div>
                        <div class="marginAuto">
                            <ui.MIDIDropdown />
                        </div>
                    </div>
                    <div class="">
                        <ui.Button 
                            label="Reload"
                        />
                    </div>
                </div>
            </div>
        </div>
        )
    }

    function RenderUI() {
        return(
            <div id="settingsPanel" class="noSelect width100 height100">
                <div class="flexContainer justifyStart">
                    {RenderChannelButtons()}
                    <div class="flexList marginLeft20">
                        {RenderUIHeadline()}           
                        {RenderContainer()}
                    </div>   
                </div>
            </div>
        )
    }

    return RenderUI();
}