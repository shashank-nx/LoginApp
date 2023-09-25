import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import { LoginAction } from "@/components/loginRegisterAction";

export async function POST(request) {
    const body = await request.json();
    const { email, password } = body;

    const token = sign(
        {
            email, password
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

    const { data, status } = await LoginAction({ headers: { "Set-Cookie": seralized } });
    if (status === 200) {
        return new Response("Login!!!", {
            status: 200,
            headers: { "Set-Cookie": seralized },
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