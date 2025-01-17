import { 
    Spinner
 } from "@material-tailwind/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState, useEffect } from "react";
import { fetchDetailCalonKaryawan } from "../../../api/axios";

const DetailCalonKaryawan = ({id}) => {
    // State untuk data API, loading, dan error
    const [dataCalonKaryawan, setDataCalonKaryawan] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiUrl = "http://127.0.0.1:8000/";

    // Fetch data dari API
    useEffect(() => {
        const getUsers = async () => {
            try {
                setLoading(true);
                const data = await fetchDetailCalonKaryawan(id);
                setDataCalonKaryawan(data); // Set data dari API ke state
            } catch (err) {
                console.error("Error fetching users:", err);
                setError(err.message || "Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };

        getUsers();
    }, [id]);

    // Jika loading, tampilkan spinner
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spinner className="h-12 w-12" />
            </div>
        );
    }

    // Jika ada error, tampilkan pesan error
    if (error) {
        return <div className="text-center">{error}</div>;
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="overflow-y-auto mac-scrollbar mac-scrollbar-x mac-scrollbar-y mb-20 pr-4 px-6">
                <div className="flex gap-6 mt-5">
                    {dataCalonKaryawan.map((candidate) => (
                        <div key={candidate.id} className="flex items-center w-3/4 bg-[#E8E1F2] p-4 rounded-lg">
                            <div className="flex-shrink-0">
                                <img
                                    src={`${apiUrl}${candidate.photo}`}
                                    alt={`profile-${candidate.nama_karyawan}`}
                                    className="w-40 h-40 object-cover rounded-full mx-auto"
                                />
                            </div>
                            <div className="ml-4">
                                <h5 className="text-lg font-semibold mb-2">
                                    {candidate.nama_karyawan}
                                </h5>
                                <p className="text-sm font-medium">
                                    <span className="text-gray-600 text-xs">NIK:  </span>
                                    {candidate.nik}
                                </p>
                                <p className="text-sm font-medium">
                                    <span className="text-gray-600 text-xs">Email:  </span>
                                    {candidate.email}
                                </p>
                                <p className="text-sm font-medium">
                                    <span className="text-gray-600 text-xs">Tempat, Tanggal lahir:  </span>
                                    {candidate.tempat_lahir}, {candidate.tanggal_lahir}
                                </p>
                                <p className="text-sm font-medium">
                                    <span className="text-gray-600 text-xs">Jenis Kelamin:  </span>
                                    {candidate.jenis_kelamin}
                                </p>
                                <p className="text-sm font-medium">
                                    <span className="text-gray-600 text-xs">Agama:  </span>
                                    {candidate.agama}
                                </p>
                                <p className="text-sm font-medium">
                                    <span className="text-gray-600 text-xs">Status:  </span> 
                                    {candidate.status}
                                </p>
                                <p className="text-sm font-medium">
                                    <span className="text-gray-600 text-xs">Alamat:  </span>
                                    {candidate.alamat}
                                </p>
                                <p className="text-sm font-medium">
                                    <span className="text-gray-600 text-xs">No.Telp:  </span>
                                    {candidate.no_telephone}
                                </p>
                            </div>
                        </div>
                    ))}
                    {dataCalonKaryawan.map((candidate) => (
                        <div key={candidate.id} className="flex flex-col items-center w-1/3 bg-[#E8E1F2] p-4 rounded-lg">
                            <h5 className="text-lg font-semibold mb-2 mt-2">
                                File Calon Karyawan
                            </h5>
                            <div className="bg-white rounded-lg h-12 flex items-center w-full mx-4 p-4 mt-4">
                                <span className="text-gray-600 text-sm w-[90%]">
                                    File KTP:  
                                </span>
                                <Icon icon="majesticons:open"/>
                            </div>
                            <div className="bg-white rounded-lg h-12 flex items-center w-full mx-4 p-4 mt-4">
                                <span className="text-gray-600 text-sm w-[90%]">
                                    File Ijazah:  
                                </span>
                                <Icon icon="majesticons:open"/>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bg-[#E8E1F2] h-screen w-full mt-6 rounded-lg p-4">
                    <h5 className="text-lg font-semibold mb-2 mt-2">
                        Jawaban Soal Interview
                    </h5>
                </div>
            </div>
        </div>
    );
};

export default DetailCalonKaryawan;
