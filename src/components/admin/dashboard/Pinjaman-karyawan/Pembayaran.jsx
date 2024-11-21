import { useState,useEffect } from "react";
import { 
    Spinner
} from "@material-tailwind/react";
import SearchTable from "../components/SearchTable";
import CardBayar from "../components/CardBayar";

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
                    <h1 className="text-gray-500 mt-5 mb-8">Pembayaran Karyawan</h1>
                    <SearchTable/>    
                    <div className="grid grid-cols-3 gap-4">
                        <CardBayar 
                        colorBtn="blue"
                        icon="ph:seal-check-bold"
                        colorIcon="text-[#479CFF]"
                        ketBtn="lunas"
                        nama="Bergisch Humaira"
                        pinjaman="200.000"
                        tgl="Tanggal pembayaran: 24/10/2023"
                        />                            
                        <CardBayar 
                        colorBtn="red"
                        icon="lucide:badge-x"
                        colorIcon="text-[#F81818]"
                        ketBtn="Belum bayar"
                        nama="Bergisch Humaira"
                        pinjaman="100.000"
                        tgl="Tanggal tenggat: 20/10/2023"
                        />                            
                        <CardBayar 
                        colorBtn="yellow"
                        icon="lucide:badge-x"
                        colorIcon="text-[#FCCD2A]"
                        ketBtn="setengah"
                        nama="Bergisch Humaira"
                        pinjaman="50.000"
                        tgl="Tanggal pembayaran: 24/10/2023"
                        />                            
                    </div>
                </div>
            </div>
        </>
    )
}
export default Pembayaran