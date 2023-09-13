'use client';
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import './loginForm.css';
import { InputTextField, ButtonField } from "@/components/InputField";
import { ForgotPasswordAction } from './loginRegisterAction';
import { EmailValidator } from "./Validator";

export default function ResetPassword(props) {

    const router = useRouter();
    const [email, setEmail] = useState({ value: null, isError: false });
    const [enableLogin, setEnableLogin] = useState(false);

    useEffect(() => {
        if (!email.isError  && email.value) {
            setEnableLogin(true);
        } else {
            setEnableLogin(false);
        }
    }, [email])

    const onSumbit = async () => {
        if (enableLogin) {
            const { status } = await ForgotPasswordAction({ email: email.value });
            console.log("status=========", status);
            if(status === 200){
                router.push('/');
            }
        }
    }

    const { label, field: { emailField, forgotPasswordButton } } = props;

    const handleEmailName = useCallback((value) => {
        const isValid = EmailValidator(value);
        setEmail({ value , isError: !isValid});
    }, []);

    return (
        <div id="login-form">
            <h3 id="login-header">{label}</h3>
            <InputTextField error={email.isError} value={email.value} onChange={({ target }) => handleEmailName(target.value)} {...emailField} />
            <ButtonField onSumbit={onSumbit} enabled={enableLogin} {...forgotPasswordButton} />
        </div>
    );
}