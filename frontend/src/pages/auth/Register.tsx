import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegisterPage: React.FC = () => {
<<<<<<< HEAD
  //variabili da inserire
  const [name, setName] = useState("");
=======
  const [username, setUsername] = useState("");
>>>>>>> parent of 1a58eea (implemented login function)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validazione base
    if (password !== confirmPassword) {
      alert("Le password non coincidono!");
      return;
    }
<<<<<<< HEAD
    if (!name || !email || !password) {
      setError("Tutti i campi sono obbligatori.");
      return;
    }

    const result = await register(name, email, password, confirmPassword);
    if (result) {
      setTimeout(() => navigate("/login"), 1500);
    }
=======

    setIsLoading(true);

    // Simula una chiamata API
    setTimeout(() => {
      console.log("Registration attempt:", { username, email, password });
      setIsLoading(false);
      // Qui puoi aggiungere la logica di registrazione
    }, 1500);
>>>>>>> parent of 1a58eea (implemented login function)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-4">
      <div className="max-w-md w-full">
        {/* Register Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🍴</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Unisciti a MealBuddy!
            </h2>
            <p className="text-gray-600">Crea il tuo account per iniziare</p>
          </div>

          {/* Form */}
<<<<<<< HEAD
          <form onSubmit={handleSubmit} method="post" className="space-y-6 mb-2">
            <div id="register-error" className="bg-red-100 text-red-700 px-4 py-2 rounded mb-2 text-center text-sm">
              {error}
            </div>
            {success && (
              <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-2 text-center text-sm">Registrazione avvenuta con successo! Reindirizzamento...</div>
            )}
=======
          <form onSubmit={handleSubmit} className="space-y-6 mb-2">
>>>>>>> parent of 1a58eea (implemented login function)
            {/* Username Field */}
            <div className="space-y-2">
              <div className="relative mb-2">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">👤</span>
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Scegli un nome utente"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <div className="relative mb-2">
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

            {/* Password Field */}
            <div className="space-y-2">
              <div className="relative mb-2">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">🔒</span>
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Crea una password sicura"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-1">
              <div className="relative mb-2">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">🔐</span>
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Ripeti la password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                  Registrazione in corso...
                </div>
              ) : (
                "Registrati"
              )}
            </button>
          </form>

          {/* Social Login Buttons */}
          <div className="space-y-3 mt-6">
            {/* Google */}
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors group">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-gray-700 font-medium">
                Registrati con Google
              </span>
            </button>

            {/* Facebook */}
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors group">
              <svg className="w-5 h-5" fill="#1877f2" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
              <span className="text-gray-700 font-medium">
                Registrati con Facebook
              </span>
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-600">
              Hai già un account?{" "}
              <Link
                to="/login"
                className="text-green-600 hover:text-green-500 font-semibold ml-1 transition-colors"
              >
                Accedi qui
              </Link>
            </p>
          </div>

          {/* Additional Info */}
          <div className="text-center mt-6">
            <p className="text-gray-700 font-medium text-sm">
              Registrandoti accetti i nostri{" "}
              <Link to="/terms" className="underline hover:no-underline">
                Termini di Servizio
              </Link>{" "}
              e la{" "}
              <Link to="/privacy" className="underline hover:no-underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
