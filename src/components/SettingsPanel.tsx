import { createSignal, createEffect } from "solid-js";
import ChannelSettingsContainer from "@components/ChannelSettingsContainer";
import { Icon } from '@iconify-icon/solid';
import * as utils from "@utils";
import * as ui from "@ui";

export default function SetupContainer() {
    const [selectedChannel, setSelectedChannel] = createSignal(1);

    function OpenSettings() {

    }
    function CloseSettings() {

    }
    function RenderContainer() {
            switch(selectedChannel()) {
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
                class="marginLeft20 width10"
                icon="mdi:close-thick"
                width={30}
                onClick={() => CloseSettings()}
            />
        )
    }

    function RenderChannelButtons() {
        return(
            <div class="flexList width10">
                <ui.Button
                    label="1"
                    class="squareButton"
                    onClick={() => setSelectedChannel(1)}
                />
                <ui.Button
                    label="2"
                    class="squareButton"
                    onClick={() => setSelectedChannel(2)}
                />
                <ui.Button
                    label="3"
                    class="squareButton"
                    onClick={() => setSelectedChannel(3)}            
                />
                <ui.Button
                    label="4"
                    class="squareButton"
                    onClick={() => setSelectedChannel(4)}
                />
                <ui.Button
                    label="5"
                    class="squareButton"
                    onClick={() => setSelectedChannel(5)}
                />
                <ui.Button
                    label="6"
                    class="squareButton"
                    onClick={() => setSelectedChannel(6)}
                /> 
                <ui.Button
                    label="7"
                    class="squareButton"
                    onClick={() => setSelectedChannel(7)}
                />
                <ui.Button
                    label="8"
                    class="squareButton"
                    onClick={() => setSelectedChannel(8)}
                /> 
                <ui.Button
                    label="9"
                    class="squareButton"
                    onClick={() => setSelectedChannel(9)}
                /> 
                <ui.Button
                    label="10"
                    class="squareButton"
                    onClick={() => setSelectedChannel(10)}
                /> 
                <ui.Button
                    label="11"
                    class="squareButton"
                    onClick={() => setSelectedChannel(11)}
                /> 
                <ui.Button
                    label="12"
                    class="squareButton"
                    onClick={() => setSelectedChannel(12)}
                /> 
                <ui.Button
                    label="13"
                    class="squareButton"
                    onClick={() => setSelectedChannel(13)}
                /> 
                <ui.Button
                    label="14"
                    class="squareButton"
                    onClick={() => setSelectedChannel(14)}
                /> 
                <ui.Button
                    label="15"
                    class="squareButton"
                    onClick={() => setSelectedChannel(15)}
                /> 
                <ui.Button
                    label="16"
                    class="squareButton"
                    onClick={() => setSelectedChannel(16)}
                />                                                                                                                                                                              
            </div>
        )
    }

    function RenderSettingsHeadline() {
        return(
            <div class="height10 width95">
                <div class="flexContainer">
                    <div class="alignFlexStart">
                        <Icon 
                            icon="mdi:cog-outline" 
                            width={35}
                            class="marginLeft20 marginAuto "
                            />
                        <h1 class="marginLeft10 marginAuto">Channel {selectedChannel()} </h1>
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
            <div id="settingsPanel">
                <div class="flexContainer widthAuto noSelect">
                        {RenderChannelButtons()}
                    <div>
                    </div>
                    <div class="flexList width95 height95">
                        {RenderSettingsHeadline()}           
                        {RenderMIDIDeviceSelection()}
                        {RenderContainer()}
                    </div>   
                </div>
            </div>
        )
    }

    return RenderUI();
}