'use client';
import Link from "next/link";
import { InputTextField, ButtonField } from "@/components/InputField";
import { getRequest } from "@/components/httpRequest";

export default function RegisterForm(props) {

    const onSumbit = async () => {
        const url = "register"
        await getRequest(url);
    }

    const { label, field : { fullNameField, emailField, passwordField, loginButton}} = props;


    return (
        <div id="login-form">
            <h1 id="login-header">{label}</h1>
            <InputTextField value={'fullName'} onChange={({ target }) => setFullName(target.value)} {...fullNameField} />
            <InputTextField value={'email'} onChange={({ target }) => setEmail(target.value)} {...emailField} />
            <InputTextField value={'password'} onChange={({ target }) => setPassword(target.value)} {...passwordField} />
            <ButtonField onSumbit={onSumbit} enabled={'enableLogin'} {...loginButton} />
            <Link id="register-link" href={'/'}>
                Don't have an account?
                <span className="underline">Login</span>
            </Link>
        </div>
    );
}