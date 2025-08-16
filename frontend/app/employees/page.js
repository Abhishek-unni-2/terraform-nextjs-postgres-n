'use client';

import { useEffect, useState } from 'react';

const API = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [msg, setMsg] = useState('');

  const fetchEmployees = async () => {
    try {
      const res = await fetch(`${API}/api/employees`);
      const data = await res.json();
      setEmployees(Array.isArray(data) ? data : []);
    } catch (err) {
      setMsg('❌ ' + err.message);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const res = await fetch(`${API}/api/employees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, position })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add');
      setMsg('✅ ' + data.message);
      setName(''); setEmail(''); setPosition('');
      fetchEmployees();
    } catch (err) {
      setMsg('❌ ' + err.message);
    }
  };

  useEffect(() => { fetchEmployees(); }, []);

  return (
    <div>
      <h1>Employees</h1>

      <form onSubmit={handleAdd} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Position" value={position} onChange={e => setPosition(e.target.value)} />
        <button>Add</button>
      </form>

      {msg && <p style={{ marginBottom: 12 }}>{msg}</p>}

      <table border="1" cellPadding="6" style={{ width: '100%', background: '#fff' }}>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Email</th><th>Position</th></tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.position}</td>
            </tr>
          ))}
          {!employees.length && (
            <tr><td colSpan="4" style={{ textAlign: 'center' }}>No employees yet</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
