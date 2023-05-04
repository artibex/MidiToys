import ChannelSettingsContainer from "../components/ChannelSettingsContainer";

export default function SetupContainer(props:{channels: number } ) {
    return(
        <div>
            <ChannelSettingsContainer toyName="Test" channel={1} />

        </div>
    )
}