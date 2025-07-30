import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Qui puoi aggiungere la logica di autenticazione
    console.log('Login attempt:', { username, password, rememberMe });
    // Esempio: chiamata API per il login
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '80vh',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>
          Accedi a MealBuddy
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="username" style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: 'bold',
              color: '#555'
            }}>
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
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="password" style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: 'bold',
              color: '#555'
            }}>
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
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              cursor: 'pointer',
              color: '#555'
            }}>
              <input 
                type="checkbox" 
                name="remember" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ marginRight: '0.5rem' }}
              />
              Ricordami
            </label>
          </div>

          <button 
            type="submit" 
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#9bf59e',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#7ae87d'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#9bf59e'}
          >
            Accedi
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>
            Non hai un account? 
            <Link to="/register" style={{ color: '#9bf59e', textDecoration: 'none', marginLeft: '0.25rem' }}>
              Registrati qui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
