'use client';
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { InputTextField, ButtonField } from "@/components/InputField";
import Container from './library/Container';

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
            const { status } = await axios.post("/api/auth/resetPassword", { password: newPassword });
            if (status === 200) {
                router.push('/user/login');
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
        <Container>
            <h3 className="div-label">{label}</h3>
            <InputTextField value={newPassword} onChange={({ target }) => handleNewPassword(target.value)} {...newPasswordField} />
            <InputTextField error={conformPassword.isError} value={conformPassword.value} onChange={({ target }) => handleConformPassword(target.value)} {...conformPasswordField} />
            <ButtonField onSumbit={onSumbit} enabled={enableLogin} {...resetPasswordButton} />
        </Container>
    );
}