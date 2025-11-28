// 1. Import Model Presensi dan Model User untuk relasi
const { Presensi, User } = require("../models"); // Pastikan User juga diimpor
const { format } = require("date-fns-tz");
const timeZone = "Asia/Jakarta";

exports.CheckIn = async (req, res) => {
  try {
    // A. Kunci Perbaikan: Ambil userId dari JWT payload (req.user)
    const { id: userId, nama: userName } = req.user;
    const waktuSekarang = new Date();

    const {latitude, longitude} = req.body;
    // Cek apakah user sudah check-in dan belum check-out hari ini
    const existingRecord = await Presensi.findOne({
      where: { userId: userId, checkOut: null },
    });

    if (existingRecord) {
      return res
        .status(400)
        .json({ message: "Anda sudah melakukan check-in hari ini." });
    }

    // B. Perbaikan Utama: Hapus field 'nama' dari proses create
    const newRecord = await Presensi.create({
      userId: userId, // Hanya menggunakan userId (Foreign Key)
      checkIn: waktuSekarang,
      latitude: latitude || null,
      longitude:  longitude || null,
    });
    
    // Siapkan response data
    const formattedData = {
      userId: newRecord.userId,
      // nama: userName, // Nama diambil dari req.user untuk pesan, tapi tidak disimpan di DB
      checkIn: format(newRecord.checkIn, "yyyy-MM-dd HH:mm:ssXXX", { timeZone }),
      checkOut: null
    };

    res.status(201).json({
      message: `Halo ${userName}, check-in Anda berhasil pada pukul ${format(
        waktuSekarang,
        "HH:mm:ss",
        { timeZone }
      )} WIB`,
      data: formattedData,
    });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan pada server", error: error.message });
  }
};

exports.CheckOut = async (req, res) => {
  try {
    // A. Kunci Perbaikan: Ambil userId dari JWT payload (req.user)
    const { id: userId, nama: userName } = req.user;
    const waktuSekarang = new Date();

    // Cari catatan check-in yang aktif (belum check-out)
    const recordToUpdate = await Presensi.findOne({
      where: { userId: userId, checkOut: null },
    });

    if (!recordToUpdate) {
      return res.status(404).json({
        message: "Tidak ditemukan catatan check-in yang aktif untuk Anda.",
      });
    }

    // Update dan simpan perubahan
    recordToUpdate.checkOut = waktuSekarang;
    await recordToUpdate.save();

    // Siapkan response data
    const formattedData = {
      userId: recordToUpdate.userId,
      // nama: userName, // Nama tidak ada di recordToUpdate jika sudah dihapus dari DB
      checkIn: format(recordToUpdate.checkIn, "yyyy-MM-dd HH:mm:ssXXX", { timeZone }),
      checkOut: format(recordToUpdate.checkOut, "yyyy-MM-dd HH:mm:ssXXX", { timeZone }),
    };

    res.json({
      message: `Selamat jalan ${userName}, check-out Anda berhasil pada pukul ${format(
        waktuSekarang,
        "HH:mm:ss",
        { timeZone }
      )} WIB`,
      data: formattedData,
    });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan pada server", error: error.message });
  }
};

// Fungsi lain (deletePresensi, updatePresensi) tidak memerlukan perubahan besar 
// terkait penggunaan req.user.id karena sudah menggunakannya dengan benar.

exports.deletePresensi = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const presensiId = req.params.id;
    const recordToDelete = await Presensi.findByPk(presensiId);

    if (!recordToDelete) {
      return res
        .status(404)
        .json({ message: "Catatan presensi tidak ditemukan." });
    }
    // Hanya pemilik yang bisa menghapus catatan mereka
    if (recordToDelete.userId !== userId) { 
      return res
        .status(403)
        .json({ message: "Akses ditolak: Anda bukan pemilik catatan ini." });
    }
    await recordToDelete.destroy();
    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan pada server", error: error.message });
  }
};

// NOTE: Fungsi updatePresensi ini hanya untuk admin, 
// dan harusnya tidak bisa mengupdate 'nama' karena sudah dihapus.
// Saya hapus update 'nama' dan 'userId' untuk menjaga konsistensi.
exports.updatePresensi = async (req, res) => {
  try {
    const presensiId = req.params.id;
    // Hapus 'nama' karena sudah dihapus dari tabel Presensi
    const { checkIn, checkOut } = req.body; 
    
    if (checkIn === undefined && checkOut === undefined) {
      return res.status(400).json({
        message:
          "Request body tidak berisi data yang valid untuk diupdate (checkIn atau checkOut).",
      });
    }
    const recordToUpdate = await Presensi.findByPk(presensiId);
    if (!recordToUpdate) {
      return res
        .status(404)
        .json({ message: "Catatan presensi tidak ditemukan." });
    }

    recordToUpdate.checkIn = checkIn !== undefined ? checkIn : recordToUpdate.checkIn;
    recordToUpdate.checkOut = checkOut !== undefined ? checkOut : recordToUpdate.checkOut;
    await recordToUpdate.save();

    res.json({
      message: "Data presensi berhasil diperbarui.",
      data: recordToUpdate,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan pada server", error: error.message });
  }
};