'use client';
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { InputTextField, ButtonField } from "@/components/InputField";
import { EmailValidator } from "./Validator";
import Container from './library/Container';

export default function ForgotPassword(props) {

    const router = useRouter();
    const [email, setEmail] = useState({ value: null, isError: false });
    const [enableLogin, setEnableLogin] = useState(false);

    useEffect(() => {
        if (!email.isError && email.value) {
            setEnableLogin(true);
        } else {
            setEnableLogin(false);
        }
    }, [email])

    const onSumbit = async () => {
        if (enableLogin) {
            const { status } = await axios.post("/api/auth/forgetPassword", { email: email.value });
            if (status === 200) {
                router.push('/user/login');
            }
            window.handleForgotPassword();
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
            <ButtonField onSumbit={onSumbit} enabled={enableLogin} {...forgotPasswordButton} />
        </Container>
    );
}