import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import { LoginAction } from "@/components/loginRegisterAction";

export async function GET() {

    const seralized = serialize("auth", '', {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: -1,
    });
    return new Response("Logout!!!", {
        status: 200,
        headers: { "Set-Cookie": seralized },
    });
}