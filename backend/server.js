const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001', 
  'http://localhost:3002',
  'https://mobafolio-backend.onrender.com',
  'https://mobafolio-frontend.onrender.com',
  'https://moba-folio.vercel.app',
  'https://moba-folio-joku0i433-angeloromaraog.vercel.app',
  'https://moba-folio-q1hoc84bp-angeloromaraog.vercel.app', // 👈 ADD THIS NEW URL
  process.env.CORS_ORIGIN
].filter(Boolean);