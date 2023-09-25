import { getRequest } from "@/components/httpRequest";

export const LoginAction = async (props) => {
    const { token, ...rest } = props;
    const loginProps = {
        componentUrl: "/login",
        params: { token },
        ...rest
    }
    return await getRequest(loginProps);
}