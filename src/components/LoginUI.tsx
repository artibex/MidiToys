import { createSignal, createEffect } from "solid-js";
import { CanvasManager } from "@canvasmanager";
import {user} from "@firebaseClient";
import * as utils from "@utils";
import * as ui from "@ui";

const canvasManager = new CanvasManager;

export default function SetupContainer() {

    const [userLoggedIn, setUserLoggedIn] = createSignal(false);
    const [emailSignUp, setEmailSignUp] = createSignal(false);
    const [userName, setUserName] = createSignal("Cool Username");

    function UpdateComponent() {
        if(user != undefined) setUserLoggedIn(true);
    }

    function SetSomething() {
        console.log("SET email sign up UI")
        setEmailSignUp(true);
    }

    //Put int your redentials and create an account
    function RenderEmailSignUpUI() {
        return(
            <></>
        )
    }

    function RenderLogInUI() {
        return(
            <div class="channelContainer">
                <h2 class="textAlignCenter">
                    Upload your presets or
                    <br></br>
                    use presets made by the community
                </h2>
                <br></br>
                <h3 class="textAlignCenter">Login with Account</h3>
                <ui.ServiceLogin 
                    icon="uit:google"
                />
                <ui.ServiceLogin 
                    icon="codicon:github"
                />
                <br></br>
                <ui.EmailLoginRegisterUIElement
                    onRegister={SetSomething}
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
        } else {
            if(emailSignUp()) {
                return RenderEmailSignUpUI();
            } else {
                return RenderLogInUI();
            }
        }
    }

    canvasManager.SubscribeOneFPS(UpdateComponent);
    return RenderUI();
}