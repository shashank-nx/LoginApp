'use client';
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import './loginForm.css';
import { InputTextField, ButtonField } from "@/components/InputField";
import { ResetPasswordAction } from './loginRegisterAction';

export default function ResetPassword(props) {

    const router = useRouter();
    const [newPassword, setNewPassword] = useState(null);
    const [conformPassword, setConformPassword] = useState({ value: null, isError: false });
    const [enableLogin, setEnableLogin] = useState(false);

    useEffect(() => {
        if (newPassword && conformPassword && !conformPassword.isError) {
            setEnableLogin(true);
        } else {
            setEnableLogin(false);
        }
    }, [newPassword, conformPassword])

    const onSumbit = async () => {
        if (enableLogin) {
            const { status } = await ResetPasswordAction({ password: newPassword });
            if(status === 200){
                router.push('/');
            }
        }
    }

    const { label, field: { newPasswordField, conformPasswordField, resetPasswordButton } } = props;

    const handleNewPassword = useCallback((value) => {
        setNewPassword(value);
    }, []);

    const handleConformPassword = useCallback((value) => {
        let isError = true
        if (value === newPassword) {
            isError = false
        }
        setConformPassword({ value, isError });
    }, [newPassword]);

    return (
        <div id="login-form">
            <h3 id="login-header">{label}</h3>
            <InputTextField value={newPassword} onChange={({ target }) => handleNewPassword(target.value)} {...newPasswordField} />
            <InputTextField error={conformPassword.isError} value={conformPassword.value} onChange={({ target }) => handleConformPassword(target.value)} {...conformPasswordField} />
            <ButtonField onSumbit={onSumbit} enabled={enableLogin} {...resetPasswordButton} />
        </div>
    );
}