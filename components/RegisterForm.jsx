'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";

import { InputTextField, ButtonField } from "@/components/InputField";
import { useCallback, useEffect, useState } from "react";
import { SignupAction } from "./loginRegisterAction";
import { EmailValidator } from "./Validator";
import { getRequest } from "@/components/httpRequest";

export default function RegisterForm(props) {

    const router = useRouter();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState({ value: '', isError: false });
    const [password, setPassword] = useState('');
    const [enableLogin, setEnableLogin] = useState(false);

    useEffect(() => {
        localStorage.setItem('authType', "jwt");
    }, [])

    useEffect(() => {
        if (!email.isError && email.value.length >=5 && fullName.length >= 1 && password.length >= 1) {
            setEnableLogin(true);
        } else {
            setEnableLogin(false);
        }
    }, [email, password, fullName])

    const onSumbit = async () => {
        if (enableLogin) {
            const { status } = await SignupAction({ fullName, email: email.value, password });
            if(status === 200){
                router.push('/home');
            }
        }
    }

    const handleEmailName = useCallback((value) => {
        const isValid = EmailValidator(value);
        setEmail({ value , isError: !isValid});
    }, []);

    const handlePassword = useCallback((value) => {
        setPassword(value)
    }, []);

    const handleFullName = useCallback((value) => {
        setFullName(value)
    }, []);

    const { label, field : { fullNameField, emailField, passwordField, loginButton}} = props;


    return (
        <div id="login-form">
            <h3 id="login-header">{label}</h3>
            <InputTextField value={fullName} onChange={({ target }) => handleFullName(target.value)} {...fullNameField} />
            <InputTextField error={email.isError} value={email.value} onChange={({ target }) => handleEmailName(target.value)} {...emailField} />
            <InputTextField value={password} onChange={({ target }) => handlePassword(target.value)} {...passwordField} />
            <ButtonField onSumbit={onSumbit} enabled={enableLogin} {...loginButton} />
            <Link id="register-link" href={'/'}>
                Already have an account?
                <span className="underline">Login</span>
            </Link>
        </div>
    );
}