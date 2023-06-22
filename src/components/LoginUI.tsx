import { createSignal, createEffect } from "solid-js";
import { CanvasManager } from "@canvasmanager";
import {user} from "@firebaseClient";
import * as utils from "@utils";
import * as ui from "@ui";

const canvasManager = new CanvasManager;

export default function SetupContainer() {
    const [userLoggedIn, setUserLoggedIn] = createSignal(false);
    const [emailSignUp, setEmailSignUp] = createSignal(false);
    const [forgotPassword, setForgotPassword] = createSignal(false);
    const [userName, setUserName] = createSignal("Cool Username");

    function UpdateComponent() {
        if(user != undefined) setUserLoggedIn(true);
    }

    function SetEmailSignUp(showSignUp: boolean) {
        setEmailSignUp(showSignUp);
    }
    function SetForgotPassword(showForgotPassword: boolean) {
        setForgotPassword(showForgotPassword);
    }


    function RenderForgotPasswordUI() {
        return(
            <div class="channelContainer">
                <div class="flex justifyStart">
                    <ui.ButtonIcon
                        label="Go back"
                        icon="ep:back"
                        class="iconButton"
                        iconFirst={true}
                        onClick={SetForgotPassword(false)}
                    />
                    <br></br>
                </div>
                <ui.EmailForgotPasswordUIElement />
            </div>
        )
    }

    //Put int your redentials and create an account
    function RenderEmailSignUpUI() {
        return(
            <div class="channelContainer">
                <div class="flex justifyStart">
                    <ui.ButtonIcon
                        label="Go back"
                        icon="ep:back"
                        class="iconButton"
                        iconFirst={true}
                        onClick={SetEmailSignUp(false)}
                    />
                </div>
                <ui.EmailSignUpUIElement />
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
                <ui.EmailLoginUIElement
                    onRegister={SetEmailSignUp(true)}
                    onPasswordForgot={SetForgotPassword(true)}
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
            } else if(forgotPassword() == true) {
                return RenderForgotPasswordUI();
            }
            else {
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