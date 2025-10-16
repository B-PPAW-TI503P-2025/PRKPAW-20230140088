const bookRoutes = require('./routes/books');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// // Middleware (HARUS DI ATAS ROUTE SPESIFIK)
app.use(cors());
app.use(express.json()); // <--- Body Parser untuk JSON
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});
// // END Middleware

// Route Spesifik (HARUS DI BAWAH Body Parser)
app.use('/api/books', bookRoutes);

app.get('/', (req, res) => {
  res.send('Home Page for API');
});

// Middleware 404 - jika route tidak ditemukan
app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Global Error:', err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});


app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});