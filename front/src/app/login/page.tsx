import LoginForm from "@/components/login/LoginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[var(--tertiary)]">
      <Image
        src="/centenario-login.webp"
        alt="Hospital Centenario"
        fill
        className="absolute object-cover w-full h-full z-0 opacity-30"
        priority
      />
      <div className="relative z-10 bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-8 w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}