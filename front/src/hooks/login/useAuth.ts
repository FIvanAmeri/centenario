"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginRequest } from "@/lib/login/auth";
import { LoginResponse } from "@/lib/login/types";

interface LoginPayload {
  email: string;
  password: string;
}

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async ({ email, password }: LoginPayload) => {
    setLoading(true);
    setError(null);

    try {
      const response: LoginResponse = await loginRequest(email, password);

      switch (response.rol) {
        case "administrativo":
          router.push("/dashboard/administrativo");
          break;
        case "medico":
          router.push("/dashboard/medico");
          break;
        case "superadmin":
          router.push("/dashboard/superadmin");
          break;
        default:
          router.push("/dashboard");
      }
    } catch {
      setError("Credenciales inválidas");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}