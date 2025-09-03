import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';

// Configura axios per inviare i cookie su tutte le richieste
axios.defaults.withCredentials = true;

interface User {
  id: string;
  username: string;
  email: string;
  name?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<true | false | "2fa">;
  register: (name: string, email: string, password: string, password_confirmation: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
  isRegistred: boolean;
  sessionExpired: boolean;
  clearSessionExpired: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get('http://localhost:8000/api/user');
        setUser(res.data);
        setSessionExpired(false);
      } catch (error: any) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          setUser(null);
          setSessionExpired(true);
        } else {
          setUser(null);
        }
      } finally {
        setIsLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  // Funzione per leggere un cookie dal browser
  function getCookie(name: string) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()!.split(';').shift();
      return "";
    }

  // Funzione di login
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setSessionExpired(false);
    console.log('[LOGIN] Tentativo di login per:', email, password);
    try {
      await axios.get('http://localhost:8000/sanctum/csrf-cookie');
      const xsrfToken = getCookie('XSRF-TOKEN');
      console.log('[CSRF] XSRF-TOKEN cookie in login:', xsrfToken);

      const loginRes = await axios.post(
        'http://localhost:8000/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-XSRF-TOKEN': xsrfToken ? decodeURIComponent(xsrfToken) : '',
          },
        }
      );
      console.log('[LOGIN] Response:', loginRes.status, loginRes.data);
      // Dopo login, recupera l'utente
      const userRes = await axios.get('http://localhost:8000/api/user');

      
      setUser(userRes.data);
      setIsLoading(false);
      return true;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error('[AUTH ERROR]', error.response?.status, error.response?.data);
        if (error.response?.status === 403) {
          alert('Errore di autenticazione: permessi insufficienti o CSRF non valido. Prova a ricaricare la pagina.');
        } else if (error.response?.status === 401) {
          alert('Credenziali non valide. Controlla email e password.');
        } else if (error.response?.status === 422) {
          alert('Errore di validazione. Controlla i dati inseriti.');
        } else if (error.response?.status === 423) {
          alert('Troppi tentativi di accesso falliti. Account temporaneamente bloccato. Attendi qualche minuto e riprova.');
        }
      }
      setUser(null);
      setIsLoading(false);
      return false;
    }
  };

  // Funzione di registrazione
  const register = async (name: string, email: string, password: string, password_confirmation: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    setSessionExpired(false);
    console.log('[REGISTER] Attempting registration:', { name, email, password, password_confirmation });

    try {
      await axios.get('http://localhost:8000/sanctum/csrf-cookie');
      const xsrfToken = getCookie('XSRF-TOKEN');
      console.log('[CSRF] XSRF-TOKEN cookie in registrazione:', xsrfToken);

      const registerRes = await axios.post(
        'http://localhost:8000/register',
        { name, email, password, password_confirmation },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-XSRF-TOKEN': xsrfToken ? decodeURIComponent(xsrfToken) : '',
          },
        }
      );
      console.log('[REGISTER] Response:', registerRes.status, registerRes.data);

      // Dopo la registrazione, recupera l'utente loggato
      const userRes = await axios.get('http://localhost:8000/api/user');
      setUser(userRes.data);
      setIsLoading(false);
      return { success: true };
    } catch (error: any) {
      setUser(null);
      setIsLoading(false);
      if (axios.isAxiosError(error)) {
        console.error('[REGISTER ERROR]', error.response?.status, error.response?.data);
        let errorMsg = 'Errore di registrazione.';
        if (error.response?.data?.errors) {
          // Laravel validation errors
          const errors = error.response.data.errors;
          errorMsg = Object.values(errors).flat().join(' ');
        } else if (typeof error.response?.data?.message === 'string') {
          errorMsg = error.response.data.message;
        }
        return { success: false, error: errorMsg };
      }
      return { success: false, error: 'Errore di rete.' };
    }
  };

  const logout = async () => {
    await axios.post('http://localhost:8000/logout', {});
      setUser(null);
    };

  const clearSessionExpired = () => setSessionExpired(false);

  const value: AuthContextType & { register: typeof register } = {
    user,
    login,
    register,
    logout,
    isLoading,
    isAuthenticated: !!user,
    isRegistred: !!user,
    sessionExpired,
    clearSessionExpired,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};