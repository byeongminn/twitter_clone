import React, { useState } from "react";
import { authService, firebaseInstance } from "../fbase";
import AuthForm from "../components/AuthForm";
import { FaTwitter } from "react-icons/fa";

const Auth = () => {
    const onSocialClick = async (event) => {
        const {
            target: { name }
        } = event;
        let provider;
        if (name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        await authService.signInWithPopup(provider);
    }
    return (
        <div>
            <div id="nwitter">
                <FaTwitter id="nwitter-icon" size="40"/>
                <span>느위터</span>
            </div>
            <AuthForm />
            <div id="social-login">
                <button name="google" onClick={onSocialClick}>Continue with Google</button>
                <button name="github" onClick={onSocialClick}>Continue with Github</button>
            </div>
        </div>
    )
}

export default Auth;