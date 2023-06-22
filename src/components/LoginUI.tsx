import * as ui from "@ui";
import * as utils from "@utils";
import { createSignal, createEffect } from "solid-js";
import { CanvasManager } from "@canvasmanager";
import {GetUser} from "@firebaseClient";
import { FirebaseManager } from "@firebaseManager";

const canvasManager = new CanvasManager();
const firebaseManager = new FirebaseManager();

export default function SetupContainer() {
    const [userLoggedIn, setUserLoggedIn] = createSignal(false);
    const [emailSignUp, setEmailSignUp] = createSignal(false);
    const [forgotPassword, setForgotPassword] = createSignal(false);
    const [userName, setUserName] = createSignal("Cool Username");

    function UpdateComponent() {
        if(GetUser() != undefined) setUserLoggedIn(true);
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
                <h2 class="textAlignCenter">Hello {GetUser().displayName}</h2>
                <h2 class="textAlignCenter">You can now browse or upload presets in your toys</h2>
                <ui.ButtonIcon 
                    label="Sign Out"
                    iconFirst={true}
                    icon="gg:log-out"
                    onClick={SignOut}
                />
            </div>
        )
    }

    function SignOut() {
        firebaseManager.SignOut();
        setUserLoggedIn(false);
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

    if(GetUser() != undefined) setUserLoggedIn(true);
    canvasManager.SubscribeOneFPS(UpdateComponent);
    return (
        <>
            {RenderUI()}
        </>
    )
}