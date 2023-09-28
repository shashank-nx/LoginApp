'use client';

import { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/LoginForm";
import page from "./page.json";

export default function Login() {

  const { push } = useRouter();

  const handleLogin = async (forgetPasswordProps) => {
      const { isValid, email, password } = forgetPasswordProps;
      if (isValid) {
          const { status } = await axios.post("/api/auth/login", { email, password });
          if (status === 200) {
              push('/');
              return status;
          } else {
              AxiosError.message = "Unable to send request";
              AxiosError.status = 500;
              return AxiosError;
          }
      }
      AxiosError.message = "Invalid Email or password field";
      AxiosError.status = 400;
      return AxiosError;
  }

  useEffect(() => {
      // Expose the function on the client side
      window.handleLogin = handleLogin;
  }, []);

  return <LoginForm {...page}/>
}