'use client';
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Grid from "@mui/material/Grid"

import { InputTextField, ButtonField } from "@/components/InputField";
import { EmailValidator as DefaultEmailValidator } from "./Validator";
import Container from './library/Container';
import LinkContainer from './library/linkContainer';

const LoginForm = (props) => {

    const { label, emailValidator, passwordValidator, field: { emailField, passwordField, loginButton } } = props;
    const [email, setEmail] = useState({ value: null, isError: false });
    const [password, setPassword] = useState({ value: null, isError: false });
    const [enableButton, setEnableButton] = useState(false);

    useEffect(() => {
        if (!email.isError && !email.isError) {
            setEnableButton(true);
        } else {
            setEnableButton(false);
        }
    }, [email, password])

    const onSumbit = async () => {
        if (enableButton) {
            window.handleLogin({ email: email.value, password, isValid: enableButton });
        }
    }

    const handleEmailName = useCallback((value) => {
        const isValid = emailValidator ? emailValidator(value) : DefaultEmailValidator(value);
        setEmail({ value, isError: !isValid });
    }, []);

    const handlePassword = useCallback((value) => {
        const isValid = passwordValidator ? passwordValidator(value) : true;
        setPassword({ value, isError: !isValid })
    }, []);

    return (
        <Container>
            <h3 className="div-label">{label}</h3>
            <InputTextField error={email.isError} value={email.value} onChange={({ target }) => handleEmailName(target.value)} {...emailField} />
            <InputTextField error={password.isError} value={password.value} onChange={({ target }) => handlePassword(target.value)} {...passwordField} />
            <ButtonField onSumbit={onSumbit} enabled={enableButton} {...loginButton} />
            <Grid container spacing={2}>
                <Grid item md={5}>
                    <LinkContainer>
                        <Link id="forgotPassword-link" href={'/user/forgot-password'}>
                            Forgot Password?
                        </Link>
                    </LinkContainer>
                </Grid>
                <Grid item md={7}>
                    <LinkContainer>
                        <Link id="register-link" href={'/user/register'}>
                            Don&apos;t have an account?
                            <span className="underline">Register</span>
                        </Link>
                    </LinkContainer>
                </Grid>
            </Grid>
        </Container>
    );
}

export default LoginForm;
