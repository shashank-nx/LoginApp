import { getRequest } from "@/components/httpRequest";
const jwt = require('jsonwebtoken');

export const SignupAction = async (props) => {
    const { password, privateKey="asas", ...rest } = props;
    const PRIVATE_KEY = privateKey ?? process.env.PRIVATE_KEY;
    const token = jwt.sign({ password }, PRIVATE_KEY).toString();
    const loginProps = {
        componentUrl: "/register",
        params: {
            ...rest,
            "password": token,
        }
    }
    const res = await getRequest(loginProps);
    const { data, status } = res;
    if (status === 200) {
        localStorage.setItem('authType', "jwt");
        localStorage.setItem('access_token', data);
    }
    return res;
}