"use client"

import { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";
import forgotPassword from "./page.json";

export default function ForgotPassword() {

    const { push } = useRouter();

    const handleForgotPassword = async (forgetPasswordProps) => {
        const { isValid, email } = forgetPasswordProps;
        if (isValid) {
            const { status } = await axios.post("/api/auth/forgetPassword", { email });
            if (status === 200) {
                push('/user/login');
                return status;
            } else {
                AxiosError.message = "Unable to send request";
                AxiosError.status = 500;
                return AxiosError;
            }
        }
        AxiosError.message = "Invalid email";
        AxiosError.status = 400;
        return AxiosError;
    }

    useEffect(() => {
        // Expose the function on the client side
        window.handleForgotPassword = handleForgotPassword;
    }, []);

    return (
        <ForgotPasswordForm {...forgotPassword} />
    );
}
