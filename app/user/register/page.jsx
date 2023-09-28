'use client';

import { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import RegisterForm from "@/components/RegisterForm";
import register from "./page.json";

export default function Register() {

    const { push } = useRouter();

    const handleRegister = async (forgetPasswordProps) => {
        const { isValid, fullName, email, password } = forgetPasswordProps;
        if (isValid) {
            const { status } = await axios.post("/api/auth/register", { fullName, email, password });
            if (status === 200) {
                push('/');
                return status;
            } else {
                AxiosError.message = "Unable to send request";
                AxiosError.status = 500;
                return AxiosError;
            }
        }
        AxiosError.message = "Invalid FullName, Email or Password Field";
        AxiosError.status = 400;
        return AxiosError;
    }
  
    useEffect(() => {
        // Expose the function on the client side
        window.handleRegister = handleRegister;
    }, []);

    return (
        <RegisterForm { ...register} />
    );
}