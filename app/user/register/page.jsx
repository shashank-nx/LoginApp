import RegisterForm from "@/components/RegisterForm";
import register from "./page.json";

export default function Register() {
    return (
        <RegisterForm { ...register}>
            
        </RegisterForm>
    );
}