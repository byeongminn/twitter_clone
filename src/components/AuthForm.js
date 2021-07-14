import React, { useState } from "react";
import { authService } from "../fbase";

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (event) => {
        const {
            target: { name, value }
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            if (newAccount) {
                await authService.createUserWithEmailAndPassword(email, password);
            } else {
                await authService.signInWithEmailAndPassword(email, password);
            }
        } catch (error) {
            setError(error.message);
        }
    }
    const toggleAccount = () => setNewAccount((prev) => !prev);
    return (
        <div id="auth-form">
            <form id="email-password-form" onSubmit={onSubmit}>
                <div id="error">
                    {error}
                </div>
                <input id="email" name="email" type="email" placeholder="Email" value={email} onChange={onChange} required />
                <input id="password" name="password" type="password" placeholder="Password" value={password} onChange={onChange} required />
                <input id="submit" type="submit" value={newAccount ? "Create Account" : "Login"} />
            </form>
            <span id="login-join-toggle" onClick={toggleAccount}>{newAccount ? "Login" : "Create Account"}</span>
        </div>
    )
}

export default AuthForm;