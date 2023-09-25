import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import { ForgotPasswordAction } from "@/components/loginRegisterAction";

export async function POST(request) {
    const body = await request.json();
    const { email } = body;

    const token = sign(
        {
            email
        },
        process.env.PRIVATE_KEY,
        {
            expiresIn: process.env.MAX_AGE,
        }
    );

    const seralized = serialize("auth", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: process.env.MAX_AGE,
    });

    const { data, status } = await ForgotPasswordAction({ headers: { "Set-Cookie": seralized } });
    if (status === 200) {
        return new Response("Login!!!", {
            status: 200,
        });
    } else {
        return NextResponse.json(
            {
                message: "Unauthorized",
            },
            {
                status: 401,
            }
        );
    }
}