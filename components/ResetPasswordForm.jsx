'use client';
import { useCallback, useEffect, useState } from "react";
import { InputTextField, ButtonField } from "@/components/InputField";
import Container from './library/Container';

export default function ResetPassword(props) {

    const [newPassword, setNewPassword] = useState(null);
    const [conformPassword, setConformPassword] = useState({ value: null, isError: false });
    const [enableButton, setEnableButton] = useState(false);

    useEffect(() => {
        if (newPassword && conformPassword && !conformPassword.isError) {
            setEnableButton(true);
        } else {
            setEnableButton(false);
        }
    }, [newPassword, conformPassword])

    const onSumbit = async () => {
        if (enableButton) {
            window.handleResetPassword({ password: newPassword, isValid: enableButton });
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
            <ButtonField onSumbit={onSumbit} enabled={enableButton} {...resetPasswordButton} />
        </Container>
    );
}