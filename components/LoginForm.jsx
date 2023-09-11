'use client';
import Link from "next/link";
import './loginForm.css';
import { InputTextField, ButtonField } from "@/components/InputField";
import { getRequest } from "@/components/httpRequest";
import { useEffect, useState } from "react";
const jwt = require('jsonwebtoken');
const PRIVATE_KEY = "qwedrfds"

export default function LoginForm(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [enableLogin, setEnableLogin] = useState(false);

    useEffect(() => {
        localStorage.setItem('authType', "jwt");
    }, [])

    useEffect(() => {
        if (email && email.length >= 1 && password && password.length >= 1) {
            setEnableLogin(true);
        } else {
            setEnableLogin(false);
        }
    }, [email, password])


    const onSumbit = async () => {
        if (enableLogin) {
            const token = jwt.sign({ password }, PRIVATE_KEY).toString();
            const loginProps = {
                componentUrl: "/register",
                params: {
                    email,
                    "password": token,
                }
            }
            const res = await getRequest(loginProps);
            const { data, status } = res;
            if (status === "Success") {
                localStorage.setItem('access_token', data);
            }
        }
    }

    const { label, field : { emailField, passwordField, loginButton}} = props;

    return (
        <div id="login-form">
            <h1 id="login-header">{label}</h1>
            <InputTextField value={email} onChange={({ target }) => setEmail(target.value)} {...emailField} />
            <InputTextField value={password} onChange={({ target }) => setPassword(target.value)} {...passwordField} />
            <ButtonField onSumbit={onSumbit} enabled={enableLogin} {...loginButton} />
            <Link id="register-link"className="text-sm mt-3 text-right" href={'/register'}>
                Don't have an account?
                <span className="underline">Register</span>
            </Link>
        </div>
    );
}