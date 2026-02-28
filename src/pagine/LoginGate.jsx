import React, { useState } from 'react';

// ← Cambia questa password con quella che vuoi voi due
const PASSWORD = '2124';

export default function LoginGate({ children }) {
  const [isAuth, setIsAuth] = useState(() => localStorage.getItem('ps_auth') === '1');
  const [input, setInput] = useState('');
  const [shake, setShake] = useState(false);
  const [error, setError] = useState(false);

  if (isAuth) return children;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === PASSWORD) {
      localStorage.setItem('ps_auth', '1');
      setIsAuth(true);
    } else {
      setShake(true);
      setError(true);
      setInput('');
      setTimeout(() => { setShake(false); setError(false); }, 600);
    }
  };

  return (
    <div className="login-gate">
      <div className="login-bg" />
      <form
        className={`login-card glass-panel${shake ? ' shake' : ''}`}
        onSubmit={handleSubmit}
      >
        <div className="login-vinyl" />
        <h1 className="login-title">PicciaSound</h1>
        <input
          className={`login-input${error ? ' input-error' : ''}`}
          type="password"
          placeholder="Password..."
          value={input}
          onChange={e => setInput(e.target.value)}
          autoFocus
        />
        <button className="start-btn login-submit" type="submit">
          Entra
        </button>
      </form>
    </div>
  );
}
