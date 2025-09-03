import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TwoFactor: React.FC = () => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await axios.post(
        "http://127.0.0.1:8000/two-factor-challenge",
        { code },
        { withCredentials: true }
      );
      // Se va a buon fine, redirect alla dashboard
      navigate("/dashboard");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Codice non valido o errore di rete."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-4">
      <div className="max-w-md w-full">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🔐</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Verifica in due passaggi
            </h2>
            <p className="text-gray-600">Inserisci il codice di autenticazione ricevuto</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6 mb-2">
            {error && (
              <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-2 text-center text-sm">{error}</div>
            )}
            <div className="space-y-2">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                placeholder="Codice 2FA"
                value={code}
                onChange={e => setCode(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-center text-lg tracking-widest"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? "Verifica..." : "Verifica codice"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TwoFactor;
