export const metadata = {
  title: 'Three-Tier App',
  description: 'Next.js Frontend for Three-Tier Architecture',
};

import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body style={{ fontFamily: 'system-ui, Arial, sans-serif', background: '#fafafa' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>{children}</div>
      </body>
    </html>
  );
}
