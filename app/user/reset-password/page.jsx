'use client';

import { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import ResetPassword from "@/components/ResetPasswordForm";
import resetPassword from "./page.json";

export default function Register() {

    const { push } = useRouter();

    const handleResetPassword = async (forgetPasswordProps) => {
        const { isValid, password } = forgetPasswordProps;
        if (isValid) {
            const { status } = await axios.post("/api/auth/resetPassword", { password });
            if (status === 200) {
                push('/user/login');
                return status;
            } else {
                AxiosError.message = "Unable to send request";
                AxiosError.status = 500;
                return AxiosError;
            }
        }
        AxiosError.message = "Invalid Password Field";
        AxiosError.status = 400;
        return AxiosError;
    }
  
    useEffect(() => {
        // Expose the function on the client side
        window.handleResetPassword = handleResetPassword;
    }, []);

    return (
        <ResetPassword { ...resetPassword} />
    );
}