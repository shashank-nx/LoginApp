"use client";

import './globals.css'
import successiveLogo from '../public/successive-logo.svg';
import HeaderComponent from '../components/Header';
import axios from 'axios';
import { useEffect, useReducer, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const initialLoginState = {
    "isSuccess": false,
    "isLogin": false
};

const reducer = (state, action) => {
    switch (action.type) {
        case "verified":
            return {
                "isSuccess": true,
                "isLogin": true
            }
        case "unVerified":
            return {
                "isSuccess": true,
                "isLogin": false
            }
        default:
            return state;
    }
};

export default function RootLayout({
    children,
}) {

    const { push } = useRouter();
    const pathname = usePathname();
    const [loginState, dispatch] = useReducer(reducer, initialLoginState);

    const handleUser = useCallback(async () => {
        const { error } = await getUser();

        if (error && !pathname.includes('/user')) {
            push("/user/login");
            return;
        } else if (pathname.includes('/user') && !error) {
            push("/");
            return;
        }

        return dispatch({ type: "verified" });
        
    }, [pathname, push])

    useEffect(() => {
        (async () => {
            await handleUser();
        })();
    }, [handleUser, pathname]);

    return (
        <html lang="en">
            <body>
                <HeaderComponent logo={successiveLogo} isLogin={loginState.isLogin} />
                <div id='componentBody'>
                    {!loginState.isSuccess ?
                        <div>Loading............</div> :
                        children
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
