import React, { useState } from 'react';

function App() {
  // Gunakan state untuk menyimpan input nama
  const [name, setName] = useState('');

  // Fungsi yang akan dipanggil saat input berubah
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Aplikasi Sambutan React</h1>

      <label htmlFor="nameInput">Masukkan Nama Anda: </label>
      {/* Input untuk menerima nama pengguna */}
      <input
        id="nameInput"
        type="text"
        value={name}
        onChange={handleNameChange} // Panggil fungsi saat input berubah
        placeholder="Ketik nama Anda di sini"
        style={{ margin: '10px', padding: '8px' }}
      />

      {/* Tampilkan pesan selamat datang */}
      <h2>Hello, {name || '[nama]'}!</h2>
      <p>Ini adalah tugas aplikasi React sederhana.</p>
    </div>
  );
}

export default App;