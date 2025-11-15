import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        email,
        password
      });

      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/dashboard');

    } catch (err) {
      setError(err.response ? err.response.data.message : 'Login gagal');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl border border-gray-200">
        
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-6 tracking-tight">
          Login
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Masukkan email dan password untuk melanjutkan.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label 
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              Email
            </label>
            <input 
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl 
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              placeholder="contoh@email.com"
              required
            />
          </div>

          <div>
            <label 
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <input 
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl 
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md
              hover:bg-blue-700 transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>

        {error && (
          <p className="text-red-600 text-sm font-medium mt-4 text-center bg-red-50 py-2 rounded-md border border-red-200">
            {error}
          </p>
        )}

        <p className="text-center text-gray-500 mt-6 text-sm">
          Belum punya akun?{" "}
          <span 
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate('/register')}
          >
            Daftar disini
          </span>
        </p>

      </div>
    </div>
  );
}
