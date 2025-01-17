import '../../Fonts.css';
import { 
    Input,
    Button,
    Select,
    Option,
} from "@material-tailwind/react";
import { Icon } from '@iconify/react';
import { useState } from "react";
import { addDataCalonKaryawan } from '../../../api/axios';

const Biodata = () => {
    // Menambahkan gambar lokal default
    const [photoFile, setPhotoFile] = useState("/img/profile.png");
    const [ktpFile, setKtpFile] = useState(null);
    const [ijazahFile, setIjazahFile] = useState(null);

    const [nik, setNik] = useState('');
    const [nama_karyawan, setNama] = useState('');
    const [email, setEmail] = useState('');
    const [agama, setAgama] = useState('');
    const [no_telephone, setnoTelp] = useState('');
    const [alamat, setAlamat] = useState('');
    const [tempat_lahir, setTempatLahir] = useState('');
    const [tanggal_lahir, setTanggalLahir] = useState('');
    const [jenis_kelamin, setGender] = useState('Pilih Gender');
    const [status, setStatus] = useState('Pilih Status');
    const [jumlah_anak, setJumlahAnak] = useState('');
    // const [deskripsi, setDeskripsi] = useState('');

    // Handle perubahan gambar profil
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setPhotoFile(previewUrl, file); // Simpan URL untuk digunakan di preview
        }
    };
    
    const handleKtpChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setKtpFile(file); // Simpan file asli
        }
    };
    
    const handleIjazahChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setIjazahFile(file); // Simpan file asli
        }
    };
    
    const handleGenderChange = (value) => {
        console.log("Gender terpilih:".value);
        setGender(value);  // Tidak perlu e.target.value, karena value sudah langsung diterima
    };  

    // Handle reset form
    const handleReset = () => {
        setNama('');
        setNik('');
        // setDeskripsi('');
        setEmail('');
        setAgama('');
        setnoTelp('');
        setAlamat('');
        setTempatLahir('');
        setTanggalLahir('');
        setGender('');
        setStatus('');
        setJumlahAnak('');
        setPhotoFile("/img/profile.png"); // Reset image ke default
        setKtpFile(null); // Reset foto KTP
        setIjazahFile(null); // Reset foto Ijazah
    };

    // Handle submit form
    const handleSubmit = async () => {
        // Pastikan elemen input file photo ada dan memiliki file
        const photoInput = document.querySelector('input[type="file"][name="photo"]');
        const photoFile = photoInput && photoInput.files && photoInput.files[0];
        
        if (!jenis_kelamin || jenis_kelamin === "Pilih Gender") {
            alert("Silakan pilih gender.");
            return;
        }
    
        if (!status || status === "Pilih Status") {
            alert("Silakan pilih status.");
            return;
        }
        console.log("Data dikirim:", { jenis_kelamin, status });

        const calonKaryawanData = {
            nik,
            nama_karyawan,
            email,
            tempat_lahir,
            tanggal_lahir,
            jenis_kelamin,
            agama,
            status,
            jumlah_anak,
            alamat,
            no_telephone,
            photo: photoFile || null, // Jika photo tidak ada, beri nilai null
            ktp: ktpFile,
            ijazah: ijazahFile,
            // deskripsi,
        };
    
        try {
            const response = await addDataCalonKaryawan(calonKaryawanData);
            console.log('Calon karyawan berhasil ditambahkan:', response);
            handleReset(); // Reset form setelah berhasil submit
        } catch (error) {
            console.error('Gagal menambahkan calon karyawan:', error);
        }
    };
    
    
    return (
        <div className="flex flex-col h-screen">
            <div className="overflow-y-auto mac-scrollbar mac-scrollbar-x mac-scrollbar-y mb-28 pr-4">
                <h1 className="bio text-4xl mb-1">Biodata</h1>
                <p className='text-[#7D738A]'>Lengkapi biodata Anda dengan benar!</p>
                <div className="border-t-[1.5px] border-black mt-0.5"></div>
                
                <div className="flex mt-4 ms-4 gap-4">
                    <div className="picture">
                        <form method='post'>
                            <div className="items-center space-x-6">
                                <div className="shrink-0">
                                    <img
                                        id="preview_img"
                                        className="h-20 w-20 mb-4 object-cover rounded-full mx-auto"
                                        src={photoFile} // Menampilkan gambar yang dipilih atau gambar default
                                        alt="Current profile photo"
                                    />
                                </div>
                                <label className="block">
                                    <span className="sr-only">Upload</span>
                                    <input
                                        type="file"
                                        name="photo"
                                        onChange={handleImageChange}
                                        className="block w-full text-sm text-slate-500
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-full file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-violet-50 file:text-violet-700
                                            hover:file:bg-violet-100"
                                    />
                                </label>
                            </div>
                        </form>
                    </div>
                    <div className="input-top w-5/12">
                        <div className="mb-8 mt-2">
                            <Input 
                                variant="outlined" 
                                label="Nama" 
                                placeholder="Outlined" 
                                value={nama_karyawan} 
                                onChange={(e) => setNama(e.target.value)} 
                            />
                        </div>
                        <Input 
                            variant="outlined" 
                            label="NIK" 
                            placeholder="Outlined" 
                            value={nik} 
                            onChange={(e) => setNik(e.target.value)} 
                        />
                    </div>
                    <div className="ket w-1/2">
                        <div className="mb-8 mt-2">
                            {/* <Input 
                                variant="outlined" 
                                placeholder="Outlined"
                                label="Deskripsi Singkat" 
                                value={deskripsi} 
                                onChange={(e) => setDeskripsi(e.target.value)} 
                            /> */}
                        </div>
                        <Input 
                            variant="outlined" 
                            label="Agama" 
                            placeholder="Outlined" 
                            value={agama} 
                            onChange={(e) => setAgama(e.target.value)} 
                        />
                    </div>
                </div>
                
                <div className="flex mt-4 ms-4 gap-4">
                    <div className="left w-3/6 flex flex-col gap-6">
                        <Input 
                            variant="outlined" 
                            label="Email" 
                            placeholder="Outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        <div className="relative flex w-full">
                            <Input 
                                variant="outlined" 
                                label="No.Telp" 
                                placeholder="Outlined"
                                value={no_telephone}
                                onChange={(e) => setnoTelp(e.target.value)} 
                            />
                        </div>
                        <Input 
                            variant="outlined" 
                            label="Alamat" 
                            placeholder="Outlined" 
                            value={alamat}
                            onChange={(e) => setAlamat(e.target.value)} 
                        />
                        <Input 
                            variant="outlined" 
                            label="Tempat Lahir" 
                            placeholder="Outlined"
                            value={tempat_lahir}
                            onChange={(e) => setTempatLahir(e.target.value)} 
                        />
                        <Input 
                            type="date" 
                            variant="outlined" 
                            label="Tanggal Lahir" 
                            placeholder="Outlined" 
                            value={tanggal_lahir}
                            onChange={(e) => setTanggalLahir(e.target.value)} 
                        />
                    </div>
                    <div className="right w-3/6 flex flex-col gap-6">
                        <Select 
                            variant="outlined" 
                            label="Pilih Gender" 
                            value={jenis_kelamin}
                            onChange={handleGenderChange}  // Hanya memanggil fungsi handler tanpa event
                        >
                            <Option value="laki_laki">Pria</Option>
                            <Option value="perempuan">Wanita</Option>
                        </Select>

                        <Select 
                            variant="outlined" 
                            label="Status" 
                            value={status}
                            onChange={(value) => setStatus(value)}  // Memanggil langsung nilai yang diterima
                        >
                            <Option value="kawin">Menikah</Option>
                            <Option value="belum_kawin">Belum Menikah</Option>
                        </Select>

                        <Input 
                            variant="outlined" 
                            label="Jumlah anak" 
                            placeholder="Outlined" 
                            value={jumlah_anak}
                            onChange={(e) => setJumlahAnak(e.target.value)} 
                        />
                        <div className="relative flex w-full">
                            <Input
                                type="file"
                                label="Foto KTP"
                                onChange={handleKtpChange}
                                className="p-0 file:!absolute file:right-0 file:top-1 file:bg-gray-900 file:text-white file:rounded-md file:border-none file:py-1.5 file:px-4"
                            />
                        </div>
                        <div className="relative flex w-full">
                            <Input
                                type="file"
                                label="Ijazah"
                                onChange={handleIjazahChange}
                                className="p-0 file:!absolute file:right-0 file:top-1 file:bg-gray-900 file:text-white file:rounded-md file:border-none file:py-1.5 file:px-4"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4 mt-12 mb-4 ml-auto w-full">
                    <Button variant="outlined" className="py-2" onClick={handleReset}>Reset</Button>
                    <Button className="flex items-center gap-1 py-3" color="blue" onClick={handleSubmit}>
                        Kirim
                        <Icon icon="tabler:send" className="text-white w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Biodata;
