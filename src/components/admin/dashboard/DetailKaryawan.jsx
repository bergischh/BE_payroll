import {
    Card,
    CardBody,
    Typography,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Spinner,
} from "@material-tailwind/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import ListData from "./components/listData";
import { useState, useEffect } from "react";
import { fetchDataKaryawan } from "../../../api/axios";

const DetailKaryawan = () => {
    const [activeTab, setActiveTab] = useState("biodata");
    const [dataKaryawan, setDataKaryawan] = useState(null); // State untuk data karyawan
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiUrl = "http://127.0.0.1:8000/"; // URL dasar API Anda
    const fotoUrl = `${apiUrl}api/karyawan${dataKaryawan?.foto}`; // URL gambar foto karyawan

    useEffect(() => {
        const getKaryawan = async () => {
            try {
                setLoading(true);
                const response = await fetchDataKaryawan(); // Ambil data karyawan
                console.log("API response data:", response); // Debug untuk melihat data API
                setDataKaryawan(response[0]); // Ambil objek pertama dari array
            } catch (err) {
                setError("Error fetching data");
            } finally {
                setLoading(false);
            }
        };
        getKaryawan();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spinner className="h-12 w-12" />
            </div>
        );
    }

    if (error) {
        return <div className="text-center">{error}</div>;
    }

    const data = [
        {
            label: "Biodata",
            value: "biodata",
            icon: "iconamoon:profile-fill",
            desc: (
                <>
                    <ListData label="NIK" value={dataKaryawan?.nik} />
                    <ListData label="Nama" value={dataKaryawan?.nama_karyawan} />
                    <ListData label="Tempat Lahir" value={dataKaryawan?.tempat_lahir} />
                    <ListData label="Tanggal Lahir" value={dataKaryawan?.tanggal_lahir} />
                    <ListData label="Alamat" value={dataKaryawan?.alamat} />
                    <ListData label="Status" value={dataKaryawan?.status} />
                    <ListData label="Agama" value={dataKaryawan?.agama} />
                    <ListData label="Jumlah Anak" value={dataKaryawan?.jumlah_anak} />
                </>
            ),
        },
        {
            label: "Penggajian",
            value: "gaji",
            icon: "solar:hand-money-outline",
            desc: (
                <>
                    <ListData label="Gaji Pokok" value={dataKaryawan?.gajiPokok} />
                    <ListData label="Tunjangan" value={dataKaryawan?.tunjangan} />
                    <ListData label="Plafon Kesehatan" value={dataKaryawan?.plafonKesehatan} />
                    <ListData label="THR" value={dataKaryawan?.thr} />
                    <ListData label="BPJS" value={dataKaryawan?.bpjs} />
                </>
            ),
        },
    ];

    return (
        <div className="flex flex-col h-screen">
            <div className="overflow-y-auto mac-scrollbar mac-scrollbar-x mac-scrollbar-y mb-20 pr-4">
                <p className="text-gray-500 mt-5 mb-16 text-lg">Detail Karyawan</p>
                <div className="flex mx-8">
                    <Card className="w-64 border border-black rounded-3xl max-h-[256px]">
                        <CardBody className="text-center py-2">
                            <img
                                src={fotoUrl} // fallback gambar jika foto karyawan tidak ditemukan
                                alt="profile-picture"
                                className="w-48 mx-auto rounded-full"
                                onError={() => console.log("Foto gagal dimuat dengan URL:", fotoUrl)}
                            />
                            <Typography variant="h5" color="blue-gray">
                                {dataKaryawan?.nama}
                            </Typography>
                            <Typography color="blue-gray" className="font-medium" textGradient>
                                {dataKaryawan?.jabatan}
                            </Typography>
                        </CardBody>
                    </Card>
                    <div className="detail w-3/4 ms-8 mt-[-50px]">
                        <Tabs value={activeTab || "biodata"} onChange={(newValue) => setActiveTab(newValue)}>
                            <TabsHeader key={activeTab} className="w-2/5 ms-3 pb-0 bg-transparent">
                                {data.map(({ label, value, icon }) => (
                                    <Tab
                                        key={value}
                                        value={value}
                                        onClick={() => setActiveTab(value)}
                                        className={`transition-all duration-700 ease-in-out mx-1 rounded-t-lg border border-[#B9B2D9]
                                            ${activeTab === value ? "bg-white text-[#B9B2D9] rounded-t-lg" : "bg-[#B9B2D9] text-white rounded-t-lg"}`}
                                    >
                                        <div className="text-sm flex items-center gap-2 p-2">
                                            <Icon icon={icon} className="w-5 h-5" />
                                            {label}
                                        </div>
                                    </Tab>
                                ))}
                            </TabsHeader>
                            <Card className="border border-black rounded-3xl">
                                <CardBody className="py-4">
                                    <TabsBody>
                                        {data.map(({ value, desc }) => (
                                            <TabPanel key={value} value={value}>
                                                {desc}
                                            </TabPanel>
                                        ))}
                                    </TabsBody>
                                </CardBody>
                            </Card>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailKaryawan;
