import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export function useRegister() {
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (data: { name: string; email: string; password: string; password_confirmation: string }) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    const res = await register(data);
    setIsLoading(false);
    if (res.success) {
      setSuccess(true);
    } else {
      setError(res.error || "Errore di registrazione.");
    }
    return res;
  };

  return { handleRegister, isLoading, error, success };
}
