const express = require('express');
const app = express();
const port = 5000; // Port server, bisa menggunakan port lain jika 5000 sudah terpakai

// Definisikan satu endpoint GET di path '/'
app.get('/', (req, res) => {
  // Mengembalikan pesan "Hello from Server!" dalam format JSON
  res.json({ message: 'Hello from Server!' });
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});