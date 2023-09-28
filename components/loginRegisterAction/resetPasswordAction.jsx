import { getRequest } from "@/components/httpRequest";
import { setCookie } from "cookies-next";
const jwt = require('jsonwebtoken');

export const ResetPasswordAction = async (props) => {
    const { password, privateKey, ...rest } = props;
    const PRIVATE_KEY = privateKey ?? process.env.PRIVATE_KEY;
    const token = jwt.sign({ password }, PRIVATE_KEY).toString();
    const loginProps = {
        componentUrl: "/reset-password",
        params: {
            ...rest,
            "newPassword": token
        }
    }
    const res = await getRequest(loginProps);
    const { data, status } = res;
    if (status === 200) {
        setCookie('authType', 'jwt');
        setCookie('access_token', data);
    }
    return res;
}