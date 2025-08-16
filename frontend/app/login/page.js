'use client';

import { useState } from 'react';

const API = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg(''); 
    try {
      const res = await fetch(`${API}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) setMsg('✅ ' + data.message);
      else setMsg('❌ ' + (data.message || 'Login failed'));
    } catch (err) {
      setMsg('❌ ' + err.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin} style={{ display: 'grid', gap: 8, maxWidth: 360 }}>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button>Login</button>
      </form>
      {msg && <p style={{ marginTop: 12 }}>{msg}</p>}
      <p style={{ marginTop: 12 }}>Try: <code>admin / admin</code></p>
    </div>
  );
}
