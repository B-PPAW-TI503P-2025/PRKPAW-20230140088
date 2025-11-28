import React from 'react';
import { Link } from 'react-router-dom'; // Gunakan Link untuk navigasi, bukan useNavigate

export default function DashboardPage() {
    // Hapus handleLogout dan useNavigate karena sudah diurus oleh Navbar

    return (
        <div className="max-w-4xl mx-auto p-8 pt-16 min-h-screen bg-gray-50">
            <div className="text-center mb-12">
                
                {/* Header */}
                <h1 className="text-5xl font-extrabold text-blue-700 mb-4 tracking-tight">
                    Dashboard Aplikasi Presensi
                </h1>
                <p className="text-xl text-gray-600">
                    Selamat datang! Silakan pilih menu untuk memulai.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Kartu Aksi 1: Presensi (Check-In/Out) */}
                <Link to="/presensi" className="block transform transition duration-300 hover:scale-[1.03] hover:shadow-2xl">
                    <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-green-500">
                        <h2 className="text-3xl font-bold text-green-600 mb-3">Lakukan Presensi</h2>
                        <p className="text-gray-500">
                            Masuk dan keluar untuk mencatat kehadiran harian Anda.
                        </p>
                    </div>
                </Link>

                {/* Kartu Aksi 2: Laporan Admin */}
                <Link to="/reports" className="block transform transition duration-300 hover:scale-[1.03] hover:shadow-2xl">
                    <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-yellow-500">
                        <h2 className="text-3xl font-bold text-yellow-600 mb-3">Laporan (Admin)</h2>
                        <p className="text-gray-500">
                            Lihat seluruh data presensi harian (Akses khusus admin).
                        </p>
                    </div>
                </Link>
            </div>
        </div>
    );
}