import { ToyManager } from "../js/miditoy/ToyManager";


export default function SetupContainer( props: {toyName: string, channel: number}) {
    // console.log("MANAGER =" + toyManager);
    var manager = new ToyManager();
    var channel = props.channel;
    // var toyName = manager.GetToyType(channel);
    

    return (
    <div class="channelContainer">
        <div class="toyNameSetting">
        <button id="changeButton" onClick={ChangeToy}>Change</button>            
        <h2 class="marginLeft20">ToyName</h2> 
        </div>
        Number of Keys <input class="numberInput" type="number" min="1" max="100" step="1" value={10} /> 
        <br />
        Start Key <input class="numberInput" type="number" min="1" max="100"/> 
        <br />
        Collaps Notes <input class="toggleInput" type="checkbox" />          
    </div>
    )
}

export function ChangeToy() {
    console.log("CHANGING toy");
    return (
        <div>
            <button id="changeButton">Toy 1</button>            
        </div>
    )
}