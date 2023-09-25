"use client";

import './globals.css'
import { Inter } from 'next/font/google'
import successiveLogo from '../public/successive-logo.svg';
import HeaderComponent from '../components/Header';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
    children,
}) {

    const { push } = useRouter();
    const pathname = usePathname();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        (async () => {
            await handleUser();
        })();
    }, []);

    useEffect(() => {
        (async () => {
            await handleUser();
        })();
    }, [pathname]);

    const handleUser = async () => {
        const { user, error } = await getUser();

        if (pathname.includes('/user') && !error) {
            push("/");
            setIsLogin(true)
        } else if (error) {
            push("/user/login");
            setIsLogin(false)
        } else {
            setIsLogin(true)
        }

        // if the error did not happen, if everything is alright
        setIsSuccess(true);
    }

    return (
        <html lang="en">
            <body className={inter.className}>
                <HeaderComponent logo={successiveLogo} isLogin={isLogin} />
                <div id='componentBody'>
                    {isSuccess ?
                        children :
                        <div>Loaging............</div>
                    }
                </div>
            </body>
        </html>
    )
}

async function getUser() {
    try {
        const { data } = await axios.get(`/api/auth/me`);

        return {
            user: data,
            error: null,
        };
    } catch (e) {
        const error = e;
        return {
            user: null,
            error,
        };
    }
}
