'use client';
import Link from "next/link";
import './loginForm.css';
import { InputTextField, ButtonField } from "@/components/InputField";
import { useCallback, useEffect, useState } from "react";
import { LoginAction } from './loginRegisterAction';
import { EmailValidator } from "./Validator";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginForm(props) {

    const router = useRouter();
    const [email, setEmail] = useState({ value: null, isError: false });
    const [password, setPassword] = useState(null);
    const [enableLogin, setEnableLogin] = useState(false);

    useEffect(() => {
        if (!email.isError && password && password.length >= 1) {
            setEnableLogin(true);
        } else {
            setEnableLogin(false);
        }
    }, [email, password])

    const onSumbit = async () => {
        if (enableLogin) {
            const { status } = await axios.post("/api/auth/login", { email: email.value, password });
            if(status === 200) {
                router.push('/');
            }
        }
    }

    const { label, field: { emailField, passwordField, loginButton } } = props;

    const handleEmailName = useCallback((value) => {
        const isValid = EmailValidator(value);
        setEmail({ value, isError: !isValid });
    }, []);

    const handlePassword = useCallback((value) => {
        setPassword(value)
    }, []);

    return (
        <div className="div-conatiner">
            <h3 className="div-label">{label}</h3>
            <InputTextField error={email.isError} value={email.value} onChange={({ target }) => handleEmailName(target.value)} {...emailField} />
            <InputTextField value={password} onChange={({ target }) => handlePassword(target.value)} {...passwordField} />
            <ButtonField onSumbit={onSumbit} enabled={enableLogin} {...loginButton} />
            <Link id="forgotPassword-link" href={'/user/forgot-password'}>
                Forgot Password?
            </Link>
            <Link id="register-link" href={'/user/register'}>
                Don&apos;t have an account?
                <span className="underline">Register</span>
            </Link>
        </div>
    );
}