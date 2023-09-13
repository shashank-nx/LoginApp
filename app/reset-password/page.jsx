import ResetPassword from "@/components/ResetPasswordForm";
import resetPassword from "./page.json";

export default function Register() {
    return (
        <ResetPassword { ...resetPassword}>
            
        </ResetPassword>
    );
}