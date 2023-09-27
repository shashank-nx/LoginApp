import LoginForm from "@/components/LoginForm";
import page from "./page.json";

export default function Login() {
  return <main>
    <LoginForm {...page}/>
  </main>
}