import LoginForm from "@/components/LoginForm";
import page from "./page.json";

export default function Page() {
  return <main>
    <LoginForm {...page}/>
  </main>
}