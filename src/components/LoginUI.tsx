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

    function SetEmailSignUp(showSignUp: boolean) {
        console.log("SET email sign up UI")
        setEmailSignUp(showSignUp);
    }

    //Put int your redentials and create an account
    function RenderEmailSignUpUI() {
        return(
            <div class="channelContainer">
                <ui.Button 
                    label="Back to Login"
                    onClick={SetEmailSignUp(false)}
                />
                <br></br>
                <h3 class="textAlignCenter">E-Mail</h3>
                <ui.IconTextInputUIElement 
                
                />
            </div>
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
                <h3 class="textAlignCenter">Sign In with Account</h3>
                <ui.ServiceLogin 
                    icon="uit:google"
                />
                <ui.ServiceLogin 
                    icon="codicon:github"
                />
                <br></br>
                <ui.EmailLoginRegisterUIElement
                    onRegister={SetEmailSignUp(true)}
                />
            </div>
        )
    }

    function RenderLoggedInUI() {
        return(
            <div class="channelContainer">
                <h1>User IS logged in!</h1>
                <ui.Button 
                    label="Sign Out"
                />
            </div>
        )
    }

    function RenderUI() {
        if(userLoggedIn()) {
            return RenderLoggedInUI();
        } else {
            if(emailSignUp() == true) {
                return RenderEmailSignUpUI();
            } else {
                return RenderLogInUI();
            }
        }
    }

    canvasManager.SubscribeOneFPS(UpdateComponent);
    return (
        <>
            {RenderUI()}
        </>
    )
}