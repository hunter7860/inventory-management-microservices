import React, { useState } from 'react';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setErrorMessage('');
      onLoginSuccess();
    } else {
      setErrorMessage('Invalid credentials! Use admin / admin');
    }
  };

  return (
    <div style={{ maxWidth: '480px', margin: '80px auto', padding: '36px', border: '2px solid #ce93d8', borderRadius: '8px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', fontFamily: 'Segoe UI, Roboto, sans-serif', backgroundColor: '#ffffff' }}>
      
      <div style={{ backgroundColor: '#ebd4fc', padding: '16px', textAlign: 'center', fontWeight: 'bold', fontSize: '22px', color: '#4a148c', borderRadius: '6px', marginBottom: '28px', border: '1px solid #ce93d8' }}>
        Inventory Management - Login
      </div>

      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '17px', color: '#333' }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '12px 14px', fontSize: '16px', boxSizing: 'border-box', border: '2px solid #ce93d8', borderRadius: '6px', outline: 'none' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '17px', color: '#333' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '12px 14px', fontSize: '16px', boxSizing: 'border-box', border: '2px solid #ce93d8', borderRadius: '6px', outline: 'none' }}
          />
        </div>

        {errorMessage && (
          <div style={{ color: '#d32f2f', fontSize: '15px', fontWeight: '600', textAlign: 'center' }}>
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          style={{ marginTop: '8px', padding: '14px', backgroundColor: '#8e24aa', color: '#ffffff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '18px' }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;