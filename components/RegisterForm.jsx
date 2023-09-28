'use client';
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { InputTextField, ButtonField } from "@/components/InputField";
import { EmailValidator } from "./Validator";
import Container from './library/Container';
import LinkContainer from './library/linkContainer';

export default function RegisterForm(props) {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState({ value: '', isError: false });
    const [password, setPassword] = useState('');
    const [enableButton, setEnableButton] = useState(false);

    useEffect(() => {
        if (!email.isError && email.value.length >= 5 && fullName.length >= 1 && password.length >= 1) {
            setEnableButton(true);
        } else {
            setEnableButton(false);
        }
    }, [email, password, fullName])

    const onSumbit = async () => {
        if (enableButton) {
            window.handleRegister({ fullName, email: email.value, password, isValid: enableButton });
        }
    }

    const handleEmailName = useCallback((value) => {
        const isValid = EmailValidator(value);
        setEmail({ value, isError: !isValid });
    }, []);

    const handlePassword = useCallback((value) => {
        setPassword(value)
    }, []);

    const handleFullName = useCallback((value) => {
        setFullName(value)
    }, []);

    const { label, field: { fullNameField, emailField, passwordField, loginButton } } = props;


    return (
        <Container>
            <h3 className="div-label">{label}</h3>
            <InputTextField value={fullName} onChange={({ target }) => handleFullName(target.value)} {...fullNameField} />
            <InputTextField error={email.isError} value={email.value} onChange={({ target }) => handleEmailName(target.value)} {...emailField} />
            <InputTextField value={password} onChange={({ target }) => handlePassword(target.value)} {...passwordField} />
            <ButtonField onSumbit={onSumbit} enabled={enableButton} {...loginButton} />
            <LinkContainer>
                <Link id="register-link" href={'/user/login'}>
                    Already have an account?
                    <span className="underline">Login</span>
                </Link>
            </LinkContainer>
        </Container>
    );
}