import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  fallback 
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Mostra un loading spinner mentre verifica l'autenticazione
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-500 to-purple-600">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Verifica in corso...
            </h2>
            <p className="text-gray-600">
              Stiamo controllando il tuo accesso
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Se non è autenticato, reindirizza al login salvando la pagina attuale
  if (!isAuthenticated) {
    return fallback || (
      <Navigate 
        to="/" 
        state={{ from: location.pathname }}
        replace 
      />
    );
  }

  // Se è autenticato, mostra il contenuto protetto
  return <>{children}</>;
};

export default ProtectedRoute;
