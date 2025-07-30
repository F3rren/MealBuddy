import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validazione base
    if (password !== confirmPassword) {
      alert('Le password non coincidono!');
      return;
    }

    // Qui puoi aggiungere la logica di registrazione
    console.log('Registration attempt:', { username, email, password });
    // Esempio: chiamata API per la registrazione
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: 'white',
      padding: '2rem 0'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh'
      }}>
        <div style={{
          backgroundColor: '#f9f9f9',
          padding: '2.5rem',
          borderRadius: '12px',
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '450px',
          border: '1px solid #e0e0e0'
        }}>
          <h2 style={{ 
            textAlign: 'center', 
            marginBottom: '2rem', 
            color: '#333',
            fontSize: '1.8rem',
            fontWeight: '600'
          }}>
            Registrati su MealBuddy
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label htmlFor="username" style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: 'bold',
                color: '#444'
              }}>
                Nome Utente
              </label>
              <input 
                type="text" 
                id="username"
                name="username"
                placeholder="Scegli un nome utente" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required 
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  border: '2px solid #e0e0e0',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#9bf59e'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label htmlFor="email" style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: 'bold',
                color: '#444'
              }}>
                Email
              </label>
              <input 
                type="email" 
                id="email"
                name="email"
                placeholder="Inserisci la tua email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  border: '2px solid #e0e0e0',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#9bf59e'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label htmlFor="password" style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: 'bold',
                color: '#444'
              }}>
                Password
              </label>
              <input 
                type="password" 
                id="password"
                name="password"
                placeholder="Crea una password sicura" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  border: '2px solid #e0e0e0',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#9bf59e'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label htmlFor="confirmPassword" style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: 'bold',
                color: '#444'
              }}>
                Conferma Password
              </label>
              <input 
                type="password" 
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Ripeti la password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required 
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  border: '2px solid #e0e0e0',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#9bf59e'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>

            <button 
              type="submit" 
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: '#9bf59e',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 2px 4px rgba(155, 245, 158, 0.3)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#7ae87d';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(155, 245, 158, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#9bf59e';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(155, 245, 158, 0.3)';
              }}
            >
              Registrati
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <p style={{ color: '#666', fontSize: '0.95rem' }}>
              Hai già un account? 
              <Link to="/login" style={{ 
                color: '#9bf59e', 
                textDecoration: 'none', 
                marginLeft: '0.25rem',
                fontWeight: '600'
              }}>
                Accedi qui
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
