'use client';
import Link from "next/link";
import StyleHOC from "./muiStyle";
import { InputTextField, ButtonField } from "@/components/InputField";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EmailValidator as DefaultEmailValidator } from "./Validator";
import axios from "axios";
import { withStyles } from "@mui/styles";

const LoginForm = withStyles(StyleHOC) (props => {

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
        <div className="container">
            <h3 className="div-label">{label}</h3>
            <InputTextField error={email.isError} value={email.value} onChange={({ target }) => handleEmailName(target.value)} {...emailField} />
            <InputTextField error={password.isError} value={password.value} onChange={({ target }) => handlePassword(target.value)} {...passwordField} />
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
})

export default LoginForm;