'use client';
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import Grid from "@mui/material/Grid"

import { InputTextField, ButtonField } from "@/components/InputField";
import { EmailValidator as DefaultEmailValidator } from "./Validator";
import Container from './library/Container';
import LinkContainer from './library/linkContainer';

const LoginForm = (props) => {

    const { push } = useRouter();
    const { label, emailValidator, passwordValidator, field: { emailField, passwordField, loginButton } } = props;
    const [email, setEmail] = useState({ value: null, isError: false });
    const [password, setPassword] = useState({ value: null, isError: false });
    const [enableLogin, setEnableLogin] = useState(false);

    useEffect(() => {
        if (!email.isError && !email.isError) {
            setEnableLogin(true);
        } else {
            setEnableLogin(false);
        }
    }, [email, password])

    const onSumbit = async () => {
        if (enableLogin) {
            const { status } = await axios.post("/api/auth/login", { email: email.value, password });
            if (status === 200) {
                push('/');
            }
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
            <ButtonField onSumbit={onSumbit} enabled={enableLogin} {...loginButton} />
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