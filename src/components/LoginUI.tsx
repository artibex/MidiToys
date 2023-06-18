import { createSignal, createEffect } from "solid-js";
import { CanvasManager } from "@canvasmanager";
import {user} from "@firebaseClient";
import * as utils from "@utils";
import * as ui from "@ui";

const canvasManager = new CanvasManager;

export default function SetupContainer() {

    const [userLoggedIn, setUserLoggedIn] = createSignal(false);
    const [userName, setUserName] = createSignal("Cool Username");

    function UpdateComponent() {
        if(user != undefined) setUserLoggedIn(true);
    }

    function RenderSignUpUI() {

    }

    function RenderLogInUI() {
        return(
            <div class="channelContainer">
                <ui.EmailLogin />
                <br></br>
                <ui.ServiceLogin 
                    icon="uit:google"
                />
                <ui.ServiceLogin 
                    icon="codicon:github"
                />

            </div>
        )
    }

    function RenderLoggedInUI() {
        return(
            <div class="channelContainer">
                <h1>User IS logged in!</h1>
            </div>
        )
    }

    function RenderUI() {
        if(userLoggedIn()) {
            return RenderLoggedInUI();
        } else return RenderLogInUI();
    }

    canvasManager.SubscribeOneFPS(UpdateComponent);
    return RenderUI();
}