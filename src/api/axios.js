import axios from 'axios';
import Cookies from "js-cookie"

// URL API diambil dari .env
const apiUrl = "http://127.0.0.1:8000/";
if (!apiUrl) {
  throw new Error('API URL is not defined');
}

// Fungsi untuk register user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${apiUrl}api/register/`, userData); // Menggunakan apiUrl
    // console.log('Registration successful:', response.data);
    return response;
  } catch (error) {
    if (error.response) {
      console.error('Server responded with an error:', error.response.data);
      throw error.response;
    } else if (error.request) {
      console.error('No response from server:', error.request);
      throw new Error('No response from server');
    } else {
      console.error('Error during registration:', error.message);
      throw new Error('Registration failed');
    }
  }
};

// Fungsi untuk login user
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${apiUrl}api/login/`, userData);

    // Tangkap token dari respons API
    const token = response.data.token;

    // Simpan token ke cookie
    Cookies.set("token", token, { expires: 1 }); // Token berlaku 1 hari
    console.log("Token saved to cookies:", token); // Debug

    return response;

  } catch (error) {
    if (error.response) {
      console.error('Server responded with an error:', error.response.data);
      throw error.response;
    } else if (error.request) {
      console.error('No response from server:', error.request);
      throw new Error('No response from server');
    } else {
      console.error('Error during login:', error.message);
      throw new Error('Login failed');
    }
  }
};

// Fungsi untuk fetch users
export const fetchUsers = async () => {
  try {
      const token = Cookies.get("token"); // Gunakan Cookies.get untuk mengambil token
      console.log("Token:", token); // Debug token
      const response = await axios.get(`${apiUrl}api/user/`, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      console.log("API response data:", response.data);
      return response.data;
  } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
  }
};

// Fungsi Hapus data Users
export const deleteUser = async (id) => {
  try {
      alert("Are you sure want to delete this data users ?");
      const token = Cookies.get("token"); // Gunakan Cookies.get untuk mengambil token
      console.log("Token:", token); // Debug token
      const response = await axios.delete(`${apiUrl}api/delete-user/${id}/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
      console.log(response.status); // Verifikasi status respons
      console.log(response.data); // Verifikasi data yang dikembalikan
      return response.data; // Kembalikan respons untuk diolah di komponen
  } catch (error) {
      console.error("Failed to delete user:", error);
      console.log("URL to delete:", `${apiUrl}api/delete-user/${id}/`);
      throw error; // Lempar error agar bisa ditangani di komponen
  }
};

// Fungsi untuk add calon karyawan
export const addDataCalonKaryawan = async (calonKaryawanData) => {
  try {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Token tidak ditemukan. Harap login terlebih dahulu.");
    }

    const formData = new FormData();
    formData.append('nama_karyawan', calonKaryawanData.nama_karyawan || '');
    formData.append('nik', calonKaryawanData.nik || '');
    // formData.append('deskripsi', calonKaryawanData.deskripsi || '');
    formData.append('email', calonKaryawanData.email || '');
    formData.append('no_telephone', calonKaryawanData.no_telephone || '');
    formData.append('alamat', calonKaryawanData.alamat || '');
    formData.append('tempat_lahir', calonKaryawanData.tempat_lahir || '');
    formData.append('tanggal_lahir', calonKaryawanData.tanggal_lahir || '');

    // Validasi jenis kelamin
    const validJenisKelamin = ['laki_laki', 'perempuan'];
    if (validJenisKelamin.includes(calonKaryawanData.jenis_kelamin)) {
      formData.append('jenis_kelamin', calonKaryawanData.jenis_kelamin);
    } else {
      throw new Error('"Jenis kelamin tidak valid."');
    }

    // Validasi status
    const validStatus = ['kawin', 'belum_kawin'];
    if (validStatus.includes(calonKaryawanData.status)) {
      formData.append('status', calonKaryawanData.status);
    } else {
      throw new Error('"Status tidak valid."');
    }

    formData.append('agama', calonKaryawanData.agama || '');
    formData.append('jumlah_anak', calonKaryawanData.jumlah_anak || '');

    // Validasi file photo
    if (calonKaryawanData.photo && calonKaryawanData.photo instanceof File) {
      formData.append('photo', calonKaryawanData.photo);
    } else {
      throw new Error('File foto tidak valid.');
    }

    if (calonKaryawanData.ktp) {
      formData.append('ktp', calonKaryawanData.ktp);
    }

    if (calonKaryawanData.ijazah) {
      formData.append('ijazah', calonKaryawanData.ijazah);
    }

    const response = await axios.post(`${apiUrl}api/create-calon-karyawan/`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error dari server:', error.response?.data || error.message);
    throw error;
  }
};





// Fungsi untuk fetch datakaryawan
export const fetchDataKaryawan = async () => {
  try {
      const token = Cookies.get("token"); // Gunakan Cookies.get untuk mengambil token
      console.log("Token:", token); // Debug token
      const response = await axios.get(`${apiUrl}api/karyawan/`, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      console.log("API response data:", response.data);
      return response.data;
  } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
  }
};

// Fungsi untuk fetch datakaryawan
export const fetchDetailKaryawan = async (id) => {
  try {
    const token = Cookies.get("token");
    const response = await axios.get(`${apiUrl}api/karyawan/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Data tidak ditemukan");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// TUNJANGAN //
// fetch data tunjangan
export const fetchDataTunjangan = async () => {
  try {
    const token = Cookies.get("token"); // Gunakan Cookies.get untuk mengambil token
    console.log("Token:", token); // Debug token
    const response = await axios.get(`${apiUrl}api/tunjangan/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("API response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; 
  }
}

// PINJAMAN & PEMBAYARAN //
// fetch data pinjaman
export const fetchDataPinjaman = async () => {
 try {
   const token = Cookies.get("token"); // Gunakan Cookies.get untuk mengambil token
   console.log("Token:", token); // Debug token
   const response = await axios.get(`${apiUrl}api/pinjaman/`, {
     headers: {
       Authorization: `Bearer ${token}`,
     },
   });
   console.log("API response data:", response.data);
   return response.data;
 } catch (error) {
   console.error("Error fetching users:", error);
   throw error;
 }
};





