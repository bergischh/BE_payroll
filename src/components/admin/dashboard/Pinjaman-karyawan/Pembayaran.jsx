import { useState,useEffect } from "react";
import { 
    Spinner
} from "@material-tailwind/react";
import SearchTable from "../components/SearchTable";

const Pembayaran = () => {
    // loading
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Simulasi loading data selama 0.8 detik
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spinner className="h-12 w-12" />
            </div>
        );
    }
    return (
        <>
            <div className="flex flex-col h-screen">
                <div className="overflow-y-auto mac-scrollbar mac-scrollbar-x mac-scrollbar-y mb-20 pr-4">
                    <div className="flex">
                        <h1 className="text-gray-500 mt-5 mb-16">Pembayaran Karyawan</h1>
                        <SearchTable/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Pembayaran