import { useState, useEffect } from "react";
import {
    Spinner,
    Card,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import SearchTable from "./components/SearchTable";
import DetailCalonKaryawan from "./DetailCalonKaryawan";
import { fetchDataCalonKaryawan } from "../../../api/axios";

const Recruitment = () => {
    // State untuk data API, loading, dan error
    const [dataCalonKaryawan, setDataCalonKaryawan] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State untuk detail
    const [showDetail, setShowDetail] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const apiUrl = "http://127.0.0.1:8000/";


    // Fetch data dari API
    useEffect(() => {
        const getUsers = async () => {
            try {
                setLoading(true);
                const data = await fetchDataCalonKaryawan();
                setDataCalonKaryawan(data); // Set data dari API ke state
            } catch (err) {
                console.error("Error fetching users:", err);
                setError(err.message || "Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };

        getUsers();
    }, []);

    // Fungsi untuk menampilkan detail
    const handleDetail = (id) => {
        setShowDetail(true);
        setSelectedId(id);
    };

    // Jika showDetail true, tampilkan DetailCalonKaryawan
    if (showDetail) {
        return <DetailCalonKaryawan id={selectedId} />;
    }

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
        <>
            <div className="flex flex-col h-screen">
                <div className="overflow-y-auto mac-scrollbar mac-scrollbar-x mac-scrollbar-y mb-20 pr-4">
                    <div className="w-full mb-8">
                        <SearchTable posisi="mx-auto" />
                    </div>
                    <div className="grid grid-cols-3 gap-4 ms-8">
                        {dataCalonKaryawan.map((candidate) => (
                            <Card key={candidate.id} className="w-64 border border-black">
                                <CardBody className="text-center">
                                    <img
                                        src={`${apiUrl}${candidate.photo}`}
                                         // Placeholder jika tidak ada foto
                                        alt={`profile-${candidate.nama_karyawan}`}
                                        className="w-28 mx-auto rounded-full"
                                    />
                                    <Typography variant="h5" color="blue-gray">
                                        {candidate.nama_karyawan}
                                    </Typography>
                                    <Typography
                                        color="blue-gray"
                                        className="font-medium mb-2"
                                        textGradient
                                    >
                                        {candidate.nik}
                                    </Typography>
                                    <Button
                                        color="blue"
                                        size="sm"
                                        className="flex px-2 mx-auto"
                                        onClick={() => handleDetail(candidate.id)}
                                    >
                                        <Icon
                                            icon="carbon:user-profile"
                                            className="h-4 w-4 mr-2"
                                        />
                                        Detail
                                    </Button>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Recruitment;
