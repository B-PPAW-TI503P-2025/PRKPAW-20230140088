import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center border border-gray-200">
        
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4 tracking-tight">
          Dashboard
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          Selamat datang di halaman Dashboard kamu!  
        </p>

        {/* Info Card */}
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 shadow-inner mb-8">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">
            Status Login: <span className="text-green-600">Aktif</span>
          </h2>
          <p className="text-sm text-gray-600">
            Kamu berhasil login dan sekarang berada di halaman dashboard.
          </p>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full py-3 bg-red-500 text-white font-semibold rounded-xl 
          shadow-md hover:bg-red-600 transition-all duration-200 
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
