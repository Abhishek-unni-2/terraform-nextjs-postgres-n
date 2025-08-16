-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL
);

-- Seed a demo user
INSERT INTO users (username, password)
VALUES ('admin', 'admin')
ON CONFLICT (username) DO NOTHING;

-- Create employees table
CREATE TABLE IF NOT EXISTS employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL,
  position VARCHAR(100) NOT NULL
);

-- Optional sample employees
INSERT INTO employees (name, email, position) VALUES
('Alice Kumar', 'alice@example.com', 'Developer'),
('Rahul Singh', 'rahul@example.com', 'Designer')
ON CONFLICT DO NOTHING;
