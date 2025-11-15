import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('mahasiswa');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      await axios.post('http://localhost:3001/api/auth/register', {
        name,
        email,
        password,
        role
      });

      setSuccess(true);

      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      setError(err.response ? err.response.data.message : 'Registrasi gagal');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-200 flex items-center justify-center px-4">

      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl border border-gray-200">

        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center text-purple-700 mb-6 tracking-tight">
          Register Akun
        </h2>

        <p className="text-center text-gray-600 mb-8">
          Daftar untuk membuat akun baru.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Input Nama */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Nama</label>
            <input
              type="text"
              value={name}
              placeholder="Masukkan nama lengkap"
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full px-4 py-3 bg-gray-50 border rounded-xl border-gray-300
              focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
              required
            />
          </div>

          {/* Input Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              placeholder="contoh@email.com"
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-3 bg-gray-50 border rounded-xl border-gray-300
              focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
              required
            />
          </div>

          {/* Input Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-3 bg-gray-50 border rounded-xl border-gray-300
              focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
              required
            />
          </div>

          {/* Select Role */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 w-full px-4 py-3 bg-gray-50 border rounded-xl border-gray-300
              focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
            >
              <option value="mahasiswa">Mahasiswa</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white font-semibold rounded-xl shadow-md
            hover:bg-purple-700 transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Daftar
          </button>
        </form>

        {/* Success */}
        {success && (
          <p className="text-purple-700 text-sm font-medium mt-4 text-center bg-purple-50 py-2 rounded-md border border-purple-200">
            Registrasi berhasil! Mengarahkan ke halaman login...
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-600 text-sm font-medium mt-4 text-center bg-red-50 py-2 rounded-md border border-red-200">
            {error}
          </p>
        )}

        {/* Link ke login */}
        <p className="text-center text-gray-500 mt-6 text-sm">
          Sudah punya akun?{" "}
          <span
            className="text-purple-700 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate('/login')}
          >
            Login di sini
          </span>
        </p>
      </div>
    </div>
  );
}
