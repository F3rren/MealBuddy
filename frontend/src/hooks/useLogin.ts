import { useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true; // fondamentale per i cookie di sessione

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);


    
    function getCookie(name: string) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()!.split(';').shift();
      return "";
    }

    try {
      // 1. Prendo il CSRF cookie
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", 
        { withCredentials: true });
        const xsrfCookie = getCookie('XSRF-TOKEN') || '';
        const xsrfToken = decodeURIComponent(xsrfCookie);
        console.log("[CSRF] XSRF-TOKEN cookie RAW:", xsrfCookie);
        console.log("[CSRF] XSRF-TOKEN cookie DECODED:", xsrfToken);

      // 2. Faccio la login
      await axios.post(
        'http://localhost:8000/login',
        { email, password },
        {
            withCredentials: true,
            headers: {
              'X-XSRF-TOKEN': xsrfToken,
            },
        }
      );

      setSuccess(true);
      return true;
    } catch (err: any) {
      console.error("Errore login:", err.response?.data || err.message);
      setError(
        err.response?.data?.message || "Credenziali non valide"
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogin, isLoading, error, success };
}
