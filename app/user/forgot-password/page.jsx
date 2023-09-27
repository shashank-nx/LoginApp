"use client"

import ForgotPasswordForm from "@/components/ForgotPasswordForm";
import { useEffect } from "react";
import forgotPassword from "./page.json";

export default function ForgotPassword() {

    const handleForgotPassword = () => {
        console.log("done=============");
    }

    useEffect(() => {
        // Expose the function on the client side
        window.handleForgotPassword = handleForgotPassword;
      }, []);

    return (
        <ForgotPasswordForm { ...forgotPassword}>
            
        </ForgotPasswordForm>
    );
}