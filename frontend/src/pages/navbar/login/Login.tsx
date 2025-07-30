import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { username, password, rememberMe });
    // Qui puoi aggiungere la logica di autenticazione
  };

  return (
    <div>
      <h2>Accedi a MealBuddy</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">
            Username
          </label>
          <input 
            type="text" 
            id="username"
            name="username"
            placeholder="Inserisci il tuo username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
          />
        </div>

        <div>
          <label htmlFor="password">
            Password
          </label>
          <input 
            type="password" 
            id="password"
            name="password"
            placeholder="Inserisci la tua password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>

        <div>
          <label>
            <input 
              type="checkbox" 
              name="remember" 
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{ marginRight: 'var(--spacing-sm)' }}
            />
            Ricordami
          </label>
        </div>

        <button type="submit">
          Accedi
        </button>
      </form>

      <div className="text-center mt-4">
        <p className="text-muted">
          Non hai un account? 
          <Link to="/register" style={{ color: 'var(--primary-color)', marginLeft: 'var(--spacing-xs)' }}>
            Registrati qui
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
