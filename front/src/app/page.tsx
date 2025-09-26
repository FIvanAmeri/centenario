
"use client";
import LoginForm from "@/components/login/LoginForm";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-green-700 to-black">
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-8 w-full max-w-sm z-10 border border-neutral-200">
        <LoginForm />
      </div>
    </div>
  );
}