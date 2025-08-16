const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Healthcheck
app.get('/api/health', (_req, res) => {
  res.send('Backend is up and running!');
});

// Check database connection
app.get('/api/database-status', async (_req, res) => {
  try {
    const result = await pool.query('SELECT 1 as success');
    res.json({ status: 'Database connection successful', result: result.rows });
  } catch (err) {
    res.status(500).json({ status: 'Database connection failed', error: err.message });
  }
});

// Login route (demo only — plaintext passwords in DB for simplicity)
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body || {};
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1 AND password = $2',
      [username, password]
    );
    if (result.rows.length > 0) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add employee
app.post('/api/employees', async (req, res) => {
  const { name, email, position } = req.body || {};
  try {
    await pool.query(
      'INSERT INTO employees (name, email, position) VALUES ($1, $2, $3)',
      [name, email, position]
    );
    res.json({ success: true, message: 'Employee added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all employees
app.get('/api/employees', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM employees ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Root route (for testing in browser)
app.get('/', (_req, res) => {
  res.send(`
    <h2>🚀 Backend API is running</h2>
    <p>Available endpoints:</p>
    <ul>
      <li>GET <code>/api/health</code></li>
      <li>GET <code>/api/database-status</code></li>
      <li>POST <code>/api/login</code> (body: { username, password })</li>
      <li>POST <code>/api/employees</code> (body: { name, email, position })</li>
      <li>GET <code>/api/employees</code></li>
    </ul>
  `);
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
});

