import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simula una chiamata API per il reset della password
    setTimeout(() => {
      console.log("Password reset request for:", email);
      setIsLoading(false);
      setIsEmailSent(true);
      // Qui puoi aggiungere la logica per inviare l'email di reset
    }, 2000);
  };

  const handleBackToLogin = () => {
    setIsEmailSent(false);
    setEmail("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-4">
      <div className="max-w-md w-full">
        {/* Reset Password Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🔑</span>
            </div>
            {!isEmailSent ? (
              <>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Password Dimenticata?
                </h2>
                <p className="text-gray-600">
                  Non preoccuparti! Inserisci la tua email e ti invieremo un
                  link per reimpostare la password.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Email Inviata!
                </h2>
                <p className="text-gray-600">
                  Abbiamo inviato un link per il reset della password al tuo
                  indirizzo email.
                </p>
              </>
            )}
          </div>

          {!isEmailSent ? (
            <>
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6 mb-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-400">📧</span>
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Inserisci la tua email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Invio in corso...
                    </div>
                  ) : (
                    "Invia Link di Reset"
                  )}
                </button>
              </form>
            </>
          ) : (
            <>
              {/* Success Message */}
              <div className="space-y-6 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="text-green-400 text-xl">✅</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-green-800">
                        <strong>Email inviata con successo!</strong>
                      </p>
                      <p className="text-sm text-green-700 mt-1">
                        Controlla la tua casella di posta e segui le istruzioni
                        nel messaggio.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Resend Button */}
                <button
                  onClick={() => handleSubmit(new Event("submit") as any)}
                  disabled={isLoading}
                  className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold border border-gray-300 hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600 mr-2"></div>
                      Invio in corso...
                    </div>
                  ) : (
                    "Invia di nuovo"
                  )}
                </button>
              </div>
            </>
          )}

          {/* Back to Login */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-gray-600 mb-4">
              Ti sei ricordato della password?
            </p>
            <Link
              to="/login"
              onClick={handleBackToLogin}
              className="inline-flex items-center justify-center w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:from-gray-200 hover:to-gray-300 hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <span className="mr-2 transition-transform group-hover:-translate-x-1">
                ←
              </span>
              Torna al Login
            </Link>
          </div>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Non hai ricevuto l'email? Controlla la cartella spam o{" "}
              <a
                href="mailto:support@mealbuddy.com"
                className="text-green-600 hover:text-green-500 font-medium"
              >
                contatta il supporto
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotForm;
