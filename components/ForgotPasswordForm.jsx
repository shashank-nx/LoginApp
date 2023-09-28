'use client';
import { useCallback, useEffect, useState } from "react";
import { InputTextField, ButtonField } from "@/components/InputField";
import { EmailValidator } from "./Validator";
import Container from './library/Container';

export default function ForgotPassword(props) {

    const [email, setEmail] = useState({ value: null, isError: false });
    const [enableButton, setEnableButton] = useState(false);

    useEffect(() => {
        if (!email.isError && email.value) {
            setEnableButton(true);
        } else {
            setEnableButton(false);
        }
    }, [email])

    const onSumbit = async () => {
        if (enableButton) {
            window.handleForgotPassword({ email: email.value, isValid: enableButton });
        }
    }
    
    const { label, field: { emailField, forgotPasswordButton } } = props;

    const handleEmailName = useCallback((value) => {
        const isValid = EmailValidator(value);
        setEmail({ value, isError: !isValid });
    }, []);

    return (
        <Container>
            <h3 className="div-label">{label}</h3>
            <InputTextField error={email.isError} value={email.value} onChange={({ target }) => handleEmailName(target.value)} {...emailField} />
            <ButtonField onSumbit={onSumbit} enabled={enableButton} {...forgotPasswordButton} />
        </Container>
    );
}