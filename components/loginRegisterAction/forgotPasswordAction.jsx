import { getRequest } from "@/components/httpRequest";

export async function ForgotPasswordAction(props) {

    const { email } = props;
    const loginProps = {
        componentUrl: "/forgot-password",
        params: {
            email
        }
    }
    const res = await getRequest(loginProps);
    return res;
}